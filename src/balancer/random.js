const rand = require('random-js')();

module.exports = function pickRandomHost(hosts) {
  return rand.pick(hosts);
};
