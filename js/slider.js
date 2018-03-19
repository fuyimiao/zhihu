window.onload = function(){
    banner();
}

var banner = function(){   
    var banner = document.querySelector(".jd_banner");
    var width = banner.offsetWidth;
    var imagebox = banner.querySelector("ul:first-child");
    var pointbox = banner.querySelector("ul:last-child");
    var points = pointbox.querySelectorAll('li');
    var addTransition = function(){
        imagebox.style.transition = 'all 0.2s';
        imagebox.style.webkitTransition = "all 0.2s"; 
    }
    var removeTransition = function(){
        imagebox.style.transition = 'none';
        imagebox.style.webkitTransition = "none";  
    }
    var setTranlateX = function(translatex){
        imagebox.style.transform = "translateX("+translatex+"px)";
        imagebox.style.webkitTramsform = "translateX("+translatex+"px)";
    }
    var index = 1;
    var timer = setInterval(function(){
        index ++;
        addTransition();
        setTranlateX(-index*width);
    },3000);
        imagebox.addEventListener('transitionend',function(){
        if(index >= 6){
            index =1;
            removeTransition();
            setTranlateX(-index*width);
        }
        else if(index<=0){
            index = 5;
            removeTransition();
            setTranlateX(-index*width);
        }
        setpoint();
    })
    var setpoint = function(){
        for(var i =0;i<points.length;i++){
            points[i].classList.remove("now");
        }
        points[index-1].classList.add("now")
    }

    var startX = 0;  
    var distanceX = 0;   
    var ismove = false;
    imagebox.addEventListener("touchstart",function(e){
        clearInterval(timer);
        startX = e.touches[0].clientX;
    });
     document.body.addEventListener("touchmove",function(e){
            // console.log(e)
            var moveX =  e.touches[0].clientX;
            // console.log(moveX)
            distanceX = moveX - startX;
            var translateX = -index*width +distanceX;
            removeTransition();
            setTranlateX(translateX);
            ismove = true;
        });

    imagebox.addEventListener("touchend",function(e){
        if(ismove){
            if(Math.abs(distanceX)<width/3){
                addTransition();
                setTranlateX(-index*width);
            }else{
                if(distanceX>0){
                    index--;
                }else{
                    index++;
                }
                addTransition();
                setTranlateX(-index*width);
            }
        }
        clearInterval(timer);
        timer = setInterval(function(){
            index ++;
            addTransition();
            setTranlateX(-index*width);
        },2000);
        startX = 0;
        distanceX = 0;
        ismove = false;
    });

}

$(function(){
    $(".sidebar").click(function(){
        if($("#wrap").position().left == 0){
            console.log($("#wrap").position().left)
            $("#wrap").css("left","-9.0rem")
        }
        // console.log($("#wrap").position().left);
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
