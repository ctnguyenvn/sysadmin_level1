
## Tìm hiểu về Markdown

> Tài liệu: Viết tài liệu (document) với Markdown

> Thực hiện: **Nguyễn Công Trứ**

> Cập nhật lần cuối: **19/09/2016**


### Mục lục

[1. Giới thiệu Markdown? ](#gt)

- [1.1 Giới thiệu](#GioiThieu)
- [1.2 Ứng dụng](#UngDung)
- [1.3 Tại sao phải dùng Markdown](#Why)

[2. Các cú pháp thường gặp](#CuPhap)

[3. Các công cụ thường dùng](#CongCu)

[4. Kết luận](#KetLuan)

[5. Tài liệu tham khảo](#TaiLieu)
---

<a name="gt"></a>
### 1. Giới thiệu Markdown?

<a name="GioiThieu"></a>
######1.1 Giới thiệu

Năm 2004, cùng với sự giúp đỡ của Aaron Swartz, John Gruber đã tạo ra ngôn ngữ Markdown với mục tiêu tạo ra một định dạng văn bản thô "dễ viết, dễ đọc, dễ dàng chuyển thành XHTML (hoặc HTML)". Markdown là một ngôn ngữ đánh dấu với cú pháp văn bản thô

<a name="UngDung"></a>
#####1.2 Ứng dụng

Mardown thường được dùng để:
- Tạo ra các tập tin README, wiki cho các dự án mã nguồn mở trên github, họ cũng dùng để comment (hỗ trợ trên nhiều trang web, diễn đàn)
- Markdown còn dùng để viết sách, truyện với các thành phần cơ bản.
- Markdown còn dùng để viết blog, tin tức như chính mục tiêu ban đầu của tác giả.
- Ngoài ra có thể kết hợp với impress.js thành một công cụ presentation vô cùng độc đáo là Hekyll

<a name="Why"></a>
##### 1.3 Tại sao phải dùng Markdown ?

Sự phổ biến của HTML khiến ngôn ngữ đánh dấu này được sử dụng rộng rãi trong các ứng dụng internet từ các trang web tới nội dung email hay rất nhiều tài liệu khác. Tuy nhiên một vấn đề gặp phải có lẽ đó là cú pháp HTML không được thân thiện, đơn giản cho lắm. Vì vậy nếu không có kiến thức về HTML thì sẽ rất khó khăn và giờ có lẽ chúng ta hiểu vì sao cần đến Markdown.

<a name="CuPhap"></a>
### 2. Các cú pháp thường gặp

Markdown sử dụng khá đơn giản với một số cú pháp dễ nhớ. tuy nhiên chúng có nhiều cách viết có thể cho những nơi khác nhau như github, blog như đã nói ở trên. Chúng ta sẽ tìm hiểu qua 1 vài cú pháp cơ bản
> Còn rất nhiều [cú pháp khác](https://daringfireball.net/projects/markdown/syntax) chưa được đề cập đến.

##### 2.1 Thẻ tiêu đề (headers)
Markdown sử dụng kí tự # để bắt đầu cho các thẻ tiêu đề (có thể dùng từ 1 kí tự **#** đến 6 kí tự **######**)

ví dụ: 
`# Tiêu đề cấp 1`
# Tiêu đề cấp 1
.
.
.
`# Tiêu đề cấp 6`
###### Tiêu đề cấp 6

##### 2.2 Chèn link, ảnh

-- Để chèn hyoerlink bạn chỉ cần dán link đó vào file .md 

`https://github.com/hellsins`

kq: https://github.com/hellsins

-- Hoặc cũng có thể rút ngắn với cú pháp sau:

`[hellsins](https://github.com/hellsins)`

kq: [hellsins](https://github.com/hellsins)

-- Để chèn ảnh bạn có thể chèn trực tiếp hoặc qua link

`<img src="link_anh" >`

`![chú_thích](link_anh)`

> Hình ảnh bạn có thể lấy bất cứ đâu trên internet, có thể bạn up lên để lấy link (có thể up lên  http://i.imgur.com/)

-- Bạn cũng có thể chèn ảnh như sau:

`![chú_thích](/đường_dẫn)`

#### 2.3 In đậm, In nghiêng

-- Để in đậm một đoạn text bạn sử dụng cú pháp:

`**Từ cần in đậm**`

hoặc: `__Từ cần in đậm__`

kq: **Từ cần in đậm**

-- Để in nghiêng một đoạn text bạn sử dụng cú pháp:

`*Từ cần in nghiêng*`

kq: *Từ cần in nghiêng*

##### 2.4 Gạch đầu dòng, danh sách

Để gạch đầu dòng hoặc có thể như 1 danh sách bạn có thể dùng:

```
- Gạch đầu dòng thứ nhất
<ul>

<li> Thụt đầu dòng thứ 1.1</li>

<li> Thụt đầu dòng thứ  1.2</li>

</ul>

- Gạch đầu dòng thứ hai

<ul>

<li> Thụt đầu dòng thứ 2.1</li>

<li> Thụt đầu dòng thứ  2.2</li>

</ul>
```
hoặc có thể dùng **Enter** và **Tab** để tạo như sau:

```
- Gạch đầu dòng thứ nhất

	- Thụt đầu dòng thứ 1.1

	- Thụt đầu dòng thứ 1.2

- Gạch đầu dòng thứ hai

	- Thụt đầu dòng thứ 2.1

	- Thụt đầu dòng thứ 2.2
```

kq: 
- Gạch đầu dòng thứ nhất
<ul>
<li> Thụt đầu dòng thứ 1.1</li>
<li> Thụt đầu dòng thứ  1.2</li>
</ul>
- Gạch đầu dòng thứ hai
<ul>
<li> Thụt đầu dòng thứ 2.1</li>
<li> Thụt đầu dòng thứ  2.2</li>
</ul>


##### 2.5 Chú thích cuối trang

Chú thích[^1], chú thích[^2]

- [^1]: Chú thích 1 
- [^2]: Chú thích 2


##### 2.6 Chèn bảng

```
|Cột 1 hàng 1|Cột 2|Cột 3|
|----------------|-------|-------|
|hàng 2|2x2|2x3|
|hàng 3|3x2|3x3|
```
kq:

|Cột 1 hàng 1|Cột 2|Cột 3|
|----------------|-------|-------|
|hàng 2|2x2|2x3|
|hàng 3|3x2|3x3|

	- kí tự bắt đầu 1 hàng: |
	- Kí tự tách phần header: -

##### 2.7 Tạo điểm nhấn

Để tạo điểm nhấn bạn dùng cặp dấu **== ==**

ví dụ:

==điểm nhấn==


##### 2.8 Chèn code

	``` code
	print("This is synktax on python 3.5");
	```

kq:

``` code
print("This is synktax on python 3.5");
```

##### 2.9 Trích dẫn

-- Có thể sử dụng cặp dấu `` hoặc `````` để tạo trích dẫn

`trích dẫn`

<a name="CongCu"></a>
### 3. Các công cụ thường dùng
Chúng ta có thể sử dụng bất kỳ trình soạn thảo nào như sublime, notepad, remarkable... để viết Markdown với đuôi file là **.md**. Bạn có thể viết Markdown online qua các trang web sau:

- https://stackedit.io/editor
- https://jbt.github.io/markdown-editor/
- http://www.tablesgenerator.com/markdown_tables
- https://markable.in/editor/

> Chúng ta có thể chuyển sang các định dạng khác như HTML trực tiếp với các công cụ trực tuyến này.

<a name="KetLuan"></a>
###4. Kết luận
##### Ưu điểm.
Đây là một ngôn ngữ cơ bản dễ dùng giúp ta có thể sử dụng rất nhiều nơi với cú pháp cơ bản. Có lẽ đây là ưu điểm lớn nhất của Markdown.
##### Nhược điểm.
Nhược điểm lớn nhất của Markdown có lẽ là khả năng cộng tác trong Markdown và theo giỏi những thay đổi. Vì đơn giản nên chỉ có thể dùng cho các dự án nhỏ lẻ, bài blog và tất nhiên những dự án lớn hay những quyển sách cần nhiều hơn những thứ mà Markdown hỗ trợ.

<a name="TaiLieu"></a>
### 5. Tài liệu tham khảo

https://vi.wikipedia.org/wiki/Markdown
https://github.com/hocchudong/git-github-for-sysadmin
https://help.ghost.org/hc/en-us/articles/224410728-Markdown-Guide
http://ngochin.com/2013/01/03/markdown/

