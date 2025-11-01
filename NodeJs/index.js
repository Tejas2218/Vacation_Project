const EventEmitter = require("events")
const eventEmitter = new EventEmitter();

eventEmitter.on("tutorial",(n1,n2)=>{
    console.log(`event occurred ${n1+n2}`)
})

eventEmitter.emit("tutorial",1,2)

class person extends EventEmitter{
    constructor(name){
        super();
        this._name = name
    }
    get name(){
        return this._name;
    }
}
let pedro = new person("pedro")
pedro.on("name",()=>{
    console.log("my name is "+ pedro.name)
})
pedro.emit("name")




// const another = require('./another')
// console.log("hello world nodejs")
// console.log(another.sum(1,2))
// console.log(another.PI)
// console.log(new another.SumMath())