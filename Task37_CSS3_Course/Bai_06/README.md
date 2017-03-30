
### Gradient Background

Gradient là giá trị được kết hợp với background để trộn màu sắc tạo hình ảnh đẹp hơn

Trong CSS3 hỗ trợ 2 loại Gradient

1 .  __Linear Gradient__ (Kéo theo các vị trí lên, xuống, trái, phải, đường chéo)

Cú pháp: 

```css
background: linear-gradient(direction, color1, color2,...)
```

Trong đó: dicection gồm các giá trị

	+ Giá trị `to top` , `to left`, `to right`, `to bottom` thì nó sẽ kéo theo cạnh đối diện

	+ Giá trị đôi `to top left` hoặc `to left right` thì sẽ kéo theo đường chéo

> Lưu ý: Nếu không truyền `dicrection` thì mặc định sẽ có giá trị `top` 

- Sử dụng Angles. 

Ta có thể thêm sự lựa chọn đó là sử dụng góc thay vì xác định hướng như trên

Cú pháp:

```css
background: linear-gradient(angle, color-stop1, color-stop2,...)
```
Trong đó Angle là góc xác định giữa đường ngang và đường Gradient đi ng

ược chiều của kim đồng hồ. Hay nói cách khác 0deg sẽ tạo bottom to top Gradient, 90deg sẽ tạo left to right Gradient.

- Sử dụng nhiều màu: Chúng ta có thể trộn nhiều màu với nhau bằn cách bổ sung mào vào thuộc tính gradient

- Sử dụng Transparency: Có thể kết hợp với HSLA Color hoặc RGBA Color  để tạo độ trong suốt

- Lặp - repeating-linear-gradient

Chúng ta thấy dù chiều cao và chiều rộng của đối tượng HTML bao nhiêu đi nữa thì nó vẫn phủ đầy, nhưng nếu muốn nó chỉ chiếm một khoảng nào đó và lặp tiếp tục lặp lại thì ta dùng thuộc tính repeating-linear-gradient

2 . __Radial Gradients__ (Kéo tại vị trí do lập trình viên chọn và lan tỏa ra 4 phía theo một hình nào đó)

Radial Gradient dùng để tạo hiệu ứng tại vị trí nào đó và lan tỏa ra tứ phía, và để có được hiệu ứng thì chắc chắn ta phải sử dụng ít nhất hai màu sắc khác nhau.

Cú pháp:

```css
background: radial-gradient(shape size at position, start color,..., last-color);
```
Trong đó Shape mặc định là hình Ellipse, size là farthest-corner và position là center.

- Phân chia khoảng màu đồng đều

Theo mặc định thì các màu sẽ được chia 1 khoảng không gian bằng nhau

- Tùy chọn khoảng màu

Nếu bạn muốn thiết lập mỗi màu sắc chiếm một khoảng bao nhiêu đó thì thêm số phần trăm (%) đằng sau màu đó (khoảng cách tính từ vị trí trung tâm, nghĩa là màu sau phải lớn hơn màu trước).

- Tùy chọn shape: Mặc đình là ellipse nhưng bạn có thể thay thế bằng circle.

- Tùy chọn size: Có 4 giá trị

	+ closest-side
	
	+ farthest-side
	
	+ closest-corner
	
	+ farthest-corner

> Lưu ý: Mặc định nếu không chọn size thì nó sẽ lấy farthest-side

- Tùy chọn Position

Nếu muốn vị trí trung tâm không nằm ở giữa nữa thì có thể chọn một vị trí bất kì bằng cách nhập khoảng cách so với lề trái và lề trên, đơn vị của nó có thể là % hoặc px

