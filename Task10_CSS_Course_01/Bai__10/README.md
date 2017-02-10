#### Box Model và các thuộc tính

Box Model là một kỹ thuật cơ bản trong CSS Layout và được sử dụng để mô tả về khaongr cách mà mỗi phần tử trên website  được sở hữu, hay nói cách khác là kỹ thuật tinh chỉnh khaongr cách hiển thị cho mỗi phần tử trên website

Kỹ thuật Box Model trong CSS bao gồm 4 phần quan trọng

- __Margin__: Khoảng cách tính từ bên ngoài của phần tử. Nó sẽ tinh chỉnh khoảng cách giữa các phần tử. `Margin` có các thuộc tính con là `margin-top`, `margin-bottom`, `margin-right`, `margin-left`

- __Border__: Đường viền của phần tử

	__border__: [size]  [type]  [color]

	Một số type hỗ trợ như `solid`, `dotted`, `double`, `groove`, `ridge`, `inset`, `outset`. Border có các thẻ con là `border-top`, `border-right`, `border-bottom`, `border-left`

- __Padding__: Khoảng cách tính từ bên trong của phần tử. Ngoài cách này thì có thể dùng thuộc tính con khác là `padding-top`, `padding-bottom`, `padding-left`, `padding-right` và mỗi thuộc tính này sẽ thiết lập giá trị cụ thể cho từng mặt.

> Có thể thiết lập 1 lúc 2 giá trị top và buttom hay left và right bằng cách đặt 2 giá trị tách nhau bằng dấu cách

- __Content__: Nội dung trong phần tử. 

Trong 4 phần trên thì ngoài content thì 3 thuộc tính còn lại đều có có các giá trị `top`, `right`, `bottom`, `left`