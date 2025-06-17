
from flask import Flask
from flask_cors import CORS
from df_preprocess import DF_Preprocess
from forecasts import Forecasts
import json

app = Flask(__name__)
CORS(app)

@app.route("/")
def AI():
    df = DF_Preprocess('dataset.csv')
    results = Forecasts(df)

    # with open("forecast.json", "w") as f:
    #     json.dump(results, f, indent=2, default=str)

    return results

if __name__ == '__main__':
    app.run(debug=True)
