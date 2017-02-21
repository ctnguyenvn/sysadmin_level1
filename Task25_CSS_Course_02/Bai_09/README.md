
### Thuộc tính margin - padding vaf box model 

#### Thuộc tính margin và padding

Hai thuộc tính này dùng để canh lề so với nội dung của thẻ HTML

- Với **margin** thì dùng để tạo khoảng cách giữa 2 thẻ HTML

	+ __margin__: Canh lề đều cho tất cả các bên
	
	+ __margin-left__: Canh lề bên trái
	
	+ __margin-right__: Canh lề bên phải
	
	+ __margin-top__: Canh lề bên trên
	
	+ __margin-bottom__: Canh lề dưới

> Lưu ý: `margin` không được cộng chung với chiều rộng của đối tượng mà tính riêng

- Với **padding** thì dùng để tạo khoảng cách giữa thẻ HTML và nội dung của nó

	+ __padding-left__:Khoảng cách lề trái so với nội dung bên trong
	
	+ __padding-right__:Khoảng cách lề phải so với nội dung bên trong
	
	+ __padding-top__:Khoảng cách lề trên so với nội dung bên trong
	
	+ __padding-bottom__:Khoảng cách lề dưới so với nội dung bên trong
	
	+ __padding__:Khoảng cách tất cả các lề (trái, phải, trên, dưới)

> Lưu ý: Thuộc tính của `padding` sẽ ảnh hưởng đến giá trị của chiều rộng, vì vậy khi xét ta cần tính thêm `padding` vào chiều rộng

#### Mô hình Box Model trong CSS

Khi kết hợp `margin`, `padding`, `border` thì ta có mô hình cọi là Box Model. Chúng ta có thể xem thứ tự từ ngoài vào của 1 Box Model  là `margin`, `padding`, `border`, `content`