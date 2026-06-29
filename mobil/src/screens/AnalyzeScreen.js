import { ScrollView, View, Text, StyleSheet, Image, Pressable, Modal } from "react-native";
import { useState, useEffect } from "react";
import ImagePickerBox from "../components/ImagePickerBox";
import AnalyzeButton from "../components/AnalyzeButton";
import AppIcon from "../components/AppIcon";

import useAnemiaDetection from "../hooks/useAnemiaDetection";

export default function AnalyzeScreen() {
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

  const [showInfo, setShowInfo] = useState(false);
  const [selected, setSelected] = useState("palm");
  const getImage = (type, activeImg, inactiveImg) => {
    return selected === type ? activeImg : inactiveImg;
  };

  return (
    <ScrollView
      style={{ flex: 1, paddingHorizontal: 20, paddingTop: 5}}
      contentContainerStyle={{ paddingTop: 70}}
    >
      <View style={styles.header}>
        <AppIcon
          style={{
            width: 35,
            height: 35,
            borderRadius: 10,
          }}
      />

        <Text style={styles.title}>Anemia</Text>
        <Text style={{color: "#ac1521", fontSize: 25, fontWeight: 800, left: 3}}>.</Text>
      </View>

      <View style = {{flexDirection: "row", alignItems: "center",}} >
          
        <Text style = {styles.title2}>TARAMA BÖLGESİ SEÇ</Text>
        <Pressable onPress={() => setShowInfo(true)}>
          <Image
              source={require("../../assets/question.png")}
              style={styles.styleQuestion}
              resizeMode="contain"
          />
        </Pressable>
      </View>

      <View style={[, {flexDirection: "row", alignItems: "center", justifyContent: "center"}]}>
        <Pressable onPress={() => setSelected("palm")}>
          <View style={selected === "palm" ? styles.imageBox_1 : styles.imageBox_0}>
            <Image
              source={selected === "palm"
                ? require("../../assets/palm_1.png")
                : require("../../assets/palm_0.png")
              }
              style={selected === "palm" ? styles.imageBoxIcon_1 : styles.imageBoxIcon_0}
              resizeMode="contain"
            />
            <Text style={[styles.appText, {marginTop: 10, fontSize: 14, width: 100, textAlign: "center"}]}>El Ayası</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => setSelected("eye")}>
          <View style={selected === "eye" ? styles.imageBox_1 : styles.imageBox_0}>
            <Image
              source={selected === "eye"
                ? require("../../assets/eye_1.png")
                : require("../../assets/eye_0.png")
              }
              style={selected === "eye" ? styles.imageBoxIcon_1 : styles.imageBoxIcon_0}
              resizeMode="contain"
            />
            <Text style={[styles.appText, {marginTop: 10, fontSize: 14, width: 100, textAlign: "center"}]}>Göz Konjunktivası</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => setSelected("nail")}>
          <View style={selected === "nail" ? styles.imageBox_1 : styles.imageBox_0}>
            <Image
              source={selected === "nail"
                ? require("../../assets/nail_1.png")
                : require("../../assets/nail_0.png")
              }
              style={selected === "nail" ? styles.imageBoxIcon_1 : styles.imageBoxIcon_0}
              resizeMode="contain"
            />
            <Text style={[styles.appText, {marginTop: 10, fontSize: 14, width: 100, textAlign: "center"}]}>Tırnak</Text>
          </View>
        </Pressable>
      </View>

      <View style = {{flexDirection: "row", alignItems: "center",}} >
      
        <Text style = {styles.title2}>GÖRÜNTÜ YÖNTEMİ</Text>
        <Pressable onPress={() => setShowInfo(true)}>
          <Image
              source={require("../../assets/question.png")}
              style={styles.styleQuestion}
              resizeMode="contain"
          />
        </Pressable>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginVertical: 10 }}>

        {/* CAMERA */}
        <Pressable onPress={() => takePhoto(selected)}>
          <View style={[styles.downloadImageBox_1, {flexDirection: "row"}]}>
            <Image
              source={require("../../assets/camera.png")}
              style={styles.downloadImageStyle}
              resizeMode="contain"
            />
            <Text style = {[styles.appText, {marginLeft: 10, fontWeight: 600, fontSize: 14}]}>Kamera</Text>
          </View>
        </Pressable>

        {/* GALLERY */}
        <Pressable onPress={() => pickImage(selected)}>
          <View style={[styles.downloadImageBox_1, {flexDirection: "row"}]}>
            <Image
              source={require("../../assets/galery.png")}
              style={styles.downloadImageStyle}
              resizeMode="contain"
            />
            <Text style = {[styles.appText, {marginLeft: 8, fontWeight: 600, fontSize: 14}]}>Galeri</Text>
          </View>
        </Pressable>
      </View>

      <View style = {{flexDirection: "row", alignItems: "center",}} >
      
        <Text style = {styles.title2}>GÖRÜNTÜLER</Text>
        <Pressable onPress={() => setShowInfo(true)}>
          <Image
              source={require("../../assets/question.png")}
              style={styles.styleQuestion}
              resizeMode="contain"
          />
        </Pressable>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <ImagePickerBox
          image={palmImage}
          onRemove={() => removeImage("palm")}
          label="El Ayası"
        />

        <ImagePickerBox
          image={eyeImage}
          onRemove={() => removeImage("eye")}
          label="Göz"
        />

        <ImagePickerBox
          image={nailImage}
          onRemove={() => removeImage("nail")}
          label="Tırnak"
        />
      </View>

      <AnalyzeButton
        loading={loading}
        onPress={analyze}
      />

      <View style={styles.warningBox}>
        <Image
            source={require("../../assets/warning.png")}
            style={styles.styleWarning}
            resizeMode="contain"
        />
        <Text style={{ flex: 1, marginLeft: 5, fontSize: 14 }}>
          <Text style={{ color: "#c35861", fontWeight: "700" }}>
              Yasal Uyarı:
          </Text>
          <Text style={styles.appText}>
              {" "}Sonuçlar yalnızca bilgilendirme amaçlıdır ve tıbbi teşhis niteliği taşımaz.
          </Text>
        </Text>
      </View>


      <Modal
        visible={showInfo}
        transparent
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Pressable
              style={styles.closeButton}
              onPress={() => setShowInfo(false)}
            >
              <Text style={styles.closeText}>✕</Text>
            </Pressable>

            <Text style={styles.modalTitle}>
              Dikkat Edilmesi Gereken Hususlar
            </Text>

            <Text style={styles.modalText}>
              • Fotoğraflar iyi aydınlatılmış ortamda çekilmelidir.{"\n\n"}
              • Görüntüler net ve bulanık olmaymalıdır.{"\n\n"}
              • El ayası, göz konjunktivası ve tırnak bölgesi tam görünmelidir.{"\n\n"}
              • Filtre veya düzenleme uygulanmış fotoğraflar kullanılmamalıdır.
            </Text>
          </View>
        </View>
      </Modal>
      
    </ScrollView>
  );
}



