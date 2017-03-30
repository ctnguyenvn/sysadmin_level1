
### Dịnh dạng màu sắc

CSS3 hỗ trợ nhận diện color bằng tên màu, mã hexadecimal và mã RGB

#### 1 . RGBA color

RGBA color là 1 phần mở rộng của RGB color với thành phần bổ sung là chỉ số opacity

Cú pháp:

```css
rgba(reg, green, blue, alpha)
```

Trong đó: alpha có giá trị từ 0->1, giá trị 1 là đậm nhất càng gần về 0 thì màu sắc càng nhạt dần

#### 2 . HSL color - Hue Saturation Lightness color

Cú pháp:

```css
hsl(hue, saturation, lightness)
```

Trong đó:

- Hue có giá trị từ 0 tới 360, giá trị 0 hoặc 360 là màu đỏ

- Saturation có giá trị phần trăm (%) và cao nhất là 100% (full)

- Lightness cũng có giá trị phần trăm, 0% là màu đen và 100% là màu trắng.

#### 3 . HSLA color

Là 1 phần mở rộng của HSL color với thành phần bổ sung là giá trị alpha

Cú pháp:

```css
hsla(hue, saturation, lightness, alpha)
```

Trong đó:

- Hue có giá trị từ 0 tới 360, giá trị 0 hoặc 360 là màu đỏ

- Saturation có giá trị phần trăm (%) và cao nhất là 100% (full)

- Lightness cũng có giá trị phần trăm, 0% là màu đen và 100% là màu trắng.

- Alpha  alpha có giá trị từ [0->1], giá trị càng gần về 0 thì màu sắc càng mờ và giá trị 1 là màu đậm nhất

#### 4 . Opacity

Để bổ sung giá trị alpha vào khi sử dụng dạng mã màu HSL thì ta dùng thuộc tính opacity

> Lưu ý: khi dùng opacity thì text cũng sẽ bị mờ theo

#### 5 . HEX color

Đây là loại mã màu thông dụng với cú pháp: #xxxxxx, trong đó xx... là giá trị

#### 6 . Color Name

Đây là cú pháp đơn giản nhất để xác định màu trong CSS

Ví dụ: black, red, white,...