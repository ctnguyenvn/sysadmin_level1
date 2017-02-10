#### Thay đổi hình dạng với transform và transform-origin 

Giống như transition nhưng transform có chức năng đổi hình dạng các phần tử block trong website. Với transform ta có thể xoay, co giãn kích thước hoặc bớp nghiêng hình dạng một phần tử. 

Cách viết 

- transition: function (value);

- Trong đó `function()` là tên hàm và value giá trị của hàm

- Các function cơ bản

	+ __rotate__: xoay theo góc độ thiết lập kiểu [n]deg hoặc [n]turn (1turrm = 360 độ)

	+ __scale__: (co giãn)Với hàm này bạn có thể co giãn kích thước của một phần tử dựa vào trục y và trục X

	+ __skew__: (kéo nghiên) bạn có thể kéo vào một đối tượng duawk theo trục Y và trục X với hàm `skewX()` và `skewY`, giá trị bên trong là sooss [n]deg tưởng tự `rotate()`

 Một số tâm hình dạng với transform-origin. Thuộc tính này cho phép bạn dịch chuyển phần tử vào kiểu theo đổi hình dạng của transform. Thuộc tính này có 2 giá trị X (phương thẳng đứng) và Y (phương nằm ngang) và giá trị nó sẽ được dựa vào kích thước của phần tử