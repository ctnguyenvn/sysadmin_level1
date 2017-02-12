
### Return true/false cuar events trong javascript

- Trong 1 sự kiện sẽ có 2 trạng thái là hành động đúng (true) và hành động sai (false) và để thể hiện 2 trạng thái này ta sử dụng cú pháp `return true/false`

- Có 2 cách `return` thông dụng là 

	+ Return tại đoạn code event trong HTML 

	```html
	<input type="text" inkeypress="return false" />
	```

	+ Tạo 1 function xử lý sự kiện, lúc này hàm này phải `return` và trong HTML cũng phải `return`

	```html
	<script language="javascript">
		funtion check(){
			return false;
		}
	</script>
	<input type="text" onkeypress="return check()" />
	```
