/**
 * @preserve linkageForSelect 1.0
 * https://github.com/YouHeng1/Linkage
 *
 * Copyright 2015, Youheng1
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */
(function(exportName){
    var fun=function(data,id,callback){
        this.data=data;
        this.Element=[];
        this.value=false;
		this.callback=callback||function(){}
        this.parentObj=document.getElementById(id);
    };
    fun.prototype.init=function(def){
        this.value=def;
        this.format(this.data,this.Element);
        this.append(this.Element)
        return this;
    };
    fun.prototype.remove=function(ob){
        ob.nextSibling&&ob.parentNode.removeChild(ob.nextSibling);
        if(ob.nextSibling)
            this.remove(ob);
        return this;
    }
    fun.prototype.append=function(ob){
        if((typeof ob[0]).toLowerCase()=='undefined')
            return false;
        this.value=ob[0].value;
        this.parentObj.appendChild(ob[0]);
        if(ob[0].selectedOptions[0]&&ob[0].selectedOptions[0][0]){
            this.append(ob[0].selectedOptions[0]);
        }
    }
    fun.prototype.isSelected=function(v){
        if(v.value!=this.value&&(typeof v.child).toLowerCase()!=='object')
            return false;
        if(v.value==this.value)
            return true;
        for(var i=0;i < v.child.length;i++){
            if(this.isSelected(v.child[i]))
                return true;
        }
        return false;
    }
    fun.prototype.format=function(d,e){
        var sk= e.length;
        e[sk]=document.createElement('select');
        for(var k in d){
            if(!this.value)
                this.value=d[k].value;
            var Element=document.createElement('option');
            Element.innerHTML=d[k].name;
            Element.value=d[k].value;
            Element.fname=d[k].name;
            Element.length=0;
            if(this.isSelected(d[k])){
                Element.selected=true;
            }
            e[sk].appendChild(Element);
            if(d[k].child&& (typeof d[k].child).toLowerCase()==='object'){
                this.format(d[k].child,Element);
            }
        }
        e[sk].onchange=(function(fa){
            return function(){
                fa.remove(this);
                fa.value=this.value;
                fa.append(this.selectedOptions[0]);
				fa.callback(fa.value);
            }
        })(this);
        return this;
    };
    window[exportName]=fun;
})('LinkageForSelect');