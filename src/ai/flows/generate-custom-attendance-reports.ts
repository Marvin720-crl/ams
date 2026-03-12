// This file is used to generate custom attendance reports, analyze attendance patterns, and identify anomalies or trends.

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AttendanceReportCriteriaSchema = z.object({
  startDate: z.string().describe('The start date for the attendance report (YYYY-MM-DD).'),
  endDate: z.string().describe('The end date for the attendance report (YYYY-MM-DD).'),
  userGroup: z.string().describe('The user group for the attendance report (e.g., all students, teachers, specific class).'),
});
export type AttendanceReportCriteria = z.infer<typeof AttendanceReportCriteriaSchema>;

const AttendanceReportOutputSchema = z.object({
  reportSummary: z.string().describe('A summary of the attendance report, including key statistics.'),
  anomalies: z.string().describe('A description of any attendance anomalies or trends identified in the report.'),
});
export type AttendanceReportOutput = z.infer<typeof AttendanceReportOutputSchema>;

export async function generateCustomAttendanceReport(criteria: AttendanceReportCriteria): Promise<AttendanceReportOutput> {
  return generateCustomAttendanceReportFlow(criteria);
}

const generateCustomAttendanceReportPrompt = ai.definePrompt({
  name: 'generateCustomAttendanceReportPrompt',
  input: {schema: AttendanceReportCriteriaSchema},
  output: {schema: AttendanceReportOutputSchema},
  prompt: `You are an AI assistant that generates custom attendance reports based on specified criteria.

  Analyze the attendance data based on the following criteria:
  - Start Date: {{{startDate}}}
  - End Date: {{{endDate}}}
  - User Group: {{{userGroup}}}

  Identify any anomalies or trends in the attendance data, such as statistically significant absences or patterns of tardiness. Summarize the findings in a concise report.

  Report Summary:
  Anomalies:
  `,
});

const generateCustomAttendanceReportFlow = ai.defineFlow(
  {
    name: 'generateCustomAttendanceReportFlow',
    inputSchema: AttendanceReportCriteriaSchema,
    outputSchema: AttendanceReportOutputSchema,
  },
  async input => {
    const {output} = await generateCustomAttendanceReportPrompt(input);
    return output!;
  }
);
