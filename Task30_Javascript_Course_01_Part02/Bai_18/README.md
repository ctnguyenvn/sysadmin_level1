
### Thêm sự kiện bằng javascript

Thêm sự kiện cho 1 thẻ HTML

```js
elementObject.evenName = function(){
	//do something
};
```
+ Trong đó: 
	
	+ __elementObject__ là đối tượng HTML mà ta sử dụng DOM để lấy

	+ __eventName__ là tên của event như onclick, on change...
	

Thêm sự kiện cho nhiều thẻ HTML

```js
var elementObjs = document.getElementsByTagName(element);

for(var i = 0; i < elementObjs.lenght; i++){
	elementObjs.evenName = function(){
		// Do something here
	};
}
```
