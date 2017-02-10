#### Các đơn vị thường dùng như px, pt, percentages, em và rem

Trong CSS thì có hai loại đơn vị là Absolute Units (đơn vị tuyệt đối) và Relative Units (đơn vị tương đối).

- Đơn vị tuyệt đối: Là đơn vị được định nghĩa sẵn và không hề thay đổi bởi bất kỳ tác động nào.

	+ __px__: Đây là một đơn vị được sử dụng trên màn hình hiển thị, một px sẽ tương đương với một điểm ảnh trên màn hình hiển thị.

	+ __pt__: Đơn vị point và cứ 1 ich = 72pt

- Đơn vị tương đối: Là mức đơn vị đo lường sử dụng ở mức tương đối nghĩa là có thể thay đổi bởi các thành phần khác ví dụ thay đổi phụ thuộc vào kích thước màn hình

	+ __%__ (percentages): Là đơn vị tham chiếu tỷ lệ so với một phần tử mẹ của nó dựa vào kích thước

	+ __em__: Là đơn vị tham chiếu tỷ lệ so với phần tử mẹ của nó dựa vào giá trị của thuộc tính font-size.

		Ví dụ bạn đặt font-size cho phần tử mẹ của nó là 16px thì nếu bạn sử dụng **em** trong khu vực phần tử đó thì 1em = 16px

	+ __rem__: Là đơn vị tham chiếu tỷ lệ so với phần tử gốc của một website dựa vào thuộc tính font-size, nghĩa là sẽ biến đổi tùy theo giá trị của thuộc tính font-size trong thẻ `<html>`

		Ví dụ bạn khái báo font-size cho thẻ `<html>` là 16px thì 1rem = 16px

[Xem thêm](https://developer.mozilla.org/en-US/docs/Web/CSS/length)