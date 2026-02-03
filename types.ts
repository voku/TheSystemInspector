export enum SectionType {
  INTRO = 'INTRO',
  CASE_STUDY = 'CASE_STUDY',
  SHIFT = 'SHIFT',
  GAP = 'GAP',
  ROLE = 'ROLE',
  REGULATION = 'REGULATION',
  BLIND_SPOTS = 'BLIND_SPOTS',
  CONCLUSION = 'CONCLUSION'
}

export interface CodeSnippet {
  id: string;
  filename: string;
  code: string;
  highlightLines?: number[];
  description: string;
  isBad: boolean;
}

export interface InspectionStep {
  id: string;
  label: string;
  completed: boolean;
}