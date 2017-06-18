
### File Operations

> Thực hiện: Nguyễn Công Trứ

> Cập nhật: 18/06/2017

### Mục lục

- [1. Filesystems](#1)

- [2. Filesystem Architecture](#2)

- [3. Comparing Files and File types](#3)

- [4. Backing up and Compressing data](#4)

***

<a name="1"></a>
### 1. Filesystems

Trên Linux mọi thứ đều được xem như file hoặc ít nhất nó được coi là như vậy. Điều này có nghĩa là bạn đang xử lý các tập tin dữ liệu bình thường và các tài liệu, hoặc với các thiết bị như card âm thanh và máy in, bạn tương tác với chúng thông qua các việc Nhập/Xuất (I/O).

<p align="center"><img src="https://github.com/hellsins/sysadmin_level1/blob/master/Task43_Linux_Course_01_LFS101/Chapter_10/Images/1.png"></p>

Trong nhiều hệ thống bao gồm cả Linux, filesystem có cấu trúc như một cây. Cây thư mục này bắt đầu từ thư mục **root** hay biểu diễn bằng **/** và chúng cũng được phân thành cấp. Thư mục **root** khác với người dùng root. Hệ thống tập tin có thứ bậc cũng chứa các phần tử khác trong đường dẫn (tên thư mục), được phân tách bằng dấu gạch chéo (/), như trong /usr/bin/emacs, nơi phần tử cuối cùng là tên tập tin thực

Linux hỗ trợ một số loại filesystem như:  ext3, ext4, squashfs, và btrfs. Nó cũng hỗ trợ cho một số filesystem của các hệ thống khác như:

- Windows  (ntfs, vfat)

- MacOS (hfs, hfs+)

- IBM (JFS)

- SGI (xfs).

> Lưu ý: Một số loại filesystem phổ biến ngày nay là ext4, xfs, btrfs, là jfs. 

Mỗi hệ thống filesystem trên Linux đều chiếm một partition đĩa cứng. Partition giúp tổ chức các file theo loại cụ thể. Ví dụ các chương trình quan trọng cần thiết để chạy hệ thống thường được đặt trên một phân vùng đặc biệt so với các file thông thường của người dùng. Một lợi thế của việc tổ chức phân chia này khi tất cả dung lượng của một phân vùng nhất định đã hết thì hệ thống vẫn hoạt động bình thường.

<p align="center"><img src="https://github.com/hellsins/sysadmin_level1/blob/master/Task43_Linux_Course_01_LFS101/Chapter_10/Images/2.png"></p>

Trước khi bắt đầu sử dụng filesystem, bạn cần **mount** nó vào cây thư mục tại một nơi gọi là **mount point**. Đây đơn giản là một thư mục, nơi mà hệ thống tập tin được gắn vào. Bạn có thể tạo thư mục mới để mount vào nếu nó không tòn tại

> Lưu ý: Nếu mount vào một thư mục không rỗng thì nó sẽ bị ghi đè lại và ta không thể truy cập dữ liệu đó. Vì vậy nên mount vào thư mục rỗng.

<p align="center"><img src="https://github.com/hellsins/sysadmin_level1/blob/master/Task43_Linux_Course_01_LFS101/Chapter_10/Images/3.png"></p>

Để mount bất kỳ hệ thống nào vào cây thư mục ta có thể sử dụng lệnh **mount** và **unmount** với ý nghĩa ngược lại. Ví dụ

```sh
mount  /dev/sda5  /home
umount  /home

```

> Lưu ý: Lệnh này cần quyền của `root`

Để có thể tự động mount các partition khi login ta có thể sử dụng **fstab**.

Lệnh **df -hT** sẽ show ta kết quả của các mount bao gồm tất cả các partition trên hệ thống

**NFS** (Network FileSystem) là hệ thống share file phổ biến nhất trên Linux được phát triển từ lâu bới **Sun Microsystems**. Chương trình này cho phép quản trị viên cấu hình chia sẻ file/thư mục từ server đến các client. Người dùng có thể login từ nhiều máy tính khác nhau trong mạng LAN mà vẫn có thể sử dụng được file/thư mục này. Ngoài ra còn có CIFS (Samba) của Microsoft.

- Trên server để bắt đầu daemon **nfs** ta sử dụng lệnh

```sh
sudo systemctl start nfs
```

File **/etc/exports** chứa nội dung cấu hình của **nfs**. Ví dụ ta thêm dòng 

```
/projects  *.example.com(rw)
```

Nghĩa là server sexshare thư mục **/projects** với quuyền read(r) và write (w) đến các host khác trong domain **example.com**

Để khởi động lại service này ta dùng lệnh

```sh
sudo  systemctl  restart  nfs
```
hoặc để **nfs**khởi động cùng hệ thống ta dùng


```sh
sudo systemctl enable nfs
```

> Lưu ý: lệnh `exportfs -av` cho phép xem thông tin về **nfs**

- Trên client để sử dụng được thư mục mà server đã share ta cần dùng lệnh 

```sh
sudo mount  servername:/projects  /mnt/nfs/projects
```
Lệnh này sẽ mount thư mục mà server đã share vào thư mục **/mnt/nfs/projects** của máy client

Tương tự nếu muốn auto mount khi reboot hệ thống ta cần thêm dòng sau vào file **fstab**.

```sh
servername:/projects  /mnt/nfs/projects  nfs  defaults  0  0
```


<a name="2"></a>
### 2. Filesystem Architecture

Mỗi người dùng linux đều có một **home directory** và thường được đặt ở **/home**.

Thư mục **/bin** chưa các file thực thi. Các lệnh cần thiết để khởi động hệ thống hoặc trong chế độ người dùng đơn và các lệnh cần thiết được yêu cầu bởi tất cả người dùng hệ thống, chẳng hạn như **ps**, **ls**, **cp**.

Tương tự thu mục **/sbin** chứa các các chương trình liên quan đến quản trị hệ thống như fsck, shutdown...

Các mount filesystem tại **/proc** được gọi là **pseudo filesystems** vì chúng không thực sự tồn tại trên partition. Thư mục này chứa các file ảo, nghĩa là nó chỉ chứa các thông tin hệ thống như phần cứng, bộ nhớ, kernel, CPU,... Ví dụ khi ta update hệ thống thì nội dung trong chúng thay đổi. Một số file quan trọng như:

- /proc/cpuinfo

- /proc/interrupts

- /proc/meminfo

- /proc/mounts

- /proc/partitions

- /proc/version

Thư mục **/dev** chứa các **device nodes** một loại pseudo-file được sử dụng để chứa/mount các thiết bị mềm, cứng như đĩa CD, USB, đĩa cứng... Nếu thư mục trống nghĩa là chưa được mount, ngược lại chúng tạo ra các **udev** sau khi mount. Ví dụ như **/dev/sda1**, **/dev/lp1**, **/dev/dvd1**.

Thư mục **/var** chứa các tệp sẽ thay đổi nội dung khi hệ thống chạy. Ví dụ như thư mục:

<p align="center"><img src="https://github.com/hellsins/sysadmin_level1/blob/master/Task43_Linux_Course_01_LFS101/Chapter_10/Images/4.png"></p>

- Log hệ thống: /var/log

- Các package và database: /var/lib

- Print queues: /var/spool

- Temp files: /var/tmp

Thư mục **/etc** là nơi chứa các tập tin cấu hình hệ thống. Nó không chứa các tệp nhị phân, mặc dù có một số tập lệnh thực thi. Lưu ý **/etc** là nơi chứa các tập tin cấu hình trên toàn hệ thống, vì vậy yêu cầu quyền root nếu muốn sử đổi chúng.

Thư mục **/boot** chứa các tập tin cung cấp cho việc khởi động hệ thống. Đối với mỗi kernel được cài đặt trên hệ thống đều có 4 tập tin

- __vmlinuz__: Nén linux kernel, được yêu cầu cho khởi động hệ thống

- __initramfs__: initial ram filesystem, được yêu cầu cho khởi động, đôi khi được gọi là **initrd**.

- __config__: File cấu hình kernel, chỉ được sử dụng cho debugging và bookkeeping

- __system.map__: Bảng kernel symbol, chỉ được sử dụng để debuging

Thư mục **/lib** và **/lib64** chứa các thư viện cần thiết cho các chương trình trong thư mục **/bin** và **/sbin**. Các modules kernel như kernel code, device driver được chứa ở **/lib/modules**

Các thư mục **/media**, **/run**, **/mnt** là nơi các file/thiết bị được gắn vào. Như đối với **/mnt** thì thường được mount các thiết bị vào đây, các thiết bị auto thì thường được mount vào **/media** với các hệ thống cũ và **/run** đối với các hệ thống mới hơn.

Ngoài ra một số thư mục khác như

|Thư mục|Chức năng|
|---|---|
|/opt|Chứa các ứng dụng phần mềm (thường thì do người dùng tự cài đặt)|
|/sys|Hệ thống tập tin ảo về thông tin của hệ thống và phần cứng. Có thể được sử dụng để thay đổi các thông số hệ thống và giúp mục đích gỡ lỗi|
|/srv|Chứa dữ liệu trang web được phục vụ cho hệ thống (ít được sử dụng)|
|/tmp|Thư mục tạm. Trên một số hệ thống thì tất cả file/thư mục trong này sẽ bị xóa sau khi khởi động hệ thống|
|/usr|Ứng dụng đa người dùng, tiện ích và dữ liệu|

Cây thư mục **/usr** chứa các chương trình và kịch bản không cần thiết về mặt lý thuyết (nghĩa là chúng không cần thiết để khởi động hệ thống ban đầu) và có ít nhất các thư mục phụ sau đây: **/usr/include**, **/usr/lib**, **/usr/lib64**, **/usr/sbin**, **/usr/share**, **/usr/src**, **/usr/local**, **/usr/bin**

<a name="3"></a>
### 3. Comparing Files and File types

Trên linux, chúng ta có thể so sánh các tệp sử dụng lệnh **diff** với cấu trúc như sau:

	diff  [options]  <filename1>  <filename2>

Trong đó option có thể là

- __-c__: Cung cấp danh sách nội dung khác nhau của 3 dòng trong 2 file

- __-r__: Được sử dụng để so sánh đệ quy thư mục con, cũng như thư mục hiện tại

- __-i__: Không phân biệt chữ hoa, thường.

- __-w__: Bỏ qua  dấu cách và tab

- __-q__: Chỉ báo cáo nếu các tệp tin khác mà không liệt kê sự khác biệt

Để so sánh 3 file thì cũng có thể sử dụng lệnh **diff3**

Trên linux, đuôi file chỉ tượng trưng đối với người sử dụng. Và không có ý nghĩa đối với hệ thống, không giống với các hệ điều hành khác như windows. Hệ thống linux phân biệt định dạng các file qua header của nó. Chúng ta có thể sử dụng lệnh **file** để kiểm tra định dạng của file trên hệ thống.

<a name="4"></a>
### 4. Backing up and Compressing data

Có nhiều cách để backup data thậm chí backup toàn bộ hệ thống. Hai cách đơn giản nhất là sử dụng **cp** hoặc **rsync**. Tuy nhiên, không giống như *&cp**, **rsync** thực sự tốt hơn bởi nó backup theo cách đệ quy các file đã thực sự thay đổi nên quá trình diễ ra rấ nhanh

**rsync** thực sự mạnh mẽ. Cấu trúc của lệnh này là

	 rsync [sourcefile] [destinationfile]


Ví dụ ta có thể backup một thư mục project sử dụng lệnh sau

	rsync -r project-X archive-machine:archives/project-X

Dữ liệu thường được nén lại để làm giảm dung lượng lưu trên ổ đĩa hoặc giảm dung lượng để truyền qua mạng. Linux hỗ trợ rất nhiều phương thức nén data như **gzip**, **bzip2**, **xz**, **zip**. Ngoài ra còn có **tar** dùng để vừa gom các file lại và nén chúng cùng một lúc

**gzip** là chương trình nén phổ biến nhất trên linux. Nó có tốc độ nhanh và nén rất hiệu quả. Một số ví dụ như

	gzip [file_name] 	// nén file 

	gzip -r [dict_name] 	// nén tất cả file trong thư mục chỉ định

	gunzip [compress_name] // giải nén

**bzip2** có cú pháp giống như **gzip** nhưng nó sử dụng thuật toán khác và tạo ra file có dung lượng nhỏ hơn. Tuy nhiên quá trình nén mất nhiều thời gian hơn.

**xz** là phương thức nén tạo dung lượng thấp nhất trên linux. Và tương ứng thì nó cũng mất nhiều thời gian nhất. Một số ví dụ

	xz  [file_name] 	// nén file

	xz -d [file_name].xz 	// giải nén file

	xz  -dk  [file_name].xz 		// giải nén file và không xóa file **.xz**

**zip** thường không được sử dụng để nén data trên linux. Nó thường sử dụng để nén và giải nén với các data từ hệ điều hành khác như windows. Ví dụ

	zip  [file_compressed].zip  [file_name] 	// nén file

	zip  [file_compressed].zip  -r [file_name1] [file_name2...]  // nén nhiều file

	unzip  [file_compressed].zip  	// giải nén file

Ngoài ra **tar** cũng là một chương trình phát triển trước kia. Tương tự nó cũng cho phép nén và giải nén các file, tuy nhiên nó có thể gộp nhiều file thành một trước khi nén. Một số ví dụ như

|Command|Usage|
|---|---|
|$ tar xvf mydir.tar|Giải nén tất cả các file trong mydir.tar thành mydir|
|$ tar zcvf mydir.tar.gz mydir|Tạo tệp lưu trữ và nén bằng **gzip**|
|$ tar jcvf mydir.tar.bz2 mydir|Tạo tệp lưu trữ và nén bằng **bz2**|
|$ tar Jcvf mydir.tar.xz mydir|Tạo tệp lưu trữ và nén bằng **xz**|
|$ tar xvf mydir.tar.gz|Giải nén tất cả các tệp trong mydir.tar.gz vào thư mục mydir. Lưu ý ta không phải nói với tar là file ở định dạng gzip.|

Chúng ta có thể tạo sao lưu data trên linux sử dụng lệnh **dd**. **dd** viết tắt của **data definition**, được sử dụng để tạo ra các bản sao lưu hoặc copy. Ví dụ lệnh sau sao lưu Master Boot Record (MBR) (512-byte đầu tiên trên đĩa có chứa một bảng mô tả các phân vùng trên đĩa đó)

	dd if=/dev/sda of=sda.mbr bs=512 count=1

hoặc có thể tạo bản sao lưu đến một thiết bị khác như USB với lệnh sau

	dd if=/dev/sda of=/dev/sdb

Trong đó `if` là chỉ đầu vào và `of` chỉ đầu ra, `bs` là chỉ tốc độ ghi và `count` là thực hiện bao nhiêu Block trong quá trình thực hiện lệnh.

> Lưu ý: Quá trình tạo bản sao lưu đến một thư mục/thiết bị khác sẽ làm mất hoặc xóa hết các dữ liệu tồn tại trước trong thư mục/thiết bị đó.