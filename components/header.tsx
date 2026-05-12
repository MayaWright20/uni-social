import { COLORS } from "@/constants/colors";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <View style={styles.container}>
      <SafeAreaView edges={["top"]}>
        <Text style={styles.title}>{title}</Text>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.PURPLE[3],
    alignItems: "center",
    justifyContent: "center",
    minHeight: 15,
    paddingVertical: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
    color: COLORS.YELLOW[1],
  },
});
