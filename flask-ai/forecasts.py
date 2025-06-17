from prophet import Prophet

def Forecasts(dfparam):
    results = {}

    for item in dfparam.groupby(['x'], as_index=False)['y'].sum().sort_values(by="y", ascending=False).head(10)['x']:
        item_df = dfparam[dfparam['x'] == item][['ds', 'x', 'y']].copy()
        m = Prophet()
        model = m.fit(item_df[['ds', 'y']])
        future = model.make_future_dataframe(periods=30)
        forecast = model.predict(future)
        results[item] = forecast[['ds', 'yhat', 'yhat_lower', 'yhat_upper']].to_dict(orient='records')

    return results