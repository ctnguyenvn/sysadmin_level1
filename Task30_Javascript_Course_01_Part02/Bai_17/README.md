
### DOM CSS trong javascript

DOM CSS đơn giản dùng để xử lý với CSS 

Để thiết lập hay xóa bỏ CSS chúng ta sử dụng 1 đối tượng đặc biệt là `style`

- Thiết lập CSS bằng javascript

```js
document.getElementById("object").style.cssName = "something";
```

- Lấy giá trị CSS bằng javascript

```js
var value = document.getElementById("object").style.cssName;
```
 > Trường hợp thuộc tính có dấu gạch ngang thì với `style` ta bỏ dấu gạch ngang và viết hoa ký tự đầu tiên của chữ thứ 2 ví dụ `font-size` sẽ thành `fontSize`

 > ```js
 document.getElementById("object").style.fontSize = "something";
```
