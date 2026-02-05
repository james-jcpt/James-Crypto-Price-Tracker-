// api/news.js
const fetch = require('node-fetch');

module.exports = async (req, res) => {
  try {
    // Fetch latest 5 crypto news from CoinGecko
    const response = await fetch(
      `https://api.coingecko.com/api/v3/status_updates?per_page=5`
    );
    const data = await response.json();

    res.status(200).json(data.status_updates || []); // send news array
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
};
