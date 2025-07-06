import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
  title: string;
  onNext?: () => void;
  nextIcon?: React.ReactNode;
  onPressBack?: () => void;
}

export const HeaderCustomer = (props: Props) => {
  const { title, onNext, onPressBack } = props;
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          if (navigation.canGoBack()) {
             onPressBack && onPressBack();
            navigation.goBack();
          }
        }}
        style={styles.backButton}
      >
        <Ionicons name="arrow-back" size={30} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      {onNext && (
        <TouchableOpacity
          onPress={() => {
            onNext();
          }}
          style={styles.nextContainer}
        >
          {props.nextIcon ? (
            props.nextIcon
          ) : (
            <Ionicons name="arrow-forward" size={30} />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    position: "relative",
  },
  backButton: { position: "absolute", top: 0, left: 20 },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  nextContainer: {
    position: "absolute",
    top: 0,
    right: 20,
  },
});
