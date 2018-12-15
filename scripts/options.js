// Code for options page

$(document).ready(function(){
	$("#button1").click(function(){ // Who can use this tool?
		$("#info1").slideToggle(400, "swing");
	});	
	$("#button2").click(function(){ // Are there any keyboard shortucts?
		if($("#info2").is(':hidden')) {
			$("#info2").slideDown(400, "swing");			
			$([document.documentElement, document.body]).animate({
			scrollTop: $("#button2").offset().top
		}, 400);
		} else {
			$("#info2").slideUp(400, "swing");
		}
	});	
	$("#button3").click(function(){ // How does the Team Quick Search work?
		if($("#info3").is(':hidden')) {
			$("#info3").slideDown(400, "swing");			
			$([document.documentElement, document.body]).animate({
			scrollTop: $("#button3").offset().top
		}, 400);
		} else {
			$("#info3").slideUp(400, "swing");
		}
	});	
	$("#button4").click(function(){ // Do I need to click the search buttons?
		if($("#info4").is(':hidden')) {
			$("#info4").slideDown(400, "swing");			
			$([document.documentElement, document.body]).animate({
			scrollTop: $("#button4").offset().top
		}, 400);
		} else {
			$("#info4").slideUp(400, "swing");
		}
	});	
	$("#button5").click(function(){ // What do the buttons do?
		if($("#info5").is(':hidden')) {
			$("#info5").slideDown(400, "swing");			
			$([document.documentElement, document.body]).animate({
			scrollTop: $("#button5").offset().top
		}, 400);
		} else {
			$("#info5").slideUp(400, "swing");
		}
	});	
	$("#button6").click(function(){ // // How do I report an issue?
		if($("#info6").is(':hidden')) {
			$("#info6").slideDown(400, "swing");			
			$([document.documentElement, document.body]).animate({
			scrollTop: $("#button6").offset().top
		}, 400);
		} else {
			$("#info6").slideUp(400, "swing");
		}
	});
});