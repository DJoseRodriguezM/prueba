import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState, useRef, useEffect } from 'react';
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';

export default function App() {
  const cameraRef = useRef<CameraView>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [presentedShape, setPresentedShape] = useState('');
  const [predictions, setPredictions] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      await tf.ready();
    })();
  }, []);

  const handleImageCapture = async () => {
    setIsProcessing(true);
    const imageData = await cameraRef.current!.takePictureAsync({
      base64: true,
    });
    if (imageData!.base64) {
      setCapturedImage(imageData!.base64);
      classifyImage(imageData!.base64);
      // console.log("Imagen capturada: ",imageData!.base64); // Imprimir imagen capturada en la consola
    }
    setIsProcessing(false);
  };

  const classifyImage = async (base64: string) => {

    const img = document.createElement('img');
    console.log("Prediciones: "); // Imprimir predicciones en la consola

    img.src = `data:image/jpeg;base64,${base64}`;
    const model = await mobilenet.load();
    const predictions = await model.classify(img);

    setPredictions(predictions);
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleImageCapture}>
          <Text style={styles.buttonText}>Capturar imagen</Text>
        </TouchableOpacity>
      </View>
      <CameraView ref={cameraRef} style={styles.camera} facing={'back'} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleImageCapture}>
          <Text style={styles.buttonText}>Capturar imagen</Text>
        </TouchableOpacity>
      </View>
      {isProcessing && <Text>Procesando imagen...</Text>}
      {capturedImage && (
        <View style={styles.imageContainer}>
          <View><Text>predicciones: {predictions}</Text></View>
          {predictions.length > 0 && (
            <View>
              {predictions.map((prediction, index) => (
                <Text key={index}>{`${prediction.className}: ${prediction.probability.toFixed(2)}`}</Text>
              ))}
            </View>
          )}
          <Image
            source={{ uri: `data:image/jpeg;base64,${capturedImage}` }}
            style={styles.image}
          />
          
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    top: 40,
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
  },
});