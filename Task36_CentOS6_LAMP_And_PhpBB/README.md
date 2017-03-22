
### CentOS6 LAMP And PhpBB

> Tài liệu: Tìm hiểu về LAMP và PhpBB trên CentOS 6

> Thực hiện: Nguyễn Công Trứ

> Cập nhật: 22/03/2017

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

<p align="center"><img src="https://github.com/hellsins/sysadmin_level1/blob/master/Task36_CentOS6_LAMP_And_PhpBB/Image/1.png" /></p>

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

Tiếp theo ta tạo RSA key trên server như sau

	ssh-keygen -t rsa

> Lưu ý: 

> 	- Nhấn Enter để bỏ qua passphrase. 

> 	- Key tạo ra được lưu tại ~/.ssh

Tiếp theo ta tạo file `authorized_keys` (nội dung là nội dung của file `id_rsa.pub`) và phân quyền cho nó

	mv id_rsa.pub authorized_keys

	chmod 600 authorized_keys

Tiếp theo đối với file `id_rsa` ta copy nội dung. Sau đó vào máy client dùng quyền root tạo thư mục `.ssh` tại home của user muốn kết nối ssh tới server. Cuối cùng tạo 1 file mới trong thư mục `.ssh` có tên là `id_rsa` và paste nội dung vừa copy phía trên vào, sau đó phân quền file này như sau

	mkdir /home/[user]/.ssh

	cd /home/[user]/.ssh
	
	vi id_rsa  `(paste nội dung copy ở trên vào file này)`
	
	chmod 600 /home/[user]/.ssh/id_rsa

Cuối cùng restart lại ssh trên server 

	service ssh restart


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

<p align="center"><img src="https://github.com/hellsins/sysadmin_level1/blob/master/Task36_CentOS6_LAMP_And_PhpBB/Image/2.png" /></p>

<a name="5.2"></a>
#### 5.2 Cài đặt MySQL 5.1

Để cài đặt MySQL ta dùng lệnh

	yum install mysql-server

Sau đó thêm dòng sau như hình vào file `/etc/my.cnf`

<p align="center"><img src="https://github.com/hellsins/sysadmin_level1/blob/master/Task36_CentOS6_LAMP_And_PhpBB/Image/3.png" /></p>

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

	yum install  php70w  

Để kiểm tra ta tạo file info.php ở thư mục mysite phía trên với nội dung sau

```php
<?php
phpinfo();
?>
```

<p align="center"><img src="https://github.com/hellsins/sysadmin_level1/blob/master/Task36_CentOS6_LAMP_And_PhpBB/Image/4.png" /></p>

<a name="6"></a>
### 6. Cài đặt phpBB

Đầu tiên ta dùng wget tải phpbb về và giải nén sau đó copy vào thư mục /var/www/html/ (đây xem như là thư mục root cho phpbb) như sau

```
wget https://www.phpbb.com/files/release/phpBB-3.2.0.zip
unzip phpBB-3.2.0.zip
mv phpBB3 /var/www/html/phpbb
```

Tiếp theo ta cần tạo 1 database với mysql như sau

<p align="center"><img src="https://github.com/hellsins/sysadmin_level1/blob/master/Task36_CentOS6_LAMP_And_PhpBB/Image/5.png" /></p>

