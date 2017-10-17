/*
* Discription: 智听写窗口操作以及与答题宝数据交互(窗口传递)
* Author:njfu
* Date:2017-09-30
*/
var gui = require('nw.gui');
var win = gui.Window.get();
// win.showDevTools(); //打开调试口

/*
* 智听写窗口事件绑定-数据传递
*
*/
win.on("test1",function(data){
    console.log("click test1");
    console.log(data);
});
win.on("test2",function(data){
    console.log("click test2");
    console.log(data);
});
win.on("test3",function(data){
    console.log("click test3");
    console.log(data);
});

/*
* 智听写窗口上的一些操作
*
*/
var winAction = function () {
};
//最小化
winAction.prototype.minimize = function () {
    win.minimize();
};
//关闭
winAction.prototype.close = function () {
    win.close();
};
//全屏-不遮挡工具栏
winAction.prototype.fullScreen = function () {
    var width = window.screen.availWidth;
    var height = window.screen.availHeight;
    win.moveTo(window.screen.availLeft,window.screen.availTop);
    win.resizeTo(width, height);
};
//全屏-遮挡工具栏
winAction.prototype.deepFullScreen = function () {
	win.enterFullscreen();
};

export default {
  winAction:new winAction(),
  win:win
}
