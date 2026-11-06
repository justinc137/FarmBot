"""
AgriBot — AI-Powered Farming Assistant
Streamlit conversational interface.
"""

import sys
from pathlib import Path

ROOT = Path(__file__).parent.parent
sys.path.insert(0, str(ROOT))

import streamlit as st
from utils.nlp_helpers import generate_response
from data.knowledge_base import GREETINGS

st.set_page_config(
    page_title="AgriBot — Farming Assistant",
    page_icon="🌱",
    layout="centered",
    initial_sidebar_state="expanded",
)

st.markdown("""
<style>
    .stChatMessage { border-radius: 12px; }
    h1 { color: #166534 !important; }
    .suggestion-btn {
        margin: 0.25rem;
    }
</style>
""", unsafe_allow_html=True)

# Sidebar
with st.sidebar:
    st.title("🌱 AgriBot")
    st.caption("Your practical farming assistant for Nigerian agriculture")
    st.divider()
    st.markdown("### Quick Topics")
    st.markdown("""
    - Crop planting calendars  
    - Fertilizer advice  
    - Pest & disease control  
    - Soil management  
    - Harvest & storage  
    - Market tips  
    """)
    st.divider()
    st.markdown("**Crops covered:** Maize, Cassava, Rice, Yam, Tomato, Cocoa")
    if st.button("Clear conversation"):
        st.session_state.messages = []
        st.rerun()

# Session state
if "messages" not in st.session_state:
    st.session_state.messages = [
        {"role": "assistant", "content": GREETINGS[0]}
    ]

st.title("AgriBot")
st.caption("Ask me anything about farming in Nigeria")

# Suggested questions
SUGGESTIONS = [
    "When should I plant maize in Kano?",
    "How do I control fall armyworm?",
    "What fertilizer is good for cassava?",
    "Best practices for tomato in dry season?",
    "How to store yam after harvest?",
    "Soil tips for sandy land",
]

cols = st.columns(3)
for i, q in enumerate(SUGGESTIONS):
    if cols[i % 3].button(q, key=f"sug_{i}", use_container_width=True):
        st.session_state.messages.append({"role": "user", "content": q})
        response = generate_response(q)
        st.session_state.messages.append({"role": "assistant", "content": response})
        st.rerun()

st.divider()

# Display chat history
for msg in st.session_state.messages:
    with st.chat_message(msg["role"]):
        st.markdown(msg["content"])

# Chat input
if prompt := st.chat_input("Type your farming question..."):
    st.session_state.messages.append({"role": "user", "content": prompt})
    with st.chat_message("user"):
        st.markdown(prompt)

    response = generate_response(prompt)
    st.session_state.messages.append({"role": "assistant", "content": response})
    with st.chat_message("assistant"):
        st.markdown(response)
