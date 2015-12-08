# DyForm
DyForm is a JQuery Plugin to make normal HTML-Forms automaticly fluffy with AJAX and optional [SweetAlert](http://t4t5.github.io/sweetalert/). It can pars all Form-Elements from a Webpage and make AJAX-Reqeust from it.

# Install
Download the last DyForm.js from Github and bind it in your source:

    <script src="myscripts.js"></script>

To easy use it at all Forms use the following Code:

    <script language="javascript">
	    $("form").dyForm();
    </script>

# Usage
DyForm loads the Attributs from the Form

    <form mehtod="POST" action="index.php">
    <input name="foo" value="bar">
    <input type="submit">
    </form>

This Form will generate a AJAX Call to the index.php via a HTTP-POST Request. If the user dont Modfy the textbox ist send "foo=bar". The AJAX-Request is fired when the Form is submitted.

DyForm requires a JSON Response with the HTTP-Status Code 200. If there is another HTTP-Status Code like 404 or 500 it makes an Errror (call the error function, or if it undefined draw a alert (or sweetalert)).

If the Response Code is 200 dyForm try to parse the  result as JSON. If the result is no valid Json it try to call the callback (or draw a alert/sweetalert with the Text and a success Message). If the result is a valid Json there are the following Parameters used:

    {
		"status": true, //Required (Boolean)
		"headline": "Done", // Opional for sweet alert Headline (string)
		"msg": "Form Submitted", //Optional for sweet alert or alert Content (string)
		"url": "http://www.github.com" //Optional Redirect to the URL (string)
	}

Based on the result and the environment dyForm do different things:

## With sweetAlert
If headline is not set, it will be added with the Defaults "Done" or "Error". If the msg is set, it allways creat the sweetAlert Message. After the sweetAlert is closed and the url is set ( != undefined) it will redirect to the given URL.

If the msg is undefined and the url is not undefined, it will direct redirect to the given url.

## Without sweetAlert
If headline is not set, it will be added with the Defaults "Done" or "Error".

If the url is set, it will direct redirect to the given URL (dont show the alert msg). If the url is undefined and the msg is not undefinedt, it will draw an alert with the with the headline and msg separate by a ":".

# Own Handlers
You can define own Handlers for success or errors. They will get the Body Result of the Request.

To set own Handlers you have to define functions and give them the dyForm:

    <script language="javascript">
	    function callOk(msg)
	    {
		    //Do Stuff Here
	    }
	    function callError(msg)
	    {
		    //Do Stuff Here
	    }
	    $("form").dyForm(callOk, callError);
    </script>
