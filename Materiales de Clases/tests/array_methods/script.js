const studentsList = document.querySelector("#students");
const studentsOver25List = document.querySelector("#students-over-25");
const studentsTallList = document.querySelector("#students-tall");
const studentAnlliList = document.querySelector("#student-anlli");
const studentsHonorRollList = document.querySelector("#students-honor-roll");

const students = [
  { id: 1, name: "Juan", age: 20, height: 1.7, weight: 70, overWeight: false, gender: "male", finalGrade: 2.5, gradeInLetters: ["B", "C", "A", "A", "B", "D"] },
  { id: 2, name: "Ana", age: 22, height: 1.6, weight: 60, overWeight: false, gender: "female", finalGrade: 1.9, gradeInLetters: ["B", "C", "A", "A", "B"] },
  { id: 3, name: "Pedro", age: 21, height: 1.8, weight: 80, overWeight: true, gender: "male", finalGrade: 3, gradeInLetters: ["B", "C", "A", "A", "B", "D"] },
  { id: 4, name: "Maria", age: 20, height: 1.6, weight: 50, overWeight: false, gender: "female", finalGrade: 2.8, gradeInLetters: ["B", "C", "A", "A", "B"] },
  { id: 5, name: "Anlli", age: 26, height: 1.57, weight: 75, overWeight: false, gender: "female", finalGrade: 2.55, gradeInLetters: ["B", "C", "A", "A", "B"] },
  { id: 6, name: "Amir", age: 17, height: 1.5, weight: 45, overWeight: false, gender: "male", finalGrade: 1.5, gradeInLetters: ["B", "C", "A", "A", "B"] },
  { id: 7, name: "Dutary", age: 23, height: 1.7, weight: 70, overWeight: false, gender: "male", finalGrade: 2.2, gradeInLetters: ["B", "C", "A", "A", "B"] },
  { id: 8, name: "Erick", age: 33, height: 1.76, weight: 85, overWeight: true, gender: "male", finalGrade: 3, gradeInLetters: ["B", "C", "A", "A", "B"] },
  { id: 9, name: "Anlli", age: 29, height: 1.77, weight: 55, overWeight: false, gender: "female", finalGrade: 2.9, gradeInLetters: ["B", "C", "A", "A", "B", "D"] },
  { id: 10, name: "Zoe", age: 40, height: 1.84, weight: 90, overWeight: true, gender: "other", finalGrade: 2.5, gradeInLetters: ["B", "C", "A", "A", "B"] },
];

const template = (student) => {
  const color = student.age < 30 ? "black" : "red";
  const overWeight = student.overWeight ? "(🥹)" : "";
  const isMale = student.gender === "male" ? "(👨‍🎓)" : "(👩‍🎓)";
  return `<li style="color: ${color}">${student.name} - ${student.age} ${overWeight} ${isMale}</li>`;
};

const studentsHtml = students.map(template);
const studentsOver25Html = students
  .filter((student) => student.age > 25)
  .map(template);
const studentsTallHtml = students
  .filter((student) => {
    const isTall = student.gender === "male" ? student.height > 1.75 : student.height > 1.56;
    return isTall;
  })
  .map(template);
const studentAnlliHtml = students.find((student) => student.id === 5);
const studentsHonorRollHtml = students
  .filter((student) => student.finalGrade >= 2.5 && !student.gradeInLetters.includes("D") && student.height >= 1.56)
  .map(template);

studentsList.innerHTML = `<ul>${studentsHtml.join("")}</ul>`;
studentsOver25List.innerHTML = `<ul>${studentsOver25Html.join("")}</ul>`;
studentsTallList.innerHTML = `<ul>${studentsTallHtml.join("")}</ul>`;
studentAnlliList.innerHTML = `<ul>${template(studentAnlliHtml)}</ul>`;
studentsHonorRollList.innerHTML = `<ul>${studentsHonorRollHtml.join("")}</ul>`;