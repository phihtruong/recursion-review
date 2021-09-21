// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  var result = '';
  function innerFunc (obj) {
    var innerResult = '';
    if (Array.isArray(obj)) {
      if (obj.length === 0) {
        innerResult += '[]';
      }
      for (var i = 0; i < obj.length; i++) {
        if (i === 0) {
          innerResult += '[';
        }
        innerResult += innerFunc(obj[i]);
        if (i !== obj.length - 1) {
          innerResult += ',';
        }
        if (i === obj.length - 1) {
          innerResult += ']';
        }
      }
    } else if (typeof obj === 'number') {
      innerResult += obj;
    } else if (obj === null) {
      innerResult += 'null';
    } else if (typeof obj === 'boolean') {
      innerResult += obj;
    } else if (typeof obj === 'string') {
      innerResult += '"' + obj + '"';
    } else if (typeof obj === 'function' || typeof obj === 'undefined') {
      innerResult += 'null';
    } else {
      if (Object.keys(obj).length === 0) {
        innerResult += '{}';
      } else {
        var keys = Object.keys(obj);
        for (var i = 0; i < keys.length; i++) {
          if (i === 0) {
            innerResult += '{'
          }
          if (typeof obj[keys[i]] === 'function' || typeof obj[keys[i]] === 'undefined') {
            // do nothing;
          } else if (keys.length === 1) {
            innerResult += '"' + keys[i] + '"' + ':' + innerFunc(obj[keys[i]]);
          } else if (i === 0) {
            innerResult += '"' + keys[i] + '"' + ':' + innerFunc(obj[keys[i]]) + ',';
          } else if (i ===  keys.length - 1) {
            innerResult += '"' + keys[i] + '"' + ':' + innerFunc(obj[keys[i]]);
          } else {
            innerResult += '"' + keys[i] + '"' + ':' + innerFunc(obj[keys[i]]) + ',';
          }
        }
        innerResult += '}';
      }
    }
    return innerResult;
  };
  result = innerFunc(obj);
  return result;
};
