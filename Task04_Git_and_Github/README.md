
## Git and Github

> Tài hiệu: Tìm hiểu về git và github

> Thực hiện: Nguyễn Công Trứ

> Cập nhật: Ngày 02/10/2016


Mục lục:

###  [1. Giới thiệu về github](#GioiThieu)

### [2. Cài đặt git, Generate, add key SHH...](#CaiDat)

- #### [2.1 Cài đặt Git](#CaiDatGit)

- #### [2.2 Các thiết lập ban đầu](#ThietLap)

- #### [2.3 Liên kết tài khoản github bằng SSH (Add key SSH) ](#AddKey)

#### [3. Các thao tác cơ bản sử dụng github](#ThaoTac)

- #### [3. 0 Tạo Một repo](#Tao)

- #### [3. 1 Clone](#Clone)

- #### [3. 2 Add](#Add)
	
- #### [3. 3 Remove](#Remove)
	
- #### [3. 4 Commit ](#Commit)
	
- #### [3. 5 Push](#Push)
	
- #### [3. 6 Pull](#Pull)

- #### [3. 7 Remote](#Remove)

- #### [3. 8 Fork](#Fork)

- #### [3. 9 Star](#Star)

- #### [3. 10 Watch](#Watch)

- #### [3. 11 Fetch](#Fetch)

#### [4 Kết luận](#KetLuan)

---
<p name="GioiThieu"></p>
####  1. Giới thiệu về github

-- Github là một dịch vụ lưu trữ dựa trên web cho các dự án phát triển phần mềm trong đó sử dụng các hệ thống kiểm soát phiên bản Git. Github cung cấp phiên bản trả phí cho các kho tư nhân, doanh nghiệp hoặc có thể miễn phí cho dự án mã nguồn mở. Github đang trở nên ngày càng phổ biến và thiết yếu hơn đối với các doanh nghiệp - như là một sơ yếu lý lịch cho các nhà tuyển dụng.

-- Github chủ yếu được dùng để chứa mã, nhưng cũng thường được dùng với nhiều tài liệu hay với mục đích khác như theo dõi vấn đề và tính năng yêu cầu, tài liệu wiki, github cũng hỗ trợ cho bạn tạo các trang web  nhỏ có thể được lưu từ kho công cộng trên github. Định dạng là http://username.github.io ví vụ như [đây](https://hellsins.github.io)...

