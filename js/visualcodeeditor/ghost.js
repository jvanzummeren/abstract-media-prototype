define([
 "jquery"
 ], function($) {

     var Ghost = function(){
        return {
          el : null,
          setElement : function(el){
            $(".ghost").remove();
            this.originalElement = el;
            this.el = el.clone();
            this.el.addClass("ghost");
            this.el.appendTo('body');

            this.startX = el.offset().left;
            this.startY = el.offset().top;
            console.log(el);
            console.log(el.offset());

            this.moveTo({x:0,y:0});
          },
          remove : function(animationType){

            if(!animationType){
              this.moveTo({x: -9999, y:-9999});
            }

            if(animationType == "fade"){

              this.el.animate({
                opacity: 0
              }, 200)

            }

            if(animationType == "reverse"){

              var targetLeft = this.originalElement.offset().left;
              var targetTop = this.originalElement.offset().top;

              this.el.animate({
                top: targetTop,
                left: targetLeft,
                opacity: 0
              }, 300)

            }


            var that = this;
            setTimeout(function(){
              that.el.remove();
              that.el = null;
            }, 300);
          },
          moveTo : function(position){
            if(this.el){
              this.el.css("left", position.x + this.startX);
              this.el.css("top", position.y + this.startY);
            }
          }
        }
     }

     return Ghost;

 });