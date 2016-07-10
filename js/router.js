CL.Router.Router = Backbone.Router.extend({
  routes: {
    '': 'index',
    'login': 'login',
    'logout': 'logout',
    'register': 'register',
    'customers': 'customers',
    'customer/:id': 'customer'
  },
  index: function () {
    this.loginView = new CL.Views.Index();
    $('#container').html(this.loginView.render().el);
  },
  login: function () {
    this.userSession = new CL.Models.Session();
    this.loginView = new CL.Views.Login({ model: this.userSession });
    $('#container').html(this.loginView.render().el);
    $('#container').prepend('<h4>Login</h4>');
    $('#login-register').html('Awww, I do not have an account yet');
    this.userSession.on('change:token', this.saveToken, this);
  },
  logout: function () {
    localStorage.removeItem('myToken');
    window.location = '';
  },
  register: function () {
    this.userSession = new CL.Models.User();
    this.loginView = new CL.Views.Login({ model: this.userSession });
    $('#container').html(this.loginView.render().el);
    $('#container').prepend('<h4>Register</h4>');
    $('#login-submit').html('Thanks, I have an account already');
    this.userSession.on('sync', this.saveToken, this);
  },
  customers: function () {
    this.customers = new CL.Collections.Customers();
    this.customerView = new CL.Views.CustomerList({ model: this.customers });
    $('#container').html(this.customerView.render().el);
  },
  customer: function (id) {
    this.transactions = new CL.Collections.Transactions(id);
    this.transactionsView = new CL.Views.TransactionList({ model: this.transactions });
    $('#container').html(this.transactionsView.render().el);
  },
  saveToken: function () {
    localStorage.setItem('myToken', this.userSession.attributes.token);
    window.location = '#customers';
  }
});
