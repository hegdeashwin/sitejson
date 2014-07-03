"use strict";

var path = require('path'),
	fs = require('fs'),
	_ = require('underscore'),
	inputDir = "input/",
	outputDir = "output/",
	jsonData = "pagedata.json";

if (process.argv.length > 2) {
	inputDir = process.argv[2] + "/";
}

function readFile(path, callback) {
	fs.readFile(path, {
		encoding: 'utf-8'
	}, callback);
}

function verifyFolder(folderName, obj, callback) {
	var temp = obj;
	if (fs.existsSync(outputDir)) {
		return callback(true, obj);
	}
	fs.mkdir(outputDir, parseInt('0766', 8), function(err, temp) {
		callback(err ? false : true, obj);
	});
}

function processContent(content, obj, callback) {
	var i, initarray = {};
	if (content.match(/\+\+.*?\+\+/g)) {
		initarray = content.match(/\+\+.*?\+\+/g).map(function(s) {
			return s.slice(2, -2);
		});
	}

	for (i = 0; i < initarray.length; i++) {
		_.each(obj, function(val, key) {
			if (initarray[i] === key) {
				content = content.replace("++" + initarray[i] + "++", val);
			}
		});
	}

	callback(undefined, content);
}

function writeContent(path, content, callback) {
	fs.writeFile(path, content, function(err) {
		if (!err) {
			console.log('Content written to ' + path);
		}
		callback(err, content);
	});
}

function processFile(filePath, obj, callback) {
	var content;
	readFile(inputDir + filePath, readFileCallback);

	function readFileCallback(err, data) {
		if (err) {
			return callback(err, data);
		}
		content = data;
		verifyFolder(outputDir, obj, verifyFolderCallback);
	}

	function verifyFolderCallback(exists, obj) {
		exists ? processContent(content, obj, processContentCallback) : callback(outputDir + ' does not exist');
	}

	function processContentCallback(err, content) {
		writeContent(outputDir + path.basename(filePath), content, callback);
	}
}

function readDir(inputDir, callback) {
	var obj;
	readFile(jsonData, function(err, data) {
		if (err) {
			return callback(err, data);
		}

		obj = JSON.parse(data);

		fs.readdir(inputDir, function(err, files) {
			if (err) {
				throw err;
			}
			if (files.length < 1) {
				console.log("No files available to process.");
				return;
			}
			files = files.filter(function(file) {
				return file.substr(-5) === '.html'
			});
			if (files.length < 1) {
				console.log("No HTML file available to process.");
				return;
			}
			files.forEach(function(file) {
				processFile(file, obj, callback);
			});
		});
	});
}

function logResult(err, result) {
	if (err) {
		console.log(err);
	}
}

function startReadDir() {
	readDir(inputDir, logResult);
}

exports.readDirectory = startReadDir;