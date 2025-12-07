import streamlit as st
import pandas as pd
import xgboost as xgb
from utils.model_utils import load_model
from utils.preprocess import add_time_features

def main():
    st.title("📈 Forecasting")

    model = load_model()

    store = st.number_input("Store ID", min_value=1, max_value=10, value=1)
    item = st.number_input("Item ID", min_value=1, max_value=50, value=1)
    start_date = st.date_input("Start Date")
    days = st.slider("Days to Forecast", 7, 365, 30)

    if st.button("Generate Forecast"):
        forecast_dates = pd.date_range(
            start=pd.to_datetime(start_date) + pd.Timedelta(days=1),
            periods=days
        )

        df = pd.DataFrame({
            "date": forecast_dates,
            "store": store,
            "item": item
        })

        df = add_time_features(df)

        feature_cols = [
            "store", "item", "year", "month",
            "dayofweek", "month_sin", "month_cos"
        ]

        X = df[feature_cols].astype("float32")
        preds = model.predict(xgb.DMatrix(X))

        df["predicted_sales"] = preds

        st.dataframe(df)
