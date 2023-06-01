//---SONIDO CONFIG---------------------------------------------------------------------------1--------------------
let AMP_MAX= 0.1;
let AMP_MIN= 0.01;
let IMPRIMIR = false;

//ENTRADA DE AUDIO
let mic;

//AMPLITUD
let amp;
let haySonido = false;


//----FRECUENCIA -----------------------------------------------------------------------------------------------
let audioContext; //motor de audio del navegador
let frecuencia; //variable donde cargo los valores de frecuencia del sonido de entrada
const pichModel = 'https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/';

let FREC_MIN = 800;
let FREC_MAX = 2000;


//Creamos triangulos
let t;



// let gradiente;


//------SETUP-------------------------------------------------------------------------------------------------------

function setup() {
  createCanvas(800, 800,WEBGL, { antialias: true });
  mic = new p5.AudioIn();
  mic.start(startPitch);
  userStartAudio();
  textureMode(NORMAL);
  t = new Triangulos();



  // gradiente = new Gradiente();
  t.cargar();



}

//-------DRAW-----------------------------------------------------------------------------------------------------

function draw() {
  amp = mic.getLevel();
  haySonido = amp > AMP_MIN;

  background(0,250,0); 
   if(haySonido){
    t.dibujarTriangulos();

   }
    t.colores();
    t.textura(haySonido*1000);




    
console.log('Frecuencia:', frecuencia);


  // gradiente.show();
}

//-------FRECUENCIA-----------------------------------------------------------------------------------------------------

function startPitch() {
  pitch = ml5.pitchDetection(pichModel, audioContext , mic.stream, modelLoaded);
}
function modelLoaded() {
  getPitch();
}

function getPitch() {
  pitch.getPitch(function(err, frequency) {
    if (frequency) {
      frecuencia = frequency;
     
    } else {
    }
    getPitch();
  })
}


