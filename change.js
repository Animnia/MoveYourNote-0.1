const { ipcRenderer } = require('electron')

const musicfunc = require('./musicfuncs')



document.getElementById('quit').addEventListener('click', () => {
  ipcRenderer.send('close-change-window');
});




document.getElementById('out').addEventListener('click', () => {
    var sel1 = document.getElementById('sel1');
    var sel2 = document.getElementById('sel2');
    var val1 = sel1.value;
    var val2 = sel2.value;//目标调式

    var mode = document.getElementById('selmode').value;//升降号
    var level = document.getElementById('sellevel').value;//高低

    var text = document.getElementById('in').value; //得到用户输入
    var textarr = musicfunc.cutline(text); //切分为数组
    musicfunc.changetoindex(textarr); //数组转换为数字数组
    var finalnums = musicfunc.getresultindex(textarr, val1, val2, level);//结果数字数组
    musicfunc.finallyresult(finalnums, mode);//最终结果
    var res = musicfunc.showresult(finalnums); //显示数字数组，测试用

    document.getElementById('outtxt').innerText = res;
});