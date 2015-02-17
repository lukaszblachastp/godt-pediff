module.exports = {
    config: {
        path: '#!/godtfrabloggerne',
        package: 'explore'
    },
    execute: function(pediff, config) {
        this.waitFor(function() {
            return this.evaluate(function() {
                return document.querySelectorAll('.loader').length < 1;
            });
        }, function() {         
            this.waitUntilVisible('#content .explore-entry img', function() {
                pediff.screenshot('#wrapper');
            }, function(){}, 10000);
        }, function() {
            this.echo('Loaders sill spinning, giving up', 'ERROR');
        }, 10000);
    }
};
