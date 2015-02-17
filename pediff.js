/* global phantom, casper, resemble, jQuery */
/*
James Cryer / Huddle / 2014
https://github.com/Huddle/PhantomCSS
http://tldr.huddle.com/blog/css-testing/

Lukasz Blacha / Schinbsted Tech Polska / 2015
https://github.com/lukaszblachastp/pediff.js
*/

'use strict';
var fs = require('fs'),
    q = require('q');

var verboseMode = false;

var _screenshotRoot = '.' + fs.separator + 'img' + fs.separator;
var _src = '.' + fs.separator + 'default';

var exitStatus;
var _hideElements;
var _waitTimeout = 60000;
var _mismatchTolerance = 0.05;
var _resembleOutputSettings;

var _resemblePath;
var _resembleContainerPath;
var _libraryRoot;

var _environmentName = 'default';
var _packageName = 'default';
var _viewportSize = '0x0';

exports.screenshot = screenshot;
exports.waitForImagesToBeLoaded = waitForImagesToBeLoaded;
exports.init = init;
exports.update = update;
exports.turnOffAnimations = turnOffAnimations;
exports.getExitStatus = getExitStatus;
exports.setEnvironment = setEnvironment;
exports.setPackage = setPackage;
exports.clearAllScreenshots = clearAllScreenshots;
exports.setViewport = setViewport;
exports.compareEnvironments = compareEnvironments;
exports.injectCss = injectCss;
exports.setRenderMedia = setRenderMedia;
exports.convertImageToJpg = convertImageToJpg;


