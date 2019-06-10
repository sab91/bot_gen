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
            console.log(data);
            res.render('bots',{
                bots: data.bots
            });
          }
      });
    
}
module.exports.create = (req, res) => {
    res.render('createBots')
}
module.exports.postCreate = (req, res) => {
    req.body.date = new Date();
    res.redirect('/bots')
}