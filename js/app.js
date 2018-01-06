// =============================================================================
// VARIABLE DECLARATION
// =============================================================================
const wrapper = document.getElementsByClassName('wrapper')[0];
const body = document.body;
let modalNumber = 0;

//Notifications
const notification = document.getElementById('notification');
const bell = document.getElementById('bell');
// let closeBtn = null;

// Stats
const statFilterButtons = document.getElementsByClassName('stat-filter');
const trafficChartCanvas = document.getElementById('traffic-line-chart');
const dailyTrafficChartCanvas = document.getElementById('daily-traffic-bar-chart');
const mobileUsersChartCanvas = document.getElementById('mobile-users-doughnut-chart');
const trafficChart = newTrafficChart(['week 1', 'week 2', 'week 3', 'week 4', 'week 5', 'week 6', 'week 7', 'week 8', 'week 9', 'week 10'], [500, 1000, 750, 1250, 1750, 1250, 1500, 1000, 1500, 1750]);

// Search
const userSearchField = document.querySelector("input[id='user-search']");
const userDatalist = document.getElementById('matching-users');
let searchResult = [];

//Users
let users = null;

//Message
const sendButton = document.getElementById('send');
const messageDiv = document.getElementById('message-user');
let message = '';
let messageNotification = document.createElement('p');

// =============================================================================
// ALERT & NOTIFICATIONS
// =============================================================================
bell.addEventListener('click', function(event){
  event.target.removeEventListener(event.type, arguments.callee);
  bell.setAttribute('style', 'cursor: auto');
  notification.setAttribute('style', 'opacity: 0');

  modal('You have a new message from Amber');
  modal('Joshua mentioned you in a comment');



});

function modal(msg){



  //Add overlay only once
  if(modalNumber === 0){
    //Modal (overlay div)
    const modal = document.createElement('div');
    modal.id = 'overlay';
    modal.className = 'overlay';
    // console.log(modal);
    body.appendChild(modal);
  }

  modalNumber++;

  //Modal content
  const modal = document.getElementById('overlay');
  const modalContent = document.createElement('div');
  modalContent.id = 'popup'+modalNumber;
  modalContent.className = 'popup';
  modalContent.setAttribute('style', 'z-index: 200');
  // modal.setAttribute = 'block';
  modal.appendChild(modalContent);

  const notice = document.createElement('p');
  notice.innerHTML = msg;
  modalContent.appendChild(notice);

  const close = document.createElement('p');
  close.className = 'close-popup';
  // close.href = '#';
  close.innerHTML = '&times;';
  close.addEventListener('click', function(){
    console.log('close');
    console.log(modalContent);
    modalContent.setAttribute('style', 'display: none');
    modalNumber--;
    if(modalNumber === 0){
      modal.remove();
      // bell.removeEventListener('click', function(){
      //   console.log('remove listener');
      // });
    }
  });
  modalContent.appendChild(close);



  console.log(msg);
  // closeBtn = document.getElementsByClassName("close")[0];

  // // When the user clicks on <span> (x), close the modal
  // close.onclick = function() {
  //     modal.style.display = "none";
  // }
}

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//     if (event.target == modal) {
//         modal.style.display = "none";
//     }
// }

// <p><a class="button" href="#popup2">Click Me Too</a></p>
// <div id="popup2" class="overlay">
//   <!-- <a class="close-bg" href="#"></a> -->
//   <div class="popup">
//     <h2>What the what?</h2>
//     <div class="content">
//       <a class="close-bg" href="#">&times;</a>
//       <p>Click outside the popup to close.</p>
//     </div>
//   </div>
// </div>


// =============================================================================
// TRAFFIC CHARTS
// =============================================================================

// Create a new line chart
function newTrafficChart(labels, data){

  new Chart(trafficChartCanvas, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: '#e2e3f6',
        borderColor: '#7477bf',
        borderWidth: 0.5,
        pointBackgroundColor: 'white',
        pointBorderWidth: 1,
        radius: 5
      }]
    },
    options: {
      responsive: true,
      legend: {
        display: false
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero:true
          }
        }]
      },
      elements: {
        line: {
          tension: 0, // disables bezier curves
        }
      }
    }
  });

}

