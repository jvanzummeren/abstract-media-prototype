define([
 "jquery",
 "stage/pixi",
 "stage/actions/actions",
 "stage/events/startevent",
 "stage/events/tapevent",
 "stage/events/tiltevent"
 ], function($, PIXI, Actions, StartEvent, TapEvent, TiltEvent) {
    //BUNNY
    var Bunny = function(){
        return {
            sprite : null,
            deltaY : 0,
            floorY : 450,
            actionDone : null,
            currentAction : null,
            events : [],

            createSprite : function(){
                var texture = PIXI.Texture.fromImage("bunny.png");
                this.sprite = new PIXI.Sprite(texture);

                this.sprite.anchor.y = 0.5;
                this.sprite.anchor.x = 0.5;

                this.sprite.interactive = true;
                this.sprite.buttonMode = true;

                this.sprite.position.x = Math.random() * 1024;
                this.sprite.position.y = Math.random() * 768;
                
                return this.sprite;
            },

            performActions : function(scripts){ 
                var that = this; 
                $(scripts).each(function(){

                    var actions = new Actions();
                    actions.init(this.script);

                    if(this.type == "start"){
                        var startEvent = new StartEvent(that.sprite);
                        startEvent.initialize(actions);
                        that.events.push(startEvent);
                    }

                    if(this.type == "tap"){
                        var tapEvent = new TapEvent(that.sprite);
                        tapEvent.initialize(actions);
                        that.events.push(tapEvent);  
                    }

                    if(this.type == "tilt-left-right"){
                        
                        var tiltEvent = new TiltEvent(that.sprite).setDirection("LR");
                        tiltEvent.initialize(actions);
                        that.events.push(tiltEvent);  
                    }

                    if(this.type == "tilt-up-down"){
                        var tiltEvent = new TiltEvent(that.sprite).setDirection("UD");
                        tiltEvent.initialize(actions);
                        that.events.push(tiltEvent);  
                    }

                });
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

            animate : function(){
                var that = this;

                $(this.events).each(function(){
                    this.render(that.sprite);
                });                                  
            }

        }
    };
    return Bunny;
});
