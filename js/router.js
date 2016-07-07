var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index',
    'login': 'login',
    'customer/:id': 'customer',
    'transactions': 'transactions',
    'transactions': 'transactions',
    'transaction/:id': 'transaction'
  },
  index: function () {
    this.customers = new CustomerCollection();
    this.customerView = new CustomerListView({ model: this.customers });
    $('#container').html(this.customerView.render().el);
    this.customerHeader = new CustomerHeader({ model: this.customers });
    $('#container').prepend(this.customerHeader.render().el);
    this.customerButton = new CustomerButton({ model: this.customers });
    $('#button-container').prepend(this.customerButton.render().el);
  },
  login: function () {
    this.userSession = new Session();
    this.loginView = new LoginView({ model: this.userSession });
    $('#container').html(this.loginView.render().el);
    this.userSession.on('change:token', this.saveToken, this);
  },
  saveToken: function () {
    localStorage.setItem('myToken', this.userSession.attributes.token);
    window.location = '';
  },
  customer: function (id) {
    this.transactions = new TransactionsCollection(id);
    this.transactionsView = new TransactionListView({ model: this.transactions });
    $('#details').html(this.transactionsView.render().el);
  }  // customers: function(){},
     // customer: function(id){},
     // transactions: function(customer_id){},
     // transaction: function(customer_id, id){}
});