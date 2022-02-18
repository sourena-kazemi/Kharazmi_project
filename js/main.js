$(document).ready(function(){
	$(".navbar_options_btn").mouseenter(function(){
		$(".drop_down").fadeIn();
	});
	$(".navbar_options_btn").mouseleave(function(){
		$(".drop_down").fadeOut();
	});
	$(".first_dropdown_icon").on( "click", function(){
		$(".first_dropdown").slideToggle();
	});
	$(".second_dropdown_icon").on( "click", function(){
		$(".second_dropdown").slideToggle();
	});
	$(".menu_btn").on("click",function(){
		$(".navbar_options,.popout_box").fadeIn();
	});
	$(".popout_box").on("click", function(){
		if(window.innerWidth <= 768){
			$(".navbar_options,.popout_box,.sign_in_box").fadeOut();
		}else{
			$(".popout_box,.sign_in_box").fadeOut();
		}
	});
	$(".sign_in_btn").on("click", function(){
		$(".sign_in_box,.popout_box").fadeIn();
	});
});
let shouldFirstIconRotate=true;
let shouldSecondIconRotate=true;

function firstDropdownClick(element){
	let dropdownIcon = element;
	dropdownIcon.style.transform = iconRotateHandler(shouldFirstIconRotate);
	shouldFirstIconRotate = !shouldFirstIconRotate;
}
function secondDropdownClick(element){
	let dropdownIcon = element;
	dropdownIcon.style.transform = iconRotateHandler(shouldSecondIconRotate);
	shouldSecondIconRotate= !shouldSecondIconRotate;

}
function iconRotateHandler(inputValue){
	if(inputValue){
		return "rotate(180deg)";
	}else{
		return "rotate(0deg)";
	}
}