
const _MemoId = "pinioncyber-ubereatsmemo-memo-id";
const _StorageIdPrefix =  "pinioncyber-ubereatsmemo-storage-";

const _DataProcessed = 'pinioncyber-ubereatsmemo-dataprocessed';
function setMemo(key , memo)
{
	const textareas = document.querySelectorAll('textarea');
	textareas.forEach(textarea => {
		if(textarea.getAttribute(_MemoId) != key)
			return;
			textarea.value = memo;
	}
	);
}
function isValidGUID(str) {
    const regex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    return regex.test(str);
}
function findStorageKey(url) {
    const parts = url.split('/');
    const lastPart = parts[parts.length - 1];
    if (lastPart && isValidGUID(lastPart)) {
        return { Key: lastPart };
    }
    return null;
}
function isEmptyOrWhitespace(str) {
    return !str || str.trim().length === 0;
}
function handleAHrefs() {
	const aHrefs = document.querySelectorAll('a[tabindex="0"]');
	aHrefs.forEach( aHref =>{
		const hasProcessed = aHref.hasAttribute( _DataProcessed);
		if(hasProcessed)
			return;
			
			
		const href = aHref.getAttribute('href');
		const result = findStorageKey(href);
		if(result == null){
			return;
		}
		const storageKey = _StorageIdPrefix + result.Key;	
		
		const textarea = document.createElement('textarea');
		textarea.placeholder = '';
		textarea.setAttribute(_MemoId, storageKey);
		

		if (localStorage.getItem(storageKey)) {
			const item = localStorage.getItem(storageKey);
			if(isEmptyOrWhitespace( item))
			{
				return;
			}
            textarea.value = item;
        }

        textarea.addEventListener('input', () => {
			if(isEmptyOrWhitespace(textarea.value))
			{
				localStorage.removeItem(storageKey);
				return;
			}
            localStorage.setItem(storageKey, textarea.value);
			setMemo(storageKey ,textarea.value );
        });


		const newDiv = document.createElement('div');		
        newDiv.appendChild(textarea);
        aHref.parentNode.appendChild(newDiv);
		aHref.setAttribute( _DataProcessed, 'true');

	});
}




 window.addEventListener('load', function() {
	// Mutation Observer to watch for changes in the DOM

	const observer = new MutationObserver(mutations => {
		mutations.forEach(mutation => {
			if (mutation.addedNodes.length) {
				handleAHrefs();
			}
		});
	});
	
	// Start observing the document body for added nodes
	observer.observe(document.body, {
		childList: true,
		subtree: true
	});
		
     handleAHrefs();
 });



