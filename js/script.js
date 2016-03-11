
var baseURL = "https://api.github.com/users/"
var profileURL = "https://api.github.com/users/devholman"
var repoURL = "https://api.github.com/users/devholman/repos"
var pageContainer_El = document.querySelector(".profile_container")
var search_El = document.querySelector("#search-bar")


// var apiKey = 

var inputToURL = function(keyEvent){
	var search_El = keyEvent.target
	if(keyEvent.keyCode === 13){
		var userName = search_El.value
		search_El.value = ""
		location.hash=userName
	}
}

search_El.addEventListener("keydown", inputToURL)

var getUserData = function(userName){
// pull profile information from username	
	var fullProfileURL = baseURL + userName
	// console.log(fullProfileURL)
	var userProfileURLPromise = $.getJSON(fullProfileURL)
	userProfileURLPromise.then(handleProfileData )
// pull repository information from user profile
	var fullRepoURL = baseURL + userName + "/repos"
	// console.log(fullRepoURL)

	var userReposURLPromise = $.getJSON(fullRepoURL)
	userReposURLPromise.then(handleRepoData)
}

var controller = function(){
	var userName = location.hash.substring(1)
	getUserData(userName)
}

window.addEventListener("hashchange", controller)
// profileURL.then(getUserData)


var profilePromise = $.getJSON(profileURL)

var handleProfileData = function(JSONData){
 console.log(JSONData)

 pageContainer_El.innerHTML = masterProfileHTMLString(JSONData)
 
}


var masterProfileHTMLString = function(objString){
	console.log(objString)
		//************** PROFILE NAME & IMAGE ******************
	var htmlstr =   '<div>'
	    htmlstr +=    '<img src="' + objString.avatar_url + '"/>'
	    htmlstr += 	  "<h1>" + objString.name + "</h1>"
	    htmlstr += 	  "<h3>" + objString.login + "</h3>"
	    //************** LOCATION INFORMATION ******************
	    htmlstr += 	  '<div class="location">'
	    htmlstr += 	    "<ul>"
	    htmlstr += 		  '<i class="fa fa-map-pin"></i>'
	    htmlstr += 		  '<h4>' + objString.location + '</h4>'
	    htmlstr += 	    "</ul>"
	    htmlstr += 		"<ul>"
	    htmlstr += 		   '<i class="fa fa-clock-o"></i>'
	    htmlstr += 		  '<h4>' + objString.created_at + '</h4>'
	    htmlstr += 		"</ul>"
	    htmlstr +=	  '</div>'
	    //************** STAT INFORMTION ************************
	    htmlstr += 	  '<div class ="stats-container">'
	    htmlstr += 		'<div class="stats">'
	    htmlstr += 		  '<h3>' + objString.followers + '</h3>'
	    htmlstr += 		  '<a class="stat-urls" href="' + objString.followers_url +'">' + "followers" + '</a>'
	    htmlstr += 		'</div>'
	    htmlstr += 		'<div class="stats">'
	    htmlstr += 		  '<h3>' + objString.public_gists + '</h3>'
	    htmlstr += 		  '<a class="stat-urls" href="' + objString.starred_url +'">' + "starred" + '</a>'
	    htmlstr += 		'</div>'
	    htmlstr += 		'<div class="stats">'
	    htmlstr += 		  '<h3>' + objString.following + '</h3>'
	    htmlstr += 		  '<a class="stat-urls" href="' + objString.following_url +'">' + "following" + '</a>'
	    htmlstr += 		'</div>'
	    htmlstr += 	  '</div>'	
	    htmlstr +=   '</div>'
	    htmlstr +=  '</div>'
		return htmlstr
}

profilePromise.then(handleProfileData)

// ---------- REPO DATA SCRIPT --------------
var repoPromise = $.getJSON(repoURL)
var repoContainer_El = document.querySelector(".repo_container")

var handleRepoData = function(JSONData){
	console.log(JSONData)
	var htmlstr = ''
	for(var i=0; i < JSONData.length; i++){
		var newData = JSONData[i]
		htmlstr = masterRepoHTMLString(newData)
		repoContainer_El.innerHTML += htmlstr
	}
}

var masterRepoHTMLString = function(objArr){
	var htmlstr = 	 '<ul class="repo-list">' 
		htmlstr += 	 '<i class="fa fa-book"></i>'
		htmlstr += 	 '<a href="#">' + objArr.name + '</a>'
		htmlstr += 	 '<p>' + objArr.stargazers_count + '</p>'
		htmlstr += 	 '<i class="fa fa-star"></i>'
		htmlstr += 	 '</ul>'
		return htmlstr
}

repoPromise.then(handleRepoData)



