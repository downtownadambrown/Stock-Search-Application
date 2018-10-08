
const clearButtons = function () {
    $('button').remove();
};

const request = function () {
    ticker = $(this).text();

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

        //Set the company info header
        const companyHTML = $(`<img class="companyLogo p-3" src="${companyLogo}"><h2>(${companyTicker})${companyName}</h2>`);
        const companySummary = `<p id="companySummary">${companySummaryText}</p>`;
        $('.companyInfo').html(companyHTML);
        $('.companyInfo').append($(companySummary))

        //Set the company summary

        //console.log(companySummary);
        //$('.companySummary').html(companySummary);

        //Set the company news divs
        var currentNews = ``;
        for (let i = 0; i < companyNews.length; i++) {
            currentNews += `<div class="news bg-secondary p-3 border-bottom" id="news${i}"></div>`;
        }
        //finalize newslistHTML output to main col           
        $(`.companyNews`).html($(currentNews));

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
            stockList.push(companyInput);
            renderButtons();
        },
        complete: function () { },
    });
};

//global variables
const stockList = ['GOOG', 'FB', 'AMZN', 'SHAK', 'SNAP', 'SWK'];

//events
$('img#addIcon').on('click', addCompany);
renderButtons();

