
### CentOS6 LAMP With Virtualhost 

> Thực hiện: Nguyễn Công Trứ

> Cập nhật: 07/04/2017

### Mục lục

[1. Giới thiệu VirtualHost và Opencart](#1)

- [1.1 VirtualHost](#1.1)

- [1.2 Opencart](#1.2)

[2. Cài đặt](#2)

- [2.1 Cài đặt LAMP](#2.1)

	+ [2.1.1 Cài đặt apache 2](#2.1.1)

	+ [2.1.2 Cài đặt mysql 5.1](#2.1.2)

	+ [2.1.3 Cài đặt PHP 7.0](#2.1.3)

- [2.2 Cấu hình VirtualHost và cài đặt nhiều website lên 1 server](#2.2)

	+ [2.2.1 Cài đặt phpBB3](#2.2.1)

	+ [2.2.2 Cài đặt wordpress ](#2.2.2)

	+ [2.2.3 Cài đặt Opencart](#2.2.3)

***

<a name="1"></a>
### 1. Giới thiệu VirtualHost và Opencart

<a name="1.1"></a>
#### 1.1 VirtualHost

Virtual Host là một cấu hình trong Apache để cho phép nhiều domain cùng chạy trên một máy chủ. Có một khái niệm khác được đề cập tới trong Nginx cũng có chức năng tương tự như Virtual Host được gọi là Server Block. 

Một phần không thể thiếu của một máy chủ web (bao gồm cả Apache, Nginx, Lighttpd…) là chạy nhiều web trên 1 server. Bạn có thể thêm domain vào máy chủ và cấu hình chúng riêng rẽ. Mỗi cấu hình như vậy được gọi là một virtual host.

Mỗi một virtual host sẽ quy định cho mỗi tên miền riêng biệt. Bạn có thể tạo ra vô số virtual host để thêm domain vào VPS và chạy nhiều web trên 1 server.

<a name="1.2"></a>
#### 1.2 Opencart

OpenCart là một  CMS mã nguồn mở phát triển dành cho các hệ thống bán hàng trực tuyến online hay còn gọi là thương mại điện tử. Nó được phát triển trên ngôn ngữ lập trình PHP và sử dụng mô hình MVC(L) để xây dựng cấu trúc. Opencart được phát triển từ năm 1999, cho đến thời điểm hiện tại nó vẫn không ngừng cải tiến và chiếm lĩnh thị trường Thương Mại Điện Tử (TMDT)

__Ưu điểm__:

- Quản lý được đa cửa hàng

- Dễ sử dụng và phát triển đối với cả người dùng và developer

- Nguồn tài nguyên phong phú từ internet và hỗ trợ gần như bất cứ vấn đề gì bạn gặp phải – một điều khá quan trọng với developer

- Dễ dàng tùy biến mã nguồn

- Hỗ trợ nhiều module và template miễn phí.

- Hỗ trợ backup và restore

- Hỗ trợ đa ngôn ngữ và affiliate marketing (chương trình cộng tác viên để tăng doanh số bán hàng)

- Ngoài ra còn 1 số tính năng nổi bật như: 

	+ Có hệ thống giỏ hàng

	+ Hệ thống tính điểm Coupon

	+ Thẻ quà tặng

	+ Xếp hạng các hạng mục sản phẩm

	+ Hỗ trợ tốt các thẻ meta keywork, descriptions cho SEO

	+ Đa tiền tệ

	+ Đại lý

	+ Sao lưu và phục hồi

	+ Giao diện quản trị thân thiện dễ sử dụng, quản trị và nâng cấp, nhiều tùy chọn

	+ Tích hợp đầy đủ các công cụ thống kê , phân tích và quản lý đơn hàng.


__Nhược điểm__:

- Dễ sinh lỗi khi dùng với vqmod.

- Module chưa linh hoạt.

- Chức năng còn thiếu sót và phải tối ưu nhiều

<a name="2"></a>
### 2. Cài đặt

<a name="2.1"></a>
#### 2.1 Cài đặt LAMP

<a name="2.1.1"></a>
#### 2.1.1 Cài đặt apache 2

Để cài đặt apache 2 ta làm như sau

	yum install httpd

Khởi động service

	service httpd start

<a name="2.1.2"></a>
#### 2.1.2 Cài đặt mysql 5.1

Để cài đặt mysql 5.1 ta làm như sau

	yum install mysql-server

Khởi động service

	service mysqld start

Set mật khẩu cho root

	mysql_secure_installation 

- Tiếp theo ta làm như sau

```
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
```

> Lưu ý: Cần accept port 3306 của firewall như sau:

> iptables -I INPUT 5 -p tcp -m state --state NEW -m tcp --dport 3306 -j ACCEPT

<a name="2.1.3"></a>
#### 2.1.3 Cài đặt PHP 7.0

Để cài đặt, trước tiên bạn phải thêm các thông tin kho Webtatic EL tương ứng với phiên bản CentOS/RHEL của bạn

	rpm -Uvh https://dl.fedoraproject.org/pub/epel/epel-release-latest-6.noarch.rpm

	rpm -Uvh https://mirror.webtatic.com/yum/el6/latest.rpm 

Tiếp theo cài đặt PHP 7.0 ta dùng lệnh sau

	yum install  php70w  php70w-gd php70w-mysql php70w-xml php70w-mcrypt

> Lưu ý: `php70w-gd php70w-mysql php70w-xml php70w-mcrypt` là những gói hỗ trợ cho các website chạy trên nền `phpBB`, `wordpress`, `opencart` mà ta sẽ cài phía dưới

<a name="2.2"></a>
#### 2.2 Cấu hình VirtualHost và cài đặt nhiều website lên 1 server

Để cấu hình VirtualHost trên apache 2 trong CentOS 6.8 ta là như sau

_-Bước 1__. Tạo thư mục chưa các website. Ở đây tôi dùng thư mục `/var/www` nên không cần tạo. Nếu bạn muốn tạo 1 folder riêng thì có thể tạo như sau

	# mkdir  /var/www/[name_folder]

__Bước 2__. Cấu hình file `/etc/http/conf/httpd.conf` như sau

	vi /etc/http/conf/httpd.conf

Và chỉnh sửa 

- Dòng 276: ServerName [IP của máy]:80

	Ví dụ: ServerName 192.168.251.135:80

- Dòng 292: DocumentRoot "/var/www/[folder_virtualhost]"

	Ví dụ: DocumentRoot "/var/www/"

- Dòng 317: <Directory "/var/www/[folder_virtualhost]">

	Ví dụ: <Directory "/var/www/">

> Lưu ý: Vì tôi sử dụng thư mục `/var/www` làm thư mục root cho VirtualHost nên mới cấu hình như trên

Tiếp theo phần cấu hình cho nhiều website chạy trên 1 server. Cũng file `/etc/http/conf/httpd.conf` ta thêm như sau

![](https://github.com/hellsins/sysadmin_level1/blob/master/Task38_CentOS6_LAMP_With_Virtualhost/Image/1.png)

Lưu ý: Ở đây tôi muốn dùng 3 website nên cần cấu hình VirtualHost như sau

- Dòng 990 là cấu hình tất cả VirtualHost lắng nghe trên port 80 (bạn có thể thay đổi)

- __ServerAdmin__ là từ khóa khai báo địa chỉ email của admin (Không bắt buộc)

- __ServerName__ là domain của website mà bạn chọn

- __ServerAlias__ là alias cho domain, mặc định sẽ không có nhưng bạn có thể thêm

- __DocumentRoot__ là thư mục dẫn tới folder chứa website của bạn

> Lưu ý: Bạn có thể thêm website nữa bằng cách thiết lập thêm như hình. Bạn có thể thamkhaor nhiều hơn tại [đây](http://httpd.apache.org/docs/2.4/en/mod/core.html)

__Bước 3__. Khởi động service

	service httpd restart

Tiếp theo để kiểm tra các trang web đã truy cập được chưa ta mở trình duyệt và vào trực tiếp đến domain mà bạn đã cấu hình (lưu ý là không nên dùng IE browser và ghi đầy đủ http://domain)

Ở đây tôi test trên máy local nên cần thay đổi file `/etc/hosts` như sau

![](https://github.com/hellsins/sysadmin_level1/blob/master/Task38_CentOS6_LAMP_With_Virtualhost/Image/2.png)

<a name="2.1.1"></a>
#### 2.2.1 Cài đặt phpBB3

Đầu tiên ta tạo database để sử dụng cho phpBB3 như sau

![](https://github.com/hellsins/sysadmin_level1/blob/master/Task38_CentOS6_LAMP_With_Virtualhost/Image/3.png)

Sau đó tải phpBB3 về và giải nén vào thư mục Root VirtualHost cấu hình phía trên

	wget https://www.phpbb.com/files/release/phpBB-3.2.0.zip 

	unzip phpBB-3.2.0.zip 

	cp phpBB3 /var/www/

Tiếp theo có 1 số file cần phần quyền để có thể ghi dữ liệu. Chúng là `cache, files, stories, file config.php, images/avatar/upload`. Chúng ta nên sử dụng chmod 777 cho những file/folder này

![](https://github.com/hellsins/sysadmin_level1/blob/master/Task38_CentOS6_LAMP_With_Virtualhost/Image/3.1.png)

Tiếp theo ta lên trình duyệt vào trang web và cấu hình như sau

Chọn phần install và nhấn submit

![](https://github.com/hellsins/sysadmin_level1/blob/master/Task38_CentOS6_LAMP_With_Virtualhost/Image/4.png)

Tạo tài khoản quản trị

![](https://github.com/hellsins/sysadmin_level1/blob/master/Task38_CentOS6_LAMP_With_Virtualhost/Image/5.png)

Kết nối database

![](https://github.com/hellsins/sysadmin_level1/blob/master/Task38_CentOS6_LAMP_With_Virtualhost/Image/6.png)

Tiếp theo để configure 1 số thứ ta làm như sau

![](https://github.com/hellsins/sysadmin_level1/blob/master/Task38_CentOS6_LAMP_With_Virtualhost/Image/7.png)

![](https://github.com/hellsins/sysadmin_level1/blob/master/Task38_CentOS6_LAMP_With_Virtualhost/Image/8.png)

![](https://github.com/hellsins/sysadmin_level1/blob/master/Task38_CentOS6_LAMP_With_Virtualhost/Image/9.png)

![](https://github.com/hellsins/sysadmin_level1/blob/master/Task38_CentOS6_LAMP_With_Virtualhost/Image/10.png)

Cài đặt thành công và đây là trang chủ

![](https://github.com/hellsins/sysadmin_level1/blob/master/Task38_CentOS6_LAMP_With_Virtualhost/Image/11.png)

> Lưu ý: Chúng ta nên xóa thư mục `install` trong folder `/var/www/phpBB3` sau khi cài đặt

<a name="2.2.2"></a>
#### 2.2.2 Cài đặt wordpress 

Để dể hiểu ta tạo database khác sử dụng cho wordpress như sau

![](https://github.com/hellsins/sysadmin_level1/blob/master/Task38_CentOS6_LAMP_With_Virtualhost/Image/12.png)

Tiếp tục ta tải wordpress, giải nén và copy vào thư mục Root VirtualHost đã cấu hình phía trên

	wget  http://wordpress.org/latest.tar.gz

	tar  -xzvf  latest.tar.gz 

	cp  wordpress  /var/www/

Sau đó vào `/var/www/wordpress` và copy file mẫu `wp-config-sample.php` thành file `wp-config.php` và chỉnh như sau

	cp /var/www/wordpress/wp-config-sample.php /var/www/wordpress/wp-config.php

	vi  /var/www/wordpress/wp-config.php

![](https://github.com/hellsins/sysadmin_level1/blob/master/Task38_CentOS6_LAMP_With_Virtualhost/Image/13.png)

> Lưu ý: Ta phải điền đúng `database name`, `user`, `password` đúng giữa CSDL mysql và file `wp-config.php`

Khởi động lại service

	service httpd restart

Tiếp theo lên trình duyệt và vào trang web và cấu hình như sau

![](https://github.com/hellsins/sysadmin_level1/blob/master/Task38_CentOS6_LAMP_With_Virtualhost/Image/14.png)

Trang chủ wp-admin

![](https://github.com/hellsins/sysadmin_level1/blob/master/Task38_CentOS6_LAMP_With_Virtualhost/Image/15.png)

<a name="2.2.3"></a>
####2.2.3 Cài đặt Opencart

Tiếp tục ta tạo database cho opencart như sau

![](https://github.com/hellsins/sysadmin_level1/blob/master/Task38_CentOS6_LAMP_With_Virtualhost/Image/16.png)

Bây giờ ta tải opencart và copy vào thư mục Root VirtualHost như sau

	wget https://github.com/opencart/opencart/archive/master.zip

	unzip master.zip

	cp opencart-master  -d  /var/www/opencart

Tiếp theo ta copy file `wp-config-sample.php` thành file `wp-config.php` ở thư mục hiện tại và thư mục `admin`. Sau đó phân quyền như sau

![](https://github.com/hellsins/sysadmin_level1/blob/master/Task38_CentOS6_LAMP_With_Virtualhost/Image/17.png)

Khởi động lại service

	service httpd restart

Tiếp theo lên trình duyệt và vào trang web và cấu hình như sau

![](https://github.com/hellsins/sysadmin_level1/blob/master/Task38_CentOS6_LAMP_With_Virtualhost/Image/18.png)

![](https://github.com/hellsins/sysadmin_level1/blob/master/Task38_CentOS6_LAMP_With_Virtualhost/Image/19.png)

> Lưu ý: Nếu không phân quyền các file, folder như phía trên hoặc thiếu các gói `php70w` như `php70w-mcrypt` thì bưóc này sẽ sinh lỗi

Connect database

![](https://github.com/hellsins/sysadmin_level1/blob/master/Task38_CentOS6_LAMP_With_Virtualhost/Image/20.png)

> Lưu ý: Ta cần xóa thư mục `install` như cảnh báo trên hình

![](https://github.com/hellsins/sysadmin_level1/blob/master/Task38_CentOS6_LAMP_With_Virtualhost/Image/21.png)

Login vào tài khoản quản trị

![](https://github.com/hellsins/sysadmin_level1/blob/master/Task38_CentOS6_LAMP_With_Virtualhost/Image/22.png)

Đây là trang chủ quản trị của opencart

![](https://github.com/hellsins/sysadmin_level1/blob/master/Task38_CentOS6_LAMP_With_Virtualhost/Image/23.png)

> Lưu ý:  Ta cần vào đường dẫn đầy đủ là `http://domain.com/upload`. Nếu không thêm vào upload thì sẽ là đường dẫn sai. Bạn có thể đổi tên thư mục này hoặc cũng có thể copy toàn bộ nội dung thư mục `upload` và vào `http://domain.com` trên trình duyệt mà không cần thêm vào `upload` phía sau.

***
#### Tham khảo

[1]. Nguyễn Tứ. (2015). Tạo Virtual Host trên Apache để chạy nhiều web trên 1 server. https://www.sitecuatui.com/virtual-host-apache-ubuntu/

[2]. (2017). Cấu hình Virtual Host trong XAMPP. https://kipalog.com/posts/Cau-hinh-Virtual-Host-trong-XAMPP

[3]. Opencart là gì? Những tính năng nổi bật của Opencart so với WordPress. https://www.webico.vn/opencart-la-gi/

***