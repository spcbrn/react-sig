module.exports = (app, path) => {

  app.get('*', (req, res) => res.sendFile(path.join(__dirname + '.././dist/index.html')));
}
