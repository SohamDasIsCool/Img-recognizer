camera=document.getElementById("camera");
Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});
Webcam.attach('#camera');

console.log('ml5 version:',ml5.version);

function take_snapshot(){
 Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML='<img id="capture_image" src="'+data_uri+'"/>'
    });
}

classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/hCl2lVZEW/model.json',ModelLoaded);

function ModelLoaded() {
    console.log('Model Loaded!')
}

function check() {
    img=document.getElementById('capture_image');
    classifier.classify(img,gotResult);
}

function gotResult(error,results) {
if(error){
    console.error(error);
}
else{
    console.log(results);
    document.getElementById("result_object_name").innerHTML=results[0].label;
    document.getElementById("result_object_accuracy").innerHTML=results[0].confidence.toFixed(3);
}
}