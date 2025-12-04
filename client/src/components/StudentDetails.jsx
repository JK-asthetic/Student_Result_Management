import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Award, User, BookOpen, Hash } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const StudentDetails = ({ student, onBack }) => {
  if (!student) return null;

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg border-t-4 border-t-primary animate-in slide-in-from-right-10 duration-300">
      <CardHeader className="bg-muted/20 pb-8">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onBack} 
          className="w-fit -ml-2 mb-4 text-muted-foreground hover:text-primary"
          data-testid="button-back"
        >
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to List
        </Button>
        <div className="flex justify-center">
          <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center border-4 border-background shadow-inner">
             <span className="text-4xl font-serif font-bold text-primary">{student.grade}</span>
          </div>
        </div>
        <div className="text-center mt-4">
          <CardTitle className="text-2xl font-serif">{student.name}</CardTitle>
          <p className="text-muted-foreground font-mono mt-1">ID: {student.id}</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1 text-center p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center justify-center text-muted-foreground mb-1">
              <BookOpen className="h-4 w-4 mr-1" />
              <span className="text-xs uppercase tracking-wider font-semibold">Section</span>
            </div>
            <p className="font-serif text-xl font-medium">{student.section}</p>
          </div>
          
          <div className="space-y-1 text-center p-3 bg-muted/30 rounded-lg">
             <div className="flex items-center justify-center text-muted-foreground mb-1">
              <Hash className="h-4 w-4 mr-1" />
              <span className="text-xs uppercase tracking-wider font-semibold">Marks</span>
            </div>
            <p className="font-serif text-xl font-medium">{student.marks}/100</p>
          </div>
        </div>

        <Separator />

        <div className="space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Performance Summary</h4>
          <div className="flex items-start gap-3 p-4 rounded-lg border bg-card shadow-sm">
            <Award className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <p className="text-sm">
                {student.grade.startsWith('A') ? "Excellent performance! Keep up the great work." :
                 student.grade.startsWith('B') ? "Good job, but there is room for improvement." :
                 student.grade.startsWith('C') ? "Satisfactory. Needs more focus on core concepts." :
                 "Needs immediate attention and remedial support."}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentDetails;
