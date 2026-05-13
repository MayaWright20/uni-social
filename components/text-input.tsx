import { COLORS } from "@/constants/colors";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

interface Props extends TextInputProps {
  placeholder?: string;
  value?: string;
  onChangeText: (input: string) => void;
}

export default function TextInputC({
  placeholder,
  value,
  onChangeText,
  style,
  ...props
}: Props) {
  return (
    <TextInput
      placeholder={placeholder}
      placeholderTextColor={COLORS.BLACK[1]}
      value={value}
      onChangeText={onChangeText}
      style={[styles.textInput, style]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: COLORS.WHITE[0],
    borderColor: COLORS.BLACK[3],
    borderRadius: 8,
    borderWidth: 2,
    color: COLORS.BLACK[3],
    fontSize: 16,
    fontWeight: "700",
    minHeight: 52,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
});
