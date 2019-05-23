document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded!')
  
    let users = []
    const usersURL = 'http://localhost:3000/users'
    const divDropDown = document.querySelector('.dropdown')
    const divUserInfo = document.querySelector('.userInfo')
    const selectTag = document.createElement('select')
    const createUserForm = document.querySelector('#form-create-user');

    let opTitle = document.createElement('option')
    opTitle.innerText = "Select a User"
    opTitle.selected = true
    opTitle.disabled = true
    selectTag.append(opTitle)

    function fetchingUsers(){
        //request dara from server and call renderUser function for each user
        users = []
        selectTag.innerHTML = ""
        let opTitle = document.createElement('option')
        opTitle.innerText = "Select a User"
        opTitle.selected = true
        opTitle.disabled = true
        selectTag.append(opTitle)
        fetch(usersURL)
        .then( res => res.json() )
        .then( data => {
            data.forEach( elem => {
                let user = new UserInfo(elem.id,elem.name,elem.image,elem.calories.total_calories);
                users.push(user);
                renderUser(user);
            });
        });
    }

    function renderUser(user){
        // creating and appending options to the selectTag for each User
        let op = document.createElement("option");
        op.innerText = user.name;
        selectTag.append(op);
    }

    selectTag.addEventListener('change', (e) => {
        //find a user and Use userInfo class to show user Info inside 'user-info' div 
        let user = users.find( user => user.name === e.target.value );
        UserInfo.renderUserInfo(user);
    })

    divUserInfo.addEventListener("click", e => {

        if(e.target.tagName === "BUTTON") { // reset
            let user = users.find( 
                user => user.name === 
                  e.target.parentElement.querySelector("p").innerText
            );
            user.resetCalories(usersURL);
            e.target.parentElement.querySelector("h4").innerText = `Total Calories: ${user.calories.total_calories}`;
        }

        if((e.target.tagName === "INPUT") && (e.target.getAttribute("type")==="submit")) {
            e.preventDefault();
            let user = users.find( 
                user => user.name === 
                  e.target.parentElement.parentElement.querySelector("p").innerText
            );
            if(!Number.isNaN(e.target.value)) {
                user.addCalories(parseInt(e.target.parentElement.querySelector("input[type=text]").value),usersURL);
            }
            e.target.parentElement.parentElement.querySelector("h4").innerText = `Total Calories: ${user.calories.total_calories}`;
            e.target.parentElement.reset();
        }

        

        
    });

    createUserForm.addEventListener("submit", e => {
        e.preventDefault();
        let nameInput = createUserForm.querySelector("#text-input-name");
        let urlInput = createUserForm.querySelector("#text-input-url");
        fetch(usersURL, {
            method:"POST",
            headers:{ "Content-Type":"application/json",
                      "Accept":"application/json"},
            body: JSON.stringify({
                name:nameInput.value,
                image:urlInput.value,
                calories: { total_calories: 0 }
            })
        })
        .then( res => res.json() )
        .then( data => {
            fetchingUsers();
        });
        createUserForm.reset();
    });

    divDropDown.append(selectTag)
    fetchingUsers()
  
  })