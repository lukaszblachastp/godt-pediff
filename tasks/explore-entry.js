module.exports = {
    config: {
        path: '#!/godtfrabloggerne/3003/saftige-gresskarpannekaker',
        package: 'explore-entry'
    },
    execute: function(pediff, config) {
    	this.waitFor(function() {
    		return this.evaluate(function() {
    			return document.querySelectorAll('.loader').length < 1;
    		});
    	}, function() {
            this.wait(500, function() {
                pediff.screenshot('#wrapper');
            });
    	}, function() {
    		this.echo('Loaders sill spinning, giving up', 'ERROR');
    	}, 10000);
    }
};
