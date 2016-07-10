$.ajaxSetup({ headers: { 'Authorization': localStorage.getItem('myToken') } });
CL.Collections.Customers = Backbone.Collection.extend({
  model: CL.Models.Customer,
  parse: function (data) {
    return data.customers;
  },
  url: 'http://localhost:3000/api/customers',
  initialize: function () {
    this.fetch({ reset: true });
  }
});
