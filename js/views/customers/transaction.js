window.TransactionSingleView = Backbone.View.extend({
  tagName: 'li',
  template: _.template($('#transaction-detail').html()),
  render: function (eventName) {
    $(this.el).html(this.template(this.model.toJSON()));
    return this;
  }
});
window.TransactionListView = Backbone.View.extend({
  tagName: 'ul',
  initialize: function () {
    this.model.on('reset', this.render, this);
  },
  render: function () {
    _.each(this.model.models, function (transaction) {
      try {
        $(this.el).append(new TransactionSingleView({ model: transaction }).render().el);
      } catch (e) {
        console.log(e);
      }
    }, this);
    return this;
  }
});