
var button = document.getElementById("show-bt");

button.onclick = function() {
	alert("Bạn vừa nhấn vào button");
};


var show_news = document.getElementsByClassName('show_news');

for (var i = 0; i < show_news.length; i++){
	show_news[i].onclick = function() {
		alert("Bạn vừa kích vào tôi");
		return false;
	};
}
