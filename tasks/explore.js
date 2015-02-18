module.exports = {
    config: {
        path: '#!/godtfrabloggerne',
        package: 'explore'
    },
    execute: function(pediff, config) {
        pediff.waitForLoadersToFinish();

        this.then(function() {
            this.waitUntilVisible('#content .explore-entry img', function() {
                pediff.screenshot('#wrapper');
            }, function(){}, 10000);
        });
    }
};