// Traffic filter
for (button of statFilterButtons){
  button.addEventListener('click', function(e){
    for (button of statFilterButtons){
      button.classList.remove('active-filter');
    }
    this.classList.add('active-filter');
    const clickedButton = this.innerHTML;

    if (clickedButton === 'Hourly') {
      const chart = newTrafficChart(['8am', '9am', '10am', '11am', '12am', '1pm', '2pm', '3m', '4pm', '5pm'], [580, 350, 200, 500, 775, 900, 450, 300, 175, 600]);
    }
    else if (clickedButton === 'Daily') {
      console.log('Daily');
      const chart = newTrafficChart(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], [1250, 1500, 1300, 800, 950, 475, 1750]);
    }
    else if (clickedButton === 'Weekly') {
      const chart = newTrafficChart(['1', '2', '3', '4'], [500, 1000, 750, 1250]);
    }
    else if (clickedButton === 'Monthly') {
      const chart = newTrafficChart(['January', 'February', 'March', 'April', 'May', 'June'], [3000, 1700, 5000, 2500, 1300, 4750]);
    }
  });
}

// DAILY TRAFFIC CHART
const dailyTrafficChart = new Chart(dailyTrafficChartCanvas, {
  type: 'bar',
    data: {
      labels: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
      datasets: [{
        data: [50, 75, 150, 100, 200, 175, 75],
        backgroundColor: '#7477bf',
        borderColor: '7477bf',
        borderWidth: 1
      }]
  },
  options: {
    responsive: true,
    legend: {
      display: false
    },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero:true
        }
      }]
    }
  }
});

// MOBILE USERS CHART
const mobileUsersChart = new Chart(mobileUsersChartCanvas, {
  type: 'doughnut',
    data: {
      labels: ['Phones', 'Tablets', 'Desktop'],
      datasets: [{
        data: [15, 15., 70],
        backgroundColor: ['#74b1bf', '#81c98f', '#7477bf'],
        borderWidth: 1
      }]
  },
  options: {
    responsive: true,
    legend: {
      position: 'right',
      labels: {
        boxWidth: 10,
      }
    },
    rotation: -0.65 * Math.PI
  }
});

// =============================================================================
// MEMBERS
// =============================================================================
$.ajax({
  url: 'https://randomuser.me/api/?results=8&inc=name,picture,email,registered',
  dataType: 'json',
  error: function() {
    console.error("Couldn't get random users from API");
  },
  success: function(data) {
    users = data.results;
    populate(users);
  }
});

// CHANGE FIRST CHARACTER TO UPPERCASE
function firstUp(string){
  return string[0].toUpperCase() + string.substring(1);
}

// POPULATE MEMBER SECTIONS
// using Random Users API https://randomuser.me
function populate(randomUsers){

  //Variable declaration
  const newMembersDiv = document.getElementById('new-members');
  const recentActivityDiv = document.getElementById('recent-activity');
  const membersActivity = [" posted YourApp's SEO Tips", " commented on Facebook's Changes for 2016",
    " liked the post Facebook's Changes for 2016", " commented on YourApp's SEO Tips"];
  const activityTime = ['1 day ago', '5 hours ago', '5 hours ago', '4 hours ago'];

  // Loop through random users to populate member sections
  for (let i = 0; i < randomUsers.length; i++) {

    const member = randomUsers[i];

    // Wrapper div for user info
    const memberDiv = document.createElement('div');
    memberDiv.className = 'member';

    // Image aka avatar
    const imageDiv = document.createElement('div');
    const img = document.createElement('img');
    img.src = member.picture.thumbnail;
    img.alt = firstUp(member.name.first) + ' ' + firstUp(member.name.last);
    img.className ='avatar';
    imageDiv.appendChild(img);
    memberDiv.appendChild(imageDiv);

    // Use the 4 first users to populate "New Members" specific info
    if (i <= 3){

      // Wrapping div
      const detailsDiv = document.createElement('div');

      // Name
      const name = document.createElement('p');
      name.className = 'member-name';
      name.innerHTML = firstUp(member.name.first) + ' ' + firstUp(member.name.last);
      detailsDiv.appendChild(name);

      // Email
      const email = document.createElement('p');
      email.innerHTML = member.email;
      email.className = 'member-email';
      detailsDiv.appendChild(email);
      memberDiv.appendChild(detailsDiv);

      // Signup Date
      const dateDiv = document.createElement('div');
      dateDiv.className = 'flex-item-last';
      const signupDate = document.createElement('p');
      const dateOptions = { month: '2-digit', day: '2-digit', year: '2-digit'};
      signupDate.innerHTML = new Date(member.registered).toLocaleDateString('en-US', dateOptions);
      signupDate.className = 'member-signup';
      dateDiv.appendChild(signupDate);

      memberDiv.appendChild(dateDiv);

      // Line break between members
      newMembersDiv.appendChild(memberDiv);
      if (i < 3){
        const line = document.createElement('hr');
        newMembersDiv.appendChild(line);
      }

    }
    // The 4 last users populates "Recent Activity" specific info
    else {

      // Wrapping div
      const activityDiv = document.createElement('div');
      memberDiv.appendChild(activityDiv);

      // Activity
      const activity = document.createElement('p');
      activity.innerHTML = firstUp(member.name.first) + ' ' + firstUp(member.name.last) + membersActivity[i -4];
      activityDiv.appendChild(activity);

      // Time
      const time = document.createElement('p');
      time.innerHTML = activityTime[i -4];
      time.className = 'activity-time';
      activityDiv.appendChild(time);

      // Signup Date
      const arrowDiv = document.createElement('div');
      arrowDiv.className = 'flex-item-last';
      const arrow = document.createElement('p');
      arrow.innerHTML = '›';
      arrow.className = 'activity-arrow';
      arrowDiv.appendChild(arrow);
      memberDiv.appendChild(arrowDiv);

      // Add linebreak if not the last one
      recentActivityDiv.appendChild(memberDiv);
      if (i < 7){
        const line = document.createElement('hr');
        recentActivityDiv .appendChild(line);
      }
    }
  }
}

