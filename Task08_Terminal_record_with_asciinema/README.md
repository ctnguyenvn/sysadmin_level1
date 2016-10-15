
### Terminal record with asciinema 

> Tài liệu: Tìm hiểu về asciinema

> Thực hiện: Nguyễn Công Trứ

> Cập nhật: 13/10/2016

### Mục lục:

[1. Giới thiệu và hoạt động của asciinema](#GioiThieu)

[2. Bắt đầu record](#BatDau)

- [2.1Record](#Redcord)

- [2.2Quản lí các tùy chọn rec](#QuanLi)

[3. Cài đặt](#CaiDat)

[4. Sử dụng](#SuDung)

- [4.1 Rec](#Rec)

- [4.2 Play](#Play)

- [4.3 Upload](#Upload)

- [4.4 Auth](#Auth)

[5. Demo với cài đặt ibus-bogo](#Demo)

---

<a name="GioiThieu" =""></a>
### 1. Giới thiệu và hoạt động của asciinema

Dự án được xây dựng với:

- Cửa sổ dòng lệnh được sử dụng với asciinema

- Website APi tại trang [asciinema.org](https://asciinema.org/)

- Sử dụng javascript để chơi video

Asciinema là phần mềm ghi lại quá trình hoạt động của cửa số terminal. Khi bắt đầu rec, quá trình ghi lại màn hình bắt đầu, nó ghi lại tất cả output của terminal. Với asciinema quá trình làm việc rất đơn giản gồm recording và playback:

- __Recdording__: 
	
	+ Có lẽ bạn biết các lệnh _ssh_, _screen_, _script_,... Và thực tế asciinema được lấy cảm hứng từ các _script_. Những gì bạn có thể không biết là tất cả họ đều sử dụng hệ thống UNIX: [a pseudo-terminal](https://en.wikipedia.org/wiki/Pseudoterminal). 

	+ Quá trình này đơn giản là một thiết bị đầu cuối (terminal) giả được thiết lập mô phỏng lại quá trình hoạt động của terminal. Vai trò của quá trình mô phòng nảy là tương tác với người dùng, để lấy dữ liệu đầu vào và giả làm chủ sử dụng shell, sau đó trả kết quả ra màn hình theo các input shell
	
	+ Nói cách khác,  thiết bị đầu cuối giả này hoạt động như một trung gian giữa người dùng, cửa sổ terminal và shell. Nó cho phép chụp lại toàn bộ quá trình các input của cửa sổ dòng này hiện tại

	+ Tóm lại quá trình rec của asciinema là quá trình chụp lại toàn bộ tất cả những gì hoạt động của 1 terminal và lưu chúng vào bộ nhớ (kèm theo thời gian) mà không thay đổi bất cứ điều gì được ghi lại từ cửa sổ dòng lệnh. khi kết thúc sẽ được upload lên asciinema.org với format asciicast.

- __Playback__: Quá trình rec thực chất là quá trình ghi lại theo chuỗi dài và tất nhiên chúng ta không thể chơi mà không có trình giải mã ANSI  để hiển thị chính xác những thay đổi màu sắc, di chuyển chuột và in văn bản lên màn hình đúng như ban đầu. ANSI này tương thích với hầu hết các thiết bị đầu cuối hiện nay như xterm, Gnome Terminal, iTerm,...Kết quả là ta được một _ảnh động_ như lúc rec được.

<a name="BatDau" =""></a>
### 2. Bắt đầu record

<a name="Record" =""></a>
#### 2.1 Record.

- Để bắt đầu rec ta sử dụng

	`asciinema rec`

> Quá trình sẽ dừng lại nếu nhấn `exit` hoặc Ctrl-D.

<a name="QuanLi" =""></a>
#### 2.2 Quản lí các tùy chọn rec

- Nếu bạn muốn quản lý tất cả các rec của mình trên asciinema.org(set title/description, delete etc) bạn cần xác thực với lệnh sau trên terminal

	`asciinema auth`

> Bạn có thể chạy lệnh này sau và tất cả các asciicasts ghi nhận trước đó sẽ được tự động gán cho hồ sơ của bạn.

<a name="CaiDat" =""></a>
### 3. Cài đặt

asciinema có sẵn trên PyPI và bạn có thể cài nó với pip (yêu cầu python3)

- `sudo pip3 install asciinema`

Bạn cũng có thể cài từ repo của các distro của mình như sau

- Arch Linux

	+ `yaourt -S asciinema`

- Debian

	+ `sudo apt-get install asciinema`

- Fedora (>=22)

	+ `sudo dnf install asciinema`

- FreeBSD

	+ `cd /usr/ports/textproc/asciinema && make install`

	+ `pkg install asciinema`

- Gentoo Linux

	+ `emerge -av asciinema`

- NixOS/Nix

	+ `nix-env -i go1.4-asciinema`
- OS X

	+ `brew update && brew install asciinema`

- Ubuntu

	+ `sudo apt-add-repository ppa:zanchey/asciinema` 

	+ `sudo apt-get update`

	+ `sudo apt-get install asciinema`

<a name="SuDung" =""></a>
### 4. Sử dụng

asciinema khá đơn giản để sử dụng. Bạn có thể nhấn asciinema mà không có tham số gì phía sau để hiện tất cả các option.

<a name="Rec" =""></a>
#### 4.1 Rec 

Đây là công việc quan trọng nhất trong quá trình này. Để bắt đầu quá trình ghi lại màn hình cửa sổ dòng lệnh ta sử dụng

- `asciinema rec [filename]`

> Quá trình dừng lại khi nhấn exit hoặc Ctrl + D

> nếu quá không có tham số filename thì sau khi kết thúc sẽ upload thẳng lên website asciinema.org 

Ta có thể thêm ASCIINEMA_REC = 1 vào .bashrc hoặc .zshrc để thêm biến môi trường. Điều này có thể thay đổi 1 số thứ khi bắt đầu rec như con trỏ lệnh, dấu nhắc...

Ta có 1 số option sau

- `-c`: Chỉ định lệnh để rec (mặc định là $SHELL)

- `-t`: Xác định tiêu đề của asciicast

- `-w`: số giây tối đa bỏ qua ghi nếu không input gì từ terminal

- `-y`: chọn yes cho tất cả các dấu nhắc

- `-q`: chặn tất cả các thông báo/cảnh báo

<a name="Play" =""></a>
#### 4.2 Play

Quá tình chơi có thể chơi trực tiếp tại

- Máy local của bạn với lệnh sau

	+ `asciinema play [filename]`

- Từ URL trang web

	+ `asciinema play http://example.com/demo.json`

- Từ các URL trang asciicast 

	+ `asciinema play http://example.com/blog/post.html`

- Từ stdin

	+ `cat /path/to/asciicast.json | asciinema play -`

	+ `ssh user@host cat asciicast.json | asciinema play -`

- Từ ÌPS

	+ `asciinema play ipfs:/ipfs/QmcdXYJp6e4zNuimuGeWPwNMHQdxuqWmKx7NhZofQ1nw2V`

	+ `asciinema play fs:/ipfs/QmcdXYJp6e4zNuimuGeWPwNMHQdxuqWmKx7NhZofQ1nw2V`

<a name="Upload" =""></a>
#### 4.3 Upload

Bạn có thể edit để sửa file vừa ghi với notepad++ hay sublime tùy thích sau đó sử dụng lệnh sau để upload lên asciinema.org (chúng ta có thể sử dụng về sau)

- `asciinema upload [filename]`

Hoặc chúng ta có thể kết hợp cả 3 quá trình để edit và upload 1 lần với lệnh sau

- `asciinema rec filename + asciinema play [filename] + asciinema upload [filename]`

<a name="Auth" =""></a>
#### 4.4 Auth

Như đã nói ở trên, nếu bạn muốn quản lý kết quả các lần rec của mình thì cần xác thực. 

- `asciinema auth`

Lệnh này hiển thị các URL và bạn mở nó với trình duyệt. Trên mỗi máy tính chạy asciinema rec sẽ có một token APi duy nhất. Khi bạn login vào trang web asciinema.org và chạy asciinema trên máy tính mới thì nó sẽ liên kết máy tính mới này với tài khoản của bạn. Bạn cũng có thể đồng bộ tất cả cấu hình lên máy của mình. Bạn có thể gán thẻ mới vào tài khoản của mình từ nhiều máy khác nhau

<a name="Demo" =""></a>
### 5. Demo với cài đặt ibus-bogo

Bạn có thể tạo sử dụng lệnh như trên để bắt đầu việc rec

- `asciinema rec`

https://asciinema.org/a/ahjkfdsliqyvy0vskq3s8ma0k

> Lưu ý: Bạn nên tạo file để bắt đầu rec hoặc sử dụng trực tiếp khi rec để có thể chỉnh sửa sau đó và có thể upload sau

> asciinema rec filename.json


