import AWS from 'aws-sdk';

AWS.config.loadFromPath('./config/config.json');
const lexmodelbuildingservice = new AWS.LexModelBuildingService({ region: 'us-east-1'});
module.exports.listBots = (req, res) => {
    let paramsGetBots={
        maxResults:50,
        nextToken:""
      }
      lexmodelbuildingservice.getBots(paramsGetBots, function(err, data) {
          if (err) {
            console.log(err, err.stack);
          }else {
            res.render('bots',{
                bots: data.bots
            });
          }
      });

}
module.exports.create = (req, res) => {
  res.render('createBots')
}
module.exports.update = (req, res) => {
  res.render('updateBot', {
    bot: req.body
  })
}
module.exports.putUpdate = (req, res) => {
  
}
module.exports.postCreate = (req, res) => {
  let params = {
    name: req.body.nom,
    abortStatement: {
      messages: [{
        content: req.body.abandon,
        contentType: "PlainText"
      }]
    },
    childDirected: true,
    clarificationPrompt: {
      maxAttempts: 1,
      messages: [{
        content: req.body.clarification,
        contentType: "PlainText"
      }]
    },
    description: req.body.description,
    idleSessionTTLInSeconds: 300,
    locale: "en-US",
    processBehavior: "SAVE"
  };

  // Lex try
  lexmodelbuildingservice.putBot(params, function(err, data) {
    if (err){
      console.log(err, err.stack)
      res.render('createBots',{errorMessage:err.message,params:params})
    }else {
      res.redirect('/bots')
    }
  });


  console.log(req.body)
}
