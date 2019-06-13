import AWS from 'aws-sdk';

AWS.config.loadFromPath('./config/config.json');
const lexmodelbuildingservice = new AWS.LexModelBuildingService({ region: 'us-east-1'});
module.exports.createIntent = (req, res) => {
    var params = {
        name: "DocOrderPizza",
        conclusionStatement: {
         messages: [
            {
           content: "All right, I ordered  you a {Crust} crust {Type} pizza with {Sauce} sauce.",
           contentType: "PlainText"
          },
            {
           content: "OK, your {Crust} crust {Type} pizza with {Sauce} sauce is on the way.",
           contentType: "PlainText"
          }
         ],
         responseCard: "foo"
        },
        confirmationPrompt: {
         maxAttempts: 1,
         messages: [
            {
           content: "Should I order  your {Crust} crust {Type} pizza with {Sauce} sauce?",
           contentType: "PlainText"
          }
         ]
        },
        description: "Order a pizza from a local pizzeria.",
        fulfillmentActivity: {
         type: "ReturnIntent"
        },
        rejectionStatement: {
         messages: [
            {
           content: "Ok, I'll cancel your order.",
           contentType: "PlainText"
          },
            {
           content: "I cancelled your order.",
           contentType: "PlainText"
          }
         ]
        },
        sampleUtterances: [
           "Order me a pizza.",
           "Order me a {Type} pizza.",
           "I want a {Crust} crust {Type} pizza",
           "I want a {Crust} crust {Type} pizza with {Sauce} sauce."
        ]
       };
       lexmodelbuildingservice.putIntent(params, function(err, data) {
         if (err) console.log(err, err.stack); // an error occurred
         else     console.log(data);           // successful response

       });
}
module.exports.listIntents = (req, res) => {
    var params = {
        maxResults: 50,
        nextToken: ""
       };
       lexmodelbuildingservice.getIntents(params, function(err, data) {
         if (err) {
            console.log(err, err.stack);
         }  // an error occurred
         else{
            res.render('intents', {
                intents: data.intents
            })
         }                // successful response
       });
}
module.exports.postCreateIntent = (req, res) => {

}
