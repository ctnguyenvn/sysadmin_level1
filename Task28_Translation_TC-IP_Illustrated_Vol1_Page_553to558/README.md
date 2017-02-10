### Name Resolution and the Domain Name System (DNS)

> Tài liệu: Phân giải tên miền và hệ thống tên miền

> Thực hiện: nguyễn Công Trứ

> Cập nhật: 06/02/2017

#### Mục lục

- [5.6 Resource Record Types](#5.6)

	- [5.6.13 URI/URN Resolution](#5.6.13)

	- [5.6.14 S-NAPTR and U-NAPTR](#5.6.14)

- [5.7 Dynamic Updates (DNS UPDATE)](#5.7)

***
<a name="5.6"></a>
### 5.6 Resource Record Types

<a name="5.6.13"></a>
#### 5.6.13 URI/URN Resolution

Mặc dù ENUM có thể là sử dụng NAPTR record tốt nhất trong DNS, cũng có những ứng dụng DDDS được định nghĩa cho việc giải quyết các URI [RFC3404], vị trí URIs độc lập được gọi `Uniform Resource Names` (URNs) [RFC2141]. Tất cả URIs ( cả URNs) bao gồm 1 tên đề xuất theo sau 1 chuỗi con phù hợp với ngữ nghĩa cụ thể cho các đề xuất. Danh sách hiện tại của chương trình chính thức được duy trì bởi IANA [URI]. Ứng dụng URI và URN giống nhau mà nó là giá trị xét cùng nhau. Cho ứng dụng URI/URN DDDS, sau đó, AUS là URI hoặc URN mà 1 máy chủ có quyền "resolution" (quyết định) đang được xác định. Quy tắc Well-Known đầu tiên cho các ứng dụng URI là chỉ đơn giản là 1 đề xuất. Đối với URNs, đó là các tên định danh (chuỗi xuất hiện sau khi `urn:` chương trình nhận dạng và trước các dấu hai chấm tiếp theo). Ví dụ, `http://www.pearson.com` là 1 URI sử dụng http (key), và URN `urn:foo:foospace` sẽ sử dụng foo là key đầu tiên. Bốn cờ hiện nay được xác định: S, A, U, và P. Ba cờ đầu tiên là terminal và chỉ ra rằng kết quả là các tên miền sử dụng để lấy 1 SRV record, 1 địa chỉ IP hoặc 1 URI. Cờ P chỉ ra tiến trình của thuật toán DDDS là ngừng kết nối và bắt đầu 1 số ứng dụng đặt biệt (được định nghĩa ở nơi khác). Tất cả các cờ như vậy loại trừ lẫn nhau. Như với ENUM, thiếu bất kỳ cờ nào sẽ đó cho biết là 1 NTN.

Hỗ trợ cho các URI/URN  DDDS vẫn đang phát triển. Nếu hiện tại (2011) chúng ta nhìn vào DNS, chúng ta có thể thấy một số các đề án đã được đưa vào TLD `uri.arpa`:

```
Linux% host –t naptr http.uri.arpa
http.uri.arpa has NAPTR record 0 0 "" "" "!^http://([^:/?#]*).*$!\\1!i" .

Linux% host –t naptr ftp.uri.arpa
ftp.uri.arpa has NAPTR record 0 0 "" "" "!^ftp://([^:/?#]*).*$!\\1!i" .

Linux% host –t naptr mailto.uri.arpa
mailto.uri.arpa has NAPTR record 0 0 "" "" "!^mailto:(.*)@(.*)$!\\2!i" .

Linux% host –t naptr urn.uri.arpa
urn.uri.arpa has NAPTR record 0 0 "" "" "/urn:([^:]+)/\\1/i" .
```
Ba lệnh đầu tiên của những NAPTR record chứa quy tắc viết lại và không có cờ. Do đó, về cơ bản chỉ ra rằng các ứng dụng cần trích xuất các tên miền từ các URI tương ứng và tiếp tục các thuật toán DDDS. Cờ `i` theo sau nằm ở cuối! ký tự chỉ ra rằng trường hợp kiểm tra sẽ được thực hiện một cách chính xác. Ví dụ, `mailto:person@example.com` được viết lại để chỉ `example.com`. Record thứ 4 được sử dụng để trích xuất tên các ID không gian tên miền URN và tiếp tục xử lý. Đối với URNs, có một số lượng nhỏ (hiện nay là 2) các NAPTR record trong DNS thiết lập trong `urn.arpa`:

```
Linux% host –t naptr pin.urn.arpa
pin.urn.arpa has NAPTR record 100 100 "" "" "" pin.verisignlabs.com.

Linux% host –t naptr uci.urn.arpa  
uci.urn.arpa has NAPTR record 100 100 "" "" "" uci.or.kr.
```

Không gian tên miền URN xuất hiện nhận được ít sự chú ý hiện nay, và nó vẫn còn chưa rõ ràng với những gì mà khi URNs được sử dụng rộng rãi, vì hiện tại nó đang cạnh tranh với các phương pháp thể hiện và định vị đối tượng sử dụng định danh liên tục. Tuy nhiên, hơn 40 không gian tên miền URN đã được xác định [URN], do đó sẽ tiếp tục có sự quan tâm của cộng đồng trong việc thiết lập các không gian tên miền, mặc dù ít tương thích chung, kích hoạt các NAPTR record

<a name="5.6.14"></a>
#### 5.6.14 S-NAPTR and U-NAPTR

Một vấn đề thường phát sinh khi một ứng dụng muốn xác định cụ thể máy chủ, giao thức, và số cổng để sử dụng để đạt được một dịch vụ trong một miền. Ví dụ, một ứng dụng  mail-reading đang chạy trên máy tính của người dùng với tên miền example.com có thể cần phải tìm một máy chủ cung cấp dịch vụ IMAP. Một quy ước đã phát sinh đơn giản là thêm vào trước tên miền là tên dịch vụ (ví dụ, imap.example.com). Sử dụng CNAME, A, hoặc AAAA record có phần hơi cứng nhắc, bởi những loại record không truyền tải bất kỳ dấu hiệu nào của giao thức vận chuyển hoặc số cổng để sử dụng.  SRV record đi xa hơn bằng cách cung cấp một layer gián tiếp, nhưng mục tiêu của họ có thể chỉ chứa tên miền mà một A hoặc AAAA record này được lấy sau. Sử dụng NAPTR record thay thế cung cấp linh hoạt hơn thông qua thêm một layer gián tiếp và cho phép các loại record mục tiêu khác (chẳng hạn như các SRV record) được sử dụng.

Cấu trúc NAPTR và rewrite khả năng đã gây ra mối quan tâm đối với một số người thực hiện và vận hành do sự phức tạp trong diễn đạt chuyên ngành. Trong 1 nỗ lực để đơn giản hóa tình hình nhưng vẫn cung cấp một phương pháp vượt qua SRV record cơ bản để định vị các dịch vụ, `straightforward` NAPTR (S-NAPTR) [RFC3958] chỉ định một ứng dụng DDDS cho ánh xạ tên miền "labels" có chứa một tên sử dụng dịch vụ hạn chế nhất định đơn giản hóa trên các nội dung của NAPTR record.

Đối với S-NAPTR, các AUS là một labels (nhãn) tên miền mà một máy chủ authoritative cho một dịch vụ cụ thể được tìm kiếm. Quy tắc Well-Known đầu tiên là chức năng nhận dạng. Dự kiến đầu ra là các thông tin cần thiết để liên hệ với một dịch vụ ứng dụng cụ thể trong một tên miền (ví dụ, giao thức, máy chủ, cổng). Chỉ có cờ S và A terminal được phép, trong đó chỉ ra một SRV RR hoặc một tên miền (mà để được sử dụng để tạo thành yêu cầu tiếp theo là một A hoặc AAAA RR). Các thông số dịch vụ được lấy từ thiết lập duy trì trong 1 IANA registry [SNP], và các trường `Regexp` không được sử dụng. Chỉ có trường `Replacement` hoạt động. S-NAPTR được sử dụng kết hợp với `Internet Registry Information Service` (IRIS) [RFC3981], một văn bản giao thức ứng dụng là `XML-based` để trao đổi thông tin liên quan đến tên miền và đăng ký thông tin khác mà cơ sở dữ liệu được chứa trong phần `iris.arpa` của không gian tên miền DNS; ví dụ

```
Linux% host –t naptr areg.iris.arpa
reg.iris.arpa NAPTR
100 10 "" "AREG1:iris.xpc:iris.lwz" "" areg.nro.net.
```
Ví dụ này sử dụng S-NAPTR (không có biểu hiện thông thường) để chỉ ra rằng, để thực hiện một truy vấn ISIS cho dữ liệu loại AREG1 [RFC4698], Sau 1 truy vấn NAPTR nên chỉ tới `areg.nro.net`.

Kinh nghiệm và chú ý rõ hơn của S-NAPTR dẫn đến sự phát triển của `URI-enable` NAPTR (U-NAPTR) [RFC4848], trong đó giảm một số hạn chế của S-NAPTR nhưng vẫn duy trì tất cả các tính năng và các đăng ký khác. Quan trọng nhất, thêm cờ U được phép, cho phép các NAPTR record mục tiêu là một URI và do đó cho phép việc sử dụng các diễn đạt thông thường. Điều này cũng tương tự như các phiên bản đầy đủ của NAPTR, trừ U-NAPTR biểu thức thông thường được giới hạn trong các hình thức sau đây:`!.! * <URI> !.` Đó là, toàn bộ AUS được thay thế bằng một `URI.U-NAPTR` đang được sử dụng kết hợp với `Location-to-Service Translation pro-tocol`(LoST) [RFC5222], mà có thể được sử dụng để xác định các dịch vụ đúng được một điểm của mạng với tập tin đính kèm và vị trí địa lý. Những thông tin này rất hữu ích trong các ứng dụng công cộng an toàn, nơi bắt buộc có những quyền đặc biệt và các bên có trách nhiệm cung cấp các dịch vụ khẩn cấp.

<a name="5.7"></a>
### 5.7 Dynamic Updates (DNS UPDATE)

Nó có thể tự động cập nhật một zone, gọi là `DNS UPDATE`, sử dụng một giao thức được định nghĩa trong [RFC2136]. Nó hỗ trợ khả năng xác định `prerequisites` (điều kiện tiên quyết) kết hợp với một yêu cầu cập nhật. `prerequisites` được xác tại máy chủ; nếu chúng không đúng, bản cập nhật không được thực hiện và trả về thông báo lỗi.

DNS UPDATE được thực hiện bằng cách gửi thông điệp cập nhật DNS động đến một máy chủ DNS có thẩm quyền đối với một zone. Cấu trúc của thông điệp đó giống một thông điệp DNS thông thường, ngoại trừ các trường header và phần có tên gọi khác nhau. Các phần chỉ ra zone đang được cập nhật, điều kiện tiên quyết yêu cầu hiện tại có các RR khác nhau (hoặc không) để cập nhật để có hiệu lực, và các `update information` (thông tin cập nhật). Trong một bản cập nhật, các header phản ánh các định dạng cho một truy vấn, nhưng trường Opcode được thiết lập để cập nhật. Các trường header `ZOCOUNT, PRCOUNT, UPCOUNT,` và `ADCOUNT` chứa các count sau: zone được cập nhật (điều này sẽ có giá trị 1), điều kiện tiên quyết để xem xét, cập nhật được thực hiện, và `additional information records,` (các hồ sơ thông tin bổ sung). [RFC2136] cũng định nghĩa một tập hợp các giá trị `RCODE` thực trong thông điệp trả lời DNS có khả năng chỉ ra các điều kiện liên quan đến các vấn đề với các điều kiện tiên quyết hoặc máy chủ.

Phần zone của một thông điệp cập nhật có ghi tên của zone, 1 type, và 1 class. Các giá trị type sẽ là 6 để chỉ ra sự hiện diện của một SOA record, cái xác định zone. Các giá trị class sẽ là 1 (Internet) cho bất kỳ thông điệp cập nhật nào mà chúng ta quan tâm. Tất cả các record được cập nhật phải ở trong cùng một zone.

Phần điều kiện tiên quyết của một thông điệp cập nhật chứa một hoặc nhiều điều kiện tiên quyết, thể hiện sử dụng định dạng cho các RR chúng ta đã thảo luận trước đó tại mục 5.5. Có năm loại điều kiện tiên quyết: `RRSet  exists` (RRSet tồn tại, giá trị phụ thuộc vào giá trị độc lập và không độc lập), `RRSet does not exist, name is in use` và `name is not in use`. Nhớ lại rằng một RRSet là một nhóm các RR từ cùng một zone chung `name, class` và `type`. Để thể hiện ngữ nghĩa của một điều kiện tiên quyết, một sự kết hợp của `class, type`, và `rdata` của một RR được thiết lập theo bảng dưới.

![](https://github.com/hellsins/sysadmin_level1/blob/master/Task28_Translation_TC-IP_Illustrated_Vol1_Page_553to558/Image/1.png)

Các loại `RRSet exists` có nghĩa là ít nhất một RRSet tồn tại trong zone quy định trong phần zone đó phù hợp với name và type của RR tương ứng trong phần điều kiện tiên quyết. Trong trường hợp giá trị phụ thuộc, các điều kiện tiên quyết là đúng chỉ khi chứa RR phù hợp khớp với các giá trị rdata. Các loại `RRSet does not exist` nghĩa là không có RRSet trong zone quy định trong phần zone phù hợp với name và type của RR trong phần điều kiện tiên quyết. Hai trường hợp cuối cùng (`Name is in use` và `Name is not in use`) chỉ đề cập đến tên miền; các giá trị type không được sử dụng. Các giá trị cho NONE và ANY như các class DNS là 254 và 255, tương ứng.

Sau phần điều kiện tiên quyết, phần update chứa RR được thêm vào hoặc xóa khỏi zone quy định tại phần zone. Có bốn loại update, mã hóa như một RR với sự kết hợp khác nhau của các giá trị trong các trường Class, Type, và rdata, như được chỉ ra trong bảng sau:

![](https://github.com/hellsins/sysadmin_level1/blob/master/Task28_Translation_TC-IP_Illustrated_Vol1_Page_553to558/Image/2.png)

Phần update chứa một bộ sưu tập của các RR được tiến trình cung cấp không có lỗi nào xảy ra do điều kiện tiên quyết hoặc các vấn đề máy chủ. Mỗi RR mã hóa một addition hoặc xóa hoạt động. Thay đổi có thể được thực hiện như xóa sau khi bổ sung. Để xem ví dụ về DNS UPDATE, chúng ta có thể tạo ra một máy tính Windows để thực hiện một cập nhật DNS động bằng cách sử dụng lệnh sau:

```
C:\> ipconfig /registerdns
```

Windows clients phát hành bản cập nhật cho tên máy tính của họ và tên miền theo mặc định, nhưng hành vi này cũng có thể được kích hoạt cho IPv4 trên một cơ sở cho mỗi   per-DNS-sufix bằng cách kiểm tra các hộp có nhãn "Sử dụng DNS suffix của kết nối này trong DNS registration" trong phần DNS của các thiết lập TCP/IP nâng cao, được tìm thấy trên mục General của Internet Protocol (TCP/IP) Properties menu kết hợp với mỗi giao diện kích hoạt cho TCP/IP. Đối với IPv6, cùng một thủ tục được sử dụng, nhưng trên menu IPv6 Properties. Trong ví dụ thể hiện trong hình dưới, chúng ta có thể thấy máy có tên vista cập nhật local zone `dyn.home` cũng như các vấn đề thông báo cập nhật DNS hiện ra

![](https://github.com/hellsins/sysadmin_level1/blob/master/Task28_Translation_TC-IP_Illustrated_Vol1_Page_553to558/Image/3.png)

> Một cập nhật DNS động chứa một SOA record trong phần zone và RR trong phần cập nhật. Trường hợp này bao gồm các địa chỉ IPv4 và IPv6 mới cho `vista.dyn.home`

Hình trên cho thấy làm thế nào một bản update động được mã hóa. Các máy chủ DNS tại 10.0.0.1 (chạy BIND9 [AL06] trong ví dụ này) được cấu hình để cho phép update động. Phần zone chứa một SOA record xác định các zone phải được cập nhật (vista.dyn.home). Phần điều kiện tiên quyết có chứa một RR với một phần rdata zero-length và giá trị TTL 0. RR tương ứng với loại điều kiện tiên quyết trong hàng thứ ba của bảng trên (RRset does not exist) vì loại của nó không phải là ANY (nó là CNAME) và class của nó được đặt NONE (254)

Trong trường hợp đặc biệt này,địa chỉ `10.0.0.57` và `200:5c0:1101:ed00:fd26:de93:5ab7:405a` phải được kết hợp với tên `vista.dyn.home`. Điều này được thực hiện bằng cách đầu tiên xóa các AAAA và A RRSets (tương ứng với hàng 2 trong bảng trên), và sau đó thêm các AAAA và A RRSets (tương ứng với hàng 1 trong bảng trên) cho các địa chỉ mong muốn.

![](https://github.com/hellsins/sysadmin_level1/blob/master/Task28_Translation_TC-IP_Illustrated_Vol1_Page_553to558/Image/4.png)

> Trả lời một yêu cầu update động bao gồm một ID giao dịch và trạng thái cờ thiết lập

Responses cập nhật DNS là đơn giản và nhỏ gọn. Các responses để cập nhật hiển thị trong 2 hình trên

Trường Flags chỉ ra một bản cập nhật thành công (không có lỗi). ID giao dịch (0x4089) được sử dụng để đảm bảo rằng các response cập nhật phù hợp với yêu cầu tương ứng. Lưu ý rằng trên Linux, chương trình `nsupdate` có thể được sử dụng để cập nhật một máy chủ DNS cộng tác. Các máy chủ DNS cộng tác với chỉ một yêu cầu cập nhật nếu một thủ tục xác thực và kiểm soát truy cập cho thấy rằng yêu cầu này là được chấp nhận. Điều này có thể đơn giản như không có gì hoặc danh sách các địa chỉ IP của client tại máy chủ, không phải trong đó là rất an toàn, hoặc sử dụng các phương pháp khá phức tạp và an toàn hơn mà cung cấp chứng thực giao dịch.
