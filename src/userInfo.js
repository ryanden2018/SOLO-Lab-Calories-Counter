class UserInfo{
    constructor(id,name,image,totalCalories) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.calories = new Calories(totalCalories);
    }
   
    static renderUserInfo(user){
        let divUserInfo = document.querySelector('.userInfo');
        divUserInfo.querySelectorAll("div").forEach( div =>
            div.style.display = "none"
        );
        let div = document.createElement("div");
        let p = document.createElement("p");
        let img = document.createElement("img");
        let h4 = document.createElement("h4");
        let form = document.createElement("form");
        let textInput = document.createElement("input");
        textInput.setAttribute("type","text");
        let submitInput = document.createElement("input");
        submitInput.setAttribute("type","submit");
        let btn = document.createElement("button");
        p.innerText = user.name;
        img.src = user.image;
        h4.innerText = `Total Calories: ${user.calories.total_calories}`;
        textInput.placeholder =  "Enter Calories";
        submitInput.value = "Add Calories";
        form.append(textInput,submitInput);
        btn.innerText = "Reset Calories";
        div.append(p,img,h4,form,btn);
        divUserInfo.append(div);
    }

    resetCalories(URL) {
        this.addCalories((-1)*this.calories.total_calories,URL);
    }

    addCalories(extraCalories,URL) {
        this.calories.total_calories += extraCalories

        fetch(`${URL}/${this.id}`, {
            method: "PATCH",
            headers: {"Content-Type":"application/json",
                      "Accept":"application/json"},
            body: JSON.stringify(
                {
                    calories: { total_calories: this.calories.total_calories }
                }
            )
        })
    }
}