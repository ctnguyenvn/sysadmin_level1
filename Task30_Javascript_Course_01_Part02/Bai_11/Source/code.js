document.write("array = ['Học', 'lập', 'trình', 'javascript']" + "</br>"+ "</br>");

//Hàm array.valueOf()

var array1 = ["Học", "lập", "trình", "javascript"];
document.write("array.valueOf() = " + array1.valueOf() + "</br>");

//Hàm array.push()

var array2 = ["Học", "lập", "trình", "javascript"];
array2.push("căn bản");
document.write("array.push('căn bản') = " + array2.valueOf() + "</br>");

//Hàm array.pop()

var array3 = ["Học", "lập", "trình", "javascript"];
array3.pop();
document.write("array.pop() = " + array3.valueOf() + "</br>");

//Hàm array.shift()

var array4 = ["Học", "lập", "trình", "javascript"];
array4.shift();
document.write("array.shift() = " + array4.valueOf() + "</br>");

//Hàm array.unshift()

var array5 = ["Học", "lập", "trình", "javascript"];
array5.unshift("Task");
document.write("array.unshift('Task') = " + array5.valueOf() + "</br>");

//Hàm array.splice()

var array6 = ["Học", "lập", "trình", "javascript"];
array6.splice(0, 1, 'Tự', 'học');
document.write("array.splice(0, 1, 'Tự', 'học') = " + array6.valueOf() + "</br>");

//Hàm array.sort()

var array7 = ["Học", "lập", "trình", "javascript"];
array7.sort();
document.write("array.sort() = " + array7.valueOf() + "</br>");

//Hàm array.reverse()

var array8 = ["Học", "lập", "trình", "javascript"];
array8.reverse();
document.write("array.reverse() = " + array8.valueOf() + "</br>");


//Hàm array.concat()

var array8 = ["Học", "lập", "trình", "javascript"];
var array9 = ["Các", "hàm", "xử lý", "mảng"];

array89 = array8.concat(array9);

document.write("array.concat() = " + array89.valueOf() + "</br>");


//Hàm array.slice()

var array10 = ["Học", "lập", "trình", "javascript"];
var array11 = array10.slice(1, 3);
document.write("array.slice(1, 2) = " + array11.valueOf() + "</br>");
