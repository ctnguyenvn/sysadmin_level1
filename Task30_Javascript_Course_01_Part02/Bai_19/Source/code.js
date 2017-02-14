
// Thêm sự kiện cho thẻ HTML sử dụng hàm addEventListener

var input = document.getElementById('show_text');

input.addEventListener('keyup', function () {
	document.getElementById('result1').innerHTML = input.value;

});

input.addEventListener('keyup', function() {
	if (input.value.length > 5) {
		alert("Bạn đã nhập nhiều hơn 5 ký tự");
	}	
});

// Thêm sự kiện cho window

window.addEventListener('resize', function () {
	document.getElementById('result2').innerHTML = "Bạn vừa zoom trình duyệt";
});

// Truyền tham số vào addEventListener()

var button = document.getElementById('bt');

button.addEventListener('click', function () {
	var a = prompt("Nhập a");
	var b = prompt("Nhập b");
	show_add(parseInt(a), parseInt(b));
});

function show_add(a, b) {
	alert("Tổng " + a + " + " + b + ":\n" + (a+b));
}
