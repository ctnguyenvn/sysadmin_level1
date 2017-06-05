
### Graphical Interface

> Thực hiện: Nguyễn Công Trứ

> Cập nhật: 05/06/2017

### Mục lục

- [1. Graphical Desktop](#1)

***

<a name="1"></a>
### 1. Graphical Desktop

Trên hệ thống Linux, **X Window System** được nạp như là bước cuối cùng trong quá trình khởi động.

<p align="center"><img src="https://github.com/hellsins/sysadmin_level1/blob/master/Task43_Linux_Course_01_LFS101/Chapter_04/Images/1.png"></p>

Một service gọi là **display manager** theo dõi hiển thị được cung cấp, và tải **X server** (chương trình cung cấp các dịch vụ đồ họa cho các ứng dụng). **Display manager** xử lý thông tin đăng nhập đồ họa, và bắt đầu môi trường đồ họa thích hợp  sau khi người dùng đăng nhập

Một Desktop Environment là một môi trường bao gồm một session manager mà bắt đầu và duy trì các session đồ họa, các cửa sổ làm việc, kiểm soát và di chuyển chúng, các title-bars, các trình điều khiển,...

<p align="center"><img src="https://github.com/hellsins/sysadmin_level1/blob/master/Task43_Linux_Course_01_LFS101/Chapter_04/Images/2.png"></p>

Nếu **display manager ** không được bắt đầu một cách mặc định trong các runlevel, ta có thể bắt đầu với nhiều cách như chúng ta có thể chạy lệnh **startx** trên mô trường dòng lệnh để bắt đầu chế độ đồ họa.

Khi cài đặt Desktop Environment, Display Manager sẽ được bắt đầu ở cuối quá trình khởi động cho phép ta đăng nhập bằng giao diện đồ họa. Mặc định với Desktop Environment là GNOME thì Display Manager là **gdm**, Ubuntu là **lightdm** và KDE là **jdm**.


