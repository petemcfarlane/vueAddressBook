//var data = {
//    title: 'todos',
//    todos: [
//        {
//            done: true,
//            content: 'Learn JavaScript',
//            amount: 503454.567
//        },
//        {
//            done: false,
//            content: 'Learn Vue.js',
//            amount: '545645650.567'
//        }
//    ]
//};
//
//var demo = new Vue({
//    el: '#demo',
//    data: data
//});

function get(url, successHandler, errorHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('get', url);
    xhr.onreadystatechange = function() {
        // https://xhr.spec.whatwg.org/#dom-xmlhttprequest-readystate
        if (xhr.readyState == 4) { // `DONE`
            if (xhr.status == 200) {
                successHandler && successHandler(xhr.response);
            } else {
                errorHandler && errorHandler(xhr);
            }
        }
    };
    xhr.send();
}

var addressBook = new Vue({
    el: '#address-book',
    data: {
        contacts: [],
        contactName: '',
        search: ''
    },
    ready: function () {
        get(
            'contacts.json',
            function (contacts) {
                addressBook.contacts = addressBook.contacts.concat(contacts);
            },
            function (xhr) {
                var message = xhr.status + ' ' + xhr.statusText;
                if (xhr.response) {
                    message += '\n' + xhr.response;
                }
                alert(message);
            });
    },
    methods: {
        addContact: function () {
            addressBook.contacts.push({name: addressBook.contactName});
            addressBook.contactName = '';
        }
    }
});