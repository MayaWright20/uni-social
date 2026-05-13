import StyledButton from "@/components/button";
import TextInputC from "@/components/text-input";
import { COLORS } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const palettes = [
  { name: "Lemon", color: COLORS.YELLOW[2] },
  { name: "Mint", color: COLORS.TEAL[0] },
  { name: "Bubble", color: COLORS.PINK[0] },
  { name: "Lime", color: COLORS.LIME[0] },
];

export default function CreateGroup() {
  const [name, setName] = useState("Breakfast Debate Club");
  const [tagline, setTagline] = useState("Big opinions before 10 AM.");
  const [channel, setChannel] = useState("General");
  const [palette, setPalette] = useState(palettes[0]);

  const completion = useMemo(() => {
    return [name, tagline, channel].filter(Boolean).length;
  }, [channel, name, tagline]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ title: "Create group" }} />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.topBar}>
          <Link href="/" asChild>
            <Pressable accessibilityRole="button" style={styles.iconButton}>
              <Ionicons name="close" size={24} color={COLORS.BLACK[3]} />
            </Pressable>
          </Link>
          <Text style={styles.screenTitle}>Start a society</Text>
        </View>

        <View style={[styles.preview, { backgroundColor: palette.color }]}>
          <Text style={styles.previewKicker}>{completion}/3 ready</Text>
          <Text style={styles.previewTitle}>{name || "Your group name"}</Text>
          <Text style={styles.previewCopy}>
            {tagline || "Add a tiny manifesto for curious students."}
          </Text>
          <View style={styles.previewPill}>
            <Ionicons name="chatbubbles" size={16} color={COLORS.BLACK[3]} />
            <Text style={styles.previewPillText}>{channel || "First channel"}</Text>
          </View>
        </View>

        <View style={styles.form}>
          <LabeledInput
            label="Group name"
            value={name}
            onChangeText={setName}
            placeholder="Name your society"
          />
          <LabeledInput
            label="Tagline"
            value={tagline}
            onChangeText={setTagline}
            placeholder="Say why it should exist"
          />
          <LabeledInput
            label="First channel"
            value={channel}
            onChangeText={setChannel}
            placeholder="General, Events, Help desk"
          />

          <View>
            <Text style={styles.label}>Card colour</Text>
            <View style={styles.paletteRow}>
              {palettes.map((item) => {
                const active = item.name === palette.name;

                return (
                  <Pressable
                    accessibilityRole="button"
                    accessibilityState={{ selected: active }}
                    key={item.name}
                    onPress={() => setPalette(item)}
                    style={[
                      styles.swatch,
                      { backgroundColor: item.color },
                      active && styles.swatchActive,
                    ]}
                  >
                    {active && (
                      <Ionicons name="checkmark" size={20} color={COLORS.BLACK[3]} />
                    )}
                  </Pressable>
                );
              })}
            </View>
          </View>
        </View>

        <StyledButton
          title="Save mock group"
          backgroundColor={COLORS.BLACK[3]}
          onPress={() => undefined}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

function LabeledInput({
  label,
  value,
  onChangeText,
  placeholder,
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInputC
        accessibilityLabel={label}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
      />
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
  topBar: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
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
  screenTitle: {
    color: COLORS.BLACK[3],
    fontSize: 28,
    fontWeight: "900",
  },
  preview: {
    borderColor: COLORS.BLACK[3],
    borderRadius: 8,
    borderWidth: 3,
    gap: 10,
    padding: 18,
  },
  previewKicker: {
    color: COLORS.BLACK[2],
    fontSize: 13,
    fontWeight: "900",
    textTransform: "uppercase",
  },
  previewTitle: {
    color: COLORS.BLACK[3],
    fontSize: 30,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 34,
  },
  previewCopy: {
    color: COLORS.BLACK[2],
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 22,
  },
  previewPill: {
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: COLORS.WHITE[0],
    borderColor: COLORS.BLACK[3],
    borderRadius: 8,
    borderWidth: 2,
    flexDirection: "row",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  previewPillText: {
    color: COLORS.BLACK[3],
    fontWeight: "900",
  },
  form: {
    gap: 14,
  },
  field: {
    gap: 6,
  },
  label: {
    color: COLORS.BLACK[3],
    fontSize: 14,
    fontWeight: "900",
  },
  paletteRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 8,
  },
  swatch: {
    alignItems: "center",
    borderColor: COLORS.BLACK[3],
    borderRadius: 8,
    borderWidth: 2,
    height: 48,
    justifyContent: "center",
    width: 48,
  },
  swatchActive: {
    transform: [{ rotate: "-4deg" }, { scale: 1.04 }],
  },
});
