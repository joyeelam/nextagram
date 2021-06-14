LoginPage.js
- line 29, 30
	- these lines are not needed because when you navigate to a new page, the component will be unmounted, thus resetting state
UserPage.js
- you might wanna check if the token exists first before making the axios request, since without the token, your request would fail
- line 29
	- same as above, not needed because the component will be unmounted anyways

Other than these, code looks good! Can continue on to put the user's images into the page as well