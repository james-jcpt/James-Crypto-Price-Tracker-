// api/coins.js
const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const coin = req.query.coin || 'bitcoin'; // default to Bitcoin
  const days = req.query.days || 7; // default 7-day chart

  try {
    // Fetch price data from CoinGecko
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=${days}`
    );

    const data = await response.json();

    res.status(200).json(data); // send data to frontend
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch coin data' });
  }
};
