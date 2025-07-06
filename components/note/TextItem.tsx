import { INoteContent } from "@/interfaces/note";
import { fromStateToFormat, textAlignStyle, textDecorationLineStyle } from "@/utils/textEditor";
import React from "react";
import { Text, View } from "react-native";

const TextItem = (props: INoteContent) => {
  const children = props.children;
  const { format } = props;
  
  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: textAlignStyle(format.toString()) }}>
      {children.map((child, index) => {
        const { text, format } = child;
        const textFormat = fromStateToFormat(Number(format));
        console.log('child', child);
        return (
          <Text
            key={index}
            style={{
              fontWeight: textFormat.IS_BOLD ? "bold" : "normal",
              fontStyle: textFormat.IS_ITALIC ? "italic" : "normal",
              textDecorationLine: textDecorationLineStyle(
                Object.keys(textFormat)
              ),
              color: textFormat.IS_HIGHLIGHT ? "#FFFF00" : "#000000",
            }}
          >
            {text}
          </Text>
        );
      })}
    </View>
  );
};

export default React.memo(TextItem);
