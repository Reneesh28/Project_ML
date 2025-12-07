import streamlit as st
from utils.model_utils import load_model, predict_demand

def main():
    st.title("🔮 Predict Sales")

    model = load_model()

    store = st.number_input("Store ID", min_value=1, max_value=10, value=1)
    item = st.number_input("Item ID", min_value=1, max_value=50, value=1)
    date = st.date_input("Select Date")

    if st.button("Predict"):
        pred = predict_demand(model, store, item, str(date))
        st.success(f"Predicted Sales: {pred}")
