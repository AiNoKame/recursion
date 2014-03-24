// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to have to write it from scratch:
var stringifyJSON = function (obj) {
  // your code goes here
  var handleObject = function(token) {
  	if (token === null) {
    	return 'null';
    }

    if (token instanceof Array) {
    	return handleArray(token);
    } 
    
    var result = '';
    
    var keys = Object.keys(token);
    result = result.concat('{');

    for (var i = 0; i < keys.length; i++) {
      if (i) {
      	result = result.concat(',');
      }

      result = result.concat(starter(keys[i]));
      result = result.concat(':');
      result = result.concat(starter(token[keys[i]]));
    }

    result = result.concat('}');

    return result;
  };

  var handleArray = function(token) {
    var result = '[';

    for (var i = 0; i < token.length; i++) {
    	if (i) {
    		result = result.concat(',');
    	}

    	result = result.concat(starter(token[i]));
    }

    return result.concat(']');;
  };

  var handleString = function(token) {
    return '\"' + token + '\"';
  };

  var handleBoolean = function(token) {
    return token.toString();
  };

  var handleNumber = function(token) {
    return token.toString();
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

    return stringifyActions[typeof token](token);
  };

  return starter(obj);
};