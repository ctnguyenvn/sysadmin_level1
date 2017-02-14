
### Hàm addeventlistener trong javascript

Hàm `addEventListener()` để thêm 1 sự kiện vào đối tượng HTML

- Cú pháp:
```js
elementObject.addEventListenner('eventName', function(e){
	// do something here	
});
```
Trong đó:

	+ __eventName__: là tên sự kiện bỏ đi chữ `on`, ví dụ `onclick` trở thành `click`

	+ function ở tham số thứ 2 là hàm sẽ chạy khi sự kiện `eventName` được kích hoạt

Hàm `addEventListener()` cũng có thể thêm sự kiện cho đối tượng window như của sổ trình duyệt với 1 số sự kiện riêng như `resize`


Để truyền tham số vào Event trong hàm `addEventListener()` thì bắt buộc phải tạo function khác rồi gọi nó từ hàm `addEventListener()`
