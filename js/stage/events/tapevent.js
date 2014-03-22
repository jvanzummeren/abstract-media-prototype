define([
 ], function() {

 	var TapEvent = function(clip){
 		return {

 			initialize : function(actions){
 				this.actions = actions;

 				var that = this;
                clip.mousedown = clip.touchstart = function(data)
                {
                   	that.lastTime = new Date().getTime();
 					that.actions.reset();
 					that.performAction(); 

                }


 			},

 			performAction : function(){
                var action = this.actions.getNext();

                if(!action){
                    this.currentAction = null;
                    return; 
                }

                var that = this;
                this.currentAction = action;

                action.done(function(){                        
                    that.performAction();
                });

            },

            render : function(){            	
                if(this.currentAction){
                    this.currentAction.render(clip, this.lastTime);  
                    this.lastTime = new Date().getTime();                        
                }                                      
            },
 		}
 	}

 	return TapEvent;

 });