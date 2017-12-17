
### Command Line Operations

> Thực hiện: Nguyễn Công Trứ

> Cập nhật: 11/06/2017

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

	echo "student ALL=(ALL) ALL" > /etc/sudoers.d/student

Cuối cùng phần quyền cho file này như sau

	# chmod 440 /etc/sudoers.d/student

> Lưu ý ta có thể đặt tên file tạo mới theo tên người dùng như trên là người dùng `student`

Ứng dụng terminal emulator được cung cấp như là một thiết bị đầu cuối mà hoạt động không cần giao diện đồ họa, tuy nhiên vẫn giúp ta giao tiếp được với hệ thống. Linux hỗ trợ nhiều loại terminal như xterm, rxvt, konsole, terminator...

Linux hỗ trợ cả login với giao diện đồ họa và CLI (Command Line Interface). Tuy nhiên, với các bản cho desktop thì mặc định sẽ đăng nhập vào giao diện đồ họa và với các phiên bản server thì sẽ mặc định vào giao diện dòng lệnh. Chúng ta có thể di chuyển giữa các chế độ này và tất nhiên với server cần cài đặt các package cần thiết hỗ trợ giao diện đồ họa.

__Virtual Terminal__ được xem như là một session terminal hiển thị trên màn hình cho phép ta thao tác như làm việc trên terminal của hệ thống. Tuy nhiên chúng ta có thể tạo ra nhiều session như thế và nhờ đó mà ta có thể xem đây là tính năng đa nhiệm trên hệ thống Linux. Để chuyển giữa các session này ta nhấn **Ctrl+Alt+key (phím chức năng)**

Linux hỗ trợ nhiều cách start và stop chế độ đồ họa. Tuy nhiên phố biến với hầu hết các phân phối hiện nay là **systemctl** với các nền tảng **systemd** và **telinit**

	sudo systemctl stop gdm (hoặc sudo telinit 3)

	sudo systemctl start gdm (hoặc sudo telinit 5)

> Lưu ý: Với Ubuntu ta thay thế `lightdm` cho `gdm`

### Basic Operations

- Login in và out: Để đăng nhập với text mod ta sử dụng **string**. ta cũng có thể login remote qua ssh như **ssh username@remote-server.com** 

- Rebooting và Shutting down: Sử dụng lệnh **shutdown** với option **-r** để khởi động lại và **-h** để tắt hệ thống. Để rõ hơn về lệnh này ta có thể sử dụng **man shutdown**. Ví dụ cơ bản như

	$ sudo shutdown -h 10:00 "Shutting down for scheduled maintenance."

Tuy hệ thống filesystem trên mỗi bản phân phối có thể khác nhau nhưng ta có thể tìm kiếm nơi chứa file thực thi bằng cách sử dụng lệnh **which** và **whereis**. Ví dụ:

	$ which [lệnh]

	$ whereis [lệnh]

Truy cập và di chuyển giữa các thư mục. Khi lần đầu tiên đăng nhập vào một hệ thống hoặc cửa sổ dòng lệnh, thư mục mặc định sẽ là thư mục home của user login; bạn có thể  xem các đường dẫn chính xác của việc này bằng cách gõ `echo $HOME`. Một số lệnh cơ bản:

- __pwd__: Hiển thị đường dẫn tuyệt đối của thư mục hiện tại 

- __cd ~__ hoặc __cd__: Di chuyển đến home hoặc đến các thư mục khác

- __cd ..__: Di chuyển đến thư mục cha của thư mục hiện tại

- __cd -__: Di chuyển đến thư mục trước đó 

#### Đường dẫn tuyệt đối và tương đối

Có hai cách để xác định đường dẫn

- Absolute pathname: Hiểu đơn giản đường dẫn tuyệt đối là đường dẫn bắt đầu từ `/` 

- Relative pathname: Đường dẫn tương đối bắt đầu từ thư mục làm việc hiện tại. Đường dẫn tương đối không bao giờ bắt đầu từ `/`

<p align="center"><img src="https://github.com/ctnguyenvn/sysadmin_level1/blob/master/Task43_Linux_Course_01_LFS101/Chapter_07/Images/1.png"></p>

Hầu hết thì ta dùng đường dẫn tương đối (đỡ phải gõ) và để thuận tiện hơn ta có một số cách gõ như **.** để thể hiện cho thư mục hiện tại, **..** (thư mục cha) và **~** (thư mục home)


#### Liên kết

Lệnh **ln** cho phép tạo các liên kết (như shortcut trên windows). Chúng ta có thể sử  dụng option **-s** để tạo liên kết mềm (symlinks). 

