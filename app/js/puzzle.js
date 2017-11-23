/**
 * Created by dell on 2017/11/20.
 */
const $ = require('jquery');
const Puzzle = require('./puzzlelogic');
const imgwidth = 1310;//图片宽度
const imgheight = 1920;//图片高度
const aspectratio = (imgwidth/imgheight).toFixed(2);
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
        Puzzle.initPuzzle(document.querySelectorAll('.pic'),'1234',4,".pic",true,function () {
            $('#id3').fadeOut(250);
            $('#id4').fadeIn(200);
            Puzzle.initPuzzle(document.querySelectorAll('.point2'),'123456789',9,".point2");
            Puzzle.changeRandom();
        });
        Puzzle.changeRandom();
    });
});