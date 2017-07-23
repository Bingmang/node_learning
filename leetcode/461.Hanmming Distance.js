/**
 * @param {number} x
 * @param {number} y
 * @return {number}
 */
// 使用异或可以得到每个位上出现不同1的数
// 把一个整数减去1再和自身做与运算，会把该整数最右边的1变成0.
// 也可以使用和1做与操作，然后数字右移一位，但是如果输入是负数会无限循环（负数右移进来的位是1）
var hammingDistance = function(x, y) {
  var count = 0;
  var n = x ^ y;
  while (n) {
    ++count;
    n = (n - 1) & n;
  }
  return count;
};

// test
console.log(hammingDistance(1, 4));
