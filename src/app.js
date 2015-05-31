var Vue = require('vue');

var app = new Vue({
    el: '#app',
    template: require('./app.html'),
    data: {
        title: 'Address Book'
    },
    components: {
        'address-book': require('./address-book')
    }
});