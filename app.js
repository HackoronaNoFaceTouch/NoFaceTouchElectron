navigator.getUserMedia =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUerMedia ||
    navigator.msGetUserMedia;

const video = document.querySelector('#video');
const audio = document.querySelector('#audio');
const canvas = document.querySelector('#canvas');
const context = canvas.getContext('2d');
const modelParams = {
    flipHorizontal: false,   // flip e.g for video
    imageScaleFactor: 1,  // reduce input image size for (maybe) gains in speed.
    maxNumBoxes: 2,        // maximum number of boxes to detect
    iouThreshold: 0.5,      // ioU threshold for non-max suppression
    scoreThreshold: 0.79,    // confidence threshold for predictions.
}
let model;

handTrack.startVideo(video).then(status => {
    if(status){
        navigator.getUserMedia({video:{}}, stream =>{
            video.srcObject = stream;
            setInterval(runDetection,1000);
        },
            err => console.log(err)
        );
    }
})

function runDetection(){
    model.detect(video).then(predictions => {
        console.log(predictions);
        model.renderPredictions(predictions, canvas, context, video);
        if(predictions.length > 0){
            audio.play();
        }

    })
}

handTrack.load(modelParams).then(lmodel =>{
    model = lmodel;
})