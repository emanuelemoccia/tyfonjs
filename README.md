
# Getting started

Prima di procedere assicurati di aver installato l'ultima versione di <a href="https://nodejs.org/en/" target="_blank">NodeJS</a> e <a href="https://www.npmjs.com"  target="_blank">npm</a>

## Install dependencies
Open the project folder and install it's dependencies. You can use any package manager you want. We recommend <a href="https://yarnpkg.com" target="_blank">Yarn</a> or <a href="https://www.npmjs.com"  target="_blank">npm</a>.

```sh
cd app
npm install tyfon-js
```

## JS


```jsx
var tyfon = require('tyfonjs'),
express = require('express'),
router = express.Router()

router.get('/api-call', (req, res) => {
  tyfon.auth()
  .then((resolved) => {
    // do-something with resolved object
  })
  .catch((err) => {
    // err handling
  })
});

module.exports = router
```
