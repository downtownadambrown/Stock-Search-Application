const clearButtons = function () {
    $('button').remove();
};

const request = function () {
    let ticker = $(this).text();

    //Added security to the queryURL
    const queryURL = `https://api.iextrading.com/1.0/stock/${encodeURIComponent(ticker)}/batch?types=company,quote,logo,news`;

    $.ajax({
        url: queryURL,
        type: 'GET'
    }).then(function (response) {
        console.log(response);
        const companyName = response.company.companyName;
        const companyLogo = response.logo.url;
        const companyPrice = response.quote.latestPrice;
        const companyNews = response.news;
        const companyTicker = response.company.symbol
        const companySummaryText = response.company.description;

        //Set the company info header + logo + summary
        const companyHTML = $(`<img class="companyLogo p-3" src="${companyLogo}"><h2>(${companyTicker})${companyName} - @$${companyPrice}/share</h2>`);
        const companySummary = $(`<p id="companySummary">${companySummaryText}</p>`);
        $('.companyInfo').html(companyHTML);
        $('.companyInfo').append(companySummary);

        // Clear company news divs
        $(`.companyNews`).html("");

        //Set the company news divs
        for (let i = 0; i < companyNews.length; i++) {
            let newsHeadline = response.news[i].headline;
            let newsSource = response.news[i].source;
            let newsURL = response.news[i].url;
            
            let newsSummary = response.news[i].summary;
            if (newsSummary === "No summary available.") {
                newsSummary = "";
            }

            
            let currentNewsDiv = $(`<div class="news bg-secondary p-3 border-bottom" id="news${i}"></div>`);
            let currentNewsContent = $(`<h4><a href="${newsURL}">${newsHeadline}</a></h4><h5>&mdash;Source: ${newsSource}</h5><h6>${newsSummary}</h6>`);
            
            currentNewsDiv.append(currentNewsContent);
            $(`.companyNews`).append(currentNewsDiv);       
        }        
    });
};

const renderButtons = function () {
    clearButtons();

    for (let i = 0; i < stockList.length; i++) {
        const buttonHTML = $(`<button type='button' class='btn btn-dark m-2' id='button${i}'>${stockList[i].toUpperCase()}</button>`);
        buttonHTML.on(`click`, request);
        $(`.buttonList`).append(buttonHTML);
    }
};

const addCompany = function () {
    bootpopup({
        showclose: false,
        buttons: ["cancel", "ok"],
        title: "Create a new button",
        content: [
            `<p class="lead">Enter a new stock ticker symbol</p>`,
            { input: { type: "text", label: "", name: "title", placeholder: "Ex: Google is GOOG"} }],
        ok: function (data, e) {
            let companyInput = data.title.toUpperCase();
            
            const queryURL = `https://api.iextrading.com/1.0/ref-data/symbols`;

            $.ajax({
                url: queryURL,
                type: 'GET'
            }).then(function(response){
                console.log(response);
                if (inputValidation(companyInput, response) === true){
                    stockList.push(companyInput);
                    renderButtons(); 
                }
                else {
                    alert('Company data not found on the IEXTrading API');
                }
            });            
        },
        complete: function () { },
    });
};

const inputValidation = function(input, response){
    for (let i = 0; i < response.length; i++) {
        if (input.toUpperCase() === response[i].symbol) {
            return true; //symbol is valid (exists); returns true
        }
    }

    return false; //symbol is not valid; returns false
}

//global variables
const stockList = ['GOOG', 'FB', 'AMZN', 'SHAK', 'SNAP', 'SWK'];

//events
$('img#addIcon').on('click', addCompany);
renderButtons();

