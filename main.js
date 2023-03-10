img="";
sound="";
status="";
objects=[];

function preload()
{
    img = loadImage('dog_cat.jpg');
    sound = loadSound('alarm.mp3');
}

function setup()
{
    canvas = createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
}

function start()
{
    detection = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded()
{
    console.log("Model Loaded");
    status = true;
}

function gotResult(error, results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);
    objects=results;
}
function draw()
{
    image(video,0,0,380,380);

    if(status != "")
    {
        r = random(255);
        g = random(255);
        b = random(255);
        detection.detect(video, gotResult);
        for(i=0;i<objects.length;i++)
        {
            document.getElementById("status").innerHTML="Status : Object Detected";
            document.getElementById("number_of_objects").innerHTML="Number of Objects : "+objects.length;
            fill(r,g,b);
            a=floor(objects[i].confidence*100);
            text(objects[i].label+" "+a+"%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            if(objects[i].label=="person")
            {
                document.getElementById("status2").innerHTML="Baby is found";
                sound.stop()
            }
            else
            {
                document.getElementById("status2").innerHTML="Baby is not found";
                sound.play()

            }
        }
        if(object.length==0)
        {
            document.getElementById("status2").innerHTML="Baby is not found";
            sound.play() 
        }
    }
    
}

