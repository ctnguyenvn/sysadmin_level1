### Name Resolution and the Domain Name System (DNS)

> Tài liệu: Phân giải tên miền và hệ thống tên miền

> Thực hiện: Nguyễn Công Trứ

> Cập nhật: 03/12/2016

#### Mục lục

- [5 The DNS Protocol](#5)

- [5.3 UDP or TCP](#5.3)

- [5.4 Question (Query) and Zone Section Format](#5.4)

- [5.5 Answer, Authority, and Additional Information Section Formats](#5.5)

- [5.6 Resource Record Types](#5.6)

---

<a name="5"></a>
#### 5 The DNS Protocol

<a name="5.3"></a>
#### 5.3 UDP or TCP

- Chúng ta đã biết DNS sử dụng port 53, cho cả UDP và TCP. Định dạng phổ biến nhất sử dụng cấu trúc gói UDP/IPv4 như hình sau

	![](https://github.com/hellsins/sysadmin_level1/blob/master/Task21_Translation_TC-IP_Illustrated_Vol1_Page_525to529/img/1.png)

> 	Thông điệp DNS thường được đóng trong 1 gói tin UDP/IPv4 và được giới hạn tối đa 152 byte trừ khi TCP hay EDNS0 được sử dụng. Mỗi phần (trừ phần question) chứa tập hợp các bản ghi

- Khi xử lý 1 truy vấn và trả lại với bit trường TC thiết lập là `truncated`, kích thước của response vượt quá 512 byte, vì vậy chỉ 512 byte đầu được gửi về bởi server. Để giải quyết vấn đề này có thể gửi lại request, sử dụng TCP - dạng gói tin được hỗ trợ trong RFC 5966. Dạng này chấp nhận gói tin nhiều hơn 512 byte khi trả về bởi vì TCP tách gói tin ra nhiều đoạn

- Khi một tên máy chủ thứ cấp ( secondary  name  server ) cho một khu vực (zone) khởi động, nó thường thực hiện zone transfer (chuyển vùng) từ các máy chủ tên miền chính cho khu vực. Chuyển vùng cũng có thể được bắt đầu bởi một bộ đếm thời gian hoặc là kết quả của một thông điệp DNS NOTIFY. Chuyển toàn vùng (full zone transfer) sử dụng TCP như họ có thể chuyển nhiều. Incremental zone transfers, chỉ có khi cập nhật mới được transfer, có thể sử dụng UDP lúc đầu tiên nhưng chuyển sang TCP nếu response quá lớn, giống như một truy vấn thông thường

- Khi UDP được sử dụng, cả xử lý và các phần mềm ứng dụng máy chủ phải thực hiện chờ và truyền lại. Một đề nghị  được đưa ra trong RFC1536. Nó bắt đầu với một thời gian chờ ít nhất là 4s, và timeout tiếp theo dẫn đến tăng theo cấp số nhân của thời gian chờ. Linux và UNIX  cho phép thay đổi thời gian chờ trả lời bằng cách thay đổi các nội dung của tập tin /etc/resolv.conf (bằng cách thiết lập các tùy chọn timeout và attempts)

<a name="5.4"></a>
#### 5.4 Question (Query) and Zone Section Format

- Các question hoặc query của một thông điệp DNS liệt kê các question đang được tham chiếu. Định dạng của mỗi question trong phần question được thể hiện trong hình dưới. Thường chỉ có một, mặc dù các giao thức có thể hỗ trợ nhiều hơn. Các cấu trúc tương tự cũng được sử dụng cho phần zone trong bản cập nhật động, nhưng với tên gọi khác nhau.

	![](https://github.com/hellsins/sysadmin_level1/blob/master/Task21_Translation_TC-IP_Illustrated_Vol1_Page_525to529/img/2.png)

> 	Mỗi phần query (hoặc question) của thông điệp DNS không chứa TTL bởi vì nó không được lưu trữ

- Query name là tên miền được tìm kiếm, bằng cách sử dụng mã hóa cho các `Lables` chúng ta đã mô tả trước đây. Mỗi question có một Query Type và Query Class. Các giá trị lớp là 1, 254, hoặc 255, cho thấy Internet class, không có class, hoặc tất cả các class, tương ứng, cho tất cả các trường hợp mà chúng ta quan tâm đến (các giá trị khác không thường được sử dụng cho các mạng TCP / IP). Các trường Query Type giữ một giá trị chỉ ra loại query được thực hiện bằng cách sử dụng các giá trị trong [Bảng này](https://github.com/hellsins/sysadmin_level1/blob/master/Task20_Translation_TC-IP_Illustrated_Vol1_Page_520to525/img/2.png). Các loại query phổ biến nhất là A (hoặc AAAA nếu phân giải DNS IPv6 được kích hoạt), có nghĩa là một địa chỉ IP là cần thiết cho các query name. Nó cũng có thể tạo ra một truy vấn kiểu bất kỳ, trả về tất cả RR của bất kỳ loại trong cùng một lớp phù hợp với query name.

<a name="5.5"></a>
#### 5.5 Answer, Authority, and Additional Information Section Formats

- Ba phần cuối trong thông điệp DNS, Answer, Authority, and Additional Information, chứa thiết RR. RR trong các phần có thể, đối với hầu hết các phần, có tên miền `wildcard` (ký tự đại diện) như sở hữu tên. Đây là những tên miền trong đó đánh dấu nhãn data lables chỉ chứa các kí tự dấu `*` [RFC4592] xuất hiện đầu tiên (tức là, ngoài cùng bên trái). Mỗi bản ghi tài nguyên có hình thức thể hiện trong hình sau

	![](https://github.com/hellsins/sysadmin_level1/blob/master/Task21_Translation_TC-IP_Illustrated_Vol1_Page_525to529/img/3.png)

> 	Định dạng của một DNS resource record. Đối với DNS trên Internet, trường class luôn luôn có giá trị 1. Các trường TTL cho giá trị tối đa thời gian RR có thể được lưu trữ (tính bằng giây)  

- Các trường `Name` (đôi khi được gọi là "owning name", "owner", hoặc "record owner’s  name) là tên miền mà các dữ liệu tài nguyên tương ứng. Đó là giống các định dạng tương tự như chúng ta đã mô tả trước đó để ghi tên và lables. Trường `type` xác định một trong những loại mã RR. Đây giống như giá trị kiểu truy vấn chúng ta đã mô tả trước đó. Trường class 1 cho dữ liệu Internet. Các trường TTL là số giây mà RR có thể được cached. Trường `Resource Data Length` (RDLENGTH)  xác định số byte chứa trong trường dữ liệu tài nguyên (RDATA). Các định dạng của dữ liệu này phụ thuộc vào type. Ví dụ, một record (loại 1) có một địa chỉ IPv4 32-bit trong vùng RDATA.

- [RFC2181] định nghĩa thuật ngữ Resource Record Set (RRSet) là một tập hợp các bản ghi tài nguyên chia sẻ cùng name, class, và type nhưng không phải cùng một dữ liệu. Điều này xảy ra, ví dụ, khi một máy chủ có nhiều hơn một bản ghi địa chỉ cho name của nó (ví dụ, bởi vì nó có nhiều hơn một địa chỉ IP). TTLs cho RR trong RRSet cùng phải bằng nhau.

<a name="5.6"></a>
#### 5.6 Resource Record Types

- Mặc dù DNS thường được sử dụng để xác định địa chỉ IP tương ứng với một tên miền cụ thể, nó cũng có thể được sử dụng cho mục đích ngược lại và một số thứ khác. Nó có thể được sử dụng với cả IPv4 và IPv6 và thậm chí có thể cung cấp một chức năng cơ sở dữ liệu phân tán khác với dữ liệu Internet (các class khác trong thuật ngữ DNS [RFC6195]). Hàng loạt các khả năng được cung cấp bởi DNS chủ yếu là do khả năng của nó để có các loại khác của các resource records.

- Có rất nhiều loại resource record (xem [DNSPARAMS] cho danh sách đầy đủ), và một tên có thể có nhiều RR. Bảng sau cung cấp danh sách các loại RR phổ biến nhất được sử dụng với _luật_ DNS (ví dụ, DNS mà không có phần mở rộng bảo mật DNSSEC)

	![](https://github.com/hellsins/sysadmin_level1/blob/master/Task21_Translation_TC-IP_Illustrated_Vol1_Page_525to529/img/4.png)

> 	Các loại bản ghi tài nguyên và truy vấn phổ biến được sử dụng trong thông điệp DNS. Bổ sung records (không hiển thị) sử dụng khi bảo mật DNS (DNSSEC) được sử dụng

- Tài nguyên record được sử dụng cho nhiều mục đích nhưng có thể chia thành ba loại chính: data  types,  query  types,  and  meta  types. Các data  types được sử dụng để truyền tải thông tin được lưu trữ trong DNS như địa chỉ IP và tên của các máy chủ tên miền có quyền. Loại query  types sử dụng các giá trị tương tự như các data  types, với một vài giá trị bổ sung (ví dụ, AXFR, IXFR, và *). Chúng có thể được sử dụng trong phần question. Loại Meta xác định dữ liệu tạm thời liên kết với một thông điệp DNS đơn cụ thể. RR OPT là loại meta duy nhất chúng ta thảo luận. Các RR data  types phổ biến nhất bao gồm A, NS, SOA, MX, CNAME, PTR, TXT, AAAA, SRV, và NAPTR. Các NS record được sử dụng để liên hệ không gian tên DNS đến các máy chủ thực hiện các thực thi, và chúng có chứa tên của máy chủ tên miền có quyền đối với một zone. Các record A và AAAA được sử dụng để cung cấp địa chỉ IPv4 hoặc IPv6, tương ứng, đặt một cái tên cụ thể. Bản ghi CNAME cung cấp một cách để có một alias cho một tên miền khác. SRV và NAPTR giúp các ứng dụng để phát hiện vị trí của các máy chủ dịch vụ hỗ trợ đặc biệt, và sử dụng các đề án đặt tên thay thế kịp thời (ngoài DNS) để truy cập các dịch vụ đó. Chúng tôi sẽ xem xét từng loại record trong các phần sau

