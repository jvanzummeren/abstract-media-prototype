define([
"jquery",
"visualcodeeditor/visualcodeeditor",
"visualcodeeditor/scriptparser",
"text!templates/script_object_editor.html"
 ], function($, VisualCodeEditor, ScriptParser, scriptObjectEditorTemplate) {
    var Character = function(){
        return {

            init : function(){
                var visualCodeEditor = new VisualCodeEditor();
                visualCodeEditor.initialize(scriptObjectEditorTemplate);
                visualCodeEditor.$el.appendTo($("body"));  
                visualCodeEditor.hide(); 
                var that = $(this);
                visualCodeEditor.playButtonPressed = function(){  
                    this.hide();  
                    that.trigger( "closedEditor" );

                }     

                this.visualCodeEditor = visualCodeEditor;  
            },

            getScript : function(){
                var scriptParser = new ScriptParser();
                var script = scriptParser.parseScript(this.visualCodeEditor.$el.find(".code_hierarchy"));
                return script;
            },

            showEditor : function(){
                
                this.visualCodeEditor.$el.show();
            }

        }
    }

    return Character;

});