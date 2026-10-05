export type SectionId = "work" | "experience" | "writing" | "contact";

export interface NavItem {
  label: string;
  id: SectionId;
}

export const homeSections: NavItem[] = [
  { label: "Work", id: "work" },
  { label: "Experience", id: "experience" },
  { label: "Writing", id: "writing" },
  { label: "Contact", id: "contact" },
];
