const xoshift = require('./xorshift');


function testConvert(num) {
    var bNum = xoshift.toBinaryString(num);
    var converted = xoshift.toNumber(bNum);
    console.log(num, ' ', bNum, ' ', converted, num === converted);
}
function testXorLeft(num, shiftNum) {
    var xorForward = xoshift.XORShiftEncrypt(num, shiftNum);
    var xorBackward = xoshift.XORShiftEncrypt(xorForward, shiftNum);
    console.log(num, xorForward, xorBackward, num == xorBackward);
}
function testXorRight(num, shiftNum) {
    var xorForward = xoshift.XORShiftEncrypt(num, shiftNum, "right");
    var xorBackward = xoshift.XORShiftEncrypt(xorForward, shiftNum, "right");
    console.log(num, xorForward, xorBackward, num == xorBackward);
}

console.log("Test Convert ---------------------------------");
testConvert(1);
testConvert(-1);
testConvert(Math.pow(2, 31) - 1);
//testConvert(Math.pow(2, 32)); Exception
testConvert(2147483536);

// Shift left << test
console.log("Test LEFT ---------------------------------");
testXorLeft(1, 4);
testXorLeft(174563, 17);
testXorLeft(Math.pow(2,31) - 1, 17);
testXorLeft(Math.pow(2,30) -1, 17);
testXorLeft(987654, 25);
testXorLeft(987654, 3);
testXorLeft(-Math.pow(2,31), 25);

console.log("Test Right ---------------------------------");
testXorRight(1, 4);
testXorRight(174563, 17);
testXorRight(Math.pow(2,31) - 1, 17);
testXorRight(Math.pow(2,30) -1, 17);
testXorRight(987654, 25);
testXorRight(987654, 3);

testXorRight(-Math.pow(2, 31), 25);
testXorRight(-1, 3);
