//App uses free web service from "Rates By Exchange Rate API" (https://www.exchangerate-api.com). Special thanks to them!
const baseCurrency = document.getElementById("base-currency");
const targetCurrency = document.getElementById("target-currency");
const baseCurrencyAmount = document.getElementById("base-currency-amount");
const targetCurrencyAmount = document.getElementById("target-currency-amount");
const exchangeRate = document.getElementById("exchange-rate");
//Base URL for web service
const baseURL = "https://open.er-api.com/v6/latest/";

//Fetch exchange rates and update DOM
function calculate() {
    //Get the values for selected currencies
    const baseCurrencyName = baseCurrency.value;
    const targetCurrencyName = targetCurrency.value;

    fetch(`${baseURL}${baseCurrencyName}`)
        .then(response => response.json())
        .then(myJSONArray => {
            const rates = myJSONArray["rates"];
            const currentRate = rates[targetCurrencyName];

            //Update exchange rate value in DOM
            exchangeRate.innerText = `1 ${baseCurrencyName} = ${currentRate} ${targetCurrencyName}`;

            //Update target currency amount using current rate
            targetCurrencyAmount.value = (baseCurrencyAmount.value * currentRate).toFixed(3);
        });
}

//Event Listeners
baseCurrency.addEventListener("change", calculate);
baseCurrencyAmount.addEventListener("input", calculate);

targetCurrency.addEventListener("change", calculate);

//On page reload, call the API and get latest rate data
window.onload = calculate();