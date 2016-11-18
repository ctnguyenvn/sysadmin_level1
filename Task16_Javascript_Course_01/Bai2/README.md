### Khai báo biến

- Để khai báo biến ta sử dụng `var ten_bien` với `ten_bien` được đặt theo quy tắc sau

	+ Tên biến phải là các chữ không dấu viết  hoa hoặc viết thường, các chữ số từ 0-9 và dấu gạch dưới (_).
	
	+ Tên biến bắt đầu phải là chữ hoặc dấu gạch dưới (_), nếu bắt đầu bằng số là sai 

	+ Tên biến có thể đặt dài hay ngắn tùy ý

- Gán giá trị cho biến có 2 loại cơ bản

	+ Vừa khai báo vừa gán giá trị:

	```js
		var username = 'abc';
	```

	+ khai báo xong mới gán giá trị:
	```js
		var username;
		username = 'abc';
	```

- Gán kiểu giá trị cho biến. các kiểu dữ liệu thông dụng như kiểu chuỗi (String), số (Number), mảng (Array), đối tượng (Object). 

	```js
	// Biến website đag kiểu String
	var website = 'abc';
	 
	// Biến website chuyển sang kiểu INT
	website = 100;
	 
	// Biến website chuyển sang kiểu float
	website = 12.34;
	```

- In giá trị ra màn hình, ta sử dụng `document.write(value)`