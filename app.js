$(document).ready(function(){
    
    const clearButtons = function() {
        $('.button').remove();
    };

    const request = function(){
        ticker = $(this).text();

        const queryURL = `https://api.iextrading.com/1.0/stock/${ticker}/batch?types=company,quote,logo,news`; 

        $.ajax({
            url: queryURL,
            type: 'GET'
        }).then(function(response){
            console.log(response);
            const cName = response.company.companyName;
            const cLogo = response.logo.url;
            const cPrice = response.quote.latestPrice;
            const cNews = response.news;
            const cTicker = response.company.symbol
            
            const headerHTML = `<h1>(${cTicker})${cName}</h1><img id="cLogo" class="clearfix" src="${cLogo}">`;
            $('.header').html(headerHTML);

            const newslistHTML = ``;

            for (let i = 0; i < cNews.length; i++){
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

    //ajax global variables
    
});