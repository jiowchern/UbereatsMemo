

var attacher = function(node){
	const nodeClass = "al d0 g5 c9";
	const quickClass = 	"cg ch ci cj gi dp gj c5 c0 b1 al c9 gk cp cq cr ck gl ax et el gm bd cu";

	
	if( node.getAttribute("class") != nodeClass)
		return;
	const keyElement = node.querySelector(quickClass);
	if(keyElement == null)
		return;
	const key = keyElement.getAttribute("href");
		
	console.log(key);
	/*var parent = element;
	var editbox = document.createElement('textarea');
	editbox.addEventListener('click', function(event) {
		// 阻止事件的進一步傳播
		event.stopPropagation();
	});
	parent.insertBefore(editbox ,parent.lastChild );*/
}



// 建立一個觀察器實例
var observer = new MutationObserver(function(mutations) {
	mutations.forEach(function(mutation) {
		return;
		for (let node of mutation.addedNodes) {
			// 如果新增的節點是一個 'a' 標籤，並且其 'data-tests' 屬性的值為 'store'
			//console.log(node);
			var elements = node.querySelectorAll("span");
			elements.forEach(function(element ) {
				var attr = element.getAttribute('data-testid');
				if(attr != 'rich-text')
					return;
				console.log(element);
				console.log( attr);
				var parent = element.parentNode;

				var editbox = document.createElement('textarea');
				parent.insertBefore(editbox ,parent.lastChild );
			} );			
		  }
	});    
  });
  
  // 設定觀察選項
  var config = { attributes: true, childList: true, subtree: true };
  
  // 開始觀察一個節點及其子樹
  observer.observe(document.body, config);



  var elements = document.querySelectorAll("div");
elements.forEach(function(element ) {
	attacher(element);				
} );	