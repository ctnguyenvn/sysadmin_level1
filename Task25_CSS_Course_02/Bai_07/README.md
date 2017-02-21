
### Thuộc tính display trong CSS (inline - block - none)

#### Phân biệt display inline - block của thẻ HTML

- __Inline__: Là cách hiển thị trên một hàng và chiều rộng của thẻ đó phụ thuộc vào nội dung bên trong của thẻ. Vì vậy một số thuộc tính CSS không được sử dụng như `margin-top`, `margin-bottom`. Các thẻ HTML hiển thị mặc định **Inline** là `span`, `a`, `strong`, `b`, `i`,...

- __block__:Là cách hiển thị chiếm một khoảng rộng (một khối) và có chiêu rộng bằng 100%. Vì vậy khi bạn dùng thẻ này thì mặc dù nội dung ngắn nhưng các thẻ khác ở phía dưới vẫn phải nằm ở vị trí bên dưới nó. Các thẻ HTML hiển thị mặc định block là: div, p, h1 -> h6, header, footer, section, nav, 

- __Inline-block__: Là cách hiển thị kết hợp cả hai cách trên, nghĩa là bạn có thể sử dụng CSS để chia khổi và nằm cùng trên cùng một hàng.

#### ẩn thẻ HTML với thuộc tính display none

Nếu muốn ẩn 1 thẻ nào đó ta dùng thuộc tính `display:none`. Lưu ý là tất cả các thẻ con bên trong sẽ ẩn theo

#### Thay đổi giá trị display cho các thẻ HTML

Nếu bạn muốn thay đổi cách hiển thị inline, block, inline-block, none cho các thẻ HTML thì bạn chỉ cần sử dụng thuộc tính `display:value;`
