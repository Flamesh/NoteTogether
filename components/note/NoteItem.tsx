import { INote } from "@/interfaces/note";
import { deleteNote } from "@/store/note/slice";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import TextItem from "./TextItem";

interface NoteItemProps {
  note: INote;
}

export function NoteItem({ note }: NoteItemProps) {
  const dispatch = useDispatch();

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleDeleteNote = () => {
    dispatch(deleteNote(note.id));
  };
  return (
    <View style={style.container}>
      <View>
        <Text style={{ fontSize: 20 }}>{note.title}</Text>
      </View>
      <View style={style.noteContent}>
        {note.content && note.content.children && note.content.children.length > 0 ? (
          note.content.children.map((item, index) => (
            <TextItem key={index} {...item} />
          ))
        ) : (
          <Text
            style={{
              fontStyle: "italic",
              color: "grey",
              textAlign: "center",
              marginTop: 20,
            }}
          >
            No content
          </Text>
        )}
      </View>
      <View style={style.date}>
        <Text style={{ fontSize: 11 }}>{formatDate(note.updatedAt)}</Text>
      </View>
      <View style={style.actionContainer}>
        <Pressable onPress={handleDeleteNote}>
          <MaterialCommunityIcons name="close" size={20} color="grey" />
        </Pressable>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    padding: 10,
    margin: 5,
    borderRadius: 10,
    paddingTop: 10,
    paddingBottom: 20,
  },
  actionContainer: {
    position: "absolute",
    right: 10,
    top: 10,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  date: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  noteContent: {
    width: "100%",
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
    minHeight: 100,
  },
});
