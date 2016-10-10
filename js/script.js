$('#search').keyup(function() { 
    var searchField = $('#search').val();
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?' + $.param({
    'api-key': "", //your api key from NY Times goes here
    'q': searchField
    });
    $.getJSON(url, function(data) {
        
        var regx = new RegExp(searchField, "i");
        
        var output = '<ul class="searchresults list-group">';
        var articles = data.response.docs;
        
        output = '<li>';
        for(var i = 0; i < articles.length; i++) {
            var article = articles[i];
            var headline = article.lead_paragraph;
            console.log(article);
            var searchResults = headline.search(regx);
            if ( searchResults ){
                output += '<li>';
                    //output += '<img src="images/' + val.shortname +'_tn.jpg" alt="' + val.headline +'"/>';
                output += '<h2><a href="' + article.web_url+'">'+article.snippet+'</a></h2><hr>';
                output += '<p class="dip">' + article.source + '</p>';
                output += '</li>';
                }
            
        }
        output += '</ul>';
        $("#update").html(output);
    });
});

