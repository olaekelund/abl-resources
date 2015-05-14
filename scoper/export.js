var mapper = require('./lib/mapper');
var scoper = require('./lib/scoper');
var autocompleter = require('./lib/autocompleter');
var fs = require('fs');

var files = ['keyword_index', 'syntax_reference', 'with_parenthases', 'without_parenthases', 'random'];

var objects = mapper.run(files);
fs.writeFileSync('./export/objects.json', JSON.stringify(objects, undefined, 4), 'utf8', function (err) {
	console.log(err);
});
var scopes = scoper.run(objects);
fs.writeFileSync('./export/scopes.json', JSON.stringify(scopes, undefined, 4), 'utf8', function (err) {
	console.log(err);
});

var texts = autocompleter.run(objects);
fs.writeFileSync('./export/texts.json', JSON.stringify(texts, undefined, 4), 'utf8', function (err) {
	console.log(err);
});
