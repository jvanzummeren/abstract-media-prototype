 define([
 "jquery"
 ], function($) {
    var DragCoordinate = function(){
        return {
            dragMove : function(event){
                this.deltaX = event.pageX - this.startX;
                this.deltaY = event.pageY - this.startY;  
            },

            dragMoveTouch : function(event){
                this.deltaX = event.originalEvent.touches[0].pageX - this.startX;            
                this.deltaY = event.originalEvent.touches[0].pageY - this.startY;
            },

            dragStart : function(event){
                this.startX = event.pageX;
                this.startY = event.pageY; 
            },

            dragStartTouch : function(event){
                this.startX = event.originalEvent.touches[0].pageX;
                this.startY = event.originalEvent.touches[0].pageY;
            },

            getDelta : function(){
              return{
                x: this.deltaX,
                y: this.deltaY
              }
            }
        }
   }

   return DragCoordinate;
});