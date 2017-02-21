
### Thiết lập màu nền với CSS background

#### Thiết lập màu nền cho background

Để thiết lập màu nền cho background ta có thể dùng thuộc tính CSS `background-color` hoặc `background` với giá trị của thuộc tính có thể là mã màu (hex) hoặc mã màu bằng tếng anh

Ví dụ:

```css
body{
	background: red;
}
```

#### Thiết lập hình nền cho background

Để thiết lập hình nền ta sử dụng thuộc tính CSS `backgrond` hoặc `background-image` với tham số truyền vào là URL hình ảnh

Ví dụ: 

```css
body{
	background: url('http://taihinhanhdep.xyz/wp-content/uploads/2015/11/anh-dep-cho-dien-thoai-2.jpg');
}
```

#### Cho phép lặp hoặc không lặp background

Để cho phép lặp hoặc không lặp background ta có thể sử dụng thuộc tính `background-repeat` với các giá trị sau:

- __no-repeat__: Không lặp

- __repeat__: Cho phép lặp

- __repeat-x__: Lặp theo chiều ngang

- __repeat-y__: Lặp theo chiều dọc


#### Thiết lập vị trí hiển thị cho background

Trường hợp sử dụng background không lặp và muốn background hiển thị ở một vị trí mong muốn thì có thể sử dụng thuộc tính `background-position` với cú pháp

	background-position: position1 position2

Trong đó `position1` và `position2` gồm các giá trị sau:

	+ __bottom__: ở dưới
	
	+ __left__: bên trái
	
	+ __right__: bên phải
	
	+ __center__: ở giữa
	
	+ __top__: ở trên

#### Thiết lập background đứng im khi scroll (fixed background)

Để thiết lập cho background đứng im hay di chuyển theo khi kéo chuột ta có thể sử dụng thuộc tính `background-attachment` với các tham số sau:

- __fixed__: sẽ đứng im

- __scroll__: sẽ di chuyển theo khi kéo (lăn chuột)

#### Sử dụng thuộc tính background nâng cao

Bạn có thể sử dụng các tham số kết hợp với nhau để thiết lập background 

Ví dụ: 

```css
body{
	height: 1000px;
	background: url('http://taihinhanhdep.xyz/wp-content/uploads/2015/11/anh-dep-cho-dien-thoai-2.jpg') no-repeat bottom fixed;
}
```