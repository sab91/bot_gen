import AWS from 'aws-sdk';
const request = require('request');

AWS.config.loadFromPath('./config/config.json');
const lexmodelbuildingservice = new AWS.LexModelBuildingService({ region: 'us-east-1'});
// list bots
module.exports.listBots = (req, res) => {
    let bots = []
    request('http://localhost:5000/bots', { json: true}, (err, response, body) => {
      if(err) {
        return console.log(err)
      }
      
      bots = body.data.bots;
      bots.forEach((bot) => {
        bot.lastUpdatedDate = new Date(bot.lastUpdatedDate);
        bot.createdDate = new Date(bot.createdDate)
      })
      res.render('bots', {
        bots: bots
      })
    })

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
  request({
    har: {
      url: 'http://localhost:5000/bots/',
      method: 'POST', 
      headers: [
        {
          name: 'content-type',
          value: 'application/json'
        }
      ],
      postData: {
        mimeType: 'application/json',
        text: JSON.stringify(req.body)
      }
      }
    },
    (err, response, body) => {
    if(err) {
      return console.log(err)
    }
    res.redirect('/gestionBots')
    }
  )
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
      // console.log(intents);
      lexmodelbuildingservice.getBot(paramsGet, function(err, data){
        if (err) {
            console.log(err, err.stack);
        }else {
          // console.log(data.intents);
          var intentCheckeds = data.intents.map((item)=>{
            return item.intentName
          })
          var intentNotCheckeds = intents.filter((item)=>{
            return !intentCheckeds.includes(item.name)
          }).map((item)=>{
            return item.name
          })
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
  var params = {
    name: req.params.nameBot
  }
  request({
    har: {
      url: 'http://localhost:5000/bots/' + params.name,
      method: 'PUT', 
      headers: [
        {
          name: 'content-type',
          value: 'application/json'
        }
      ],
      postData: {
        mimeType: 'application/json',
        text: JSON.stringify(req.body)
      }
      }
    },
    (err, response, body) => {
    if(err) {
      return console.log(err)
    }
    res.redirect('/gestionBots')
    }
  )
}
//delete a bot
module.exports.delete = (req,res) =>{
   var params = {
     name: req.params.nameBot
   }
  request.delete('http://localhost:5000/bots/' + params.name, { json: true}, (err, response, body) => {
    if(err) {
      return console.log(err)
    }
    res.redirect('/gestionBots')
  })

}
