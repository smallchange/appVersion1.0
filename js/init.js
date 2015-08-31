$(function () {
    //get menuItems through ajax
    $('#signUpFormSubmit').click(function (ev) {
		 
        $('.menuItems').empty();
        $('menuCategories').toggleClass('hideScroll');
        var parent = $(this).parents('section').addBack().first().attr('id');
		
        $.get('ajax/' + parent + '.txt', function (data) {
            str = $.parseHTML(data, true);
            $('.menuItems').append(str);
            $('.menuItems').addClass('showRight');
        });
    });
    
    
});

function lp(){
	

}