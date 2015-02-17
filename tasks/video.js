module.exports = {
    config: {
        path: '#!/video/65999/slik-lager-du-sommerens-beste-salat-med-skinke-og-jordbaer',
        package: 'video'
    },
    execute: function(pediff, config) {
        this.waitFor(function() {
            return this.evaluate(function() {
                return document.querySelectorAll('.loader').length < 1;
            });
        }, function() {         
            this.waitForSelector('#content .video-data .video-container', function() {
                this.then(function() {
                    pediff.screenshot('#wrapper');
                });
            }, function() {}, 5000);
        }, function() {
            this.echo('Loaders sill spinning, giving up', 'ERROR');
        }, 10000);
    }
};
