module.exports = {
    config: {
        path: '#!/om-oss',
        package: 'about-us'
    },
    execute: function(pediff, config) {
        this.waitWhileSelector('.loader', function() {
            pediff.screenshot('#wrapper');
        }, function(){}, 10000);
    }
};
