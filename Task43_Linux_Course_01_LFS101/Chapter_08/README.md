
### Finding Linux Documentation

> Thực hiện: Nguyễn Công Trứ

> Cập nhật: 12/06/2017

### Mục lục

- [1. Documentation Sources](#1)

- [2. The man pages](#2)

- [3. GNU Info](#3)

- [4. The --help Option and Help Command  ](#4)

- [5. Other Documentation Sources  ](#5)


***

<a name="1"></a>
### 1. Documentation Sources

Với Linux, cho dù bạn là người dùng thiếu kinh nghiệm hoặc một người hiểu rõ về chúng, bạn sẽ không bao giờ biết (hoặc nhớ) hết việc sử dụng hợp lý các chương trình, tiện ích Linux khác nhau. Tuy nhiên bạn không phải lo vì Linux tích hợp sẵn một nguồn tài liệu lớn trên hệ thống. Ngoài ra còn rất nhiều nguồn tài liệu khác và tất cả chúng có thể là:

- __man page** (tài liệu ngắn trên hệ thống)

- GNU **info**

- Lệnh **help** với option **--help**

- Các nguồn trực tuyến như https://www.gentoo.org/doc/en/ hoặc https://help.ubuntu.com/community/CommunityHelpWiki

<p align="center"><img src="https://github.com/ctnguyenvn/sysadmin_level1/blob/master/Task43_Linux_Course_01_LFS101/Chapter_08/Images/1.png"></p>

<a name="2"></a>
### 2. The man pages

**man pages** là nguồn document phổ biến nhất trên Linux. Nó cung cấp đầy đủ các tài liệu về các chương trình trên hệ thống bao gồm các file cấu hình, các lời gọi hệ thống, các thư viện và cả kernel... Nó có mặt trên tất cả các bản phân phối. **man** là viết tắt của **manual**.

Sử dụng **man [toppic_name]** để xem document về topic mà bạn muốn xem. Tất nhiên bạn có thể sử dụng **man man** để xem document về lệnh **man**. **man** document được giới thiệu lần đầu năm 1970 trên Unix.

**man** pages thường được chuyển thành

- Web pages (See http://man7.org/linux/man-pages/ )

- Published books

- Graphical help

- Other formats

Chương trình **man** tìm kiếm, định dạng và hiển thị thông tin chắ trong **man** pages. Có thể sử dụng với option

- __man -f__: Hiển thị các pages có tham số truyền vào (như khi dùng lệnh **whatis**)

- __man -k__: Hiển thị tất cả các pages có chuỗi như trong tham số truyền vào (như khi dùng lệnh **apropos**)

Các **man pages** thường được chia thành các **chapter** (thường từ 1 đến 9). Ví dụ các lệnh hệ thống thường ở chapter 3x trên các hệ thống **X windows** như sau

	$ man 3 printf
	
	$ man -a printf

<a name="3"></a>
### 3. GNU Info

Về mặt chức năng, hệ thống **GNU Info** gần giống **man**. Tuy nhiên, các topic được kết nối sử dụng liên kết. Thông tin có thể được xem qua giao diện dòng lệnh hoặc một tiện ích đồ họa, hay được in ra hoặc xem trực tuyến.

Khi sử dụng **info** không có tham số thì hệ thống sẽ hiển thị tất cả các document của các topic như trên trình duyệt và ta có thể di chuyển để xem chúng. Tất nhiên nếu có tham số truyền vào thì sẽ là document của topic ấy.

<a name="4"></a>
### 4. The --help Option and Help Command  

Một nguồn document quan trọng khác đó là **--help** hay **-h**. Hầu hết các lệnh đều có option này.

<a name="5"></a>
### 5. Other Documentation Sources  

Hầu hết các bản phân phối đều hỗ trợ đi kèm với nó một bản hướng dẫn bằng đồ họa, nó thường có biểu tượng dấu chấm hỏi. Hoặc có thể sử dụng lệnh sau để khởi động chúng

- GNOME: gnome-help

- KDE: khelpcenter

Tất cả các document này thường được lưu tại `/usr/share/doc`

Một số tài liệu phổ biến qua internet như 

- LinuxCommand.org: http://linuxcommand.org/tlcl.php

- Ubuntu: https://help.ubuntu.com/

- CentOS: https://www.centos.org/docs/

- OpenSUSE: http://en.opensuse.org/Portal:Documentation

- GENTOO: http://www.gentoo.org/doc/en