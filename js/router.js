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
    // this.successView = new CL.Views.Notification('Hello', 'success');
    // this.errorView = new CL.Views.Notification('Hello', 'error');
    // $('body').append(this.successView.render().el);
    // $('body').append(this.errorView.render().el);
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
    this.successView = new CL.Views.Notification("You are now logged out", 'success');
    $('body').append(this.successView.render().el);
    localStorage.removeItem('myToken');
    this.navigate('', {trigger: true});
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
    this.customerView = new CL.Views.CustomerList({ collection: this.customers });
    $('#container').html(this.customerView.render().el);
  },
  customer: function (id) {
    this.transactions = new CL.Collections.Transactions(id);
    this.transactionsView = new CL.Views.TransactionList({ model: this.transactions });
    $('#container').html(this.transactionsView.render().el);
  },
  saveToken: function () {
    this.successView = new CL.Views.Notification(this.userSession.attributes.message, 'success');
    $('body').append(this.successView.render().el);
    localStorage.setItem('myToken', this.userSession.attributes.token);
    this.navigate('customers', {trigger: true});
  }
});
