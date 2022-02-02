let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

let getToys = fetch('http://localhost:3000/toys')
.then (response => response.json())
.then(function(data){
  let allToys = data
  
  for (let oneToy of allToys){
    //oneToy ^ is an OBJECT!!
    let toyName = oneToy.name 
    let toyPic = oneToy.image
    let toyLikes = oneToy.likes
    let toyId = oneToy.id

    let toyCollection = document.getElementById('toy-collection')
    let toyDiv = document.createElement('div');
    toyDiv.className = "card";
    toyCollection.appendChild(toyDiv);
    
    //making toy cards
    let h2toyName = document.createElement('h2');
    h2toyName.textContent = toyName;
    toyDiv.appendChild(h2toyName)

    let imgToy = document.createElement('img');
    imgToy.className = "toy-avatar"
    imgToy.src = toyPic
    //imgToy.style.maxWidth = "200px"
    toyDiv.appendChild(imgToy)

    let toyLikesP = document.createElement('p');
    toyLikesP.textContent = toyLikes + " likes!";
    toyLikesP.className = "likes"
    toyDiv.appendChild(toyLikesP)

    let toyIdButton = document.createElement('button');
    toyIdButton.textContent = "Like ♥";
    toyIdButton.className = "like-btn";
    toyIdButton.id = toyId
    toyDiv.appendChild(toyIdButton)
    toyIdButton.addEventListener('click', addLikes)
  }
})
//adding a toy
let form = document.querySelector("form");
form.addEventListener('submit', addNewToy)

function addNewToy(e){
  //e.preventDefault()
  let toyObj ={
    name:e.target.name.value,
    imageUrl:e.target.image.value
  }
  console.log(toyObj)
  debugger;
  console.log(e.target)
  debugger
  fetch('http://localhost:3000/toys',{
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Accept: "application/json"
    },

    body:JSON.stringify({
      "name" : `${toyObj.name}`,
      "image": `${toyObj.imageUrl}`,
      "likes": 0
  })
  
  })
  .then(res => res.json())
  .then(toy => console.log(toy))
}

  //handling likes
  function addLikes(e){
   
   let likedToy = e.target
   let likedToyId = likedToy.id
   let toyCard = likedToy.previousSibling;
   console.log(toyCard)
   let likedToyDivText = toyCard.textContent
   let splitLikedToyDivText = likedToyDivText.split(' ')
   let likes = parseInt(splitLikedToyDivText[0],10)
   let newLikes = likes++
   
   likedToyDivText.replace(likes, newLikes)
    
   toyCard.textContent = `${likes} likes!`

    fetch(`http://localhost:3000/toys/${likedToyId}`,{
      method: 'PATCH',
      headers:
        {
          "Content-type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "likes": likes
      })
    }
    
    )
    .then(function(response){
      return response.json();
    }
    )
    // .then(function(likedObj){
    //   console.log(likedObj)
    // })
    
  }
  
  
  