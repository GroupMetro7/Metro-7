import { useEffect, useState } from "react"

export default function useFetchModelPrediction() {
    const [forecastdata, setData] = useState([]);

    useEffect(() => {
        fetch("https://forecast.metro7-test.shop/")
            .then((res) => res.json())
            .then((forecastdata) => {
                setData(forecastdata);
            });
    }, []);

    return forecastdata;
}
