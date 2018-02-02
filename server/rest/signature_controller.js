const ddb = [];
let sigID = 0;

module.exports = {

  getAllSignatures: (req, res) => res.status(200).send(ddb),

  findSignature: (req, res) => { let result = ddb.find(c => c.id === Number(req.params.id))
                                 res.status(200).send(result ? result : 'No such signature.') },

  addNewSignature: (req, res) => { let entry = Object.assign(req.body, {id: ++sigID})
                                   ddb.push(req.body)
                                   res.status(200).send(ddb) },

  updateSignature: (req, res) => { ddb = ddb.map(c => c.id === req.params.id ? req.body : c)
                                   res.status(200).send(ddb) },

  deleteSignature: (req, res) => { ddb = ddb.filter(c => c.id !== req.params.id)
                                   res.status(200).send(ddb)}
}
