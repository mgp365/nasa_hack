#python -m streamlit --version
#python -m streamlit run web.py

import streamlit as st
import pandas as pd
from PIL import Image

def nosotros():
    st.title("Conócenos")
    img = Image.open("imagen.jpg")
    st.image(img, use_container_width=True)
    
nosotros()