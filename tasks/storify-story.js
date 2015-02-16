module.exports = {
    config: {
        path: '#!/storify/godtfraleserne',
        package: 'storify'
    },
    execute: function(pediff, config) {
        this.waitWhileSelector('.loader', function() {
            this.wait(2000, function() {
                pediff.screenshot('#wrapper');
            });
        }, function() {}, 10000);
    }
};
