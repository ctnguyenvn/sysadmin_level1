
### Break và continue

- `continue` sẽ bỏ qua các lệnh phía sau trong lần lặp hiện tại

```php
// day bằng 5 sẽ không được in ra
$day = 2;
do{
	if($day == 5){
		continue;
	}
	$day++;
}while($day>10)
```

- `break` sẽ thoát khỏi vòng lặp

```php
// day bằng 5 sẽ thoát khỏi vòng lặp
$day = 2;
do{
	if($day == 5){
		break;
	}
	$day++;
}while($day>10)
```