Đối với hệ thống Linux nói chung thì với người dùng thì phân biệt các file bằng file name nhưng đối với hệ thống thì nó phâ biệt các file bằng **index node** hay viết tắt là node. Hard links sẽ tạo ra 1 file và có inode bằng với inode của file gốc. Đối với soft link thì khác, inode này tham chiếu đến vùng nhớ chứa địa chỉ dẫn đến vùng data của soft link. Trong data này chứa đường dẫn đến file gốc. Do đó kết quả là khi xóa file gốc thì hardlink vẫn còn tồn tại nhưng soft link thì không.

Ví dụ với hard link

	$ ln file1 file2
	
Ví dụ với soft link

	$ ln -s file1 file2

> Trong đó `file1` là  file gốc và `file2` là file được tạo ra. Có thể xem inode của các file/folder bằng cách sử dụng `ls` với option `-i`

### Working with Files

Linux hỗ trợ rất nhiều lệnh thao tác với file

Để xem file ta có thể dùng các lệnh sau:

- __cat___: Để xem các file có nội dụng nhỏ

- __tac__: Để xem các file với nội dung từ dưới lên, bắt đầu từ dòng cuối cùng

- __less__, __more__: Để xem các file có nội dung lớn hơn

- __tail__: Xem mặc định 10 dòng cuối (có thể thay đổi số dòng bằng option **-n**)

- __head__: Ngược lại với tail, theo mặc định in 10 dòng đầu tiên của một tập tin.

Lệnh **touch** dùng để tạo ra file, ví dụ 

	$ touch -t 03201600 myfile

> Option `-t` để thiết lập ngày giờ tạo file

Lệnh **mkdir** dùng để tạo thư mục, ví dụ

	$ mkdir name_folder

Lệnh **rmdir** dùng để xóa các thư mục rỗng. Để xóa thư mục với nội dung bất kỳ ta dùng lệnh **rm -rf**

Để di chuyển hoặc đổi tên file/folder ta sử dụng lệnh **mv**

#### Modifying the Command Line Prompt
 
Biến **PS1** cho phép hiển thị ra terminal dấu nhắc lệnh. Mặc định đầu hết các bản phân phối linux đều có chung một định dạng nhưng ta cũng có thể thay đổi chúng như thay đổi thành

	student@quad32 $

###  Searching for Files

Khi thực thi một lệnh bất kỳ, mặc định sẽ có 3 loại **file streams** như sau

|Name|	Symbolic Name| Value| Example|
|---|---|---|---|
|standard input| stdin| 0 |keyboard
|standard output| stdout |1| terminal
|standard error	| stderr|2|log file

Thường thì **stdin** được lấy từ bàn phím, tuy nhiên cũng có thể từ file hoặc từ kết quả của lệnh trước khi sử dụng pipe. **stdou** và **stderr** thường hiển thị ra màn hình.

#### I/O Redirection

Thông qua dòng lệnh, chúng ta có thể chuyển hướng các dòng dữ liệu để có thể nhận dữ liệu đầu vào từ tệp tin hoặc lệnh khác thay vì từ bàn phím và chúng ta có thể ghi dữ liệu ra và lỗi vào tệp hoặc gửi chúng dưới dạng đầu vào cho các lệnh tiếp theo.

Ví dụ, nếu chúng ta có một chương trình được gọi là `do_something` đọc từ stdin và viết vào stdout và stderr, chúng ta có thể thay đổi nguồn đầu vào của nó bằng cách sử dụng dấu (<) và tên của tệp sẽ được tiêu thụ cho dữ liệu đầu vào :

	$ Do_something < input-file

Nếu bạn muốn gửi đầu ra đến một tệp tin, sử dụng dấu hiệu lớn hơn (>):

	$ Do_something> output-file

Bởi vì stderr không giống như stdout, các thông báo lỗi sẽ vẫn được nhìn thấy trên cửa sổ terminal trong ví dụ trên.

Nếu bạn muốn chuyển hướng stderr sang một tệp riêng biệt, ta có thể dùng value tập tin như stderr (2), dấu lớn hơn (>), theo sau là tên của tệp muốn giữ tất cả mọi thứ lệnh chạy viết cho stderr:

	$ Do_something 2> error-file

Một ký hiệu viết tắt đặc biệt có thể được sử dụng để đẩy bất cứ điều gì bằng văn bản để mô tả tập tin value 2 (stderr) tại nơi như   file descriptor 1 (stdout): `2>&1`

	$ Do_something> all-output-file 2>&1

Bash cho phép một cú pháp dễ dàng hơn cho những điều trên:

	$ Do_something >& all-output-file

#### Pipe

Pipe cho phép thực hiện nhiều lệnh cùng lúc, đầu ra của lệnh trước là đầu vào của lệnh sau. Điều này rất thuận lợi cho hệ thống vì tốc độ xử lý sẽ nhanh hơn vì các hệ thống ngày nay với bộ đa vi xử lý. Ví dụ cấu trúc lệnh với pile như

	$ command1 | command2 | command3

