### Name Resolution and the Domain Name System (DNS)

> Tài liệu: Phân giải tên miền và hệ thống tên miền

> Thực hiện:Nguyễn Công Trứ

> Cập nhật:01/12/2016

#### Mục lục

- [5.1 DNS Message Format](#5.1)

	+ [5.1.1 Names and Labels](#5.1.1)

	+ [5.1.2 Data Labels](#5.1.2)

	+ [5.1.3 Compression Labels](#5.1.3)

- [5.2 The DNS Extension Format (EDNS0)](#5.2)

------

<a name="5.1"></a>
#### 5.1 DNS Message Format

- Có 1 chuẩn định dạng thông điệp DNS [RFC6195]. Nó được sử dụng cho tất cả các hoạt động DNS (queries, responses, zone transfers, notifications, và dynamic updates), như minh họa trong hình dưới

	![](https://github.com/ctnguyenvn/sysadmin_level1/blob/master/Task20_Translation_TC-IP_Illustrated_Vol1_Page_520to525/img/1.png)

>	Định dạng thông điệp DNS có header 12-byte cố định. Toàn bộ thông thường được thực hiện trong một datagram UDP/IPv4 và giới hạn 512 byte. DNS UPDATE (DNS với bản cập nhật động) sử dụng tên trường ZOCOUNT, PRCOUNT, UPCOUNT, và ADCOUNT. Một mở rộng định dạng đặc biệt (gọi EDNS0) cho phép tin nhắn được lớn hơn 512 byte, đó là cần thiết cho DNSSEC

- Một thông điệp DNS bắt đầu với header cố định 12-byte gồm bốn phần: questions  (hoặc  queries),  answers,  authority  records, và additional  records. Tất cả, nhưng phần đầu tiên có chứa một hoặc nhiều resource  records ((RRs)) - bản ghi tài nguyên, mà chúng tôi thảo luận chi tiết sau. RRs có thể được lưu trữ, câu hỏi là không.

- Trong header, các trường giao dịch ID được thiết lập bởi các client và được trả về bởi server. Nó cho phép các client phản ứng phù hợp với requests. Thứ hai 16-bit từ bao gồm một số flag và trường con khác. Bắt đầu từ bit bên trái nhất, QR là trường 1 bit: 0 có nghĩa là tin nhắn là query (hay request); 1 có nghĩa là nó là response. Tiếp theo là các mã máy (OpCode), một trường 4-bit. Giá trị bình thường là 0 (một truy vấn chuẩn) cho  requests  và  responses. Các giá trị khác là: 4 (notify - thông báo), và 5 (update - cập nhật). Các giá trị khác (1-3) đều phản đối hoặc không bao giờ nhìn thấy khi hoạt động. Tiếp theo là trường AAbit chỉ ra một câu trả lời "authoritative answer”" (như trái ngược với một câu trả lời cache). TC là một trường 1 bit có nghĩa là "truncated". Với UDP, cờ này được thiết lập có nghĩa là tổng kích thước của các reply vượt quá 512 byte, và chỉ có 512 byte đầu tiên của reply đã được trả lại

- RD là trường bit có nghĩa là "recursion desired" Nó có thể được đặt trong một truy vấn và sau đó được trả lại trong các response. Nó cho máy chủ để thực hiện một truy vấn đệ quy. Nếu bit này không được thiết lập, và các yêu cầu máy chủ tên miền không có quyền trả lời, các máy chủ tên miền yêu cầu trả về một danh sách các máy chủ tên khác để tìm kiếm cho câu trả lời. Tại thời điểm này, các truy vấn tổng thể có thể được tiếp tục liên lạc với danh sách các máy chủ tên miền khác. Điều này được gọi là một truy vấn lặp đi lặp lại. RA là trường 1 bit có nghĩa là "đệ quy có sẵn." Bit này được thiết lập trong các response nếu máy chủ hỗ trợ đệ quy (recursion). Máy chủ root (root server) thường không hỗ trợ đệ quy, do đó buộc các khách hàng để thực hiện các truy vấn lặp đi lặp lại để hoàn thành phân giải tên. Các trường Z, bit này để 0 (chưa sử dụng) nhưng được dành riêng để sử dụng trong tương lai

- Các bit AD được thiết lập là true nếu thông tin được xác thực, và bit CD được thiết lập là true nếu kiểm tra an ninh được vô hiệu hóa. Trường response Code (hoặc RCODE) là một trường 4-bit trả lại code có giá trị có thể được đưa ra trong [DNSPARAM]. Các giá trị thông thường bao gồm 0 (không có lỗi) và 3 (tên lỗi hay "“nonexistent  domain", viết như NXDOMAIN). Một danh sách của 11 mã lỗi đầu tiên được đưa ra trong Bảng sau (giá trị từ 11 đến 15 là không được gán). loại bổ sung được xác định bằng phần mở rộng đặc biệt (xem phần 11.5.2). Tên lỗi chỉ được trả về từ một máy chủ tên miền có quyền nghĩa là tên miền được quy định trong các truy vấn không tồn tại

	![](https://github.com/ctnguyenvn/sysadmin_level1/blob/master/Task20_Translation_TC-IP_Illustrated_Vol1_Page_520to525/img/2.png)

- Bốn trường tiếp theo kích thước 16 bit xác định số lượng các entries trong question, answer, authority, and additional information để hoàn thành thông điệp DNS. Đối với một truy vấn (question), số lượng các question thường 1 và ba giá trị khác là 0. Trong một reply, số lượng các reply là ít nhất 1. Câu hỏi có name, type, and class. (Class hỗ trợ hồ sơ không Internet (non-internet), nhưng chúng ta bỏ qua điều này cho các mục đích của chúng ta. Các loại xác định kiểu của đối tượng đang được tìm kiếm) Tất cả các phần khác chứa zero hay nhiều RR. RR gồm  name, type, and class information, nhưng còn giá trị TTL điều khiển các dữ liệu có thể được lưu trữ trong bao lâu. Chúng ta sẽ thảo luận về các loại RR quan trọng nhất và chi tiết khi chúng ta có một cái nhìn về cách mã hóa tên DNS và chọn giao thức vận chuyển để sử dụng khi mang theo thông điệp DNS.

<a name="5.1.1"></a>
#### 5.1.1 Names and Labels

- Phần chiều dài thay đổi ở cuối của một thông điệp DNS chứa một tập hợp các questions, answers, authority information (tên của máy chủ tên miền có quyền chứa thông tin cho dữ liệu nhất định), và thêm thông tin có thể hữu ích để giảm số lượng các truy vấn cần thiết . Mỗi questions và mỗi RR bắt đầu với một name (tên) (gọi là tên miền hoặc tên sở hữu) mà nó đề cập. Mỗi name bao gồm một chuỗi các labels (nhãn). Có hai loại của các loại labels: data  labels và compression  labels. Data  labels chứa các ký tự tạo thành một labels hiệu; compression  labels hoạt động như con trỏ đến các nhãn khác. compression  labels giúp tiết kiệm không gian trong một thông điệp DNS khi nhiều bản sao của cùng một chuỗi các ký tự có mặt trên nhiều nhãn.

<a name="5.1.2"></a>
#### 5.1.2 Data Labels

- Mỗi nhãn dữ liệu (data label) bắt đầu với một 1-byte xác định số byte theo ngay sau. Tên sẽ được kết thúc với một byte chứa giá trị 0, đó là một nhãn hiệu với chiều dài 0 (nhãn của root). Ví dụ, các mã hóa của tên www.pearson.com sẽ được thể hiện trong hình sau

	![](https://github.com/ctnguyenvn/sysadmin_level1/blob/master/Task20_Translation_TC-IP_Illustrated_Vol1_Page_520to525/img/3.png)

> 	DNS name được mã hóa như là một chuỗi các nhãn. Ví dụ này sẽ mã hoá www.pearson.com, trong đó (kỹ thuật) có 4 nhãn. Sự kết thúc của tên được xác định bởi một nhãn dài 0 của nameless root

- Đối với nhãn dữ liệu (data labels), Chiều dài mỗi nhãn phải nằm trong khoảng 0 đến 63 (ký tự), như các nhãn được giới hạn đến 63 byte. Không đệm được sử dụng cho nhãn, vì vậy tổng chiều dài tên có thể lạ. Mặc dù các nhãn này đôi khi được gọi là nhãn "text", nó có khả năng chứa các giá trị ASCII. Việc sử dụng này, tuy nhiên, nó không phổ biến và không được khuyến khích. Thật vậy, ngay cả những tên miền quốc tế, có thể mã hóa các ký tự Unicode [RFC5890] [RFC5891], sử dụng một cú pháp mã hóa gọi là "punycode" [RFC3492] thể hiện ký tự Unicode bằng cách sử dụng bộ ký tự ASCII. Để được hoàn toàn an toàn, nó được khuyến khích để làm theo các yêu cầu trong [RFC1035], trong đó đề xuất rằng nhãn "bắt đầu với một chữ, kết thúc với một chữ cái hay chữ số, và phía trong chỉ có chữ cái, chữ số và dấu gạch ngang."

<a name="5.1.3"></a>
#### 5.1.3Compression Labels

- Trong nhiều trường hợp, một DNS respons hoàn toàn mang thông tin trong answer, authority, and additional information liên quan đến tên miền tương tự. Nếu nhãn dữ liệu đã được sử dụng, các ký tự tương tự sẽ được lặp đi lặp lại trong thông điệp DNS khi đề cập đến cùng tên. Để tránh dư thừa này và tiết kiệm không gian, một chương trình nén được sử dụng. Bất kỳ chỗ nào phần nhãn của một tên miền có thể xảy ra, trước đó đếm byte duy nhất (thường là giữa 0 và 63) thay vì có 2 bit bậc cao của nó bật lên, và các bit còn lại được kết hợp với các bit trong các byte tiếp theo để tạo thành một con trỏ 14-bit (offset) trong thông điệp DNS. Việc bù cho số lượng các byte từ đầu của thông điệp DNS nơi một nhãn dữ liệu (được gọi là compression target) được tìm thấy rằng cần phải được thay thế cho nhãn nén. Nhãn nén do đó có thể trỏ đến một địa điểm lên đến 16, 383 byte từ đầu. Hình sau minh họa cách chúng ta có thể mã hóa các tên miền usc.edu và ucla.edu sử dụng nhãn nén.

	![](https://github.com/ctnguyenvn/sysadmin_level1/blob/master/Task20_Translation_TC-IP_Illustrated_Vol1_Page_520to525/img/4.png)

> 	Một nhãn nén (compression label) có thể liên hệ các nhãn khác để tiết kiệm không gian. Điều này được thực hiện bằng cách thiết lập 2 bit bậc cao của byte trước nội dung nhãn. Điều này báo hiệu rằng 14 bit sau được sử dụng trong việc bù cho các nhãn thay thế. Trong ví dụ này, usc.edu và ucla.edu chia sẻ nhãn edu.

- Trong hình trên, chúng ta xem như thế nào nhãn `edu` thường có thể được chia sẻ bởi hai tên miền. Giả sử các tên bắt đầu tại offset 0, nhãn dữ liệu được sử dụng để mã hóa `usc.edu` như mô tả trước đây. Các tên tiếp theo là `ucla.edu`, và nhãn `UCLA` được mã hóa bằng một nhãn dữ liệu. Tuy nhiên, nhãn `edu` có thể được tái sử dụng từ mã hóa của `usc.edu`. Điều này được thực hiện bằng cách thiết lập 2 bit bậc cao của các loại nhãn byte 1 và mã hóa các offset của `edu` trong 14 bit còn lại. Bởi vì sự xuất hiện đầu tiên của `edu` là tại offset 4, chúng ta chỉ cần đặt các byte đầu tiên đến 192 (6 bit 0) và byte kế tiếp 4. Các ví dụ trong hình trên cho thấy một khoản tiết kiệm chỉ 4 byte, nhưng rõ ràng cách nén của nhãn phổ biến lớn hơn có thể dẫn đến tiết kiệm đáng kể hơn

<a name="5.12"></a>
#### 5.1 The DNS Extension Format (EDNS0)

- Định dạng thông điệp DNS cơ bản mô tả cho đến nay có thể được hạn chế trong một số cách. Nó có các trường chiều dài cố định, tổng giới hạn chiều dài 512 byte khi được sử dụng với UDP (không bao gồm UDP hoặc IP header), và không gian hạn chế (4-bit trường RCODE) để chỉ ra các loại lỗi. Một cơ chế mở rộng gọi là EDNS0 (bởi vì có thể mở rộng trong tương lai xa hơn các chỉ số 0) được quy định trong [RFC2671]. Nó không phải là phổ biến hiện nay, nhưng nó cần thiết để hỗ trợ vấn đề bảo mật DNS, vì vậy nó dần được phát triển rộng rãi hơn theo thời gian.

- EDNS0 chỉ định loại RR (gọi là một lựa CHỌN pseudo-RR hoặc meta-RR) được thêm vào phần bổ sung dữ liệu yêu cầu hay response   để chỉ sử dụng EDNS0. Nhất một bản ghi như vậy có thể có mặt ở bất kỳ trong thông điệp DNS. Chúng ta sẽ thảo luận về các định dạng đặc biệt của một định dạng OPT pseudo-RR khi chúng ta thảo luận các loại RR sau. Bây giờ, điều quan trọng cần lưu ý là nếu thông điệp UDP DNS  bao gồm một OPT RR, nó được phép vượt quá giới hạn chiều dài 512 byte và có thể chứa một tập mở rộng các mã lỗi.

- EDNS0 cũng định nghĩa một loại nhãn mở rộng (vượt ra ngoài các nhãn dữ liệu và nhãn nén đã đề cập phía trên). Nhãn mở rộng có 2 bit đầu tiên của labelsType/Length) byte đặt 01, tương ứng với các giá trị giữa 64 và 127. Một chương trình ghi nhãn nhị phân thực nghiệm (type 65) được sử dụng một thời gian nhưng bây giờ không được khuyến khích. Giá trị 127 là dành cho sử dụng trong tương lai, và các giá trị trên 127 là unallocated.