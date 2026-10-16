    <script>
        /* ==========================================================================
           JAVASCRIPT SECTION (script.js)
           Strictly divided into DATA, RULES/STATE MANAGEMENT, and DISPLAY/UI CONTROLLERS.
           ========================================================================== */

        /* ==========================================================================
           1. DATA SECTION
           ========================================================================== */
        const AFFIRMATIONS_DATA = {
            anxious: [
                { id: "anx_1", text: "Breathe softly. You do not have to figure out your entire life in this single moment.", author: "Mindful Reflection" },
                { id: "anx_2", text: "This feeling is temporary. It is just a wave passing through, and you are the anchor.", author: "Inner Calm" },
                { id: "anx_3", text: "You are safe in this present moment. Give yourself permission to slow down.", author: "Serenity Guide" },
                { id: "anx_4", text: "You have survived every hard day so far. Trust your quiet resilience.", author: "Peaceful Mind" },
                { id: "anx_5", text: "Inhale peace, exhale tension. You are doing much better than you realize.", author: "Gentle Reminder" }
            ],
            confident: [
                { id: "cnf_1", text: "You hold the wisdom, strength, and capability to embrace whatever comes your way.", author: "Self-Belief" },
                { id: "cnf_2", text: "Your potential is limitless. Step boldly into the space you deserve.", author: "Inner Power" },
                { id: "cnf_3", text: "You do not need permission to shine warmly and authentically.", author: "Confidence Daily" },
                { id: "cnf_4", text: "Trust in your unique gifts. You are fully equipped to build a radiant life.", author: "Courageous Soul" },
                { id: "cnf_5", text: "Your presence is meaningful, and your voice carries value.", author: "Empowerment" }
            ],
            sad: [
                { id: "sad_1", text: "It is completely okay to feel sad. Be gentle with yourself while you heal.", author: "Soft Space" },
                { id: "sad_2", text: "Tears are the heart's way of washing away heavy sorrow. Rest comfortably.", author: "Compassion" },
                { id: "sad_3", text: "Even on the darkest days, clouds always make room for the sun once again.", author: "Hope Restored" },
                { id: "sad_4", text: "Your value does not diminish because you are going through a difficult season.", author: "Gentle Care" },
                { id: "sad_5", text: "Give yourself time. Healing is not a race, it is a quiet unfolding.", author: "Healing Journey" }
            ],
            happy: [
                { id: "hap_1", text: "Savor this joy. Let it soak into your body and illuminate your spirit.", author: "Joyful Living" },
                { id: "hap_2", text: "Your happiness is contagious; radiate your lightness into the world today.", author: "Warm Light" },
                { id: "hap_3", text: "Celebrate the small and beautiful moments that fill your cup.", author: "Gratitude" },
                { id: "hap_4", text: "You deserve to experience warmth, laughter, and abundance without hesitation.", author: "Pure Joy" },
                { id: "hap_5", text: "Hold onto this lightness. It is a true reflection of your vibrant heart.", author: "Radiant Life" }
            ],
            "self-love": [
                { id: "slv_1", text: "You are worthy of the exact same kindness and patience you give to others.", author: "Self-Compassion" },
                { id: "slv_2", text: "Embrace your flaws with grace; they make your story wonderfully human.", author: "Unconditional Love" },
                { id: "slv_3", text: "You are enough just as you are right now—no extra accomplishments required.", author: "Wholeness" },
                { id: "slv_4", text: "Nurturing yourself is not selfish; it is essential for your well-being.", author: "Soul Care" },
                { id: "slv_5", text: "Honoring your needs is a supreme act of self-respect and love.", author: "Inner Honor" }
            ]
        };

        // Curated peaceful landscape image backgrounds (Unsplash High-Res URLs)
        const MOOD_BACKGROUNDS = {
            anxious: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80", // Soft tranquil ocean waves
            confident: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80", // Majestic serene mountains
            sad: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=1200&q=80", // Gentle misty forest leaves
            happy: "https://images.unsplash.com/photo-1499002238440-d264edd596ec?auto=format&fit=crop&w=1200&q=80", // Warm lavender field sunset
            "self-love": "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1200&q=80" // Warm calm golden sunlight foliage
        };


        /* ==========================================================================
           2. RULES / STATE MANAGEMENT SECTION
           ========================================================================== */
        const AppState = {
            currentMood: "anxious",
            currentQuote: null,
            favorites: [],
            // Cycle tracker keeps track of shown quote IDs per mood to prevent repetitions
            cycleTracker: {
                anxious: [],
                confident: [],
                sad: [],
                happy: [],
                "self-love": []
            },
            
            init() {
                // Load Favorites from LocalStorage safely
                try {
                    const storedFavs = localStorage.getItem("serene_favorites");
                    if (storedFavs) this.favorites = JSON.parse(storedFavs);
                    
                    const storedCycles = localStorage.getItem("serene_cycles");
                    if (storedCycles) this.cycleTracker = JSON.parse(storedCycles);
                } catch (e) {
                    console.error("LocalStorage load error:", e);
                }
            },

            saveFavorites() {
                try {
                    localStorage.setItem("serene_favorites", JSON.stringify(this.favorites));
                } catch (e) {
                    console.error("LocalStorage save error:", e);
                }
            },

            saveCycles() {
                try {
                    localStorage.setItem("serene_cycles", JSON.stringify(this.cycleTracker));
                } catch (e) {
                    console.error("LocalStorage save error:", e);
                }
            },

            /* Rule Engine: Guarantees full quote cycle before repeating any quote */
            getNextQuoteForMood(mood) {
                const pool = AFFIRMATIONS_DATA[mood] || [];
                if (pool.length === 0) return null;

                let shownIds = this.cycleTracker[mood] || [];

                // Check if full cycle has completed
                if (shownIds.length >= pool.length) {
                    shownIds = []; // Reset cycle for this mood
                }

                // Filter available quotes not yet shown in this cycle
                const availableQuotes = pool.filter(q => !shownIds.includes(q.id));

                // Random selection from remaining non-shown pool
                const selectedQuote = availableQuotes[Math.floor(Math.random() * availableQuotes.length)];

                // Update tracked shown IDs
                shownIds.push(selectedQuote.id);
                this.cycleTracker[mood] = shownIds;
                this.saveCycles();

                this.currentQuote = selectedQuote;
                return {
                    quote: selectedQuote,
                    currentIndex: shownIds.length,
                    totalCount: pool.length
                };
            },

            toggleFavorite(quote) {
                if (!quote) return false;
                const index = this.favorites.findIndex(item => item.id === quote.id);
                let isFav = false;

                if (index > -1) {
                    this.favorites.splice(index, 1);
                    isFav = false;
                } else {
                    this.favorites.push({ ...quote, mood: this.currentMood });
                    isFav = true;
                }

                this.saveFavorites();
                return isFav;
            },

            isFavorited(quoteId) {
                return this.favorites.some(item => item.id === quoteId);
            },

            addCustomQuote(mood, text, author) {
                const id = "custom_" + Date.now();
                const newQuote = {
                    id,
                    text: text.trim(),
                    author: author.trim() || "Self-Affirmation"
                };

                if (!AFFIRMATIONS_DATA[mood]) AFFIRMATIONS_DATA[mood] = [];
                AFFIRMATIONS_DATA[mood].push(newQuote);

                return newQuote;
            }
        };


        /* ==========================================================================
           3. DISPLAY / UI CONTROLLERS SECTION
           ========================================================================== */
        const UIController = {
            // Elements
            elements: {
                bgLayer: document.getElementById("bgLayer"),
                timeGreeting: document.getElementById("timeGreeting"),
                timeIcon: document.getElementById("timeIcon"),
                moodGrid: document.getElementById("moodGrid"),
                quoteCard: document.getElementById("quoteCard"),
                quoteText: document.getElementById("quoteText"),
                quoteAuthor: document.getElementById("quoteAuthor"),
                cycleTracker: document.getElementById("cycleTracker"),
                nextQuoteBtn: document.getElementById("nextQuoteBtn"),
                favToggleBtn: document.getElementById("favToggleBtn"),
                favHeartIcon: document.getElementById("favHeartIcon"),
                favBadge: document.getElementById("favBadge"),
                favoritesNavBtn: document.getElementById("favoritesNavBtn"),
                customQuoteNavBtn: document.getElementById("customQuoteNavBtn"),
                shareBtn: document.getElementById("shareBtn"),
                favoritesModal: document.getElementById("favoritesModal"),
                customModal: document.getElementById("customModal"),
                shareModal: document.getElementById("shareModal"),
                favoritesList: document.getElementById("favoritesList"),
                customQuoteForm: document.getElementById("customQuoteForm"),
                shareCanvas: document.getElementById("shareCanvas"),
                downloadCanvasBtn: document.getElementById("downloadCanvasBtn"),
                toast: document.getElementById("toast"),
                toastMessage: document.getElementById("toastMessage")
            },

            init() {
                AppState.init();
                this.updateTimeOfDayGreeting();
                this.bindEvents();
                this.loadMood(AppState.currentMood);
                this.updateFavBadge();
            },

            // 1. Time-of-Day Check-in Prompt
            updateTimeOfDayGreeting() {
                const hour = new Date().getHours();
                let greeting = "Good Morning";
                let iconClass = "fa-sun";

                if (hour >= 12 && hour < 17) {
                    greeting = "Good Afternoon";
                    iconClass = "fa-cloud-sun";
                } else if (hour >= 17 && hour < 21) {
                    greeting = "Good Evening";
                    iconClass = "fa-moon";
                } else if (hour >= 21 || hour < 5) {
                    greeting = "Restful Night";
                    iconClass = "fa-stars";
                }

                this.elements.timeGreeting.textContent = greeting;
                this.elements.timeIcon.className = `fa-solid ${iconClass}`;
            },

            // Load and Display Quote based on Mood
            loadMood(mood) {
                AppState.currentMood = mood;
                
                // Update active mood button UI
                const buttons = this.elements.moodGrid.querySelectorAll(".mood-btn");
                buttons.forEach(btn => {
                    btn.classList.toggle("active", btn.dataset.mood === mood);
                });

                // Update Background Image
                if (MOOD_BACKGROUNDS[mood]) {
                    this.elements.bgLayer.style.backgroundImage = `url('${MOOD_BACKGROUNDS[mood]}')`;
                }

                // Render next quote
                this.renderNextQuote();
            },

            renderNextQuote() {
                const card = this.elements.quoteCard;
                
                // Smooth fade transition
                card.classList.add("fade-out");

                setTimeout(() => {
                    const result = AppState.getNextQuoteForMood(AppState.currentMood);
                    if (!result) return;

                    const { quote, currentIndex, totalCount } = result;

                    this.elements.quoteText.textContent = `“${quote.text}”`;
                    this.elements.quoteAuthor.textContent = `— ${quote.author}`;
                    this.elements.cycleTracker.textContent = `Cycle Progress: ${currentIndex} / ${totalCount} viewed`;

                    // Update Favorite heart state
                    this.updateFavoriteButtonState();

                    card.classList.remove("fade-out");
                    card.classList.add("fade-in");

                    setTimeout(() => card.classList.remove("fade-in"), 400);
                }, 300);
            },

            updateFavoriteButtonState() {
                const isFav = AppState.isFavorited(AppState.currentQuote?.id);
                const btn = this.elements.favToggleBtn;
                const icon = this.elements.favHeartIcon;

                if (isFav) {
                    btn.classList.add("favorited");
                    icon.className = "fa-solid fa-heart";
                } else {
                    btn.classList.remove("favorited");
                    icon.className = "fa-regular fa-heart";
                }
            },

            updateFavBadge() {
                const count = AppState.favorites.length;
                const badge = this.elements.favBadge;
                if (count > 0) {
                    badge.textContent = count;
                    badge.style.display = "flex";
                } else {
                    badge.style.display = "none";
                }
            },

            // Render Favorites Drawer
            renderFavorites() {
                const container = this.elements.favoritesList;
                container.innerHTML = "";

                if (AppState.favorites.length === 0) {
                    container.innerHTML = `
                        <div class="empty-state">
                            <i class="fa-regular fa-heart"></i>
                            <p>No favorited affirmations yet.</p>
                            <span style="font-size:0.8rem; opacity:0.8;">Click the heart icon on any quote to keep it close.</span>
                        </div>
                    `;
                    return;
                }

                AppState.favorites.forEach(fav => {
                    const item = document.createElement("div");
                    item.className = "favorite-item";
                    item.innerHTML = `
                        <div class="fav-content">
                            <p>“${fav.text}”</p>
                            <span>${fav.mood} • ${fav.author}</span>
                        </div>
                        <button class="remove-fav-btn" data-id="${fav.id}" title="Remove Favorite">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    `;
                    container.appendChild(item);
                });

                // Attach remove click handlers
                container.querySelectorAll(".remove-fav-btn").forEach(btn => {
                    btn.addEventListener("click", (e) => {
                        const id = e.currentTarget.dataset.id;
                        AppState.favorites = AppState.favorites.filter(item => item.id !== id);
                        AppState.saveFavorites();
                        this.renderFavorites();
                        this.updateFavBadge();
                        this.updateFavoriteButtonState();
                        this.showToast("Removed from favorites");
                    });
                });
            },

            // Generate HTML5 Canvas Shareable Image Card
            generateShareImage() {
                const canvas = this.elements.shareCanvas;
                const ctx = canvas.getContext("2d");
                const quote = AppState.currentQuote;

                if (!quote) return;

                // Canvas dimensions
                const width = 600;
                const height = 600;
                canvas.width = width;
                canvas.height = height;

                // Gradient background based on mood theme
                const gradient = ctx.createLinearGradient(0, 0, width, height);
                gradient.addColorStop(0, "#f3f7f4");
                gradient.addColorStop(1, "#e2ece9");
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, width, height);

                // Decorative Inner Border
                ctx.strokeStyle = "#84a98c";
                ctx.lineWidth = 4;
                ctx.strokeRect(30, 30, width - 60, height - 60);

                // Soft background watermark text
                ctx.font = "italic 700 80px Sacramento";
                ctx.fillStyle = "rgba(132, 169, 140, 0.08)";
                ctx.textAlign = "center";
                ctx.fillText("Serene Affirmations", width / 2, 140);

                // Quote Text
                ctx.font = "400 24px 'Cinzel', serif";
                ctx.fillStyle = "#2d3748";
                ctx.textAlign = "center";

                // Word wrap logic for Canvas
                const words = quote.text.split(" ");
                let line = "";
                const lines = [];
                const maxWidth = 460;

                for (let n = 0; n < words.length; n++) {
                    const testLine = line + words[n] + " ";
                    const metrics = ctx.measureText(testLine);
                    if (metrics.width > maxWidth && n > 0) {
                        lines.push(line);
                        line = words[n] + " ";
                    } else {
                        line = testLine;
                    }
                }
                lines.push(line);

                // Render Wrapped Text Centered
                let startY = (height / 2) - ((lines.length * 36) / 2);
                lines.forEach((l) => {
                    ctx.fillText(l.trim(), width / 2, startY);
                    startY += 38;
                });

                // Render Author
                ctx.font = "italic 18px 'Plus Jakarta Sans', sans-serif";
                ctx.fillStyle = "#52796f";
                ctx.fillText(`— ${quote.author}`, width / 2, startY + 25);

                // Footer
                ctx.font = "14px 'Plus Jakarta Sans', sans-serif";
                ctx.fillStyle = "#94a3b8";
                ctx.fillText("Serene Daily Affirmations", width / 2, height - 55);

                // Open Share Modal
                this.openModal(this.elements.shareModal);
            },

            // Modal Controls
            openModal(modal) {
                modal.classList.add("active");
            },

            closeModal(modal) {
                modal.classList.remove("active");
            },

            // Toast Notifications
            showToast(msg) {
                this.elements.toastMessage.textContent = msg;
                this.elements.toast.classList.add("show");
                setTimeout(() => {
                    this.elements.toast.classList.remove("show");
                }, 2800);
            },

            // Event Listeners Registration
            bindEvents() {
                // Mood selection click
                this.elements.moodGrid.addEventListener("click", (e) => {
                    const btn = e.target.closest(".mood-btn");
                    if (btn) {
                        const mood = btn.dataset.mood;
                        this.loadMood(mood);
                    }
                });

                // Next quote click
                this.elements.nextQuoteBtn.addEventListener("click", () => {
                    this.renderNextQuote();
                });

                // Favorite toggle click
                this.elements.favToggleBtn.addEventListener("click", () => {
                    if (!AppState.currentQuote) return;
                    const isFav = AppState.toggleFavorite(AppState.currentQuote);
                    this.updateFavoriteButtonState();
                    this.updateFavBadge();
                    this.showToast(isFav ? "Saved to favorites!" : "Removed from favorites");
                });

                // Navigation Modal Triggers
                this.elements.favoritesNavBtn.addEventListener("click", () => {
                    this.renderFavorites();
                    this.openModal(this.elements.favoritesModal);
                });

                this.elements.customQuoteNavBtn.addEventListener("click", () => {
                    this.openModal(this.elements.customModal);
                });

                this.elements.shareBtn.addEventListener("click", () => {
                    this.generateShareImage();
                });

                // Modal Close Buttons
                document.querySelectorAll(".closeModalBtn").forEach(btn => {
                    btn.addEventListener("click", (e) => {
                        const modalId = e.currentTarget.dataset.modal;
                        this.closeModal(document.getElementById(modalId));
                    });
                });

                // Close modal on overlay background click
                document.querySelectorAll(".modal-overlay").forEach(overlay => {
                    overlay.addEventListener("click", (e) => {
                        if (e.target === overlay) {
                            this.closeModal(overlay);
                        }
                    });
                });

                // Custom Quote Form Handling
                this.elements.customQuoteForm.addEventListener("submit", (e) => {
                    e.preventDefault();
                    const text = document.getElementById("customText").value;
                    const mood = document.getElementById("customMood").value;
                    const author = document.getElementById("customAuthor").value;

                    if (text) {
                        AppState.addCustomQuote(mood, text, author);
                        this.closeModal(this.elements.customModal);
                        this.elements.customQuoteForm.reset();
                        this.showToast("Custom affirmation added!");

                        // If created for current active mood, load it
                        if (mood === AppState.currentMood) {
                            this.renderNextQuote();
                        }
                    }
                });

                // Download Shareable Image
                this.elements.downloadCanvasBtn.addEventListener("click", () => {
                    const imageURI = this.elements.shareCanvas.toDataURL("image/png");
                    const link = document.createElement("a");
                    link.download = `affirmation-${AppState.currentMood}.png`;
                    link.href = imageURI;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    this.showToast("Image card downloaded!");
                });
            }
        };

        // Initialize application after DOM load
        window.addEventListener("DOMContentLoaded", () => {
            UIController.init();
        });
    </script>
</body>
