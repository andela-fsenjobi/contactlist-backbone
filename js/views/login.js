CL.Views.Login = Backbone.View.extend({
  tagName: 'form',
  template: _.template($('#login-form').html()),
  events: {
    'click #login-submit': 'processEntry',
    'submit #login-form': 'processEntry',
    'click #login-register': 'processEntry'
  },
  render: function (eventName) {
    $(this.el).html(this.template);
    return this;
  },
  processEntry: function (e) {
    e.preventDefault();
    this.model.attributes = {
      email: $('#login-email').val(),
      password: $('#login-password').val()
    };
    this.model.save();
  }
});
CL.Views.Index = Backbone.View.extend({
  className: 'section',
  render: function () {
    $(this.el).html('<h3>Welcome to Contactlist</h3><a href="#login" class="button button-primary home">Login</a><a href="#register" class="button home">Register</a>');
    return this;
  }
});