import { COLORS } from "@/constants/colors";
import { CampusGroup } from "@/constants/mock-data";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

type GroupCardProps = {
  group: CampusGroup;
  joined: boolean;
  onToggleJoin: (groupId: string) => void;
};

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

export default function GroupCard({
  group,
  joined,
  onToggleJoin,
}: GroupCardProps) {
  return (
    <View
      key={group.id}
      style={[styles.groupCard, { backgroundColor: group.color }]}
    >
      <View style={styles.groupHeader}>
        <View style={[styles.blob, { backgroundColor: group.accent }]}>
          <Text style={styles.blobText}>{group.name.slice(0, 2)}</Text>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`${joined ? "Leave" : "Join"} ${group.name}`}
          onPress={() => onToggleJoin(group.id)}
          style={[
            styles.joinPill,
            joined && { backgroundColor: COLORS.WHITE[0] },
          ]}
        >
          <Text style={styles.joinText}>{joined ? "Joined" : "Join"}</Text>
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
