const form = {
  email: document.querySelector("#logMail"),
  password: document.querySelector("#logMdp"),
  submit: document.querySelector("#logSubmit"),
};

const badLog = document.createElement("p");

let button = form.submit.addEventListener("click", (e) => {
  e.preventDefault();
  const login = "http://localhost:5678/api/users/login";

  fetch(login, {
    method: "POST",
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify({
      email: form.email.value,
      password: form.password.value,
    }),
  })
  .then((response) => {
    if (response.status === 404 || response.status === 401) {
      badLog.innerText = 'votre Email ou Mot de Passe est incorecte';
      badLog.classList.add("redLog")
      form.password.after(badLog);
      return response.json()
    } else {
      return response.json()
    }
  })
    .then((data) => {
      console.log(data);
      if (data.error || data.message == "user not found") {
        let token = window.localStorage.getItem("token");
        window.localStorage.removeItem("token");
        console.log(token);
      } else {
        let token = window.localStorage.getItem("token");

        if (token === null) {
          const token = data.token;
        
          const valeurtoken = JSON.stringify(token);
        
          window.localStorage.setItem("token", valeurtoken);
        }else{
          token = JSON.parse(token);
        }
        window.location.href = "index.html";
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

