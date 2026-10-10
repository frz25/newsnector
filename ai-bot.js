/**
 * NewsNectar - Contextual AI Chatbot Engine
 * Powers the embedded assistant for each news article, grounded in article facts.
 */

class NectarAIBot {
  constructor() {
    this.currentArticle = null;
    this.apiKey = localStorage.getItem("newsnectar_apikey") || "";
    this.modelType = localStorage.getItem("newsnectar_model") || "nectar-nlp";
  }

  /**
   * Bind the AI assistant to a specific article context
   */
  setContext(article) {
    this.currentArticle = article;
  }

  /**
   * Update API key and model preferences
   */
  updateSettings(apiKey, modelType) {
    this.apiKey = apiKey;
    this.modelType = modelType;
    localStorage.setItem("newsnectar_apikey", apiKey);
    localStorage.setItem("newsnectar_model", modelType);
  }

  /**
   * Generate answer based on user query and article context
   */
  async generateAnswer(userQuery) {
    if (!this.currentArticle) {
      return "I need a news story selected to provide grounded answers.";
    }

    const queryLower = userQuery.toLowerCase().trim();

    // Check if custom Gemini API Key is provided
    if (this.apiKey && this.modelType === "gemini-flash") {
      try {
        return await this.callGeminiAPI(userQuery);
      } catch (err) {
        console.warn("Gemini API call failed, falling back to Nectar NLP Engine:", err);
      }
    }

    // Default: Grounded Nectar NLP Engine (Fast, zero-latency synthesis)
    return this.synthesizeLocalResponse(queryLower, this.currentArticle);
  }

  /**
   * Grounded local NLP response synthesizer
   */
  synthesizeLocalResponse(query, article) {
    const title = article.title;
    const bullets = article.summaryBullets;
    const source = article.source;

    // Pattern 1: Executive 3-Bullet Summary / TLDR
    if (query.includes("3-bullet") || query.includes("summary") || query.includes("tldr") || query.includes("key point")) {
      return `
        Here is the <strong>3-Bullet Executive Summary</strong> for <em>"${title}"</em>:
        <ul>
          <li><strong>Core Event:</strong> ${bullets[0]}</li>
          <li><strong>Key Technical / Market Insight:</strong> ${bullets[1]}</li>
          <li><strong>Outlook & Next Step:</strong> ${bullets[2] || bullets[0]}</li>
        </ul>
      `;
    }

    // Pattern 2: Why it matters / Significance
    if (query.includes("why") || query.includes("matter") || query.includes("significant") || query.includes("important")) {
      return `
        <strong>Why this story matters:</strong><br>
        Reported by <em>${source}</em>, this story is pivotal because ${bullets[0].toLowerCase()} 
        <br><br>
        The broader implication is that <strong>${bullets[1] || 'it shifts the landscape of this sector'}</strong>, establishing a major precedent for future developments.
      `;
    }

    // Pattern 3: Explain like I'm 5 (ELI5)
    if (query.includes("eli5") || query.includes("explain like") || query.includes("simple") || query.includes("5 years old")) {
      return `
        <strong>ELI5 (Simple Breakdown):</strong><br>
        Imagine someone figured out a super clever trick to make things work way faster and cleaner! 
        <br><br>
        In simple words: <em>${title}</em>. Scientists and experts checked it out, and it means people won't have to wait so long or waste as much energy anymore! 🍯
      `;
    }

    // Pattern 4: Future Impact / Implications
    if (query.includes("future") || query.includes("impact") || query.includes("implication") || query.includes("next")) {
      return `
        <strong>Future Impact Analysis:</strong><br>
        ${bullets[2] ? `🚀 ${bullets[2]}` : `🚀 Experts project rapid deployment across industry sectors in the coming years.`}
        <br><br>
        Key areas to monitor include regulatory frameworks, commercial adoption timelines, and competition from alternative technologies.
      `;
    }

    // Pattern 5: Source & Credibility
    if (query.includes("source") || query.includes("who published") || query.includes("reliable") || query.includes("author")) {
      return `
        This report originates directly from <strong>${source}</strong> (${article.sourceDomain}). 
        The report carries a sentiment tag of <strong>${article.sentiment}</strong> with an estimated read time of <strong>${article.readTime}</strong>.
      `;
    }

    // General Context Grounded Fallback
    return `
      Based directly on the report <em>"${title}"</em>:
      <br><br>
      • <strong>Key Fact:</strong> ${bullets[0]}
      <br>
      • <strong>Details:</strong> ${bullets[1] || 'Further background is detailed in the main article body.'}
      <br><br>
      Is there a specific detail about the source, technology, or future timeline you would like me to unpack?
    `;
  }

  /**
   * Optional Gemini Flash API caller if user enters their own key
   */
  async callGeminiAPI(userQuery) {
    const prompt = `
      You are Nectar AI, an assistant for the news app NewsNectar.
      Answer the user's question concisely based ONLY on the following news article.
      
      ARTICLE TITLE: ${this.currentArticle.title}
      SOURCE: ${this.currentArticle.source}
      SUMMARY BULLETS: ${this.currentArticle.summaryBullets.join(" | ")}
      AI CONTEXT: ${this.currentArticle.aiContext}
      
      USER QUESTION: ${userQuery}
      
      Format response with clear HTML tags (<strong>, <ul>, <li>, etc.).
    `;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.apiKey}`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    if (!response.ok) throw new Error("Gemini API HTTP Error " + response.status);
    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  }
}

// Export singleton instance
window.nectarAIBot = new NectarAIBot();
