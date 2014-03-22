define([
 "stage/actions/moveaction",
 "stage/actions/rotateaction",
 "stage/actions/scaleaction"
 ], function(MoveAction, RotateAction, ScaleAction) {

	function Actions(){
		return {
			init : function(script){
				this.script = this.parseRepeatScripts(script, []);
				this.currentIndex = 0;
			},

			reset : function(){
				this.currentIndex = 0;
			},

			getNext : function(){
				var actionJSON = this.script[this.currentIndex];
				if(!actionJSON) return;
				var action = this.getAction(actionJSON);
				this.currentIndex++;
				return action;
			},

			getAction : function(actionJSON){
				if(actionJSON.type == "move-right") return new MoveAction().setMaxDistance(100).setDegrees(90);
				if(actionJSON.type == "move-left")  return new MoveAction().setMaxDistance(100).setDegrees(270);
				if(actionJSON.type == "move-down")  return new MoveAction().setMaxDistance(100).setDegrees(180);
				if(actionJSON.type == "move-up")    return new MoveAction().setMaxDistance(100).setDegrees(0);
				if(actionJSON.type == "rotate")     return new RotateAction().setMaxDelta(45);
				if(actionJSON.type == "scale")      return new ScaleAction().setMaxDelta(0.3);
			},

			getAllActions : function(){
				var actions = [];
				var that = this;

				$(this.script).each(function(){
					var action = that.getAction(this);
					actions.push(action);
				});

				return actions;
			},

			parseRepeatScripts : function(script, output){
				var that = this;

				$(script).each(function(){
					if(this.type == "repeat"){
						for(var i = 0; i < this.amount; i++){
							that.parseRepeatScripts(this.values, output);
						}
					}else{
						output.push(this);
					}
				});

				return output;
			}

		}
	}

	return Actions;
});