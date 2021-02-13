

var socket = io.connect('http://192.168.178.62:3770', { 'forceNew': true });

socket.on('messages', function (data) {
    console.log(data);
    render(data);
});

function render(data) {

    var html = data.map(function (message, index) {
        return (`
        <div class="message">
<strong>${message.nickname}</strong> dice:
 <p>${message.text}</p>
</div>
`);
    }).join(' ');

    var message = document.getElementById('messages');
    message.innerHTML = html;
    message.scrollTop = message.scrollHeight;


 }
function addMessage(e) {
    var message = {
        nickname: document.getElementById('nickname').value,
        text: document.getElementById('text').value
    };
    document.getElementById('nickname').style.display = 'none';
    socket.emit('add-message', message);
    return false;
}