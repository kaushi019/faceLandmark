const express = require('express')
const app = express()
const faceLandmarkDetection = require('@tensorflow-models/face-landmarks-detection')
require('@tensorflow/tfjs-backend-webgl')
require('@tensorflow/tfjs-backend-cpu')

app.use(express.urlencoded({extended: true}));

app.listen(3000,()=>{
    console.log("listening ")
})

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html')
})

// app.post('/img',(req,res)=>{
//     console.log("image "+req.body)
//     // main(req.body)
// })


async function main(img){
    const model = await faceLandmarkDetection.load(
        faceLandmarkDetection.SupportedPackages.mediapipeFacemesh
    );

    const prediction = await model.estimateFaces({
        input: img
    });

    if(prediction.length){
        console.log(prediction)
    }
}