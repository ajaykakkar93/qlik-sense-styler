define(["qlik","ng!$q", "underscore"],
    function(qlik,o,_) {
	  "use strict";
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
                                  /*
								  sheetid: {
                                        type: "string",
                                        label: "Sheet Id",
                                        ref: "prop.sheetid",
                                        defaultValue: "",
                                        expression: "optional"
                                    },
*/
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
                                    }




                                }
                            },

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
                                        label: "Background Color",
                                        ref: "bgcolor",
                                        defaultValue: "",
                                        expression: "optional"
                                    },

                                    txtcolor: {
                                        type: "string",
                                        label: "Text Color",
                                        ref: "txtcolor",
                                        defaultValue: "",
                                        expression: "optional"
                                    },
                                    txtalin: {
                                        type: "string",
                                        label: "Text Alignment",
                                        ref: "txtalin",
                                        defaultValue: "",
                                        expression: "optional"
                                    }

                                    // end


                                }
                            },
							// end list
							
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
									thhovertable: {
										type: "string",
										label: "Hover Color",
										ref: "thhovertable",
										defaultValue: "",
										expression: "optional"
									}

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
                var countItem = layout.listItems.length;

				var BackgroundTrans = layout.prop.transp,
				imgurl = layout.prop.imgurl,
				bgcolor = layout.prop.bodycolor,
				enable = layout.prop.bgenable;
				
				var RGBAString = 'rgba(255,255,255,' + BackgroundTrans +')',
				app = qlik.currApp(this);
				
				var obj = [],
                    bg = [],
                    txtcolor = [],
                    txtalin = [];
					
				var tablebg = [],
                    tableth = [],
                    tablethaline = [],
                    tablethhover = [],
                    table = [];
				
				//console.log("sheetid="+layout.props.selectedSheet);
					console.log(layout.bgenable);
			if(enable){
			
				 $("#grid-wrap").css("background-color", "" + bgcolor);
				 $('div .qv-object-x-sheet-styler').css('background-color', '' + bgcolor);			
			 }else{
			 	$('.qv-panel-content.flex-row').css('background-image', 'url('+imgurl+')');
				$('.qvt-sheet').css('background-color',RGBAString); 
					
			}

                // sheet title container
                $(".sheet-title-container").css("height", "" + layout.prop.titleheight);

                // sheet title
                $('.sheet-title-text').css('font-size', "" + layout.prop.titlefontsize);
                $('#sheet-title').css('height', "" + layout.prop.titleheight);
                $('#sheet-title').css('color', "" + layout.prop.titlecolor);

                // qv-inner-object all object
                $('.qv-inner-object').css('margin', '2px 2px');


					var str='',details='';
				  if (layout.debug) {
					 str='';
                    app.getAppObjectList('sheet', function(reply) {
                        var sheet = '',
                            chksheet =  layout.props.selectedSheet, //layout.prop.sheetid, // 0368fb8f-2b0b-47d4-b86a-238b831bff0b   layout.props.sheetid
                            bol = 0;
                        //alert(chksheet);

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

									str+="<tr>"	
									str+="<td>"	
									str +=type;
									str+="</td>"
									//str+="<td>"	
									app.getObjectProperties(v.name).then(function(model){
										var t=model.properties.title;
										console.log("Sheet Styler = type: "+type+" , title: "+t+" , obj-id: "+ name );
										details+="Sheet Styler = type: "+type+" , title: "+t+" , obj-id: "+'<input type="text" value="' + name + '">'+"<br>";
									});	
									//str+="</td>"
									str+="<td>"	
									str += '<input type="text" value="' + name + '">';
									str+="</td>"	
									str+="</tr>"	

                                    //   }

                                });
                            }
                        });

                        //	$('body').append('<hr>'+str+'<hr>');
						
						
						//	console.log('det:'+details);
						
						// 
						
                        $element.html(details+'<table style="  display: block; width: 90%; border: 1px solid #eee;  max-height: 320px; overflow: auto;">'+str+'</table>');
						$('.qv-object-x-sheet-styler').show();
                        //alert(str);
                    });

                } else {
                    $element.html('');
					$element.empty();
					$('.qv-object-x-sheet-styler').hide();
                }
				
				str='';
				details='';
					

               // console.log("Total Items : " + countItem);

                $.each(layout.listItems, function(index, value) {
                    $.each(value, function(index, value) {

							/*
							bgcolor
							objid 
							txtcolor
							txtalin

							label
							*/
	
						//console.log("Other Viz : "+index + ": " + value);
						
						// ADD POROP
						if(index=='objid'){
							obj.push(value);
						}
						if(index=='bgcolor'){
							bg.push(value);
						}
						if(index=='txtcolor'){
							txtcolor.push(value);
						}
						if(index=='txtalin'){
							txtalin.push(value);
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
						if(index=='objidtable'){
							table.push(value);
						}
						if(index=='bgcolortable'){
							tablebg.push(value);
						}
						if(index=='thcolortable'){
							tableth.push(value);
						}
						if(index=='thalinetable'){
							tablethaline.push(value);
						}
						if(index=='thhovertable'){
							tablethhover.push(value);
						}
						// end
						
                    });
                });
				
				// end
				
				
				
				var objidtst="";
				 $.each(obj, function(index, value) {
					//objidtst+=value;
					
					
					// object title text qv-object-title-text
                    $('div[tid="' + value + '"] .qv-object-title-text').css('color', '' + txtcolor[index]);
                    $('div[tid="' + value + '"] .qv-object-title-text').css('background-color', '' + bg[index]);

				
                    // object title container qv-object-title
                    $('div[tid="' + value + '"] .qv-object-title').css('background-color', '' + bg[index]);
                    $('div[tid="' + value + '"] .qv-object-title').css('padding-left', '' + txtalin[index] + '%');
                    $('div[tid="' + value + '"] .qv-object-title').css('padding-right', '0px');

                    // header
                    $('div[tid="' + value + '"] header').css('padding', '3px');
                    $('div[tid="' + value + '"] header').css('background-color', '' + bg[index]);

                    // border qvobject

                    $('div[tid="' + value + '"] .qv-object-wrapper').css('border-style', 'solid');
                    $('div[tid="' + value + '"] .qv-object-wrapper').css('border-color', '#000');
                    $('div[tid="' + value + '"] .qv-object-wrapper').css('border-right-width', '1px');
                    $('div[tid="' + value + '"] .qv-object-wrapper').css('border-top-width', '1px');
                    $('div[tid="' + value + '"] .qv-object-wrapper').css('border-left-width', '1px');
                    $('div[tid="' + value + '"] .qv-object-wrapper').css('border-bottom-width', '1px');

                    // hoverover border qvobject
                    $('div[tid="' + value + '"] .qv-object-wrapper').hover(function() {

                            $(this).css('border-style', 'solid');
                            $(this).css('border-color', '#00bfff');
                            $(this).css('border-right-width', '1px');
                            $(this).css('border-top-width', '1px');
                            $(this).css('border-left-width', '1px');
                            $(this).css('border-bottom-width', '1px');
							$('div[tid="' + value + '"] .column-width-adjuster').css('display','none');
							
								// icon color

						if($('div[tid="' + value + '"] .qv-object-nav a')){
						//	alert(1);
								$('div[tid="' + value + '"] .qv-object-nav a').css('background-color', '' + bg[index]);
								$('div[tid="' + value + '"] .qv-object-nav a').css('color', '' + txtcolor[index]);
								$('div[tid="' + value + '"] .qv-object-nav a').css('border', '2px solid ' + txtcolor[index]);
								
						/*	
							if($('div[tid="' + value + '"] .zoom')){
								
									$('div[tid="' + value + '"] .qv-object-nav a').css('background-color', ''+ bg[index]);
									$('div[tid="' + value + '"] .qv-object-nav a').css('color', '' + txtcolor[index]);
									$('div[tid="' + value + '"] .qv-object-nav a').css('border', '2px');
									$('div[tid="' + value + '"] .qv-object-nav a').css('padding', '2px');
									$('div[tid="' + value + '"] .qv-object-nav a').css('font-size', '15px');
									$('div[tid="' + value + '"] .qv-object-nav visible').css('height', '28px');
									$('div[tid="' + value + '"] .qv-object-nav visible').css('margin-top', '5px');
									
								
							}
						*/
								
								
						}		

					// end


                        },
                        function() {

                            $(this).css('border-style', 'solid');
                            $(this).css('border-color', '#000');
                            $(this).css('border-right-width', '1px');
                            $(this).css('border-top-width', '1px');
                            $(this).css('border-left-width', '1px');
                            $(this).css('border-bottom-width', '1px');


                        });
					
					
					
					
					
					
				 });
				 
				 // for table
				 
				$.each(table, function(index, value) {

                    $('div[tid="' + value + '"] .qv-st-header-wrapper').css("background-color", tablebg[index]);

                    $('div[tid="' + value + '"] th .qv-st-value').css("color", tableth[index]);

                    $('div[tid="' + value + '"] th .qv-st-value').css("text-align", tablethaline[index]);


                    $('div[tid="' + value + '"] th').hover(function() {
                        $(this).css("background-color", tablethhover[index]);
                    }, function() {
                        $(this).css("background-color", "");
                    });

                });
				 
               // $element.html(objidtst);

            }
        };

    });