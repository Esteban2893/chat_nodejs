jQuery(function($) {
               var socket = io.connect();
               var $messageForm = $('#send-message');
               var $messageBox = $('#message');
               var $chat = $('#chat');
               var $buttonSend = $('#send');
               
               var $nickForm = $('#setNick');
               var $nickBox = $('#nickname');
               var $users = $('#users');             
               
               
               $nickForm.click(function(e) {
                   e.preventDefault();
                   socket.emit('new user', $nickBox.val(), function(data) {
                       if(data) {
                           $('#nickWrap').hide();
                           $('#content').show();
                            $("#login-error").hide();
                       } else {
                           $("#login-error").show();
                       }
                   });
                   $nickBox.val('');
               });
                             
               $messageForm.submit(function(e) {
                   e.preventDefault();
                   if($messageBox.val()!='') socket.emit('send message', $messageBox.val());
                   $messageBox.val('');
               });
               
               socket.on('new message', function(data) {
                  $chat.append('<b>'+data.nick+":</b> "+data.msg+"<br/>"); 
               });
               
               socket.on('usernames', function(data) {
                    var usernameString = '';
                    for (var username in data) {
                        usernameString += username + '<br/>';
                    }
                    $users.html(usernameString);
                });
               
            });
            