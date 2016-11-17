/*
 1. 鼠标移入显示,移出隐藏
 目标: 手机京东, 客户服务, 网站导航, 我的京东, 去购物车结算, 全部商品
 2. 鼠标移动切换二级导航菜单的切换显示和隐藏
 3. 输入搜索关键字, 列表显示匹配的结果
    1.写入数据的时候，出现智能提示
    2.失去焦点的时候，隐藏智能提示
    3.当输入框中有数据的时候，获得焦点 出现智能提示，
    4.当输入框中没有数据的时候，获得焦点 不出现智能提示

 4. 点击显示或者隐藏更多的分享图标
 5. 鼠标移入移出切换地址的显示隐藏
 6. 点击切换地址tab

 7. 鼠标移入移出切换显示迷你购物车
 8. 点击切换产品选项 (商品详情等显示出来)

 9. 点击向右/左, 移动当前展示商品的小图片
    思路：
        1.选出可能用到的元素
        2.初始化：1.iconList的宽度		2.$forward样式
        3.点击按钮绑定事件
            1.判断点击是否有效
            2.更新图片位置（记录越过线的图片数量）
            3.更新对侧按钮样式

 10. 当鼠标悬停在某个小图上,在上方显示对应的中图
 11. 当鼠标在中图上移动时, 显示对应大图的附近部分区域 largeIcon();
    思路：
        1.观察用到的元素，选取可能用到的元素
        2.绑定鼠标移入事件
            1.显示响应的元素
            2.拼接大图的 src
            3.监听大图加载完成的事件
                1.隐藏loading，显示大图
                2.得到大图的尺寸
                3.设置容器的尺寸
                4.绑定鼠标移动事件
                    1.获得鼠标的坐标
                    2.根据鼠标位置设置遮罩的位置
                    3.确定遮罩横纵坐标的可用取值范围
                    4.设置遮罩具体显示位置
                    5.根据比例计算出大图的位置
                    6.设置大图的位置
        3.绑定鼠标移出事件
            1.隐藏相应的元素


 */


