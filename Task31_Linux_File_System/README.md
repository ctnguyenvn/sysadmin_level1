
### Linux File System

> Tài liệu: Tìm hiểu về hệ thống file Linux

> Thực hiện: Nguyễn Công Trứ

> Cập nhật: 18/02/2017

### Mục lục

- [1. Cấu trúc ổ đĩa](#1)

- [2. Các loại file system trên hệ thống Linux](#2)

- [3. Cấu trúc cây thư mục](#3)

- [4. Sử dụng Fdisk cơ bản](#4)

***

<a name="1"></a>
### 1. Cấu trúc ổ đĩa

Trên hệ thống Linux, với từng loại các thiết bị lưu trữ như đĩa cứng, CD, USB... mà sẽ có các ký hiệu hay đơn giản là cách đặt tên khác nhau

- Với đĩa IDE, EIDE thì sẽ là `/dev/hd[drive][partition]` 

- Với đĩa SCSI thì sẽ là `/dev/sd[drive][partition]`

- Với đĩa CD-ROM SCSI thì sẽ là `/dev/scd0` hoặc `/dev/sr0`

> Important: Với `drive` thì sẽ được ký hiệu như sau: Với đĩa đầu tiên `drive` là `a` cho `primary disk` và `b` cho `slave`, `c` cho `primary secondary disk` và `d` cho `slave secondary`. Tiếp sau đó là `partition` sẽ là giá trị tương ứng với các `partition` trên mỗi đĩa

Ví dụ bạn sử dụng dĩa SCSI, đĩa thứ nhất sẽ là `/dev/sda`. Sau đó bạn tạo thêm 3 phân vùng thì sẽ là `/dev/sda1`, `/dev/sda2` và `/dev/sda3`. Cuối cùng mount vào cây thư mục tùy chỉnh mà bạn muốn.

<a name="2"></a>
### 2. Các loại file system trên hệ thống Linux

Trên hệ thống Linux có nhiều loại file system khác nhau. Tuy nhiên trước khi tìm hiểu về chúng, ta sẽ sơ lược về `hệ thống file nhật ký`.

Hệ thống file nhật ký là hệ thống file tự chữa lỗi (ví dụ như ngắt điện đột ngột) bằng cách dùng 1 file nhật ký làm vùng đệm lưu lại mọi thay đổi trước khi thay đổi đó được thực hiện thật sự vào hệ thống file.

Có 3 kiểu thường dùng nhất là:

- __writeback__: Chỉ các metadata được lưu nhật ký còn các block dữ liệu được ghi thẳng vào vị trí của nó trên ổ cứng

- __ordered__: Trước tiên dữ liệu phải được ghi xong vào ổ cứng rồi sau đó metadata mới được lưu vào nhật ký

- __data__: cả metadata và dữ liệu đều được ghi trước vào file nhật ký rồi mới cập nhật vào ổ cứng

> Lưu ý: Metadata của hệ thống gồm các thông tin về cấu trúc dữ liệu trên ổ cứng: ngày giờ tạo, xoá file và thư mục, tăng giảm dung lượng file, chủ nhân của file, …

Một số hệ thống file hiện nay:

- __JFS2__: Là hệ thống file nhật ký đầu tiên, dùng kiểu ghi `ordered` ở mức nhỏ hơn giây. JFS2 cũng dùng cách ghép các block thành từng nhóm liên tục (gọi là một extent) trong bộ nhớ trước khi ghi vào ổ cứng, do đó tốc độ ghi và đọc nhanh hơn và cũng giảm được lượng metadata cần quản lý. JFS2 không ghi nhật ký vào ổ cứng riêng mà dựa vào thời gian hết hạn (timeout) của kupdate daemon.

- __XFS__: XFS cũng là hệ thống file nhật ký 64-bit có tốc độ rất cao. Một tính năng đáng chú ý khác là XFS có tốc độ I/O cố định dành riêng và I/O trực tiếp: dữ liệu được copy trực tiếp giữa ổ cứng và vùng đệm (không phải qua nhiều vùng đệm khác nhau). XFS dùng kiều ghi nhật ký writeback.

- __EXT3 (Third extended file system – ext3fs)__: Ext3 là hệ thống file nhật ký phổ biến hiện nay và là cuộc cách mạng từ ext2.  Ext3 có thể dùng cả ba kiểu nhật ký (writeback, ordered và data) nhưng mặc định là ordered. Chính sách ghi vào ổ cứng có thể cấu hình được, mặc định là khi đầy ¼ nhật ký hoặc timeout của một trong những bộ đếm thời gian.

- __ReiserFS__: ReiserFS là hệ thống file nhật ký được phát triển từ đầu nhằm vào nhật ký. Kiểu ghi nhật ký mặc định là ordered và cho phép resize online để tăng dung lượng partition

- __Reiser4__: Sau khi ReiserFS được tích hợp thành công vào nhân Linux và được nhiều bản Linux chấp nhận, Namesys (công ty đứng đằng sau ReiserFS) tiếp tục xây dựng một hệ thống file nhật ký mới Reiser4. Reiser4 được thiết kế từ đầu như một hệ thống file nhật ký mới với nhiều tính năng tiên tiến.

- __EXT4 (Fourth extended file system – ext4fs)__: Hệ thống file nhật ký mở rộng thứ tư (ext4) là sự phát triển của ext3, ext4 là hệ thống file 64-bit được thiết kế để hỗ trợ các dung lượng rất lớn. Nói chung hiện nay EXT4 hiện là phiên bản ổn định nhất và nó được khuyên dùng vì những ưu điểm cũng như dặc điểm nổi bật mà nó mang lại.

<a name="3"></a>
### 3. Cấu trúc cây thư mục

Không giống như window, Linux tổ chức các thư mục hệ thống theo sơ đồ cây rẽ nhánh như hình sau:

![](https://github.com/hellsins/sysadmin_level1/blob/master/Task31_Linux_File_System/Image/1.png)


__1. / – Thư mục gốc__

- Đây là gốc của mọi file , thư mục trong hệ thống, và chỉ người dùng root mới có quyền ghi trong thư mục này.

- Lưu ý: rằng thư mục /root là thư mục của người dùng root chứ không phải là thư mục /.

__2. /bin – Các tập tin thực thi của người dùng__

- Thư mục này chứa các chương trình thực thi, các lệnh thường dùng. Các chương trình chung của Linux được sử dụng bởi tất cả người dùng

- ví dụ: ps, ls, ping, grep, cp...

__3. /sbin – Các tập tin thực thi của hệ thống__

- Cũng giống như /bin, /sbin cũng chứa các chương trình thực thi, nhưng chúng là những chương trình của admin, dành cho việc bảo trì hệ thống.

- Ví dụ: iptables, reboot, fdisk, ifconfig, swapon...

__4. /etc – Các tập tin cấu hình__

- Thư mục này chứa các file cấu hình của các chương trình, đồng thời nó còn chứa các shell script dùng để khởi động hoặc tắt các chương trình khác.

- Ví dụ: /etc/resolv.conf, /etc/logrotate.conf

__5. /dev – Các tập tin thiết bị__

- Chứa các phân vùng ổ cứng, thiết bị ngoại vi như USB, ổ đĩa cắm ngoài, hay bất cứ thiết bị nào gắn kèm vào hệ thống

- Ví dụ: /dev/tty1, /dev/usbmon0

__6. /proc – Thông tin tiến trình__

- Thông tin về các tiến trình đang chạy sẽ được lưu trong /proc dưới dạng một hệ thống file thư mục mô phỏng

- Ví dụ: thư mục con /proc/{pid} chứa các thông tin về tiến trình có ID là pid (pid ~ process ID). Ngoài ra đây cũng là nơi lưu thông tin về về các tài nguyên đang sử dụng của hệ thống như: /proc/version, /proc/uptime…

__7. /var – Các tập tin biến đổi__

- var là viết tắt của các tập tin biến đổi. Gồm những tập tin mà dung lượng lớn dần theo thời gian sử dụng.

- Ví dự Như thông tin về log file: /var/log, các gói và cơ sở dữ liệu /var/lib…

__8. /tmp – Thư mục chứa các tập tin tạm__

- Thư mục này chứa các file tạm thời được tạo bởi hệ thống và các người dùng. Các file lưu trong thư mục này sẽ bị xóa khi hệ thống khởi động lại.

__9. /usr – Các chương trình của người dùng__

- Tập trung các tập tin thực thi, thư viện, tài liệu, và mã nguồn cho các chương trình mức độ thứ hai.
	
	+ /usr/bin chứa các tập tin thực thi cho các chương trình của người dùng. Nếu bạn không thể tìm thấy trong thư mục /bin thì tìm trong /usr/bin. Ví dụ: at, awk, cc, less, scp

	+ /usr/sbin chứa các tập tin thực thi cho quản trị hệ thống. Nếu bạn không thể tìm thấy trong /sbin thì tìm trong /usr/sbin. Ví dụ: atd, cron, sshd, useradd, userdel

	+ /usr/lib chứa các tập tin thư viện /usr/bin và /usr/sbin

	+ /usr/local chứa các chương trình của người dùng mà bạn cài từ mã nguồn. Ví dụ, khi bạn cài Apache từ mã nguồn, nó được đưa vào thư mục /usr/local/apache2

__10. /home – Thư mục người dùng__

- Chứa các tập tin của các người dùng trong hệ thống.

- Ví dụ: /home/hellsins

__11. /boot – Các tập tin của chương trình khởi động máy__

- Chứa tất cả các file yêu cầu khi khởi động như initrd, vmlinux. grub

- Ví dụ: initrd.img-2.6.32-24-generic, vmlinuz-2.6.32-24-generic

__12. /lib – Các tập tin thư viện của hệ thống__

- Chứa các thư viện hỗ trợ cho các file thực thi trong /bin và /sbin. Các thư viện này thường có tên bắt đầu bằng ld* hoặc lib*.so.*.

- Ví dụ: ld-2.11.1.so, libncurses.so.5.7

__13. /opt – Các ứng dụng tùy chọn hay thêm__

-  Chứa các ứng dụng thêm vào từ các nhà cung cấp độc lập khác có thể do người dùng cài đặt. Các ứng dụng này có thể được cài ở /opt hoặc một thư mục con của /opt.

__14. /mnt – Thư mục Mount__

- Đây là thư mục tạm để mount các file hệ thống.

__15. /media – Các thiết bị tháo lắp__

- Thư mục tạm này chứa các thiết bị như CdRom /media/cdrom.

- Ví dụ: /medica/cdrom cho CD-ROM

__16. /srv – Dữ liệu dịch vụ__

- srv là viết tắt của service. Chứa dữ liệu liên quan tới các dịch vụ trên máy chủ.

- Ví dụ: /srv/cvs chứa dữ liệu liên quan tới CVS.

<a name="4"></a>
### 4. Sử dụng Fdisk cơ bản

Trên Linux, fdisk là 1 chương trình mạnh mẽ dùng để xem và quản lý các phân vùng ổ cứng.

> Lưu ý: `fdisk` cần quyền root để hoạt động

- Để xem danh sách các phân vùng

	sudo fdisk -l

> Có thể chọn phân vùng với `sudo fdisk -l [phân_vùng]`

-  Không chỉnh sửa các phân vùng trong khi chúng đang được sử dụng. Để làm được điều này, hãy khởi động từ Live CD hoặc USB

- Fdisk sử dụng chế độ dòng lệnh để làm việc, ta sẽ sử dụng các lệnh 1 chữ cái để xác định hành động cần thực hiện. Gõ “m” và ấn Enter để xem danh sách các lệnh sẵn có.

![](https://github.com/hellsins/sysadmin_level1/blob/master/Task31_Linux_File_System/Image/2.png)

Trong đó 1 số option thường dùng như:

- __p__ In ra các partition đã chia

- __n__ Tạo mới partition: 

	+ Bạn sẽ có hai tùy chọn, tạo phân vùng logic (gõ “l“) hoặc phân vùng primary (gõ “p“). Lưu ý rằng, một ổ đĩa chỉ có tối đa 4 phân vùng primary.

	+ Tiếp theo, xác định sector mà bạn muốn bắt đầu phân vùng. Ấn Enter để chấp nhận thiết lập mặc định.

	+ Cuối cùng, xác định sector cuối của phân vùng. Ấn Enter để chấp nhật sử dụng hết phần ổ đĩa còn trống. Thay vì chỉ định sector, bạn có thể chỉ định kích thước, chữ viết tắt tương ứng: K – Kilobyte, M – Megabyte và G – Gigabyte. Ví dụ, gõ “+5G” cho phân vùng với kích thước 5 Gigabyte. Nếu bạn không gõ đơn vị sau dấu “+”, fdisk sẽ lựa chọn sector làm đơn vị. Ví dụ, nếu bạn gõ “+10000”, fdisk sẽ cộng thêm 10000 sector để làm điểm kết thúc của phân vùng.
	
	![](https://github.com/hellsins/sysadmin_level1/blob/master/Task31_Linux_File_System/Image/3.png)
 
- __d__ Xoá partition. Sau khi nhấn d thì bạn sẽ được lựa chọn phân vùng để xóa.

- __t__ Thay đổi loại phân vùng. Sau khi gõ t bạn sẽ được yêu cầu nhập mã hex của loại phân vùng (có thể nhấn L để xem mã hex của từng phân vùng)

- __q__ Thoát khỏi fdisk mà không lưu

- __w__ Lưu những gì đã thực hiện và thoát

> Lưu ý: Sau khi đã tạo partition thì hệ thống file vẫn chưa được sẵn sàng cho việc sử dụng mà phải format chúng với `mkfs` mới được xem là hoàn tất. Ví dụ: `sudo mkfs.ext4 /dev/sda4`

--- 
### # Tham khảo

[1] File System and Disk Administration trong UNIX. https://voer.edu.vn/m/file-system-and-disk-administration-trong-unix/bdb328f6

[2] Cách đặt tên ổ đĩa và cấu trúc thư mục của Linux. http://echip.pro/2016/10/02/cach-dat-ten-o-dia-va-cau-truc-thu-muc-cua-linux/

[3] CÁC HỆ THỐNG FILE CỦA LINUX. http://www.gocit.vn/bai-viet/cac-he-thong-file-cua-linux/

[4] Cơ bản cấu trúc thư mục trong Linux. https://wiki.matbao.net/Co-ban-cau-truc-thu-muc-trong-Linux.ashx

[5] Cách đặt tên ổ đĩa và cấu trúc thư mục của Linux. http://echip.pro/2016/10/02/cach-dat-ten-o-dia-va-cau-truc-thu-muc-cua-linux/

[6] Quản lý phân vùng ổ cứng trên Linux bằng Fdisk. https://studylinux.wordpress.com/2012/02/28/qu%E1%BA%A3n-ly-phan-vung-%E1%BB%95-c%E1%BB%A9ng-tren-linux-b%E1%BA%B1ng-fdisk/

---
