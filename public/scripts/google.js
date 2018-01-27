function onSignIn(googleUser) {
				var profile = googleUser.getBasicProfile();
				var id_token = googleUser.getAuthResponse().id_token;
				const xhr = new XMLHttpRequest();
				xhr.open('POST', 'http://localhost:8081/auth', true);
				xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

				xhr.send('idtoken=' + id_token);
}

function signOut() {
				var auth2 = gapi.auth2.getAuthInstance();
				auth2.signOut().then(function () {
								console.log('User signed out.');
				});
}