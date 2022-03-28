const path = require('path');
const fs = require('fs');
const vm = require('vm')


class myModule {
    static _cache = Object.create(null);
    static _extensions = Object.create(null);
    static _wrapper = [
        '(function (exports, require, module, __filename, __dirname) { ',
        '\n});'
    ];

    constructor(id = '') {
        this.id = id;
        this.path = path.dirname(id);
        this.exports = {};
        this.filenames = null;
        this.loaded = false;
    }

    require = (id) => {
        // console.log(this.cache);
        return myModule._load(id);
    }

    static _load = (request) => {
        // 路径分析并定位到文件
        const filename = myModule._resolveFilename(request);

        // 判断是否加载过
        const cachedModules = myModule._cache[filename];
        if (cachedModules !== undefined) {
            return cachedModules.exports;
        }

        // 如果缓存不存在,new一个实例
        const module = new myModule(filename);

        myModule._cache[filename] = module;
        module.load(filename);

        return module.exports;
    }

    static _resolveFilename = (request) => {
        const filename = path.resolve(__dirname,request);
        const extname = path.extname(request);
        if (!extname) {
            const exts = Object.keys(myModule._extensions);
            for (let i = 0; i < exts.length; i++) {
                const currentPath = `${filename}${exts[i]}`
                if (fs.existsSync(currentPath)) {
                    return currentPath;
                }
            }
        }
        return filename;
    }

    load = (filename) => {
        // 获取后缀名
        const extname = path.extname(filename);
        // 调用后缀名对应的处理函数
        myModule._extensions[extname](this, filename);
        this.loaded = true;
    }

    static _wrap = (script) => {
        return myModule._wrapper[0] + script + myModule._wrapper[1];
    }

    compile = (content, filename) => {
        const wrapper = myModule._wrap(content);

        const compiledWrapper = vm.runInThisContext(wrapper, {
            filename,
            lineOffset: 0,
            displayErrors: true,
        });

        const dirname = path.dirname(filename);
        compiledWrapper.call(this.exports, this.exports, this.require, this, filename, dirname)
    }
}

myModule._extensions['.js'] = function (module, filename) {
    const content = fs.readFileSync(filename, 'utf8');
    module.compile(content, filename);
}

myModule._extensions['.json'] = function (module, filename) {
    const content = fs.readFileSync(filename, 'utf8');
    module.exports = JSONParse(content);
}


let x = new myModule();



let {add} = x.require('add')
let w=add(1,3);
console.log(w);