
// Lay danh sach menu
var menu = document.querySelectorAll('#dropdow > li');

// Ket qua tra ve mang nen can dung vong lap de lay tat ca su kien
for (var i = 0; i < menu.length; i++) {

	menu[i].addEventListener('click', function () {
		
		// An het menu con
	var menuList = document.querySelectorAll('#dropdow > li >ul');
	for (var j = 0; j < menuList.length; j++) {
		menuList[j].style.display = 'none';
	}

	/**
	Hiển thị menu hiện tại
	Đối tượng `this` chính là thẻ `li` hiện tại nên ta sử dụng 
	mảng `children` để lấy danh sách thẻ con mà thẻ `ul` nằm
	ở vị trí thứ 2 nên trong mảng con nó sẽ có vị trí thứ 1 (mảng 
	bắt đầu từ 0)
	*/
	this.children[1].style.display = "block";
	});

}
