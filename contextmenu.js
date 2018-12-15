// Code for context menu button
// Data check methods
function isPanel(val) { // Check to see if query is for a patch panel in FQN format
	return /[A-z]{3}\d{2,3}-\d{1,3}-\d{1,3}-[A-z]{1,3}|[A-z]{3}\d{2,3}-\d{1,3}-\d{1,3}-\d{1,3}-[A-z]{1,3}/.test(val);
}
function iscontractsId(val) { // Check to see if query is purely numeric or contains 'contractsId' or 'Contracts'
	return /Contracts|contractsId|^[\d]{5,7}$/.test(val);
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

// Search URL codes
let ncSearchUrl = "http://dummyaddress1&q=";
let ncDfSearchUrl = "http://dummyaddress1&q=";
let contractsUrl = "http://dummyaddress1&q=";
let spanSearchUrl = "http://dummyaddress1&q=";
let glenCarpenterIoUrl = "http://glencarpenter.io";
let dhMetroSearchUrl = "http://dummyaddress1&q=";
let dhInventoryUrl = "http://dummyaddress1&q=";
let dhSpanUrl = "http://dummyaddress1&q=";
let dhSearchUrl = "http://dummyaddress1&q=";
let goContractsUrl = "http://dummyaddress1&q=";
let teamSalesforceUrl = "http://dummyaddress1&q=";
let tfaGlobalUrl = "http://dummyaddress1&q=";
let dlrTreeUrl = "http://dummyaddress1&q=";
let ncObjUrl = "http://dummyaddress1&q=";

// Search function for context menu
function teamSearch(info,tab) {
	let inputString = info.selectionText.trim();
	let queryString = inputString.toLowerCase(); // Normalizing query
			
	switch(true) {
    case isNcObjId(queryString): // If user searched for NC Object ID, return object
		chrome.tabs.create({
				url: ncObjUrl + queryString
			});
		break;
	case iscontractsId(queryString): // If matches contractsId criteria search Contracts
        let contractsIdArr = queryString.split(" ");
		let contractsIdNumber = contractsIdArr[contractsIdArr.length-1];
		chrome.tabs.create({
			url: ContractsUrl + contractsIdNumber
		});
		break;
    case isOms(queryString) || isSpanId(queryString): //If matches span criteria search
        chrome.tabs.create({
			url: spanSearchUrl + queryString
		});
        break;
	case isPanel(queryString): // If user searched panel, search for the rack instead
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
	case isRewsId(queryString): // If searched for corporate office, use system 2 instead
		chrome.tabs.create({
				url: dhMetroSearchUrl + queryString
			});
		break;
	case isNcObjId(queryString): // If user searched for Object ID, return object
		chrome.tabs.create({
				url: ncObjUrl + queryString
			});
		break;
    default:  // defaults to system 1 search
        chrome.tabs.create({
			url: ncSearchUrl+ queryString
		});
	}
}

// Context menu
chrome.contextMenus.create({
  title: "Team Quick Search: %s", 
  contexts:["selection"], 
  onclick: teamSearch
});