
### CentOS6 LAMP And WordPress

> Tài liệu: Tìm hiểu về LAMP và WordPress trên CentOS 6

> Thực hiện: Nguyễn Công Trứ

> Cập nhật: 22/02/2017

### Mục lục

[1. Giới thiệu về LAMP](#1)

[2. Cấu hình IP tĩnh](#2)

[3. Cấu hình SSH sử dụng public key](#3)

[4. Cập nhật CentOS 6.8](#4)

[5. Cài đặt LAMP](#5)

- [5.1 Cài đặt Apache 2](#5.1)

- [5.2 Cài đặt MySQL](#5.2)

- [5.3 Cài đặt PHP](#5.3)

[6. Cài đặt WordPress ](#6)

***

<a name="1"></a>
### 1. Giới thiệu về LAMP

LAMP là chữ viết tắt thường được sử dụng để chỉ việc sử dụng các phần mềm **L**inux, **A**pache, **M**ySQL, và **P**HP (hay Python hoặc Perl) để tạo nên 1 môi trường máy chủ web có khả năng chứa và phân phối các trang web động.

Chúng ta sẽ tìm hiểu sơ về các thành phần tạo lên LAMP

- __Linux__ là 1 hệ điều hành mã nguồn mở dưới bản quyền của tổ chức GNU

- __Apache__  là phần mềm máy chủ web phổ biến hiện nay. Nó an toàn và nhanh chóng, đáng tin cậy. Apache còn hỗ trợ PHP, CGI / Perl, SSL, SSI, ePerl.

- __MySQL__ là hệ quản trị cơ sở dữ liệu nhanh chóng hiện nay, trở thành cơ sở dữ liệu nguồn mở lớn nhất thế giới vì hiệu suất cao, độ tin cậy cao và dể sử dụng. Rất tốt cho các ứng dụng web.

- __PHP__ được phát triển như 1 ngôn ngữ script trên máy chủ, PHP luôn khẳng định vị trí của mình trên môi trường web. Với lợi thế xử lý nhanh, tương thích với nhiều nền tảng hệ điều hành và được cập nhật liên tục.

Một số ưu điểm khi dùng LAMP: 

- Miễn phí bản quyền phần mềm nên tránh vi phạm bản quyền phần mềm

- An toàn cao và ngày càng phổ biến hiện nay, được sử dụng rộng rãi nên cộng đồng hỗ trợ cũng tốt hơn

- Không đòi hỏi cấu hình phần cứng quá cao cho việc triển khai ứng dụng


<a name="2"></a>
### 2. Cấu hình IP tĩnh

Để cấu hình IP tĩnh ta mở file sau sử dụng `vi` (hoặc editer khác)

	vi /etc/sysconfig/network-scripts/ifcfg-eth0 

Sau đó chỉnh như sau

<p align="center"><img src="https://github.com/hellsins/sysadmin_level1/blob/master/Task32_CentOS6_LAMP_And_WordPress/Image/1.png" /></p>

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
	
	vi id_rsa  `(paste nội dung copy ở t	rên vào file này)`
	
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

	mkdir /var/www/html/web1   			# web1 là tên web mới

	touch /var/www/html/web1/index.html 		# Tạo 1 trang để test

Tiếp theo ta chỉnh 1 số dòng trong file `/etc/httpd/conf/httpd.còn`

	vi /etc/httpd/conf/httpd.conf

- Dòng 276: ServerName [IP của máy]:80

	Ví dụ: ServerName 192.168.251.135:80

- Dòng 292: DocumentRoot "/var/www/html/[ten_web]"

	Ví dụ: DocumentRoot "/var/www/html/web1"

- Dòng 317: <Directory  "/var/www/html/[ten_web]">

	Vi dụ: <Directory  "/var/www/html/web1">

Khởi động lại httpd

	service httpd start 

> Lưu ý: Cần accept port 80 của firewall như sau:

> 	iptables -I INPUT 5 -p tcp -m state --state NEW -m tcp --dport 80 -j ACCEPT 

Cuối cùng dùng trình duyệt sẽ được

<p align="center"><img src="https://github.com/hellsins/sysadmin_level1/blob/master/Task32_CentOS6_LAMP_And_WordPress/Image/2.png" /></p>

<a name="5.2"></a>
#### 5.2 Cài đặt MySQL 5.1

Để cài đặt MySQL ta dùng lệnh

	yum install mysql-server

Sau đó thêm dòng sau như hình vào file `/etc/my.cnf`

<p align="center"><img src="https://github.com/hellsins/sysadmin_level1/blob/master/Task32_CentOS6_LAMP_And_WordPress/Image/3.png" /></p>

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
		New password:     # input any password
		Re-enter new password:
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

Để cài đặt PHP 7.0 ta dùng lệnh sau

	yum install  php70w  

Một số thư viện hỗ trợ PHP 

 	yum install php70w-gd  php70w-mysql  php70w-xml  php70w-xmlrpc 

Để kiểm tra ta tạo file info.php ở thư mục web1 phía trên với nội dung sau

```php
<?php
phpinfo();
?>
```

<p align="center"><img src="https://github.com/hellsins/sysadmin_level1/blob/master/Task32_CentOS6_LAMP_And_WordPress/Image/4.png" /></p>

<a name="6"></a>
### 6. Cài đặt WordPress 

Đầu tiên dùng wget tải wordpress mới nhất và giải nén như sau

	wget http://wordpress.org/latest.tar.gz

	tar -xzvf latest.tar.gz 

Tiếp theo dùng MySQL tạo database kết nối với wordpress như sau

<p align="center"><img src="https://github.com/hellsins/sysadmin_level1/blob/master/Task32_CentOS6_LAMP_And_WordPress/Image/5.png" /></p>

Tiếp theo vào thư mục wordpress vừa giải nén trên và copy file mẫu `wp-config-sample.php` thành file`wp-config.php` và chỉnh như sau

	cp ~/wordpress/wp-config-sample.php ~/wordpress/wp-config.php

	vi  ~/wordpress/wp-config.php

<p align="center"><img src="https://github.com/hellsins/sysadmin_level1/blob/master/Task32_CentOS6_LAMP_And_WordPress/Image/6.png" /></p>

Sau đó copy hoặc move thư mục này vào /var/www/html

	mv ~/wordpress /var/www/html/

Cuối cùng khởi động lại httpd

	service httpd restart 

> Lưu ý: 

> 	-  **php70w-gd** và `php70w-mysql` là package quan trọng khi cài wordpress vì vậy nếu thiếu package này thì sẽ xuất hiện lỗi `Your PHP installation appears to be missing the MySQL extension which is required by WordPress.`

> 	- Vì bây giờ có thêm thư mục wordpress nữa nên ta phải đổi DocumentRoot và Directory của service httpd thành `/var/www/html`

> 	- Thông tin trên database tạo với MySQL phải trùng với file wp-config.php nếu không sẽ lỗi

Sau khi cấu hình thành công ta có thể đăng ký tài khoản và login

<p align="center"><img src="https://github.com/hellsins/sysadmin_level1/blob/master/Task32_CentOS6_LAMP_And_WordPress/Image/7.png" /></p>

<p align="center"><img src="https://github.com/hellsins/sysadmin_level1/blob/master/Task32_CentOS6_LAMP_And_WordPress/Image/8.png" /></p>

<p align="center"><img src="https://github.com/hellsins/sysadmin_level1/blob/master/Task32_CentOS6_LAMP_And_WordPress/Image/9.png" /></p>

***

### Tham Khảo

[1]. LAMP. https://vi.wikipedia.org/wiki/LAMP

[2]. Install MySQL 5.1. http://www.server-world.info/en/note?os=CentOS_6&p=mysql&f=1

[3]. Install Apache httpd. http://www.server-world.info/en/note?os=CentOS_6&p=httpd&f=1

[4]. Etel Sverdlov. (2012). How To Install Wordpress on Centos 6. https://www.digitalocean.com/community/tutorials/how-to-install-wordpress-on-centos-6--2

***
