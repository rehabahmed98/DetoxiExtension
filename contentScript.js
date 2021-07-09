let tweetsArray = [];
let prevURL=""
let curURL=""
let cntTweets=0
let prevtweetIdx=0
let predictions=[]
let elements=[]
let scrolling =false
let tweetMp=new Map();
//let time =  setTimeout(function(){ alert("Hello")},5000);



// window.addEventListener("scroll", function() {
//     getURL()
//     modifyDOM();
//   });




function getURL(){
    
    curURL=window.location.href
    if(curURL!=prevURL){
        // console.log("Route Changed !!!!")
        tweetsArray=[]
        predictions=[]
        elements=[]
        prevURL=curURL
        cntTweets=0
        prevtweetIdx=0
        // tweetMp=new Map();
        tweetMp.clear()
    }
}

function modifyDOM() {
    // console.log("Insideeee Modify DOM")
    let arrChanged=false

    $('[data-testid="tweet"]').each(function(index){
        foundTweet = $(this).text();
        // console.log("foundddd",foundTweet)
            let newStr = foundTweet.replace(/^[^·]*/g,"");

            newStr=newStr.substring(1);
            // console.log("3nd replacing dot",newStr)

            newStr2 = newStr.replace(/^[1-9]{1,2}/g,"");
            // console.log("b3d replacing numbers",newStr2)

            if(newStr!=newStr2){
                newStr2=newStr2.substring(1);
            }
            // console.log("b3d replacing h aw m aw s ",newStr2)

            // console.log("WEEEEEEEEEEEEEEEE",newStr2)
        if (!tweetsArray.includes(newStr2)&&newStr2!==""&&newStr2!==" This tweet might be toxic,click to uncover "){
            tweetsArray.push(newStr2);
            // elements=elements.concat(this)
            // tweetMp.set(newStr2, -1);
            arrChanged=true
        }
    });
    // console.log("ELemengtttss",elements)


   
    if (arrChanged==true){

      
        newTweets=tweetsArray.slice(prevtweetIdx)
        prevtweetIdx=tweetsArray.length
        console.log("newTweets",newTweets)

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
                        console.log("In Dataaa",newTweets[k],data.FinalPred[k])
                    }
                    console.log("Mapppp",tweetMp)
                    // predictions.concat(data.FinalPred)
                })
                .catch(exception=>console.log(exception))
        }
    }

        $('[data-testid="tweet"]').each(function(index){
            foundTweet = $(this).text();
            let newStr = foundTweet.replace(/^[^·]*/g,"");

            newStr=newStr.substring(1);
            // console.log("3nd replacing dot",newStr)

            newStr2 = newStr.replace(/^[1-9]{1,2}/g,"");
            // console.log("b3d replacing numbers",newStr2)

            if(newStr!=newStr2){
                newStr2=newStr2.substring(1);
            }
            // console.log("curTweet",newStr2,tweetMp.get(newStr2))
        
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

    // return document.body.innerHTML;
}
function detectChange(){
    getURL();
    modifyDOM();
}

setInterval(detectChange, 2000);