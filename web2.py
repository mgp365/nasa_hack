#python -m streamlit --version
#python -m streamlit run web2.py

import streamlit as st
import pandas as pd

def cargar_datos():
    st.subheader("Datos de la NASA")
    df = pd.read_csv("koi.csv")
    st.dataframe(df)

cargar_datos()