
### Học CSS3 - border-image - tạo đường viền bằng hình

Với thuộc tính `border-image` trong CSS3 ta có thể thiết lập hình ảnh làm đường viền cho thẻ HTML

> Lưu ý: Chiều cao của đường viền phụ thuộc vào chiều cao của thuộc tính `border` nên cần tạo `border` thì mới sử dụng được `border-image`

Cú pháp:

```css
border-image: url(border-image.png) 25 repeat;
```

Trong đó:
	
- `url(border-image.png)` là đường dẫn đến file hình ảnh dùng làm border

- `25` là `offset` với kiểu ghi tắt, nếu ghi đầy đủ thì `offset` sẽ là `25 25 25 25` tương ứng với lề trên-phải-dưới-trái. Offset chính là khoảng cách tính từ ngoài biên vào trong hình ảnh sẽ được lấy để làm border
	
	Giá trị `offset` tuân theo nguyên tắc rút gọn sau

	+ Nếu có 4 giá trị (25 25 25 25) thì tương đương với (cạnh trên, cạnh phải, cạnh dưới, cạnh trái).
	+ Nếu có 3 giá trị (25 25 25) thì tương đương với (cạnh trên, cạnh trái + phải, cạnh dưới)
	+ Nếu có 2 giá trị (25 25) thì tương đương với (cạnh trên + dưới, cạnh trái + phải)
	+ Nếu có 1 giá trị (25) thì tương đương với (cạnh trên + dưới + trái + phải)

-  `repeat` với các giá trị thường sử dụng sau

	+ Stretch: Kéo dãn hình ảnh cho tương thích với chiều rộng của các cạnh

	+ repeat: Lặp lại hình ảnh cho các cạnh

	+ round: Lặp lại hình ảnh cho các cạnh nhưng nó sẽ fit lần lặp theo tỉ lệ phần trăm, nghĩa là nó sẽ co giãn sao cho lặp vừa khít. Chính vì vậy nếu ta chọn OFFSET chuẩn và chọn chế độ round thì sẽ đẹp, tuy nhiên backgroud sẽ bị co giãn nếu chiều rộng không tương thích với hình ảnh

> Lưu ý: Giá trị `repeat` có thể chia thành 2 phần là `Vertical` và `Horizontal`