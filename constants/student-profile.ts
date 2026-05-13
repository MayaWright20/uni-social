export type StudentProfile = {
  id: string;
  name: string;
  course: string;
  year: number;
  interests: string[];
  joinedGroupIds: string[];
  savedEventIds: string[];
};

export const currentStudent: StudentProfile = {
  id: "current-user",
  name: "Maya",
  course: "Computer Science",
  year: 2,
  interests: ["coding", "film", "climbing"],
  joinedGroupIds: ["film", "code"],
  savedEventIds: ["e1"],
};
