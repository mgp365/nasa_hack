#python -m streamlit --version
#python -m streamlit run web.py

import streamlit as st
# importar de otros .py
from web2 import cargar_datos
from web3 import nosotros

def main():
    st.title("Aplicación principal")
    menu = ["Inicio", "Datos", "Conócenos"]
    choice = st.sidebar.selectbox("Menú", menu)

    if choice == "Inicio":
        st.subheader("Inicio")
    elif choice == "Datos":
        #st.subheader("Datos")
        cargar_datos()
    else:
        #st.subheader("Conócenos")
        nosotros()


main()