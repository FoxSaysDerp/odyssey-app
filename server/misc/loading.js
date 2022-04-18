const loading = (function () {
   var h = ["|", "/", "-", "\\"];
   var i = 0;

   return setInterval(() => {
      i = i > 3 ? 0 : i;
      console.clear();
      console.log(`Connecting to MongoDB \x1b[32m${h[i]}\x1b[0m`);
      i++;
   }, 300);
})();

module.exports = loading;
