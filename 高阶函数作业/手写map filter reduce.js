// Map
Array.prototype.myMap = function (fn) {
    let returns = [];
    array = this;
    for (let i = 0; i < array.length; i++) {
        returns.push(fn(array[i], i, array));
    }
    return returns;
}

let a = [1, 2, 3, 4];

let b = a.myMap((x) => {
    return x * 2
})
let b2 = a.map((x) => {
    return x * 2
})
console.log(b);
console.log(b2);

// filter
Array.prototype.myFilter = function (fn) {
    let returns = [];
    let array = this;
    for (let i = 0; i < array.length; i++) {
        if (fn(array[i], i, array)) {
            returns.push(array[i]);
        }
    }
    return returns;
}

let c = a.myFilter(x => x > 2);
let c2 = a.filter(x => x>2)
console.log(c);
console.log(c2);

// reduce
Array.prototype.myReduce = function (fn, initial) {
    let array = this;
    let returns = initial || array[0];
    let index = initial ? 0 : 1;
    for (let i = index; i < array.length; i++) {
        returns = fn(returns, array[i],i,this)
    }
    return returns;
}

let d = a.myReduce(function(a,b){
    return a+b;
});
let d2= a.reduce(function(a,b){
    return a+b;
})
console.log(d);
console.log(d2);

