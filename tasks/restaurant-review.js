module.exports = {
    config: {
        path: '#!/artikkel/22583940/bagatelle-tilbake-som-ledestjerne',
        package: 'restaurant-review'
    },
    execute: function(pediff, config) {
        this.waitUntilVisible('#content .article-data .flex-image', function() {
            pediff.screenshot('#wrapper');
        }, function() {}, 10000);
    }
};
