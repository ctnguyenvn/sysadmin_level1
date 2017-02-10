#### Reset CSS

Khi viết CSS cho website, ta nên đưa tất cả các giá trị của các phần tử trên website về bằng **0** hết và xóa một số định dạng có sẵn đê khi cần chúng ta sẽ dùng CSS viết lại theo ý mình để đảm bảo nó hiển thị tố trên tất cả các trình duyệt. Việc làm này gọi là Reset CSS

Có thể Reset CSS như sau

```css
* {
	padding: 0;
	margin: 0;
	border: none;
}
```
Chúng ta có thể tối ưu hơn bằng cách sử dụng dụng một số bộ Reset CSS thông dụng như [normalize.css](https://github.com/necolas/normalize.css/blob/master/normalize.css), [Reset CSS 2.0 by Eric Meyer](http://meyerweb.com/eric/tools/css/reset/)