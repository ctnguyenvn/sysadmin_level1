
###  Biến toàn cục và biến cục bộ

- Biến toàn cục được sử dụng cho toàn chương trình. Tuy nhiên cần khai báo từ khóa `global` để chương trình (con) hiểu

```php
<?php 
	$a = 5;
	$b = 10;

	function test()
	{
		global $a;
		echo "a = ".$a;
	}
?>


```

- Biến cục bộ chỉ đuọc sử dụng trong phạm vi nhất định như function

```php
<?php 
	$a = 5;
	

	function test()
	{	
		$b = 10;
		global $a;
		echo "a = ".$a;
	}
	//  nếu in ra giá trị biến b sẽ lỗi
	// echo "b = ".$b;
?>

```