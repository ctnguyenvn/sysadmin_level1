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

--------

<a name="1"></a>
### 1. Giới thiệu init system

Trước khi nói về hệ thống khởi động (init system) ta tìm hiểu sơ qua về quá trình khởi động của 1 hệ thống (PC). 

![](https://github.com/ctnguyenvn/sysadmin_level1/blob/master/Task19_Init_System/img/1.png))

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

![](https://github.com/ctnguyenvn/sysadmin_level1/blob/master/Task19_Init_System/img/2.png)

![](https://github.com/ctnguyenvn/sysadmin_level1/blob/master/Task19_Init_System/img/3.png)

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

[Xem thêm script systemd](https://www.freedesktop.org/software/systemd/man/systemd.service.html)

<a name="2.3"></a>
#### 2.3 Upstart

Upstart là một hệ thống init dựa trên phát triển bởi các nhà sản xuất của Ubuntu như một thay thế cho hệ thống system V. Nó bắt đầu các nhiệm vụ và tiếng trình hệ thống khác nhau, kiểm tra chúng trong khi hệ thống đang chạy và dừng chúng khi hệ thống shutdown. Upstart là một hệ thống init trong đó sử dụng cả 2 script system V và systemd

Upstart dựa trên nguyên tắc sự kiện (event) và hoạt động không đồng bộ. Nó quản lý start và stop các dịch vụ để bắt đầu hoặc kết thúc hoặc giám sát hoạt động của hệ thống. Hầu hết các dịch vụ vẫn thực thi với các từ khóa và start và stop script được chạy bởi RCX. d (vì lý do tương thích ...). Các khái niệm về cấp độ (runlevel) init vẫn còn hiện diện, mặc dù nó được quản lý bởi các khái niệm của event. 

Nguyên tắc hoạt động của Upstart dựa vào `event`. Dịch vụ này được bắt đầu hoặc dừng lại khi nhận được 1 event nào đó. Hành động này sẽ thông báo sự kiện này cho các dịch vụ khác, các program hay tiến trình khác

Đối với Upstart chúng ta có thêm 1 khái niệm nữa đó là `jobs`. Với system V init sử dụng runlevel based system (runlevel 0-6)và không phản ứng kịp thời đối với các sự kiện của hệ thống như hot plug, cắm USB, Projector,... Vì vậy với cơ chế mềm dẻo hơn để kích hoạt các dịch vụ với `event based system` sẽ kích hoạt các `jobs` tùy thuộc vào sự kiện phát sinh.

jobs (công việc) là

- Một chuỗi các lệnh mà Upstart init read

- Các lệnh này bao gồm các tập tin thực thi hoặc các
tập tin dạng script

-  Là một tác vụ (task) hoặc một dịch vụ (service)

- Được init kích hoạt khi một sự kiện nào đó phát sinh

- Được định nghĩa trong các files (mô tả lệnh và sự
kiện kích hoạt ) nằm trong thư mục /etc/event.d

- Mặc định có các jobs tương ứng với các scripts thực
thi ở các runlevel khác nhau của SysV init 

Tất cả các file `job` là một exec hoặc một script. Điều này chỉ ra rằng nó sẽ được chạy như `job`. exec nhận đường dẫn tới file nhị phân trên hệ thống và đối số để thực thi nó, bất kỳ một ký tự đặc biệt sẽ trả về kết quả thông qua shell để giai thích thay thế

	exec /bin/foo --opt -xyz foo bar

Script sẽ thay thế shell script code và thực thi sử dụng `/sbin/sh`. Tùy chọn `-e` được sử dụng, vì vậy bất kỳ lệnh nào thất bại sẽ kết thúc script. cú pháp của 1 đoạn script phải kết thúc bằng `end script` như

```sh
script 
	# do some here
end script   # bắt buộc
```
Mã shell bổ sung có thể được đưa ra để được chạy trước hoặc sau khi script quy định với exec hoặc script . Đây không phải là dự kiến sẽ start quá trình này, trên thực tế, nó không thể. Chúng được sử dụng để chuẩn bị môi trường và làm sạch sau đó.

pre-start script chỉ định mã shell để chạy trước khi quá trình chính, như với script bất kỳ lệnh nào sẽ không chấm dứt các kịch bản và nó được chấm dứt với " end script "

```sh
 pre-start script
     # prepare environment
     mkdir -p /var/run/foo
 end script
 ```

post-stop script định mã shell để chạy sau khi quá trình chính kết thúc hoặc bị giết, như với script và post-start script bất kỳ lệnh nào sẽ không chấm dứt các kịch bản và nó được chấm dứt với " end script "

```sh
 post-stop script
     # clean up
     rm -rf /var/run/foo
 end script
```

Bạn có thể chỉnh bằng tay các công việc trên, tuy nhiên bạn có thể enable nó khi khởi động hệ thống khi thêm 1 số lệnh sau vào script của mình

```sh
start on startup  	# start khi khởi động

start on runlevel            	#start khi vào runlevel [23]] 

start on stopped rcS    	#start khi shutdown RCS] 

start on started tty1      	#start khi vào tty1
```

Đối với hệ thống Upstart thì nó dử dụng initctl để quản trị trực tiếp giao tiếp với hệ thống cũng như quản lý các event, job ở phiên làm việc hiện tại (như systemctl hay service)

- Để liệt kê các jobs 

	`# initctl list`

- Để start/stop 1 jobs

	`# initctl [start | stop | status | restart | reload | help] [job-name]`

> 	Lưu ý có thể dùng `service` để thực hiện các công việc trên

Upstart ngày càng mở rộng, được sử dụng trên Ubuntu, Debian, Fedora, Red Hat Enterprise Linux, CentOS, Oracle Linux, OpenSUSE .Một số điều đáng chú ý ở Upstart là

- Được phát triển trên ubuntu nhưng tương thích với hầu hết các hệ thống Linux khác

- Sử lí các event tốt với cơ chế sử dụng các jobs 

- Người dùng có thẻ dể quản lý các tiến trình của họ

- Khôi phục các dịch vụ die đột ngột

Tuy nhiên Upstart init là một init system mới nên có thể một số dịch vụ vẫn còn quản lý theo mô hình system V init, ví dụ như Apache2,... nên việc chuyển đổi đôi khi gặp nhiều vấn đề.

[Xem thông tin đầy đủ hơn tại đây](http://upstart.ubuntu.com/cookbook)

<a name="2.4"></a>
#### 2.4 OpenRC

<a name="2.5"></a>
#### 2.5 runit

