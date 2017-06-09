
### Command Line Operations

> Thực hiện: Nguyễn Công Trứ

> Cập nhật: 19/06/2017

***

### Command Line Mode Options  

Trên linux việc sử dụng command line thực sự hiệu quả. Một vài  lệnh phổ biến như

- __cat__: Để xem các file hoặc tạo ra các tập tin.

- __head__: Hiển thị vài dòng đầu của file

- __tail__: Hiển thị vài dòng cuối cùng của file

- __man__: Xem tài liệu của các lệnh

Hầu hết các lệnh đều gồm 3 phần chính:

- Command 

- Options

- Arguments

> Tuy nhiên rất nhiều lệnh không có Options cũng như sử dụng không có các Arguments

Trên Linux sudo được sử dụng như để cấp quyền cho tất cả các lệnh được thực thi như root. Tuy nhiên cần phải cấp quyền cho các user để thực hiện điều này. Để cấp quyền này ta cần

- Truy cập vào root (dấu **#** thể hiện cho root)

	$ su root

- Sau đó tạo file để cấp quyền, file này thường nằm ở thư mục `/etc/sudoers.d/` 

	# echo "student ALL=(ALL) ALL" > /etc/sudoers.d/student

Cuối cùng phần quyền cho file này như sau

	# chmod 440 /etc/sudoers.d/student

> Lưu ý ta có thể đặt tên file tạo mới theo tên người dùng như trên là người dùng `student`

