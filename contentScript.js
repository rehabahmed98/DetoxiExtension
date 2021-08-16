let tweetsArray = [];
let prevURL=""         
let curURL=""
let cntTweets=0
let prevtweetIdx=0
let predictions=[]
let elements=[]
let scrolling =false
let tweetMp=new Map();   // This maps the tweet (key) to it's prediction (value).





function getURL(){
    
    curURL=window.location.href
    // if the user visits another page , we should clear those variables
    if(curURL!=prevURL){
        tweetsArray=[]
        predictions=[]
        elements=[]
        prevURL=curURL
        cntTweets=0
        prevtweetIdx=0
        tweetMp.clear()
    }
}

function modifyDOM() {
 
    let arrChanged=false

    $('[data-testid="tweet"]').each(function(index){
        foundTweet = $(this).text();
        
        // preforming some preprocessing for the tweet before sending it to backend
            let newStr = foundTweet.replace(/^[^·]*/g,"");

            newStr=newStr.substring(1);
          

            newStr2 = newStr.replace(/^[1-9]{1,2}/g,"");
            if(newStr!=newStr2){
                newStr2=newStr2.substring(1);
            }
        if (!tweetsArray.includes(newStr2)&&newStr2!==""&&newStr2!==" This tweet might be toxic,click to uncover "){
            tweetsArray.push(newStr2);
            arrChanged=true // new tweets have been detected and we want to get their predictions
        }
    });


   
    if (arrChanged==true){

      
        newTweets=tweetsArray.slice(prevtweetIdx)
        prevtweetIdx=tweetsArray.length
        console.log("newTweets",newTweets)

        // sending new detected tweets to backend
        if(newTweets.length!=0){
        
            fetch(`http://127.0.0.1:8000/predict`,
                {
                    method:"POST", 
                    headers: {
                        "Accept": "*/*",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        tweets:newTweets
                    })
                }).then(response => response.json())
                .then(data => {
                    for(let k=0;k<data.FinalPred.length;k++){
                        tweetMp.set(newTweets[k],data.FinalPred[k]);

                    }
            
               
                })
                .catch(exception=>console.log(exception))
        }
    }

        $('[data-testid="tweet"]').each(function(index){
            foundTweet = $(this).text();
            let newStr = foundTweet.replace(/^[^·]*/g,"");

            newStr=newStr.substring(1);


            newStr2 = newStr.replace(/^[1-9]{1,2}/g,"");


            if(newStr!=newStr2){
                newStr2=newStr2.substring(1);
            }

                if(!$(this).hasClass("squished") && tweetMp.get(newStr2)==1){
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
        });


}
function detectChange(){
    getURL();    // Check if the route has been changed
    modifyDOM(); // detect if there is new tweets that appeared in the DOM
}


setInterval(detectChange, 2000);
