/**
 * AgriBot Knowledge Base for Client-Side Zero-Latency Offline/Online Matching
 */
export const CROPS = {
  maize: {
    id: "maize",
    name: "Maize (Corn / Agbado)",
    icon: "🌽",
    aliases: ["corn", "maize", "agbado"],
    planting: {
      north: "Plant with the onset of rains (May–June). In the dry Savannah, use early-maturing varieties like the SAMMAZ series to beat short rainy seasons.",
      south: "Bimodal rainfall allows early planting (March–April) and late-season planting (August–September) in many Southern states.",
      general: "Recommended spacing: 75 cm between rows, 25 cm between plants on the ridge (1 plant/stand) or 50 cm for 2 plants/stand. Seed rate is roughly 20–25 kg/ha.",
    },
    fertilizer: "Apply NPK 15:15:15 at planting or 10–14 days after emergence (200–300 kg/ha or 4–6 bags/ha). Top-dress with Urea (100 kg/ha) at 4–6 weeks after planting during rapid vegetative growth.",
    pests: ["Fall armyworm", "Stem borers", "Aphids"],
    diseases: ["Maize streak virus", "Downy mildew", "Leaf blight"],
    harvest: "Harvest when grains are dented and hard, silk is completely brown, and black layer forms at kernel base (moisture 20–25%). Dry further to 12–14% moisture before bagging to prevent aflatoxin.",
    tips: "Rotate with cowpea, soybean, or groundnut. Never grow continuous maize on the same plot for consecutive seasons to prevent pest buildup.",
  },
  cassava: {
    id: "cassava",
    name: "Cassava (Garri / Ege)",
    icon: "🍠",
    aliases: ["cassava", "garri", "tapioca", "ege"],
    planting: {
      north: "Plant at the beginning of the rainy season (May–June) when soil moisture is established.",
      south: "Can be planted almost year-round where rainfall is adequate; peak planting is March–May or August–October.",
      general: "Use certified disease-free stem cuttings 20–25 cm long with 5–7 nodes. Plant inclined at a 45° angle or horizontally on ridges. Standard spacing is 1 m × 1 m (10,000 stands/ha).",
    },
    fertilizer: "Responds well to NPK 15:15:15 (200–400 kg/ha) applied 4–8 weeks after planting in a ring 15–20 cm around the base. Well-cured poultry manure significantly boosts tuber bulking.",
    pests: ["Cassava mealybug", "Green mite", "Whiteflies (vector for CMD)"],
    diseases: ["Cassava mosaic disease (CMD)", "Cassava bacterial blight", "Root rot"],
    harvest: "Most improved varieties (IITA TME series) mature in 8–12 months. Signs include leaf yellowing and shedding. Harvest tubers carefully to prevent breakage and process into garri, fufu, or flour within 48 hours.",
    tips: "Select CMD-resistant varieties. Intercrop with maize, cowpea, or melon in the first 3 months to maximize early land utilization and suppress weeds.",
  },
  rice: {
    id: "rice",
    name: "Rice (Paddy / Ofada)",
    icon: "🌾",
    aliases: ["rice", "paddy", "ofada"],
    planting: {
      north: "Direct seed or transplant with the main rains (June–July). Under irrigation (Fadama plains), dry-season planting from November–January yields excellent results.",
      south: "Two seasons possible: upland rice with early rains (April–May) and lowland rice planted in swampy basins or irrigated plots.",
      general: "For transplanted lowland rice: raise nursery for 21–25 days, then transplant 2–3 seedlings per hill at 20 cm × 20 cm. For upland: drill or dibble at 20 cm × 20 cm at 50–60 kg seed/ha.",
    },
    fertilizer: "Basal application of NPK 15:15:15 (200 kg/ha) at harrowing or transplanting. Top-dress with Urea in split doses: 1st at 3 weeks after transplanting and 2nd at panicle initiation (6–7 weeks).",
    pests: ["Rice stem borer", "Birds (weaver birds)", "Rats & rodents"],
    diseases: ["Rice blast (Magnaporthe)", "Brown spot", "Bacterial leaf blight"],
    harvest: "Harvest when 80–85% of grains on the panicle turn straw-colored/golden. Grain moisture is around 20–25% at harvest; dry immediately on clean tarpaulins to 14% for milling.",
    tips: "Proper water management is the #1 factor in lowland rice yields. Use FARO varieties (FARO 44, FARO 52/WITA 4, FARO 60) for proven drought or submergence tolerance.",
  },
  yam: {
    id: "yam",
    name: "Yam (White / Yellow / Isu)",
    icon: "🥔",
    aliases: ["yam", "isu"],
    planting: {
      north: "Plant February–April depending on early rainfall and residual valley moisture.",
      south: "Plant November–March (early dry-season planting covered with mulch to break dormancy) or with early rains in March.",
      general: "Prepare prominent mounds or high ridges 1 m apart. Use healthy, unblemished seed setts of 200–500 g treated with wood ash or fungicide. Spacing is 1 m × 1 m.",
    },
    fertilizer: "Heavy feeder of potassium and organic matter. Apply well-decomposed farmyard manure into the mound during preparation, followed by NPK 12:12:17 or 15:15:15 (200 kg/ha) 8–10 weeks after sprouting.",
    pests: ["Yam beetles", "Root-knot nematodes", "Scale insects"],
    diseases: ["Yam mosaic virus", "Anthracnose (dieback)", "Storage dry rot"],
    harvest: "Matures in 8–11 months when foliage turns yellow and dies down. Dig tubers with wooden or blunt tools to avoid wounding. Cure in shade for 3–5 days before storage in aerated yam barns.",
    tips: "Staking vines with sturdy bamboo or sticks (2–3 m tall) increases sunlight interception and can double tuber yield. Mulch mound tops with dry grass immediately after planting.",
  },
  tomato: {
    id: "tomato",
    name: "Tomato (Tomatoes)",
    icon: "🍅",
    aliases: ["tomato", "tomatoes"],
    planting: {
      north: "Dry-season production under furrow or drip irrigation (October–March) is most profitable. Rainy-season tomato experiences severe fungal blight.",
      south: "Can be grown year-round, but dry season with supplemental watering fetches 2–3x higher market prices due to supply scarcity.",
      general: "Nursery seedlings for 3–4 weeks until they have 4–5 true leaves. Harden seedlings before transplanting late in the afternoon at 60 cm between rows and 45 cm between plants.",
    },
    fertilizer: "Apply basal NPK 15:15:15 or poultry manure at bed preparation. Switch to high-potassium soluble fertilizer (NPK 12:12:28 or calcium nitrate) during flowering and fruit development.",
    pests: ["Fruit borer / Helicoverpa", "Whiteflies", "Aphids", "Thrips"],
    diseases: ["Early & late blight", "Bacterial wilt", "Fusarium wilt", "Tomato leaf curl virus"],
    harvest: "For distant markets (e.g. shipping from Kano to Lagos), harvest at the 'breaker' stage (first pink blush). For local sales, harvest when evenly red-ripe.",
    tips: "Stake indeterminate plants and mulch beds with straw or plastic to prevent rain splash from spreading soil-borne blight pathogens.",
  },
  cocoa: {
    id: "cocoa",
    name: "Cocoa (Cacao / Tree Crop)",
    icon: "🍫",
    aliases: ["cocoa", "cacao"],
    planting: {
      north: "Not suitable for the arid North; requires humid rainforest and deep organic soils.",
      south: "Best in the rainforest and humid forest zones of Ondo, Osun, Cross River, Edo, Oyo, and Ogun. Plant out seedlings at the onset of rains (May–June).",
      general: "Provide temporary nurse shade (plantain or banana) for young seedlings in years 1–3. Permanent spacing is 3 m × 3 m (approx. 1,111 trees/ha). Use CRIN improved TC hybrid pods.",
    },
    fertilizer: "For mature groves, apply balanced cocoa fertilizer (such as NPK 0:20:20 or customized cocoa blends with zinc and boron) at 300–400 kg/ha in split applications at rainy season onset and mid-season.",
    pests: ["Cocoa mirids (capsids)", "Stem borers", "Pod borers"],
    diseases: ["Black pod disease (Phytophthora)", "Cocoa swollen shoot virus"],
    harvest: "Pods mature 5–6 months after flowering when color turns from green to golden yellow or orange. Cut pods carefully from cushion with harvesting knife. Ferment beans under banana leaves for 5–7 days, then sun-dry on raised mats.",
    tips: "Prune canopy regularly to allow ventilation and light. Prompt removal of diseased pods prevents Phytophthora black pod spores from washing over healthy lower pods.",
  },
}

