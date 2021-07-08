let tweetsArray = [];
// let lastTweets=[];
let prevURL=""
let curURL=""
let time =  setTimeout(modifyDOM,2000);

window.addEventListener("scroll", function() {
    getURL()
    modifyDOM();
  });




function getURL(){
    
    curURL=window.location.href
    console.log(curURL)
    console.log(prevURL)
    if(curURL!=prevURL){
        console.log("Route Changed !!!!")
        tweetsArray=[]
        prevURL=curURL
    }
}

function modifyDOM() {
    console.log("Insideeee Modify DOM")
    //You can play with your DOM here or check URL against your regex
    let arrChanged=false
    console.log("The array elements:", tweetsArray);
    console.log(JSON.stringify({
        tweets:tweetsArray
    }))

    $('[data-testid="tweet"]').each(function(index){
        foundTweet = $(this).text();


        if (!tweetsArray.includes(foundTweet)){
            tweetsArray.push(foundTweet);
            arrChanged=true
        }
    });


    if (arrChanged==true){

        fetch(`http://127.0.0.1:8000/predict`,
            {
                method:"POST", 
                headers: {
                    "Accept": "*/*",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    tweets:tweetsArray
                })
            }).then(response => response.json())
            .then(data => {
                console.log(data)
                console.log(data.FinalPred)
                predictions=data.FinalPred
                i=0;
                $('[data-testid="tweet"]').each(function(index){
                    foundTweet = $(this).text();
                
                    
                    // if (!tweetsArray.includes(foundTweet)){
                        // tweetsArray.push(foundTweet);
                        if(!$(this).hasClass("squished") && predictions[i]==1){
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
                                // box-shadow: 0 5px #fff;
                                margin-bottom:10px;
                                margin: 0px;"
                                data-original-content="${encodeURI(foundTweet)}"> This tweet might be toxic,click to uncover </button>`);
                        chrome.runtime.sendMessage({message: "listeners"}, function(response) {
                        });
                        }
                    // }
                        i++;
                });
            })
            .catch(exception=>console.log(exception))
    }

    return document.body.innerHTML;
}

