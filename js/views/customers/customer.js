window.CustomerSingleView = Backbone.View.extend({
  tagName: 'li',
  template: _.template($('#customer-detail').html()),
  events: {
    'click .delete-customer': "removeCustomer"
  },
  render: function (eventName) {
    try {
      $(this.el).html(this.template(this.model.toJSON()));
    } catch (e) {
      $(this.el).html(this.template(this.model.attributes.customer));
    }
    return this;
  },
  removeCustomer: function (e) {
    e.preventDefault();
    console.log(this.model);
    var continueDelete = confirm("Are you sure you want to delete this?");
    if(continueDelete){
      this.model.destroy();
      this.el.remove();
    }
  }
});
window.CustomerButton = Backbone.View.extend({
  tagName: 'button',
  className: 'button-primary',
  id: 'new-customer',
  render: function () {
    $(this.el).html('+');
    return this;
  }
});
window.CustomerListView = Backbone.View.extend({
  tagName: 'ul',
  className: 'collection',
  id: 'customer-list',
  initialize: function () {
    this.model.on('reset', this.render, this);
  },
  render: function () {
    _.each(this.model.models, function (customer) {
      $(this.el).append(new CustomerSingleView({ model: customer }).render().el);
    }, this);
    return this;
  }
});
window.CustomerHeader = Backbone.View.extend({
  template: _.template($('#customer-header').html()),
  events: { 'click #new-customer': 'showForm' },
  render: function () {
    $(this.el).html(this.template());
    return this;
  },
  showForm: function () {
    $(this.el).append(new CustomerForm({ model: this.model }).render().el);
  }
});
window.CustomerForm = Backbone.View.extend({
  tagName: 'form',
  template: _.template($('#customer-form').html()),
  events: { 'click #customer-submit': 'createCustomer' },
  render: function (eventName) {
    $(this.el).html(this.template());
    return this;
  },
  createCustomer: function (e) {
    e.preventDefault();
    this.newCustomer = this.model.create({
      name: $('#customer-name').val(),
      phone: $('#customer-phone').val()
    }, { wait: true });
    this.newCustomer.on('sync', this.appendNew, this);
    this.el.remove();
  },
  appendNew: function (model) {
    $('#customer-list').append(new CustomerSingleView({ model: model }).render().el);
  }
});
