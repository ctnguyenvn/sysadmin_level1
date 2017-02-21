
### Các thuộc tính CSS định dạng thẻ a (links)

Để tạo liên kết đến một website hay một địa chỉ nào đó ta có thể sử dụng thẻ `a` với các nội dung sau

##### Chọn màu sắc

Để thay đổi màu cho link trong với thẻ `a` ta dùng thuộc tính `color`

Ví dụ:

```css
a{
	color:red;
}
```

##### Làm việc với text-decoration

Thông thường khi tạo liên kết với thẻ `a` thì khi hiển thị sẽ có dấu gạch chân. Ta có thể tắt gạch chân với thuộc tính `text-decoration: none`

##### Thiết lập background

Sử dụng `background` để thay đổi background cho liên kết

##### Style các sự kiện

Các sự kiện này xảy ra khi ta thao chuột lên nó

- __hover__: Khi bạn hover chuột qua nó sẽ có tác dụng

- __active__: Khi bạn click vào thẻ `a` nhưng nhấn giữ chuột

- __link__: thẻ `a` nào bạn chưa click lần nào thì nó sẽ có tác dụng

- __visited__: khi bạn click vào thẻ `a` thì trạng thái của thẻ `a` đó là visited.

Ví dụ:

```css
a:link{
	color: blue;
	text-decoration: none;
}

a:visited{
	color: red;
	text-decoration: underline;
}

a:hover{
	color: green;
	text-decoration: underline;
}

a:active{
	color: white;
	text-decoration: none;
}
```