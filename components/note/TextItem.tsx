import { INoteContent } from "@/interfaces/note";
import {
  fromStateToFormat,
  textAlignStyle,
  textDecorationLineStyle,
} from "@/utils/textEditor";
import React from "react";
import { Text, View } from "react-native";

interface TextItemProps extends INoteContent {
  depth?: number;
  fatherType?: string;
}

const TextItem = (props: TextItemProps) => {
  const { format, children, type, text, listType, value, depth = 0 } = props;

  if (type === "text") {
    const textFormat = fromStateToFormat(Number(format));
    return (
      <Text
        style={{
          fontWeight: textFormat.IS_BOLD ? "bold" : "normal",
          fontStyle: textFormat.IS_ITALIC ? "italic" : "normal",
          textDecorationLine: textDecorationLineStyle(
            textFormat.IS_STRIKETHROUGH,
            textFormat.IS_UNDERLINE
          ),
          color: textFormat.IS_HIGHLIGHT ? "#FFFF00" : "#000000",
        }}
      >
        {text}
      </Text>
    );
  }

  if (type === "list") {
    return (
      <View style={{ marginLeft: depth * 10 }}>
        {children?.map((child, index) => (
          <TextItem
            key={index}
            {...child}
            depth={depth}
            fatherType={listType}
          />
        )) || null}
      </View>
    );
  }

  if (type === "listitem") {
    const isNoText = props.children.every((child) => !child.text);

    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          marginLeft: depth * 5,
          marginVertical: 1,
          paddingVertical: 2,
        }}
      >
        {!isNoText && (
          <View
            style={{
              minWidth: 25,
              alignItems: "flex-start",
              justifyContent: "flex-start",
              marginRight: 5,
              paddingTop: 1,
            }}
          >
            {getListMarker(props.fatherType, value || 1)}
          </View>
        )}
        <View style={{ flex: 1, minHeight: 20 }}>
          {children?.map((child, index) => (
            <TextItem key={index} {...child} depth={depth + 1} />
          )) || null}
        </View>
      </View>
    );
  }

  if (type === "paragraph") {
    return (
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: textAlignStyle(format?.toString() || ""),
          marginVertical: 4,
        }}
      >
        {children?.map((child, index) => (
          <TextItem key={index} {...child} depth={depth} />
        )) || null}
      </View>
    );
  }

  if (children && children.length > 0) {
    return (
      <View>
        {children.map((child, index) => (
          <TextItem key={index} {...child} depth={depth} />
        ))}
      </View>
    );
  }

  return null;
};

const getListMarker = (listType: string | undefined, value: number) => {
  switch (listType) {
    case "number":
      return (
        <Text style={{ fontSize: 14, fontWeight: "500", color: "#333" }}>
          {value}.
        </Text>
      );
    case "bullet":
      return (
        <Text style={{ fontSize: 14, fontWeight: "bold", color: "#666" }}>
          •
        </Text>
      );
    default:
      return (
        <Text style={{ fontSize: 14, fontWeight: "bold", color: "#666" }}>
          •
        </Text>
      );
  }
};

export default React.memo(TextItem);
