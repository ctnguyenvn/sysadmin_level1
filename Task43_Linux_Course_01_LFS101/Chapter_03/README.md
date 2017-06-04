
### Linux Basics and System Startup

> Thực hiện: Nguyễn Công Trứ

> Cập nhật: 04/06/2017

- [1 The Boot Process](#1)

	+ [1.1 BIOS: ](#1.1)

	+ [1.2 Master Boot Record (MBR):](#1.2)

	+ [1.3 Boot Loader:](#1.3)

	+ [1.4 Initial RAM Disk:](#1.4)

	+ [1.5 Text-Mode Login](#1.5)

- [2  Kernel, init and Services](#2)
	
	+ [2.1 The Linux Kernel](#2.1)
	
	+ [2.2 /sbin/init and Services](#2.2)

- [3 Linux Filesystems](#3)

	+ [3.1 Filesystem Hierarchy Standard](#3.1)

- [4 Linux Distribution Installation](#4)

	+ [4.1 Cài đặt openSUSE-LEAP-42 trên VMware ](#4.1)
***

<a name="1"></a>
### 1. The Boot Process

__Boot process__ là quá trình khởi động máy tính, quá trình từ khi nhấn nút nguồn **power** đến khi xuất hiện giao diện interface.

<p align="center"><img src="/home/sins/MEGA/sysadmin_level1/Task43_Linux_Course_01_LFS101/Chapter_03/Images/1.jpg"></p>

<a name="1.1"></a>
#### 1.1 BIOS: 

<p align="center"><img src="/home/sins/MEGA/sysadmin_level1/Task43_Linux_Course_01_LFS101/Chapter_03/Images/2.png"></p>

Bắt đầu trên nền tảng hệ thống linux **x86**. Khi ta nhấn nút nguồn, **BIOS** (Basic Input/Output System) sẽ thực hiện công việc gọi là **POST** (Power On Self Test) để kiểm tra trạng thái cũng như tính sẵn sàng của phần cứng bao gồm màn hình, bàn phím và kiểm tra bộ nhớ chính CPU. **BIOS** được lưu trên ROM. Sau khi thực hiện **POST** xong, quyền điều khiển sẽ được giao lại cho hệ điều hành.

<a name="1.2"></a>
#### 1.2 Master Boot Record (MBR):

<p align="center"><img src="/home/sins/MEGA/sysadmin_level1/Task43_Linux_Course_01_LFS101/Chapter_03/Images/3.png"></p>

Nếu quá trình **POST** thành công, quyền điều khiển của **BIOS** sẽ được chuyển cho **boot loader**. **Boot loader** thường được lưu trữ trên một trong các phân vùng trên hệ thống. Có thể trên các boot sector (đối với các hệ thống BIOS/MBR) hoặc phân vùng EFI (Extensible Firmware Interface hoặc hệ thống EFI/UEFI). Ở giai đoạn này, máy không truy cập vào bất kỳ phương tiện lưu trữ nào. Sau đó thông tin về ngày tháng, thời gian, và các thiết bị ngoại vi quan trọng nhất được nạp vào các giá trị CMOS.

<a name="1.3"></a>
#### 1.3 Boot Loader:

<p align="center"><img src="/home/sins/MEGA/sysadmin_level1/Task43_Linux_Course_01_LFS101/Chapter_03/Images/4.png"></p>

Một số boot loader tồn tại trên Linux, phổ biến nhất là GRUB (GRand Unified Boot), ISOLINUX và DAS U-Boot. Hầu hết các boot loader đều hỗ trợ giao diện cho người dùng cho phép chọn hệ điều hành khi load. Khi khởi động Linux, boot loader làm nhiệm vụ tải kernel image và initial RAM hoặc filesystem (chứa một số tệp quan trọng và trình điều khiển thiết bị cần thiết để khởi động hệ thống) vào bộ nhớ.

Quá trình boot loader trải qua 2 phần

- __First Stage__:

	+ Đối với hệ thống sử dụng BIOS/MBR, boot loader nằm ở sector đầu tiên của ổ cứng, được gọi là MBR. Kích thước của MBR thường là 512 byte. Ở giai đoạn này boot loader kiểm tra các phân vùng và tìm phân vùng khởi động. Khi tìm thấy, nó sẽ tìm kiếm stage thứ 2, ví dụ như GRUB và nạp nó vào RAM (Random Access Memory).

	+ Đối với hệ thống sử dụng EFI/UEFI, UEFI firmware đọc dữ liệu boot manager của nó để xác định ứng dụng UEFI nào sẽ được khởi động và bắt đầu từ đâu. Firmware sau đó sẽ chạy ứng dụng UEFI.

- __Second Stage__:

	+ Ở phần này, chương trình được lưu ở `/boot`. Một mà hình gọi là `splash screen` sẽ hiện ra và cho phép chọn hệ điều hành để khởi động. Sau khi chọn hệ điều hành, boot loader sẽ tải kernel của hệ thống được chọn vào RAM và trao quyền điều khiển cho nó. 

	+ Kernel thường luôn được nén, vì vậy công việc đầu tiên sau khi nhận được quyền điều khiển là tự giải nén bản thân. Sau đó nó sẽ kiểm tra và phân tích hệ thống phần cứng và khởi tạo bất kỳ trình điều khiển thiết bị phần cứng nào được xây dựng vào kernel.

<a name="1.4"></a>
#### 1.4 Initial RAM Disk:

<p align="center"><img src="/home/sins/MEGA/sysadmin_level1/Task43_Linux_Course_01_LFS101/Chapter_03/Images/5.png"></p>

- initramfs chứa các chương trình và tệp nhị phân thực hiện tất cả các hành động cần thiết để mount hệ thống tập tin gốc thích hợp, như cung cấp kernel functionality cho hệ thống tập tin cần thiết và trình điều khiển thiết bị cho bộ điều khiển lưu trữ với một thiết bị có tên là udev (cho User Device) Để tìm ra thiết bị nào đang có trên hệ thống hiện tại, định vị các trình điều khiển cần thiết để hoạt động đúng, và nạp chúng. Sau khi hệ thống tập tin gốc đã được tìm thấy, nó được kiểm tra lỗi và mount chúng.

- Chương trình mount chỉ thị cho hệ điều hành hệ thống tập tin đã sẵn sàng để sử dụng và liên kết nó với một điểm cụ thể trong hệ thống phân cấp của hệ thống tập tin (gọi là mount point). Nếu điều này thành công, initramfs sẽ được xóa khỏi RAM và chương trình init trên hệ thống tập tin gốc (/sbin/init) được thực hiện.

<a name="1.5"></a>
#### 1.5 Text-Mode Login

<p align="center"><img src="/home/sins/MEGA/sysadmin_level1/Task43_Linux_Course_01_LFS101/Chapter_03/Images/6.png"></p>

- Trước khi kết thúc quá trình khởi động, **init** sẽ khởi động chương trình cho phép login vào hệ thống bằng username và password, cuối cùng nhận được shell nếu login thành công. Tuy nhiên nếu chạy trên hệ thống với GUI, nghĩa là bạn sử dụng giao diện đồ họa thì sẽ không thấy quá trình này. Thường thì trên các hệ thống sử dụng **CTRL-ALT + phím chức năng** để chuyển giữa các mode (phím này thường là F1, F7). Mặc định trên các hệ thống linux thì command shell thường là **bash** (the GNU Bourne Again Shell)

<a name="2"></a>
###  2. Kernel, init and Services

<a name="2.1"></a>
#### 2.1 The Linux Kernel

<p align="center"><img src="/home/sins/MEGA/sysadmin_level1/Task43_Linux_Course_01_LFS101/Chapter_03/Images/7.png"></p>

Boot loader tải cả kernel và initramfs vào bộ nhớ, vì vậy nó có thể được sử dụng trực tiếp bởi kernel.

Khi kernel được nạp vào RAM, nó ngay lập tức khởi tạo và cấu hình bộ nhớ máy tính và cũng cấu hình tất cả phần cứng gắn vào hệ thống. Điều này bao gồm tất cả bộ vi xử lý, bộ nhập xuất, thiết bị lưu trữ,...

<a name="2.2"></a>
#### 2.2 /sbin/init and Services

<p align="center"><img src="/home/sins/MEGA/sysadmin_level1/Task43_Linux_Course_01_LFS101/Chapter_03/Images/8.png"></p>

Khi kernel thiết lập tất cả các phần cứng và mount các hệ thống tập tin, kernel sẽ chạy chương trình `/sbin/init`. Đây sẽ là chương trình đầu tiên trên hệ thống. Tất cả các tiến trình khác đều có nguồn gốc từ `init` ngoài trừ kernel processes, tiến trình này do kernel khởi tạo trực tiếp để quản lý các chi tiết nội bộ hệ điều hành.

Bên cạnh việc khởi động hệ thống, `init` có trách nhiệm giữ cho hệ thống chạy và dừng chúng. `init` có trách nhiệm quản lý các tiến trình không phải là kernel, kết thúc các tiến trình khi người dùng logout và sẽ khởi động lại khi người dùng đăng nhập.

Theo truyền thống, quá trình khởi động này được thực hiện bằng cách sử dụng hệ thống System V UNIX. với các `runlevels` chứa các tập script để start và stop các services. Mỗi `runlevel` sẽ hỗ trợ một chế độ khác nhau.

Các bản phân phối gần đây thường sử dụng hệ thống system V. Ngoài ra còn có systemd và upstart,...

Hệ thống khởi động `system V` cũ hoạt động theo 1 quá trình được chia ra làm nhiều giai đoạn và thực hiện chúng 1 cách tuần tự. Mỗi giai đoạn được yêu cầu hoàn thành thì giai đoạn tiếp theo mới được thực hiện. Do đó không tận dụng lợi thế của việc xử lý song song có thể được thực hiện trên nhiều bộ vi xử lý hoặc lõi ngày nay.

Do đó 2 giải pháp thay thế chính được phát triển là:

- Upstart

	+ Phát triển bởi Ubuntu và phát hành lần đầu năm 2006

	+ Áp dụng trong Fedora 9 (năm 2008) và trong RHEL 6 và  các phát triển của nó.

- Systemd

	+ Được thông qua bởi Fedora đầu tiên (năm 2011) 
	
	+ Thông qua bởi RHEL 7 và SUSE 

	+ Thay thế Upstart trong Ubuntu 16.04.

__Systemd__ nhanh hơn các hệ thống trước đó. Điều này phần lớn bởi **systemd** tận dụng rất tốt kỹ thuật xử lý song song, cho phép nhiều dịch vụ khởi động cùng lúc. Và các script khởi động service phức tạp cũng được thay thế bằng các file cấu hình đơn giản, liệt kê những gì đã thực hiện khởi động dịch vụ và kết thúc nó,...

Hai cấu trúc lệnh đơn giản trên hệ thống **systemd** với lệnh **systemctl** là

- Start, stop, restart một service

```bash
$sudo systemctl start|stop|restart  [service_name]
```

- Enable hoặc disable một service khi khởi động hệ thống

```bash
$sudo systemctl enable|disable  [service_name]
```

<a name="3"></a>
### 3. Linux Filesystems

__Filesystems__ cơ bản là phương thức tổ chức và lưu trữ hệ thống tập tin trên Linux. Linux hỗ trợ các loại filesystem sau

- Hệ thống thông thường: ext2, ext3, ext4, XFS, Btrfs, JFS, NTFS,...

- Hệ thống lưu trữ Flash: ubifs, JFFS2, YAFFS,...

- Hệ thống tập tin cơ sở dữ liệu

- Hệ thống tập tin đặc biệt: procfs, sysfs, tmpfs, debugfs,...

Một so sánh giữa hệ thống tập tin trên windows và linux như bản sau

<p align="center"><img src="/home/sins/MEGA/sysadmin_level1/Task43_Linux_Course_01_LFS101/Chapter_03/Images/9.png"></p>

<a name="3.1"></a>
#### 3.1 Filesystem Hierarchy Standard

Linux lưu trữ các file của mình theo một tiêu chuẩn chung gọi là **Filesystem Hierarchy Standard (FHS)**, nó được duy trì từ lâu bởi [The Linux Foundation](https://refspecs.linuxfoundation.org/FHS_3.0/fhs-3.0.pdf)

<p align="center"><img src="/home/sins/MEGA/sysadmin_level1/Task43_Linux_Course_01_LFS101/Chapter_03/Images/10.png"></p>

Linux sử dụng ký tự `/` để chỉ gốc (root) mà không giống như windows với `\` và cũng phân theo ổ đĩa. Mọi thư mục, file đều bắt đầu từ `/`. Ví dụ nếu bạn có tên là `student` thì thư mục home của bạn sẽ là `/home/student`

<p align="center"><img src="/home/sins/MEGA/sysadmin_level1/Task43_Linux_Course_01_LFS101/Chapter_03/Images/11.png"></p>

> Lưu ý: Filesystem trên Linux phân biệt rõ ràng, tránh nhầm lẫn giữa /boot, /Boot, và /BOOT

<a name="4"></a>
### 4. Linux Distribution Installation

<p align="center"><img src="/home/sins/MEGA/sysadmin_level1/Task43_Linux_Course_01_LFS101/Chapter_03/Images/12.png"></p>

Một lưu ý khi chọn bản phân phối, chúng ta nên trả lời các câu hỏi sau

- Chức năng chính của hệ thống là gì ? (server hay desktop)

- Các package, services cần thiết là gì ? (ví dụ như web server)

- Dung lượng có sẵn của đĩa cứng là bao nhiêu ?

- Có thường update các package không ?

- Chu kỳ hỗ trợ mỗi phát hành là bao lâu ? (ví dụ LTS hỗ trợ dài hạn)

- Bạn có cần tùy biến kernel từ các nhà cung cấp?

- Phần cứng đang chạy các bản phân phối Linux trên là gì? (ví dụ, X86, ARM, PPC...)

- Bạn có cần sử dụng ổn định lâu dài hay muốn thử các phần mềm ngắn hạn, mới

Tất cả các cài đặt bao gồm tối thiểu các phần mềm để chạy một bản phân phối Linux. 

Hầu hết các trình cài đặt cũng cung cấp tùy chọn để thêm các phần mềm. ứng dụng phổ biến (chẳng hạn như trình duyệt Firefox và ứng dụng văn phòng LibreOffice), công cụ phát triển (như soạn thảo văn bản vi và emacs), và các dịch vụ phổ biến khác, (ví dụ như các công cụ máy chủ web Apache hoặc cơ sở dữ liệu MySQL). Bên cạnh đó, một môi trường giao diện đồ họa được cài đặt theo mặc định. 

Tất cả các trình cài đặt bảo mật hệ thống đang được cài đặt như một phần của quá trình cài đặt. Thông thường, đây bao gồm việc thiết lập mật khẩu cho superuser (root) và thiết lập một người sử dụng ban đầu. Trong một số trường hợp (ví dụ như Ubuntu), chỉ có một người sử dụng ban đầu được thiết lập; đăng nhập root trực tiếp bị vô hiệu hóa và quyền truy cập root đòi hỏi đăng nhập đầu tiên như một người dùng bình thường và sau đó sử dụng sudo, như chúng ta sẽ mô tả sau. Một số các bản phân phối cũng sẽ cài đặt thêm các khuôn khổ an ninh tiên tiến, chẳng hạn như SELinux hoặc AppArmor.

Cũng giống như các hệ điều hành khác, các bản phân phối Linux được cung cấp trên thiết bị di động như USB và đĩa CD hoặc DVD. Hầu hết các bản phân phối Linux cũng hỗ trợ khả năng khởi động một images và tải phần còn lại của hệ thống qua mạng. Những images là có thể sử dụng trên phương tiện truyền thông hoặc như hình ảnh khởi động mạng,

Nhiều trình cài đặt có thể cài đặt tự động, chúng sử dụng tập tin cấu hình đặc biệt. File này gọi là **kickstart** đối với hệ thống fedora-based, **AutoYAST** với hệ thống SUSE-based và **preseed** với hệ thống debian. Mỗi phân phối cung cấp tài liệu và các công cụ riêng của mình để tạo và quản lý những tập tin này.

<a name="4.1"></a>
#### 4.1 Cài đặt openSUSE-LEAP-42 trên VMware 

Đầu tiên sau khi khởi động trên vmware ta sẽ được như sau

<p align="center"><img src="/home/sins/MEGA/sysadmin_level1/Task43_Linux_Course_01_LFS101/Chapter_03/Images/13.png"></p>

Sau khi chọn **installation** và Enter ta được


Tại đây cho phép ta chọn ngôn ngữ hỗ trợ và keyboard

<p align="center"><img src="/home/sins/MEGA/sysadmin_level1/Task43_Linux_Course_01_LFS101/Chapter_03/Images/14.png"></p>

Tiếp tục nhấn next và ta được 

<p align="center"><img src="/home/sins/MEGA/sysadmin_level1/Task43_Linux_Course_01_LFS101/Chapter_03/Images/15.png"></p>

<p align="center"><img src="/home/sins/MEGA/sysadmin_level1/Task43_Linux_Course_01_LFS101/Chapter_03/Images/16.png"></p>

Tại đây cho phép ta tick chọn thêm các repo hoặc các add-on trước khi cài đặt. Ta có thể bỏ qua và chọn next được

<p align="center"><img src="/home/sins/MEGA/sysadmin_level1/Task43_Linux_Course_01_LFS101/Chapter_03/Images/17.png"></p>

Ở bước này ta thấy openSUSE đã tự động chia các phân vùng cho ta, tuy nhiên ta có thể chọn `Expert partitioner...` để thay đổi theo ý muốn

<p align="center"><img src="/home/sins/MEGA/sysadmin_level1/Task43_Linux_Course_01_LFS101/Chapter_03/Images/18.png"></p>

Sau khi chia phân vùng xong ta nhấn `accept` và quay lại nhấn next ta được 

<p align="center"><img src="/home/sins/MEGA/sysadmin_level1/Task43_Linux_Course_01_LFS101/Chapter_03/Images/19.png"></p>

Tại đây ta chọn timezone như hình

<p align="center"><img src="/home/sins/MEGA/sysadmin_level1/Task43_Linux_Course_01_LFS101/Chapter_03/Images/20.png"></p>

Tiếp theo ta chọn Desktop Evironment. Có thể chọn other (có tùy chọn cho xfce)

Tiếp theo ta nhấn next và tạo username như ví dụ ở hình sau (có thể không tạo bằng cách nhấn chọn `Skip user creation`)

<p align="center"><img src="/home/sins/MEGA/sysadmin_level1/Task43_Linux_Course_01_LFS101/Chapter_03/Images/21.png"></p>

Tiếp theo hệ thống cho ta xem lại và chọn, cấu hình một số chương trình, phần mềm theo ý muốn

<p align="center"><img src="/home/sins/MEGA/sysadmin_level1/Task43_Linux_Course_01_LFS101/Chapter_03/Images/22.png"></p>

Ví dụ như ta có thể config lại `booting` bằng cách nhấn vào `booting` và ta sẽ được 

<p align="center"><img src="/home/sins/MEGA/sysadmin_level1/Task43_Linux_Course_01_LFS101/Chapter_03/Images/23.png"></p>

hoặc chọn software và ta được

<p align="center"><img src="/home/sins/MEGA/sysadmin_level1/Task43_Linux_Course_01_LFS101/Chapter_03/Images/24.png"></p>

Sau khi tùy chỉnh xong ta chọn `OK` và nhấn next để tiếp tục

Hệ thống sẽ đưa ra yêu cầu nhắc nhở có muốn cài đặt với tất cả những gì đã thiết lập hay không. Chọn `install` để bắt đầu

<p align="center"><img src="/home/sins/MEGA/sysadmin_level1/Task43_Linux_Course_01_LFS101/Chapter_03/Images/25.png"></p>

Quá trình cài đặt được bắt đầu

<p align="center"><img src="/home/sins/MEGA/sysadmin_level1/Task43_Linux_Course_01_LFS101/Chapter_03/Images/26.png"></p>

Sau khi cài đặt hoàn tất. Hệ thống sẽ yêu cầu reboot và kết quả ta hoàn thành quá trình cài đặt openSUSE-LEAP-42 trên VMware 

<p align="center"><img src="/home/sins/MEGA/sysadmin_level1/Task43_Linux_Course_01_LFS101/Chapter_03/Images/27.png"></p>