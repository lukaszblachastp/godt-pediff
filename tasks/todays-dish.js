var godt = require('../helpers/godt.js');

module.exports = {
    config: {
        path: '#!/dagens-rett',
        package: 'todays-dish'
    },
    execute: function(pediff, config) {
        godt.waitUntilRendered();
        // todays dish
        this.waitForSelector('.recipe-data h1', function() {
            pediff.screenshot('#wrapper');
        },function() {},2000);
    }
};
