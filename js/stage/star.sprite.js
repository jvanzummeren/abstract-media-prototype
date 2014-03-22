 define([
 "jquery",
 "stage/pixi"
 ], function($, PIXI) {
    //STAR
     var Star = function(){
        return {
            sprite : null,
            createSprite : function(){
                var texture = PIXI.Texture.fromImage("star.png");
                this.sprite = new PIXI.Sprite(texture);

                this.sprite.position.x = 100 + Math.random() * 300;
                this.sprite.position.y = 320;

                return this.sprite; 
                 
            },

            remove : function(){
                var that = this;
                this.interval = setInterval(function(){
                    that.sprite.rotation += 0.1;
                    that.sprite.scale.x += 0.1;
                    that.sprite.scale.y += 0.1;
                    that.sprite.alpha -= 0.1;


                    if(that.sprite.alpha <= 0){
                        clearInterval(that.interval);
                        that.callback(that.sprite);                            
                    }   
                }, 35);

                return this;

                
            },
            removeComplete : function(callback){
                this.callback = callback;
            },

            animate : function(){

            }
        }
    }
    return Star;
});