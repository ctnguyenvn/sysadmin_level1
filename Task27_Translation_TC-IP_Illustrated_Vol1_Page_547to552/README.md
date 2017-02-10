
### Name Resolution and the Domain Name System (DNS)

> Tài liệu: Phân giải tên miền và hệ thống tên miền

> Thực hiện: nguyễn Công Trứ

> Cập nhật: 01/12/2016

#### Mục lục

- [5.6.9 Option (OPT) Pseudo-Records](#5.6.9)

- [5.6.10 Service (SRV) Records](#5.6.10)

- [5.6.11 Name Authority Pointer (NAPTR) Records](#5.6.11)

- [5.6.12 ENUM and SIP](#5.6.12)

***

<a name="5.6.9"></a>
### 5.6.9 Option (OPT) Pseudo-Records

Kết hợp với EDNS0, ở mô tả trước đây, một OPT đặc biệt là `pseudo-RR` đã được định nghĩa [RFC2671]. Nó là "pseudo" với ý nghĩa rằng nó chỉ xảy ra trong nội dung của một thông điệp DNS duy nhất và không phải là dữ liệu DNS RR  thông thường. Do đó, OPT RR không được cache, forwarded, hoặc liên tục được lưu trữ, và nó có thể chỉ xuất hiện một lần (hoặc không) trong một thông điệp DNS. Nếu nó có mặt trong một thông điệp DNS, nó được tìm thấy trong phần  additional information (thông tin bổ sung)

Một OPT RR chứa 10 byte cố định và theo sau là phần biến. Phần cố định bao gồm 16 bit chỉ ra loại RR, 16 bit cho biết kích thước gói UDP, 32 bit tạo thành một trường mở rộng RCODE và flag, và 16 bit cho kích thước của phần biến trong số byte. Những trường được đặt tại các vị trí tương đối như Name, Type, Class, TTL, và các trường RDLEN, tương ứng, trong một RR thông thường (xem hình dưới). Các OPT RR sử dụng một tên miền null trong trường name (0 byte). Thêm trường RCODE và Flags (32 bit, tương ứng với trường TTL) được chia thành một khu vực 8 bit để thêm 8 bit bậc cao tăng độ lớn cho trường RCODE, và một trường 8-bit (hiện đang thiết lập là 0 để chỉ EDNS0). 16 bit còn lại chưa được xác định và là 0. 8 bit additional (bổ sung) cung cấp một bộ mở rộng các kiểu báo lỗi DNS có thể, và các giá trị được đưa ra trong bảng dưới. (Lưu ý rằng giá trị 16 được xác định bởi hai RFC khác biệt.)

![](https://github.com/hellsins/sysadmin_level1/blob/master/Task27_Translation_TC-IP_Illustrated_Vol1_Page_547to552/Image/1.png)

Như chúng ta đã đề cập, OPT RR chứa một trường RDATA chiều dài thay đổi (variable-length). Trường này được sử dụng để giữ một danh sách mở rộng của các cặp thuộc tính-giá trị (attribute-value). Các thiết lập hiện tại của các thuộc tính, ý nghĩa, và định nghĩa các RFC được duy trì bởi IANA [DNSPARAMS]. Một trong những tùy chọn, được gọi là NSID (tùy chọn EDNS mã 3) [RFC5001], chỉ ra một giá trị xác định đặc biệt cho một response DNS server. Định dạng của giá trị này không được cấu hình chuẩn mà được cấu hình bởi người quản trị hệ thống của máy chủ DNS. Điều này có thể hữu ích trong trường hợp một địa chỉ anycast được sử dụng để xác định một nhóm các máy chủ. Các NSID có thể xác định một máy chủ phản hồi cụ thể sử dụng một giá trị khác với địa chỉ IP gửi. Chúng ta sẽ thấy nhiều ví dụ về OPT RR và sử dụng EDNS0 về

<a name="5.6.10"></a>
### 5.6.10 Service (SRV) Records

[RFC2782] định nghĩa các bản ghi (record) tài nguyên `service` (SRV). RR SRV khái quát các định dạng MX record để mô tả các máy chủ, các giao thức, và số cổng được sử dụng để liên lạc với một `service` cụ thể. Một SRV RR có cấu trúc thông thường như sau:

```
_Service._Proto.Name TTL IN  SRV  Prio  Weight  Port  Target
```

`Service` xác định là tên chính thức của một `service`. `Proto` xác định là giao thức truyền tải được sử dụng để truy cập các `service`, thường là TCP hoặc UDP. Giá trị TTL là một TTL RR thông thường, và IN và SRV cho biết lớp (class) Internet và  loại SRV RR. Giá trị `Prio` là một giá trị không dấu 16-bit và hoạt động giống như các giá trị ưu tiên trong MX record (số thấp hơn đại diện ưu tiên cao hơn). Giá trị `weight` được sử dụng để lựa chọn một trong số vài RR có giá trị ưu tiên bằng nhau. Ý tưởng là `weight` được sử dụng như một xác suất có trọng để chọn RR cụ thể để cân bằng tải, vì vậy `weight` lớn hơn cho thấy xác suất lớn hơn để lựa chọn. `Port` là số cổng TCP hoặc UDP (hoặc giao thức vận chuyển khác). `Target` là tên miền của máy chủ mục tiêu, nơi `service` đang được cung cấp. `name` là miền chứa một `service` cụ thể được tìm thấy. Một trong những mục đích của SRV record là xác định khi nhiều máy chủ cá nhân trong một miền hỗ trợ các `service` tương tự

Ví dụ, nếu một client muốn xác định các máy chủ và cổng `service` `ldap` có sẵn bằng cách sử dụng giao thức TCP với example.com, nó sẽ thực hiện một truy vấn cho các bản ghi SRV sử dụng tên miền _ldap._tcp.example.com . Dưới đây là một ví dụ thực tế:

```
Linux% host –t srv _ldap._tcp.openldap.org
_ldap._tcp.openldap.org has SRV record 0 0 389 www.openldap.org.
```
Trong ví dụ này, chúng ta đang tìm kiếm một máy chủ cung cấp các `service` Lightweight Directory Access Protocol (LDAP)  [RFC4510] qua TCP với tên miền `openldap.org`. Chúng tôi thấy rằng nó có thể được truy cập vào máy chủ `www.openldap.org` sử dụng TCP cổng 389 (cổng LDAP mặc định). Các giá trị `Priority` và `weight` là 0, vì không có máy chủ thay thế.

[RFC2782] đã không chỉ định đăng ký IANA mới cho `service` SRV và cả `Proto`. Vì vậy, theo mặc định, các tên tương ứng với tên duy trì các giá trị Proto của IANA "Tên `service` và Transport Protocol Port Number" đăng ký [ISPR], và là một trong `_tcp` hoặc `_udp`. Có một vài trường hợp ngoại lệ, tuy nhiên. [RFC5509] thiết lập quy ước cho sự hiện diện dựa trên SIP-based và nhắn tin tức thời sử dụng theo sau `SRV service` và `Proto` là: `_im._sip` và `_pres._sip`. [RFC6186] định nghĩa tên `service` SRV sau cho đại lý người dùng e-mail để dễ dàng phát hiện ra các thông tin liên lạc cho IMAPS, SMTP, IMAP và POP3 server (2 cái đầu thường được ưa chuộng hơn khi thiết lập một ứng dụng e-mail): `_submission`, `_imap`, `_imaps`, `_pop3`, `_pop3s`. Mặc dù [RFC6186] không yêu cầu các tên này để sử dụng TCP như là giá trị `Proto` tương ứng, điều này hiện đang là lựa chọn duy nhất thực sự. Ví dụ, 1 người dùng cấu hình `mail user agent` mới(MUA, thực chất là một chương trình e-mail) có thể xác định chỉ các tên miền `example.com`. Việc thực hiện MUA sau đó sẽ có khả năng thực hiện các truy vấn DNS cho ít nhất `_submission._tcp.example.com` và `_imaps._tcp.example.com`

<a name="5.6.11"></a>
### 5.6.11 Name Authority Pointer (NAPTR) Records

Loại `Name Authority Pointer`(NAPTR) RR được sử dụng khi hỗ trợ `Dynamic Delegation Discovery System` (DDDS) [RFC3401]. Một DDDS là chung, thuật toán trừu tượng để áp dụng quy tắc chuỗi chuyển động lấy ra các chuỗi cung cấp bởi các ứng dụng và sử dụng kết quả, thường xuyên nhất, để xác định nguồn tài nguyên. Mỗi ứng dụng DDDS tùy biến các hoạt động của quy tắc DDDS chung cho các trường hợp sử dụng cụ thể của nó. Một DDDS bao gồm một quy tắc cơ sở dữ liệu và một tập hợp các thuật toán để hình thành chuỗi được sử dụng với cơ sở dữ liệu để tạo ra các chuỗi. DNS là một cơ sở dữ liệu như vậy [RFC3403], và cùng với nó là loại NAPTR record tài nguyên được sử dụng để giữ các quy tắc chuyển đổi. Một ứng dụng DDDS như đã được xác định để sử dụng với DNS để xử lý các số điện thoại đa quốc gia và chuyển đổi chúng sang một `Uniform Resource Identifier` (URI) định dạng chuẩn [RFC3986] sử dụng ENUM

Trong một DDDS, một `algorithm` (thuật toán) [RFC3402] chỉ ra như thế nào là một chuỗi application-unique (ứng dụng duy nhất) (AUS) được xử lý theo các quy tắc chứa trong một cơ sở dữ liệu. Kết quả có thể là một chuỗi `terminal` (thiết bị đầu cuối) (hoàn thành ở đầu ra) hay chuỗi khác (nonterminal) được sử dụng để lấy một quy tắc áp dụng cho các AUS. Trong tất cả, kết hợp cách các chuỗi mạnh mẽ viết lại hệ thống có thể được sử dụng để mã hóa gần như bất cứ điều gì mà một cú pháp có đầy đủ. Bản chất của thuật toán này được chụp trong hình dưới.

Quá trình được minh họa như hình dưới bắt đầu bằng việc áp dụng Quy tắc Well-Known đầu tiên đến AUS, được xác định duy nhất cho mỗi ứng dụng. Kết quả tạo thành một key (khóa) được sử dụng để lấy quy tắc từ một cơ sở dữ liệu. Quy định là mô hình `string-rewriting` và `flag` được áp dụng cho AUS, nhưng không bao giờ là kết quả của một chuỗi viết lại. Đặc biệt cách làm việc này phụ thuộc vào ứng dụng, nhưng thường các quy tắc đặc biệt được thay vào, tương tự như những người sử dụng với các chương trình UNIX sed [DR97]. Khi sử dụng DNS như một cơ sở dữ liệu để hỗ trợ một DDDS [RFC3403], trường hợp mà chúng ta quan tâm, các key là các tên miền và các quy tắc được lưu vàotài nguyên NAPTR record. Mỗi NAPTR RR chứa các trường sau đây: `Order`, `Preference`, `Flags`, `Services`, `Regular Expression` (đôi khi viết `Regexp`), và `Replacement`.

Các trường `Order` là 1 kiểu nguyên không dấu 16-bit đặc biệt nêu rõ NAPTR record sử dụng trước khi những trường khác (số càng thấp thì càng cao), như kiến trúc DNS không đảm bảo trật tự của bất kỳ thiết lập riêng nào của tài nguyên record

![](https://github.com/hellsins/sysadmin_level1/blob/master/Task27_Translation_TC-IP_Illustrated_Vol1_Page_547to552/Image/2.png)

> Tóm tắt hoạt động của thuật toán DDDS. Non-terminal records được chấp nhận để tạo thành vòng lặp. Mỗi lần lặp liên quan đến một hoạt động chuỗi viết lại trên chuỗi duy nhất của ứng dụng

Các trường `Preference` được sử dụng để tác động đến thứ tự của record có chứa số thứ tự. Các trường `Order` được hỗ trợ bắt buộc đặt trên các RR, trong khi đó số `Preference` để tham khảo. Trường Flags chứa một danh sách có thứ tự của ký tự duy nhất từ ​​tập A-Z và 0-9 (case-insensitive). Các ứng dụng sử dụng các NAPTR record cụ thể (ví dụ, ENUM, được mô tả trong phần tiếp theo) xác định việc giải thích của trường Flags. Các trường `service` được xác định bởi các ứng dụng để chỉ ra các loại hình dịch vụ được mô tả. Các trường `Regular Expression` chứa một biểu thức thay thế được áp dụng cho các AUS để hình thành bản chất của một server khác để sử dụng nslookup NAPTR (trường hợp không có terminal) hoặc chuỗi đầu ra (trường hợp có terminal). Các trường `Replacement` (mà chỉ tồn tại khi `Regular Expression` không có) chỉ ra máy chủ tiếp theo để truy vấn cho các NAPTR record. Nó được mã hóa như một FQDN riêng biệt (không nén tên được sử dụng trong thông điệp DNS). Việc sử dụng cho hai trường cuối (loại trừ lẫn nhau) là rất giống nhau vì những lý do lịch sử trong sự phát triển của NAPTR RR.

Để có được một cảm giác tốt hơn về cách NAPTR làm việc với các ứng dụng, chúng ta sẽ có một cái nhìn sơ qua về ENUM và các ứng dụng SIP DDDS, các ứng dụng URI/URN DDDS, và lựa chọn thay thế cho các NAPTR record thường được gọi là S-NAPTR và U-NAPTR. Xác định DDDS đòi hỏi phải xác định AUS của ứng dụng, đầu tiên qui ước Well-Known, đặt ra dự kiến, cơ sở dữ liệu hợp lệ, flag, và các thông số dịch vụ.

<a name="5.6.12"></a>
### 5.6.12 ENUM and SIP

Trong `ENUM DDDS [R06] [RFC6116] [RFC6117] [RFC5483]`, cái được sử dụng để tạo bản đồ số điện thoại tới thông tin URI, các AUS là  định dạng E.164 một số điện thoại (lên đến 15 chữ số bắt đầu với dấu +) . Dấu + ban đầu phân biệt số E.164 được chấp nhận để sử dụng với ENUM DDS từ các số trong không gian tên miền khác. Quy tắc Well-Known đầu tiên bắt đầu bằng cách loại bỏ bất kỳ dấu gạch ngang hoặc ký tự không phải chữ số trong AUS. Các cơ sở dữ liệu DDDS là DNS, nơi các key là các tên miền được tạo từ AUS (mà bây giờ chỉ gồm các chữ số) như sau: dấu (.) được chèn vào giữa mỗi chữ số và kết quả được đảo ngược. Sau đó, các hậu tố `.e164.arpa` được thêm vào. Ví dụ, số E.164 + 1-415-555-1212 sẽ được chuyển đến `2.1.2.1.5.5.5.5.1.4.1.e164.arpa`. Kết quả tên miền được sử dụng để truy vấn cho các NAPTR record.

Kết quả cuối cùng, có thể sau nhiều vòng lặp của thuật toán DDDS được thể hiện trong hình trên, là 1 URI tuyệt đối (không tương đối). Các cờ duy nhất là cờ `U`, cho thấy một quy tắc terminal tạo ra một URI. Việc thiếu bất kỳ cờ nào chỉ ra một quy tắc non-terminal, đôi khi được gọi là một non-terminal NAPTR (NTN). Các thông số dịch vụ, mã hóa trong các trường `service` của các NAPTR record, có dạng E2U+`service`, mà xuất phát từ chuỗi E2U (một thông báo cho E.164 tới URI) cộng với tên `service` con cung cấp dịch vụ cụ thể liên quan đến con số. Cùng với nhau, chúng tạo thành định nghĩa `enumservice`, và dịch vụ này được đăng ký với IANA [ENUM] [RFC6117]. Nhiều người đã được tạo ra, bao gồm cả `enumservices` cho fax, tin nhắn tức thời, và chỉ số hiện diện.

Để xem tất cả làm việc như thế nào, chúng ta có thể tạo một truy vấn cho số +420738511111 tại Đại học Ostrava tại Cộng hòa Séc (hệ thống được rõ ràng):

```
Linux% host -t naptr 1.1.1.1.1.5.8.3.7.0.2.4.e164.arpa 

1.1.1.1.1.5.8.3.7.0.2.4.e164.arpa has NAPTR record 
 	50 50 "u" "E2U+sip" "!^\\+(.*)$!sip:\\1@osu.cz!" .
1.1.1.1.1.5.8.3.7.0.2.4.e164.arpa has NAPTR record 
 	100 50 "u" "E2U+sip""!^\\+(.*)$!sip:\\1@cesnet.cz!" . 
1.1.1.1.1.5.8.3.7.0.2.4.e164.arpa has NAPTR record 
 	200 50 "u" "E2U+h323" "!^\\+(.*)$!h323:\\1@gk1ext.cesnet.cz!" .
```

Ở đây chúng ta thấy các nội dung của 3 NAPTR record trong ứng dụng ENUM DDDS, 2 cho các dịch vụ SIP và 1 cho các dịch vụ H.323, được sử dụng cho gọi thoại qua Internet. Các số thứ tự là 50 và 100 cho các mục SIP và 200 cho mục H.323, cho thấy làm thế nào có thể sử dụng ENUM và NAPTR record để có nhiều dịch vụ liên kết với một số điện thoại duy nhất, và làm thế nào các nhà cung cấp của các NAPTR record có thể chỉ ra cách sắp xếp tốt hơn của nhiều hơn một cổng cung cấp các dịch vụ tương tự.

> Note: 

> SIP là một giao thức IETF sử dụng cho báo hiệu và đặc biệt phổ biến để tạo điều kiện kết nối của client () khách hàng đa phương tiện) và server. H.323 là một giao thức ITU dùng cho hội nghị đa phương tiện và truyền thông, bao gồm một tín hiệu sub-protocol. Nó được thực hiện rộng rãi trong các thiết bị teleconferencing. Trong ví dụ này và theo đó, chương trình `host` tạo đầu ra có thể được sử dụng như là đầu vào một tập tin zone cho một máy chủ DNS như BIND. Như một hệ quả, đầu ra hiển thị thêm ký tự `\` (trong đó hiện ra như `\\`) mà không có mặt trong các DNS responses thực tế được cung cấp bởi các máy chủ

Để hiểu rõ hơn quy tắc NAPTR record sẽ được áp dụng cho AUS như thế nào, chúng ta sẽ xem xét các SIP record thứ hai từ ví dụ trước. Sau khi truy vấn DNS được thực hiện và NAPTR RR nhận được, chuỗi xuất hiện đầu tiên và thứ hai! ký tự được sử dụng như là một kết hợp đặc biệt và thay thế. Như vậy, chuỗi `+420738511111` kết hợp đặc biệt với `^ \ + (. *) $`. Đồng ý với các qui tắc kết hợp đặc biêtk, vì vậy qui tắc chuỗi được viết lại trở thành `sip`: `\1@cesnet.cz`. Các biến đặc biệt `\1` được thay thế bằng chuỗi con phù hợp với các giá trị đầu tiên thường chứa trong ngoặc (), mà trong trường hợp này là tất cả mọi thứ trong AUS trừ ký tự + ban đầu. Tóm lại, AUS `+420738511111` được chuyển thành chuỗi URI: `420738511111@cesnet.cz`.

Khi URI này được tạo ra, bước tiếp theo là cho các ứng dụng điều khiển để liên lạc với một máy chủ SIP. Tuy nhiên, SIP chính nó có thể được thực hiện qua giao thức truyền tải khác nhau, do đó, bước tiếp theo là sử dụng DDDS khác tạo ra cho SIP [RFC3263]. Trong ứng dụng này, NAPTR record chứa các mục tiêu xác định các tên miền mà được sử dụng để thực hiện các truy vấn SRV record. Tiếp tục với ví dụ trước:

```
Linux% host -t naptr cesnet.cz
cesnet.cz has NAPTR record 200 50 "s" "SIP+D2T" "" _sip._tcp.cesnet.cz.
cesnet.cz has NAPTR record 100 50 "s" "SIP+D2U" "" _sip._udp.cesnet.cz.
```
Ở đây chúng ta thấy việc sử dụng của cờ `s` trong NAPTR, chỉ ra rằng một SRV record là 1 kết quả. Các trường `Regexp` không được sử dụng, vì vậy kết quả là một tên miền đơn giản được thay thế, được đưa ra bởi chuỗi trong trường `Replacement`. Trường `service` là định dạng `SIP + D2X` hoặc `SIPS + D2X` nơi `SIP` và `SIPS` chỉ việc sử dụng các giao thức SIP và giao thức SIP với bảo mật, và `x` là định danh single-letter của giao thức vận chuyển: U cho UDP, T cho TCP, và S cho SCTP [RFC4960]. Trong ví dụ này, đầu tiên ứng dụng sẽ cố gắng để tìm kiếm và sử dụng các SRV record tương ứng với SIP/UDP và sẽ nhờ đến SIP/TCP nếu không thành công vì mục UDP có giá trị ưu tiên thấp hơn.
