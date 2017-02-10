### CentOS6 Antivirus

> Tài liệu: Tìm hiểu về LMD (Linux Malware Detect) và ClamAV trên CentOS

> Thực hiện: Nguyễn Công Trứ 

> Cập nhật: 08/02/2017

### Mục lục

[1. LMD (Linux Malware Detect)](#1)

- [1.1 Giới thiệu](#1.1)

- [1.2 Cài đặt ](#1.2)

- [1.3 Configure LMD](#1.3)

- [1.4 Sử dụng](#1.4)

- [1.5 Remove LMD](#1.5)

[2. ClamAV Antivirus](#2)

- [2.1 Giới thiệu](#2.1)

- [2.2 Cài đặt ](#2.2)

- [2.3 Sử dụng](#2.3)

- [2.4 Remove ClamAV](2.4)

***

<a name="1"></a>
### 1. LMD (Linux Malware Detect)

<a name="1.1"></a>
#### 1.1 Giới thiệu

Linux Malware Detect là một phần mềm tìm và diệt mã độc trên hệ thống máy chủ Linux, được phát hành dưới dạng mã nguồn mở GNU GPLv2. Nó sử dụng dữ liệu mẫu từ các nhà cung cấp dịch vụ để trích xuất các dạng mã độc, từ đó tạo ra những ký hiệu nhận dạng chung. Những ký hiệu nhận dạng này sẽ được đưa vào các phần mềm quét virus chuyên dụng như ClamAV, nhúng vào tiến trình quét thông thường để tìm ra các mã độc ẩn trong các đoạn mã thông thường.

Phiên bản mới nhất là maldetect-1.5

LMD là một phần mềm mạnh mẽ với 1 số đặc điểm nổi bật như:

- Xác định các mối đe dọa nhanh chóng với file MD5 hash

- Tích hợp tính năng tự động cập nhật

- Tích hợp với ClamAV giúp LMD mạnh mẽ và linh hoạt hơn

- Cách ly các phần mềm độc hại 

- Tạo cron scan hệ thống mỗi ngày

- Thông báo email sau mỗi lần quét

<a name="1.2"></a>
#### 1.2 Cài đặt 

Để cài đặt LMD từ trang web chính thức ta làm như sau:

![](https://github.com/hellsins/sysadmin_level1/blob/master/Task29_CentOS6_Antivirus/Image/1.png)

![](https://github.com/hellsins/sysadmin_level1/blob/master/Task29_CentOS6_Antivirus/Image/2.png)

![](https://github.com/hellsins/sysadmin_level1/blob/master/Task29_CentOS6_Antivirus/Image/3.png)



Sau khi cài đặt xong, LMD sẽ tạo một cron job chạy hàng ngày.

<a name="1.3"></a>
#### 1.3 Configure LMD

Cấu hình LMD nằm trong file `/usr/local/maldetect/conf.maldet`. Chúng ta cần tìm và chỉnh sửa 1 số option sau:

```
email_alert=1
email_addr=username@localhost
email_subj="Malware alerts for $HOSTNAME - $(date +%Y-%m-%d)"
quarantine_hits=1
quarantine_susp=1
quarantine_clean=1
clam_av=1
```

Trong đó: 

- email_alert=1 nếu bạn muốn nhận thông báo qua email

- quarantine_hits=1 sẽ chuyển malware sang khu vực cách ly và thông báo.

- quarantine_susp=1 mặc định sẽ ngừng hoạt động cho người dùng với hit, cho phép vô hiệu hóa tài khoản mà các tập tin thuộc sở hữu đã được xác định là hit

- quarantine_clean=1 xóa malware nếu phát hiện.

- clamav_scan=1 sử dụng thư viện ClamAV nếu có để quét malware.

> Lưu ý:

> 	- email_addr và email_subj  yêu cầu email_alert được thiết lập

> 	- quarantine_clean và quarantine_susp yêu cầu quarantine_hits được thiết lập

> 	- Chúng ta có thể xem hướng dẫn thêm tại `/usr/local/src/maldetect-1.4.2/README`

<a name="1.4"></a>
#### 1.4 Sử dụng

Chúng ta có thể scan thư mục bất kỳ với lệnh

```
maldet -a [thư mục]
```
Ví dụ:

![](https://github.com/hellsins/sysadmin_level1/blob/master/Task29_CentOS6_Antivirus/Image/4.png)

Để xem report ta dùng lệnh:

```
maldet --report [SCANID]
```

Để update LMD ta dùng 

```
maldet -u
```

<a name="1.5"></a>
#### 1.5 Remove LMD

Để remove LMD ta sử dụng lệnh sau:

```
wget -q -O - http://attachfile.vdrs.net/mb-maldet-remove | sh
```

<a name="2"></a>
### 2. ClamAV Antivirus

<a name="2.1"></a>
#### 2.1 Giới thiệu

ClamAV antivirus là phần mềm  phát hiện trojan, virus, malware  mã nguồn mở miễn phí. ClamAV tương đối phổ biến trên các server chạy hệ điều hành Linux. 

Để Scan Malware hiệu quả hơn. Sau khi cài đặt ClamAV, khi scan bằng LMD, LMD sẽ sử dụng ClamAV làm engine scan nhằm tăng tốc độ và hiệu quả scan. Đây là điểm mạnh mẽ của mình khi kết hợp với LMD để phát huy sức mạnh của mình

<a name="2.2"></a>
#### 2.2 Cài đặt 

Để cài đặt ClamAV đầu tiên ta cần cài đặt epo Epel như sau:

```
yum install epel-release
```

Sau đó update hệ thống và cài đặt với lệnh:

```
yum update && yum install clamd
```

<a name="2.3"></a>
#### 2.3 Sử dụng

Để sử dụng ClamAv đầu tiên ta cần khởi động clamd hoặc có thể khởi động mặc định với lệnh:

![](https://github.com/hellsins/sysadmin_level1/blob/master/Task29_CentOS6_Antivirus/Image/6.png)

Bạn có thể scan thư mục bất kỳ. Ví dụ kết quả scan toàn bộ hệ thống với lệnh:

```
clamscan -r /
```
là 

![](https://github.com/hellsins/sysadmin_level1/blob/master/Task29_CentOS6_Antivirus/Image/8.png)

Một số Option thường được sử dụng với ClamAV:

- __-infected__ hoặc __-i__: Chỉ in các file bị xem là nhiễm độc
- __-recursive__ hoặc __-r__: Scan cả các thư mục hay file phía trong thư mục cha
- __-remove=[yes/no]__: Xóa luôn các file bị xem là nhiễm độc được tìm thấy
- __-no-summary__: Không in ra nội dung tổng kết
- __-log=/file.log__: ghi log scan vào file cụ thể
- __-mv=/path__: Di chuyển tất cả các file bị xem là nhiễm độc vào thư mục chỉ định

Để update ClamAV dùng:

```
freshclam
```

![](https://github.com/hellsins/sysadmin_level1/blob/master/Task29_CentOS6_Antivirus/Image/7.png)

<a name="2.4"></a>
#### 2.4 Remove ClamAV#

Dùng lệnh sau để remove ClamAV

yum remove clamd

***

### Tham khảo

[1]. (2016). Cài đặt LMD (Linux Malware Detect) và ClamAV để scan malware trên Linux? http://wiki.matbao.net/Cai-dat-LMD-Linux-Malware-Detect-va-ClamAV-de-scan-malware-tren-may-chu-Linux.ashx

[2]. Quách Chí Cường. (2015) [Securirty Linux] Quét virus trojan hay malware với Clamav? https://cuongquach.com/2015/07/securirty-linux-quet-virus-trojan-hay-malware-voi-clamav/

[3]. Linux Malware Detect? https://www.rfxn.com/projects/linux-malware-detect/

[4]. Gabriel Cánepa. (2015). How to Install and Use Linux Malware Detect (LMD) with ClamAV as Antivirus Engine http://www.tecmint.com/install-linux-malware-detect-lmd-in-rhel-centos-and-fedora/

***
