var baseUrl = "";

var request = require('request');

var skipped = -400;
var limit = 400;
var done = false;
var count = 0;
var ddosSafe = 1000;

function next(error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    if (error) done = true;

    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    if (body) {
        body = JSON.parse(body);
        //console.log('body:', body); // Print the HTML for the Google homepage.

        for (var i = 0; i < body.length; i++) {
            console.log(body[i].name);
        }
    }

    skipped += limit;
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
            'limit': limit,
            'offset': skipped,
            'key': 'jutu7razu3uyuxUc',
            'lang': 'de'
        }
    };
    request(options, next);
}

next();
