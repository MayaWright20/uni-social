import StyledButton from "@/components/button";
import TextInputC from "@/components/text-input";
import { COLORS } from "@/constants/colors";
import { campusEvents, campusGroups, directChats } from "@/constants/mock-data";
import { currentStudent } from "@/constants/student-profile";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Tab = "groups" | "chats" | "events";

export default function Index() {
  const [activeTab, setActiveTab] = useState<Tab>("groups");
  const [query, setQuery] = useState("");
  const [joinedGroups, setJoinedGroups] = useState<string[]>(
    currentStudent.joinedGroupIds,
  );
  const [savedEvents, setSavedEvents] = useState<string[]>(
    currentStudent.savedEventIds,
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

  const joinedCount = joinedGroups.length;
  const unreadCount = campusGroups
    .filter((group) => joinedGroups.includes(group.id))
    .reduce((total, group) => total + group.unread, 0);

  const toggleJoin = (groupId: string) => {
    setJoinedGroups((current) =>
      current.includes(groupId)
        ? current.filter((id) => id !== groupId)
        : [...current, groupId],
    );
  };

  const toggleEvent = (eventId: string) => {
    setSavedEvents((current) =>
      current.includes(eventId)
        ? current.filter((id) => id !== eventId)
        : [...current, eventId],
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.hero}>
          <View style={styles.heroTop}>
            <View>
              <Text style={styles.eyebrow}>Uni Social</Text>
              <Text style={styles.eyebrow}>
                Welcome back, {currentStudent.name}
              </Text>
              <Text style={styles.title}>
                Find your people between lectures.
              </Text>
            </View>
            <Link href="/assistant" asChild>
              <Pressable
                accessibilityRole="button"
                style={styles.assistantButton}
              >
                <Ionicons name="sparkles" size={22} color={COLORS.BLACK[3]} />
              </Pressable>
            </Link>
          </View>

          <Text style={styles.heroCopy}>
            Discover societies, jump into group chats, plan events, and keep
            one-to-one conversations close.
          </Text>

          <View style={styles.statsRow}>
            <StatTile label="Joined" value={joinedCount.toString()} />
            <StatTile label="Unread" value={unreadCount.toString()} />
            <StatTile label="Events" value={savedEvents.length.toString()} />
          </View>

          <View style={styles.heroActions}>
            <Link href="/create/group" asChild>
              <StyledButton
                title="Create group"
                backgroundColor={COLORS.BLACK[3]}
              />
            </Link>
            <Link href="/events" asChild>
              <StyledButton
                title="Plan event"
                backgroundColor={COLORS.YELLOW[2]}
                color={COLORS.BLACK[3]}
              />
            </Link>
          </View>
        </View>

        <View style={styles.searchRow}>
          <Ionicons name="search" size={20} color={COLORS.BLACK[2]} />
          <TextInputC
            accessibilityLabel="Search groups"
            placeholder="Search clubs, chats, meetups"
            value={query}
            onChangeText={setQuery}
            style={styles.searchInput}
          />
        </View>

        <View style={styles.tabs} accessibilityRole="tablist">
          <TabButton
            label="Groups"
            icon="people"
            active={activeTab === "groups"}
            onPress={() => setActiveTab("groups")}
          />
          <TabButton
            label="Chats"
            icon="chatbubbles"
            active={activeTab === "chats"}
            onPress={() => setActiveTab("chats")}
          />
          <TabButton
            label="Events"
            icon="calendar"
            active={activeTab === "events"}
            onPress={() => setActiveTab("events")}
          />
        </View>

        {activeTab === "groups" && (
          <View style={styles.section}>
            {filteredGroups.map((group) => {
              const joined = joinedGroups.includes(group.id);

              return (
                <View
                  key={group.id}
                  style={[styles.groupCard, { backgroundColor: group.color }]}
                >
                  <View style={styles.groupHeader}>
                    <View
                      style={[styles.blob, { backgroundColor: group.accent }]}
                    >
                      <Text style={styles.blobText}>
                        {group.name.slice(0, 2)}
                      </Text>
                    </View>
                    <Pressable
                      accessibilityRole="button"
                      accessibilityLabel={`${joined ? "Leave" : "Join"} ${group.name}`}
                      onPress={() => toggleJoin(group.id)}
                      style={[
                        styles.joinPill,
                        joined && { backgroundColor: COLORS.WHITE[0] },
                      ]}
                    >
                      <Text style={styles.joinText}>
                        {joined ? "Joined" : "Join"}
                      </Text>
                    </Pressable>
                  </View>

                  <Link href={`/groups/${group.id}`} asChild>
                    <Pressable>
                      <Text style={styles.cardTitle}>{group.name}</Text>
                      <Text style={styles.cardCopy}>{group.tagline}</Text>
                    </Pressable>
                  </Link>

                  <View style={styles.metaRow}>
                    <Meta icon="radio" text={group.vibe} />
                    <Meta icon="people" text={`${group.members} members`} />
                    <Meta icon="chatbubble" text={`${group.unread} new`} />
                  </View>
                </View>
              );
            })}
          </View>
        )}

        {activeTab === "chats" && (
          <View style={styles.section}>
            {directChats.map((chat) => (
              <Link key={chat.id} href={`/chats/${chat.id}`} asChild>
                <Pressable style={styles.chatRow}>
                  <View
                    style={[styles.avatar, { backgroundColor: chat.color }]}
                  >
                    <Text style={styles.avatarText}>{chat.name.charAt(0)}</Text>
                  </View>
                  <View style={styles.chatText}>
                    <Text style={styles.rowTitle}>{chat.name}</Text>
                    <Text style={styles.rowCopy}>{chat.lastMessage}</Text>
                  </View>
                  <View
                    style={[
                      styles.statusDot,
                      {
                        backgroundColor: chat.online
                          ? COLORS.GREEN[1]
                          : COLORS.BLACK[0],
                      },
                    ]}
                  />
                </Pressable>
              </Link>
            ))}
          </View>
        )}

        {activeTab === "events" && (
          <View style={styles.section}>
            {campusEvents.map((event) => {
              const saved = savedEvents.includes(event.id);

              return (
                <View key={event.id} style={styles.eventCard}>
                  <View
                    style={[
                      styles.eventStripe,
                      { backgroundColor: event.color },
                    ]}
                  />
                  <View style={styles.eventBody}>
                    <Text style={styles.rowTitle}>{event.title}</Text>
                    <Text style={styles.rowCopy}>
                      {event.date} at {event.location}
                    </Text>
                    <Text style={styles.eventMeta}>
                      {event.groupName} - {event.going} going
                    </Text>
                  </View>
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={`${saved ? "Remove RSVP for" : "RSVP to"} ${event.title}`}
                    onPress={() => toggleEvent(event.id)}
                    style={[
                      styles.rsvpButton,
                      saved && { backgroundColor: COLORS.BLACK[3] },
                    ]}
                  >
                    <Ionicons
                      name={saved ? "checkmark" : "add"}
                      size={20}
                      color={saved ? COLORS.WHITE[0] : COLORS.BLACK[3]}
                    />
                  </Pressable>
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function StatTile({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.statTile}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function TabButton({
  label,
  icon,
  active,
  onPress,
}: {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="tab"
      accessibilityState={{ selected: active }}
      onPress={onPress}
      style={[styles.tab, active && styles.tabActive]}
    >
      <Ionicons
        name={icon}
        size={18}
        color={active ? COLORS.BLACK[3] : COLORS.BLACK[2]}
      />
      <Text style={[styles.tabText, active && styles.tabTextActive]}>
        {label}
      </Text>
    </Pressable>
  );
}

function Meta({
  icon,
  text,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  text: string;
}) {
  return (
    <View style={styles.meta}>
      <Ionicons name={icon} size={14} color={COLORS.BLACK[3]} />
      <Text style={styles.metaText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: COLORS.YELLOW[0],
    flex: 1,
  },
  container: {
    gap: 18,
    padding: 18,
    paddingBottom: 36,
  },
  hero: {
    backgroundColor: COLORS.PURPLE[0],
    borderColor: COLORS.BLACK[3],
    borderRadius: 8,
    borderWidth: 3,
    gap: 16,
    padding: 18,
  },
  heroTop: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: 12,
    justifyContent: "space-between",
  },
  eyebrow: {
    color: COLORS.PURPLE[3],
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 0,
    textTransform: "uppercase",
  },
  title: {
    color: COLORS.BLACK[3],
    fontSize: 35,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 38,
    maxWidth: 280,
  },
  assistantButton: {
    alignItems: "center",
    backgroundColor: COLORS.GREEN[0],
    borderColor: COLORS.BLACK[3],
    borderRadius: 8,
    borderWidth: 2,
    height: 48,
    justifyContent: "center",
    width: 48,
  },
  heroCopy: {
    color: COLORS.BLACK[2],
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 22,
  },
  statsRow: {
    flexDirection: "row",
    gap: 10,
  },
  statTile: {
    backgroundColor: COLORS.WHITE[0],
    borderColor: COLORS.BLACK[3],
    borderRadius: 8,
    borderWidth: 2,
    flex: 1,
    padding: 10,
  },
  statValue: {
    color: COLORS.BLACK[3],
    fontSize: 22,
    fontWeight: "900",
  },
  statLabel: {
    color: COLORS.BLACK[2],
    fontSize: 12,
    fontWeight: "800",
  },
  heroActions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  searchRow: {
    alignItems: "center",
    backgroundColor: COLORS.WHITE[0],
    borderColor: COLORS.BLACK[3],
    borderRadius: 8,
    borderWidth: 2,
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 12,
  },
  searchInput: {
    borderWidth: 0,
    flex: 1,
    minHeight: 48,
    paddingHorizontal: 0,
  },
  tabs: {
    backgroundColor: COLORS.WHITE[0],
    borderColor: COLORS.BLACK[3],
    borderRadius: 8,
    borderWidth: 2,
    flexDirection: "row",
    padding: 4,
  },
  tab: {
    alignItems: "center",
    borderRadius: 6,
    flex: 1,
    flexDirection: "row",
    gap: 6,
    justifyContent: "center",
    minHeight: 42,
  },
  tabActive: {
    backgroundColor: COLORS.ORANGE[0],
  },
  tabText: {
    color: COLORS.BLACK[2],
    fontSize: 13,
    fontWeight: "900",
  },
  tabTextActive: {
    color: COLORS.BLACK[3],
  },
  section: {
    gap: 14,
  },
  groupCard: {
    borderColor: COLORS.BLACK[3],
    borderRadius: 8,
    borderWidth: 3,
    gap: 12,
    padding: 16,
  },
  groupHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  blob: {
    alignItems: "center",
    borderColor: COLORS.BLACK[3],
    borderRadius: 8,
    borderWidth: 2,
    height: 50,
    justifyContent: "center",
    transform: [{ rotate: "-3deg" }],
    width: 58,
  },
  blobText: {
    color: COLORS.WHITE[0],
    fontSize: 17,
    fontWeight: "900",
    textTransform: "uppercase",
  },
  joinPill: {
    backgroundColor: COLORS.GREEN[0],
    borderColor: COLORS.BLACK[3],
    borderRadius: 8,
    borderWidth: 2,
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  joinText: {
    color: COLORS.BLACK[3],
    fontSize: 13,
    fontWeight: "900",
  },
  cardTitle: {
    color: COLORS.BLACK[3],
    fontSize: 24,
    fontWeight: "900",
    letterSpacing: 0,
  },
  cardCopy: {
    color: COLORS.BLACK[2],
    fontSize: 15,
    fontWeight: "700",
    lineHeight: 21,
    marginTop: 4,
  },
  metaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  meta: {
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.7)",
    borderRadius: 6,
    flexDirection: "row",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  metaText: {
    color: COLORS.BLACK[3],
    fontSize: 12,
    fontWeight: "800",
  },
  chatRow: {
    alignItems: "center",
    backgroundColor: COLORS.WHITE[0],
    borderColor: COLORS.BLACK[3],
    borderRadius: 8,
    borderWidth: 2,
    flexDirection: "row",
    gap: 12,
    padding: 14,
  },
  avatar: {
    alignItems: "center",
    borderColor: COLORS.BLACK[3],
    borderRadius: 8,
    borderWidth: 2,
    height: 50,
    justifyContent: "center",
    width: 50,
  },
  avatarText: {
    color: COLORS.BLACK[3],
    fontSize: 22,
    fontWeight: "900",
  },
  chatText: {
    flex: 1,
  },
  rowTitle: {
    color: COLORS.BLACK[3],
    fontSize: 17,
    fontWeight: "900",
  },
  rowCopy: {
    color: COLORS.BLACK[2],
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 20,
    marginTop: 2,
  },
  statusDot: {
    borderColor: COLORS.BLACK[3],
    borderRadius: 99,
    borderWidth: 2,
    height: 14,
    width: 14,
  },
  eventCard: {
    alignItems: "stretch",
    backgroundColor: COLORS.WHITE[0],
    borderColor: COLORS.BLACK[3],
    borderRadius: 8,
    borderWidth: 2,
    flexDirection: "row",
    overflow: "hidden",
  },
  eventStripe: {
    width: 12,
  },
  eventBody: {
    flex: 1,
    padding: 14,
  },
  eventMeta: {
    color: COLORS.PURPLE[3],
    fontSize: 12,
    fontWeight: "900",
    marginTop: 7,
  },
  rsvpButton: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: COLORS.GREEN[0],
    borderColor: COLORS.BLACK[3],
    borderRadius: 8,
    borderWidth: 2,
    height: 42,
    justifyContent: "center",
    marginRight: 12,
    width: 42,
  },
});
