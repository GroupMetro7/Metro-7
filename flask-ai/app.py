from flask import Flask, request, make_response
from functools import wraps
from df_preprocess import DF_Preprocess
from forecasts import Forecasts

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

@app.route("/")
@crossdomain(origin='*', methods=['GET'])


def AI():
    df = DF_Preprocess('dataset.csv')
    results = Forecasts(df)

    # with open("forecast.json", "w") as f:
    #     json.dump(results, f, indent=2, default=str)

    return results

if __name__ == '__main__':
    app.run(debug=True)
