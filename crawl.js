var baseUrl = "";

var request = require('request');

var limit = 400;
var skipped = -limit;
var done = false;
var count = 0;
var ddosSafe = 1000;
var last = "";

function next(error, response, body) {
    if (error) console.log('error:', error); // Print the error if one occurred
    if (error) done = true;

    //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    if (body) {
        body = JSON.parse(body);
        //console.log('body:', body); // Print the HTML for the Google homepage.


        for (var i = 0; i < body.length; i++) {
            if (body[i].name !== last) {
                var categories = "in ";
                for (var j = 0; j < body[i].categories.length; j++) {
                    if (j !== 0) categories += ", "
                    categories += body[i].categories[j].name;
                }
                console.log("Fr.", body[i].price_info.price, body[i].name, categories);
                last = body[i].name;
            }
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
