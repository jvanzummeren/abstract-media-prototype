define([
 "jquery"
 ], function($) {
 	
 	var NestedDroppableList = function(){
		return {
			initialize : function($el){
				this.$el = $el;
	        },

	        animationSpeed : 300,

			add : function($element, clone){

				this.hideDropzone();

				if(this.isAlreadyChild($element)){
					$element.show();
				}

				if(clone){
					$element = $element.clone();
				}
				
				$activeElement = $(".active", this.$el);

				$element.removeClass("invisible");
				
				if($activeElement.size() > 0){
					
					if($activeElement.data("type") == "before"){
						$element.insertBefore($activeElement);
					}else{
						$element.insertAfter($activeElement);					
					}
				}else{
					if($element.hasClass("event")){
						$element.appendTo(this.$el.find(".code_root"));
					}
				}


				var that = this;

			},

			remove : function($element){

			  $element.hide();

	          setTimeout(function(){
	            $element.remove();
	          }, this.animationSpeed);
			},

			dragStart : function ($element){
	            $element.addClass("invisible");	 
	            this.draggingElementHeight = $element.outerHeight();
	            $element.hide();
	            
	            $ul = $element.closest("ul");
			  	var dropzone = this.showDropzone($ul);	
	           
			  	if(dropzone) this.setActive(dropzone, "before", 0);
			  	if(this.isLast($element)){
			  		this.setActive($element.prev(), "after", 0);
			  	}else{
			  		this.setActive($element.next(), "before", 0);	
			  	}
	            
			},

			dragEnd : function($element){
				$element.removeClass("invisible");
				$element.hide();

				$activeElement = this.$el.find(".active");
				
				this.removeActive($activeElement, true);
			},

			dragCancel : function($element, animated){
				$element.removeClass("invisible");
				$element.show();

				$activeElement = this.$el.find(".active");
				this.removeActive($activeElement, animated);
			},

			drop : function($element, deltaY){
				
				if(this.isAlreadyChild($element)){

	              if(deltaY > 10){
	                  this.add($originalElement, true);                                           
	                  this.remove($originalElement);

	              }else{ 
	              	
	                this.dragCancel($originalElement, false);
	                
	              }

	            }else{
	              this.add($originalElement, true);
	            }
	            
				$activeElement = this.$el.find(".active");
				this.removeActive($activeElement, false);
			},

			getItems : function (){
				return this.items = $('li', this.$el);
			},

			dragMove : function($element){
			  	this.items = this.getItems();

				var top = parseInt($element.css("top"));

				var that = this;

				this.items.each(function(index){
	              	var $this = $(this);
	               	//ignore invisible elements
	              	if($this.closest(".invisible").size() > 0) return;

	              	var isLast = that.isLast($this);

					var offsetTop = $this.offset().top;
					offsetTop -= parseInt($this.css("margin-top"));

					var elementHeight = $this.outerHeight();

					offsetBottom = offsetTop + elementHeight - 50;


	              	if(top < offsetTop && top > offsetTop - 50){ 
	              		if(that.isAllowedToDrop($element, $this)){     		
	              			that.setActive($this, "before");      
	              		}  		
	              	}
	              	else if(top > (offsetBottom) && top < (offsetBottom + 50) && isLast){
	              		if(that.isAllowedToDrop($element, $this)){     		
	              		
	              			that.setActive($this, "after");
	              		}
	              	}
	              	else {
	              		that.removeActive($this, true);     		
	              	}
	          	});
			},

			isAllowedToDrop : function($requestElement, $targetElement){

				if($requestElement.hasClass("event") && $targetElement.hasClass("event")){
					return true;
				}

				if($requestElement.hasClass("event") && !$targetElement.hasClass("event")){
					return false;
				}
				if(!$requestElement.hasClass("event") && $targetElement.hasClass("event")){
					return false;
				}

				return true;


			},

			setActive : function($item, type, speed){
				if($item.data("type") == type) return;

				var speed = (speed === 0) ? speed : this.animationSpeed;

				this.getItems().removeClass("active");


	  			$item.addClass("active");              			
	      		$item.data("state", "active");
	      		$item.data("type", type);

	      		var height = this.draggingElementHeight;


	      		if(!$item.hasClass("dropzone") && !$item.hasClass("invisible")){
	      			if(type == "before"){
	          			$item.stop().animate({ 
	          				marginTop: height,
	          				marginBottom: 0
	          			}, speed);
	          		}else{
	          			$item.stop().animate({ 
	          				marginTop: 0,
	          				marginBottom: height
	          			}, speed);
	          		}
	      		}

	      		if($item.hasClass("dropzone")){
	      			$item.stop().animate({ 
	          			marginBottom: height - $item.outerHeight()        			
	          		}, speed);
	      		}
			},

			removeActive : function($item, animated){

				if(!$item.data("state")) return;

	  			$item.data("state", null);
	      		$item.data("type", null);

	  			$item.removeClass("active");
	      		$item.stop();

	      		if(animated){
	      			$item.animate({
	      				marginTop: '0',
	      				marginBottom: '0'
	      			}, this.animationSpeed);
	      		}else{
	      			$item.css("margin-top", 0);
	      			$item.css("margin-bottom", 0);
	      		}

	  		},

			hideDropzone : function(){
				$activeElement = $(".active", this.$el);
				if($activeElement.hasClass("dropzone")){
					$activeElement.hide();
				}
			},

			showDropzone : function($ul){
				$items = $ul.find("> *:not(.dropzone)");

				if($items.size() == 1){
					return $ul.find("> .dropzone").show();
				}
			},

			hitTest : function($element){
				if(parseInt($element.css("left")) > 250){
					return true;
				}else{
					return false;
				}
			},

			isAlreadyChild : function($element){
				if($element.closest("."+this.$el.attr("class")).size() > 0){
					return true;
				}else{
					return false;
				}
			},

			isLast : function($element){

				if(
					$element.next().hasClass("invisible") && $element.next().next().hasClass("dropzone")
					|| $element.next().hasClass("invisible") && $element.next().next().html() == undefined

				){
					return true;
				}
				
				if($element.next().html() == undefined || $element.next().hasClass("dropzone")){
					return true;
				}
				
				return false;
				

				
			}
		}
	}

	return NestedDroppableList;
});