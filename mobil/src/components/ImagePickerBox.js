import { View, Image, Pressable, Text } from "react-native";

export default function ImagePickerBox({ image, onRemove, label }) {
  return (
    <View style={{ alignItems: "center", marginHorizontal: 8 }}>
      
      {image && (
        <>
          <Image
            source={{ uri: image }}
            style={{
              width: 120,
              height: 120,
              borderRadius: 10,
            }}
          />

          {label && (
            <Text style={{ marginTop: 5, color: "#ccc" }}>
              {label}
            </Text>
          )}

          <Pressable
            onPress={onRemove}
            style={{
              marginTop: 10,
              paddingVertical: 8,
              paddingHorizontal: 20,
              backgroundColor: "#ac1521",
              borderRadius: 10,
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "600" }}>
              Sil
            </Text>
          </Pressable>
        </>
      )}

    </View>
  );
}