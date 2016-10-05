### Tạo danh sách

Trong HTML có 3 kiểu tạo danh sách 

- __Kiểu sắp xếp__ (Odered List): Laf kiểu hiển thị một danh sách mà các mục con của nó được sắp xếp theo thứ tự bằng số hoặc bảng chữ cái

	```
	<ol type="I">
		<li></li>
	</ol>
	```

- __Kiểu không sắp xếp__ (Unordered List): Là kiểu hiển thị danh sách mà các mục co của nó sẽ không được sắp xếp theo thứ tự mà chỉ được dánh dấu bằng một ký tự đặc biệt

	```
	<ul style="list-style-type=: disc">
	<li></li>
	</ul>
	```

- __Kiểu mô tả__ (Description List): Là kiểu hiển thị danh sách mà các mục con của nó sẽ không được đánh dấu thứ tự, nhưng sẽ có kèm theo một đoạn để miêu tả

	```
	<dl>
	<dt></dt>
		<dd></dd>
	</dl>
	```

Trong HTML có thể xếp chồng một danh sách vào nhiều tầng bằng cách lồng thêm một danh sách nữa vào cặp thẻ `<li></li>`
	
	```
	<ul>

		<li>
				<ul>
				<li></li>
				</ul>
		</li>

	</ul>
	```

	