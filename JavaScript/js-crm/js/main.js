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
const teachers_row = document.querySelector(".teachers-row");
const allTeachers = document.querySelector(".allTeachers");
const toggle_dark = document.querySelector(".toggle-dark");
const search_input = document.querySelector(".search-input");
const sortByMerried = document.getElementById("sortByMerried");
const sortName = document.getElementById("sortName");
const modal_body = document.querySelector(".modal-body");

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
function getTeacher({
  firstName,
  lastName,
  avatar,
  phoneNumber,
  email,
  isMarried,
  groups,
  id,
}) {
  return `
    <div class="teacher">
      <div class="teacher-header">
        <img src=${avatar} alt="avatar"/>
        <h3 class="teacher-fullname">${firstName} ${lastName}</h3>
        <p class="text-muted">${isMarried ? "married" : "unmarried"}</p>
      </div>
      <div class="teacher-body">
        <p><b>Phone:</b> ${phoneNumber}</p>
        <p><b>Email:</b> ${email}</p>
        <div class="btn-group">
          <button class="btn-edit" onclick="saveProfileData(${id})">Profile</button>
          <button class="btn-delete" onclick='deleteTeacher(${id})'>Delete</button>
          <a onclick="saveData(${id})" class="btn-see">Students</a>
        </div>
      </div>
    </div>
  `;
}
const getData = async () => {
  try {
    let res = await request(`${ENDPOINT}/teacher`);
    teachers_row.innerHTML = "";
    res.data.map((item) => {
      teachers_row.innerHTML += getTeacher(item);
    });
    allTeachers.textContent = res.data.length;
  } catch (error) {
    console.log(error);
  }
};
getData();
async function deleteTeacher(id) {
  try {
    await request.delete(`${ENDPOINT}/teacher/${id}`);
  } catch (error) {
    console.log(error);
  } finally {
    const ask = confirm("Do you want to really delete this teacher?");
    ask ? getData() : console.log("ok");
  }
}
async function postTeacher(obj) {
  try {
    await request.post(`${ENDPOINT}/teacher`, obj);
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
  const groups = document.getElementById("groups").value;
  const email = document.getElementById("email").value;
  const avatar = document.getElementById("avatar").value;
  const phoneNumber = document.getElementById("phoneNumber").value;
  const isMarried = document.getElementById("isMerried").checked;

  let id = 10000000;
  const phoneRegex = /^\+998\s\d{2}\s\d{3}\s\d{2}\s\d{2}$/;
  if (phoneRegex.test(phoneNumber)) {
    let newItem = {
      firstName,
      lastName,
      avatar,
      phoneNumber,
      email,
      isMarried,
      groups,
      id: id++,
    };
    postTeacher(newItem);
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
search_input.addEventListener("keyup", searchTeacher);
async function searchTeacher() {
  try {
    let res = await request(`${ENDPOINT}/teacher`);
    teachers_row.innerHTML = "";
    let newUser = res.data.filter((item) =>
      item.firstName.toLowerCase().includes(this.value.toLowerCase())
    );
    allTeachers.textContent = newUser.length;

    newUser.map((item) => {
      teachers_row.innerHTML += getTeacher(item);
    });
    if (!teachers_row.innerHTML.length) {
      teachers_row.textContent = "User not Found";
    }
  } catch (error) {
    console.log(error);
  }
}
sortByMerried.addEventListener("change", merriedFunc);
async function merriedFunc() {
  try {
    let res = await request(`${ENDPOINT}/teacher`);
    teachers_row.innerHTML = "";
    let newItem = res.data.filter((item) => {
      var merrid = "";
      item.isMarried ? (merrid = "merried") : (merrid = "unmerried");

      return merrid == this.value;
    });
    newItem.map((item) => {
      teachers_row.innerHTML += getTeacher(item);
    });
    allTeachers.textContent = newItem.length;

    if (this.value == "all") {
      res.data.map((el) => {
        teachers_row.innerHTML += getTeacher(el);
      });
      allTeachers.textContent = res.data.length;
    }
  } catch (error) {
    console.log(error);
  }
}
sortName.addEventListener("change", sortByLastName);
async function sortByLastName() {
  let res = await request(`${ENDPOINT}/teacher`);
  teachers_row.innerHTML = "";
  allTeachers.textContent = res.data.length;

  let newRes = res.data.sort((a, b) => {
    if (this.value == "asc") {
      if (a.lastName < b.lastName) {
        return -1;
      }
    } else {
      if (a.lastName > b.lastName) {
        return -1;
      }
    }
  });
  newRes.map((el) => {
    teachers_row.innerHTML += getTeacher(el);
  });
}

// Save Data
async function saveData(id) {
  localStorage.setItem("teacherID", id);
  location.href = "/students.html";
}
async function saveProfileData(id) {
  localStorage.setItem("profileIDT", id);
  location.href = "/profile.html";
}
