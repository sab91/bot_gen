import AWS from 'aws-sdk';

AWS.config.loadFromPath('./config/config.json');
const lexmodelbuildingservice = new AWS.LexModelBuildingService({ region: 'us-east-1', httpOptions:{xhrAsync:false} });
module.exports.listBots = (req, res) => {
    let paramsGetBots={
        maxResults:50,
        nextToken:""
      }
      lexmodelbuildingservice.getBots(paramsGetBots, function(err, data) {
          if (err) {
            console.log(err, err.stack);
          }else {
            res.json({
                data
            })
          }
      });

}
module.exports.bot = (req, res) => {
    var params = {
        name: req.params.nameBot,
        versionOrAlias: "$LATEST"
    }
    lexmodelbuildingservice.getBot(params, function(err, data){
        if (err) {
            console.log(err, err.stack);
          }else {
            res.json({
                data
            })
          }
    })
}
module.exports.create = (req, res) => {
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
        }else {
            res.json({
                data
            })
        }
      });
    
}
module.exports.update = (req, res) => {

    // var checksum = null
    console.log(req.body)
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
                        content: req.body.abandon || data.abortStatement.messages[0].content,
                        contentType: "PlainText"
                      }]
                    },
                    childDirected: true,
                    clarificationPrompt: {
                      maxAttempts: 1,
                      messages: [{
                        content: req.body.clarification || data.clarificationPrompt.messages[0].content,
                        contentType: "PlainText"
                      }]
                    },
                    description: req.body.description || data.description,
                    idleSessionTTLInSeconds: 300,
                    locale: "en-US",
                    processBehavior: "BUILD",
                    checksum:data.checksum,
                    intents:[
                      ...intentsMap
                    ],
                  };
                lexmodelbuildingservice.putBot(paramsPut, function(err, data) {
                    if (err){
                      console.log(err, err.stack)
                    }else {
                        res.json({
                            data
                        })
                    }
                  });
            }
    })

    



}
module.exports.delete = (req, res) => {
    var params = {
        name: req.params.nameBot
      }
      lexmodelbuildingservice.deleteBot(params, (err, data) => {
        if(err){
          console.log(err, err.stack)
        }else{
          res.json({
              data
          })
        }
      })
}