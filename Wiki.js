$(document).ready(function(){
  //when button is clicked
  $("#searchButton").click(function(){
    if($("#searchBox").val()==""){
      $("#searchResults").html("Type something first you silly duck.");
    }else{
    findSearch();
  }});

  //when enter is pressed 
  function pressKey(event){
  var enterKey=event.keyCode;
  if(enterKey===13){
    if($("#searchBox").val()==""){
      event.preventDefault();
      $("#searchResults").html("Type something first you silly duck.");
    }else{
      event.preventDefault();
      findSearch();
  }}}
  document.addEventListener('keydown',pressKey);

  //main function    
  function findSearch(){
    var userSearch=encodeURIComponent(document.getElementById("searchBox").value);
    console.log(userSearch);
    $.ajax({
  	  url:"https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch="+userSearch+"&utf8=&format=json&callback=?",
  	  dataType:"jsonp",
  	  success:function(dataObj){
        console.log(dataObj);
  	    var uptoArray=dataObj.query.search;
  	  	console.log(uptoArray);
        //display the search results
        $("#searchResults").empty();
  	  	$.each(uptoArray, function(n){
          $("#searchResults").append(
            "<a target='_blank' id='noUnderline' href='http://en.wikipedia.org/wiki/"+userSearch+"'><div id='titleAndSnippet'><div id='containsTitle'>"+uptoArray[n].title+": </div><div id='containsSnippet'>"+uptoArray[n].snippet+"</div></div></a>");
  	  	});//each bracket
        //if there are no search results
        if (uptoArray.length==0){
          $("#searchResults").html("No results match your search, duck luck.");
        }//no match bracket
  	  },//success bracket
      error:function(jqXHR, exception){
        var userMsg="";
        if(jqXHR.status===0){
          userMsg="Not connected to the intenet. Please check your connection."
        }
        else if(jqXHR.status==404){
          userMsg="Requested page not found. Duck is lost"
        }
        else if(jqXHR.status==500){
          userMsg="Internal server error, please try again later."
        }
        else if(exception=='parseerror'){
          userMsg="Requested JSON parse failed."
        }
        else if(exception=='timeout'){
          userMsg="Time out error, I'm sorry."
        }
        else if(exception=='abort'){
          userMsg="Ajax request aborted. Something is very off."
        }
        else{
          userMsg="Uncaught error! What did you do now?"
        }
        $("#searchResults").html(userMsg);
      }//error bracket
    })//ajax call bracket
  }//findSearch function bracket
});

//**MADE BY HASANAT JAHAN ON JULY 2017**//