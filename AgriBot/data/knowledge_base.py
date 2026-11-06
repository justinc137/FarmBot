"""
AgriBot Knowledge Base — Practical farming knowledge tailored for Nigerian conditions.
"""

CROPS = {
    "maize": {
        "aliases": ["corn", "maize", "agbado"],
        "planting": {
            "north": "Plant with the onset of rains (May–June). Use improved varieties like SAMMAZ series.",
            "south": "Can plant early (March–April) and late season (August–September) in many areas.",
            "general": "Spacing: 75 cm between rows, 25 cm between plants. Seed rate ~20–25 kg/ha.",
        },
        "fertilizer": "Apply NPK 15:15:15 at planting (200–300 kg/ha). Top-dress with Urea 4–6 weeks after planting.",
        "pests": ["Fall armyworm", "Stem borers", "Aphids"],
        "diseases": ["Maize streak virus", "Downy mildew", "Leaf blight"],
        "harvest": "Harvest when grains are hard and moisture is around 20–25%. Dry further to 12–14% for storage.",
        "tips": "Rotate with legumes. Avoid continuous maize on the same plot to reduce pest build-up.",
    },
    "cassava": {
        "aliases": ["cassava", "garri", "tapioca", "ege"],
        "planting": {
            "north": "Plant at the beginning of the rainy season (May–June).",
            "south": "Can be planted almost year-round where rainfall is adequate; best March–May or Aug–Oct.",
            "general": "Use healthy stem cuttings 20–25 cm long. Plant at 45° angle. Spacing 1 m × 1 m.",
        },
        "fertilizer": "Responds well to NPK 15:15:15 (200–400 kg/ha) depending on soil. Organic manure improves yields significantly.",
        "pests": ["Cassava mealybug", "Green mite", "Whiteflies"],
        "diseases": ["Cassava mosaic disease (CMD)", "Cassava bacterial blight", "Root rot"],
        "harvest": "Most varieties ready in 8–12 months. Some improved varieties earlier. Harvest when leaves yellow and drop.",
        "tips": "Use resistant varieties against mosaic disease. Intercrop with maize or legumes in first few months.",
    },
    "rice": {
        "aliases": ["rice", "paddy", "ofada"],
        "planting": {
            "north": "Transplant or direct seed with rains (June–July). Fadama / irrigation allows dry-season production.",
            "south": "Two seasons possible in many areas. Upland rice with rains; lowland with water control.",
            "general": "For transplanting: raise nursery, transplant 21–30 day old seedlings at 20×20 cm.",
        },
        "fertilizer": "Basal NPK + top-dress Urea. Typical recommendation: 60–80 kg N, 30–40 kg P₂O₅, 30–40 kg K₂O per ha.",
        "pests": ["Rice stem borer", "Birds", "Rats"],
        "diseases": ["Rice blast", "Brown spot", "Bacterial leaf blight"],
        "harvest": "When 80–85% of grains are straw-colored. Moisture ideally 20–25% at harvest, dry to 14%.",
        "tips": "Good water management is critical for lowland rice. Use certified seed of improved varieties (FARO series).",
    },
    "yam": {
        "aliases": ["yam", "isu"],
        "planting": {
            "north": "Plant February–April depending on rains and location.",
            "south": "Typically November–March (dry season planting with residual moisture or early rains).",
            "general": "Use healthy setts 200–500 g. Plant on mounds or ridges. Spacing ~1 m × 1 m.",
        },
        "fertilizer": "Responds to organic manure and NPK. Apply manure in the mound and NPK around the plant after sprouting.",
        "pests": ["Yam beetles", "Nematodes", "Mealybugs"],
        "diseases": ["Yam mosaic virus", "Anthracnose", "Dry rot (storage)"],
        "harvest": "Most varieties 8–11 months. Harvest carefully to avoid bruising. Cure before storage.",
        "tips": "Stake vines for better yields. Store in cool, well-ventilated barns. Avoid harvesting when soil is waterlogged.",
    },
    "tomato": {
        "aliases": ["tomato", "tomatoes"],
        "planting": {
            "north": "Dry season under irrigation is most profitable (Oct–March). Rainy season has high disease pressure.",
            "south": "Can grow year-round with good management; peak markets often in dry season.",
            "general": "Raise seedlings in nursery 3–4 weeks. Transplant to field at 60×45 cm or similar.",
        },
        "fertilizer": "NPK + organic matter. High demand for potassium for fruit quality. Foliar feeds can help during fruiting.",
        "pests": ["Fruit worm / Helicoverpa", "Whiteflies", "Aphids", "Thrips"],
        "diseases": ["Early & late blight", "Fusarium wilt", "Bacterial wilt", "Tomato mosaic virus"],
        "harvest": "Pick at breaker or pink stage for distant markets; fully ripe for local fresh market. Harvest frequently.",
        "tips": "Use stakes or cages. Mulch to reduce soil-borne disease splash. Choose resistant varieties where available.",
    },
    "cocoa": {
        "aliases": ["cocoa", "cacao"],
        "planting": {
            "south": "Best in humid forest zones (Southwest & South-South). Plant at start of rains.",
            "general": "Shade is important for young plants. Spacing typically 3 m × 3 m. Use improved hybrids.",
        },
        "fertilizer": "Responds to balanced NPK and organic mulch. Soil testing recommended for mature plantations.",
        "pests": ["Cocoa mirids (capsids)", "Stem borers", "Pod borers"],
        "diseases": ["Black pod disease", "Cocoa swollen shoot virus", "Witches' broom (less common in Nigeria)"],
        "harvest": "Pods mature in 5–6 months. Harvest every 2–4 weeks in peak season. Ferment and dry properly.",
        "tips": "Regular pruning and shade management. Early removal of diseased pods reduces black pod spread.",
    },
}