export const PESTS = {
  "fall armyworm": {
    id: "fall-armyworm",
    name: "Fall Armyworm (Spodoptera frugiperda)",
    icon: "🐛",
    crops: ["Maize", "Sorghum", "Rice", "Millet"],
    signs: "Caterpillars feed inside the leaf whorl, causing characteristic 'window-pane' translucent spots that develop into ragged holes and heavy sawdust-like frass (droppings). In severe cases, the central growing point is killed ('dead heart').",
    organicControl: [
      "Intercrop maize with silverleaf desmodium and plant Napier grass along field borders ('Push-Pull' technology).",
      "Pour a pinch of clean dry wood ash or sand mixed with crushed hot chili pepper into whorls of infested plants.",
      "Hand-pick and crush egg masses (covered in fluffy hair) and young larvae during early morning scouting.",
      "Spray with neem seed oil extract or Bacillus thuringiensis (Bt) when caterpillars are still small.",
    ],
    chemicalControl: [
      "Spray systemic or translaminar insecticides such as Emamectin benzoate (5% WDG) or Chlorantraniliprole.",
      "Direct spray nozzle into the plant whorls where larvae hide, ideally early in the morning or late evening.",
      "Rotate chemical classes to prevent rapid insecticide resistance.",
    ],
  },
  "cassava mealybug": {
    id: "cassava-mealybug",
    name: "Cassava Mealybug (Phenacoccus manihoti)",
    icon: "🦠",
    crops: ["Cassava"],
    signs: "Clusters of white, cottony or waxy oval insects congregating at the growing tips and underside of leaves. Leads to severe bunchy-top deformity, curling leaves, stunted internodes, and drastic tuber yield loss.",
    organicControl: [
      "Only use clean, uninfested planting stems sourced from verified disease-free stock.",
      "Encourage predatory ladybird beetles and preserve parasitic wasps (Anagyrus lopezi) which provide biological control.",
      "Dip stem cuttings into a warm neem extract or soapy solution prior to planting to kill residual crawlers.",
      "Avoid over-applying raw nitrogenous fertilizers which makes succulent sap more attractive to pests.",
    ],
    chemicalControl: [
      "In acute nursery outbreaks, apply systemic insecticides like Imidacloprid or Acetamiprid according to strict extension guidelines.",
      "Strip and safely burn heavily infested terminal shoot tips during field sanitation.",
    ],
  },
  "stem borer": {
    id: "stem-borer",
    name: "Stem Borers (Busseola fusca / Chilo partellus)",
    icon: "🪱",
    crops: ["Maize", "Rice", "Sorghum"],
    signs: "Larvae bore into plant stems, leaving tiny entry holes with excrement. Central shoots wither and die ('dead hearts'). Older stems weaken and snap during windstorms, and rice produces empty, bleached white panicles ('whiteheads').",
    organicControl: [
      "Collect and destroy or compost crop residues and dry stubble immediately after harvest to kill diapause larvae.",
      "Adopt early planting to coincide with the lowest borer moth populations.",
      "Intercrop cereals with legumes (cowpea, beans) to disrupt egg-laying adult moths.",
    ],
    chemicalControl: [
      "Apply granular systemic insecticides into plant whorls at 3–4 weeks after emergence.",
      "For irrigated rice, treat nurseries or field with registered cartap or carbofuran substitutes when dead-heart counts exceed 5%.",
    ],
  },
}

