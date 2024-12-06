import { addStudent, drawStudents } from "./students.js";

const htmlElements = {
  form: document.querySelector("form"),
  studentsList: document.getElementById("students-list"),
};

const handlers = {
  submit: (event) => {
    event.preventDefault();
    const student = {
      name: event.target.name.value,
      lastname: event.target.lastname.value,
    };
    addStudent(student);
    drawStudents(htmlElements.studentsList);
    event.target.reset();
  },
};

const bindEvents = () => {
  console.log(htmlElements.form);
  htmlElements.form.addEventListener("submit", handlers.submit);
};

const init = () => {
  bindEvents();
};

init();
