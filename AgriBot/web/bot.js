// Intent matching and response generation for AgriBot (port of utils/nlp_helpers.py).
import { CROPS, PESTS, SOIL_TIPS, SEASONAL, MARKET_TIPS, GREETINGS, FALLBACK } from "./knowledge-base.js";

const NORTH_KEYWORDS = ["kano", "kaduna", "sokoto", "katsina", "bauchi", "borno", "yobe", "jigawa", "zamfara", "kebbi", "north", "northern"];
const SOUTH_KEYWORDS = ["lagos", "oyo", "ogun", "osun", "ondo", "ekiti", "rivers", "delta", "akwa", "cross river", "edo", "bayelsa", "imo", "abia", "anambra", "enugu", "ebonyi", "south", "southern"];

const has = (text, words) => words.some((w) => text.includes(w));

// Mirrors Python's str.title()
const title = (s) => s.toLowerCase().replace(/(^|[^a-z])([a-z])/g, (_, p, c) => p + c.toUpperCase());

export function detectRegion(text) {
  const t = text.toLowerCase();
  if (has(t, NORTH_KEYWORDS)) return "north";
  if (has(t, SOUTH_KEYWORDS)) return "south";
  return "general";
}

export function findCrop(text) {
  const t = text.toLowerCase();
  for (const [crop, data] of Object.entries(CROPS)) {
    if (t.includes(crop) || has(t, data.aliases)) return [crop, data];
  }
  return [null, null];
}

export function findPest(text) {
  const t = text.toLowerCase();
  for (const [pest, data] of Object.entries(PESTS)) {
    if (t.includes(pest) || has(t, pest.split(" "))) return [pest, data];
  }
  if (t.includes("armyworm") || t.includes("army worm")) return ["fall armyworm", PESTS["fall armyworm"]];
  if (t.includes("mealybug") || t.includes("mealy bug")) return ["cassava mealybug", PESTS["cassava mealybug"]];
  if (t.includes("borer")) return ["stem borer", PESTS["stem borer"]];
  return [null, null];
}

export function generateResponse(userMessage) {
  const text = userMessage.trim().toLowerCase();

  if (has(text, ["hello", "hi", "hey", "good morning", "good afternoon", "good evening"])) {
    return GREETINGS[0];
  }
  if (has(text, ["thank", "thanks", "appreciate"])) {
    return "You're welcome! Feel free to ask more farming questions anytime. Happy farming! 🌱";
  }

  const region = detectRegion(text);
  const [cropKey, cropData] = findCrop(text);
  const [pestKey, pestData] = findPest(text);

  // Pest-focused
  if (pestData && has(text, ["control", "treat", "kill", "manage", "pest", "insect", "worm", "bug", "how"])) {
    const lines = [`**${title(pestKey)}**`, `\n**Signs:** ${pestData.signs}`, "\n**Control measures:**"];
    pestData.control.forEach((c, i) => lines.push(`${i + 1}. ${c}`));
    if (pestData.crops?.length) lines.push(`\n_Commonly affects: ${pestData.crops.join(", ")}_`);
    return lines.join("\n");
  }

  // Crop-focused
  if (cropData) {
    const name = title(cropKey);
    if (has(text, ["plant", "planting", "when", "sow", "season", "time"])) {
      const p = cropData.planting;
      const regionAdvice = p[region] ?? p.general ?? "";
      return `**Planting ${name}**\n\n**Region advice (${region}):** ${regionAdvice}\n\n**General guidance:** ${p.general ?? ""}`;
    }
    if (has(text, ["fertilizer", "fertiliser", "npk", "urea", "manure", "nutrient"])) {
      return `**Fertilizer for ${name}**\n\n${cropData.fertilizer}`;
    }
    if (has(text, ["harvest", "store", "storage", "when to harvest"])) {
      return `**Harvest & Storage — ${name}**\n\n${cropData.harvest}\n\n**Extra tip:** ${cropData.tips}`;
    }
    if (has(text, ["pest", "disease", "problem", "attack"])) {
      const pests = (cropData.pests || []).join(", ");
      const diseases = (cropData.diseases || []).join(", ");
      return (
        `**Common issues for ${name}**\n\n**Pests:** ${pests || "Various"}\n**Diseases:** ${diseases || "Various"}\n\n` +
        `Ask me specifically about any of these (e.g. “how to control fall armyworm”) for detailed advice.`
      );
    }
    return (
      `**${name} — Quick Overview**\n\n**Fertilizer:** ${cropData.fertilizer}\n\n**Harvest:** ${cropData.harvest}\n\n` +
      `**Tip:** ${cropData.tips}\n\nYou can also ask about planting time, pests, or fertilizer specifically.`
    );
  }

  // Soil
  if (has(text, ["soil", "ph", "acid", "fertility", "manure", "compost", "lime"])) {
    if (text.includes("acid") || text.includes("ph")) return `**Soil Acidity**\n\n${SOIL_TIPS.acidic}\n\n${SOIL_TIPS.general}`;
    if (text.includes("sand")) return `**Sandy Soils**\n\n${SOIL_TIPS.sandy}\n\n${SOIL_TIPS.general}`;
    return `**Soil Health Tips**\n\n${SOIL_TIPS.general}\n\n${SOIL_TIPS.fertility}`;
  }

  // Season / weather
  if (has(text, ["season", "rain", "weather", "climate", "harmattan", "dry season"])) {
    const advice = SEASONAL[region] ?? SEASONAL.general;
    return `**Seasonal Guidance (${title(region)})**\n\n${advice}\n\n${SEASONAL.general}`;
  }

  // Market
  if (has(text, ["market", "price", "sell", "buyer", "profit"])) {
    return `**Market Tips for Farmers**\n\n${MARKET_TIPS.map((t) => `• ${t}`).join("\n")}`;
  }

  return FALLBACK;
}
