// get object
var result = document.getElementById("result");
var button = document.getElementById("bt");
var html = document.getElementsByTagName("html")[0];

// creat function random
function do_random() {
	var randomString = Math.random();
	result.innerHTML = randomString;
}

// add action for event mousemove
html.addEventListener('mousemove', do_random);

// add event click for button
button.addEventListener('click', function() {
	// remove action random from event mousemove
	html.removeEventListener('mousemove', do_random);
});
