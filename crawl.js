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
                var cat = false;
                for (var j = 0; j < body[i].categories.length; j++) {
                    var c = body[i].categories[j].name.toLowerCase();
                    if (c.match(/brotaufstrich/)) {
                        cat = "Brotaufstrich";
                    } else if (c.match(/brot/)) {
                        cat = "Brotwaren";
                    } else if (c.match(/milch|eier/)) {
                        cat = "Milchprodukte&Eier";
                    } else if (c.match(/fleisch|fisch/)) {
                        cat = "Fleisch&Fisch";
                    } else if (c.match(/müesli|muesli|cerealien/)) {
                        cat = "Müesli&Cerealien";
                    } else if (c.match(/getränke/)) {
                        cat = "Getränke";
                    }
                }
                if (cat) {
                    var price = body[i].price_info.price;
                    price = price.replace("–", "00");
                    console.log(price, "'" + body[i].name + "'", cat);
                    last = body[i].name;
                }
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
