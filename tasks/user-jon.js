module.exports = {
    config: {
        path: '#!/bruker/35/jon-krog-pedersen',
        package: 'user-jon-krog-pedersen'
    },
    execute: function(pediff, config) {
        this.waitWhileSelector('.loader', function() {
            pediff.screenshot('#wrapper');
        }, function() {}, 10000);
    }
};
