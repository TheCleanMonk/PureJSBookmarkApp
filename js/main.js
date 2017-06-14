// Look for form submission

document.getElementById("myform").addEventListener('submit', saveBookmark);

// Save Bookmark
function saveBookmark(e){
	console.log('It Works');

	var siteName = document.getElementById('siteName').value;
	var siteUrl = document.getElementById('siteUrl').value;

	if(!siteName || !siteUrl){
		alert('Please fill in the form');
		return false;
	}
	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);
	if(siteUrl.match(regex)){
		alert("Valid url");	
	}
	else{
		alert("invalid url");
		exit(0);
	}
	var bookmark = {
		name: siteName,
		url: siteUrl
	}

 	// Local Storage Test
	// localStorage.setItem('test','hello world');
	// console.log(localStorage.getItem('test'));
	// localStorage.removeItem('test');
	// console.log(localStorage.getItem('test'));
	// prevent form from submitting

	if(localStorage.getItem('bookmarks') === null){
		var bookmarks = [];
		bookmarks.push(bookmark);
		// set to local storage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	}
	else{
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

		bookmarks.push(bookmark);

		localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
	}
		fetchBookmarks();
	// e.preventDefault();
}

function deleteBookmark(url){
	// get bookmark from localstorage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	// Loop through bookmarks
	for(var i=0;i < bookmarks.length;i++){
		if(bookmarks[i].url == url){
		// Remove fromm array
		bookmarks.splice(i,1);
		}

	}

	// re-set local storage
	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

	fetchBookmarks();
}
// Get Bookmarks
function fetchBookmarks(){
	// get bookmarks from localstorage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

	// get output id
	var bookmarksResults = document.getElementById('bookmarkResults');

	// Build output
	bookmarksResults.innerHTML = '';
	for(var i = 0; i < bookmarks.length; i++){
		var name = bookmarks[i].name;
		var url = bookmarks[i].url;
		console.log(url);
		// url check to see if contains http or https
		if(url.includes("http://www.")){
			url = url.slice(11);
		}
		else if(url.includes("https://www.")){
			url = url.slice(12);
		}
		else if(url.includes("www.")){
			url = url.slice(4);
		}
		bookmarksResults.innerHTML += '<div class="well">'+
									   '<h3>'+name+
									   ' <a class="btn btn-default" target="_blank" href="http://www.'+url+'">Visit</a> '+
									   ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete+</a>'
									   '</div>';
	}
}