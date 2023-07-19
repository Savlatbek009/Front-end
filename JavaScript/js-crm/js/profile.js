// loader
const loader = document.querySelector(".loader");
const fadeEffect = setInterval(() => {
  if (!loader.style.opacity) {
    loader.style.opacity = 1;
  }
  if (loader.style.opacity > 0) {
    loader.style.opacity -= 0.1;
  } else {
    clearInterval(fadeEffect);
    loader.style.display = "none";
  }
}, 100);

// getHTML
const toggle_dark = document.querySelector(".toggle-dark");
const profile_row = document.querySelector(".profile-row");

// get Teacher

var profileIDTeacher = localStorage.getItem("profileIDT");
var profileIDStudent = localStorage.getItem("profileIDS");
var teacherID = localStorage.getItem("teacherID");
console.log(profileIDTeacher);
// var profileIDStudent = localStorage.getItem("profileID");
// Dark & Light mode
toggle_dark.addEventListener("click", function () {
  document.body.classList.toggle("dark");
});

const getTeacherData = async () => {
  try {
    let res = await request(`${ENDPOINT}/teacher/${teacherID}`);
    localStorage.setItem("avatar", res.data.avatar);
    localStorage.setItem("firtName", res.data.firstName);
  } catch (error) {
    console.log(error);
  }
};
getTeacherData();

function getProfileCard(data) {
  getTeacherData();
  if (!data.birthday) {
    return `
    <div class="profil-avatar">
        <img src="${data.avatar}" class="profil-avatar" alt="avatar" />
    </div>
    <div class="profil-data">
        <h3>${data.firstName} ${data.lastName} || <b>Teacher</b></h3>
        <p><b>Email:</b> ${data.email}</p>
        <p><b>Phone Number:</b> ${data.phoneNumber}</p>
        <p><b>ID:</b> ${data.id}</p>
        <button onclick="saveData(${data.id})">Students</button>
        <p class="merried">${data.isMarried ? "merried" : "unmerried"}</p>
    </div>
    `;
  } else {
    return `
    <div class="profil-avatar">
        <img src="${data.avatar}" class="profil-avatar" alt="avatar" />
    </div>
    <div class="profil-data">
        <h3>${data.firstName} ${data.lastName} || <b>Student</b></h3>
        <p><b>Email:</b> ${data.email}</p>
        <p><b>Phone Number:</b> ${data.phoneNumber}</p>
        <p><b>Field:</b> ${data.fields}</p>
        <p><b>Birth Date:</b> ${data.birthday.slice(0, 10)}</p>
        <p><b>ID:</b> ${data.id}</p>
        <p class="merried">${data.isWork ? "works" : "doesn't work"}</p>
        <div class="mini-teacher-div">
        <img src="${localStorage.getItem("avatar")}" alt=""/>
        <div>
          <p>${localStorage.getItem("firtName")}</p>
          <p>Teacher</p>
        </div>
      </div>
    </div>
    `;
  }
}
async function getProfileT(id) {
  localStorage.removeItem("profileIDS");
  try {
    profile_row.innerHTML = "";
    let resData = await axios.get(`${ENDPOINT}/teacher/${id}`);
    let data = resData.data;
    profile_row.innerHTML += getProfileCard(data);
  } catch (error) {
    console.log(err);
  }
}
async function getProfileS(id) {
  localStorage.removeItem("profileIDT");
  try {
    profile_row.innerHTML = "";
    let resData = await axios.get(
      `${ENDPOINT}/teacher/${teacherID}/student/${id}`
    );
    let data = resData.data;
    profile_row.innerHTML += getProfileCard(data);
  } catch (error) {
    console.log(err);
  }
}
getProfileT(profileIDTeacher);
getProfileS(profileIDStudent);

function saveData(id) {
  localStorage.setItem("teacherID", id);
  location.href = "/students.html";
}