export const SOIL_TIPS = {
  general: "Most Nigerian soils have low organic matter (<1.5%). Incorporating crop residues, green manure, compost, or kraal manure every season restores cation exchange capacity (CEC) and soil moisture retention.",
  acidic: "Common in high-rainfall Southern zones (pH 4.2–5.5). Aluminum and iron toxicity tie up phosphate. Broadcast agricultural lime (calcium carbonate) or dolomite at 1–2 tons/ha every 3 years. Cassava tolerates acidity better than maize.",
  sandy: "Prevalent in Northern Guinea and Sudan Savannah. Low water holding capacity and prone to nutrient leaching. Split fertilizer applications into 2–3 smaller top-dressings. Mulch beds to retain moisture.",
  fertility: "NPK fertilizers alone exhaust micronutrients over time. Integrate nitrogen-fixing grain legumes (cowpea, groundnut, soybean) in annual rotation cycles to naturally inject 30–60 kg N/ha into your soil.",
}

export const SEASONAL = {
  north: "Main rainy season runs May/June to September/October. Arid Harmattan dry season extends from November to March. Irrigated dry-season farming in Fadama floodplains allows high-value vegetable and onion production.",
  south: "Bimodal rainfall pattern (March–July first season; September–November second season) separated by the August 'August Break'. Longer total growing period allows two distinct maize or vegetable cycles.",
  general: "Never plant solely by calendar dates! Confirm at least 25–30 mm of steady rainfall and moist subsoil before planting to avoid seedling desiccation from false starts.",
}

