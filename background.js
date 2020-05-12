const data_ext_re = /\/u\/(\d+)\/c\/(\w+)/i;
var classes = {};
chrome.storage.local.get(null, result => classes = result || {});

chrome.runtime.onMessage.addListener(request => {
    !request.update || chrome.storage.local.get(null, result => classes = result || {});
});

chrome.webRequest.onBeforeRequest.addListener(details => {
    let class_data = details.url.match(data_ext_re);

    if (class_data[2] in classes && class_data[1] != classes[class_data[2]])
        return { redirectUrl: details.url.replace(data_ext_re, "/u/" + classes[class_data[2]] + "/c/$2") };
}, { urls: ["https://classroom.google.com/u/*/c/*"] }, ["blocking"]);
