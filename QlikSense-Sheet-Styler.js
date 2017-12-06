var objid = [];

define(["qlik", "ng!$q", "underscore", "text!./style.css"],
    function(qlik, o, _, cssContent) {
        "use strict";


        if ($('#QlikSense-Sheet-Styler').length == 0) {
            $("<style id='QlikSense-Sheet-Styler'>").html(cssContent).appendTo("head");
        }

        var n = qlik.currApp();

        var getSheetList = function() {

            var defer = o.defer();

            n.getAppObjectList(function(data) {
                var sheets = [];
                var sortedData = _.sortBy(data.qAppObjectList.qItems, function(item) {
                    return item.qData.rank;
                });
                _.each(sortedData, function(item) {
                    sheets.push({
                        value: item.qInfo.qId,
                        label: item.qMeta.title
                    });
                });
                return defer.resolve(sheets);
            });

            return defer.promise;
        };



        var sheetList = {
            type: "string",
            component: "dropdown",
            label: "Select Sheet",
            ref: "props.selectedSheet",
            options: function() {
                return getSheetList().then(function(items) {
                    return items;
                });
            }
        };


        /*
		
		var test = {
		component : "expandable-items",
		label : "Filterpane Styling",
			items : {

			}
		};
		
		*/


        // screen resizer

        var sheetId = qlik.navigation.getCurrentSheetId().sheetId,
            app = qlik.currApp(this);

        function resizeGrid(rows, cols) {

            app.getObject(sheetId).then(function(obj) {
                obj.applyPatches([{
                        qOp: 'replace',
                        qPath: '/columns',
                        qValue: '"' + cols + '"'
                    },
                    {
                        qPath: '/rows',
                        qOp: 'replace',
                        qValue: '"' + rows + '"'
                    }
                ], false);

            }).then(function() {
                app.doSave();
            });
        } // end resizeGrid()


        var input_rows = {
            ref: "rows",
            label: "Number of rows",
            type: "integer",
            defaultValue: "12"
        };

        var input_cols = {
            ref: "cols",
            label: "Number of columns",
            type: "integer",
            defaultValue: "24"
        };

        var screenresizer = {
            // not necessary to define the type, component "expandable-items" will automatically
            // default to "items"
            // type: "items"
            component: "items",
            label: "Screen Resizer(use at your own Risk)",
            items: {
                //	screenresizer : {
                //type : "items",
                //label : "Screen Resizer(use carefully)",
                //items : {
                input_rows: input_rows,
                input_cols: input_cols
                //}
                //}
            }
        };

        // exit

        return {
            initialProperties: {
                listItems: [],
                listItems2: []
            },
            definition: {
                type: "items",
                component: "accordion",
                items: {
                    settings: {
                        uses: "settings",
                        items: {
                            sresizer: screenresizer,
                            header1: {
                                type: "items",
                                label: "Customization For Sheet",
                                items: {

                                    // checkbox
                                    debug: {
                                        ref: "debug", // refrence/id (debug is the name)
                                        type: "boolean", // boolean is either true/false
                                        component: "checkbox", // callback type
                                        label: "Debug mode", // text/label which shows in property tab 
                                        defaultValue: false // default value as its boolean it accepts true/false will not accept if a string is added
                                    },
                                    sheetList: sheetList,
                                    // screen resizer

									useogtitle: {
                                        ref: "useogtitle",
                                        type: "boolean",
                                        component: "checkbox",
                                        label: "Use Custom Title",
                                        defaultValue: false
                                    },
									
									//sheet-title-text
									 sheettitletext: {
                                        type: "string",
                                        label: "Document Title",
                                        ref: "sheettitletext",
                                        defaultValue: '',
                                        expression: "optional"
                                    },

									 
                                    fontsizehtmldocument: {
                                        type: "string",
                                        label: "Font Size for whole document",
                                        ref: "fontsizehtmldocument",
                                        defaultValue: '15px',
                                        expression: "optional"
                                    },

                                    fonthtmldocument: {
                                        type: "string",
                                        label: "Font Style for whole document",
                                        ref: "fonthtmldocument",
                                        defaultValue: '"Times New Roman", Times, serif ',
                                        expression: "optional"
                                    },

                                    usebackgroundcolor: {
                                        ref: "prop.bgenable", // refrence/id (debug is the name)
                                        type: "boolean", // boolean is either true/false
                                        component: "checkbox", // callback type
                                        label: "Enable Background Color", // text/label which shows in property tab 
                                        defaultValue: false // default value as its boolean it accepts true/false will not accept if a string is added
                                    },

                                    background_url: {
                                        ref: "prop.imgurl",
                                        label: "IMG URL",
                                        type: "string",
                                        expression: "optional"
                                    },

                                    bgtrans: {
                                        type: "string",
                                        label: "Background Transparency",
                                        ref: "prop.transp",
                                        defaultValue: "0.7",
                                        expression: "optional"
                                    },

                                    bodycolor: {
                                        type: "string",
                                        label: "Background Color",
                                        ref: "prop.bodycolor",
                                        defaultValue: "",
                                        expression: "optional"
                                    },

                                    titleHide: {
                                        ref: "titleHide",
                                        type: "boolean",
                                        component: "checkbox",
                                        label: "Hide Title",
                                        defaultValue: false
                                    },

                                    titleHeight: {
                                        type: "string",
                                        label: "Title Height",
                                        ref: "prop.titleheight",
                                        defaultValue: "",
                                        expression: "optional"
                                    },

                                    titleColor: {
                                        type: "string",
                                        label: "Title Text Color",
                                        ref: "prop.titlecolor",
                                        defaultValue: "",
                                        expression: "optional"
                                    },

                                    titleFontsize: {
                                        type: "string",
                                        label: "Title Text Size",
                                        ref: "prop.titlefontsize",
                                        defaultValue: "",
                                        expression: "optional"
                                    },


                                    titleImage: {
                                        type: "string",
                                        label: "Title Image Size",
                                        ref: "prop.titleImage",
                                        defaultValue: "",
                                        expression: "optional"
                                    },


                                    seltoolbarlist: {
                                        type: "string",
                                        label: "Selection Toolbar Css",
                                        ref: "prop.sel_toolbar_list_wrapper",
                                        defaultValue: "background-color:gray;",
                                        expression: "optional"
                                    },
                                    styletooltip: {
                                        type: "string",
                                        label: "Tooltip Css",
                                        ref: "prop.styletooltip",
                                        defaultValue: "background-color:gray;",
                                        expression: "optional"
                                    },
                                    styletooltiptext: {
                                        type: "string",
                                        label: "Tooltip Text Css",
                                        ref: "prop.styletooltiptext",
                                        defaultValue: "background-color:gray;",
                                        expression: "optional"
                                    },




                                }
                            },

                            // selection bar 

                            selectionbar: {
                                type: "items",
                                label: "Customization For Selection Bar",
                                items: {

                                    selectionbarHide: {
                                        ref: "selectionbarHide",
                                        type: "boolean",
                                        component: "checkbox",
                                        label: "Hide Selection Bar",
                                        defaultValue: false
                                    },

                                    selectionbarbg: {
                                        type: "string",
                                        label: "SelectionBar Background color",
                                        ref: "prop.selectionbarbg",
                                        defaultValue: "#404b56",
                                        expression: "optional"
                                    },
                                    selectionbarbuttonbg: {
                                        type: "string",
                                        label: "SelectionBar Button Background color",
                                        ref: "prop.selectionbarbuttonbg",
                                        defaultValue: "#404b56",
                                        expression: "optional"
                                    },
                                    /*
                                    selectionbarbuttoncolor: {
                                        type: "string",
                                        label: "SelectionBar Button color",
                                        ref: "prop.selectionbarbuttoncolor",
                                        defaultValue: "gray",
                                        expression: "optional"
                                    },
									*/
                                    selectionbartextcolor: {
                                        type: "string",
                                        label: "SelectionBar Text color",
                                        ref: "prop.selectionbartextcolor",
                                        defaultValue: "#ffffff",
                                        expression: "optional"
                                    },
                                    selectionbaritemcolor: {
                                        type: "string",
                                        label: "SelectionBar Item color",
                                        ref: "prop.selectionbaritemcolor",
                                        defaultValue: "#ffffff",
                                        expression: "optional"
                                    },

                                    selectionbaritemhovercolor: {
                                        type: "string",
                                        label: "SelectionBar Item Hover color",
                                        ref: "prop.selectionbaritemhovercolor",
                                        defaultValue: "#404142",
                                        expression: "optional"
                                    },

                                }
                            },

                            // filter pane

                            filterpane: {
                                type: "items",
                                label: "Filterpane Styling",
                                items: {
                                    filter_Background_Color: {
                                        ref: "filter_bg",
                                        label: "Background Color",
                                        type: "string",
                                        expression: "optional"
                                    },
                                    filter_titlecolor: {
                                        ref: "filter_titlecolor",
                                        label: "Title Color",
                                        type: "string",
                                        expression: "optional"
                                    },
                                    filter_selected: {
                                        ref: "filter_selected",
                                        label: "Selected Color",
                                        type: "string",
                                        expression: "optional"
                                    },
                                    filter_locked: {
                                        ref: "filter_locked",
                                        label: "Locked Color",
                                        type: "string",
                                        expression: "optional"
                                    },
                                    filter_optional: {
                                        ref: "filter_optional",
                                        label: "Optional Color",
                                        type: "string",
                                        expression: "optional"
                                    },
                                    filter_alternative: {
                                        ref: "filter_alternative",
                                        label: "Alternative Color",
                                        type: "string",
                                        expression: "optional"
                                    }
                                }
                            },
                            Allobjectsstyle: {
                                type: "items",
                                label: "All Objects Styling",
                                items: {
                                    allonjenable: {
                                        ref: "allonjenable",
                                        type: "boolean",
                                        component: "checkbox",
                                        label: "Enable To apply Style for all objects",
                                        defaultValue: false
                                    },
                                    backcolor: {
                                        type: "string",
                                        label: "Header Background Color",
                                        ref: "obj_bgcolor",
                                        defaultValue: "",
                                        expression: "optional"
                                    },
                                    /*
									objtransparency: {
                                        type: "string",
                                        label: "Object Transparency",
                                        ref: "obj_objtransparency",
                                        defaultValue: "1",
                                        expression: "optional"
                                    },
									*/
                                    objfontsize: {
                                        type: "string",
                                        label: "Font Size",
                                        ref: "obj_objfontsize",
                                        defaultValue: "",
                                        expression: "optional"
                                    },

                                    txtcolor: {
                                        type: "string",
                                        label: "Header Text Color",
                                        ref: "obj_txtcolor",
                                        defaultValue: "",
                                        expression: "optional"
                                    },
                                    txtalin: {
                                        type: "string",
                                        label: "Header Text Alignment",
                                        ref: "obj_txtalin",
                                        defaultValue: "",
                                        expression: "optional"
                                    },

                                    qvobjectcontentcontainerbgtransparency: {
                                        type: "string",
                                        label: "Content Container Transparency",
                                        ref: "obj_qvobjectcontentcontainerbgtrans",
                                        defaultValue: "1",
                                        expression: "optional"
                                    },

                                    qvobjectcontentcontainerbg: {
                                        type: "string",
                                        label: "Content Container BG Color",
                                        ref: "obj_qvobjectcontentcontainerbg",
                                        defaultValue: "",
                                        expression: "optional"
                                    },
                                    qvobjectcontentcontainercolor: {
                                        type: "string",
                                        label: "Content Container Color",
                                        ref: "obj_qvobjectcontentcontainercolor",
                                        defaultValue: "",
                                        expression: "optional"
                                    },
                                    /*
                                    border: {
                                        type: "string",
                                        label: "Container border",
                                        ref: "obj_border",
                                        defaultValue: "solid 1px red",
                                        expression: "optional"
                                    },
									*/
                                    hideheader: {
                                        ref: "obj_hideheader",
                                        type: "boolean",
                                        component: "checkbox",
                                        label: "Hide Header",
                                        defaultValue: false
                                    },
									 navstyle: {
                                        ref: "navstyle",
                                        type: "boolean",
                                        component: "checkbox",
                                        label: "Apply Style to Navigation",
                                        defaultValue: false
                                    }
									
									
                                    // end
                                }

                            },

                            // objects

                            MyList: {
                                type: "array",
                                ref: "listItems",
                                label: "Add Style to Chart(Not Table)",
                                itemTitleRef: "label",
                                allowAdd: true,
                                allowRemove: true,
                                addTranslation: "Add Item",
                                min: 1,
                                /*
                                max: 6,
								*/
                                items: {
                                    label: {
                                        type: "string",
                                        ref: "label",
                                        label: "Label",
                                        expression: "optional"
                                    },

                                    // start

                                    objid: {
                                        type: "string",
                                        label: "Object Id",
                                        ref: "objid",
                                        defaultValue: "",
                                        expression: "optional"
                                    },
                                    backcolor: {
                                        type: "string",
                                        label: "Header Background Color",
                                        ref: "bgcolor",
                                        defaultValue: "",
                                        expression: "optional"
                                    },

                                    objtransparency: {
                                        type: "string",
                                        label: "Object Transparency",
                                        ref: "objtransparency",
                                        defaultValue: "1",
                                        expression: "optional"
                                    },

                                    objfontsize: {
                                        type: "string",
                                        label: "Font Size",
                                        ref: "objfontsize",
                                        defaultValue: "",
                                        expression: "optional"
                                    },

                                    txtcolor: {
                                        type: "string",
                                        label: "Header Text Color",
                                        ref: "txtcolor",
                                        defaultValue: "",
                                        expression: "optional"
                                    },
                                    txtalin: {
                                        type: "string",
                                        label: "Header Text Alignment",
                                        ref: "txtalin",
                                        defaultValue: "",
                                        expression: "optional"
                                    },

                                    qvobjectcontentcontainerbgtransparency: {
                                        type: "string",
                                        label: "Content Container Transparency",
                                        ref: "qvobjectcontentcontainerbgtrans",
                                        defaultValue: "1",
                                        expression: "optional"
                                    },

                                    qvobjectcontentcontainerbg: {
                                        type: "string",
                                        label: "Content Container BG Color",
                                        ref: "qvobjectcontentcontainerbg",
                                        defaultValue: "",
                                        expression: "optional"
                                    },
                                    qvobjectcontentcontainercolor: {
                                        type: "string",
                                        label: "Content Container Color",
                                        ref: "qvobjectcontentcontainercolor",
                                        defaultValue: "",
                                        expression: "optional"
                                    },
                                    border: {
                                        type: "string",
                                        label: "Container border",
                                        ref: "border",
                                        defaultValue: "solid 1px red",
                                        expression: "optional"
                                    },
                                    hideheader: {
                                        ref: "hideheader",
                                        type: "boolean",
                                        component: "checkbox",
                                        label: "Hide Header",
                                        defaultValue: false
                                    },



                                    // end


                                }
                            },
                            // end list
                            //	table styling
                            MyList2: {
                                type: "array",
                                ref: "listItems2",
                                label: "Add Style to Table",
                                itemTitleRef: "label",
                                allowAdd: true,
                                allowRemove: true,
                                addTranslation: "Add Item",
                                min: 1,
                                /*
                                max: 6,
								*/
                                items: {
                                    label: {
                                        type: "string",
                                        ref: "label",
                                        label: "Label",
                                        expression: "optional"
                                    },

                                    // start
                                    pivottable: {
                                        ref: "pivottable", // refrence/id (debug is the name)
                                        type: "boolean", // boolean is either true/false
                                        component: "checkbox", // callback type
                                        label: "Pivot Support", // text/label which shows in property tab 
                                        defaultValue: false // default value as its boolean it accepts true/false will not accept if a string is added
                                    },

                                    columnwidthadjuster: {
                                        ref: "columnwidthadjuster", // refrence/id (debug is the name)
                                        type: "boolean", // boolean is either true/false
                                        component: "checkbox", // callback type
                                        label: "Column Width Adjuster", // text/label which shows in property tab 
                                        defaultValue: false // default value as its boolean it accepts true/false will not accept if a string is added
                                    },

                                    objidtable: {
                                        type: "string",
                                        label: "Object Id",
                                        ref: "objidtable",
                                        defaultValue: "",
                                        expression: "optional"
                                    },
                                    backcolortable: {
                                        type: "string",
                                        label: "Background Color",
                                        ref: "bgcolortable",
                                        defaultValue: "",
                                        expression: "optional"
                                    },
                                    thcolortable: {
                                        type: "string",
                                        label: "Text Color",
                                        ref: "thcolortable",
                                        defaultValue: "",
                                        expression: "optional"
                                    },
                                    thaninetable: {
                                        type: "string",
                                        component: "dropdown",
                                        label: "Text Alignment",
                                        ref: "thalinetable",
                                        options: [{
                                            value: "center",
                                            label: "Center"
                                        }, {
                                            value: "left",
                                            label: "Left"
                                        }, {
                                            value: "right",
                                            label: "Right"
                                        }],
                                    },
                                    thfontsize: {
                                        type: "string",
                                        label: "Header Font Size",
                                        ref: "thfontsize",
                                        defaultValue: "",
                                        expression: "optional"
                                    },
                                    tdfontsize: {
                                        type: "string",
                                        label: "Table Data Font Size",
                                        ref: "tdfontsize",
                                        defaultValue: "",
                                        expression: "optional"
                                    },
                                    thhovertable: {
                                        type: "string",
                                        label: "Hover Color",
                                        ref: "thhovertable",
                                        defaultValue: "",
                                        expression: "optional"
                                    },


                                    eventrtable: {
                                        type: "string",
                                        label: "Table Row Even Color",
                                        ref: "eventrtable",
                                        defaultValue: "",
                                        expression: "optional"
                                    },

                                    oddtrtable: {
                                        type: "string",
                                        label: "Table Row Odd Color",
                                        ref: "oddtrtable",
                                        defaultValue: "",
                                        expression: "optional"
                                    },

                                    // end 

                                }
                            }
                            // end list


                        }
                    }
                }
            },
            paint: function($element, layout) {
                //add your rendering code here

                if ($('#QlikSense-Sheet-Styler-fullScreen').length == 0) {
                    var code = "<style id='QlikSense-Sheet-Styler-fullScreen'>.qv-object-QlikSense-Sheet-Styler ~ .qv-object-nav>a {display: none;}  .qv-object-QlikSense-Sheet-Styler .qv-object-nav>a {display: none;}</style>"
                    $(code).appendTo("head");
                }

                var countItem = layout.listItems.length;

                var BackgroundTrans = layout.prop.transp,
                    imgurl = layout.prop.imgurl,
                    bgcolor = layout.prop.bodycolor,
                    enable = layout.prop.bgenable;

                var RGBAString = 'rgba(255,255,255,' + BackgroundTrans + ')',
                    app = qlik.currApp(this);



                //console.log(RGBAString);

                var obj = [],
                    bg = [],
                    objtransparency = [],
                    txtcolor = [],
                    txtalin = [],
                    objfontsize = [],
                    contentcontainerbgtrans = [],
                    contentcontainerbg = [],
                    contentcontainercolor = [],
                    border = [],
                    hideheader = [],
                    seltoolbarcolor = layout.prop.sel_toolbar_list_wrapper,
                    styletooltip = layout.prop.styletooltip,
                    styletooltiptext = layout.prop.styletooltiptext,
                    titleImageSize = layout.prop.titleImage;

                var tablebg = [],
                    pivottable = [],
                    thfontsize = [],
                    tableth = [],
                    tablethaline = [],
                    tablethhover = [],
                    table = [],
                    eventrtable = [],
                    oddtrtable = [],
                    columnwidthadjuster = [],
                    tdfontsize = [];

                var qliksensesheetstyle = "<style id='styleQlikSenseSheetStyler'>";


                qliksensesheetstyle += 'html *{ font-family: ' + layout.fonthtmldocument + '; font-size: ' + layout.fontsizehtmldocument + '; } \n';
                // screen resizer

                app.getObject(sheetId).then(function(obj) {
                    obj.getLayout().then(function(layout) {
                        $element.find('#size').html(layout.columns);
                        $element.find('#selector').html(layout.columns);
                    });
                });

                // end

                //prop.sel_toolbar_list_wrapper
                //qv-tooltip qvt-chart-tooltip

                qliksensesheetstyle += ".sel-toolbar-list-wrapper{" + seltoolbarcolor + "} \n .qv-tooltip{" + styletooltip + "} \n .qv-tp-item{" + styletooltiptext + "} \n .qv-tp-value{" + styletooltiptext + "}";

                //console.log("sheetid="+layout.props.selectedSheet);
                //	console.log(layout.bgenable);

                if (enable) {
                    $("#grid-wrap").css("background-color", "" + bgcolor);
                    $('div .qv-object-QlikSense-Sheet-Styler').css('background-color', '' + bgcolor);
                } else {
                    $('.qv-panel-content.flex-row').css('background-image', 'url(' + imgurl + ')');
                    $('.qvt-sheet').css('background-color', RGBAString);

                }


                // hide selection bar

                if (layout.selectionbarHide) {
                    $('.qvt-selections').hide();
                } else {
                    $('.qvt-selections').show();
                }
							
				if(layout.useogtitle){
					// sheet-title-text
					$(".sheet-title-text").html(layout.sheettitletext);
				}
				
                // sheet title container
                $(".sheet-title-container").css("height", "" + layout.prop.titleheight);

                // sheet title

                if (layout.titleHide) {
                    $('.sheet-title-container').hide();
                } else {
                    $('.sheet-title-container').show();
                }


                $('.sheet-title-text').css('font-size', "" + layout.prop.titlefontsize);
                $('#sheet-title').css('height', "" + layout.prop.titleheight);
                $('#sheet-title').css('color', "" + layout.prop.titlecolor);

                // title image size / style

                //
                $('.sheet-title-logo-img img').css('width', "" + titleImageSize);

                // end


                // qv-inner-object all object
                // $('.qv-inner-object').css('margin', '2px 2px');


                // selection bar css

                /*
                layout.prop.selectionbarbg
                layout.prop.selectionbarbuttonbg
                layout.prop.selectionbartextcolor
                layout.prop.selectionbaritemcolor
                layout.prop.selectionbaritemhovercolor
                */

                qliksensesheetstyle += ' .qv-panel-current-selections{ background-color: ' + layout.prop.selectionbarbg + ' !important } \n';
                qliksensesheetstyle += ' .qv-panel-current-selections .buttons-end .qv-subtoolbar-button{  background-color: ' + layout.prop.selectionbarbuttonbg + ' !important } \n';
                qliksensesheetstyle += ' .qv-panel-current-selections .buttons .qv-subtoolbar-button{  background-color: ' + layout.prop.selectionbarbuttonbg + ' !important } \n';

                qliksensesheetstyle += ' .qv-panel-current-selections .buttons .qv-subtoolbar-button i {  color: ' + layout.prop.selectionbartextcolor + ' } \n';
                qliksensesheetstyle += ' .qv-panel-current-selections .buttons-end .qv-subtoolbar-button i{  color: ' + layout.prop.selectionbartextcolor + ' } \n';
                qliksensesheetstyle += ' .qv-panel-current-selections .no-selection{  color: ' + layout.prop.selectionbartextcolor + ' } \n';
                qliksensesheetstyle += ' .qv-panel-current-selections .item {  color: ' + layout.prop.selectionbartextcolor + ' } \n';

                qliksensesheetstyle += ' .qv-panel-current-selections .item:hover{ background-color: ' + layout.prop.selectionbaritemhovercolor + ' } \n';

                //$('.qv-panel-current-selections').css('background-color', layout.prop.selectionbarbg+' !important');
                //$('.qv-panel-current-selections .buttons-end .qv-subtoolbar-button').css('background-color', layout.prop.selectionbarbuttonbg+' !important');
                //$('.qv-panel-current-selections .buttons .qv-subtoolbar-button').css('background-color', layout.prop.selectionbarbuttonbg+' !important');

                //$('.qv-panel-current-selections .buttons .qv-subtoolbar-button i').css('color', layout.prop.selectionbartextcolor+'');
                //$('.qv-panel-current-selections .buttons-end .qv-subtoolbar-button i').css('color', layout.prop.selectionbartextcolor+'');
                //$('.qv-panel-current-selections .no-selection').css('color', layout.prop.selectionbartextcolor+'');
                //$('.qv-panel-current-selections .item').css('color', layout.prop.selectionbartextcolor+'');

                //$('.qv-panel-current-selections .item:hover').css('background-color', layout.prop.selectionbaritemhovercolor+'');


                /*
                $( ".qv-panel-current-selections .item" ).hover(
                  function() {
                //  alert(1);
                	$('.qv-panel-current-selections .item').css('background-color', layout.prop.selectionbaritemhovercolor+'');
				
                  }, function() {
                 	$('.qv-panel-current-selections .item').css('background-color', '');
                });
                */

                // filter pane css


                qliksensesheetstyle += '.qv-collapsed-listbox  { background-color: ' + layout.filter_bg + '} \n';
                qliksensesheetstyle += '.qv-collapsed-listbox .title-wrapper > .title { color: ' + layout.filter_titlecolor + '} \n';
                qliksensesheetstyle += '.qv-collapsed-listbox .qv-state-count-bar > .selected { background: ' + layout.filter_selected + '} \n';
                qliksensesheetstyle += '.qv-collapsed-listbox .qv-state-count-bar > .locked {background : ' + layout.filter_locked + '} \n';
                qliksensesheetstyle += '.qv-collapsed-listbox .qv-state-count-bar > .optional { background: ' + layout.filter_optional + '} \n';
                qliksensesheetstyle += '.qv-collapsed-listbox .qv-state-count-bar > .alternative { background: ' + layout.filter_alternative + '} \n';

                /*
                	$('.qv-collapsed-listbox').css('background-color', layout.filter_bg);
                	$('.qv-collapsed-listbox .title ').css('color', layout.filter_titlecolor);
                	$('.qv-collapsed-listbox .qv-state-count-bar .selected').css('background', layout.filter_selected);
                	$('.qv-collapsed-listbox .qv-state-count-bar .locked').css('background', layout.filter_locked);
                	$('.qv-collapsed-listbox .qv-state-count-bar .optional').css('background', layout.filter_optional);
                	$('.qv-collapsed-listbox .qv-state-count-bar .alternative').css('background', layout.filter_alternative );
                */


                qliksensesheetstyle += '\n </style>';


                // remove and append

                $('#styleQlikSenseSheetStyler').remove();
                $(qliksensesheetstyle).appendTo("head");



                var str = '',
                    details = '';
                if (layout.debug) {
                    str = '';
                    app.getAppObjectList('sheet', function(reply) {
                        var sheet = '',
                            chksheet = layout.props.selectedSheet, //layout.prop.sheetid, // 0368fb8f-2b0b-47d4-b86a-238b831bff0b   //layout.props.sheetid
                            bol = 0;
                        //alert(chksheet);

                        //	window.setTimeout( function(){

                        //console.log(reply);
                        $.each(reply.qAppObjectList.qItems, function(key, value) {
                            //  console.log(value);
                            // get sheet name
                            //  str += value.qData.title + ' ';
                            // get sheet id

                            sheet = value.qInfo.qId + '';

                            if (sheet == chksheet) {
                                //   str += sheet + '';

                                // get object id and type
                                //console.log(value.qData);

                                $.each(value.qData.cells, function(k, v) {

                                    var type = v.type,
                                        name = v.name;

                                    //     if (type == "table") {

                                    str += "<tr>"
                                    str += "<td>"
                                    str += type;
                                    str += "</td>"
                                    //str+="<td>"	
                                    app.getObjectProperties(v.name).then(function(model) {
                                        var t = model.properties.title;
                                        console.log("Sheet Styler = type: " + type + " , title: " + t + " , obj-id: " + name);
                                        details += "Sheet Styler = type: " + type + " , title: " + t + " , obj-id: " + '<input type="text" value="' + name + '">' + "<br>";
                                    });
                                    //str+="</td>"
                                    str += "<td>"
                                    str += '<input type="text" value="' + name + '">';
                                    str += "</td>"
                                    str += "</tr>"

                                    //   }

                                });


                            }
                        });

                        //	}, 1000 ); 


                        //	$('body').append('<hr>'+str+'<hr>');

                        //	console.log('det:'+details);

                        $element.html('<input type="submit" value="Resize Sheet" id="resize"><br>' + details + '<table style="  display: block; width: 90%; border: 1px solid #eee;  max-height: 320px; overflow: auto;">' + str + '</table>');
                        $('.qv-object-QlikSense-Sheet-Styler').show();

                        $('#resize').click(function() {
                            //	alert('1');
                            console.log('resize screen :' + layout.rows + ' ' + layout.cols);
                            resizeGrid(layout.rows, layout.cols);

                        });


                        //alert(str);
                    });

                } else {
                    // $element.html('');
                    $element.empty();
                    $('.qv-object-QlikSense-Sheet-Styler').hide();
                }

                // for all objects

                if (layout.allonjenable) {

                    //console.log(layout.allonjenable);

                    var qvobjectcontentcontainerbgtrans = layout.obj_qvobjectcontentcontainerbgtrans,
                        objtransparency = layout.obj_objtransparency,
                        hideheader = layout.obj_hideheader,
                        border = layout.obj_border,
                        qvobjectcontentcontainercolor = layout.obj_qvobjectcontentcontainercolor,
                        qvobjectcontentcontainerbg = layout.obj_qvobjectcontentcontainerbg,
                        txtalin = layout.obj_txtalin,
                        txtcolor = layout.obj_txtcolor,
                        bgcolor = layout.obj_bgcolor,
                        objfontsize = layout.obj_objfontsize,
						navstyle = layout.navstyle;

                 //   console.log(txtcolor + ',' + bgcolor);

                    var chksheet = layout.props.selectedSheet;

                    var i = 1;

                    app.getAppObjectList('sheet', function(reply) {
                        $.each(reply.qAppObjectList.qItems, function(key, value) {
                            var sheet = value.qInfo.qId + '';
                            if (sheet == chksheet) {
                                str += value.qData.title + ' ';
                                $.each(value.qData.cells, function(k, v) {
                                    var type = v.type,
                                        name = v.name;

                                    //console.log(type);	
                                    //console.log(name);	


                                    if (hideheader) {
                                        $('div[tid="' + name + '"] header').hide();
                                    } else {
                                        $('div[tid="' + name + '"] header').show();
                                    }



                                    // object title text qv-object-title-text
                                    $('div[tid="' + name + '"] .qv-object-title-text').css('color', '' + txtcolor);
                                    $('div[tid="' + name + '"] .qv-object-title-text').css('background-color', '' + bgcolor);


                                    // object title container qv-object-title
                                    $('div[tid="' + name + '"] .qv-object-title').css('background-color', '' + bgcolor);
                                    $('div[tid="' + name + '"] .qv-object-title-text').css('margin-left', '' + txtalin + '%');
                                    $('div[tid="' + name + '"] .qv-object-title').css('padding-right', '0px');


                                    // header
                                    $('div[tid="' + name + '"] header').css('padding', '3px');
                                    $('div[tid="' + name + '"] header').css('background-color', '' + bgcolor);
                                    $('div[tid="' + name + '"] header h1').css('font-size', '' + objfontsize);
                                    $('div[tid="' + name + '"] header h1 div').css('font-size', '' + objfontsize);


                                    // qv-object-content-container transparency

                                    $('div[tid="' + name + '"] .qv-object-content-container').css('opacity', '' + qvobjectcontentcontainerbgtrans);
                                    $('div[tid="' + name + '"] .qv-object-content-container').css('filter', 'alpha(opacity=' + (qvobjectcontentcontainerbgtrans * 100) + ')');

                                    // content container
                                    $('div[tid="' + name + '"] .qv-object-content-container').css('background', '' + qvobjectcontentcontainerbg);
                                    $('div[tid="' + name + '"] .qv-object-content-container').css('color', '' + qvobjectcontentcontainercolor);
                                    $('div[tid="' + name + '"] article').css('background', '' + qvobjectcontentcontainerbg);
                                    $('div[tid="' + name + '"] article').css('font-size', '' + objfontsize);
                                    $('div[tid="' + name + '"] .qv-object-content-container').css('font-size', '' + objfontsize);

                                    //console.log('div[tid="' + value + '"]'+border[index]);


                                    /*
                                    								// objtransparency

                                    								$('div[tid="' + value + '"]').css('opacity', objtransparency + "");
                                    								$('div[tid="' + value + '"]').css('filter', 'alpha(opacity='+ (objtransparency* 100) +')');

                                    								// border
                                    								$('div[tid="' + value + '"]').css('border', border + "");

                                    */

                                    //qv-discrete-color-legend

                                    $('div[tid="' + name + '"] .qv-discrete-color-legend').css('color', '' + qvobjectcontentcontainercolor);

                                    //cl-title dcl-title

                                    $('div[tid="' + name + '"] .dcl-title-inner').css('color', '' + qvobjectcontentcontainercolor);



                                    // hoverover border qvobject
									//qv-object-nav
                                    $('div[tid="' + name + '"] .qv-object-wrapper').hover(function() {
                                            //$('div[tid="' + value + '"] .qv-object-wrapper').css({hoverborder});
                                            // icon color
                                            
											
											if(layout.navstyle){
												if ($('div[tid="' + name + '"] .qv-object-nav a')) {
													//	alert(1);
													$('div[tid="' + name + '"] .qv-object-nav a').css('background-color', '' + bgcolor);
													$('div[tid="' + name + '"] .qv-object-nav a').css('color', '' + txtcolor);
													$('div[tid="' + name + '"] .qv-object-nav a').css('border', '2px solid ' + txtcolor);
													//a[tid="nav-menu-zoom-out"]
													$('div[tid="' + value + '"] a[tid="nav-menu-zoom-out"]').mousemove(function() {
														if ($('div[tid="' + name + '"] a[tid="nav-menu-zoom-out"]')) {
															$('div[tid="' + name + '"] .qv-object-nav a').css('background-color', '');
															$('div[tid="' + name + '"] .qv-object-nav a').css('color', '' + txtcolor);
															$('div[tid="' + name + '"] .qv-object-nav a').css('border', '');
														}
													});
                                            	}
											}else{
												if ($('div[tid="' + name + '"] .qv-object-nav a')) {
                                                //	alert(1);
													$('div[tid="' + name + '"] .qv-object-nav a').css('background-color', 'white');
													$('div[tid="' + name + '"] .qv-object-nav a').css('color', 'black');
													$('div[tid="' + name + '"] .qv-object-nav a').css('border', '2px solid black');
													//a[tid="nav-menu-zoom-out"]
													$('div[tid="' + value + '"] a[tid="nav-menu-zoom-out"]').mousemove(function() {
														if ($('div[tid="' + name + '"] a[tid="nav-menu-zoom-out"]')) {
															$('div[tid="' + name + '"] .qv-object-nav a').css('background-color', '');
															$('div[tid="' + name + '"] .qv-object-nav a').css('color', 'black');
															$('div[tid="' + name + '"] .qv-object-nav a').css('border', '');
														}
													});
												}
											}
											
											
                                            // end
                                        },
                                        function() {});
                                });


                            }


                        });
                    });

                    console.log(objid.length);

                    $.each(objid, function(k, name) {


                        console.log(name);
                        // call array here

                        window.setTimeout(function() {

                        }, 1000);



                    });




                }


                // end	



                str = '';
                details = '';

                // console.log("Total Items : " + countItem);

                $.each(layout.listItems, function(index, value) {
                    $.each(value, function(index, value) {

                        /*
                        bgcolor
                        objid 
                        txtcolor
                        txtalin
                        qvobjectcontentcontainer
                        label
							
                        */

                        //console.log("Other Viz : "+index + ": " + value);

                        // ADD POROP
                        if (index == 'objid') {
                            obj.push(value);
                        }
                        if (index == 'bgcolor') {
                            bg.push(value);
                        }
                        if (index == 'txtcolor') {
                            txtcolor.push(value);
                        }
                        if (index == 'txtalin') {
                            txtalin.push(value);
                        }
                        if (index == 'qvobjectcontentcontainerbg') {
                            contentcontainerbg.push(value);
                        }
                        if (index == 'qvobjectcontentcontainercolor') {
                            contentcontainercolor.push(value);
                        }
                        if (index == 'border') {
                            border.push(value);
                        }
                        if (index == 'hideheader') {
                            hideheader.push(value);
                        }
                        if (index == 'objtransparency') {
                            objtransparency.push(value);
                        }
                        if (index == 'qvobjectcontentcontainerbgtrans') {
                            contentcontainerbgtrans.push(value);
                        }
                        if (index == 'objfontsize') {
                            objfontsize.push(value);
                        }




                        // end

                    });
                });


                // for table

                $.each(layout.listItems2, function(index, value) {
                    $.each(value, function(index, value) {

                        /*
                        objidtable
                        bgcolortable
                        thcolortable
                        thalinetable
                        thhovertable
                        */

                        //	console.log("Table : "+index + ": " + value);

                        // ADD POROP
                        if (index == 'objidtable') {
                            table.push(value);
                        }
                        if (index == 'bgcolortable') {
                            tablebg.push(value);
                        }
                        if (index == 'thcolortable') {
                            tableth.push(value);
                        }
                        if (index == 'thalinetable') {
                            tablethaline.push(value);
                        }
                        if (index == 'thhovertable') {
                            tablethhover.push(value);
                        }
                        if (index == 'columnwidthadjuster') {
                            columnwidthadjuster.push(value);
                        }

                        if (index == 'eventrtable') {
                            eventrtable.push(value);
                        }
                        if (index == 'oddtrtable') {
                            oddtrtable.push(value);
                        }
                        if (index == 'thfontsize') {
                            thfontsize.push(value);
                        }
                        if (index == 'tdfontsize') {
                            tdfontsize.push(value);
                        }
                        if (index == 'pivottable') {
                            pivottable.push(value);
                        }




                        // end

                    });
                });

                // end

                var objidtst = "";
                $.each(obj, function(index, value) {
                    //objidtst+=value;

                    // hide header

                    if (hideheader[index]) {
                        $('div[tid="' + value + '"] header').hide();
                    } else {
                        $('div[tid="' + value + '"] header').show();
                    }

                    // object title text qv-object-title-text
                    $('div[tid="' + value + '"] .qv-object-title-text').css('color', '' + txtcolor[index]);
                    $('div[tid="' + value + '"] .qv-object-title-text').css('background-color', '' + bg[index]);



                    // object title container qv-object-title
                    $('div[tid="' + value + '"] .qv-object-title').css('background-color', '' + bg[index]);
                    $('div[tid="' + value + '"] .qv-object-title-text').css('margin-left', '' + txtalin[index] + '%');
                    $('div[tid="' + value + '"] .qv-object-title').css('padding-right', '0px');

                    // header
                    $('div[tid="' + value + '"] header').css('padding', '3px');
                    $('div[tid="' + value + '"] header').css('background-color', '' + bg[index]);
                    $('div[tid="' + value + '"] header h1').css('font-size', '' + objfontsize[index]);
                    $('div[tid="' + value + '"] header h1 div').css('font-size', '' + objfontsize[index]);



                    // qv-object-content-container transparency

                    $('div[tid="' + value + '"] .qv-object-content-container').css('opacity', '' + contentcontainerbgtrans[index]);
                    $('div[tid="' + value + '"] .qv-object-content-container').css('filter', 'alpha(opacity=' + (contentcontainerbgtrans[index] * 100) + ')');


                    // content container
                    $('div[tid="' + value + '"] .qv-object-content-container').css('background-color', '' + contentcontainerbg[index]);
                    $('div[tid="' + value + '"] .qv-object-content-container').css('color', '' + contentcontainercolor[index]);
                    $('div[tid="' + value + '"] article').css('background-color', '' + contentcontainerbg[index]);
                    $('div[tid="' + value + '"] article').css('font-size', '' + objfontsize[index]);
                    $('div[tid="' + value + '"] .qv-object-content-container').css('font-size', '' + objfontsize[index]);

                    //console.log('div[tid="' + value + '"]'+border[index]);

                    // objtransparency

                    $('div[tid="' + value + '"]').css('opacity', objtransparency[index] + "");
                    $('div[tid="' + value + '"]').css('filter', 'alpha(opacity=' + (objtransparency[index] * 100) + ')');

                    // border
                    $('div[tid="' + value + '"]').css('border', border[index] + "");

                    //qv-discrete-color-legend

                    $('div[tid="' + value + '"] .qv-discrete-color-legend').css('color', '' + contentcontainercolor[index]);

                    //cl-title dcl-title

                    $('div[tid="' + value + '"] .dcl-title-inner').css('color', '' + contentcontainercolor[index]);

                    // border qvobject

                    /*
					
					$('div[tid="' + value + '"] .qv-object-wrapper').css({"border-style":, "border-color":"#000",
																			"border-right-width":"1px","border-top-width":"1px",
																			"border-left-width":"1px","border-bottom-width":"1px",
																			"border-top-width":"1px"});

					*/


                    // hoverover border qvobject
                    $('div[tid="' + value + '"] .qv-object-wrapper').hover(function() {

                            //$('div[tid="' + value + '"] .qv-object-wrapper').css({hoverborder});

                            // icon color

                            if ($('div[tid="' + value + '"] .qv-object-nav a')) {
                                //	alert(1);

                                $('div[tid="' + value + '"] .qv-object-nav a').css('background-color', '' + bg[index]);
                                $('div[tid="' + value + '"] .qv-object-nav a').css('color', '' + txtcolor[index]);
                                $('div[tid="' + value + '"] .qv-object-nav a').css('border', '2px solid ' + txtcolor[index]);
                                //a[tid="nav-menu-zoom-out"]
                                $('div[tid="' + value + '"] a[tid="nav-menu-zoom-out"]').mousemove(function() {
                                    if ($('div[tid="' + value + '"] a[tid="nav-menu-zoom-out"]')) {
                                        $('div[tid="' + value + '"] .qv-object-nav a').css('background-color', '');
                                        $('div[tid="' + value + '"] .qv-object-nav a').css('color', '' + txtcolor[index]);
                                        $('div[tid="' + value + '"] .qv-object-nav a').css('border', '');
                                    }

                                });
                            }
                            // end
                        },
                        function() {
                            /*
                            $(this).css('border-style', 'solid');
                            $(this).css('border-color', '#000');
                            $(this).css('border-right-width', '1px');
                            $(this).css('border-top-width', '1px');
                            $(this).css('border-left-width', '1px');
                            $(this).css('border-bottom-width', '1px');
*/

                        });

                });

                // for table

                $.each(table, function(index, value) {

                    if (pivottable[index]) {
                        // for pivot
                        $('div[tid="' + value + '"] tbody tr th').css("background-color", tablebg[index]);

                        $('div[tid="' + value + '"] tbody tr:even').css("background-color", eventrtable[index]);
                        $('div[tid="' + value + '"] tbody tr:odd').css("background-color", oddtrtable[index]);
                        // end
                    }

                    $('div[tid="' + value + '"] .qv-st-header-wrapper').css("background-color", tablebg[index]);

                    $('div[tid="' + value + '"] th .qv-st-value').css("color", tableth[index]);

                    $('div[tid="' + value + '"] .qv-st-header-cell-search').css("color", tableth[index]);

                    $('div[tid="' + value + '"] th .qv-st-value').css("text-align", tablethaline[index]);

                    $('div[tid="' + value + '"] th .qv-st-value span').css("font-size", thfontsize[index]);

                    $('div[tid="' + value + '"] td .qv-st-value span').css("font-size", tdfontsize[index]);



                    $('div[tid="' + value + '"] th').hover(function() {
                        $(this).css("background-color", tablethhover[index]);
                    }, function() {
                        $(this).css("background-color", tablebg[index]);

                    });

                    if (columnwidthadjuster[index]) {
                        $('div[tid="' + value + '"] .column-width-adjuster').css('display', 'none');
                    } else {
                        $('div[tid="' + value + '"] .column-width-adjuster').css('display', '');
                    }

                    $('div[tid="' + value + '"] div[tid="qv-st-data"] tbody tr:even').css("background-color", eventrtable[index]);
                    $('div[tid="' + value + '"] div[tid="qv-st-data"] tbody tr:odd').css("background-color", oddtrtable[index]);

                });

                // $element.html(objidtst);

            }
        };

    });
