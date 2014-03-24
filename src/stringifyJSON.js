// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to have to write it from scratch:
var stringifyJSON = function (obj) {
  // your code goes here
  var  result = '';

  var handleObject = function(token) {
    if (token === null) {
    	result = result.concat('null');
    } else if (token instanceof Array) {
    	handleArray(token);
    } else {
      var keys = Object.keys(token);
      result = result.concat('{');

      for (var i = 0; i < keys.length; i++) {
        if (i) {
        	result = result.concat(',');
        }

        starter(keys[i]);
        result = result.concat(':');
        starter(token[keys[i]]);
      }

      result = result.concat('}');
    }
  };

  var handleArray = function(token) {
    result = result.concat('[');

    for (var i = 0; i < token.length; i++) {
    	if (i) {
    		result = result.concat(',');
    	}

    	starter(token[i]);
    }

    result = result.concat(']');
  };

  var handleString = function(token) {
    result = result.concat('\"' + token + '\"')
  };

  var handleBoolean = function(token) {
    result = result.concat(token);
  };

  var handleNumber = function(token) {
    result = result.concat(token);
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