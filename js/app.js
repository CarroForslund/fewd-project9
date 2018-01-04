// =============================================================================
// CHARTS
// =============================================================================

// TRAFFIC CHART
const trafficChartCanvas = document.getElementById('traffic-line-chart');
const trafficChart = new Chart(trafficChartCanvas, {
  type: 'line',
  data: {
    labels: ['week 1', 'week 2', 'week 3', 'week 4', 'week 5', 'week 6', 'week 7', 'week 8', 'week 9', 'week 10'],
    datasets: [{
      data: [500, 1000, 750, 1250, 1750, 1250, 1500, 1000, 1500, 1750],
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

// DAILY TRAFFIC CHART
const dailyTrafficChartCanvas = document.getElementById('daily-traffic-bar-chart');
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
const mobileUsersChartCanvas = document.getElementById('mobile-users-doughnut-chart');
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
    const randomUsers = data.results;
    populate(randomUsers);
  }
});

/* CHANGE FIRST CHARACTER TO UPPERCASE
*/
function firstUp(string){
  return string[0].toUpperCase() + string.substring(1);
}

/* POPULATE MEMBER SECTIONS
** using Random Users API https://randomuser.me
*/
function populate(randomUsers){

  //Variable declaration
  const newMembersDiv = document.getElementById('new-members');
  const recentActivityDiv = document.getElementById('recent-activity');
  const membersActivity = [" posted YourApp's SEO Tips", " commented on Facebook's Changes for 2016",
    " liked the post Facebook's Changes for 2016", " commented on YourApp's SEO Tips"];
  const activityTime = ['1 day ago', '5 hours ago', '5 hours ago', '4 hours ago'];

  //Loop through random users to populate member sections
  for (let i = 0; i < randomUsers.length; i++) {

    const member = randomUsers[i];

    //Wrapper div for user info
    const memberDiv = document.createElement('div');
    memberDiv.className = 'member';

    //Image aka avatar
    const imageDiv = document.createElement('div');
    const img = document.createElement('img');
    img.src = member.picture.thumbnail;
    img.alt = firstUp(member.name.first) + ' ' + firstUp(member.name.last);
    img.className ='avatar';
    imageDiv.appendChild(img);
    memberDiv.appendChild(imageDiv);

    //Use the 4 first users to populate "New Members" specific info
    if (i <= 3){

      const detailsDiv = document.createElement('div');
      const name = document.createElement('p');
      name.className = 'member-name';
      name.innerHTML = firstUp(member.name.first) + ' ' + firstUp(member.name.last);
      const email = document.createElement('p');
      email.innerHTML = member.email;
      email.className = 'member-email';
      detailsDiv.appendChild(name);
      detailsDiv.appendChild(email);
      memberDiv.appendChild(detailsDiv);

      //Signup Date
      const dateDiv = document.createElement('div');
      dateDiv.className = 'flex-item-last';
      const signupDate = document.createElement('p');
      const dateOptions = { month: '2-digit', day: '2-digit', year: '2-digit'};
      signupDate.innerHTML = new Date(member.registered).toLocaleDateString('en-US', dateOptions);
      signupDate.className = 'member-signup';
      dateDiv.appendChild(signupDate);
      memberDiv.appendChild(dateDiv);

      newMembersDiv.appendChild(memberDiv);
      if (i < 3){
        const line = document.createElement('hr');
        newMembersDiv.appendChild(line);
      }
    }
    //The 4 last users populates "Recent Activity" specific info
    else {

      //Activity and time
      const activityDiv = document.createElement('div');
      const activity = document.createElement('p');
      activity.innerHTML = firstUp(member.name.first) + ' ' + firstUp(member.name.last) + membersActivity[i -4];
      const time = document.createElement('p');
      time.innerHTML = activityTime[i -4];
      time.className = 'activity-time';
      activityDiv.appendChild(activity);
      activityDiv.appendChild(time);
      memberDiv.appendChild(activityDiv);

      // Signup Date
      const arrowDiv = document.createElement('div');
      arrowDiv.className = 'flex-item-last';
      const arrow = document.createElement('p');
      arrow.innerHTML = '›';
      arrow.className = 'activity-arrow';
      arrowDiv.appendChild(arrow);
      memberDiv.appendChild(arrowDiv);

      //Add linebreak if not the last one
      recentActivityDiv.appendChild(memberDiv);
      if (i < 7){
        const line = document.createElement('hr');
        recentActivityDiv .appendChild(line);
      }
    }
  }
}
