module.exports.index = (req, res) => {
    res.render('bots');
}
module.exports.create = (req, res) => {
    res.render('createBots')
}
module.exports.postCreate = (req, res) => {
    req.body.date = new Date();
    res.redirect('/bots')
}