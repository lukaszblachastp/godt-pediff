module.exports = {
    config: {
        path: 'embed/todays-dish/mobile',
        options: {
            viewportSize: [{width: 480, height: 175}]
        },
        package: 'embed-todays-dish-mobile'
    },
    execute: function(pediff, config) {
        this.then(function() {
            pediff.screenshot('.todays-dish-wrapper');
        });
    }
};
