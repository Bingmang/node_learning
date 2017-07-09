// 父进程创建3个子进程，并给每一个子进程发送命令，并行执行
// child_process.fork(modulePath, [args], [options])
// 通过process.on('message')和process.send()实现IPC机制，传递底层的TCP服务器句柄
const child_process = require('child_process');

var options = {
    env: { user: 'Aaron' },
    encoding: 'utf8'
};

function makeChild() {
    var child = child_process.fork('chef.js', [], options);
    child.on('message', function (message) {
        console.log('收到子进程的数据啦: ', message);
    });
    return child;
}
function sendCommand(child, command) {
    console.log("请求子进程中: ", command);
    child.send({ cmd: command });
}
var child1 = makeChild();
var child2 = makeChild();
var child3 = makeChild();
sendCommand(child1, "做早餐");
sendCommand(child2, '做午饭');
sendCommand(child3, "做晚饭");