

// Hàm sử dụng onkeyup
function show_result() {
	var input = document.getElementById('message');
	var div = document.getElementById('result');

	div.innerHTML = input.value;
	
	// or alert(input.value);
}
function show_message() {
	alert("Copy thành công");
}

function tinh() {

	var a = document.getElementById("a");
	var b = document.getElementById("b");

	var tong = parseInt(a.value) + parseInt(b.value);

	if (!isNaN(tong)) {
		ketqua.value = tong;
	}
	
}
