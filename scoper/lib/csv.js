var fs = require('fs');
var data = fs.readFileSync('./progress_keywords2.csv', 'utf8');
var f = data.split('\n');
var json = [];
headers = f.shift().split(";");
f.forEach(function (d) {
	tmp = {}
	row = d.split(";")
	for (var i = 0; i < headers.length; i++) {
		tmp[headers[i]] = row[i];
	}
	json.push(tmp);
});
fs.writeFileSync('./dist/test.json', JSON.stringify(json), 'utf8', function (err) {
	console.log(err);
});