/* ==========================================================================
   SERENE DAILY AFFIRMATIONS - STYLE SHEET
   Calming pastel color palette, phone-first responsiveness, soothing backdrop.
   ========================================================================== */

:root {
    --bg-overlay: rgba(253, 251, 247, 0.72);
    --card-bg: rgba(255, 255, 255, 0.82);
    --card-border: rgba(255, 255, 255, 0.95);
    --text-main: #2d3748;
    --text-muted: #64748b;
    --accent-sage: #84a98c;
    --accent-sage-dark: #52796f;
    --accent-lavender: #b8c0e0;
    --accent-rose: #f4acb7;
    --shadow-soft: 0 10px 30px -5px rgba(50, 50, 93, 0.08), 0 5px 15px -5px rgba(0, 0, 0, 0.05);
    --shadow-glow: 0 0 25px rgba(132, 169, 140, 0.25);
    --radius-lg: 24px;
    --radius-md: 16px;
    --radius-sm: 12px;
    --transition-smooth: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    -webkit-tap-highlight-color: transparent;
}

body {
    font-family: 'Plus Jakarta Sans', sans-serif;
    color: var(--text-main);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    position: relative;
    background-color: #f7f9f7;
    overflow-x: hidden;
}

/* Dynamic Background Imagery Layer */
.bg-layer {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    transition: opacity 1.2s ease-in-out, background-image 1.2s ease-in-out;
    z-index: -2;
    opacity: 0.9;
    filter: brightness(0.95) saturate(0.9);
}

.bg-overlay-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at center, rgba(253, 251, 247, 0.68) 0%, rgba(245, 242, 235, 0.9) 100%);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    z-index: -1;
}

/* App Container Layout */
.app-container {
    width: 100%;
    max-width: 540px; /* Optimized phone & tablet width */
    padding: 24px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 22px;
    z-index: 1;
    margin: 0 auto;
}

/* Header & Time-of-Day Check-in */
header {
    text-align: center;
    width: 100%;
    margin-top: 10px;
}

.time-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 16px;
    background: rgba(255, 255, 255, 0.75);
    border: 1px solid var(--card-border);
    border-radius: 30px;
    font-size: 0.85rem;
    color: var(--accent-sage-dark);
    font-weight: 500;
    letter-spacing: 0.5px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.02);
    margin-bottom: 12px;
}

.greeting-title {
    font-family: 'Cinzel', serif;
    font-size: 1.6rem;
    color: #2b3a30;
    font-weight: 600;
    line-height: 1.3;
    margin-bottom: 6px;
}

.subtitle {
    font-size: 0.9rem;
    color: var(--text-muted);
    font-weight: 400;
}

/* Top Action Bar Buttons */
.top-nav {
    position: absolute;
    top: 20px;
    right: 20px;
    display: flex;
    gap: 12px;
    z-index: 10;
}

.icon-btn {
    background: rgba(255, 255, 255, 0.85);
    border: 1px solid rgba(255, 255, 255, 0.9);
    width: 44px;
    height: 44px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--accent-sage-dark);
    font-size: 1.1rem;
    cursor: pointer;
    box-shadow: var(--shadow-soft);
    transition: var(--transition-smooth);
    position: relative;
}

.icon-btn:hover, .icon-btn:active {
    transform: translateY(-2px);
    background: #ffffff;
    color: #2b3a30;
    box-shadow: var(--shadow-glow);
}

.badge-count {
    position: absolute;
    top: -2px;
    right: -2px;
    background: var(--accent-rose);
    color: white;
    font-size: 0.7rem;
    font-weight: 700;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #fff;
}

/* Mood Selection Buttons */
.mood-section {
    width: 100%;
    text-align: center;
}

.mood-buttons-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px;
    width: 100%;
}

.mood-btn {
    background: rgba(255, 255, 255, 0.75);
    border: 1px solid var(--card-border);
    padding: 9px 16px;
    border-radius: 30px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 0.88rem;
    font-weight: 500;
    color: var(--text-main);
    cursor: pointer;
    transition: var(--transition-smooth);
    display: flex;
    align-items: center;
    gap: 6px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.02);
}

.mood-btn:hover {
    background: rgba(255, 255, 255, 0.95);
    transform: translateY(-2px);
}

.mood-btn.active {
    background: var(--accent-sage);
    color: white;
    border-color: var(--accent-sage);
    box-shadow: 0 4px 15px rgba(132, 169, 140, 0.35);
}

/* Affirmation Display Card */
.quote-card {
    width: 100%;
    background: var(--card-bg);
    border: 1px solid var(--card-border);
    border-radius: var(--radius-lg);
    padding: 36px 28px;
    text-align: center;
    box-shadow: var(--shadow-soft);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    position: relative;
    transition: var(--transition-smooth);
    min-height: 230px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.quote-card.fade-out {
    opacity: 0;
    transform: translateY(8px) scale(0.98);
}

.quote-card.fade-in {
    opacity: 1;
    transform: translateY(0) scale(1);
}

.quote-icon {
    font-size: 1.6rem;
    color: var(--accent-sage);
    opacity: 0.5;
    margin-bottom: 14px;
}

.quote-text {
    font-family: 'Cinzel', serif;
    font-size: 1.35rem;
    line-height: 1.6;
    color: #1e293b;
    margin-bottom: 14px;
    font-weight: 400;
}

.quote-author {
    font-size: 0.88rem;
    color: var(--accent-sage-dark);
    font-style: italic;
    letter-spacing: 0.5px;
}

.cycle-indicator {
    margin-top: 16px;
    font-size: 0.72rem;
    color: var(--text-muted);
    background: rgba(0,0,0,0.03);
    padding: 4px 12px;
    border-radius: 12px;
}

/* Card Control Buttons */
.card-actions {
    display: flex;
    gap: 12px;
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;
}

.action-btn {
    background: rgba(255, 255, 255, 0.85);
    border: 1px solid var(--card-border);
    padding: 11px 18px;
    border-radius: 30px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--text-main);
    cursor: pointer;
    transition: var(--transition-smooth);
    display: inline-flex;
    align-items: center;
    gap: 8px;
    box-shadow: var(--shadow-soft);
}

