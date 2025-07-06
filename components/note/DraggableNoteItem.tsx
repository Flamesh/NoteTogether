import { INote } from "@/interfaces/note";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";
import { NoteItem } from "./NoteItem";

interface DraggableNoteItemProps {
  note: INote;
  onDragStart: (id: string) => void;
  onDragEnd: (fromIndex: number, toIndex: number) => void;
  index: number;
  isDragging: boolean;
  draggedIndex: number | null;
}

export function DraggableNoteItem({
  note,
  onDragStart,
  onDragEnd,
  index,
  isDragging,
  draggedIndex,
}: DraggableNoteItemProps) {
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const handleDragStart = () => {
    onDragStart(note.id);
  };

  const handleDragEnd = (fromIndex: number, toIndex: number) => {
    onDragEnd(fromIndex, toIndex);
  };

  const longPressGesture = Gesture.LongPress()
    .minDuration(100)
    .onStart(() => {
      runOnJS(handleDragStart)();
      scale.value = withSpring(1.05);
      opacity.value = withSpring(0.8);
    });

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      if (isDragging && draggedIndex === index) {
        translateY.value = event.translationY;
      }
    })
    .onEnd((event) => {
      if (isDragging && draggedIndex === index) {
        const itemHeight = 100; 
        const moveDistance = Math.round(event.translationY / itemHeight);
        const newIndex = Math.max(0, Math.min(index + moveDistance, 999));

        if (Math.abs(moveDistance) > 0) {
          runOnJS(handleDragEnd)(index, newIndex);
        } else {
          runOnJS(handleDragEnd)(index, index); 
        }

        translateY.value = withSpring(0);
        scale.value = withSpring(1);
        opacity.value = withSpring(1);
      }
    });

  const composedGesture = Gesture.Simultaneous(longPressGesture, panGesture);

  const animatedStyle = useAnimatedStyle(() => {
    const isBeingDragged = isDragging && draggedIndex === index;

    return {
      transform: [
        { translateY: isBeingDragged ? translateY.value : 0 },
        { scale: isBeingDragged ? scale.value : 1 },
      ],
      opacity: isBeingDragged ? opacity.value : 1,
      zIndex: isBeingDragged ? 1000 : 0,
      elevation: isBeingDragged ? 10 : 2,
    };
  });

  const cardStyle = useAnimatedStyle(() => {
    const isBeingDragged = isDragging && draggedIndex === index;
    return {
      backgroundColor: isBeingDragged ? "#f0f0f0" : "#fff",
    };
  });

  return (
    <GestureDetector gesture={composedGesture}>
      <Animated.View style={[styles.container, animatedStyle]}>
        <Animated.View style={[styles.card, cardStyle]}>
          <View style={styles.noteContainer}>
            <NoteItem note={note} />
          </View>
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 4,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  noteContainer: {
    flex: 1,
  },
});
