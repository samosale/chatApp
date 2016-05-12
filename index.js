

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var users = {};


app.get('/', function(req, res){
res.sendFile(__dirname + '/index.html');
});


io.on('connection', function(socket){
	
console.log('a user is connected')

socket.on('new user', function(data, callback){
	
	
	
	if(data in users){
		
		callback(false);
		console.log('User already connected!');
		
	}else{
		
	callback(true);
	socket.nickname = data;
	users[socket.nickname] = socket;
	updateNicknames();
	console.log(users)
	console.log(users[socket.nickname].nickname);
	
	}
})

function updateNicknames (){
	
	io.emit('usernames', Object.keys(users))
	
}


socket.on('new message', function(data){
	
	io.emit('newMsgServer', {msg:data, user:socket.nickname})
	
});

socket.on('disconnect', function(){
	delete users[socket.nickname];
	updateNicknames();
	console.log('user is disconnected');

})


})




http.listen(3000, function(){
console.log('Listening on port : 3000');

})

