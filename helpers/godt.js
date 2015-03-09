function isMainViewRendered() {
    return casper.evaluate(function() {
        try {
            var rendered = require('app').mainViewRendered;
            if(rendered) {
            } else {
            }
            return rendered;
        } catch(err) {
            return false;
        }
    });
}

function waitUntilRendered() {
    casper.echo('Waiting for main view');

    casper.waitFor(isMainViewRendered,
        function() {
            console.log('[GodtHelper] Main View has been rendered');
        },
        function() {
            console.log("[GodtHelper] Error! Waiting for main view timed out");
        });
}

module.exports = {
    waitUntilRendered: waitUntilRendered,
    isMainViewRendered: isMainViewRendered
};
