
function change_background() {
	document.getElementById('content').style.background = 'blue';
}


function change_color() {
	document.getElementById('content').style.color = 'red';
}


function change_height() {
	document.getElementById('content').style.height = '300px';
}


function change_fontsize() {
	document.getElementById('content').style.fontSize = '100px';
	document.getElementById('content').style.textAlign = 'center';
}


function check() {
	var username = document.getElementById("username").value;
	var password = document.getElementById("password").value;

	// var message = document.getElementById("message");

	if (username == "" || password == "") {
		document.getElementById("message").innerHTML = "Bạn chưa nhập đầy đủ thông tin";
		document.getElementById("message").style.color = "red";
	} else {
		document.getElementById("message").innerHTML = "Đăng nhập thành công";
		document.getElementById("message").style.color = "blue";
	}

}
