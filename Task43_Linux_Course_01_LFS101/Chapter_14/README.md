
### Network Operations

### Mục lục

[1. Network address and DNS](#1)

[2. Network configuration and Tools](#2)

[3. Browsers](#3)

[4. Transferring Files](#4)

***
<a name="1"></a>
### 1. Network address and DNS

<a name="2"></a>
### 2. Network configuration and Tools

Các file cấu hình mạng là cần thiết để mạng hoạt động một cách chính xác. Chúng thường được lưu ở cấu thư mục `/etc`. Tuy nhiên có thể đối với mỗi bản phân phối khác nhau các file sẽ được lưu khác nhau như đối với các hệ thống Debian, các file cấu hình mạng được tìm thấy tại `/etc/network/`; với Fedora và SUSE chúng được lưu ở `/etc/sysconfig/network`.

Một công cụ phổ biến được sử dụng rộng rãi trong hầu hết các bản phân phối là Network Manager. Nó cho phép người dùng các công cụ như **nmtui** hay **nmcli** cho phép cấu hình mạng thông qua GUI hay CLI.

Các network interface là một kênh kết nói giữa thiết bị và mạng. Về mặt vật lý, các network interface có thể tiến hành thông qua một card mạng hay còn gọi là NIC (Network Interface Card).

Thông tin về các kết nối mạng có thể được hiển thị thông qua `ifconfig`, hoặc có thể thêm đường dẫn đầy đủ `/sbin/ifconfig`. Ngoài ra có thể sử dụng `ip`. Một vào bản phân phối linux mới không cài đặt các `net-tools` mặc định và bạn có thể cài đặt chúng để sử dụng `ifconfig`.

Để xem địa chỉ IP sử dụng `ip` ta dùng 

	$ ip  addr  show

Để xem định tuyến ta dùng

	$ ip  route  show

Công cụ `ping` cho phép ta kiểm tra một hót/máy chủ từ xa có còn sống không bằng việc gửi/nhận kết nối từ host ấy.

Ta sử dụng ping như sau (có thể sử dụng thêm option `-c` để chỉ định số gói tin sẽ gửi)

	$ ping  -c  [number_request]  [hostname]

> Nhấn CTRL+C để thoát bất cứ lúc nào.

Một mạng được kết nối qua nhiều node. Dữ liệu được chuyển qua từng node như vậy. Ta có thể xem được bảng định tuyến của mình qua lệnh `route` hoặc `ip  route` như

|Task|Command|
|---|---|
|Hiển thi bảng định tuyến|$ route –n hoặc ip route|
|Thêm định tuyến tĩnh|$ route add -net address hoặc ip route add|
|Xóa định tuyến tĩnh|$ route del -net address hoặc ip route del|

Một công cụ hữu ích nữa là `traceroute`, công cụ dùng để kiếm tra đường đi của các gói tin, ngoài ra ta cũng có thể kiểm tra được thôn tin khác như thời gian qua từng node...

Ngoài ra ta còn rất nhiều công cụ khác cho phép xem, cấu hình... các card mạng của mình như `ethtool, netstat, nmap, tcpdum, iptraf, mtr, dig`

<a name="3"></a>
### 3. Browsers

Browser được sử dụng để truyền, nhận, hiển thị... các tài nguyên thông tin, thường trên `World Wide Web`. Người dùng linux có thể sử dụng các trình duyệt đồ họa như `Firefox, google chrome, chromium, Opera...` và các trình duyệt text-base như `lynx, links or elinks, w3m`

Hai công cụ phổ biến bạn có thể sử dụng để tải các file trên internet mà không cần dùng đến trình duyệt là `wget` và `curl`.

<a name="4"></a>
### 4. Transferring Files

Khi kết nối internet, ta cần truyền file giữa các máy với nhau qua mạng thì có một giao thức phổ biến đó là FTP (File Transfer Protocol). FTP hoạt động theo mô hình Client-Server. Đây là giao thức sữ dụng lâu nhất và hiện nay nó không còn là giải pháp tốt nhất nữa, tuy nhiên đối với các nhu cầu không cần tính bảo mật thì nó vẫn là lựa chọn phổ biến.

FPT client cho phép bạn truyền file qua các máy máy ở xa sử dụng giao thức FTP. Một số client phổ biến sử dụng đồ họa như Filezilla. Hoặc một số command phổ biến như `ftp, sftp, ncftp, yafc`

Một giao thức kết nối an toàn khác không thể không nhắc đến là SSH (Secure Shell). Giao thức này mã hóa dữ liệu trên đường truyền cho phép bảo mật thông tin và dữ liệu cho ngưòi dùng trên internet. Để sử dụng ssh ta dùng

	$ ssh  -1  [someone]  [some_system]

	hoặc

	$ ssh  someone@some_system

	hoặc có thể sử dụng command sau kết nối bằng cách sử dụng lệnh phía sau.

	$ ssh  someone@some_system  [your_command]

Cuối cùng ta có thể copy các file trên các máy từ xa một cách an toàn là sử dụng `scp` (Secure Copy). Ví dụ để copy file từ local lên server ta dùng như sau

	$  scp  [local_file]  [user@remotesystem>:/home/user/]
