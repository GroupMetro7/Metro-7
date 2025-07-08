from flask import jsonify
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import os
# import io
# import base64

def PLTExport(forecast_data):
    os.makedirs("forecast_graphs", exist_ok=True)
    # results = []

    for model, forecast, item in forecast_data:
        fig = model.plot(forecast)
        plt.title(f"Forecast for '{item}'")
        plt.xlabel("ds")
        plt.ylabel("y")
        plt.tight_layout()

        # # Save figure to memory
        # buf = io.BytesIO()
        # plt.savefig(buf, format='png', dpi=300)
        # plt.close(fig)
        # buf.seek(0)

        # image_base64 = base64.b64encode(buf.read()).decode('utf-8')

        # results.append({
        #     'item': item,
        #     'image': image_base64
        # })

        item = str(item).replace("/", "_").replace("\\", "_").replace(" ", "_")
        file_path = os.path.join("forecast_graphs", f"{item}.png")

        plt.savefig(file_path, dpi=300)
        plt.close(fig)
    
    # return jsonify(results)