import Editor from "@/components/editor";
import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { INoteContent } from "../../interfaces/note";

export default function TabTwoScreen() {
  const [noteContent, setNoteContent] = useState<INoteContent>();
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.container}>
        <View
          style={{
            height: 400,
          }}
        >
          <Editor
            setPlainText={(text) => console.log("Plain text:", text)}
            setEditorState={(state) => {
              try {
                if (state && typeof state === 'string') {
                  const parsedState = JSON.parse(state);
                  setNoteContent(parsedState as INoteContent);
                }
              } catch (error) {
                console.error("Failed to parse editor state:", error);
              }
            }}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
