
### Text shadow - box shadow 

Với CSS3 ta có thể thêm shadow vào 1 đoạn text, border của thẻ html bằng cách sử dụng thuộc tính

1. __text-shadow__ dành do đoạn text 

Cú pháp: 

```css
text-shadow: h-shadow v-shadow blur-radius color | none | initial | inherit;
```

Trong đó:

+ h-shadow : vị trí bóng ngang so với chữ, số âm sẽ đẩy lên trên và số dương sẽ đẩy xuống dưới
	
+ v-shadow : vị trí bóng dọc so với chứ, số âm sẽ đẩy lui phía sau và số dương sẽ đẩy tới phía trước
	
+ blur-radius : độ nhòe của chữ bóng, tính bằng pixel
	
+ color : màu sắc của bóng

- Sử dụng nhiều color shadow

Nếu muốn shadow có nhiều màu sắc thì hãy bổ sụng thêm shadow cho nó và chúng cách nhau bởi dấu phẩy.


2. __box-shadow__ dành cho thẻ HTML

Đây là hiệu ứng tương tự như text-shadow nhưng nó có tác dụng đối với đường viền (lề) chứ không phải tác dụng với đoạn text.

Cú pháp: 

```css
box-shadow: h-shadow v-shadow blur spread color |inset|initial|inherit;
```

Trong đó: 

+ h-shadow : vị trí bóng ngang so với chữ, số âm sẽ đẩy lên trên và số dương sẽ đẩy xuống dưới
	
+ v-shadow : vị trí bóng dọc so với chứ, số âm sẽ đẩy lui phía sau và số dương sẽ đẩy tới phía trước
	
+ blur-radius : độ nhòe của chữ bóng, tính bằng pixel
	
+ spread: kích thước của bóng tối.
	
+ color : màu sắc của bóng
	
+ inset: thay đổi bóng từ bên ngoài vào trong thay vì từ trong ra ngoài
	
+ initial: thiết lập giá trị mặc định
	
+ inherit: kế thừa giá trị từ thẻ HTML cha

- Sử dụng nhiều shadow: Tương tự ta chỉ bổ sung các shadow và chúng cách nhau bởi dấu `,`