export const MARKET_TIPS = [
  "Major wholesale agricultural hubs in Nigeria: Dawanau Market in Kano (cereals, legumes), Mile 12 Market in Lagos (perishables & tubers), Bodija Market in Ibadan (grains & tubers), Gboko Market in Benue (yams).",
  "Transport perishable vegetables (tomatoes, peppers) between 8 PM and 6 AM or early morning to prevent heat decay during transit.",
  "Sort and grade produce by size and quality before heading to market. Uniformly graded produce commands 15–25% higher wholesale premiums.",
  "Value addition: Converting wet cassava into dry garri or high-quality cassava flour (HQCF) increases shelf life from 2 days to over 12 months, shielding you from price crashes.",
  "Pool produce through local farmer cooperatives or associations to negotiate bulk transport rates and gain direct access to industrial food processors.",
]

export const SUGGESTIONS = [
  "When should I plant maize in Kano?",
  "How do I control fall armyworm?",
  "What fertilizer is good for cassava?",
  "Best practices for tomato in dry season?",
  "How to store yam after harvest?",
  "Soil tips for sandy land",
  "Current tips for rice farming in the North?",
  "How to handle acidic soil in Southern Nigeria?",
]

const NORTH_KEYWORDS = ["kano", "kaduna", "sokoto", "katsina", "bauchi", "borno", "yobe", "jigawa", "zamfara", "kebbi", "north", "northern", "savannah"]
const SOUTH_KEYWORDS = ["lagos", "oyo", "ogun", "osun", "ondo", "ekiti", "rivers", "delta", "akwa", "cross river", "edo", "bayelsa", "imo", "abia", "anambra", "enugu", "ebonyi", "south", "southern", "rainforest"]

export function detectRegion(text) {
  const t = text.toLowerCase()
  if (NORTH_KEYWORDS.some((k) => t.includes(k))) return "north"
  if (SOUTH_KEYWORDS.some((k) => t.includes(k))) return "south"
  return "general"
}

export function findCrop(text) {
  const t = text.toLowerCase()
  for (const [cropKey, data] of Object.entries(CROPS)) {
    if (t.includes(cropKey) || data.aliases.some((a) => t.includes(a))) {
      return [cropKey, data]
    }
  }
  return [null, null]
}

export function findPest(text) {
  const t = text.toLowerCase()
  for (const [pestKey, data] of Object.entries(PESTS)) {
    if (t.includes(pestKey) || pestKey.split(" ").every((word) => t.includes(word))) {
      return [pestKey, data]
    }
  }
  if (t.includes("armyworm") || t.includes("army worm")) return ["fall armyworm", PESTS["fall armyworm"]]
  if (t.includes("mealybug") || t.includes("mealy bug")) return ["cassava mealybug", PESTS["cassava mealybug"]]
  if (t.includes("borer")) return ["stem borer", PESTS["stem borer"]]
  return [null, null]
}

