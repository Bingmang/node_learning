// 在另一个进程中执行一个可执行文件
// child_process.execFile(file->String, args->[], options->Object, callback->(err, stdout, stderr))
const childProcess = require('child_process');
const options = {
    maxBuffer: 100 * 1024,
    encoding: 'utf8',
    timeout: 5000
};

var child = childProcess.execFile('ping.exe', ['-n', '1', 'google.com'], options, function (err, stdout, stderr) {
    if (err) {
        console.log(err.stack);
        console.log('出错啦: ', err.code);
        console.log('错误信号: ', err.signal);
    }
    console.log('执行成功啦: ', stdout);
    if (stderr.length) {
        console.log('执行成功了但是出错啦: ', stderr);
    }
});
child.on('exit', function (code) {
    console.log('子进程完成啦: ', code);
});