function update(options) {

	function stripslash(str) {
		return (str || '').replace(/\/\//g, '/').replace(/\\/g, '\\');
	}

	options = options || {};

	casper.options.waitTimeout = options.defaultTimeout || 5000;

	verboseMode = options.verbose || verboseMode;

	_waitTimeout = options.waitTimeout || _waitTimeout;

	_libraryRoot = options.libraryRoot || _libraryRoot || '.';

	_resemblePath = _resemblePath || getResemblePath(_libraryRoot);

	_resembleContainerPath = _resembleContainerPath || (_libraryRoot + fs.separator + 'resemblejscontainer.html');

    _screenshotRoot = options.screenshotRoot || ('.'  + fs.separator + 'img' + fs.separator);
	_src = stripslash(_screenshotRoot) + (_environmentName || 'default');

	_fileNameGetter = options.fileNameGetter || _fileNameGetter;

	_onPass = options.onPass || _onPass;
	_onFail = options.onFail || _onFail;
	_onTimeout = options.onTimeout || _onTimeout;
	_onNewImage = options.onNewImage || _onNewImage;
	_onComplete = options.onComplete || options.report || _onComplete;

	_hideElements = options.hideElements;

	_mismatchTolerance = options.mismatchTolerance || _mismatchTolerance;

	_resembleOutputSettings = options.outputSettings || _resembleOutputSettings;
}

function init(options) {
	update(options);
}

function getResemblePath(root) {

    var path = [ root, 'node_modules', 'resemblejs', 'resemble.js' ].join(fs.separator);
    if (!fs.isFile(path)) {
        throw '[pediff.js] resemble.js not found: ' + path;
    }

	return path;
}

function log(message) {
    if(verboseMode) {
	    console.log('[pediff.js][' + (_packageName || 'default') + '] ' + message);
    }
}

function waitForImagesToBeLoaded(milliseconds) {
    casper.waitFor(function() {
        return this.evaluate(function() {
            var images = document.getElementsByTagName('img');
            if(!images.length) {
            	return true;
            }
            return Array.prototype.every.call(images, function(i) { return i.complete; });
        });
    }, function() {
        log('Waiting for all images to be loaded');
        casper.wait(250);
    }, function() {}, milliseconds || casper.options.waitTimeout);
}

function turnOffAnimations() {
	log('Turning off animations');
	casper.evaluate(function turnOffAnimations() {

		function disableAnimations() {
			if (jQuery) {
				jQuery.fx.off = true;
			}

			var css = document.createElement('style');
			css.type = 'text/css';
			css.innerHTML = ['* {',
				'-webkit-transition: none !important;',
				'transition: none !important;',
				'-webkit-animation: none !important;',
				'animation: none !important;',
			'}'].join('');
			document.body.appendChild(css);
		}

		if (document.readyState !== 'loading') {
			disableAnimations();
		} else {
			window.addEventListener('load', disableAnimations, false);
		}
	});
}

function _fileNameGetter(root, filename) {
    var name = _viewportSize + '_' +
			_packageName.replace(/ /g, '-') +
			(filename ? '@' + filename.replace(/ /g, '-') : '');
	return root + fs.separator + name + '.png';
}

function screenshot(target, filename, dontWaitForImages, timeToWait, hideSelector) {
	if(!dontWaitForImages) {
        waitForImagesToBeLoaded();
	}

	var name;
	if (isComponentsConfig(target)) {
		for (name in target) {
			if (isComponentsConfig(target[name])) {
				waitAndHideToCapture(target[name].selector, name,
						target[name].ignore, target[name].wait);
			} else {
				waitAndHideToCapture(target[name], name);
			}
		}
	} else {
		waitAndHideToCapture(target, filename, hideSelector, timeToWait);
	}
}

function isComponentsConfig(obj) {
	return (obj instanceof Object) && (isClipRect(obj) === false);
}

function capture(srcPath, target) {
	try {
        if (isClipRect(target)) {
            casper.capture(srcPath, target);
        } else {
            casper.captureSelector(srcPath, target);
        }

        _onNewImage({
            filename: srcPath
        });
	} catch(ex) {
		casper.test.fail('Screenshot capture failed: ' + ex.message);
	}
}

function isClipRect(value) {
	return (
		typeof value === 'object' &&
		typeof value.top === 'number' &&
		typeof value.left === 'number' &&
		typeof value.width === 'number' &&
		typeof value.height === 'number'
	);
}

function copyAndReplaceFile(src, dest) {
	if (fs.isFile(dest)) {
		fs.remove(dest);
	}
	fs.copy(src, dest);
}

function asyncCompare(one, two, func) {

	if(!casper.evaluate(function () {
			return window._imagediff_;
		})) {
		initClient();
	}

	casper.fill('form#image-diff', {
		'one': one,
		'two': two
	});

	casper.evaluate(function (filename) {
		window._imagediff_.run(filename);
	}, {});

	casper.waitFor(
		function check() {
			return this.evaluate(function () {
				return window._imagediff_.hasResult;
			});
		},
		function () {
			var mismatch = casper.evaluate(function () {
				return window._imagediff_.getResult();
			});

			if (Number(mismatch)) {
				func(false, mismatch);
			} else {
				func(true);
			}

		},
		function () {
			func(false);
		},
		_waitTimeout
	);
}

function compareEnvironments(env1, env2, packageName) {
    log('Comparing environment "' + env1 + '" with "' + env2 + '"');
    var tests = [],
        deferred = q.defer(),
        filenameRegex = new RegExp('(\\d+x\\d+)_' + packageName.replace(/ /g,'-') + '(@.+)?\\.png'),
        files = fs.list(_screenshotRoot + env1)
            .filter(function(file) {
                return filenameRegex.test(file);
            }),
        filesToGo = files.length;

    if(!filesToGo) {
    	return deferred.resolve([]);
	}

    if (!fs.isFile(_resembleContainerPath)) {
        throw new Error('[pediff.js] Can\'t find Resemble container.' +
        	'Perhaps the library root is mis configured. (' + _resembleContainerPath + ')');
    }

    function tryToResolve() {
        if(filesToGo<=0) {
            deferred.resolve(tests);
        }
    }

    files.forEach(function(filename) {
        var file1 = _screenshotRoot + env1 + fs.separator + filename;
        var file2 = _screenshotRoot + env2 + fs.separator + filename;

        var test = {
            filename: filename
        };

        tests.push(test);

        casper.thenOpen(_resembleContainerPath, function() {

            asyncCompare(file1, file2, function(isSame, mismatch) {
                filesToGo--;
                if (!isSame) {
                    test.fail = true;

                    casper.waitFor(
                        function check() {
                            return casper.evaluate(function () {
                                return window._imagediff_.hasImage;
                            });
                        },
                        function() {
                        	if(isNaN(mismatch)) {
                        		casper.echo('Unknown mismatch: ' + mismatch);
                        		_onFail(test); // casper.test.fail throws and error, this function call is aborted
                                return; // Just to make it clear what is happening
                        	}
                            var failFile;
                        	var parts = file2.split(fs.separator);
                        	var fname = parts.pop();
                        	var mismatchPadded = '' + Math.round(10000-parseFloat(mismatch)*100);

                        	while(mismatchPadded.length<5) {
                        		mismatchPadded = '0'+mismatchPadded;
                        	}

                            failFile = parts.join(fs.separator) + fs.separator + mismatchPadded + '_' + fname;

                            casper.captureSelector(failFile, 'img');
                            test.failFile = failFile;
                            // log('Failure! Saved to: ' + failFile);

                            casper.evaluate(function () {
                                window._imagediff_.hasImage = false;
                            });

                            if (mismatch) {
                                test.mismatch = mismatch;
                                _onFail(test); // casper.test.fail throws and error, this function call is aborted
                                return; // Just to make it clear what is happening
                            } else {
                                _onTimeout(test);
                            }
                            tryToResolve();
                        },
                        function () {
                            tryToResolve();
                        },
                        _waitTimeout
                    );
                } else {
                    test.success = true;
                	var parts = file2.split(fs.separator);
                	var fname = parts.pop();
                	fname = parts.join(fs.separator)+fs.separator+'10000_'+fname;
                    fs.copy(file2, fname);
                    _onPass(test);
                    tryToResolve();
                }
            });
        });
    });

    return deferred.promise;
}

function initClient() {
	casper.page.injectJs(_resemblePath);

	casper.evaluate(function (mismatchTolerance, resembleOutputSettings) {
			var result;
			var div = document.createElement('div');

			// this is a bit of hack, need to get images into browser for analysis
			div.style = 'display:block;position:absolute;border:0;top:-1px;' +
					'left:-1px;height:1px;width:1px;overflow:hidden;';
			div.innerHTML = '<form id="image-diff">' +
				'<input type="file" id="image-diff-one" name="one"/>' +
				'<input type="file" id="image-diff-two" name="two"/>' +
				'</form><div id="image-diff"></div>';
			document.body.appendChild(div);

			if (resembleOutputSettings) {
				resemble.outputSettings(resembleOutputSettings);
			}

			window._imagediff_ = {
				hasResult: false,
				hasImage: false,
				run: run,
				getResult: function() {
					window._imagediff_.hasResult = false;
					return result;
				}
			};

			function run() {

				function render(data) {
					var img = new Image();

					img.onload = function() {
						window._imagediff_.hasImage = true;
					};
					document.getElementById('image-diff').appendChild(img);
					img.src = data.getImageDataUrl();
				}

				resemble(document.getElementById('image-diff-one').files[0]).
				compareTo(document.getElementById('image-diff-two').files[0]).
				ignoreAntialiasing(). // <-- muy importante
				onComplete(function(data) {
					var diffImage;

					if (Number(data.misMatchPercentage) > mismatchTolerance) {
						result = data.misMatchPercentage;
					} else {
						result = false;
					}

					window._imagediff_.hasResult = true;

					if (Number(data.misMatchPercentage) > mismatchTolerance) {
						render(data);
					}

				});
			}
		},
		_mismatchTolerance,
		_resembleOutputSettings
	);
}

function _onPass(test) {
	casper.test.pass('No changes found for screenshot ' + test.filename);
}

function _onFail(test) {
        casper.echo('Visual change found for screenshot ' + test.filename + ' (' + test.mismatch + '% mismatch)', 'ERROR');
}

function _onTimeout(test) {
	casper.test.info('Could not complete image comparison for ' + test.filename);
}

function _onNewImage(test) {
	casper.test.info('[' + _environmentName + '] Screenshot of ' + _packageName + ' @ ' + _viewportSize);
}

function _onComplete(tests, noOfFails, noOfErrors) {
	exitStatus = noOfErrors + noOfFails;
}

function waitAndHideToCapture(target, fileName, hideSelector, timeToWait) {

	casper.wait(timeToWait || 250, function() {

		var srcPath = _fileNameGetter(_src, fileName);

		if (hideSelector || _hideElements) {
			casper.evaluate(setVisibilityToHidden, {
				s1: _hideElements,
				s2: hideSelector
			});
		}

		capture(srcPath, target);

	}); // give a bit of time for all the images appear
}

function setVisibilityToHidden(s1, s2) {
	// executes in browser scope
	var selector;
	var elements;
	var i;

	if (jQuery) {
		if (s1) {
			jQuery(s1).css('visibility', 'hidden');
		}
		if (s2) {
			jQuery(s2).css('visibility', 'hidden');
		}
		return;
	}

	// Ensure at least an empty string
	s1 = s1 || '';
	s2 = s2 || '';

	// Create a combined selector, removing leading/trailing commas
	selector = (s1 + ',' + s2).replace(/(^,|,$)/g, '');
	elements = document.querySelectorAll(selector);
	i = elements.length;

	while (i--) {
		elements[i].style.visibility = 'hidden';
	}
}

function getExitStatus() {
	return exitStatus;
}

function setPackage(name) {
    if(name===_packageName) return;
    _packageName = name || 'default';
    log('Package ' + _packageName);
}

function setEnvironment(name) {
    if(name===_environmentName) return;
    _environmentName = name || 'default';
    _src = _screenshotRoot + _environmentName;
    log('Environment ' + _environmentName);
}

function setViewport(width, height) {
    casper.viewport(width, height);
    if(width+'x'+height===_viewportSize) return;
    _viewportSize = width+'x'+height;
    log('Viewport ' + _viewportSize);
}

function clearAllScreenshots() {
    log('Removing all screenshots from path "'+ _screenshotRoot +'"');
    fs.removeTree(_screenshotRoot);
}

function injectCss(css, media) {
	var plainCss, i;
	if(typeof css!=='string') {
		plainCss = '';
		for(i in css) {
			if(css.hasOwnProperty(i)) {
				plainCss += '' + i + '{'+css[i]+'}';
			}
		}
	}
    casper.evaluate(function(plainCss, media) {
        var style = document.createElement('style');
        style.media = media || 'screen';
        style.innerHTML = plainCss || css;
        document.body.appendChild(style);
    }, plainCss, media);
}

function setRenderMedia(mediaString) {
    casper.evaluate(function (mediaString) {
        var links = document.getElementsByTagName('link');
        for (var i = 0, len = links.length; i < len; ++i) {
            var link = links[i];
            if (link.rel === 'stylesheet') {
                if (link.media === 'screen') { link.media = ''; }
                if (link.media === mediaString) { link.media = 'screen'; }
            }
        }
    }, mediaString);
    log('CSS rendering media "' + mediaString + '"');
}

function convertImageToJpg(dirname, filename) {
    var dstName = dirname + filename.replace('.png', '.jpg');
    
    casper.thenOpen(_resembleContainerPath, function() {
        casper.evaluate(function(path) {
            var img = document.createElement('img');
            img.src = path;
            img.id = 'image';
            document.body.appendChild(img);
            window.$$resembleReady = true;
        }, dirname+filename);

        casper.waitFor(function check() {
            return this.evaluate(function() {
                return window.$$resembleReady;
            });
        },
        function() {
            waitForImagesToBeLoaded();
            casper.captureSelector(dstName, '#image');
            casper.test.info('Converted "' + filename + '"');
        },
        function() {
            casper.echo('[Error] Waiting for image timeout');
        });
    });
}
