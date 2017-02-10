### HTTP Protocol 

> Tài liệu: Tìm hiểu cơ bản về giao thức HTTP (HyperText Transfer Protocol)

> Thực hiện: Nguyễn Công Trứ

> Cập nhật: 16/12/2016

### Mục lục

[1. Giới thiệu](#1)

[2. Mô hình hoạt động](#2)

[3. Thông điệp HTTP](#3)

- [3.1 HTTP Request](#3.1)

- [3.2 HTTP Response](#3.2)

[4. Phương thức GET và POST](#4)

[5. HTTP Status Codes](#5)

***

<a name="1"></a>
### 1. Giới thiệu

[HTTP](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol) (HyperText Transfer Protocol - Giao thức truyền tải siêu văn bản) là giao thức nằm ở tầng Application Layer, được sử dụng để liên hệ thông tin giữa các máy chủ dịch vụ và máy sử dụng dịch vụ.

Từ lúc ra đời đến nay HTTP trải qua nhiều phiên bản, tuy nhiên phiên bản hoàn chỉnh đầu tiên của HTTP là **HTTP 0.9** (năm 1991), tiếp theo là **HTTP 1.0** (năm 1996), **HTTP 1.1** (năm 1997) và sau đó gần đây nhất là 2x (**HTTP 2.0**). 

Tuy phiên bản 2.0 đã ra đời nhưng vì một số lý do mà nó hiện vẫn chưa được phổ biến. Phiên bản **HTTP 1.1** hiện vẫn là phiên bản HTTP phổ biến nhất, có thể tham khảo thêm tại [RFC 2616](https://www.ietf.org/rfc/rfc2616.txt). Sự khác biệt lớn giữa HTTP/1.0 và HTTP/1.1 là HTTP/1.0 sử dụng một kết nối mới cho mỗi Yêu cầu/Phản hồi trao đổi, trong khi đó kết nối trong HTTP/1.1 có thể được sử dụng cho một hoặc nhiều Request/Response (Yêu cầu/Phản hồi).

<a name="2"></a>
### 2. Mô hình hoạt động

HTTP hoạt động dựa trên mô hình client-server, sử dụng kết nối TCP port 80. Trình duyệt client thực hiện yêu cầu, nhận và hiển thị đối tượng web (gồm dữ liệu HTML, hình ảnh JPEG, Java applet, video, âm thanh, …). Trong khi, web server sẽ gửi trả lời khi nhận được yêu cầu từ client.

<p align="center"><img src="https://github.com/hellsins/sysadmin_level1/blob/master/Task22_HTTP_Protocol/Image/1.png" /></p>

Có 2 loại kết nối HTTP là kết nối không bền vững và kết nối bền vững. 

- Kết nối không bền vững là sau khi server gửi đi một đối tượng thì kết nối TCP sẽ được đóng. Như vậy, mỗi kết nối TCP chỉ truyền được duy nhất một yêu cầu từ client và nhận lại một thông điệp trả lời từ server. Chúng ta có thể tóm tắt qua 1 bước sau:

	+ Bước 1: Client khởi tạo kết nối TCP bằng việc gửi yêu cầu đến server. Server nhận được yêu cầu và chấp nhận kết nối bằng việc gửi trả lời về cho client. Nếu sau khoảng thời gian RTT (Round Trip Time) mà không nhận được trả lời từ phía server thì client sẽ gửi lại yêu cầu.
	
	+ Bước 2: Sau khi kết nối được thiết lập, client sẽ gửi thông điệp yêu cầu chứa tên đường dẫn của các đối tượng ( ví dụ: https://github.com/ks-is) đến server. Server nhận được thông điệp yêu cầu và tiến hành lấy ra các đối tượng được yêu cầu. Sau đó, các đối tượng được đóng gói thành thông điệp trả lời và gửi đến client.
	
	+ Bước 3: Server đóng kết nối TCP (Lưu ý: server chỉ đóng kết nối TCP khi chắc chắn rằng client nhận được thông điệp trả lời)
	
	+ Bước 4: Client nhận thông điệp trả lời chứa tập tin HTML và hiển thị các đối tượng.

- Kết nối bền vững: server sẽ duy trì kết nối TCP cho việc gửi nhiều đối tượng. Như vậy, sẽ có nhiều yêu cầu từ client được gửi đến server trên cùng một kết nối. Thông thường kết nối TCP này sẽ được đóng lại trong một khoảng thời gian định trước.

	+ Kết nối bền vững không có pipelining:

		- Client phát ra yêu cầu mới chỉ khi đáp ứng trước đó đã nhận xong.

		- RTT cho mỗi đối tượng tham chiếu.

	+ Kết nối bền vững có pipelining:

		- Mặc định có trong HTTP/1.1.

		- Client gửi yêu cầu ngay sau khi gặp một đối tượng tham chiếu.

		- Ít nhất 1 RTT cho tất cả đối tượng tham chiếu.

<a name="3"></a>
### 3. Thông điệp HTTP

Như chúng ta đã nói ở trên, HTTP là giao thức được thiết kế theo kiểu client – server, giao tiếp giữa client và server dựa vào request – response, client đưa ra các request và server trả lời các request này.

<a name="3.1"></a>
#### 3.1 HTTP Request

Để bắt đầu trao đổi dữ liệu, phía client khởi tạo một HTTP session bằng cách mở một kết nối TCP đến HTTP server sau đó gửi request đến server này. Request có thể được tạo bằng nhiều cách

Cấu trúc chung của 1 HTTP Resquest

<p align="center"><img src="https://github.com/hellsins/sysadmin_level1/blob/master/Task22_HTTP_Protocol/Image/2.png" /></p>

Ví dụ về một HTTP Resquest

<p align="center"><img src="https://github.com/hellsins/sysadmin_level1/blob/master/Task22_HTTP_Protocol/Image/3.png" /></p>

- Bắt đầu của HTTP Request sẽ là Request-Line tương ứng với 3 dòng là:

	+ __Method__: là phương thức mà HTTP Request này sử dụng, thường là GET, POST, ngoài ra còn một số phương thức khác như HEAD, PUT, DELETE, OPTION, CONNECT. Trong ví dụ trên là GET

	+ __URI__: là địa chỉ định danh của tài nguyên. Trong tường hợp này URI là / (tức request cho tài nguyên gốc, nếu request không yêu cầu một tài nguyên cụ thể, URI có thể là dấu *)

	+ __HTTP version__: là phiên bản HTTP đang sử dụng, ở đây là HTTP 1.1.

- Tiếp theo là các trường request-header, cho phép client gửi thêm các thông tin bổ sung về thông điệp HTTP request

	+ __Host__: Chỉ định Server, nơi mà các đối tượng được lưu trữ. Trong ví dụ này host là www.archlinux.org

	+ __Connection__: Tùy chọn điều khiển cho kết nối hiện thời. Ví dụ: keep-alive, close... Ở ví dụ này là keep-alive

	+ __Accept__: Loại nội dung có thể nhận được từ thông điệp response. Ví dụ: text/html, application/xml,...

	+ __User-Agent__: Thông tin về user agent của người dùng, ví dụ như trình duyệt. Ở ví dụ này là Mozilla/5.0,...

	+ __Accept-Encoding__:  Các kiểu nén được chấp nhận. Trong ví dụ là gzip, deflate, sdch

	+ __Accept-Language__: Các ngôn ngữ được chấp nhận

- Entity Body (nếu có): Là phần thân của thông điệp HTTP Resquest

<a name="3.2"></a>
#### 3.2 HTTP Response

Cấu trúc HTTP response gần giống với HTTP request, chỉ khác nhau là thay vì Request-Line, thì HTTP có response có Status-Line.

Cấu trúc chung của 1 HTTP Response

<p align="center"><img src="https://github.com/hellsins/sysadmin_level1/blob/master/Task22_HTTP_Protocol/Image/4.png" /></p>

Ví dụ về một HTTP Response

<p align="center"><img src="https://github.com/hellsins/sysadmin_level1/blob/master/Task22_HTTP_Protocol/Image/5.png" /></p>

- Bắt đầu thông điệp HTTP Response là Status-Line với 3 dòng đầu là:

	+ __version__: Thể hiện phiên bản HTTP cao nhất mà server hỗ trợ. Trong ví dụ là HTTP 1.1

	+ __status code__: mã kết quả trả về (sẽ được nói phía dưới). Trong ví dụ là 301
	
	+ __phrase__: Mô tả về Status-code

- Tiếp theo là header line gồm 1 số trường sau:

	+ __Date__: Cho biết thời gian mà thông điệp HTTP trả lời được tạo và gửi bởi server. Trong ví dụ là `sat, 17 Dec 2016 06:16:32 GMT`

	+ __Server__: Thể hiện dịch vụ mà Server đang sử dụng (ví dụ như apache, Nginx,...). Trong ví dụ này server đang chạy dịch vụ Apache

	+ __Content-Length__: Cho biết số bytes của đối tượng được gửi. Trong ví dụ là 346

	+ __Connection__: Tùy chọn điều khiển cho kết nối. Ở ví dụ này cũng là keep-Alive như lúc GET (HTTP resquest phía trên)

	+ __Content-Type__: Cho biết đối tượng trong phần entity body. Ở ví dụ này là text/html

<a name="4"></a>
### 4. Phương thức GET và POST

Trong HTTP thì có 2 phương thức được sử dụng phổ biến nhất là GET và POST. 

__GET__ được sử dụng để lấy lại thông tin từ Server đã cung cấp bởi sử dụng một URI đã cung cấp. Các yêu cầu sử dụng GET nên chỉ nhận dữ liệu và không có ảnh hưởng gì tới dữ liệu.

- Một số đặc điểm của phương thức GET:

	+ GET request có thể được cached, bookmark và lưu trong lịch sử của trình duyệt.
	
	+ GET request bị giới hạn về chiều dài, do chiều dài của URL là có hạn.
	
	+ GET request không nên dùng với dữ liệu quan trọng, chỉ dùng để nhận dữ liệu.

Với __POST__ thì một yêu cầu POST được sử dụng để gửi dữ liệu tới Server, ví dụ như thông tin khách hàng, file tải lên, …

- Một số đặc điểm của phương thức

	+ POST không thể, cached, bookmark hay lưu trong lịch sử trình duyệt.

	+ POST không bị giới hạn về độ dài.

Ngoài ra còn một số phương thức khác như

- __HEAD__: Tương tự như GET, nhưng nó truyền tải dòng trạng thái và khu vực Header.

- __PUT__: Thay đổi tất cả các đối tượng hiện tại của nguồn mục tiêu với nội dung được tải lên.

- __DELETE__: Gỡ bỏ tất cả các đối tượng hiện tại của nguồn mục tiêu bởi URI.

- __CONNECT__: Thiết lập một tunnel tới Server được xác định bởi URI đã cung cấp.

- __OPTIONS__: Miêu tả các chức năng giao tiếp cho nguồn mục tiêu.

- __TRACE__: Trình bày một vòng lặp kiểm tra thông báo song song với path tới nguồn mục tiêu.

<a name="5"></a>
### 5. HTTP Status Codes

Status Codes là các mã trạng thái mà server trả về cho client. Một số loại Status-Code thông dụng như:

- __1xx__: information Message: các status code này chỉ có tính chất tạm thời, client có thể không quan tâm.

	+ 100 (Continue): Máy chủ trả về mã này để chỉ ra rằng nó đã nhận được một phần đầu tiên của một yêu cầu và được chờ đợi cho phần còn lại.

	+ 101 (Switching protocols): Bên yêu cầu đã yêu cầu các máy chủ để chuyển đổi và máy chủ được thừa nhận rằng nó sẽ làm như vậy

- __2xx__ Successful: khi đã xử lý thành công request của client, server trả về status dạng này:

	+200 OK: request thành công.

	+202 (Accepted): request đã được nhận, nhưng không có kết quả nào trả về, thông báo cho client tiếp tục chờ đợi.

	+204 (No Content): request đã được xử lý nhưng không có thành phần nào được trả về.

	+205 (Reset): Các máy chủ proccessed yêu cầu thành công, nhưng không trả lại bất kỳ nội dung. Không giống như một phản ứng 204, phản ứng này đòi hỏi người yêu cầu thiết lập lại xem tài liệu

	+206 (Partial Content): server chỉ gửi về một phần dữ liệu, phụ thuộc vào giá trị range header của client đã gửi.

- __3xx__ Redirection: server thông báo cho client phải thực hiện thêm thao tác để hoàn tất request:

	+ 301 (Moved Permanently): tài nguyên đã được chuyển hoàn toàn tới địa chỉ Location trong HTTP response.

	+ 303 (See other): Tài nguyên đã được chuyển tạm thời tới địa chỉ Location trong HTTP response.

	+ 304 (Not Modified): Tài nguyên không thay đổi từ lần cuối client request, nên client có thể sử dụng đã lưu trong cache.

- __4xx__ Client error: Lỗi của client:

	+ 400 (Bad Request): Request không đúng dạng, cú pháp.

	+ 401 (Unauthorized): Client chưa xác thực.

	+ 403 (Forbidden): Client không có quyền truy cập.

	+ 404 (Not Found): Không tìm thấy tài nguyên.

	+ 405 (Method Not Allowed): Phương thức không được server hỗ trợ.

- __5xx__ Server Error: Lỗi của server:

	+ 500 (Internal Server Error): Có lỗi trong quá trình xử lý của server.

	+ 501 (Not Implemented): Server không hỗ trợ chức năng client yêu cầu.

	+ 503: Service Unavailable: Server bị quá tải, hoặc bị lỗi xử lý.


### Tham khảo

- https://vi.wikipedia.org/wiki/Hypertext_Transfer_Protocol

- http://expressmagazine.net/development/2160/http-giao-thuc-ma-moi-lap-trinh-vien-nen-biet#

- http://hatangmang.blogspot.com/2014/06/giao-thuc-http.html

- https://www.stdio.vn/articles/read/202/http-request-va-http-response
