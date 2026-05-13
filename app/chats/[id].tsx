import StyledButton from "@/components/button";
import TextInputC from "@/components/text-input";
import { COLORS } from "@/constants/colors";
import useChats from "@/hooks/useChats";
import { Ionicons } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DirectChatScreen() {
  const { chat, draft, setDraft, messages, sendMessage } = useChats();

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ title: chat.name }} />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Link href="/" asChild>
            <Pressable accessibilityRole="button" style={styles.iconButton}>
              <Ionicons name="arrow-back" size={22} color={COLORS.BLACK[3]} />
            </Pressable>
          </Link>
          <View style={[styles.avatar, { backgroundColor: chat.color }]}>
            <Text style={styles.avatarText}>{chat.name.charAt(0)}</Text>
          </View>
          <View style={styles.headerText}>
            <Text style={styles.name}>{chat.name}</Text>
            <Text style={styles.course}>
              {chat.course} - {chat.online ? "Online now" : "Back later"}
            </Text>
          </View>
        </View>

        <View style={styles.callout}>
          <Ionicons name="shield-checkmark" size={20} color={COLORS.BLACK[3]} />
          <Text style={styles.calloutText}>
            One-to-one chats are mocked locally here, ready for real chat
            presence and delivery states later.
          </Text>
        </View>

        <View style={styles.messages}>
          {" "}
          {messages.map((message) => {
            const mine = message.author === "You";
            return (
              <View
                key={message.id}
                style={[styles.bubble, mine && styles.mine]}
              >
                <Text style={styles.messageFrom}>{message.author}</Text>
                <Text style={styles.messageText}>{message.text}</Text>
                {mine && (
                  <Ionicons
                    name={
                      message.status.type === "sending"
                        ? "time-outline"
                        : message.status.type === "sent"
                          ? "checkmark-outline"
                          : message.status.type === "read"
                            ? "checkmark-done-outline"
                            : "alert-circle-outline"
                    }
                    size={14}
                    color={COLORS.BLACK[2]}
                    style={{ marginTop: 4, alignSelf: "flex-end" }}
                  />
                )}
              </View>
            );
          })}{" "}
        </View>

        <View style={styles.composer}>
          <TextInputC
            accessibilityLabel={`Message ${chat.name}`}
            placeholder="Type a reply"
            value={draft}
            onChangeText={setDraft}
            style={styles.input}
          />
          <StyledButton title="Send" onPress={sendMessage} />
        </View>
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
    gap: 16,
    padding: 18,
    paddingBottom: 36,
  },
  header: {
    alignItems: "center",
    backgroundColor: COLORS.WHITE[0],
    borderColor: COLORS.BLACK[3],
    borderRadius: 8,
    borderWidth: 3,
    flexDirection: "row",
    gap: 12,
    padding: 14,
  },
  iconButton: {
    alignItems: "center",
    backgroundColor: COLORS.GREEN[0],
    borderColor: COLORS.BLACK[3],
    borderRadius: 8,
    borderWidth: 2,
    height: 42,
    justifyContent: "center",
    width: 42,
  },
  avatar: {
    alignItems: "center",
    borderColor: COLORS.BLACK[3],
    borderRadius: 8,
    borderWidth: 2,
    height: 54,
    justifyContent: "center",
    width: 54,
  },
  avatarText: {
    color: COLORS.BLACK[3],
    fontSize: 24,
    fontWeight: "900",
  },
  headerText: {
    flex: 1,
  },
  name: {
    color: COLORS.BLACK[3],
    fontSize: 22,
    fontWeight: "900",
  },
  course: {
    color: COLORS.BLACK[2],
    fontSize: 13,
    fontWeight: "800",
  },
  callout: {
    alignItems: "center",
    backgroundColor: COLORS.BLUE[0],
    borderColor: COLORS.BLACK[3],
    borderRadius: 8,
    borderWidth: 2,
    flexDirection: "row",
    gap: 8,
    padding: 12,
  },
  calloutText: {
    color: COLORS.BLACK[3],
    flex: 1,
    fontSize: 14,
    fontWeight: "800",
    lineHeight: 20,
  },
  messages: {
    gap: 10,
  },
  bubble: {
    alignSelf: "flex-start",
    backgroundColor: COLORS.WHITE[0],
    borderColor: COLORS.BLACK[3],
    borderRadius: 8,
    borderWidth: 2,
    maxWidth: "86%",
    padding: 12,
  },
  mine: {
    alignSelf: "flex-end",
    backgroundColor: COLORS.PINK[0],
  },
  messageFrom: {
    color: COLORS.PURPLE[3],
    fontSize: 12,
    fontWeight: "900",
  },
  messageText: {
    color: COLORS.BLACK[3],
    fontSize: 15,
    fontWeight: "700",
    lineHeight: 21,
    marginTop: 3,
  },
  composer: {
    flexDirection: "row",
    gap: 8,
  },
  input: {
    flex: 1,
  },
});