export function matchLocalIntent(userMessage) {
  const text = userMessage.trim().toLowerCase()

  if (["hello", "hi", "hey", "good morning", "good afternoon", "good evening"].some((g) => text.includes(g))) {
    return {
      text: "Hello! I'm **AgriBot**, your practical farming assistant for Nigerian agriculture. 🌱\n\nAsk me about crop calendars, fertilizer schedules, pest control, soil management, or market tips!",
      crop: null,
      pest: null,
      followUps: ["When should I plant maize in Kano?", "How do I control fall armyworm?", "Fertilizer for cassava"],
    }
  }

  if (["thank", "thanks", "appreciate", "nagode", "daalu", "e se"].some((g) => text.includes(g))) {
    return {
      text: "You're very welcome! Feel free to ask any other questions about your farm or crops. May your harvest be bountiful! 🌾",
      crop: null,
      pest: null,
      followUps: ["Recommended crops for my zone", "How to test soil fertility", "Wholesale market tips"],
    }
  }

  const region = detectRegion(text)
  const [cropKey, cropData] = findCrop(text)
  const [pestKey, pestData] = findPest(text)

  // Pest intent
  if (pestData && ["control", "treat", "kill", "manage", "pest", "insect", "worm", "bug", "how", "signs", "disease", "spray"].some((w) => text.includes(w))) {
    const lines = [
      `### ${pestData.name}`,
      `**🔍 Visible Signs:**\n${pestData.signs}`,
      `\n**🌱 Eco-Friendly & Cultural Control:**`,
      ...pestData.organicControl.map((c, i) => `${i + 1}. ${c}`),
      `\n**🧪 Targeted Chemical Treatment:**`,
      ...pestData.chemicalControl.map((c, i) => `• ${c}`),
    ]
    if (pestData.crops?.length) {
      lines.push(`\n*Primary crops affected:* ${pestData.crops.join(", ")}`)
    }
    return {
      text: lines.join("\n"),
      crop: cropKey,
      pest: pestKey,
      followUps: [`What pests attack ${cropKey || 'maize'}?`, "Soil tips for sandy land", "Best time to plant"],
    }
  }

  // Crop-focused
  if (cropData) {
    // Planting
    if (["plant", "planting", "when", "sow", "season", "time", "date", "calendar"].some((w) => text.includes(w))) {
      const regAdvice = cropData.planting[region] || cropData.planting.general
      const regLabel = region === "north" ? "Northern Nigeria (Savannah Zone)" : region === "south" ? "Southern Nigeria (Rainforest Zone)" : "General Planting Advice"
      return {
        text: [
          `### 📅 Planting Calendar: ${cropData.name}`,
          `**${regLabel}:**\n${regAdvice}`,
          `\n**📐 Standard Spacing & Sowing Density:**\n${cropData.planting.general}`,
        ].join("\n\n"),
        crop: cropKey,
        pest: null,
        followUps: [`What fertilizer is good for ${cropKey}?`, `How to store ${cropKey} after harvest`, `Pests of ${cropKey}`],
      }
    }

    // Fertilizer
    if (["fertilizer", "fertiliser", "npk", "urea", "manure", "nutrient", "feed"].some((w) => text.includes(w))) {
      return {
        text: [
          `### 🧪 Fertilizer Schedule: ${cropData.name}`,
          `${cropData.fertilizer}`,
          `\n💡 **Field Recommendation:** Always ensure adequate soil moisture prior to applying chemical fertilizer to avoid burning roots.`,
        ].join("\n\n"),
        crop: cropKey,
        pest: null,
        followUps: [`When to plant ${cropKey}?`, `How to harvest ${cropKey}?`, "Soil fertility tips"],
      }
    }

    // Harvest / storage
    if (["harvest", "store", "storage", "when to harvest", "dry", "drying", "preserve", "cure"].some((w) => text.includes(w))) {
      return {
        text: [
          `### 🌾 Harvesting & Post-Harvest Storage: ${cropData.name}`,
          `${cropData.harvest}`,
          `\n**💡 Agronomic Tip:**\n${cropData.tips}`,
        ].join("\n\n"),
        crop: cropKey,
        pest: null,
        followUps: [`Market tips for selling ${cropKey}`, `Fertilizer for ${cropKey}`, "Pests of this crop"],
      }
    }

    // Pests of this crop
    if (["pest", "disease", "problem", "attack", "sick", "infection", "bug", "worm"].some((w) => text.includes(w))) {
      return {
        text: [
          `### 🐛 Common Threats for ${cropData.name}`,
          `**Common Insect Pests:** ${cropData.pests.join(", ")}`,
          `**Prevalent Diseases:** ${cropData.diseases.join(", ")}`,
          `\nAsk me specifically about any pest (e.g. *"How do I control fall armyworm?"*) for precise treatment options.`,
        ].join("\n\n"),
        crop: cropKey,
        pest: null,
        followUps: ["How do I control fall armyworm?", `Fertilizer for ${cropKey}`, `Planting calendar for ${cropKey}`],
      }
    }

    // Overview
    return {
      text: [
        `### 🌱 ${cropData.name} — Crop Brief`,
        `**Fertilizer Plan:** ${cropData.fertilizer}`,
        `**Harvest Guide:** ${cropData.harvest}`,
        `**Agronomic Tip:** ${cropData.tips}`,
        `\nYou can ask about planting dates for your state, fertilizer timing, or pest control for ${cropData.name}.`,
      ].join("\n\n"),
      crop: cropKey,
      pest: null,
      followUps: [`When should I plant ${cropKey}?`, `Fertilizer for ${cropKey}`, `Common pests of ${cropKey}`],
    }
  }

  // Soil
  if (["soil", "ph", "acid", "fertility", "manure", "compost", "lime", "sand", "sandy", "clay"].some((w) => text.includes(w))) {
    if (text.includes("acid") || text.includes("lime") || text.includes("ph")) {
      return {
        text: `### 🧪 Managing Acidic Soils (Southern Nigeria)\n\n${SOIL_TIPS.acidic}\n\n**General Maintenance:**\n${SOIL_TIPS.general}`,
        crop: null,
        pest: null,
        followUps: ["Fertilizer for cassava in acidic soil", "How to apply agricultural lime", "Sandy soil tips"],
      }
    }
    if (text.includes("sand")) {
      return {
        text: `### 🏜️ Managing Sandy Soils (Northern Savannah)\n\n${SOIL_TIPS.sandy}\n\n**General Maintenance:**\n${SOIL_TIPS.general}`,
        crop: null,
        pest: null,
        followUps: ["Fertilizer split-dose techniques", "Compost and organic manure guide", "Maize planting in Kano"],
      }
    }
    return {
      text: `### 🌿 Soil Health & Long-Term Fertility\n\n${SOIL_TIPS.general}\n\n**Integrated Nutrient Strategy:**\n${SOIL_TIPS.fertility}`,
      crop: null,
      pest: null,
      followUps: ["Acidic soil tips", "Sandy soil tips", "Best fertilizer for maize"],
    }
  }

  // Season
  if (["season", "rain", "weather", "climate", "harmattan", "dry season"].some((w) => text.includes(w))) {
    const regAdvice = SEASONAL[region] || SEASONAL.general
    const regName = region.charAt(0).toUpperCase() + region.slice(1)
    return {
      text: `### 🌦️ Seasonal Weather & Calendar (${regName} Zone)\n\n${regAdvice}\n\n**Crucial Farmer Rule:**\n${SEASONAL.general}`,
      crop: null,
      pest: null,
      followUps: ["When should I plant maize in Kano?", "Tomato dry season practices", "Rice farming in the North"],
    }
  }

  // Market
  if (["market", "price", "sell", "buyer", "profit", "dawanau", "mile 12", "bodija", "trade"].some((w) => text.includes(w))) {
    return {
      text: `### 💰 Commercial & Market Tips for Nigerian Farmers\n\n${MARKET_TIPS.map((t) => `• ${t}`).join("\n\n")}`,
      crop: null,
      pest: null,
      followUps: ["How to store yam to fetch high off-season prices", "Drying grains for storage", "Cassava value addition"],
    }
  }

  return {
    text: `I'm not sure I fully understood that farming question. Here are specific things you can ask me about:\n\n• **Planting times** for specific crops (Maize, Cassava, Rice, Yam, Tomato, Cocoa)\n• **Fertilizer regimes** (NPK 15:15:15, Urea, manure application)\n• **Pest & disease diagnosis** (Fall armyworm, Cassava mealybug, Stem borer)\n• **Soil health** (sandy Northern soils, acidic Southern soils, liming)\n• **Harvest & post-harvest drying**\n• **Wholesale market practices**\n\nPick a sample question below or try rephrasing with a crop name!`,
    crop: null,
    pest: null,
    followUps: ["When should I plant maize in Kano?", "How do I control fall armyworm?", "What fertilizer is good for cassava?"],
  }
}
