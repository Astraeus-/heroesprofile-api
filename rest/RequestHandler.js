const https = require('https');
const endpoints = require('./endpoints.js');
const {Heroes, GameTypes, Maps, Regions, HeroesProfileStats} = require('../constants.js');

/* Heroes Profile API Information */
const BASEURL = 'api.heroesprofile.com';
const API = '/api';

class RequestHandler {
  constructor(token, mode) {
    this.token = token;
    this.defaultMode = mode;
    this.processing = false;
    this._queue = [];
  }

  request(method, endpoint, payload) {
    let postData;

    const options = {
      hostname: BASEURL,
      path: `${API}${endpoint}?api_token=${this.token}`,
      method: method,
    };

    // Validate if our payload fulfills the Heroes Profile constants.
    const isValidPayload = this.validatePayload(payload);
    if (isValidPayload !== true) {
      return Promise.reject(Error(isValidPayload));
    }

    // Sets the default response format 
    if (payload['mode'] && payload['mode'] === undefined) {
      if (endpoint !== endpoints.NGS_UPLOAD) { // The NGS upload format has a different mode specification
        payload['mode'] = this.defaultMode;
      }
    }
    
    // Create and append the query string to the path.
    let queryString = '';
    if (method === 'GET') {
      if (payload) {
        Object.keys(payload).forEach((key) => {
          if (payload[key] !== undefined) {
            queryString += `&${encodeURIComponent(key)}=${encodeURIComponent(payload[key])}`;
          }
        });
      }

      options.path += queryString;
    } else if (method === 'POST') {
      postData = payload;
    }

    return new Promise((resolve, reject) => {
      const makeRequest = (cb) => {
        const req = https.request(options, (res) => {
          res.setEncoding('utf8');
          let rawData = '';
    
          res.on('data', (d) => {
            rawData += d;
          });
    
          res.on('end', () => {
            if (res.statusCode === 200) {
              let response;
              if (payload['mode'] !== 'csv' && endpoint !== endpoints.NGS_UPLOAD) {
                try {
                  response = JSON.parse(rawData);
                  cb();
                  resolve(response);
                } catch (err) {
                  cb();
                  reject(Error('Parse JSON response'));
                }
              } else {
                response = rawData;
                cb();
                resolve(response);
              }
            } else if (res.statusCode === 403) {
              cb();
              reject(Error(`Status Code: ${res.statusCode}: Invalid input or no data for request`));
            } else if (res.statusCode === 429) {
              if (res.headers['retry-after']) {
                setTimeout(() => {
                  cb();
                  this.request(method, endpoint, payload).then(resolve).catch(reject);
                }, res.headers['retry-after'] * 1000);
                return;
              }
            } else {
              cb();
              reject(Error(`Status Code: ${res.statusCode}: Could not complete request for ${endpoint}/?token=token${queryString}`));
            }
          });
        });
    
        req.on('error', (error) => {
          cb();
          reject(error);
        });
  
        if (method === 'POST') {
          req.write(postData);
        }
        req.end();
      };

      this._queue.push(makeRequest);
      this.process();
    });
  }

  process() {
    if (this._queue.length === 0) {
      if (this.processing) {
        this.processing = false;
      }

      return;
    }

    if (this.processing) {
      return;
    }

    this.processing = true;
    const currentRequest = this._queue.shift();
    currentRequest(() => {
      this.processing = false;
      this.process();
    });
  }

  validatePayload(payload) {
    if (payload['hero']) {
      const hero = payload['hero'];

      if (!Heroes.find(h => h === hero)) {
        return `Invalid hero: ${hero}`;
      }
    }

    if (payload['game_type']) {
      const game_type = payload['game_type'];

      if (!GameTypes.find(gt => gt === game_type)) {
        return `Invalid game type: ${game_type}`;
      }
    }

    if (payload['map']) {
      const map = payload['map'];

      if (!Maps.find(m => m === map)) {
        return `Invalid map: ${map}`;
      }
    }

    if (payload['region']) {
      const region = payload['region'];

      if (!Regions[region]) {
        return `Invalid region: ${region}`;
      }
    }

    if (payload['stat']) {
      const stat = payload['stat'];

      if (!HeroesProfileStats.find(s => s === stat)) {
        return `Invalid statistic: ${stat}`;
      }
    }

    return true;
  }
}

module.exports = RequestHandler;
