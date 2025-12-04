import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const StudentForm = ({ onSubmit, onCancel, initialData }) => {
  const [name, setName] = useState("");
  const [section, setSection] = useState("");
  const [marks, setMarks] = useState("");
  const [grade, setGrade] = useState("");
  
  // Initialize form if editing
  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setSection(initialData.section);
      setMarks(initialData.marks);
      setGrade(initialData.grade);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      id: initialData ? initialData.id : null,
      name,
      section,
      marks: Number(marks),
      grade
    });
  };

  // Auto-calculate grade based on marks
  const handleMarksChange = (e) => {
    const val = e.target.value;
    setMarks(val);
    const num = Number(val);
    if (num >= 90) setGrade("A+");
    else if (num >= 80) setGrade("A");
    else if (num >= 70) setGrade("B");
    else if (num >= 60) setGrade("C");
    else if (num >= 50) setGrade("D");
    else setGrade("F");
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg border-t-4 border-t-primary animate-in fade-in zoom-in-95 duration-300">
      <CardHeader>
        <CardTitle className="text-xl font-serif text-primary">
          {initialData ? "Edit Student" : "Add New Student"}
        </CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input 
              id="name" 
              placeholder="e.g. John Doe" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required
              data-testid="input-name"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="section">Section</Label>
              <Select value={section} onValueChange={setSection} required>
                <SelectTrigger data-testid="select-section">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A">Section A</SelectItem>
                  <SelectItem value="B">Section B</SelectItem>
                  <SelectItem value="C">Section C</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="marks">Marks (0-100)</Label>
              <Input 
                id="marks" 
                type="number" 
                min="0" 
                max="100"
                value={marks} 
                onChange={handleMarksChange} 
                required
                className="font-mono"
                data-testid="input-marks"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="grade">Grade (Auto-calculated)</Label>
            <Input 
              id="grade" 
              value={grade} 
              readOnly 
              className="bg-muted font-mono font-bold text-primary"
              data-testid="input-grade"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-6">
          <Button 
            type="button" 
            variant="ghost" 
            onClick={onCancel}
            data-testid="button-cancel"
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            data-testid="button-submit"
          >
            {initialData ? "Update Student" : "Save Student"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default StudentForm;
