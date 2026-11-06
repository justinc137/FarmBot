export interface CropData {
  name: string
  aliases: string[]
  planting: {
    north?: string
    south?: string
    general: string
  }
  fertilizer: string
  pests: string[]
  diseases: string[]
  harvest: string
  tips: string
}

export interface PestData {
  name: string
  crops: string[]
  signs: string
  control: string[]
}

export const CROPS: Record<string, CropData> = {
  maize: {
    name: "Maize (Corn / Agbado)",
    aliases: ["corn", "maize", "agbado"],
    planting: {
      north: "Plant with the onset of rains (May–June). Use improved varieties like SAMMAZ series.",
      south: "Can plant early (March–April) and late season (August–September) in many areas.",
      general: "Spacing: 75 cm between rows, 25 cm between plants. Seed rate ~20–25 kg/ha.",
    },
    fertilizer: "Apply NPK 15:15:15 at planting (200–300 kg/ha). Top-dress with Urea 4–6 weeks after planting.",
    pests: ["Fall armyworm", "Stem borers", "Aphids"],
    diseases: ["Maize streak virus", "Downy mildew", "Leaf blight"],
    harvest: "Harvest when grains are hard and moisture is around 20–25%. Dry further to 12–14% for storage.",
    tips: "Rotate with legumes. Avoid continuous maize on the same plot to reduce pest build-up.",
  },
  cassava: {
    name: "Cassava (Garri / Ege)",
    aliases: ["cassava", "garri", "tapioca", "ege"],
    planting: {
      north: "Plant at the beginning of the rainy season (May–June).",
      south: "Can be planted almost year-round where rainfall is adequate; best March–May or Aug–Oct.",
      general: "Use healthy stem cuttings 20–25 cm long. Plant at 45° angle. Spacing 1 m × 1 m.",
    },
    fertilizer: "Responds well to NPK 15:15:15 (200–400 kg/ha) depending on soil. Organic manure improves yields significantly.",
    pests: ["Cassava mealybug", "Green mite", "Whiteflies"],
    diseases: ["Cassava mosaic disease (CMD)", "Cassava bacterial blight", "Root rot"],
    harvest: "Most varieties ready in 8–12 months. Some improved varieties earlier. Harvest when leaves yellow and drop.",
    tips: "Use resistant varieties against mosaic disease. Intercrop with maize or legumes in first few months.",
  },
  rice: {
    name: "Rice (Paddy / Ofada)",
    aliases: ["rice", "paddy", "ofada"],
    planting: {
      north: "Transplant or direct seed with rains (June–July). Fadama / irrigation allows dry-season production.",
      south: "Two seasons possible in many areas. Upland rice with rains; lowland with water control.",
      general: "For transplanting: raise nursery, transplant 21–30 day old seedlings at 20×20 cm.",
    },
    fertilizer: "Basal NPK + top-dress Urea. Typical recommendation: 60–80 kg N, 30–40 kg P₂O₅, 30–40 kg K₂O per ha.",
    pests: ["Rice stem borer", "Birds", "Rats"],
    diseases: ["Rice blast", "Brown spot", "Bacterial leaf blight"],
    harvest: "When 80–85% of grains are straw-colored. Moisture ideally 20–25% at harvest, dry to 14%.",
    tips: "Good water management is critical for lowland rice. Use certified seed of improved varieties (FARO series).",
  },
  yam: {
    name: "Yam (Isu)",
    aliases: ["yam", "isu"],
    planting: {
      north: "Plant February–April depending on rains and location.",
      south: "Typically November–March (dry season planting with residual moisture or early rains).",
      general: "Use healthy setts 200–500 g. Plant on mounds or ridges. Spacing ~1 m × 1 m.",
    },
    fertilizer: "Responds to organic manure and NPK. Apply manure in the mound and NPK around the plant after sprouting.",
    pests: ["Yam beetles", "Nematodes", "Mealybugs"],
    diseases: ["Yam mosaic virus", "Anthracnose", "Dry rot (storage)"],
    harvest: "Most varieties 8–11 months. Harvest carefully to avoid bruising. Cure before storage.",
    tips: "Stake vines for better yields. Store in cool, well-ventilated barns. Avoid harvesting when soil is waterlogged.",
  },
  tomato: {
    name: "Tomato (Tomatoes)",
    aliases: ["tomato", "tomatoes"],
    planting: {
      north: "Dry season under irrigation is most profitable (Oct–March). Rainy season has high disease pressure.",
      south: "Can grow year-round with good management; peak markets often in dry season.",
      general: "Raise seedlings in nursery 3–4 weeks. Transplant to field at 60×45 cm or similar.",
    },
    fertilizer: "NPK + organic matter. High demand for potassium for fruit quality. Foliar feeds can help during fruiting.",
    pests: ["Fruit worm / Helicoverpa", "Whiteflies", "Aphids", "Thrips"],
    diseases: ["Early & late blight", "Fusarium wilt", "Bacterial wilt", "Tomato mosaic virus"],
    harvest: "Pick at breaker or pink stage for distant markets; fully ripe for local fresh market. Harvest frequently.",
    tips: "Use stakes or cages. Mulch to reduce soil-borne disease splash. Choose resistant varieties where available.",
  },
  cocoa: {
    name: "Cocoa (Cacao)",
    aliases: ["cocoa", "cacao"],
    planting: {
      south: "Best in humid forest zones (Southwest & South-South). Plant at start of rains.",
      general: "Shade is important for young plants. Spacing typically 3 m × 3 m. Use improved hybrids.",
    },
    fertilizer: "Responds to balanced NPK and organic mulch. Soil testing recommended for mature plantations.",
    pests: ["Cocoa mirids (capsids)", "Stem borers", "Pod borers"],
    diseases: ["Black pod disease", "Cocoa swollen shoot virus", "Witches' broom (less common in Nigeria)"],
    harvest: "Pods mature in 5–6 months. Harvest every 2–4 weeks in peak season. Ferment and dry properly.",
    tips: "Regular pruning and shade management. Early removal of diseased pods reduces black pod spread.",
  },
}

