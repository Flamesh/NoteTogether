import SafeLayout from "@/components/layouts/safeLayout";
import { selectUserNotes } from "@/store/note/selector";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

export default function HomeScreen() {
  const userNotes = useSelector(selectUserNotes);
  console.log("User Notes:", userNotes);
  return (
    <SafeLayout additionalPaddingTop={20}>
      <View>
        <FlatList
          data={userNotes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable onPress={() => console.log("Note pressed:", item)}>
              <View style={{}}>
                <Text style={styles.noteItem}>{item.title}</Text>
                <Text style={styles.noteContent}>{item.content}</Text>
              </View>
            </Pressable>
          )}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                No notes available. Start creating your first note!
              </Text>
            </View>
          )}
        />
      </View>
    </SafeLayout>
  );
}

const styles = StyleSheet.create({
  noteItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  noteContent: {
    color: "#666",
  },
  emptyContainer: {
    padding: 20,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
  },
});
