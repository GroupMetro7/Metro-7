from flask import Flask, request, make_response, jsonify
# from flask_cors import CORS
from functools import wraps
from df_preprocess import DF_Preprocess
from forecasts import Forecasts
import pandas as pd

app = Flask(__name__)
# CORS(app)

def crossdomain(origin='*', methods=None, headers=None):
    def decorator(f):
        @wraps(f)
        def wrapped_function(*args, **kwargs):
            resp = make_response(f(*args, **kwargs))
            resp.headers['Access-Control-Allow-Origin'] = origin
            resp.headers['Access-Control-Allow-Methods'] = ', '.join(methods or ['GET', 'POST', 'OPTIONS'])
            resp.headers['Access-Control-Allow-Headers'] = ', '.join(headers or ['Content-Type'])
            return resp
        return wrapped_function
    return decorator

@app.route("/send-data", methods=['POST'])
def receive_data():
    data = request.get_json()
    if not data:
        return jsonify({"status": "error", "message": "No data received"}), 400
    print("Data received:", data)
    try:
        df = pd.DataFrame(data)
        print("DataFrame columns:", df.columns)
        df.to_csv("received_data.csv", index=False)
    except Exception as e:
        print("Error saving CSV:", e)
        return jsonify({"status": "error", "message": f"Failed to save CSV: {e}"}), 500
    return jsonify({"status": "success", "received": data}), 200


@app.route("/")
@crossdomain(origin='*', methods=['GET'])

def AI():
    df = DF_Preprocess('received_data.csv')
    results = Forecasts(df)

    # with open("forecast.json", "w") as f:
    #     json.dump(results, f, indent=2, default=str)

    return results

if __name__ == '__main__':
    app.run(port=8080, debug=True)
