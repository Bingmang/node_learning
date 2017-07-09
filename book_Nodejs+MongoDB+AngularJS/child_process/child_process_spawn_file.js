// 在另一个进程中产生命令
// child_process.spawn(command, [args], [options])

const spawn = require('child_process').spawn;

const options = {
    env: { user: 'Aaron' },
    datached: false,                // 子进程成为新进程组的组长，即使父进程退出，也让这个进程继续。可使用child.unref()使父进程退出之前不等待子进程
    stdio: ['pipe', 'pipe', 'pipe']  // 配置[stdin, stdout, stderr] pipe：创建父子进程的管道，此外还有ipc ignore Stream 等
};

var child = spawn('netstat', ['-e'], options);
child.stdout.on('data', function (data) {
    console.log('子进程输出信息啦: ', data.toString());
});
child.stderr.on('data', function (data) {
    console.log('子进程出错啦: ', data.toString());
});
child.on('exit', function (code) {
    console.log('子进程退出啦: ', code);
});