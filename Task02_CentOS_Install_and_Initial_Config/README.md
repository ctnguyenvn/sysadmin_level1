

### Install CentOS 6.5 on virtualbox and initial config

> Tài liệu: Cài đặt CentOS trên virtualbox và config cơ bản

> Thực hiện: Nguyễn Công Trứ

> Cập nhật: 21/09/2016

#### Mục lục

[1. Giới thiệu CentOS](#GioiThieu)

[2. Cài đặt Virtualbox](#Virtualbox)

[3. Cài đặt CentOS 6.5](#Centos)

- [3.1 Tạo máy ảo cài đặt CentOS trên virtualbox](#TaoMayAo)
- [3.2 Cài đặt CentOS 6.5 (step by step)](#CaiDatCentos)

[4. Initial config](#CoBan)

- [4.1 Add a User](#AddUser)
- [4.2 Use root account](#UseRoot)
- [4.3 Network Settings](#NetConfig)
- [4.4 Configure Services](#SerConfig)
- [4.5 Update System](#SysUpdateS)
- [4.6 Vim Settings](#Vim)
- [4.7 Sudo Settings](#SudoSet)

<a name="GioiThieu"></a>
#### 1. Giới thiệu CentOS

[CentOS](https://www.centos.org/) (Community ENTerprise Operating System) là một phân phối Linux tập trung vào lớp doanh nghiệp. Là hệ điều hành tự do dựa trên Linux. Nó có nguồn gốc từ bản phân phối Red Hat Enterprise Linux. CentOS tồn tại để cung cấp một nền tảng điện toán doanh nghiệp tự do và phấn đấu để duy trì khả năng tương thích nhị phân 100% với nguồn Red Hat. CentOS hỗ trợ các dòng x86(i586 và i686), dòng x86_64 (AMD64 và Intel64), và các cấu trúc Alpha, S390,...

<a name="Virtualbox"></a>
#### 2. Cài đặt Virtualbox

Lưu ý cần gỡ tất cả các phiên bản virtualbox trước đó đã cài đặt trên máy

##### Cài đặt trên Ubuntu
- Bạn có thể cài đặt virtualbox qua:

    + ubuntu software center để cài đặt
    + File .deb của virtualbox từ trang chủ và cài đặt với lệnh 

        **sudo dpkg -i .deb**

    + Sử dụng trực tiếp từ terminal

        **sudo apt-get install virtualbox**

##### Cài đặt trên CentOS

- Thêm VirtualBox repository vào CentOS để cài đặt và cập nhật VirtualBox phiên bản mới nhất được dễ dàng hơn.
   
    **cd /etc/yum.repos.d/**
    **wget http://download.virtualbox.org/virtualbox/rpm/rhel/virtualbox.repo**

- Cài đặt gói epel-release:
    
    **yum install epel-release**
    
- Cập nhật CentOS và cài các gói cần thiết cho VirtualBox.

    **yum update**
    **yum install binutils qt gcc make patch libgomp glibc-headers glibc-devel kernel-headers kernel-devel dkms**

- Và bây giờ cài đặt VirtualBox với lệnh sau:

    **yum install VirtualBox-5.0**

<a name="Centos"></a>
#### 3. Cài đặt CentOS 6.5
-- Bạn có thể tải file cài đặt CentOS 6.5 từ [trang chủ](http://vault.centos.org/6.5/isos/x86_64/) và tiếp tục thực hiện các bước sau.

<a name="TaoMayAo"></a>
##### 3.1 Tạo máy ảo cài đặt CentOS trên virtualbox

- Đặt tên máy và chọn như hình 
> Nếu sử dụng bản 32 bit chọn Red hat (32 bit)

![](https://github.com/hellsins/sysadmin_level1/blob/master/Task02_CentOS_Install_and_Initial_Config/img/vbox1.png)

- Chọn Memory size (RAM)

![](https://github.com/hellsins/sysadmin_level1/blob/master/Task02_CentOS_Install_and_Initial_Config/img/vbox2.png)

- Chọn tạo mới ổ cứng ảo

![](https://github.com/hellsins/sysadmin_level1/blob/master/Task02_CentOS_Install_and_Initial_Config/img/vbox3.png)

- Chọn loại ổ cứng ảo (VDI)

![](https://github.com/hellsins/sysadmin_level1/blob/master/Task02_CentOS_Install_and_Initial_Config/img/vbox4.png)

- chọn lưu trữ trên ổ cứng vật lý (chọn dynamically)

![](https://github.com/hellsins/sysadmin_level1/blob/master/Task02_CentOS_Install_and_Initial_Config/img/vbox5.png)

- Chọn kích thước và vị trí ỗ đĩa

![](https://github.com/hellsins/sysadmin_level1/blob/master/Task02_CentOS_Install_and_Initial_Config/img/vbox6.png)


<a name="CaiDatCentos"></a>
##### 3.2 Cài đặt CentOS 6.5 (step by step)

- Nhấn Start để bắt đầu chọn dvd/iso file

![](https://github.com/hellsins/sysadmin_level1/blob/master/Task02_CentOS_Install_and_Initial_Config/img/vbox7.png)

- Chọn Install or upgrade an existing system
![](https://github.com/hellsins/sysadmin_level1/blob/master/Task02_CentOS_Install_and_Initial_Config/img/install1.png)

- Chọn Skip để bỏ qua bộ cài đăt
![](https://github.com/hellsins/sysadmin_level1/blob/master/Task02_CentOS_Install_and_Initial_Config/img/install2.png)

- Sau khi chọn next ta bắt đầu chọn ngôn ngữ cài đặt
![](https://github.com/hellsins/sysadmin_level1/blob/master/Task02_CentOS_Install_and_Initial_Config/img/install4.png)

- Chọn bàn phím hệ thống (keyboard)
![](https://github.com/hellsins/sysadmin_level1/blob/master/Task02_CentOS_Install_and_Initial_Config/img/install5.png)

- Chọn Kiểu thiết bị sẽ cài đặt
![](https://github.com/hellsins/sysadmin_level1/blob/master/Task02_CentOS_Install_and_Initial_Config/img/install6.png)

- Chọn yes, discard any data để bỏ qua cảnh báo (xóa dữ liệu trên ổ cứng đã chọn)
![](https://github.com/hellsins/sysadmin_level1/blob/master/Task02_CentOS_Install_and_Initial_Config/img/install7.png)

- Đặt hostname
![](https://github.com/hellsins/sysadmin_level1/blob/master/Task02_CentOS_Install_and_Initial_Config/img/install8.png)

> Có thể config network để có thể khởi động network khi vào hệ thống như sau
![](https://github.com/hellsins/sysadmin_level1/blob/master/Task02_CentOS_Install_and_Initial_Config/img/install9.png)
![](https://github.com/hellsins/sysadmin_level1/blob/master/Task02_CentOS_Install_and_Initial_Config/img/install10.png)

- Chọn giờ hệ thống
![](https://github.com/hellsins/sysadmin_level1/blob/master/Task02_CentOS_Install_and_Initial_Config/img/install11.png)

- Đặt passwork cho user root
![](https://github.com/hellsins/sysadmin_level1/blob/master/Task02_CentOS_Install_and_Initial_Config/img/install12.png)

- Chọn kiểu cài đặt:

	+ Use All Space: Xóa tất cả các phân vùng, tự động tạo phạn vùng mới
	+ Replace existing Linux System: Thay thế hệ thống Linux hiện tại
	+ Shrink Current System: Thu lại phân vùng hiện có để tạo ra phân vùng trống mặc định
	+ Use Free Space: Sử dụng phân vùng trống
	+ Create custom Layout: Tạo phân vùng tùy chỉnh theo ý muốn 

![](https://github.com/hellsins/sysadmin_level1/blob/master/Task02_CentOS_Install_and_Initial_Config/img/install13.png)

- Chọn Standard partition 
![](https://github.com/hellsins/sysadmin_level1/blob/master/Task02_CentOS_Install_and_Initial_Config/img/install14.png)

- Tùy chỉnh phân vùng

	+ Mount Point: Tạo phân vùng (/, /home, /boot, /var,...)
	+ File System Type: Chọn kiểu file hệ thống (ext3, ext4, swap,...)
	+ Size: Kích thước phân vùng

![](https://github.com/hellsins/sysadmin_level1/blob/master/Task02_CentOS_Install_and_Initial_Config/img/install15.png)

- Sau khi tạo xong tất cả các phân vùng mong muốn, chọn Next và chọn write changes to disk để ghi lại những thay đổi
![](https://github.com/hellsins/sysadmin_level1/blob/master/Task02_CentOS_Install_and_Initial_Config/img/install17.png)

- Boot loader (để mặc định)
![](https://github.com/hellsins/sysadmin_level1/blob/master/Task02_CentOS_Install_and_Initial_Config/img/install18.png)

- Chọn loại hệ thống desktop (có hỗ trợ GUI), Minimal (Chỉ hỗ trợ console), basic server,...
![](https://github.com/hellsins/sysadmin_level1/blob/master/Task02_CentOS_Install_and_Initial_Config/img/install19.png)

- Sau đó nhấn Next và quá trình cài đặt bắt đầu, sau khi cài xong reboot lại hệ thống

- Chọn forward đến tạo user (điền thông tin user) và tiếp tục

- Chọn ngày và thời gian
![](https://github.com/hellsins/sysadmin_level1/blob/master/Task02_CentOS_Install_and_Initial_Config/img/install21.png)

- Thiết lập dung lượng cho kdump
![](https://github.com/hellsins/sysadmin_level1/blob/master/Task02_CentOS_Install_and_Initial_Config/img/install22.png)



<a name="CoBan"></a>
#### 4. Initial config

<a name="AddUser"></a>
##### 4.1 Add a User

Sử dụng lệnh:

**useradd user_name**

Thay đổi pass của user này:

**Passwd user_name**

![](https://github.com/hellsins/sysadmin_level1/blob/master/Task02_CentOS_Install_and_Initial_Config/img/init1.png)

<a name="UseRoot"></a>
##### 4.2 Use root account

<a name="NetConfig"></a>
##### 4.3 Network Settings

- Sử dụng lệnh 
	**vi /etc/sysconfig/network-scripts/ifcfg-eth0**
và thay đổi như sau:
![](https://github.com/hellsins/sysadmin_level1/blob/master/Task02_CentOS_Install_and_Initial_Config/img/init2.png)

- Restart lại service network và kiểm tra lại với các lệnh như hình
![](https://github.com/hellsins/sysadmin_level1/blob/master/Task02_CentOS_Install_and_Initial_Config/img/init3.png)

- Để disable IPv6 ta thêm 2 dòng sau vào file /etc/sysctl.conf
![](https://github.com/hellsins/sysadmin_level1/blob/master/Task02_CentOS_Install_and_Initial_Config/img/init4.png)

- Áp dụng cấu hình với lệnh sysctl -p và kiểm tra ta được
![](https://github.com/hellsins/sysadmin_level1/blob/master/Task02_CentOS_Install_and_Initial_Config/img/init5.png)

<a name="SerConfig"></a>
##### 4.4 Configure Services

chkconfig là lệnh thao tác với service, một số lệnh cơ bản như sau:
	
+ kiểm tra các service

![](https://github.com/hellsins/sysadmin_level1/blob/master/Task02_CentOS_Install_and_Initial_Config/img/init6.png)

+ Tắt service

![](https://github.com/hellsins/sysadmin_level1/blob/master/Task02_CentOS_Install_and_Initial_Config/img/init7.png)

<a name="SysUpdate"></a>
##### 4.5 Update System

- Sử dụng lệnh

![](https://github.com/hellsins/sysadmin_level1/blob/master/Task02_CentOS_Install_and_Initial_Config/img/init8.png)

<a name="Vim"></a>
##### 4.6 Vim Settings

![](https://github.com/hellsins/sysadmin_level1/blob/master/Task02_CentOS_Install_and_Initial_Config/img/init9.png)

- Sau khi dùng lệnh trên cài đặt thì ta chỉnh alias như sau

![](https://github.com/hellsins/sysadmin_level1/blob/master/Task02_CentOS_Install_and_Initial_Config/img/init10.png)

- Ngoài ra ta chỉnh 1 số cấu hình như hiển thị dòng, systax trong vim

![](https://github.com/hellsins/sysadmin_level1/blob/master/Task02_CentOS_Install_and_Initial_Config/img/init11.png)

<a name="SudoSet"></a>
##### 4.7 Sudo Settings

- Cho user (hellsins) quyền như root

![](https://github.com/hellsins/sysadmin_level1/blob/master/Task02_CentOS_Install_and_Initial_Config/img/init12.png)

- Tạo group mới

![](https://github.com/hellsins/sysadmin_level1/blob/master/Task02_CentOS_Install_and_Initial_Config/img/init14.png)

- Áp dụng quyền cụ thể cho từng user đối với từng lệnh

![](https://github.com/hellsins/sysadmin_level1/blob/master/Task02_CentOS_Install_and_Initial_Config/img/init15.png)

- Sau khi áp dụng ta được kết quả sau

![](https://github.com/hellsins/sysadmin_level1/blob/master/Task02_CentOS_Install_and_Initial_Config/img/init16.png)
![](https://github.com/hellsins/sysadmin_level1/blob/master/Task02_CentOS_Install_and_Initial_Config/img/init17.png)

- Để chỉ ghi log của sudo ta thêm vào cuối file sudoer dòng:
	
	**Defaults syslog=local1**

Sau đó thêm vào file /etc/rsyslog.conf như sau (khoảng dưới dòng 42)
![](https://github.com/hellsins/sysadmin_level1/blob/master/Task02_CentOS_Install_and_Initial_Config/img/init18.png)

#### Kết thúc