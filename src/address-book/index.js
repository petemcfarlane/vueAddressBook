var request = require('superagent');

module.exports = {
    template: require('./address-book.html'),
    replace: true,
    data: function () {
        return {
            search: '',
            contacts: [],
            newContact: {
                name: '',
                isCompany: true
            }
        }
    },
    ready: function () {
        var addressBook = this;
        request
            .get('http://localhost:8000/contact')
            .auth('test@user.com', 'password')
            .accept('json')
            .set('X-Requested-With', 'XMLHttpRequest')
            .end(function (err, res) {
                if (res.ok) {
                    addressBook.contacts = addressBook.contacts.concat(JSON.parse(res.text));
                } else {
                    alert('Oh no! error ' + res.status + ' ' + res.statusText);
                }
            });
    },
    methods: {
        addContact: function () {
            var contacts = this.contacts,
                newContact = {
                    name: this.newContact.name,
                    is_company: this.newContact.isCompany
                },
                newContactForm = this.newContact,
                resetInput = function () {
                    newContactForm.name = '';
                    newContactForm.isCompany = true;
                };

            if (newContact.name) {
                request
                    .post('http://localhost:8000/contact')
                    .auth('test@user.com', 'password')
                    .accept('json')
                    .set('X-Requested-With', 'XMLHttpRequest')
                    .send(newContact)
                    .end(function (err, res) {
                        if (res.ok) {
                            contacts.push(newContact);
                            resetInput();
                        } else {
                            alert('Oh no! error ' + res.status + ' ' + res.statusText);
                        }
                    });
            }
        }
    }
};