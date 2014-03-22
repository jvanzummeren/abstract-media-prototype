define([
 "jquery",
 "stage/pixi",
 "stage/bunny.sprite",
 "stage/star.sprite",
 ], function($, PIXI, Bunny, Star) {
    
    var Level = function(){
    	return {
           $el : null,
           stage : null,
		   bunnies : [],
           stars : [],
           levelContainer : null,
           
           initialize : function($el, stage, renderer){
                this.$el = $el; 
                this.stage = stage;
                this.renderer = renderer;              

                $(this.renderer.view).appendTo($el);
           },

           remove : function(){
                if(this.levelContainer){
                    this.stage.removeChild(this.levelContainer);
                }
                this.renderer = null;

                this.$el.html(''); 
                this.$el.hide();
           },

           show : function(){
                this.$el.show();
           },

           render: function(script){
                this.script = script;

                this.levelContainer = new PIXI.DisplayObjectContainer();
                this.stage.addChild(this.levelContainer);
                
                this.createStar();
	       		this.createStopButton();	       		

	       		var that = this;

                $(script).each(function(){
                    if(this.type == "bunny"){
                        var bunny = new Bunny();                   

                        var bunnySprite = bunny.createSprite();
                        that.levelContainer.addChild(bunnySprite);
                        bunny.performActions(this.script);
                        that.bunnies.push(bunny);
                    }

                });

                
	       },


           /*,
        
           collission : function(){
           		var that = this;

                for(var i=0; i< this.bunnies.length; i++){
                    var bunny = this.bunnies[i];

                    for(var j=0; j < this.stars.length; j++){
                        var star = this.stars[j];
                        if(hitTest(bunny.sprite, star.sprite)){
                            this.stars.splice(j,1);

                            star.remove().removeComplete(function(starSprite){
                            	that.levelContainer.removeChild(starSprite);
                            });

                            this.createStar();
                        
                        }   
                    }
                }
            }*/

            createStopButton : function(){
				var texture = PIXI.Texture.fromImage("stop.png");
	            this.stopButton = new PIXI.Sprite(texture);

	            var that = this;
	            this.stopButton.interactive = true;
	            this.stopButton.mousedown = this.stopButton.touchstart = function(data){
	                that.stopButtonTapped();
	            }

	            this.levelContainer.addChild(this.stopButton);
            },

            stopButtonTapped : function(){
            	//requires|\ override
            },

            createStar : function(){
                var star = new Star();
                var starSprite = star.createSprite();
                
                this.levelContainer.addChild(starSprite);
                this.stars.push(star);
            },

            updateFrame : function(){                
            	 if(!this.renderer) return;

                for(var i=0; i < this.bunnies.length; i++){
                    this.bunnies[i].animate();
                }

                for(var i=0; i < this.stars.length; i++){
                    this.stars[i].animate();
                }

                this.renderer.render(this.stage);
            }
    	}
    }

    return Level;
});