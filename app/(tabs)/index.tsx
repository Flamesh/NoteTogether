import SafeLayout from "@/components/layouts/safeLayout";
import { NoteItem } from "@/components/note/NoteItem";
import { selectUserNotes } from "@/store/note/selector";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "expo-router";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";

export default function HomeScreen() {
  const navigation = useNavigation();
  const userNotes = useSelector(selectUserNotes);

  return (
    <SafeLayout additionalPaddingTop={20}>
      <View style={{ flex: 1 }}>
        <FlatList
          data={userNotes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable onPress={() => console.log("Note pressed:", item)}>
              <NoteItem note={item} />
            </Pressable>
          )}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                No notes available. Press the + icon to create one.
              </Text>
            </View>
          )}
        />
        <View>
          <TouchableOpacity
            onPress={() => {
              // @ts-ignore
              navigation.navigate("create");
            }}
            style={styles.addIconContainer}
          >
            <MaterialCommunityIcons
              name="plus-circle"
              size={60}
              color="#007AFF"
            />
          </TouchableOpacity>
        </View>
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
    fontSize: 20,
    textAlign: "center",
    color: "#999",
  },
  addIconContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
    elevation: 5, // For Android shadow
    shadowColor: "#000", // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    backgroundColor: "#fff",
    borderRadius: 30,
  },
});
