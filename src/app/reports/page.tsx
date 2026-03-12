
"use client";

import { useState } from "react";
import { 
  Sparkles, 
  Calendar, 
  ChevronRight, 
  Loader2, 
  FileText,
  AlertCircle
} from "lucide-react";
import { 
  SidebarInset, 
  SidebarProvider, 
  SidebarTrigger 
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/sidebar-nav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { generateCustomAttendanceReport, type AttendanceReportOutput } from "@/ai/flows/generate-custom-attendance-reports";

export default function ReportsPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AttendanceReportOutput | null>(null);
  const [formData, setFormData] = useState({
    startDate: "2024-01-01",
    endDate: "2024-01-31",
    userGroup: "Grade 10-A"
  });

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const output = await generateCustomAttendanceReport(formData);
      setResult(output);
    } catch (error) {
      console.error("Failed to generate report:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 px-4 backdrop-blur">
          <SidebarTrigger className="-ml-1" />
          <h1 className="font-headline text-xl font-bold">AI Attendance Reports</h1>
        </header>

        <main className="p-6 md:p-8 max-w-5xl mx-auto w-full">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-1 space-y-6">
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Report Criteria</CardTitle>
                  <CardDescription>Select parameters for AI analysis</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>User Group</Label>
                    <Select defaultValue={formData.userGroup} onValueChange={(v) => setFormData(f => ({...f, userGroup: v}))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All Students">All Students</SelectItem>
                        <SelectItem value="Grade 10-A">Grade 10-A</SelectItem>
                        <SelectItem value="Grade 11-B">Grade 11-B</SelectItem>
                        <SelectItem value="Teachers">All Teachers</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <div className="relative">
                      <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <input 
                        type="date" 
                        value={formData.startDate}
                        onChange={(e) => setFormData(f => ({...f, startDate: e.target.value}))}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-9 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <div className="relative">
                      <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <input 
                        type="date" 
                        value={formData.endDate}
                        onChange={(e) => setFormData(f => ({...f, endDate: e.target.value}))}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-9 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full gap-2" onClick={handleGenerate} disabled={loading}>
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                    Generate with AI
                  </Button>
                </CardFooter>
              </Card>

              <Card className="bg-primary/5 border-primary/10">
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-primary" />
                    AI Intelligence
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-xs text-muted-foreground leading-relaxed">
                  Our AI analyzes patterns across user groups to find anomalies that manual tracking might miss. It specifically looks for clustered absences or tardiness trends.
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2">
              {!result && !loading && (
                <div className="h-full flex flex-col items-center justify-center text-center p-12 border-2 border-dashed rounded-xl bg-muted/20">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">No Report Generated</h3>
                  <p className="text-sm text-muted-foreground max-w-xs mt-1">
                    Select a date range and group to generate a detailed attendance analysis report.
                  </p>
                </div>
              )}

              {loading && (
                <div className="h-full flex flex-col items-center justify-center space-y-4">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <p className="text-sm text-muted-foreground animate-pulse">Analyzing attendance patterns...</p>
                </div>
              )}

              {result && (
                <Card className="shadow-lg border-primary/20 animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <CardHeader className="bg-primary/5">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          Attendance Analysis Report
                          <Sparkles className="h-4 w-4 text-primary" />
                        </CardTitle>
                        <CardDescription>Generated for {formData.userGroup} from {formData.startDate} to {formData.endDate}</CardDescription>
                      </div>
                      <Button variant="outline" size="sm">Export PDF</Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-6">
                    <section className="space-y-3">
                      <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Summary</h4>
                      <div className="p-4 rounded-lg bg-muted/30 border text-sm leading-relaxed whitespace-pre-wrap">
                        {result.reportSummary}
                      </div>
                    </section>
                    
                    <Separator />

                    <section className="space-y-3">
                      <h4 className="text-sm font-bold uppercase tracking-wider text-destructive">Anomalies & Trends</h4>
                      <div className="p-4 rounded-lg bg-destructive/5 border border-destructive/10 text-sm leading-relaxed whitespace-pre-wrap">
                        {result.anomalies}
                      </div>
                    </section>
                  </CardContent>
                  <CardFooter className="bg-muted/10 justify-between py-3">
                    <p className="text-[10px] text-muted-foreground italic">AI-generated content. Please verify critical data points manually.</p>
                    <p className="text-[10px] text-muted-foreground">{new Date().toLocaleString()}</p>
                  </CardFooter>
                </Card>
              )}
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
