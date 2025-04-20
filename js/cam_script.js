'use strict';

const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const snap = document.getElementById('snap');
const fileInput = document.getElementById('fileInput');
const uploadButton = document.getElementById('upload');
const errorMsgElement = document.getElementById('error-message');

const constraints = {
    audio: false,
    video: {
        width: 1280,
        height: 720
    }
};

async function init() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        handleSuccess(stream);
    } catch (e) {
        errorMsgElement.innerHTML = `navigator.getUserMedia.error: ${e.toString()}`;
    }
}

function handleSuccess(stream) {
    window.stream = stream;
    video.srcObject = stream;
}

function capturePhoto() {
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob(async (blob) => {
        await sendToMachineLearningModel(blob);
    }, 'image/jpeg');
}

async function uploadPhoto() {
    const file = fileInput.files[0];
    if (file) {
        const blob = await fileToBlob(file);
        await sendToMachineLearningModel(blob);
    }
}

function fileToBlob(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            resolve(new Blob([reader.result], { type: file.type }));
        };
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
    });
}

async function sendToMachineLearningModel(blob) {
    const formData = new FormData();
    formData.append('file', blob, 'image.jpg');

    try {
        const response = await fetch('/api/ml-model', {
            method: 'POST',
            body: formData
        });
        const result = await response.json();
        console.log('ML Model response:', result);
        // Handle the result as needed
    } catch (error) {
        console.error('Error sending photo to ML model:', error);
        errorMsgElement.innerHTML = 'Error sending photo to ML model.';
    }
}

init();

snap.addEventListener('click', capturePhoto);
uploadButton.addEventListener('click', uploadPhoto);
