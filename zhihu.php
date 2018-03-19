<?php
	$data = file_get_contents('http://news-at.zhihu.com/api/5/themes');
	echo $_GET["cb"]."(".$data.")";
?>