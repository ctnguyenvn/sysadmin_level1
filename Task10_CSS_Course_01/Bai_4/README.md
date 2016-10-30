#### Các vùng chọn cơ bản

Vùng chọn nghĩa là khu vực mà bạn muốn nó sẽ được áp dụng các quy tắc CSS mà bạn muốn chỉ định cho nó. Ví dụ muốn tăng kích thước font chữ của các thẻ `h1` thì vùng chọn của bạn sẽ là `h1`

Vùng chọn có thể là tên thẻ HTML hoặc thuộc tính của HTML

Các loại vùng chọn cơ bản

- Vùng chọn dựa vào tên thẻ: Kiểu vùng chọn này đơn giản nhất, đó là nó sẽ chọn toàn bộ các phần tử trên tài liệu HTML **dựa vào tên thẻ** có trong tài liệu rồi áp dụng CSS. Với Kiểu sử dụng vùng chọn này thì toàn bộ các thẻ HTML trong website được chọn trong CSS đều biến đổi theo, tức là bạn không thể thay đổi 1 vùng duy nhất sử dụng vùng chọn dựa vào tên thẻ.

- Vùng chọn dựa vào ID: Vùng chọn dựa vào ID (tên định danh) nghĩa là bạn có thể chọn 1 phần tử cụ thể dựa vào giá trị thuộc tính `id` trong thẻ HTML. Trong 1 tài liệu HTML thì mỗi phần tử phải mang một `id` riêng biệt không trùng nhau. ID có thể được thiết lập ở bất kỳ thẻ nào trong các thẻ HTML. Khi viết `id` vào CSS thì nó phải có ~dấu thằng~ (#tên-id) đặt trước tên id để phân biệt với các loại vùng chọn khác.

> Lưu ý: 

>	+ Bạn có thể sử dụng bằng cách như sau **h1#tên-id**. Nhớ viết sát nhau

>	+ Bạn cũng có thể sử dụng nhiều thẻ `id` khác nhau với mỗi tên `id` sẽ được cách nhau bởi khoảng trắng

>	+ `id` chỉ sử dụng 1 lần duy nhất trong tài liệu HTML
	
- Vùng chọn dựa vào Class: `Class` (lớp) ưu điểm so với `id` là một `Class` có thể được sử dụng cho nhiều phần tử trên một tài liệu HTML, còn `id` thì chỉ được sử dụng duy nhất một lần cho một phần tử

	+ Cách khai báo thuộc tính `Class` trong một phần tử HTML là `class="tên-id"`

	+ Khi khai báo vùng chọn `Class` trong CSS, thì tên `Class` phải được đặt sau dấu **.** (.tên-class)

- Vùng chọn theo thứ cấp: Kiểu chọn vùng này có thể chọn một phần tử con trong một phần tử mẹ nào đó 

	+ ví dụ: 

	```html
	<ul id="menu1">
 	<li>Menu 1</li>
 	<li>Menu 2</li>
 	<li>Menu 3</li>
	</ul>
 
	<ul id="menu2">
 	<li>Facebook</li>
 	<li>Twitter</li>
 	<li>Google+</li>
	</ul>
	```
	+ Để sử dụng kiểu chọn vùng này bạn sử dụng cú pháp **#tên-id thẻ**. Với ví dụ trên để chọn thay đổi các `li` trong vùng `menu1` thì bạn sẽ dùng `#menu1 li`

- Vùng chọn dựa theo thứ cấp liền nhau: Đây cũng là kiểu chọn vùng theo thứ cấp, cũng giúp bạn chọn các phần tử bên trong một phần tử nào đấy nhưng nó sẽ chỉ áp dụng cho các phần tử nằm dưới nó một bật.

	+ Ví dụ:

	```html
	<nav id="menu">
	<ul>
	<li>Menu 1
	<ul>
	<li>Menu 1.a</li>
	<li>Menu 1.b</li>
	</ul>
	</li>
	<li>Menu 2</li>
	<li>Menu 3</li>
	</ul>
	</nav>
	```

	+ Nếu muốn viết CSS cho các thẻ `<li>` của menu 1.a, menu 1.b thì mình sẽ đặt vùng chọn là `#menu ul ul > li`

	+ Thường thì cách viết vùng chọn này sẽ được sử dụng khi tạo menu đổ xuống trong website