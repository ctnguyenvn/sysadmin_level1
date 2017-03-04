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

![](https://github.com/hellsins/sysadmin_level1/blob/master/Task35_Translation_TC-IP_Illustrated_Vol1_Page_565to573/Image/1.png)

> Trong một cấu trúc liên kết doanh nghiệp nhỏ, DNS có thể được cấu hình để  trả lại địa chỉ khác nhau tùy thuộc vào địa chỉ IP yêu cầu

Một máy chủ có nhu cầu liên hệ với M thực hiện tra cứu DNS trả về hai địa chỉ (một liên kết với các mạng nội bộ và một với DMZ). Đương nhiên, nó sẽ hiệu quả hơn nếu A, B, và R nối M qua DMZ và C nối M thông qua mạng nội bộ. Điều này thường xảy ra nếu DNS trả về record của nó dựa trên địa chỉ IP nguồn của request. (Nó cũng có thể sử dụng địa chỉ IP đích, đặc biệt là nếu M sử dụng nhiều địa chỉ IP từ mạng con khác nhau trên cùng một mạng.) Nếu hệ thống yêu cầu sử dụng một địa chỉ IP nguồn với tiền tố mạng tương tự như nguồn của một record trả về, các máy chủ DNS đặt các record phù hợp vào đầu trong thông điệp trả về. Điều này khuyến khích các client để tìm ra địa chỉ IP "gần nhất" cho một server cụ thể mà nó đang cố gắng liên lạc, bởi vì hầu hết các ứng dụng đơn giản cố gắng liên hệ với địa chỉ đầu tiên tìm thấy trong số các record address trả lại. Các hành động chính xác thường có thể được kiểm soát bằng cách sử dụng cái gọi là `sortlist` hoặc `rrset-order` chỉ thị (tùy chọn sử dụng trong các tập tin cấu hình cho phân giải và máy chủ). Hành động phân loại như vậy cũng có thể xảy ra tự động nếu được thực hiện bởi phần mềm máy chủ DNS mặc định.

Một tình huống liên quan phát sinh khi một dịch vụ được cung cấp sử dụng nhiều hơn một máy chủ như vậy mà kết nối đến là ` load-balanced` (cân bằng tải - tức là, phân chia giữa các máy chủ). Trong ví dụ trước, hãy tưởng tượng rằng một dịch vụ được cung cấp trên cả A và B. Một dịch vụ như vậy có thể được xác định bởi các URL `http://www.example.com`. Client (như R) yêu cầu thực hiện một truy vấn DNS trên tên miền`www.example.com`, và các máy chủ DNS cuối cùng trả về một tập hợp các address record. Để đạt được cân bằng tải, các máy chủ DNS có thể được cấu hình để sử dụng `DNS round-robin`, có nghĩa là các máy chủ hoán đổi thứ tự của các address record  được trả về. Làm như vậy khuyến khích mỗi client mới để truy cập các dịch vụ trên một máy chủ khác nhau từ các client trước đó. Trong khi điều này sẽ giúp cân bằng tải, nó là hoàn hảo. Khi các record được lưu trữ, hiệu quả mong muốn có thể xảy ra vì tái sử dụng các address record lưu trữ hiện có. Ngoài ra, kế hoạch này có thể cân bằng giữa số lượng kết nối tốt trên các máy chủ, nhưng không load. Các kết nối khác nhau có thể có yêu cầu hoàn toàn khác nhau, vì vậy việc xử lý `tải` (load) đúng cũng có khả năng vẫn không cân bằng trừ khi các dịch vụ cụ thể luôn có yêu cầu xử lý tương tự.

Một xem xét cuối cùng liên quan đến dữ liệu trả về bởi một máy chủ DNS là hỗ trợ cho sự riêng tư. Trong ví dụ này, chúng ta có thể muốn sắp xếp cho các máy trong doanh nghiệp để có thể lấy resource records cho mỗi máy tính trong mạng, trong khi chúng ta giới hạn các thiết lập của hệ thống còn hiển thị với R. Một kỹ thuật cho việc thực hiện mục tiêu này được gọi là `split DNS`. Trong `split DNS`, tập các resource records trả lại để đáp ứng với một truy vấn phụ thuộc vào sự nhận dạng của client và có thể truy vấn địa chỉ đích. Thông thường, client được xác định bởi địa chỉ IP hoặc tiền tố địa chỉ. Với `split DNS`, chúng ta có thể sắp xếp cho bất cứ máy trong doanh nghiệp (ví dụ, những người chia sẻ một tập hợp các tiền tố) để được cung cấp toàn bộ cơ sở dữ liệu DNS, trong khi những người bên ngoài chỉ được cho vào A và B, nơi mà các dịch vụ Web chính là cung cấp

<a name="7"></a>
### 7. Open DNS Servers and DynDNS

Nhiều gia đình người dùng đều được gán một địa chỉ IPv4 duy nhất bởi ISP của họ, và địa chỉ này có thể thay đổi theo thời gian như của người sử dụng máy tính hoặc họ kết nối, ngắt kết nối, và kết nối lại với Internet. Do đó, nó thường rất khó khăn cho người sử dụng để thiết lập DNS cho phép các dịch vụ mà có thể nhìn thấy từ Internet. Một số cái gọi là Dynamic DNS (DDNS) các máy chủ mở có sẵn, có hỗ trợ một giao thức cập nhật đặc biệt gọi là DNS Update API [DynDNS], theo đó người dùng có thể cập nhật một mục trong máy chủ DNS của nhà cung cấp cho một tài khoản. Chương trình này không sử dụng [RFC2136] giao thức DNS Update mô tả trước đó mà thay vào đó là một giao thức tầng ứng dụng riêng biệt

Để sử dụng dịch vụ, một chương trình client DDNS (ví dụ, inadyn hoặc ddclient trên Linux và DynDNS Updater cho Windows) chạy trên hệ thống client, mà cũng có thể là router của người dùng. Thông thường, các chương trình được cấu hình với các thông tin đăng nhập sử dụng để truy cập vào một dịch vụ DDNS từ xa. Khi dịch vụ được gọi, chương trình client liên lạc với server, cung cấp địa chỉ IP toàn cầu hiện nay của máy chủ (một bởi một ISP chỉ định, thường là NAT - ánh xạ địa chỉ), và đi im lặng. Sau đó, nó theo định kỳ đổi mới thông tin với máy chủ. Làm như vậy cho phép các máy chủ để xóa thông tin nếu một bản cập nhật không được nhận trong một khoảng thời gian nhất định. Các dịch vụ này bao gồm những người được cung cấp tại các trang web sau (năm 2011): http://www.dyndns.com/services/dns/dyndns, http://freedns.afraid.org, và http: //www.noip.com/services/managed_dns/free_dynamic_dns.html.


<a name="8"></a>
### 8. Transparency and Extensibility

DNS là một trong những dịch vụ phổ biến nhất trên Internet và đã được là dịch vụ hấp dẫn để xem xét làm cơ sở cho việc thêm các tính năng mới thông qua phần mở rộng. Ví dụ, nhiều loại record như TXT, SRV, và thậm chí A (ví dụ, xem [RFC5782]) có thể được sử dụng để mã hóa dữ liệu hữu ích cho các dịch vụ khác nhau trong tương lai. [RFC5507] xem xét các phương pháp khác nhau để mở rộng các DNS, cuối cùng kết luận rằng việc tạo ra và thực hiện các loại RR mới là cách tiếp cận hấp dẫn nhất. Nhờ vào đặc điểm kỹ thuật trước đó [RFC3597], có một phương pháp tiêu chuẩn để xử lý các loại RR không rõ là dữ liệu. Đó là, họ không hiểu trừ khi được công nhận; việc xử lý minh bạch. Điều này cho phép các loại RR mới được mang theo người mà không gây ra tác động tiêu cực về việc xử lý các loại RR tồn tại.

Một sự khó chịu với tính minh bạch là mã hóa các tên miền và nén chúng. Đối với các loại RR được biết, tên miền nhúng cho phép trường hợp của họ thay đổi để đạt được nén với nhãn nén. tên miền chủ sở hữu ( "chìa khóa" của các truy vấn) luôn là chủ đề để nén. Đối với các loại RR không rõ, tuy nhiên, tên miền nhúng không được phép sử dụng nhãn nén. Ngoài ra, các loại RR tương lai có chứa tên miền được nhúng tương tự như vậy bị cấm (xem Phần 4 [RFC3597]). loại Unknown vẫn có thể được so sánh (ví dụ, các bản dynamic updates) trong một thời trang trên bitwise. Điều này ý là bất kỳ tên miền nhúng đều được so sánh trong trường hợp nhạy cảm [RFC4343], trái ngược với hầu hết các hoạt động của DNS khác. Tình trạng này tương tự xuất hiện cho tên miền nhúng được sử dụng với TXT record.

Một vấn đề khác phát sinh liên quan đến tính minh bạch khi các hình thức mới của máy chủ proxy và được giới thiệu là quá trình DNS traffic. Nó bây giờ thực tế khá là phổ biến bao gồm một `DNS proxy colocated` bên trong một `home gateway` hoặc `firewall`. Một proxy điển hình xử lý các yêu cầu DNS đến từ mạng gia đình của người dùng và chuyển các yêu cầu đến một máy chủ ISP cung cấp. Nó cũng nhận được thông tin trả về và có thể hoặc không thể lưu kết quả. Trong lịch sử, một số proxy đã cố gắng làm nhiều hơn là chỉ đơn thuần là chuyển tiếp các request và reply, và điều này đã gây ra một số vấn đề với khả năng tương tác DNS. [RFC5625] quy định các hoạt động chính xác của một DNS proxy, về cơ bản đòi hỏi các DNS RR để được uninterpreted và chỉ đơn thuần là chuyển bằng proxy. Trong trường hợp gói cắt ngắn không thể hủy bỏ, bất kỳ dấu hiệu đó phải thiết lập các trường bit `TC `để chỉ ra rằng một số dữ liệu DNS đã được gỡ bỏ. Hơn nữa, bất kỳ proxy như vậy cần được chuẩn bị sẵn sàng để xử lý yêu cầu TCP, vì đây là cơ chế dự phòng thông thường khi một yêu cầu UDP dựa trên trước đó đã cắt ngắn và được yêu cầu bởi [RFC5966]

<a name="9"></a>
### 9. Translating DNS from IPv4 to IPv6 (DNS64)

<a name="10"></a>
### 10. LLMNR and mDNS

<a name="11"></a>
### 11. LDAP

<a name="12"></a>
### 12. Attacks on the DNS

<a name="13"></a>
### 13. Summary

