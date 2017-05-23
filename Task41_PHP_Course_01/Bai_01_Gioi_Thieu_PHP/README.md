### Giới thiệu PHP

- PHP (Hypertext Preprocessor") là một ngôn ngữ lập trình kịch bản hay một loại mã lệnh chủ yếu được dùng để phát triển các ứng dụng viết cho máy chủ, mã nguồn mở, dùng cho mục đích tổng quát.

#### Cơ chế hoạt động của 1 web tĩnh

![](https://github.com/hellsins/sysadmin_level1/blob/master/Task41_PHP_Course_01/Image/1.png)

__Bước 1__: Client gửi request (sử dụng URL) 

__Bước 2__: Client tìm kiếm IP của server (có thể dựa vào domain trên URL)

__Bước 3__: Client nhận được IP và gửi đến server 

__Bước 4__: Server nhận request và bắt đầu xử lý

__Bước 5__: Server tìm kiếm file (webpage) yêu cầu trong ổ cứng của mình (disk drive) 

__Bước 6__: Nếu tìm thấy thì trả về kết quả cho client (có thể là trang html, php,...). Nếu không thì trả vè kết quả lỗi (hoặc mã lỗi)

__Bước 7__: Client dùng browser để hiển thị kết quả trả về


#### Cơ chế hoạt động của 1 web động

![](https://github.com/hellsins/sysadmin_level1/blob/master/Task41_PHP_Course_01/Image/2.png)

__Bước 1__: Client gửi request (sử dụng URL) 

__Bước 2__: Client tìm kiếm IP của server (có thể dựa vào domain trên URL)

__Bước 3__: Client nhận được IP và gửi đến server (web server)

__Bước 4__: Server nhận được request

__Bước 5__: Server tìm kiếm trong disk drive. Nếu có, xem thử nó là html thì trả kết quả về cho client, nhưng nếu nó là file php hay cần thực thi thì trả về server (web server)

__Bước 6__: Web server nhận được yêu cầu xử lý và yêu cần trình thông dịch PHP processor xử lý file php

__Bước 7__: PHP processor xử lý file php. Nếu không cần sử dụng database thì sau khi xử lý trả kết quả về cho web server (webpage) và server trả về cho client. Nếu file php có sử dụng database thì yêu cầu sử  dụng các hệ cơ sở quản trị cơ sở dữ liệu để xử lý

__Bước 8__: Hệ quản trị cơ sở dữ liệu (MySQL, SQLServer. Oracle, SQLite,...) thực thi các câu lệnh sử lý và PHP processor yêu câu và trả về kết quả cho PHP processor

__Bước 9__: PHP processor nhận kết quả và trả về dạng html cho webserver

__Bước 10__: Server nhận kết quả và trả về cho client

__Bước 11__: Client nhận kết quả và dùng trình duyệt để hiển thị kết quả

#### 4 thành phần cơ bản tạo nên webserver

- Apache (web server)

- Ngôn ngữ script phía server (PHP, ASP, .NET, Python,...)

- Database (Mysql, SQL server, Oracle....)

- Ngôn ngữ script phía client (javascript)