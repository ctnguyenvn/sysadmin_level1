
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

[5. File cấu hình SSH SERVER](FileConfig)

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

- Tính xác thực dùng để kiểm tra định danh của user/SERVER khi kết nối với nhau. Mỗi SSH bao gồm 2 việc xác thực: CLIENT kiểm tra định danh của SSH SERVER (SERVER authentication) và SERVER kiểm tra định danh của người dùng yêu cầu truy cập. Việc kiểm tra này tránh trường hợp kẽ tấn công giả mạo user hoặc SERVER.

- Thông thường User authentication thường sử dụng mật khẩu để xác thực. Để xác thực yêu cầu bạn gửi password để xác thực, tuy nhiên như đẫ nói hiện nay điều này là không an toàn vì có thể bị đánh cắp. Đây cũng là ưu điểm vượt bật hơn so với các giao thức khác như telnet hay FTP, SSH gửi tài khoản và mật khẩu dưới dạng mã hóa thay vì clean text như telnet, FTP. Hơn nữa SSH, sự khác biệt khiến SSH bảo mật hơn nữa với cơ chế xác thực đó là SSH sử dụng các cặp khóa (private key và public key) để hỗ trợ việc xác thực cho giao thức của mình.

#### Tính cấp phép (giấy phép) - authorization

- Việc cấp phép có tác dụng quyết định ai đó có thể hoặc không thể làm gì đó. Nó diễn ra sau khi xác thực. SSH có nhiều cách khác nhau để giới hạn hành động của CLIENT.

#### Tính chuyển tiếp - forwarding hay tạo đường hầm - tunneling

- Đây là việc đóng gói dịch vụ dựa trên TCP khác như Telnet hay IMAP trong một phiên SSH mang lại hiệu quả bảo mật của SSH đến với các dịch vụ dựa trên TCP khác. Bằng cách chuyển tiếp thông qua SSh, tất cả dữ liệu sẽ được mã hóa và kiểm tra định danh và bạn có thể xác nhận dùng SSH tin cậy. Có 3 kiểu chuyển tiếp mà SSH hỗ trợ đó là TCP port forwarding, X forwarding và Agent forwarding.


<a name="HoatDong"></a>
### 3. Hoạt động

SSH làm việc thông qua 3 bước sau

<a name="DinhDanh"></a>
#### 3.1 Định danh host

Việc định danh host được thực hiện qua trao đổi khóa. Mỗi máy tính có hỗ trợ kiểu truyền thông SSH đều có 1 khóa định danh duy nhất. Khóa này gồm 2 phần: public key và private key. public key được sử dụng khi cần trao đổi giữa các máy chủ với nhau trong phiên làm việc SSH, dữ liệu sẽ được mã hóa bằng public key và chỉ có thể giải mã bằng private key. Khi có sự thay đổi về cấu hình trên máy chủ như thay đổi chương trình SSH, thay đổi cơ bản hệ điều hành thì khóa định danh cũng sẽ thay đổi. Khi đó mọi người sử dụng SSH để đăng nhập vào máy chủ đều được cảnh báo về sự thay đổi này. Quá trình thiết lập, nhận diện được xảy ra như sau: Khi 2 hệ thống bắt đầu 1 phiên SSH, máy chủ sẽ gửi public key cho CLIENT. CLIENT sẽ sinh ra 1 khóa phiên ngẫu nhiên và mã hóa khóa này bằng public key của máy chủ. sau đó gửi lại cho máy chủ. Máy chủ sẽ giải mã khóa phiên này bằng khóa riêng của mình và nhận được khóa phiên. Khóa phiên này sẽ là khóa sử dụng để trao đổi dữ lệu giữa 2 máy.

<a name="MaHoa"></a>
#### 3.2 Mã hóa

Sau khi quá trình thiết lập phiên làm việc bảo mật., quá trình trao đổi dữ liệu diễn ra thông qua một bước trung gian đó là mã hóa và giải mã. Nghĩa là dữ liệu gửi/nhận trên đường truyền đều được mã hóa và giải mã theo cơ chế đã được thõa thuận trước giữa SERVER và CLIENT. Các cơ chế thường được sử dụng gồm 3DES, IDEA, và Blowfish. Khi cơ chế mã hóa đã được chọn SERVER và CLIENT trao đổi khóa mã hóa cho nhau. Việc trao đổi này cũng được bảo mật dựa trên bí danh của các máy.

<a name="ChungThuc"></a>
#### 3.3 Chứng thực

Việc chứng thực là bước cuối cùng. Tại thời điểm này, kênh trao đổi đã được bảo mật. Mỗi định danh và truy cập của người dùng có thể được cung cấp theo rất nhiều cách khác nhau. Việc chứng thực mật khẩu là một cách thông dụng để định danh người sử dụng, nhưng ngoài ra cũng có cách khác như chứng thực RSA, sử dụng ssh-keygen và ssh-agent để chứng thực các cặp khóa.

#### Để hiểu hơn về hoạt động của SSH ta xem qua minh họa sau.

