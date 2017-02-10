### Thẻ tạo liên kết và liên kết neo

Trong HTML có hỗ trợ liên kết, nghĩa là những văn bản có các đường liên kết tới một trang khác hoặc một website khác.Để sử dụng ta dùng thẻ `<a> </a>`

`<a href="github.com/hellsins" title="hellsins github" target="_blank">This is my github account</a>`

- Ý nghĩa các thuộc tính

	+ href: Địa chỉ muốn liên kết tới, hoặc có thể là đường dẫn tới thư mục cùng cấp (lưu ý cần điền đầy đủ tên file và đuôi file)

	+ title: Tiêu đề của liên kết

	+ target: Xác định nơi mở tài liệu

		- _blank: mở tài liệu ở cửa sổ mới

		- _self: mở tài liệu ở của sổ hiện tại (lưu ý đây là lựa chọn mặc định nếu không có thuộc tính target)

		- _top: mở tài liệu trong nội dung trang hiện tại

		- _parent: mở tài liệu trên khung trình duyệt mẹ của nó

#### Liên kết neo

Liên kết neo là liên kết sẽ dẫn tới một đoạn văn bản bất kỳ trong trang hiện tại mà không cần tải lại trang hoặc mở một trang mới

Liên kết neo gồm 2 phần:

- Khu vực neo sử dụng thuộc tính id (có thẻ dụng dụng ở bất kỳ thẻ nào)

- Liên kết neo được khai báo bằng thẻ `<a>` nhưng có thuộc tính là href="#" (lưu ý là có dấu __#__ phía trước)
