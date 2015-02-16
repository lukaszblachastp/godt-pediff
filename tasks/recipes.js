module.exports = {
    config: {
        path: '#!/oppskrifter/alle',
        package: 'recipes-list',
        actions: ['filtered','under-30-minutes']
    },
    execute: function(pediff, config) {
        // recipe list
        this.waitForSelector('.content-box ul', function() {
            pediff.screenshot('#wrapper');
        }, function() {}, 10000);

        // extended search
        this.thenClick('.recipes-filters li:nth-child(3) a', function() {
            this.wait(1000, function() {
                pediff.screenshot('#wrapper', config.actions[0]);
            });
        });

        this.thenClick('.recipes-filters li:nth-child(12) a', function() {
            this.wait(1000, function() {
                pediff.screenshot('#wrapper', config.actions[1]);
            });
        });
    }
};
