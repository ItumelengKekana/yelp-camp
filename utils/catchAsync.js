module.exports = (func) => {
  return (req, res, next) => {
    func(req, res, next).catch(next);
  };
};
//function used to catch any asynchronous errors