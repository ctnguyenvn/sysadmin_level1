
### Hàm removeEventListener() trong javascript

Hàm `removeEventListener()` sẽ xóa đi 1 hành động đã được gán cho 1 sự kiện

- Cú pháp:
```js
object.removeEventListener('eventName', function_action);
```

Ví dụ: 

```js
var object  = document.getElementById("something");

function check(){
	// do something here
}
// add event
object.addEventListener('click', check);

// remove event
object.removeEventListener('click', check);

```
