
        console.log('頁面載入完成！11');

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete') {
        console.log('頁面載入完成！');
        // 你的代碼放在這裡
        /*var elements =  document.querySelectorAll("a");

        elements.forEach(function(element ) {
            

            var attr = element.getAttribute('data-testid');
            if(attr == null)
                return;

                console.log(element);
                console.log( attr);
        } );*/
    }
});


