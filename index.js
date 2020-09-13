const __PRIVATE_RF = function(seed,options){let math=Math;let pool=[];var width=256,chunks=6,digits=52,startdenom=math.pow(width,chunks),significance=math.pow(2,digits),overflow=significance*2,mask=width-1;var key=[];options=options==true?{entropy:true}:options||{};let flat=function(obj,depth){var result=[],typ=typeof obj,prop;if(depth&&typ=="object"){for(prop in obj){try{result.push(flat(obj[prop],depth-1))}catch(e){}}}return result.length?result:typ=="string"?obj:obj+"\0"};let mix=function(seed,key){var stringseed=seed+"",smear,j=0;while(j<stringseed.length){key[mask&j]=mask&(smear^=key[mask&j]*19)+stringseed.charCodeAt(j++)}return String.fromCharCode.apply(0,key)};var shortseed=mix(flat(seed,3),key);let ARC4=function(key){var t,keylen=key.length,me=this,i=0,j=me.i=me.j=0,s=me.S=[];if(!keylen){key=[keylen++]}while(i<width){s[i]=i++}for(i=0;i<width;i++){s[i]=s[j=mask&j+key[i%keylen]+(t=s[i])];s[j]=t}(me.g=function(count){var t,r=0,i=me.i,j=me.j,s=me.S;while(count--){t=s[i=mask&i+1];r=r*width+s[mask&(s[i]=s[j=mask&j+t])+(s[j]=t)]}me.i=i;me.j=j;return r})(width)};var arc4=new ARC4(key);let next=function(){var n=arc4.g(chunks),d=startdenom,x=0;while(n<significance){n=(n+x)*width;d*=width;x=arc4.g(1)}while(n>=overflow){n/=2;d/=2;x>>>=1}return(n+x)/d};mix(String.fromCharCode.apply(0,arc4.S),pool);return next}
module.exports = class Random{
    constructor(seed){
        if(seed) this.random = __PRIVATE_RF(seed);
        else this.random = Math.random.bind(Math);
    }
    random(){
        return this.random();
    }
    next(min,max,floor = true){
        if(!max && !min){
            max = 1;
            min = 0;
            floor = false;
        } 
        else if(!max && min) {
            max = min
            min = 0;
        }
        min = Number(min);
        max = Number(max);
        if(isNaN(min) || isNaN(max)) return NaN;
        if(max < min){
            let temp = max;
            max = min;
            min = temp;
        }
        let rand = (this.random() * ((max + 1) - min)) + min;
        return floor ? Math.floor(rand) : rand;
    }
    reSeed(seed){
        if(!seed) return console.error("Couldnt reseed, invalid input")
        this.random = __PRIVATE_RF(seed);
        return true;
    }
    static number(min,max,seed,floor){
        if(!floor && typeof seed === "boolean"){
            floor = seed;
            seed = undefined;
        }
        else if(typeof floor !== "boolean" || floor == undefined || floor == null) floor = true;
        if(!max) {
            max = min
            min = 0;
        }
        min = Number(min);
        max = Number(max);
        if(isNaN(min) || isNaN(max)) return NaN;
        if(max < min){
            let temp = max;
            max = min;
            min = temp;
        }
        let r = ((seed != undefined && seed != '' ? __PRIVATE_RF(seed)() : Math.random()) * ((max + 1) - min)) + min;
        return floor ? Math.floor(r) : r; 
    }
    static random(seed){
        return seed ? __PRIVATE_RF(seed)() : Math.random();
    }
    static pick(input, seed){
        
        let arr = [];
        if(typeof input == "string") arr = input.split("");
        else if(typeof input == "number") arr = input.toString().split("").filter(c => c !== ".");
        else if(Array.isArray(input)) arr = [...input];
        else if(typeof input == 'object') arr = Object.values(input);
        else return input
        let fn = (seed ? __PRIVATE_RF(seed) : Math.random.bind(Math));
        return arr[Math.floor((fn()*arr.length))]; 
    }
    static randomize(input,seed,rolls = 2){
        let arr = [];
        let fn = seed ? __PRIVATE_RF(seed) : Math.random.bind(Math);
        if(typeof input == "string") arr = input.split("");
        if(typeof input == "number") arr = input.toString().split("");
        if(Array.isArray(input)) arr = [...input];
        if(typeof input == "boolean") return Math.floor((fn()*(2))) == 0 ? true : false;
        if(typeof input == "object" && !Array.isArray(input)) return input;
        if(rolls < 1) rolls = 3;
        if(rolls > 24) rolls = 24;
        let switchValues = (array, d = 0) => {
            let ar = [...array]
            if(d == 4) return ar;
            let n1 = Math.floor((fn()*(ar.length)))
            let n2 = Math.floor((fn()*(ar.length)))
            let temp = ar[n1];
            if(temp == " " || ar[n2] == " " || temp == "." || ar[n2] == "."){
                return switchValues(ar,d+1);
            }
            ar[n1] = ar[n2];
            ar[n2] = temp;
            return ar;
        }
        for(let i = 0; i < arr.length * rolls; i++){
            arr = switchValues(arr);
        }
        if(typeof input == "string") return arr.join("");
        else if(typeof input == "number"){
            return (input.toString().includes(".")) ? parseFloat(arr.join("")) : parseInt(arr.join(""))
        }
        else return arr;
    }
}
