<!DOCTYPE html>
<html>
<head>
	<title>PHP basic</title>
	<style type="text/css">
		#color{
			color: red;
		}
	</style>
</head>
<body>
	
	<?php 
	$name = "|";
	echo "<p>This is <strong>boid</strong> text ".$name." <em>italic</em> text and some span tag in <span>here</span></p>";

	$dayOfWeek = 2;
	if ($dayOfWeek == 2) {
		echo "<strong id='color'>$dayOfWeek</strong>";
	}
	else{
		echo "No thing here";
	}


	 ?>
	
</body>
</html>