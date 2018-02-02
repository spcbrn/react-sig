module.exports = (app, path) => {
  const sigCtrl = require('./signature_controller');

  app.get('/api/signatures', sigCtrl.getAllSignatures);
  app.get('/api/signature/:id', sigCtrl.findSignature);
  app.post('/api/signature/new', sigCtrl.addNewSignature);
  app.patch('/api/signature/edit/:id', sigCtrl.updateSignature);
  app.delete('/api/signature/remove', sigCtrl.deleteSignature);

  app.get('*', (req, res) => res.sendFile(path.join(__dirname + './../../dist/index.html')));
}
