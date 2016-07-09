window.CustomerSingleView = Backbone.View.extend({
  tagName: 'li',
  template: _.template($('#customer-detail').html()),
  events: {
    'click .delete-customer': 'removeCustomer',
    'click .edit-customer': 'populateCustomerForm',
    'click #customer-edit': 'editCustomer',
    'click #customer-cancel': 'cancelCustomerEdit'
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
    var continueDelete = confirm('Are you sure you want to delete this?');
    if (continueDelete) {
      this.model.destroy();
      this.el.remove();
    }
  },
  populateCustomerForm: function (e) {
    $('#customer-cancel').click();
    $('#cancel-create').click();
    e.preventDefault();
    var editForm = new CustomerForm().render().el;
    $(this.el).html(editForm);
    $('#customer-name').val(this.model.get('name'));
    $('#customer-phone').val(this.model.get('phone'));
    $('#customer-submit').text('Edit');
    $('#customer-submit').attr('id', 'customer-edit');
  },
  editCustomer: function (e) {
    e.preventDefault();
    this.model.set({
      name: $('#customer-name').val(),
      phone: $('#customer-phone').val()
    });
    this.model.save();
    this.render();
  },
  cancelCustomerEdit: function (e) {
    e.preventDefault();
    this.render();
  }
});
window.CustomerButton = Backbone.View.extend({
  tagName: 'button',
  className: 'button button-primary',
  id: 'new-customer',
  render: function () {
    $(this.el).html('Add New Customer');
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
  className: 'customer-header',
  events: { 'click #new-customer': 'showForm' },
  render: function () {
    $(this.el).html('<h4>All Customers</h4>');
    $(this.el).append(new CustomerButton().render().el);
    return this;
  },
  showForm: function () {
    $('#customer-cancel').click();
    $('#cancel-create').click();
    $(this.el).append(new CustomerForm({ model: this.model }).render().el);
    $('#customer-cancel').attr('id', 'cancel-create');
  }
});
window.CustomerForm = Backbone.View.extend({
  tagName: 'form',
  template: _.template($('#customer-form').html()),
  events: {
    'click #customer-submit': 'createCustomer',
    'click #cancel-create': 'cancelCreate'
  },
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
  },
  cancelCreate: function (e) {
    e.preventDefault();
    this.el.remove();
  }
});