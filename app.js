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
            
            const companyHTML = `<img class="companyLogo m-3" src="${companyLogo}"><h2>(${companyTicker})${companyName}</h2>`;
            
            $('.companyInfo').html(companyHTML);
           

            let newslistHTML = ``;
            
            for (let i = 0; i < companyNews.length; i++){
                newslistHTML += `<div class="news" id="news${i}></div>`;
            }
            //finalize newslistHTML output to main col

        });
    };

    const renderButtons = function() {
        clearButtons();

        for (let i = 0; i < stockList.length; i++){
            const buttonHTML = $(`<button type='button' class='btn btn-dark m-2' id='button${i}'>${stockList[i].toUpperCase()}</button>`);
            buttonHTML.on(`click`, request);
            $(`.buttonList`).append(buttonHTML);
        }
    };
    
    //global variables
    const stockList = ['GOOG','FB','AMZN','SHAK','SNAP', 'SWK'];
    renderButtons();   
});