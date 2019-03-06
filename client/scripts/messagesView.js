var MessagesView = {

  $chats: $('#chats'),
  $button: $('#rooms button'),
  $select: $('#rooms select'),

  initialize: function() {
    this.render();
    this.$select.on('change', this.handleChange);
  },

  handleChange: (event) => {
    $('#chats').empty();
    MessagesView.render();
  },

  render: function() {
    App.fetch((data) => {
      for (let message of data.results) {
        if (message.roomname === this.$select.val()) {
          this.renderMessage(message);
        }
      }
    });
  },

  renderMessage: function(message) {
    if (message.username !== undefined) {
      this.$chats.append(MessageView.render(message));
    }
  }
};
