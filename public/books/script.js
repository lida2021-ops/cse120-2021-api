
var myBook = {
  "owner" : "Lida Asilyan",
  "project" : "Book",
  "fullname" : "",
  "title" : "",
  "author" : "",
  "color" : "",
  "coverMaterial" : "",
  "pages" : "",
  "price" : "",
  "currency": "",
  "publisher": "", 
  "edit": "",
  "date" : "",
  "genre": ""


}

function handleFullnameChange() {
  myBook.fullname = document.getElementById("fullname").value; 
}

function handleTitleChange() {
  myBook.title = document.getElementById("title").value; 
}
function handleAuthorChange() {
  myBook.author = document.getElementById("author")
  .value; 
}

function handleColorChange() {
  myBook.color = document.getElementById("color").value;
}

function handleCoverMaterialChange() {
  myBook.coverMaterial = document.getElementById("cover").value;
}
function handlePagesChange() {
  myBook.pages = document.getElementById("pages").value;
}

function handlePriceChange() {
  myBook.price = document.getElementById("price").value;
}

function handleCurrencyChange() {
  myBook.currency = document.getElementById("currency").value;
}

function handleEditChange() {
  myBook.edit = document.getElementById("edit").value;
}

function handleDateChange() {
  myBook.date = document.getElementById("date").value;
}

function handlePublisherChange() {
  myBook.publisher = document.getElementById("publisher").value;
}

function handleGenreChange() {
  myBook.genre = document.getElementById("genre").value;
}


function handleLangChange(e) {
  myBook.language = e.target.id;
  if (myBook.language != "otherl") {
    myBook.otherlang = ""; document.getElementById("otherlang").style.display = "none";
  } else {document.getElementById("otherlang").style.display = "block";
  }
}

function handleCustomLangChange() {
  if (myBook.language == "other") {
    myBook.customlanguage = document.getElementById("otherlang").value;
  }
}

function showTheBookData(e) {
  e.preventDefault();
  console.log("The current value is", myBook)
  
  $.ajax({
    type: 'POST',
    url: "https://cse120-2021-api-lida.herokuapp.com/data",
    data: myBook,
    cache: false,
    dataType : 'json',
    success: function (data) {
      console.log("success");
      document.location="https://cse120-2021-api-lida.herokuapp.com/books/thankyou.html"; 
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
	var existingData = [];
  $.ajax({
    type : "GET",
    url : "https://cse120-2021-api-lida.herokuapp.com/data",
    dataType : "json",
    success : function(data) {
      console.log("success", data);
      existingData = data;
      displayData(existingData.data);
    },
    error : function(data) {
        console.log("Error")
    }
  });
}

function displayData(existingData) {
  document.getElementById("existingData").innerHTML = "<ul>";
  for (var i = 0; i < existingData.length; i++) {
    currentBook = existingData[i];
    document.getElementById("existingData").innerHTML += "<li><i>" + currentBook.fullname + "</li> : <b>" + currentBook.title + "</b></li>";
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
