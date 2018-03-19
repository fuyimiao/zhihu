
<?php
	$data = file_get_contents('http://news-at.zhihu.com/api/4/theme/'.$_GET["id"]);
	echo $_GET["cb"]."(".$data.")";
?>
