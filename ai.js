export function fetchPredictions() {
    const chartSection = document.getElementById('chart-section');
    const predictionDiv = document.createElement('div');
    predictionDiv.id = 'ai-prediction';
    predictionDiv.innerHTML = '<h4>AI Predictions:</h4><p>Predicting coin trends...</p>';
    chartSection.appendChild(predictionDiv);

    setInterval(() => {
        predictionDiv.innerHTML = '<h4>AI Predictions:</h4><p>Bitcoin expected to rise by +1.2% in next hour</p>';
    }, 5000);
}
