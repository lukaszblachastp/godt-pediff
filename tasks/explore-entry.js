module.exports = {
    config: {
        path: '#!/godtfrabloggerne/3003/saftige-gresskarpannekaker',
        package: 'explore-entry'
    },
    execute: function(pediff, config) {
        this.then( function() {
            pediff.screenshot('#wrapper');
        });
    }
};
