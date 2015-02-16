module.exports = {
    config: {
        path: '#!/oppskrift/567/naanbroed',
        package: 'recipe'
    },
    execute: function(pediff, config) {
        // single recipe
        this.waitWhileSelector('#content noscript', function() {
            this.wait(500);
            pediff.screenshot('#wrapper');
        }, function() {}, 10000);
    }
};
