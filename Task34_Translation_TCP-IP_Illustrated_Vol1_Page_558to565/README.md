### Name Resolution and the Domain Name System (DNS)

> Tài liệu: Phân giải tên miền và hệ thống tên miền

> Thực hiện: Nguyễn Công Trứ

> Cập nhật: 02/03/2017

#### Mục lục

[5.8 Zone Transfers and DNS NOTIFY](#5.8)

- [5.8.1 Full Zone Transfers (AXFR Messages)](#5.8.1)

- [5.8.2 Incremental Zone Transfers (IXFR Messages)](#5.8.2)

- [5.8.3 DNS NOTIFY](#5.8.3)

***

<a name="5.8"></a>
### 5.8 Zone Transfers and DNS NOTIFY

Một zone transfer được sử dụng để sao chép 1 thiết lập của RR cho một zone từ một server khác (thông thường từ các master server đến slave server). Mục đích của việc làm như vậy là giữ cho nhiều server đồng bộ liên quan đến nội dung của một zone. Nhiều server cung cấp khả năng phục hồi thất bại, trong trường hợp một server nên tắt. Hiệu suất cũng có thể được cải thiện khi nhiều server có thể được sử dụng để chia sẻ công việc xử lý cho các query đến. Cuối cùng, độ trễ của một DNS query/reponse có thể được giảm bớt nếu các server được đặt tại các địa điểm gần với khách hàng (ví dụ, nơi mà độ trễ mạng giữa resolver và server là nhỏ).

Theo quy định ban đầu, zone transfers được khởi xướng sau khi `polling`, nơi slave liên hệ master để xem nếu chuyển vùng có cần thiết bằng cách so sánh số version của zone. Một phương thức sau nói nếu zone transfer cần sử dụng một cơ chế cập nhật không đồng bộ khi các nội dung zone thay đổi. Phương thức này được gọi là `DNS NOTIFY`. Khi chuyển vùng được bắt đầu, hoặc là toàn bộ zone được chuyển giao (sử dụng thông điệp DNS AXFR) [RFC5936], hay một tùy chọn `incremental zone transfer` có thể được sử dụng (sử dụng thông điệp DNS IXFR) [RFC1995]. Đề án nói chung hoạt động theo hình minh họa sau

![](https://github.com/ctnguyenvn/sysadmin_level1/blob/master/Task34_Translation_TCP-IP_Illustrated_Vol1_Page_558to565/Image/1.png)

> Một DNS zone transfer copy các nội dung của zone giữa các server. Một thông báo tùy chọn có thể gây ra một slave để request tất cả hoặc tăng zone transfer

Bây giờ chúng ta sẽ có một cái nhìn sâu hơn về các tùy chọn, bao gồm chuyển vùng hoàn toàn và gia tăng, cộng với Thông báo DNS

<a name="5.8.1"></a>
#### 5.8.1 Full Zone Transfers (AXFR Messages)

chuyển vùng hoàn toàn được điều khiển bởi các thông số chuyển vùng thực trong zone SOA record: primary name server, serial number, và refresh, retry, và  expire intervals (thời gian hết hạn). Khi cấu hình, một slave server cố gắng liên lạc với primary server để xem nếu chuyển vùng cần thiết. Liên hệ cố gắng định kỳ, theo các khoảng thời gian refresh. Chúng cũng cố gắng khi một máy chủ đầu tiên bắt đầu. Nếu một số liên lạc không thành công (không có phản hồi từ máy chủ), chúng sẽ cố gắn thử lại với thời gian định kỳ thử lại (thường ngắn hơn so với khoảng thời gian refresh). Toàn bộ nội dung zone bị ngập (flushed) nếu không được làm mới trong khoảng thời gian hết hạn, hiệu quả mất khả năng máy chủ cho khu vực.

Tất cả Zone Transfer (AXFR) thông điệp DNS (một truy vấn tiêu chuẩn có chứa type AXFR trong phần Question) được sử dụng để yêu cầu chuyển vùng hoàn chỉnh sử dụng TCP. Để xem một thông điệp như vậy, chúng tôi có thể sắp xếp cho một yêu cầu được bắt đầu sử dụng chương trình máy chủ trong mạng nội bộ của chúng tôi

```sh
Linux% host -l home.
Using domain server:
Name: 10.0.0.1
Address: 10.0.0.1#53
Aliases:

home name server gw.home.
ap.home has address 10.0.0.6
gw.home has address 10.0.0.1
...
```
Option -l cho phép lệnh (chương trình) `host` thực hiện chuyển vùng hoàn toàn từ một máy chủ DNS local. Chương trình khởi tạo một cuộc đối thoại query/response dựa trên TCP, minh họa trong hình sau

![](https://github.com/ctnguyenvn/sysadmin_level1/blob/master/Task34_Translation_TCP-IP_Illustrated_Vol1_Page_558to565/Image/2.png)

> Một DNS request cho chuyển vùng hoàn toàn sử dụng các loại  Ả record và TCP là một giao thức truyền tải.

Trong hình trên, chúng tôi có thể thấy cách chuyển vùng thực hiện sử dụng TCP. Ba segment TCP đầu tiên là một phần của quá trình thiết lập kết nối TCP chuẩn. Gói thứ tư (giải mã) là gói tin request. Nó là một tiêu chuẩn DNS bình thường, với type AXFR và class IN (Internet). Các truy vấn dành cho các tên miền `home`. Các reponse đến truy vấn này được chứa trong thông điệp 6, sau TCP ACK như hình sau

![](https://github.com/ctnguyenvn/sysadmin_level1/blob/master/Task34_Translation_TCP-IP_Illustrated_Vol1_Page_558to565/Image/3.png)

> Các reponse thành công cho một request chuyển giao khu vực đầy đủ bao gồm tất cả các record cho zone. Các giao dịch thực hiện sử dụng TCP, như nội dung zone có thể lớn và một bản sao đáng tin cậy là cần thiết.

Trong hình trên, chúng tôi có thể thấy toàn bộ khu vực được thực hiện trong các reponse. Sau khi nhận được reponse, dữ liệu TCP ACK của khách hàng và khởi tạo một TCP kết nối đóng. Các kết nối đóng bằng bằng cách bắt tay FIN-ACK (gói 8-10). Xem Chương 13 để biết thêm chi tiết về các thiết lập kết nối TCP chuẩn và bù trừ.

Mặc dù nó được sử dụng để có thể thực hiện chuyển vùng với hầu hết các DNS server, giờ đây họ thường bị hạn chế đến các máy chủ có thẩm quyền (authoritative servers) trong một zone(ví dụ, những người được liệt kê trong NS record cho các khu vực). Lý do cho sự hạn chế này là sự riêng tư và hiểu biết về bảo mật của các host trong zone có thể giúp kẻ tấn công nắm được mục tiêu dịch vụ hoặc máy chủ cụ thể

<a name="5.8.2"></a>
#### 5.8.2 Incremental Zone Transfers (IXFR Messages)

Để nâng cao hiệu quả chuyển vùng, [RFC1995] định nghĩa việc sử dụng di chuyển vùng `incremental` (gia tăng). Sử dụng di chuyển vùng gia tăng và các type IXFR message, chỉ có những thay đổi trong một khu vực được cung cấp. Để thực hiện chuyển 1 zone incremental , client (ví dụ, slave server) phải cung cấp số serial hiện tại của nó đối với zone. Trong ví dụ sau đây, chúng ta có thể mô phỏng một máy chủ yêu cầu bằng cách cung cấp các số nối tiếp và sử dụng chương trình `dig`:

```sh
Linux% dig +short @10.0.0.1 -t ixfr=1997022700 home.
gw.home. hostmaster.gw.home. 1997022700 10800 15 604800 10800
```
Các dòng lệnh chỉ đầu ra từ lệnh nên ngắn gọn, 10.0.0.1 là địa chỉ của máy chủ DNS để sử dụng, và một chuyển vùng gia tăng bắt đầu nối tiếp với số 1997022700 nên được thực hiện. Ví dụ này tạo một cuộc trao đổi tương tự như minh họa trong 2 hình trên cho AXFR, ngoại trừ trong trường hợp này số serial của các yêu cầu phù hợp với số serial hiện tại như hình sau

![](https://github.com/ctnguyenvn/sysadmin_level1/blob/master/Task34_Translation_TCP-IP_Illustrated_Vol1_Page_558to565/Image/4.png)

> Một yêu cầu chuyển vùng gia tăng (IXFR loại bản ghi) mang trên TCP. Các number được sử dụng để xác định record, nếu có, đã thay đổi từ một chuyển vùng trước đó đã diễn ra.

Hình dưới cho thấy cách request IXFR bao gồm một RR SOA trống trong phần authority (thẩm quyền). Các SOA record bao gồm số serial xác định (1997022700). Các reponse (gói 6) không chứa thông tin thực tế vì số này phù hợp với số hiện tại ở máy chủ

![](https://github.com/ctnguyenvn/sysadmin_level1/blob/master/Task34_Translation_TCP-IP_Illustrated_Vol1_Page_558to565/Image/5.png)

> Việc giải quyết một Ỉ request khi số serial là hiện tại chỉ chứa một SOA record và không có additional information

Reponse trong hình trên chỉ chứa RR SOA trong phần answer. Không giống như nội dung chứa trong các truy vấn, điều này được điền vào với các trường SOA đầy đủ (ví dụ, mailbox, các thông số chuyển vùng). Tuy nhiên, không có `additional answers` vì các số serial hiện tại cho vùng khớp với yêu cầu. Do đó, client yêu cầu được giả định là up-to-date và không cần bất kỳ thông tin bổ sung (additional) hoặc chuyển vùng.

<a name="5.8.3"></a>
#### 5.8.3 DNS NOTIFY

Như đã đề cập trước đó, `polling` trước kia được sử dụng để xác định sự cần thiết khi phải chuyển vùng, có nghĩa là các máy chủ slave sẽ kiểm tra với một máy chủ master (xác định "làm mới" khoảng thời gian) để xem nếu zone đã được cập nhật (chỉ ra bởi một số serial khác nhau), trong trường hợp chuyển vùng sẽ được bắt đầu. Đây là một quá trình hơi lãng phí, vì nhiều cuộc thăm dò vô dụng có thể xảy ra trước khi các zone được cập nhật. Để cải thiện tình hình, [RFC1996] đã phát triển cơ chế DNS NOTIFY. DNS NOTIFY cho phép một máy chủ với nội dung sửa đổi zone để thông báo cho các máy chủ slave một bản cập nhật đã được thực hiện và chuyển giao khu vực được bắt đầu. Cụ thể hơn, nếu được kích hoạt, một tin nhắn thông báo được gửi để thiết lập các máy chủ liên quan nếu RR SOA cho zone thay đổi (ví dụ, nếu số serial  tăng nối tiếp). Điều này cho phép chuyển vùng được bắt đầu dễ dàng khi cần thiết. Sử dụng một tên miền local (home), chúng ta có thể thấy cách làm việc này như hình sau

![](https://github.com/ctnguyenvn/sysadmin_level1/blob/master/Task34_Translation_TCP-IP_Illustrated_Vol1_Page_558to565/Image/6.png)

> Một DNS NOTIFY chỉ ra một bản cập nhật đến các zone file. Có hai phần truyền lại cách nhau 15 giây ngoài (trái với phương pháp đề nghị chuẩn).

Ví dụ này minh họa thông điệp DNS NOTIFY đơn giản gửi đến một máy chủ trong các notify set máy chủ cần được thông báo về một sự thay đổi khu vực. Thông điệp này là một thông điệp truy vấn DNS UDP/IPv4 với trường Flag cho thấy một thông báo việc thay đổi zone. Phần truy vấn có chứa các type và class cho một SOA record, và phần answer chứa RR SOA hiện tại cho zone (với TTL 0), bao gồm cả số serial. Điều này cung cấp đầy đủ thông tin cho một máy chủ thông báo để xác định rằng chuyển vùng nếu cần thiết. Lưu ý rằng một máy chủ duy nhất có thể nhận được thông báo từ nhiều máy chủ khác khi họ cập nhật thông tin zone của mình. Điều này không trình bày một vấn đề đối với hoạt động của giao thức

DNS NOTIFY mặc định cơ chế sử dụng UDP, một giao thức không đáng tin cậy. Trong ví dụ này, các thông báo thiết lập chỉ chứa địa chỉ 10.0.0.11, không thể chạy một máy chủ DNS. Do đó, thông điệp resent mỗi 15s hy vọng cho một response mà không bao giờ đến.

> Note 

> Thời gian giữa truyền lại và tổng số truyền lại đến cố gắng được đề xuất bởi [RFC1996] là 60s và năm lần truyền lại, tương ứng. Nó cũng cho thấy rằng một phương pháp đếm thời gian backoff (thêm vào hay lũy thừa) được sử dụng. Ở đây chúng ta có thể thấy rằng việc thực hiện BIND9 thất bại trong lời đề nghị, như là hai lần truyền lại là 15s.

Responses chỉ đơn giản là thông điệp DNS reponse không có thông tin hữu ích trừ ID giao dịch, chúng chỉ được sử dụng để hoàn thành các giao thức và hủy truyền lại tại máy chủ gửi