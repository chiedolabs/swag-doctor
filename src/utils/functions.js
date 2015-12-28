module.exports.generateID = function(x){
  return x.replace(/\W+/g, '').toLowerCase();
};

module.exports.getType = function(field){
  if(typeof field.example === 'function') {
    return typeof field.example();
  } else {
    return typeof field.example;
  }
};
