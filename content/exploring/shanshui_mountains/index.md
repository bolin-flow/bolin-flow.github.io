+++
title = "Explore Ye Qianqian's Shan Shui"
date = 2024-08-11T11:11:56-04:00
draft = false
tags = ['Generative Art', 'Creative Coding']
showTableOfContents = false

+++

The link of [the original work](https://qianqian-ye.com/Everyday/Day46/). 

<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js"></script>

<div id="sketch-holder"></div>

<script>
    var num = 5;
    var mountains = [];

    function setup() {

    let canvasWidth = windowWidth * 0.6;  // 80% of the window width
    let canvasHeight = windowHeight * 0.8; // 60% of the window height
    let canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent('sketch-holder');
    shanShui();
    }

    function draw() {
        background(255);
        noStroke();
        ellipse(100, 100, 80, 80);
        for (var i = 0; i < mountains.length; i++) {
            mountains[i].show();
        }
    }

    function shanShui() {
        for (var i = 0; i < num; i++) {
            mountains.push(new curveLine(i));
        }
    }

    function curveLine(_index) {
        var index = _index;
        var screen = 2000;
        var screenHeight = 800;
        var base = random(screen / 4, screen / 2); 
        var start = random(-screen / 2, screen / 2); 

        this.show = function () {
            var ink = 20;

            var c = color(0, 0, 0, ink);
            fill(c);
            stroke(c);

            var xoffset = map(mouseX, 0, screen, -100, 100) * (index + 1);

            for (var x = start; x < base + start; x++) {
                var mapLoc = map(x, start, base + start, 0, 1);
                var edgePercent = 0.2;

                if (mapLoc < edgePercent) {
                    stroke(0, 0, 0, (mapLoc * (1 / edgePercent)) * ink);
                } else if (mapLoc > abs(1 - edgePercent)) {
                    var inverseLoc = abs(1 - mapLoc);
                    stroke(0, 0, 0, (inverseLoc * 1 / edgePercent) * ink);
                }

                var nx = map(x, 0, screen, 0, 10);
                var y = screenHeight * (noise(nx + index * 10) * 0.7);
                var xPos = x + xoffset;

                line(xPos, y, xPos, y + (screenHeight - y) / 2);
                line(xPos, y, xPos, y + (screenHeight - y) / 4);
                line(xPos, y, xPos, y + (screenHeight - y) / 8);
                line(xPos, y, xPos, y + (screenHeight - y) / 16);
            }
        }
    }
</script>

<style>
  #sketch-holder {
    position: relative;
    width: 100%;
    height: 100vh; /* Full viewport height */
  }

  canvas {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
  }
</style>
