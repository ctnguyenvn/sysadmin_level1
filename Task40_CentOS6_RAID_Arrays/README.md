
### CentOS6 RAID Arrays

> Thực hiện: Nguyễn Công Trứ

> Cập nhật: 21/05/2017

### Mục lục:

- [1 . Giới thiệu về RAID](#1)

- [2 . Phân loại RAID](#2)

	+ [RAID 0](#2.1)

	+ [RAID 1](#2.2)
	
	+ [RAID 2](#2.3)
	
	+ [RAID 3](#2.4)
	
	+ [RAID 4](#2.5)
	
	+ [RAID 5](#2.6)
	
	+ [RAID 6](#2.7)
	
	+ [RAID 10](#2.8)

- [3 Setup RAID Arrays trên CentOS sử dụng mdadm](#3)

	+ [3.1 Sơ đồ, kiểm tra ổ đĩa và cài đặt mdadm cho hệ thống](#3.1)

	+ [3.2 Tạo phân vùng cho RAID](#3.2)
	
	+ [3.3 Tạo RAID Array](#3.3)
	
	+ [3.4 Tạo định dạng filesystem cho RAID và mount vào hệ thống](#3.4)

	+ [3.5 Lưu cấu hình RAID](#3.5)

	+ [3.6 Thêm ổ đĩa vào RAID](#3.6)

***

<a name="1"></a>
### 1 . Giới thiệu về RAID

RAID (Redundant Arrays of Inexpensive Disks hoặc Redundant Arrays of Independent Disks) là hình thức ghép nhiều ổ đĩa cứng vật lý thành một hệ thống ổ đĩa cứng nhằm tăng tốc độ và hiệu suất làm việc, cũng như làm tăng khả năng đảm bảo an toàn cho dữ liệu trên hệ thống ổ đĩa

RAID được sử dụng và triển khai thành phương pháp lưu trữ trong doanh nghiệp và các máy chủ, nhưng gần đây RAID đã trở nên phổ biến đối với mọi người dùng

Lý do chính để RAID được sử dụng phổ biến là:

- Sự dự phòng là nhân tố quan trọng nhất trong quá trình phát triển RAID cho môi trường máy chủ. Dự phòng cho phép sao lưu dữ liệu bộ nhớ khi gặp sự cố

- Khi áp dụng các phiên bản RAID cao bạn có thể thấy rõ hiệu quả tăng cao của nó. Hiệu quả cũng tùy thuộc vào số lượng ổ cứng được liên kết với nhau và các mạch điều khiển. 

- Giảm giá thành

<a name="2"></a>
### 2 . Phân loại RAID

RAID có thể phân ra 2 loại là RAID chuẩn và RAID không tiêu chuẩn. Theo RAB thì RAID (chuẩn) được chia thành 7 cấp độ (level), mỗi cấp độ có các tính năng riêng, hầu hết chúng được xây dựng từ hai cấp độ cơ bản là RAID 0 và RAID 1. Với RAID không tiêu chuẩn có thể là RAID 10, RAID 50, RAID 0+1, RAID S... Tuy nhiên phổ biến nhất trong 2 loại này là RAID 0, RAID 1, RAID 5, RAID 10

<a name="2.1"></a>
#### RAID 0

<p align='center'> <img src="https://github.com/hellsins/sysadmin_level1/blob/master/Task40_CentOS6_RAID_Arrays/Image/0.gif"/></p>

Raid 0 là loại Raid khá phổ biến và được nhiều người sử dụng hiện nay do có khả năng nâng cao hiệu suất tốc độc đọc ghi trao đổi dữ liệu của ổ cứng. Để tiến hành setup Raid 0 thì server cần tối thiểu 2 ổ đĩa (Disk 0, Disk 1).

Raid 0 sẽ lưu trữ như sau. Giả sử bạn có 1 file A dung lượng 100MB. Khi tiến hành lưu trữ thay vì file A sẽ được lưu vào 1 ổ cứng duy nhất, Raid 0 sẽ giúp lưu file A vào 2 ổ đĩa disk 0, disk 1 mỗi ổ 50MB (Striping)  giúp giảm thời gian đọc ghi xuống 1 nửa so với lý thuyết .

__Ưu điểm__: Tốc độ đọc ghi nhanh (gấp đôi bình thường theo lý thuyết). Dung lương tăng n lần ỗ đĩa đơn vật lý. Mỗi đĩa chỉ cần đọc/ghi 1/n dữ liệu được yêu cầu. Theo lý thuyết tốc độ sẽ tăng n lần.

__Nhược điểm__: Tiềm ẩn rủi ro về dữ liệu. Do dữ liệu được chia đôi lưu trên 2 ổ đĩa.Trường hợp 1 trong 2 ổ đĩa bị hỏng thì nguy cơ mất dữ liệu rất cao. Về ổ cứng yêu cầu phải 2 ổ cùng dung lượng, nếu 2 ổ khác dung lượng thì lấy ổ thấp nhất.

__Đối tượng sử dụng__: Thích hợp với những dịch vụ cần lưu trữ và truy xuất với tốc độ cao. Chẳng hạn như video streaming.

<a name="2.2"></a>
#### RAID 1

<p align='center'> <img src="https://github.com/hellsins/sysadmin_level1/blob/master/Task40_CentOS6_RAID_Arrays/Image/1.jpg"/></p>

Raid 1 là loại Raid cơ bản được sử dụng khá nhiều hiện nay do khả năng đạt an toàn về dữ liệu. để tiến hành setup Raid 1 thì cũng giống như Raid 0, server cần tối thiểu 2 ổ cứng để lưu trữ. Không giống như Raid 0, Raid 1 đảm bảo an toàn hơn về dữ liệu do dữ liệu được ghi vào 2 ổ giống hệt nhau (Mirroring)

Dung lượng cuối cùng của hệ thống RAID 1 bằng dung lượng của ổ đơn (hai ổ 80GB chạy RAID 1 sẽ cho hệ thống nhìn thấy duy nhất một ổ RAID 80GB).

__Ưu điểm__: An toàn về dữ liệu, trường hợp 1 trong 2 ổ đĩa bị hỏng thì dữ liệu vẫn có khả năng đáp ứng dịch vụ

__Nhược điểm__: Hiệu suất không cao, chi phí cao

__Đối tượng sử dụng__: Các dịch vụ lưu trữ, các website vừa và nhỏ không yêu cầu quá cao về tốc độ đọc ghi (in/out) của ổ cứng. Các đối tượng yêu cầu sự an toàn về dữ liệu như các dịch vụ kế toán,lưu trữ thông tin khách hàng, bất động sản v.v…

<a name="2.3"></a>	
#### RAID 2

<p align='center'> <img src="https://github.com/hellsins/sysadmin_level1/blob/master/Task40_CentOS6_RAID_Arrays/Image/2.jpg"/></p>

Raid 2 ít được sử dụng trong thực tế, tuy nhiên theo https://www.raid.com thì có thể giải thích sơ về Raid 2 như sau: RAID 2 gồm hai cụm ổ đĩa, cụm thứ nhất chứa các dữ liệu được phân tách giống như là RAID 0, cụm thứ hai chứa các mã ECC dành cho sửa chữa lỗi ở cụm thứ nhất. Sự hoạt động của các ổ đĩa ở RAID 2 là đồng thời để đảm bảo rằng các dữ liệu được đọc đúng, chính do vậy chúng không hiệu quả bằng một số loại RAID khác nên ít được sử dụng.

<a name="2.4"></a>	
#### RAID 3

<p align='center'> <img src="https://github.com/hellsins/sysadmin_level1/blob/master/Task40_CentOS6_RAID_Arrays/Image/3.jpg"/></p>

RAID 3 là sự cải tiến của RAID 0 nhưng có thêm (ít nhất) một ở cứng chứa thông tin có thể khôi phục lại dữ liệu bị hỏng của các ổ cứng RAID 0. 

Dữ liệu ở RAID 3 sẽ hoạt động như sau: Giả sử dữ liệu A được phân tách thành 3 phần A1, A2, A3 chứa trên các ổ cứng 0, 1, 2 (giống như RAID 0). Phần ổ cứng thứ 3 chứa dữ liệu của tất cả để khôi phục dữ liệu có thể sẽ mất ở ổ cứng 0, 1, 2. Giả sử ổ cứng 1 hư hỏng, hệ thống vẫn hoạt động bình thường cho đến khi thay thế ổ cứng này. Sau khi gắn nóng ổ cứng mới, dữ liệu lại được khôi phục trở về ổ đĩa 1 như trước khi nó bị hư hỏng.

RAID 3 yêu cầu tối thiểu của RAID 3 là có ít nhất 3 ổ cứng.

<a name="2.5"></a>	
#### RAID 4

<p align='center'> <img src="https://github.com/hellsins/sysadmin_level1/blob/master/Task40_CentOS6_RAID_Arrays/Image/4.jpg"/></p>

RAID 4 tương tự như RAID 3 nhưng ở một mức độ các khối dữ liệu lớn hơn. Chúng cũng yêu cầu tối thiểu 3 đĩa cứng (ít nhất hai đĩa dành cho chứa dữ liệu và ít nhất 1 đĩa dùng cho lưu trữ dữ liệu tổng thể)

<a name="2.6"></a>	
#### RAID 5

<p align='center'> <img src="https://github.com/hellsins/sysadmin_level1/blob/master/Task40_CentOS6_RAID_Arrays/Image/5.gif"/></p>

Raid 5 cũng là một loại Raid được phổ biến khá rộng rãi. Nguyên tắc cơ bản của Raid 5 cũng gần giống với 2 loại raid lưu trữ truyền thống là Raid 1 và Raid 0. Tức là cũng có tách ra lưu trữ các ổ cứng riêng biệt và vẫn có phương án dự phòng khi có sự cố phát sinh đối với 1 ổ cứng bất kì trong cụm.

Để setup Raid 5 ta cần tối thiểu 3 ổ cứng. Theo như hình minh họa phương án lưu trữ của Raid 5 như sau. Giả sử có 1 file A thì khi lưu trữ sẽ tách ra 3 phần A1, A2, A3. Ba phần nãy sẽ tương ứng lưu trên ổ đĩa Disk 0, Disk 1, Disk 2, còn ổ đĩa Disk 3 sẽ giữ bản sao lưu backup của 3 phần này. Tương tự các file sau cũng vậy và tùy theo tiến trình thực hiện mà bản sao lưu có thể được lưu ở bất kì 1 trong những ổ trong cụm Raid.

__Ưu điểm__: Nâng cao hiệu suất, an toàn dữ liệu, tiết kiệm chi phí hơn so với hình thức lưu trữ Raid 10.

__Nhược điểm__: Chi phí phát sinh thêm 1 ổ so với hình thức lưu trữ thông thường. (tổng dung lượng ổ cứng sau cùng sẽ bằng tổng dung lượng đĩa sử dụng trừ đi 1 ổ. Giả sử bạn có 4 ổ 500GB thì dung lượng sử dụng sau cùng khi triển khai Raid 5 bạn chỉ còn 1500GB).

__Đối tượng sử dụng__: Tất cả những website, dịch vụ, ứng dụng có số lượng truy cập và yêu cầu tài nguyên từ nhỏ đến vừa và lớn.

<a name="2.7"></a>	
#### RAID 6

<p align='center'> <img src="https://github.com/hellsins/sysadmin_level1/blob/master/Task40_CentOS6_RAID_Arrays/Image/6.jpg"/></p>

RAID 6 cần ít nhất 4 ổ đĩa cứng vật lý riêng biệt.

__Hoạt động__ : Raid 6 được phát triển từ Raid 5. Cơ chế hoạt động phần nào giống Raid 5 nhưng lập lại nhiều hơn số lần phân tách dữ liệu.

__Ưu điểm__: như ta đã biết đối với Raid 5 nếu 2 trong 3 ổ đĩa vật lý bị hư thì ta sẽ mất trắng dữ liệu còn Raid 6(2 trong 4 ổ đĩa vật lý bị hư) thì vẫn đảm bảo an toàn dữ liệu.
__Nhược điểm: chi phí cao. Chưa cải thiện nhiều về tốc độ đọc/ghi dữ liệu.
Đối tượng sử dụng: Nhà cung cấp nơi đặt website, máy chủ lưu trữ dữ liệu, database server,…

<a name="2.8"></a>	
#### RAID 10

<p align='center'> <img src="https://github.com/hellsins/sysadmin_level1/blob/master/Task40_CentOS6_RAID_Arrays/Image/10.png"/></p>

Raid 10 là sự kết hợp giữa 2 loại raid phổ biến và Raid 1 và Raid 0. Để setup Raid 10 cần sử dụng tối thiểu 4 ổ cứng.

Đối với Raid 10 dữ liệu sẽ được lưu đồng thời vào 4 ổ cứng. 2 ổ dạng Striping (Raid 0) và 2 ổ (Mirroring) Raid 1.

Ưu điểm: Đây là 1 hình thức lưu trữ nhanh nhẹn và an toàn, vừa nâng cao hiệu suất mà lại đảm bảo dữ liệu không bị thất thoát khi 1 trong số 4 ổ cứng bị hỏng.

Nhược điểm: Chi phí cao. Đối với Raid 10 dung lượng sẵn sàng sử dụng chỉ bằng 1/2 dung lượng của 4 ổ.

Đối tượng sử dụng: Raid 10 thích hợp với tất cả các đối tượng sử dụng (từ những yêu cầu về hiệu suất đến việc đảm bảo an toàn dữ liệu). Về ổ cứng yêu cầu phải 4 ổ cùng dung lượng, nếu 4 ổ khác dung lượng thì lấy ổ thấp nhất.

<a name="3"></a>
### 3 . Setup RAID Arays trên CentOS sử dụng mdadm

<a name='3.1'></a>
#### 3.1 Sơ đồ, kiểm tra ổ đĩa và cài đặt mdadm cho hệ thống

- Yêu cầu 

|||
|---|---|
|Hệ thống|CentOS 6.9 Final|
|Số lượng ổ đĩa|4 (mỗi ổ 20G)|
|RAID level| 5|

- Kiểm tra ổ đĩa

<p align='center'> <img src="https://github.com/hellsins/sysadmin_level1/blob/master/Task40_CentOS6_RAID_Arrays/Image/11.png"/></p>

- Cài đặt mdadm: Nếu hệ thống chưa cài đặt mdadm bạn có thể update và cài như sau

```
yum update

yum install mdadm -y
```

<a name='3.2'></a>
#### 3.2 Tạo phân vùng cho RAID

Trên Linux có nhiều chương trình giúp bạn tạo partition như cfdisk, fdisk. Ở đây tôi sử dụng fdisk, trong sơ đồ này yêu cầu tạo RAID với 4 ổ đĩa trên do đó tôi chỉ thực hành 1 cái và 3 cái còn lại đều tương tự.

Làm như sau:

<p align='center'> <img src="https://github.com/hellsins/sysadmin_level1/blob/master/Task40_CentOS6_RAID_Arrays/Image/12.png"/></p>

Sau khi tạo partition ta chọn định dạng cho partition

<p align='center'> <img src="https://github.com/hellsins/sysadmin_level1/blob/master/Task40_CentOS6_RAID_Arrays/Image/13.png"/></p>

Cuối cùng xem kết quả. Nếu đã xong thì nhấn `w` để ghi ổ đĩa và thoát.

<p align='center'> <img src="https://github.com/hellsins/sysadmin_level1/blob/master/Task40_CentOS6_RAID_Arrays/Image/14.png"/></p>

Một số option:

|Option|Ý nghĩa|
|--|--|
|n| Tạo 1 partition mới|
|d| Xóa 1 partition|
|L| Xem tất cả các định dạng partition hỗ trợ (dạng hex)|
|t| Thay đổi định dạng partition|
|w| Ghi thay đổi và thoát|

Sau khi làm tương tự với các ổ còn lại ta được kết quả như sau

<p align='center'> <img src="https://github.com/hellsins/sysadmin_level1/blob/master/Task40_CentOS6_RAID_Arrays/Image/15.png"/></p>

Chúng ta cũng có thể kiểm tra lại với mdadm để xác định các partition đã tạo ra đúng hay chưa

<p align='center'> <img src="https://github.com/hellsins/sysadmin_level1/blob/master/Task40_CentOS6_RAID_Arrays/Image/16.png"/></p>

<a name='3.3'></a>	
#### 3.3 Tạo RAID Array

Đối với mỗi level RAID khác nhau sẽ khác nhau, tuy nhiên chúng đều tuân theo cấu trúc sau để tạo 1 RAID Array

	mdadm --create /dev/[X]  --level=[Y]  --raid-devices=[Z]  [M]

Trong đó:

- __X__: là ổ RAID sẽ được tạo thành từ các ổ kia

- __Y__: là level của RAID. Ví dụ RAID 0 thì sẽ là `--level=0`. Có thể thay thế option `--level` bằng `-l`

- __Z__: là số lượng ổ đĩa đã chuẩn bị để gộp thành RAID. Có thể thay thế option `--raid-devices` bằng `-n`

- __M__: là path của tất cả các ổ đĩa đã chuẩn bị phía trên

Trong sơ đồ này tôi sẽ tạo 1 ổ RAID gồm 1 ổ đã chuẩn bị phía trên như sau:

<p align='center'> <img src="https://github.com/hellsins/sysadmin_level1/blob/master/Task40_CentOS6_RAID_Arrays/Image/17.png"/></p>

> Lưu ý: Đối với RAID 10 ta có thể dùng 2 cách để tạo. Thứ nhất ở option --level ta chọn 10 và tiếp tục làm bình thường. Cách thứ 2 ta có thể tạo 2 ổ RAID 1 (từ 4 ổ tạo thành 2) xong sau đó tạo 1 ổ RAID 0 (từ 2 ổ RAID 1 vừa tạo)

Chúng ta có thể xem 1 số thông tin về ổ RAID đã tạo như sau

<p align='center'> <img src="https://github.com/hellsins/sysadmin_level1/blob/master/Task40_CentOS6_RAID_Arrays/Image/18.png"/></p>

<p align='center'> <img src="https://github.com/hellsins/sysadmin_level1/blob/master/Task40_CentOS6_RAID_Arrays/Image/19.png"/></p>

<p align='center'> <img src="https://github.com/hellsins/sysadmin_level1/blob/master/Task40_CentOS6_RAID_Arrays/Image/20.png"/></p>

<a name='3.4'></a>	
#### 3.4 Tạo định dạng filesystem cho RAID và mount vào hệ thống

Để định dạng filesysem cho ổ RAID vừa tạo ta dùng lệnh `mkfs.ext4` như sau (chọn định dạng ext4):

<p align='center'> <img src="https://github.com/hellsins/sysadmin_level1/blob/master/Task40_CentOS6_RAID_Arrays/Image/21.png"/></p>

Sau khi xong ta có thể tạo thư mục mới và mount RAID đã tạo như sau:

<p align='center'> <img src="https://github.com/hellsins/sysadmin_level1/blob/master/Task40_CentOS6_RAID_Arrays/Image/22.png"/></p>

Ta có thể tạo 1 nội dung trong ổ RAID vừa mount để kiểm tra

<p align='center'> <img src="https://github.com/hellsins/sysadmin_level1/blob/master/Task40_CentOS6_RAID_Arrays/Image/23.png"/></p>

<a name='3.5'></a>
#### 3.5 Lưu cấu hình RAID và cấu hình tự động mount lần khởi động sau

Chúng ta lưu cấu hình RAID như sau

<p align='center'> <img src="https://github.com/hellsins/sysadmin_level1/blob/master/Task40_CentOS6_RAID_Arrays/Image/24.png"/></p>

> Lưu ý: Có thể thay option `--scan` bằng `-s`, `--verbose` bằng `-v`,...

Để lần khởi động sau có thể tự động mount ổ RAID này ta cần cấu <p align='center'> <img src="https://github.com/hellsins/sysadmin_level1/blob/master/Task40_CentOS6_RAID_Arrays/Image/2.png"/></p>

<p align='center'> <img src="https://github.com/hellsins/sysadmin_level1/blob/master/Task40_CentOS6_RAID_Arrays/Image/25.png"/></p>

> Lưu ý: `/dev/md0` là path của RAID và `/mnt/raid5` là path của thư mục được mount

Chúng ta có thể xem lại toàn bộ các phân vùng cho thấy chúng đã gộp với nhau như sau

<p align='center'> <img src="https://github.com/hellsins/sysadmin_level1/blob/master/Task40_CentOS6_RAID_Arrays/Image/26.png"/></p>

<a name='3.6'></a>
#### 3.6 Thêm ổ đĩa vào RAID

Để thêm ổ mới vào RAID bất kỳ. Đầu tiên ta gắn thêm ổ (/dev/sdf) vào và được:

<p align='center'> <img src="https://github.com/hellsins/sysadmin_level1/blob/master/Task40_CentOS6_RAID_Arrays/Image/27.png"/></p>

Tương tự chúng ta cũng tạo partition mới như trên và được 

<p align='center'> <img src="https://github.com/hellsins/sysadmin_level1/blob/master/Task40_CentOS6_RAID_Arrays/Image/28.png"/></p>

Tiếp theo ta add thêm ổ mới này vào RAID theo cấu trúc sau

	mdadm --add /dev/[X] /dev/[Y]

Trong đó: 
	
- __X__: là ổ RAID

- __Y__: là ổ được thêm vào RAID (nhiều ổ thì thêm path phía sau)

<p align='center'> <img src="https://github.com/hellsins/sysadmin_level1/blob/master/Task40_CentOS6_RAID_Arrays/Image/29.png"/></p>

Chúng ta có thể xem 1 số thông tin sau khi add thêm vào như sau

<p align='center'> <img src="https://github.com/hellsins/sysadmin_level1/blob/master/Task40_CentOS6_RAID_Arrays/Image/30.png"/></p>

<p align='center'> <img src="https://github.com/hellsins/sysadmin_level1/blob/master/Task40_CentOS6_RAID_Arrays/Image/31.png"/></p>

***
### Tham khảo

[1]. Tìm hiểu chung về các loại RAID lưu trữ. https://vinahost.vn/ac/knowledgebase/252/Tim-hiu-chung-v-cac-loi-RAID-lu-tr.html

[2]. (2015). RAID là gì? Các loại Raid cơ bản. http://3stech.vn/KIEN-THUC-CO-BAN/RAID-la-gi-Cac-loai-Raid-co-ban.html

[3]. (2010). RAID là gì?. http://kenhgiaiphap.vn/Detail/192/RAID-la-gi-.html

***