var Rooms = {
  $button: $('#rooms button'),
  $select: $('#rooms select'),

  render: _.template(`
  <option class="rooms"><%- roomname %></option>
`),

  initialize: function() {
    this.$button.on('click', this.add);
  },

  add: function() {
    // Add room name
    const addRoomName = prompt('Add a room:');
    $('#rooms select').append(Rooms.render({ roomname: addRoomName }));

    // Select current room
    $('#chats').empty();
    $('#rooms select').val(addRoomName);

  },

};

