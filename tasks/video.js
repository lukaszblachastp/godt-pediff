var godt = require('../helpers/godt.js');
module.exports = {
    config: {
        path: '#!/video/65999/slik-lager-du-sommerens-beste-salat-med-skinke-og-jordbaer',
        package: 'video'
    },
    execute: function(pediff, config) {
        godt.waitUntilRendered();

        pediff.waitForLoadersToFinish();

        casper.then(function() {
            casper.waitForSelector('#content .video-data .video-container', function() {
                casper.then(function() {
                    pediff.screenshot('#wrapper');
                });
            }, function() {
                console.log('Requested selector never showed up');
                //pediff.screenshot('#wrapper', 'error');
            }, 5000);
        });
    }
};
