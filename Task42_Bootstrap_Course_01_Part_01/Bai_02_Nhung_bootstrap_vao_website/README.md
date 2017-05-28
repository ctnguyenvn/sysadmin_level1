
### Nhúng Bootstrap vào html

Ngoài cách nhúng giống như nhúng css vào website thông thường thì bootsrap còn cung cấp cho ta 1 bộ liên kết. Chi cần nhúng chúng vào website thì ngay lập tức ta có thể gọi đến các thuộc tính css, js

- Nhúng bằng liên kết

```html
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Bootstrap 3</title>
	
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap-theme.min.css">
</head>
<body>


	<script type="text/javascript" src="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>

</body>
</html>
```

- Tải [bootstrap](http://getbootstrap.com/getting-started/) về sau đó nhúng vào website

```html
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Bootstrap 3</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" type="text/css" href="css/bootsrap.min.css">

</head>
<body>

	<script type="text/javascript" src="http://code.jquery.com/jquery.min.js"></script>
	<script type="text/javascript" src="js/bootsrap.min.js"></script>
</body>
</html>
```