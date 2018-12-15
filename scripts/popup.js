// Code for search bar
// Search URL codes
let ncSearchUrl = "http://dummyaddress1.com&q=";
let ncDfSearchUrl = "http://dummyaddress1.com&q=";
let contractsUrl = "http://dummyaddress1.com&q=";
let spanSearchUrl = "http://dummyaddress1.com&q=";
let glenCarpenterIoUrl = "http://glencarpenter.io";
let dhMetroSearchUrl = "http://dummyaddress1.com&q=";
let dhInventoryUrl = "http://dummyaddress1.com&q=";
let dhSpanUrl = "http://dummyaddress1.com&q=";
let dhSearchUrl = "http://dummyaddress1.com&q=";
let goContractsUrl = "http://dummyaddress1.com&q=";
let teamSalesforceUrl = "http://dummyaddress1.com&q=";
let tfaGlobalUrl = "http://dummyaddress1.com&q=";
let dlrTreeUrl = "http://dummyaddress1.com&q=";
let ncObjUrl = "http://dummyaddress1.com&q=";

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
	var linkQuery = document.getElementById('query');
    // execute list search on 'ctrl+alt+enter', double search on 'alt+enter', 'searchDh() on 'ctrl+enter' and quickSearch() on 'enter'
    linkQuery.addEventListener('keydown', e => {
		if (e.ctrlKey && e.altKey && e.keyCode === 13) {
		e.preventDefault();
		listSearch();
		} else if (e.ctrlKey && e.keyCode === 13) {
		e.preventDefault();
		searchDh();
		} else if (e.altKey && e.keyCode === 13) {
		e.preventDefault();
		doubleSearch();
		} else if (e.keyCode === 13) {
		e.preventDefault();
		quickSearch();
		}
    });	
	var linkNc = document.getElementById('linkNc'); // event listener for click of NC button
    linkNc.addEventListener('click', () => {
        searchNc();
    });	
	var linkDh = document.getElementById('linkDh'); // event listener for click of DH button
    linkDh.addEventListener('click', () => {
        searchDh();
    });	
	var linkSsdf = document.getElementById('linkSsdf'); // event listener for click of OMS button
    linkSsdf.addEventListener('click', () => {
        searchSsdf();
    });
	var linkContractsId = document.getElementById('linkContractsId'); // event listener for click of contractsId button
    linkContractsId.addEventListener('click', () => {
        searchContractsId();
    });	
	var linkContractsData = document.getElementById('linkContractsData'); // event listener for click of go/contracts button
    linkContractsData.addEventListener('click', () => {
        searchGocontracts();
    });	
	var linkSalesforce = document.getElementById('linkSalesforce'); // event listener for click of team Salesforce button
    linkSalesforce.addEventListener('click', () => {
        searchSf();
    });	
	var linkDlr = document.getElementById('linkDlr'); // event listener for click of DLR Tree button
    linkDlr.addEventListener('click', () => {
        searchDlr();
    });	
	var linkTfaGlobal = document.getElementById('linkTfaGlobal'); // event listener for click of TFA Global button
    linkTfaGlobal.addEventListener('click', () => {
        searchTfaGlobal();
    });
});

// Regular expression check methods
function isPanel(val) { // Check to see if query is for a patch panel in FQN format
	return /[A-z]{3}\d{2,3}-\d{1,3}-\d{1,3}-[A-z]{1,3}|[A-z]{3}\d{2,3}-\d{1,3}-\d{1,3}-\d{1,3}-[A-z]{1,3}/.test(val);
}
function isContractsId(val) { // Check to see if query is purely numeric or contains 'contractsId' or 'contracts'
	return /contracts|contractsId|^[\d]{5,7}$/.test(val);
}
function isOms(val) { // Check to see if any special strings involving OMS identifiers are used
	return /gtr|md-|llh|mt\.|lt\./.test(val);
}
function isSpanId(val) { // Check to see if query is POP pair or in Span ID format, in which case quickSearch() will search go/ssdf
	return /[A-z]{3}\d{2}.[A-z]{3}\d{2}|[A-z]{3}\d{2}-[A-z]{3}\d{2}|[A-z]{3}\d{2}-[A-z]{3}\d{2}-\d-\d{3},\d{3}/.test(val);
}
function isRewsId(val) { // Check to see if query is for a REWS ID
	return /[A-z]{2}-[0-z]{3}-[0-z]{3,4}/.test(val);
}
function isNcObjId(val) { // Check to see if query is for a NetCracker Object ID
	return /\d{19,20}/.test(val);
}

