const path = require("path");

const pathToUnix = (pathStr) => {
   let p = path.normalize(pathStr);
   const pathRegex = /\/\//;
   p = p.replace(/\\/g, "/");
   while (p.match(pathRegex)) {
      p = p.replace(pathRegex, "/");
   }
   return p;
};

module.exports = pathToUnix;
