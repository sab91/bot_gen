import AWS from 'aws-sdk';

AWS.config.loadFromPath('./config/config.json');
const lexmodelbuildingservice = new AWS.LexModelBuildingService({ region: 'us-east-1'});
module.exports.postCreate = (req, res, next) => {
    let errors = []
    if(!req.body.nom.trim()){
        errors.push('Name is required')
    }

    if(!req.body.abandon.trim()){
        errors.push('Abandon is required')
    }

    if(!req.body.clarification.trim()){
        errors.push('Clarification is required')
    }
    
    if(!req.body['intents']){
        errors.push('Intent is required')
    }
    console.log(errors)
    if(errors.length){
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
                errors,
                intents
              })
            }
          })
        return;
    }
    next()
}