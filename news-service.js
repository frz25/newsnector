/**
 * NewsNectar - News Sourcing Engine
 * Fetches, categorizes, and provides live daily news streams across all major sectors.
 */

class NewsService {
  constructor() {
    // Rich Curated Dataset across all sectors with high-res imagery and structured summaries
    this.fallbackArticles = [
      // TECH & AI
      {
        id: "tech-01",
        sector: "tech",
        sectorLabel: "Tech & AI",
        title: "Next-Gen Quantum Neural Processors Achieve Breakthrough Inference Speed",
        summaryBullets: [
          "Quantum neural chip demonstrates a 1,000x acceleration in complex LLM inference tasks while using 90% less energy.",
          "Researchers utilized topological qubits to achieve zero-heat dissipation during high-frequency matrix calculations.",
          "Commercial deployment expected within cloud datacenters by Q3 next year, revolutionizing edge AI computation."
        ],
        fullContent: `
          <p>Engineers and quantum computer scientists have officially unveiled the world's first hybrid topological quantum neural processor. The chip, built on a groundbreaking sub-nanometer substrate, combines cryogenic qubit arrays with standard silicon photonic interconnects.</p>
          <p>During initial benchmarking tests, the processor successfully executed a 70-billion parameter transformer model in under 1.2 milliseconds—a feat that previously required vast clusters of energy-intensive GPU server racks. Most remarkably, the chip maintained operational stability near room temperature using standard thermoelectric cooling.</p>
          <p>Industry analysts believe this breakthrough will drastically reduce the carbon footprint of global AI data centers while enabling real-time zero-latency speech synthesis, medical imaging diagnostic bots, and autonomous robotic fleets.</p>
        `,
        source: "MIT Tech Review",
        sourceDomain: "technologyreview.com",
        url: "https://technologyreview.com",
        publishedAt: "14 mins ago",
        readTime: "3 min read",
        imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
        sentiment: "🚀 Breakthrough",
        aiContext: "Breakthrough in quantum neural processors using topological qubits. 1000x faster inference, 90% less energy. Commercial launch Q3 next year."
      },
      {
        id: "tech-02",
        sector: "tech",
        sectorLabel: "Tech & AI",
        title: "Open-Source Multimodal AI Models Outperform Proprietary Frontier Systems",
        summaryBullets: [
          "New community-driven open model achieves top scores in mathematical reasoning, coding, and video analysis benchmarks.",
          "Built using decentralized global compute networks, cutting training costs by over 80%.",
          "Includes native zero-shot multi-language translation and embedded privacy protection."
        ],
        fullContent: `
          <p>The open-source AI community has reached a historic milestone with the release of 'Helix-Omni 3.0', a 100% open-weight multimodal foundation model. In independent double-blind evaluations, Helix-Omni surpassed existing closed proprietary models across benchmarks including MATH-500, HumanEval, and Video-MMLU.</p>
          <p>Unlike traditional AI models built by single tech monoliths, Helix-Omni was trained via a globally distributed peer-to-peer compute grid comprising over 40,000 participant nodes across 85 countries.</p>
          <p>Developers worldwide can now run full frontier-class AI capabilities locally on consumer-grade hardware without sending private data to central servers.</p>
        `,
        source: "Wired Tech",
        sourceDomain: "wired.com",
        url: "https://wired.com",
        publishedAt: "42 mins ago",
        readTime: "4 min read",
        imageUrl: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80",
        sentiment: "📈 Trending",
        aiContext: "Helix-Omni 3.0 open-source model outperforms proprietary LLMs. Trained via peer-to-peer network, runs locally on consumer GPUs."
      },

      // BUSINESS & FINANCE
      {
        id: "biz-01",
        sector: "business",
        sectorLabel: "Business & Finance",
        title: "Global Central Banks Launch Unified Digital Interoperability Standard",
        summaryBullets: [
          "Over 45 central banks agree on a universal framework for instant cross-border settlement.",
          "Eliminates 3-day SWIFT delays and reduces wire transfer fees to near-zero.",
          "Integrates smart contract auditing to prevent fraud and automatically trace illicit flows."
        ],
        fullContent: `
          <p>Financial leaders from 45 nations have ratified the 'Nectar Consensus', establishing the first unified protocol for sovereign digital currencies (CBDCs) and regulated stablecoins. The protocol enables real-time 24/7 cross-border clearing with immediate finality.</p>
          <p>Traditionally, international corporate transfers cost businesses billions annually in intermediary bank fees and currency spread conversion markups. Under the new protocol, transactions resolve in under 3 seconds with minimal gas fees.</p>
          <p>Stock markets responded positively to the announcement, with international trade sector equities surging over 4.2% in early morning trading.</p>
        `,
        source: "Bloomberg Finance",
        sourceDomain: "bloomberg.com",
        url: "https://bloomberg.com",
        publishedAt: "1 hour ago",
        readTime: "3 min read",
        imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80",
        sentiment: "💡 Impactful",
        aiContext: "45 central banks adopt universal digital currency protocol. Instant cross-border transfers under 3 seconds, eliminating multi-day banking delays."
      },
      {
        id: "biz-02",
        sector: "business",
        sectorLabel: "Business & Finance",
        title: "Renewable Energy Stocks Surge as Clean Microgrids Outpace Fossil Fuels",
        summaryBullets: [
          "Solar and battery storage costs drop another 18% year-over-year, reaching record grid parity.",
          "Industrial conglomerates pivot heavy manufacturing energy contracts to localized solar-wind hybrid farms.",
          "Venture capital investment into green hydrogen infrastructure surpasses $65 billion."
        ],
        fullContent: `
          <p>Clean energy markets reached an unprecedented inflection point this quarter as cost parity for solar-plus-storage microgrids fell significantly below conventional natural gas peaking plants.</p>
          <p>Heavy manufacturing plants across Asia and Europe are increasingly deploying dedicated localized solar and battery storage arrays to insulate production lines from volatile grid pricing. Industrial demand has propelled clean energy index stocks to all-time highs.</p>
          <p>Wall Street investment firms are reallocating record capital into green energy infrastructure funds, citing guaranteed lower long-term levelized cost of energy (LCOE).</p>
        `,
        source: "Financial Times",
        sourceDomain: "ft.com",
        url: "https://ft.com",
        publishedAt: "2 hours ago",
        readTime: "4 min read",
        imageUrl: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=800&q=80",
        sentiment: "🌿 Growth",
        aiContext: "Solar and battery storage costs drop 18%, surpassing fossil fuels in cost efficiency. Industry capital shifting heavily to green microgrids."
      },

      // SCIENCE & SPACE
      {
        id: "sci-01",
        sector: "science",
        sectorLabel: "Science & Space",
        title: "James Webb Telescope Detects Clear Atmospheric Biosignatures on Exoplanet K2-18b",
        summaryBullets: [
          "Spectroscopic analysis confirms presence of dimethyl sulfide (DMS), a gas primarily produced by ocean phytoplankton.",
          "Target planet is a Hycean world with a water ocean and hydrogen-rich atmosphere located in the habitable zone.",
          "Follow-up observation campaign scheduled for late 2026 to confirm atmospheric carbon dioxide and methane balances."
        ],
        fullContent: `
          <p>Astronomers using the James Webb Space Telescope (JWST) have published groundbreaking spectroscopic data from planet K2-18b, located 120 light-years from Earth in the constellation Leo.</p>
          <p>The telescope's near-infrared spectrograph detected a strong signature of dimethyl sulfide (DMS). On Earth, DMS is almost exclusively emitted by living ocean marine life, specifically microscopic phytoplankton. In addition to DMS, data confirmed abundant methane and carbon dioxide with a depletion of ammonia, supporting the hypothesis of a global liquid water ocean beneath a hydrogen envelope.</p>
          <p>Scientists caution that further observations are required to unequivocally rule out non-biological chemical pathways, but call this the most promising candidate for extraterrestrial biology ever discovered.</p>
        `,
        source: "NASA Astrophysics",
        sourceDomain: "nasa.gov",
        url: "https://nasa.gov",
        publishedAt: "3 hours ago",
        readTime: "5 min read",
        imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
        sentiment: "🌌 Landmark",
        aiContext: "JWST finds dimethyl sulfide (DMS) on exoplanet K2-18b. DMS on Earth comes from ocean life. Indicates potential liquid water ocean planet."
      },
      {
        id: "sci-02",
        sector: "science",
        sectorLabel: "Science & Space",
        title: "Fusion Reactor Maintains Q>10 Net Energy Gain for 72 Continuous Hours",
        summaryBullets: [
          "Superconducting tokamak reactor achieves steady-state plasma burning for 3 full days.",
          "Advanced high-temperature magnetic coils prevented turbulence and plasma disruptions.",
          "Pilot commercial power plant construction slated to break ground in 2028."
        ],
        fullContent: `
          <p>Nuclear fusion researchers have shattered previous magnetic confinement records by holding a stable ignited plasma at 150 million degrees Celsius for 72 continuous hours, producing ten times more energy than was injected into the plasma.</p>
          <p>Previous fusion experiments suffered from heat loss caused by plasma turbulence. The breakthrough came from applying real-time AI magnetic field tuning, which makes tens of thousands of microscopic magnetic adjustments per second to prevent heat leakage.</p>
          <p>The milestone proves that magnetic fusion can serve as a continuous, baseline clean energy source for modern civilization.</p>
        `,
        source: "Nature Physics",
        sourceDomain: "nature.com",
        url: "https://nature.com",
        publishedAt: "4 hours ago",
        readTime: "4 min read",
        imageUrl: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=800&q=80",
        sentiment: "⚡ Energy Milestone",
        aiContext: "Fusion reactor maintains Q>10 net energy gain for 72 hours continuously using AI magnetic tuning. Commercial pilot plant planned for 2028."
      },

      // WORLD & CLIMATE
      {
        id: "world-01",
        sector: "world",
        sectorLabel: "World & Climate",
        title: "Historic Global Accord Signed for Ocean Plastic Zero-Waste Treaty",
        summaryBullets: [
          "190 countries commit to legally binding bans on non-recyclable single-use polymers by 2030.",
          "Establishes a global $20 billion fund to support coastal cleanup and marine ecosystem restoration.",
          "Mandates bio-based biodegradable packaging standards across global supply chains."
        ],
        fullContent: `
          <p>Delegates from 190 nations gathered in Geneva have unanimously adopted the Global Treaty on Marine Plastics, marking the largest environmental agreement since the Paris Climate Accord.</p>
          <p>The treaty mandates strict phase-outs for non-recyclable single-use plastics, requiring consumer packaging manufacturers to transition to algae-based and biodegradable cellulose alternatives within four years.</p>
          <p>Environmental organizations hailed the treaty as a decisive turning point for ocean conservation, projecting a 75% reduction in microplastic influx into ocean currents by 2032.</p>
        `,
        source: "Reuters World",
        sourceDomain: "reuters.com",
        url: "https://reuters.com",
        publishedAt: "5 hours ago",
        readTime: "3 min read",
        imageUrl: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=800&q=80",
        sentiment: "🌊 Global Policy",
        aiContext: "190 nations sign global plastic ban treaty by 2030. Mandates transition to biodegradable packaging and sets up $20B ocean cleanup fund."
      },

      // CULTURE & MEDIA
      {
        id: "culture-01",
        sector: "culture",
        sectorLabel: "Culture & Media",
        title: "AI-Assisted Holographic Cinema Redefines Immersive Storytelling",
        summaryBullets: [
          "Interactive holographic theater allows audiences to walk around and influence storyline perspectives.",
          "Combines Spatial Audio, light field displays, and real-time generative dialogue.",
          "First feature film premieres to sold-out audiences in Tokyo, London, and New York."
        ],
        fullContent: `
          <p>Cinema history was rewritten this week with the grand premiere of 'Aetherium', the world's first interactive light-field holographic film. Viewers step into a multi-sensory dome where characters appear as realistic 3D light projections in physical space.</p>
          <p>Audiences can physically move around scenes to inspect secondary character reactions or choose focal points, while ambient AI dynamically modulates background musical scoring based on collective audience emotional cues.</p>
          <p>Film critics have dubbed it the biggest shift in cinematic language since the introduction of synchronized sound in 1927.</p>
        `,
        source: "Variety",
        sourceDomain: "variety.com",
        url: "https://variety.com",
        publishedAt: "6 hours ago",
        readTime: "3 min read",
        imageUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80",
        sentiment: "🎨 Arts & Media",
        aiContext: "First holographic interactive cinema film debuts in Tokyo and NY. Light-field displays let audiences walk inside 3D film scenes."
      },

      // SPORTS & GAMING
      {
        id: "sports-01",
        sector: "sports",
        sectorLabel: "Sports & Gaming",
        title: "Virtual Reality Esports Officially Admitted to 2028 Olympic Esports Games",
        summaryBullets: [
          "IOC confirms inclusion of full-motion athletic VR games including Haptic Fencing and Drone Racing.",
          "Competitors will wear biometric suits tracking heart rate, muscle output, and reaction time in real-time.",
          "Over 120 million global viewers expected to tune into the inaugural digital Olympic events."
        ],
        fullContent: `
          <p>The International Olympic Committee (IOC) has formally announced the official sporting lineup for the inaugural Olympic Esports Games. Five physical VR disciplines have been officially sanctioned, including Haptic Virtual Fencing, Zero-G Combat Racing, and Sim Sailing.</p>
          <p>Athletes perform on high-speed omnidirectional treadmills wearing haptic feedback suits that track physical stamina, speed, and precision down to the millimeter.</p>
          <p>The inclusion marks a historic convergence between traditional physical athletics and cutting-edge interactive simulation technology.</p>
        `,
        source: "ESPN Digital",
        sourceDomain: "espn.com",
        url: "https://espn.com",
        publishedAt: "7 hours ago",
        readTime: "3 min read",
        imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80",
        sentiment: "🏆 Sports",
        aiContext: "IOC admits VR full-motion esports to 2028 Olympic Games. Features haptic suits, omnidirectional treadmills, and biometric tracking."
      },

      // HEALTH & BIO
      {
        id: "health-01",
        sector: "health",
        sectorLabel: "Health & Bio",
        title: "Universal mRNA Vaccine Demonstrates 99% Efficacy Against All Influenza Strains",
        summaryBullets: [
          "Phase III clinical trial results show broad protective immunity against seasonal and pandemic flu variants.",
          "Targets conserved internal protein stalk structures that do not mutate annually.",
          "Single shot provides up to 5 years of durable cross-reactive antibody protection."
        ],
        fullContent: `
          <p>Medical researchers have published definitive Phase III trial data for a universal influenza mRNA vaccine that targets non-mutating stem regions of viral surface proteins.</p>
          <p>Traditional annual flu shots require guessing which strains will circulate each autumn. In contrast, the universal shot triggers robust T-cell and memory B-cell responses capable of neutralizing all known avian, swine, and human flu lineages.</p>
          <p>Health officials estimate the vaccine could save over 650,000 lives annually while eliminating the need for annual seasonal booster reformulations.</p>
        `,
        source: "The Lancet Medicine",
        sourceDomain: "thelancet.com",
        url: "https://thelancet.com",
        publishedAt: "8 hours ago",
        readTime: "4 min read",
        imageUrl: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
        sentiment: "🔬 Life Sciences",
        aiContext: "Universal mRNA flu vaccine trial shows 99% protection across all flu strains. Single dose provides up to 5 years of immunity."
      }
    ];

    this.cache = [...this.fallbackArticles];
  }

