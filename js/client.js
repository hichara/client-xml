$(document).ready(function() {
/*
	$("button").click(function(){
		alert("bool2");
    	$.ajax({url: "http://localhost:8080/1-1.0-SNAPSHOT/rest/resume", success: function(result){
        	$("#div1").html(result);
        	alert(result);
    	}});
	}); */
	
	function getXMLHttpRequest() {
	var xhr = null;
	
	if (window.XMLHttpRequest || window.ActiveXObject) {
		if (window.ActiveXObject) {
			try {
				xhr = new ActiveXObject("Msxml2.XMLHTTP");
			} catch(e) {
				xhr = new ActiveXObject("Microsoft.XMLHTTP");
			}
		} else {
			xhr = new XMLHttpRequest(); 
		}
	} else {
		alert("Votre navigateur ne supporte pas l'objet XMLHTTPRequest...");
		return null;
	}
	
	return xhr;
	}

	function my_display(e) {
		alert(e);
	}

	function my_add(e) {
		alert(e);
	}

	$(".btn_all_cv").click(function() {
		$(".div_one_cv").slideUp();
		$(".div_add_cv").slideUp();
		$(".div_all_cv").slideDown();
	});

	$(".btn_one_cv").click(function() {

		$(".div_one_cv").slideDown();
		$(".div_add_cv").slideUp();
		$(".div_all_cv").slideUp();
	});

	$(".btn_add_cv").click(function() {

		$(".div_display_cv").slideUp();
		$(".div_add_cv").slideDown();
		$(".div_all_cv").slideUp();
	});

	
/*	$("button").click(function(){
		var xhr = getXMLHttpRequest();
		
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
				alert(xhr.responseXML);
			}
		};
		
		xhr.open("GET", "http://localhost:8080/1-1.0-SNAPSHOT/rest/resume/", true);
		xhr.send(null);
	}); */
});