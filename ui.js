export async function fetchNews() {
    const newsSection = document.getElementById('news-section');
    newsSection.innerHTML = '<p>Loading live crypto news...</p>';

    const res = await fetch('https://cryptonews-api.com/api/v1/category?section=general&items=5&token=YOUR_API_KEY');
    const data = await res.json();
    newsSection.innerHTML = data.data.map(news => `
        <div>
            <h4>${news.title}</h4>
            ${news.image_url ? `<img src="${news.image_url}" width="100%">` : ''}
            <p>${news.description}</p>
        </div>
    `).join('');
}

export function updateLeaderboardUI(data) {
    const leaderboard = document.getElementById('leaderboard-section');
    leaderboard.innerHTML = '<h3>Leaderboard</h3>' +
        Object.entries(data || {}).sort((a,b) => b[1].score - a[1].score).map(([user, val]) =>
            `<p>${user}: ${val.score} points</p>`).join('');
}
