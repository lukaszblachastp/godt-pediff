module.exports = {
    config: {
        path: '#!/godtfrabloggerne/3003/saftige-gresskarpannekaker',
        package: 'explore-entry'
    },
    execute: function(pediff, config) {
        pediff.waitForLoadersToFinish();

    	this.then(function() {
            this.wait(500, function() {
                pediff.screenshot('#wrapper');
            });
    	});
    }
};
