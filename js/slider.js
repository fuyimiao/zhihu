 var mySwiper = new Swiper ('.swiper-container', {
    direction: 'vertical',
    loop: true,
    
    // 如果需要分页器
    pagination: {
      el: '.swiper-pagination',
    },
    
    // 如果需要前进后退按钮
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    
    // 如果需要滚动条
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  })        

$(function(){
    $(".sidebar").click(function(){
        if($("#wrap").position().left == 0){
            console.log($("#wrap").position().left)
            $("#wrap").css("left","-9.0rem")
        }
        else{
            $("#wrap").css("left","0")
            // console.log($("#wrap").position().left)
        }
    })
    $.get({
            url:"sidelist.php",
            dataType:"jsonp",
            jsonp:"cb",
            success:function(data){
                var list = data.others;
                // console.log(list);
                // console.log(sidelist);
                var sideli =  `<li class="xinli"><a><div class="left">
                        <span class="txt"></span>
                    </div>
                    <div class="follow right"><i class="iconfont icon-001jinruyou"></i></div>
                </a></li>`
                for(var i = 1;i<list.length;i++){
                    $("#sidebar ul").append(sideli); 
                    $("#sidebar ul .txt").eq(i).text(list[i].name);  
                }
                for(var j = 0;j<list.length;j++){  
                    $("#sidebar ul li").eq(j)[0].index = j;  
                    $("#sidebar ul li").eq(j)[0].onclick = function(){
                        console.log(list[this.index].id);
                       var ids = list[this.index].id   
                       ids = JSON.stringify(ids)                    
                       localStorage.setItem("idc",ids)
                       console.log(idc)
                    }
                }
            }
        })

    $.get({
        url:"hot.php",
        dataType:"jsonp",
        jsonp:"cb",
        success:function(data){
            var hot = data.top_stories
            for(var i = 0;i<hot.length;i++){
                // console.log(hot[i].image) 
                // console.log(hotimg[i])
                // hotimg[i][0].style.src=hot[i].image;   
                $(".clearfix .mid").eq(i).text(hot[i].title);            
            }
        }
    })
    $.get({
        url:"latest.php",
        dataType:"jsonp",
        jsonp:"cb",
        success:function(data){
            var latest = data.stories
            var tit = `<li>
                        <div class="title"></div>
                        <div class="pic"><img src=""/></div>
                    </li>`
            for(var i = 0;i<latest.length;i++){ 
                $(".hot-list ul").append(tit);          
                $(".hot-list .title").eq(i).text(latest[i].title);            
                $(".hot-list img").eq(i).attr("src",latest[i].images)            
                
            }
        }
    })
})
