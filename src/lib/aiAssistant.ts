import type { ChatMessage } from '../types';

interface KnowledgeEntry {
  keywords: string[];
  answer: string;
}

const knowledgeBase: KnowledgeEntry[] = [
  {
    keywords: ['cyclone', 'forming', 'why', 'how'],
    answer: 'Cyclones form over warm tropical ocean waters (typically above 26.5°C). Warm moist air rises from the ocean surface, creating a low-pressure zone. Surrounding air flows in to fill the gap, picking up moisture and heat as it spirals inward due to the Coriolis effect. As the air rises and cools, it condenses into clouds and releases latent heat, which further fuels the storm. This feedback loop intensifies the system until it becomes a cyclone with wind speeds exceeding 119 km/h.',
  },
  {
    keywords: ['earthquake', 'explain', 'cause', 'why'],
    answer: 'Earthquakes occur when tectonic plates—large sections of Earth\'s lithosphere—suddenly slip past each other along a fault line. Stress builds up over years as plates slowly move. When the stress exceeds the friction holding the rocks together, it releases as seismic waves. The point underground where this happens is the hypocenter; the point directly above on the surface is the epicenter. Magnitude is measured on the Richter scale (logarithmic)—each whole number increase represents 10x amplitude and ~31x energy release.',
  },
  {
    keywords: ['climate change', 'what is', 'global warming'],
    answer: 'Climate change refers to long-term shifts in global temperatures and weather patterns. While natural variations occur, human activities—primarily burning fossil fuels (coal, oil, gas)—release greenhouse gases like CO2 and methane that trap heat in the atmosphere. This causes: rising global temperatures (already +1.1°C since pre-industrial), melting ice caps and glaciers, rising sea levels, more extreme weather events, ocean acidification, and ecosystem disruption. The Paris Agreement aims to limit warming to 1.5°C above pre-industrial levels.',
  },
  {
    keywords: ['polluted', 'most polluted', 'pollution', 'countries'],
    answer: 'The most polluted countries by AQI (Air Quality Index) include: India (Delhi often exceeds AQI 300), Pakistan, Bangladesh, and parts of China. Major pollution sources include vehicle emissions, industrial output, coal power plants, crop burning, and construction dust. PM2.5 (particles smaller than 2.5 micrometers) is the most dangerous pollutant—it penetrates deep into lungs and bloodstream, causing respiratory and cardiovascular diseases.',
  },
  {
    keywords: ['aurora', 'auroras', 'northern lights', 'what causes'],
    answer: 'Auroras (Northern/Southern Lights) are caused by charged particles from the Sun colliding with gases in Earth\'s upper atmosphere. The solar wind carries these particles toward Earth, where our magnetic field funnels them toward the polar regions. When they collide with oxygen at 100-300 km altitude, they produce green and red light; nitrogen produces blue and purple. The aurora oval—where this occurs—rings the magnetic poles. Stronger solar activity means auroras can be seen at lower latitudes.',
  },
  {
    keywords: ['ocean', 'currents', 'explain', 'gyre'],
    answer: 'Ocean currents are large-scale movements of seawater driven by wind, temperature differences, salinity, and the Coriolis effect. Surface currents (like the Gulf Stream) are wind-driven and transport warm water from equator to poles. Deep currents form when cold, dense water sinks at the poles and flows toward the equator—this is the global "conveyor belt" or thermohaline circulation. Currents regulate climate, distribute nutrients, and influence weather patterns worldwide.',
  },
  {
    keywords: ['weather', 'predict', 'trends', 'forecast'],
    answer: 'Weather prediction uses mathematical models that simulate atmospheric physics. Supercomputers process data from satellites, weather stations, radar, and ocean buoys to solve equations for pressure, temperature, wind, and humidity. Short-term forecasts (1-3 days) are ~95% accurate; 7-day forecasts ~80%. Climate trends use longer-term models incorporating greenhouse gas concentrations, solar cycles, and ocean heat content. Key trends: global temperatures rising ~0.2°C per decade, more extreme precipitation events, longer droughts, and shifting seasonal patterns.',
  },
  {
    keywords: ['tsunami', 'cause', 'how'],
    answer: 'Tsunamis are massive ocean waves triggered by sudden displacement of large water volumes—usually by undersea earthquakes (magnitude 7.5+), but also by volcanic eruptions, landslides, or meteor impacts. Unlike regular waves (surface-driven), tsunamis move the entire water column. In deep ocean they travel at 800+ km/h with barely visible wave heights, but as they approach shallow coastal waters, they slow down and the wave height dramatically increases—sometimes exceeding 30 meters. Warning systems use ocean pressure sensors to detect them early.',
  },
  {
    keywords: ['volcano', 'erupt', 'eruption', 'why'],
    answer: 'Volcanoes erupt when molten rock (magma) from Earth\'s mantle rises through the crust and reaches the surface. Magma forms when subducted tectonic plates melt or when mantle plumes (hotspots) generate intense heat. The magma\'s viscosity and gas content determine eruption style: low-viscosity basaltic magma flows gently (e.g., Hawaii); high-viscosity felsic magma traps gases and explodes violently (e.g., Mt. St. Helens). The Ring of Fire—around the Pacific Ocean—has 75% of the world\'s active volcanoes due to subduction zones.',
  },
  {
    keywords: ['hurricane', 'difference', 'typhoon', 'cyclone'],
    answer: 'Hurricanes, typhoons, and cyclones are the same weather phenomenon—tropical cyclones—but named differently by region: "Hurricane" in the North Atlantic and Northeast Pacific; "Typhoon" in the Northwest Pacific; "Cyclone" in the South Pacific and Indian Ocean. They all require warm ocean water (26.5°C+), atmospheric instability, and low wind shear. Categories are measured on the Saffir-Simpson scale (1-5), with Category 5 having winds exceeding 252 km/h.',
  },
  {
    keywords: ['wildfire', 'forest fire', 'cause'],
    answer: 'Wildfires are uncontrolled fires in vegetation areas. Causes include lightning, human negligence (campfires, cigarettes), power line sparks, and arson. They spread based on: fuel availability (dry vegetation), topography (fire moves faster uphill), and weather (high temp, low humidity, strong wind). Climate change increases wildfire frequency through longer dry seasons and higher temperatures. The 2020 California wildfires burned over 4 million acres—a record. Fire intensity is measured in megawatts, and satellite thermal sensors detect hotspots worldwide.',
  },
  {
    keywords: ['satellite', 'iss', 'orbit', 'how high'],
    answer: 'The International Space Station (ISS) orbits at ~408 km altitude, traveling at 27,600 km/h, completing one orbit every 92 minutes. GPS satellites orbit at 20,180 km. Geostationary satellites (like weather satellites) orbit at 35,786 km—matching Earth\'s rotation so they appear stationary. Low Earth Orbit (LEO, <2000 km) is used by ISS, Starlink, and Earth observation satellites. Satellites stay in orbit through a balance of forward velocity and Earth\'s gravity—essentially "falling around" the planet.',
  },
  {
    keywords: ['sea level', 'rising', 'coastal'],
    answer: 'Sea levels are rising at ~3.7 mm/year (accelerating) due to two factors: thermal expansion (warmer water occupies more volume) and melting ice sheets (Greenland and Antarctica). Greenland alone loses ~270 billion tons of ice per year. Projected rise by 2100: 0.3 to 2.5 meters depending on emission scenarios. This threatens coastal cities like Miami, Mumbai, Venice, and island nations like the Maldives. NASA satellites (Jason-3, Sentinel-6) precisely measure sea level using radar altimetry.',
  },
  {
    keywords: ['deforestation', 'forest', 'amazon'],
    answer: 'Deforestation is the large-scale removal of forests, primarily for agriculture, logging, and urbanization. The Amazon rainforest—often called "the lungs of Earth"—loses ~10,000 km² per year. Forests absorb ~30% of human CO2 emissions, so their loss accelerates climate change. Deforestation also destroys biodiversity (many species face extinction), disrupts water cycles, and causes soil erosion. Reforestation and sustainable forestry are key solutions. Satellite monitoring (Landsat, Sentinel-2) tracks forest loss in near-real-time.',
  },
  {
    keywords: ['co2', 'carbon', 'emissions'],
    answer: 'Atmospheric CO2 is currently ~422 ppm—the highest in 3 million years. Pre-industrial levels were ~280 ppm. The Keeling Curve (measured continuously since 1958 at Mauna Loa) shows this dramatic rise. CO2 traps infrared radiation (greenhouse effect). Annual human emissions: ~40 billion tons CO2, mainly from fossil fuels (75%) and land use change (25%). Natural carbon sinks (oceans, forests) absorb about half. The remaining fraction stays in the atmosphere for centuries to millennia.',
  },
  {
    keywords: ['ice', 'glacier', 'melting', 'polar'],
    answer: 'Earth\'s ice is melting at unprecedented rates. Arctic sea ice extent has declined ~13% per decade since 1979. Greenland loses ~270 billion tons/year; Antarctica ~150 billion tons/year. Mountain glaciers worldwide are retreating rapidly—the Himalayas, Alps, and Andes are most affected. Permafrost is also thawing, releasing methane—a potent greenhouse gas. This contributes to sea level rise, alters ocean circulation, and threatens Arctic ecosystems. Summer Arctic sea ice may virtually disappear by 2050.',
  },
  {
    keywords: ['el nino', 'la nina', 'enso'],
    answer: 'El Niño and La Niña are phases of the El Niño-Southern Oscillation (ENSO), a climate pattern in the tropical Pacific. El Niño occurs when trade winds weaken, allowing warm water to surge eastward toward South America—raising global temperatures and shifting weather patterns. La Niña is the opposite: stronger trade winds push warm water westward, cooling the eastern Pacific. ENSO cycles occur every 2-7 years and influence droughts, floods, hurricane activity, and global temperature records worldwide.',
  },
  {
    keywords: ['ozone', 'hole', 'layer'],
    answer: 'The ozone layer sits in the stratosphere (~15-35 km altitude) and absorbs harmful UV radiation. In the 1980s, scientists discovered an ozone "hole" over Antarctica caused by CFCs (chlorofluorocarbons). The Montreal Protocol (1987) phased out CFCs globally—an unprecedented success. The ozone layer is now recovering and is expected to return to pre-1980 levels by 2060. This is one of the most successful examples of international environmental cooperation.',
  },
  {
    keywords: ['plate', 'tectonic', 'continental drift'],
    answer: 'Plate tectonics describes Earth\'s lithosphere as being divided into ~15 major and minor plates that move over the asthenosphere. Driven by mantle convection, plates move 1-15 cm/year. At convergent boundaries they collide (forming mountains, subduction zones); at divergent boundaries they separate (forming mid-ocean ridges); at transform boundaries they slide past each other (causing earthquakes like the San Andreas Fault). This theory, proposed by Alfred Wegener in 1912 and confirmed in the 1960s, explains continental drift, mountain building, volcanic arcs, and the ring of fire.',
  },
  {
    keywords: ['monsoon', 'rainy season'],
    answer: 'Monsoons are seasonal wind shifts that bring dramatic changes in precipitation, primarily affecting South and Southeast Asia. The summer (wet) monsoon occurs when land heats faster than the ocean, drawing moisture-laden air from the sea—bringing 70-80% of annual rainfall in India. The winter (dry) monsoon reverses the flow. Monsoons are critical for agriculture but can cause devastating floods. Climate change is altering monsoon patterns, making them more erratic and intense.',
  },
];

