import SafeLayout from "@/components/layouts/safeLayout";
import { DraggableNoteItem } from "@/components/note/DraggableNoteItem";
import { selectUserNotes } from "@/store/note/selector";
import { updateSortedNotes } from "@/store/note/slice";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function HomeScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userNotes = useSelector(selectUserNotes);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (noteId: string) => {
    const index = userNotes.findIndex((note) => note.id === noteId);
    setDraggedIndex(index);
    setIsDragging(true);
  };

  const handleDragEnd = (fromIndex: number, toIndex: number) => {
    if (fromIndex !== toIndex && toIndex >= 0 && toIndex < userNotes.length) {
      const newNotes = [...userNotes];
      const [movedNote] = newNotes.splice(fromIndex, 1);
      newNotes.splice(toIndex, 0, movedNote);
      dispatch(updateSortedNotes(newNotes));
    }
    setDraggedIndex(null);
    setIsDragging(false);
  };

  return (
    <SafeLayout additionalPaddingTop={20}>
      <View style={{ flex: 1 }}>
        <FlatList
          data={userNotes}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <DraggableNoteItem
              note={item}
              index={index}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              isDragging={isDragging}
              draggedIndex={draggedIndex}
            />
          )}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                No notes available. Press the + icon to create one.
              </Text>
            </View>
          )}
          scrollEnabled={!isDragging}
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
    right: 0,
    elevation: 5, // For Android shadow
    shadowColor: "#000", // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    backgroundColor: "#fff",
    borderRadius: 30,
  },
});
