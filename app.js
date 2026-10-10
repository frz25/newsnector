/**
 * NewsNectar - Application Orchestrator & 3D Arc Carousel Engine
 * Controls 3D Fan Arc Carousel, Honeycomb Grid Rendering, Sector Partitions, Modal Reader, Audio TTS, and AI Chatbot UI.
 */

document.addEventListener("DOMContentLoaded", () => {
  // Application State
  const state = {
    currentSector: "all",
    searchQuery: "",
    articles: [],
    bookmarkedIds: JSON.parse(localStorage.getItem("newsnectar_bookmarks") || "[]"),
    activeArticle: null,
    speechUtterance: null,
    isSpeaking: false,

    // 3D Arc Carousel State
    carouselIndex: 0
  };

  // Color Palette Assignment for Arc Cards (Ref Image Inspired)
  const cardColors = ["orange", "yellow", "black", "purple", "white", "green", "red"];

  // DOM Element References
  const arcCarouselStage = document.getElementById("arcCarouselStage");
  const arcPrevBtn = document.getElementById("arcPrevBtn");
  const arcNextBtn = document.getElementById("arcNextBtn");
  const honeycombContainer = document.getElementById("honeycombContainer");
  const sectorButtons = document.querySelectorAll(".sector-btn");
  const searchInput = document.getElementById("searchInput");
  const clearSearchBtn = document.getElementById("clearSearchBtn");
  const totalCountDisplay = document.getElementById("totalCountDisplay");
  const activeFilterBadge = document.getElementById("activeFilterBadge");
  const emptyState = document.getElementById("emptyState");
  const resetFiltersBtn = document.getElementById("resetFiltersBtn");
  const refreshNewsBtn = document.getElementById("refreshNewsBtn");
  const bookmarksToggleBtn = document.getElementById("bookmarksToggleBtn");
  const bookmarkCount = document.getElementById("bookmarkCount");
  const getStartedBtn = document.getElementById("getStartedBtn");

  // Modal Elements
  const articleModalOverlay = document.getElementById("articleModalOverlay");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const modalSectorTag = document.getElementById("modalSectorTag");
  const modalSectorName = document.getElementById("modalSectorName");
  const modalImage = document.getElementById("modalImage");
  const modalSource = document.getElementById("modalSource");
  const modalTime = document.getElementById("modalTime");
  const modalSentiment = document.getElementById("modalSentiment");
  const modalTitle = document.getElementById("modalTitle");
  const modalBulletsList = document.getElementById("modalBulletsList");
  const modalFullText = document.getElementById("modalFullText");
  const modalSourceDomain = document.getElementById("modalSourceDomain");
  const modalSourceLink = document.getElementById("modalSourceLink");
  const ttsAudioBtn = document.getElementById("ttsAudioBtn");
  const bookmarkArticleBtn = document.getElementById("bookmarkArticleBtn");
  const shareArticleBtn = document.getElementById("shareArticleBtn");

  // AI Chat Elements
  const chatMessages = document.getElementById("chatMessages");
  const chatForm = document.getElementById("chatForm");
  const chatInput = document.getElementById("chatInput");
  const chatTyping = document.getElementById("chatTyping");
  const chipButtons = document.querySelectorAll(".chip-btn");

  // Settings Elements
  const settingsBtn = document.getElementById("settingsBtn");
  const settingsModalOverlay = document.getElementById("settingsModalOverlay");
  const closeSettingsBtn = document.getElementById("closeSettingsBtn");
  const cancelSettingsBtn = document.getElementById("cancelSettingsBtn");
  const saveSettingsBtn = document.getElementById("saveSettingsBtn");
  const apiKeyInput = document.getElementById("apiKeyInput");
  const aiModelSelect = document.getElementById("aiModelSelect");

  /* ==========================================================================
     1. INITIALIZATION
     ========================================================================== */
  async function initApp() {
    updateBookmarkBadge();
    loadSettingsIntoUI();
    await fetchAndRenderNews();
    setupEventListeners();
  }

  async function fetchAndRenderNews() {
    renderSkeletonLoader();
    try {
      const articles = await window.newsService.getNewsArticles(state.currentSector, state.searchQuery);
      state.articles = articles;

      // Render 3D Arc Carousel Hero Wheel
      render3DArcCarousel(articles);

      // Render Main Honeycomb Hexagonal Grid
      renderHoneycombGrid(articles);

      updateStatsBar(articles.length);
    } catch (err) {
      console.error("Error fetching news:", err);
      showToast("Error loading news stream.", "warning");
    }
  }

  /* ==========================================================================
     2. 3D FAN ARC CAROUSEL WHEEL ENGINE
     ========================================================================== */
  function render3DArcCarousel(articles) {
    if (!arcCarouselStage) return;
    arcCarouselStage.innerHTML = "";

    if (!articles || articles.length === 0) return;

    const carouselArticles = articles.slice(0, 7);
    carouselArticles.forEach((article, idx) => {
      const card = document.createElement("div");
      card.className = "arc-card";
      
      const color = cardColors[idx % cardColors.length];
      card.setAttribute("data-color", color);
      card.setAttribute("data-index", idx);

      card.innerHTML = `
        <div class="arc-card-top">
          <span class="arc-sector-tag">${article.sectorLabel}</span>
          <span class="arc-card-num">0${idx + 1}</span>
        </div>
        <h3 class="arc-card-headline">${article.title}</h3>
        <div class="arc-card-footer">
          <span>${article.source}</span>
          <span>${article.publishedAt}</span>
        </div>
      `;

      card.addEventListener("click", () => openArticleModal(article));
      arcCarouselStage.appendChild(card);
    });

    updateArcTransforms();
  }

  function updateArcTransforms() {
    const cards = arcCarouselStage.querySelectorAll(".arc-card");
    const total = cards.length;
    if (total === 0) return;

    const centerIdx = Math.floor(total / 2);
    const offsetIndex = state.carouselIndex;

    cards.forEach((card, idx) => {
      const positionOffset = (idx - centerIdx) + offsetIndex;
      
      const angle = positionOffset * 14;
      const translateX = positionOffset * 115;
      const translateY = Math.abs(positionOffset) * 22;
      const translateZ = -Math.abs(positionOffset) * 40;
      const rotateZ = positionOffset * 8;

      const zIndex = 50 - Math.abs(positionOffset) * 5;
      const opacity = Math.abs(positionOffset) > 3 ? 0.3 : 1;

      card.style.transform = `
        translateX(${translateX}px) 
        translateY(${translateY}px) 
        translateZ(${translateZ}px) 
        rotateZ(${rotateZ}deg) 
        rotateY(${angle * -0.4}deg)
      `;
      card.style.zIndex = zIndex;
      card.style.opacity = opacity;
    });
  }

  function rotateCarousel(direction) {
    if (direction === "next") {
      state.carouselIndex--;
    } else {
      state.carouselIndex++;
    }
    updateArcTransforms();
  }

  /* ==========================================================================
     3. HONEYCOMB HEXAGONAL GRID RENDERING
     ========================================================================== */
  function renderSkeletonLoader() {
    honeycombContainer.innerHTML = `
      <div class="hex-skeleton-loader">
        <div class="hex-skeleton-item"></div>
        <div class="hex-skeleton-item"></div>
        <div class="hex-skeleton-item"></div>
        <div class="hex-skeleton-item"></div>
        <div class="hex-skeleton-item"></div>
        <div class="hex-skeleton-item"></div>
      </div>
    `;
  }

  function renderHoneycombGrid(articles) {
    if (!articles || articles.length === 0) {
      honeycombContainer.innerHTML = "";
      emptyState.classList.remove("hidden");
      return;
    }

    emptyState.classList.add("hidden");
    honeycombContainer.innerHTML = "";

    articles.forEach((article) => {
      const hexCard = document.createElement("article");
      hexCard.className = "hex-card";
      hexCard.setAttribute("data-id", article.id);

      hexCard.innerHTML = `
        <div class="hex-outer-shape">
          <div class="hex-inner-content">
            <div class="hex-image-container">
              <img class="hex-image" src="${article.imageUrl}" alt="${article.title}" loading="lazy">
            </div>
            <div class="hex-overlay">
              <div class="hex-header">
                <span class="hex-sector-badge">${article.sectorLabel}</span>
                <span class="hex-time">${article.publishedAt}</span>
              </div>
              <div class="hex-body">
                <h3 class="hex-headline">${article.title}</h3>
                <div class="hex-footer">
                  <span><i class="fa-solid fa-newspaper"></i> ${article.source}</span>
                  <span class="hex-read-btn">Inspect <i class="fa-solid fa-chevron-right"></i></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;

      hexCard.addEventListener("click", () => openArticleModal(article));
      honeycombContainer.appendChild(hexCard);
    });
  }

  function updateStatsBar(count) {
    totalCountDisplay.textContent = count;
    activeFilterBadge.textContent = `Sector: ${getSectorDisplayName(state.currentSector)}`;
  }

  function getSectorDisplayName(key) {
    const map = {
      all: "All Streams",
      tech: "Tech & AI",
      business: "Business & Finance",
      science: "Science & Space",
      world: "World & Climate",
      culture: "Culture & Media",
      sports: "Sports & Gaming",
      health: "Health & Bio"
    };
    return map[key] || "All Streams";
  }

  /* ==========================================================================
     4. ARTICLE MODAL & AI CHATBOT INTEGRATION
     ========================================================================== */
  function openArticleModal(article) {
    state.activeArticle = article;
    window.nectarAIBot.setContext(article);

    modalSectorName.textContent = article.sectorLabel;
    modalImage.src = article.imageUrl;
    modalSource.textContent = article.source;
    modalTime.textContent = article.publishedAt;
    modalSentiment.innerHTML = `<i class="fa-solid fa-chart-pie"></i> ${article.sentiment}`;
    modalTitle.textContent = article.title;

    modalBulletsList.innerHTML = article.summaryBullets.map(b => `<li>${b}</li>`).join("");
    modalFullText.innerHTML = article.fullContent;

    modalSourceDomain.textContent = article.sourceDomain || article.source;
    modalSourceLink.href = article.url || "#";

    updateModalBookmarkBtn();
    resetAIChat(article);
    stopAudioTTS();

    articleModalOverlay.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    articleModalOverlay.classList.add("hidden");
    document.body.style.overflow = "";
    stopAudioTTS();
  }

  function resetAIChat(article) {
    chatMessages.innerHTML = `
      <div class="chat-message bot-message">
        <div class="message-avatar"><i class="fa-solid fa-robot"></i></div>
        <div class="message-content">
          <p>Hello! I am your <strong>Nectar AI Assistant</strong> for <em>"${article.title}"</em>. Ask me any question or key implication!</p>
        </div>
      </div>
    `;
    chatInput.value = "";
    chatTyping.classList.add("hidden");
  }

  async function handleUserChatMessage(userQuery) {
    if (!userQuery || userQuery.trim() === "") return;

    appendChatMessage("user", userQuery);
    chatInput.value = "";

    chatTyping.classList.remove("hidden");
    scrollChatToBottom();

    const botAnswer = await window.nectarAIBot.generateAnswer(userQuery);

    setTimeout(() => {
      chatTyping.classList.add("hidden");
      appendChatMessage("bot", botAnswer);
      scrollChatToBottom();
    }, 450);
  }

  function appendChatMessage(sender, text) {
    const msgDiv = document.createElement("div");
    msgDiv.className = `chat-message ${sender}-message`;

    const iconClass = sender === "user" ? "fa-solid fa-user" : "fa-solid fa-robot";
    msgDiv.innerHTML = `
      <div class="message-avatar"><i class="${iconClass}"></i></div>
      <div class="message-content"><p>${text}</p></div>
    `;

    chatMessages.appendChild(msgDiv);
    scrollChatToBottom();
  }

  function scrollChatToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  /* ==========================================================================
     5. AUDIO TTS & BOOKMARKS
     ========================================================================== */
  function toggleAudioTTS() {
    if (state.isSpeaking) {
      stopAudioTTS();
      showToast("Audio summary paused", "info");
    } else {
      startAudioTTS();
    }
  }

  function startAudioTTS() {
    if (!state.activeArticle) return;
    if (!('speechSynthesis' in window)) {
      showToast("Text-to-speech not supported.", "warning");
      return;
    }

    window.speechSynthesis.cancel();
    const summaryText = `${state.activeArticle.title}. Key summary points: ${state.activeArticle.summaryBullets.join(". ")}`;
    const utterance = new SpeechSynthesisUtterance(summaryText);

    utterance.onstart = () => {
      state.isSpeaking = true;
      ttsAudioBtn.querySelector("i").className = "fa-solid fa-pause";
      showToast("Playing audio summary...", "info");
    };
    utterance.onend = () => stopAudioTTS();
    utterance.onerror = () => stopAudioTTS();

    state.speechUtterance = utterance;
    window.speechSynthesis.speak(utterance);
  }

  function stopAudioTTS() {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    state.isSpeaking = false;
    ttsAudioBtn.querySelector("i").className = "fa-solid fa-volume-high";
  }

  function toggleBookmarkCurrentArticle() {
    if (!state.activeArticle) return;
    const id = state.activeArticle.id;
    const idx = state.bookmarkedIds.indexOf(id);

    if (idx > -1) {
      state.bookmarkedIds.splice(idx, 1);
      showToast("Removed from bookmarks.", "info");
    } else {
      state.bookmarkedIds.push(id);
      showToast("Saved to bookmarks! 🍯", "success");
    }

    localStorage.setItem("newsnectar_bookmarks", JSON.stringify(state.bookmarkedIds));
    updateBookmarkBadge();
    updateModalBookmarkBtn();
  }

  function updateBookmarkBadge() {
    bookmarkCount.textContent = state.bookmarkedIds.length;
  }

  function updateModalBookmarkBtn() {
    if (!state.activeArticle) return;
    const isBookmarked = state.bookmarkedIds.includes(state.activeArticle.id);
    const icon = bookmarkArticleBtn.querySelector("i");
    icon.className = isBookmarked ? "fa-solid fa-bookmark pulse-square" : "fa-regular fa-bookmark";
  }

  function toggleBookmarksView() {
    if (state.currentSector === "bookmarks") {
      state.currentSector = "all";
      sectorButtons[0].click();
    } else {
      state.currentSector = "bookmarks";
      sectorButtons.forEach(b => b.classList.remove("active"));
      const bookmarkedArticles = state.articles.filter(a => state.bookmarkedIds.includes(a.id));
      renderHoneycombGrid(bookmarkedArticles);
      updateStatsBar(bookmarkedArticles.length);
      activeFilterBadge.textContent = "Sector: Saved Bookmarks";
      showToast(`Showing ${bookmarkedArticles.length} saved stories`, "info");
    }
  }

  /* ==========================================================================
     6. SETTINGS & EVENT LISTENERS
     ========================================================================== */
  function loadSettingsIntoUI() {
    apiKeyInput.value = localStorage.getItem("newsnectar_apikey") || "";
    aiModelSelect.value = localStorage.getItem("newsnectar_model") || "nectar-nlp";
  }

  function saveSettings() {
    window.nectarAIBot.updateSettings(apiKeyInput.value.trim(), aiModelSelect.value);
    settingsModalOverlay.classList.add("hidden");
    showToast("Preferences saved!", "success");
  }

  function setupEventListeners() {
    if (arcPrevBtn) arcPrevBtn.addEventListener("click", () => rotateCarousel("prev"));
    if (arcNextBtn) arcNextBtn.addEventListener("click", () => rotateCarousel("next"));

    if (getStartedBtn) {
      getStartedBtn.addEventListener("click", () => {
        const target = document.getElementById("carousel");
        if (target) target.scrollIntoView({ behavior: "smooth" });
      });
    }

    sectorButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        sectorButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        state.currentSector = btn.getAttribute("data-sector");
        fetchAndRenderNews();
      });
    });

    searchInput.addEventListener("input", (e) => {
      state.searchQuery = e.target.value;
      clearSearchBtn.classList.toggle("hidden", !state.searchQuery);
      fetchAndRenderNews();
    });

    clearSearchBtn.addEventListener("click", () => {
      searchInput.value = "";
      state.searchQuery = "";
      clearSearchBtn.classList.add("hidden");
      fetchAndRenderNews();
    });

    refreshNewsBtn.addEventListener("click", async () => {
      refreshNewsBtn.querySelector("i").classList.add("fa-spin");
      await window.newsService.refreshNews();
      await fetchAndRenderNews();
      setTimeout(() => {
        refreshNewsBtn.querySelector("i").classList.remove("fa-spin");
        showToast("Stream Refreshed! ⚡", "success");
      }, 500);
    });

    bookmarksToggleBtn.addEventListener("click", toggleBookmarksView);
    resetFiltersBtn.addEventListener("click", () => {
      searchInput.value = "";
      state.searchQuery = "";
      state.currentSector = "all";
      sectorButtons[0].click();
    });

    closeModalBtn.addEventListener("click", closeModal);
    articleModalOverlay.addEventListener("click", (e) => {
      if (e.target === articleModalOverlay) closeModal();
    });

    ttsAudioBtn.addEventListener("click", toggleAudioTTS);
    bookmarkArticleBtn.addEventListener("click", toggleBookmarkCurrentArticle);
    shareArticleBtn.addEventListener("click", () => {
      if (state.activeArticle) {
        navigator.clipboard.writeText(`${state.activeArticle.title} - NewsNectar`);
        showToast("Headline copied to clipboard!", "success");
      }
    });

    chatForm.addEventListener("submit", (e) => {
      e.preventDefault();
      handleUserChatMessage(chatInput.value);
    });

    chipButtons.forEach(chip => {
      chip.addEventListener("click", () => {
        handleUserChatMessage(chip.getAttribute("data-question"));
      });
    });

    settingsBtn.addEventListener("click", () => {
      loadSettingsIntoUI();
      settingsModalOverlay.classList.remove("hidden");
    });
    closeSettingsBtn.addEventListener("click", () => settingsModalOverlay.classList.add("hidden"));
    cancelSettingsBtn.addEventListener("click", () => settingsModalOverlay.classList.add("hidden"));
    saveSettingsBtn.addEventListener("click", saveSettings);
  }

  function showToast(message, type = "info") {
    const toastContainer = document.getElementById("toastContainer");
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.innerHTML = `<i class="fa-solid fa-info-circle"></i> <span>${message}</span>`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // Launch App
  initApp();
});
