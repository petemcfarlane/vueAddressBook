var request = require('superagent');

module.exports = {
    template: require('./address-book.html'),
    replace: true,
    data: function () {
        return {
            msg: 'I am component A!',
            search: '',
            contacts: [],
            newContactName: ''
        }
    },
    ready: function () {
        var addressBook = this;
        request('get', 'contacts.json')
            .accept('json')
            .end(function (err, res) {
            if (res.ok) {
                addressBook.contacts = addressBook.contacts.concat(res.body);
            } else {
                alert('Oh no! error ' + res.status + ' ' + res.statusText);
            }
        });
    },
    methods: {
        addContact: function () {
            this.contacts.push({name: this.contactName});
            this.contactName = '';
        }
    }
};