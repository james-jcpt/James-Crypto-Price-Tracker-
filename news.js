fetch("https://min-api.cryptocompare.com/data/v2/news/?lang=EN")
  .then(r => r.json())
  .then(d => {
    document.getElementById("news").innerHTML =
      d.Data.slice(0, 5).map(n => `
        <div>
          <img src="${n.imageurl}" width="120"/>
          <p>${n.title}</p>
        </div>
      `).join("");
  });
