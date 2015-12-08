$.fn.dyForm = function(ok, error) {
	form = this;
	debug = false;
    $(form).on('submit',function(){
		$(".black").show();
		data = $(this).serialize();
		url = $(this).attr("action");
		typ = $(this).attr("method");
		if(typ==undefined)
		{
			typ = "GET";
		}
		if(url==undefined)
		{
			url = window.location.href;
		}
		if(debug) { console.log("AJAX REQEUST"); console.log(typ+": "+url);console.log(data); }
		$.ajax({
			method: typ,
			url: url,
			data: data,
		})
		.done(function( msg, status, xhr ) {
			$(".black").hide();
			if(ok==undefined)
			{
				var json = false;
				try {
				    json = $.parseJSON(msg);
				} catch (e) {
					//console.log(e);
				    // not json
				}
				if(json===false)
				{
					$.fn.dyForm.alert("OK", msg, "success");
				}
				else {
					$.fn.dyForm.jsonParse(json);
				}
			}
			else {
				ok(msg);
			}

		})
		.error(function (msg) {
			$(".black").hide();
			if(error==undefined)
			{
				$.fn.dyForm.alert("Error", msg["statusText"], "error");
			}
			else {
				error(msg["statusText"], msg);
			}

		});
		return false;
	});
};

$.fn.dyForm.jsonParse = function(obj) {
	console.log(obj["status"]);
	if(obj["status"] == undefined)
	{
		$.fn.dyForm.alert("Error", "No Status in AJAX Return", "error");
	}
	if(obj["msg"] != undefined && obj["url"] == undefined)
	{
		if(obj["status"]==true)
		{
			if(obj["headline"]==undefined)
			{
				obj["headline"] = "Done";
			}
			$.fn.dyForm.alert(obj["headline"], obj["msg"], "success");
		}
		if(obj["status"]==false)
		{
			if(obj["headline"]==undefined)
			{
				obj["headline"] = "Error";
			}
			$.fn.dyForm.alert(obj["headline"], obj["msg"], "error");
		}
	}
	if(obj["msg"] != undefined)
	{
		if(obj["status"]==true)
		{
			if(obj["headline"]==undefined)
			{
				obj["headline"] = "Done";
			}
			$.fn.dyForm.alert(obj["headline"], obj["msg"], "success", obj["url"]);
		}
		if(obj["status"]==false)
		{
			if(obj["headline"]==undefined)
			{
				obj["headline"] = "Error";
			}
			$.fn.dyForm.alert(obj["headline"], obj["msg"], "error", obj["url"]);
		}
	}
	if(obj["msg"] == undefined && obj["url"]!=undefined)
	{
		window.location.href = obj["url"];
	}
	console.log(obj["msg"]);
};

$.fn.dyForm.alert = function (headline, msg, status, url)
{
	try {
		swal({
			title: headline,
			text:msg,
			type:status
		}, function () {
			if(url!=undefined)
			{
				window.location.href = url;
			}
		});
	} catch (e) {
		if(url!=undefined)
		{
			window.location.href = url;
		}
		else {
			alert(headline+": "+msg);
		}

	} finally {

	}
};
