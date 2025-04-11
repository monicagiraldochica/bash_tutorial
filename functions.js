function showContent(num){
	var i;
	for (i=1; i<=20; i++) {
		var x = document.getElementById("content".concat(i)).style;
		if (i==num){
			x.display="block";
	  	}
		else{
			x.display="none";
	  	}
	}
}
			
function showErrSec(){
	var e = document.getElementById("chaperror");
	var num = e.options[e.selectedIndex].value;
	var i;
	for (i=1; i<=6; i++) {
		var x = document.getElementById("secerror".concat(i)).style;
		if (i==num){
			x.display="block";
	  	}
		else{
			x.display="none";
	  	}
	}
}
			
function showOther(){
	var e = document.getElementById("etype");
	var num = e.options[e.selectedIndex].value;
	var x = document.getElementById("other").style;
	if (num==5){
		x.display="block";
	}
	else{
		x.display="none";
	}
}
