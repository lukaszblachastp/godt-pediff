module.exports = {
    config: {
        path: '#!/ingrediens/1944/appelsingele',
        package: 'single-ingredient'
    },
    execute: function(pediff, config) {
        this.waitWhileSelector('.loader',function() {
            this.waitForSelector('.ingredient-data', function() {
                pediff.screenshot('#wrapper');
            }, function() {}, 10000);
        })
    }
};
