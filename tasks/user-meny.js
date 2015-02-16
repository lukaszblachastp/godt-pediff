module.exports = {
    config: {
        path: '#!/bruker/543/meny',
        package: 'user-meny'
    },
    execute: function(pediff, config) {
        this.waitWhileSelector('.loader', function() {
            pediff.screenshot('#wrapper');
        }, function() {}, 10000);
    }
};
