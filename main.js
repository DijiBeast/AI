scoreLeftWrist = 0;
scoreRightWrist = 0;
song = "";
leftwristX = "";
leftwristY = "";
rightwristX = "";
rightwristY = "";
function preload()
{
     song = loadSound("music.mp3");
}


function setup()
{
    canvas = createCanvas(500, 500)
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function modelLoaded()
{
    console.log("Model Loaded!!!");
}



function draw()
{
    image(video, 0, 0, 500, 500);
    fill("#fcdf03");
    stroke("#4503fc");
    if (scoreRightWrist > 0.2)
    {
    circle(rightwristX, rightwristY, 30);

    if (rightwristY > 0 && rightwristY<=100)
    {
        document.getElementById("speed").innerHTML = "Speed = 0.5x";
        song.rate(0.5);
    }

    else if (rightwristY > 100 && rightwristY<=200)
    {
        document.getElementById("speed").innerHTML = "Speed = 1x";
        song.rate(1);
    }

    else if (rightwristY > 200 && rightwristY<=300)
    {
        document.getElementById("speed").innerHTML = "Speed = 1.5x";
        song.rate(1.5);
    }

    else if (rightwristY > 300 && rightwristY<=400)
    {
        document.getElementById("speed").innerHTML = "Speed = 2x";
        song.rate(2);
    }

    else if (rightwristY > 400 && rightwristY<=500)
    {
        document.getElementById("speed").innerHTML = "Speed = 2.5x";
        song.rate(2.5);
    }
    }

    if(scoreLeftWrist > 0.2)
    {
    circle(leftwristX, leftwristY, 30);
    InNumberleftwristY = Number(leftwristY);
    removeDecimals = floor(InNumberleftwristY);
    Volume = removeDecimals/500;
    document.getElementById("volume").innerHTML = "Volume " + Volume;
    song.setVolume(Volume);
    }

}
                                                                 

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        leftwristX = results[0].pose.leftWrist.x;
        leftwristX = results[0].pose.leftWrist.y;


        rightwristX = results[0].pose.rightWrist.x;
        rightwristX = results[0].pose.rightWrist.y;
        console.log("Left wrist x = " + leftwristX + " Left wrist y = " + leftwristY);
        console.log("Right wrist x = " + rightwristX + " Right wrist y = " + rightwristY);


        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("Left wrist score = " + scoreLeftWrist + " Right wrist score = " + scoreRightWrist);
    }
}