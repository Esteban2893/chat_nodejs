        jQuery(function($){
          var socket = io.connect();
          var $messageForm = $('#sendMessage');
          var $message = $('#message');
          var $chat = $('#chat');

          $messageForm.submit(function(e) {
            e.preventDefault();
            if ($message.val()!='') socket.emit('sendMessage', $message.val()); 
          });

          socket.on('newMessage', function(data){
            $chat.append(' - '+ data.msg+ "<br/>");
          });

        });
