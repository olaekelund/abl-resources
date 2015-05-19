var fs = require('fs');
var autocompleter = require('./lib/autocompleter');
var grammar = require('./lib/grammar');

var files = {};
files.attributes = require('./sorted/attributes');
files.datatypes = require('./sorted/datatypes');
files.functions_with_parenthases = require('./sorted/functions_with_parenthases');
files.functions_without_parenthases = require('./sorted/functions_without_parenthases');
files.handles = require('./sorted/handles');
/*files.ignored = require('./sorted/ignored');*/
files.methods = require('./sorted/methods');
files.operators = require('./sorted/operators');
files.options = require('./sorted/options');
files.preprocessor_directives = require('./sorted/preprocessor_directives');
files.snippets = require('./sorted/snippets');
files.statements = require('./sorted/statements');
files.system_references = require('./sorted/system_references');
files.unknowns = require('./sorted/unknowns');
files.widgets = require('./sorted/widgets');
files.webspeed = require('./sorted/webspeed');

var grammar = grammar.run(files);
var completions = autocompleter.run(files);

fs.writeFileSync('./export/abl.json', JSON.stringify(grammar, undefined, 4), 'utf8', function (err) {
	console.log(err);
});
fs.writeFileSync('./export/completions.json', JSON.stringify(completions, undefined, 4), 'utf8', function (err) {
	console.log(err);
});