.action-btn:hover {
    background: #ffffff;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0,0,0,0.06);
}

.action-btn.fav-btn.favorited {
    color: #e63946;
    background: #fff5f5;
    border-color: #fca5a5;
}

.action-btn.primary {
    background: var(--accent-sage);
    color: white;
    border-color: var(--accent-sage);
}

.action-btn.primary:hover {
    background: var(--accent-sage-dark);
}

footer {
    margin-bottom: 16px;
    text-align: center;
    font-size: 0.78rem;
    color: var(--text-muted);
    opacity: 0.8;
}

/* Modals & Overlay Drawers */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(15, 23, 42, 0.4);
    backdrop-filter: blur(6px);
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
    padding: 20px;
}

.modal-overlay.active {
    opacity: 1;
    pointer-events: auto;
}

.modal-card {
    background: #ffffff;
    border-radius: var(--radius-lg);
    width: 100%;
    max-width: 480px;
    max-height: 85vh;
    overflow-y: auto;
    padding: 26px;
    box-shadow: 0 20px 40px rgba(0,0,0,0.15);
    transform: translateY(20px);
    transition: transform 0.3s ease;
    position: relative;
}

.modal-overlay.active .modal-card {
    transform: translateY(0);
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 18px;
    border-bottom: 1px solid #f1f5f9;
    padding-bottom: 10px;
}

.modal-title {
    font-family: 'Cinzel', serif;
    font-size: 1.2rem;
    color: var(--text-main);
}

.close-btn {
    background: none;
    border: none;
    font-size: 1.2rem;
    color: var(--text-muted);
    cursor: pointer;
    padding: 4px;
}

.close-btn:hover {
    color: var(--text-main);
}

/* Favorites List Styling */
.favorites-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.favorite-item {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    padding: 14px;
    border-radius: var(--radius-md);
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 10px;
}

.fav-content p {
    font-family: 'Cinzel', serif;
    font-size: 0.9rem;
    color: var(--text-main);
    margin-bottom: 4px;
}

.fav-content span {
    font-size: 0.72rem;
    color: var(--accent-sage-dark);
    text-transform: capitalize;
}

.remove-fav-btn {
    background: none;
    border: none;
    color: #cbd5e1;
    cursor: pointer;
    font-size: 0.95rem;
    transition: color 0.2s;
}

.remove-fav-btn:hover {
    color: #ef4444;
}

.empty-state {
    text-align: center;
    padding: 30px 10px;
    color: var(--text-muted);
}

.empty-state i {
    font-size: 2.2rem;
    margin-bottom: 10px;
    opacity: 0.4;
}

/* Custom Quote Form */
.form-group {
    margin-bottom: 16px;
    text-align: left;
}

.form-group label {
    display: block;
    font-size: 0.82rem;
    font-weight: 600;
    color: var(--text-main);
    margin-bottom: 6px;
}

.form-control {
    width: 100%;
    padding: 11px 14px;
    border: 1px solid #cbd5e1;
    border-radius: var(--radius-sm);
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 0.9rem;
    outline: none;
    transition: border-color 0.2s;
}

.form-control:focus {
    border-color: var(--accent-sage);
}

textarea.form-control {
    resize: vertical;
    min-height: 85px;
}

.submit-btn {
    width: 100%;
    background: var(--accent-sage);
    color: white;
    border: none;
    padding: 12px;
    border-radius: var(--radius-sm);
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    transition: var(--transition-smooth);
}

.submit-btn:hover {
    background: var(--accent-sage-dark);
}

/* Share Canvas Modal */
.canvas-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 14px;
}

#shareCanvas {
    max-width: 100%;
    height: auto;
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-soft);
}

/* Toast Notifications */
.toast-notification {
    position: fixed;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%) translateY(100px);
    background: #2b3a30;
    color: #ffffff;
    padding: 10px 20px;
    border-radius: 30px;
    font-size: 0.82rem;
    font-weight: 500;
    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
    z-index: 200;
    opacity: 0;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    display: flex;
    align-items: center;
    gap: 8px;
}

.toast-notification.show {
    transform: translateX(-50%) translateY(0);
    opacity: 1;
}

/* Responsive phone optimizations */
@media (max-width: 480px) {
    .app-container {
        padding: 14px;
        gap: 16px;
    }

    .top-nav {
        top: 12px;
        right: 12px;
    }

    .greeting-title {
        font-size: 1.35rem;
    }

    .quote-card {
        padding: 24px 18px;
        min-height: 200px;
    }

    .quote-text {
        font-size: 1.15rem;
    }

    .mood-btn {
        padding: 8px 12px;
        font-size: 0.82rem;
    }

    .action-btn {
        padding: 9px 14px;
        font-size: 0.8rem;
    }
}