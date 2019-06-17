import AWS from 'aws-sdk';

AWS.config.loadFromPath('./config/config.json');
const lexmodelbuildingservice = new AWS.LexModelBuildingService({ region: 'us-east-1'});
// list bots
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
// create a new bot
module.exports.create = (req, res) => {
  var paramsIntents = {
    maxResults: 10,
    nextToken: ""
   };
  let intents = []
  lexmodelbuildingservice.getIntents(paramsIntents, function(err, data) {
    if (err){
    console.log(err, err.stack); // an error occurred
    }
    else{
      intents = data.intents
      res.render('createBots',{
        intents
      })
    }
  })
}
module.exports.postCreate = (req, res) => {
  let intents = [];
  if(typeof(req.body.intents) === 'string'){
    intents[0] = req.body.intents
  }else{
    intents = req.body.intents
    console.log(intents)
  }
  let intentsMap = intents.map((intent)=> {
    return {
     intentName: intent,
     intentVersion: "$LATEST"
   }
   });
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
    intents:intentsMap,
    description: req.body.description,
    idleSessionTTLInSeconds: 300,
    locale: "en-US",
    processBehavior: "BUILD"
  };
  // Lex try
  lexmodelbuildingservice.putBot(params, function(err, data) {
    if (err){
      console.log(err, err.stack)
      res.render('createBots',{errorMessage:err.message,params:params})
    }else {
      res.redirect('/gestionBots')
    }
  });
}
// update a bot
module.exports.update = (req, res) => {
  var paramsGet = {
    name: req.params.nameBot,
    versionOrAlias: "$LATEST"
  }
  var paramsIntents = {
    maxResults: 10,
    nextToken: ""
   };
  let intents = []
  lexmodelbuildingservice.getIntents(paramsIntents, function(err, data) {
    if (err){
    console.log(err, err.stack); // an error occurred
    }
    else{
      intents = data.intents
      console.log(intents);
      lexmodelbuildingservice.getBot(paramsGet, function(err, data){
        if (err) {
            console.log(err, err.stack);
        }else {
          console.log(data.intents);
          var intentCheckeds = data.intents.map((item)=>{
            return item.intentName
          })
          var intentNotCheckeds = intents.filter((item)=>{
            return !intentCheckeds.includes(item.name)
          }).map((item)=>{
            return item.name
          })
          console.log(intentNotCheckeds);
          console.log(intentCheckeds);
          res.render('updateBot', {
            bot: data,
            intentNotCheckeds,
            intentCheckeds,
          })
        }
      })
    }
  })


}
module.exports.postUpdate = (req, res) => {
  var paramsGet = {
    name: req.params.nameBot,
    versionOrAlias: "$LATEST"
  }
  let intents = [];
  if(typeof(req.body.intents) === 'string'){
    intents[0] = req.body.intents
  }else{
    intents = req.body.intents
    console.log(intents)
  }
  let intentsMap = intents.map((intent)=> {
    return {
     intentName: intent,
     intentVersion: "$LATEST"
   }
   });
  lexmodelbuildingservice.getBot(paramsGet, function(err, data){
          if (err) {
              console.log(err, err.stack);
          }else {
              // checksum=data.checksum
              if(typeof(data.intents) === 'undefined'){
                data.intents = []
              }
              let paramsPut = {
                  name: req.params.nameBot,
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
                  processBehavior: "SAVE",
                  checksum:data.checksum,
                  intents:[
                      ...intentsMap
                  ],
                };
              lexmodelbuildingservice.putBot(paramsPut, function(err, data) {
                  if (err){
                    console.log(err, err.stack)
                  }else {
                      console.log('success');
                      res.redirect('/gestionBots')
                  }
                });
          }
  })
}
//delete a bot
module.exports.delete = (req,res) =>{
  var params = {
    name: req.params.nameBot
  }
  lexmodelbuildingservice.deleteBot(params, (err, data) => {
    if(err){
      console.log(err, err.stack)
    }else{
      res.redirect('/gestionBots')
    }
  })

}
