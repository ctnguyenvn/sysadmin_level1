
### CentOS6 LAMP And PhpBB

> Tài liệu: Tìm hiểu về LAMP và PhpBB trên CentOS 6

> Thực hiện: Nguyễn Công Trứ

> Cập nhật: 24/03/2017

### Mục lục

[1. Giới thiệu về PhpBB](#1)

[2. Cấu hình IP tĩnh](#2)

[3. Cấu hình SSH sử dụng public key](#3)

[4. Cập nhật CentOS 6.8](#4)

[5. Cài đặt LAMP](#5)

- [5.1 Cài đặt Apache 2](#5.1)

- [5.2 Cài đặt MySQL](#5.2)

- [5.3 Cài đặt PHP](#5.3)

[6. Cài đặt PhpBB ](#6)

- [6.1 Cài đặt phpBB 3.2 trên LAMP CentOS 6.8](#6.1)

- [6.2 Một số chức năng cơ bản của phpBB 3.2](#6.2)

	+ [6.2.1 Forums](#6.2.1)

	+ [6.2.2 Posting](#6.2.2)
	
	+ [6.2.3 Users and Groups](#6.2.3)
	
	+ [6.2.4 Permission](#6.2.4)
	
	+ [6.2.5 Customise](#6.2.5)
	
	+ [6.2.6 Mantenance](#6.2.6)
	
	+ [6.2.7 System](#6.2.7)

***

<a name="1"></a>
### 1. Giới thiệu về PhpBB

phpBB lần đầu tiên được tạo ra bởi James Atkinson (theFinn) vào tháng 6/2000, Sau khi phát hành cho công chúng thông qua SourceForge, nó trở nên phổ biến rất nhanh chóng

Phiên bản dùng thử phpBB3 beta5 được công bố vào tháng 3/2007. Phiên bản RC, đánh dấu đầy đủ hỗ trợ cho dòng 3.0, đã được phát hành tháng 5/2007. phpBB 3.0.0 đã được phát hành vào ngày 13/2007.

Một số điểm nổi bậc

- Thiết kế tách biệt Admin Control Panel, Moderator Control Panel, và User Control Panel

- Hỗ trợ nhiều cơ sở dữ liệu, bao gồm MySQL, Microsoft SQL Server, Oracle, PostgreSQL, SQLite, Firebird, OpenLink Virtuoso, và các loại ODBC-accessible DBMS

- Hỗ trợ không giới hạn subforums (chuyên mục con)

- Cho phép tùy chỉnh BBCode

- Cho phép tùy chỉnh – thêm bớt các trường quản lý dữ liệu thành viên

- Cấp phép hệ thống đa cấp.

<a name="2"></a>
### 2. Cấu hình IP tĩnh

Để cấu hình IP tĩnh ta mở file sau sử dụng `vi` (hoặc editer khác)

	vi /etc/sysconfig/network-scripts/ifcfg-eth0 

Sau đó chỉnh như sau

<p align="center"><img src="https://github.com/ctnguyenvn/sysadmin_level1/blob/master/Task36_CentOS6_LAMP_And_PhpBB/Image/1.png" /></p>

Lưu và khởi động lại network

	/etc.init.d/network  restart 

<a name="3"></a>
### 3. Cấu hình SSH sử dụng public key

Sau khi cài đặt ssh ta mở file `sshd_config`

	vi /etc/ssh/sshd_config

Và bỏ comment (dấu **#**) ở những dòng sau

	RSAAuthentication yes

	PubkeyAuthentication yes 

	AuthorizedKeysFile     .ssh/authorized_keys

Và comment dòng sau để tắt sử dụng xác thực bằng pasword

	PasswordAuthentication yes

Tiếp theo vào client tạo key rsa như sau

	ssh-keygen -t rsa

> Lưu ý: 

> 	- Nhấn Enter để bỏ qua passphrase. 

> 	- Key tạo ra được lưu tại ~/.ssh

Sau đó phân quyền cho ~/.ssh/id_sa 

	chmod 600 ~/.ssh/id_rsa

Tiếp theo copy nội dung file id_rsa.pub

Sau đó vào server tạo file authorized_keys (nếu chưa có) tại thư mục .ssh và paste nội dung đã copy phía trên vào file này

	vi ~/.ssh/authorized_key

Phân quyền cho authorized_keys

	chmod 600 ~/.ssh/authorized_keys

Cuối cùng restart lại ssh trên server 

	service sshd restart
	
<a name="4"></a>
### 4. Cập nhật CentOS 6.8

Để cập hật CentOS lên version 6.8 ta dùng lệnh

	yum update

<a name="5"></a>
### 5. Cài đặt LAMP

<a name="5.1"></a>
#### 5.1 Cài đặt Apache 2 (httpd)

Để cài đặt Apache 2 (httpd) ta dùng lệnh

	yum install httpd

Sau khi cài xong thì mặc định home của httpd sẽ ở `/var/www/html`. Chúng ta có thể tạo thêm 1 web khác để dể quản lý như sau

	mkdir /var/www/html/mysite   			# mysite là tên web mới

	touch /var/www/html/mysite/index.html 		# Tạo 1 trang để test

Tiếp theo ta chỉnh 1 số dòng trong file `/etc/httpd/conf/httpd.conf`

	vi /etc/httpd/conf/httpd.conf

- Dòng 276: ServerName [IP của máy]:80

	Ví dụ: ServerName 192.168.251.135:80

- Dòng 292: DocumentRoot "/var/www/html/[ten_web]"

	Ví dụ: DocumentRoot "/var/www/html/mysite"

- Dòng 317: <Directory  "/var/www/html/[ten_web]">

	Vi dụ: <Directory  "/var/www/html/mysite">

Khởi động lại httpd

	service httpd start 

> Lưu ý: Cần accept port 80 của firewall như sau:

> 	iptables -I INPUT 5 -p tcp -m state --state NEW -m tcp --dport 80 -j ACCEPT 

Cuối cùng dùng trình duyệt sẽ được

<p align="center"><img src="https://github.com/ctnguyenvn/sysadmin_level1/blob/master/Task36_CentOS6_LAMP_And_PhpBB/Image/2.png" /></p>

<a name="5.2"></a>
#### 5.2 Cài đặt MySQL 5.1

Để cài đặt MySQL ta dùng lệnh

	yum install mysql-server

Sau đó thêm dòng sau như hình vào file `/etc/my.cnf`

<p align="center"><img src="https://github.com/ctnguyenvn/sysadmin_level1/blob/master/Task36_CentOS6_LAMP_And_PhpBB/Image/3.png" /></p>

Khởi động mysqld như sau

	/etc/rc.d/init.d/mysqld start 

Set mật khẩu root

	mysql_secure_installation 

- Ta sẽ làm theo các bước sau
	
		NOTE: RUNNING ALL PARTS OF THIS SCRIPT IS RECOMMENDED FOR ALL MySQL
	      	SERVERS IN PRODUCTION USE!  PLEASE READ EACH STEP CAREFULLY!

		In order to log into MySQL to secure it, we'll need the current
		password for the root user.  If you've just installed MySQL, and
		you haven't set the root password yet, the password will be blank,
		so you should just press enter here.


		Enter current password for root (enter for none):
		OK, successfully used password, moving on...

		Setting the root password ensures that nobody can log into the MySQL
		root user without the proper authorisation.

		# set root password
		Set root password? [Y/n] y  # Chọn y
		New password:     # Nhập mật khẩu mới
		Re-enter new password:  # Nhập lại mật khẩu
		Password updated successfully!
		Reloading privilege tables..
		 ... Success!

		By default, a MySQL installation has an anonymous user, allowing anyone
		to log into MySQL without having to have a user account created for
		them.  This is intended only for testing, and to make the installation
		go a bit smoother.  You should remove them before moving into a
		production environment.

		# remove anonymous users
		Remove anonymous users? [Y/n] y    # Chọn y
		 ... Success!

		Normally, root should only be allowed to connect from 'localhost'.  This
		ensures that someone cannot guess at the root password from the network.

		# disallow root login remotely
		Disallow root login remotely? [Y/n] y    # Chọn y
		 ... Success!

		By default, MySQL comes with a database named 'test' that anyone can
		access.  This is also intended only for testing, and should be removed
		before moving into a production environment.

		# remove test database
		Remove test database and access to it? [Y/n] y    # Chọn y
		 - Dropping test database...
		 ... Success!
		 - Removing privileges on test database...
		 ... Success!

		Reloading the privilege tables will ensure that all changes made so far
		will take effect immediately.

		# reload privilege tables
		Reload privilege tables now? [Y/n] y     # Chọn y
		 ... Success!

		Cleaning up...

		All done!  If you've completed all of the above steps, your MySQL
		installation should now be secure.

		Thanks for using MySQL!
	

> Lưu ý: Cần accept port 3306 của firewall như sau:

> 	iptables -I INPUT 5 -p tcp -m state --state NEW -m tcp --dport 3306 -j ACCEPT

<a name="5.3"></a>
#### 5.3 Cài đặt PHP 7.0

Để cài đặt, trước tiên bạn phải thêm các thông tin kho Webtatic EL tương ứng với phiên bản CentOS / RHEL của bạn để sử dụng yum

```
rpm -Uvh https://dl.fedoraproject.org/pub/epel/epel-release-latest-6.noarch.rpm
rpm -Uvh https://mirror.webtatic.com/yum/el6/latest.rpm
```

Sau đó cài đặt PHP 7.0 ta dùng lệnh sau

	yum install  php70w  php70w-gd php70w-mysql php70w-xml

Để kiểm tra ta tạo file info.php ở thư mục mysite phía trên với nội dung sau

```php
<?php
phpinfo();
?>
```

<p align="center"><img src="https://github.com/ctnguyenvn/sysadmin_level1/blob/master/Task36_CentOS6_LAMP_And_PhpBB/Image/4.png" /></p>

<a name="6"></a>
### 6. Cài đặt phpBB

<a name="6.1"></a>
#### 6.1 Cài đặt phpBB 3.2 trên LAMP CentOS 6.8

Đầu tiên ta dùng wget tải phpbb về và giải nén sau đó copy vào thư mục /var/www/html/ (đây xem như là thư mục root cho phpbb) như sau

```
wget https://www.phpbb.com/files/release/phpBB-3.2.0.zip
unzip phpBB-3.2.0.zip
mv phpBB3 /var/www/html/phpbb
```

Tiếp theo ta cần tạo 1 database với mysql như sau

<p align="center"><img src="https://github.com/ctnguyenvn/sysadmin_level1/blob/master/Task36_CentOS6_LAMP_And_PhpBB/Image/5.png" /></p>

Sau đó khởi động lại apache và mở trình duyệt ở client như sau

<p align="center"><img src="https://github.com/ctnguyenvn/sysadmin_level1/blob/master/Task36_CentOS6_LAMP_And_PhpBB/Image/6.png" /></p>

Chọn phần `install` và nhấn submit

<p align="center"><img src="https://github.com/ctnguyenvn/sysadmin_level1/blob/master/Task36_CentOS6_LAMP_And_PhpBB/Image/7.png" /></p>

> Lưu ý: Có 1 số file cần phần quyền để có thể ghi dữ liệu. Chúng có thể là `cache, files, stories, file config.php, images/avatar/upload`. Chúng ta nên sử dụng `chmod 777` cho những file/folder này

Tạo tài khoản quản trị

<p align="center"><img src="https://github.com/ctnguyenvn/sysadmin_level1/blob/master/Task36_CentOS6_LAMP_And_PhpBB/Image/8.png" /></p>

Kết nối database

<p align="center"><img src="https://github.com/ctnguyenvn/sysadmin_level1/blob/master/Task36_CentOS6_LAMP_And_PhpBB/Image/9.png" /></p>

Tiếp theo để configure 1 số thứ ta làm như sau

<p align="center"><img src="https://github.com/ctnguyenvn/sysadmin_level1/blob/master/Task36_CentOS6_LAMP_And_PhpBB/Image/10.png" /></p>

<p align="center"><img src="https://github.com/ctnguyenvn/sysadmin_level1/blob/master/Task36_CentOS6_LAMP_And_PhpBB/Image/11.png" /></p>

<p align="center"><img src="https://github.com/ctnguyenvn/sysadmin_level1/blob/master/Task36_CentOS6_LAMP_And_PhpBB/Image/12.png" /></p>

<p align="center"><img src="https://github.com/ctnguyenvn/sysadmin_level1/blob/master/Task36_CentOS6_LAMP_And_PhpBB/Image/13.png" /></p>

Giao diện chung của phpBB

<p align="center"><img src="https://github.com/ctnguyenvn/sysadmin_level1/blob/master/Task36_CentOS6_LAMP_And_PhpBB/Image/14.png" /></p>

<p align="center"><img src="https://github.com/ctnguyenvn/sysadmin_level1/blob/master/Task36_CentOS6_LAMP_And_PhpBB/Image/15.png" /></p>

<a name="6.2"></a>
#### 6.2 Một số chức năng cơ bản của phpBB 3.2

<a name="6.2.1"></a>
#### 6.2.1 Forums

Ở Forums ta có thể cấp quyền cho các chuyên mục, các thành viên, tạo, xóa, sửa các chuyên mục.

Ví dụ để xóa chuyên mục bất kỳ ta chọn dấu `x` tại chuyên mục muốn xóa và làm như sau

<p align="center"><img src="https://github.com/ctnguyenvn/sysadmin_level1/blob/master/Task36_CentOS6_LAMP_And_PhpBB/Image/16.png" /></p>

<p align="center"><img src="https://github.com/ctnguyenvn/sysadmin_level1/blob/master/Task36_CentOS6_LAMP_And_PhpBB/Image/17.png" /></p>

Để tạo 1 chuyên mục ta chọn `create new forum` và làm như hình

<p align="center"><img src="https://github.com/ctnguyenvn/sysadmin_level1/blob/master/Task36_CentOS6_LAMP_And_PhpBB/Image/18.png" /></p>

> Lưu ý: nếu muốn tạo 1 chủ đề cho chuyên mục nào thì phần `parent forum` chọn chuyên mục đó

Tiếp theo có thể thiết lập quyền cho các chuyên mục hay chủ đề bằng cách bôi đen phần muốn chọn (bên group hoặc bên user) và nhấn `add permission` 

<p align="center"><img src="https://github.com/ctnguyenvn/sysadmin_level1/blob/master/Task36_CentOS6_LAMP_And_PhpBB/Image/19.png" /></p>

Tiếp tục phân quyền cho các mục. Có thể phân như sau

<p align="center"><img src="https://github.com/ctnguyenvn/sysadmin_level1/blob/master/Task36_CentOS6_LAMP_And_PhpBB/Image/20.png" /></p>

> Lưu ý: Đối với group và user đều làm như nhau

<a name="6.2.2"></a>
#### 6.2.2 Posting

Ở mục này ta có thể thiết lập tin nhắn, gửi bài, biểu tượng, kiểm duyệt từ, thiết lập các tập tin...

<p align="center"><img src="https://github.com/ctnguyenvn/sysadmin_level1/blob/master/Task36_CentOS6_LAMP_And_PhpBB/Image/23.png" /></p>

Để tạo 1 post mới ta có thể đăng nhập vào trang web và chọn chủ đề muốn tạo post và làm như sau

<p align="center"><img src="https://github.com/ctnguyenvn/sysadmin_level1/blob/master/Task36_CentOS6_LAMP_And_PhpBB/Image/21.png" /></p>

<p align="center"><img src="https://github.com/ctnguyenvn/sysadmin_level1/blob/master/Task36_CentOS6_LAMP_And_PhpBB/Image/22.png" /></p>

<a name="6.2.3"></a>
#### 6.2.3 Users and Groups

Ở phần này ta có thể quản lý thành viên, cấp phép, xem, xóa... Ngoài ra ta cũng có thể quản lý và cấp phép nhóm và 1 số vấn đề bảo mật với các user và group như cấm theo email, theo nhóm hay chặn theo IP...

Ví dụ để quản lý user ta chọn `manager user` và nhập tên user cần quản lý và xem, sửa 1 số thông tin như sau

<p align="center"><img src="https://github.com/ctnguyenvn/sysadmin_level1/blob/master/Task36_CentOS6_LAMP_And_PhpBB/Image/24.png" /></p>

<p align="center"><img src="https://github.com/ctnguyenvn/sysadmin_level1/blob/master/Task36_CentOS6_LAMP_And_PhpBB/Image/25.png" /></p>

<p align="center"><img src="https://github.com/ctnguyenvn/sysadmin_level1/blob/master/Task36_CentOS6_LAMP_And_PhpBB/Image/26.png" /></p>

Hoặc để đăng ký tài khoản mới ta vào trang web chọn registry và làm như sau

<p align="center"><img src="https://github.com/ctnguyenvn/sysadmin_level1/blob/master/Task36_CentOS6_LAMP_And_PhpBB/Image/27.png" /></p>

<p align="center"><img src="https://github.com/ctnguyenvn/sysadmin_level1/blob/master/Task36_CentOS6_LAMP_And_PhpBB/Image/28.png" /></p>

<a name="6.2.4"></a>
#### 6.2.4 Permission

Tiếp theo phần này ta có thể cấp quyền cho các chuyên mục, thành viên, group...

Ví dụ để cấp quyền cho user ta làm như sau. Chọn `user permission` và điền username của user cần cấp quyền và nhấn `submit`

<p align="center"><img src="https://github.com/ctnguyenvn/sysadmin_level1/blob/master/Task36_CentOS6_LAMP_And_PhpBB/Image/29.png" /></p>

<p align="center"><img src="https://github.com/ctnguyenvn/sysadmin_level1/blob/master/Task36_CentOS6_LAMP_And_PhpBB/Image/30.png" /></p>

<a name="6.2.5"></a>
#### 6.2.5 Customise

Ở phần này ta có thể quản lý và cài đặt thêm các extentions` hoặc có thể thay đổi, cài đặt giao diện cho forum 

Ví dụ để thay đổi giao diện ta làm như sau

Đầu tiên tìm kiếm và tải theme muốn về (lưu ý chọn đúng phiên bản phpBB hiện tại). Sau đó giải nén và copy vào thư mục style trên server. Tiếp theo ta quay lại trình duyệt và chọn `Install Style` trong mục `CUSTOMISE` và chọn style vừa thêm xong nhấn install để hoàn tất cài đặt

<p align="center"><img src="https://github.com/ctnguyenvn/sysadmin_level1/blob/master/Task36_CentOS6_LAMP_And_PhpBB/Image/35.png" /></p>

Sau khi cài xong ta vào phần `Style` uninstall (lưu ý không xóa file từ hệ thống) và kích hoạt style vừa cài

Kết quả sau khi thay đổi giao diện

<p align="center"><img src="https://github.com/ctnguyenvn/sysadmin_level1/blob/master/Task36_CentOS6_LAMP_And_PhpBB/Image/36.png" /></p>

<a name="6.2.6"></a>
#### 6.2.6 Mantenance

Phần này cho phép ta xem các nhật ký như thao tác, thông tin IP, username... Ngoài ra ta có thể backup dữ liệu, phục hồi dữ liệu...

<p align="center"><img src="https://github.com/ctnguyenvn/sysadmin_level1/blob/master/Task36_CentOS6_LAMP_And_PhpBB/Image/31.png" /></p>

<a name="6.2.7"></a>
#### 6.2.7 System

Ở phần nay hỗ trợ ta update bản phpBB cũng như xem các thông tin hệ thống. Trình điều khiển của admin, các thành viên...

Ví dụ ta có thể xem phiên bản PHP của hẹ thống đang sử dụng hiện tại

<p align="center"><img src="https://github.com/ctnguyenvn/sysadmin_level1/blob/master/Task36_CentOS6_LAMP_And_PhpBB/Image/32.png" /></p>

Hoặc vô hiệu những quyền quản lý bằng cách `disable` mục muốn thay đổi

<p align="center"><img src="https://github.com/ctnguyenvn/sysadmin_level1/blob/master/Task36_CentOS6_LAMP_And_PhpBB/Image/33.png" /></p>

***

### Tham khảo

[1]. Installing & Using Styles. https://www.phpbb.com/styles/installing/
