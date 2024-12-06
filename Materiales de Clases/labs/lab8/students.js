const students = [];

const addStudent = (student) => {
  students.push({
    id: students.length + 1,
    student,
  });
};

const getStudents = () => {
  return students;
};

const getStudentById = (id) => {
  return students.find((student) => student.id === id);
};

const drawStudents = (tag) => {
  tag.innerHTML = "";
  console.log(tag, students);
  students.forEach((student) => {
    tag.innerHTML += `
      <tr>
        <td>${student.name}</td>
        <td>${student.lastname}</td>
      </tr>
    `;
  });
};

export { students, addStudent, getStudents, getStudentById, drawStudents };