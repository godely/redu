(function(b){var a;b.rails=a={linkClickSelector:"a[data-confirm], a[data-method], a[data-remote]",formSubmitSelector:"form",formInputClickSelector:"form input[type=submit], form input[type=image], form button[type=submit], form button:not([type])",disableSelector:"input[data-disable-with], button[data-disable-with], textarea[data-disable-with]",enableSelector:"input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled",requiredInputSelector:"input[name][required],textarea[name][required]",fileInputSelector:"input:file",CSRFProtection:function(d){var c=b('meta[name="csrf-token"]').attr("content");if(c){d.setRequestHeader("X-CSRF-Token",c)}},fire:function(f,c,e){var d=b.Event(c);f.trigger(d,e);return d.result!==false},confirm:function(c){return confirm(c)},ajax:function(c){return b.ajax(c)},handleRemote:function(f){var h,d,g,c=f.data("type")||(b.ajaxSettings&&b.ajaxSettings.dataType);if(a.fire(f,"ajax:before")){if(f.is("form")){h=f.attr("method");d=f.attr("action");g=f.serializeArray();var e=f.data("ujs:submit-button");if(e){g.push(e);f.data("ujs:submit-button",null)}}else{h=f.data("method");d=f.attr("href");g=null}a.ajax({url:d,type:h||"GET",data:g,dataType:c,beforeSend:function(j,i){if(i.dataType===undefined){j.setRequestHeader("accept","*/*;q=0.5, "+i.accepts.script)}return a.fire(f,"ajax:beforeSend",[j,i])},success:function(j,i,k){f.trigger("ajax:success",[j,i,k])},complete:function(j,i){f.trigger("ajax:complete",[j,i])},error:function(k,i,j){f.trigger("ajax:error",[k,i,j])}})}},handleMethod:function(g){var d=g.attr("href"),i=g.data("method"),e=b("meta[name=csrf-token]").attr("content"),h=b("meta[name=csrf-param]").attr("content"),f=b('<form method="post" action="'+d+'"></form>'),c='<input name="_method" value="'+i+'" type="hidden" />';if(h!==undefined&&e!==undefined){c+='<input name="'+h+'" value="'+e+'" type="hidden" />'}f.hide().append(c).appendTo("body");f.submit()},disableFormElements:function(c){c.find(a.disableSelector).each(function(){var d=b(this),e=d.is("button")?"html":"val";d.data("ujs:enable-with",d[e]());d[e](d.data("disable-with"));d.attr("disabled","disabled")})},enableFormElements:function(c){c.find(a.enableSelector).each(function(){var d=b(this),e=d.is("button")?"html":"val";if(d.data("ujs:enable-with")){d[e](d.data("ujs:enable-with"))}d.removeAttr("disabled")})},allowAction:function(c){var d=c.data("confirm"),e=false,f;if(!d){return true}if(a.fire(c,"confirm")){e=a.confirm(d);f=a.fire(c,"confirm:complete",[e])}return e&&f},blankInputs:function(h,e,g){var d=b(),f,c=e||"input,textarea";h.find(c).each(function(){f=b(this);if(g?f.val():!f.val()){d=d.add(f)}});return d.length?d:false},nonBlankInputs:function(d,c){return a.blankInputs(d,c,true)},stopEverything:function(c){c.stopImmediatePropagation();return false},callFormSubmitBindings:function(d){var c=d.data("events"),e=true;if(c!==undefined&&c.submit!==undefined){b.each(c.submit,function(f,g){if(typeof g.handler==="function"){return e=g.handler(g.data)}})}return e}};if("ajaxPrefilter" in b){b.ajaxPrefilter(function(c,e,d){a.CSRFProtection(d)})}else{b(document).ajaxSend(function(c,d){a.CSRFProtection(d)})}b(a.linkClickSelector).live("click.rails",function(d){var c=b(this);if(!a.allowAction(c)){return a.stopEverything(d)}if(c.data("remote")!==undefined){a.handleRemote(c);return false}else{if(c.data("method")){a.handleMethod(c);return false}}});b(a.formSubmitSelector).live("submit.rails",function(h){var f=b(this),g=f.data("remote")!==undefined,d=a.blankInputs(f,a.requiredInputSelector),c=a.nonBlankInputs(f,a.fileInputSelector);if(!a.allowAction(f)){return a.stopEverything(h)}if(d&&a.fire(f,"ajax:aborted:required",[d])){return !g}if(g){if(c){return a.fire(f,"ajax:aborted:file",[c])}if(!b.support.submitBubbles&&a.callFormSubmitBindings(f)===false){return a.stopEverything(h)}a.handleRemote(f);return false}else{setTimeout(function(){a.disableFormElements(f)},13)}});b(a.formInputClickSelector).live("click.rails",function(e){var d=b(this);if(!a.allowAction(d)){return a.stopEverything(e)}var c=d.attr("name"),f=c?{name:c,value:d.val()}:null;d.closest("form").data("ujs:submit-button",f)});b(a.formSubmitSelector).live("ajax:beforeSend.rails",function(c){if(this==c.target){a.disableFormElements(b(this))}});b(a.formSubmitSelector).live("ajax:complete.rails",function(c){if(this==c.target){a.enableFormElements(b(this))}})})(jQuery);jQuery(function(){$(".flash-message").parent().next().css("marginTop","10px");$(".flash-message .close-flash").click(function(a){$(this).parent().slideToggle();$("#content").css("marginTop","20px");a.preventDefault()});$("#nav-account").hover(function(){$(this).find(".username").toggleClass("hover");$(this).find("ul").toggle()});$("a.reply-status, .cancel",".statuses").live("click",function(a){$(this).parents("ul:first").next(".create-response").slideToggle();$(this).parents(".create-response:first").slideToggle();a.preventDefault()});$(".responses",".statuses").each(function(a,b){$(this).find("> ol > li:gt(2)").hide();$(this).find(".toggle-statuses .qty").html($(this).find("ol > li").length)});$(".toggle-statuses",".statuses").live("click",function(a){$(this).prev().find("> li:hidden").slideDown();a.preventDefault()});$("input[type=submit], .cancel, .char-limit",".inform-my-status").hide();$(".inform-my-status textarea").live("focus",function(a){$(this).parents("form").find("input[type=submit], .cancel, .char-limit").fadeIn()});$(".inform-my-status textarea").live("blur",function(a){$(this).parents("form").find("input[type=submit], .cancel, .char-limit").fadeOut()});$("input[type=text], input[type=password], input[type=radio], input[type=checkbox]","form.highlightable").focus(function(){var a=$(this).attr("id")||null;if(a){$("label[for="+a+"]").addClass("focus")}}).blur(function(){var a=$(this).attr("id")||null;if(a){$("label[for="+a+"]").removeClass("focus")}});jQuery.fn.slug=function(){var c=$(this);var a=stripAccent(c.val());var b=a.replace(/\s+/g,"-");return b.replace(/[^a-zA-Z0-9\-]/g,"").toLowerCase()};$(".new-resource li").live("hover",function(){var a="<strong>"+$(this).html()+"</strong>";a+=$(this).find("a").attr("title");$(".new-resource .explanation").html(a)});$("#new_subject .new-resource li a").live("click",function(){$("#new_subject .new-resource li").removeClass("selected");$(this).parents("li:first").addClass("selected")});$(".expand, .unexpand","#space-subjects .subjects").click(function(){$(this).toggleClass("expand");$(this).toggleClass("unexpand");$(this).parents("li:first").toggleClass("open");$(this).next().slideToggle("fast")});$("#resource .student-actions .action-help").click(function(a){$(this).parents("li:first").toggleClass("selected");$(".statuses-wrapper","#resource").slideToggle();a.preventDefault()});$("#seminar_external_resource").live("change",function(){youtubePreview($("#seminar_external_resource"))});$("table.common tr:even:not(.invite):not(.message)").addClass("odd");$("#select_all").change(function(b){var a=$(this);if(a.is(":checked")){$("input[type=checkbox].autoCheck").attr("checked",true)}else{$("input[type=checkbox].autoCheck").attr("checked",false)}return true});$("#global-courses .filters .filter").each(function(){var a=$(this).find("input");if(a.is(":checked")){$(this).addClass("checked")}});$("#global-courses .filters .filter").click(function(){var a=$(this).find("input[type=checkbox]");if(a.is(":checked")){$(this).removeClass("checked");a.attr("checked","")}else{$(this).addClass("checked");a.attr("checked","checked")}});$("#global-courses .courses .expand").live("click",function(){$(this).toggleClass("unexpand");$(this).parents(":first").next().slideToggle()});$(".parent-height").height(function(b,a){$(this).height($(this).parent().height())});$("#user_email").click(function(){$("#user_email_confirmation").slideDown();$("#user_email_confirmation").prev().slideDown()});$("#user_email_confirmation").blur(function(){email_val=$("#user_email").val();confirmation_val=$(this).val();if(email_val!=confirmation_val){$("#user_email_confirmation-error").remove();$(this).after('<p id="user_email_confirmation-error" class="errorMessageField">Os e-mails digitados não são iguais.</p>')}else{$("#user_email_confirmation-error").remove()}});$(".tiptip").tipTip();$(".form-common").ajaxComplete(function(){$(".tiptip").tipTip()});$(".form-common .tiptip").each(function(){var a=$(this).next("label");a.prepend($(this))});$(".tiptip-lite").each(function(){var a=$("<span class='tiptip question-blue_12_12'/>");a.attr("title",$(this).attr("title"));a.tipTip();$(this).after(a);a.position({my:"left center",at:"right center",of:$(this),offset:"10px 0",})});$("#space-materials .new-folder .button").click(function(a){$(this).next(".new-folder-inner").toggle();a.preventDefault()});$(".form-common, .form-loader").live("ajax:before",function(){$(this).find("input[type=submit]").loadingStart()});$(".form-common, .form-loader").live("ajax:complete",function(){$(this).find("input[type=submit]").loadingComplete()});$("a[data-remote=true]").live("ajax:before",function(){$(this).addClass("link-loading")});$("a[data-remote=true]").live("ajax:complete",function(){$(this).removeClass("link-loading")});$.fn.loadingStart=function(){return this.each(function(){$bt=$(this);$bt.addClass("bt-loading")})};$.fn.loadingComplete=function(){return this.each(function(){$bt=$(this);$bt.removeClass("bt-loading")})};$.fn.loadingToggle=function(){return this.each(function(){$bt=$(this);if($bt.hasClass("bt-loading")){$bt.loadingComplete()}else{$bt.loadingStart()}})}});function limitChars(c,a,b){var e=$("."+c).val();var d=e.length;if(d>a){$("."+c).val(e.substr(0,a));return false}else{$("."+b).html(a-d);return true}}function stripAccent(d){var c=[{re:/[\xC0-\xC6]/g,ch:"A"},{re:/[\xE0-\xE6]/g,ch:"a"},{re:/[\xC8-\xCB]/g,ch:"E"},{re:/[\xE8-\xEB]/g,ch:"e"},{re:/[\xCC-\xCF]/g,ch:"I"},{re:/[\xEC-\xEF]/g,ch:"i"},{re:/[\xD2-\xD6]/g,ch:"O"},{re:/[\xF2-\xF6]/g,ch:"o"},{re:/[\xD9-\xDC]/g,ch:"U"},{re:/[\xF9-\xFC]/g,ch:"u"},{re:/[\xE7]/g,ch:"c"},{re:/[\xC7]/g,ch:"C"},{re:/[\xD1]/g,ch:"N"},{re:/[\xF1]/g,ch:"n"}];for(var b=0,a=c.length;b<a;b++){d=d.replace(c[b].re,c[b].ch)}return d}function youtubePreview(a){regex=/youtube\.com\/watch\?v=([A-Za-z0-9._%-]*)[&\w;=\+_\-]*/;id=a.val().match(regex);if(id!=null){youtube_id=id[1];url="http://www.youtube.com/v/"+youtube_id+"&hl=en&fs=1";jQuery("#yt_preview_param").attr("value",url);jQuery("embed").attr("src",url);jQuery("#youtube_preview").show()}else{$("#youtube_preview").hide()}}function switchCourseFields(a){if(a==1){$("#upload_resource_field").show();$("#external_resource_field").hide();$("#youtube_preview").hide();$("#seminar_submit").hide()}else{$("#upload_resource_field").hide();$("#external_resource_field").show();youtubePreview($("#seminar_external_resource"));$("#seminar_submit").show()}}(function(a){a.fn.tipTip=function(c){var g={activation:"hover",keepAlive:false,maxWidth:"200px",edgeOffset:3,defaultPosition:"bottom",delay:400,fadeIn:200,fadeOut:200,attribute:"title",content:false,enter:function(){},exit:function(){}};var e=a.extend(g,c);if(a("#tiptip_holder").length<=0){var b=a('<div id="tiptip_holder" style="max-width:'+e.maxWidth+';"></div>');var d=a('<div id="tiptip_content"></div>');var f=a('<div id="tiptip_arrow"></div>');a("body").append(b.html(d).prepend(f.html('<div id="tiptip_arrow_inner"></div>')))}else{var b=a("#tiptip_holder");var d=a("#tiptip_content");var f=a("#tiptip_arrow")}return this.each(function(){var i=a(this);if(e.content){var l=e.content}else{var l=i.attr(e.attribute)}if(l!=""){if(!e.content){i.removeAttr(e.attribute)}var h=false;if(e.activation=="hover"){i.hover(function(){k()},function(){if(!e.keepAlive){j()}});if(e.keepAlive){b.hover(function(){},function(){j()})}}else{if(e.activation=="focus"){i.focus(function(){k()}).blur(function(){j()})}else{if(e.activation=="click"){i.click(function(){k();return false}).hover(function(){},function(){if(!e.keepAlive){j()}});if(e.keepAlive){b.hover(function(){},function(){j()})}}}}function k(){e.enter.call(this);d.html(l);b.hide().removeAttr("class").css("margin","0");f.removeAttr("style");var y=parseInt(i.offset()["top"]);var p=parseInt(i.offset()["left"]);var v=parseInt(i.outerWidth());var A=parseInt(i.outerHeight());var x=b.outerWidth();var s=b.outerHeight();var w=Math.round((v-x)/2);var o=Math.round((A-s)/2);var n=Math.round(p+w);var m=Math.round(y+A+e.edgeOffset);var t="";var C="";var u=Math.round(x-12)/2;if(e.defaultPosition=="bottom"){t="_bottom"}else{if(e.defaultPosition=="top"){t="_top"}else{if(e.defaultPosition=="left"){t="_left"}else{if(e.defaultPosition=="right"){t="_right"}}}}var r=(w+p)<parseInt(a(window).scrollLeft());var q=(x+p)>parseInt(a(window).width());if((r&&w<0)||(t=="_right"&&!q)||(t=="_left"&&p<(x+e.edgeOffset+5))){t="_right";C=Math.round(s-13)/2;u=-12;n=Math.round(p+v+e.edgeOffset);m=Math.round(y+o)}else{if((q&&w<0)||(t=="_left"&&!r)){t="_left";C=Math.round(s-13)/2;u=Math.round(x);n=Math.round(p-(x+e.edgeOffset+5));m=Math.round(y+o)}}var z=(y+A+e.edgeOffset+s+8)>parseInt(a(window).height()+a(window).scrollTop());var B=((y+A)-(e.edgeOffset+s+8))<0;if(z||(t=="_bottom"&&z)||(t=="_top"&&!B)){if(t=="_top"||t=="_bottom"){t="_top"}else{t=t+"_top"}C=s;m=Math.round(y-(s+5+e.edgeOffset))}else{if(B|(t=="_top"&&B)||(t=="_bottom"&&!z)){if(t=="_top"||t=="_bottom"){t="_bottom"}else{t=t+"_bottom"}C=-12;m=Math.round(y+A+e.edgeOffset)}}if(t=="_right_top"||t=="_left_top"){m=m+5}else{if(t=="_right_bottom"||t=="_left_bottom"){m=m-5}}if(t=="_left_top"||t=="_left_bottom"){n=n+5}f.css({"margin-left":u+"px","margin-top":C+"px"});b.css({"margin-left":n+"px","margin-top":m+"px"}).attr("class","tip"+t);if(h){clearTimeout(h)}h=setTimeout(function(){b.stop(true,true).fadeIn(e.fadeIn)},e.delay)}function j(){e.exit.call(this);if(h){clearTimeout(h)}b.fadeOut(e.fadeOut)}}})}})(jQuery);$(function(){var a={};a.fileInputs=function(){var f=$(this),b=f.val(),e=b.split("\\"),c=e[e.length-1],d=f.siblings(".button"),g=f.siblings(".file-holder");if(c!==""){d.text("Escolhido");g.remove();d.after('<span class="file-holder">'+c+"</span>")}};a.toggleFields=function(c){var b=$(c).parents("tr:first");b.find(".folder-name, .rename-folder").toggle()};a.toggleSpinner=function(b){$(b).next(".spinner:first").toggle()};a.toggleLoader=function(){$("#file_list table").toggle();$("#loading-files").toggle()};a.setup=function(){var b=$(this);b.val("");a.refresh()};a.refresh=function(){$(document).ajaxComplete(function(){$("table.common tr:even").addClass("odd")})};a.setup();$(".new-folder .button").live("click",function(b){$(".new-file-inner:visible","#folder-admin").slideUp("fast");$(this).next(".holder").slideToggle("fast");b.preventDefault()});$(".new-file .button").live("click",function(b){$(".new-folder-inner:visible","#folder-admin").slideUp("fast");$(this).next(".holder").slideToggle("fast");b.preventDefault()});$("#folder-admin .new-file .file-wrapper input[type=file]").live("change focus click",a.fileInputs);$(".rename, .rename-folder .cancel").live("click",function(b){a.toggleFields(this);b.preventDefault()});$(".delete").live("click",function(b){a.toggleSpinner(this);b.preventDefault()})});$(function(){$overlay=$("<div/>",{id:"lights_dimmed","class":"clearfix"}).hide();$("body").prepend($overlay);$("#lights").toggle(function(b){var a=$(document).height();$(".student-actions").css("position","relative");$(".stage").css("position","relative");$(".statuses-wrapper").css("position","relative").css("backgroundColor","white");$("#lights_dimmed").css("height",a).fadeIn();$(this).html("Acender luzes");b.preventDefault()},function(){$("#lights_dimmed").fadeOut();$(this).html("Apagar luzes")});$(".statuses-wrapper").live("click",function(){var a=$(document).height();$("#lights_dimmed:visible").css("height",a)});$("#do_lecture").live("ajax:before ajax:complete",function(){$(this).find("label[for='Aula_finalizada']").loadingToggle()})});var params={allowfullscreen:"true",allowscriptaccess:"always",bgcolor:"#ffffff"};var attributes={id:"player",name:"player"};var swfobject=function(){var b="undefined",Q="object",n="Shockwave Flash",p="ShockwaveFlash.ShockwaveFlash",P="application/x-shockwave-flash",m="SWFObjectExprInst",j=window,K=document,T=navigator,o=[],N=[],i=[],d=[],J,Z=null,M=null,l=null,e=false,A=false;var h=function(){var v=typeof K.getElementById!=b&&typeof K.getElementsByTagName!=b&&typeof K.createElement!=b,AC=[0,0,0],x=null;if(typeof T.plugins!=b&&typeof T.plugins[n]==Q){x=T.plugins[n].description;if(x&&!(typeof T.mimeTypes!=b&&T.mimeTypes[P]&&!T.mimeTypes[P].enabledPlugin)){x=x.replace(/^.*\s+(\S+\s+\S+$)/,"$1");AC[0]=parseInt(x.replace(/^(.*)\..*$/,"$1"),10);AC[1]=parseInt(x.replace(/^.*\.(.*)\s.*$/,"$1"),10);AC[2]=/r/.test(x)?parseInt(x.replace(/^.*r(.*)$/,"$1"),10):0}}else{if(typeof j.ActiveXObject!=b){var y=null,AB=false;try{y=new ActiveXObject(p+".7")}catch(t){try{y=new ActiveXObject(p+".6");AC=[6,0,21];y.AllowScriptAccess="always"}catch(t){if(AC[0]==6){AB=true}}if(!AB){try{y=new ActiveXObject(p)}catch(t){}}}if(!AB&&y){try{x=y.GetVariable("$version");if(x){x=x.split(" ")[1].split(",");AC=[parseInt(x[0],10),parseInt(x[1],10),parseInt(x[2],10)]}}catch(t){}}}}var AD=T.userAgent.toLowerCase(),r=T.platform.toLowerCase(),AA=/webkit/.test(AD)?parseFloat(AD.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,q=false,z=r?/win/.test(r):/win/.test(AD),w=r?/mac/.test(r):/mac/.test(AD);
/*@cc_on q=true;@if(@_win32)z=true;@elif(@_mac)w=true;@end@*/
return{w3cdom:v,pv:AC,webkit:AA,ie:q,win:z,mac:w}}();var L=function(){if(!h.w3cdom){return}f(H);if(h.ie&&h.win){try{K.write("<script id=__ie_ondomload defer=true src=//:><\/script>");J=C("__ie_ondomload");if(J){I(J,"onreadystatechange",S)}}catch(q){}}if(h.webkit&&typeof K.readyState!=b){Z=setInterval(function(){if(/loaded|complete/.test(K.readyState)){E()}},10)}if(typeof K.addEventListener!=b){K.addEventListener("DOMContentLoaded",E,null)}R(E)}();function S(){if(J.readyState=="complete"){J.parentNode.removeChild(J);E()}}function E(){if(e){return}if(h.ie&&h.win){var v=a("span");try{var u=K.getElementsByTagName("body")[0].appendChild(v);u.parentNode.removeChild(u)}catch(w){return}}e=true;if(Z){clearInterval(Z);Z=null}var q=o.length;for(var r=0;r<q;r++){o[r]()}}function f(q){if(e){q()}else{o[o.length]=q}}function R(r){if(typeof j.addEventListener!=b){j.addEventListener("load",r,false)}else{if(typeof K.addEventListener!=b){K.addEventListener("load",r,false)}else{if(typeof j.attachEvent!=b){I(j,"onload",r)}else{if(typeof j.onload=="function"){var q=j.onload;j.onload=function(){q();r()}}else{j.onload=r}}}}}function H(){var t=N.length;for(var q=0;q<t;q++){var u=N[q].id;if(h.pv[0]>0){var r=C(u);if(r){N[q].width=r.getAttribute("width")?r.getAttribute("width"):"0";N[q].height=r.getAttribute("height")?r.getAttribute("height"):"0";if(c(N[q].swfVersion)){if(h.webkit&&h.webkit<312){Y(r)}W(u,true)}else{if(N[q].expressInstall&&!A&&c("6.0.65")&&(h.win||h.mac)){k(N[q])}else{O(r)}}}}else{W(u,true)}}}function Y(t){var q=t.getElementsByTagName(Q)[0];if(q){var w=a("embed"),y=q.attributes;if(y){var v=y.length;for(var u=0;u<v;u++){if(y[u].nodeName=="DATA"){w.setAttribute("src",y[u].nodeValue)}else{w.setAttribute(y[u].nodeName,y[u].nodeValue)}}}var x=q.childNodes;if(x){var z=x.length;for(var r=0;r<z;r++){if(x[r].nodeType==1&&x[r].nodeName=="PARAM"){w.setAttribute(x[r].getAttribute("name"),x[r].getAttribute("value"))}}}t.parentNode.replaceChild(w,t)}}function k(w){A=true;var u=C(w.id);if(u){if(w.altContentId){var y=C(w.altContentId);if(y){M=y;l=w.altContentId}}else{M=G(u)}if(!(/%$/.test(w.width))&&parseInt(w.width,10)<310){w.width="310"}if(!(/%$/.test(w.height))&&parseInt(w.height,10)<137){w.height="137"}K.title=K.title.slice(0,47)+" - Flash Player Installation";var z=h.ie&&h.win?"ActiveX":"PlugIn",q=K.title,r="MMredirectURL="+j.location+"&MMplayerType="+z+"&MMdoctitle="+q,x=w.id;if(h.ie&&h.win&&u.readyState!=4){var t=a("div");x+="SWFObjectNew";t.setAttribute("id",x);u.parentNode.insertBefore(t,u);u.style.display="none";var v=function(){u.parentNode.removeChild(u)};I(j,"onload",v)}U({data:w.expressInstall,id:m,width:w.width,height:w.height},{flashvars:r},x)}}function O(t){if(h.ie&&h.win&&t.readyState!=4){var r=a("div");t.parentNode.insertBefore(r,t);r.parentNode.replaceChild(G(t),r);t.style.display="none";var q=function(){t.parentNode.removeChild(t)};I(j,"onload",q)}else{t.parentNode.replaceChild(G(t),t)}}function G(v){var u=a("div");if(h.win&&h.ie){u.innerHTML=v.innerHTML}else{var r=v.getElementsByTagName(Q)[0];if(r){var w=r.childNodes;if(w){var q=w.length;for(var t=0;t<q;t++){if(!(w[t].nodeType==1&&w[t].nodeName=="PARAM")&&!(w[t].nodeType==8)){u.appendChild(w[t].cloneNode(true))}}}}}return u}function U(AG,AE,t){var q,v=C(t);if(v){if(typeof AG.id==b){AG.id=t}if(h.ie&&h.win){var AF="";for(var AB in AG){if(AG[AB]!=Object.prototype[AB]){if(AB.toLowerCase()=="data"){AE.movie=AG[AB]}else{if(AB.toLowerCase()=="styleclass"){AF+=' class="'+AG[AB]+'"'}else{if(AB.toLowerCase()!="classid"){AF+=" "+AB+'="'+AG[AB]+'"'}}}}}var AD="";for(var AA in AE){if(AE[AA]!=Object.prototype[AA]){AD+='<param name="'+AA+'" value="'+AE[AA]+'" />'}}v.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+AF+">"+AD+"</object>";i[i.length]=AG.id;q=C(AG.id)}else{if(h.webkit&&h.webkit<312){var AC=a("embed");AC.setAttribute("type",P);for(var z in AG){if(AG[z]!=Object.prototype[z]){if(z.toLowerCase()=="data"){AC.setAttribute("src",AG[z])}else{if(z.toLowerCase()=="styleclass"){AC.setAttribute("class",AG[z])}else{if(z.toLowerCase()!="classid"){AC.setAttribute(z,AG[z])}}}}}for(var y in AE){if(AE[y]!=Object.prototype[y]){if(y.toLowerCase()!="movie"){AC.setAttribute(y,AE[y])}}}v.parentNode.replaceChild(AC,v);q=AC}else{var u=a(Q);u.setAttribute("type",P);for(var x in AG){if(AG[x]!=Object.prototype[x]){if(x.toLowerCase()=="styleclass"){u.setAttribute("class",AG[x])}else{if(x.toLowerCase()!="classid"){u.setAttribute(x,AG[x])}}}}for(var w in AE){if(AE[w]!=Object.prototype[w]&&w.toLowerCase()!="movie"){F(u,w,AE[w])}}v.parentNode.replaceChild(u,v);q=u}}}return q}function F(t,q,r){var u=a("param");u.setAttribute("name",q);u.setAttribute("value",r);t.appendChild(u)}function X(r){var q=C(r);if(q&&(q.nodeName=="OBJECT"||q.nodeName=="EMBED")){if(h.ie&&h.win){if(q.readyState==4){B(r)}else{j.attachEvent("onload",function(){B(r)})}}else{q.parentNode.removeChild(q)}}}function B(t){var r=C(t);if(r){for(var q in r){if(typeof r[q]=="function"){r[q]=null}}r.parentNode.removeChild(r)}}function C(t){var q=null;try{q=K.getElementById(t)}catch(r){}return q}function a(q){return K.createElement(q)}function I(t,q,r){t.attachEvent(q,r);d[d.length]=[t,q,r]}function c(t){var r=h.pv,q=t.split(".");q[0]=parseInt(q[0],10);q[1]=parseInt(q[1],10)||0;q[2]=parseInt(q[2],10)||0;return(r[0]>q[0]||(r[0]==q[0]&&r[1]>q[1])||(r[0]==q[0]&&r[1]==q[1]&&r[2]>=q[2]))?true:false}function V(v,r){if(h.ie&&h.mac){return}var u=K.getElementsByTagName("head")[0],t=a("style");t.setAttribute("type","text/css");t.setAttribute("media","screen");if(!(h.ie&&h.win)&&typeof K.createTextNode!=b){t.appendChild(K.createTextNode(v+" {"+r+"}"))}u.appendChild(t);if(h.ie&&h.win&&typeof K.styleSheets!=b&&K.styleSheets.length>0){var q=K.styleSheets[K.styleSheets.length-1];if(typeof q.addRule==Q){q.addRule(v,r)}}}function W(t,q){var r=q?"visible":"hidden";if(e&&C(t)){C(t).style.visibility=r}else{V("#"+t,"visibility:"+r)}}function g(s){var r=/[\\\"<>\.;]/;var q=r.exec(s)!=null;return q?encodeURIComponent(s):s}var D=function(){if(h.ie&&h.win){window.attachEvent("onunload",function(){var w=d.length;for(var v=0;v<w;v++){d[v][0].detachEvent(d[v][1],d[v][2])}var t=i.length;for(var u=0;u<t;u++){X(i[u])}for(var r in h){h[r]=null}h=null;for(var q in swfobject){swfobject[q]=null}swfobject=null})}}();return{registerObject:function(u,q,t){if(!h.w3cdom||!u||!q){return}var r={};r.id=u;r.swfVersion=q;r.expressInstall=t?t:false;N[N.length]=r;W(u,false)},getObjectById:function(v){var q=null;if(h.w3cdom){var t=C(v);if(t){var u=t.getElementsByTagName(Q)[0];if(!u||(u&&typeof t.SetVariable!=b)){q=t}else{if(typeof u.SetVariable!=b){q=u}}}}return q},embedSWF:function(x,AE,AB,AD,q,w,r,z,AC){if(!h.w3cdom||!x||!AE||!AB||!AD||!q){return}AB+="";AD+="";if(c(q)){W(AE,false);var AA={};if(AC&&typeof AC===Q){for(var v in AC){if(AC[v]!=Object.prototype[v]){AA[v]=AC[v]}}}AA.data=x;AA.width=AB;AA.height=AD;var y={};if(z&&typeof z===Q){for(var u in z){if(z[u]!=Object.prototype[u]){y[u]=z[u]}}}if(r&&typeof r===Q){for(var t in r){if(r[t]!=Object.prototype[t]){if(typeof y.flashvars!=b){y.flashvars+="&"+t+"="+r[t]}else{y.flashvars=t+"="+r[t]}}}}f(function(){U(AA,y,AE);if(AA.id==AE){W(AE,true)}})}else{if(w&&!A&&c("6.0.65")&&(h.win||h.mac)){A=true;W(AE,false);f(function(){var AF={};AF.id=AF.altContentId=AE;AF.width=AB;AF.height=AD;AF.expressInstall=w;k(AF)})}}},getFlashPlayerVersion:function(){return{major:h.pv[0],minor:h.pv[1],release:h.pv[2]}},hasFlashPlayerVersion:c,createSWF:function(t,r,q){if(h.w3cdom){return U(t,r,q)}else{return undefined}},removeSWF:function(q){if(h.w3cdom){X(q)}},createCSS:function(r,q){if(h.w3cdom){V(r,q)}},addDomLoadEvent:f,addLoadEvent:R,getQueryParamValue:function(v){var u=K.location.search||K.location.hash;if(v==null){return g(u)}if(u){var t=u.substring(1).split("&");for(var r=0;r<t.length;r++){if(t[r].substring(0,t[r].indexOf("="))==v){return g(t[r].substring((t[r].indexOf("=")+1)))}}}return""},expressInstallCallback:function(){if(A&&M){var q=C(m);if(q){q.parentNode.replaceChild(M,q);if(l){W(l,true);if(h.ie&&h.win){M.style.display="block"}}M=null;l=null;A=false}}}}}();