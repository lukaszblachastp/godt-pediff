var godt = require('../helpers/godt.js');

module.exports = {
    config: {
        path: '#!/oppskrift/567/naanbroed',
        package: 'recipe'
    },
    execute: function(pediff, config) {
        godt.waitUntilRendered();
        // single recipe
        this.waitWhileSelector('#content noscript', function() {
            this.wait(500);
            pediff.screenshot('#wrapper');
        }, function() {}, 10000);
    }
};
