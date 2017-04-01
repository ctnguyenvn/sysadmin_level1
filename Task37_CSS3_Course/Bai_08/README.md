
### Xử lý text trong CSS3

1. Text Overflow 

Thuộc tính text-overflow trong CSS3 dùng để xử lý 1 đoạn text khi bị tràn ra ngoài thẻ HTML

Cú pháp: 

```css
text-overflow: clip | eclipsis | string | initial | inherit;
```

Trong đó:

- clip: là giá trị mặc định, nó sẽ kẹp các văn bản.

- ellipsis : thêm ba dấu chấm (...) nếu text bị tràn ra ngoài

- string : tự định nghĩa đoạn text nào đó thêm vào khi bị tràn ra ngoài.

- initial : thiết lập giá trị mặc định

- inherit : kế thừa giá trị từ thẻ HTML cha.

> Lưu ý: Cần có thuộc tính `overflow: hidden` thì mới có tác dụng

2. Word wrap

Thuộc tính `word-wrap` cho phép đoạn text xuống dòng dù chữ đó có dài cỡ nào nữa

Cú pháp:

```css
word-wrap: normal | break-word | initial | inherit;
```

Trong đó: 

- normal: trạng thái mặc định, tức là hiển thị theo mặc định của trình duyệt

- break-word : sẽ nhảy xuống hàng nếu chữ quá dài

- initial : trở về trang thái mặc định

- inherit : kế thừa giá trị từ thẻ HTML cha

3. Word Break

Thuộc tính word-break trong CSS3 có tác dụng xử lí xuống hàng, tức là bạn có thể cho một chuỗi hiển thị và xuống hàng tại vị trí bất kỳ nào miễn là nó đã hiển thị full width

Cú pháp: 

```css
word-break: normal | break-all | keep-all | initial | inherit;
```

Trong đó:

- normal: trạng thái mặc định, tức là sẽ dừng xuống hàng theo mặc định

- break-all : có thể xuống hàng bất kì lúc nào khi nó đã hiển thị full width


- keep-all : xuống hàng nếu chữ hiển thị sẽ bị tràn (overflow)

- initial : trở về trang thái mặc định

- inherit : kế thừa giá trị từ thẻ HTML cha