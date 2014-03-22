define([
 ], function() {

 	var TiltEvent = function(clip){
 		return {
            direction : "beta",
 			initialize : function(actions){
 				this.actions = actions.getAllActions();
                this.lastTime = new Date().getTime();
                $(this.actions).each(function(){                   
                    this.removeMaxDistance();                  
                });

                //temp//
 				var that = this;

                window.addEventListener('deviceorientation', function(e){

                    var speed = e[that.direction]; 
                    if(that.direction == "beta") speed *= -1;
                    $(that.actions).each(function(){                   
                        this.setSpeed(speed);                        
                    });

                });
 			},

            setDirection : function(direction){
                if(direction == "LR") this.direction = "beta";
                if(direction == "UD") this.direction = "gamma";
                
                return this;
            },

            render : function(){   
                var that = this;
                
                $(this.actions).each(function(){
                    var action = this;                    
                    action.render(clip, that.lastTime); 
                    this.lastTime = new Date().getTime();  
                });

            },
 		}
 	}

 	return TiltEvent;

 });