// =============================================================================
// MESSAGE USER
// =============================================================================

// SEARCH FOR USER
userSearchField.onkeyup = function(){

  // Variabe declaration
  const input = userSearchField.value;
  searchResult = [];
  let options = '';

  // Refresh datalist for every character added or removed in iput field
  while (userDatalist.firstChild) {
    userDatalist.removeChild(userDatalist.firstChild);
  }

  // Only look for a match if it's not an empty string
  if (input !== ''){

    //If match save to search result
    for (let i = 0; i < users.length; i++){
      if (users[i].name.first.includes(input) || users[i].name.first.includes(input)){
        searchResult.push(users[i]);
      }
    }

    // Add datalist options with search result
    for (let i = 0; i < searchResult.length; i++) {
      const name = firstUp(searchResult[i].name.first) + ' ' + firstUp(searchResult[i].name.last);
      options += '<option value="' + name + '" />';
      userDatalist.innerHTML = options;
    }

  }

};

// SEND BUTTON
sendButton.addEventListener('click', function(e){

  const userSearchField = document.querySelector("input[id='user-search']");
  const writtenMessage = document.getElementById('message').value;
  let validUser = false;
  for (let i = 0; i < searchResult.length; i++) {

    const userN = firstUp(searchResult[i].name.first) + ' ' + firstUp(searchResult[i].name.last);

    if (userN === userSearchField.value){
      validUser = true;
    }
  }

  // Validate and display message
  if (writtenMessage !== '' && writtenMessage !== null && validUser === true){

    message = 'Your message has been sent!';
    messageNotification.innerHTML = (message);
    messageDiv.appendChild(messageNotification);

  }
  else {

    message = 'Oops! You have to choose an existing user and write a message.';
    messageNotification.innerHTML = (message);
    messageDiv.appendChild(messageNotification);
    let validUser = false;

  }

});

// =============================================================================
// SAVE SETTINGS
// =============================================================================

// Test for local storage before saving to it
if ('localStorage' in window && window['localStorage'] !== null){

  // Variable declaration
  const emailSwitch = document.getElementById('switch-email');
  const publicSwitch = document.getElementById('switch-public');
  const timeZone = document.getElementById('time-zone');
  const saveButton = document.getElementById('save-settings');

  // Add event listener to save button and save settings to local storage
  saveButton.addEventListener('click', function () {

    localStorage.publicState = publicSwitch.checked;
    localStorage.emailState = emailSwitch.checked;
    localStorage.selectedIndex = timeZone.selectedIndex;
    localStorage.exists = true;

  });

  // Make sure saved settings shows as displayed
  if (localStorage.exists) {

    publicSwitch.checked = JSON.parse(localStorage.publicState);
    emailSwitch.checked = JSON.parse(localStorage.emailState);
    timeZone.selectedIndex = localStorage.selectedIndex;

  }
}
