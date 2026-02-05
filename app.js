import { displayPortfolio } from './portfolio.js';
import { fetchNews, updateLeaderboardUI } from './ui.js';
import { setupNotifications } from './notifications.js';
import { initPremium } from './premium.js';
import { fetchPredictions } from './ai.js';
import { getLeaderboard } from './backend.js';

document.addEventListener("DOMContentLoaded", () => {
    displayPortfolio();
    fetchNews();
    setupNotifications();
    initPremium();
    fetchPredictions();

    getLeaderboard(data => {
        updateLeaderboardUI(data);
    });
});
