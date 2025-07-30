const express = require('express');
const bodyParser = require('body-parser');
const obfuscator = require('javascript-obfuscator');
const app = express();

app.use(bodyParser.text({ type: '*/*' }));

app.post('/obfuscate', (req, res) => {
  const inputCode = req.body;

  const obfuscated = obfuscator.obfuscate(inputCode, {
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 1,
    numbersToExpressions: true,
    simplify: true,
    stringArray: true,
    stringArrayEncoding: ['base64'],
    stringArrayThreshold: 1,
    renameGlobals: true,
    selfDefending: true
  }).getObfuscatedCode();

  const result = `// This file obfuscation by Passive\n` + obfuscated;

  res.type('text/plain').send(result);
});

app.get('/', (req, res) => {
  res.send('Welcome to Passive Obfuscator API');
});

app.listen(3000, () => {
  console.log('Obfuscator running on port 3000');
});
