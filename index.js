
async function main(){ 
const startButton = document.getElementById('startBtn');
const stopButton = document.getElementById('stopBtn');
const downloadButton = document.getElementById('downloadBtn');
const app = document.getElementById('root');
const videoPrev = document.getElementById('videoPreview');
const recordedVideo = document.getElementById('recordedVideo');

const videoMediaConstraints = await navigator.mediaDevices.getUserMedia({ 
    // or you can set audio to false  
    // to record only video 
    audio: true, 
    video: true
}); 
  
videoPrev.srcObject = videoMediaConstraints; 

if (!MediaRecorder.isTypeSupported('video/webm')) { // <2>
    console.warn('video/webm is not supported')
  }

  const mediaRecorder = new MediaRecorder(videoMediaConstraints, { // <3>
    mimeType: 'video/webm',
  })

startButton.addEventListener('click',() =>{
    mediaRecorder.start(); 
    startButton.setAttribute('disabled', '')
    stopButton.removeAttribute('disabled')
})

stopButton.addEventListener('click', () => {
    mediaRecorder.stop() 
    startButton.removeAttribute('disabled')
    stopButton.setAttribute('disabled', '')
  })

  mediaRecorder.addEventListener('dataavailable', event => {
    recordedVideo.src = URL.createObjectURL(event.data) // <6>
  })

  //download button 
  downloadButton.addEventListener('click', () => {
    const link = document.createElement('a')
    const url = URL.createObjectURL(recordedVideo)
  
    link.href = url
    link.download = recordedVideo.name
    document.body.appendChild(link)
    link.click()
  
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  })

  //creating div 
const container = document.createElement('div');
container.setAttribute('class', 'container');
app.appendChild(container);
}

main()