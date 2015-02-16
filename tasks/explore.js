module.exports = {
    config: {
        path: '#!/godtfrabloggerne',
        package: 'explore'
    },
    execute: function(pediff, config) {
        this.waitUntilVisible('#content .explore-entry img', function() {
            pediff.screenshot('#wrapper');
        }, function(){}, 10000);
    }
};