$(function () {
    //1. 鼠标移入显示,移出隐藏
    //目标: 手机京东, 客户服务, 网站导航, 我的京东, 去购物车结算, 全部商品
    $("[name=show_hide]").hover(function(){
        $(this).children().show();
    },function(){
        //获取要显示部分的共通处即id的末尾均以_items结尾
        var id = this.id;
        $(this).children('#'+id+'_items').hide();
    });

    //2. 鼠标移动切换二级导航菜单的切换显示和隐藏
    $(".cate_item").hover(function(){
        $(this).children(".sub_cate_box").show();
    },function(){
        $(this).children(".sub_cate_box").hide();
    });

    //3. 输入搜索关键字, 列表显示匹配的结果
    var $searchInput = $("#txtSearch");
    $searchInput.on("keyup focus",function(){
        var searchValue = $(this).val().trim();
        if('' != searchValue){
            $("#search_helper").show();
        }
    }).blur(function(){
        $("#search_helper").hide();
    });

    // 4. 点击显示或者隐藏更多的分享图标
    $('#shareMore').click(function(){
        var $icon = $(this).children();
        if( $icon.hasClass("backword")){
            $icon.removeClass("backword");
            $(this).parent().width(155)
                .end().siblings(".share_kaixin,.share_douban").hide();
        }else{
            $(this).parent().width(200)
                .end().siblings(".share_kaixin,.share_douban").show();
            $icon.addClass("backword");
        }

    });

    //5. 鼠标移入移出切换地址的显示隐藏
    $("#store_select").hover(function(){
        $(this).children("#store_content").show();
    },function(){
        $(this).children("#store_content").hide();
    });
    //选项卡
    $("#store_tabs").find("li").click(function(){
        $(this).addClass("hover").siblings().removeClass("hover");
    });

    //7. 鼠标移入移出切换显示迷你购物车
    $("#minicart").hover(function(){
        $(this).addClass("minicart")
            .children("div").show();
    },function(){
        $(this).removeClass("minicart")
            .children("div").hide();;
    });

    //8. 商品详情 显示
    $("#product_detail").find("ul.main_tabs").find("li").click(function(){
        $(this).addClass("current").siblings().removeClass("current");
        var index = $(this).index();
        $("#product").children().eq(index).show().siblings().hide();
        console.log($("#product").children().index());
    });

    //10. 当鼠标悬停在某个小图上,在上方显示对应的中图
    var $iconList = $("#icon_list");
    var $iconL = $iconList.find("li");
    var iconLWidth = $iconL.width();
    var iconLen = $iconList.children().length;
    $iconList.width(iconLWidth*iconLen);

    $iconL.hover(function(){
        //完成小图大图切换
        var $mediumImg = $("#mediumImg");
        var smallImgSrc = $(this).children("img").attr("src");
        mediumSrcNew = smallImgSrc.replace('.jpg','-m.jpg');
        $mediumImg.attr('src',mediumSrcNew);
        //修改小图hover时对应的样式
        $(this).children("img").addClass("hoveredThumb");
    },function(){
        $(this).children('img').removeClass('hoveredThumb');
    });

    //9. 点击向右/左, 移动当前展示商品的小图片
    var $preview = $("#preview");
    //获取向后按钮
    var $backward = $preview.find("h1>a:first");
    //获取向前按钮
    var $forward = $preview.find("h1>a:last");
    var index = 0;

    var state = "open";
    //初始化forward按钮状态
    if(iconLen > 5){
        $forward.attr("class","forward");
    }

    //前进
    $forward.click(function(){
        var state = $forward.attr("class");
        if("forward_disabled" !== state){
            index++;
            $iconList.animate({
                left: -iconLWidth*index
            },500);
            if(3 === index){
                $(this).attr("class","forward_disabled");
            }
        $backward.attr("class","backward");
        }
    });

    //后退
    $backward.click(function(){
        var state = $backward.attr("class");
        if("backward_disabled" !== state) {
            index--;
            $iconList.animate({
                left: -iconLWidth * index
            }, 500);
            if (0 === index) {
                $(this).attr("class", "backward_disabled");
            }
            $forward.attr("class","forward");
        }
    });

    // 11. 当鼠标在中图上移动时, 显示对应大图的附近部分区域
    var $mask = $("#mask");
    var $mediumImg = $("#mediumImg");
    var $medimImgContainer = $("#medimImgContainer");
    var $largeImgContainer = $("#largeImgContainer");
    var $largeImg = $("#largeImg");

    //在maskTop中设置hover，防止当大图出现鼠标移入大图hover事件未取消
    $("#maskTop").hover(function(){
        $mask.show();
        $largeImgContainer.show();

        //小黄块在框内移动
        $medimImgContainer.mousemove(function(event){
            var x = event.offsetX;
            var y = event.offsetY;
            var maskX = x - ($mask.width() / 2);
            var maskY = y - ($mask.height() / 2);
            var maxXLength = $mask.width();
            var maxYLength = $mask.height();

            //待图片加载完成后loading图标消失
            $largeImg.on("load",function(){
                $("#loading").hide();
                $largeImg.show();
            });

            //显示大图
            var mediumSrc = $mediumImg.attr("src");
            var largeSrc = mediumSrc.replace("m.jpg","l.jpg");
            $largeImg.attr("src",largeSrc);

            //对小黄块进行边界限定
            if(maskX < 0){
                maskX = 0;
            }else if(maskX >= maxXLength){
                maskX = maxXLength;
            }
            if(maskY < 0){
                maskY = 0;
            }else if(maskY >= maxYLength){
                maskY = maxYLength;
            }

            //小黄块随鼠标进行移动
            $mask.css({
                left: maskX,
                top: maskY
            });

            //设置大图容器大小
            var largeWidth = $largeImg.width();
            var largeHeight = $largeImg.height();
            $largeImgContainer.width(largeWidth/2);
            $largeImgContainer.height(largeHeight/2);

            //使大图的坐标跟随小黄块进行变化
            var largeLeft = largeWidth * maskX / $mediumImg.width();
            var largeTop = largeHeight * maskY / $mediumImg.height();
            $largeImg.css({
                left: -largeLeft,
                top: -largeTop
            });

        });
    },function(){
        $mask.hide();
        $largeImgContainer.hide();
    });





});




