function detoxify() {

    

    function modifyDOM() {
        //You can play with your DOM here or check URL against your regex
        console.log('Tab script:');
        console.log(document.body);
        let tweets = Array.from(document.querySelectorAll('[data-testid="tweet"]'));
        tweets = tweets.map(el => el.innerText);
        console.log("texttt" ,tweets);
        
        tweets.forEach(function(item, index, array) {
            console.log(item, index);
            
            fetch(`http://localhost:3000/posts`,
            {
                method:"POST", 
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: index,
                    tweet: item

                })
            }).then(()=>{
                console.log("ana henaaaa");
            })
                .catch(exception=>console.log(exception))
  
          })
        return document.body.innerHTML;
    }
	chrome.tabs.executeScript(null, { file: "jquery.js" }, function() {
        chrome.tabs.executeScript({
            code: '(' + modifyDOM + ')();' //argument here is a string but function.toString() returns function's code
        }, (results) => {
            //Here we have just the innerHTML and not DOM structure
            console.log('Popup script:')
            console.log(results[0]);
            
        });
	});
}
document.getElementById('test').addEventListener('click', detoxify);