export const PESTS: Record<string, PestData> = {
  "fall armyworm": {
    name: "Fall Armyworm",
    crops: ["maize", "sorghum", "rice"],
    signs: "Larvae feed on leaves creating window panes and later deep holes. Frass visible in leaf whorls. Can destroy growing point.",
    control: [
      "Scout fields early (2–3 times/week in first 4–6 weeks).",
      "Hand-pick or crush egg masses and young larvae when infestation is low.",
      "Use recommended insecticides (e.g., emamectin benzoate, chlorantraniliprole) following label rates — rotate modes of action.",
      "Encourage natural enemies; avoid broad-spectrum sprays that kill beneficials.",
      "Plant early and maintain good plant vigor.",
    ],
  },
  "cassava mealybug": {
    name: "Cassava Mealybug",
    crops: ["cassava"],
    signs: "White waxy insects on stems and leaves; stunted growth, distorted leaves, reduced yield.",
    control: [
      "Use clean planting material from healthy fields.",
      "Encourage natural enemies (parasitic wasps have been successfully released in Africa).",
      "Avoid excessive nitrogen which can worsen infestations.",
      "In severe cases, contact local extension for approved treatments.",
    ],
  },
  "stem borer": {
    name: "Stem Borer",
    crops: ["maize", "rice", "sorghum"],
    signs: "Holes in stems, dead hearts in young plants, broken stems, frass.",
    control: [
      "Destroy crop residues after harvest.",
      "Early planting can help escape peak pest periods.",
      "Use resistant or tolerant varieties where available.",
      "Targeted insecticide application if economic threshold is reached.",
    ],
  },
}

export const SOIL_TIPS = {
  general: "Most Nigerian soils benefit from organic matter (compost, manure, crop residues). Test soil every 2–3 years if possible.",
  acidic: "Many southern soils are acidic. Lime (agricultural lime) can raise pH. Cassava and some crops tolerate lower pH better than maize or legumes.",
  sandy: "Common in the North. Low water and nutrient holding. Add organic matter, mulch, and consider split fertilizer applications.",
  fertility: "NPK alone is not enough long-term. Integrate organic inputs and legume rotations to rebuild soil health.",
}

export const SEASONAL = {
  north: "Main rainy season roughly May/June – September/October. Harmattan dry season November–March. Irrigation (fadama) enables dry-season production of vegetables and some cereals.",
  south: "Bimodal rainfall in many areas (March–July and September–November) with a short dry spell in August. Longer growing season allows multiple plantings.",
  general: "Always watch local rainfall onset rather than calendar dates alone. Climate variability is increasing — diversify crops and consider early-maturing varieties.",
}

