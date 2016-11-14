### CentOS DHCP

> Tài liệu: Tìm hiểu về DHCP trên CentOS 6

> Thực hiện: Nguyễn Công Trứ

> Cập nhật: 13/11/2016

#### Mục lục:

[1. Giới thiệu](#1)

[2. Hoạt động](#2)

[3. Cấu hình DHCP trên CentOS 6](#3)

---

<a name="1"></a>
### 1. Giới thiệu

- DHCP (Dynamic Host Configuration Protocol - giao thức cấu hình host động) là giao thức cho phép cấp phát địa chỉ IP một cách tự động cùng với cấu hình liên quan khác như subnet mark và gateway mặc định. Máy tính được cấu hình tự động vì thế giảm được can thiệp vào hệ thống.

- DHCP cung cấp một database trung tâm để theo dõi tất cả các máy tính trong một hệ thống mạng. Mục đích là tránh trường hợp 2 máy tính khác nhau lại có chung 1 địa chỉ IP

- DHCP client là thiết bị nói vào mạng và sử dụng dụng giao thức DHCP để lấy các thông tin cấu hình như là địa chỉ mạng, DNS

- DHCP server là thiết bị nối vào mạng có chức năng trả về các thông tin cần thiết cho Client DHCP khi có yêu cầu

<a name="2"></a>
### 2. Hoạt động

DHCP tự động quan lý các địa chỉ IP và loại bỏ được các lỗi có thể làm mất liên lạc. Nó tự động gán lại các địa chỉ chưa được sử dụng. DHCP cho phép IP sử dụng trong khoảng thời gian xác định. DHCP tự động gán IP thích hợp với mạng con chứa Client này. 

Quá trình trải qua 4 bước sau

- 1 . Client khởi động với "địa chỉ IP rỗng" cho phép liên lạc với DHCP server bằng giao thức TCP/IP. Nó gửi liên tục các thông điệp (gồm MAC và tên máy tính của nó) lên mạng cho đến khi nhận được phản hồi từ server

	> Thông điệp gửi đi có thể chứa IP trước đây đã thuê

- 2 . Mọi Server DHCP có thể nhận thông điệp và chuẩn bị địa chỉ IP cho Client . Nếu Server có cấu hình hợp lệ cho Client, nó chuẩn bị thông điệp "chào hàng" chứa địa chỉ MAC của client, IP "chào hàng", subnet mark, IP Server và thời gian cho thuê (giống như hạn sử dụng IP đó). Địa chỉ "chào hàng" được đánh dấu là reserve (để dành). Tất cả các Server đều phát tán thông điệp này lên mạng.

- 3 . Khi khách hàng nhận được thông điệp "chào hàng" và chấp nhận 1 trong các IP mà các Server phát tán thì nó sẽ phát tán thông điệp khẳng định nó đã chập nhận IP từ Server nào

- 4 . Cuối cùng Server khẳng định toàn bộ sự việc với Client bằng gói ACK

> Lưu ý: Lúc đầu Client phát tán yêu cầu cấp IP lên mạng nên mọi Server DHCP đều nhận được thông điệp này và tất cả đều trả địa chỉ "chào hàng" của mình. Tuy nhiên Client chỉ chấp nhận 1 IP nên sau khi Client chấp nhận IP nào đó từ 1 Server thì thông điệp được gửi lên mạng sẽ giúp các Server còn lại rút lại thông điệp "chào hàng" của mình và hoàn trả IP vào vùng địa chỉ, để dành cho khách hàng khác.


<a name="3"></a>
### 3. Cấu hình DHCP trên CentOS 6

Đầu tiên bạn có thể sử dụng lệnh sau để cài đặt DHCP (yêu cầu internet)

	**yum install dhcp -y**

> Bạn có thể cài bằng đĩa như sau

> 	- **mount /dev/cdrom /media**	
	
>		mount cdrom vào

> 	- **rpm -ivh /media/Pakage/dhcp-***   
	
>		cài đặt sử dụng rpm

Sau khi cài đặt xong sẽ xuất hiện file **dhcpd.conf** trong thư mục **/etc/dhcp/**. Bạn có thể sử dụng file này hoặc copy file mẫu **/usr/share/doc/dhcp*/dhcpd.conf.sample** vào **/etc/dhcp/** để cấu hình với các thông số như sau

![](https://github.com/hellsins/sysadmin_level1/blob/master/Task14_CentOS6_DHCP/img/1.png)

Sau khi cấu hình xong lưu lại vào khởi động dịch vụ

- **service dhcpd start** 

Tiếp tục qua máy client chuyển sang dhcp và xin cấp lại IP ta được

![](https://github.com/hellsins/sysadmin_level1/blob/master/Task14_CentOS6_DHCP/img/2.png)

> Lưu ý
 
> 	- Bạn cần mở port 67/UDP trên firewall để chấp nhận DHCP chạy trên cổng này với lệnh sau 

>	**iptables -I INPUT 5 -p udp -m state --state NEW -m udp --dport 67 -j ACCEPT**

> 	- Bạn có thể theo dõi quá trình cấp và sử dụng IP của các client bằng cách xem file log tại /var/lib/dhcp/dhcpd.leases
