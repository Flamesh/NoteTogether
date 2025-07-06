import { INoteContent } from "@/interfaces/note";
import {
  fromStateToFormat,
  textAlignStyle,
  textDecorationLineStyle,
} from "@/utils/textEditor";
import React from "react";
import { Text, View } from "react-native";

const test = {
  children: [
    {
      children: [
        {
          detail: 0,
          format: 0,
          mode: "normal",
          style: "",
          text: "2",
          type: "text",
          version: 1,
        },
      ],
      direction: null,
      format: "",
      indent: 0,
      type: "listitem",
      version: 1,
      value: 1,
    },
    {
      children: [
        {
          children: [
            {
              children: [
                {
                  children: [
                    {
                      children: [
                        {
                          children: [
                            {
                              children: [
                                {
                                  detail: 0,
                                  format: 0,
                                  mode: "normal",
                                  style: "",
                                  text: "3.1",
                                  type: "text",
                                  version: 1,
                                },
                              ],
                              direction: null,
                              format: "",
                              indent: 3,
                              type: "listitem",
                              version: 1,
                              value: 1,
                            },
                            {
                              children: [
                                {
                                  detail: 0,
                                  format: 0,
                                  mode: "normal",
                                  style: "",
                                  text: "3.1",
                                  type: "text",
                                  version: 1,
                                },
                              ],
                              direction: null,
                              format: "",
                              indent: 3,
                              type: "listitem",
                              version: 1,
                              value: 2,
                            },
                            {
                              children: [
                                {
                                  detail: 0,
                                  format: 0,
                                  mode: "normal",
                                  style: "",
                                  text: "3.3",
                                  type: "text",
                                  version: 1,
                                },
                              ],
                              direction: null,
                              format: "",
                              indent: 3,
                              type: "listitem",
                              version: 1,
                              value: 3,
                            },
                          ],
                          direction: null,
                          format: "",
                          indent: 0,
                          type: "list",
                          version: 1,
                          listType: "number",
                          start: 1,
                          tag: "ol",
                        },
                      ],
                      direction: null,
                      format: "",
                      indent: 2,
                      type: "listitem",
                      version: 1,
                      value: 1,
                    },
                  ],
                  direction: null,
                  format: "",
                  indent: 0,
                  type: "list",
                  version: 1,
                  listType: "number",
                  start: 1,
                  tag: "ol",
                },
              ],
              direction: null,
              format: "",
              indent: 1,
              type: "listitem",
              version: 1,
              value: 1,
            },
          ],
          direction: null,
          format: "",
          indent: 0,
          type: "list",
          version: 1,
          listType: "number",
          start: 1,
          tag: "ol",
        },
      ],
      direction: null,
      format: "",
      indent: 0,
      type: "listitem",
      version: 1,
      value: 2,
    },
  ],
  direction: null,
  format: "",
  indent: 0,
  type: "list",
  version: 1,
  listType: "number",
  start: 1,
  tag: "ol",
};

const TextItem = (props: INoteContent) => {
  const { format, children, type } = props;

  console.log("TextItem rendered:", type);

  // if (listType) {
  //   return (
  //     <View>
  //       {children.map((child, index) => {
  //         const { text, format } = child;
  //         const textFormat = fromStateToFormat(Number(format));
  //         return (
  //           <View key={index}>
  //             <Text>1.</Text>
  //              <TextItem key={index} {...child} />
  //            </View>
  //         );
  //       })}
  //     </View>
  //   )
  // }
  if (type === "listitem") {
    console.log("TextItem rendered: listItem", JSON.stringify(props));
    return (
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: textAlignStyle(format.toString()),
        }}
      >
        {children.map((child, index) => {
          const { text, format } = child;
          const textFormat = fromStateToFormat(Number(format));
          return (
            <Text
              key={index}
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
        })}
      </View>
    );
  }

  if (type === "list") {
    return children.map((child, index) => { 
      return (
        <TextItem key={index} {...child} />
      )
    })
  }
};

export default React.memo(TextItem);