const defaultResponses = [
  'I can answer questions about cyclones, earthquakes, climate change, auroras, ocean currents, weather prediction, tsunamis, volcanoes, hurricanes, wildfires, satellites, sea level rise, deforestation, CO2 emissions, ice melting, El Niño, ozone, plate tectonics, and monsoons. Try asking about any of these topics!',
  'That\'s an interesting question! I\'m specialized in Earth science topics. Try asking me about weather, climate, earthquakes, volcanoes, ocean currents, or space phenomena.',
];

export function getAIResponse(question: string): string {
  const lower = question.toLowerCase();
  let bestMatch: KnowledgeEntry | null = null;
  let bestScore = 0;

  for (const entry of knowledgeBase) {
    let score = 0;
    for (const keyword of entry.keywords) {
      if (lower.includes(keyword)) {
        score += keyword.length;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }

  if (bestMatch && bestScore > 0) {
    return bestMatch.answer;
  }

  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

export const suggestedQuestions = [
  'Why is this cyclone forming?',
  'Explain this earthquake.',
  'What is climate change?',
  'Which countries are most polluted?',
  'What causes auroras?',
  'Explain ocean currents.',
  'Predict weather trends.',
  'What causes tsunamis?',
  'How do volcanoes erupt?',
  'What is El Niño?',
];

export function createInitialMessages(): ChatMessage[] {
  return [
    {
      role: 'ai',
      content: 'Hello! I\'m your AI Earth Assistant. I can explain natural phenomena, climate science, and Earth systems. Ask me anything about our planet!',
      timestamp: Date.now(),
    },
  ];
}
