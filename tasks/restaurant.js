module.exports = {
    config: {
        path: '#!/restaurantguiden/1749',
        package: 'restaurant'
    },
    execute: function(pediff, config) {
        this.waitUntilVisible('#content .restaurant-partner-reviews a', function() {
            pediff.screenshot('#wrapper');
        }, function() {}, 10000);
    }
};
