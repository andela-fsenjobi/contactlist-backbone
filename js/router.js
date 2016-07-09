var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index',
    'login': 'login',
    'logout': 'logout',
    'register': 'register',
    'customers': 'customers',
    'customer/:id': 'customer'
  },
  index: function () {
    this.loginView = new IndexView();
    $('#container').html(this.loginView.render().el);
  },
  login: function () {
    this.userSession = new Session();
    this.loginView = new LoginView({ model: this.userSession });
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
    this.userSession = new User();
    this.loginView = new LoginView({ model: this.userSession });
    $('#container').html(this.loginView.render().el);
    $('#container').prepend('<h4>Register</h4>');
    $('#login-submit').html('Thanks, I have an account already');
    this.userSession.on('sync', this.saveToken, this);
  },
  customers: function () {
    this.customers = new CustomerCollection();
    this.customerView = new CustomerListView({ model: this.customers });
    $('#container').html(this.customerView.render().el);
    this.customerHeader = new CustomerHeader({ model: this.customers });
    $('#container').prepend(this.customerHeader.render().el);
    this.customerButton = new CustomerButton({ model: this.customers });
    $('#button-container').prepend(this.customerButton.render().el);
  },
  customer: function (id) {
    this.transactions = new TransactionsCollection(id);
    this.transactionsView = new TransactionListView({ model: this.transactions });
    $('#container').html(this.transactionsView.render().el);
    $('#container').prepend(new TransactionHeader({ collection: this.transactions }).render().el);
  },
  saveToken: function () {
    localStorage.setItem('myToken', this.userSession.attributes.token);
    window.location = '#customers';
  }
});
