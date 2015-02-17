module.exports = {
    config: {
        path: 'embed/todays-dish/mobile',
        package: 'embed-todays-dish-mobile'
    },
    execute: function(pediff, config) {
        this.then(function() {
            pediff.screenshot('.todays-dish-wrapper');
        });
    }
};
