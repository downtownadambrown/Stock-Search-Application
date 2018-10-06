$(document).ready(function(){
    
    const clearButtons = function() {
        $('.button').remove();
    };

    const request = function(){
        ticker = $(this).text();

        //Added security to the queryURL
        const queryURL = `https://api.iextrading.com/1.0/stock/${encodeURIComponent(ticker)}/batch?types=company,quote,logo,news`; 

        $.ajax({
            url: queryURL,
            type: 'GET'
        }).then(function(response){
            console.log(response);
            const companyName = response.company.companyName;
            const companyLogo = response.logo.url;
            const companyPrice = response.quote.latestPrice;
            const companyNews = response.news;
            const companyTicker = response.company.symbol
            
            const headerHTML = `<h1>(${companyTicker})${companyName}</h1><img id="cLogo" class="clearfix" src="${companyLogo}">`;
            $('.header').html(headerHTML);

            let newslistHTML = ``;

            for (let i = 0; i < companyNews.length; i++){
                newslistHTML += `<div id="news${i}></div>`;
            }

        });
    };

    const renderButtons = function() {
        clearButtons();

        for (let i = 0; i < stockList.length; i++){
            const buttonHTML = $(`<button class='button' id='button${i}'>${stockList[i].toUpperCase()}</button>`);
            buttonHTML.on(`click`, request);
            $(`.buttonList`).append(buttonHTML);
        }
    };
    
    //global variables
    const stockList = ['GOOG','FB','AMZN','SHAK','SNAP', 'SWK'];
    renderButtons();   
});