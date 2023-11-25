document.addEventListener('DOMContentLoaded', function () {
    let displayValue = '';
    let firstOperand = null;
    let operator = null;
    let exchangeRate = 1;
    const apiKey = 'a0f12b49e4749744599c87f9';

    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('#buttons button');
    const exchangeRateButton = document.getElementById('exchangeRateBtn');
    const resetExchangeRateButton = document.getElementById('resetExchangeRateBtn');
    const clearButton = document.getElementById('clearButton');

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            handleButtonClick(this.innerText);
        });
    });

    exchangeRateButton.addEventListener('click', showExchangeRate);
    resetExchangeRateButton.addEventListener('click', resetExchangeRate);
    clearButton.addEventListener('click', clearCalculator);


        function handleButtonClick(value) {

        if (value === '=') {
            performCalculation();
        } else if (value === 'C') {
            clearCalculator();
        } else if (value === '.') {
            addDecimal();
        } else if (isOperator(value)) {
            handleOperator(value);
        } else {
            updateDisplay(value);
        }
    }

    function isOperator(value) {
        return value === '+' || value === '-' || value === '*' || value === '/';
    }

    function updateDisplay(value) {
        if (isNumeric(value)) {
            displayValue += value;
            display.innerText = displayValue;
        }
    }


    function isNumeric(value) {
        return !isNaN(parseFloat(value)) && isFinite(value);
    }

    function handleOperator(value) {
        if (firstOperand === null) {
            firstOperand = parseFloat(displayValue);
            operator = value;
            displayValue = '';
        } else {
            performCalculation();
            operator = value;
        }
    }

    function performCalculation() {
        if (firstOperand !== null && operator !== null) {
            const secondOperand = parseFloat(displayValue);
            switch (operator) {
                case '+':
                    displayValue = (firstOperand + secondOperand).toString();
                    break;
                case '-':
                    displayValue = (firstOperand - secondOperand).toString();
                    break;
                case '*':
                    displayValue = (firstOperand * secondOperand).toString();
                    break;
                case '/':
                    if (secondOperand !== 0) {
                        displayValue = (firstOperand / secondOperand).toString();
                    } else {
                        displayValue = 'Error';
                    }
                    break;
            }
            display.innerText = displayValue;
            firstOperand = parseFloat(displayValue);
            operator = null;
        }
    }

    function clearCalculator() {
        displayValue = '';
        firstOperand = null;
        operator = null;
        display.innerText = displayValue;
    }

    function addDecimal() {
        if (!displayValue.includes('.')) {
            displayValue += '.';
            display.innerText = displayValue;
        }
    }

    function showExchangeRate() {
        const baseCurrency = prompt('Enter base currency code (e.g., USD):');
        const targetCurrency = prompt('Enter target currency code (e.g., EUR):');

        if (baseCurrency && targetCurrency) {
            fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${baseCurrency}/${targetCurrency}`)
                .then(response => response.json())
                .then(data => {
                    exchangeRate = data.conversion_rate;

                    // Remove the existing exchange rate button, if any
                    const existingExchangeRateButton = document.querySelector('#buttons button.exchange-rate');
                    if (existingExchangeRateButton) {
                        existingExchangeRateButton.remove();
                    }

                    // Create a button to display the exchange rate
                    const exchangeRateDisplay = document.createElement('button');
                    exchangeRateDisplay.className = 'exchange-rate';
                    exchangeRateDisplay.innerText = exchangeRate;
                    exchangeRateDisplay.addEventListener('click', function () {
                        handleButtonClick(exchangeRate.toString());
                    });

                    // Append the button to the calculator
                    document.getElementById('buttons').appendChild(exchangeRateDisplay);
                })
                .catch(error => {
                    console.error('Error fetching exchange rate:', error);
                });
        }
    }


    function resetExchangeRate() {
        exchangeRate = 1;

        // Remove the exchange rate button
        const exchangeRateDisplay = document.querySelector('#buttons button.exchange-rate');
        if (exchangeRateDisplay) {
            exchangeRateDisplay.remove();
        }

        display.innerText = 'Exchange Rate Reset';
    }

});
