### GRUB Linux

> Tài liệu: Tìm hiểu về grub linux

> Thực hiện: Nguyễn Công Trứ

> Cập nhật: 11/11/2016

#### Mục lục

[1. Giới thiệu](#1)

[2. Cài đặt Grub trong môi trường Linux](#2)

[3. Sử dụng Grub](#3)

- [3.1 Chuẩn bị](#3.1)

- [3.2 Một số thuật ngữ và xác định tập tin](#3.2)

- [3.3 Các tập tin hình ảnh](#3.3)

- [3.4 Cơ chế hoạt động trong Grub](#3.4)

- [3.5 Tạo đĩa mềm khởi động](#3.5)

[4. Cài đặt grub 2.0 trên CentOS 6.8](#4)

[5. File cấu hình](#5)

[6. Cách lấy lại quyền root](#6)

[7. Đặt mật khẩu cho grub](#7)

---

<a name="1"></a>
### 1. Giới thiệu

Grub là trình khởi động máy tính - có nhiệm vụ tải nhân và khởi động hệ thống Linux cũng như một số HĐH khác như FreeBSD, OpenBSD, DOS, Windows,...

<a name="2"></a>
### 2. Cài đặt Grub trong môi trường Linux

Cài đặt Grub cần phân biệt 2 bước:

- Cài đặt trong môi trường HĐH có thể sử dụng được Grub

	+ Đầu tiên có thể tải Grub về tại [đây](http://alpha.gnu.org/gnu/grub/)

	+ Tiếp theo sử dụng các lệnh sau

		__tar xzvf [file_name.tar.gz]__

		__cd [file_name]__
	
		__./configure__
	
		__make__
	
		__make install__

		> Bạn có thể dùng dụng `grub-reboot -V` để xem phiên bản đã được cài đặt

- Cài đặt Grub để làm trình khởi động cho máy tính

<a name="3"></a>
### 3. Sử dụng Grub

<a name="3.1"></a>
#### 3.1 Chuẩn bị

Có 2 cách cài đặt Grub 

- Dùng môi trường nguyên thủy của Grub

- Dùng môi trường hệ điều hành giống Unix

<a name="3.2"></a>
#### 3.2 [Một số thuật ngữ và xác định tập tin](http://vnoss.org/docs/?id=2#s3.2)

<a name="3.3"></a>
#### 3.3 Các tập tin hình ảnh

Grub bao gồm 1 số hình ảnh

- __stage1__ (512 byte): Giai đoạn 1 - hình ảnh chính để khởi động Grub

- __*stage1_5__: Giai đoạn 1.5

- __stage2__: Giai đoạn 2 - hình ảnh cốt lõi của Grub

- __nbrub, pxebrub__: Là các hình ảnh khởi động mạng

<a name="3.4"></a>
#### 3.4 Cơ chế hoạt động trong Grub

-  Trên sector thứ nhất của đĩa cứng (ngoài bảng phân vùng), một đoạn mã thực thi được là giai đoạn đầu tiên của quá trình khởi động máy tính (hoặc đoạn mã IPL - initial program load) - đoạn này là lệnh fdisk/mbr trên dos tạo ra

-  Khi thiết lập trong BIOS quy định khởi động từ đĩa cứng đó, BIOS sẽ trao quyền điều khiển cho IPL hoặc đoạn mã giai đoạn 1

-  Khi đoạn mã chuẩn được nạp, nó sẽ quyết định phân vùng nào là chủ động và trao quyền điều khiển cho đoạn mã thực thi được nằm ở trong hoặc gần sector thứ nhất của phân vùng chủ động (những gì xảy ra tiếp theo phụ thuộc vào HĐH)

	+ Ở các HĐH dos cũ, phần cốt lõi thi hành được của HĐH nằm ngay tại vị trí đầu tiên của đĩa và được khởi động trực tiếp từ giai đoạn1

	+ Trường hợp điển hình, 1 chương trình  khởi động giai đoạn 2 sẽ đc nạp và đến lượt nó sẽ biết nơi nào để tìm nhân hoặc phần cốt lõi của HĐH và khởi động chúng

	+ Khi Grub hoặc 1 trình khởi động đc cài đặt, đoạn mã của trình khởi động đó (521 byte) sẽ đc thay thế đoạn mã IPL chuẩn. 

	+ Khác biệt chính giữa 1 trình khởi động và đoạn mã IPL chuẩn là quyền điều khiển sẽ đi đâu tiếp sau đó - với Grub, quyền điều khiển sẽ đc trao cho trình giai đoạn 2 (hoặc giai đoạn 1.5)

	+ Giai đoạn 1 đc cài vào MBR hoặc vào sector khởi động của phân vùng 

	+ Giai đoạn 2 đc đặt trên 1 hệ thống tập tin

	+ Giai đoạn 1.5 có thể được cài trong 1 hệ thống tập tin, trong vùng khởi động FFS hoặc ReiserFS, và trong các sector ngay sau MBR vì giai đoạn 1.5 đủ nhỏ và các sector ngay sau MBR thường không đc sử dụng 

	+ Giai đoạn 1.5 hoặc giai đoạn 2 có thể đc đặt bất cứ ở đâu và giai đoạn 2 có thể nạp tập tin cấu hình từ bất cứ nơi đâu trên đĩa cứng

- Công việc mà giai đoạn 1 cần làm là tải giai đoạn 2 hoặc giai đoạn 1.5 

- Giai đoạn 1 mã hóa vị trí của giai đoạn 2 (hoặc giai đoạn 1.5) ở dạng danh sách khối nên nó không hiểu bất cứ cấu trúc hệ thống tập tin nào

- Vì Grub hỗ trợ cả chế độ CHS lẫn LBA nên giai đoạn 1 trong Grub, sau khi thăm dò thông số và chế độ truy cập  của ổ cứng, chỉ tải sector đầu tiên của giai đoạn 2 (hoặc giai đoạn 1.5) và giai đoạn 2 sẽ tự tải phần còn lại (tức là vị trí từ địa chỉ bắt đầu của nó thêm 512byte)

	+ Giai đoạn 1.5 là cầu nối giữa stage1 và stage2 , nghĩa là giai đoạn 1.5 đc giai đoạn 1 nạp và nhiệm vụ của nó là nạp giai đoạn 2. stage1 không hiểu bất kỳ hệ thống tập tin nào nhưng *_stage1_5 hiểu 1 hệ thống tập tin.

	+ Giai đoạn 1.5 cho phép giai đoạn 2 được nạp từ 1 hệ thống tập tin bằng đường dẫn thông thường mà không phải dùng danh sách khối. vì vậy có thể đặt stage2 ở bất kỳ đâu, ngay cả sau khi cài đặt grub

<a name="3.5"></a>
#### 3.5 Tạo đĩa mềm khởi động

Là quá trình chép các tập tin stage1 và stage2 từ thư mục hình ảnh vào block thứ nhất và thứ 2 của đĩa mềm. Quá trình này sẽ phá hủy dữ liệu hiện đang lưu trên đĩa mềm

	# cd /usr/share/grub/i386-pc
	
	# dd if=stage1 of=/dev/fd0 bs=512 count=1
	
	1+0 records in
	
	1+0 records out
	
	# dd if=stage2 of=/dev/fd0 bs=512 seek=1
	
	153+1 records in
	
	153+1 records out

<a name="4"></a>	
###4. Cài đặt grub 2.0 trên CentOS 6.8

Đầu tiên có thể gỡ grub 0.97 với lệnh sau:

	yum remove grub

> Có thể xóa tất cả các stage... và các file khác ở thư mục `/boot/grub/*`

> 	sudo rm -rf /boot/grub/*

Tiếp theo chúng ta tải grub 2.0 về ở [đây](ftp://ftp.gnu.org/gnu/grub/) hoặc sử dụng wget tải về như sau

	wget  ftp://ftp.gnu.org/gnu/grub/grub-2.00.tar.gz

Sau khi tải về ta giải nén

	tar xzvf grub-2.00.tar.gz

Tiếp theo ta build grub như sau

	cd grub-2.00

	./configure

	make

	make install

> Lưu ý: Cần có các gói `bison, gcc, flex` để quá trình build thành công

Sau khi build xong thì kết quả  ta sẽ thấy ở `/usr/local/etc/grub.d/` và `/boot/grub/`

Cài grub với grub-install

	./grub-install /dev/sda

	./grub-mkconfig  -o  /boot/grub/grub.cfg

<a name="5"></a>
###5. File cấu hình

File cấu hình grub 2.0 nằm ở file `/boot/grub/grub.cfg` với 1 số thông số lưu ý sau

- __set default="0"__: nghĩa là sẽ login vào tùy chọn đầu tiên trong menu grub

- __hiddenmenu__: Dòng này thêm vào nếu bạn muốn ẩn menu đi

- __set timeout=10__: Thiết lập thời gian chờ là 10s

- __menuentry 'title here'__: Với grub cũ thì title sẽ có dòng riêng sau title nhưng đối với grub 2.0 thì nó được đặt sau `menuentry`

![](https://github.com/hellsins/sysadmin_level1/blob/master/Task12_GRUB_Linux/Image/1.png)

> Ngoài ra còn 1 số khác nữa, tuy nhiên bạn cũng có thể edit trong các file header tại thư mục `/usr/local/etc/grub.d/`

<a name="6"></a>
###6. Cách lấy lại quyền root

Trên CentOS 6.8 ta có thể lấy lại quyền root dựa vào cách edit grub. Đầu tiên khi vào menu chọn boot ta có thể chọn phần `Advandced optinons...` (có thể title bạn khác). 

![](https://github.com/hellsins/sysadmin_level1/blob/master/Task12_GRUB_Linux/Image/2.png)

Sau đó chọn dòng có `(recovery mode)` ở cuối cùng. 

![](https://github.com/hellsins/sysadmin_level1/blob/master/Task12_GRUB_Linux/Image/3.png)

Nhấn enter bạn sẽ login vào root và có thể đổi mật khẩu tại đây

Tuy nhiên với những máy không thấy dòng (hoặc có) `advandced options ...` ta có thể nhấn `e` khi vào menu chọn boot và tìm đến dòng `linux...`, sau đó thêm `1` hoặc `single` vào cuối. Nhấn `F10` hoặc `Ctrl X` để login vào và đổi password root

![](https://github.com/hellsins/sysadmin_level1/blob/master/Task12_GRUB_Linux/Image/4.png)

<a name="7"></a>
###7. Đặt mật khẩu cho grub

Chính vì có thể lấy lại mật khẩu như trên nên việc an toàn của hệ thống hầu như không còn nữa. Vì vậy để ngăn chặn điều này ta cần dùng mật khẩu yêu cầu khi muốn vào chế độ `recovery mode`

Đầu tiên ta cần tạo chuỗi password đã bị encode với lệnh `grub-mkpasswd-pbkdf2` như sau

![](https://github.com/hellsins/sysadmin_level1/blob/master/Task12_GRUB_Linux/Image/5.png)

Sau đó copy đoạn hash và thêm đoạn sau vào file /usr/local/etc/grub.d/40_custom

![](https://github.com/hellsins/sysadmin_level1/blob/master/Task12_GRUB_Linux/Image/6.png)

***
#### Tham khảo

[1]. HOW TO SET GRUB2 PASSWORD IN RHEL7/CENTOS 7. https://www.unixmen.com/set-grub2-password-rhel7centos-7/

[2]. SỬ DỤNG GRUB. http://vnoss.org/docs/?id=2

***
