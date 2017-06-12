
### Processes

> Thực hiện: Nguyễn Công Trứ

> Cập nhật: 12/06/2017

### Mục lục

- [1. Introduction to Processes and Process Attributes](#1)


- [2. Process Metrics and Process Control](#2)


- [3. Listing Processes: ps and top](#3)


- [4. Starting Processes in the Future](#4)

***


<a name="1"></a>
### 1.  Introduction to Processes and Process Attributes

#### What Is a Process?

Một process đơn giản là thể hiện của một task (thread) thực thi trên hệ thống. Nó không phải như một chương trình hoặc một lệnh; một chương trình duy nhất có thể chạy nhiều process cùng một lúc. Một số process là độc lập với nhau và với các process khác. Một process die có thể hoặc không thể ảnh hưởng đến những process khác đang chạy trên hệ thống. 

Processes sử dụng nhiều tài nguyên hệ thống, chẳng hạn như bộ nhớ, CPU (Central Processing Unit), và các thiết bị ngoại vi như máy in và hiển thị. Hệ điều hành (đặc biệt là kernel) có trách nhiệm phân chia đúng đắn các tài nguyên để đảm bảo hệ thống ổn định và tối ưu

#### Process Types

Một số loại process

|Process Type|Description|Example|
|---|---|---|
|Interactive Processes|Cần được bắt đầu bởi một người có thể qua dòng lệnh hoặc một biểu tượng đồ họa trên thanh menu|bash, firefox, top|
|Batch Processes|processes tự động được thiết lập trước và sau khi ngắt kết nối từ terminal. Những processes này đang xếp ở hàng đợi và làm việc trên cơ sở FIFO (First In First Out)|updatedb|
|Daemons|Những processes server chạy liên tục, User có thể thiết lập để bắt đầu với hệ thống hoặc start khi sử dụng|httpd, xinetd, sshd|
|Threads|Thread xem như là process nhỏ, là những task chạy dưới một process chính, chia sẻ bộ nhớ và các nguồn khác, nhưng được lên kế hoạch và điều hành bởi hệ thống trên cơ sở cá nhân. Một Thread có thể kết thúc mà không chấm dứt toàn bộ process và một process có thể khởi tạo một Thread bất cứ lúc nào. Nhiều chương trình có thể chạy multi-thread.|firefox, gnome-terminal-server|
|Kernel Threads|Nhiệm vụ kernel mà người dùng không start cũng không stop và có ít quyền kiểm soát|kthreadd, migration, ksoftirqd|

#### Process Scheduling and States

Một chức năng quan trọng của kernel gọi à scheduler hay là lập lịch tiến trình.

<p align="center"><img src="https://github.com/hellsins/sysadmin_level1/blob/master/Task43_Linux_Course_01_LFS101/Chapter_09/Images/1.png"></p>

Khi một quá trình hoặc đang trong trạng thái chạy, nghĩa là nó đang thực hiện bởi CPU, hoặc trạng thái chờ nghĩa là nó đang đợi được cấp phép thời gian để có thể thực thi. Tất cả các tiến trình này năm trong một nơi gọi là hàng đợi (run queue)

Tuy nhiên, đôi khi process rơi vào trạng thái sleep, nói chung là khi chúng đang chờ đợi điều gì đó xảy ra trước khi nó có thể tiếp tục. Trong điều kiện này, một quá trình được đặt trên một wait queue. 

Có một số tiến trình đặc biệt, đặc biệt là khi nó đã stop. Ví dụ khi một process con hoàn tất nhưng các tiến trình cha vẫn chưa được thông báo về trạng thái này, process như vậy gọi là **zombie**. Nó không thực sống nhưng vẫn hiển thị trên danh sách các process

<p align="center"><img src="https://github.com/hellsins/sysadmin_level1/blob/master/Task43_Linux_Course_01_LFS101/Chapter_08/Images/2.png"></p>

#### Process and Thread IDs

Tại bất kỳ thời điểm nào trên hệ thống thì luôn có nhiều tiến trình chạy, do đó hệ thống sẽ phân biệt chúng bằng cách gán mỗi tiến trình vào một process ID (PID). PID được sử dụng để theo dõi tình trạng xử lý, sử dụng CPU, sử dụng bộ nhớ, chính xác nơi thực thi, và các đặc điểm khác. 

Một PID được tạo ra và luôn được đánh số theo thứ tự tăng dần. Do đó PID 1 tương ứng với process **init**. Lưu ý phổ biến nhất là PID (Process ID) và TID (Thread ID). Nếu là một tiến trình đơn luồng thì TID sẽ trùng với PID nhưng nếu là đa luồn thì mỗi Thread có PID giống nhau nhưng sẽ có TID riêng của mình

#### Terminating A Process

Để kill một process ta cần biết PID của nó và sử dụng lệnh **kill -SIGKILL <pid >** hoặc **kill -9 <pid>**

> Lưu ý: chỉ có thể kill các tiến trình thuộc sở hữu của mình. Nếu muốn kill các tiến trình của user khác hoặc của hệ thống thì cần quyôt`root`

#### User and Group IDs

Nhiều người dùng có thể truy cập vào một hệ thống cùng một lúc, và mỗi người dùng có thể chạy nhiều tiến trình. Hệ điều hành nhận dạng người dùng bắt đầu tiến trình bằng cách gán Real User ID (RUID) cho người dùng. 

Người xác định các quyền truy cập cho người sử dụng được xác định bởi các Effective UID (euid). Các euid có thể giống hoặc không giống RUID. 

Người dùng có thể được phân loại thành các nhóm khác nhau. Mỗi nhóm được xác định bởi Real Group ID (RGID). Quyền truy cập của nhóm được xác định bởi Effective Group ID (EGID). Mỗi người sử dụng có thể là một thành viên của một hoặc nhiều nhóm. 

<p align="center"><img src="https://github.com/hellsins/sysadmin_level1/blob/master/Task43_Linux_Course_01_LFS101/Chapter_08/Images/3.png"></p>

#### Priorities

<p align="center"><img src="https://github.com/hellsins/sysadmin_level1/blob/master/Task43_Linux_Course_01_LFS101/Chapter_08/Images/4.png"></p>

Tại bất kỳ thời điểm nào, nhiều quá trình đang chạy (nghĩa là trong hàng đợi chạy) trên hệ thống. Tuy nhiên, một CPU thực sự chỉ có thể chứa một nhiệm vụ một lúc. Một số tiến trình quan trọng hơn những tiến trình khác, vì vậy Linux cho phép thiết lập và vận dụng độ ưu tiên process.

Độ ưu tiên của một process được đặt bằng một giá trị value. Value càng thấp thì độ ưu tiên càng cao. Value thấp nhất là -20 và cao nhất là 19

<a name="2"></a>
### 2.  Process Metrics and Process Control

#### Load Averages

Load averages là số trung bình của load number cho một thời gian nhất định. Nó đưa vào các account process như 

- Active (chạy trong CPU)

- Consider runable (nhưng đợi CPU để sẵn sàng)

- Sleep

> Lưu ý: Không giống với Unix, Linux liệt kê cả các process sleep

Ta có thể sử dụng lệnh **w**, **top** hoặc **uptime** để xem chúng.

Xem load averages với lệnh trên

<p align="center"><img src="https://github.com/hellsins/sysadmin_level1/blob/master/Task43_Linux_Course_01_LFS101/Chapter_08/Images/5.png"></p>

- Hiệu suất 1 phút trước của hệ thống là 48% 

- Hiệu suất 5 phút trước của hệ thống là 53% 

- Hiệu suất 15 phút trước của hệ thống là 72% 

#### Background and Foreground Processes

Linux hỗ trợ nền và xử lý công việc gọi là foreground. Việc Foreground chạy trực tiếp từ  terminal, và khi một công việc foreground đang chạy, các công việc khác cần phải chờ đợi để truy cập shell cho đến khi nó được hoàn thành. Điều này tốt khi công việc hoàn thành một cách nhanh chóng. Nhưng điều này có thể có ảnh hưởng xấu nếu công việc hiện tại sẽ mất một thời gian dài (thậm chí vài giờ) để hoàn thành. 

Trong những trường hợp như vậy, bạn có thể chạy các công việc ở chế độ background và thoát khỏi shell để thực hiện các nhiệm vụ khác. Theo mặc định, tất cả các công việc được thực hiện ở ở trên cửa sổ hiện tại. Bạn có thể đặt một công việc trong background bằng cách sử dụng `&` cho lệnh, ví dụ: updatedb & 

Bạn có thể sử dụng tổ hợp phím CTRL-Z để đình chỉ một công việc foreground hoặc CTRL-C để chấm dứt một công việc foreground và luôn luôn có thể sử dụng lệnh **bg** và **fg** để chạy lại một tiến trình background và foreground tương ứng.

Lệnh **jobss** sẽ hiển thị các công việc hiện tại đang thực thi. Trong đó có cả PID cho những tiến trình background

<a name="3"></a>
### 3. Listing Processes: ps and top

<a name="4"></a>
### 4. Starting Processes in the Future
