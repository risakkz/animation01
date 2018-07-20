var TimelinePlus = {};

// FLASHer御用達のserial/parallelをTweenMax(JS)で
// https://qiita.com/yuichiroharai/items/55b0a850ff68d3b7e3fc

TimelinePlus.serial = function() {
  var i, len, tl;

  tl = new TimelineMax();

  len = arguments.length;
  for (i=0;i<len;i++) {
    tl.add(arguments[i]);
  }
  return tl;
}

TimelinePlus.parallel = function() {
  // argumentsを直接addしたら、なんかエラー出たのでコピー
  var args = Array.prototype.slice.call(arguments, 0);

  return new TimelineMax().add(args);
}

$(function(){

   var $light1 = $('.light1'); 
   var $light2 = $('.light2'); 
   var $light3 = $('.light3'); 
   var $light4 = $('.light4');

   TimelinePlus.serial(
      TweenMax.to('html',0.1, {"--color1" : "#ff0","--color2" : "#0ff","--color3" : "#90f","--color4" : "#f0f",delay:0.4}),
      TweenMax.to('html',0.1, {"--color1" : "#0ff","--color2" : "#90f","--color3" : "#f0f","--color4" : "#ff0",delay:0.4}),
      TweenMax.to('html',0.1, {"--color1" : "#90f","--color2" : "#f0f","--color3" : "#ff0","--color4" : "#0ff",delay:0.4}),
      TweenMax.to('html',0.1, {"--color1" : "#f0f","--color2" : "#ff0","--color3" : "#0ff","--color4" : "#90f",delay:0.4}),
   ).repeat(-1)

   TimelinePlus.serial(
        TweenMax.to($light1, 0.5, {
            y: "-=20"
        }),
        TimelinePlus.parallel(
            TweenMax.to($light1, 0.5, {
                y: 0
            }),
            TweenMax.to($light2, 0.5, {
                y: "-=20"
            })),
        TimelinePlus.parallel(
            TweenMax.to($light3, 0.5, {
                y: "-=20"
            }),
            TweenMax.to($light2, 0.5, {
                y: 0
            })
        ),
        TimelinePlus.parallel(
            TweenMax.to($light4, 0.5, {
                y: "-=20"
            }),
            TweenMax.to($light3, 0.5, {
                y: 0
            })
        ),
        TweenMax.to($light4, 0.5, {
            y: 0
        })
    ).repeat(-1)
});
