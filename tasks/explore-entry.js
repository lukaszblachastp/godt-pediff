module.exports = {
    config: {
        path: '#!/godtfrabloggerne/3003/saftige-gresskarpannekaker',
        package: 'explore-entry'
    },
    execute: function(pediff, config) {
        this.waitUntilVisible('.explore-nav', function() {
            pediff.screenshot('#wrapper');
        }, function(){}, 10000);
    }
};
