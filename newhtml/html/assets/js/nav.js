
$('.warpper .page-toc ul ul li a').on('click', function () {
    $('.warpper .page-toc ul ul li a').removeClass('my-active')
    $(this).addClass('my-active')
})

const svg = `<svg t="1675415793481" class="icon svg-collapse-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2698" width="24" height="24"><path d="M106.24 535.893L271.787 651.52c20.053 14.08 45.653 0 45.653-22.613V395.093c0-5.973-2.133-11.946-5.547-17.066-9.386-12.374-27.306-14.934-40.106-5.547L106.24 488.107c-14.08 11.093-14.08 33.706 0 47.786z m23.04-322.56h785.067c18.773 0 34.133-15.36 34.133-34.133s-15.36-34.133-34.133-34.133H129.28c-18.773 0-34.133 15.36-34.133 34.133s15.36 34.133 34.133 34.133z m0 665.6h785.067c18.773 0 34.133-15.36 34.133-34.133s-15.36-34.133-34.133-34.133H129.28c-18.773 0-34.133 15.36-34.133 34.133s15.36 34.133 34.133 34.133zM419.413 435.2h494.934c18.773 0 34.133-15.36 34.133-34.133s-15.36-34.134-34.133-34.134H419.413c-18.773 0-34.133 15.36-34.133 34.134s15.36 34.133 34.133 34.133z m0 221.867h495.36c18.774 0 34.134-15.36 34.134-34.134s-15.36-34.133-34.134-34.133h-495.36c-18.773 0-34.133 15.36-34.133 34.133v0.427c0 18.347 15.36 33.707 34.133 33.707z" fill="#ffffff" p-id="2699"></path></svg>`

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
    $('.nav').append(svg)
    $('.nav .logo').append(`<div class="nav_search_li"><input id="nav_search" placeholder="请输入导航名称" oninput="inputchange()"></div>`)
    let timer = null
    function inputchange(){
        clearTimeout(timer)
        timer = setTimeout(() => {
            let val = $('#nav_search').val()
            if(val){
                let lis = ``
                for (let i = 0; i < arr.length; i++) {
                    const item = arr[i];
                    if(item.title.includes(val)){
                        lis += `<li><a href="${item.href}">${item.title}</a></li>`
                    }
                }
                $('#mynavlist').html(lis)
            }else{
                $('#mynavlist').html(html)
            }
        }, 300);
        
    }

    $('.svg-collapse-icon').click(function(){
        $(this).toggleClass('iscollapse')
       if($(this).hasClass('iscollapse')){
        $('.nav').width('40px')
        $('.warpper').css('padding-left','40px')
        $('.nav .logo,#mynavlist').hide()
    }else{
        $('.nav').width('200px')
        $('.warpper').css('padding-left','200px')
        $('.nav .logo,#mynavlist').show()
       }
    })
   
}
$('.logo').on('click', function (event) {
    event.stopPropagation();
    if (isMobile) {
        $('.warpper .page-toc').toggle()
    } else {
        // $('.nav').css('display', 'none');
        // $('.warpper').css('padding', '0px');
    }
})