-- Để sử dụng github, đầu tiên bạn [đăng ký](https://github.com/join?source=header-home) một tài khoản github và tất nhiên nó dể như ăn 1 tô cháo vậy. Sau đó có lẽ bạn nên học về ngôn ngữ Markdown (có thể không) để thể hiện rõ hơn cho bài viết của bạn và tất nhiên ngôn ngữ này cũng vô cùng đơn giản. Tiếp theo là tạo một repo và bắt đầu thôi.

-- Tuy nhiên bạn nên hiểu sơ qua về cơ chế hoạt động của github
![](https://github.com/hellsins/sysadmin_level1/blob/master/Task04_Git_and_Github/img/git1.png)

Như chúng ta đã thấy đó là những trạng thái của 1 repo github. Chúng ta sẽ nói sơ qua về các trạng thái còn những hành động tương ứng sẽ được bàn sau:

- __Working dir__: Đây là nơi bạn chỉnh sửa file mã nguồn của mình, bạn có thể sử dụng bất kỳ editer nào để viết/code chúng
- __Stagging area__: Những thay đổi của bạn với file sẽ được lưu lại, giống như khi soạn file với gedit bạn nhấn Save vậy. 
- __Git directory__: Nơi lưu trữ mã nguồn của bạn (ở đây là github)

<p name="CaiDat"></p>
####  2. Cài đặt git, Generate, add key SSH...

<p name="CaiDatGit"></p>
#### 2.1 Cài đặt Git

- Với HĐH là Ubuntu, Debian:

	> apt-get install git

- Với HĐH là Fedora, CentOS

	> yum install git

- Với Arch

	> pacman -S git

<p name="ThietLap"></p>
#### 2.2 Các thiết lập ban đầu

- Bạn cần thiết tập tên và email của mình để khi commit lên server sẽ nhận biết được ai đang commit lên1 repo (vì có thể nhiều người tham gia)
	> git config --global user.name "tên/username của bạn"

	> git config --global user.email "email của bạn"

- Lựa chọn trình soạn thảo mặc định (có thể không cần) như nano, vi, emacs,...
	> git config --global core.editor nano

- Bjna có thể xem lại các thiết lập của mình
	> git config --list

<p name="AddKey"></p>
#### 2.3 Liên kết tài khoản github bằng SSH (Add key SSH)

- Bạn mở terminal và gõ lệnh với cú pháp sau

![](https://github.com/hellsins/sysadmin_level1/blob/master/Task04_Git_and_Github/img/git2.png)

> Bạn cũng có thể dùng lệnh sau để add key SSH (nếu dùng lệnh này thì thực hiện các lệnh trong hình tiếp theo)

> ssh-keygen -t rsa -C `email của bạn`

- Sau khi xong thì key rsa của bạn nằm ở ~/.ssh/
	
	id_rsa		
	id_rsa.pub 		
	knowns_hosts

- Tiếp theo
	
![](https://github.com/hellsins/sysadmin_level1/blob/master/Task04_Git_and_Github/img/git3.png)

- Sau đó bạn dùng cat hay bất cứ lệnh nào hay cách nào để copy đoạn mã trong file id_rsa.pub và truy cập đường dẫn https://github.com/settings/ssh và chọn New SSH key để thêm key vào (bạn nhớ là đăng nhập vào tài khoản github trước).

![](https://github.com/hellsins/sysadmin_level1/blob/master/Task04_Git_and_Github/img/git4.png)

> Phần Title bạn ghi gì cũng được và phần key bạn paste đoạn mã lúc nãy vào. OK nhấn Add key

- Quay lại với terminal bạn có thể kiểm tra bằng cách đánh `ssh git@github.com` Nếu xuất hiện Hi username! You've successfully authenticated... thì chúc mừng bạn đã được liên kết với tài khoản github.

![](https://github.com/hellsins/sysadmin_level1/blob/master/Task04_Git_and_Github/img/git5.png)


Sau khi đã liên kết được với github ta sẽ đi qua một vài thao tác cơ bản để hoạt động trên github sau

<p name="ThaoTac"></p>
####  3. Các thao tác cơ bản sử dụng github

<p name="Tao"></p>
#### 3. 0 Tạo Một repo

- Bạn vào github và chọn Create repository và điền thông tin như hình

![](https://github.com/hellsins/sysadmin_level1/blob/master/Task04_Git_and_Github/img/git6.png)

<p name="Clone"></p>
####  3. 1 Clone

- Để clone một repo về ta có thể chọn __Clone or Download__ và nhấn Download Zip hoặc copy đường dẫn (bạn có thể chọn clone sử dụng SSH hoặc HTTP) và thực hiện với lệnh sau:

	> git clone `đường dẫn vừa copy`    ` thư mục chứa repo trên local `

- Ví vụ: 
	
	+ Clone SSH: git clone git@github.com:hellsins/hellsins.github.io.git ~/github

	+ Clone HTTP: git clone https://github.com/hellsins/hellsins.github.io.git  ~/github

	> Lưu ý bạn có thể không sử dụng ` thư mục chứa repo trên local ` và bạn sẽ clone repo đó về thư mục hiện tại (pwd) 

<p name="Add"></p>
####  3. 2 Add

- Để  thực hiện hành động `add` ta sử dụng lệnh sau:

	__git add "tên_file"__: 	dùng để `add` file chỉ định

	__git add *__ :		dùng để `add` tất cả

	__git add --all__	:	dùng để `add` tất cả

<p name="Remove"></p>	
####  3. 3 Remove	

- Để remove một thư mục hay một file nào đó bạn có thể xóa ở máy local sau đó add và commit lại là xong

- Nếu muốn xóa repo bạn vào repo đó trên server và chọn __Delete this repository__ ở phần Setting. Đọc warning và chọn yes...

<p name="Commit"></p>
####  3. 4 Commit 
	
- Để thực hiện hành động commit ta sử dụng lệnh sau:

	__git commit *__:	dùng để commit tất cả

	__git commit "tên_file" -m "thêm chú thích"__: 	dùng để thêm chú thích cho commit của mình

<p name="Push"></p>
####  3. 5 Push

- Sau khi commit thì tất cả đã lưu vào máy cục bộ và giờ thì chúng ta sẽ push lên server  với lệnh

	__git push -u origin master__:

	> Nhập passphrase nếu có

<p name="Pull"></p>
####  3. 6 Pull

- Hành động pull là hành động được thực hiện khi server có những thay đổi mà máy cục bộ vẫn chưa và giờ muốn cập nhật những thay đổi này. Ta dùng lệnh

	__git pull__: lưu ý vào đúng repo cần pull


<p name="Remove"></p>
#### 3. 7 Remote

- Việc remote được hiện khi bạn muốn add một máy chủ từ xa nào đó. Để thực hiện remote bạn làm như sau:

	> git remote add origin `'link repo'`

- Để liệt kê các remote mà bạn đã add thì có thể dùng lệnh 

	> git remote -v 


<p name="Fork"></p>
####  3. 8 Fork

- Tại một thời điểm ta muốn phân phối hay sử dụng một project hay repo của ai đó để bắt đầu và điều này nghĩa là ta sẽ Fork một repo về. Sau khi Fork về thì repo đó sẽ tồn tại trên github của chúng ta. Chúng ta có thể clone nó về máy local để bắt đầu sử dụng.

- Sau khi một repo được được clone, nó sẽ có một remote origin trỏ đến repo mà chúng ta đã Fork về chứ không phải là repo gốc. Để theo dõi repo gốc mà chúng ta đã Fork, chúng ta cần add một remote khác có tên là upstream:

	> git remote add upstream `link repo gốc`

	> git fetch upstream

<p name="Star"></p>
####  3. 9 Star

- Star một repo trong github như thể hiện cho việc repo này được nhiều người quan tâm, theo dõi. Đây cũng là cách để bạn tăng khả năng xuất hiện của repo mình trên github.

- Bạn có thể Star một repo bất kỳ và khi đó bạn có thể truy cập nhanh chóng và dể dàng theo dõi repo mà bạn quan tâm. Ngoài ra đây cũng là một sự đánh giá cho chủ nhân repo.

- Để thực hiện bạn chỉ cần nhấn vào Star trên repo đã chọn

<p name="Watch"></p>
####  3. 10 Watch

- Để thực hiện bạn chọn Watch trên repo mà bạn muốn và khi đó bạn sẽ nhận được thông báo cho các yêu cầu mới hay vấn đề gì xảy ra với repo đó.

<p name="Fetch"></p>
####  3. 11 Fetch

- Lệnh này sẽ truy cập vào dự án từ xa nào đó và cập nhật dữ liệu mà bạn chưa có trên repo đó. Sau khi Fetch xong bạn có thể tham chiếu đến toàn bộ các nhánh của dự án đó.

- Để thực hiện bạn sử dụng:

	> git fetch `tên remote`

	> Bạn có thể git fetch `upstream` như repo mà ta đã firk phía trên

<p name="KetLuan"></p>
#### 4 Kết luận

Trên đây mà cách cài đặt và sử dụng __cơ bản__ git và github. Bạn có thể tải và cài đặt git trên Windows và sử dụng bình thường.



