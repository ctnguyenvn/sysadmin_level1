
### Position relative - absolute trong CSS

Thuộc tính `position` trong CSS dùng để xác định vị trí hiển thị cho thẻ HTML và thường được dùng để xây dụng các menu đa cấp và một số chức năng khác.

|Tên giá trị|Ý nghĩa|
|---------------|-------------|
|static|Dạng mặc định - sẽ hiển thị theo đúng thứ tự của nó (thường dùng để hủy các thuộc tính bên dưới)|
|relative|Xác định vị trí tuyệt đối (vị trí bao ngoài), lúc này các thẻ HTML bên trong sẽ coi nó là thẻ cha|
|absolute|Định vị trí tương đói theo thẻ cha (thẻ khai báo relative) hoặc thẻ body nếu ko có khai báo|
|fixed|Định vị trí tương đối cho của sổ Browser của trình duyệt (khi kéo scroll nó sẽ không bị ẩn đi)|
|inherit|Thừa hưởng các thuộc tính từ thành phần cha (thành phần bao ngoài nó)|

Chúng ta có thể xem `relative` là cái khung lớn và absolute là cái khung nhỏ bên trong. `absolute` có thể di chuyển bên trong `relative` với các thuộc tính sau:

- __top__: lên phía trên

- __right__: qua bên phải

- __bottom__: xuống phía dưới

- __left__: qua bên trái

> Lưu ý: 

> 	- Chỉ có thể dùng nhiều nhất 2 giá trị trên (tuân theo tọa độ đề các)

> 	- Chúng ta có thể di chuyển nó ra ngoài khi thay thay các giá trị âm vào các thuộc tính trên