module.exports = {
    config: {
        path: '#!/artikler/1205/aktuelt',
        package: 'article-list'
    },
    execute: function(pediff, config) {
        this.waitUntilVisible('#content article .flex-image', function() {
            pediff.screenshot('#wrapper');
        }, function(){}, 10000);
    }
};
