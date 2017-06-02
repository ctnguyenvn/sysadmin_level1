
###  Linux Philosophy and Concepts

> Thực hiện: Nguyễn Công Trứ

> Cập nhật: 02/06/2017

***

- Linux vay mượn rất nhiều từ Unix, vì nó được viết là 1 phiên bản mã nguồn mở miễ phí của Unix. 

- Tập tin được lưu trữ trên 1 hệ thông phân cấp mà cấp cao nhất là `root` hay `/`, Mọi thứ được xem như tập tin.

- Linux là hệ điều hành multitasking (đa nhiệm), hệ thống đa người dùng, với quá trình kết nối mạng và tích hợp dịch vụ gọi mà `daemon` trong Unix.

- Một số thuật ngữ:

	+ Kernel: Được coi là bộ não của máy tính, cầu nỗi giữa phần cứng và các ứng dụng. Ví dụ như Linux

	+ Distribution: Hay còn gọi là distros là 1 tập hợp các chương trình kết hợp với kernel để tạo nên 1 hệ điều hành. Ví dụ như Red Hat Enterprise Linux, Fedora, Ubuntu và Gentoo.

	+ Boot loader: Là chương trình khởi động hệ điều hành. Ví dụ như GRUB và ISOLINUX

	+ Service: Là chương trình chạy dưới dạng một background process. Ví dụ như httpd, nfsd, ntpd, ftpd và named

	+ Filesystem: Là phương thức lưu trữ và tổ chức hệ thống tập tin trong Linux.

	+ X Window System: Cung cấp bộ công cụ chuẩn và giao thức để xây dựng các giao diện người dùng đồ họa trên hầu hết các hệ thống Linux.

	+ Desktop environment: Là một giao diện đồ họa người dùng trên đầu trang của hệ điều hành. Ví dụ như GNOME, KDE, Xfce và Fluxbox

	+ Command line: Là giao diện để đánh lệnh trên hệ điều hành

	+ Shell: Là trình biên dịch dòng lệnh để xử lý đầu vào của lệnh và chỉ thị hệ điều hành thực hiện tác vụ cần thiết. Ví dụ về shell như bash, tcsh và zsh

- Linux Distribution

	![](/home/sins/MEGA/sysadmin_level1/Task43_Linux_Course_01_LFS101/Chapter_02/Images/1.png)


	+ Như hình minh họa trên thì một bản phân phối Linux đầy đủ bao gồm các kernel cộng với một số công cụ phần mềm khác cho các hoạt động liên quan đến file, quản lý người dùng và quản lý gói phần mềm. 

	+ Mỗi một công cụ cung cấp một phần nhỏ của hệ thống hoàn chỉnh. Mỗi công cụ thường theo dự án riêng của mình, với các nhà phát triển riêng làm việc để hoàn thiện từng phần của hệ thống.

- Dịch vụ gắn với bản phân phối (distributions)

	![](/home/sins/MEGA/sysadmin_level1/Task43_Linux_Course_01_LFS101/Chapter_02/Images/2.png)


	+ Sự đa dạng của các bản phân phối được tạo ra cho tất cả mọi người, tùy theo nhu cầu và công việc, giải trí... Tuy nhiên, các tổ chức lớn như các công ty và tổ chức chính phủ thường có xu hướng sử dụng các bản phân phối thương mại như Red Hat, SUSE và Canonical (Ubuntu)

	+ Ubuntu và Fedora được phổ biến trong lĩnh vực giáo dục

	+ Nhiều nhà phân phối thương mại, bao gồm Red Hat, Ubuntu, SUSE, và Oracle, cung cấp hỗ trợ thu phí dài hạn cho các bản phân phối của họ, cũng như phần cứng và phần mềm. Tất cả các nhà phân phối lớn cung cấp dịch vụ cập nhật để giữ cho hệ thống của bạn tốt nhất với các bản cập nhật bảo mật và vá lỗi mới nhất, và cải tiến hiệu suất, cũng như cung cấp các nguồn lực hỗ trợ trực tuyến.