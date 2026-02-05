let chart;
let selectedCoin = 'bitcoin';

export function displayPortfolio() {
    const portfolio = document.getElementById('portfolio-section');
    portfolio.innerHTML = `
        <label>Select Coin:</label>
        <select id="coin-select">
            <option value="bitcoin">Bitcoin</option>
            <option value="ethereum">Ethereum</option>
            <option value="dogecoin">Dogecoin</option>
        </select>
    `;

    document.getElementById('coin-select').addEventListener('change', e => {
        selectedCoin = e.target.value;
        updateChart();
    });

    updateChart();
}

async function fetchCoinData(coin) {
    const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=1&interval=minute`);
    const data = await res.json();
    return data.prices;
}

async function updateChart() {
    const data = await fetchCoinData(selectedCoin);
    const ctx = document.getElementById('coin-chart').getContext('2d');
    if (chart) chart.destroy();

    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.map(item => new Date(item[0]).toLocaleTimeString()),
            datasets: [{
                label: selectedCoin.toUpperCase(),
                data: data.map(item => item[1]),
                borderColor: 'blue',
                fill: false
            }]
        },
        options: { responsive: true, animation: false }
    });

    setTimeout(updateChart, 1000); // Update every 1 second
}
