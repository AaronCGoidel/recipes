function test(){
				alert("test");
}

function onSignIn(googleUser) {
				var profile = googleUser.getBasicProfile();
				// alert('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
				// alert('Name: ' + profile.getName());
				// alert('Image URL: ' + profile.getImageUrl());
				// alert('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}

function signOut() {
				var auth2 = gapi.auth2.getAuthInstance();
				auth2.signOut().then(function () {
								console.log('User signed out.');
				});
}