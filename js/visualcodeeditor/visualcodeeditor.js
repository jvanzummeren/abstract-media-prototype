define([
 "jquery",
 "visualcodeeditor/optionlist",
 "visualcodeeditor/dragcoordinate",
 "visualcodeeditor/nesteddroppablelist", 
 "visualcodeeditor/ghost"
 ], function($, OptionList, DragCoordinate, NestedDroppableList, Ghost) {

    var VisualCodeEditor = function(){

    return {

          $el : null,

          initialize : function(template){
            this.$el = $(template);
            this.rootClass = this.$el.attr("class");

            this.optionList = new OptionList();
            this.optionList.initialize($('.options', this.$el));

            this.dragcoordinate = new DragCoordinate();

            this.nestedDroppableList = new NestedDroppableList();

            var $nestedList = $(".code_hierarchy", this.$el);
            this.nestedDroppableList.initialize($nestedList);

            this.registerEvents();
          },

          hide : function(){
            this.$el.hide();
          },

          show : function(){
            this.$el.show();
          },

          registerEvents : function(){
            var that = this;

            this.optionList.items.on("mousedown", function(event) { 
              that.dragcoordinate.dragStart(event); 
              that.dragStart(event);
            });

            this.optionList.items.on("touchstart", function(event) { 
              that.dragcoordinate.dragStartTouch(event);
              that.dragStart(event);
            });

            $( document ).on( "mousedown", "."+this.rootClass+" li:not(.dropzone, .no-drag)", function(event) {
              that.dragcoordinate.dragStart(event);
              that.dragStart(event); 
            });

            $( document ).on( "mousedown", "."+this.rootClass+" li input", function(event) {
              event.stopPropagation();
            });

            $( document ).on( "touchstart", "."+this.rootClass+" li:not(.dropzone, .no-drag)", function(event) {
              that.dragcoordinate.dragStartTouch(event);
              that.dragStart(event); 
            });
            $( document ).on( "touchstart", "."+this.rootClass+" li input", function(event) {
              event.stopPropagation();
            });

            $(document).on("mousemove", function(event) { 
              that.dragcoordinate.dragMove(event);            
              that.dragMove(event);
            });
            $(document).on("touchmove", function(event) { 
              if(event.originalEvent.touches.length > 1) return;

              that.dragcoordinate.dragMoveTouch(event);          
              that.dragMove(event); 
            });

            $(document).on("mouseup", function(event) { that.dragEnd(event); });
            $(document).on("touchend",function(event) { 
              if(event.originalEvent.touches.length > 1) return;

              that.dragEnd(event);
            });

            $(".play", this.$el).on('touchend', function(event){
                that.playButtonPressed(event);
            });

            $(".play", this.$el).on('mouseup', function(event){
                that.playButtonPressed(event);
            });

          },
          //this function is ment to override
          playButtonPressed : function(event){

          },

          dragStart : function(event){
            this.ghost = new Ghost();

            $element = $(event.currentTarget);

            this.ghost.setElement($element);

            if($element.closest(".options").size() > 0){
              this.ghost.type = "new"  
              this.nestedDroppableList.draggingElementHeight = $element.outerHeight();        
            }else{
              this.nestedDroppableList.dragStart($element);
              this.ghost.type = "edit"
            }

            event.stopPropagation();
            event.preventDefault();

          },

          dragEnd : function(event){
           
            if(this.ghost){
               $ghostElement = this.ghost.el;
               $originalElement =  this.ghost.originalElement;

              if(this.nestedDroppableList.hitTest($ghostElement)){
                  var deltaY = Math.abs($element.offset().top - $originalElement.offset().top);
                  this.nestedDroppableList.drop($originalElement, deltaY);
                  this.ghost.remove();

              }else{

                if(this.ghost.type == "edit"){
                    this.nestedDroppableList.remove($originalElement);
                    this.nestedDroppableList.dragEnd($originalElement);
                    this.ghost.remove("fade");

                }else{
                    this.nestedDroppableList.dragCancel($originalElement, true);
                    this.ghost.remove("reverse");
                }
              }
              this.ghost = null;           
            }
          },

          dragMove : function(event){

            if(this.ghost){
              event.preventDefault();

              var delta = this.dragcoordinate.getDelta();  
              this.ghost.moveTo(delta);

              $element = this.ghost.el;
              if(this.nestedDroppableList.hitTest($element)){
                  this.nestedDroppableList.dragMove($element);
              }else{
                  this.nestedDroppableList.dragCancel($element, true);

              }
            }
            
          }
       }
    }

    return VisualCodeEditor;

});
