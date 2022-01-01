$(document).ready(function(){
	$(".navbar_options_btn").mouseenter(function(){
		$(".drop_down").fadeIn();
	});
	$(".navbar_options_btn").mouseleave(function(){
		$(".drop_down").fadeOut();
	});
});