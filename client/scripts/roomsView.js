var RoomsView = {

  $button: $('#rooms button'),
  $select: $('#rooms select'),

  initialize: function() {
    this.render();
    Rooms.initialize();
  },

  render: function() {
    const rooms = {};
    App.fetch((data) => {
      console.log(data.results);
      // Add empty room
      this.renderRoom('');

      // Add all other rooms
      for (let room of data.results) {
        if (rooms[room.roomname] === undefined && room.roomname) {
          this.renderRoom(room.roomname);
          rooms[room.roomname] = '';
        }
      }
    });
  },

  renderRoom: function(roomname) {
    this.$select.append(Rooms.render({ roomname }));
  },
};

