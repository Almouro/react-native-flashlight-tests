require('fs')
  .readdirSync(__dirname + '/images')
  .forEach(function (file) {
    console.log(`"${file}": require("./images/${file}"),`);
  });
