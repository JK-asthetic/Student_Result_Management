// Mock Data Service to simulate JSON Server behavior
// Since we are in a frontend-only environment, we simulate the "Fetch API" 
// by returning Promises that resolve after a short delay.

let mockStudents = [
  { id: 1, name: "Alice Johnson", section: "A", marks: 85, grade: "A" },
  { id: 2, name: "Bob Smith", section: "B", marks: 72, grade: "B" },
  { id: 3, name: "Charlie Brown", section: "A", marks: 91, grade: "A+" },
  { id: 4, name: "Diana Prince", section: "C", marks: 65, grade: "C" },
];

const DELAY = 500; // Simulate network latency

export const studentService = {
  getAll: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...mockStudents]);
      }, DELAY);
    });
  },

  create: (student) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newStudent = { ...student, id: Date.now() };
        mockStudents = [...mockStudents, newStudent];
        resolve(newStudent);
      }, DELAY);
    });
  },

  update: (id, updatedData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        mockStudents = mockStudents.map((s) => 
          s.id === id ? { ...s, ...updatedData } : s
        );
        resolve(updatedData);
      }, DELAY);
    });
  },

  delete: (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        mockStudents = mockStudents.filter((s) => s.id !== id);
        resolve(id);
      }, DELAY);
    });
  },
  
  getById: (id) => {
     return new Promise((resolve) => {
      setTimeout(() => {
        const student = mockStudents.find((s) => s.id === id);
        resolve(student);
      }, DELAY);
    });
  }
};
