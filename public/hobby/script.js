var requiredFields = [
 "fullname", "email", "age", "frequency", "hour", 
] 

var myHobby = {
  "project" : "Fitness",
  "owner" : "Lida Asilyan",
  "fullname" : "",
  "email" : "",
  "age" : "",
  "type" : "",
  "fav" : "",
  "location" : "",
  "frequency" : "",
  "hour" : "",
  "water" : "",
  "blogger" : "",
  "diet": "",
  "calories": "",
  "cheatmeal" : "",
  "playlist" : ""
}


function handleFullnameChange() {
  var fullnameBox = document.getElementById("fullname")
  myHobby.fullname = fullnameBox.value;
  fullnameBox.style.backgroundColor = "white";
}


function handleEmailChange() {
  var emailBox = document.getElementById("email")
  myHobby.email = emailBox.value;
  emailBox.style.backgroundColor = "white";
}

function handleAgeChange(){ 
  myHobby.age= document.getElementById("age").value
  document.getElementById("age").style.backgroundColor = "white";

}

function handleLocationChange() {
  myHobby.location = document.getElementById("location").value;
}

function handleFrequencyChange() {
  var frequencyBox = document.getElementById("frequency")
  myHobby.frequency = frequencyBox.value;
  frequencyBox.style.backgroundColor = "white";
}

function handleHourChange() {
  var hourBox = document.getElementById("hour")
  myHobby.hour = hourBox.value;
  hourBox.style.backgroundColor = "white";
}

function handleWaterChange() {
  myHobby.water = document.getElementById("water").value;
}

function handleBloggerChange() {
  myHobby.blogger = document.getElementById("blogger").value;
}

function handleDietChange() {
  myHobby.diet = document.getElementById("diet").value;
}


function handleCaloriesChange() {
 myHobby.calories = document.getElementById("calories").valye;

}

function handleCheatmealChange() {
  myHobby.cheatmeal = document.getElementById("cheatmeal").value;
}

function handlePlaylistChange() {
  myHobby.playlist = document.getElementById("playlist").value;
}


function handleTypeChange(e) {
  myHobby.type = e.target.id;
  if (myHobby.type != "other") {
    myHobby.othertype = ""; document.getElementById("othertype").style.display = "none";
  } else {document.getElementById("othertype").style.display = "block";
  }
}

function handleCustomOtherTypeChange() {
  if (myHobby.type == "other") {
    myHobby.customOtherType = document.getElementById("othertype").value;
  }
}

function handleCheckboxChange(e) {
  var value = e.target.id;
  if (e.target.value == "on") {
    myHobby.fav = myHobby.fav + "," + value;
  }
} 

function validateFormData() {
  var isFormValid = true;
  var keys = Object.keys(myHobby);
  keys.forEach(key => {
      if (requiredFields.indexOf(key) > -1 && myHobby[key] == "") { console.log(key, " is a required field, please add a value") 
      if(document.getElementById(key)) {
        document.getElementById(key).style.backgroundColor = "red"; 
        isFormValid = false;
      }
    }   
  })
  return isFormValid;
}

