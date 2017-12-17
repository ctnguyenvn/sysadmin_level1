### Name Resolution and the Domain Name System (DNS)

> Tài liệu: Phần giải tên miền và hệ thống tên miền

> Thực hiện: nguyễn Công Trứ

> Cập nhật: 30/12/2016

#### Mục lục

- [5.6.6 Authority (SOA) Records](#5.6.6)

- [5.6.7 Mail Exchanger (MX) Records](#5.6.7)

***

<a name="5.6.6"></a>
### 5.6.6 Authority (SOA) Records

Trong DNS, mỗi zone có một `authority record`, sử dụng một loại RR gọi là `start of authority` (SOA). Những record cung cấp các liên kết có quyền giữa các phần của không gian tên miền và các máy chủ cung cấp các thông tin zone cho phép truy vấn khác nhau được thực hiện cho các địa chỉ và các thông tin khác. SOA RR được sử dụng để xác định tên của máy chủ cung cấp cơ sở dữ liệu chính thức, địa chỉ e-mail tin cậy (dấu "." được sử dụng thay vì @), các thông số cập nhật zone, và TTL mặc định. TTL mặc định được áp dụng cho RR trong zone đó nếu không được giao một TTL rõ ràng (cho mỗi RR).

Các thông số update zone bao gồm `serial number`, `refresh time`, `retry time`, và `expire  time`.. Các `serial number` được tăng lên (ít nhất là 1), thường là do người quản trị mạng, bất cứ lúc nào có sự thay đổi trong nội dung zone. Nó được sử dụng bởi các `secondary servers` (máy chủ thứ cấp) để xác định nếu họ bắt đầu chuyển vùng (khi họ không có một bản sao của nội dung zone có số `serial number` lớn nhất). `refresh time` nói các secondary servers phải đợi bao lâu trước khi kiểm tra các SOA record từ `primary servers` và `version number` của nó để xác định nếu bắt buộc transfer zone. The retry và expire times được sử dụng trong trường hợp zone transfer thất bại. The retry đưa ra thời gian (tính bằng giây) một máy chủ secondary sẽ chờ đợi trước khi retrying (thử lại). Thời gian hết hạn là một ràng buộc (tính bằng giây) mà một máy chủ thứ cấp sẽ retrying zone transfers trước khi từ bỏ. Nếu từ bỏ, một máy chủ như vậy không còn đáp ứng với các truy vấn cho zone. Nói chung, một zone có thể chứa một hỗn hợp các dữ liệu IPv4 và IPv6 và có thể được truy cập bằng cách sử dụng phiên bản của IP. Trong ví dụ này, chúng tôi sử dụng IPv6 (sử dụng nslookup trên IPv6 chỉ máy chủ Windows):

```
C:\> nslookup
Default Server: gw
Address: fe80::204:5aff:fe9f:9e80

> set type=soa

> berkeley.edu.
Server: gw
Address: fe80::204:5aff:fe9f:9e80
Non-authoritative `answer`:
berkeley.edu
	primary name server = ns-master1.berkeley.edu
	responsible mail addr = hostmaster.berkeley.edu
	serial 		= 2009050116
	refresh 		= 10800 (3 hours)
	retry 		= 1800 (30 mins)
	expire 		= 3600000 (41 days 16 hours)
	default TTL 	= 300 (5 mins)

> server adns1.berkeley.edu.
Default Server: adns1.berkeley.edu
Addresses: 2607:f140:ffff:fffe::3 
		128.32.136.3

> berkeley.edu.
Server: adns1.berkeley.edu
Addresses: 2607:f140:ffff:fffe::3
		128.32.136.3

berkeley.edu
	primary name server = ns-master1.berkeley.edu
	responsible mail addr = hostmaster.berkeley.edu
	serial 		= 2009050116
	refresh 		= 10800 (3 hours)
	retry 		= 1800 (30 mins)
	expire 		= 3600000 (41 days 16 hours)
	default TTL 	= 300 (5 mins)

berkeley.edu nameserver = ns.v6.berkeley.edu
berkeley.edu nameserver = aodns1.berkeley.edu
berkeley.edu nameserver = adns2.berkeley.edu
berkeley.edu nameserver = phloem.uoregon.edu
berkeley.edu nameserver = adns1.berkeley.edu
berkeley.edu nameserver = ucb-ns.NYU.edu
ns.v6.berkeley.edu internet address = 128.32.136.6
ns.v6.berkeley.edu AAA IPv6 address = 2607:f140:ffff:fffe::6
adns1.berkeley.edu internet address = 128.32.136.3
adns1.berkeley.edu AAA IPv6 address = 2607:f140:ffff:fffe::3
adns2.berkeley.edu internet address = 128.32.136.14
adns2.berkeley.edu AAA IPv6 address = 2607:f140:ffff:fffe::e
aodns1.berkeley.edu internet address = 192.35.225.133
aodns1.berkeley.edu AAA IPv6 address = 2607:f010:3f8:8000:214:4fff:fe45:e6a2

phloem.uoregon.edu internet address = 128.223.32.35
phloem.uoregon.edu AAA IPv6 address = 2001:468:d01:20::80df:2023
```

Ở đây chúng ta có thể thấy rằng không chỉ nhận được các SOA record, nhưng chúng tôi cũng nhận được một danh sách sáu máy chủ `authoritative`, và các địa chỉ IPv4/IPv6(`glue records`) cho chúng(các địa chỉ cho các máy chủ NYU không được đưa ra, như glue records cho NYU.edu sẽ trong một zone khác nhau được hỗ trợ bởi một máy chủ khác nhau). Vì đây là một trong những ``response`s` thú vị chúng ta đã thấy, chúng ta hãy nhìn vào các nội dung gói tin tương ứng với các yêu cầu gửi đến máy chủ `authoritative`, `adns1.berkeley.edu` (hình dưới).

Điều này chứa trong hai gói, và chúng tôi đã chọn hiển thị các reply, đó là những chi tiết thú vị của cả hai. Một truy vấn cho một SOA RR đã được gửi đến các máy chủ `260:f140:ffff:fffe::3` (`adns1.Berkeley.EDU`) từ hệ thống local toàn cầu có phạm vi địa chỉ IPv6 `2001:5c0:1101:ed00:5571:5f81:e0a6:4978`. Các `response` được thực hiện trong một datagram với 491 byte tổng chiều dài (trường Payload dài 451) IPv6. Gói này đặc biệt có chứa các header IPv6 (40 byte), header UDP (8 byte), cộng với DNS messager (443 byte). Thông điệp DNS bao gồm một `question`, một `answer`, 6 `authority RR`, và 10 `additional RRs`.

![](https://github.com/ctnguyenvn/sysadmin_level1/blob/master/Task26_Translation_TC-IP_Illustrated_Vol1_Page_541to546/Image/1.png)

> `Response` tới DNS query cho SOA record sử dụng IPv6. `Response` gồm địa chỉ IPv4 và IPv6 cho zone

Phần `question` có chứa nhãn `Berkeley` và `edu` và dài 18 byte. Phần `answer` có chứa các thông tin liên quan cho tên `Berkeley.edu` mô tả trước đó và có thể tận dụng lợi thế của nén nhãn nhờ vào các nội dung của phần `question`. Tổng chiều dài cho phần này là 58 byte. Phần `authority` bao gồm 6 NS record xác định máy chủ tên miền. Thông tin này thêm cái khác 135 byte. Các phần `additional information` bao gồm 5 A record và 5 AAAA record với tổng số 220 byte. Các kích thước của trường rdata cho mỗi AAAA record là 16 byte, do đó mặc dù các địa chỉ IPv6 có thể được viết dưới dạng văn bản với :: để tiết kiệm không gian, nó không được mã hóa theo cách này trong các gói tin. Thay vào đó, đủ 128 bit của địa chỉ được sử dụng.

<a name="5.6.7"></a>
### 5.6.7 Mail Exchanger (MX) Records

Một MX record cung cấp tên của một `mail exchanger` - một máy chủ sẵn sàng để tham gia vào các `Simple Mail Transfer Protocol` (SMTP) [RFC5321] để nhận được các e-mail đại diện cho người sử dụng kết hợp với một tên miền. Khi Internet vẫn còn đang phát triển, một số trang web không luôn được kết nối nhưng mà thay vào đó sẽ xoay vòng và kết nối với máy chủ mà luôn luôn kết nối Internet. Trong tình huống như vậy, đích đến e-mail có thể bị ngắt kết nối từ mạng khi e-mail đã quá hạn, vì vậy máy chủ khác sẽ gĩư thư cho đến khi các điểm đến được đính kèm. Đây là một động lực cho sự bao gồm các MX record trong DNS - cho phép các host gửi e-mail qua trung gian ( "máy chủ chuyển tiếp") ngay cả khi các trang đích không có sẵn. Giờ đây, các MX record vẫn được sử dụng, và các đại lý email lớn cung cấp e-mail cho các máy chủ được liệt kê trong một MX record gắn với tên miền riêng

MX record có một giá trị đặc biệt, vì vậy nhiều hơn một MX record có thể có mặt cho một tên miền cụ thể. Giá trị đặc biệt này cho phép một đại lý gửi để sắp xếp các host theo trật tự ưu tiên (nhỏ hơn thì thích hợp hơn) trong việc quyết định chủ sử dụng như là một đích đến e-mail. Ví dụ, chúng ta có thể sử dụng các lệnh một lần nữa để truy vấn DNS cho các bản ghi MX gắn liền với tên miền cs.ucla.edu:

```
Linux% host –t MX cs.ucla.edu ns3.dns.ucla.edu
Using domain server:
Name: ns3.dns.ucla.edu
Address: 2607:f600:8001:1::ff:fe01:35#53
Aliases:
cs.ucla.edu mail is handled by 13 Pelican.cs.ucla.edu.
cs.ucla.edu mail is handled by 3 Moa.cs.ucla.edu.
cs.ucla.edu mail is handled by 13 Mailman.cs.ucla.edu.
```

Ở đây chúng ta có thể thấy rằng một e-mail gửi đến `person@cs.ucla.edu` được xử lý bằng một trong ba máy chủ email được cấu hình trong DNS. Tất cả các máy chủ mail này là một phần của tên miền `cs.ucla.edu`, nhưng trong mail chung, máy chủ không cần phải được đặt tên với các tên miền như các e-mail mà họ đang xử lý. Ba máy chủ có thể được chia thành hai phần: một với preference 3 và một tập hợp với preference 13. Các máy chủ với số preference nhỏ được preference, vì vậy người gửi đầu tiên cố gắng `Moa.cs.ucla.edu`. Nếu thất bại, nó sẽ cố gắng hoặc `Pelican` hoặc `Mailman`, chọn ngẫu nhiên.

Điều đó là có thể rằng không ai trong mục tiêu MX record được tryt cập. Đây là một tình trạng lỗi. Nó cũng có thể là không có MX record, nhưng có CNAME, A, hoặc AAAA record cho tên miền. Nếu có một CNAME record, mục tiêu của CNAME được sử dụng ở vị trí của tên miền đầu tiên. Nếu có A hoặc AAAA record, các mail agent có thể kết nối với các địa chỉ này. Mỗi cái được coi là có một preference của zero (gọi là implicit MX). MX record mục tiêu phải là tên miền mà giải quyết cho A hoặc AAAA record; họ không thể trỏ đến các CNAME [RFC5321].
