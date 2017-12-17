
### Name Resolution and the Domain Name System (DNS)

> Tài liệu: Phần giải tên miền và hệ thống tên miền

> Thực hiện: nguyễn Công Trứ

> Cập nhật: 22/12/2016

#### Mục lục

[5. The DNS Protocol](#5)

- [5.6 Resource Record Types ](#5.6)

	+ [5.6.1  Address (A,AAAA) and Name Server (NS) Records](#5.6.1)

	+ [5.6.2 Example](#5.6.2)

	+ [5.6.3 Canonical Name (CNAME) Records](#5.6.3)

	+ [5.6.4 Reverse DNS Queries: PTR (Pointer) Records](#5.6.4)

	+ [5.6.5 Classless in-addr.arpa Delegation](#5.6.5)

***

<a name="5"></a>
### 5 The DNS Protocol

<a name="5.6"></a>
### 5.6 Resource Record Types 

<a name="5.6.1"></a>
#### 5.6.1  Address (A,AAAA) and Name Server (NS) Records

Có thể cho rằng, các record quan trọng nhất trong DNS là địa chỉ (A, AAAA) và name server (NS). Các records A chứa các địa chỉ IPv4 32-bit, và AAAA (gọi là "quad-A") các records có chứa các địa chỉ IPv6. Một records NS chứa tên của một máy chủ DNS có thẩm quyền có chứa thông tin cho một khu vực (zone) cụ thể. Bởi vì tên của một máy chủ DNS không thôi là không đủ để thực hiện một truy vấn, các địa chỉ IP của những máy chủ này cũng thường được cung cấp như là glue record trong phần thông tin bổ sung của responses DNS. Thật vậy, glue record đó đều cần thiết để tránh các vòng lặp bất cứ khi nào tên của các name server có thẩm quyền sử dụng tên miền tương tự mà họ có thẩm quyền. (Hãy xem xét cách ns1.example.com sẽ được giải quyết nếu các name server cho `example.com` là `ns1.example.com`.) Chúng ta có thể xem cấu trúc của A, AAAA, và các records NS sử dụng các công cụ được cung cấp trên hầu hết các hệ thống Linux/UNIX hoặc tương tự UNIX. Ở đây, chúng ta thực hiện một yêu cầu cho records của bất kỳ loại liên kết với các tên miền `rfc-editor.org`:

```
Linux% dig +nostats -t ANY rfc-editor.org
; <<>> DiG 9.6.0-P1 <<>> +nostats -t ANY rfc-editor.org
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 53052
;; flags: qr rd ra; QUERY: 1, ANSWER: 12, AUTHORITY: 0, ADDITIONAL: 2
;; QUESTION SECTION:
;rfc-editor.org.
IN ANY
;; ANSWER SECTION:
...
rfc-editor.org. 1654 IN AAAA 2001:1890:1112:1::2f
rfc-editor.org. 1654 IN A 64.170.98.47
rfc-editor.org. 1654 IN NS ns0.ietf.org.
rfc-editor.org. 1654 IN NS ns1.hkg1.afilias-nst.info.
...
;; ADDITIONAL SECTION:
ns0.ietf.org.
756
IN
A
64.170.98.2
ns0.ietf.org.
756
IN
AAAA 2001:1890:1112:1::14
```

Trong kết quả của lệnh, hai dòng đầu tiên chỉ ra phiên bản của
chương trình `dig` được sử dụng và các tùy chọn được cung cấp cho nó, cộng với các tùy chọn (+cmd có nghĩa là thông tin chính nó nên được in). Các phần tiếp theo chỉ ra dữ liệu trong thông điệp DNS reply: opcode (mã hoạt động) QUERY, tình trạng noerror cho thấy không có lỗi gặp phải, và một ID giao dịch của 53052. Trong trường Opcode, QUERY được sử dụng cho cả các queries và responses. Tiếp theo, dòng flags chỉ ra rằng thông điệp là một  query response (cờ `qr`) và không phải là một truy vấn đệ quy và được mong muốn trong các truy vấn ban đầu (cờ `rd`) và được cung cấp bởi các response server (cờ `ra`). Thông điệp này có chứa một phần với một truy vấn, và 12 records tài nguyên trong phần response (chỉ 4 được hiển thị). Không có RR trong phần thẩm quyền, có nghĩa là response này có thể từ một máy chủ bộ nhớ đệm (các RR không có thẩm quyền). kết quả khác nhau có thể được thu được bằng cách tương tác với các máy chủ khác nhau. Các phần thông tin bổ sung có chứa các địa chỉ IPv4 và IPv6 với một trong các máy chủ có thẩm quyền, chúng ta muốn liên lạc với nó. Phần question có chứa một bản sao của truy vấn ban đầu của chúng tôi: gõ bất kỳ tên miền `rfc-editor.org`.

Trong số 4 RR trong phần answer hiển thị, chúng tôi tìm thấy một loại A, một loại AAAA, và hai loại NS. Từ thông tin này, chúng ta có thể thấy rằng các tên miền rfc-editor.org là một máy chủ với địa chỉ IPv4 64.170.98.47 và địa chỉ IPv6 2001: 1890: 1112: 1 :: 2f. Nó cũng là một tên miền phụ (subdomain), như được chỉ ra bởi sự hiện diện của các records NS. Chúng ta có thể nhanh chóng đoán và xác minh rằng có ít nhất một máy chủ trong tên miền phụ này bằng cách sử dụng lệnh sau:

```
Linux% host ftp.rfc-editor.org
ftp.rfc-editor.org has address 64.170.98.47
```

Ví dụ này cho thấy một vài khía cạnh thú vị của records A, AAAA, và NS. Đầu tiên, nó có thể cho một tên miền duy nhất để có records của từng loại (và nhiều hơn nữa). Điều này là khá phổ biến đối với IPv6 có khả năng máy chủ đó là máy chủ "well-known" cho một tổ chức cụ thể. Chúng tôi cũng có thể thấy rằng mỗi records có giá trị TTL, và chúng khác nhau đáng kể, ngoại trừ những người trong cùng RRSet. TTL cho các records trong phần answers là 1654s (khoảng nửa giờ), và TTL các records trong phần additional informations (thông tin bổ sung) là 756s (khoảng 12 phút). Lưu ý rằng các giá trị TTL của cached record không bao giờ nhiều hơn so với TTL của cùng một record lấy từ nguồn có thẩm quyền. TTLs cho các cached records "decay" cho đến khi records được lấy lại từ một server có thẩm quyền. Kết quả là, lấy một cached records nhiều lần từ cùng một máy chủ thường cho thấy giá trị TTL giảm.

<a name="5.6.2"></a>
#### 5.6.2 Example

Bây giờ chúng ta đã thấy các định dạng thông điệp DNS, các lựa chọn giao thức vận chuyển, và các loại RR cho các queries và responses cơ bản, chúng ta hãy xem một ví dụ. Chúng tôi bắt đầu với một trường hợp đơn giản để xem các thông tin liên lạc giữa một trình giải quyết trên một client, một local name 
server, và một quản lý name server từ xa bởi một ISP. Kịch bản này cho thấy tầm quan trọng của bộ nhớ đệm trong DNS. Cấu trúc liên kết được thể hiện trong hình sau.

<p align="center"><img src="https://github.com/ctnguyenvn/sysadmin_level1/blob/master/Task24_Translation_TC-IP_Illustrated_Vol1_Page_536to540/Image/1.png"></p>

> Một ví dụ đơn giản query/response DNS. Các local DNS server (GW.HOME) cung cấp đệ quy cho client (A.HOME), và sử dụng các máy chủ DNS được cung cấp tại các ISP khi dữ liệu được yêu cầu không có trong bộ nhớ cache.

Trên client Windows của chúng tôi (A.HOME), chúng tôi bắt đầu với một lệnh loại bỏ bất kỳ dữ liệu DNS được lưu trữ bởi các thư viện giải quyết. Chúng tôi sau đó thực hiện một truy vấn cho địa chỉ (Một loại record) của tên miền `berkeley.edu`

```
C:\> ipconfig /flushdns
Windows IP Configuration

Successfully flushed the DNS Resolver Cache.

C:\> nslookup
Default Server: gw
Address: 10.0.0.1

> set type=a
> berkeley.edu.
Server: gw
Address: 10.0.0.1

Non-authoritative answer:
Name: berkeley.edu
Address: 169.229.131.81
```
Lệnh đầu tiên là đặc biệt để Windows loại bỏ các dữ liệu lưu trữ bằng phần mềm giải quyết của client. Các chương trình nslookup, có sẵn trên cả Windows và các hệ thống Linux / UNIX-based, cung cấp một cách cơ bản để truy vấn DNS cho dữ liệu cụ thể. Khi thực hiện, nó chỉ tên máy chủ được sử dụng cho phân giải (ở đây các máy chủ là GW tại địa chỉ `10.0.0.1`). Sử dụng các lệnh `set`, chúng tôi bố trí để truy vấn cho một record, sau đó truy vấn cho tên `berkeley.edu`. Một lần nữa, nslookup chỉ máy chủ nó sử dụng để phân giải. sau đó nó cũng cung cấp cho chúng tôi một dấu hiệu cho thấy câu answer là non-authoritative (tức là, nó đang được cung cấp bởi một máy chủ bộ nhớ đệm) và địa chỉ yêu cầu là `169.229.131.81`.

Hãy xem những gì sẽ xảy ra với các giao thức DNS tại packet, chúng tôi sử dụng Wireshark và có một cái nhìn tại các gói đầu tiên như hình sau

<p align="center"><img src="https://github.com/ctnguyenvn/sysadmin_level1/blob/master/Task24_Translation_TC-IP_Illustrated_Vol1_Page_536to540/Image/2.png"></p>

> Một datagram UDP/IPv4 chứa một truy vấn chuẩn DNS cho địa chỉ IPv4 với berkeley.edu

Có hai thông điệp trong các dấu vết: một query chuẩn và response chuẩn. Trong thông điệp đầu tiên (truy vấn), địa chỉ nguồn IPv4 là 10.0.0.120 (một địa chỉ IP được giao tại các client), và đích là 10.0.0.1 (DNS server). Các truy vấn là một gói tin với cổng nguồn 56288 và cổng đích 53 (cổng DNS) UDP/IPv4. Xét về đóng gói đầy đủ của nó, yêu cầu là một khung Ethernet chứa 72 byte. Kích thước này có thể được rút ra bằng cách tổng hợp các bộ phận sau: thernet header (14 bytes), IPv4 header (20 bytes), UDP header (8 bytes), DNS fixed header (12 bytes), query type (2 bytes), query class (2 bytes), cộng data labels cho berkeley (9 bytes) và edu (4 bytes), cộng trailing 0 byte. 

Quay sang các chi tiết của DNS header, ID giao dịch là 0x0002 và tạo thành 2 byte đầu tiên của DNS header, nằm ở vị trí bắt đầu của UDP payload. Chỉ có một cờ duy nhất (đệ quy yêu cầu, mặc định) được thiết lập, vì vậy thông điệp này là một truy vấn (query). Thông điệp này có chứa một truy vấn chuẩn với một answer. Các phần khác trống. Các question chính nó là cho tên berkeley.edu và đang tìm kiếm thông tin của loại A (địa chỉ record) trong class (Internet) IN. Sau khi nhận được thông báo này, tên máy chủ đang trong quá trình đang chạy trên 10.0.0.1, không thể trực tiếp answer vì nó không biết địa chỉ, sẽ chuyển các truy vấn đến (thượng nguồn) tên máy chủ sau nó được cấu hình để sử dụng. Trong trường hợp này, name server là tại địa chỉ 206.13.28.12 (xem hình dưới).

Trong hình dưới, chúng tôi thấy một truy vấn tương tự như gửi của client, nhưng trong trường hợp này là nguồn địa chỉ IPv4 là 70.231.136.162 (địa chỉ IPv4 ISP-side của GW.HOME). Địa chỉ đích là 206.13.28.12, địa chỉ IPv4 của máy chủ DNS của ISP cung cấp, và cổng nguồn là một cổng khác trên máy chủ DNS địa phương (60961).

<p align="center"><img src="https://github.com/ctnguyenvn/sysadmin_level1/blob/master/Task24_Translation_TC-IP_Illustrated_Vol1_Page_536to540/Image/3.png"></p>

> Một yêu cầu DNS được tạo ra tại GW.HOME được gửi đến các ISP name server như một hệ quả của đệ quy.

ID giao dịch được tạo ra một lần nữa và thiết lập với 0xb0b8. Lưu ý rằng Wireshark chỉ ra rằng response với query được chứa trong gói số 2

Packet 2 trong Hình dưới là DNS esponse đầu tiên chúng ta đã thấy. Đầu tiên, chúng tôi lưu ý rằng số cổng nguồn UDP là 53, nhưng cổng đích là cổng 60961. Các giao dịch ID phù hợp với truy vấn (0xb0b8), nhưng các trường Flags bây giờ chứa các giá trị 0x8180 (response, recursion requested, và recursion 
available tất cả các thiết lập). Phần question có chứa một bản sao của question mà answer đang được cung cấp và thường phù hợp với truy vấn ban đầu gửi của client một cách chính xác (ví dụ, trường hợp được bảo quản). Có một RR trong phần answer. Nó là loại A (địa chỉ), có TTL là 10 phút và chiều dài dữ liệu của 4 byte (kích thước của một địa chỉ IPv4), và giá trị là 169.229.131.81, địa chỉ IPv4, chúng tôi yêu cầu cho berkeley.edu. Lưu ý rằng cờ authority không được thiết lập, và phần authority của reply là trống. Response này được dựa trên dữ liệu lưu trữ; nó không phải là thẩm quyền cho domain. Tại thời điểm này, các ocal name server cũng lưu các giá trị (nhưng chỉ cho đến 10 phút theo quy định của TTL trong RR nó nhận được) và đáp ứng các yêu cầu của client

Các Response  trong hình dưới, gói 2, là giống như một gói từ 206.13.28.12, ngoại trừ nó bây giờ được gửi từ 10.0.0.1 đến client ban đầu của chúng tôi tại 10.0.0.120, và các giao dịch ID phù hợp với một trong DNS gốc yêu cầu. cũng lưu ý rằng từ quan điểm của client để xem toàn bộ thời gian đi của giao dịch là khoảng 14.7ms, nhưng chúng tôi biết rằng hầu hết thời gian đó (14.2ms) đã được đưa lên trong các giao dịch giữa các máy chủ tên địa phương (GW.HOME ) và máy chủ tên của ISP (206.13.28.12).

<p align="center"><img src="https://github.com/ctnguyenvn/sysadmin_level1/blob/master/Task24_Translation_TC-IP_Illustrated_Vol1_Page_536to540/Image/4.png"></p>

> Một DNS response chuẩn gửi từ máy chủ DNS của ISP trở lại
GW.HOME

<a name="5.6.3"></a>
#### 5.6.3 Canonical Name (CNAME) Records

Record CNAME là viết tắt của record `canonical name` và được sử dụng để giới thiệu một bí danh (alias) cho một tên miền duy nhất vào hệ thống DNS. Ví dụ, tên www.berkeley.edu có thể có một record CNAME mà các map cho một số máy khác (ví dụ, www.w3.berkeley.edu), do đó, nếu máy chủ Web được đặt tại một máy tính khác, một sự thay đổi tương đối đơn giản cơ sở dữ liệu DNS có thể có được tất cả những gì là cần thiết cho phần còn lại của thế giới để tìm những hệ thống mới. Nó bây giờ là thực tế phổ biến để sử dụng record CNAME để thiết lập bí danh cho các dịch vụ thông thường. Kết quả là, những cái tên như www.berkeley.edu, ftp.sun.com, mail.berkeley.edu, và www.ucsd.edu là tất cả các mục CNAME trong DNS mà trỏ đến RR khác.

Trong một CNAME RR, phần RDATA chứa các `anonical name` kết hợp với tên miền (bí danh). Tên này sử dụng cùng một loại mã hóa như các tên khác (ví dụ, data labe và compression labe). Khi một CNAME RR là kết quả cho một tên cụ thể, không có dữ liệu được cho phép RFC1912. 

<p align="center"><img src="https://github.com/ctnguyenvn/sysadmin_level1/blob/master/Task24_Translation_TC-IP_Illustrated_Vol1_Page_536to540/Image/5.png"></p>

> Một response tạo ra bởi GW.HOME và dành cho client. Thông báo này đã hoàn tất các giao dịch DNS đệ quy.

Tên miền của CNAME RR có thể không được sử dụng trong tất cả những nơi mà tên miền thường xuyên có thể dùng (ví dụ như là mục tiêu của một RR NS). Ngoài ra, tên chuẩn riêng của mình có thể là một CNAME (gọi là CNAME chaining), nhưng điều này thường không được khuyến khích, vì nó có thể gây ra phân giải DNS để truy vấn nhiều hơn nếu không sẽ là cần thiết. Tuy nhiên, có một số dịch vụ mà sử dụng các tính năng này. Ví dụ, khối lượng lớn trang web www.whitehouse.gov (vào thời điểm đó
của văn bản) sử dụng một `content delivery network` (CDN)2[^1]được cung cấp bởi Tổng công ty Akamai. Khi chúng ta nhìn lên tên miền này, chúng ta thấy như sau:

```
Linux% host –t any www.whitehouse.gov
www.whitehouse.gov is an alias for www.whitehouse.gov.edgesuite.net.

Linux% host –t any www.whitehouse.gov.edgesuite.net
www.whitehouse.gov.edgesuite.net is an alias for a1128.h.akamai.net.

Linux% host –t any a1128.h.akamai.net
a1128.h.akamai.net has address 92.123.65.42
a1128.h.akamai.net has address 92.123.65.51
```

[^1]: Một mạng lưới phân phối nội dung thường bao gồm một số nội dung cache đồng bộ nằm trong địa điểm đặc biệt trong mạng lưới. CDN nỗ lực để giảm thiểu độ trễ cho người dùng truy cập nội dung để đổi lấy tiền từ các nhà cung cấp nội dung.

Như vậy,chuỗi CNAME có thể được sử dụng với DNS. Tuy nhiên, do tác động hiệu quả tiềm năng của mình, các chuỗi như vậy thường được giới hạn bởi phân giải đến một vài "links" (như 5). Chuỗi dài có thể sẽ là kết quả của một lỗi trong thực hiện hoặc một sự hiểu lầm, vì nó là khó hiểu tại sao nó nên cần thiết trong những trường hợp bình thường.

> Lưu ý: Có một record tài nguyên chuẩn gọi là dname (loại 39) [RFC2672] [IDDN]. dname record hành động như các record CNAME nhưng đối với toàn bộ khu vực. Ví dụ, tất cả các tên của các hình thức NAME.example.com có thể được ánh xạ tới NAME.newexample.com sử dụng một record tài nguyên dname duy nhất. Tuy nhiên, dname record không áp dụng cho các record cấp cao nhất của chính nó (example.com đây).

<a name="5.6.4"></a>
#### 5.6.4 Reverse DNS Queries: PTR (Pointer) Records

Mặc dù chức năng quan trọng nhất của DNS là để cung cấp ánh xạ từ tên miền sang địa chỉ IP, có rất nhiều trường hợp các maps ngược lại là bắt buộc. Ví dụ, một máy chủ nhận được một yêu cầu kết nối TCP / IP đến là có thể xác định địa chỉ IP nguồn của các kết nối từ các gói tin IP đến, nhưng tên miền tương ứng với địa chỉ không có trong các kết nối chính nó; tên miền như vậy phải được xem xét trong một số cách khác. May mắn thay, sử dụng DNS thông minh có thể cung cấp khả năng này.

Các loại PTR RR được sử dụng để đáp ứng các truy vấn DNS ngược, mà thường cần thiết khi chuyển đổi một địa chỉ IP sang một tên miền. Này sử dụng miền in-addr.arpa đặc biệt (ip6.arpa cho IPv6), trong một cách đặc biệt. Hãy xem xét một địa chỉ IPv4 như 128.32.112.208. Trong cấu trúc địa chỉ classful, địa chỉ này được lấy từ 128.32 lớp không gian địa chỉ B. Để xác định tên tương ứng với địa chỉ này, địa chỉ đầu tiên được đảo ngược, và sau đó là miền đặc biệt được thêm vào. Trong ví dụ này, một truy vấn cho một record PTR sử dụng tên 

`208.112.32.128.in-addr.arpa.`

sẽ được sử dụng. Trong thực tế, đây là một truy vấn cho các "host" 208 "domain" 112.32.128.in-addr.arpa .. Chúng ta sẽ thấy nhiều ví dụ về truy vấn DNS ngược sau trong phần này.

> Note: Các không gian tên DNS bình thường, thường sử dụng NS, A, và các bản ghi AAAA, không tự động liên kết với các không gian tên miền "revers"  được hỗ trợ bởi bản ghi PTR. Như vậy có thể (và thậm chí còn tương đối phổ biến) để có một độ phân giải hiện tại về phía trước mà không có một ánh xạ ngược lại tương ứng với thiết lập (hoặc có một khác nhau). Một số dịch vụ kiểm tra để thấy rằng cả hai hướng được thiết lập với các ánh xạ tương đương và có thể từ chối dịch vụ trong những tình huống như vậy

Nhớ lại rằng các địa chỉ IPv4 được thường được viết theo định dạng "chấm thập phân" và địa chỉ IPv6 được viết bằng định dạng hex (ví dụ, 169.229.131.81 và 2001:503:a83e::2:30, tương ứng). Các địa chỉ có thể được coi như là tên hiện tại có trong một hệ thống phân cấp left-to-right. Ví dụ, địa chỉ 169.229.131.81 có hệ thống phân cấp từ trên xuống (đọc từ trái qua phải) 169, 229, 131, 81. Bằng cách đảo ngược địa chỉ IPv4 chấm thập phân và xử lý nó như một tên DNS, chúng ta có thể sử dụng DNS để thực hiện các ánh xạ từ địa chỉ IP cho tên. Vì vậy, tên 81.131.229.169 có hiệu quả sẽ được hoàn nhập địa chỉ 169.229.131.81 IPv4. Đối với IPv6, chương trình này là tương tự, nhưng bất kỳ số nào cũng không được mở rộng, và mỗi chữ số thập lục phân trở thành một nhân vật. Ví dụ, sự đảo chiều của 2001:503:a83e::2:30 sẽ là 0.3.0.0.2.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.e.3.8.a.3.0.5.0.1.0. 0.2. May mắn thay, người dùng hiếm khi phải gõ các tên trực tiếp.

Như đã đề cập trước đó, các miền đặc biệt .in-addr.arpa (IPv4) và .ip6.arpa (IPv6) được sử dụng kết hợp với các PTR ("pointer") loại RR trong việc hỗ trợ các kiểu tên và đảo ngược để tra cứu DNS. Ví dụ, hãy xem xét các lệnh sau:

```
C:\> nslookup
Default Server: gw
Address: 10.0.0.1

> server c.in-addr-servers.arpa
Default Server: c.in-addr-servers.arpa
Address: 196.216.169.10

> set type=ptr

> 81.131.229.169.in-addr.arpa.
Server: c.in-addr-servers.arpa
Address: 196.216.169.10

169.in-addr.arpa  nameserver = w.arin.net
169.in-addr.arpa  nameserver = t.arin.net
169.in-addr.arpa  nameserver = dill.arin.net
169.in-addr.arpa  nameserver = x.arin.net
169.in-addr.arpa  nameserver = z.arin.net
169.in-addr.arpa  nameserver = y.arin.net
169.in-addr.arpa  nameserver = u.arin.net
169.in-addr.arpa  nameserver = v.arin.net
```

Ví dụ này cho thấy cách miền .in-addr.arpa được thiết lập. Theo [RFC5855], các `in-addr-servers.arpa` và `ip6-servers.arpa` được sử dụng trong việc hình thành các tên miền liên quan đến các máy chủ cung cấp ánh xạ DNS ngược với IPv4 và IPv6, tương ứng. Tính đến năm 2011, có năm máy chủ như vậy cho mỗi phiên bản của IP: `X.in-addr-servers.arpa` và `X.ip6-servers.arpa`, trong đó X là bất kỳ một lá thư qua f (inclusive).

Mặc dù mười máy chủ, chúng tôi đã đề cập có chứa dữ liệu độc quyền cho ánh xạ ngược, chúng không chứa các thông tin chúng tôi đang tìm kiếm. Trong ví dụ của chúng tôi, máy chủ đầu tiên liên lạc thay vì nói với chúng tôi liên hệ với một trong tám máy chủ tên miền được duy trì bởi ARIN, American Registry cho số Internet, đó là quyền cho các địa chỉ IPv4 bắt đầu bằng 169. Nếu chúng ta tiếp xúc lần lượt một trong những máy chủ , chúng ta thấy rằng một truy vấn PTR cho `81.131.229.169.in-addr.arpa.`
cung cấp cho các response sau:

```
> server w.arin.net
Default Server: w.arin.net

Address: 72.52.71. 2
Default Server: w.arin.net
Address: 2001:470:1a::2

> 81.131.229.169.in-addr.arpa.
Server: w.arin.net
Address: 72.52.71.2

229.169.in-addr.arpa  nameserver  =  adns1.berkeley.edu.
229.169.in-addr.arpa  nameserver  =  phloem.uoregon.edu.
229.169.in-addr.arpa  nameserver  =  aodns1.berkeley.edu.
229.169.in-addr.arpa  nameserver  =  adns2.berkeley.edu.
```

Ở đây chúng ta có thể phỏng đoán rằng các prefix mạng 169,229/16 thuộc sở hữu của cơ sở giáo dục được gọi là Berkeley, mà các trường vẫn duy trì ba máy chủ tên miền bao gồm không gian `in-addr.arpa` của nó, và Đại học Oregon cũng cung cấp một bản sao. Tiếp tục liên lạc với một trong những máy chủ này, chúng ta tìm thấy câu trả lời (thời gian này sử dụng phiên bản nslookup của Linux với kết hơi khác nhau):

```
Linux% nslookup

> set type=ptr

> server adns1.berkeley.edu
Default Server: adns1.berkeley.edu
Address: 128.32.136.3#53
Default Server: adns1.berkeley.edu
Address: 2607:f140:ffff:fffe::3#53

> 81.131.229.169.in-addr.arpa.
Server: adns1.berkeley.edu
Address: 128.32.136.3#53

81.131.229.169.in-addr.arpa    name = webfarm.Berkeley.EDU
```

Ở đây chúng ta có được kết quả mà chúng ta đang tìm kiếm, mà địa chỉ IPv4 `169.229.131.81` có tên `webfarm.Berkeley.EDU`. Việc sử dụng máy chủ DNS cổng 53, như được chỉ ra bởi #53 tiếp sau các địa chỉ IP. Kết quả này làm cho nó rõ ràng rằng truy cập vào DNS với UDP/IPv4 (như trái ngược với UDP/IPv6) vẫn có thể cung cấp ánh xạ cho địa chỉ IPv6 sử dụng "quad-A" records (AAAA) DNS bởi vì chúng ta có thể thấy rằng các địa chỉ IPv6 của máy chủ là `2607:f140:ffff:fffe::3`.

Nếu không có một chi nhánh riêng biệt của cây DNS để dịch address-to-name, sẽ không có cách cơ bản nào để làm dịch ngược khác hơn là bắt đầu từ gốc của cây và cố gắng mỗi `top-level` domain. Đây rõ ràng là một lựa chọn không hợp lý, vì kích thước hiện tại của Internet. Các giải pháp `in-addr.arpa` là hiệu quả và tương đối hiệu quả, mặc dù đảo ngược các byte của IPv4/IPv6 và các miền đặc biệt có thể gây nhầm lẫn.

May mắn thay, như đã đề cập trước đây, người dùng thường có thể tránh phải gõ hoặc giới thiệu cho họ. Ngay cả người vết ứng dụng thường không phải thao tác các địa chỉ để thực hiện truy vấn ngược lại, như thư viện hàm (như thư viện hàm C `getnameinfo()`) thực hiện nhiệm vụ này.

Điều đáng nói ở đây là PTR queries đã trở thành một mối quan tâm đáng kể đối với các máy chủ DNS toàn cầu. Hãy xem xét một mạng gia đình sử dụng một trong các prefix địa chỉ như `10.0.0.0/8` (IPv4) hoặc `fc00:/7` (IPv6). Khi một hệ thống nhận được một yêu cầu kết nối từ hệ thống khác trên cùng một subnet, nó có thể muốn giải quyết địa chỉ nguồn đến một tên và làm như vậy bằng cách thực hiện một truy vấn PTR. Nếu truy vấn không được trả lời bởi các máy chủ DNS local, nó sẽ chuyển cho mạng Internet toàn cầu. Vì lý do này (và một vài lý do khác), [RFC6303] xác định tên máy chủ, đặc biệt là máy chủ local hoạt động trong các mạng sử dụng IP riêng giải quyết đó được gắn vào Internet cung cấp ánh xạ PTR cho không gian địa chỉ định nghĩa trong [RFC1918] cho IPv4 và [RFC4193] cho IPv6 (tức là, trong IN-ADDR.ARPA và D.F.IP6.ARPA).

<a name="5.6.5"></a>
#### 5.6.5 Classless in-addr.arpa Delegation

Khi các tổ chức tham gia vào mạng Internet và có được quyền để điền vào một phần của không gian tên miền DNS, họ thường cũng có được quyền cho một phần của không gian tên in-addr.arpa tương ứng với địa chỉ IPv4 của họ trên Internet. Trong trường hợp của UC Berkeley, quyền hạn bao gồm prefix mạng 169.229/16, trong đó, sử dụng các thuật ngữ cũ, là "loại B" số mạng 169,229. Do đó, UC Berkeley hy vọng ở phần của cây DNS với bản ghi PTR sử dụng tên kết thúc bằng `229.169.in-addr.arpa.` Điều này hoạt động tốt đối với trường hợp địa chỉ prefix chỉ định cho tổ chức này là một trong class A, B, hoặc C, nơi số bit là một bội số nguyên 8. Tuy nhiên, nhiều tổ chức hiện nay được cho độ dài prefix lớn hơn 24 bit hoặc lớn hơn 16 bit (nhưng ít hơn so với 24). Trong những trường hợp này, các dải địa chỉ không dễ dàng được viết ngược đơn giản của địa chỉ IP. Thay vào đó, một số phương thức truyền đạt chiều dài mạng prefix phải được bao hàm tốt.

Các phương thức chuẩn để thực hiện điều này, được  qui định trong [RFC2317], là để thêm vào chiều dài của prefix để đảo ngược các octet và sử dụng nó như là first label (nhãn hiệu đầu tiên) trong tên miền. Ví dụ, giả sử rằng một trang web được gán prefix `12.17.136.128/25`, một prefix đó bao gồm 128 địa chỉ. Theo [RFC2317], hai loại record này phải được cung cấp. Đầu tiên, cho mỗi tên của mẫu `X.136.17.12.in-addr.arpa` (trong đó X là ít nhất là 128 và không quá 255), một CNAME RR được tạo ra, có khả năng duy trì bởi ISP của một trang web, theo sau mẫu:

```
128.136.17.12.in-addr.arpa. canonical name = 128.128/25.136.17.12.in-addr.arpa.
129.136.17.12.in-addr.arpa. canonical name = 129.128/25.136.17.12.in-addr.arpa.
...
255.136.17.12.in-addr.arpa. canonical name = 255.128/25.136.17.12.in-addr.arpa.
```

Ở đây chúng ta có thể thấy cách đánh địa chỉ mạng được mã hóa, với ký hiệu kết hợp với second label (nhãn thứ hai) trong tên miền (ví dụ này). Những mục thường được đặt bởi một ISP và cho phép ủy thác trên phạm vi địa chỉ  `non-byte-aligned`. Trong ví dụ này, các khách hàng hiện nay có thể cung cấp ánh xạ cho zone `128.128/25.136.17.12.in-addr.arpa.` Chúng tôi có thể theo dõi các ủy thác như sau:

```
C:\> nslookup
Default Server: gw
Address: 10.0.0.1

> server f.in-addr-servers.arpa
Default Server: f.in-addr-servers.arpa
Addresses: 193.0.9.1

> set type=ptr

> 129.128/25.136.17.12.in-addr.arpa.
Server: f.in-addr-servers.arpa
Address: 193.0.9.1
12.in-addr.arpa nameserver = dbru.br.ns.els-gms.att.net
12.in-addr.arpa nameserver = cbru.br.ns.els-gms.att.net
12.in-addr.arpa nameserver = cmtu.mt.ns.els-gms.att.net
12.in-addr.arpa nameserver = dmtu.mt.ns.els-gms.att.net

> server dbru.br.ns.els-gms.att.net.
Default Server: dbru.br.ns.els-gms.att.net
Address: 199.191.128.106

> 129.128/25.136.17.12.in-addr.arpa.
128/25.136.17.12.in-addr.arpa nameserver = ns2.intel-research.net
128/25.136.17.12.in-addr.arpa nameserver = ns1.intel-research.net

> server ns1.intel-research.net.
Server: ns1.intel-research.net
Address: 12.155.161.131

> 129.128/25.136.17.12.in-addr.arpa.
129.128/25.136.17.12.in-addr.arpa name = dmz.slouter.seattle.intel-research.net
128/25.136.17.12.in-addr.arpa nameserver = bldmzsvr.berkeley.intel-research.net
128/25.136.17.12.in-addr.arpa nameserver = sldmzsvr.intel-research.net

bldmzsvr.berkeley.intel-research.net internet address = 12.155.161.131

sldmzsvr.intel-research.net internet address = 12.17.136.131
```

Trong ví dụ này, chúng tôi mong muốn tìm ra tên cho các máy chủ kết hợp với địa chỉ IPv4 `12.17.136.129`. Chúng ta đã thấy rằng nó có một CNAME RR trỏ đến qui tắc tên `129.128/25.136.17.12.in-addr.arpa.`. Chúng tôi giải quyết của mình, chúng tôi sử dụng một trong các máy chủ root (F) và bố trí cho các loại truy vấn được cho một PTR RR. Tại thời điểm này, chúng tôi yêu cầu phân giải cho `129.128/25.136.17.12.in-addr.arpa.`. Các máy chủ tên miền root không có thông tin này, và nó không thực hiện đệ quy, do đó nó sẽ trả về tên của các máy chủ có thẩm quyền cho các tên miền `12.in-addr.arpa.`. Chọn một trong số họ (DBRU), chúng tôi một lần nữa cố gắng để giải quyết câu hỏi của mình. Lần này chúng ta thấy hai máy chủ tên (ns1 và ns2). Chọn một trong chúng, chúng tôi có thể giải quyết yêu cầu PTR. Kết quả có được là `dmz.slouter.seattle.intel-research.net`

