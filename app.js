var UglifyJS = require("uglify-js");
var code = "var a = 1;";
var toplevel = UglifyJS.parse(code); //toplevel就是语法树
var transformer = new UglifyJS.TreeTransformer(function (node) {
if (node instanceof UglifyJS.AST_Number) { //查找需要修改的叶子节点
        node.value = '0x' + Number(node.value).toString(16);
        return node; //返回一个新的叶子节点 替换原来的叶子节点
    };
});
toplevel.transform(transformer);  //遍历AST树
var ncode = toplevel.print_to_string(); //从AST还原成字符串
console.log(ncode); // var a = 0x1;