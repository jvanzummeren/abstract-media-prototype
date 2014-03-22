define([
 "jquery"
 ], function($) {

   var ScriptParser = function(){
      return {

      	parseScript : function($el){
                  var scripts = [];

      		$el = $el.find("> ul > li");

                  var that = this;

                  $el.each(function(){

                        var script = that.parseScriptRecursive($(this).find("> ul"), []);
                        var type = $(this).attr("type");

                        scripts.push({
                              type : type,
                              script: script
                        });
                  });   


      		return scripts;
      	},

      	parseScriptRecursive : function($el, json){
      		var that = this;
      		$items = $el.find("> li:not(.dropzone)");

      		$items.each(function(){
      			var $this = $(this);
                        var type = $this.attr("type");
      			var index = $this.attr("index");
      			if(type == "repeat"){
      			     var amount = parseInt($this.find("> span input").val());
                              var repeat = {
                                    type: type,
                                    amount: amount,
                                    values: that.parseScriptRecursive($this.find("> ul"), [])
                              }
                              json.push(repeat);
      				return;
      			}
      			
                        json.push({type : type, index: index});
      		});

                  return json;      		
      	}

      }
  }

  return ScriptParser;

});