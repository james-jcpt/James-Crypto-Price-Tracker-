export function initPremium() {
    const section = document.getElementById('premium-section');
    section.innerHTML = `
        <h3>Premium Access</h3>
        <button id="subscribe-week">Subscribe Weekly</button>
        <button id="subscribe-month">Subscribe Monthly</button>
        <button id="subscribe-year">Subscribe Yearly</button>
    `;

    document.getElementById('subscribe-week').onclick = () => startPayment('week');
    document.getElementById('subscribe-month').onclick = () => startPayment('month');
    document.getElementById('subscribe-year').onclick = () => startPayment('year');
}

function startPayment(period) {
    FlutterwaveCheckout({
        public_key:FLWPUBK-880e66e9856c476f3ef5a717089541af-X
        tx_ref: "JCI_" + Date.now(),
        amount: 5,
        currency: "USD",
        payment_options: "card,mobilemoney,ussd",
        customer: { email: "adeboyejames147@gmail.com" },
        callback: function (data) {
            alert("Payment Successful: " + data.status);
        },
        onclose: function() { console.log("Payment closed"); }
    });
}
