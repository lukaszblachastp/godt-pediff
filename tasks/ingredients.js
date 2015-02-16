module.exports = {
    config: {
        path: '#!/ingredienser',
        package: 'ingredients-list',
        actions: ['2nd-page']
    },
    execute: function(pediff, config) {
        this.waitWhileSelector('.loader', function() {
            pediff.screenshot('#wrapper');
        }, function() {}, 10000);

        // 2nd page
        this.thenClick('#content .next-elements-button', function() {
            this.waitWhileSelector('#content .next-elements-button.loading', function() {
                pediff.screenshot('#wrapper', config.actions[0]);
            }, function() {}, 10000);
        });
    }
};
