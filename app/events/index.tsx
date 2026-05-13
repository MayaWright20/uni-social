import { COLORS } from "@/constants/colors";
import { campusEvents } from "@/constants/mock-data";
import { Ionicons } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EventsScreen() {
  const [rsvps, setRsvps] = useState<string[]>(["e1"]);

  const toggleRsvp = (eventId: string) => {
    setRsvps((current) =>
      current.includes(eventId)
        ? current.filter((id) => id !== eventId)
        : [...current, eventId],
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ title: "Events" }} />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Link href="/" asChild>
            <Pressable accessibilityRole="button" style={styles.iconButton}>
              <Ionicons name="arrow-back" size={22} color={COLORS.BLACK[3]} />
            </Pressable>
          </Link>
          <View>
            <Text style={styles.kicker}>Events board</Text>
            <Text style={styles.title}>Turn group chat into plans.</Text>
          </View>
        </View>

        {campusEvents.map((event) => {
          const active = rsvps.includes(event.id);

          return (
            <View key={event.id} style={styles.eventCard}>
              <View
                style={[styles.dateBlock, { backgroundColor: event.color }]}
              >
                <Ionicons name="calendar" size={24} color={COLORS.BLACK[3]} />
              </View>
              <View style={styles.eventText}>
                <Text style={styles.eventTitle}>{event.title}</Text>
                <Text style={styles.eventMeta}>{event.groupName}</Text>
                <Text style={styles.eventCopy}>
                  {event.date} - {event.location} -{" "}
                  {event.going + Number(active)} going
                </Text>
              </View>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`${active ? "Cancel RSVP for" : "RSVP to"} ${event.title}`}
                onPress={() => toggleRsvp(event.id)}
                style={[styles.rsvp, active && styles.rsvpActive]}
              >
                <Ionicons
                  name={active ? "checkmark" : "add"}
                  size={20}
                  color={active ? COLORS.WHITE[0] : COLORS.BLACK[3]}
                />
              </Pressable>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: COLORS.YELLOW[0],
    flex: 1,
  },
  container: {
    gap: 14,
    padding: 18,
    paddingBottom: 36,
  },
  header: {
    alignItems: "center",
    backgroundColor: COLORS.PURPLE[0],
    borderColor: COLORS.BLACK[3],
    borderRadius: 8,
    borderWidth: 3,
    flexDirection: "row",
    gap: 12,
    padding: 16,
  },
  iconButton: {
    alignItems: "center",
    backgroundColor: COLORS.WHITE[0],
    borderColor: COLORS.BLACK[3],
    borderRadius: 8,
    borderWidth: 2,
    height: 44,
    justifyContent: "center",
    width: 44,
  },
  kicker: {
    color: COLORS.PURPLE[3],
    fontSize: 13,
    fontWeight: "900",
    textTransform: "uppercase",
  },
  title: {
    color: COLORS.BLACK[3],
    flexShrink: 1,
    fontSize: 25,
    fontWeight: "900",
    lineHeight: 29,
  },
  eventCard: {
    alignItems: "center",
    backgroundColor: COLORS.WHITE[0],
    borderColor: COLORS.BLACK[3],
    borderRadius: 8,
    borderWidth: 2,
    flexDirection: "row",
    gap: 12,
    padding: 12,
  },
  dateBlock: {
    alignItems: "center",
    borderColor: COLORS.BLACK[3],
    borderRadius: 8,
    borderWidth: 2,
    height: 58,
    justifyContent: "center",
    width: 58,
  },
  eventText: {
    flex: 1,
  },
  eventTitle: {
    color: COLORS.BLACK[3],
    fontSize: 17,
    fontWeight: "900",
  },
  eventMeta: {
    color: COLORS.PURPLE[3],
    fontSize: 13,
    fontWeight: "900",
    marginTop: 2,
  },
  eventCopy: {
    color: COLORS.BLACK[2],
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 18,
    marginTop: 3,
  },
  rsvp: {
    alignItems: "center",
    backgroundColor: COLORS.GREEN[0],
    borderColor: COLORS.BLACK[3],
    borderRadius: 8,
    borderWidth: 2,
    height: 42,
    justifyContent: "center",
    width: 42,
  },
  rsvpActive: {
    backgroundColor: COLORS.BLACK[3],
  },
});
