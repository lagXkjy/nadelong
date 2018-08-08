Page({
  data: {},
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数  
  },
  onReady: function () {

    var cxt_arc = wx.createCanvasContext('canvasArc');//创建并返回绘图上下文context对象。  
    cxt_arc.setLineWidth(6);
    cxt_arc.setStrokeStyle('#d2d2d2');
    cxt_arc.setLineCap('round')
    cxt_arc.beginPath();//开始一个新的路径  
    cxt_arc.arc(60, 60, 50, 0, 2 * Math.PI, false);//设置一个原点(106,106)，半径为100的圆的路径到当前路径  
    cxt_arc.stroke();//对当前路径进行描边  
    // var context = wx.createCanvasContext('canvasArc')
    // context.setStrokeStyle("#d2d2d2")
    // context.setLineWidth(2)
    // context.arc(50,50,5,0,2*Math.PI)
    // context.stroke()
   
    // context.setStrokeStyle("red")
    // context.arc(50, 50, 5, 0, Math.PI)
    // context.stroke()
    
    // context.setStrokeStyle("#d2d2d2")
    // context.setLineWidth(5)
    // context.rect(0, 0, 200, 200)
    // context.stroke()
    // context.setStrokeStyle("#d2d2d2")
    // context.setLineWidth(2)
    // context.moveTo(160, 100)
    // context.arc(100, 100, 60, 0, 2 * Math.PI, true)
    // context.moveTo(140, 100)
    // context.arc(100, 100, 40, 0, Math.PI, false)
    // context.moveTo(85, 80)
    // context.arc(80, 80, 5, 0, 2 * Math.PI, true)
    // context.moveTo(125, 80)
    // context.arc(120, 80, 5, 0, 2 * Math.PI, true)
    // context.stroke()
    // context.draw()
  
    cxt_arc.setLineWidth(6);
    cxt_arc.setStrokeStyle('#3ea6ff');
    cxt_arc.setLineCap('round')
    cxt_arc.beginPath();//开始一个新的路径  
    cxt_arc.arc(60, 60, 50, -Math.PI * 1 / 2, Math.PI * 6 / 5, false);
    cxt_arc.stroke();//对当前路径进行描边  
    cxt_arc.draw()
 

  },
  onShow: function () {
    // 页面显示  
  },
  onHide: function () {
    // 页面隐藏  
  },
  onUnload: function () {
    // 页面关闭  
  }
})  