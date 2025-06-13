let users = JSON.parse(localStorage.getItem('users')) || [];
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
let missionEndTime = localStorage.getItem('missionEndTime') || null;
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.style.display = 'none';
    });
    document.getElementById(pageId).style.display = 'block';
}
window.onload = function() {
    if (currentUser) {
        showWelcome();
    } else {
        showPage('login-page');
    }
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const completedUsers = users.filter(user => user.xp > 0);
    const sortedUsers = completedUsers.sort((a, b) => b.xp - a.xp);
    const leaderboardList = document.getElementById('leaderboard-list');
    leaderboardList.innerHTML = '';
    sortedUsers.forEach((user, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${user.name}</td>
            <td>${user.xp}</td>
        `;
        leaderboardList.appendChild(tr);
    });
};

function signup() {
    const name = document.getElementById('signup-name').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value.trim();
    if (!name || !email || !password) {
        alert('Please fill all fields');
        return;
    }
    const exists = users.find(user => user.email === email);
    if (exists) {
        alert('Email already registered.');
        return;
    }
    const newUser = { name, email, password, xp: 0 };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    alert('Signup successful! Please login.');
    showPage('login-page');
}
function login() {
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value.trim();
    const user = users.find(user => user.email === email && user.password === password);
    if (!user) {
        alert('Invalid email or password');
        return;
    }
    currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    showWelcome();
}
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';      
    localStorage.removeItem('missionEndTime');   
}
function showWelcome() {
    document.getElementById('welcome-name').innerText = currentUser.name;
    showPage('welcome-page');
    document.getElementById('logout-btn').style.display = 'block';
}
function startMission() {
    if (!missionEndTime) {
        missionEndTime = Date.now() + 24 * 60 * 60 * 1000; 
        localStorage.setItem('missionEndTime', missionEndTime);
    }
    document.getElementById('start-mission-btn').style.display = 'none'; 
    document.getElementById('mission-details').style.display = 'block'; 
    updateTimer(); 
}
function updateTimer() {
    setInterval(() => {
        if (!missionEndTime) return;
        const now = Date.now();
        const distance = missionEndTime - now;
        if (distance < 0) {
            document.getElementById('time-left').innerText = "Expired";
            return;
        }
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        document.getElementById('time-left').innerText = `${hours}h ${minutes}m ${seconds}s`;
    }, 1000);
}
const tasks = [
    "Plant a native tree or native plant",
    "Pick up 10 pieces of litter from a natural area",
    "Build a small bird feeder and hang it outside",
    "Plant a flower that attracts bees or butterflies",
    "Create a mini insect hotel with twigs and leaves",
    "Leave a shallow bowl of water for birds and small animals",
    "Clean a park, forest, or riverbank for 30 minutes",
    "Save seeds from fruits and plant them",
    "Construct a birdhouse or nesting box and place it in your yard",
    "Spend 20 minutes observing local wildlife",
    "Collect and properly dispose of trash in a nearby waterway or park",
    "Avoid using any chemical pesticides for a day",
    "Collect rainwater to water plants",
    "Sketch or photograph 3 different wild plants",
    "Share an educational post about biodiversity threats",
    "Plant a Medicinal Herb Garden to support local wildlife",
    "Volunteer online for a biodiversity protection project",
    "Spend 2 hours respecting nature without disturbing habitats",
    "Report illegal tree cutting or wildlife harm if seen",
    "Use a reusable bag and cup today",
    "Organize a biodiversity awareness mini-event",
    "Support organic and local farmers",
    "Switch off unused lights and save energy for habitats",
    "Make a mini-pond for insects and frogs in your garden",
    "Reduce paper usage to save trees",
    "Provide financial support or funds for a local wildlife rescue organization",
    "Install a bat house in your backyard",
    "Participate in citizen science projects tracking animals",
    "Create a small butterfly garden with native plants that provide nectar and habitat for pollinators.",
    "Create a social media campaign promoting local biodiversity"
];
function showSubMissions() {
    const subMissionsContainer = document.getElementById('sub-missions');
    subMissionsContainer.innerHTML = ""; 
    const randomTasks = [];
    while (randomTasks.length < 3) {
        const randomTask = tasks[Math.floor(Math.random() * tasks.length)];
        if (!randomTasks.includes(randomTask)) {
            randomTasks.push(randomTask);
        }
    }
    randomTasks.forEach(task => {
        const taskContainer = document.createElement('div');
        taskContainer.style.display = 'flex';
        taskContainer.style.alignItems = 'center';
        taskContainer.style.marginBottom = '8px';
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'task-checkbox';
        someElement.appendChild(checkbox);
        checkbox.style.marginRight = '10px';
        const taskText = document.createElement('label');
        taskText.textContent = task;
        taskContainer.appendChild(checkbox);
        taskContainer.appendChild(taskText);
        subMissionsContainer.appendChild(taskContainer);
    });
}
    document.getElementById('finishMissionBtn').addEventListener('click', function() {
    document.getElementById('mission-details').style.display = 'none'; 
    document.getElementById('missionCompleted').style.display = 'block'; 
});
document.getElementById('goToLeaderboardBtn').addEventListener('click', function() {
    window.location.href = 'leaderboard.html'; 
});
function showLeaderboard() {
    const leaderboard = document.getElementById('leaderboard-list').getElementsByTagName('tbody')[0];
    leaderboard.innerHTML = ''; 

    const sortedUsers = [...users].sort((a, b) => b.xp - a.xp);
    sortedUsers.forEach((user, index) => {
        const row = leaderboard.insertRow();
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${user.name}</td>
            <td>${user.xp}</td>
        `;
    });
}
function showProgress() {
    document.getElementById('user-name').innerText = currentUser.name;
    document.getElementById('user-xp').innerText = currentUser.xp;
    const progress = Math.min(currentUser.xp / 500, 1) * 100; 
    document.getElementById('xp-progress').value = progress;
    showPage('progress-page'); 
}

function completeMission() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
if (!currentUser) {
    alert("User not found. Please log in again.");
    return;
}
    const completedTasks = document.querySelectorAll('#sub-missions input[type="checkbox"]:checked').length;
    if (completedTasks === 0) {
        alert('Please complete at least one task!');
        return;
    }
    const xpGained = completedTasks * 10; 
    currentUser.xp += xpGained; 
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = users.map(user => {
        if (user.email === currentUser.email) {
            return { ...user, xp: currentUser.xp };
        }
        return user;
    });
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    window.location.href = `success.html?completedTasks=${completedTasks}`;
}

