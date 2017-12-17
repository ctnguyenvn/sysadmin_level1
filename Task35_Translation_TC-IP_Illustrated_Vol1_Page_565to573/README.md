### Name Resolution and the Domain Name System (DNS)

> Tài liệu:  Phân giải tên miền và hệ thống tên miền

> Thực hiện: Nguyễn Công Trứ 

> Cập nhật: 04/03/2017

### Mục lục:

- [6. Sort Lists, Round-Robin, and Split DNS](#6)

- [7. Open DNS Servers and DynDNS](#7)

- [8. Transparency and Extensibility](#8)

- [9. Translating DNS from IPv4 to IPv6 (DNS64)](#9)

- [10. LLMNR and mDNS](#10)

- [11. LDAP](#11)

- [12. Attacks on the DNS](#12)

- [13. Summary](#13)

***

<a name="6"></a>
### 6. Sort Lists, Round-Robin, and Split DNS

Cho đến nay, chúng ta đã nói về việc tên miền được thiết lập, các loại tài nguyên hỗ trợ các DNS record, và các giao thức DNS được sử dụng để lấy và cập nhật zone. Một điểm tinh tế để xem xét là những dữ liệu được trả về theo thứ tự để đáp ứng với một truy vấn DNS. Một DNS server có thể trả lại tất cả các dữ liệu tương ứng với bất kỳ client trong bất cứ điều gì để các server thấy thuận tiện nhất. Tuy nhiên, tùy chọn cấu hình đặc biệt và các hành động đều có sẵn trong hầu hết các phần mềm máy chủ DNS để đạt được những mục tiêu hoạt động, bảo mật, hoặc hiệu suất.

Các loại topology (sơ đồ hay mô hình) thể hiện trong hình dưới là điển hình của một doanh nghiệp nhỏ. Có một mạng riêng và mạng công cộng bao gồm một máy chủ DNS. Ngoài ra, có một cặp host trên DMZ (A và B), một trên mạng nội bộ (C) và một trên Internet (R). Một máy chủ multihomed (M) kéo dài giữa DMZ và mạng nội bộ. do đó M có hai địa chỉ IP được rút ra từ hai tiền tố mạng khác nhau.

![](https://github.com/ctnguyenvn/sysadmin_level1/blob/master/Task35_Translation_TC-IP_Illustrated_Vol1_Page_565to573/Image/1.png)

> Trong một cấu trúc liên kết doanh nghiệp nhỏ, DNS có thể được cấu hình để  trả lại địa chỉ khác nhau tùy thuộc vào địa chỉ IP yêu cầu

Một máy chủ có nhu cầu liên hệ với M thực hiện tra cứu DNS trả về hai địa chỉ (một liên kết với các mạng nội bộ và một với DMZ). Đương nhiên, nó sẽ hiệu quả hơn nếu A, B, và R nối M qua DMZ và C nối M thông qua mạng nội bộ. Điều này thường xảy ra nếu DNS trả về record của nó dựa trên địa chỉ IP nguồn của request. (Nó cũng có thể sử dụng địa chỉ IP đích, đặc biệt là nếu M sử dụng nhiều địa chỉ IP từ mạng con khác nhau trên cùng một mạng.) Nếu hệ thống yêu cầu sử dụng một địa chỉ IP nguồn với tiền tố mạng tương tự như nguồn của một record trả về, các máy chủ DNS đặt các record phù hợp vào đầu trong thông điệp trả về. Điều này khuyến khích các client để tìm ra địa chỉ IP "gần nhất" cho một server cụ thể mà nó đang cố gắng liên lạc, bởi vì hầu hết các ứng dụng đơn giản cố gắng liên hệ với địa chỉ đầu tiên tìm thấy trong số các record address trả lại. Các hành động chính xác thường có thể được kiểm soát bằng cách sử dụng cái gọi là `sortlist` hoặc `rrset-order` chỉ thị (tùy chọn sử dụng trong các tập tin cấu hình cho phân giải và máy chủ). Hành động phân loại như vậy cũng có thể xảy ra tự động nếu được thực hiện bởi phần mềm máy chủ DNS mặc định.

Một tình huống liên quan phát sinh khi một dịch vụ được cung cấp sử dụng nhiều hơn một máy chủ như vậy mà kết nối đến là ` load-balanced` (cân bằng tải - tức là, phân chia giữa các máy chủ). Trong ví dụ trước, hãy tưởng tượng rằng một dịch vụ được cung cấp trên cả A và B. Một dịch vụ như vậy có thể được xác định bởi các URL `http://www.example.com`. Client (như R) yêu cầu thực hiện một truy vấn DNS trên tên miền`www.example.com`, và các máy chủ DNS cuối cùng trả về một tập hợp các address record. Để đạt được cân bằng tải, các máy chủ DNS có thể được cấu hình để sử dụng `DNS round-robin`, có nghĩa là các máy chủ hoán đổi thứ tự của các address record  được trả về. Làm như vậy khuyến khích mỗi client mới để truy cập các dịch vụ trên một máy chủ khác nhau từ các client trước đó. Trong khi điều này sẽ giúp cân bằng tải, nó là hoàn hảo. Khi các record được lưu trữ, hiệu quả mong muốn có thể xảy ra vì tái sử dụng các address record lưu trữ hiện có. Ngoài ra, kế hoạch này có thể cân bằng giữa số lượng kết nối tốt trên các máy chủ, nhưng không load. Các kết nối khác nhau có thể có yêu cầu hoàn toàn khác nhau, vì vậy việc xử lý `tải` (load) đúng cũng có khả năng vẫn không cân bằng trừ khi các dịch vụ cụ thể luôn có yêu cầu xử lý tương tự.

Một xem xét cuối cùng liên quan đến dữ liệu trả về bởi một máy chủ DNS là hỗ trợ cho sự riêng tư. Trong ví dụ này, chúng ta có thể muốn sắp xếp cho các máy trong doanh nghiệp để có thể lấy resource records cho mỗi máy tính trong mạng, trong khi chúng ta giới hạn các thiết lập của hệ thống còn hiển thị với R. Một kỹ thuật cho việc thực hiện mục tiêu này được gọi là `split DNS`. Trong `split DNS`, tập các resource records trả lại để đáp ứng với một truy vấn phụ thuộc vào sự nhận dạng của client và có thể truy vấn địa chỉ đích. Thông thường, client được xác định bởi địa chỉ IP hoặc tiền tố địa chỉ. Với `split DNS`, chúng ta có thể sắp xếp cho bất cứ máy trong doanh nghiệp (ví dụ, những người chia sẻ một tập hợp các tiền tố) để được cung cấp toàn bộ cơ sở dữ liệu DNS, trong khi những người bên ngoài chỉ được cho vào A và B, nơi mà các dịch vụ Web chính là cung cấp

<a name="7"></a>
### 7. Open DNS Servers and DynDNS

Nhiều gia đình người dùng đều được gán một địa chỉ IPv4 duy nhất bởi ISP của họ, và địa chỉ này có thể thay đổi theo thời gian như của người sử dụng máy tính hoặc họ kết nối, ngắt kết nối, và kết nối lại với Internet. Do đó, nó thường rất khó khăn cho người sử dụng để thiết lập DNS cho phép các dịch vụ mà có thể nhìn thấy từ Internet. Một số cái gọi là Dynamic DNS (DDNS) các máy chủ mở có sẵn, có hỗ trợ một giao thức cập nhật đặc biệt gọi là DNS Update API [DynDNS], theo đó người dùng có thể cập nhật một mục trong máy chủ DNS của nhà cung cấp cho một tài khoản. Chương trình này không sử dụng [RFC2136] giao thức DNS Update mô tả trước đó mà thay vào đó là một giao thức tầng ứng dụng riêng biệt

Để sử dụng dịch vụ, một chương trình client DDNS (ví dụ, inadyn hoặc ddclient trên Linux và DynDNS Updater cho Windows) chạy trên hệ thống client, mà cũng có thể là router của người dùng. Thông thường, các chương trình được cấu hình với các thông tin đăng nhập sử dụng để truy cập vào một dịch vụ DDNS từ xa. Khi dịch vụ được gọi, chương trình client liên lạc với server, cung cấp địa chỉ IP toàn cầu hiện nay của máy chủ (một bởi một ISP chỉ định, thường là NAT - ánh xạ địa chỉ), và đi im lặng. Sau đó, nó theo định kỳ đổi mới thông tin với máy chủ. Làm như vậy cho phép các máy chủ để xóa thông tin nếu một bản cập nhật không được nhận trong một khoảng thời gian nhất định. Các dịch vụ này bao gồm những người được cung cấp tại các trang web sau (năm 2011): http://www.dyndns.com/services/dns/dyndns, http://freedns.afraid.org, và http://www.noip.com/services/managed_dns/free_dynamic_dns.html.


<a name="8"></a>
### 8. Transparency and Extensibility

DNS là một trong những dịch vụ phổ biến nhất trên Internet và đã được là dịch vụ hấp dẫn để xem xét làm cơ sở cho việc thêm các tính năng mới thông qua phần mở rộng. Ví dụ, nhiều loại record như TXT, SRV, và thậm chí A (ví dụ, xem [RFC5782]) có thể được sử dụng để mã hóa dữ liệu hữu ích cho các dịch vụ khác nhau trong tương lai. [RFC5507] xem xét các phương pháp khác nhau để mở rộng các DNS, cuối cùng kết luận rằng việc tạo ra và thực hiện các loại RR mới là cách tiếp cận hấp dẫn nhất. Nhờ vào đặc điểm kỹ thuật trước đó [RFC3597], có một phương pháp tiêu chuẩn để xử lý các loại RR không rõ là dữ liệu. Đó là, họ không hiểu trừ khi được công nhận; việc xử lý minh bạch. Điều này cho phép các loại RR mới được mang theo người mà không gây ra tác động tiêu cực về việc xử lý các loại RR tồn tại.

Một sự khó chịu với tính minh bạch là mã hóa các tên miền và nén chúng. Đối với các loại RR được biết, tên miền nhúng cho phép trường hợp của họ thay đổi để đạt được nén với nhãn nén. tên miền chủ sở hữu ( "chìa khóa" của các truy vấn) luôn là chủ đề để nén. Đối với các loại RR không rõ, tuy nhiên, tên miền nhúng không được phép sử dụng nhãn nén. Ngoài ra, các loại RR tương lai có chứa tên miền được nhúng tương tự như vậy bị cấm (xem Phần 4 [RFC3597]). loại Unknown vẫn có thể được so sánh (ví dụ, các bản dynamic updates) trong một thời trang trên bitwise. Điều này ý là bất kỳ tên miền nhúng đều được so sánh trong trường hợp nhạy cảm [RFC4343], trái ngược với hầu hết các hoạt động của DNS khác. Tình trạng này tương tự xuất hiện cho tên miền nhúng được sử dụng với TXT record.

Một vấn đề khác phát sinh liên quan đến tính minh bạch khi các hình thức mới của máy chủ proxy và được giới thiệu là quá trình DNS traffic. Nó bây giờ thực tế khá là phổ biến bao gồm một `DNS proxy colocated` bên trong một `home gateway` hoặc `firewall`. Một proxy điển hình xử lý các yêu cầu DNS đến từ mạng gia đình của người dùng và chuyển các yêu cầu đến một máy chủ ISP cung cấp. Nó cũng nhận được thông tin trả về và có thể hoặc không thể lưu kết quả. Trong lịch sử, một số proxy đã cố gắng làm nhiều hơn là chỉ đơn thuần là chuyển tiếp các request và reply, và điều này đã gây ra một số vấn đề với khả năng tương tác DNS. [RFC5625] quy định các hoạt động chính xác của một DNS proxy, về cơ bản đòi hỏi các DNS RR để được uninterpreted và chỉ đơn thuần là chuyển bằng proxy. Trong trường hợp gói cắt ngắn không thể hủy bỏ, bất kỳ dấu hiệu đó phải thiết lập các trường bit `TC `để chỉ ra rằng một số dữ liệu DNS đã được gỡ bỏ. Hơn nữa, bất kỳ proxy như vậy cần được chuẩn bị sẵn sàng để xử lý yêu cầu TCP, vì đây là cơ chế dự phòng thông thường khi một yêu cầu UDP dựa trên trước đó đã cắt ngắn và được yêu cầu bởi [RFC5966]

<a name="9"></a>
### 9. Translating DNS from IPv4 to IPv6 (DNS64)

Trong Chương 7, chúng ta nói về 1 framework để chuyển các IP datagram qua lại giữa IPv4 và IPv6. Chuyển đổi hỗ trợ khả năng đó đều hình dung được triển khai với một khả năng có liên quan là chuyển đổi giữa DNS A và ghi AAAA [RFC6147], cho phép client IPv6-only truy cập vào thông tin DNS xuất hiện trong một record (ví dụ, trong Internet IPv4). Khả năng được gọi là DNS64, và một trong những kịch bản triển khai đề xuất của nó (gọi là "DNS64 trong DNS chế độ đệ quy trình giải quyết") được minh họa trong hình sau

![](https://github.com/ctnguyenvn/sysadmin_level1/blob/master/Task35_Translation_TC-IP_Illustrated_Vol1_Page_565to573/Image/2.png)

> DNS64 chuyển đổi A record sang AAAA record và làm việc với IPv4/IPv6  cho phép client IPv6-only truy cập vào dịch vụ trong mạng lưói IPv4

Như hình trên, DNS64 được sử dụng kết hợp với một dịch IPv4/IPv6 (xem Chương 7). Mỗi thiết bị được cấu hình với 1 hoặc nhiều hơn 1 tiền tố IPv6 được sử dụng trong việc tạo ra các địa chỉ IPv4-embedded. Mỗi tiền tố (prefix) có thể là một tiền tố Network-Specific (ví dụ, đó thuộc sở hữu của một nhà điều hành) hoặc tiền tố Well-Known (64:ff9b::/96). Các thiết bị DNS64 hoạt động như một máy chủ bộ nhớ đệm DNS. Clients IPv6-only sử dụng nó như là máy chủ DNS primary và có thể yêu cầu AAAA records cho tên miền. DNS64 chuyển yêu cầu đó để yêu cầu cho cả A record và AAA record trong IPv4 của nó. Nếu không có AAAA record trả về, DNS64 cung cấp syn-thetic AAAA record bằng cách hình thành một địa chỉ IPv4-embedded dựa trên các tiền tố cấu hình và nội dung của mỗi A record nó lấy. DNS64 cũng phản hồi PTR query cho bất kỳ IPv6 prefixes nó sử dụng để tổng hợp AAA RR.

Để thực hiện tổng hợp AAA RR trong một thiết bị DNS64, chỉ có phần answer của một thông điệp DNS bị thay đổi một cách hiệu quả. Phần khác vẫn như chúng xuất hiện khi lấy ra ở bên IPv4. Trong trường hợp chuỗi CNAME hoặc DNAME, chuỗi được theo sau đệ quy cho đến khi A hoặc AAAA record được tìm thấy và các yếu tố của chuỗi có trong phản hồi. Ngoài ra, DNS64 có thể được cấu hình để tránh tổng hợp cho riêng loại trừ dãy IPv6 hoặc địa chỉ IPv4. Điều này ngăn cản hành động bất thường nào đó (ví dụ, hình thành các địa chỉ IPv4-embedded dựa trên các địa chỉ IPv4 special-use (đặc dụng)). Lưu ý DNS64 có tương tác đặc biệt với DNSSEC

<a name="10"></a>
### 10. LLMNR and mDNS

Hệ thống DNS thông thường yêu cầu các máy chủ DNS được cấu hình để cung cấp ánh xạ giữa names và addresses và các thông tin có thể khác. Đôi khi điều này là không quá nhiều khi chỉ có một vài local host muốn giao tiếp. Trong trường hợp một máy chủ DNS không có sẵn (ví dụ, một mạng `ad hoc` được hình thành nhanh chóng để kết nối các client trong local), một phiên bản local đặc biệt của DNS gọi là Link-Local Multicast Name Resolution (LLMRR) [RFC4795] có thể có sẵn . Nó là một (không chuẩn) giao thức dựa trên DNS được phát triển bởi Microsoft và được sử dụng trong các môi trường local để giúp khám phá các thiết bị trên một mạng lưới khu vực local, chẳng hạn như máy in và file servers. Nó được hỗ trợ trong Windows Vista, Server 2008, và 7. Nó sử dụng cổng UDP 5355 với IPv4 multicast 224.0.0.252 và IPv6 `ff02::1:3`. Các máy chủ cũng sử dụng giao thức TCP trên cổng 5355 từ bất cứ địa chỉ IP unicast chúng phản hồi.

Multicast DNS (mDNS) [IDMDNS] là một hình thức khác của local DNS phát triển bởi Apple. Khi nó được kết hợp với các giao thức DNS Service Discovery, Apple gọi kết quả là framework Bonjour. mDNS sử dụng thông điệp DNS chuyển qua địa chỉ local multicast. Nó sử dụng UDP với cổng 5353. Nó chỉ rõ rằng các TLD `.local` đặc biệt để được điều chỉnh  với ngữ nghĩa đặc biệt. TLD `.local` là liên kết local trong phạm vi. Bất kỳ truy vấn DNS cho tên miền trong TLD này được gửi đến địa chỉ IPv4 mDNS 224.0.0.251 hoặc địa chỉ IPv6 `ff02::fb`. Truy vấn cho các domain khác với tùy chọn có thể được gửi tới các địa chỉ multicast. Cho phép các máy chủ link-local phản hồi để ánh xạ các tên global có thể làm tăng mối quan tâm bảo mật quan trọng. Để chống lại vấn đề này, DNSSEC có thể được sử dụng (xem Chương 18). mDNS hỗ trợ chuyển đổi chủ động các tên trong `.local `pseudo-TLD, mặc dù pseudo-TLD này chưa được chính thức dành cho mục đích này [RFC2606]. Như vậy, các host trên các mạng nhỏ như mạng LAN có thể được gán tên thuận tiện như `printer.local`, `fileserver.local`, `camera1.local`, `kevinlaptop.local`, và như thế. Một cơ chế trong mDNS được sử dụng để phát hiện và giải quyết xung đột.

<a name="11"></a>
### 11. LDAP

Vì vậy, đến nay chúng ta đã thảo luận về DNS và local name service giống với DNS. Để hỗ trợ các truy vấn phong phú hơn và thao tác dữ liệu, có một dịch vụ thư mục tổng quát hơn, chúng tôi đã đề cập trước đó gọi là LDAP [RFC4510]. LDAP (nay LDAPv3) là một giao thức ứng dụng cho mạng Internet mà cung cấp truy cập đến các thư mục chung (ví dụ, "trang trống") phù hợp với X.500 (1993) [X500] dữ liệu và mô hình dịch vụ. Nó cung cấp khả năng tìm kiếm, sửa đổi, bổ sung, so sánh, và loại bỏ các mục dựa trên mô hình người dùng lựa chọn. Một thư mục LDAP là một cây của thư mục, nơi mà mỗi mục bao gồm một tập các thuộc tính. Như TCP/IP đã trở nên phổ biến hơn, LDAP đã phát triển từ gốc rễ của nó để làm việc cùng với DNS. Ví dụ, một truy vấn về mục thư mục phù hợp với văn phòng của thủ tướng tại MIT có thể được hình thành bằng cách sử dụng công cụ tìm kiếm ldapsearch LDAP (Microsoft có một công cụ so sánh được gọi là LDP có sẵn như là một công cụ hỗ trợ từ trang web của mình), trong đó hoạt động như sau:

```
inux% ldapsearch -x -h ldap.mit.edu -b "dc=mit,dc=edu" \
"(ou=*Chancellor*)"
# extended LDIF
#
# LDAPv3
# base <dc=mit,dc=edu> with scope sub
# filter: (ou=*Chancellor*)
# requesting: ALL
#
.....
```
Các dòng lệnh chỉ ra rằng máy chủ ldap.mit.edu nên được kết nối mà không sử dụng bất kỳ giao thức xác thực đặc biệt (tùy chọn -x). Trong khi một thảo luận đầy đủ của LDAP là vượt quá xa phạm vi của chương này, Kết quả từng phần cho thấy cách thức `dc` (domain component) được sử dụng để liên kết dữ liệu LDAP với DNS. Mỗi thành phần `dc` giữ một DNS lable, và cùng nhau họ có thể được sử dụng để mã hóa một tên miền toàn bộ, được sử dụng như là phần "base" cho truy vấn LDAP. Sử dụng quy ước này, nó không phải là đặc biệt khó khăn để tạo các truy vấn LDAP hợp lệ. Trong trường hợp này, nó là dành cho các đơn vị tổ chức (ou) có chứa từ Chancellor. Lưu ý rằng các wildcard có thể được sử dụng.

Máy chủ LDAP được sử dụng thường xuyên nhất trong các doanh nghiệp để giữ thông tin thư mục như địa điểm, số điện thoại, và đơn vị tổ chức. sản phẩm Active Directory của Microsoft bao gồm khả năng LDAP và được sử dụng rộng rãi để quản lý tài khoản người dùng, dịch vụ, và quyền truy cập vào các doanh nghiệp lớn sử dụng Windows. Một số máy chủ LDAP (như của MIT và của nhiều trường đại học khác) cũng có sẵn thông qua mạng Internet công cộng

<a name="12"></a>
### 12. Attacks on the DNS

DNS là một thành phần quan trọng của Internet và đã trở thành các đối tượng của nhiều cuộc tấn công và biện pháp đối phó trong những năm qua [RFC3833]. Tương đối gần đây, một nỗ lực toàn cầu có tên gọi Security DNS (DNSSEC) đã đạt được tiến bộ đáng kể trong việc thêm xác thực mạnh đến hoạt động DNS. Chúng tôi trì hoãn việc thảo luận chi tiết về cách thức hoạt động để DNSSEC Chương 18, nơi bao gồm các nền tảng mật mã cần thiết. Bây giờ chúng ta khám phá một số các cuộc tấn công đã được tiến hành chống lại các DNS.

Có hai hình thức chủ yếu của các cuộc tấn công chống lại các DNS. Các hình thức đầu tiên liên quan đến một cuộc tấn công DoS do DNS là không hiệu quả vì quá tải các máy chủ quan trọng DNS, chẳng hạn như các máy chủ root  hoặc TLD. Dạng thứ hai làm thay đổi nội dung của resource record hoặc giả dạng như một máy chủ DNS chính thức nhưng phản hồi với resource record không có thật, do đó host connect tới IP không chính xác khi cố gắng kết nối với một máy tính khác (ví dụ, một trang web như một ngân hàng) .

Việc đầu tiên tấn công DoS trên DNS diễn ra vào đầu năm 2001. Các cuộc tấn công liên quan đến việc tạo ra nhiều yêu cầu đối với các MX record của AOL.COM. Những kẻ tấn công tạo ra các DNS requests cho một MX record sử dụng địa chỉ IP nguồn giả mạo. Các requests là một gói tin tương đối nhỏ, trong khi các response là lớn hơn (khoảng một factor của 20), vì vậy kiểu tấn công này được gọi là một cuộc tấn công khuếch đại bởi vì số lượng băng thông tiêu thụ là kết quả của cuộc tấn công, lớn hơn số tiền sử dụng trong việc tạo ra các cuộc tấn công bởi một yếu tố quan trọng. Các responses được hướng vào địa chỉ IP chứa trong gói tin requests, do đó những kẻ tấn công cơ bản có thể gây ra lưu lượng phản hồi để được hướng tới bất cứ nơi nào (s) mà họ muốn. Các cuộc tấn công được ghi nhận chi tiết trong một sự cố CERT lưu ý [CIN].

Một hình thức tấn công liên quan đến sửa đổi các dữ liệu bên trong DNS đã được báo cáo vào cuối năm 2008 [CKB] và bây giờ được biết đến như là Kaminsky Attack. Nó liên quan đến  cache poisoning, nơi mà các nội dung được lưu trữ trong một máy chủ DNS được thay thế bằng dữ liệu sai lệch hoặc giả mạo và cuối cùng là phục vụ cho phân giải tên miền trên máy chủ kết thúc. Trong một biến thể, một kẻ tấn công phản hồi các truy vấn của một máy chủ bộ nhớ đệm cho một A record với một NS record cho các tên miền sử dụng một tên host nào đó. Địa chỉ IP của máy chủ (được lựa chọn bởi những kẻ tấn công) cũng được cung cấp trong phần thông tin bổ sung của các phản hồi DNS. Các tên miền máy chủ có thể có hoặc không chia sẻ tên miền phụ giống như các yêu cầu DNS gốc. Rủi ro chính liên quan đến hình thức tấn công này là các client tin tưởng vào phân giải thích hợp DNS name-to-address có thể được dẫn đến máy chủ giả mạo. Nếu máy chủ đó đang cố tình cấu hình để bắt chước các máy chủ gốc (ví dụ, giả mạo như là máy chủ Web của ngân hàng), người dùng có thể vô tình tin tưởng vào máy chủ giả mạo và tiết lộ thông tin nhạy cảm. kỹ thuật giảm thiểu này và các cuộc tấn công có liên quan khác được cho bởi [RFC5452]. Một cách tiếp cận không được mô tả trong [RFC5452] gọi là DNS-0x20 [D08] liên quan đến việc mã hóa một nonce ở vị trí bit 0x20 của mỗi ký tự trong phần Query Name của một phần questions đó được lặp lại ở các khu vực tương ứng của từng phản hồi. Điều này được thực hiện có thể bởi vì, mặc dù tên miền được so sánh một cách trường insen-nhạy, máy chủ có xu hướng quay trở lại một bản sao chính xác của Query Name khi hình thành responses. Nếu trường hợp của tên chủ sở hữu được cố tình thay đổi trong các truy vấn, một phản hồi không mong muốn sẽ gặp khó khăn trong tái tạo các nonce, và dễ dàng hơn để có thể được xác định (và bỏ qua).

<a name="13"></a>
### 13. Summary

DNS là một phần thiết yếu của Internet, công nghệ DNS được sử dụng rộng rãi trong các mạng tư nhân. Các không gian tên miền DNS là trên toàn thế giới trong phạm vi và được chia thành một hệ thống bắt đầu với tên miền cấp cao (TLD). Tên miền có thể được đại diện trong nhiều ngôn ngữ và các kịch bản sử dụng tên miền quốc tế (IDNs). Ứng dụng sử dụng phân giải liên hệ với một hoặc nhiều máy chủ DNS để thực hiện nhiệm vụ tra cứu với dữ liệu khu vực, chẳng hạn như chuyển đổi một tên máy chủ đến một địa chỉ IP và ngược lại. Requests và response sử dụng một giao thức DNS đặc biệt làm việc với TCP hoặc UDP. Các giao thức cũng làm việc với một trong hai IPv4 hoặc IPv6, hoặc cả hai.

Tất cả các queries và responses đều có định dạng thông điệp cơ bản giống nhau gồm questions, answers, authority information, và additional information.

Resource records được sử dụng để lưu hầu hết các thông tin DNS, và có rất nhiều loại như: địa chỉ, điểm trao đổi email... Trong Internet, hầu hết các thông điệp DNS được thực hiện sử dụng UDP/IPv4 và được giới hạn đến 512 byte chiều dài, nhưng một lựa chọn mở rộng đặc biệt (EDNS0) cung cấp cho các tin nhắn dài hơn và được yêu cầu để hỗ trợ bảo mật DNS (DNSSEC),

DNS hỗ trợ một số tính năng đặc biệt như chuyển vùng và cập nhật linh hoạt

DNS trở thành chủ đề của nhiều cuộc tấn công khác nhau, từ các cuộc tấn công Dó, các cuộc tấn công vào bộ nhớ cache có thể được sử dụng để thay đổi hoạt động của máy chủ. Các kỹ thuật khác nhau đã nảy sinh để chống lại vấn đề này, bao gồm các kỹ thuật mã hóa (được nêu tại Chương 18) và sửa đổi các máy chủ DNS cần ít chấp nhận các phản hồi DNS không mong muốn.