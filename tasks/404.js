module.exports = {
    config: {
        path: '#!/not-existing-page',
        package: '404'
    },
    execute: function(pediff, config) {
        this.waitUntilVisible('.main-logo img', function() {
            pediff.screenshot('#wrapper');
        });
    }
};
