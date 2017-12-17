
### Manipulating Text

#### Mục lục


[1. Cat and echo](#1)

[2. Working with Large and compressd files](#2)

[3. Sed and awk](#3)

[4. File Manipulation Utilities](#4)

- [4.1 Sort](#4.1)

- [4.2 uniq](#4.2)

- [4.3 paste](#4.3)

- [4.4 join](#4.4)

- [4.5 split](#4.5)

[5. grep and strings](#5)

[6. Miscellaneous Text Utilities](#6)

***

<a name='1'></a>
### 1. Cat and echo

__Cat__ là lệnh viết tắt của `concatenate` và là một trong những lệnh phổ biến nhất trên linux. Cat dùng để đọc và in nội dung của file. Cú pháp của cat như sau

	cat  [filename]

Ngoài ra ta có cat có thể được sử dụng như

|command|usage|
|---|---|
|cat file1 file2|hiển thị nội dung của các file lần lượt theo thứ tự từ trái sang phải của lệnh|
|cat file1 file2 > file3|lấy nội dung của các file ghi vào file3 theo thứ tự từ trái sang phải của lệnh|
|cat file >> existingfile|chép nội dung của file vào existingfile|
|cat > file|ghi nội dung mới vào file (nhấn Ctrl+D để ghi và thoát)|
|cat >> file|ghi thêm nội dung vào file (nhấn Ctrl+D để ghi và thoát)|

Giống như cat ta có thể sử dụng lệnh tac cũng hiển thị nội dung file, tuy nhiên kết quả sẽ hiển thị từng dòng theo thứ tự ngược từ cuối file trở lên

__Echo__ đơn giản là để hiển thị một chuỗi như

	echo string

Ngoài để hiển thị đầu ra thì echo còn có thể để ghi một chuỗi vào file mới với toán tử > và thêm vào phía sau file với >>

echo còn giúp ta xem giá trị các biến môi trường như

	echo $PATH

<a name='2'></a>
### 2. Working with Large and compressd files

Người quản trị hệ thống cần phải làm việc với các tập tin cấu hình, các tập tin văn bản, các tập tin tài liệu, và các file bản ghi. Một số tệp này có thể lớn hoặc trở nên khá lớn khi chúng tích lũy dữ liệu theo thời gian. Các tệp này sẽ yêu cầu cập nhật cả xem và quản trị chúng

Ví dụ ta có thể xem nội dung của file lớn bằng cách xem một số dòng nhất định mà không cần mở cả file dẫn đến việc tốn tài nguyên hệ thống. Để làm điều này ta có thể sử dụng`less` như 

	less  [file_name]

	hoặc 

	cat  [file_name]  | less

Ngoài ra lệnh `head` có thể xem nội dung của một vài dòng đầu của file (mặc định 10 dòng). Hoặc có thể dùng option `-n` và số dòng để hiển thị số dòng mong muốn (hay dùng -5 để hiển thị 5 dòng dầu)

__tail__ ngược lại với head tuy nhiên việc hiển thị nội dung file sẽ được tính từ dưới lên. Điều này thuận lợi cho việc xem nội dung các file log. Đặc biệt với option `-f` ta có thể xem nội dung file trực tiếp khi có sự thay đổi liên tục

Khi làm việc với các file nén lớn, ta có thể sử dụng một số lệnh thao tác tương tự với cat, less, more... như 

|command|usage|
|---|----|
|zcat compressed-file.txt.gz| Để xem nội dung của file được nén|
|zless <filename>.gz| Giống như less nhưng đối với file được nén|
|zmore <filename>.gz|Giống như more nhưng đối với file được nén|
|zgrep -i less test-file.txt.gz|Để tìm kiếm bên trong một tập tin nén|
|zdiff filename1.txt.gz filename2.txt.gz|Để so sánh nội dung hai tệp được nén|

<a name='3'></a>
### 3. Sed and awk

Sed (stream editer) là một công cụ xử lý văn bản mạnh mẽ và là một trong những tiện ích Unix lâu đời và phổ biến nhất. Nó được sử dụng để thay đổi nội dung của một tập tin, thường là đặt nội dung vào một tập tin mới.

Sed có thể lọc văn bản, cũng như thực hiện thay thế trong luồng dữ liệu.

Cấu trúc cơ bản của sed như sau

	sed  -e  command  [file_name]

hoặc

	sed  -f  script_file  [file_name]

Một số command cơ bản sử dụng sed

|command|usage|
|---|---|
|sed s/pattern/replace_string/ file|Thay thế chuỗi đầu tiên trong một dòng|
|sed s/pattern/replace_string/g file|Thay thế tất cả các chuỗi trong 1 dòng|
|sed 1,3s/pattern/replace_string/g file|Thay thế tất cả các chuỗi trong một loạt các dòng|
|sed -i s/pattern/replace_string/g file|Lưu các thay đổi trong cùng một tệp|

> Lưu ý: Cần hạn chế sử dụng option `-i` vì có thể thay đổi nội dung của tệp mà không thể quay lại. Để hạn chế ta sử dụng `>` ghi vào file mới

__awk__ được sử dụng để trích xuất và in các nội dung cụ thể của một tệp tin và thường được sử dụng để xây dựng các báo cáo. Nó được tạo ra tại Bell Labs vào những năm 1970 và bắt nguồn từ tên cuối cùng của các tác giả: Alfred Aho, Peter Weinberger và Brian Kernighan.

awk mạnh mẽ với

- Nó là một tiện ích mạnh mẽ và ngôn ngữ lập trình giải thích. 

- Nó được sử dụng để thao tác các tập tin dữ liệu, lấy và xử lý văn bản. 

- Nó hoạt động tốt với các fields (chứa một phần dữ liệu, cơ bản về một cột) và các records (một tập các fields, cơ bản về một dòng trong một tập tin).

awk cơ bản được dùng với cú pháp

|commad|usage|
|---|---|
|awk ‘command’ var=value file|Chỉ định một lệnh trực tiếp tại  CLI|
|awk -f scriptfile var=value file|Xác định một tập tin có chứa các tập lệnh sẽ được thực hiện cùng với f|

Một số command cơ bải với awk

|command|usage|
|---|---|
|awk '{ print $0 }' /etc/passwd|In ra toàn bộ tệp tin|
|awk -F: '{ print $1 }' /etc/passwd|In trường đầu tiên (cột) của mỗi dòng, cách nhau bởi dấu cách|
|awk -F: '{ print $1 $7 }' /etc/passwd|In fields thứ nhất và thứ bảy của mỗi dòng|

Như đã thấy option `-F` cho phép bạn chỉ định một ký tự phân tách trường cụ thể

<a name='4'></a>
### 4. File Manipulation Utilities

<a name='4.1'></a>
#### 4.1 Sort

__Sort__ đơn giản là sắp xếp đầu ra theo thứ tự xác định như bảng mã ASCII

Một số command cơ bản

|syntax|usage|
|---|---|
|sort <filename>|Sắp xếp các dòng trong tệp được chỉ định, theo các ký tự ở đầu mỗi dòng.|
|cat file1 file2 `|` sort|Kết hợp hai tập tin, sau đó sắp xếp các dòng và hiển thị đầu ra trên CLI|
|sort -r <filename>|Sắp xếp các dòng theo thứ tự ngược|
|sort -k 3 <filename>|Sắp xếp các dòng theo trường thứ 3 trên mỗi dòng thay vì đầu|

<a name='4.2'></a>
#### 4.2 uniq

__uniq__ được sử dụng để loại bỏ các dòng trùng lặp trong một tập tin văn bản và rất hữu ích cho việc đơn giản hóa việc hiển thị văn bản.

uniq đòi hỏi rằng các mục trùng lặp phải được liên tiếp. Vì vậy, cần sắp xếp đầu tiên và sau đó sử dụng uniq qua pipe; Ta có thể làm điều này đơn giản hơn bằng cách sửu dụng lệnh `sort -u [filename]`

Để loại bỏ các mục trùng lặp từ nhiều tệp cùng một lúc, hãy sử dụng lệnh sau: 

sort file1 file2 | uniq file3 

hoặc

sort -u file1 file2 > file3 

Để đếm số mục trùng lặp, sử dụng lệnh sau: 

uniq -c filename

<a name='4.3'></a>
#### 4.3 paste

<p align="center"><img src="https://github.com/ctnguyenvn/sysadmin_level1/blob/master/Task43_Linux_Course_01_LFS101/Chapter_13/Images/01.png"></p>

Như hình ta thấy paste có thể paste vào nhau một cách nhanh chóng. Để sử dụng ta dùng

	paste  file1 file2

Có thể sử dụng option `-d` để chèn ký tự vào giữa 2 cột ghi nối các cột của 2 file

<a name='4.4'></a>
#### 4.4 join

<p align="center"><img src="https://github.com/ctnguyenvn/sysadmin_level1/blob/master/Task43_Linux_Course_01_LFS101/Chapter_13/Images/02.png"></p>

Như hình ta thấy gữa 2 file có những hàng của cột giống nhau và ta muốn gộp chúng lại với nhau. Tương tự như paste ta dùng join với cú pháp

	join  file1 file2

<a name='4.5'></a>
#### 4.5 split

__split__ được sử dụng để chia nhỏ một tập tin thành các phân đoạn có kích thước bằng nhau để dễ dàng xem và thao tác, và thường chỉ được sử dụng trên các tệp tin tương đối lớn. Theo mặc định, split chia một tập tin thành các phân đoạn 1000 dòng. Tập tin gốc vẫn không thay đổi, và một tập hợp các tập tin mới có cùng tên cộng với một tiền tố được thêm vào được tạo ra. Theo mặc định, tiền tố `x` sẽ được thêm vào. Để chia một tập tin thành các phân đoạn, sử dụng lệnh split infile. 

Để chia một tập tin thành các phân đoạn sử dụng một tiền tố khác, sử dụng lệnh 

	split  infile  <Prefix>

ví dụ

	split  american-english  dictionary


#### Regular Expressions and Search Patterns

Biểu thức chính quy là chuỗi văn bản được sử dụng để kết hợp một mẫu cụ thể hoặc để tìm kiếm vị trí cụ thể, chẳng hạn như bắt đầu hoặc kết thúc của một dòng hoặc một từ. Cụm từ thông dụng có thể chứa cả hai ký tự thông thường hoặc được gọi là các ký tự meta, chẳng hạn như * và $. 

Nhiều người biên tập văn bản và các tiện ích như vi, sed, awk, find và grep làm việc với các biểu thức thông thường. Một số ngôn ngữ máy tính phổ biến sử dụng các biểu thức chính quy bao gồm Perl, Python và Ruby

Ví dụ: `.` (bất kì ký tự đơn nào), `a|z` (a hoặc z), `$` ( ký tự kết thúc), `*` (bất kỳ kỳ tự nào và số lượng bao nhiêu)

<a name='5'></a>
### 5. grep and strings

__grep__ được sử dụng rộng rãi như một công cụ tìm kiếm văn bản chính. Nó quét các tập tin cho các mẫu được chỉ định và có thể được sử dụng với các biểu thức thông thường, cũng như các chuỗi đơn giản, như thể hiện trong bảng:

|command|usage|
|---|---|
|grep [pattern] <filename>|Tìm pattern trong một tệp tin và in tất cả các dòng phù hợp|
|grep -v [pattern] <filename>|In tất cả các dòng không phù hợp với pattern|
|grep [0-9] <filename>|In các dòng chứa các số từ 0 đến 9|
|grep -r [pattern] <folder>|Tìm pattern trong tất cả các file con trong folder|

__Strings__ được sử dụng để trích xuất tất cả các chuỗi ký tự in được tìm thấy trong tập tin hoặc các tập tin được đưa ra như là đối số. Nó hữu ích trong việc định vị nội dung có thể đọc được của con người được nhúng trong các tệp nhị phân; cho các tập tin văn bản một người chỉ có thể sử dụng grep.

Ví dụ 

	strings book1.xls | grep my_string

<a name='6'></a>
### 6. Miscellaneous Text Utilities

__tr__ được sử dụng để dịch các ký tự quy định vào các nhân vật khác hoặc để xóa chúng. Cú pháp tổng quát như sau: 

	tr [options] set1 [set2] 

Các mục trong dấu ngoặc vuông là tùy chọn. tr yêu cầu ít nhất một đối số và chấp nhận tối đa là hai. Tập đầu tiên, set1 được chỉ định trong ví dụ, liệt kê các ký tự trong văn bản được thay thế hoặc xóa. Thứ hai, set2, liệt kê các ký tự được thay thế cho các ký tự được liệt kê trong đối số đầu tiên. Đôi khi những bộ này cần được bao quanh bởi các dấu nháy. Nó thường an toàn (và có thể được yêu cầu) để sử dụng các dấu nháy đơn quanh mỗi bộ như bạn sẽ thấy trong các ví dụ dưới đây. 

Ví dụ, giả sử có một tập tin tên là city chứa nhiều dòng văn bản trong trường hợp hỗn hợp. Để dịch tất cả các ký tự chữ thường sang chữ hoa, tại dấu nhắc lệnh gõ `cat city | tr a-z A-Z` và nhấn phím Enter.

|command|usage|
|---|---|
|$ tr a-z A-Z|Chuyển đổi chữ thường sang chữ hoa |
|$ tr '{}' '()' < inputfile > outputfile| Chuyển dấu ngoặc thành dấu ngoặc đơn|
|$ echo "This is for testing" | tr [:space:] '\t'|Chuyển dấu cách thành tab|
|$ echo "This   is   for    testing" | tr -s [:space:]|Xóa bỏ các khoảng trắng bằng dấu cách|
|$ echo "the geek stuff" | tr -d 't'|Xóa các ký tự được chỉ định sử dụng tùy chọn -d|
|$ echo "my username is 432234" | tr -cd [:digit:]|Bổ sung các bộ bằng cách sử dụng -c tùy chọn|
|$ tr -cd [:print:] < file.txt|Loại bỏ tất cả các ký tự không in được từ một tập tin|
|$ tr -s '\n' ' ' < file.txt|join tất cả các dòng trong một tập tin vào một dòng đơn|

__tee__  lấy đầu ra từ bất kỳ lệnh, và trong khi gửi nó đến đầu ra, nó cũng lưu nó vào một tập tin. Nói cách khác, nó 'tees' dòng đầu ra từ lệnh: một luồng được hiển thị trên đầu ra chuẩn và một luồng khác được lưu vào một tệp. 

Ví dụ, để liệt kê nội dung của một thư mục trên màn hình và lưu đầu ra vào một tệp tin, tại dấu nhắc lệnh gõ `ls -l | tee newfile` và nhấn phím Enter.

__wc__ (word count) đếm số dòng, từ và ký tự trong tệp hoặc danh sách tệp. Các tùy chọn có thể là -l, -c, -w

Theo mặc định, cả ba tùy chọn đều hoạt động. 

Ví dụ: chỉ in số lượng dòng chứa trong một tệp tin, gưc`wc -l filename` và nhấn phím Enter.

__cut__ được sử dụng để thao tác các tệp dựa trên cột và được thiết kế để trích xuất các cột cụ thể. Dấu tách cột mặc định là ký tự tab. Một dấu phân cách khác nhau có thể được đưa ra như là một tùy chọn lệnh. 

Ví dụ, để hiển thị cột thứ ba giới hạn bởi một hoảng trắng, ở dấu nhắc lệnh `ls -l | cut -d' ' -f3` và nhấn phím Enter.