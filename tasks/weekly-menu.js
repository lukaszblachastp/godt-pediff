module.exports = {
    config: {
        path: '#!/ukemeny',
        package: 'weekly-menu'
    },
    execute: function(pediff, config) {
        this.waitWhileSelector('.loader', function() {
            pediff.screenshot('#wrapper');
        }, function() {}, 10000);
    }
};
