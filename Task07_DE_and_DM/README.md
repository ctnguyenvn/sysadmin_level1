
### DE and DM

> Tài liệu: Tìm hiểu về Desktop Environment và Display Manager.

> Thực hiện: Nguyễn Công Trứ.

> Cập nhật: 11/10/2016.

### Mục lục

[1. Desktop Environment (DE).](#DE)

- [1.1 Giới thiệu.](#GioiThieuDE)

- [1.2 Một số DE thông dụng.](#ListDE)

[2. Display Manager (DM).](#DM)

- [2.1 Giới thiệu.](#GioiThieuDM)

- [2.2 Một số DM phổ biến.](#ListDM)

- [2.3 Enable Display Manager](#EnableDM)

---
<a name="DE"></a>
#### 1. Desktop Environment (DE).

<a name="GioiThieuDE"></a>
##### 1.1 Giới thiệu.

Một Desktop Environment là một môi trường máy tính cung cấp một giao diện đồ họa (GUI) hoàn chỉnh cho hệ thống bằng cách tích hợp các thành phần được viết bằng các công cụ widget phổ biến và thiết lập các thư viện.

Để hiểu rõ hơn về DE ta xem qua một số điểm sau:

- Một DE có thể kết hợp nhiều thành phần với nhau như các icon, thanh công cụ, hình nền, các tiện ích để cung cấp các yếu tố tạo nên một giao diện đồ họa cho người dùng. Ngoài ra, hầu hết các môi trường Desktop bao gồm tập hợp các ứng dụng tích hợp các tiện ích. Và tất nhiên các DE đều cung cấp trình quản lý của sổ riêng của họ.

- Người dùng có thể tự cấu hình môi trường GUI cho mình theo nhiều cách. Môi trường Desktop chỉ đơn giản cung cấp một phương tiện đầy đủ và thuận tiện của việc hoàn thành nhiệm vụ này. Tuy nhiên, người dùng có thể tự do kết hợp các ứng dụng từ nhiều DE khác nhau. Ví dụ người dùng xfce có thể cài đặt và sử dụng ứng dụng GNOME như gedit editer. Tuy nhiên nhược điểm của sự kết hợp này là nhiều ứng dụng được cung cấp bởi các dự án dự vào các thư viện riêng của họ mà các DE khác không có (hiểu đơn giản nó là độc quyền của họ). Kết quả một số người dùng hiểu rõ và tự cài đặt sẽ phải add thêm một loạt các gói phụ thuộc.

- Một điểm người lưu ý rằng tất nhiên những ứng dụng sẽ hoạt động tốt nhất trên chính DE của riêng mình. Bởi khi pha trộn các công cụ khác sẽ có thể gây ra nhiều lỗi hoặc các thay đổi (có thể là các biểu tượng sẽ thay đổi). Với một số người dùng quen thuộc thì khi sử dụng có thể gây nhầm lẫn trong môi trường kết hợp này như khi kích đúp chuột hoặc kéo thả sẽ khác nhau giữa 2 môi trường trên cũng 1 ứng dụng.

- Trước khi cài đặt DE cho OS của mình thì chúng ta cần cài đặt [Server X](https://wiki.archlinux.org/index.php/Xorg) (X hoặc X11). Có thể là Xorg hay Wayland tùy thuộc vào người dùng. Đây là một [hệ thống](https://vi.wikipedia.org/wiki/H%E1%BB%87_th%E1%BB%91ng_X_Window) cửa sổ dùng để hiển thị đồ họa bitmap. Nó cung ứng một bộ các công cụ và giao thức cho phép người dùng xây dựng các giao diện đồ họa (GUI) cho Unix và tựa Unix. Tóm lại cung cấp khuôn khổ cơ bản cho một môi trường GUi.

<a name="ListDE"></a>
##### 1.2 Một số DE thông dụng.

Đối với mỗi DE đều có các ứng dụng, tiện ích khác nhau. Và tất nhiên mỗi người thích mỗi kiểu, đơn giản có thể nó đẹp, nhẹ hay tùy nhu cầu của từng người mà họ có thể cài đặt DE thích hợpcho mình. Tuy nhiên chúng ta sẽ xem qua một vài DE thông dụng phổ biến (được hỗ trợ chính thức) sau.

- [Cinnamon](https://wiki.archlinux.org/index.php/cinnamon): là một DE dựa trên bộ công cụ GTK+3. Được phát hành năm 2011 và phát triển bởi Linux mint. Sau đó được sử dụng nhiều trên các bản phân phối khác. Phiên bản mới nhất là cinnamon 3.0 (phát hành 26/04/2016)

![](https://github.com/ctnguyenvn/sysadmin_level1/blob/master/Task07_DE_and_DM/img/cinnamon.jpg)

- [Gnome](https://wiki.archlinux.org/index.php/GNOME): được lập trình bởi C và được hỗ trợ từ nhiều công ty lớn như Red Hat, Novell, HP,... là một DE mã nguồn mở, tự do, dể dùng, dể sử dụng và phổ biến hiện nay với các end-user

![](https://github.com/ctnguyenvn/sysadmin_level1/blob/master/Task07_DE_and_DM/img/gnome.jpg)

- [KDE](https://wiki.archlinux.org/index.php/KDE): Đây cũng là một DE phổ biến hiện nay, được viết ra với mục đích tạo ra môi trường làm việc dể dàng, đơn giản và được sử dụng trên rất nhiều bản phân phổi như openSUSE, Kubuntu, Manjaro linux,...

![](https://github.com/ctnguyenvn/sysadmin_level1/blob/master/Task07_DE_and_DM/img/kde.png)

- [LXDE](https://wiki.archlinux.org/index.php/LXDE) (Lightweight X11 Desktop Environment): là một môi trường máy tính miễn phí thích hợp với các máy tính có cấu hình phần cứng yếu. Ưu điểm của nó là nhẹ và nhanh. Được phát triển trên nhiều phiên bản khác nhau như Ubuntu, Debian...

![](https://github.com/ctnguyenvn/sysadmin_level1/blob/master/Task07_DE_and_DM/img/lxde.png)

- [MATE](https://wiki.archlinux.org/index.php/MATE): Đây là sự tiếp nối của GNOME 2. Nó cung cấp môi trường Desktop  trực quan và khá hập dẫn. MATE đang được phát triển để hỗ trợ thêm cho các công nghệ mới, tuy nhiên nó vẫn giữ một Desktop truyền thống.

![](https://github.com/ctnguyenvn/sysadmin_level1/blob/master/Task07_DE_and_DM/img/mate.jpg)

- [XFCE](https://wiki.archlinux.org/index.php/xfce): Giống như LXDE thì XFCE cũng được tạo ra là một DE miễn phí cho các nền tảng Unix và tương tự Unix như Linux, Solaris, BSD. Ưư điểm nhanh, nhẹ, đơn giản và dể dùng. Sử dụng GTK+ 2 với cửa sổ XFwm

![](https://github.com/ctnguyenvn/sysadmin_level1/blob/master/Task07_DE_and_DM/img/xfce.jpg)

Ngoài ra còn các DE không được hỗ trợ chính thức bạn có thể xem thêm tại [đây](https://wiki.archlinux.org/index.php/desktop_environment#Unofficially_supported)

<a name="DM"></a>
#### 2. Display Manager (DM).

<a name="GioiThieuDM"></a>
##### 2.1 Giới thiệu.

Desktop Manager là một trình quản lý login, quản lý đăng nhập người dùng. Tiến trình này được hoạt động và hiển thị sau khi người dùng boot vào hệ thống. Thường thì mỗi DE sẽ tích hợp sẵn DM cho distro của mình. Tuy nhiên bạn có thể cài đặt và sử dụng các DM khác tùy thích.

<a name="ListDM"></a>
##### 2.2 Một số DM phổ biến.

- Sử dụng console

	+ [CDM](https://wiki.archlinux.org/index.php/CDM): là một DM đơn giản nhưng cũng đầy đủ tính năng. Được thiết kế cung cấp một hệ thống đăng nhập mà không phụ thuộc vào hay cần thiết vào hệ thống X Window. Tuy nhiên CDM không dành cho mọi người (người mới).

	![](https://github.com/ctnguyenvn/sysadmin_level1/blob/master/Task07_DE_and_DM/img/cdm.jpg)


	+ [Console TDM](https://wiki.archlinux.org/index.php/Console_TDM): Đây là một phát triển dựa trên xorg-xinit. Nó lấy cảm hứng từ CDM, mà nhằm để được một sự thay thế cho GDM.

	+ [nodm](https://wiki.archlinux.org/index.php/Nodm): là một trình quản lý hiển thị tự động bắt đầu một phiên X lúc khởi động hệ thống.

- Sử dụng Graphical

	+ [GDM](https://wiki.archlinux.org/index.php/GDM) (Gnome Display Manager): laf chương trình quản lýmasy chủ cho phép người dùng đăng nhập với hiển thị đồ họa cho hệ thống X11 và Wayland. Cho phép người dùng tùy chỉnh hoặc khắc phục sự cố các thiết lập mà không cần phải nhờ đến dòng lệnh. Người dùng cũng có thể chọn phiên bản phù hợp với mình

	![](https://github.com/ctnguyenvn/sysadmin_level1/blob/master/Task07_DE_and_DM/img/gdm.png)

	+ [KDM](https://wiki.archlinux.org/index.php/KDM) (KDE Display Manager): là trình quản lý đăng nhập KDE. Nó hỗ trợ các theme, lựa chọn session và nhiều tính năng khác và tự động đăng nhập như KDM tự động hiển thị danh sách user cho người dùng khi đăng nhập...

	![](https://github.com/ctnguyenvn/sysadmin_level1/blob/master/Task07_DE_and_DM/img/kdm.png)

	+ [LightDM](https://wiki.archlinux.org/index.php/LightDM): Đây là một DM phổ biến trên Desktop được nhiều người dùng với các tính năng như sau

		- Hỗ trợ nhiều nền tảng Desktop khác nhau

		- Hỗ trợ nhiều công nghệ hiển thị khác nhau

		- Nhẹ vì sử dụng ít bộ nhớ và hiệu suất cao

		- Có hỗ trợ session khách (Guest)

		- Hỗ trợ đăng nhập từ xa

		- Bộ kiểm tra toàn diện

	![](https://github.com/ctnguyenvn/sysadmin_level1/blob/master/Task07_DE_and_DM/img/LightDM.png)

	+ [LXDM](https://wiki.archlinux.org/index.php/LXDM): Là trình quản lý login cho môi trường LXDE. Các giao diện người dùng với GTK+ 2.

	![](https://github.com/ctnguyenvn/sysadmin_level1/blob/master/Task07_DE_and_DM/img/lxdm.png)

	+ [SLIM](https://wiki.archlinux.org/index.php/SLiM) (Simple LogIn Manager): Trọng lượng nhẹ, đơn giản, hướng tới các môi trường như xfce, Openbox, Fluxbox là ưu điểm của Slim.

	![](https://github.com/ctnguyenvn/sysadmin_level1/blob/master/Task07_DE_and_DM/img/slim.png)

	> Lưu ý hiện nay dự án Slim đã ngừng phát triển. Tuy nhiên bạn vẫn có thể cài đặt sử dụng.

<a name="EnableDM"></a>
##### 2.3 Enable Display Manager

Để enable một DM cho phép đăng nhập bằng giao diện đồ họa như slim, ta kích hoạt server cho phép khởi động slim sau khi boot vào hệ thống. Ví dụ với slim sau khi cài đặt ta dùng systemctl để kích hoạt server như sau

$__systemctl enable slim.server__

Chúng ta có thể xem tình trạng của phiên người dùng đang hoạt động với __loginctl__ như sau

![](https://github.com/ctnguyenvn/sysadmin_level1/blob/master/Task07_DE_and_DM/img/usingslim.png)