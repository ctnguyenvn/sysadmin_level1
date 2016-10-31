#### Tìm hiểu về box-sizing

Box-sizing là thuộc tính giúp giữ nguyên kích thước mặc dù có cộng thêm padding và  border, đây là thuộc tính giúp tính toán và làm chủ đuọc kích thước của một phần tử dựa vào thuộc tính hwight, width đã được thiết lập bên trong. Hay nói đơn giản là thuộc tính `width` và `height` là kích thước đã bao gồm border và padding.

> Lưu ý: Box-sizing là thuộc tính CSS3 và sử dụng như sau

```css
box-sizing: border-box;

-moz-box-sizing: border-box;

-webkit-box-sizing: border-box;
```

Một số giá trị của box-sizing hỗ trợ:

- __content-box__: Giá trị mặc định, nghĩa là giá trị width và height chỉ áp dụng cho khu vực nội dung bên trong, không bao gồm padding, border và margin.

- __border-box__: Khi thiết lập giá trị này thì width và height sẽ bao gồm cho cả phần nội dung, padding và border nhưng không bao gồm margin

- __padding-box__: Với giá trị này thì width và height chỉ bao gồm cho phần nội dung và padding, không bao gồm border và margin

> Lưu ý: `padding-box` chỉ có tác dụng với trình duyệt Firefox

> Nên sử dụng `box-sizing` với giá trị `border-box` **cho toàn bộ các phần tử** trong website