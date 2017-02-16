
// Biến toàn cục
var comment = "Đây là nội dung comment toàn cục";

// Hàm sử dụng biến toàn cục
function add_cmt() {
	var comment = "Nội dung comment cục bộ";
	alert(comment);
}

// Thay đổi nội dung biến toàn cục với hàm
function change_cmt() {
	comment = "Nội dung comment toàn cục đã bị thay đổi";
	alert(comment);
}

// Gọi function comment
add_cmt();

// in biến cục bộ
alert(comment);

change_cmt();
