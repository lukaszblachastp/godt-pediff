module.exports = {
    config: {
        path: '#!/soek/oppskrifter/alle/naan',
        package: 'search-results',
        actions: ['recipe']
    },
    execute: function(pediff, config) {
        this.then(function() {
            this.waitForSelector('.search-results-container li > a', function(){
                this.wait(1500, function() {
                    pediff.screenshot('#wrapper');
                });
            }, function() {}, 10000);
        });

        // extended search
        this.thenClick('.search-results-container li:nth-child(1) > a', function() {
            this.waitWhileSelector('.loader', function(){
                pediff.screenshot('#wrapper', config.actions[0]);
            }, function() {}, 10000);
        });
    }
};
