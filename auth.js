document.getElementById("signup-form")?.addEventListener("submit", function (e) {  
    e.preventDefault();
    const user = document.getElementById("signup-username").value;
    const pass = document.getElementById("signup-password").value;
    let users = JSON.parse(localStorage.getItem("users")) || {}; 
    if (users[user]) {
        document.getElementById("signup-message").textContent = "Username already exists!";
        return;
    }
    users[user] = pass;
    localStorage.setItem("users", JSON.stringify(users)); 
    localStorage.setItem("currentUser", user);
    document.getElementById("signup-message").textContent = "Signup successful! Redirecting...";
    setTimeout(() => location.href = "index.html", 1500);
});

document.getElementById("login-form")?.addEventListener("submit", function (e) {
    e.preventDefault();
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;
    let users = JSON.parse(localStorage.getItem("users")) || {};
    if (users[user] && users[user] === pass) {
        let progress = JSON.parse(localStorage.getItem(user + "_progress")) || { xp: 0, level: 1 };
        sessionStorage.setItem("loggedIn", "true");
        sessionStorage.setItem("currentUser", user); 
        sessionStorage.setItem("userProgress", JSON.stringify(progress)); 
        localStorage.setItem("currentUser", user);
        location.href = "welcome.html"; 
    } else {
        document.getElementById("login-error").textContent = "Invalid username or password";
    }
});
