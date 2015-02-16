module.exports = {
    config: {
        path: '#!/brukervilkaar',
        package: 'terms-and-conditions'
    },
    execute: function(pediff, config) {
        this.waitWhileSelector('.loader', function() {
            pediff.screenshot('#wrapper');
        }, function() {}, 10000);
    }
};
