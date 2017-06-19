
### Text Editors

> Thực hiện: Nguyễn Công Trứ

> Cập nhật: 19/06/2017

### Mục lục

- [1. Basic Editors: nano and gedit](#1)

- [2. More Advanced Editors: vi and emacs](#2)

***


<a name="1"></a>
### 1. Basic Editors: nano and gedit

Trong nhiều trường hợp, người dùng linux đặc biệt là các quản trị vieenthuongwf xuyên làm việc với các file cấu hình như viết script. Vì vậy việc sử dụng text editter làm cho mọi việc trở nên thuận tiện hơn rất nhiều. Trên linux có một số trình soản thảo phổ biến như **vi**, **nano**...

<p align="center"><img src="https://github.com/hellsins/sysadmin_level1/blob/master/Task43_Linux_Course_01_LFS101/Chapter_11/Images/1.png"></p>

Đôi khi người dùng muốn tạo file mà không cần dùng đén editer. Do đó ta có thể sử dụng các lệnh cơ bản để tạo chúng một cách nhanh chóng. Có 2 cách cơ bản là sử dụng **echo** và **cat** như sau

<p align="center"><img src="https://github.com/hellsins/sysadmin_level1/blob/master/Task43_Linux_Course_01_LFS101/Chapter_11/Images/2.png"></p>

Đối với **echo** việc sử dụng dấu **>** sẽ ghi lại tự đầu còn với **>>** sẽ ghi tiếp vào sau nội dung của file nếu file tồn tại.

Đối với **cat** ngoài dùng **EOF** người dùng có thể sử dụng **Ctrl+d** để thoát và lưu lại kết quả.

Với **nano** người dùng sẽ được làm việc với một text-editer mà không cần nhiều kinh nghiệm, nó đơn giản trong việc sử dụng. Còn giao diện đồ họa thì Linux có trình soạn thảo phổ biến nhất là **gedit**. Đây là trình soạn thảo hỗ trợ gia diện đồ họa có cho phép người dùng configure. Và nó hỗ trợ cho GNOME, một số khác như **kwrite** và **kate** trên KDE, chúng như Notepad trên windows

Để sử dụng **nano**, đơn giản ta chỉ cần dùng lệnh **nano  [file_name]**, nếu file tồn tại nó sẽ mở ra và nếu chưa tồn tại nó sẽ tạo ra file mới cho người dùng. Ngoài ta có một số phím tắt phổ biến ta có thể sử dụng như


- CTRL-G: Hiển thị help trên màn hình

- CTRL-O: Viết vào file

- CTRL-X: Thoát khỏi edit file

- CTRL-R: Chèn nội dung từ file khác vào bufer hiện tại

- CTRL-C: Hủy lệnh trước

<a name="2"></a>
### 2. More Advanced Editors: vi and emacs

Với các người dùng và các quản trị viên có kinh nghiệm thì hầu như họ đều dùng **vi** và **emacs**.Cả hai đều được hỗ trợ mặc định hầu hết trên các bản phân phối linux. Chúng hoàn toàn có thể không hỗ trợ GUI cho người dùng (tuy nhiên có bản GUI cho người ít kinh nghiệm), do đó chún hỗ trợ rất nhiều các lệnh cũng như phím tắt, chính vì điều này mà việc sử dụng diễn ra nhanh và linh hoạt hơn rất nhiều.

Thương thì trên các phân phối Linux, *vim** được cài đặt và sử dụng như **vi**. **vim** là viết tắt của **vi improved**. Như đã nói trên bản đồ họa của nó được phát triển có tên là **gvim** với GNOME và **kvim** trên KDE.

Gõ vimtutor sẽ được một hướng dẫn ngắn nhưng rất toàn diện cho những ai muốn học các lệnh vi. Hướng dẫn này là một nơi tốt để bắt đầu học vi. Mặc dù nó chỉ cung cấp một bài giới thiệu và chỉ có bảy bài học, nó có đủ tài liệu để giúp bạn trở thành một người sử dụng thành thục vi vì nó bao gồm một số lượng lớn các lệnh. Sau khi học những điều cơ bản này, bạn có thể tìm kiếm các thủ thuật mới để kết hợp vào danh sách lệnh vi của bạn bởi vì luôn có những cách tối ưu để làm việc trong vi với việc gõ ít hơn.

**vi** cung cấp 3 mode 

- Command

	+ Theo mặc định, vi bắt đầu trong chế độ lệnh.

	+ Mỗi phím là một lệnh.

	+ Dùng bàn phím được hiểu là các lệnh có thể sửa đổi nội dung tệp.

- Insert

	+ Nhập i để chuyển sang chế độ Insert
	
	+ Chế độ Insert được sử dụng để nhập (Insert) văn bản vào một tệp.

	+ Chế độ Insert được chỉ báo bởi một "? INSERT? "Ở cuối màn hình.

	+ Nhấn Esc để thoát chế độ Insert và trở lại chế độ lệnh.

- Line

	+ Gõ **:** để chuyển sang chế độ Line.

	+ Được sử dụng với một trình biên tập cũ. Nó mạnh mẽ với rất nhiều tập lệnh được sử dụng

	+ Nhấn Esc để thoát chế độ Line và trở lại chế độ lệnh.

Một số thao tác sử dụng **vi** cơ bản

|Command|Usage|
|---|---|
|vi  myfile|Bắt đầu trình vi với myfile|
|vi  -r  myfile|Bắt đầu vi và chỉnh sửa tệp tin myfile trong chế độ khôi phục từ sự cố hệ thống|
|:r  file2|Đọc tệp file2 và chèn vào vị trí hiện tại|
|:w|Viết vào file hiện tại|
|:w  myfile|Viết vào myfile|
|:w!  file2|Ghi đè lên file2|
|:x  or :wq||
|:q|Thoát khỏi vi|
|:q!|Thoát khỏi vi và không lưu lại|

Một số key để thay đổi vị trí con trỏ hiện tại

|Key|Usage|
|---|---|
|arrow keys|Di chuyển lên, xuống, trái và phải|
|j or <ret>|Di chuyển xuống một dòng|
|k|Di chuyển lên một dòng|
|h or Backspace|Di chuyển sang trái một ký tự|
|l or Space|Di chuyển sang phải một ký tự|
|0|Di chuyển lên đầu dòng|
|$|Di chuyển đến cuối dòng|
|w|Di chuyển đến đầu từ tiếp theo|
|:0 or 1G|Di chuyển đến đầu file|
|:n or nG|Di chuyển đến dòng thứ n|
|:$ or G|Di chuyển đến cuối file|
|CTRL-F or Page Down|Di chuyển về tới trang sau|
|CTRL-B or Page Up|Di chuyển đến trang trước|
|^|refresh và trung tâm màn hình|

Để tìm kiếm đơn trong **vi** ta sử dụng

|Command|Usage|
|---|---|
|/pattern| Tìm kiếm với từ pattern từ con trỏ trở về sau|
|?pattern| Tìm kiếm với từ pattern từ con trỏ trở về trước|
|n| Di chuyển tới từ tiếp theo tìm được|
|n| Di chuyển tới từ phía trước (trong văn bản) theo tìm được|

Một số key làm việc với **vi**

|key|Usage|
|---|---|
|a|Nối thêm văn bản sau con trỏ, dừng lại khi nhấn Escape|
|A|Nối thêm văn bản vào cuối dòng hiện tại, dừng lại khi nhấn Escape|
|i|Chèn văn bản vào trước con trỏ, dừng lại khi nhấn Escape|
|I|Chèn văn bản vào đầu dòng hiện tại, dừng lại khi nhấn Escape|
|o|Bắt đầu dòng mới dưới dòng hiện tại, chèn văn bản ở đó, dừng lại khi nhấn Escape|
|O|Bắt đầu một dòng mới trên dòng hiện tại, chèn văn bản ở đó, dừng lại khi nhấn Escape|
|r|Thay thế ký tự ở vị trí hiện tại|
|R|Thay thế văn bản bắt đầu bằng vị trí hiện tại, dừng lại khi nhấn Escape|
|x|Xóa ký tự ở vị trí hiện tại|
|Nx|Xóa N ký tự, bắt đầu ở vị trí hiện tại|
|dw|Xóa từ ở vị trí hiện tại|
|D|Xóa phần còn lại của dòng hiện tại|
|dd|Xóa dòng hiện tại|
|Ndd or dNd|Xóa N dòng|
|u|Hoàn tác thao tác trước|
|yy|Copy dòng hiện tại và đặt nó trong bộ đệm|
|Nyy or yNy|Copy n dòng tại và đặt nó trong bộ đệm|
|p|Paste vào vị trí hiện tại của con trỏ|

**vi** hỗ trợ việc sử dụng lệnh ngoài như các command sử dụng trên linux. Để làm điều này ta gõ **:! command**. Ví dụ sử dụng **:! wc %** để thực hiện lệnh wc ở file hiện tại

<p align="center"><img src="https://github.com/hellsins/sysadmin_level1/blob/master/Task43_Linux_Course_01_LFS101/Chapter_11/Images/3.png"></p>

Trình soạn thảo **emacs** là một đối thủ cạnh tranh phổ biến cho vi. Không giống như vi, nó không hoạt động với chế độ. Emacs được tùy biến cao và bao gồm một số lượng lớn các tính năng. Ban đầu nó được thiết kế để sử dụng trên console, nhưng cũng sớm được điều chỉnh để hoạt động với một GUI. Emacs có nhiều tính năng khác ngoài chỉnh sửa văn bản đơn giản; Nó có thể được sử dụng cho email, gỡ lỗi, vv 

Thay vì có các chế độ khác nhau cho lệnh và chèn, như vi, emacs sử dụng phím CTRL và Meta (Alt hoặc Esc) cho các lệnh đặc biệt.

Một số key phổ biến cho người mới bắt đầu như

|Key|Usage|
|---|---|
|emacs myfile|Bắt đầu emacs với myfile|
|CTRL-x i|Chèn vào vị trí con trỏ hiện tại|
|CTRL-x s|Lưu tất cả file|
|CTRL-x CTRL-w|Ghi vào tập tin đưa ra một tên mới khi được nhắc|
|CTRL-x CTRL-s|Lưu tập tin hiện tại|
|CTRL-x CTRL-c|Thoát sau khi được nhắc lưu tất cả các sửa đổi|

Tương tự như **vi** thì **emacs** cũng sử dụng rất nhiều key để di chuyển con trỏ 

|Key|Usage|
|---|---|
|arrow keys|Sử dụng các phím mũi tên lên, xuống, trái và phải|
|CTRL-n|Xuống một dòng|
|CTRL-p|Lên một dòng|
|CTRL-f|Di chuyển sang phải một ký tự|
|CTRL-b|Di chuyển sang trái một ký tự|
|CTRL-a|Di chuyển lên đầu dòng|
|CTRL-e|Di chuyển xuống cuối dòng|
|Meta-f|Di chuyển đến đầu từ tiếp theo|
|Meta-b|Di chuyển đến đầu từ trước|
|Meta-<|Di chuyển đến đầu file|
|Meta-g-g-n|Di chuyển đến dòng thứ n|
|Meta->|Di chuyển đến cuối file|
|CTRL-v or Page Down|Đến trang tiếp theo|
|Meta-v or Page Up|Quay về trang trước|
|CTRL-l|Refresh|

Để tìm kiếm ta sử dụng

|Key|Usage|
|---|---|
|CTRL-s|Tìm kiếm từ con trỏ về sau|
|CTRL-r|Tìm kiếm từ con trỏ về trước|

Một số key sử dụng cơ bản

|Key|Usage|
|---|---|
|CTRL-o|Chèn một dòng trống|
|CTRL-d|Xóa ký tự tại vị trí con trỏ hiện tại|
|CTRL-k|Xóa phần còn lại của dòng hiện tại|
|CTRL-_|Hoàn tác thao tác trước|
|CTRL- (space or CTRL-@)|Đánh dấu sự bắt đầu của khu vực đã chọn. Kết thúc sẽ ở vị trí con trỏ|
|CTRL-w|Xóa văn bản được đánh dấu hiện tại và ghi nó vào bộ đệm|
|CTRL-y|Chèn vào vị trí con trỏ hiện tại bất kỳ nội dung nào gần đây đã bị xóa|