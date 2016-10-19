
### SSH on Linux 

> Tài liệu: Tìm hiểu về SSH trên Linux

> Thực hiện: Nguyễn Công Trứ

> Cập nhật: 19/10/2016

### Mục lục:

[1. Định nghĩa](#DinhNghia)

[2. Đặc điểm](#DacDiem)

[3. Hoạt động](#HoatDong)

- [3.1 Định danh host](#DinhDanh)

- [3.2 Mã hóa](#MaHoa)

- [3.3 Chứng thực](#ChungThuc)

[4. Public key và Private key](#Key)

[5. File cấu hình SSH server](FileConfig)

---

<a name="DinhNghia"></a>
### 1. Định nghĩa

SSH (Secure Shell) là một chương trình tương tác giữa máy chủ và máy khách có sử dụng cơ chế mã hóa đủ mạnh nhằm ngăn chặn các hiện tượng nghe trộm, đánh cắp thông tin trên đường truyền. Đây là một giao thức mạng dùng để thiết lập kết nối mạng một cách bảo mật. SSH hoạt động ở lớp trong mô hình phân lớp TCP/IP. Các công cụ SSH như OpenSSH cung cấp cho người dùng cách thức để thiết lập kết nối mạng được mã hóa để tạo 1 kênh kết nối riêng tư.


<a name="DacDiem"></a>
### 2. Đặc điểm

Để hiểu kĩ hơn về SSH ta đi qua một số đặc điểm chính sau

#### Tính bí mật - Private: 

- Được thể hiện qua việc mã hóa mạnh mẽ, nghĩa là bảo về dữ liệu không bị phơi bày. Mạng máy tính bình thường không bảo đảm tính bí mật này, bất cứ ai truy cập đến phần cứng của mạng hoặc đến những host kết nối với mạng đều có thể sẽ đọc được tất cả dữ liệu đi qua mạng. Mặc dù mạng chuyển mạch hiện đại đã giảm đi những vấn đề này trong mạng vùng cục bộ nhưng nó vẫn chưa thực sự an toàn đối với người dùng. 

- SSH cung cấp tính bí mật bằng việc mã hóa dữ liệu đi qua mạng. Đó là việc mã hóa 2 đầu dựa trên khóa ngẫu nhiên.

- SSH cũng hỗ trợ nhiều thuật toán mã hóa đối với phiên dữ liệu như AES, DES, 3DES, ARCFOUR,...

#### Tính toàn vẹn - Integrity.

- Tính toàn vẹn là đảm bảo dữ liệu được truyền từ một đầu này đến đầu kia của mạng không bị thay đổi. SSH sử dụng phương pháp kiểm tra toàn vẹn mật mã, phương pháp này kiểm tra việc dữ liệu có bị biến đổi không và dữ liệu đén có đúng là do đầu kia gửi hay không. Nó sử dụng thuật toán băm khóa là MD5 và SHA-1.

#### Tính xác thực - authentication.

- Tính xác thực dùng để kiểm tra định danh của user/server khi kết nối với nhau. Mỗi SSH bao gồm 2 việc xác thực: Client kiểm tra định danh của SSH server (server authentication) và server kiểm tra định danh của người dùng yêu cầu truy cập. Việc kiểm tra này tránh trường hợp kẽ tấn công giả mạo user hoặc server.

- Thông thường User authentication thường sử dụng mật khẩu để xác thực. Để xác thực yêu cầu bạn gửi password để xác thực, tuy nhiên như đẫ nói hiện nay điều này là không an toàn vì có thể bị đánh cắp. Đây cũng là ưu điểm vượt bật hơn so với các giao thức khác như telnet hay FTP, SSH gửi tài khoản và mật khẩu dưới dạng mã hóa thay vì clean text như telnet, FTP. Hơn nữa SSH, sự khác biệt khiến SSH bảo mật hơn nữa với cơ chế xác thực đó là SSH sử dụng các cặp khóa (private key và public key) để hỗ trợ việc xác thực cho giao thức của mình.

#### Tính cấp phép (giấy phép) - authorization

- Việc cấp phép có tác dụng quyết định ai đó có thể hoặc không thể làm gì đó. Nó diễn ra sau khi xác thực. SSH có nhiều cách khác nhau để giới hạn hành động của client.

#### Tính chuyển tiếp - forwarding hay tạo đường hầm - tunneling

- Đây là việc đóng gói dịch vụ dựa trên TCP khác như Telnet hay IMAP trong một phiên SSH mang lại hiệu quả bảo mật của SSH đến với các dịch vụ dựa trên TCP khác. Bằng cách chuyển tiếp thông qua SSh, tất cả dữ liệu sẽ được mã hóa và kiểm tra định danh và bạn có thể xác nhận dùng SSH tin cậy. Có 3 kiểu chuyển tiếp mà SSH hỗ trợ đó là TCP port forwarding, X forwarding và Agent forwarding.


<a name="HoatDong"></a>
### 3. Hoạt động

SSH làm việc thông qua 3 bước sau

<a name="DinhDanh"></a>
#### 3.1 Định danh host

Việc định danh host được thực hiện qua trao đổi khóa. Mỗi máy tính có hỗ trợ kiểu truyền thông SSH đều có 1 khóa định danh duy nhất. Khóa này gồm 2 phần: public key và private key. public key được sử dụng khi cần trao đổi giữa các máy chủ với nhau trong phiên làm việc SSH, dữ liệu sẽ được mã hóa bằng public key và chỉ có thể giải mã bằng private key. Khi có sự thay đổi về cấu hình trên máy chủ như thay đổi chương trình SSH, thay đổi cơ bản hệ điều hành thì khóa định danh cũng sẽ thay đổi. Khi đó mọi người sử dụng SSH để đăng nhập vào máy chủ đều được cảnh báo về sự thay đổi này. Quá trình thiết lập, nhận diện được xảy ra như sau: Khi 2 hệ thống bắt đầu 1 phiên SSH, máy chủ sẽ gửi public key cho client. Client sẽ sinh ra 1 khóa phiên ngẫu nhiên và mã hóa khóa này bằng public key của máy chủ. sau đó gửi lại cho máy chủ. Máy chủ sẽ giải mã khóa phiên này bằng khóa riêng của mình và nhận được khóa phiên. Khóa phiên này sẽ là khóa sử dụng để trao đổi dữ lệu giữa 2 máy.

<a name="MaHoa"></a>
#### 3.2 Mã hóa

Sau khi quá trình thiết lập phiên làm việc bảo mật., quá trình trao đổi dữ liệu diễn ra thông qua một bước trung gian đó là mã hóa và giải mã. Nghĩa là dữ liệu gửi/nhận trên đường truyền đều được mã hóa và giải mã theo cơ chế đã được thõa thuận trước giữa server và client. Các cơ chế thường được sử dụng gồm 3DES, IDEA, và Blowfish. Khi cơ chế mã hóa đã được chọn server và client trao đổi khóa mã hóa cho nhau. Việc trao đổi này cũng được bảo mật dựa trên bí danh của các máy.

<a name="ChungThuc"></a>
#### 3.3 Chứng thực

Việc chứng thực là bước cuối cùng. Tại thời điểm này, kênh trao đổi đã được bảo mật. Mỗi định danh và truy cập của người dùng có thể được cung cấp theo rất nhiều cách khác nhau. Việc chứng thực mật khẩu là một cách thông dụng để định danh người sử dụng, nhưng ngoài ra cũng có cách khác như chứng thực RSA, sử dụng ssh-keygen và ssh-agent để chứng thực các cặp khóa.

<a name="Key"></a>
### 4. Public key và Private key

<a name="FileConfig"></a>
### 5. File cấu hình SSH server


