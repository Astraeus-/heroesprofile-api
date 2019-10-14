# heroesprofile-api
A simple node.js wrapper for the Heroes Profile API.

Website URL: https://api.heroesprofile.com/

## Getting Started
You will need to register for a plan at [Heroes Profile API](https://api.heroesprofile.com/register) to get a token.

### Install
Install the `heroesprofile-api` package from the NPM repository.
```bash
npm install heroesprofile-api --save
```

### Usage
```js
const HP = require('heroesprofile-api');
const api = new HP('token', 'json');

api.getHeroes({hero: 'Abathur'}).then((data) => {
    console.log(data);
});
```

The response format is either json or csv and defaults to json if not specified.
You can override this globally or per method.

Note: Not all methods support csv.

Some of the input gets validated against a list of [Heroes Profile constants](constants.js).
