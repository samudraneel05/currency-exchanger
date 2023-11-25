// hisandfav.js

document.addEventListener('DOMContentLoaded', function () {
    // Constants for local storage keys
    const HISTORY_KEY = 'conversionHistory';
    const FAVORITES_KEY = 'favoritePairs';

    // Elements
    const historyList = document.getElementById('history-list');
    const favoritesList = document.getElementById('favorites-list');

    // Load history and favorites from local storage on page load
    let conversionHistory = loadFromLocalStorage(HISTORY_KEY) || [];
    let favoritePairs = loadFromLocalStorage(FAVORITES_KEY) || [];

    // Display initial data
    updateHistory();
    updateFavorites();

    // Example: Add conversion history

    // Example: Add favorite pairs
    addFavoritePair('USD to EUR');
    addFavoritePair('EUR to GBP');

    // Functions for updating and managing data

    function addConversionToHistory(pair, rate) {
        // Add conversion to history
        const conversion = { pair, rate, timestamp: new Date().toLocaleString() };
        conversionHistory.unshift(conversion); // Add to the beginning of the array
        saveToLocalStorage(HISTORY_KEY, conversionHistory);
        updateHistory();
    }

    function updateHistory() {
        // Update the HTML content for conversion history
        historyList.innerHTML = conversionHistory.map(conversion =>
            `<li>${conversion.timestamp}: ${conversion.pair} - ${conversion.rate}</li>`
        ).join('');
    }

    function addFavoritePair(pair) {
        // Add favorite pair
        if (!favoritePairs.includes(pair)) {
            favoritePairs.push(pair);
            saveToLocalStorage(FAVORITES_KEY, favoritePairs);
            updateFavorites();
        }
    }

    function updateFavorites() {
        // Update the HTML content for favorite currency pairs
        favoritesList.innerHTML = favoritePairs.map(pair =>
            `<li>${pair}</li>`
        ).join('');
    }

    // Utility functions for local storage
    function saveToLocalStorage(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    function loadFromLocalStorage(key) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    }
});
