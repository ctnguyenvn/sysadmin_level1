
### User Environment

#### Mục lục

[1. Accounts, Users and Groups](#1)

[2. Environment Variables](#2)

[3. Recalling Previous Commands](#3)

[4. File Permissions](#4)

***

<a name='1'></a>
### 1. Accounts, Users and Groups

Như đã biết, Linux là hệ điều hành đa người dùng. Do vậy để xác định các người dùng hiện đang login vào hệ thống ta có thể sử dụng `who` (có thể dùng option `a` để hiển thị nhiều hơn) hoặc hiển thị người dùng hiện tại ta dùng `whoami`.

Trên Linux tất cả người dùng được phân biệt bằng User ID (uid). Thường thì uid với các user bình thường sẽ bắt đầu từ 1000.

Mặc định mỗi user sẽ có một group ID (gid) default và một user có thể thuộc nhiều group khác nhau.

Thông tin về user và group được lưu tại `/ect/passwd` và `/ect/group`

Các bản phân phối thường có giao diện cho việc thêm, xóa user và group. Tuy nhiên các thao tác này sẽ tôt hơn khi sử dụng trên các command line.

Để thêm user ta sử dụng `useradd`

	sudo useradd [username]

Để xóa user ta sử dụng `userdel`

	sudo userdel [username]

> Lưu ý:

> - Thư mục `home` mặc định của các user sẽ được tạo tại `/home/[username]`

> - Thao tác xóa user sẽ không xóa đi thư mục home của user đó nếu không sử dụng option `-r`

> - Muốn xem thông tin `uid`, `gid` ta có thể dùng lệnh id (không tham số)

Tương tự với group, để thêm 1 group mới ta sử dụng `groupadd`

	sudo groupadd [newgroup]

Để xóa group ta sử dụng `groupdel`

	sudo groupdel [newgroup]

Thêm user vào group sử dụng `usermod` với option như sau

	sudo usermod  -a  -G [namegroup]  [username]

Xóa user khỏi group chỉ định

	sudo gpasswd -d [username]  [namegroup]

Cũng có thể xóa user khỏi tất cả các group (trừ group primary của user)

	sudo usermod -G [username] [username]

> Lưu ý: Khi thêm user vào group ta có thể thêm vào nhiều group bằng cách viết các group cách nhau bởi dấu phẩy `,`

Trong Linux, mỗi người dùng khi login vào hệ thống sẽ sử dụng một hoặc nhiều hơn các file khởi động để thiết lập cũng như tạo nên các biến môi trường phục vụ cho hoạt động của hệ thống và người dùng. Các tập tin khởi động có thể làm rất nhiều thứ do người dùng làm việc với các lệnh như:

- Tùy chỉnh dấu nhắc trên cửa sổ dòng lệnh

- Tạo các shortcut và các alias

- Thiết lập editer mặc định

- Thiết lập các path

Khi người dùng login vào hệ thống, `/etc/profile` sẽ được đọc đầu tiên và sau đó lần lượt theo thứ tự ưu tiên của các file sau sẽ được đọc:

- __~/.bash_profile__

- __~/.bash_login__

- __~/.profile__

Lưu ý `~/.` là chỉ thư mục home của user login và việc đọc 3 file trên sẽ theo thứ tự ưu tiên cũng có nghĩa là chúng sẽ tìm theo thứ tự và sẽ dừng nếu đọc được bất kỳ file nào trong số đó

Khi bạn mở một shell mới (mở một sử sổ terminal mới) thì file `~/.bashrc` sẽ được shell mới đọc. Các lệnh trong `~/.bash_profile` sẽ có một số dòng nhất định, mà lần lượt sẽ thu thập các thông số tuỳ biến yêu cầu từ file `~/.bashrc`. File `~/.bashrc` cũng là nơi thường lưu `alias`.

Để tạo alias ta thêm vào file `~/.bashrc` hoặc chỉ cần sử dụng lệnh

	alias  lenh_moi='lenh day du'

Việc xóa thì làm ngược lại là sử dụng `unalias`

> Lưu ý là không có bất kỳ khoảng trắng nào 2 bên dấu `=` trong lệnh

<a name='2'></a>
### 2. Environment Variables

Các biến môi trường là các giá trị cụ thể được sử dụng trong các shell command, các tiện ích, ứng dụng,... Một số biến môi trường được thiết lập bởi hệ thống và một số khác được thiết lập khi khởi động hệ thống hoặc do người dùng tự cài đặt.

Một số thao tác với biến môi trường như `set`, `env`, `export`

- Để hiển thị giá trị của một biến cụ thể:

	echo  $[ten_bien] 	# ví dụ: echo  $SHELL

- Để thiết lập biến mới ta có thêm vào file `~/.bashrc` lệnh sau hoặc sử dụng trên terminal

	export  [VARIABLE]=[value]

> Lưu ý nếu thêm vào file thì ta cần sử dụng lệnh `source  ~/.bashrc` để biến vừa tạo có hiệu lực

Ngoài ra ta có biến `HOME` là đường dẫn đến thư mục home của user

Biến `PATH` liệt kê các thư mục được tìm kiếm khi một lệnh được đưa ra, mỗi thư mục cách nhau bởi dấu hai chấm `:`. Có thể thêm thư mục mới vào biến PATh như sau

	export  PATH=[thu_muc]

Với biến `PS1` thì đây là biểu diễn cho dấu nhắc lệnh trên terminal. Một số ký tự sẽ hiển thị tương ứng như sau

- __\u__ - User name 

- __\h__ - Host name 

- __\w__ - Current working directory 

- __\!__ - History number of this command 

- __\d__ - Date

Ví dụ: 

	export PS1='\u@\h:\w$ '

> Lưu ý: Chúng ta có thể thêm các biến này vào file `~/.bashrc` vì terminal sẽ load file này đầu tiên khi khởi động chúng

<a name='3'></a>
### 3. Recalling Previous Commands

Người dùng có thể xem lịch sử đã dùng các lệnh trước đó với lệnh `history` và danh sách các lệnh này được lưu tại file `~/.bash_history`

Một số biến môi trường có thể sử dụng để lấy thông tin về lệnh `history` như:


- __HISTFILE__: Vị trí của file history

- __HISTFILESIZE__: Số dòng tối đa được lưu (mặc định là 500)

- __HISTSIZE__: Số lệnh tối đa được lưu. 

- __HISTCONTROL__: Lệnh nào được lưu

- __HISTIGNORE__: Lệnh nào có thể không lưu

<a name='4'></a>
### 4. File Permissions

Trên linux mọi file đều được liên kết với chủ sở hữu của file. Mỗi file cũng được liên kết với group và chúng có những quyền nhất định như `read` (đọc), `write` (ghi) và `execute` (thực thi).

- __chown__: Sử dụng để thay đổi quyền sở hữu người dùng của file hay thư mục

- __chgrp__: Thay đổi quyền sở hữu của group

- __chmod__: Thay đổi quyền truy cập vào file/thư mục và có thể thay đổi cho chủ sở hữu, nhóm hay những user còn lại.

Các tập tin có ba loại quyền: read (r), write (w), execute (x). Chúng thường được biểu diễn như rwx. Các quyền này ảnh hưởng đến ba nhóm chủ sở hữu: người dùng/chủ sở hữu (u), nhóm (g) và những người khác (o).

Kết quả ta có 3 nhóm quyền sau

	rwx : rwx : rwx
	 u    :  g    : o

Ví dụ:

	chmod uo+x,g-w somefile

Trong đó u là viết tắt của user, o là other và g là group. Trong ví dụ trên `somefile` được cấp quyền thực thi cho user và other và thu quyền ghi của group

Tuy nhiên kiểu cú pháp này khó nhớ và để đơn giản hơn ta dùng một cách đơn giản hơn là chỉ một chữ số duy nhất để xác định 3 bit phân quyền cho mỗi nhóm như sau

- __4__ nếu quyền read được gán

- __2__ nếu quyền write được gán

- __1__ nếu quyền thực thi được gán

Do đó ta có thể thấy rằng với mỗi nhóm ta có các trường hợp là nếu bit xác định là 7 nghĩa là quyền read/write/execute được gán, 6 tương ứng với read/write và 5 là read/execute.

Ví dụ

	chmod 755 somefile