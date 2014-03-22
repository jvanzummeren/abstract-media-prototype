define([
 ], function() {

    function ScaleAction(){

        return {
             x: 0,
             y: 0,
             speed : 0,

             setMaxDelta : function(scaleFactor){
                
                this.speed = 1;
                this.remainingScaleFactor = scaleFactor;

                return this;
             },

             removeMaxDistance : function(){
                this.speed = 0;
                this.remainingScaleFactor = undefined;
             },

             setSpeed : function(speed){
                this.speed = speed / 1000;
             },
             //frames
             render : function(clip, lastTime){
                var currentTime = new Date().getTime();
                var timeDelta = currentTime - lastTime;

                //rotation
                var positiveScaleFactor = (this.remainingScaleFactor > 0);
                var targetDeltaScaleFactor = this.speed * (timeDelta / 1000);

                if(this.remainingScaleFactor < 0) targetDeltaScaleFactor *= -1;

                if(this.remainingScaleFactor != 0){
                    clip.scale.x += targetDeltaScaleFactor;   
                    clip.scale.y = clip.scale.x;

                    this.remainingScaleFactor -= targetDeltaScaleFactor;
                }

                var newPositiveScaleFactor = (this.remainingScaleFactor > 0);

                if(positiveScaleFactor != newPositiveScaleFactor){  
                    clip.scale.x += this.remainingScaleFactor;   
                    clip.scale.y = clip.scale.x;
                    this.actionFinished();
                }

             },

             done : function(actionFinished){
                this.actionFinished = actionFinished;
             },

        }
    }
    
    return ScaleAction;
});