(function(){
	var num=11;
	$.get({
	url:"php/con2.php",
	data:{id:num},
	dataType:"jsonp",
	jsonp:"cb",
	success:function(data){
		console.log(data);
		console.log(data.background)
		$(".con-filter").eq(0).css('background',"url("+data.background+")");
		$(".con-head p").html(data.name)
//		console.log(data.stories)
		var arr = data.stories;
		console.log(arr);
		for(i=0;i<arr.length;i++){
			var main="<div class='con-art'><p></p><img src='' /></div>";
			$(".con-main").html($(".con-main").html()+main);
			$(".con-art p").eq(i).html(arr[i].title);
			$(".con-art img").eq(i).attr("src",arr[i].images[0]);
		}
	}
})
})()

