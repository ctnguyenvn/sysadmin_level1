
### 3D Transforms

CSS3 2D Transforms là những thuộc tính dùng để xử lý hiệu ứng di chuyển 2D

Cú pháp:

```css
transform: value;
```

Trong đó: value là 1 trong các giá trị sau:

#### 1. __Translate()__ 

Có tác dụng di chuyển đối tượng HTML từ vị trí hiẹn tại của nó

Cú pháp;

```css
transform: translate(xpx, ypx);
```

Với 

- xpx là  di chuyển theo hướng trái (nếu số dương) và phải (nếu số âm).

- ypx là  di chuyển theo hướng xuống (nếu số dương) và lên (nếu số âm).

#### 2. __rotate()__ 

Dùng để xoay đối tượn HTML theo 1 góc độ nào đó. Nó có một tham số truyền vào và đó chính là số độ mà ta muốn xoay. Nếu giá trị âm thì nó xoay ngược chiều kim đồng hồ và ngược lại nó xoay cùng chiều kim đồng hồ

#### 3. __Scale()__ 

Dùng để kéo dãn đối tượng

Cú pháp:

```css
transform: scale(x, y);
```

Với 

- x là số lần tăng theo chiều rộng.

- y là số lần tăng theo chiều cao. 


#### 4. __skew() - skewX() - skewY()__

__Skew()__ dùng để bẻ góc độ của chiều rộng và chiều cao của đối tượng HTML

Cú pháp:

```css
transform: skew(xdeg, ydeg);
```

Với:

- xdeg là góc độ của hai cạnh hai bên.

- ydeg là góc độ của hai cạnh trên dưới.

Nếu muốn bẻ gãy 2 cạnh bên hoặc 2 cạnh dưới thì dùng **skewX()** hoặc **skewX()**

#### 5. __matrix()__

Matrix() là hàm tổng hợp tất cả các thuộc tính ở trên, nó có 6 tham số cho phép bạn xoay, di chuyển, kéo giãn đối tượng HTML