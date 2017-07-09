// 在另一个进程中执行系统命令
// child_process.exec(command, [options], callback)

const childProcess = require('child_process');
const options = {
    maxBuffer: 100 * 1024,
    encoding: 'utf8',
    timeout: 5000
};
// options->Object  callback: error->错误对象、 stdout/stderr->执行命令的输出的Buffer对象
var child = childProcess.exec('dir /B', options, function (error, stdout, stderr) {
    if (error) {
        console.log(error.stack);
        console.log('出错啦: ' + error.code);
        console.log('出错的信号: ' + error.signal);
    }
    console.log('成功啦，结果: \n' + stdout);
    if (stderr.length) {
        console.log('成功了但是有错误哦: ' + stderr);
    }
});
child.on('exit', function (code) {
    console.log('子进程完成啦: ', code);
})