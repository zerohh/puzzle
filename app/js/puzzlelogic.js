/**
 * Created by dell on 2017/11/23.
 */
const $ = require('jquery');
//拼图过程，touchstart的时候记录起始位置dx,dy,touchmove的时候通过当前位置减去起始位置得到图片到目标位置的偏移量，touchend的时候做图片切换
let dx//触点起始位置的x轴
    ,dy//触点起始位置的y轴
    ,picWidth//每张小图片的宽度
    ,picHeight//每张小图片的高度
    ,picBoxWidth//拼图盒子的宽度
    ,picBoxHeight//拼图盒子的高度
    ,successStr//判断成功的字符串，实际上就是有几张图片，按照顺序排列的字符串
    ,imgnum//图片的数量
    ,selector//拼图盒子的选择器，用于获取图片位置更换后，图片的顺序，以便检查拼图是否成功
    ,continueflag//用于判断是否还有任务需要挑战的
    ,callback//用于判断完成后，是否继续下一次任务
    ;
let picestemp ;
function initPuzzle(pices,successFlag,imgtotals,selectorid,continuef,func) {
    continueflag = continuef;
    callback = func;
    successStr = successFlag;
    imgnum = imgtotals;
    selector = selectorid
    picWidth = pices[0].offsetWidth;
    picHeight = pices[0].offsetHeight;
    picBoxWidth = $(".Checkpoint1")[0].offsetWidth;
    picBoxHeight = $(".Checkpoint1")[0].offsetHeight;
    picestemp = pices;
    for(let n =0 ; n < pices.length ;n++){
        //为小图片添加监听事件，用于记录触点开始位置和触点所在位置的图片的偏移量
        pices[n].addEventListener('touchstart',function (e) {
            e.preventDefault();
            this.style.zIndex = 100;
            dx = e.targetTouches[0].pageX - this.offsetLeft;
            dy = e.targetTouches[0].pageY - this.offsetTop;
            this.style.transition='none';
            this.startX = this.offsetLeft;
            this.startY = this.offsetTop;
        });
        //为小图片添加事件，用于处理，触摸开始移动后，图片应该如何显示
        pices[n].addEventListener('touchmove',function (e) {
            if(e.targetTouches.length == 1){
                e.preventDefault();
                let tempx = e.targetTouches[0].pageX-dx;
                let tempy = e.targetTouches[0].pageY-dy;
                //判断图片的偏移是否在当前整张图片中
                if(tempx < 0 ){
                    tempx = 0;
                } else if(tempx > picWidth*(Math.sqrt(imgtotals)-1)){
                    tempx = picWidth*(Math.sqrt(imgtotals)-1)
                }
                if(tempy <0 ){
                    tempy = 0;
                } else if(tempy > picHeight*(Math.sqrt(imgtotals)-1)){
                    tempy = picHeight*(Math.sqrt(imgtotals)-1);
                }
                this.style.left=tempx+'px';
                this.style.top=tempy+'px';
            }
        });
        //为小图片添加监听事件，用于处理触摸结束后图片是否需要互换，还是回到原来的位置
        pices[n].addEventListener('touchend',function (e) {
            e.preventDefault();
            this.style.zIndex = 4;
            this.style.transition='all 0.3s ease 0s';
            this.endX = e.changedTouches[0].pageX-dx;
            this.endY = e.changedTouches[0].pageY-dy;
            let obj = change(e.target,this.endX,this.endY);
            if(obj == e.target){
                obj.style.left = this.startX + "px";
                obj.style.top = this.startY + "px";
            }else{
                //当前元素和目标元素x轴坐标互换
                let _left = obj.style.left;
                obj.style.left = this.startX +"px";
                this.style.left = _left;
                //当前元素和目标元素y轴坐标互换
                let _top = obj.style.top;
                obj.style.top = this.startY + "px";
                this.style.top = _top;
                //当前元素和目标元素的data-index交换
                let _index = obj.getAttribute('data-index');
                obj.setAttribute('data-index',this.getAttribute('data-index'));
                this.setAttribute('data-index',_index);
                //判断拼图是否成功
                checkSuccess();
            }
        });
    }

}
//用于获取需要交换的目标元素，将每张图片的偏移量与触摸结束时候的触点的位置进行比较，判断是否需要移动图片，如果是则返回目标图片，如果不是则返回本身（就是不进行图片移动）
    function change(obj,x,y) {
        for(let m = 0 ; m < picestemp.length ; m++){
            if(Math.abs(picestemp[m].offsetLeft - x)<=picWidth/Math.sqrt(imgnum) && Math.abs(picestemp[m].offsetTop - y )<=picHeight/Math.sqrt(imgnum) && picestemp[m]!=obj){
                return picestemp[m];
            }
        }
        return obj;
    }
//随机选择两个图片函数，随机打乱20次
function changeRandom() {
    for(let s = 0 ; s < 20;s++){
        let element1 = picestemp[Math.floor(Math.random()*imgnum)];
        let element2 = picestemp[Math.floor(Math.random()*imgnum)];
        if(element1!=element2){
            changeRandomNow(element1,element2);
        }
    }
}
//交换随机出来的两张图片
function changeRandomNow(a,b) {
    let _left = a.style.left;
    a.style.left = b.style.left;
    b.style.left = _left;

    let _top = a.style.top;
    a.style.top = b.style.top;
    b.style.top = _top;

    let _index = a.getAttribute('data-index');
    a.setAttribute('data-index', b.getAttribute('data-index'));
    b.setAttribute('data-index',_index);
}
//检查拼图是否成功
function checkSuccess() {
    let tempPices = document.querySelectorAll(selector);
    let strTemp = '';
    for(let d = 0; d < tempPices.length ;d++){
        strTemp += tempPices[d].getAttribute('data-index');
    }
    if(strTemp == successStr){
        setTimeout(function () {
            callback();
        },400);
    }
}

module.exports.initPuzzle = initPuzzle;
module.exports.change = change;
module.exports.changeRandom = changeRandom;
module.exports.changeRandomNow = changeRandomNow;
module.exports.checkSuccess = checkSuccess;