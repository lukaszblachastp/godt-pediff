module.exports = {
    config: {
        path: 'embed/todays-dish',
        package: 'embed-todays-dish'
    },
    execute: function(pediff, config) {
        this.then(function() {
            pediff.screenshot('.todays-dish-wrapper');
        });
    }
};