#### Searching for Files

Lệnh **locate** cho phép tìm kiếm theo một cơ sở dữ liệu được xác định trước. Ta có thể dùng grep để lọc kết quả với chuỗi nhất định. Tuy nhiên chúng ta cần update database trước khi sử dụng nó vì có thể dữ liệu chưa được cập nhật
	
	$ updatedb

	$ locate zip | grep bin

#### Wildcards and Matching File Names

Bạn có thể dùng một số ký tự đặc biệt để sử dụng khi dùng lệnh như

- __?__: Đại diện cho 1 ký tự đơn bất kỳ

- __*__: Bất kỳ chuỗi hoặc ký tự bất kỳ

- __[set]__: Trùng với một hoặc các ký tự trong cặp dấu `[]` (có thể dùng ! phía trước các ký tự với ý nghĩa ngược lại)

#### Finding Files

Lệnh **find** trên linux rất hữu dụng. Khi không có đối số được đưa ra, nó hiển thị tất cả thư mục hiện tại và tất cả các thư mục con của nó. Các lựa chọn thường dùng để rút ngắn danh sách bao gồm -name (chỉ tên file), -iname (cũng bỏ qua trường hợp file name) và -type (chỉ loại file, chẳng hạn như d cho thư mục, l cho liên kết, hoặc f cho một file, vv).

Cấu trúc của lệnh file 

	$ find [path] [option]

Tìm kiếm tệp và thư mục có tên "gcc":

	$ find / usr -name gcc

Chỉ tìm kiếm các thư mục có tên "gcc":

	$ find / usr -type d -name gcc

Chỉ tìm kiếm các tệp thông thường có tên "gcc":

	$ find / usr -type f -name gcc

Nâng cao hơn ta có thể thực thi lệnh với lệnh find với option **-exec**. Ví dụ 

<p align="center"><img src="https://github.com/ctnguyenvn/sysadmin_level1/blob/master/Task43_Linux_Course_01_LFS101/Chapter_07/Images/2.png"></p>

> `{}` chỉ tất cả kết quả tìm được và `';'` thể hiện kết thúc lệnh thực thi. Ta cũng có thể thay thế `-exec` bằng `-ok`

Để tìm tệp dựa trên kích thước:

	$ find / -size 0

Lưu ý kích thước ở đây là trong khối 512-byte, theo mặc định, cũng có thể xác định byte (c), kilobytes (k), megabyte (M), gigabyte (G), vv. Như các số ở trên, kích thước tập tin cũng có thể là số chính xác (n), +n hoặc -n. Để biết chi tiết, dùng man để tìm.

Ví dụ: để tìm tệp lớn hơn 10 MB và chạy lệnh trên các tệp đó:

$ Find / -size + 10M -exec command {} ';'

### Installing Software  

Các nền tảng bản phân phối Linux và hầu hết các add-on phần mềm được cài đặt thông qua hệ thống quản lý gói. Mỗi gói chứa các tập tin và các hướng dẫn khác cần thiết để cài đặt và sử dụng phần mềm

Một số hệ thống package trên các nền tảng phổ biến

<p align="center"><img src="https://github.com/ctnguyenvn/sysadmin_level1/blob/master/Task43_Linux_Course_01_LFS101/Chapter_07/Images/3.png"></p>

Các Advanced Packaging Tool (apt) là cơ bản hệ thống quản lý gói để quản lý phần mềm trên nền tảng hệ thống Debian. Trong khi nó cũng cung cấp các bộ quản lý gói đồ họa, chẳng hạn như Ubuntu Software Center và synaptic, và cả giao diện dòng lệnh, với các chương trình bao gồm apt-get và apt-cache.

Yellowdog Updater Modified (yum) là tiện ích dòng lệnh quản lý gói cho các hệ thống Linux RPM, về cơ bản những gì chúng ta đã gọi dòng Fedora. yum có cả dòng lệnh và giao diện người dùng đồ họa. các phiên bản gần đây Fedora đã thay thế yum với một tiện ích mới có tên gọi DNF

zypper là một hệ thống quản lý gói cho openSUSE đó là dựa trên RPM. zypper cũng cho phép bạn quản lý kho từ dòng lệnh. zypper là khá đơn giản để sử dụng và tương tự như yum khá chặt chẽ.

Ta có thể xem một số lệnh cơ bản khi quản lý các packages

<p align="center"><img src="https://github.com/ctnguyenvn/sysadmin_level1/blob/master/Task43_Linux_Course_01_LFS101/Chapter_07/Images/4.png"></p>