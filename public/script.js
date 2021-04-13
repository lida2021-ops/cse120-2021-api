function deleteData(id) {

    var r = confirm("Are you sure you want to delete the item with the following ID? " + id);
    if (r == false) {
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

function updateBookData(e) {
  e.preventDefault();
  var updatedBook = {};
  updatedBook.id = document.getElementById("_id").value;
  updatedBook.fullname = document.getElementById("fullname").value;
  updatedBook.title = document.getElementById("title").value;
  updatedBook.author = document.getElementById("author").value;
  updatedBook.color = document.getElementById("color").value;
  updatedBook.coverMaterial = document.getElementById("coverMaterial").value;
  updatedBook.price = document.getElementById("price").value;
  updatedBook.currency = document.getElementById("currency").value;
  updatedBook.publisher = document.getElementById("publisher").value;
  updatedBook.edit = document.getElementById("edir").value;
  updatedBook.date = document.getElementById("date").value;
  updatedBook.genre = document.getElementById("genre").value;
  updatedBook.language = document.getElementById("language").value;
  updatedBook.otherlang = document.getElementById("otherlang").value;

    console.log(myBook);

      $.ajax({
      type: 'POST',
      url: "https://cse120-2021-api-lida.herokuapp.com/data/update",
      data: updatedBook,
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

function updateHobbyData(e) {
  e.preventDefault();
  var updatedHobby = {};
  updatedHobby.id = document.getElementById("_id").value;
  updatedHobby.fullname = document.getElementById("fullname").value;
  updatedHobby.email = document.getElementById("email").value;
  updatedHobby.age = document.getElementById("age").value;
  updatedHobby.type = document.getElementById("type").value;
  updatedHobby.fav = document.getElementById("fav").value;
  updatedHobby.location = document.getElementById("location").value;
  updatedHobby.frequency = document.getElementById("frequency").value;
  updatedHobby.hour = document.getElementById("hour").value;
  updatedHobby.water = document.getElementById("water").value;
  updatedHobby.blogger = document.getElementById("blogger").value;
  updatedHobby.diet = document.getElementById("diet").value;
  updatedHobby.calories = document.getElementById("calories").value;
  updatedHobby.cheatmeal = document.getElementById("cheatmeal").value;
  updatedHobby.playlist = document.getElementById("playlist").value;
  


      $.ajax({
      type: 'POST',
      url: "https://cse120-2021-api-lida.herokuapp.com/data/update",
      data: updatedHobby,
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
  myFitnessData = [];
  myBookData = [];
  otherData = [];
  $.ajax({
      type : "GET",
      url : "https://cse120-2021-api-lida.herokuapp.com/data",
      dataType : "json",
      success : function(data) {
        console.log("success", data);
        loadedData = data.data;
        data.data.forEach(elem => {
          if (elem["owner"] == "Lida Asilyan") {
            if (elem["project"] == "Fitness") {
              myFitnessData.push(elem);
            } else {
              myBookData.push(elem);
            }
          } else {
            otherData.push(elem);
          }
        })
        displayData(myFitnessData, "fitnessDataContainer");
        displayData(myBookData, "bookDataContainer");
        displayData(otherData, "otherDataContainer");
      },
      error : function(data) {
          console.log("Error")
      }
  });
}

function displayData(data, containerDivName) {
    document.getElementById(containerDivName).innerHTML = "";
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

        if (elem["owner"] == "Lida Asilyan") {
          var button2 = document.createElement("button");
          button2.innerHTML = "Edit";
          button2.className = "editButton";
          button2.id = "edit_"+ elem["_id"];
          button2.addEventListener("click", function(e){
          editData(e, e.target.id);
          }, false);
          item.appendChild(button2);
        }

        if (elem["owner"] == "Lida Asilyan" || (elem["fullname"] && elem["fullname"].indexOf("Lida Asilyan") > -1)) {
          var button = document.createElement("button");
          button.innerHTML = "Delete";
          button.id = elem["_id"];
          button.addEventListener("click", function(e){
          deleteData(e.target.id);
          }, false);
          item.appendChild(button);
         }
         document.getElementById(containerDivName).appendChild(item);
     
    })


    document.querySelectorAll("#" + containerDivName +" div.item").forEach(div => {
      div.addEventListener("click", function(e){
        if (this.style.height == "auto") {
          this.style.height = "30px";
        } else {
          this.style.height = "auto";
        }
      })        
    })
}


function toggleOtherData() {
  var otherData = document.getElementById("otherDataContainer");
  if (otherData.style.display == "block") {
    otherData.style.display = "none";
    document.getElementById("otherDataToggle").checked = false;
  } else {
    otherData.style.display = "block";
    document.getElementById("otherDataToggle").checked = true;
  }
}


var loadedData = [];

function editData(e, id){
  e.stopImmediatePropagation();
 var tmp = id.split("edit_");
 var item_id = tmp[1];
 console.log(item_id);

loadedData.forEach(item => {
    if (item._id == item_id && item["owner"] == "Lida Asilyan") {
        console.log(item); 
        localStorage = window.localStorage;
        localStorage.setItem('editItem', JSON.stringify(item));
        if (item["project"] == "Fitness") {
          document.location  = "edit_hobby.html"; 
        } else {
          document.location  = "edit_book.html"; 
        }
    }
  })
}

function loadFitnessItemForEdit() {
  localStorage = window.localStorage;
  editItem = JSON.parse(localStorage.getItem("editItem"));
  console.log(editItem);
  document.getElementById("_id").value = editItem["_id"];
  document.getElementById("fullname").value = editItem["fullname"]; 
  document.getElementById("age").value = editItem["age"];  
  document.getElementById("email").value = editItem["email"];
  document.getElementById("type").value = editItem["type"]; 
  document.getElementById("fav").value = editItem["fav"]; 
  document.getElementById("location").value = editItem["location"]; 
  document.getElementById("frequency").value = editItem["frequency"]; 
  document.getElementById("hour").value = editItem["hour"]; 
  document.getElementById("water").value = editItem["water"]; 
  document.getElementById("blogger").value = editItem["blogger"]; 
  document.getElementById("diet").value = editItem["diet"];
  document.getElementById("calories").value = editItem["calories"];
  document.getElementById("cheatmeal").value = editItem["cheatmeal"];
  document.getElementById("playlist").value = editItem["playlist"];
  
}

function loadBookItemForEdit() {
  localStorage = window.localStorage;
  editItem = JSON.parse(localStorage.getItem("editItem"));
  console.log(editItem);
  document.getElementById("_id").value = editItem["_id"];
  document.getElementById("fullname").value = editItem["fullname"]; 
}