function FormData(e) {
  e.preventDefault();
  if(validateFormData() == false) {
    return;
  } else {console.log("The current value is", myHobby)
    Swal.fire("Good Job!", "Keep Working Out!", "success",).then(okay => {
    if (okay) {
       window.location.href = "https://cse120-2021-api-lida.herokuapp.com/;"
    }


    });
  }

function showTheData(e){
  e.preventDefault();
  if(validateFormData() == false) {
    return;
  } else {
    console.log(myHobby);
    

    $.ajax({
      type: 'POST',
      url: "https://cse120-2021-api-lida.herokuapp.com/data",
      data: myHobby,
      cache: false,
      dataType : 'json',
      success: function (data) {
        console.log("success");
      },
      error: function (xhr) {
        console.error("Error in post", xhr);
      },
      complete: function () {
        console.log("Complete");  
      }
    });
  }
}


function displayData(existingData) {
  document.getElementById("existingData").innerHTML = "<ul>";
  for (var i = 0; i < existingData.length; i++) {
    currentBook = existingData[i];
    document.getElementById("existingData").innerHTML += "<li><i>" + currentHobby.fullname + "</li> : <b>" + currentHobby.email + "</b></li>";
  }
  document.getElementById("existingData").innerHTML += "</ul>"
}
    
function deleteData(id) {

    var r = confirm("Are you sure you want to delete the item with the following ID? " + id);
    if (r == true) {
      
    } else {
      return;
    }

    var tmp = {
        "id": id
    }

    $.ajax({
        type: 'POST',
        url: "https://cse120-2021-api-lida.herokuapp.com/data/delete",
        data: tmp,
        cache: false,
        dataType : 'json',
        success: function (data) {
            console.log("success");
            document.getElementById("div" + id).style.display = "none";
        },
        error: function (xhr) {
            console.error("Error in post", xhr);
        },
        complete: function () {
            console.log("Complete");  
        }
    });
}

function saveData() {
	var tmp = {
		"test": "Data"
	}

    $.ajax({
      type: 'POST',
      url: "https://cse120-2021-api-lida.herokuapp.com/data",
      data: tmp,
      cache: false,
      dataType : 'json',
      success: function (data) {
      console.log("success");
        },
      error: function (xhr) {
      console.error("Error in post", xhr);
        },
      complete: function () {
      console.log("Complete");  
        }
    });
}



function loadExistingData() {
    $.ajax({
        type : "GET",
        url : "https://cse120-2021-api-lida.herokuapp.com/data",
        dataType : "json",
        success : function(data) {
        	console.log("success", data);
            displayData(data.data);
        },
        error : function(data) {
            console.log("Error")
        }
    });
}

function displayData(data) {
    document.getElementById("dataContainer").innerHTML = "";
    data.forEach(elem => {

    var item = document.createElement("div");
        item.id = "div" + elem["_id"];
        item.className = "item";
    if (Object.keys(elem).length == 1) {
    var span = document.createElement("span");
        span.innerHTML = "<i>Empty Element with autogenerated ID: </i>" + elem["_id"];
        item.appendChild(span);
        }
    Object.keys(elem).forEach(key => {
      if (key != "_id") {
      var span = document.createElement("span");

      var b = document.createElement("b");
          b.innerHTML = key + ": ";
          span.appendChild(b);
                
          span.className = "item";
      if (elem[key]) {
          span.innerHTML += elem[key];
      } else {
        
      var span1 = document.createElement("span");
          span1.className = "undefined";
          span1.innerHTML = "N/A";
          span.appendChild(span1)
                }
          item.appendChild(span);

      var br = document.createElement("br");
          item.appendChild(br);
            }
        })
      var button = document.createElement("button");
        button.innerHTML = "Delete";
        button.id = elem["_id"];
        button.addEventListener("click", function(e){
          deleteData(e.target.id);
        }, false);
        item.appendChild(button);
        document.getElementById("dataContainer").appendChild(item);
    })

}

var loadedData = [];

function loadEditItem() {
    localStorage = window.localStorage;
    editItem = JSON.parse(localStorage.getItem("editItem"));
    console.log(editItem);
    document.getElementById("_id").innerHTML = editItem["_id"];
    document.getElementById("fullname").value = editItem["fullname"];
    document.getElementById("hour").value = editItem["hour"];   
    document.getElementById("frequency").value = editItem["frequency"];   
    document.getElementById("water").value = editItem["water"];
}

function editData(id) {
    var tmp = id.split("edit_");
    var item_id = tmp[1];

    loadedData.forEach(item => {
        if (item._id == item_id) {
            console.log(item); 
            localStorage = window.localStorage;
            localStorage.setItem('editItem', JSON.stringify(item));
            document.location  = "form2.html"; 
        }
    });

}