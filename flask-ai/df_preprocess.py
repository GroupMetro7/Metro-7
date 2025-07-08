import pandas as pd

def DF_Preprocess(datasetparam):
    df = pd.read_csv(datasetparam)
    df['Date'] = pd.to_datetime(df['Date'], format='%m/%d/%Y')
    df['Order'] = pd.to_numeric(df['Order'], errors='coerce')
    # df.drop([ 'Trx#', 'Category', 'Price', 'Discount', 'TotalAmount', 'Type', 'Pcf', 'Classification'], axis=1, inplace=True)
    df = df.groupby(['Date', 'ItemName'], as_index=False)['Order'].sum()
    df.columns=('ds', 'x', 'y')

    return df
