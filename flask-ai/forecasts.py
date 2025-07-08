from prophet import Prophet
import pandas as pd

def Forecasts(dfparam):
    results = {}
    forecast_data = []

    for item in dfparam.groupby(['x'], as_index=False)['y'].sum().sort_values(by='y', ascending=False).head(10)['x']:
        item_df = dfparam[dfparam['x'] == item][['ds', 'x', 'y']].copy()
        last_date = item_df['ds'].max()
        today = pd.Timestamp.today().normalize()
        days_diff = (today - last_date).days
        # days_diff = (pd.Timestamp.today().normalize() - item_df['ds'].max()).days
        if item_df.shape[0] < 2:
            dummy_row = {
            'ds': today,
            'x': item,
            'y': 1
            }
            item_df = pd.concat([item_df, pd.DataFrame([dummy_row])], ignore_index=True)
        m = Prophet()
        model = m.fit(item_df[['ds', 'y']])
        future = model.make_future_dataframe(periods=4, freq='W')
        future = future[future['ds'] > last_date]
        forecast = model.predict(future)
        results[item] = forecast[['ds', 'yhat', 'yhat_lower', 'yhat_upper']].to_dict(orient='records')
        forecast_data.append((model, forecast, item))

    return results, forecast_data
