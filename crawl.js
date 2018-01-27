var baseUrl = "";

var options = {
    url: 'https://web-api.migros.ch/widgets/product_fragments_json',
    headers: {
        'Origin': 'https://produkte.migros.ch'
    },
    qs: {
        'region': 'national',
        'q': '',
        'is_variant': 'false',
        'sort': 'name',
        'order': 'asc',
        'search': '',
        'facet_size': 0,
        'limit': 100,
        'offset': 0,
        'key': 'jutu7razu3uyuxUc',
        'lang': 'de'
    }
};

var request = require('request');
request(options, function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    body = JSON.parse(body);
    //console.log('body:', body); // Print the HTML for the Google homepage.

    for (var i = 0; i < body.length; i++) {
        console.log(body[i].name);
    }

});