  /**
   * Fetch latest news articles (supports optional sector filter and search query)
   */
  async getNewsArticles(sector = "all", searchQuery = "") {
    // Simulate slight network latency for realistic feel
    await new Promise(res => setTimeout(res, 200));

    let results = [...this.cache];

    // Filter by sector partition
    if (sector && sector !== "all") {
      results = results.filter(item => item.sector.toLowerCase() === sector.toLowerCase());
    }

    // Filter by search query
    if (searchQuery && searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase().trim();
      results = results.filter(item => 
        item.title.toLowerCase().includes(q) ||
        item.sectorLabel.toLowerCase().includes(q) ||
        item.source.toLowerCase().includes(q) ||
        item.summaryBullets.some(b => b.toLowerCase().includes(q))
      );
    }

    return results;
  }

  /**
   * Get article by unique ID
   */
  getArticleById(id) {
    return this.cache.find(item => item.id === id) || null;
  }

  /**
   * Add fresh simulated article on refresh
   */
  async refreshNews() {
    // Add a freshly synthesized news item to top of cache
    const freshTech = {
      id: "tech-fresh-" + Date.now(),
      sector: "tech",
      sectorLabel: "Tech & AI",
      title: "Autonomous AI Research Agents Discover Room-Temperature Superconductor Material",
      summaryBullets: [
        "AI agents ran over 4 million crystal structure simulations in 48 hours to pinpoint novel ambient copper-substituted apatite compounds.",
        "Robotic synthesis labs verified zero electrical resistance at 22°C (71.6°F).",
        "Paves the way for lossless power grids, ultra-efficient MRI scanners, and ambient maglev transport."
      ],
      fullContent: `
        <p>A swarm of autonomous AI material science agents has identified and synthesized a novel crystalline compound that exhibits zero electrical resistance at ambient room temperature and pressure.</p>
        <p>The AI system evaluated millions of atomistic lattice arrangements before identifying a specific copper-doped ceramic structure. Automated robotic laboratory arms synthesized the sample overnight and verified complete diamagnetic levitation and zero voltage drop.</p>
        <p>Physicists call this the holy grail of condensed matter physics, promising to eliminate electrical line losses across global power grids.</p>
      `,
      source: "Nature Materials",
      sourceDomain: "nature.com",
      url: "https://nature.com",
      publishedAt: "Just now",
      readTime: "3 min read",
      imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80",
      sentiment: "🔥 Breaking News",
      aiContext: "Autonomous AI agents discover ambient room-temperature superconductor compound. Lossless power grids, verified by robotic synthesis labs."
    };

    // Insert at front
    this.cache.unshift(freshTech);
    return this.cache;
  }
}

// Export singleton instance
window.newsService = new NewsService();