// Primary 'Quick Search' function to call when 'enter' is pressed
function quickSearch() {
	let q = document.getElementById('query');
	let queryString = q.value.toLowerCase().trim(); // normalizing query string
	
	switch(true) {
	case isNcObjId(queryString): // If user searched for NC Object ID, return object
		chrome.tabs.create({
				url: ncObjUrl + queryString
			});
		break;
    case isContractsId(queryString): // If matches contractsId criteria search contracts
        let contractsIdArr = queryString.split(" ");
		let contractsIdNumber = contractsIdArr[contractsIdArr.length-1];
		chrome.tabs.create({
			url: contractsUrl + contractsIdNumber
		});
		break;
    case isOms(queryString) || isSpanId(queryString): //If matches span criteria search go/ssdf
        chrome.tabs.create({
			url: spanSearchUrl + queryString
		});
        break;
	case queryString == "":  // blank search will navigate to NC Dark Fiber search
        chrome.tabs.create({
			url: ncDfSearchUrl
		});
        break;
	case isPanel(queryString): // If user searched for Google PP in FQN format, search for the rack instead
        let ppArr = queryString.split("-");
		ppArr.pop();
		let rackString = ppArr.join("-");
		chrome.tabs.create({
			url: ncSearchUrl+ rackString
		});
        break;
	case queryString == "glen@glencarpenter.io": // Easter egg for my homepage
        chrome.tabs.create({
			url: glenCarpenterIoUrl
		});
        break;
	case isRewsId(queryString): // If user searched for a REWS ID, search Double Helix
		chrome.tabs.create({
				url: dhMetroSearchUrl + queryString
			});
		break;
    default:  // defaults to go/nc/ search
        chrome.tabs.create({
			url: ncSearchUrl+ queryString
		});
	}
}

// Search functions for buttons
function searchNc() { // function to call when NC button is clicked
	let q = document.getElementById('query');
	let queryString = q.value.toLowerCase().trim(); // normalizing query string
	
	if(queryString == ""){ // Load bulk fiber search if search field is blank
		chrome.tabs.create({
			url: ncDfSearchUrl
		});
	} else {
		chrome.tabs.create({
			url: ncSearchUrl+ queryString
		});
	}
}

function searchDh() { // function to call when DH button is clicked
	let q = document.getElementById('query');
	let queryString = q.value.toLowerCase().trim(); // normalizing query string
	
	switch(true) {
    case (queryString.length == 3): // If searching for metro load map view
        chrome.tabs.create({
			url: dhMetroSearchUrl+ queryString
		});
		break;
    case (queryString == ""): // Load inventory view if search field is blank
        chrome.tabs.create({
			url: dhInventoryUrl
		});
        break;
	case (isOms(queryString) || isSpanId(queryString)): // Load go/spans view if searching for OMS
		chrome.tabs.create({
			url: dhSpanUrl + queryString
		});
        break;
    default:  // Any other queries will load rack elevation view
        chrome.tabs.create({
			url: dhSearchUrl + queryString
		});
	}
}

function searchSsdf() { // function to call when OMS button is clicked
	let q = document.getElementById('query');
	let queryString = q.value.toLowerCase().trim(); // normalizing query string
	chrome.tabs.create({
		url: spanSearchUrl + queryString
	});
}

