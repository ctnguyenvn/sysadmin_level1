### Init system

> Tài liệu: Tìm hiểu về init system trên Linux

> Thực hiện: Nguyễn Công trứ

> Cập nhật: 25/11/2016

#### Mục lục

[1. Giới thiệu init system](#1)

[2. Một số hệ thống khởi động (init system) trên Linux](#2)

- [2.1 System V Init](#2.1)

- [2.2 SystemD](#2.2)

- [2.3 Upstart](#2.3)

- [2.4 OpenRC](#2.4)

- [2.5 runit](#2.5)

---

<a name="1"></a>
### 1. Giới thiệu init system

Trước khi nói về hệ thống khởi động (init system) ta tìm hiểu sơ qua về quá trình khởi động của 1 hệ thống (PC).

![](https://github.com/hellsins/sysadmin_level1/blob/master/Task19_Init_System/img/1.png)

- Khi nhấn power on, BIOS (Base In/Out System) sẽ khởi động quá trình POST (Power-on Self-test) máy nhằm kiểm tra các thiết bị phần cứng máy tính đồng thời cũng cho phép thay đổi các thiết lập, cấu hình của nó.

- Nếu POST thành công, BIOS sẽ đọc trong cấu hình của mình để biết khởi động từ thiết bị nào, BIOS sẽ đọc và tải vào RAM sector đầu tiên (MBR - Master Boot Record) của thiết bị khởi động. MBR được tạo khi phân vùng ổ cứng nhưng là sector nằm ngoài các partition này (khác với boot sector - là sector đầu tiên của primary partition)

- Thông thường, MBR làm nhiệm vụ tải boot sector của partition được đánh dấu active vào RAM để thực thi, sau đó boot sector tải boot loader vào RAM. Nhưng với Linux, MBR không làm gì với boot sector của active partition mà nó tải luôn boot loader trên một non-active partition vào RAM. Một chương trình được BIOS đọc từ MBR sẽ làm nhiệm vụ định vị và khởi động boot loader 

- Trên linux có 2 boot loader phổ biến là LILO và Grub. Cả 2 chương trình này đều có chung mục đích: cho phép bạn lựa chọn một trong các hệ điều hành có trên máy tính để khởi động, sau đó chúng sẽ nạp kernel của hệ điều hành đó vào bộ nhớ và chuyển quyền điều khiển máy tính cho kernel này

- Sau đó, GRUB tải nhân Linux và ramdisk vào RAM.

- Nhân Linux sẽ thực thi chương trình init và init sẽ làm các công việc còn lại.

Như vây ta đã biết `init` nằm ở đâu trong quá trình khởi động. Trong các hệ điều hành Linux và các hệ thống Unix, init process (khởi tạo tiến trình) là quá trình được thực hiện bởi nhân lúc khởi động. Nó có process ID là 1 (nó được chạy cho đến khi hệ thống tắt).

Init là process đầu tiên và sau đó nó lại gọi các tiến trình con và cứ thế các tiến trình con gọi các tiến trình khác (như các service), do đó nó là cha của tất cả các tiến trình. Một tiến trình có thể tạo thêm nhiều tiến trình khác, tuy nhiên tiến trình cha không thể chết nếu không các tiến trình con cũng sẽ không còn

Cho đến nay, nhiều hệ thống init đã xuất hiện trong hầu hết các phân phối Linux lớn. Chúng ta sẽ xem qua một số `init system` phổ biến.

<a name="2"></a>
### 2. Một số hệ thống khởi động (init system) trên Linux

<a name="2.1"></a>
#### 2.1 System V Init

System V là một chương trình phổ biến trên Unix/Linux. Đây là hệ thống thương mại đầu tiên do Unix tạo ra. Đầu tiên hầu hết các bản Linux đều sử dụng chương trình system V init trừ Gentoo (tùy chỉnh init) và Slackware (sử dụng init BSD)

System V init hoạt động dựa trên các `runlevels` (trạng thái của máy tính tương ứng với một tập các tiến trình đang được thực thi nào đó). Có 7 `runlevels` được đánh số từ 0-6 (thực tế có nhiều hơn nhưng chúng được cho là các trường hợp đặc biệt và thường không sử dụng). Với mỗi `runlevels` sẽ tương ứng với những hành động khác nhau khi khởi động hệ thống.

- __0__: halt the computer (tắt máy tính)
- __1__: single-user mode (đăng nhập với 1 user)
- __2__: multi-user mode without networking (đăng nhập với nhiều user nhưng không có NFS - Network File System)
- __3__: multi-user mode with networking (dăng nhập với nhiều user và khởi động network)
- __4__: Chưa sử dụng
- __5__: Đăng nhập sử dụng giao diện (GUI)
- __6__: reboot the computer (khởi động lại máy tính)

Để thay đổi các `runlevels` chúng ta sử dụng 

- **init [runlevels]**

Sau khi kernel được khởi chạy, nó sẽ gọi chương trình `init` và chương trình này sẽ tìm đến file **/etc/inittab** để xác định runlevel (thông qua biến initdefault). Khi xác định được runlevel thì nó sẽ sẽ chạy các script khởi động cũng như kill các tiếng trình hay dịch vụ trong file cấu hình

Tất cả các script trong system V init đều nằm ở thư mục **/etc/rc.d/init.d/** hoặc **/etc/init.d**

![](https://github.com/hellsins/sysadmin_level1/blob/master/Task19_Init_System/img/2.png)

![](https://github.com/hellsins/sysadmin_level1/blob/master/Task19_Init_System/img/3.png)

Chúng ta có thể khởi động các dịch vụ này với lệnh

- **# /etc/init.d/httpd start**

	hoặc 

- **# /etc/init.d/network restart**

Chúng ta có thể sử dụng các command **service** và **chkconfig** như sau

- **service [tên_dịch_vụ] [start | stop | restart | reload | status condrestart]**

>	Lệnh này start, stop, restart,.. các dịch vụ

- **chkconfig [tên_dịch_vụ] [on | off | --add]**

> 	Khác với **service** lệnh này cho phép enable, disable,... các dịch vụ khi khởi động hệ thống (trong các `runlevels`)

> Lưu ý: 

> 	- Bạn chỉ sử dụng 1 tùy chọn trong option thứ 2 phía trên

>	- Bạn có thể mở rộng lệnh trên ví dụ như muốn mở dịch vụ bất kỳ khi đăng nhập vào `runlevels` 1, 2, 3, bạn sử dụng lệnh sau

>		**chkconfig [tên_dịch_vụ] --level 123 on**

>	- Bạn có thể xem danh sách chkconfig với lệnh 

>		**chkconfig --list**

Đối với system V thì được phát triển từ Unix nên tương thích không chỉ Unix mà hầu hết các bản phân phối của Linux, solaris và hầu hết các hệ thống khác. Tuy nhiên system V sử dụng các `runlevels`khởi động các dịch vụ. Như đã nói ở trên init sẽ chạy các dịch vụ (script) trong folder **/etc/rc.d/init.d/** hoặc **/etc/init.d**. Các dịch vụ sẽ được chạy từ thấp đến cao theo thứ tự (kể cả các dịch vụ bắt đầu bằng S (start) hay K (kill)) nên dẫn đến việc khởi động hệ thống sẽ có phần chậm trễ hơn so với các hệ thống init hiện nay.

<a name="2.2"></a>
#### 2.2 SystemD

Systemd là một chương trình init tương đối mới trên nền tảng Linux. Được giới thiệu vào Fedora 15, nó là tập hợp các công cụ để quản lý hệ thống dễ dàng. Mục đích chính là để khởi tạo, quản lý và theo dõi tất cả các tiến trình kể từ khi hệ thống khởi động.

Systemd init hoàn toàn khác biệt với các hệ thống truyền thống của Unix trong việc tiếp cận quản lý hệ thống va dịch vụ, tuy nhiên nó cũng tương thích với System V và LBS init script

Systemd cũng tương tự như system V init ở giai đoạn đầu, tuy nhiên thay vì sử dụng khái niệm `runlevels` thì systemd thay thế bằng các `targets` để boot vào hệ thống. Tương tự thì với mỗi `targets` khác nhau sẽ tương ứng các hành động đăng nhập vào hệ thống khác nhau

- poweroff.target – shutdown system (tắt hệ thống)

- rescue.target – single user mode (đăng nhập với 1 user)

- multi-user.target – multiuser with networking (đăng nhập với nhiều user kèm theo network)

- graphical.target – multiuser with networking and GUI (đăng nhập với giao diện đồ họa - GUI)

- reboot.target – restart (khởi động lại hệ thống)

Để thay đổi các `targets` ta có thể sử dụng **systemctl** với cú pháp sau

- **systemctl  isolate  [name_target].target**

	hoặc thay đổi default target như sau

- **systemctl set-default [name_target].target**

> Bạn có thể xem `targets` hiện tại với lệnh **systemctl get-default** 

Khi systemd bắt đầu nó start các daemons tại cùng một thời gian và chạy chúng song song với nhau, điều đó nó nhanh hơn. Systemd sử dụng các socket để làm điều đó, nó sử dụng dụng socket cho tất cả các dịch vụ. Nó thiết lập socket cho daemon và phối giữa họ khi họ bắt đầu lên. Vì vậy, khi một daemon yêu cầu hỗ trợ từ daemon khác, systemd phối hợp các dữ liệu từ socket của họ. Ví dụ, daemon A bắt đầu và nó cần daemon B để hoạt động; tuy nhiên, daemon B chưa bắt đầu. Lúc này, systemd viết yêu cầu daemon A tới socket daemon B (đệm) và nó tiếp tục. Vì vậy daemon A không cần phải chờ đợi cho daemon B. Ngay khi daemon B bắt đầu, nó sẽ đọc socket của nó. Điều này có nghĩa là xử lý song song và hệ thống khởi động rất nhanh. Việc kích hoạt socket được thiết kế bởi hệ điều hành OS X của Apple.

Tất cả các script này nằm trong folder **/usr/lib/systemd/system/** và **/etc/systemd/system/**

Đối với system V thì sử dụng **service** còn với systemd ta sẽ dùng **systemctl** như sau

- **systemctl  [start | stop | restart | status | enable | disable | daemon-reload | mask | unmask | is-enable | help]  [tên_dịch_vụ.service]**

>Các tùy chọn đều giống như system V trừ **mask** (ngăn chặn dịch vụ khởi động) và **is-enable** (kiểm tra dịch vụ đã được kích hoạt hay không). Ngoài ra còn nhiều option khác.

> Lưu ý: 

> 	- **start** và **enable** khác nhau, **start** là khởi động dịch vụ (ở phiên đăng nhập hiện tại) còn **enable** là khởi động dịch vụ lúc khởi động máy tính

> 	- **chkconfig** và **service** đều có thể sử dụng trên systemd tương ứng như sau

>		+ **systemctl [option] [tên_dịch_vụ]**

> 		+ **service [tên_dịch_vụ] [option]**

>		hoặc

>		+ **systemctl [option] [tên_dịch_vụ]**

>		+ **chkconfig [tên_dịch_vụ] [option]**

>		với **chkconfig** thì `enable` ứng với `on` và `disable` ứng với `off`

Systemd ngày càng phổ biến và chúng được sử dụng rộng rãi trên các hệ thống Linux như Fedora, Arch linux, CentOS, Debian. openSUSE, Red Hat, ubuntu,... bởi 1 số đặc điểm nổi bật như 

- Thiết kế đơn giản, hiệu quả

- Xử lý đồng thời và song song khi khởi động làm chúng nhanh hơn

- Cho phép loại bỏ các quy trình bắt buộc

- Hỗ trợ lập lịch công việc sử dụng systemd calender timers

- Lưu các logs vào file nhị phân

- Tích hợp tốt hơn với Gnome

[script systemd](https://www.freedesktop.org/software/systemd/man/systemd.service.html)

<a name="2.3"></a>
#### 2.3 Upstart

<a name="2.4"></a>
#### 2.4 OpenRC

<a name="2.5"></a>
#### 2.5 runit

