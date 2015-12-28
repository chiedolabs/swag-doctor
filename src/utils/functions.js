module.exports.generateID = function(x){
  return x.replace(/\W+/g, '').toLowerCase();
};
