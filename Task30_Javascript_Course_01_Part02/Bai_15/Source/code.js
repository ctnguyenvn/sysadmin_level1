function check() {
	var username = document.getElementById('username').value;
	var password = document.getElementById('password').value;
	var re_password = document.getElementById('re-password').value;

	if (username == "" || password == "" || re_password != password){
		alert("Register Fail");
		return false;
	}else{
		alert("Register successful" + "\n" +
		      "Username:" + username + "\n" +
		      "Password:" + password + "\n"
		      );
		return true;
	}

	

}
