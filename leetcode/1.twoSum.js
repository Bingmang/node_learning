// Given nums = [2, 7, 11, 15], target = 9,

// Because nums[0] + nums[1] = 2 + 7 = 9,
// return [0, 1].
// Tips: 使用for (variable in object) 时 variable是数组的下标而不是元素

var twoSum = function(nums, target) {
  var map = {};
  for (var i in nums) {
    if (map[nums[i]] !== undefined) {
      return [parseInt(map[nums[i]]), parseInt(i)];
    } else {
      map[target - nums[i]] = i;
    }
  }
};

// test
console.log(twoSum([3, 9, -3, 40], 0));
