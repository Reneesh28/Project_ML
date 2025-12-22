import streamlit as st
import xgboost as xgb
import matplotlib.pyplot as plt
import numpy as np
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from utils.preprocess import add_time_features
from utils.model_utils import load_model
from utils.eda_plots import load_main_data

def main():
    st.title("📏 Model Evaluation")

    df = load_main_data()
    model = load_model()

    df_eval = add_time_features(df.copy())

    feature_cols = [
        "store", "item", "year", "month",
        "dayofweek", "month_sin", "month_cos"
    ]

    X = df_eval[feature_cols].astype("float32")
    y = df_eval["sales"].astype("float32")

    preds = model.predict(xgb.DMatrix(X))

    mae = mean_absolute_error(y, preds)
    mse = mean_squared_error(y, preds)
    rmse = mse ** 0.5
    r2 = r2_score(y, preds)

    st.metric("MAE", round(mae, 3))
    st.metric("MSE", round(mse, 3))
    st.metric("RMSE", round(rmse, 3))
    st.metric("R²", round(r2, 3))

    st.subheader("Actual vs Predicted")
    fig, ax = plt.subplots(figsize=(10, 4))
    ax.plot(y.values[:500], label="Actual")
    ax.plot(preds[:500], label="Predicted")
    ax.legend()
    st.pyplot(fig)