export const MARKET_TIPS = [
  "Know your local market days and major wholesale markets (e.g., Dawanau in Kano, Mile 12 in Lagos, Bodija in Ibadan).",
  "Harvest and transport early in the morning for perishable produce to reduce losses.",
  "Sort and grade produce — higher quality often fetches better prices.",
  "Consider simple value addition (drying, processing into garri, oil, etc.) to reduce post-harvest loss and stabilize income.",
  "Join a cooperative or farmer group for better bargaining power and access to information.",
]

export const GREETINGS = [
  "Hello! I'm AgriBot, your farming assistant. Ask me about crops, pests, soil, planting times, or market tips.",
  "Welcome! I can help with practical advice for maize, cassava, rice, yam, tomato, cocoa and more. What would you like to know?",
]

export const FALLBACK = `I'm not sure I fully understood that. You can ask me about:
• Planting times for specific crops and regions
• Fertilizer recommendations
• Pest and disease identification & control
• Soil management tips
• Harvest and storage advice
• General market tips

Try rephrasing or pick one of the suggested questions below.`

const NORTH_KEYWORDS = ["kano", "kaduna", "sokoto", "katsina", "bauchi", "borno", "yobe", "jigawa", "zamfara", "kebbi", "north", "northern"]
const SOUTH_KEYWORDS = ["lagos", "oyo", "ogun", "osun", "ondo", "ekiti", "rivers", "delta", "akwa", "cross river", "edo", "bayelsa", "imo", "abia", "anambra", "enugu", "ebonyi", "south", "southern"]

export function detectRegion(text: string): "north" | "south" | "general" {
  const t = text.toLowerCase()
  if (NORTH_KEYWORDS.some((k) => t.includes(k))) return "north"
  if (SOUTH_KEYWORDS.some((k) => t.includes(k))) return "south"
  return "general"
}

export function findCrop(text: string): [string, CropData] | [null, null] {
  const t = text.toLowerCase()
  for (const [crop, data] of Object.entries(CROPS)) {
    if (t.includes(crop) || data.aliases.some((a) => t.includes(a))) {
      return [crop, data]
    }
  }
  return [null, null]
}

export function findPest(text: string): [string, PestData] | [null, null] {
  const t = text.toLowerCase()
  for (const [pest, data] of Object.entries(PESTS)) {
    if (t.includes(pest) || pest.split(" ").every((word) => t.includes(word))) {
      return [pest, data]
    }
  }
  if (t.includes("armyworm") || t.includes("army worm")) return ["fall armyworm", PESTS["fall armyworm"]]
  if (t.includes("mealybug") || t.includes("mealy bug")) return ["cassava mealybug", PESTS["cassava mealybug"]]
  if (t.includes("borer")) return ["stem borer", PESTS["stem borer"]]
  return [null, null]
}

