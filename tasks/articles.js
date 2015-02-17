module.exports = {
    config: {
        path: '#!/artikler/1205/aktuelt',
        package: 'article-list'
    },
    execute: function(pediff, config) {
        this.waitFor(function() {
            return this.evaluate(function() {
                return document.querySelectorAll('.loader').length < 1;
            });
        }, function() {         
	        this.waitUntilVisible('#content article .flex-image', function() {
	            pediff.screenshot('#wrapper');
	        }, function(){}, 10000);
        }, function() {
            this.echo('Loaders sill spinning, giving up', 'ERROR');
        }, 10000);
    }
};
