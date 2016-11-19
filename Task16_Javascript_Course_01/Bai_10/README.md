### Thao tác với mảng

- Khai báo mảng

	+ Cú pháp 1

	```javascript
	var name_array = new Array();
	// hoặc
	var name_array = new Array(1, 2, 3);
	```
	+ Cú pháp 2
	```javascript
	var name_array = [];
	//hoặc
	var name_array = [1, 2, 3];
	```

- Truy xuất phần tử

	+ Cú pháp
	```javascript
	name_array[vị_trí_cần_xuất];
	```

- In mảng ra trình duyệt

	+ Cú pháp: Sử dụng **name_array.join()** để in các phần tử ra trình duyệt

- Sử dụng vòng lặp để lặp mảng

	+ Với vòng lặp **for**
	```javascript
	var name_array = [1, 2, 3];
	for(var i = 0; i < name_array.length; i++){
		document.write(name_array[i]);
	}
	```

	+ Với while
	```javascript
	var name_array = [1, 2, 3];
	var index = 0;
	while(index < name_array.length){
		document.write(name_array[index]);
		index++;
	}

	```