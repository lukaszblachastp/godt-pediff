module.exports = {
    config: {
        path: 'embed/todays-dish',
        options: {
            viewportSize: [{width: 1280, height: 3000}]
        },
        package: 'embed-todays-dish'
    },
    execute: function(pediff, config) {
        this.then(function() {
            pediff.screenshot('#wrapper');
        });
    }
};
