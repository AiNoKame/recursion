// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to have to write it from scratch:
var stringifyJSON = function (obj) {
  // your code goes here
  var  result = '';

  var handleObject = function(token) {
    if (token === null) {
    	result = result.concat('null');
    }

    if (token instanceof Array) {
    	handleArray(token);
    }
  };

  var handleArray = function(token) {

  };

  var handleString = function(token) {

  };

  var handleBoolean = function(token) {

  };

  var handleNumber = function(token) {

  };

  var stringifyActions = {
    'object': handleObject,
    'string': handleString,
    'boolean': handleBoolean,
    'number': handleNumber
  };

  var starter = function(token) {
    if (typeof stringifyActions[typeof token] !== 'function') {
    	throw new Error('Invalid JSON object.');
    }

    stringifyActions[typeof token](token);
  };

  starter(obj);

  return result;
};
