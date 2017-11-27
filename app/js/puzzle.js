/**
 * Created by dell on 2017/11/20.
 */
const $ = require('jquery');
const Puzzle = require('./puzzlelogic');
const imgwidth = 1310;//图片宽度
const imgheight = 1920;//图片高度
const aspectratio = (imgwidth/imgheight).toFixed(2);
let checkPoint1Time = 0;
//设置页面的高度为手机的高度
$(function () {
    $("body").height = window.screen.height;
    let tempwidth = $("#id1").width();
    let tempheight = $("#id1").height();
    let tempaspectratio = (tempwidth/tempheight).toFixed(2);
    $(window).resize(function () {
        if(tempwidth > 768){
            if(tempaspectratio > aspectratio){
                tempwidth = tempheight*aspectratio;
            } else {
                tempheight = (tempwidth/aspectratio).toFixed(2);
            }
            let temppages = $(".page^");
            for(let m = 0 ; m < temppages.length ; m++){
                (function () {
                    $(temppages[m]).width(tempwidth);
                    $(temppages[m]).width(tempheight);
                })()
            }
        }
    });
    $(".startButton").on('click',function () {
        //切换的动画
        $('#id1').fadeOut(250);
        $('#id2').fadeIn(200);
    });
    $(".introductionButton").on('click',function () {
        $('#id2').fadeOut(250);
        $('#id3').fadeIn(200);
        let startTime = new Date();
        $("#useTime").text(0);
        $(".countTime").show();
        let intervalId = setInterval(function () {
            let tempCurrentTime = new Date();
            $("#useTime").text(((tempCurrentTime-startTime)/1000).toFixed(0));
        },1000);
        Puzzle.initPuzzle(document.querySelectorAll('.pic'),'1234',4,".pic",true,function () {
            $(".title1").fadeIn(250);
            clearInterval(intervalId);
            $("#endTime").text($("#useTime").text());
            checkPoint1Time = $("#useTime").text();
        });
        Puzzle.changeRandom();
    });
    $(".continueButton").on('click',function () {
        $(".title1").fadeOut(200);
        $('#id3').fadeOut(250);
        $('#id4').fadeIn(200);
        let startTime = new Date();
        $("#useTime").text(0);
        $(".countTime").show();
        let intervalId2 = setInterval(function () {
            let tempCurrentTime = new Date();
            $("#useTime").text(((tempCurrentTime-startTime)/1000).toFixed(0));
        },1000);
        Puzzle.initPuzzle(document.querySelectorAll('.point2'),'123456789',9,".point2",false,function () {
            $(".title2").fadeIn(200);
            clearInterval(intervalId2);
            $("#endTime2").text(checkPoint1Time);
            $("#endTime3").text($("#useTime").text());
            $(".countTime").fadeOut(100);
        });
        Puzzle.changeRandom();
    });
    $(".receiveRewardsButton").on('click',function () {
        $(".title2").fadeOut();
        $('#id4').fadeOut(250);
        $('#id5').fadeIn(200);
    });
    $(".invitation").on('click',function () {
        $(".title3").fadeIn(200);
    });
    $(".title3").on('click',function () {
        $(".title3").fadeOut(200);
    });
    $(".inputInfo").on('click',function () {
        $(".title3").fadeOut(200);
        $('#id5').fadeOut(250);
        $(".showThanks").fadeOut(0);
        $('#id6').fadeIn(200);
        $(".getReward").fadeIn(200);
    });
    $(".submitInfo").on('click',function () {
        $(".getReward").fadeOut(200);
        $(".showThanks").fadeIn(200);
    });
    $(".backShare").on('click',function () {
        $(".showThanks").fadeOut(200);
        $('#id5').fadeIn(200);
        $('#id6').fadeOut(250);
    });
});