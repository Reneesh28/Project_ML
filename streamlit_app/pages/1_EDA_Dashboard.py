import streamlit as st
from utils.eda_plots import (
    load_main_data, get_basic_info, get_summary_stats, get_missing_values,
    get_sample_for_eda, plot_sales_over_time, plot_monthly_seasonality,
    plot_weekday_seasonality, plot_store_distribution, plot_item_distribution,
    plot_correlation_heatmap
)

def main():
    st.title("📊 EDA Dashboard")
    df = load_main_data()

    st.subheader("Dataset Info")
    info = get_basic_info(df)
    st.json(info)

    st.subheader("Sample Data")
    st.dataframe(get_sample_for_eda(df))

    st.subheader("Summary Stats")
    st.dataframe(get_summary_stats(df))

    missing = get_missing_values(df)
    if not missing.empty:
        st.subheader("Missing Values")
        st.dataframe(missing)

    st.subheader("Sales Over Time")
    st.pyplot(plot_sales_over_time(df))

    st.subheader("Seasonality")
    st.pyplot(plot_monthly_seasonality(df))
    st.pyplot(plot_weekday_seasonality(df))

    st.subheader("Store Distribution")
    st.pyplot(plot_store_distribution(df))

    st.subheader("Item Distribution")
    st.pyplot(plot_item_distribution(df))

    st.subheader("Correlation")
    st.pyplot(plot_correlation_heatmap(df))
