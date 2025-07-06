const states = {
    IS_BOLD: 1,
    IS_ITALIC: 1 << 1,
    IS_STRIKETHROUGH: 1 << 2,
    IS_UNDERLINE: 1 << 3,
};

export const fromStateToFormat = (decimalNumber: number) =>
  Object.fromEntries(Object.entries(states).map(([k, v]) => [k, !!(v & decimalNumber)]));

export const textDecorationLineStyle = (IS_STRIKETHROUGH: boolean, IS_UNDERLINE: boolean): "none" | "underline" | "line-through" | "underline line-through" | undefined => {
        let line = "";
        if (IS_UNDERLINE) {
          line += "underline ";
        }
        if (IS_STRIKETHROUGH) {
          line += "line-through ";
        }
        
        if (!line) return "none";
        return line.trim() as "none" | "underline" | "line-through" | "underline line-through";
}
    

export const textAlignStyle = (format: string): "flex-start" | "center" | "flex-end" | "space-between" | "space-around" | "space-evenly" | undefined => {
  switch (format) {
    case "left":
      return "flex-start"
    case "center":
      return 'center'
    case "right":
      return "flex-end";
    case "justify":
      return "space-between";
    default:
      return undefined;
  }
}

export const formatListType = (listType: string | undefined, index: number) => {
  switch (listType) {
    case "number":
      return "" + index + ".";
    case "bullet":
      return "•";
    default:
      return "•";
  }
}