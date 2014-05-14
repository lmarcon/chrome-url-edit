document.addEventListener('DOMContentLoaded', function() {
	var link = document.getElementById('go'),
			url = [];

	chrome.tabs.query({'active': true}, function (tabs) {
			var tabUrl = tabs[0].url.split('?');
			var url = tabUrl[1].split('&');

			if(document.getElementById('wrapper')){
				document.getElementById('wrapper').innerHTML += '<input type="hidden" name="baseUrl" id="baseUrl" value="' + tabUrl[0] + '">Base URL: <b>' + tabUrl[0] + '</b><br><br>';

				for(var i in url){
					var v = url[i].split('=');
					document.getElementById('wrapper').innerHTML += '<label for="val_' + i + '">' + v[0] + '</label><input type="hidden" class="hidden" name="par_' + i + '" id="par_' + i + '" value="' + v[0] + '"><input type="text" class="text" name="val_' + i + '" id="val_' + i + '" value="' + v[1] + '"><br>';
				}
			}
	});

	document.addEventListener('keyup', function() {
		var baseUrl = document.getElementById('baseUrl') ? document.getElementById('baseUrl').value : '';
				_inputs = document.getElementsByTagName('input'),
				_vals = document.getElementsByClassName('text');

		// resetting url array
		url = [];

		// skipping first input, containing the baseUrl
		for(var i = 1; i < _inputs.length; i+=2){
				url.push(_inputs[i].value + '=' + _inputs[i+1].value);
		}

		document.getElementById('newUrl').src = baseUrl + '?' + url.join('&');
		document.getElementById('newUrl').innerHTML = baseUrl + '?' + url.join('&amp;');
	});

	if(link){
		link.addEventListener('click', function() {
			var baseUrl = document.getElementById('baseUrl') ? document.getElementById('baseUrl').value : '';

			chrome.tabs.update({
				url: baseUrl + '?' + url.join('&')
			});
		});
	}
});

