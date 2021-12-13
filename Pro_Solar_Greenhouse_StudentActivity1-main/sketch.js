//Global variables for images
var bg, sunR, sunL, s_pan, fan_anim,fan_img,display, g_house_img;

//Global variables for Sprites
var g_house, pan1,pan2,fan,fan2;

//Creating a ray group
var rayGroup;

//Creating temprature and voltage variables
var temp = 10
var panel1_voltage =0;
var panel2_voltage = 0;
var power_gen = 0;
var absorded1=0
var absorded2=0


function preload()
{
  sunR = loadImage("sunrays.png");
  sunL = loadImage("sunrays1.png");
  bg = loadImage("back.png")
  s_pan = loadImage("s_panel.png");
  fan_anim = loadAnimation("fan01.png","fan02.png","fan03.png","fan04.png","fan05.png");
  fan_img = loadImage("fan01.png");
  display = loadImage("disp.png");
  g_house_img = loadImage("greenhouse.png")
  tex =loadImage("text.png")
}

function setup() 
{
  createCanvas(500, 900);
  
  
  g_house = createSprite(230,300,100,100);
  g_house.addImage(g_house_img);
  g_house.scale = 0;
  g_house.debug = false;
  g_house.setCollider("circle",+100,80,600)

  pan1 = createSprite(100,height-50,80,80);
  pan1.addImage(s_pan);
  pan1.scale = 0.75;
  pan1.scale=0.0

  pan2 = createSprite(width-150,height-50,80,80);
  pan2.addImage(s_pan);
  pan2.scale = 0.75;
  pan2.scale=0.0
  
  fan = createSprite(150,250,20,20);
  fan.addImage(fan_img);
  fan.scale = 0.6;
  fan.addAnimation('run',fan_anim);
  
  fan2 = createSprite(295,250,20,20);
  fan2.addImage(fan_img);
  fan2.scale = 0.6;
  fan2.addAnimation('run',fan_anim);
  textSize(15);


var  text=createSprite(200,500,1,1)
text.addImage("text",tex)
text.scale=0.3

  raysGroup = createGroup()
  
}

function draw() 
{
  background(220);
  
  image(bg,0,0,width,height);
  image(display,300,10,200,60)
  power_gen = panel1_voltage + panel2_voltage
  
  push();
  noStroke();
  fill(255,255,0)
  text("Voltage : ",340,37)
  text(power_gen,450,37)

  text("Temprature : ",340,56)
  text(temp,450,56);
  pop();
  
  makeRay();
  
  //Calculate Wattage
  panel1_voltage=round(absorded1*1)
  panel2_voltage=round(absorded2*1)
  
  
  // Write conditions to start the first fan will be temp should be more than 30 and power_gen > =4.
  //And the second fan will start when temp >= 30 and power_gen >= 4.
  if(power_gen>=8 && temp>=1){

    fan.changeAnimation('run')
    temp=temp-1
panel2_voltage=panel2_voltage-1
  }
                         if(power_gen>=1 && temp>=1){

                  fan2.changeAnimation('run')
               temp=temp-0.5
            panel1_voltage=panel1_voltage-1
  }
  
  
  
  drawSprites();  
}

function makeRay()
{
  
   if (frameCount % 60 === 0) 
   {
    var x = Math.round(random(10,350));
    rayL = createSprite(x,50,10,10);
    var xr = Math.round(random(350,750));
    rayR = createSprite(xr,50,10,10);
    rayL.addImage(sunL);
    rayR.addImage(sunR);
    rayL.scale = 0.08;
    rayR.scale = 0.08;
    vx = random(-1,1);
    raysGroup.add(rayL);
    raysGroup.add(rayR);
    raysGroup.setVelocityYEach(2)
    raysGroup.setVelocityXEach(vx)
    raysGroup.setLifetimeEach(134)
     
     //Add collision functions and callback functions
     
     
     
     
   }
            raysGroup.overlap(pan1,charge1)
            raysGroup.overlap(pan2,charge2)
            raysGroup.overlap(g_house,temp_rise)


}
//Create function for charge1, charge2 & temp_rise
function charge1(sprA){
  sprA.remove()
  absorded1=absorded1+1
  
  
  }
  function charge2(sprA){
    sprA.remove()
    absorded2=absorded2+1
    
    
    }
      function temp_rise(sprb) {
sprb.remove()
temp=temp+1

      }



      





