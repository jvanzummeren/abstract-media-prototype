define([
 "jquery"
 ], function($) {

      var OptionList = function(){
	      return {
	        initialize : function($el){
	          this.$el = $el;
	          this.items = $('li:not(.dropzone)', $el)
	        }
	      }
     }

     return OptionList;
 });