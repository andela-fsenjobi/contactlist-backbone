window.LoginView = Backbone.View.extend({
  tagName: 'form',
  template: _.template($('#login-form').html()),
  events: {
    'click #login-submit': 'login',
    'submit #login-form': 'login'
  },
  render: function (eventName) {
    $(this.el).html(this.template);
    return this;
  },
  login: function (e) {
    e.preventDefault();
    this.model.attributes = {
      email: $('#login-email').val(),
      password: $('#login-password').val()
    };
    this.model.save();
  }
});