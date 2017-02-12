
//  Lấy nội dung thẻ HTML 

function get_content() {
	var html = document.getElementById("content").innerHTML;
	alert("Nội dung cần lấy: " + html);
}


//  Thay đổi nội dung thẻ HTML 
function set_content() {
	document.getElementById("content").innerHTML = "Nội dung đã được thay đổi";
}

// Lấy và thay đổi thuộc tính của thẻ HTML
function change() {
	var object = document.getElementById("object");

	var type = object.type;

	if (type == "button") {
		object.type = "text";
	}else{
		object.type = "button";
	}

}
