
### DOM HTML trong javascript

DOM HTML trong javascript xử lý các vấn đề liên quan đến nội dung, thuộc tính của thẻ HTML

- Thay đổi và lấy nội dung bên trong của thẻ HTML

	+ Lấy nội dung bên trong thẻ HTML

	```js
	var html = document.getElementById("content").innerHTML;
	```

	+ Thay đổi nội dung cho 1 thẻ HTML
	```js
	var html = document.getElementById("content").innerHTML = "<h1>Nội dung thay đổi</h1>";
	```

- Thay đổi và lấy giá trị thuộc tính thẻ HTML bằng javascript
	
	+ Lấy giá trị của 1 thuộc tính HTML

	```js
	var value = document.getElementById("element").attributeName;
	```

	+ Thay đổi giá trị của 1 thuộc tính HTML
	```js
	var value = document.getElementById("element").attributeName = "<h1>Giá trị thuộc tính mới</h1>";
	```
