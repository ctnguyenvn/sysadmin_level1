
### expression matching

```php
$str = "Hello world";

if (preg_match("/^[a-z]$/", $str)) {
	echo "True";
}else{
	echo "False";
}

```

> `^` là kiểm tra ký tự đầu tiên của chuỗi

> [a-z] là kiểm tra các ký tự có nằm trong khoảng từ a đến z trong bảng ký tự hay không, có thể thay bằng chuỗi bất kì

> $ là kiểm tra ký tự kết thúc của chuỗi