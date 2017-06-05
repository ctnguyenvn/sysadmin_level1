
### System Configuration from the Graphical Interface

> Thực hiện: Nguyễn Công Trứ

> Cập nhật: 05/06/2017

***

- Trên Linux, có thể cấu hình các tùy chọn và các thiết lập cơ bản thông qua **System Settings**

- Linux luôn luôn sử dụng UTC quốc tế cho đồng bộ thời gian lưu giữ riêng của mình. Ta có thể đặt Date and Time Settings từ cửa sổ System Settings. 

- __NTP__ (Network Time Protocol) là giao thức phổ biến nhất và đáng tin cậy cho việc thiết lập thời gian địa phương thông qua các máy chủ Internet.

- Cửa sổ **Displays** cho phép thay đổi độ phân giải của màn hình và cấu hình nhiều màn hình. 

- **Network Manager** có thể xem các mạng không dây có sẵn, cho phép lựa chọn một mạng wireless hoặc mobile, quản lý mật khẩu, và thiết lập VPN...

- Dpkg và RPM là hệ thống quản lý gói phổ biến nhất được sử dụng trên các bản phân phối Linux. 

- Các bản phân phối Debian sử dụng dpkg và tiện ích apt-dựa cho quản lý gói. 

- RPM được phát triển bởi Red Hat, và được thông qua bởi một số bản phân phối  khác, bao gồm openSUSE, Mandriva, CentOS, Oracle Linux...

- Nền tảng Debian: Sử dụng **dpkg** để quản lý các package, cài đặt, xóa, built các package sẵn có. Tuy nhiên **dpkg** không thể tự động tải và cài đặt các package một cách online. Do đó **apt (Advanced Package Tool)** được tạo ra để làm việc này. Với mỗi distro dựa theo Debian thì sẽ có các hệ thống quản lý gói hỗ trợ riêng cho mình (mặc dù vẫn có apt) như **apt-get, aptitude, synaptic, Ubuntu Software Center, Update Manager**... Và tất nhiên kho package của apt vẫn là lớn nhất.

- Red Hat Package Manager (RPM) là khác hệ thống quản lý gói phổ biến khác trên các bản phân phối Linux. Nó được phát triển bởi Red Hat, và được thông qua bởi một số bản phân phối khác, bao gồm openSUSE, Mandriva, CentOS, Oracle Linux... Tương tự như **apt** thì ở nền tảng fedora như Red Hat sử dụng **yum**.

- Tương tự openSUSE sử dụng **YaST (Yet another Setup Tool) Software Manager** và **RPM** cho hệ thống của mình.