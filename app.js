document.addEventListener('DOMContentLoaded', function () {
    // Fetch the list of supported currencies
    fetch('https://v6.exchangerate-api.com/v6/a0f12b49e4749744599c87f9/codes')
        .then(response => response.json())
        .then(data => {
            const currencies = data.supported_codes;

            // Get the select elements for base and target currencies
            const baseCurrencySelect = document.querySelector('#baseCurrency');
            const targetCurrencySelect = document.querySelector('#targetCurrency');

            // Populate the dropdown options with currencies
            currencies.forEach(currency => {
                // Create option element
                const option = document.createElement('option');
                option.value = currency[0];
                option.text = `${currency[0]} - ${currency[1]}`;

                // Append option to both selects
                baseCurrencySelect.add(option.cloneNode(true));
                targetCurrencySelect.add(option);
            });
        })
        .catch(error => {
            console.error('Error fetching currency list:', error);
        });

    // Handle form submission
    document.querySelector('#currencyForm').onsubmit = function (event) {
        event.preventDefault(); // Prevent default form submission

        const amount = document.querySelector('#amount').value;

        // Check if the amount is not negative
        if (amount < 0) {
            document.querySelector('#result').innerHTML = 'Amount cannot be negative.';
            return;
        }

        const baseCurrency = document.querySelector('#baseCurrency').value;
        const targetCurrency = document.querySelector('#targetCurrency').value;

        // Fetch the exchange rates
        fetch(`https://v6.exchangerate-api.com/v6/a0f12b49e4749744599c87f9/latest/${baseCurrency}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                const exchangeRate = data.conversion_rates[targetCurrency];
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
