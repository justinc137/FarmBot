"""
Simple intent matching and response generation for AgriBot.
Replace or augment with an LLM for production.
"""

import re
from data.knowledge_base import (
    CROPS, PESTS, SOIL_TIPS, SEASONAL, MARKET_TIPS, GREETINGS, FALLBACK
)

NORTH_KEYWORDS = ["kano", "kaduna", "sokoto", "katsina", "bauchi", "borno", "yobe", "jigawa", "zamfara", "kebbi", "north", "northern"]
SOUTH_KEYWORDS = ["lagos", "oyo", "ogun", "osun", "ondo", "ekiti", "rivers", "delta", "akwa", "cross river", "edo", "bayelsa", "imo", "abia", "anambra", "enugu", "ebonyi", "south", "southern"]


def detect_region(text: str) -> str:
    t = text.lower()
    if any(k in t for k in NORTH_KEYWORDS):
        return "north"
    if any(k in t for k in SOUTH_KEYWORDS):
        return "south"
    return "general"


def find_crop(text: str):
    t = text.lower()
    for crop, data in CROPS.items():
        if crop in t or any(a in t for a in data["aliases"]):
            return crop, data
    return None, None


def find_pest(text: str):
    t = text.lower()
    for pest, data in PESTS.items():
        if pest in t or any(word in t for word in pest.split()):
            return pest, data
    # common aliases
    if "armyworm" in t or "army worm" in t:
        return "fall armyworm", PESTS["fall armyworm"]
    if "mealybug" in t or "mealy bug" in t:
        return "cassava mealybug", PESTS["cassava mealybug"]
    if "borer" in t:
        return "stem borer", PESTS["stem borer"]
    return None, None


def generate_response(user_message: str) -> str:
    text = user_message.strip().lower()

    # Greetings
    if any(g in text for g in ["hello", "hi", "hey", "good morning", "good afternoon", "good evening"]):
        return GREETINGS[0]

    # Thanks
    if any(g in text for g in ["thank", "thanks", "appreciate"]):
        return "You're welcome! Feel free to ask more farming questions anytime. Happy farming! 🌱"

    region = detect_region(text)
    crop_key, crop_data = find_crop(text)
    pest_key, pest_data = find_pest(text)

    # Pest-focused
    if pest_data and any(w in text for w in ["control", "treat", "kill", "manage", "pest", "insect", "worm", "bug", "how"]):
        lines = [
            f"**{pest_key.title()}**",
            f"\n**Signs:** {pest_data['signs']}",
            "\n**Control measures:**",
        ]
        for i, c in enumerate(pest_data["control"], 1):
            lines.append(f"{i}. {c}")
        if pest_data.get("crops"):
            lines.append(f"\n_Commonly affects: {', '.join(pest_data['crops'])}_")
        return "\n".join(lines)

    # Crop-focused intents
    if crop_data:
        # Planting / when
        if any(w in text for w in ["plant", "planting", "when", "sow", "season", "time"]):
            planting = crop_data["planting"]
            region_advice = planting.get(region, planting.get("general", ""))
            general = planting.get("general", "")
            return (
                f"**Planting {crop_key.title()}**\n\n"
                f"**Region advice ({region}):** {region_advice}\n\n"
                f"**General guidance:** {general}"
            )

        # Fertilizer
        if any(w in text for w in ["fertilizer", "fertiliser", "npk", "urea", "manure", "nutrient"]):
            return f"**Fertilizer for {crop_key.title()}**\n\n{crop_data['fertilizer']}"

        # Harvest / storage
        if any(w in text for w in ["harvest", "store", "storage", "when to harvest"]):
            return (
                f"**Harvest & Storage — {crop_key.title()}**\n\n"
                f"{crop_data['harvest']}\n\n"
                f"**Extra tip:** {crop_data['tips']}"
            )

        # Pests of this crop
        if any(w in text for w in ["pest", "disease", "problem", "attack"]):
            pests = ", ".join(crop_data.get("pests", []))
            diseases = ", ".join(crop_data.get("diseases", []))
            return (
                f"**Common issues for {crop_key.title()}**\n\n"
                f"**Pests:** {pests or 'Various'}\n"
                f"**Diseases:** {diseases or 'Various'}\n\n"
                f"Ask me specifically about any of these (e.g. “how to control fall armyworm”) for detailed advice."
            )

        # General crop overview
        return (
            f"**{crop_key.title()} — Quick Overview**\n\n"
            f"**Fertilizer:** {crop_data['fertilizer']}\n\n"
            f"**Harvest:** {crop_data['harvest']}\n\n"
            f"**Tip:** {crop_data['tips']}\n\n"
            f"You can also ask about planting time, pests, or fertilizer specifically."
        )

    # Soil
    if any(w in text for w in ["soil", "ph", "acid", "fertility", "manure", "compost", "lime"]):
        if "acid" in text or "ph" in text:
            return f"**Soil Acidity**\n\n{SOIL_TIPS['acidic']}\n\n{SOIL_TIPS['general']}"
        if "sand" in text:
            return f"**Sandy Soils**\n\n{SOIL_TIPS['sandy']}\n\n{SOIL_TIPS['general']}"
        return f"**Soil Health Tips**\n\n{SOIL_TIPS['general']}\n\n{SOIL_TIPS['fertility']}"

    # Season / weather / climate
    if any(w in text for w in ["season", "rain", "weather", "climate", "harmattan", "dry season"]):
        advice = SEASONAL.get(region, SEASONAL["general"])
        return f"**Seasonal Guidance ({region.title()})**\n\n{advice}\n\n{SEASONAL['general']}"

    # Market
    if any(w in text for w in ["market", "price", "sell", "buyer", "profit"]):
        tips = "\n".join(f"• {t}" for t in MARKET_TIPS)
        return f"**Market Tips for Farmers**\n\n{tips}"

    return FALLBACK
