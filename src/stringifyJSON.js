// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to have to write it from scratch:
var stringifyJSON = function (obj) {
  // your code goes here
  var handleArray = function(token) {
    var result = '[';

    for (var i = 0; i < token.length; i++) {
      if (stringify(token[i]) !== '') {
        result = result.concat(stringify(token[i]));

        if (i < token.length - 1) {
          result = result.concat(',');
        }
      }
    }

    return result.concat(']');;
  };

  var handleObject = function(token) {
    if (token === null) {
      return 'null';
    }

    if (token instanceof Array) {
      return handleArray(token);
    } 
    
    var result = '{';
    var keys = Object.keys(token);

    for (var i = 0; i < keys.length; i++) {
      if ((stringify(keys[i]) !== '') && (stringify(token[keys[i]]) !== '')) {
        result = result.concat(stringify(keys[i]) + ':' + stringify(token[keys[i]]));

        if (i < keys.length - 1) {
          result = result.concat(',');
        }
      }
    }

    return result.concat('}');;
  };

  var handleString = function(token) {
    return '\"' + token + '\"';
  };

  var handleBooleanOrNumber = function(token) {
    return token.toString();
  };

  var stringifyActions = {
    'object': handleObject,
    'string': handleString,
    'boolean': handleBooleanOrNumber,
    'number': handleBooleanOrNumber
  };

  var stringify = function(token) {
    if (typeof stringifyActions[typeof token] !== 'function') {
      //throw new Error('Invalid JSON object.');
      return '';
    }

    return stringifyActions[typeof token](token);
  };

  return stringify(obj);
};
