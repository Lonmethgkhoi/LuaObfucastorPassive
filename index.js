const express = require("express");
const bodyParser = require("body-parser");
const JavaScriptObfuscator = require("javascript-obfuscator");
const fs = require("fs");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/", (req, res) => {
  res.render("index", { output: null });
});

app.post("/obfuscate", (req, res) => {
  const code = req.body.code;
  const watermark = "// This file obfuscation by Passive\n\n";

  const obfuscated = JavaScriptObfuscator.obfuscate(code, {
    compact: true,
    controlFlowFlattening: true,
    stringArray: true,
    stringArrayEncoding: ['base64'],
    splitStrings: true,
    stringArrayThreshold: 1
  });

  const result = watermark + obfuscated.getObfuscatedCode();
  res.render("index", { output: result });
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
