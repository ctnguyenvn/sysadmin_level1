
### Tìm hiểu về CSS selector thông dụng

Trong CSS thì `selector` dùng để truy vấn tới các thẻ html

#### Selector phân cấp

Selector phân cấp nghĩa là sẽ dựa vào cấp cha để tìm cấp con

Ví dụ:

HTML:

```html
<div>
	<p>Nội dung trong thẻ p sẽ hiển thị màu</p>
</div>
<p>Nội dung trong thẻ p sẽ không hiển thị màu</p>
```
CSS:

```css
div p{
	color: red;
}
```

#### Selector ID

Selector ID nghĩa là sẽ dựa vào ID (ID là duy nhất) để xác định. Chúng ta sẽ sử dụng dấu `#` để đại diện cho `ID` khi viết CSS

Ví dụ:

HTML:

```html
<div id="a1">
	<p>Thẻ sẽ sử dụng CSS với selector ID</p>
</div>
<div>
	<p>Thẻ sẽ không sử dụng CSS với selector ID</p>
</div>
```
CSS:

```css
#a1{
	background: red;
}
```

#### Selector Class

Khác với `ID` thì `class` có thể có nhiều `class` có cùng tên. Chúng ta sử dụng dấu `.` để đại diện cho `class` trong CSS

Ví dụ:

HTML:

```html
<div class="danhmuc">HOME</div>
<div >Học CSS</div>
<div class="danhmuc">Liên Hệ</div>
```
CSS:

```css
.danhmuc{
	background: blue;
}
```
