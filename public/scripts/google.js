function onSignIn(googleUser) {
				var id_token = googleUser.getAuthResponse().id_token;
				const xhr = new XMLHttpRequest();
				xhr.open('POST', '/auth', true);
				xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
				xhr.onload = function() {
								console.log('Signed in as: ' + xhr.responseText);
								window.location.href = "/";
				};
				xhr.send('idtoken=' + id_token);
}

function signOut() {
				var auth2 = gapi.auth2.getAuthInstance();
				auth2.signOut().then(function () {
								const xhr = new XMLHttpRequest();
								xhr.open('POST', '/deauth', true);
								xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
								xhr.onload = function() {
												console.log('Signed Out');
								};
								xhr.send();
				});
}