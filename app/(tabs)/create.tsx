import Editor from "@/components/editor";
import { HeaderCustomer } from "@/components/layouts/header";
import SafeLayout from "@/components/layouts/safeLayout";
import { addNote } from "@/store/note/slice";
import { useNavigation } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { INoteContent } from "../../interfaces/note";

export default function TabTwoScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [noteContent, setNoteContent] = useState<INoteContent>();
  const [title, setTitle] = useState<string>("");

  const handleSaveNote = () => {
    if (!title && !noteContent) return;
    const newNote = {
      id: Date.now().toString(),
      title: title ? title : "",
      content: noteContent,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    dispatch(addNote(newNote));
    setTitle("");
    // setNoteContent(undefined);
    navigation.goBack()
  };

  return (
    <SafeLayout additionalPaddingTop={10} disableLeft disableRight>
      <HeaderCustomer title="Add note" onNext={handleSaveNote} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.container}>
          <View style={{ height: 400 }}>
            <TextInput
              style={styles.titleInput}
              value={title}
              onChangeText={setTitle}
              textAlignVertical="top"
              placeholder="Enter note title"
            />
            <Editor
              setEditorState={(state) => {
                try {
                  if (state && typeof state === "string") {
                    
                    const parsedState = JSON.parse(state);
                    console.log("Parsed state:", parsedState);
                    setNoteContent(parsedState.root as INoteContent);
                  }
                } catch (error) {
                  console.error("Failed to parse editor state:", error);
                }
              }}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  titleInput: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize: 18,
    backgroundColor: "#fff",
    width: "93%",
    alignSelf: "center",
  },
});
