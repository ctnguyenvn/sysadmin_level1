
### Processes

> Thực hiện: Nguyễn Công Trứ

> Cập nhật: 16/06/2017

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

<p align="center"><img src="https://github.com/ctnguyenvn/sysadmin_level1/blob/master/Task43_Linux_Course_01_LFS101/Chapter_09/Images/1.png"></p>

Khi một quá trình hoặc đang trong trạng thái chạy, nghĩa là nó đang thực hiện bởi CPU, hoặc trạng thái chờ nghĩa là nó đang đợi được cấp phép thời gian để có thể thực thi. Tất cả các tiến trình này năm trong một nơi gọi là hàng đợi (run queue)

Tuy nhiên, đôi khi process rơi vào trạng thái sleep, nói chung là khi chúng đang chờ đợi điều gì đó xảy ra trước khi nó có thể tiếp tục. Trong điều kiện này, một quá trình được đặt trên một wait queue. 

Có một số tiến trình đặc biệt, đặc biệt là khi nó đã stop. Ví dụ khi một process con hoàn tất nhưng các tiến trình cha vẫn chưa được thông báo về trạng thái này, process như vậy gọi là **zombie**. Nó không thực sống nhưng vẫn hiển thị trên danh sách các process

<p align="center"><img src="https://github.com/ctnguyenvn/sysadmin_level1/blob/master/Task43_Linux_Course_01_LFS101/Chapter_09/Images/2.png"></p>

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

<p align="center"><img src="https://github.com/ctnguyenvn/sysadmin_level1/blob/master/Task43_Linux_Course_01_LFS101/Chapter_09/Images/3.png"></p>

#### Priorities

<p align="center"><img src="https://github.com/ctnguyenvn/sysadmin_level1/blob/master/Task43_Linux_Course_01_LFS101/Chapter_09/Images/4.png"></p>

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

<p align="center"><img src="https://github.com/ctnguyenvn/sysadmin_level1/blob/master/Task43_Linux_Course_01_LFS101/Chapter_09/Images/5.png"></p>

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

**ps** (system V) cung cấp thông tin về các tiếng trình đang chạy hiện tại qua PID. Nếu muốn update trạng thái này ta có thể sử dụng **top** hoặc **htop**, **atop**. Từ CLI ta có thể thấy như giao diện đồ họa. **ps** có nhiều option cho phép xác định các thông tin hiển thị đầu ra hữu ích.

Nếu không có tham số truyền vào, mặc định **ps** sẽ hiển thị tất cả các tiến trình hiện tại. Sử dụng **-u** để chỉ đích danh của user bất kỳ, hoặc **-ef** để hiển thị tất cả thông tin về tiến trình.

Ngoài ra đối với hệ thống BSD của Unix, sẽ có option đặc biệt là không có dấu **-**. Ví dụ như **ps aux** hoặc **ps axo**.

**pstree** cho phép hiển thi các tiến trình đang chạy với sơ đồ cây

Với **ps** ta chỉ xem trạng thái hiện tại của các tiến trình, tuy nhiên như đã nói ở trên **top** sẽ cho ta xem quá trình trực tiếp của các process trong quá trình chúng running

<p align="center"><img src="https://github.com/ctnguyenvn/sysadmin_level1/blob/master/Task43_Linux_Course_01_LFS101/Chapter_09/Images/6.png"></p>

Dòng đầu tiên cho ta biết 

- Hệ thống start lúc nào và đã run được bao lâu

- Có bao nhiêu user đang logged on

- load average (tải trung bình)

Dòng thứ hai của kết quả đầu ra hiển thị tổng số tiến trình, số tiến trình running, sleep, stop và zombie

Dòng thứ ba của đầu ra cho biết thời gian CPU được chia ra như thế nào giữa người dùng (us) và kernel (sy) bằng cách hiển thị tỷ lệ phần trăm thời gian của CPU được sử dụng.

Phần trăm của các công việc người dùng chạy ở mức ưu tiên thấp hơn (nice - ni). Chế độ *nhàn rỗi* (id) thấp nếu tải trung bình cao và ngược lại. Phần trăm công việc chờ đợi (wa). Ngắt bao gồm phần trăm phần cứng (hi) so với ngắt phần mềm (si). steal time (st) thường được sử dụng với các máy ảo, trong đó có một số thời gian id của CPU được thực hiện cho các mục đích sử dụng khác.

