
### Sự kiện onload trong javascript

- Cũng như các ngôn ngữ lập trình khác, javascript sẽ chạy biên dịch từ trên xuống và từ trái qua phải. Vì vậy lưu ý khi sử dụng khai báo hàm hợp lý. Và để giải quyết vấn đề này sẽ dùng sự kiện `onload` trong javascript

Ví dụ:

```js
// code sai
var  flag = func();

function func(){
	return true;
}
```
```js
// code đúng
function func(){
	return true;
}

var  flag = func();

```

- Sự kiện onload có ý nghĩa là khi trình duyệt đã load xong mọi thứ thì những đoạn code nằm bên trong đó mới được chạy. Hay nói cách khác những đoạn code bên trong sự kiện `onload` sẽ được chạy sau cùng

> Lưu ý: Nếu sử dụng `onload` cho 1 thẻ HTML thì nó chỉ có tác dụng với thẻ đó còn khi dùng cho window thì nó sẽ có tác dụng cho toàn trang

```js
// code vẫn đúng khi sử dụng hàm khai báo phía dưới
window.onload = function(){
	do_func();
};

function do_func(){
	alert(1);
}
```
