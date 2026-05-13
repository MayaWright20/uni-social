import { COLORS } from "@/constants/colors";

export type CampusGroup = {
  id: string;
  name: string;
  tagline: string;
  vibe: string;
  members: number;
  unread: number;
  channels: string[];
  color: string;
  accent: string;
  nextEvent: string;
};

export type CampusEvent = {
  id: string;
  title: string;
  groupId: string;
  groupName: string;
  date: string;
  location: string;
  going: number;
  color: string;
};

export type DirectChat = {
  id: string;
  name: string;
  course: string;
  lastMessage: string;
  online: boolean;
  color: string;
};

export const campusGroups: CampusGroup[] = [
  {
    id: "film",
    name: "Midnight Film Club",
    tagline: "Odd cinema, tiny reviews, giant popcorn opinions.",
    vibe: "Cosy chaos",
    members: 128,
    unread: 14,
    channels: ["Screenings", "Hot takes", "Find a seat"],
    color: COLORS.YELLOW[2],
    accent: COLORS.PURPLE[3],
    nextEvent: "Cult classics at 8 PM",
  },
  {
    id: "climb",
    name: "Campus Climbers",
    tagline: "Bouldering pals for every skill level.",
    vibe: "High energy",
    members: 86,
    unread: 3,
    channels: ["Meetups", "Gear swap", "Beginner buddies"],
    color: COLORS.TEAL[0],
    accent: COLORS.BLUE[2],
    nextEvent: "Wall session tomorrow",
  },
  {
    id: "code",
    name: "Snack Overflow",
    tagline: "Code nights with biscuits and very loud debugging.",
    vibe: "Brainy",
    members: 214,
    unread: 27,
    channels: ["Build night", "Help desk", "Hackathon"],
    color: COLORS.PINK[0],
    accent: COLORS.BLACK[3],
    nextEvent: "Prototype sprint Friday",
  },
  {
    id: "garden",
    name: "Tiny Garden Society",
    tagline: "Plant swaps, balcony basil, campus compost wins.",
    vibe: "Gentle",
    members: 52,
    unread: 0,
    channels: ["Plant clinic", "Swaps", "Events"],
    color: COLORS.LIME[0],
    accent: COLORS.GREEN[1],
    nextEvent: "Seedling swap at noon",
  },
];

export const campusEvents: CampusEvent[] = [
  {
    id: "e1",
    title: "Society Mixer Trail",
    groupId: "code",
    groupName: "Snack Overflow",
    date: "Today, 18:30",
    location: "Students Union",
    going: 48,
    color: COLORS.PINK[0],
  },
  {
    id: "e2",
    title: "Low-Stakes Climb Night",
    groupId: "climb",
    groupName: "Campus Climbers",
    date: "Wed, 19:00",
    location: "Sports Hall",
    going: 22,
    color: COLORS.TEAL[0],
  },
  {
    id: "e3",
    title: "Outdoor Film Picnic",
    groupId: "film",
    groupName: "Midnight Film Club",
    date: "Fri, 20:00",
    location: "Main Quad",
    going: 73,
    color: COLORS.YELLOW[2],
  },
];

export const directChats: DirectChat[] = [
  {
    id: "maya",
    name: "Maya",
    course: "Computer Science",
    lastMessage: "Want to pair on the app prototype later?",
    online: true,
    color: COLORS.YELLOW[2],
  },
  {
    id: "sam",
    name: "Sam",
    course: "Film Studies",
    lastMessage: "I found a room for the screening.",
    online: false,
    color: COLORS.BLUE[0],
  },
  {
    id: "nina",
    name: "Nina",
    course: "Design",
    lastMessage: "The society poster is almost too silly. Perfect.",
    online: true,
    color: COLORS.PINK[0],
  },
];
