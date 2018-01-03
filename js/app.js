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
    img.alt = member.name.first + ' ' + member.name.last;
    img.className ='avatar';
    imageDiv.appendChild(img);
    memberDiv.appendChild(imageDiv);

    //Use the 4 first users to populate "New Members"
    if (i <= 3){

      const detailsDiv = document.createElement('div');
      const name = document.createElement('p');
      name.innerHTML = member.name.first + ' ' + member.name.last;
      const email = document.createElement('p');
      detailsDiv.appendChild(name);
      detailsDiv.appendChild(email);
      memberDiv.appendChild(detailsDiv);

      //Signup Date
      const dateDiv = document.createElement('div');
      const signupDate = document.createElement('p');
      signupDate.innerHTML = member.registered;
      dateDiv.appendChild(signupDate);
      memberDiv.appendChild(dateDiv);

      newMembersDiv.appendChild(memberDiv);
      if (i < 3){
        const line = document.createElement('hr');
        newMembersDiv.appendChild(line);
      }
    }
    //Use the last 4 users to populate "Recent Activity"
    else {
      console.log('hey')
      //Activity and time
      const activityDiv = document.createElement('div');
      const activity = document.createElement('p');
      activity.innerHTML = member.name.first + ' ' + member.name.last + membersActivity[i -4];
      const time = document.createElement('p');
      time.innerHTML = activityTime[i -4];
      activityDiv.appendChild(activity);
      activityDiv.appendChild(time);
      memberDiv.appendChild(activityDiv);

      //Signup Date
      // const dateDiv = document.createElement('div');
      // const signupDate = document.createElement('p');
      // signupDate.innerHTML = member.registered;
      // dateDiv.appendChild(signupDate);
      // memberDiv.appendChild(dateDiv);

      recentActivityDiv.appendChild(memberDiv);
      if (i < 7){
        const line = document.createElement('hr');
        recentActivityDiv .appendChild(line);
      }
    }
  }

  // const newMembersDiv = document.getElementById('new-members');
  // //Populate New Members div with random users
  // for (let i = 0; i < randomUsers.length; i++) {
  //
  //   const member = randomUsers[i];
  //
  //   //Wrapper div for user info
  //   const memberDiv = document.createElement('div');
  //
  //   //Image aka avatar
  //   const imageDiv = document.createElement('div');
  //   const img = document.createElement('img');
  //   img.src = member.picture.thumbnail;
  //   img.alt = member.name.first + ' ' + member.name.last;
  //   img.className ='avatar';
  //   imageDiv.appendChild(img);
  //   memberDiv.appendChild(imageDiv);
  //
  //   //Name and Email
  //   const detailsDiv = document.createElement('div');
  //   const name = document.createElement('p');
  //   name.innerHTML = member.name.first + ' ' + member.name.last;
  //   const email = document.createElement('p');
  //   detailsDiv.appendChild(name, email);
  //   memberDiv.appendChild(detailsDiv);
  //
  //   //Signup Date
  //   const dateDiv = document.createElement('div');
  //   const signupDate = document.createElement('p');
  //   signupDate.innerHTML = member.registered;
  //   dateDiv.appendChild(signupDate);
  //   memberDiv.appendChild(dateDiv);
  //
  //   newMembersDiv.appendChild(memberDiv);
  //   if (i < 4){
  //     const line = document.createElement('hr');
  //     newMembersDiv.appendChild(line);
  //   }
  // }
}

// <div>
    // <img class="avatar" src="graphics/images/avatar.jpg" alt="avatar" />
    // <p>Jane Doe <br>
    // jane.doe@gmail.com</p>
    // <p>XX/XX/XX</p>
// </div>

// <hr>

// <div>
//   <img class="avatar" src="graphics/images/avatar.jpg" alt="avatar" />
//   <p>Jane Doe did something</p>
//   <p>This long ago</p>
// </div>
// <div>
//   <p>></p>
// </div>
