
<?php 

function hello($value){
	echo "This is number ".$value."<br>";
	$value++;
}

for ($i=0; $i < 10; $i++) { 
	hello($i)
}

 ?>