Dòng 4 và 5 đều hiển thị thông tin tổng bộ nhớ, đã sử dụng bao nhiêu và còn trống bao nhiêu. Tuy nhiên đối với dòng 4 thì hiển thi cho bộ nhớ vật lý (RAM) còn dòng 5 thì cho bộ nhớ swap. Trên linux, khi bộ nhớ vật lý (RAM) full thì hệ thống sẽ được chuyển sang sử dụng bộ nhớ swap (tốc độ chậm hơn RAM rất nhiều) một cách liên tục

Dòng cuối cùng là hiển thị danh sách các tiến trình (mặc định sẽ xếp theo lượng CPU từ cao đến thấp) với ý nhĩa từng cột như sau

- Process Identification Number (PID)

- Process owner (USER)

- Priority (PR) and nice values (NI)

- Virtual (VIRT), physical (RES), and shared memory (SHR)

- Status (S)

- Percentage of CPU (%CPU) and memory (%MEM) used

- Execution time (TIME+)

- Command (COMMAND).

Khi sử dụng top với giao diện console ta có thể sử dụng các key sau 

- t : Hiển thị hoặc ẩn thông tin dòng 2 và 3

- m :  Hiển thị hoặc ẩn thông tin dòng 4 và 5

- A : Sắp xếp các tiến trình

- r : Thay đổi priority của các process cụ thể

- k : kill một tiến trình cụ thể

- f : Configure trên màn hình (terminal)

- o : Chọn thứ tự sắp xếp mới danh sách các process

<a name="4"></a>
### 4. Starting Processes in the Future

Để đặt lịch cho một công việc cụ thể trong thời gian nhất định ta có thể dùng **at**.

<p align="center"><img src="https://github.com/ctnguyenvn/sysadmin_level1/blob/master/Task43_Linux_Course_01_LFS101/Chapter_09/Images/7.png"></p>

Mạnh mẽ hơn là **cron**. Chương trình này có thể giúp ta lập lịch tại thời điểm bất kỳ với nhiều công việc và có thể làm theo chu kỳ nhất định với người dùng hoặc hệ thống. Ta có thể dùng **crontab -e** để mở crontab editer và thêm vào nội dung (với 6 trường) theo thứ tự của bảng sau

<p align="center"><img src="https://github.com/ctnguyenvn/sysadmin_level1/blob/master/Task43_Linux_Course_01_LFS101/Chapter_09/Images/8.png"></p>

Ví dụ:

```sh
* * * * * /user/ctnguyenvn/script.sh
30 08 10 06 * /home/sysadmin/full-backup
```

Trong đó: Dòng đầu tiên sẽ thự thi script.sh trong mỗi phút trong mỗi giờ trong mỗi ngày của mỗi tháng và mỗi ngày trong tuần. Dòng thứ hai sẽ chạy full-backup lúc 8.30 sáng, ngày 10 Tháng 6 và không phân biệt ngày trong tuần

Với sleep, đôi khi một lệnh hoặc công việc phải bị hoãn hoặc suspend. Ví dụ một ứng dụng đã đọc và xử lý nội dung của một tệp dữ liệu và sau đó cần lưu một báo cáo về một hệ thống backup. Nếu hệ thống backup hiện đang bận hoặc không có sẵn, ứng dụng có thể được thực hiện để sleep (chờ) cho đến khi nó có thể hoàn thành công việc của mình. Sự chậm trễ như vậy có thể là gắn thiết bị sao lưu và chuẩn bị cho việc viết.

sleep tạm ngưng thực hiện ít nhất một khoảng thời gian nhất định, có thể được đưa ra như số giây (mặc định), phút, giờ hoặc ngày. Sau thời gian đó đã trôi qua (hoặc đã nhận được một tín hiệu gián đoạn), việc thực hiện sẽ tiếp tục.

Cú pháp của **sleep**

	sleep NUMBER[SUFFIX]...

Với *SUFFIX* là s (giây), m (phút), h (giờ), d (ngày)

> Lưu ý: `sleep` và `at` khác nhau. `sleep` là trì hoãn công việc với thời gian cụ thể còn `at` là thực hiện công việc sau một thời gian cụ thể 