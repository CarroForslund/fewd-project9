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

function firstUp(name){
  return name[0].toUpperCase() + name.substring(1);
}

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
      const signupDate = document.createElement('p');
      signupDate.innerHTML = member.registered;
      signupDate.className = 'member-signup'
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
      const arrow = document.createElement('p');
      arrow.innerHTML = '>';
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
