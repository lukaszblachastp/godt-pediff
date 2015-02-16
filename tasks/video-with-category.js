module.exports = {
    config: {
        path: '#!/video/c/smaaplantelaget/65498/grillmarinade-paa-1-2-3',
        package: 'video-with-category'
    },
    execute: function(pediff, config) {
        // video with category
        this.waitForSelector('#content .video-data iframe', function() {
            this.wait(500);
            pediff.screenshot('#wrapper');
        }, function() {}, 10000);
    }
};
