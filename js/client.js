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
						txt = txt + "<li>";
						txt = txt + "ID : ";
						txt = txt + resumes[i].getElementsByTagName("id")[0].innerHTML + " ";
						txt = txt + resumes[i].getElementsByTagName("firstName")[0].innerHTML + " ";
						txt = txt + resumes[i].getElementsByTagName("lastName")[0].innerHTML + " ";
						txt = txt + "</li>";
					}

					txt = txt + "</ol>";

					$(".div_one_cv").slideUp();
					$(".div_add_cv").slideUp();
					$(".div_all_cv").html(txt);
					$(".div_all_cv").slideDown();
			}
		};
		
		xhr.open("GET", "http://localhost:8080/1-1.0-SNAPSHOT/rest/resume/", true);
		xhr.send(null);		
	}

	function get_one_resume() {
		var xhr = getXMLHttpRequest();

		var id_c = $("#numCV").val();

		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
					var m_xml = xhr.responseXML;

					var resumes = m_xml.getElementsByTagName("resume");

					var firstname = m_xml.getElementsByTagName("firstName")[0].innerHTML;
					var lastname = m_xml.getElementsByTagName("lastName")[0].innerHTML;

					$(".nom_prenom").html("<h2>" + firstname + " " + lastname +"</h2");

					var  txt = "<h3>Formation :</h3>";

					var formations = m_xml.getElementsByTagName("formations");

					for(var i = 0; i < formations.length; i++) {
						txt = txt + "<h4>";
						txt = txt + formations[i].getElementsByTagName("titre")[0].innerHTML;
						txt = txt + "</h4>";
						txt = txt + "<p>";
						txt = txt + formations[i].getElementsByTagName("description")[0].innerHTML;
						txt = txt + "</p>";
					}

					txt = txt + "</div>";

					$(".display_formation").html(txt);

					txt = "<h3> Langues </h3>";

					var langues = m_xml.getElementsByTagName("langues");

					txt = txt + "<ol>";
					for(var i = 0;i < langues.length; i++) {
						txt = txt + "<li>";
						txt = txt + langues[i].getElementsByTagName("name")[0].innerHTML;
						txt = txt + " - ";
						txt = txt + langues[i].getElementsByTagName("niveau")[0].innerHTML;
						txt = txt + "</li>";
					}
					txt = txt + "</ol>";

					$(".display_langues").html(txt);

					$(".div_add_cv").slideUp();
					$(".div_all_cv").slideUp();
					$(".div_one_cv").slideDown();

			}
		};
		
		xhr.open("GET", "http://localhost:8080/1-1.0-SNAPSHOT/rest/resume/" + id_c, true);
		xhr.send(null);				
	}


	function my_requeteBody() {
		var txt = "<resume>";

		var firstName = $("#firstname").val();
		var  lastName = $("#lastname").val();

		txt = txt + "<firstName>";
		txt = txt + firstName
		txt = txt + "</firstName>";

		var formations = document.getElementsByClassName("form_field");


		for(var i = 0; i < formations.length; i++) {
			txt = txt + "<formations>";
			txt = txt + "<description>";
			txt = txt +  formations[i].getElementsByTagName("input")[1].value;
			txt = txt + "</description>";
			txt = txt + "<titre>";
			txt = txt + formations[i].getElementsByTagName("input")[0].value;
			txt = txt + "</titre>";
			txt = txt + "</formations>";
		}

		var langues  = document.getElementsByClassName("field_langue");

		for(var i = 0; i < langues.length; i++) {
			txt = txt + "<langues>";
			txt = txt + "<name>";
			txt = txt +  langues[i].getElementsByTagName("input")[0].value;
			txt = txt + "</name>";
			txt = txt + "<niveau>";
			txt = txt + langues[i].getElementsByTagName("select")[0].value;
			txt = txt + "</niveau>";
			txt = txt + "</langues>";
		}

		txt = txt + "<id>0</id>"; 
		txt = txt + "<lastName>"+ lastName +"</lastName>"
		txt = txt + "</resume>";

		return txt;		
	}

	$(".validate").click(function() {
		var xhr = getXMLHttpRequest();
		
		var txt = my_requeteBody();

		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
				alert("Success");
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
		get_one_resume();
	});

	$(".btn_add_cv").click(function() {
		$(".div_one_cv").slideUp();
		$(".div_add_cv").slideDown();
		$(".div_all_cv").slideUp();
	});

	$(".btn_add_formation").click(function() {

		var txt = $(".field_add_formation").html();
		txt = txt + "<div class=\"form_field\">";
		txt = txt + "<input type=\"text\" placeholder=\"titre\"/> &nbsp <input type=\"text\" size=\"50\" placeholder=\"description\" /> <br/>";
		txt = txt + "</div>"

		$(".field_add_formation").html(txt);
	});

	$(".btn_add_langue").click(function() {

		var txt = $(".field_add_langue").html();
		txt = txt + "<div class=\"field_langue\">"
		txt = txt + "<input type=\"text\"/> &nbsp niveau <select><option>1</option><option>2</option><option>3</option></select><br/>";
		txt = txt + "</div>";

		$(".field_add_langue").html(txt);
	});

	
	/*
	$(".button_r").click(function(){
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