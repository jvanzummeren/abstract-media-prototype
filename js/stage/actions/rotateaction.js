define([
 ], function() {

    function RotateAction(){

    	return {
             x: 0,
             y: 0,
             speed : 0,

             setMaxDelta : function(degrees){
                
                this.speed = 8;
                this.remainingRotation = degrees * (Math.PI/180);

                return this;
             },
             removeMaxDistance : function(){
                this.speed = 0;
                this.remainingRotation = undefined;
             },

             setSpeed : function(speed){
                this.speed = speed / 1000;
             },

             //frames
             render : function(clip, lastTime){
                var currentTime = new Date().getTime();
                var timeDelta = currentTime - lastTime;

                //rotation
                var positiveRotation = (this.remainingRotation > 0);
                var targetDeltaRotation = this.speed * (timeDelta / 1000);

                if(this.remainingRotation < 0) targetDeltaRotation *= -1;

                if(this.remainingRotation != 0){
                    clip.rotation += targetDeltaRotation;

                    this.remainingRotation -= targetDeltaRotation;
                }

                var newPositiveRotation = (this.remainingRotation > 0);

                if(positiveRotation != newPositiveRotation){  
                    clip.rotation += this.remainingRotation;   
                    this.actionFinished();
                }

             },

             done : function(actionFinished){
                this.actionFinished = actionFinished;
             },

    	}
    }
    
    return RotateAction;
});