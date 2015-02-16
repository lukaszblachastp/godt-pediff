module.exports = {
    config: {
        path: '#!/min-profil/kokeboeker/6847',
        package: 'my-profile-cookbook'
    },
    execute: function(pediff, config) {
        this.wait(500);

        this.thenEvaluate(function() {
            require('services/auth').setUserLogged({
                sig: 'eYY37F4Dl6E6PV_AGu9d8mtENLsfqAjjsqKATaLKhpU=.eyJyZXN1bHQiOnRydWUsInNlcnZlclRpbWUiOjEzNzUxNjkxMzgsImV4cGlyZXNJbiI6bnVsbCwiYmFzZURvbWFpbiI6Ind3dy5nb2R0Lm5vIiwiaWQiOiI1MWY3NmExZjQxMWM3YTQzNzAwMDAwMGQiLCJ1c2VySWQiOjMxOTUxNjEsImRpc3BsYXlOYW1lIjoiUGVkaWZmIiwiZ2l2ZW5OYW1lIjoiQW5kcnplaiBNYWNpdXJ6eW5za2kiLCJmYW1pbHlOYW1lIjoiUGVkaWZmIiwiZ2VuZGVyIjoidW5kaXNjbG9zZWQiLCJwaG90byI6Imh0dHBzOi8vc2VjdXJlLmdyYXZhdGFyLmNvbS9hdmF0YXIvMWJmYmNhMDFiZDMxMDk1MmVkOWZhNjFhMjk4MTNhMjk/cz0yMDAiLCJ1c2VyU3RhdHVzIjoiY29ubmVjdGVkIiwiYWxnb3JpdGhtIjoiSE1BQy1TSEEyNTYifQ=='
            });
            require('app').router.myProfileCookbook(6847);
        });

        this.then(function() {
            this.wait(500);
            this.waitUntilVisible('.cookbooks-list-element .element-image-container img',function() {
                pediff.screenshot('#wrapper');
            },function() {},1000);
        });
    }
};
