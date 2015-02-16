module.exports = {
    config: {
        path: '#!/restaurantguiden',
        package: 'restaurants'
    },
    execute: function(pediff, config) {
        this.waitUntilVisible('#content .high-rated-restaurants a', function() {
            pediff.screenshot('#wrapper');
        }, function() {}, 10000);
    }
};
