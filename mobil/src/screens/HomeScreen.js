import { ScrollView } from "react-native";
import Header from "../components/Header";
import ImagePickerBox from "../components/ImagePickerBox";
import AnalyzeButton from "../components/AnalyzeButton";
import useAnemiaDetection from "../hooks/useAnemiaDetection";

export default function HomeScreen() {
  const {
    palmImage,
    eyeImage,
    nailImage,
    loading,
    pickImage,
    takePhoto,
    removeImage,
    analyze,
  } = useAnemiaDetection();

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 20 }}
    >
      <Header />

      <ImagePickerBox
        title="El Ayası"
        image={palmImage}
        onPickGallery={() => pickImage("palm")}
        onPickCamera={() => takePhoto("palm")}
        onRemove={() => removeImage("palm")}
      />

      <ImagePickerBox
        title="Göz Konjunktivası"
        image={eyeImage}
        onPickGallery={() => pickImage("eye")}
        onPickCamera={() => takePhoto("eye")}
        onRemove={() => removeImage("eye")}
      />

      <ImagePickerBox
        title="Tırnak"
        image={nailImage}
        onPickGallery={() => pickImage("nail")}
        onPickCamera={() => takePhoto("nail")}
        onRemove={() => removeImage("nail")}
      />

      <AnalyzeButton
        loading={loading}
        onPress={analyze}
      />
    </ScrollView>
  );
}