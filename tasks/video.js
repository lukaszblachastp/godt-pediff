module.exports = {
    config: {
        path: '#!/video/65999/slik-lager-du-sommerens-beste-salat-med-skinke-og-jordbaer',
        package: 'video'
    },
    execute: function(pediff, config) {
        this.waitForSelector('#content .video-data .video-container', function() {
            pediff.screenshot('#wrapper');
        }, function() {}, 5000);
    }
};
