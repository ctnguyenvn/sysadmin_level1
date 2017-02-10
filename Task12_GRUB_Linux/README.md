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

- __*_stage1_5__: Giai đoạn 1.5

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

- Vì Grub hỗ trợ cả chế độ CHS lẫ LBA nên giai đoạn 1 trong Grub, sau khi thăm dò thông số và chế độ truy cập  của ổ cứng, chỉ tải sector đầu tiên của giai đoạn 2 (hoặc giai đoạn 1.5) và giai đoạn 2 sẽ tự tải phần còn lại (tức là vị trí từ địa chỉ bắt đầu của nó thêm 512byte)

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
	
