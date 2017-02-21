
### Thuộc tính z-index trong CSS

Thuộc tính `z-index` được sinh ra nhằm giải quyết cấp độ hiển thị của các thẻ HTML lên trình duyệt. Thẻ có `z-index` nào cao hơn thì thẻ đó nằm phía trên

Một số lưu ý khi sử dụng `z-index`

- Chỉ thiết lập `z-index` được cho các thẻ có khai báo `position-absolute` 

- Giá trị của `z-index` là một số (âm hoặc dương)

- Hai thẻ có cùng `z-index` thì sẽ tuân theo quy luật thẻ nào nằm dưới thì được hiển thị phía trên, thẻ con sẽ nằm trên thẻ cha

- Giá trị `z-index` mặc định của các thẻ HTML là 1, vì vậy các thẻ HTML thông thường nằm phía dưới thì nó sẽ đè thẻ phía trên

Thuộc tính `z-index` sử dụng 1 số value sau

- __auto__: Tự động sắp xếp chồng lên nhau theo thứ tự mặc định của HTML

- __1 con số__: Sắp xếp chồng lên nhau theo giá trị truyền vào

- __inherit__: Thừa hưởng thuộc tính `z-index` của thành phần cha
