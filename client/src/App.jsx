import React, { useState } from "react";
import StudentList from "@/components/StudentList";
import StudentForm from "@/components/StudentForm";
import StudentDetails from "@/components/StudentDetails";
import { studentService } from "@/services/studentService";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";

// Modes: LIST, ADD, EDIT, DETAILS
const MODES = {
  LIST: "LIST",
  ADD: "ADD",
  EDIT: "EDIT",
  DETAILS: "DETAILS"
};

function App() {
  const [students, setStudents] = useState([]);
  const [currentMode, setCurrentMode] = useState(MODES.LIST);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // 1. Load Students
  const loadStudents = () => {
    setIsLoading(true);
    studentService.getAll()
      .then((data) => {
        setStudents(data);
        toast({ title: "Success", description: "Student data loaded successfully." });
      })
      .catch(() => {
        toast({ title: "Error", description: "Failed to load students.", variant: "destructive" });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // 2. Add Student
  const handleAddStudent = (studentData) => {
    setIsLoading(true);
    studentService.create(studentData)
      .then(() => {
        toast({ title: "Success", description: "Student added. Please reload to see changes." });
        setCurrentMode(MODES.LIST);
        // Per requirements: "show an alert and let them click the 'Load Students' button again"
        // I will reset the list so they HAVE to click load, or just show the toast.
        // To follow instructions strictly:
        setStudents([]); // Clear list to force reload
      })
      .finally(() => setIsLoading(false));
  };

  // 3. Edit Student
  const handleEditStudent = (studentData) => {
    setIsLoading(true);
    studentService.update(studentData.id, studentData)
      .then(() => {
        toast({ title: "Success", description: "Student updated. Please reload to see changes." });
        setCurrentMode(MODES.LIST);
        setStudents([]); // Clear list to force reload as per instructions
      })
      .finally(() => setIsLoading(false));
  };

  // 4. Delete Student
  const handleDeleteStudent = (id) => {
    if (confirm("Are you sure you want to delete this student?")) {
      setIsLoading(true);
      studentService.delete(id)
        .then(() => {
          toast({ title: "Success", description: "Student deleted. Please reload." });
          setStudents([]); // Clear list to force reload
        })
        .finally(() => setIsLoading(false));
    }
  };

  // Navigation handlers
  const goToAdd = () => {
    setSelectedStudent(null);
    setCurrentMode(MODES.ADD);
  };

  const goToEdit = (student) => {
    setSelectedStudent(student);
    setCurrentMode(MODES.EDIT);
  };

  const goToDetails = (student) => {
    setSelectedStudent(student);
    setCurrentMode(MODES.DETAILS);
  };

  const goToList = () => {
    setSelectedStudent(null);
    setCurrentMode(MODES.LIST);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans p-4 md:p-8">
      <Toaster />
      <main className="max-w-5xl mx-auto space-y-8">
        <header className="text-center space-y-2 mb-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary tracking-tight">
            Student Result Management
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            A simple system to track student performance, marks, and grades.
          </p>
        </header>

        <div className="min-h-[400px]">
          {currentMode === MODES.LIST && (
            <StudentList 
              students={students}
              isLoading={isLoading}
              onLoad={loadStudents}
              onAdd={goToAdd}
              onEdit={goToEdit}
              onDelete={handleDeleteStudent}
              onView={goToDetails}
            />
          )}

          {currentMode === MODES.ADD && (
            <StudentForm 
              onSubmit={handleAddStudent}
              onCancel={goToList}
            />
          )}

          {currentMode === MODES.EDIT && (
            <StudentForm 
              initialData={selectedStudent}
              onSubmit={handleEditStudent}
              onCancel={goToList}
            />
          )}

          {currentMode === MODES.DETAILS && (
            <StudentDetails 
              student={selectedStudent}
              onBack={goToList}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
