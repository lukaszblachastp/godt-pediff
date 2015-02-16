module.exports = {
    config: {
        path: '#!/siste-video',
        package: 'latest-video'
    },
    execute: function(pediff, config) {
            this.waitWhileSelector('.loader', function() {
            pediff.screenshot('#wrapper');
        }, function(){}, 10000);
    }
};
