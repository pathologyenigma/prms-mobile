var sourceMap = require('source-map');
var fs = require('fs');

var args = process.argv.splice(2);
if (args.length < 3) {
    console.log('输入参数缺失');
    process.exit(1);
}

var floder = args[0];
var file = args[1];
var [line, column] = args[2].split(':');

fs.readFile(floder + '/' + file, 'utf8', function (err, data) {
	new sourceMap.SourceMapConsumer(data).then(source => {
    	let result = source.originalPositionFor({
	        line: parseInt(line),
	        column: parseInt(column),
	    })
	    console.log(result)
	    var exec = require('child_process').exec
	    exec('rm -rf ' + floder)
    })
});