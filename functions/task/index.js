'use strict';

module.exports.handler = (event, context, callback) => {
  console.log('Task', event);
  callback(null, event);
};