![](https://github.com/hellsins/sysadmin_level1/blob/master/Task09_SSH_on_Linux/img/ssh.png)

- Đầu tiên ta thấy CLIENT mở kết nối TCP đến SERVER 

- Sau đó SERVER và CLIENT xác nhận phiên bản SSH đang sử dụng

- Tiếp theo SERVER sẽ gửi public key (host key H và SERVER key S) với thuật toán mã hóa dữ liệu là 3DES, Blowfish và phương thức xác thực là RSA, pasword kèm theo sử dụng anti-spoofing cookie đến CLIENT yêu cầu CLIENT mã hóa và xác thực kết nối.

- Sau khi CLIENT nhận được thì bắt đầu encrypt key (dùng host key và SERVER key vừa nhận) được key mới với thuật toán sử dụng là 3DES và kèm theo anti-spoofing cookie khi gửi cho SERVER.

- Quá trình xác thực thành công và có thể bắt đầu login vào SSH

- CLIENT gửi yêu cầu đến SERVER muốn login 

- SERVER gửi yêu cầu xác thực cho user cần login

- CLIENT gửi public key (của user muốn login - smith) lên SERVER yêu cầu login

- SERVER sẽ vào trong ~/USER/.ssh/authorized_key để tìm key cần xác thực cho yêu cầu của user

- Nếu không tồn tại key này trong authorized_key mà CLIENT gửi lên thì xác thực thất bại. SERVER yêu cầu gửi lại public key

- Nếu kiểm tra thành công (tồn tại key trong authorized_key mà CLIENT gửi) thì SERVER gửi lại yêu cầu cần xác thực private key của CLIENT bằng cách mã hóa thông điệp X bằng public-key của CLIENT vừa gửi

- CLIENT dùng thông điệp đã mã hóa vừa nhận từ SERVER và sử dụng private-key của mình giải mã và được thông điệp Y mới và gửi cho SERVER 

-  SERVER nhận được thông điệp Y từ CLIENT và so sánh với thông điệp X của mình nếu giống nhau thì kết nối thành công.

> Lưu ý: 

> - Có thể xem các bước đầu tiên (hình trên) trước khi sử dụng RSA authencation là quá trình kết nối, trao đổi public-key

> - Muốn thiết lập ssh sử dụng ssh-key thì yêu cầu 2 bên đã được kết nói sử dụng mật khẩu.

<a name="Key"></a>
### 4. Public key và Private key

Với public-key và private-key thì được sử dụng trong mã hóa bất đổi xứng (hay gọi là mã hóa công khai). khác với mã hóa đối xứng - 2 bên đều sử dụng chung một chìa khóa để mở khóa, thì mã hóa công khai sử dụng 2 khóa đó là pubic-key và private-key. Trong đó public-key sẽ được công khai và gửi đến đối tượng cần mã hóa (như SERVER) còn private-key được gĩư bí mật. Ví dụ khi client tạo SSH-key thì sẽ sinh ra 1 cặp key gồm cả public-key và private-key, đặc điểm quan trọng liên kết chúng là 2 key này khác nhau nhưng có thể nhận diện nhau. Public-key sẽ được gửi đến SERVER để kết nối.

Việc kết nối sẽ xảy ra như sau. Ý tưởng thay vì gửi key cho client thì SERVER sẽ gửi một thông điệp đã được mã hóa bằng public-key mà chỉ có private-key tương ứng mới có thể giải mã được cho client. Sau khi client nhận được thông điệp mã hóa sẽ giải mã thông điệp bằng private-key của mình và gửi kết quả đến SERVER để xác thực.

<a name="FileConfig"></a>
### 5. File cấu hình SSH SERVER

Đối với SSH thì hầu hết các tập tin cấu hình đều đặt ở /etc/ssh/. File sshd_config này chứa tất cả thông số để cấu hình một SSH server.

- __Thay đổi Port__: 
	
	`#port 22`

	Đây là cổng mặc định, bạn có thể thay đổi nó với ý nghĩa cổng sẽ đc dịch vụ SSH lắng nghe

- __Xác thực chỉ dùng Pasword__:

	`#PasswordAuthentication yes`

	Đây là option cho phép sử dụng Password để xác thực. Tuy nhiên muốn chỉ sử dụng xác thực bằng mật khẩu bạn nên disable option RSAAuthentication và đưa nó về `no`

- __Xác thực chỉ dùng Public Key__:

	`#RSAAuthentication`

	Option này cho phép xác thực bằng mã hóa công khai nghĩa là sử dụng SSH-key. Tuy nhiên để xác thực chỉ cần dùng Public-key thì bạn cần disable option PasswordAuthentication và đưa nó về `no`

- __Restric Root__:

	`#PermitRootLogin no`

	Đây là option cho phép login trực tiếp vào SERVER. Để hạn chế đăng nhặp với root bạn cho `no` cho tùy chọn này

> Lưu ý: *dấu `#` là thể hiện đang disable - xóa để enable nó*

Ngoài ra còn một số options quan trọng khác như

- `ListenAddress`: Tùy chọn này cho phép các mạng (IP) kết nối SSH vào SERVER. Mặc định là 0.0.0.0

- `LoginGraceTime`: Tùy chọn này chỉ định thời gian cho phép người dùng đăng nhập vào SSH. ví dụ khi xác thực mà sau 30s người dùng không đăng nhập thì phiên kết nối sẽ bị bỏ.

- `KeyRegenerationInterval`: Tương tự như LoginGraceTime thì tùy chọn này chỉ định việc tự động tạo key mới sau thời gian chỉ định.

- `PermitEmptyPasswords`: Đây cũng là tùy chọn quan trọng, nó cho phép người dùng đăng nhập với mật khẩu là null. Bạn nên chọn `no` để tăng bảo mật cho hệ thống của mình.

- `AllowUsers`: Tùy chọn này cho phép bạn chấp nhận user nào được phép kết nối với SSH vào SERVER. Bạn có thể thêm nhiều user bằng cách viết các user cách nhau bới dấu cách (spaces). 
