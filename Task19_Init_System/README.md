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

- Khi nhấn power on, BIOS (Base In/Out System) sẽ khởi động quá trình POST (Power-on Self-test) máy nhằm kiểm tra các thiết bị phần cứng máy tính đồng thời cũng cho phép thay đổi các thiết lập, cấu hình của nó.

- Nếu POST thành công, BIOS sẽ đọc trong cấu hình của mình để biết khởi động từ thiết bị nào, BIOS sẽ đọc và tải vào RAM sector đầu tiên (MBR - Master Boot Record) của thiết bị khởi động. MBR được tạo khi phân vùng ổ cứng nhưng là sector nằm ngoài các partition này (khác với boot sector - là sector đầu tiên của primary partition)

- Thông thường, MBR làm nhiệm vụ tải boot sector của partition được đánh dấu active vào RAM để thực thi, sau đó boot sector tải boot loader vào RAM. Nhưng với Linux, MBR không làm gì với boot sector của active partition mà nó tải luôn boot loader trên một non-active partition vào RAM. Một chương trình được BIOS đọc từ MBR sẽ làm nhiệm vụ định vị và khởi động boot loader 

- Trên linux có 2 boot loader phổ biến là LILO và Grub. Cả 2 chương trình này đều có chung mục đích: cho phép bạn lựa chọn một trong các hệ điều hành có trên máy tính để khởi động, sau đó chúng sẽ nạp kernel của hệ điều hành đó vào bộ nhớ và chuyển quyền điều khiển máy tính cho kernel này

- Sau đó, GRUB tải nhân Linux và ramdisk vào RAM.

- Nhân Linux sẽ thực thi chương trình init và init sẽ làm các công việc còn lại.

![](https://github.com/hellsins/sysadmin_level1/blob/master/Task19_Init_System/img/1.png))

Như vây ta đã biết `init` nằm ở đâu trong quá trình khởi động. Trong các hệ điều hành Linux và các hệ thống Unix, init process (khởi tạo tiến trình) là quá trình được thực hiện bởi nhân lúc khởi động. Nó có process ID là 1 (nó được chạy cho đến khi hệ thống tắt).

Init là process đầu tiên và sau đó nó lại gọi các tiến trình con và cứ thế các tiến trình con gọi các tiến trình khác (như các service), do đó nó là cha của tất cả các tiến trình. Một tiến trình có thể tạo thêm nhiều tiến trình khác, tuy nhiên tiến trình cha không thể chết nếu không các tiến trình con cũng sẽ không còn

Cho đến nay, nhiều hệ thống init đã xuất hiện trong hầu hết các phân phối Linux lớn. Chúng ta sẽ xem qua một số `init system` phổ biến.

<a name="2"></a>
### 2. Một số hệ thống khởi động (init system) trên Linux

<a name="2.1"></a>
#### 2.1 System V Init

<a name="2.2"></a>
#### 2.2 SystemD

<a name="2.3"></a>
#### 2.3 Upstart

<a name="2.4"></a>
#### 2.4 OpenRC

<a name="2.5"></a>
#### 2.5 runit

