<?php
	$data = file_get_contents('http://news-at.zhihu.com/api/4/news/latest');
	echo $_GET["cb"]."(".$data.")";
?>