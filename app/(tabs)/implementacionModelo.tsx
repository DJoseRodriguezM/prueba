// // App.js
// import React, { useState, useEffect, useRef } from 'react';
// import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
// import { Camera } from 'expo-camera';
// import * as tf from '@tensorflow/tfjs';
// import * as cocoSsd from '@tensorflow-models/coco-ssd';
// import * as Permissions from 'expo-permissions';

// export default function App() {
//   const [hasPermission, setHasPermission] = useState(null);
//   const [camera, setCamera] = useState(null);
//   const [isCameraOpen, setIsCameraOpen] = useState(false);
//   const [selectedObject, setSelectedObject] = useState(null);
//   const [model, setModel] = useState(null);

//   const objects = ['manzana', 'banana', 'naranja']; // Lista de objetos

//   useEffect(() => {
//     (async () => {
//       const { status } = await Permissions.askAsync(Permissions.CAMERA);
//       setHasPermission(status === 'granted');
//       await tf.ready();
//       const loadedModel = await cocoSsd.load();
//       setModel(loadedModel);
//     })();
//   }, []);

//   const handleObjectSelect = (object) => {
//     setSelectedObject(object);
//     setIsCameraOpen(true);
//   };

//   const handleCameraStream = async (images) => {
//     const loop = async () => {
//       if (!isCameraOpen) return;
//       const nextImageTensor = images.next().value;
//       if (nextImageTensor) {
//         const predictions = await model.detect(nextImageTensor);
//         const found = predictions.some(prediction => prediction.class === selectedObject);
//         setResult(found ? 'Objeto encontrado' : 'Objeto no encontrado');
//         console.log('Predicciones:', predictions);
//         if (found) {
//           setIsCameraOpen(false);
//         }
//       }
//       requestAnimationFrame(loop);
//     };
//     loop();
//   };

//   if (hasPermission === null) {
//     return <View />;
//   }
//   if (hasPermission === false) {
//     return <Text>No access to camera</Text>;
//   }

//   return (
//     <View style={styles.container}>
//       {isCameraOpen ? (
//         <Camera
//           style={styles.camera}
//           type={Camera.Constants.Type.back}
//           ref={(ref) => setCamera(ref)}
//           onCameraReady={() => {
//             if (camera) {
//               const cameraStream = camera.getCameraStream();
//               handleCameraStream(cameraStream);
//             }
//           }}
//         />
//       ) : (
//         <FlatList
//           data={objects}
//           renderItem={({ item }) => (
//             <TouchableOpacity onPress={() => handleObjectSelect(item)}>
//               <Text style={styles.item}>{item}</Text>
//             </TouchableOpacity>
//           )}
//           keyExtractor={(item) => item}
//         />
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   camera: {
//     flex: 1,
//     width: '100%',
//   },
//   item: {
//     padding: 20,
//     fontSize: 18,
//     height: 44,
//   },
// });

