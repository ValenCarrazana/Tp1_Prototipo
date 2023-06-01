class Triangulos {
  constructor() {
    this.triangles = [];
    this.duracion = 200; // Duración de medio segundo entre la generación de triángulos
    this.tiempoInicial = 0;
    this.tamMinimo =random(100,130); // Tamaño mínimo para evitar superposición
    this.tamMaximo =random(250,300); // Tamaño máximo para evitar superposición
    this.img;
  }

  cargar() {
    this.img = loadImage('img/recurso1.png');
  }
  dibujarTriangulos() {
    // CONTADOR
    if (!this.tiempoInicial) {
      this.tiempoInicial = millis();
    }
  
    // DEFINIR MILLIS
    let tiempoActual = millis();
  
    // CANTIDAD DE TRIANGULOS EN RELACION AL TAMANO DEL LIENZO
    let totalTriangulos = 50;
  
    // GENERAR TRIÁNGULOS HASTA LLENAR EL LIENZO SIN SUPERPOSICIÓN
    while (this.triangles.length < totalTriangulos && tiempoActual > this.tiempoInicial + this.duracion) {
      let tam = random(this.tamMinimo, this.tamMaximo);
      let radius = tam / 2;
  
      // POSICION PARA EVITAR LA SUPERPOSICION DEL TRIANGULO
      let posicionValida = false;
      let x, y;

      while (!posicionValida) {
        x = random(-width / 2, width / 2);
        y = random(-height / 2, height / 2);
  
        // VERIFICAR SI SE SUPERPONE
        let seSuperpone = false;
  
        for (let i = 0; i < this.triangles.length; i++) {
          
          let t = this.triangles[i];
          let d = dist(x, y, t.x, t.y);
  
          if (d < radius + t.radius/2) {
            seSuperpone = true;
            break;
          }
        }
  
        if (!seSuperpone) {
          posicionValida = true;
        }
      }
  
      let angle = random(TWO_PI);
  
      // COORDENADAS DE LOS VERTICES DEL TRIANGULO
      let x2 = x + radius * cos(angle);
      let y2 = y + radius * sin(angle);
      let x3 = x + radius * cos(angle + TWO_PI * random(0.33, 0.53));
      let y3 = y + radius * sin(angle + TWO_PI * random(0.33, 0.43));
      let x1 = x + radius * cos(angle - TWO_PI * random(0.33, 0.43));
      let y1 = y + radius * sin(angle - TWO_PI * random(0.33, 0.53));
  
      this.triangles.push({ x, y, x1, y1, x2, y2, x3, y3, radius });
  
      // ACTUALIZAR TIEMPO
      this.tiempoInicial = tiempoActual;
    }
  }
  

  colores() {
    // Dibujar los triángulos
    for (let i = 0; i < this.triangles.length; i++) {
      let t = this.triangles[i];

      strokeWeight(2);
      triangle(t.x1, t.y1, t.x2, t.y2, t.x3, t.y3);
    }
  }

  textura(x) {
    if (x < width / 2) {
      noFill();
    } else {
      texture(this.img);
    }
  }
}
