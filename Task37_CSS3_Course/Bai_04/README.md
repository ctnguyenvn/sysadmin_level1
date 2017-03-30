

### Các thuộc tính Backgrounds

Trong CSS3 hỗ trợ thêm 1 số tính năng mới để xử lý background, đó là 

- background-size

- background-origin

- background-clip

- background-image

- background

1 . CSS3 Multiple backgrounds

CSS3 cho phép thêm nhiều background cho 1 thẻ HTML bằng cách sử dụng thuộc tính `background-image`

- Cú pháp của thuộc tính background là 

```css
background: url(link-to-file.png)
```

- Cú pháp của multiple background là

```css
url(link-to-file1.png),
url(link-to-file2.png),
...;
```
Lúc này để thiết lập thuộc tính cho từng image ta dùng cấu trúc sau

```css
background-position: top left, right bottom;
background-repeat: no-repeat, no-repeat;
```

2 . Background-size

Để thay đổi kích thước của background ta dùng `background-size` trong CSS3

Để phù hợp với thiết kế responsive ta cần sử dụng `background-size` với các giá trị sau:

- contain: background sẽ có tác dụng như thẻ `img`, nghĩa là nó sẽ co dãn theo chiều rộng và chiều cao theo đúng tỷ lệ của hình ảnh

- cover: Nếu chiều rộng và chiều cao của thẻ HTML lớn hơn hình ảnh thì nó sẽ giãn ra

3 . Background-origin

Thuộc tính này dùng để xác định nơi mà background hình ảnh sẽ hiển thị. Nó có 3 giá trị sau

- border-box: biên của background tính luôn border ngoài cùng

- padding-box: biên của background tính từ vị trí padding

- content-box: biên của background tính từ vị trí có thể sử dụng

4 . Background-clip

Thuộc tính này dùng để xác định nơi mà background color sẽ hiển thị. Nó cũng có 3 giá tị sau

- border-box: biên của background tính luôn border ngoài cùng

- padding-box: biên của background tính từ vị trí padding 

- content-box: biên của backgroudn tính từ vị trí có thể sử dụng