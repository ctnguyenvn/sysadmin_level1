### Virtualbox - Snapshot and Clone

> Tài liệu: Tìm hiểu về Snapshot và Clone trên Virtualbox 

> Thực hiện: Nguyễn Công Trứ

> Cập nhật: 23/09/2016

#### Mục lục:

[1. Snapshot](#Snapshot)

- [2.1 Tạo, khôi phục, xóa Snapshot](#TaoKhoiphucXoa)
- [2.3 Contents Snapshot](#Contents)

[2. Clone](#Clone)

---

<a name="Snapshot"></a>
### 1. Snapshot

Snapshot là một chức năng lưu lại (chụp) trạng thái hiện tại của một máy ảo trên Virtualbox. Và sau đó tại bất kỳ thời điểm nào bạn cũng có thể khôi phục lại trạng thái trước đó mặc dù bạn đã thay đổi rất nhiều trong hệ thống đó.

<a name="TaoKhoiphucXoa"></a>
#### 1.1 Tạo, khôi phục, xóa Snapshot

Khi Snapshot một máy ảo trên Virtualbox ta có thể:

- #### Tạo Snapshot (Take a snapshot)
Như đã nói ở trên, một snapshot sau khi được tạo ra có thể khôi phục lại trạng thái **lúc chụp** bất cứ lúc nào. Muốn Snapshot một máy ảo bất kỳ ta làm như sau:

	+ Đối với máy ảo đang chạy chọn **Take snapshot** từ "Machine" ở menu thả xuống của cửa sổ Snapshot. Sau đó đặt tên máy ảo mới
	+ Đối với máy ảo ở trạng thái **save** hoặc **powered off** Bạn kích vào hình chiếc máy ảnh ở cửa sổ Snapshots hoặc nhấn *Strl+Shift+S* . Sau đó đặt tên máy ảo mới

	![](https://github.com/hellsins/sysadmin_level1/blob/master/Task03_Virtualbox_Snapshot_and_Clone/img/snap1.jpg)

> Virtualbox không hạn chế số lượng snapshot, tuy nhiên về mặt thực tế thì có thể do hạn chế về ổ cứng của bạn.

- #### khôi phục Snapshot.
Để khôi phục lại snapshot bạn kích chuột phải vào bất kỳ ảnh chụp nào đã thực hiện snapshot trong list snapshot của bạn và chọn Restore Snapshot (hoặc nhấn vào biểu tượng máy ảnh có dấu quay lại)

- #### Xóa Snapshot.
Cuối cùng có thể xóa một ảnh trong list của mình thì tương tự như khôi phục và thay vì chọn Restore Snapshot thì bạn chon Delete Snapshot.

> Để tránh tình trạng mất trạng thái hiện tại khi khôi phục hoặc xóa một bản chụp, bạn có thể tạo ra 1 snapshot mới trước khi thao tác.

<a name="Contents"></a>
#### 1.3 Contents Snapshot

Để rõ hơn về 1 snapshot ta sẽ xem xét 3 yếu tố sau

+ Một snapshot là một bản sao hoàn chỉnh chứa tất cả các thiết lập của một máy ảo, bao gồm cả các cấu hình phần cứng, do đó khi bạn khôi phục lại một ảnh chụp thì các thiết lập máy ảo được khôi phục.
+ Trạng thái hoàn thành của tất cả các ổ đĩa ảo gắn liền với máy được duy trì, vì vậy khi khôi phục thì các tập tin kể từ khi tạo ra sẽ biến mất, các file đã xóa sẽ được phục hồi, thay đổi tập tin sẽ được khôi phục. Nói đúng hơn, khi một ảnh được chụp, Virtualbox sẽ tạo một ảnh khác mà chỉ chứa các thay đổi từ ảnh chụp được chụp, và khi khôi phục Virtualbox  sẽ xóa đi phần  mới chụp ấy và do đó sẽ trở lại trạng thái trước đó. Việc chụp như vậy sẽ không chiếm nhiều không gian bộ nhớ.
+ Cuối cùng, nếu bạn mất một ảnh chụp khi máy đang chạy, trạng thái bộ nhớ cũng được lưu lại trong các ảnh chụp. Khi bạn khôi phục lại một bản chụp như vậy, bạn sẽ ở chính xác thời điểm khi ảnh được chụp

<a name="Clone"></a>
### 2. Clone

Clone máy ảo chúng ta có thể hiểu như nhân bản một máy ảo nào đó được tạo ra trong Virtualbox thành nhiều bản nữa giống hệt máy ảo ban đầu với mục đích tiết kiệm thời gian cho việc lặp đi lặp lại cài đặt các máy ảo có cấu hình giống nhau.

Giống như Snapshot thì Clone cũng không giới hạn số lượng clone tạo ra và chỉ hạn chế bởi ổ cứng của bạn.

Clone máy ảo có 2 loại:

- Full Clone: Là bản sao máy ảo đầy đủ, tất cả các hình ảnh đĩa được chép vào ổ đĩa ảo mới (độc lập với máy ảo cha của nó). Các Clone này cũng hoạt động độc lập với cha của nó.
- Linked Clone: Là bản sao của máy ảo mới nhưng ổ đĩa ảo này sử dụng là của máy ảo ban đầu, nghĩa là khi bạn thao tác trên máy ảo mới thì sẽ tác động tới máy ảo cha nó (ghi dữ liệu vào, xóa,...)

> Các Clone trong menu Clone sẽ bị vô hiệu khi máy đang chạy

Để tạo Clone máy ảo trong  Virtualbox bạn kích cuột phải vào máy ảo chọn Clone hoặc nhấn Ctrl+O

![](https://github.com/hellsins/sysadmin_level1/blob/master/Task03_Virtualbox_Snapshot_and_Clone/img/Clone1.png)

Sau đó chọn full Clone hoặc link Clone như đã nói ở trên
![](https://github.com/hellsins/sysadmin_level1/blob/master/Task03_Virtualbox_Snapshot_and_Clone/img/Clone2.png)

Nhấn Clone để hoàn thành

> Đối với máy ảo đã từng Snapshot sẽ xuất hiện thêm một cửa sổ nữa để yêu cầu bạn chọn Clone tất cả các Snapshot của máy ảo ban đầu hoặc trạng thái của máy ảo hiện tại như hình sau:

![](https://github.com/hellsins/sysadmin_level1/blob/master/Task03_Virtualbox_Snapshot_and_Clone/img/Clone3.png)

Chọn và nhấn Clone để hoàn thành

### Kết thúc.