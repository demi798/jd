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
    showHide();
    secondMenu();
    search();
    share();
    address();
    shoppingCart();
    productDetail();
    mediumPic();
    movePic();
    largePic();


    //1. 鼠标移入显示,移出隐藏
    function showHide() {
        $('[name=show_hide]').hover(function () {
            //显示
            var idTemp = this.id; //临时变量
            // console.log(idTemp);
            var idTarget = idTemp + '_items';
            $('#'+ idTarget).show();
        }, function () {
            //显示
            var idTemp = this.id; //临时变量
            var idTarget = idTemp + '_items';
            $('#'+ idTarget).hide();
        });
    }

    //2. 鼠标移动切换二级导航菜单的切换显示和隐藏
    function secondMenu() {
        //元素
        $('#category_items>div').hover(function () {
            //进入
            $(this).children('div').show();
        }, function () {
            //离开
            $(this).children('div').hide();
        })
    }

    //3. 输入搜索关键字, 列表显示匹配的结果
    function search() {
/*
        1.写入数据的时候，出现智能提示
        2.失去焦点的时候，隐藏智能提示
        3.当输入框中有数据的时候，获得焦点 出现智能提示，
        4.当输入框中没有数据的时候，获得焦点 不出现智能提示
*/
        var $txtSearch = $('#txtSearch');
        $txtSearch.on('keyup focus', function () {
            var value = $(this).val();
            value = value.trim(); // '   kk    '
            // if('' === value){
            //     //什么也不干
            // }else {
            //     $('#search_helper').show();
            // }

            if('' !== value){
                $('#search_helper').show();
            }else {
                //什么也不干
            }
        }).blur(function () {
            $('#search_helper').hide();
        });
    }

    // 4. 点击显示或者隐藏更多的分享图标
    function share() {
        var $shareMore = $('#shareMore');
        var state = 'closeState'; //记录状态

        //点击回调
        $shareMore.click(function () {
            //侦测状态
            if('closeState' === state ){
                //展开
                $('#dd').width(200);
                $(this).prevAll(':lt(2)').show();
                $(this).children('b').addClass('backword');
                // 设置：当前状态为展开
                state = 'openState';
            }else {
                //收起
                $('#dd').width(155);
                $(this).prevAll(':lt(2)').hide();
                $(this).children('b').removeClass('backword');
                // 设置：当前状态为收起
                state = 'closeState';
            }
        })
    }

    //5. 鼠标移入移出切换地址的显示隐藏
    function address() {
        function closeDiv() {
            $('#store_content').hide();
            $('#store_close').hide();
        }

        $('#store_select').hover(function () {
            $('#store_content').show();
            $('#store_close').show();
        }, function () {
            closeDiv();
        });

        $('#store_close').click(function () {
            closeDiv();
        });

        $('#store_tabs>li').click(function () {
            $(this).addClass('hover').siblings().removeClass('hover');
        })
    }

    //7. 鼠标移入移出切换显示迷你购物车
    function shoppingCart() {
        $('#minicart').hover(function () {
            $(this).addClass('minicart');
            $(this).children('div').show();
        }, function () {
            $(this).removeClass('minicart');
            $(this).children('div').hide();
        })
    }

    //8. 商品详情 显示
    function productDetail() {
        $('#product_detail>ul>li').click(function () {
            $(this).addClass('current').siblings().removeClass('current');
            //5 个li 对应 5个 div
            var index = $(this).index();

            //选出所有的div 使得所有都隐藏，选出我们要的div ，使其显示
            $('#product_info, #product_data, #product_package, #product_comment, #product_saleAfter').hide().eq(index).show();

        });

    }

    //10. 当鼠标悬停在某个小图上,在上方显示对应的中图
    function mediumPic() {
        $('#icon_list>li').hover(function () {
            $(this).children('img').addClass('hoveredThumb'); //红框
            //取得原先的 串， 然后， 替换某些字符
            var smPicSrc = $(this).children('img').attr('src');
            var mPicSrc = smPicSrc.replace('.jpg', '-m.jpg');
            //改变 img 的src
            $('#mediumImg').attr('src', mPicSrc);
        }, function () {
            $(this).children('img').removeClass('hoveredThumb'); //红框
        });
    }

    //9. 点击向右/左, 移动当前展示商品的小图片
    function movePic() {
        //两个 a 标签
        var $preview = $('#preview');
        var $backward = $preview.find('h1>a:first');
        var $forward = $preview.find('h1>a:last');
        var $icon_list = $('#icon_list');
        var PIC_LEN = $icon_list.children('li').length;
        var PIC_WIDTH = 62;
        var CONTAINER_LEN = 5;
        var counter = 0; //线的左侧没有图片
        // var

        //初始化
        // 初始化 forward 标签
        if(PIC_LEN > CONTAINER_LEN){
            $forward.attr('class', 'forward');
            //ul 变宽
            $icon_list.width(PIC_LEN * PIC_WIDTH);
        }

        //前进
        $forward.click(function () {
            //检查 当前是否可以被点击，即，点击后否应该有动作
            var state = $forward.attr('class');
            if('forward_disabled' !== state){
                counter++;
                //$icon_list left 变小
                $icon_list.css({
                    left : - PIC_WIDTH * counter
                });
                //当左侧有图之后，开启后退按钮的功能
                if(counter > 0 ){
                    $backward.attr('class', 'backward'); 
                }
                //已经看到最后一张，关闭前进按钮
                if(counter >= (PIC_LEN - CONTAINER_LEN) ){
                    $forward.attr('class', 'forward_disabled');
                }
            }
        });

        //后退
        $backward.click(function () {
            //检查 当前是否可以被点击，即，点击后否应该有动作
            var state = $backward.attr('class');
            if('backward_disabled' !== state){
                counter--;
                $icon_list.css({
                    left: - PIC_WIDTH * counter
                });

                //当左侧已经没有图了，关闭后退按钮的功能
                if(counter === 0 ){
                    $backward.attr('class', 'backward_disabled');
                }
                //当左侧图的数量 大于0， 开启右侧功能
                if( counter > 0 ){
                    $forward.attr('class', 'forward');
                }
            }
        })
    }

    // 11. 当鼠标在中图上移动时, 显示对应大图的附近部分区域
    function largePic() {
        var $medimImgContainer = $('#medimImgContainer');
        var $mediumImg = $('#mediumImg');
        var $mask = $('#mask');
        var $maskTop = $('#maskTop');
        var $largeImgContainer = $('#largeImgContainer');
        var $loading = $('#loading');
        var $largeImg = $('#largeImg');

        $maskTop.hover(function () {
            //出现小黄块 和 大图容器
            $mask.show();
            $largeImgContainer.show();

            //显示大图
            var mSrc = $mediumImg.attr('src');
            var lSrc = mSrc.replace('m.jpg', 'l.jpg');
            $largeImg.attr('src', lSrc);

            $largeImg.on('load', function () {
                $loading.hide();
                $largeImg.show();

                //取得图片大小
                var lImgWidth = $largeImg.width();
                var lImgHeight = $largeImg.height();
                //设置大图 container 大小
                $largeImgContainer.width(lImgWidth / 2);
                $largeImgContainer.height(lImgHeight / 2);

                $medimImgContainer.mousemove(function (event) {
                    //取得 鼠标的坐标
                    var mouseX = event.offsetX;
                    var mouseY = event.offsetY;
                    console.log(mouseX, mouseY);

                    //取得小黄块的坐标
                    var yellowX = mouseX - ($mask.width() / 2);
                    var yellowY = mouseY - ($mask.height() / 2);
                    // 小黄块 x 取值范围 [0, $medimImgContainer.width()/2]
                    if(yellowX<0){
                        yellowX = 0;
                    }else if(yellowX > ($medimImgContainer.width()/2) ){
                        yellowX = $medimImgContainer.width()/2
                    }
                    // 小黄块 y 取值范围 [0, $medimImgContainer.height()/2]
                    if(yellowY<0){
                        yellowY = 0;
                    }else if(yellowY > ($medimImgContainer.height()/2) ){
                        yellowY = $medimImgContainer.height()/2
                    }

                    //设置 小黄块的坐标
                    $mask.css({
                        left: yellowX,
                        top: yellowY
                    });

                    // 大图的长度 * 移动的长度 / 中图的长度
                    var leftLarge = $largeImg.width() * yellowX / $mediumImg.width();
                    var topLarge = $largeImg.height() * yellowY / $mediumImg.height();
                    //设置大图的位移
                    $largeImg.css({
                        left: -leftLarge,
                        top: -topLarge
                    });
                });
            });
        }, function () {
            $mask.hide();
            $largeImgContainer.hide();
        })
    }
});
