const assert = require("assert");
const ArrayAsPromise = require("./array-promise-chain");

describe("array-promise-chain", function() {
  function isEven(value) {
    // 判断偶数，和0x1与，偶数结果为0，奇数结果为1，注意括号必须加！
    return (value & 0x1) === 0;
  }
  function double(value) {
    // 左移就是乘2
    return value << 1;
  }
  // 在测试前会将this.array初始化为指定数组
  beforeEach(function() {
    this.array = [1, 2, 3, 4, 5];
  });

  describe("Native array", function() {
    it("can method chain", function() {
      var result = this.array.filter(isEven).map(double);
      assert.deepEqual(result, [4, 8]);
    });
  });

  describe("ArrayAsPromise", function() {
    it("can promise chain", function(done) {
      var array = new ArrayAsPromise(this.array);
      array
        .filter(isEven)
        .map(double)
        .then(function(value) {
          assert.deepEqual(value, [4, 8]);
        })
        .then(done, done);
    });
  });
});
