var Friends = {
  initialize: function() {
    this.toggleStatus();
  },

  toggleStatus: function() {
    $('#chats').on('click', '.username', function(event) {
      const friend = $(this).text();
      const $users = $('#chats .chat .username');
      for (let i = 0; i < $users.length; i++) {
        if ($users[i].textContent === friend) {
          $($users[i]).toggleClass('friend');
        }
      }
    });
  }
};
