const apiUrl = `https://api.exchangerate-api.com/v4/latest/`;

function fetchExchangeRate(baseCurrency, targetCurrency) {
    return fetch(`${apiUrl}${baseCurrency}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            return data.rates[targetCurrency];
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

function calculateAndDisplayResult(baseCurrency, targetCurrency) {
    const leftInput = document.querySelector('.left .mebleg');
    const rightInput = document.querySelector('.right .result');
    const amount = parseFloat(leftInput.value);
    if (!isNaN(amount)) {
        fetchExchangeRate(baseCurrency, targetCurrency)
            .then(rate => {
                const result = amount * rate;
                rightInput.value = result.toFixed(2);
            });
    } else {
        rightInput.value = '';
    }
}

const leftButtons = document.querySelectorAll('.left .btn');
leftButtons.forEach(button => {
    button.addEventListener('click', () => {
        leftButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        const baseCurrency = button.value;
        const targetCurrency = document.querySelector('.right .btn.active').value;
        calculateAndDisplayResult(baseCurrency, targetCurrency);
    });
});

const rightButtons = document.querySelectorAll('.right .btn');
rightButtons.forEach(button => {
    button.addEventListener('click', () => {
        rightButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        const targetCurrency = button.value;
        const baseCurrency = document.querySelector('.left .btn.active').value;
        calculateAndDisplayResult(baseCurrency, targetCurrency);
    });
});
