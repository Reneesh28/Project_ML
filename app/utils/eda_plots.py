# app/utils/eda.py

import os
from typing import Optional, Dict, Any

import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns


# ---------------------------------------------------------------------
# 1. Data loading helper
# ---------------------------------------------------------------------
def get_default_data_path() -> str:
    """
    Returns the default path to the main dataset, assuming this file
    lives in app/utils/ and the CSV is in project_root/datasets/.
    """
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    project_root = os.path.dirname(base_dir)
    return os.path.join(project_root, "datasets", "store_item_demand.csv")


def load_main_data(csv_path: Optional[str] = None) -> pd.DataFrame:
    """
    Load the main store-item demand dataset with parsed dates.

    Parameters
    ----------
    csv_path : str, optional
        Custom path to the CSV. If None, uses the default datasets/ path.

    Returns
    -------
    pd.DataFrame
    """
    if csv_path is None:
        csv_path = get_default_data_path()

    df = pd.read_csv(csv_path, parse_dates=["date"])
    return df


# ---------------------------------------------------------------------
# 2. Basic info & summary helpers
# ---------------------------------------------------------------------
def get_basic_info(df: pd.DataFrame) -> Dict[str, Any]:
    """
    Return a small dictionary with basic dataset info
    that can be shown in Streamlit.
    """
    info = {
        "shape": df.shape,
        "columns": list(df.columns),
        "dtypes": df.dtypes.astype(str).to_dict(),
        "start_date": df["date"].min(),
        "end_date": df["date"].max(),
        "n_stores": df["store"].nunique(),
        "n_items": df["item"].nunique(),
    }
    return info


def get_summary_stats(df: pd.DataFrame) -> pd.DataFrame:
    """
    Wrapper around describe() for quick summary.
    """
    return df.describe(include="all").T


def get_missing_values(df: pd.DataFrame) -> pd.DataFrame:
    """
    Return a DataFrame with missing value counts and percentages.
    """
    total = df.isnull().sum()
    percent = (total / len(df)) * 100
    result = pd.DataFrame({"missing_count": total, "missing_percent": percent})
    result = result[result["missing_count"] > 0].sort_values("missing_count", ascending=False)
    return result


# ---------------------------------------------------------------------
# 3. Time-series plots
# ---------------------------------------------------------------------
def plot_sales_over_time(
    df: pd.DataFrame,
    store: Optional[int] = None,
    item: Optional[int] = None,
    sample_n: int = 5000,
):
    """
    Line plot of sales over time. Optionally filter by store and/or item.

    Parameters
    ----------
    df : pd.DataFrame
    store : int, optional
    item : int, optional
    sample_n : int
        If the filtered data is very large, limit to this many rows
        to keep plots light in Streamlit.

    Returns
    -------
    matplotlib.figure.Figure
    """
    temp = df.copy()

    if store is not None:
        temp = temp[temp["store"] == store]

    if item is not None:
        temp = temp[temp["item"] == item]

    temp = temp.sort_values("date")
    if len(temp) > sample_n:
        temp = temp.iloc[:sample_n]

    fig, ax = plt.subplots(figsize=(12, 5))
    ax.plot(temp["date"], temp["sales"], linewidth=1)
    title_parts = ["Sales Over Time"]
    if store is not None:
        title_parts.append(f"Store {store}")
    if item is not None:
        title_parts.append(f"Item {item}")
    ax.set_title(" - ".join(title_parts))
    ax.set_xlabel("Date")
    ax.set_ylabel("Sales")
    ax.grid(True)
    fig.tight_layout()
    return fig


# ---------------------------------------------------------------------
# 4. Seasonality: month and weekday
# ---------------------------------------------------------------------
def plot_monthly_seasonality(df: pd.DataFrame):
    """
    Plot average sales by calendar month.
    """
    temp = df.copy()
    temp["month"] = temp["date"].dt.month
    monthly = temp.groupby("month")["sales"].mean()

    fig, ax = plt.subplots(figsize=(8, 4))
    monthly.plot(kind="bar", ax=ax)
    ax.set_title("Average Sales by Month")
    ax.set_xlabel("Month (1–12)")
    ax.set_ylabel("Average Sales")
    fig.tight_layout()
    return fig


def plot_weekday_seasonality(df: pd.DataFrame):
    """
    Plot average sales by day of week.
    """
    temp = df.copy()
    temp["weekday"] = temp["date"].dt.dayofweek  # 0 = Monday
    weekday = temp.groupby("weekday")["sales"].mean()

    fig, ax = plt.subplots(figsize=(8, 4))
    weekday.plot(kind="bar", ax=ax)
    ax.set_title("Average Sales by Day of Week (0=Mon)")
    ax.set_xlabel("Day of Week")
    ax.set_ylabel("Average Sales")
    fig.tight_layout()
    return fig


# ---------------------------------------------------------------------
# 5. Distributions: store, item, top items
# ---------------------------------------------------------------------
def plot_store_distribution(df: pd.DataFrame):
    """
    Plot total sales per store.
    """
    store_sales = df.groupby("store")["sales"].sum().sort_index()

    fig, ax = plt.subplots(figsize=(8, 4))
    store_sales.plot(kind="bar", ax=ax)
    ax.set_title("Total Sales by Store")
    ax.set_xlabel("Store ID")
    ax.set_ylabel("Total Sales")
    fig.tight_layout()
    return fig


def plot_item_distribution(df: pd.DataFrame, top_n: int = 20):
    """
    Plot total sales for top N items.
    """
    item_sales = df.groupby("item")["sales"].sum().sort_values(ascending=False).head(top_n)

    fig, ax = plt.subplots(figsize=(10, 4))
    item_sales.plot(kind="bar", ax=ax)
    ax.set_title(f"Top {top_n} Items by Total Sales")
    ax.set_xlabel("Item ID")
    ax.set_ylabel("Total Sales")
    fig.tight_layout()
    return fig


# ---------------------------------------------------------------------
# 6. Correlation heatmap
# ---------------------------------------------------------------------
def plot_correlation_heatmap(df: pd.DataFrame):
    """
    Plot a correlation heatmap for numeric columns.
    """
    num_cols = df.select_dtypes(include=["int64", "float64"]).columns
    corr = df[num_cols].corr()

    fig, ax = plt.subplots(figsize=(6, 5))
    sns.heatmap(corr, annot=True, cmap="coolwarm", fmt=".2f", ax=ax)
    ax.set_title("Correlation Heatmap (Numeric Features)")
    fig.tight_layout()
    return fig


# ---------------------------------------------------------------------
# 7. Helper for quick sample subset (for EDA page)
# ---------------------------------------------------------------------
def get_sample_for_eda(df: pd.DataFrame, max_rows: int = 5000) -> pd.DataFrame:
    """
    Return a smaller sample of the dataset for display/preview purposes.
    """
    if len(df) > max_rows:
        return df.sample(max_rows, random_state=42).sort_values("date")
    return df.sort_values("date")

