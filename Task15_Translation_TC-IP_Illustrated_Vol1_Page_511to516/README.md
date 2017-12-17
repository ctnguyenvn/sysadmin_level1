### Translation TCP-IP Illustrated Vol1

> Tài liệu: Translation TCP-IP Illustrated Vol1

> Thực hiện: Nguyễn Công Trứ

> Cập nhật: 15/11/2016

#### Mục lục

[1. Giới thiệu - Introduction](#1)

[2. Không gian tên miền - The DNS Name Space](#2)

[2.1 Quy tắc đặt tên miền - DNS naming syntax](#2.1)

---

<a name="1"></a>
#### 1. Giới thiệu

- Những giao thức chúng ta học cho đến nay hoạt động sử dụng địa chỉ IP để xác định các host tham gia vào một ứng dụng phân tán. Các địa chỉ này (đặc biệt là địa chỉ IPv6) gây khó khăn cho việc sử dụng và ghi nhớ đối với người dùng, vì vậy internet hỗ trợ sử dụng tên host để xác định host, kể cả client và server. Để được sử dụng bởi các giao thức TCP và IP, tên host được chuyển đổi sang địa chỉ IP sử dụng quá trình gọi là phân giải tên miền. Có nhiều hình thức khác nhau của tên được phân giải trên internet.  Nhưng phổ biến nhất và quan trọng cho sử dụng 1 hệ thống cơ sở dữ liệu phân tán gọi là hệ thống tên miền (DNS). DNS hoạt động như 1 ứng dụng trên internet, sử dụng IPv4 hoặc IPv6 (hoặc cả 2). Mở rộng ra, tên DNS được phân cấp như các server hỗ trợ phân giải tên miền.

- DNS là phân phối cơ sở dữ liệu mạng client/server sử dụng bởi ứng dụng TCP/IP để ánh xạ giữa host name và địa chỉ IP. Để cung cấp định tuyến thư điện tử, dịch vụ đặt tên, và các khả năng khác. Chúng ta sử dụng thuật ngữ phân phối vì không có trang web nào trên internet biết tất cả các thông tin. Mỗi trang web duy trì cơ sở dữ liệu thông tin riêng và duy trì máy chủ mà các client khác có thể truy vấn tới. DNS cung cấp các giao thức cho phép các client và server giao tiếp với nhau và cũng cho phép các server trao đổi thông tin.

- Từ quan điểm là 1 ứng dụng, truy cập vào DNS thông qua thư viên ứng dụng gọi là trình phân giải. Nói chung, 1 ứng dụng phải chuyển từ host name sang IPv4/IPv6 trước khi nó có thể yêu cầu TCP mở 1 kết nối hoặc gửi gói tin unicast sử dụng UDP. TCP và IP chỉ hoạt động với địa chỉ IP và nó không triển khai gì về DNS.

<a name="2"></a>
#### 2. Không gian tên miền - The DNS Name Space

- Các thiết lập của tất cả các tên được sử dụng với DNS tạo thành không gian tên miền DNS. Không gian này được phân chia theo thứ bậc và là trường hợp quan trọng, như file hệ thống hay tập tin cá nhân. Các không gian tên miền DNS hiện tại là cây domain với gốc là không rõ ràng (null root) ở trên đầu. Các cấp trên của cây gọi là domain cấp cao (TDL) trong đó gồm tên miền cấp cao dùng chung, theo quốc gia (ccTLDs), việc theo mã quốc gia được quốc tế hóa  (IDN  ccTLDs), cộng với một cơ sở hạ tầng đặt biệt, cho những lý do lịch sử. ARPA [RFC3172]

![](https://github.com/ctnguyenvn/sysadmin_level1/blob/master/Task15_Translation_TC-IP_Illustrated_Vol1_Page_511to516/img/1.png)

- Có năm nhóm thường được sử dụng tên miền cấp cao, và một nhóm các lĩnh vực chuyên ngành được sử dụng cho tên miền quốc tế (IDNs) .1 Lịch sử của IDNs, một phần của "quốc tế hóa" của Internet, dài và một số  điều phức tạp. Trên thế giới, có rất nhiều ngôn ngữ, và từng sử dụng một hoặc nhiều kịch bản được viết. Trong khi chuẩn Unicode [U11] nhằm mục đích nắm bắt được toàn bộ các ký tự, nhiều ký tự trông giống nhau nhưng có giá trị mã Unicode tương ứng khác nhau. Hơn nữa, ký tự được viết dưới dạng văn bản có thể viết từ phải sang trái, từ trái sang phải, hoặc cả hai hướng. 

- Các gTLDs được nhóm lại thành các loại: generic, generic-restricted, và sponsored. Các gTLDs generic (generic xuất hiện hai lần) được mở để sử dụng không hạn chế. Còn lại được giới hạn cho các loại khác nhau . Ví dụ, EDU được sử dụng cho các tổ chức giáo dục, MIL và Chính phủ Việt Nam được sử dụng cho quân sự và tổ chức chính phủ của Hoa Kỳ, và INT được sử dụng cho tổ chức chính trị quốc tế (như NATO). Sau đây chương trình và các chính sách liên quan đến quản lý TLD nói chung được duy trì bởi Tổng công ty Internet cho tên miền và số (ICANN) [ICANN].

![](https://github.com/ctnguyenvn/sysadmin_level1/blob/master/Task15_Translation_TC-IP_Illustrated_Vol1_Page_511to516/img/2.png)

- Các ccTLD bao gồm 2 từ theo mã quốc gia theo quy định của tiêu chuẩn ISO 3166, cộng năm mà không phải là: uk, su, ac, eu, và tp (đang được loại bỏ). Bởi vì một số 2 từ theo mã quốc gia được gợi ý sử dụng và ý nghĩa khác, các quốc gia khác nhau đã có thể tìm thấy lợi nhuận cho thương mại từ việc bán tên trong ccTLD của họ. Ví dụ, tên miền cnn.tv thực sự là một đăng ký ởThái Bình Dương của Tuvalu, đã được bán tên miền liên quan đến ngành công nghiệp giải trí truyền hình. Tạo một tên trong một cách độc đáo như vậy đôi khi được gọi là `domain hack`.

<a name="2.1"></a>
#### 2.1 Quy tắc đặt tên miền - DNS naming syntax

- Những cái tên dưới một TLD trong cây tên DNS được tiếp tục phân chia thành các nhóm gọi là tên miền phụ. Đây là thực tế rất phổ biến, đặc biệt là cho các ccTLD. Ví dụ, hầu hết các trang web giáo dục tại Anh sử dụng .ac.uk (hậu tố), trong khi tên cho hầu hết các công ty phi lợi nhuận có kết thúc trong .co.uk (hậu tố). Tại Hoa Kỳ, các trang web chính quyền thành phố có xu hướng sử dụng các tên miền phụ ci.city.state.us nơi Nhà nước (từ viết tắt hai chữ cho tên của nhà nước) và thành phố (là tên của thành phố). Ví dụ, các www.ci.manhattan-beach.ca.us trang web là trang web của Man-hattan Beach, California, chính quyền thành phố tại Hoa Kỳ.

- Các tên ví dụ chúng ta đã thấy cho đến giờ được gọi là tên miền đầy đủ (FQDN). Chúng đôi khi được viết chính thức hơn với một thời gian theo sau (ví dụ, mit.edu.) Điều này chỉ ra rằng tên là hoàn thành; Không có thêm thông tin cần được thêm vào tên khi biểu diễn một phân giải tên. Ngược lại với các FQDN, một tên miền không đủ tiêu chuẩn, được sử dụng kết hợp với một tên miền mặc định hoặc miền danh sách tìm kiếm thiết lập trong cấu hình hệ thống, có một hoặc nhiều dây nối đến cùng. Khi một hệ thống được cấu hình, nó thường được giao một phần mở rộng tên miền mặc định và danh sách tìm kiếm sử dụng DHCP (hoặc, ít phổ biến, các RDNSS và các tùy chọn DNSSL RA). Ví dụ, các cs.berkeley.edu miền mặc định có thể được cấu hình trong hệ thống tại khoa khoa học máy tính tại đại học UC Berkeley. Nếu một người sử dụng trên một trong những loại máy trong tên vangogh, phần mềm phân giải địa phương chuyển đổi tên này để các vangogh.cs.berkeley.edu FQDN. trước khi phân giải để xác định địa chỉ IP của vangogh.

- Một tên miền bao gồm một chuỗi các ký tự phân cách bằng dấu chấm. Tên đại diện cho một vị trí trong hệ thống phân cấp tên, nơi mà thời gian là dấu phân cách hệ thống phân cấp và giảm dần xuống cây diễn ra từ phải sang trái trong tên. Ví dụ, các FQDN

	www.net.in.tum.de

	chứa một chuỗi tên máy chủ (www) trong một miền bốn cấp sâu (net.in.tum.de). Bắt đầu từ gốc, và làm việc kể từ phải sang trái trong tên, TLD được `de` (các ccTLD Đức), `tum` là viết tắt cho Technische Universität München, `in` là viết tắt cho Informatik (Đức cho "khoa học máy tính"), và cuối cùng `net` là viết tắt cho các nhóm mạng trong khoa khoa học máy tính. Chuỗi là trường hợp không nhạy cảm để phù hợp với mục đích, vì vậy tên ACME.COM tương đương với acme.com hoặc AcMe.cOm [RFC4343]. Mỗi chuỗi có thể dài đến 63 ký tự, và toàn bộ một FQDN được giới hạn tối đa là 255 ký tự (1 byte). Ví dụ, tên miền này:

	thelongestdomainnameintheworldandthensomeandthensomemoreandmore.com

	đã được xem như một kỷ lục thế giới tiềm năng cho các tên dài nhất, với một chuỗi ký tự dài 63, nhưng đã được đánh giá là đã không đủ để ghi tên vào Sách kỷ lục Guinness

- Các cấu trúc phân cấp của không gian tên DNS cho phép các cơ quan hành chính khác nhau quản lý các bộ phận khác nhau của không gian tên miền. Ví dụ, tạo một tên DNS mới của mẫu elevator.cs.berkeley.edu khả năng sẽ yêu cầu với các chủ sở hữu duy nhất các tên miền phụ cs.berkeley.edu. Các berkeley.edu và edu phần của không gian tên sẽ không yêu cầu thay đổi, do đó, các chủ sở hữu của những người sẽ không cần phải bận tâm. Tính năng này của DNS là một trong những khía cạnh quan trọng của khả năng mở rộng của nó. Đó là, không có thực thể duy nhất cần thiết để quản lý tất cả các thay đổi cho toàn bộ không gian DNS. Thật vậy, việc tạo ra một cấu trúc phân cấp cho các tên là một trong những phản ứng đầu tiên trong cộng đồng Internet đến những áp lực mở rộng, tuy nhiên đó cũng là một động lực lớn cho sự phát triển các cơ cấu sử dụng ngày nay. Đề án đặt tên Internet ban đầu là phẳng (tức là, không phân cấp), và một thực thể duy nhất chịu trách nhiệm phân công, duy trì, và phân phối các danh sách tên không xung đột. Theo thời gian, nhiều tên đã được yêu cầu và thay đổi nhiều hơn đã được thực hiện, phương pháp này trở nên không khả thi [MD88]


