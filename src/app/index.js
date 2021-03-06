import React, {useEffect, useRef, useState} from 'react'
import audioSrc from '../audio/warning.wav'

import * as handTrack from 'handtrackjs'

const blockStyle = {
    fontFamily: 'Tahoma',
    position: 'absolute',
    color: 'red',
    fontWeight: '500',
    backgroundColor: 'white',
    padding: '20px',
    borderBottomRightRadius: '4px'
}

const App = ()=>{
    const videoRef = useRef()
    const canvasRef = useRef()
    const audioRef = useRef()
    const [counter, setCounter] = useState(0)

    useEffect(()=>{
        const videoEl = videoRef.current
        const canvasEl = canvasRef.current
        const audioEl = audioRef.current
        const context = canvasEl && canvasEl.getContext('2d')

        const modelParams = {
            flipHorizontal: false,   // flip e.g for video
            imageScaleFactor: 1,  // reduce input image size for (maybe) gains in speed.
            maxNumBoxes: 2,        // maximum number of boxes to detect
            iouThreshold: 0.5,      // ioU threshold for non-max suppression
            scoreThreshold: 0.79,    // confidence threshold for predictions.
        }

        let model

                
        handTrack.load(modelParams).then(lmodel =>{
            model = lmodel;
        })

        const runDetection = () =>{
            model.detect(videoEl).then(predictions => {
                console.log(predictions);
                model.renderPredictions(predictions, canvasEl, context, videoEl);
                if(predictions.length > 0){
                    setCounter(counter => counter + 1)
                    audioEl.play();
                }
        
            })
        }


        handTrack.startVideo(videoEl).then(status => {
            if(status){
                navigator.getUserMedia({video:{}}, stream =>{
                    videoEl.srcObject = stream;
                    const interval = setInterval(runDetection,1000);
                },
                    err => console.log(err)
                );
            }
        })
        return () => clearInterval(interval)
    }, [videoRef, canvasRef])
    return <div>
        <div style={blockStyle}>{counter}</div>
        <video ref={videoRef} style={{display: 'none'}}></video>
        <canvas ref={canvasRef}></canvas>
        <audio src={audioSrc} ref={audioRef}></audio>
    </div>
}

export default App