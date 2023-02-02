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