const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
  },

  title: {
    color: "#ffffff",
    fontSize: 23,
    fontWeight: "800",
    marginLeft: 10,
  },
  styleQuestion: {
    width: 25,
    height: 25, 
    opacity: 0.6,
    marginTop: 19,
    marginLeft: 5
  },
  modalOverlay: {
  flex: 1,
  backgroundColor: "rgba(0,0,0,0.5)",
  justifyContent: "center",
  alignItems: "center",
},

modalContent: {
  width: "85%",
  backgroundColor: "#fff",
  borderRadius: 15,
  padding: 20,
},

closeButton: {
  alignSelf: "flex-end",
},

closeText: {
  fontSize: 22,
  fontWeight: "bold",
},

modalTitle: {
  fontSize: 18,
  fontWeight: "bold",
  marginBottom: 15,
},

modalText: {
  fontSize: 15,
  lineHeight: 22,
},

styleWarning:{
    width: 35,
    height: 35, 
    borderColor: "#560707",
    borderRadius: 10,
    borderWidth: 1,
    marginLeft: 15
  },

  warningBox:{
    width: "100%",
    height: 70,
    borderWidth: 1,
    borderColor: "#560707",
    borderRadius: 20,
    fontSize: 15,
    alignItems: "center",
    flexDirection: "row",
    marginTop: 15,
    backgroundColor: "#280505",
    opacity: 0.9
  },
  appText:{
    color: "#d3cccc",
    fontWeight: 400,
  },
  title2:{
    color: "#7b7b7b",
    fontSize: 15,
    fontWeight: "600",
    marginTop: 20
  },
  imageBox_1: {
    width: 110,
    height: 130,
    borderWidth: 1,
    borderColor: "#560707",
    borderRadius: 25,
    backgroundColor: "#170303",
    alignItems: "center",
    marginRight: 5,
    marginLeft: 5,
    marginTop: 20,
  },
  imageBoxIcon_1:{
    width: 60,
    height: 60,
    backgroundColor: "#641c22",
    borderRadius: 23,
    padding: 15,    
    marginTop: 20
  },
    imageBox_0: {
    width: 110,
    height: 130,
    borderWidth: 1,
    borderColor: "#414141",
    borderRadius: 25,
    backgroundColor: "#232323",
    alignItems: "center",
    marginRight: 5,
    marginLeft: 5,
    marginTop: 20,
    opacity: 0.5
  },
  imageBoxIcon_0:{
    width: 60,
    height: 60,
    backgroundColor: "#2d0d10",
    borderRadius: 23,
    padding: 15,    
    opacity: 0.8,
    marginTop: 20
  },
  checkStyle: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "#ac1521"
  },
  downloadImageBox_1: {
    width: 170,
    height: 50,
    backgroundColor: "#ac1521",
    borderRadius: 15,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
    marginLeft:5
  },
  downloadImageStyle: {
    width: 25,
    height: 25, 
    justifyContent: "center",
    alignItems: "center"
  },
  row: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
}
});