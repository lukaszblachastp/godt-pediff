module.exports = {
    config: {
//        path: 'PATH/TO/RESOURCE',
        package: 'home',
        actions: ['search-autocomplete']
    },
    execute: function(pediff, config) {
        this.waitFor(function() {
            return this.evaluate(function() {
                return document.querySelectorAll('.loader').length < 1;
            });
        }, function() {         
            // homepage
            this.waitUntilVisible('.main-page-main-box img', function() {
                this.wait(500, function(){
                    pediff.screenshot('#wrapper');
                });
            });

            // search
            this.then(function() {
                this.waitForSelector('.search-form .search-input', function(){
                    this.sendKeys('.search-form .search-input', 'naan', {keepFocus: true});
                }, function(){}, 10000);
            });

            this.then(function() {
                // search autocomplete
                this.waitForSelector('.search-autocomplete a', function(){
                    pediff.screenshot('#wrapper', config.actions[0]);
                }, function(){}, 10000);
            });
        }, function() {
            this.echo('Loaders sill spinning, giving up', 'ERROR');
        }, 10000);
    }
};
