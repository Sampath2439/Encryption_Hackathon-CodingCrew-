// Initialize Firebase with your config
const firebaseConfig = {
    apiKey: "AIzaSyAbunsfYboVBve59cH9fw5MqCPCDh9xs_A",
  authDomain: "signin-1f542.firebaseapp.com",
  projectId: "signin-1f542",
  storageBucket: "signin-1f542.appspot.com",
  messagingSenderId: "640383751614",
  appId: "1:640383751614:web:a313f7c7a5c752edf215ef",
  measurementId: "G-EJ82PK6PRP"
  };
  
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  
  // Load face-api.js models
  Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri('D:\actual\assets\models'),
      faceapi.nets.faceLandmark68Net.loadFromUri('D:\actual\assets\models'),
      faceapi.nets.faceRecognitionNet.loadFromUri('D:\actual\assets\models'),
  ]).then(startFaceRecognition);
  
  async function startFaceRecognition() {
    // Capture video from the user's webcam
    const video = document.createElement('video');
    document.body.append(video);
  
    const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
    video.srcObject = stream;
  
    // Detect face in each frame
    video.addEventListener('play', () => {
      const canvas = faceapi.createCanvasFromMedia(video);
      document.body.append(canvas);
      const displaySize = { width: video.width, height: video.height };
      faceapi.matchDimensions(canvas, displaySize);
  
      setInterval(async () => {
        const detections = await faceapi.detectAllFaces(video,
          new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptors();
  
        if (detections.length > 0) {
          // Face verified
          showPopup('Verified');
          // Save data to Firebase
          saveToFirebase('verified');
        } else {
          // Face not verified
          showPopup('Not Verified');
        }
  
      }, 1000);
    });
  }
  
  function showPopup(message) {
    const popup = document.getElementById('popup');
    const popupText = document.getElementById('popupText');
    popupText.innerText = message;
    popup.style.display = 'block';
  
    setTimeout(() => {
      popup.style.display = 'none';
    }, 3000);
  }
  
  function saveToFirebase(status) {
    db.collection('faceRecognition').add({
      status,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
  }