module.exports = {
    config: {
        path: '#!/artikkel/21094124/ekte-poelsesnadder-seks-tilbehoersvarianter-du-maa-proeve',
        media: {
            print: {width: 1280, height: 3000}
        },
        package: 'article'
    },
    execute: function(pediff, config) {
        this.waitFor(function() {
            return this.evaluate(function() {
                return document.querySelectorAll('.loader').length < 1;
            });
        }, function() {         
            this.waitUntilVisible('#content .article-data .flex-image', function() {
                pediff.screenshot('#wrapper');
            }, function(){}, 10000);
        }, function() {
            this.echo('Loaders sill spinning, giving up', 'ERROR');
        }, 10000);
    }
};
