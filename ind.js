let video = document.getElementById('video')
// let btn = document.getElementById('btn')
let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

let model;



const setUpCam = ()=>{
    navigator.mediaDevices
    .getUserMedia({
        video: { width:600, height: 400 },
        audio: false
    })
    .then(stream=>{
        video.srcObject = stream
    })
    .catch(err=>{
        console.log(err)
    })
}


const detectFaces = async () =>{
    const predictions = await model.estimateFaces({
        input: video,
    },false)

    // console.log(predictions)

    ctx.drawImage(video, 0, 0, 600, 400)


    predictions.forEach(e=>{
        let z = e.boundingBox
        ctx.beginPath()
        ctx.lineWidth = '4'
        ctx.strokeStyle = 'blue'
        ctx.rect(
            z.topLeft[0],
            z.topLeft[1],
            z.bottomRight[0] - z.topLeft[0],
            z.bottomRight[1] - z.topLeft[1],
        )
        ctx.stroke()

        ctx.fillStyle = 'yellow'
        e.scaledMesh.forEach(i=>{
            ctx.fillRect(i[0], i[1], 1.5, 1.5)
        })
    })

}



setUpCam()




video.addEventListener('loadeddata', async ()=>{
    model = await faceLandmarksDetection.load( faceLandmarksDetection.SupportedPackages.mediapipeFacemesh )
    // detectFaces()

    setInterval(detectFaces, 100)

    // btn.addEventListener('click',()=>{
    //     detectFaces()
    // })
})