PESTS = {
    "fall armyworm": {
        "crops": ["maize", "sorghum", "rice"],
        "signs": "Larvae feed on leaves creating window panes and later deep holes. Frass visible in leaf whorls. Can destroy growing point.",
        "control": [
            "Scout fields early (2–3 times/week in first 4–6 weeks).",
            "Hand-pick or crush egg masses and young larvae when infestation is low.",
            "Use recommended insecticides (e.g., emamectin benzoate, chlorantraniliprole) following label rates — rotate modes of action.",
            "Encourage natural enemies; avoid broad-spectrum sprays that kill beneficials.",
            "Plant early and maintain good plant vigor.",
        ],
    },
    "cassava mealybug": {
        "crops": ["cassava"],
        "signs": "White waxy insects on stems and leaves; stunted growth, distorted leaves, reduced yield.",
        "control": [
            "Use clean planting material from healthy fields.",
            "Encourage natural enemies (parasitic wasps have been successfully released in Africa).",
            "Avoid excessive nitrogen which can worsen infestations.",
            "In severe cases, contact local extension for approved treatments.",
        ],
    },
    "stem borer": {
        "crops": ["maize", "rice", "sorghum"],
        "signs": "Holes in stems, dead hearts in young plants, broken stems, frass.",
        "control": [
            "Destroy crop residues after harvest.",
            "Early planting can help escape peak pest periods.",
            "Use resistant or tolerant varieties where available.",
            "Targeted insecticide application if economic threshold is reached.",
        ],
    },
}

SOIL_TIPS = {
    "general": "Most Nigerian soils benefit from organic matter (compost, manure, crop residues). Test soil every 2–3 years if possible.",
    "acidic": "Many southern soils are acidic. Lime (agricultural lime) can raise pH. Cassava and some crops tolerate lower pH better than maize or legumes.",
    "sandy": "Common in the North. Low water and nutrient holding. Add organic matter, mulch, and consider split fertilizer applications.",
    "fertility": "NPK alone is not enough long-term. Integrate organic inputs and legume rotations to rebuild soil health.",
}

SEASONAL = {
    "north": "Main rainy season roughly May/June – September/October. Harmattan dry season November–March. Irrigation (fadama) enables dry-season production of vegetables and some cereals.",
    "south": "Bimodal rainfall in many areas (March–July and September–November) with a short dry spell in August. Longer growing season allows multiple plantings.",
    "general": "Always watch local rainfall onset rather than calendar dates alone. Climate variability is increasing — diversify crops and consider early-maturing varieties.",
}

MARKET_TIPS = [
    "Know your local market days and major wholesale markets (e.g., Dawanau in Kano, Mile 12 in Lagos, Bodija in Ibadan).",
    "Harvest and transport early in the morning for perishable produce to reduce losses.",
    "Sort and grade produce — higher quality often fetches better prices.",
    "Consider simple value addition (drying, processing into garri, oil, etc.) to reduce post-harvest loss and stabilize income.",
    "Join a cooperative or farmer group for better bargaining power and access to information.",
]

GREETINGS = [
    "Hello! I'm AgriBot, your farming assistant. Ask me about crops, pests, soil, planting times, or market tips.",
    "Welcome! I can help with practical advice for maize, cassava, rice, yam, tomato, cocoa and more. What would you like to know?",
]

FALLBACK = (
    "I'm not sure I fully understood that. You can ask me about:\n"
    "• Planting times for specific crops and regions\n"
    "• Fertilizer recommendations\n"
    "• Pest and disease identification & control\n"
    "• Soil management tips\n"
    "• Harvest and storage advice\n"
    "• General market tips\n\n"
    "Try rephrasing or pick one of the suggested questions below."
)
