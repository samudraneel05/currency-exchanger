document.addEventListener('DOMContentLoaded', function () {
    // Fetch the list of supported currencies
    fetch('https://openexchangerates.org/api/currencies.json')
        .then(response => response.json())
        .then(data => {
            const currencies = data;

            // Get the select elements for base and target currencies
            const baseCurrencySelect = document.querySelector('#baseCurrency');
            const targetCurrencySelect = document.querySelector('#targetCurrency');

            // Populate the dropdown options with currencies
            for (const currencyCode in currencies) {
                // Create option element
                const option = document.createElement('option');
                option.value = currencyCode;
                option.text = `${currencyCode} - ${currencies[currencyCode]}`;

                // Append option to both selects
                baseCurrencySelect.add(option.cloneNode(true));
                targetCurrencySelect.add(option);
            }
        })
        .catch(error => {
            console.error('Error fetching currency list:', error);
        });

    // Handle form submission
    document.querySelector('#currencyForm').onsubmit = function (event) {
        event.preventDefault(); // Prevent default form submission

        const amount = document.querySelector('#amount').value;
        const baseCurrency = document.querySelector('#baseCurrency').value;
        const targetCurrency = document.querySelector('#targetCurrency').value;

        // Fetch the exchange rates
        fetch(`https://openexchangerates.org/api/latest.json?app_id=6c6db4703b43478b8812e79257a017f5&base=${baseCurrency}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                const exchangeRate = data.rates[targetCurrency];
                if (exchangeRate !== undefined) {
                    const convertedAmount = (amount * exchangeRate).toFixed(3);
                    document.querySelector('#result').innerHTML = `${amount} ${baseCurrency} is equal to ${convertedAmount} ${targetCurrency}`;
                } else {
                    document.querySelector('#result').innerHTML = 'Invalid Target Currency.';
                }
            })
            .catch(error => {
                console.error('Error fetching exchange rates:', error);
                document.querySelector('#result').innerHTML = `Error fetching exchange rates. Please try again later. (${error.message})`;
            });
    };
});
