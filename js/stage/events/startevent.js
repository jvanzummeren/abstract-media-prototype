define([
 ], function() {

 	var StartEvent = function(clip){
 		return {

 			initialize : function(actions){
 				this.actions = actions;

 				this.lastTime = new Date().getTime();
 				this.performAction();
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

 	return StartEvent;

 });