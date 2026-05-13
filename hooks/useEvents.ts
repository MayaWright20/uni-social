import { currentStudent } from "@/constants/student-profile";
import { useState } from "react";

export default function useEvents() {
  const [savedEvents, setSavedEvents] = useState<string[]>(
    currentStudent.savedEventIds,
  );

  const toggleEvent = (eventId: string) => {
    setSavedEvents((current) =>
      current.includes(eventId)
        ? current.filter((id) => id !== eventId)
        : [...current, eventId],
    );
  };

  return { savedEvents, toggleEvent };
}
