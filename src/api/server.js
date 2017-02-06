let express = require('express');
let fs = require("fs");
let bodyParser = require('body-parser')
let argv = require('yargs').argv;
let app = express();
let cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

const HTTP_CODE = argv.CODE ? argv.CODE : 200;

function makeResponse(response) {
  app[response.method](response.url, (req, res) => {
    fs.readFile( __dirname + "/data/" + response.file, 'utf8', function (err, data) {
      data = response.fn ? response.fn( JSON.parse(data), req.body) : JSON.parse(data);
      res.statusCode = HTTP_CODE;
      res.header('Content-Type', 'application/json');
      res.end( JSON.stringify(data));
    });
  });
}

const server = app.listen(8081, () => {
  let host = server.address().address;
  let port = server.address().port;
  console.log("REST API Listening at http://%s:%s", host, port)
});

[
  {
    url     : '/marketing/track',
    method  : 'get',
    file    : 'analytics.json'
  },
  {
    url     : '/acquisition/external/campaign',
    method  : 'post',
    file    : 'campaign.json'
  },
  {
    url     : '/acquisition/external/zipcode/rulesbydefault',
    method  : 'get',
    file    : 'zipcode.json'
  },
  {
    url     : '/acquisition/external/zipcode',
    method  : 'post',
    file    : 'utilities.json'
  },
  {
    url     : '/acquisition/external/offer/',
    method  : 'post',
    file    : 'offers-gas.json'
  },
  {
    url     : '/acquisition/external/checkout/getContactInformationRules/',
    method  : 'get',
    file    : 'getContactInformationRules.json'
  },
  {
    url     : '/acquisition/external/checkout/getAgreementsRules/',
    method  : 'post',
    file    : 'getAgreements.json'
  },
  {
    url     : '/acquisition/external/checkout/getZipCodeValidation/',
    method  : 'get',
    file    : 'getZipCodeValidation.json'
  },
  {
    url     : '/acquisition/external/checkout/submitInformation',
    method  : 'post',
    file    : 'checkoutSubmit.json'
  }
].map(makeResponse);
