#### Chia cột với float và clear float

Việc chia cột trong CSS là việc bạn thiết lập những phần tử con trong một phần tử mẹ nằm trên cùng một hàng.

Các bước chia cột trong CSS

1. Các cột phải luôn có một container, tức là phần tử mẹ bao bọc nó

2. Thiết lập chiều rộng cho container

3. Thiết lập chiều rộng cho 2 cột, tổng chiều rộng trong 2 cột phải luôn bằng hoặc ít hơn chiều rộng của của container

4. Nên sử dụng `box-sizing: border-box` để ính toán tính thước chính xác

5. Sử dụng thuộc tính `float` với giá trị `left` và `right` để đẩy các phần tử sang trái hoặc sang phải

6. Tiến hành clear float

Clear float, khi tiến hành float các phần tử thì nên tạo ra điểm kết thúc cho việc float này, tức là bạn sẽ muốn nó bắt đầu không float ở đâu nữa. có 2 cách thường dùng để clear float

- cách 1. Sử dụng thẻ **div** trống. Cách này sẽ tạo ra một class riêng cho việc claer float và khai báo thêm một thẻ `<div>` nữa với class này rồi đặt nó dưới của cột cuối cùng

- Cách 2. Sử dụng overflow. Đơn giản chỉ cần viết `overflow:  auto;` cho container mẹ là được
