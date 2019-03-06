var FormView = {

  $form: $('form'),

  initialize: function() {
    FormView.$form.on('submit', FormView.handleSubmit);
  },

  handleSubmit: function(event) {
    // Stop the browser from submitting the form
    event.preventDefault();
    const message = {
      username: window.App.username,
      text: $('#message').val(),
      roomname: $('#rooms select').val()
    };

    // Post data to server
    App.load(message, (data) => {
      $('#chats').prepend(MessageView.render(message));
      $('#message').val('');
    });
  },

  setStatus: function(active) {
    var status = active ? 'true' : null;
    FormView.$form.find('input[type=submit]').attr('disabled', status);
  }

};