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

	function get_all_resume() {
		var xhr = getXMLHttpRequest();

		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
					var m_xml = xhr.responseXML;

					var resumes = m_xml.getElementsByTagName("allCV");

					var txt = "<ol>";

					for(var i = 0; i < resumes.length; i++) {
						txt += "<li>";
						txt += "ID : ";
						txt += resumes[i].getElementsByTagName("id")[0].innerHTML + " ";
						txt += resumes[i].getElementsByTagName("firstName")[0].innerHTML + " ";
						txt += resumes[i].getElementsByTagName("lastName")[0].innerHTML + " ";
						txt += "</li>";
					}

					txt += "</ol>";

					$(".div_one_cv").slideUp();
					$(".div_add_cv").slideUp();

					$(".div_all_cv").html(txt);

					$(".div_all_cv").slideDown();
			}
		};
		
		xhr.open("GET", "http://localhost:8080/1-1.0-SNAPSHOT/rest/resume/", true);
		xhr.send(null);		
	}


	function my_requeteBody() {
		var txt = "<resume>";

		var firstName = $("#firstname").val();
		var  lastName = $("#lastname").val();

		txt += "<firstName>" + firstName + "</firstName>";
		txt += "<id>0</id>"; 
		txt += "<lastName>"+ lastName +"</lastName>"
		txt += "</resume>";

		return txt;		
	}

	$(".validate").click(function() {
		var xhr = getXMLHttpRequest();
		
		var txt = my_requeteBody();

		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
				alert(xhr.responseText);
				$(".message_failure").slideUp();
				$(".message_success").html("Succés de la requete");
			}

			if(xhr.status == 400) {
				$(".message_failure").html("Echec de la requete : formulaire mal remplie");
				$(".message_success").slideUp();
				$(".message_failure").slideDown();
			}
		};
		
		xhr.open("POST", "http://localhost:8080/1-1.0-SNAPSHOT/rest/resume/", true);
		xhr.setRequestHeader("Content-Type", "application/xml");
		xhr.send(txt);
	});

	$(".btn_all_cv").click(function() {
		get_all_resume();
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

	$(".btn_add_formation").click(function() {

		var txt = $(".field_add_formation").html();

		txt = txt + "<input type=\"text\" placeholder=\"re\"/> &nbsp <input type=\"text\" size=\"30\" placeholder=\"description\" /> <br/>";

		$(".field_add_formation").html(txt);
	});

	$(".btn_add_langue").click(function() {

		var txt = $(".field_add_langue").html();

		txt = txt + "<input type=\"text\"/> &nbsp <select><option>1</option><option>2</option><option>3</option></select><br/>";

		$(".field_add_langue").html(txt);
	});

	
	$(".button_r").click(function(){
		var xhr = getXMLHttpRequest();
		
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
				alert(xhr.responseXML);
			}
		};
		
		xhr.open("GET", "http://localhost:8080/1-1.0-SNAPSHOT/rest/resume/", true);
		xhr.send(null);
	});
});