var fs = require('fs');
var autocompleter = require('./lib/autocompleter');
var scoper = require('./lib/scoper');

var files = {};
files.attributes = require('./sorted/attributes');
files.datatypes = require('./sorted/datatypes');
files.functions_with_parenthases = require('./sorted/functions_with_parenthases');
files.functions_without_parenthases = require('./sorted/functions_without_parenthases');
files.handles = require('./sorted/handles');
/*files.ignored = require('./sorted/ignored');*/
files.methods = require('./sorted/methods');
files.preprocessor_directives = require('./sorted/preprocessor_directives');
files.snippets = require('./sorted/snippets');
files.statements = require('./sorted/statements');
files.system_references = require('./sorted/system_references');
files.unknowns = require('./sorted/unknowns');
files.widgets = require('./sorted/widgets');

var scopes = scoper.run(files);
var completions = autocompleter.run(files);

fs.writeFileSync('./export/scopes.json', JSON.stringify(scopes, undefined, 4), 'utf8', function (err) {
	console.log(err);
});
fs.writeFileSync('./export/completions.json', JSON.stringify(completions, undefined, 4), 'utf8', function (err) {
	console.log(err);
});