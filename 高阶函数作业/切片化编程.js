Function.prototype.before = function (fn) {
    const _that = this;
    return function () {
        fn();
        _that();
    }
}

Function.prototype.after = function (fn) {
    const _that = this;
    return function () {
        _that();
        fn();
    }
}

function log1() {
    console.log('1');
};

function log2() {
    console.log('2');
};

function log3() {
    console.log('3');
};

let newLog = log2.before(log1)
let newLog2 = newLog.after(log3)
newLog2();

