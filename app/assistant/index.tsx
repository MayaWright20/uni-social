import StyledButton from "@/components/button";
import TextInputC from "@/components/text-input";
import { COLORS } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const prompts = [
  "Find me a low-pressure society",
  "Draft an event idea",
  "Summarise unread chats",
];

export default function AssistantScreen() {
  const [selectedPrompt, setSelectedPrompt] = useState(prompts[0]);
  const [draft, setDraft] = useState("");
  const [notes, setNotes] = useState<string[]>([
    "Try Campus Climbers if you want an easy first meetup.",
  ]);

  const addNote = () => {
    const text = draft.trim() || selectedPrompt;
    setNotes((current) => [...current, `Mock assistant task queued: ${text}.`]);
    setDraft("");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ title: "Assistant" }} />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.hero}>
          <Link href="/" asChild>
            <Pressable accessibilityRole="button" style={styles.iconButton}>
              <Ionicons name="arrow-back" size={22} color={COLORS.BLACK[3]} />
            </Pressable>
          </Link>
          <Ionicons name="sparkles" size={34} color={COLORS.BLACK[3]} />
          <Text style={styles.title}>Campus assistant</Text>
          <Text style={styles.copy}>
            A frontend-only placeholder for smart chat summaries, event nudges,
            and discovery helpers.
          </Text>
        </View>

        <View style={styles.promptGrid}>
          {prompts.map((prompt) => {
            const active = selectedPrompt === prompt;

            return (
              <Pressable
                accessibilityRole="button"
                accessibilityState={{ selected: active }}
                key={prompt}
                onPress={() => setSelectedPrompt(prompt)}
                style={[styles.prompt, active && styles.promptActive]}
              >
                <Text style={styles.promptText}>{prompt}</Text>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.composer}>
          <TextInputC
            accessibilityLabel="Assistant prompt"
            placeholder="Ask for campus help"
            value={draft}
            onChangeText={setDraft}
          />
          <StyledButton
            title="Queue mock task"
            onPress={addNote}
            backgroundColor={COLORS.BLACK[3]}
          />
        </View>

        <View style={styles.notes}>
          {notes.map((note, index) => (
            <View key={`${note}-${index}`} style={styles.note}>
              <Ionicons name="bulb" size={18} color={COLORS.BLACK[3]} />
              <Text style={styles.noteText}>{note}</Text>
            </View>
          ))}
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
  hero: {
    backgroundColor: COLORS.GREEN[0],
    borderColor: COLORS.BLACK[3],
    borderRadius: 8,
    borderWidth: 3,
    gap: 10,
    padding: 18,
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
  title: {
    color: COLORS.BLACK[3],
    fontSize: 32,
    fontWeight: "900",
    lineHeight: 36,
  },
  copy: {
    color: COLORS.BLACK[2],
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 22,
  },
  promptGrid: {
    gap: 10,
  },
  prompt: {
    backgroundColor: COLORS.WHITE[0],
    borderColor: COLORS.BLACK[3],
    borderRadius: 8,
    borderWidth: 2,
    padding: 14,
  },
  promptActive: {
    backgroundColor: COLORS.ORANGE[0],
    transform: [{ rotate: "-1deg" }],
  },
  promptText: {
    color: COLORS.BLACK[3],
    fontSize: 15,
    fontWeight: "900",
  },
  composer: {
    gap: 10,
  },
  notes: {
    gap: 10,
  },
  note: {
    alignItems: "center",
    backgroundColor: COLORS.WHITE[0],
    borderColor: COLORS.BLACK[3],
    borderRadius: 8,
    borderWidth: 2,
    flexDirection: "row",
    gap: 8,
    padding: 12,
  },
  noteText: {
    color: COLORS.BLACK[3],
    flex: 1,
    fontSize: 14,
    fontWeight: "800",
    lineHeight: 20,
  },
});
