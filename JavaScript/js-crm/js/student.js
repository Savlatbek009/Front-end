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
const modal = document.querySelector(".teacher-modal");
const close_modal = document.querySelector(".close-modal");
const open_modal = document.querySelector(".open-modal");
const students_row = document.querySelector(".students-row");
const toggle_dark = document.querySelector(".toggle-dark");
const modal_body = document.querySelector(".modal-body");
const sortByWork = document.querySelector("#sortByWork");
const sortBirthdate = document.querySelector("#sortBirthdate");
const allStudents = document.querySelector(".allStudents");
// get Teacher

var teacherID = localStorage.getItem("teacherID");
// Dark & Light mode
toggle_dark.addEventListener("click", function () {
  document.body.classList.toggle("dark");
});

// Modal
function openModal() {
  modal.style.top = "0";
}
function closeModal() {
  modal.style.top = "-1000px";
}
open_modal.addEventListener("click", openModal);
close_modal.addEventListener("click", closeModal);

// work by API

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

function getStudent({
  firstName,
  lastName,
  avatar,
  phoneNumber,
  birthday,
  field,
  email,
  isWork,
  id,
}) {
  return `
    <div class="teacher">
      <div class="teacher-header">
        <img src=${avatar} alt="avatar"/>
        <h3 class="teacher-fullname">${firstName} ${lastName}</h3>
        <p class="text-muted">${isWork ? "works" : "doesn't work"}</p>
      </div>
      <div class="teacher-body">
        <p><b>Phone:</b> ${phoneNumber}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Birthdata:</b> ${birthday.slice(0, 10)}</p>
        <p><b>Field:</b> ${field}</p> 
        <div class="btn-group">
          <button class="btn-edit" onclick="seveStudentData(${id})">Profile</button>
          <button class="btn-delete" onclick='deleteStudent(${id}, ${teacherID})'>Delete</button>
        </div>
        <div class="mini-teacher-div">
          <img src="${localStorage.getItem("avatar")}" alt=""/>
          <div>
            <p>${localStorage.getItem("firtName")}</p>
            <p>Teacher</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

const getData = async () => {
  try {
    let res = await request(`${ENDPOINT}/teacher/${teacherID}/student`);
    students_row.innerHTML = "";
    allStudents.textContent = res.data.length;
    res.data.map((item) => {
      students_row.innerHTML += getStudent(item);
    });
  } catch (error) {
    console.log(error);
  }
};
getData();
async function deleteStudent(id, teacherId) {
  try {
    await request.delete(`${ENDPOINT}/teacher/${teacherID}/student/${id}`);
  } catch (error) {
    console.log(error);
  } finally {
    const ask = confirm("Do you want to really delete this teacher?");
    ask ? getData() : console.log("ok");
  }
}
async function postStudent(obj) {
  try {
    await request.post(`${ENDPOINT}/teacher/${teacherID}/student`, obj);
  } catch (error) {
    console.log(error);
  } finally {
    getData();
  }
}
modal_body.addEventListener("submit", function (e) {
  e.preventDefault();

  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;
  const avatar = document.getElementById("avatar").value;
  const field = document.getElementById("field").value;
  const phoneNumber = document.getElementById("phoneNumber").value;
  const birthdate = document.getElementById("birthdate").value;
  const doesWork = document.getElementById("doesWork").value;

  let id = 100000;
  const phoneRegex = /^\+998\s\d{2}\s\d{3}\s\d{2}\s\d{2}$/;
  if (phoneRegex.test(phoneNumber)) {
    let newItem = {
      firstName,
      lastName,
      avatar,
      phoneNumber,
      email,
      doesWork,
      field,
      birthdate,
      id: id++,
      teacherId: teacherID,
    };
    postStudent(newItem);
    closeModal();
    e.target.reset();
  } else {
    e.preventDefault();
    alert(
      "phone number is not uzb valid \n valid phone number: +998 90 447 75 15"
    );
  }
});

// Filters
sortByWork.addEventListener("change", workChecker);
async function workChecker() {
  try {
    let res = await request(`${ENDPOINT}/teacher/${teacherID}/student`);
    students_row.innerHTML = "";

    let newItem = res.data.filter((item) => {
      var work = "";
      item.isWork ? (work = "work") : (work = "doesn't work");

      return work == this.value;
    });
    newItem.map((item) => {
      students_row.innerHTML += getStudent(item);
    });
    allStudents.textContent = newItem.length;

    if (this.value == "all") {
      res.data.map((el) => {
        students_row.innerHTML += getStudent(el);
        allStudents.textContent = res.data.length;
      });
    }
  } catch (error) {
    console.log(error);
  }
}
sortBirthdate.addEventListener("change", sortByBirth);
async function sortByBirth() {
  let res = await request(`${ENDPOINT}/teacher/${teacherID}/student`);
  students_row.innerHTML = "";
  let newRes = res.data.sort((a, b) => {
    var birthdaya = a.birthday.slice(0, 10);
    var birthdayb = b.birthday.slice(0, 10);
    if (this.value == "asc") {
      if (birthdaya < birthdayb) {
        return -1;
      }
    } else {
      if (birthdaya > birthdayb) {
        return -1;
      }
    }
  });
  newRes.map((el) => {
    students_row.innerHTML += getStudent(el);
  });
}
function seveStudentData(id) {
  localStorage.setItem("profileIDS", id);
  location.href = "/profile.html";
}
