### Name Resolution and the Domain Name System (DNS)

> Tài liệu: Phân giải tên miền và hệ thống tên miền

> Thực hiện: Nguyễn Công Trứ

> Cập nhật: 21/20/2016

#### Mục lục

- [3. Name Server and Zones](#3)

- [4. Caching](#4)

- [5. The DNS Protocol](#5)

- [5.1 DNS Message Format](#5.1)

--- 

<a name="3"></a>
#### 3. Name Server and Zones

- Trách nhiệm quản lý cho các phần của không gian tên miền được giao cho cá nhân hoặc tổ chức. Một cá nhân (tổ chức) nhận trách nhiệm cho việc quản lý một phần của các hoạt động không gian tên miền (một hoặc nhiều tên miền) phải bố trí ít nhất hai tên máy chủ hoặc máy chủ DNS để chứa thông tin về không gian tên miền để người dùng Internet có thể thực hiện truy vấn trên các tên miền đó. Sự kết hợp của các máy chủ tạo thành DNS (dịch vụ), một hệ thống phân phối mà công việc chính là cung cấp việc ánh xạ tên miền sang địa chỉ IP. Tuy nhiên, nó cũng có thể cung cấp một lượng lớn các thông tin bổ sung.

- Các đơn vị ủy thác hành chính, trong ngôn ngữ của máy chủ DNS, được gọi là một khu vực hay vùng (zones). Khu vực là một cây con của không gian DNS có thể được quản lý một cách riêng biệt từ các vùng khác. Mỗi tên miền tồn tại trong một vài zones, thậm chí các TLDs tồn tại trong root zones. Mỗi lần có 1 record mới sẽ được thêm vào một zones, người quản trị vùng DNS phân bổ tên và bổ sung thông tin (thường là địa chỉ IP) cho các mục mới và nhập vào tên của máy chủ cơ sở dữ liệu. Tại một cơ sở nhỏ, ví dụ, một người có thể làm điều này mỗi khi một máy chủ mới được thêm vào mạng, nhưng trong một doanh nghiệp lớn có trách nhiệm phải được ủy thác (có lẽ do bộ phận hoặc các đơn vị tổ chức khác), như là một người  có thể không theo kịp với các công việc

- Một máy chủ DNS có thể chứa thông tin cho nhiều zones. Bất kỳ một thay đổi trong một tên miền (ví dụ, bất cứ khi nào thời gian xuất hiện), một zones khác và chứa máy chủ có thể được truy cập để cung cấp thông tin cho tên miền. Điều này được gọi là sự ủy thác (delegation). Một cách tiếp cận delegation phổ biến là sử dụng 1 zones cho tên miền cấp 2, chẳng hạn như berkeley.edu. Trong tên miền này, có thể có máy chủ cá nhân (ví dụ: www.berkeley.edu) hoặc các tên miền khác (ví dụ, cs.berkeley.edu). Mỗi khu vực có một khu vực cho phép chủ sở hữu hoặc bên chịu trách nhiệm cho các cơ quan quản lý tên miền, địa chỉ và phụ thuộc khu vực trong vùng. Thường người này quản lý không chỉ nội dung của khu vực, nhưng cũng có các máy chủ tên miền chứa các khu vực database(s)

- Thông tin zone được cho là tồn tại ít nhất ở hai vị trí, nghĩa là nên có ít nhất hai máy chủ chứa thông tin cho mỗi khu vực. Điều này được cho là dư thừa; Tuy nhiên nếu một máy chủ không hoạt động đúng, ít nhất một máy chủ khác có sẵn. Tất cả các máy chủ này có chứa các thông tin giống hệt nhau về zone. Thông thường, trong số các máy chủ, máy chủ chính (primary) chứa các khu vực cơ sở dữ liệu trong một tập tin đĩa, và một hoặc nhiều máy chủ thứ cấp (secondary) có được bản sao (lấy) toàn bộ các cơ sở dữ liệu từ máy chủ chính bằng cách sử dụng một quá trình được gọi là zone transfer. DNS có một giao thức đặc biệt để thực hiện zone transfer, nhưng nội dung của các bản sao của một zone cũng có thể thu được bằng cách sử dụng các cách khác (ví dụ:Tiện ích  rsync [RSYNC])

<a name="4"></a>
#### 4. Caching

- Tên máy chủ chứa thông tin như ánh xạ tiên miền sang IP có thể được lấy từ ba nguồn. Máy chủ tên miền lấy được thông tin trực tiếp từ cơ sở dữ liệu zone, như là kết quả của zone transfer, hoặc từ một máy chủ khác trong quá trình xử lý phân giải. Trong trường hợp đầu tiên, các máy chủ được cho là chứa các thông tin độc quyền về khu vực và có thể được gọi là một máy chủ độc quyền cho zone. Các máy chủ được xác định theo tên trong thông tin zone

- Hầu hết các tên máy chủ (ngoại trừ một số máy chủ root và máy chủ TLD) cũng cache thông tin zone nó học, đến một giới hạn gọi là thời gian sống (Time To Live - TTL). Họ sử dụng các thông tin cache này để trả lời các truy vấn (queries). Làm như vậy có thể làm giảm đáng kể số lượng lưu lượng truy cập thông điệp DNS nào nếu không được thực hiện trên Internet [J02]. Khi trả lời một truy vấn, một máy chủ chỉ ra thông tin cho dù các thông tin đó đã được bắt nguồn từ bộ nhớ cache của nó hoặc từ bản sao uỷ quyền của khu vực. Khi thông tin được lưu trở lại, nó thường là cho một máy chủ cũng bao gồm các tên miền của tên máy chủ mà có thể được liên lạc để truy xuất các thông tin độc quyền về zone tương ứng

- Như chúng ta sẽ thấy, mỗi bản ghi DNS (ví dụ: ánh xạ tên miền sang IP) có TTL riêng, điều khiển việc nó có thể được lưu trữ bao lâu. Những giá trị này được thiết lập và thay đổi bởi người quản trị khu vực khi cần thiết. Các bắt buộc TTL bao lâu thì 1 ánh xạ có thể được lưu trữ ở bất cứ đâu trong DNS, vì vậy nếu thay đổi, vẫn có thể tồn tại các dữ liệu được lưu trữ trong mạng, có khả năng dẫn đến hành vi phân giải DNS không chính xác cho đến hết thời hạn của TTL. Vì lý do này, một số quản trị viên khu vực, dự đoán một sự thay đổi các nội dung zone, là làm giảm TTL trước khi thực hiện thay đổi. Làm như vậy làm giảm độ không chính xác các dữ liệu lưu trữ có mặt trong mạng

- Điều đáng nói là bộ nhớ đệm (caching) là áp dụng cho cả phân giải thành công và không thành công (gọi là tiêu cực, bộ nhớ đệm). Nếu một yêu cầu cho một tên miền cụ thể không trở về, thực tế này cũng lưu trữ. Làm như vậy có thể giúp làm giảm lưu lượng truy cập Internet khi ứng dụng liên tục thực hiện các yêu cầu cho các tên không tồn tại. Bộ nhớ đệm tiêu cực được đổi từ tùy chọn bắt buộc bởi [RFC2308]

- Một số cấu hình mạng (ví dụ, những người sử dụng lớn tương thích với hệ thoonhs Unix), bộ nhớ cache được duy trì ở tên máy chủ gần đó, không phải thường phân giải trong các khách hàng. Cách đặt bộ nhớ cache trong máy chủ cho phép bất kỳ máy chủ trên mạng LAN sử dụng máy chủ gần đó để hưởng lợi từ bộ nhớ cache của máy chủ và nghĩa là một sự chậm trễ nhỏ trong truy cập vào bộ nhớ cache trên mạng cục bộ. Trong Windows và các hệ thống mới hơn (ví dụ như, Linux), khách hàng có thể duy trì một bộ nhớ cache, và nó được thực hiện có sẵn cho tất cả các ứng dụng chạy trên cùng một hệ thống. Trong Windows, điều này sẽ xảy ra theo mặc định, và trong Linux, nó là một dịch vụ có thể được kích hoạt hoặc vô hiệu hóa

- Trên Windows, các thông số bộ nhớ cache của hệ thống local có thể được thay đổi bằng cách chỉnh sửa  registry sau 

	`HKLM\SYSTEM\CurrentControlSet\Services\DNSCache\Parameters`

- Giá trị DWORD MaxNegativeCacheTtl cho số giây lớn nhất mà một kết quả thất bại của DNS vẫn còn trong bộ nhớ cache. Giá trị DWORD MaxCacheTtl cho số giây tối đa mà một bản ghi DNS có thể vẫn còn trong bộ nhớ cache. Nếu giá trị này là ít hơn so với TTL bản ghi DNS được đón nhận, giá trị ít hơn kiểm soát bản ghi vẫn còn bao lâu trong bộ nhớ cache. Có 2 key đăng ký không tồn tại theo mặc định, do đó, chúng được tạo ra để được sử dụng

- Linux và các hệ thống tương tự, Name  Service  Caching Daemon (NSCD) cung cấp khả năng caching phía khách hàng (client). Nó được kiểm soát bởi các tập tin /etc/nscd.conf có thể cho biết loại phân giải (cho DNS và một số dịch vụ khác) được lưu trữ, cùng với một số thông số bộ nhớ cache như cài đặt TTL. Ngoài ra, tập tin /etc/nsswitch.conf điều khiển việc làm sao để phân giải tên miền cho ứng dụng diễn ra. Trong số những thứ khác, nó có thể kiểm soát tập tin local, giao thức DNS, và/hoặc NSCD được sử dụng để ánh xạ

<a name="5"></a>
#### 5. The DNS Protocol

- Giao thức DNS bao gồm hai phần chính: một giao thức truy vấn/đáp ứng được sử dụng để thực hiện truy vấn đối với DNS cho tên miền cụ thể, và các giao thức khác đối với tên miền máy chủ trao đổi cơ sở dữ liệu hồ sơ (zone transfer). Nó cũng có một cách để thông báo cho các máy chủ decondary cơ sở dữ liệu zone đã phát triển và transfer zone là cần thiết (thông báo DNS), và là một cách để tự động cập nhật các zone. Bởi đến nay, việc sử dụng điển hình nhất là một truy vấn đơn giản/phản ứng để tra cứu địa chỉ IPv4 tương ứng với một tên miền.

- Thông thường, phân giải tên miền là quá trình ánh xạ các tên miền đến một địa chỉ IPv4, mặc dù đối với IPv6 cũng theo cùng một cách. DNS truy vấn/đáp ứng hoạt động được hỗ trợ trên cơ sở hạ tầng phân phối DNS bao gồm các máy chủ được triển khai local tại mỗi trang web hoặc ISP, và đặc biệt thiết lập các máy chủ root. Có một thiết lập đặc biệt máy chủ tên miền top-level chung được sử dụng để mở rộng một số các gTLD lớn hơn, bao gồm cả COM và NET. Tính đến giữa năm 2011, có 13 máy chủ root bởi các chữ cái A đến M; 9 trong 13 máy chủ đấy có địa chỉ IPv6. Có cũng 13 máy chủ gTLD, cũng từ A đến M; 2 chúng có địa chỉ IPv6. Bằng cách liên lạc với máy chủ gốc và có thể là một máy chủ gTLD, máy chủ tên miền cho bất kỳ tên MIỀN trên Internet có thể được phát hiện. Các máy chủ được cùng phối hợp để cung cấp các thông tin tương tự. Một số trong chúng không phải là một máy chủ vật lý nhưng thay vì một nhóm máy chủ có thể sử dụng cùng một địa chỉ IP 

- Phân giải đầy đủ mà không thể dùng từ các mục được lưu trữ từ trước diễn ra trong một số thực thể, như hình minh họa sau

	![](https://github.com/ctnguyenvn/sysadmin_level1/blob/master/Task17_Translation_TC-IP_Illustrated_Vol1_Page_516to520/img/1.PNG)

	> Một điển hình đệ quy DNS truy vấn cho `EXAMPLE.CO`M từ `A.HOME` liên quan đến 10 thông báo (message). Các máy chủ địa phương đệ quy (`GW.HOME` ở đây) sử dụng một máy chủ DNS cung cấp bởi ISP của nó. Máy chủ đó, lần lượt, sử dụng một máy chủ tên gốc của Internet và một máy chủ gTLD (cho COM và NET TLDs) để tìm máy chủ tên cho miền `EXAMPLE.COM`. Tên máy chủ (`A.IANA-SERVERS.NET` ở đây) cung cấp địa chỉ IP đã yêu cầu cho máy chủ lưu trữ `EXAMPLE.COM`. Tất cả các máy chủ đệ quy cache bất kỳ thông tin đã học được để sử dụng sau

- Ở đây, chúng tôi có một máy tính xách tay được gọi là `A.HOME` gần máy chủ DNS `GW.HOME`. Tên miền HOME là private, do đó, nó không được biết đến Internet - chỉ tại local của người dùng. Khi một người dùng trên `A.HOME` mong muốn kết nối với máy chủ lưu trữ `EXAMPLE.COM` (ví dụ, bởi vì trình duyệt Web đã được hướng dẫn để truy cập vào trang http://EXAMPLE.COM), `A.HOME` phải xác định địa chỉ IP cho máy chủ `EXAMPLE.COM`. giả sử nó không biết địa chỉ này đã (có thể nếu nó đã truy cập các máy chủ mới), phần mềm giải quyết trên `A.HOME` đầu tiên làm cho một yêu cầu đến máy chủ local `GW.HOME`. Đây là một yêu cầu chuyển đổi tên `EXAMPLE.COM` vào một địa chỉ và cấu thành message 1 (hình trên)

	> Note: Nếu hệ thống `A.HOME` được cấu hình với một danh sách mặc định miền tìm kiếm, có thể có thêm các truy vấn. Ví dụ, nếu `.HOME` là một tên miền tìm kiếm mặc định được sử dụng bởi `A.HOME`, các truy vấn DNS đầu tiên có thể cho tên `EXAMPLE.COM`.HOME, mà sẽ không thành công tại tên máy chủ `GW.HOME`, mà uỷ quyền cho `.HOME` . Một truy vấn tiếp theo sẽ thường gỡ bỏ phần mở rộng mặc định, dẫn đến một truy vấn cho `EXAMPLE.COM`

- Nếu `GW.HOME` chưa biết IP cho `EXAMPLE.COM` hoặc các máy chủ tên cho miền `EXAMPLE.COM` hoặc COM TLD, nó chuyển tiếp yêu cầu đến máy chủ DNS khác (được gọi là recursion). Trong trường hợp này, một yêu cầu (message 2) đi vào một ISP cung cấp máy chủ DNS. Giả sử rằng hệ thống phục vụ này cũng không biết địa chỉ yêu cầu hoặc thông tin khác, nó liên hệ một trong các máy chủ tên gốc (message 3). Các máy chủ gốc không phải là recursion, để họ không xử lý yêu cầu hơn nữa nhưng thay vào đó quay trở lại các thông tin cần thiết để liên lạc với máy chủ tên cho COM TLD. Ví dụ, nó có thể trở lại tên gọi `A.GTLD-SERVERS.NET` và một hoặc nhiều địa chỉ IP của nó (message 4). Với thông tin này, các máy chủ ISP cung cấp địa chỉ liên lạc máy chủ gTLD (message 5) và phát hiện ra tên và địa chỉ IP của máy chủ tên cho miền `EXAMPLE.COM` (message 6). Trong trường hợp này, một trong các máy chủ là `A.IANA-SERVERS.NET`.

- Nhận đúng máy chủ cho tên miền, máy chủ ISP cung cấp địa chỉ liên hệ máy chủ thích hợp (message 7), đáp ứng với yêu cầu địa chỉ IP (message 8). Tại thời điểm này, các máy chủ ISP cung cấp có thể đáp ứng `GW.HOME` với các thông tin bắt buộc (message 9). `GW.HOME` bây giờ có thể hoàn tất truy vấn ban đầu và đáp ứng cho khách hàng với mong muốn địa chỉ IPv4 hoặc IPv6 (message 10)

- Từ góc nhìn của `A.HOME`, các tên máy chủ local có thể thực hiện yêu cầu. Tuy nhiên, những gì thực sự xảy ra là một truy vấn đệ quy, nơi `GW.HOME` và ISP cung cấp các máy chủ lần lượt thực hiện DNS yêu cầu bổ sung để đáp ứng các truy vấn của `A.HOME`. Nói chung, thực hiện hầu hết các tên máy chủ đệ quy truy vấn như thế này. Các ngoại lệ đáng chú ý là các máy chủ gốc và các máy chủ TLD khác không thực hiện truy vấn đệ quy. Các máy chủ là một nguồn tài nguyên quý giá, vì vậy cản trở chúng với các truy vấn đệ quy cho mỗi máy tính thực hiện một truy vấn DNS sẽ dẫn đến hiệu suất Internet toàn cầu kém.


<a name="5.1"></a>
#### 5.1 DNS Message Format
