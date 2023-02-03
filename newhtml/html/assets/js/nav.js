
$('.warpper .page-toc ul ul li a').on('click', function () {
    $('.warpper .page-toc ul ul li a').removeClass('my-active')
    $(this).addClass('my-active')
})



let isMobile = $(window).width() <= 479
if(isMobile) {
    $('.warpper .page-toc').on('click',function(event){
        event.stopPropagation();
        $(this).css('top','0px')
    })

    $('body').click(function() {
        $('.warpper .page-toc').hide()
    });
}else{
    let html =  $('#mynavlist').html()
    let arr = []
    $('#mynavlist > li a').each(function(i,el) {
        arr.push({
           title: $(this).text(),
           href:$(this).attr('href')
        })
    })
    console.log(arr);
    $('#mynavlist').prepend(`<li class="nav_search_li"><input id="nav_search" placeholder="请输入导航名称" onchange="inputchange()"></li>`)

    function inputchange(){
        let val = $('#nav_search').val()
        if(val){
            let lis = `<li class="nav_search_li"><input id="nav_search" placeholder="请输入导航名称" value="${val}" onchange="inputchange()"></li>`
            for (let i = 0; i < arr.length; i++) {
                const item = arr[i];
                if(item.title.includes(val)){
                    lis += `<li><a href="${item.href}">${item.title}</a></li>`
                }
            }
            $('#mynavlist').html(lis)
        }else{
            $('#mynavlist').html(html)
            $('#mynavlist').prepend(`<li class="nav_search_li"><input id="nav_search" placeholder="请输入导航名称" onchange="inputchange()"></li>`)
        }
    }
   
}
$('.logo').on('click', function (event) {
    event.stopPropagation();
    if (isMobile) {
        $('.warpper .page-toc').toggle()
    } else {
        $('.nav').css('display', 'none');
        $('.warpper').css('padding', '0px');
    }
})