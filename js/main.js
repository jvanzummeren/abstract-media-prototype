require.config({
    baseUrl: 'js',
    paths: {
        jquery: 'lib/jquery-2.1.0.min'
    }
});

require([
	"jquery",
    "stage/pixi",
	"visualcodeeditor/visualcodeeditor",
    "visualcodeeditor/scriptparser",
    "stage/level",
    "stage/character",
    "text!templates/place_object_editor_template.html",
    "text!templates/character.html"
], function($, PIXI, VisualCodeEditor, ScriptParser, Level, Character, placeObjectEditorTemplate, characterTemplate){

    var level;   

    var placeObjectsEditor = new VisualCodeEditor();
    placeObjectsEditor.initialize(placeObjectEditorTemplate);
    placeObjectsEditor.$el.appendTo($("body"));
    
    placeObjectsEditor.playButtonPressed = function(){
        var scriptParser = new ScriptParser();
        var script = scriptParser.parseScript(this.$el.find(".code_hierarchy"));
        var startScripts = script[0].script;

        $(startScripts).each(function(index, value){
            var type = value.type;
            var index = value.index;
            console.log(index);
            value.script = characters[index].getScript();
        });

        console.log(startScripts);

        start(startScripts);
     }


     //*
    // visualCodeEditor.$el.hide();
     /*/
     placeObjectsEditor.$el.hide();
     //*/
    var characterTypes = [{
        type: "bunny"
    },
    {
        type: "bunny"
    }
    ];

    var characters = [];

    $(characterTypes).each(function(index){
        
        if(this.type == "bunny"){
            var character = new Character();
            character.init();

            var $ul = placeObjectsEditor.$el.find(".objects ul");

            var $characterHTML = $(characterTemplate);
            $characterHTML.data("character", character);
            $characterHTML.attr("index", index);
            $characterHTML.appendTo($ul);

             $characterHTML.find("a").on("mousedown", function(event) { 
                event.stopPropagation();

                var $el = $(this).closest(".object");

                var character = $el.data("character");
                
                placeObjectsEditor.$el.hide();
                character.showEditor();
                $(character).on("closedEditor", function(){
                    placeObjectsEditor.$el.show();
                });
             });

            characters.push(character);
            
        }
    });


    $("*:not(input)")
     .attr('unselectable', 'on')
     .css('user-select', 'none')
     .css('MozUserSelect', 'none')
     .on('selectstart', false);

    var stage = new PIXI.Stage(0x66ff99);
    var renderer = PIXI.autoDetectRenderer(1024,768); 

    function start(script){

        level = new Level();
        level.initialize($(".canvas"), stage, renderer);
        level.render(script);
        requestAnimFrame(updateFrame);

        level.stopButtonTapped = function(){
            level.remove();
            level = null;          
            placeObjectsEditor.$el.show();
         };

        placeObjectsEditor.$el.hide();
        level.show();
     }

    function updateFrame(){

        if(level){
            requestAnimFrame(updateFrame);
            level.updateFrame();
        }
    }
})