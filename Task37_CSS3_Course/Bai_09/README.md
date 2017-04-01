
### Sử dụng font-face 

Font-face trong CSS3 có tác dụng tạo ra 1 font định danh và trỏ đến 1 file font nào đó lưu trữ trên internet, giúp website client có thể chạy những font mà client k đc cài sẵn trên máy

1. Một số định dạng file font

- __TrueType Fonts (TTF)__: TrueType là một định dạng được phát triển vào cuối những năm 1980 bởi Apple và Microsoft, đây là định dạng font phổ biến cho các hệ điều hành Mac OS và Windows.

- __OpenType Fonts (OTF)__: OpenType là một định dạng được phát triển dựa trên nền tảng của TrueType và nó đã được đăng ký thương hiệu bởi Microsoft. Font chữ OpenType được sử dụng phổ biến hiện nay trên các nền tảng máy tính lớn.

- __The Web Open Font Format (WOFF)__: WOFF là một định dạng sử dụng trong các trang web, nó được phát triển vào năm 2009. WOFF bản chất là một OpenType hoặc TrueType được bổ sung một số siêu dữ liệu giúp việc truyền tải qua mạng nhẹ nhàng hơn. W3C khuyến khích sử dụng định dạng này.

- __The Web Open Font Format (WOFF 2.0)__: TrueType/OpenType là một bản nén tuyệt vời hơn WOFF 1.0.

- __SVG Fonts/Shapes__: SVG Fonts giúp hiển thị văn bản giống như một hình ảnh Graphic.

- __Embedded OpenType Fonts (EOT)__: EOT là một hình thức nén của OpenType, được phát triển bởi Microsoft và dùng để nhúng vào website.

2. Sử dụng @font-face

__@font-face__ giống như một function gom nhiều thuộc tính CSS lại kết hợp với định dạng font giúp tạo ra những loại font theo ý muốn

Ví dụ:

```css
@font-face{
	font-family: Myfont;
	src: url(sansation_light.WOFF);
	font-weight: 100px;
}
h2{
	font-family: Myfont;
}
```