const form = document.getElementById("form");
const username = document.getElementById("user");
const email = document.getElementById("mail");
const password = document.getElementById("pass");
const password2 = document.getElementById("passCheck");
let regex = /^[A-Za-z][A-Za-z0-9]{3,13}[A-Za-z]$/;

form.addEventListener("submit", (e) => {
  e.preventDefault();

  checkInputs();
  if (Pass()) {
    const data = {
      UserName: username.value.trim(),
      Email: email.value.trim,
      password: password.value.trim(),
      password_confirmation: password2.value.trim(),
    };
    fetch("https://reqres.in/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
    location.replace("success.html");
  }
});
function Pass() {
  const usernameValue = username.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const password2Value = password2.value.trim();
  localStorage.setItem("User", emailValue);
  return (
    usernameValue.match(regex) &&
    isEmail(emailValue) &&
    passwordValue.length >= 8 &&
    password2Value === passwordValue &&
    password2Value.length >= 8
  );
}
function checkInputs() {
  // trim to remove the whitespaces
  const usernameValue = username.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const password2Value = password2.value.trim();

  if (!usernameValue.match(regex)) {
    setErrorFor(
      username,
      "Username must 5 to 15 characters, only letters and numbers, no numbers at the beginning or the end "
    );
  } else {
    setSuccessFor(username);
  }

  if (!isEmail(emailValue)) {
    setErrorFor(email, "Not a valid email");
  } else {
    setSuccessFor(email);
  }
  if (passwordValue.length < 8) {
    setErrorFor(password, "Password must be more than 8 characters");
  } else {
    setSuccessFor(password);
  }

  if (password2Value !== passwordValue || password2Value.length < 8) {
    setErrorFor(password2, "Password doesn't match");
  } else {
    setSuccessFor(password2);
  }
}

function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  formControl.className = "form-control error";
  small.innerText = message;
}

function setSuccessFor(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

function isEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}
