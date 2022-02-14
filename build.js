var fs = require('fs');
var fsx = require('fs-extra');
var path = require('path');
var Handlebars = require("handlebars");

var data_files = fs.readdirSync("./data/");
//all data goes in this file:
// var data = JSON.parse(fs.readFileSync("data.json"));

data_files.forEach((dfname)=>{
  console.log("Creating html for data file: "+dfname);
  var data = JSON.parse(fs.readFileSync((path.join(__dirname,"data/", dfname))), "utf-8");
  // console.log(data)
  if(data.template){
    var tfname = data.template;
  }
  else{
    var tfname = "index.hbs";
  }
    var template = fs.readFileSync(path.resolve(path.join(__dirname,"templates/", tfname)), "utf-8");
    var bname = path.basename(dfname, path.extname(dfname))
    var name = path.join('dist/', bname + '.html')
    console.log("template file name: "+tfname);
    console.log("output name: "+name);
    buildHtml(name, template, data);
})

console.log("Copying include")
fsx.copy('include/', 'dist/', function (err) {
  if (err) return console.error(err)
  console.log('success!')
});

function buildHtml(name,template, fileData) {
  var renderTemplate = Handlebars.compile(template);
  // console.log(fileData);
  var html = renderTemplate(fileData);
  // Write to build folder. Copy the built file and deploy
  fs.writeFile(name, html, err => {
    if (err) console.log(err);
    console.log("File written succesfully");
    console.log(" ")
  });
}
