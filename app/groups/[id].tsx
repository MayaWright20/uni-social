import StyledButton from "@/components/button";
import TextInputC from "@/components/text-input";
import { COLORS } from "@/constants/colors";
import { campusGroups } from "@/constants/mock-data";
import { Ionicons } from "@expo/vector-icons";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const starterMessages = [
  { id: "1", author: "Ari", text: "Who is around for the next meetup?" },
  { id: "2", author: "Jo", text: "I can bring snacks and a questionable playlist." },
  { id: "3", author: "Priya", text: "Creating a poll once we pick two times." },
];

export default function GroupDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const group = campusGroups.find((item) => item.id === id) ?? campusGroups[0];
  const [selectedChannel, setSelectedChannel] = useState(group.channels[0]);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState(starterMessages);

  const channelCopy = useMemo(
    () =>
      selectedChannel === group.channels[0]
        ? group.nextEvent
        : "A quieter room for focused planning and friendly chaos control.",
    [group.channels, group.nextEvent, selectedChannel],
  );

  const sendMessage = () => {
    const trimmed = draft.trim();

    if (!trimmed) {
      return;
    }

    setMessages((current) => [
      ...current,
      { id: `${Date.now()}`, author: "You", text: trimmed },
    ]);
    setDraft("");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ title: group.name }} />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={[styles.hero, { backgroundColor: group.color }]}>
          <Link href="/" asChild>
            <Pressable accessibilityRole="button" style={styles.backButton}>
              <Ionicons name="arrow-back" size={22} color={COLORS.BLACK[3]} />
            </Pressable>
          </Link>
          <Text style={styles.kicker}>Group chat</Text>
          <Text style={styles.title}>{group.name}</Text>
          <Text style={styles.copy}>{group.tagline}</Text>
          <View style={styles.statsRow}>
            <MiniStat value={`${group.members}`} label="Members" />
            <MiniStat value={`${group.unread}`} label="Unread" />
            <MiniStat value={group.vibe} label="Vibe" />
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.channelRow}>
            {group.channels.map((channel) => {
              const active = selectedChannel === channel;

              return (
                <Pressable
                  accessibilityRole="button"
                  accessibilityState={{ selected: active }}
                  key={channel}
                  onPress={() => setSelectedChannel(channel)}
                  style={[styles.channel, active && styles.channelActive]}
                >
                  <Text style={[styles.channelText, active && styles.channelTextActive]}>
                    {channel}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </ScrollView>

        <View style={styles.notice}>
          <Ionicons name="flash" size={18} color={COLORS.BLACK[3]} />
          <Text style={styles.noticeText}>{channelCopy}</Text>
        </View>

        <View style={styles.messageList}>
          {messages.map((message) => {
            const mine = message.author === "You";

            return (
              <View
                key={message.id}
                style={[styles.message, mine && styles.myMessage]}
              >
                <Text style={styles.messageAuthor}>{message.author}</Text>
                <Text style={styles.messageText}>{message.text}</Text>
              </View>
            );
          })}
        </View>

        <View style={styles.composer}>
          <TextInputC
            accessibilityLabel="Write a group message"
            placeholder={`Message ${selectedChannel}`}
            value={draft}
            onChangeText={setDraft}
            style={styles.composerInput}
          />
          <StyledButton title="Send" onPress={sendMessage} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function MiniStat({ value, label }: { value: string; label: string }) {
  return (
    <View style={styles.miniStat}>
      <Text style={styles.miniValue}>{value}</Text>
      <Text style={styles.miniLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: COLORS.YELLOW[0],
    flex: 1,
  },
  container: {
    gap: 16,
    padding: 18,
    paddingBottom: 36,
  },
  hero: {
    borderColor: COLORS.BLACK[3],
    borderRadius: 8,
    borderWidth: 3,
    gap: 10,
    padding: 18,
  },
  backButton: {
    alignItems: "center",
    backgroundColor: COLORS.WHITE[0],
    borderColor: COLORS.BLACK[3],
    borderRadius: 8,
    borderWidth: 2,
    height: 42,
    justifyContent: "center",
    width: 42,
  },
  kicker: {
    color: COLORS.BLACK[2],
    fontSize: 13,
    fontWeight: "900",
    textTransform: "uppercase",
  },
  title: {
    color: COLORS.BLACK[3],
    fontSize: 32,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 36,
  },
  copy: {
    color: COLORS.BLACK[2],
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 22,
  },
  statsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  miniStat: {
    backgroundColor: "rgba(255,255,255,0.72)",
    borderColor: COLORS.BLACK[3],
    borderRadius: 8,
    borderWidth: 2,
    minWidth: 92,
    padding: 10,
  },
  miniValue: {
    color: COLORS.BLACK[3],
    fontSize: 16,
    fontWeight: "900",
  },
  miniLabel: {
    color: COLORS.BLACK[2],
    fontSize: 12,
    fontWeight: "800",
  },
  channelRow: {
    flexDirection: "row",
    gap: 8,
  },
  channel: {
    backgroundColor: COLORS.WHITE[0],
    borderColor: COLORS.BLACK[3],
    borderRadius: 8,
    borderWidth: 2,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  channelActive: {
    backgroundColor: COLORS.ORANGE[0],
  },
  channelText: {
    color: COLORS.BLACK[2],
    fontWeight: "900",
  },
  channelTextActive: {
    color: COLORS.BLACK[3],
  },
  notice: {
    alignItems: "center",
    backgroundColor: COLORS.GREEN[0],
    borderColor: COLORS.BLACK[3],
    borderRadius: 8,
    borderWidth: 2,
    flexDirection: "row",
    gap: 8,
    padding: 12,
  },
  noticeText: {
    color: COLORS.BLACK[3],
    flex: 1,
    fontSize: 14,
    fontWeight: "800",
    lineHeight: 20,
  },
  messageList: {
    gap: 10,
  },
  message: {
    alignSelf: "flex-start",
    backgroundColor: COLORS.WHITE[0],
    borderColor: COLORS.BLACK[3],
    borderRadius: 8,
    borderWidth: 2,
    maxWidth: "88%",
    padding: 12,
  },
  myMessage: {
    alignSelf: "flex-end",
    backgroundColor: COLORS.PURPLE[0],
  },
  messageAuthor: {
    color: COLORS.PURPLE[3],
    fontSize: 12,
    fontWeight: "900",
    marginBottom: 3,
  },
  messageText: {
    color: COLORS.BLACK[3],
    fontSize: 15,
    fontWeight: "700",
    lineHeight: 21,
  },
  composer: {
    flexDirection: "row",
    gap: 8,
  },
  composerInput: {
    flex: 1,
  },
});
