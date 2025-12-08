import streamlit as st
import importlib


# Page Configuration

st.set_page_config(
    page_title="Demand Forecasting App",
    page_icon="📈",
    layout="wide"
)


# Sidebar Navigation

st.sidebar.title("📂 Navigation")

page = st.sidebar.radio(
    "Go to:",
    [
        "🏠 Home",
        "📊 EDA Dashboard",
        "🔮 Single-Day Prediction",
        "📈 Forecasting",
        "📏 Model Evaluation"
    ]
)

# Dynamic Page Loader
def load_page(module_name):
    module = importlib.import_module(module_name)
    module.main()



# Page Routing

if page == "🏠 Home":
    st.title("📈 Store Item Demand Forecasting App")

elif page == "📊 EDA Dashboard":
    load_page("pages.1_EDA_Dashboard")

elif page == "🔮 Single-Day Prediction":
    load_page("pages.2_Predict_Sales")

elif page == "📈 Forecasting":
    load_page("pages.3_Forecasting")

elif page == "📏 Model Evaluation":
    load_page("pages.4_model_evaluation")
