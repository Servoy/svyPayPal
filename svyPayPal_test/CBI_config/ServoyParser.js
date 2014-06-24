var fs = require('fs');
var readline = require('readline');
var stream = require('stream');
var util = require('util');
var Transform = stream.Transform || require('readable-stream').Transform;

var workspaceFilesJS = [];		// the list of js files in workspace

var args = process.argv.slice(2);
var WORKSPACE = args[0]	//'svyPayPal_instrumented';
var TEMP_WORKSPACE = args[1]	//'temp_' + WORKSPACE;

// 1 get all js files in directory.
getFilesRecursiveSync(TEMP_WORKSPACE, workspaceFilesJS, isFileTypeJavascript);

// 2 edit all js files in directory.
readWorkspaceJSFileList();

/*
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

/*
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
        if (!files.hasOwnProperty(i)) continue;
        var filePath = dir + '/' + files[i];
        if (fs.statSync(filePath).isDirectory()) {		// search files in directory
            getFilesRecursiveSync(filePath, fileList, optionalFilterFunction);
        } else if (fs.statSync(filePath).isFile()) {		
            if (optionalFilterFunction && optionalFilterFunction(filePath) !== true)	// filter .js files only
                continue;
            fileList.push(filePath);	// push files into result object
        }
    }
}

/* 
 * returns true if the file in the specified path is a javascript file.
 */
function isFileTypeJavascript(path) {
	if (path.substring(path.length-3,path.length) == ".js") {
		return true
	} else {
		return false
	}
}

function readWorkspaceJSFileList() {

	for (var i=0; i<workspaceFilesJS.length; i++) {
		var inFilePath = workspaceFilesJS[i];
		// TODO replace temp_workspace with workspace. Split the / and replace.
		var outFilePath = inFilePath.substring(5);
		console.log('processing file: ' + outFilePath);
		
		// TODO bad performance. read all file in once.
		// copy the content into a different file.
		fs.readFile(inFilePath, 'utf8', function (err, data) {
            if (err) { 
				return console.log(err) 
			}
            fs.writeFile(outFilePath, parseData(data), 'utf8', function (wErr) {
				if(wErr) console.log(wErr);
            });
        });
	}
}

function parseData(data) { 
	var LEFT_CONTENT = "if (!__cov_rAcfbE02Dq5l_Ztxrew2VQ.__coverage__) { __cov_rAcfbE02Dq5l_Ztxrew2VQ.__coverage__ = {}; }";
	var RIGHT_CONTENT = "__cov_rAcfbE02Dq5l_Ztxrew2VQ.s['1']++;"
	var parsedData = '/**\n * @properties={typeid:35,uuid:"' + generateUUID() + '"} \n */' + data
	parsedData = parsedData.replace(LEFT_CONTENT, "(function (){" + LEFT_CONTENT)
	parsedData = parsedData.replace(RIGHT_CONTENT, RIGHT_CONTENT + "})();") 

	return parsedData;
}