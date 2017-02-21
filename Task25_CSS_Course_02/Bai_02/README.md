
### Cú pháp CSS và cách viết CSS

#### Cú pháp CSS

Chúng ta có thể chia 1 đoạn CSS ra gồm 2 phần đó là:

- selector: Phần àny sẽ trỏ đến những đối tượng (html) sẽ chịu ảnh hưởng của CSS

- declaration: Các thuộc tính CSS dùng để style cho thẻ selector

Ví dụ: 

```css
h1 {
	background: red;
	color: blue;
}
```

trong đó: 

- __h1__: `selector`

- __background, color__: Các thuộc tính nằm bên trong cặp dấu `{}` chính là `declaration`

> Lưu ý: Các thuộc tính trong phần `declaration` kết thúc có dấu `;`  


#### Viết CSS

Chúng ta có 3 cách viết CSS

- __inline__: viết trực tiếp trên thẻ thông qua thuộc tính style

Ví dụ: 

```html
<div style="background: #000; color: red">Học CSS căn bản</div>
```

- __external__: viết riêng một thẻ có phần đuôi .css rồi sau đó import vào bằng thẻ link.

Ví dụ: 

```html
<style type="text/css">
	div{
		background: #000;
		color: red;
	}
</style>
<div>Học CSS căn bản</div>
```

- __internal__: viết tại file html hiện tại và nằm trong thẻ style

Ví dụ:

Ta có 1 file `style.css` như sau:

```css
div{
		background: #000;
		color: red;
	}
```

Sau đó ta sẽ sử dụng các thuộc tính trong file `style.css` trong file html như sau:

```html
<link rel="stylesheet" type="text/css" href="style.css"/>
<div>Học CSS căn bản</div>
```