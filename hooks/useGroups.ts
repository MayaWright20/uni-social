import { campusGroups } from "@/constants/mock-data";
import { currentStudent } from "@/constants/student-profile";
import { useMemo, useState } from "react";

export default function useGroups(query: string) {
  const [joinedGroups, setJoinedGroups] = useState<string[]>(
    currentStudent.joinedGroupIds,
  );

  const filteredGroups = useMemo(() => {
    const searchTerm = query.trim().toLowerCase();

    if (!searchTerm) {
      return campusGroups;
    }

    return campusGroups.filter((group) => {
      const searchableText = [
        group.name,
        group.tagline,
        group.vibe,
        ...group.channels,
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(searchTerm);
    });
  }, [query]);

  const toggleJoin = (groupId: string) => {
    setJoinedGroups((current) =>
      current.includes(groupId)
        ? current.filter((id) => id !== groupId)
        : [...current, groupId],
    );
  };

  const joinedCount = joinedGroups.length;
  const unreadCount = campusGroups
    .filter((group) => joinedGroups.includes(group.id))
    .reduce((total, group) => total + group.unread, 0);

  return { joinedGroups, toggleJoin, filteredGroups, joinedCount, unreadCount };
}
