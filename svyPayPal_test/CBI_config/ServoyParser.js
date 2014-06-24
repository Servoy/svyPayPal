var fs = require('fs');
var readline = require('readline');
var stream = require('stream');
var path = require('path');
var util = require('util');
var Transform = stream.Transform || require('readable-stream').Transform;

var args = process.argv.slice(2);
if(args.length < 2) {
	console.log('ServoyParser requires input directory and output directory as arguments.')
	return;
}

var WORKSPACE = args[0]	//'svyPayPal_instrumented';
var TEMP_WORKSPACE = args[1]	//'temp_' + WORKSPACE;
var WORKSPACE_PATH = path.resolve(WORKSPACE);

var workspaceFilesJS = [];		// the list of js files in workspace

// 1 get all js files in directory.
getFilesRecursiveSync(TEMP_WORKSPACE, workspaceFilesJS, isFileTypeJavascript);

// 2 edit all js files in directory.
readWorkspaceJSFileList();

/**
 * generate a random UUID. Note There is a possibility of fail.
 */
function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x7|0x8)).toString(16);
    });
    return uuid;
};

/**
 * read all files in directory.
 */
function getFilesRecursiveSync(dir, fileList, optionalFilterFunction) {
	if (!dir) {
		console.log("Directory 'dir' is undefined or NULL")
		return;
	}
    if (!fileList) {
        console.log("Variable 'fileList' is undefined or NULL.");
        return;
    }
    var files = fs.readdirSync(dir);
    for (var i in files) {
        if (!files.hasOwnProperty(i)) {
			continue;
		}
        var filePath = dir + '\\' + files[i];
        if (fs.statSync(filePath).isDirectory()) {		// search files in directory
		    if (filePath.substring(filePath.length-5, filePath.length) == '_test') {	// skip _test directories
				continue;
			}
            getFilesRecursiveSync(filePath, fileList, optionalFilterFunction);
        } else if (fs.statSync(filePath).isFile()) {		
            if (optionalFilterFunction && optionalFilterFunction(filePath) !== true)	// filter .js files only
                continue;
            fileList.push(filePath);	// push files into result object
        }
    }
}

/** 
 * returns true if the file in the specified path is a javascript file.
 */
function isFileTypeJavascript(path) {
	if (path.substring(path.length-3,path.length) == ".js") {
		return true
	} else {
		return false
	}
}
/** 
 * process all js files.
 */
function readWorkspaceJSFileList() {

	for (var i=0; i<workspaceFilesJS.length; i++) {
		var inFilePath = workspaceFilesJS[i];
		var outFilePath = WORKSPACE + inFilePath.substring(TEMP_WORKSPACE.length);
		console.log('processing file: ' + outFilePath);
		
		// TODO bad performance. read all file in once.
		// copy the content into a different file.
		fs.readFileSync(inFilePath, 'utf8', function (err, data) {
            if (err) { 
				return console.log(err) 
			}
            fs.writeFileSync(outFilePath, parseData(data), 'utf8', function (wErr) {
				if(wErr) console.log(wErr);
            });
        });
	}
}

/** 
 * parse the content of the file. Return the parsed content.
 */
function parseData(data) { 
	var LEFT_CONTENT = "if (!__cov_rAcfbE02Dq5l_Ztxrew2VQ.__coverage__) { __cov_rAcfbE02Dq5l_Ztxrew2VQ.__coverage__ = {}; }";
	var RIGHT_CONTENT = "__cov_rAcfbE02Dq5l_Ztxrew2VQ.s['1']++;"
	var parsedData = '/**\n * @properties={typeid:35,uuid:"' + generateUUID() + '"} \n */' + data
	parsedData = parsedData.replace(LEFT_CONTENT, "(function (){" + LEFT_CONTENT)
	parsedData = parsedData.replace(RIGHT_CONTENT, RIGHT_CONTENT + "})();") 

	return parsedData;
}