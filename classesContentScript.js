(async function () {
    while (!(classes = document.querySelectorAll("ol > li > div > div > a")).length) {
        await new Promise(r => setTimeout(r, 500));
    }
    classes.forEach(el => {
        let class_data = el.href.match(/\/u\/(\d+)\/c\/(\w+)/i);
        chrome.storage.local.set({ [class_data[2]]: class_data[1] });
        chrome.runtime.sendMessage({ update: true });
    });
}());
