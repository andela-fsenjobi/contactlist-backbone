$.ajaxSetup({ headers: { 'Authorization': localStorage.getItem('myToken') } });
window.CustomerCollection = Backbone.Collection.extend({
  model: CustomerModel,
  parse: function (data) {
    return data.customers;
  },
  url: 'http://localhost:3000/api/customers',
  initialize: function () {
    this.fetch({ reset: true });
  }
});