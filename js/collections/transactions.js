window.TransactionsCollection = Backbone.Collection.extend({
  model: TransactionModel,
  parse: function (data) {
    return data.transactions;
  },
  initialize: function (customerId) {
    this.url = 'http://localhost:3000/api/customers/' + customerId + '/transactions';
    this.fetch({ reset: true });
  }
});