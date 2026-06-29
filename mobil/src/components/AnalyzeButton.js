import { Button } from "react-native";

export default function AnalyzeButton({
  loading,
  onPress,
}) {
  return (
    <Button
      title={
        loading
          ? "Analiz ediliyor..."
          : "Analiz Et"
      }
      onPress={onPress}
    />
  );
}