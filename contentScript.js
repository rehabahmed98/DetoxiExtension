let tweetsArray = [];
let time =  setTimeout(modifyDOM,1000);

window.addEventListener("scroll", function() {
    modifyDOM();
  });
  



function modifyDOM() {
    //You can play with your DOM here or check URL against your regex
    
    console.log("The array elements:", tweetsArray);

    $('[data-testid="tweet"]').each(function(index){
        foundTweet = $(this).text();
      
        if (!tweetsArray.includes(foundTweet)){
            tweetsArray.push(foundTweet);
            if(!$(this).hasClass("squished")){
                $(this).addClass("squished");
                $(this).html(`<button class = "tweet" style =" display: inline-block;
                    padding: 8px 15px;
                    font-size: 15px;
                    cursor: pointer;
                    text-align: center;
                    text-decoration: none;
                    outline: none;
                    color: #fff;
                    background-color:#17A8F4;
                    border: none;
                    border-radius: 15px;
                    box-shadow: 0 5px #fff;
                    margin: 0px;"
                    data-original-content="${encodeURI(foundTweet)}"> Show tweet </button>`);
            chrome.runtime.sendMessage({message: "listeners"}, function(response) {
            });
            }
        }
    });

    fetch(`http://gr21.eng.cu.edu.eg/predict`,
        {
            method:"POST", 
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                tweetsArray
            })
        }).then((response)=>{
            console.log("ana m3aya responseee");
        })
            .catch(exception=>console.log(exception))
    // let tweets = Array.from(document.querySelectorAll('[data-testid="tweet"]'));
    // tweets = tweets.map(el => el.innerText);
    // console.log("texttt" ,tweets);


    // $('[data-testid="tweet"]').each(function(index){
    //     var t = $(this).text();
    //     console.log("ttttt",t);
    //     fetch(`http://localhost:3000/posts`,
    //     {
    //         method:"POST", 
    //         headers: {
    //             "Accept": "application/json",
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({
    //             id: index,
    //             tweet: t

    //         })
    //     }).then(()=>{
    //         console.log("ana henaaaa");
    //     })
    //         .catch(exception=>console.log(exception))
        // var len = t.split(/\r\n|\r|\n/).length;
        // if(!$(this).hasClass("squished")){
        //    $(this).addClass("squished");
        //    $(this).html(`<button class = "tweet" style =" display: inline-block;
        //         padding: 8px 15px;
        //         font-size: 15px;
        //         cursor: pointer;
        //         text-align: center;
        //         text-decoration: none;
        //         outline: none;
        //         color: #fff;
        //         background-color:#17A8F4;
        //         border: none;
        //         border-radius: 15px;
        //         box-shadow: 0 5px #fff;
        //         margin: 0px;"
        //         data-original-content="${encodeURI(t)}"> Show tweet </button>`);
        // chrome.runtime.sendMessage({message: "listeners"}, function(response) {
        // });
        //  }
      //});


  
    
    // tweets.forEach(function(item, index, array) {
    //     console.log(item, index);
        
    //     fetch(`http://localhost:3000/posts`,
    //     {
    //         method:"POST", 
    //         headers: {
    //             "Accept": "application/json",
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({
    //             id: index,
    //             tweet: item

    //         })
    //     }).then(()=>{
    //         console.log("ana henaaaa");
    //     })
    //         .catch(exception=>console.log(exception))

    //    })

    return document.body.innerHTML;
}







// chrome.tabs.executeScript(null, { file: "jquery.js" }, function() {
//     chrome.tabs.executeScript({
//         code: '(' + modifyDOM + ')();' //argument here is a string but function.toString() returns function's code
//     }, (results) => {
//         //Here we have just the innerHTML and not DOM structure
//         console.log('Popup script:')
//         console.log(results[0]);
        
//     });
// });