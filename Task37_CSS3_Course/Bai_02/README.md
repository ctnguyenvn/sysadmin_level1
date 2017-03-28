
### Học CSS3 - border-radius - bo góc

Để tạo bo tròn đường viền bằng CSS3 thì ta sử dụng những cú pháp sau:

```css
border-radius: 15px;
border-radius: 15px 15px;
border-radius: 15px 15px 15px;
border-radius: 15px 15px 15px 15px;
```

> Lưu ý: Thông thường để chạy đầy đủ trên các trình duyệt ta cần bổ sung thêm 2 thuộc tính sau

	-moz-border-radius: 15px; /*Firefox*/
	-webkit-border-radius: 15px; /*chrome và safary*/

Trong đó mỗi cách dùng có những tác dụng sau

![](https://github.com/hellsins/sysadmin_level1/blob/master/Task37_CSS3_Course/Bai_02/Image/1.png)

- Trường hợp có 1 tham số thì sẽ có tác dụng cho 4 góc

- Trường hợp có 2 tham số thì sẽ 

	+ Tham số đầu tiên: GÓC 1 và GÓC 3

	+ Tham số thứ 2: GÓC 2 và GÓC 4

- Trường hợp có 3 tham số thì

	+ Tham số đầu tiên là GÓC 1

	+ Tham số thứ hai là GÓC 2 và GÓC 4

	+ Tham số thứ ba là GÓC 3

- Trường hợp 4 tham số thì tương ứng với 4 góc