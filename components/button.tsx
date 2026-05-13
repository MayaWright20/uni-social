import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
  ViewStyle,
} from "react-native";

interface Props {
  title: string;
  onPress?: ((event: GestureResponderEvent) => void) | null;
  backgroundColor?: string;
  color?: string;
  style?: ViewStyle;
}

export default function StyledButton({
  title,
  onPress,
  backgroundColor = "#0D0B2D",
  color = "#FFFFFF",
  style,
}: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.container,
        { backgroundColor },
        pressed && styles.pressed,
        style,
      ]}
      onPress={onPress}
    >
      <Text style={[styles.title, { color }]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    borderRadius: 8,
    justifyContent: "center",
    minHeight: 48,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  pressed: {
    opacity: 0.75,
    transform: [{ scale: 0.98 }],
  },
  title: {
    fontSize: 15,
    fontWeight: "800",
  },
});
