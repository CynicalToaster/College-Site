function send_ajax(form, event, parameters)
{
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(e) {
        if (this.readyState == 4 && this.status == 200) {
            parameters['update'].html(this.responseText);
        }
    };
    
    xhttp.addEventListener("load", parameters['onSuccess']);

    xhttp.open("POST", window.location.pathname, true);
    xhttp.setRequestHeader('event', event);
    xhttp.send(new FormData(form));
}