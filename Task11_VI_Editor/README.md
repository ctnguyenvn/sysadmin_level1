### VI Editter

> Tài liệu: Tìm hiểu về VI editter

> Thực hiện: Nguyễn Công Trứ

> Cập nhật: 06/11/2016

### Mục lục

[1. Giới thiệu về VI editter ](#1)

[2. Sử dụng VI căn vản](#2)

- [2.1 Làm việc với file](#2.1)

- [2.2 Di chuyển ](#2.2)

- [2.3 Chèn và đè văn bản](#2.3)

- [2.4 Xóa văn bản](#2.4)

- [2.5 Undo](#2.5)

- [2.6 Tìm kiếm và thay thế](#2.6)

- [2.7 Một số lệnh khác](#2.7)

[3. Tùy chỉnh cấu hình](#3)

[4. Thay đổi giao diện (theme)](#4)

[5. Kết thúc](#5)

---
<a name="1"></a>
### 1. Giới thiệu về VI editter

- **VI** là chương trình soạn thảo văn bản trên máy tính được viết bởi Bill Joy năm 1976 để dùng cho HĐH BSD. Sau này được AT&T dùng và trở thành tiêu chuẩn (dù không chính thức) trong Unix. 

- **VI** làm việc ở 2 chế độ

	+ Text mode (insert): Ở chế độ này những gì bạn gõ vào được máy hiểu là nội dung của văn bản mà bạn đang chỉnh sửa. Theo chế độ này **VI** soạn thảo như một editter bình thường

	+ Console: Với chế độ này những gì bạn gõ được xem như là câu lệnh cho **VI**. Các lệnh có thể là lưu tập tin, sửa hay thay đổi tập tin,...

- **VI** có tính cấu hình rất cao được xây dựng để cho phép chỉnh sửa văn bản hiệu quả, đây được xem là trình soạn thảo hữu ích cho các lập trình viên. Ngoài ra **VI** có hầu hết trên các hệ thống Linux hiện nay - thể hiện sự phổ biến của nó.

<a name="2"></a>
### 2. Sử dụng VI căn vản

Để hiểu rõ hơn về sự mạnh mẽ của **VI** ta cùng xem qua một vài thao tác cơ bản thường dùng trong **VI** sau

<a name="2.1"></a>
#### 2.1 Làm việc với file


|VI  command| Ý nghĩa|
|-----------------|-----------|
|:e filename| Mở file|
|:w file| Lưu file|
|:q | Thoát khỏi VI, lệnh sẽ vô hiệu nếu file chưa được lưu|
|:q!|Thoát khỏi VI kể cả chưa được lưu|
|:wq|Lưu và thoát|

<a name="2.2"></a>
#### 2.2 Di chuyển 

|VI  command| Ý nghĩa|
|-----------------|-----------|
|j/k/h/l|Di chuyển lên/xuống/trái/phải 1 ký tự|
|e/b|Di chuyển đến cuối/đầu từ|
|E/B|Di chuyển đến cuối/đầu từ kết thúc bằng dấu cách|
|0|Di chuyển về đầu dòng|
|$|Di chuyển về cuối dòng|
|H|Di chuyển về đầu dòng đầu tiên|
|L|Di chuyển về dầu dòng cuối|
|:n|Di chuyển về đầu dòng thứ n|

<a name="2.3"></a>
#### 2.3 Chèn và đè văn bản

|VI  command| Ý nghĩa|
|-----------------|-----------|
|i|Chèn phía trước con trỏ|
|I|Chèn vào đầu dòng|
|a|Chèn vào phía sau con trỏ|
|A|Chèn và cuối dòng|
|o/O|Chèn dòng mới vào bên dưới/trên dòng hiện tại|
|C|Xóa từ vị trí con trỏ đến cuối dòng hiện tại để chèn|
|r/R|Thay thế/ghi đè 1/nhiều ký tự|
|ESC| Thoát khỏi chế độ text mode|


<a name="2.4"></a>
#### 2.4 Chỉnh sửa văn bản

|VI  command| Ý nghĩa|
|-----------------|-----------|
|~|Chuyển đổi ký tự thường sang hoa và ngược lại|
|>/<|Thụt lề sang phải/trái|
|yy/:y/Y|Sao chép 1 dòng|
|dd/:d|Xóa 1 dòng|
|x|Xóa ký tự hiện tại ở vị trí con trỏ|
|X|Xóa vị trí phía trước con trỏ|
|p|Dán kết quả copy tại vị trí con trỏ|

<a name="2.5"></a>
#### 2.5 Undo

|VI  command| Ý nghĩa|
|-----------------|-----------|
|u/U|Undo/Undo tất cả thao tác hiệ tại với dòng hiện tại|
|Ctrl + r| Redo|

<a name="2.6"></a>
#### 2.6 Tìm kiếm và thay thế

|VI  command| Ý nghĩa|
|-----------------|-----------|
|/chuỗi or ?chuỗi|Tìm kiếm chuỗi từ trên xuống hay từ dưới lên|
|n|Sử dụng sau lệnh **/**, tìm chuỗi phù hợp tiếp theo (tìm về cuối)|
|N|Sử dụng sau lệnh **/**, tìm chuỗi phù hợp phía trước (tìm về đầu)|
|:**r**s/string1/string2/**g**|Thay thế string1 bằng string2 trong đó|
|_r có thể là_|
|không gì cả|Làm việc với dòng trống|
|number|Làm việc trên dòng number chỉ định|
|%|Toàn bộ văn bản|
|_g có thể là_|
|g|Thay thế toàn bộ|
|i|Không phần biệt chữ thường hay hoa|
|I|Phân biệt hoa - thường (mặc định)|
|c|Có lựa chọn trước khi thay thế. Khi lựa chọn xuất hiện, nhấn `y` để đồngý, `n` để bỏ qua, `a` để đồng ý toàn bộ và `q` để thoát|

<a name="2.7"></a>
#### 2.7 Một số lệnh khác

|VI  command| Ý nghĩa|
|-----------------|-----------|
|Ctrl + F|Cuộn xuống 1 màn hình|
|Ctrl + B|Cuộn lên 1 màn hình|
|:vsplit|Chia màn hình làm việc theo chiều dọc|
|:split|Chia màn hình làm việc theo chiều ngang|
|Ctrl + w| Chuyển giữa 2 cửa sổ, giữ ấn w 2 lần|
|:%!column -t|Căn lề|
|:!|Sử dụng lệnh trên linux trong VI|


<a name="3"></a>
### 3. Tùy chỉnh cấu hình

Trong **VI** bạn có thể sử dụng các tham số trên để hoặc các tham số sau để cấu hình lại trình soạn thảo của mình. Tuy nhiên để thuận tiện hơn bạn nên lưu chúng vào file cấu hình riêng (.vimrc) với các tham số sau (sử dụng `set` phía trước và thuộc tính phía sau tham số nếu có)

|Tham số|Chức năng|
|-----------------|-----------|
|ai (autoindent)|Thụt lề mỗi dòng cho cùng với dòng phía trên (mặc định là off)|
|ap (autoprint)|In dòng hiện hành lên màn hình khi dòng thay đổi (mặc định là on)|
|eb (errorbells)|Kêu bíp khi gõ sai lệnh (mặc định là off)|
|nu (number)|Hiển thị số thứ tự của dòng (mặc định là off)|
|sm (showmatch)|Hiển thị một dấu mở ngoặc nếu gõ vào một dấu ngoặc đóng (mặc định là off)|
|smd|Hiển thi thông báo đang ở chế độ làm việc nào (mặc định là on)|
|warn|Hiển thị thông báo khi thoát khỏi VI khi văn bản thay đổi mà chưa được lưu (mặc định là on)|
|wm (wrapmargin)|Xác đinh lề phải (mặc định là 0)|
|sw (shiftwidth)|Số khoảng trắng khi tab lùi (mặc định là 8)|
|ts (tabstop)|Số khoảng trắng khi tab (mặc định là 8)|
|syntax| Để hiển thị màu theo định dnagj file|
|wrap|Đặt wrap cho văn bản|

<a name="4"></a>
### 4. Thay đổi giao diện (theme)

Để thay đổi thiết lập màu nền cũng như màu chữ theo các mẫu có sẵn, ta sử dụng **colorscheme [tên mẫu]** với tên mẫu có thể là ron, blue, dark,...

<a name="5"></a>
### 5. Kết thúc

Trên đây là một số điều cơ bản về trình soạn thảo **VI**. Bạn có thể xem thêm ở [đây](https://nghethuatlaptrinh.wordpress.com/2012/12/02/su-dung-vim/) và [đây](http://ex-vi.sourceforge.net/viin/paper.html) để biết thêm.

Tham khảo https://nghethuatlaptrinh.wordpress.com/2012/12/02/su-dung-vim/