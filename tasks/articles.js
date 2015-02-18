module.exports = {
    config: {
        path: '#!/artikler/1205/aktuelt',
        package: 'articles'
    },
    execute: function(pediff, config) {
        pediff.waitForLoadersToFinish();

        this.then(function() {
            this.waitUntilVisible('#content article .flex-image', function() {
                pediff.screenshot('#wrapper');
            }, function(){}, 10000);
        });
    }
};