function searchContractsId() { // function to call when contractsId button is clicked
	let q = document.getElementById('query');
	let queryString = q.value.toLowerCase().trim(); // normalizing query string
	
	let contractsIdArr = queryString.split(" "); // checking to see if user enter "contractsId " in front of contractsId number
	let contractsIdNumber = contractsIdArr[contractsIdArr.length-1]; // contractsId number should be last element in the array
	
	if (queryString == "") {
		chrome.tabs.create({
			url: "http://dummyaddress1.com&q="
		});	
	} else {
		chrome.tabs.create({
			url: contractsUrl + contractsIdNumber
		});	
	}
}

function searchGocontracts() { // function to call when go/contracts-data button is clicked
	let q = document.getElementById('query');
	let queryString = q.value.toLowerCase().trim(); // normalizing query string
	
	let contractsIdArr = queryString.split(" "); // checking to see if user enter "contractsId " in front of contractsId number
	let contractsIdNumber = contractsIdArr[contractsIdArr.length-1]; // contractsId number should be last element in the array
	
	if (queryString == "") {
		chrome.tabs.create({
			url: "http://dummyaddress1.com&q="
		});
	} else {
		chrome.tabs.create({
			url: goContractsUrl + contractsIdNumber
		});
	}
}

function doubleSearch() { // Double Search will search NC and DH simulaneously
	let q = document.getElementById('query');
	let queryString = q.value.toLowerCase().trim(); // normalizing query string	
	let ncUrl = ncSearchUrl + queryString;
	let dhUrl = dhSearchUrl + queryString;
	let linkArray = [ncUrl, dhUrl];
	
	for (var i = 0; i < linkArray.length; i++) { // will open each link in the current window
		chrome.tabs.create({
			url: linkArray[i]
		});
	}
}

function searchSf() { // function to call when Salesforce button is clicked
	let q = document.getElementById('query');
	let queryString = q.value.toLowerCase().trim(); // normalizing query string
	
	let contractsIdArr = queryString.split(" "); // checking to see if user enter "contractsId " in front of contractsId number
	let contractsIdNumber = contractsIdArr[contractsIdArr.length-1]; // contractsId number should be last element in the array
	
	if (queryString == "") {
		chrome.tabs.create({
			url: "http://dummyaddress1.com&q="
		});
	} else {
		chrome.tabs.create({
			url: teamSalesforceUrl + contractsIdNumber
		});
	}
}

function searchDlr() { // function to call when DLR tree button is pushed
	let q = document.getElementById('query');
	let queryString = q.value.toLowerCase().trim(); // normalizing query string
	
	if (queryString == "") {
		chrome.tabs.create({
			url: "http://dummyaddress1.com&q="
		});
	} else {
		chrome.tabs.create({
			url: dlrTreeUrl + queryString
		});
	}
}

function searchTfaGlobal() { // function to call when TFA Global button is pushed
	let q = document.getElementById('query');
	let queryString = q.value.toLowerCase().trim(); // normalizing query string
	
	if (queryString == "") {
		chrome.tabs.create({
			url: "http://dummyaddress1.com&q="
		});
	} else {
		chrome.tabs.create({
			url: tfaGlobalUrl + queryString
		});
	}
}

function listSearch() { // function to search a list of items separated by commas or whitespaces
	let q = document.getElementById('query');
	let queryString = q.value.toLowerCase().trim(); // normalizing query string
	let listArr = queryString.split(/[\s,]+/);  // Split at any whitespace or commas
	let uniqueArr = listArr.filter((v, i, a) => a.indexOf(v) === i);  // Filtering array to unique values
	
	uniqueArr.forEach(ncObject => {
		switch(true){
		case (ncObject == "" || ncObject == "	"): // If whitespace ignore
			return;
		break;
		case (isNcObjId(ncObject)): // If searching for NC Object ID use ncObjUrl
			chrome.tabs.create({
				url: ncObjUrl + ncObject
			});
		break;
		case (isPanel(ncObject)): // Return racks if searching for panel FQNs
			let ppArr = ncObject.split("-");
			ppArr.pop();
			let rackString = ppArr.join("-");
			chrome.tabs.create({
				url: "http://dummyaddress1.com&q=" + rackString
			});
		break;
		default:
			chrome.tabs.create({
				url: "http://dummyaddress1.com&q=" + ncObject
			});
		}
	});
}