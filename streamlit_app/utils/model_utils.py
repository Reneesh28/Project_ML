# app/utils/model_utils.py

import os
import xgboost as xgb
import pandas as pd
import numpy as np
from utils.preprocess import add_time_features


def get_default_model_path() -> str:
    """
    Returns the default path to the trained XGBoost model.
    Assumes this file lives in app/utils/ and the model is in project_root/models/.
    """
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # -> app/
    project_root = os.path.dirname(base_dir)                                # -> PROJECT/
    return os.path.join(project_root, "models", "xgb_demand_model.json")


# Load model (Booster)
def load_model(path: str | None = None) -> xgb.Booster:
    """
    Load the trained XGBoost Booster model.

    If path is None, use the default models/xgb_demand_model.json.
    """
    if path is None:
        path = get_default_model_path()

    model = xgb.Booster()
    model.load_model(path)
    return model


# Prepare input features
def prepare_input(store: int, item: int, date: str) -> pd.DataFrame:
    df = pd.DataFrame({
        "date": [pd.to_datetime(date)],
        "store": [store],
        "item": [item],
    })

    df = add_time_features(df)

    feature_cols = [
        "store", "item",
        "year", "month", "dayofweek",
        "month_sin", "month_cos",
    ]

    df = df[feature_cols].astype("float32")
    return df


# Predict demand
def predict_demand(model: xgb.Booster, store: int, item: int, date: str) -> float:
    df = prepare_input(store, item, date)
    dmatrix = xgb.DMatrix(df)
    pred = model.predict(dmatrix)[0]
    return round(float(pred), 2)