let container = document.getElementById("container");
let submitItem = document.getElementById("submitBtn");





window.addEventListener("DOMContentLoaded", myOnloadFun);

async function getData() {
  let res = await axios.get(
    "https://crudcrud.com/api/7cb7fa9620d74b559a97ed786d5dcc13/appointmentData"
  );
  return res;
}
// console.log(getData().then(resl => console.log(resl)));

function showDetails(userName, userEmail, userPhone,id) {
  var li = document.createElement("li");
  var textNode = document.createTextNode(
    `${userName}-${userEmail}-${userPhone}`
  );
  var button = document.createElement("button");  
  var deleteText = document.createTextNode("Delete");
  var span = document.createElement("span");
  var editBtn = document.createElement("button");
  var editText = document.createTextNode("EDIT");

  li.appendChild(textNode);
  button.appendChild(deleteText);
  editBtn.appendChild(editText);
  span.appendChild(li);
  span.appendChild(button);
  span.appendChild(editBtn);
  container.appendChild(span);
  
  button.addEventListener("click",(e) => deleteFun(e,button,id));
}

function myOnloadFun() {
  getData().then((res) => {
    for (let i = 0; i < res.data.length; i++) {
      var userName = res.data[i].name;
      var userEmail = res.data[i].Email;
      var userPhone = res.data[i].Age;
      var id = res.data[i]._id;
      showDetails(userName,userEmail,userPhone,id);   
      
    }
       
  });
}


submitItem.addEventListener("click", (e) => {
  e.preventDefault();
  // console.log("click");
  let userName = document.getElementById("name").value;
  let userEmail = document.getElementById("email").value;
  let userPhone = document.getElementById("phone").value;

  let userObj = {
    name: userName,
    Email: userEmail,
    Age: userPhone,
    
  };
  
  axios
    .post(
      "https://crudcrud.com/api/7cb7fa9620d74b559a97ed786d5dcc13/appointmentData",
      userObj
    )
    .then (temp => showDetails(userName,userEmail,userPhone,temp.data._id))
    .catch((err) => console.log(err));

    
});



function deleteFun (e,button,myid) {
  e.preventDefault();
  var parentEle = button.parentElement;
  parentEle.remove();
  axios.delete(`https://crudcrud.com/api/7cb7fa9620d74b559a97ed786d5dcc13/appointmentData/${myid}`)
  .catch((err) => console.error(err));
  
}
