
### Install software on Linux

> Tài liệu: Cài đặt phần mềm trên linux

> Thực hiện: Nguyễn Công Trứ

> Cập nhật: 07/10/2016

Mục lục

[1. Giới thiệu cài đặt phần mềm trên linux (ubuntu)](#GioiThieu)

[2. Cài đặt một số phần mềm](#CaiDat)

- [2.1 Cài đặt Teamview](#Teamview)

- [2.2 Cài đặt ibus-bogo](#Ibus)

- [2.3 Cài đặt Packet tracer](#CPT)

- [2.4 Cài đặt vlc](#VLC)

---

<a name="GioiThieu"></a>
### 1. Giới thiệu cài đặt phần mềm trên linux

Đối với người dùng Linux, thì lợi thế lớn nhất có lẽ là kho phần mềm miễn phí mã nguồn mở của nó. Tuy nhiên, với mỗi distro thì có những cách cài đặt khác nhau như Red Hat, Ubuntu, CentOS, Fedora, Slackware, Debian, Arch,... Sau đây là một số cách cài đặt phần mềm trên các hệ thống Linux.

- Cài đặt qua các soffware center: Hầu hết các distro linux cho người dùng phổ thông đều có các phần mềm GUI cho việc add/remove phần mềm như ubuntu soffware center trên ubuntu. Bạn chỉ cần mở nó lên và điền tên phần mềm muốn cài đặt. Nhấn Install và quá trình cài đặt hoàn tất

- Cài đặt qua các hệ thống gói rpm, deb,...: 

	+ Đối với rpm (RedHat Package Manager) là hệ thống gói của RedHat, CentOS. Bản thân gói này không chưa chương trình cài đặt mà chỉ chưa các thông tin về file sẽ được cài đặt, thông tin mô tả về phần mềm chứa trong gói và các file nằm trong gói RPM sẽ được cài đặt vào thư mục nào của hệ thống. Các gói phần mềm dạng RPM được cài đặt vào hệ thống nhờ vào chương trình RPM có trong hệ thống

		- Cách đơn giản để cài đặt các gói RPM ta dùng lệnh

		   __rpm -i [ten_goi.rpm]__

		   __yum install [ten_phan_mem]__

		- Để gỡ bỏ ta dùng

		   __rpm -e [ten_goi.rpm]__	

		    __yum remove [ten_phan_mem]__

	+ Đối với deb (Debian Package) là hệ thống gói cho Debian/Ubuntu. Với các hệ thống gói này thì đơn giản hơn, ta có thể cài đặt chúng qua GUI mà HĐH này cung cấp hoặc từ cửa sổ terminal ta dùng lệnh

		__sudo dpkg -i [ten_goi.deb]__

		Gỡ phần mềm

		__sudo apt-get remove [ten_phan_mem]__

		> Có thể dùng autoremove sau khi gỡ chương trình để xóa các package không cần thiết (thường đi kèm với phần mềm vừa gỡ)ra khỏi hệ thống

		Ngoài ra ta có thể dùng lệnh sau để cài đặt các phần mềm từ kho phần mềm của hệ thống linux (hện tại)

		__sudo apt-get install [ten_phan_mem]__

		Gỡ phần mềm

		__sudo apt-get remove [ten_phan_mem]__

- Cài đặt qua source

	+ Đối với cài đặt từ source đầu tiên ta cần tải source từ linux về. Hầu hết các source đều có dạng đuôi file là .tar.gz hay.tar.xz hoặc .tar.bz2,vv chúng ta cần giải nén chúng với một số lệnh cơ bản phổ biến, thay vì giải nèn từng bước như dùng gunzip để giải nén file .gz sau đó dùng tar để giải nén file tar ta nén trực tiếp như sau

		- Đối với .gz

	   		__tar -xzvf [ten_goi.gz]__

		- Đối với .bz2

	   		__tar -xjvf [ten_goi.gz]__

		- Đối với .xz
	  	
	  		__tar -xf [ten_goi.gz]__

	+ Sau khi giải nén xong thì hầu hết các gói đều tuân theo các tuần tự cài đặt sau
		
		- __./configure__

		- __make__
		
		- __make install__
		
		Đầu tiên sau khi ta dùng __./configure__ thì file này thực hiện việc kiểm tra những yêu cầu của hệ thống của bạn có đáp ứng đủ hay không, nếu không thì sẽ liệt kê chúng ra và yeu cầu ta cài đặt chúng. Nếu ngược lại thì Makefile được tạo ra, file này chứa nhiệm vụ hướng dẫn biên dịch gói mã nguồn ra dạng thục thi. Sau khi __make__ xong thì toàn bộ mã nguồn của gói được biên dịch sang dạng thực thi, tuy nhiên các file này vẫn nằm trên thư mục hiện tại. Và cuối dùng lệnh __make install__ làm nhiệm vụ chép các file thực thi sang đúng vị trí cần thiết của nó trên hệ thống. Nếu không có lỗi gì xảy ra trong quá trình configure và make thì cài đặt thành công.

<a name="CaiDat"></a>
### 2. Cài đặt một số phần mềm (trên ubuntu)

<a name="Teamview"></a>
#### 2.1 Cài đặt Teamview

Teamview là phần mềm điều khiển máy tính từ xa. Trên ubuntu sau khi [tải về](https://www.teamviewer.com/vi/download/linux/) ta sử dụng command line sau để cài đặt

![](https://github.com/hellsins/sysadmin_level1/tree/master/Task06_Install_software_on_Linux/img/teamview1.png)

> Lưu ý cần chọn đúng phiên bản cho OS của mình

<a name="Ibus"></a>
#### 2.2 Cài đặt ibus-bogo

Ibus-bogo là phần mềm hỗ trợ tiếng việt trên linux. Bạn có thể tải source từ [đây](https://github.com/BoGoEngine/ibus-bogo-python/releases/download/v0.4.0/ibus-bogo_0.4.0.tar.gz) hoặc clone từ [github](https://github.com/BoGoEngine/ibus-bogo.git) về để cài đặt.

![](https://github.com/hellsins/sysadmin_level1/tree/master/Task06_Install_software_on_Linux/img/ibus1.png)

Tuy nhiên chúng ta cần cài các phần mềm, package cần thiết để sử dụng ibus-bogo như sau:

Trên ubuntu chạy lệnh

__sudo apt-get install python3 ibus cmake python3-gi pyqt4-dev-tools gir1.2-ibus-1.0 gir1.2-wnck-3.0 python3-pyqt4 qt4-linguist-tools  python3-enchant__

Sau khi clone về ta dùng lệnh sau để cài đặt

__sudo make install__

![](https://github.com/hellsins/sysadmin_level1/tree/master/Task06_Install_software_on_Linux/img/ibus2.png)

Sau khi cài đặt thành công ta vào system setting/Text Entry và thêm vietnam(bogo) vào để sử dụng tiếng việt

Để gỡ cài đặt ta dùng

__sudo make uninstall__

![](https://github.com/hellsins/sysadmin_level1/tree/master/Task06_Install_software_on_Linux/img/ibus3.png)

<a name="CPT"></a>
#### 2.3 Cài đặt Packet tracer

Packet tracer là phần mềm giả lập các thiết bị mạng trong môi trường mạng máy tính. Chúng ta có thể tải về từ các nguồn trên internet.

- Đối với file .deb ta dùng lệnh
__sudo dpkg -i [ten_file.deb]__

+ Đối với file .tar.gz
	+ b1: Giải nén
	__tar -xzvf [ten_file.tar.gz]__

	+ b2: Dùng __cd__ để đến thư mục vừa giải nén

	+ b3: Chạy file cài đặt
	__sudo ./install__

	![](https://github.com/hellsins/sysadmin_level1/tree/master/Task06_Install_software_on_Linux/img/CPT1.png)

	Nhấn Enter sau đó tới bước chọn nơi cài đặt (nếu để mặc định thì nhấn Enter)

	![](https://github.com/hellsins/sysadmin_level1/tree/master/Task06_Install_software_on_Linux/img/CPT2.png)

	Cuối cùng là tạo liên kết. Nhấn Enter nếu muốn tạo liên kết nhanh tới file thực thi sau khi cài đặt.
	
	![](https://github.com/hellsins/sysadmin_level1/tree/master/Task06_Install_software_on_Linux/img/CPT3.png)

<a name="VLC"></a>
#### 2.4 Cài đặt vlc

Đối với vlc - phần mềm chơi nhạc, video, quay màn hình desktop,... chúng ta có thể cài trực tiếp với lệnh

__sudo apt-get install vlc__

> Lưu ý: Nếu các lệnh trên xảy ra lỗi chúng ta có thể sử dụng lệnh sau để có thể khắc phục

>__sudo apt-get -f install__

### Kết thúc
