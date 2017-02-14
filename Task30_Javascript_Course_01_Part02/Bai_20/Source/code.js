
var button = document.getElementById('bt');

button.addEventListener('click', function () {
	alert(this.type);
});


// Kết hợp với DOM
function show_input(obj) {
	alert("Đây là : " + obj.type);
}
