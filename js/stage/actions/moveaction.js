define([
 ], function() {

    function MoveAction(){

    	return {
             x: 0,
             y: 0,
             speed : 0,
             radians : 0,

             setMaxDistance : function(distance){
                // Converts from degrees to radians.
                Math.radians = function(degrees) {
                  return degrees * Math.PI / 180;
                };

                this.speed = 100;

                this.distance = distance;
                this.remainingDistance = distance;

                return this;
             },

             removeMaxDistance : function(){
               this.remainingDistance = undefined;          

             },

             setSpeed : function(speed){
                this.speed = speed / 30;
                return this;
             },

             setDegrees : function(degrees){
                this.radians = Math.radians(degrees);
                return this;
             },

             //frames
             render : function(clip, lastTime){
                var radians = clip.rotation + this.radians;

                var currentTime = new Date().getTime();
                var timeDelta = currentTime - lastTime;
                var targetDistance = this.speed * (timeDelta / 1000);
                
                if(this.remainingDistance < targetDistance){
                    targetDistance = this.remainingDistance;
                }

                var moveX = Math.sin(radians) * targetDistance;
                var moveY = Math.cos(radians) * targetDistance;
               
                clip.position.x += moveX;
                clip.position.y -= moveY;


                if(this.remainingDistance == targetDistance){
                    console.log("done!!");
                    this.actionFinished();
                }
                this.remainingDistance -= targetDistance;

                //Check for max/min X
                if(clip.position.x < 0) clip.position.x = 0;
                if(clip.position.x > 1024) clip.position.x = 1024;

                //check for max/min Y
                if(clip.position.y < 0) clip.position.y = 0;
                if(clip.position.y > 768) clip.position.y = 768;

             },

             done : function(actionFinished){
                this.actionFinished = actionFinished;
             },

    	}
    }
    
    return MoveAction;
});