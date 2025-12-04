import React, { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Edit2, Trash2, Eye, RefreshCw, Plus, GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const StudentList = ({ 
  students, 
  onLoad, 
  onAdd, 
  onEdit, 
  onDelete, 
  onView,
  isLoading 
}) => {
  return (
    <Card className="w-full shadow-md border-t-4 border-t-primary">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="space-y-1">
          <CardTitle className="text-2xl font-serif flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            Student Records
          </CardTitle>
          <CardDescription>Manage marks and grades for all sections</CardDescription>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={onLoad} 
            disabled={isLoading}
            className="gap-2 hover:bg-primary/5 hover:text-primary"
            data-testid="button-load-students"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            {isLoading ? "Loading..." : "Load Students"}
          </Button>
          <Button 
            onClick={onAdd}
            className="gap-2"
            data-testid="button-add-student"
          >
            <Plus className="h-4 w-4" />
            Add Student
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {students.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground bg-muted/20 rounded-lg border border-dashed">
            <p className="mb-2">No student data loaded.</p>
            <p className="text-sm">Click "Load Students" to view the records.</p>
          </div>
        ) : (
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="text-center">Section</TableHead>
                  <TableHead className="text-right">Marks</TableHead>
                  <TableHead className="text-center">Grade</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id} className="group hover:bg-muted/30 transition-colors">
                    <TableCell className="font-mono text-xs text-muted-foreground">{student.id}</TableCell>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant="secondary" className="font-mono text-xs">
                        {student.section}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-mono">{student.marks}</TableCell>
                    <TableCell className="text-center">
                      <Badge 
                        className={`${
                          student.grade.startsWith('A') ? 'bg-green-100 text-green-800 hover:bg-green-200 border-green-200' : 
                          student.grade.startsWith('B') ? 'bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200' : 
                          student.grade.startsWith('C') ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-200' : 
                          'bg-red-100 text-red-800 hover:bg-red-200 border-red-200'
                        } border shadow-none`}
                      >
                        {student.grade}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => onView(student)}
                          title="View Details"
                          className="h-8 w-8 hover:text-primary hover:bg-primary/10"
                          data-testid={`button-view-${student.id}`}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => onEdit(student)}
                          title="Edit Student"
                          className="h-8 w-8 hover:text-amber-600 hover:bg-amber-50"
                          data-testid={`button-edit-${student.id}`}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => onDelete(student.id)}
                          title="Delete Student"
                          className="h-8 w-8 hover:text-destructive hover:bg-destructive/10"
                          data-testid={`button-delete-${student.id}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StudentList;
