### VNC Basic

> Tài liệu: Tìm hiểu về VNC (Virtual Network Computing)

> Thực hiện: Nguyễn Công Trứ

> Cập nhật: 22/11/2016

#### Mục lục

[1. Giới thiệu](#1)

[2. Kiến trúc hoạt động](#2)

[3. Cấu hình VNC server trên CentOS 6.5](#3)

[4. Cài đặt và sử dụng các VNC client phổ biến](#4)

- [4.1 TightVNC](#4.1)

- [4.2 TigerVNC](#4.2)

- [4.3 RealVNC](#4.3)

---

<a name="1"></a>
### 1. Giới thiệu

- Virtual Network Computing (VNC) là một hệ thống chia sẻ desktop (GUI) sử dụng Frame Buffer, cho phép điều khiển từ xa đến một máy tính khác, cho phép bạn xem (view) và sử dụng môi trường màn hình trên máy server (desktop) từ bất cứ nơi đâu trong LAN hay trên thế giới qua Internet với hầu hết những loại hệ điều hành hiện nay.

- VNC hỗ trợ nhiều máy cùng tham gia (view) vào 1 VNC server, tất cả đều đang truy cập vào 1 server như 1 session, nghĩa là bạn có thể bỏ máy này (đang hoạt động trên VNC server) sang máy khác và vẫn làm tiếp các việc dang dỡ (như đang chỉnh sửa 1 văn bản) mà desktop không có thay đổi gì.

- Ngoài việc truy cập vào server để xem, chỉnh sửa file, tài liệu thì VNC còn cũng cho phép chia sẻ file, giám sát - hỗ trợ khách hàng,...

- Ưu - nhược điểm

	+ Ưu điểm: 

		- Ưu điểm của VNC có lẽ công dụng của nó kèm với sự đơn giản và nhanh gọn. Bạn có thể view trong LAN hay bất cứ nơi đâu.

		- VNC được sử dụng rộng rãi, có thể được sử dụng hiệu quả khi bạn  muốn truy cập vào tập tin từ xa, nó đặc biệt khi bạn quên máy tính của mình ở nhà và muốn xem hay sử dụng chúng. Ngoài ra, chương trình kiểu này thường sử dụng bởi các quản trị viên hệ thống, hỗ trợ IT,... nó cũng được dùng để kiểm soát nhân viên hay đại loại cài đặt phần mềm cho họ từ xa. VNC cũng có thể sử dụng ở trường học hay bất kỳ đâu.

	+ Nhược điểm
	
		- Nhược điểm cỉa VNC là vấn đề bảo mật vì RFB không phải là một giao thức an toàn; hầu hết các trình máy khách và các VNC server đều không mã hóa dữ liệu của chúng. (VNC chỉ mã hóa mật khẩu riêng của mình, nhưng phương pháp được mô tả ở đây không sử dụng các mật khẩu này).

		- Ngoài ra, hoạt động của VNC còn phụ thuộc vào tốc độ internet của bạn, nghĩa là nếu bạn đang kết nối với đường truyền kém (chậm) thì việc kết nối cũng như chia sẻ file, chỉnh sửa tài liệu,... cũng sẽ bị ảnh hưởng, chưa kể đến vấn đề virus trên các hệ thống.

<a name="2"></a>
### 2. Kiến trúc hoạt động

- Linux sử dụng Hệ thống Window X (gọi tắt là X ) là giao diện người dùng đồ họa (GUI). X là một GUI khác thường theo nhiều cách, một trong số đó là nó vốn dĩ là một mạng lưới được kích hoạt. Một X server (X server) theo nghĩa đen là một chương trình máy chủ mạng. Các chương trình máy chủ mạng cung cấp cho các trình máy khách (client) truy cập vào các tài nguyên cục bộ và điều này cũng đúng với một X server. Điều lạ lùng là ở chỗ "các tài nguyên cục bộ" trong trường hợp của một X server là màn hình hiển thị, bàn phím và chuột, mà người dùng sử dụng. Trong hầu hết cấu hình phổ biến, các X client chạy trên cùng một máy tính nơi trình máy chủ chạy. Như vậy, LibreOffice, GIMP (GNU Image Manipulation Program – Chương trình thao tác ảnh GNU) hoặc các chương trình khác là các X server, mà nó sử dụng các giao thức mạng của X để nhận đầu vào người dùng và hiển thị kết quả đầu ra cho những người dùng trên cùng một máy tính.

- Tuy nhiên, khi X được sử dụng trên một mạng thì người dùng ngồi tại máy tính chạy X server và các X client chính là các chương trình mà người dùng muốn chạy trên một máy tính khác. Cấu hình này đòi hỏi một giao thức mạng thứ hai để khởi đầu kết nối. Giao thức thứ hai này có thể là telnet, Secure Shell (SSH) hoặc XDMCP. Trình máy chủ cho giao thức đăng nhập này chạy trên máy tính của X client và trình máy khách đăng nhập từ xa chạy trên máy tính của X server. Trình máy chủ đăng nhập từ xa khởi chạy các X client, mà các trình X client này lần lượt liên hệ với X server. 

	![](https://github.com/hellsins/sysadmin_level1/blob/master/Task18_VNC_Basic/img/2.png)

- Kiểu thiết lập này hoạt động tốt trên nhiều mạng cục bộ, nhưng nó có nhược điểm. Ví dụ, cấu hình này yêu cầu phải khởi đầu giao thức mạng hai chiều, mà có lẽ giao thức này không thể thực hiện được xuyên qua một số tường lửa hoặc các bộ định tuyến dịch địa chỉ mạng (NAT). (SSH có thể tạo đường hầm cho các phiên làm việc X, tránh được yêu cầu này). Hơn nữa, mặc dù các X server có sẵn cho hầu hết các nền tảng, nhưng chúng thường không được cài đặt trên các máy tính chạy hệ điều hành Windows. Vì các lý do này và khác, nhiều trang web thích sử dụng một giao thức khác, đó là RFB (Remote Frame Buffer - Bộ đệm khung từ xa), được triển khai thực hiện trong họ các chương trình VNC.

- VNC là một công cụ nhiều nền tảng, có thể cung cấp truy cập từ xa tới Linux, UNIX, Mac OS X, Windows và các hệ thống khác từ bất kỳ kiểu trình máy khách nào. Với VNC, người dùng ngồi tại máy tính của trình máy khách và truy cập một máy tính của trình máy chủ từ xa. Trên Linux, VNC server hoặc phản chiếu các nội dung của màn hình của X server cục bộ đến máy tính từ xa hoặc bao gồm X server riêng của mình, có thể chạy một cách độc lập với trình máy chủ quản lý màn hình cục bộ. Kết quả tương tự như Hình 2. Một lần nữa, mũi tên nét đứt chỉ thị sự bắt đầu của phiên làm việc. Cấu hình này giúp loại bỏ yêu cầu kết nối mạng đảo ngược và vì các trình máy khách và các VNC server đều có mặt trên nhiều hệ điều hành, nên những người dùng có thể sử dụng một chương trình máy khách duy nhất để truy cập bất kỳ trình máy chủ nào

	![](https://github.com/hellsins/sysadmin_level1/blob/master/Task18_VNC_Basic/img/3.png)

- Nhược điểm của VNC là ở chỗ việc xác thực RFB dựa trên các mật khẩu mà không cần các tên người dùng. Như vậy, mỗi người dùng phải khởi chạy một phiên làm việc của VNC server độc lập và kết nối tới cá thể VNC đó bằng cách chỉ định số cổng đúng. Yêu cầu này có thể chấp nhận được trên một hệ thống chỉ có một người dùng, nhưng lại vô cùng bất tiện trên một máy tính có nhiều người dùng.

- Để giải quyết vấn đề này, bạn có thể kết hợp hai giải pháp. Bạn có thể cấu hình lại XDMCP server cục bộ của mình để giúp X server đã tích hợp vào VNC cung cấp việc xác thực nhiều người dùng còn thiếu. Mũi tên nét đứt cho thấy sự bắt đầu của phiên làm việc. Bây giờ, khi những người dùng VNC từ xa liên hệ với máy tính của VNC server, họ sẽ có thể nhập vào các tên người dùng và mật khẩu của mình để truy cập các phiên làm việc VNC duy nhất riêng của họ, vì thế máy tính có thể xử lý bao nhiêu người dùng tùy ý bạn

	![](https://github.com/hellsins/sysadmin_level1/blob/master/Task18_VNC_Basic/img/4.png)

Bạn có thể xem thêm tại [đây](http://www.hep.phy.cam.ac.uk/vnc_docs/howitworks.html)

<a name="3"></a>
### 3. Cấu hình VNC server trên CentOS 6.5

- Trên CentOS ta sử dụng tigervnc để cài đặt vnc server. Để cài đặt tigervnc-server ta dùng lệnh sau

	**yum -y install tigervnc-server**

- Sau khi cài xong, ta đăng nhập vào user muốn làm vnc server (có thể tạo user riêng hoặc lấy user bất kỳ kể cả root).  Lệnh tạo user mới **useradd [user_name]**

- Tiếp tục ta đổi password cho vnc server như sau

	![](https://github.com/hellsins/sysadmin_level1/blob/master/Task18_VNC_Basic/img/5.png)

- Tiếp tục ta vào file cấu hình **/etc/sysconfig/vncserver** và sửa như sau

	![](https://github.com/hellsins/sysadmin_level1/blob/master/Task18_VNC_Basic/img/6.png)

- Sau đó ta cần accept port cần thiết (thường là 5901, 5902,...) trên firewall. Bạn có thể dùng giao diện, hoặc vào file **/etc/sysconfig/iptables** để chỉnh sửa hay có thể dùng lệnh sau

	**sudo iptables -I INPUT 5 -m state --state NEW -m tcp -p tcp -m multiport --dports 5901:5903 -j ACCEPT**

	**service iptables restart** // khởi động lại firewall

- Cuối cùng bạn start vncserver với lệnh

	**sudo service vncserver start**

> Bạn có thể thêm vncserrver vào lúc khởi động với lệnh **sudo chkconfig vncserver on**

<a name="4"></a>
### 4. Cài đặt và sử dụng các VNC client phổ biến

<a name="4.1"></a>
#### 4.1 TightVNC 

TightVNC là phần mềm mã nguồn mở.

TightVNC có chứa sằn 2 phần TightVNC server(chạy trên máy chủ) và TightVNC client(máy khách). TightVNC server khi chạy sẽ biến máy bạn trở thành máy chủ cho phép các máy khách truy cập từ xa để điền khiển máy này. TightVNC client phía bên máy khách thì sẽ cung cấp cho bạn cách để truy cập vào máy chủ.

- Mở file vừa tải về và làm như hình 

	![](https://github.com/hellsins/sysadmin_level1/blob/master/Task18_VNC_Basic/img/7.png)

	![](https://github.com/hellsins/sysadmin_level1/blob/master/Task18_VNC_Basic/img/8.png)

	![](https://github.com/hellsins/sysadmin_level1/blob/master/Task18_VNC_Basic/img/9.png)

	![](https://github.com/hellsins/sysadmin_level1/blob/master/Task18_VNC_Basic/img/10.png)

- Sau khi cài xong ta đăng nhập vào vncserver như sau

	![](https://github.com/hellsins/sysadmin_level1/blob/master/Task18_VNC_Basic/img/11.png)

	![](https://github.com/hellsins/sysadmin_level1/blob/master/Task18_VNC_Basic/img/12.png)

- Ta có thể xem thanh công cụ mà tigerVNC hỗ trợ như share file, add key,... và một số cơ bản khác

	![](https://github.com/hellsins/sysadmin_level1/blob/master/Task18_VNC_Basic/img/13.png)


<a name="4.2"></a>
#### 4.2 TigerVNC

TigerVNC là một nguồn và đa nền tảng dự án mở cung cấp cho người dùng với một khách hàng và máy chủ thực hiện, nó hỗ trợ Linux, Microsoft Windows và các hệ điều hành Mac OS X.

Để sử dụng tightVNC đầu tiên ta cài đặt như sau

**#apt-get -y install tigervnc**

Kết nối với một máy chủ VNC sử dụng lệnh sau

**# vncviewer host_name:port**

hoặc
	
**# vncviewer 192.168.0.4:3**

<a name="4.3"></a>
#### 4.3 RealVNC

Đây là phần mềm phổ biến nhất, hỗ trợ hầu hết các nền tảng hệ điều hành hiện nay như windows, linux, solaris,...

Đối với windows bạn tải về tại [đây](https://www.realvnc.com/download/vnc/). Sau khi bạn tải về thì có thể sử dụng ngay mà không cần cài đặt

![](https://github.com/hellsins/sysadmin_level1/blob/master/Task18_VNC_Basic/img/14.png)

![](https://github.com/hellsins/sysadmin_level1/blob/master/Task18_VNC_Basic/img/15.png)

![](https://github.com/hellsins/sysadmin_level1/blob/master/Task18_VNC_Basic/img/16.png)

![](https://github.com/hellsins/sysadmin_level1/blob/master/Task18_VNC_Basic/img/17.png)

Tương tự như các phần mềm trên thì RealVNC cũng hỗ trợ các thao tác cơ bản trên thanh công cụ

Ngoài 3 phần mềm trên thì còn nhiều phần mềm hỗ trợ clien VNC khác như [UltraVNC ](http://www.uvnc.com/) hay có thể remote qua add-on trình duyệt
