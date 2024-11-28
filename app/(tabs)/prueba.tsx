// import React, {useRef, useState} from 'react';
// import {
//   View,
//   StyleSheet,
//   Dimensions,
//   Pressable,
//   Modal,
//   Text,
//   ActivityIndicator,
// } from 'react-native';

// // import {
// //   getModel,
// //   convertBase64ToTensor,
// //   startPrediction,
// // } from '../../estras/helpers/tensor-helper';
// // import {cropPicture} from '../../estras/helpers/image-helper';
// import Constants from 'expo-constants';

// import { CameraView, CameraType, CameraCapturedPicture } from 'expo-camera';
// const [facing, setFacing] = useState<CameraType>('back');
// const RESULT_MAPPING = ['Triangle', 'Circle', 'Square'];

// const Main = () => {
//   const cameraRef = useRef<CameraView>(null);
//   const [isProcessing, setIsProcessing] = useState(faalse);
//   const [presentedShape, setPresentedShape] = useState('');

//   const handleImageCapture = async () => {
//     setIsProcessing(true);
//     const imageData = await cameraRef.current!.takePictureAsync({
//       base64: true,
//     });
//     processImagePrediction(imageData);
//   };

//   const processImagePrediction = async (base64Image: CameraCapturedPicture | undefined) => {
//     const croppedData = await cropPicture(base64Image, 300);
//     const model = await getModel();
//     const tensor = await convertBase64ToTensor(croppedData.base64);

//     const prediction = await startPrediction(model, tensor);

//     const highestPrediction = prediction.indexOf(
//       Math.max.apply(null, prediction),
//     );
//     setPresentedShape(RESULT_MAPPING[highestPrediction]);
//   };

//   return (
//     <View style={styles.container}>
//       <Modal visible={isProcessing} transparent={true} animationType="slide">
//         <View style={styles.modal}>
//           <View style={styles.modalContent}>
//             <Text>Your current shape is {presentedShape}</Text>
//             {presentedShape === '' && <ActivityIndicator size="large" />}
//             <Pressable
//               style={styles.dismissButton}
//               onPress={() => {
//                 setPresentedShape('');
//                 setIsProcessing(false);
//               }}>
//               <Text>Dismiss</Text>
//             </Pressable>
//           </View>
//         </View>
//       </Modal>

//       <CameraView
//         ref={cameraRef}
//         style={styles.camera}
//         facing={facing}
//         // autoFocus={true}
//         // whiteBalance={Constants.WhiteBalance.auto}
//         ></CameraView>
//       <Pressable
//         onPress={() => handleImageCapture()}
//         style={styles.captureButton}></Pressable>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     width: '100%',
//     height: '100%',
//   },
//   camera: {
//     width: '100%',
//     height: '100%',
//   },
//   captureButton: {
//     position: 'absolute',
//     left: Dimensions.get('screen').width / 2 - 50,
//     bottom: 40,
//     width: 100,
//     zIndex: 100,
//     height: 100,
//     backgroundColor: 'white',
//     borderRadius: 50,
//   },
//   modal: {
//     flex: 1,
//     width: '100%',
//     height: '100%',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   modalContent: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: 300,
//     height: 300,
//     borderRadius: 24,
//     backgroundColor: 'gray',
//   },
//   dismissButton: {
//     width: 150,
//     height: 50,
//     marginTop: 60,
//     borderRadius: 24,
//     color: 'white',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'red',
//   },
// });

// export default Main;
