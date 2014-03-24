// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But in stead we're going to implement it from scratch:
var getElementsByClassName = function (className) {
  // your code here
  var results = [];

  var starter = function(element) {
  	var classes = element.classList;
    
    for (var prop in classes) {
      if (classes[prop] === className) {
    	  results.push(element);
      }
    }

    var children = element.childNodes;

    for (var j = 0; j < children.length; j++) {
      starter(children[j]);
    }
  };
  
  starter(document.body);
  return results;
};