export function generateRuleBasedResponse(userMessage: string): { response: string; matchedCrop?: string; matchedPest?: string } {
  const text = userMessage.trim().toLowerCase()

  // Greetings
  if (["hello", "hi", "hey", "good morning", "good afternoon", "good evening"].some((g) => text.includes(g))) {
    return { response: GREETINGS[0] }
  }

  // Thanks
  if (["thank", "thanks", "appreciate"].some((g) => text.includes(g))) {
    return { response: "You're welcome! Feel free to ask more farming questions anytime. Happy farming! 🌱" }
  }

  const region = detectRegion(text)
  const [cropKey, cropData] = findCrop(text)
  const [pestKey, pestData] = findPest(text)

  // Pest-focused
  if (pestData && ["control", "treat", "kill", "manage", "pest", "insect", "worm", "bug", "how", "signs", "disease"].some((w) => text.includes(w))) {
    const lines = [
      `### ${pestData.name}`,
      `**Signs of Damage:** ${pestData.signs}`,
      `\n**Recommended Control Measures:**`,
      ...pestData.control.map((c, i) => `${i + 1}. ${c}`),
    ]
    if (pestData.crops?.length) {
      lines.push(`\n*Commonly affects:* ${pestData.crops.map((c) => c.charAt(0).toUpperCase() + c.slice(1)).join(", ")}`)
    }
    return { response: lines.join("\n"), matchedPest: pestKey }
  }

  // Crop-focused intents
  if (cropData) {
    // Planting / when
    if (["plant", "planting", "when", "sow", "season", "time", "date"].some((w) => text.includes(w))) {
      const planting = cropData.planting
      const regionAdvice = (planting as Record<string, string>)[region] || planting.general
      const regionLabel = region === "north" ? "Northern Region (Kano, Kaduna, etc.)" : region === "south" ? "Southern Region (Lagos, Oyo, etc.)" : "General Guidelines"
      return {
        response: [
          `### Planting Guide: ${cropData.name}`,
          `**${regionLabel} Advice:**`,
          `${regionAdvice}`,
          `\n**General Spacing & Seed Rate:**`,
          `${planting.general}`,
        ].join("\n\n"),
        matchedCrop: cropKey,
      }
    }

    // Fertilizer
    if (["fertilizer", "fertiliser", "npk", "urea", "manure", "nutrient", "feed"].some((w) => text.includes(w))) {
      return {
        response: [
          `### Fertilizer Recommendations: ${cropData.name}`,
          `${cropData.fertilizer}`,
          `\n💡 **Field Tip:** Combine with composted manure or legumes rotation for sustained soil fertility.`,
        ].join("\n"),
        matchedCrop: cropKey,
      }
    }

    // Harvest / storage
    if (["harvest", "store", "storage", "when to harvest", "drying", "preserve"].some((w) => text.includes(w))) {
      return {
        response: [
          `### Harvest & Storage: ${cropData.name}`,
          `${cropData.harvest}`,
          `\n**Pro Management Tip:**`,
          `${cropData.tips}`,
        ].join("\n\n"),
        matchedCrop: cropKey,
      }
    }

    // Pests of this crop
    if (["pest", "disease", "problem", "attack", "sick", "infection"].some((w) => text.includes(w))) {
      const pests = cropData.pests.join(", ")
      const diseases = cropData.diseases.join(", ")
      return {
        response: [
          `### Common Pests & Diseases: ${cropData.name}`,
          `**Common Pests:** ${pests || "None recorded"}`,
          `**Major Diseases:** ${diseases || "None recorded"}`,
          `\nAsk specifically about any of these (e.g. *"how to control fall armyworm"*) for step-by-step diagnostic and control advice.`,
        ].join("\n\n"),
        matchedCrop: cropKey,
      }
    }

    // General crop overview
    return {
      response: [
        `### ${cropData.name} — Quick Overview`,
        `**Fertilizer:** ${cropData.fertilizer}`,
        `**Harvest:** ${cropData.harvest}`,
        `**Agronomic Tip:** ${cropData.tips}`,
        `\nYou can also ask me specifically about planting season, fertilizer scheduling, or pest defense for ${cropData.name}.`,
      ].join("\n\n"),
      matchedCrop: cropKey,
    }
  }

  // Soil
  if (["soil", "ph", "acid", "fertility", "manure", "compost", "lime", "sandy", "clay"].some((w) => text.includes(w))) {
    if (text.includes("acid") || text.includes("ph") || text.includes("lime")) {
      return {
        response: `### Managing Acidic Soils\n\n${SOIL_TIPS.acidic}\n\n**General Maintenance:**\n${SOIL_TIPS.general}`,
      }
    }
    if (text.includes("sand")) {
      return {
        response: `### Farming in Sandy Soils\n\n${SOIL_TIPS.sandy}\n\n**General Maintenance:**\n${SOIL_TIPS.general}`,
      }
    }
    return {
      response: `### Nigerian Soil Health & Fertility\n\n${SOIL_TIPS.general}\n\n**Fertility Strategy:**\n${SOIL_TIPS.fertility}`,
    }
  }

  // Season / weather / climate
  if (["season", "rain", "weather", "climate", "harmattan", "dry season", "planting season"].some((w) => text.includes(w))) {
    const advice = (SEASONAL as Record<string, string>)[region] || SEASONAL.general
    const regionName = region.charAt(0).toUpperCase() + region.slice(1)
    return {
      response: `### Seasonal Weather Guidance (${regionName} Zone)\n\n${advice}\n\n**Key Rule of Thumb:**\n${SEASONAL.general}`,
    }
  }

  // Market
  if (["market", "price", "sell", "buyer", "profit", "trade", "dawanau", "mile 12", "bodija"].some((w) => text.includes(w))) {
    const tips = MARKET_TIPS.map((t) => `• ${t}`).join("\n")
    return {
      response: `### Commercial & Market Tips for Nigerian Farmers\n\n${tips}`,
    }
  }

  return { response: FALLBACK }
}
