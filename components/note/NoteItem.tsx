import { INote } from "@/interfaces/note";
import { deleteNote } from "@/store/note/slice";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React, { useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated";
import { useDispatch } from "react-redux";
import TextItem from "./TextItem";

interface NoteItemProps {
  note: INote;
}

export function NoteItem({ note }: NoteItemProps) {
  const dispatch = useDispatch();
  
  const opacity = useSharedValue(0); 
  const scale = useSharedValue(0.9); 
  const translateX = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 300 });
    scale.value = withTiming(1, { duration: 300 });
  }, [opacity, scale]);

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

  const performDelete = () => {
    dispatch(deleteNote(note.id));
  };

  const handleDeleteNote = () => {
    opacity.value = withTiming(0, { duration: 400 });
    scale.value = withTiming(0.85, { duration: 400 });
    translateX.value = withTiming(150, { duration: 400 }, () => {
      runOnJS(performDelete)();
    });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [
        { scale: scale.value },
        { translateX: translateX.value },
      ],
      shadowOpacity: opacity.value * 0.2, 
      elevation: opacity.value * 3, 
    };
  });

  return (
    <Animated.View style={[style.container, animatedStyle]}>
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
        <Pressable 
          onPress={handleDeleteNote}
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.6 : 1,
              transform: [{ scale: pressed ? 0.9 : 1 }],
            }
          ]}
        >
          <MaterialCommunityIcons name="close" size={20} color="grey" />
        </Pressable>
      </View>
    </Animated.View>
  );
}

const style = StyleSheet.create({
  container: {
    padding: 10,
    margin: 5,
    borderRadius: 10,
    paddingTop: 10,
    paddingBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
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
