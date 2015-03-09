var godt = require('../helpers/godt.js');

module.exports = {
    config: {
        path: '#!/artikkel/21094124/ekte-poelsesnadder-seks-tilbehoersvarianter-du-maa-proeve',
        media: {
            print: {width: 1280, height: 3000}
        },
        package: 'article'
    },
    execute: function(pediff, config) {
        godt.waitUntilRendered();

        pediff.waitForLoadersToFinish();

        this.then(function() {
            this.waitUntilVisible('#content .article-data .flex-image', function() {
                pediff.screenshot('#wrapper');
            }, function(){}, 10000);
        });
    }
};
