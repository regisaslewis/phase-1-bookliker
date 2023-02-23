document.addEventListener("DOMContentLoaded", function() {
    const ul = document.getElementById("list");
    const showPanel = document.getElementById("show-panel");
    fetch(`http://localhost:3000/books`)
        .then((resp) => resp.json())
        .then((data) => {
            data.forEach((e) => {
                let li = document.createElement("li");
                li.textContent = e.title;
                li.addEventListener("click", () => {
                    if (showPanel.innerHTML === "") {
                        clickTitle();
                    } else {
                        showPanel.innerHTML = "";
                        clickTitle();
                    }
                });

                function clickTitle() {
                    fetch(`http://localhost:3000/books/${e.id}`)
                        .then((res) => res.json())
                        .then((ele) => {
                    let div = document.createElement("div");
                    div.id = "details";
                    div.innerHTML = `<h2>${ele.title}</h2>
                    <h4>${ele.subtitle}</h4>
                    <p>${ele.description}</p>
                    <h3>by: ${ele.author}</h3>
                    <img src="${ele.img_url}">`
                    
                    let newList = document.createElement("ul");
                    div.appendChild(newList);
                    ele.users.forEach((element) => {
                        let newLi = document.createElement("li");
                        newLi.textContent = element.username;
                        newList.appendChild(newLi);
                    })
            
                    let likeBtn = document.createElement("button");
                    likeBtn.textContent = "LIKE";
                    div.appendChild(likeBtn);
                    
                    likeBtn.addEventListener("click", () => {
                        if (likeBtn.textContent === "LIKE") {
                            addLike();
                        } else {
                            unLike();
                        }
                    })

                    function addLike() {
                        let likeObj = {
                            "id": ele.users.id,
                            "username": ele.users.username
                        }

                        let likeConfig = {
                            method: "PATCH",
                            headers: {
                                "Content-Type": "application/json",
                                "Accepts": "application/json"
                            },
                            body: JSON.stringify(likeObj)
                        }
                        fetch(`http://localhost:3000/books/${e.id}`, likeConfig)
                            .then((rsp) => rsp.json())
                            .then((obj) => {
                                let thirdLi = document.createElement("li");
                                if (thirdLi.textContent === "") {
                                thirdLi.textContent = obj.username;
                                newList.appendChild(thirdLi);
                                }
                            });
                    }

                    showPanel.appendChild(div);
                })
                }
                ul.appendChild(li);
            })
        })
});