CL.Views.TransactionItem = Backbone.View.extend({
  tagName: 'tr',
  className: 'transaction-item',
  events: {
    'click .edit-transaction': 'populateTransactionForm',
    'click #transaction-edit': 'editTransaction',
    'click #transaction-cancel': 'cancelEdit'
  },
  template: _.template($('#transaction-detail').html()),
  render: function (eventName) {
    $(this.el).html(this.template(this.model.toJSON()));
    return this;
  },
  populateTransactionForm: function (e) {
    e.preventDefault();
    $('#transaction-cancel').click();
    $('#cancel-create-transaction').click();
    $(this.el).html(new CL.Views.TransactionForm().render().el);
    $('#transaction-amount').val(this.model.get('amount'));
    $('#transaction-expiry').val(this.model.get('expiry'));
    $('#transaction-submit').text('Edit');
    $('#transaction-submit').attr('id', 'transaction-edit');
  },
  editTransaction: function (e) {
    e.preventDefault();
    this.model.set({
      amount: $('#transaction-amount').val(),
      expiry: $('#transaction-expiry').val(),
      status: this.setStatus($('#transaction-amount').val())
    });
    this.model.save();
    this.render();
  },
  setStatus: function (amount) {
    return (amount > 0) ? 'Paid' : 'Unpaid';
  },
  cancelEdit: function (e) {
    e.preventDefault();
    this.render();
  }
});
CL.Views.TransactionList = Backbone.View.extend({
  tagName: 'table',
  className: 'transaction-list',
  id: 'transaction-list',
  initialize: function () {
    this.model.on('reset', this.render, this);
  },
  render: function () {
    $('#container').prepend(new CL.Views.TransactionHeader({ collection: this.model }).render().el);
    _.each(this.model.models, function (transaction) {
      try {
        $(this.el).append(new CL.Views.TransactionItem({ model: transaction }).render().el);
      } catch (e) {
        console.log(e);
      }
    }, this);
    return this;
  }
});
CL.Views.TransactionForm = Backbone.View.extend({
  tagName: 'form',
  template: _.template($('#transaction-form').html()),
  events: {
    'click #transaction-submit': 'createTransaction',
    'click #cancel-create-transaction': 'cancelCreate'
  },
  render: function () {
    $(this.el).html(this.template());
    return this;
  },
  createTransaction: function (e) {
    e.preventDefault();
    this.newTransaction = this.collection.create({
      amount: $('#transaction-amount').val(),
      expiry: $('#transaction-expiry').val(),
      status: this.setStatus($('#transaction-amount').val()),
    }, { wait: true });
    this.newTransaction.on('sync', this.appendNew, this);
    this.el.remove();
  },
  setStatus: function (amount) {
    return (amount > 0) ? 'Paid' : 'Unpaid';
  },
  appendNew: function (model) {
    $('#transaction-list').append(new CL.Views.TransactionItem({ model: model }).render().el);
  },
  cancelCreate: function (e) {
    e.preventDefault();
    this.el.remove();
  }
});
CL.Views.TransactionButton = Backbone.View.extend({
  tagName: 'button',
  className: 'button button-primary',
  id: 'create-transaction',
  render: function () {
    $(this.el).html('Add New Transition');
    return this;
  }
});
CL.Views.TransactionHeader = Backbone.View.extend({
  events: { 'click #create-transaction': 'showForm' },
  render: function () {
    $(this.el).html('<h4>Transaction List</h4>');
    $(this.el).append(new CL.Views.TransactionButton().render().el);
    return this;
  },
  showForm: function () {
    $('#cancel-create-transaction').click();
    $(this.el).append(new CL.Views.TransactionForm({ collection: this.collection }).render().el);
    $('#transaction-cancel').attr('id', 'cancel-create-transaction');
  }
});
