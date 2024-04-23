const API_KEY = "YnBsntyhJZ0BCjdopglqHAPZ2eYfOtRloE1XotGv";

async function getImg() {
    const date = document.getElementById('dateInput').value;
    base_url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date}`;
    const response = await fetch(base_url);
    const data = await response.json(); //convert response into json
    console.log(data); //log the data
    // display data on frontend
    document.getElementById("date").textContent = "Date: " + data.date;
    document.getElementById("exp").textContent = data.explanation;
    document.getElementById("title").textContent = data.title;
    document.getElementById('bg').src = data.url;
    document.getElementById('dwnld').href = data.hdurl;
  }
  // function call
  // Space Events Calendar
async function fetchSpaceEvents() {
  const response = await fetch('https://api.nasa.gov/DONKI/CMEAnalysis?startDate=2024-04-01&endDate=2024-04-30&api_key=YOUR_API_KEY');
  const data = await response.json();
  return data;
}

async function displaySpaceEvents() {
  const spaceEventsList = document.querySelector("#spaceEvents ul");
  spaceEventsList.innerHTML = "";
  const spaceEvents = await fetchSpaceEvents();
  spaceEvents.forEach(event => {
    const listItem = document.createElement("li");
    listItem.textContent = `${event.activityID}: ${event.note}`;
    spaceEventsList.appendChild(listItem);
  });
}

// Space Missions
async function fetchSpaceMissions() {
  const response = await fetch('https://api.nasa.gov/mars-photos/api/v1/rovers?api_key=YOUR_API_KEY');
  const data = await response.json();
  return data;
}

async function displaySpaceMissions() {
  const spaceMissionsList = document.querySelector("#spaceMissions ul");
  spaceMissionsList.innerHTML = "";
  const spaceMissions = await fetchSpaceMissions();
  spaceMissions.rovers.forEach(rover => {
    const listItem = document.createElement("li");
    listItem.textContent = `${rover.name}: ${rover.status}`;
    spaceMissionsList.appendChild(listItem);
  });
}

// Call functions to display content
displaySpaceEvents();
displaySpaceMissions();

  getImg();