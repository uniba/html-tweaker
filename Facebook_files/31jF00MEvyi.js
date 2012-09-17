/*1341805460,169776069*/

if (window.CavalryLogger) { CavalryLogger.start_js(["XWDv7"]); }

__d("EventHovercard",["Arbiter","DOM","copyProperties"],function(a,b,c,d,e,f){var g=b('Arbiter'),h=b('DOM'),i=b('copyProperties');function j(){}i(j,{EVENT_ACTION:'HOVERCARD_EVENT_ACTION',registerEventActions:function(k,l){var m=l.parentNode;g.subscribe(this.EVENT_ACTION,function(n,o){if(o.eid==k)h.setContent(m,o.markup);});},informEventAction:function(k,l){g.inform(this.EVENT_ACTION,{eid:k,markup:l});}});e.exports=j;});