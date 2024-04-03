import { MaterialIcons } from "@expo/vector-icons";
import { Camera, CameraType } from "expo-camera";
import { Audio } from "expo-av";
import { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import Animated, {
  FlipInEasyX,
  FlipOutEasyX,
  RotateInDownLeft,
  RotateOutDownLeft,
} from "react-native-reanimated";
import { themeColor } from "../../constants/themeColor";

export default function CameraPhrase({ setCapturedImage, setStartCamera }) {
  let camera = null;
  const [flashMode, setFlashMode] = useState("off");
  const [cameraType, setCameraType] = useState(CameraType.back);
  const [sound, setSound] = useState();
  const [isDisable, setIsDisable] = useState(false);

  async function playShutterSnapSound() {
    if (!sound) {
      const { sound } = await Audio.Sound.createAsync(require("../../assets/camera-shutter.mp3"));
      setSound(sound);
      await sound.playAsync();
    } else if (sound) {
      await sound.playAsync();
    }
  }

  const takePicture = async () => {
    setIsDisable(true);
    try {
      if (!camera) return;

      const [photo] = await Promise.all([camera.takePictureAsync(), playShutterSnapSound()]);
      setCapturedImage(photo);
      setStartCamera(false);
    } catch (error) {
    } finally {
      setIsDisable(false);
    }
  };

  const handleFlashMode = () => {
    if (flashMode === "on") {
      setFlashMode("off");
    } else if (flashMode === "off") {
      setFlashMode("auto");
    } else {
      setFlashMode("on");
    }
  };

  const switchCamera = () => {
    if (cameraType === CameraType.back) {
      setCameraType(CameraType.front);
      return;
    }

    setCameraType(CameraType.back);
  };

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: themeColor.appBackgroundColor,
      }}
      className="flex flex-col"
    >
      <Camera
        style={{
          width: "100%",
          height: 480,
          marginTop: "40%",
        }}
        ref={(r) => {
          camera = r;
        }}
        type={cameraType}
        flashMode={flashMode}
      >
        <TouchableOpacity
          onPress={handleFlashMode}
          className="absolute rounded-full w-6 h-6"
          style={{ left: "5%", top: "10%" }}
        >
          <Animated.View entering={RotateInDownLeft} exiting={RotateOutDownLeft}>
            <MaterialIcons name={`flash-${flashMode}`} size={24} color="white" />
          </Animated.View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={switchCamera}
          className="absolute mt-10 rounded-full w-6 h-6"
          style={{ left: "5%", top: "10%" }}
        >
          <Animated.View entering={FlipInEasyX} exiting={FlipOutEasyX}>
            <MaterialIcons name="flip-camera-android" size={24} color="white" />
          </Animated.View>
        </TouchableOpacity>
      </Camera>
      <View className="flex flex-1 flex-row w-full p-5 justify-between">
        <View className="flex-1 self-center items-center">
          <TouchableOpacity
            disabled={isDisable}
            onPress={takePicture}
            className="w-16 h-16 bottom-0 rounded-full bg-white"
          />
        </View>
      </View>
    </View>
  );
}
