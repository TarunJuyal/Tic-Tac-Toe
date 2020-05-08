let count=0;
function startGame(){
    for(let i =1 ; i<=9 ; i++){
        clearCell(i);
        reInitializeData(i);
    }
     count=0;
    document.turn = "X";
    document.winner= null;
    setMessage(`${document.turn} gets to start.`);
}
function setMessage(msg){
    document.getElementById("msg").innerText=msg;
}
function nextMove(cell,number){
    if(document.winner!=null){
        setMessage(`${document.turn} already won !!`);
    }
    else if(cell.innerText==""){
      cell.innerText=document.turn;
      setData(cell.innerText,number);
      count++;
      switchTurn(); 
    }
    else{
      setMessage("That cell is already used..");
    }
}
function switchTurn(){
    if(count==9 && !checkForWin(document.turn)){
        setMessage(`Ooops! All slots full..Restart if u want to play again.`);
    }
    else if(checkForWin(document.turn)){
        setMessage(`Congratulations ${document.turn} wins the game !!!`);
        document.winner=document.turn;
    }
    else if(document.turn=="X"){
        document.turn="O";
        setMessage(`It's ${document.turn}'s turn!`);
    }
    else{
        document.turn="X";
        setMessage(`It's ${document.turn}'s turn!`);
    }
}
function checkCombinations(row1,row2,row3,move){
    var result = false;
    if(getCell(row1)==move && getCell(row2)==move && getCell(row3)==move){
       result=true;   
    }
    return result;
}
function getCell(number){
    return document.getElementById("cell"+number).innerText;
}
function checkForWin(move){
    var result=false;
    if(checkCombinations(1,2,3,move) || checkCombinations(4,5,6,move) || checkCombinations(7,8,9,move) || checkCombinations(1,4,7,move)
    || checkCombinations(2,5,8,move) || checkCombinations(3,6,9,move) || checkCombinations(1,5,9,move) || checkCombinations(3,5,7,move)){
       result=true;
    }
    return result;
}
function clearCell(number){
     document.getElementById("cell"+number).innerText="";
}

// FireBase Part

function setData(text,number){
   var cellValue = text;
   var obj = {'cellNumber':number, 'cellValue':cellValue};
   let promise = firebase.database().ref(`/status/${obj.cellNumber}`).set(obj);
   promise.then(data=>{
       document.getElementById("firebaseMsg").innerText="Data Set";
   }).catch(err=>{
       document.getElementById("firebaseMsg").innerText="Error in setting data";
   })
}
function reInitializeData(number){
    var obj = {'cellNumber':number, 'cellValue':null};
    let promise = firebase.database().ref(`status/${obj.cellNumber}`).update(obj);
    promise.then(data=>{
        document.getElementById("firebaseMsg").innerText="Data updated";
    }).catch(err=>{
        document.getElementById("firebaseMsg").innerText="Error in updating data";
    })
 }
