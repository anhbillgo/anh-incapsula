/**
 * This function converts a number to a binary string
 * Use (num >>> 0) makes
 * @param num input number
 * @returns answer in binary format
 */
exports.toBinaryString = (num) => {
    if (num >= Math.pow(2, 31) || num < -(Math.pow(2, 31))) {
        throw 'This number is out of range to convert';
    }
    var ans = (num >>> 0).toString(2);
    while (ans.length < 32) {
        ans = '0' + ans;
    }
    return ans;
}


/**
 * Converts a binary string or array of 0 & 1 to a 32-bit-signed-number
 * @param num string or array of 0/1
 * @returns number
 */
exports.toNumber = (num) => {
    var ans = 0;
    var coeff = 1;
    for (var i = num.length - 1; i >= 0; i--) {
        ans += (num[i] === '0' || num[i] === 0 ? 0 : 1) * coeff;
        coeff *= 2;
        if (coeff === Math.pow(2, 31)) { //Flip for sign
            coeff = -coeff;
        }
    }
    return ans;
}


exports.XORNum = (num1, num2) => {
    var str1 = this.toBinaryString(num1);
    var str2 = this.toBinaryString(num2);
    var ansStr = "";
    for (var i = 0; i < str2.length; i++) {
        ansStr += (str1[i] === str2[i] ? '0' : '1');
    }
    return this.toNumber(ansStr);
}


/**
 *
 * @param num original number
 * @param shiftNum Number of bit to shift
 * @param direction Shift left means num << shiftNum, shift right means num >> shiftNum
 * @returns
 */
exports.XORShiftEncrypt = (num, shiftNum, direction) => {
    if (direction === void 0) { direction = "left"; }    
    var ans = direction === "left"
        ? num ^ (num << shiftNum)
        : num ^ (num >> shiftNum);
    return ans;
}



exports.XORShiftDecrypt = (num, shiftNum, direction) => {
    if (direction === void 0) { direction = "left"; }
    var result = toBinaryString(num);
    var originalArr = [];
    var shiftedArr = [];
    
    if (direction === "left") {
        // Set up with 0 
        for (var i = 1; i <= 32; i++) {
            originalArr.push(0);
            shiftedArr.push(0);
        }
        for (var i = 31; i >= 0; i--) {           
            originalArr[i] = result[i].toString() === shiftedArr[i].toString() ? 0 : 1;
            if (i - shiftNum >= 0) {
                shiftedArr[i - shiftNum] = originalArr[i];
            }
        }
    }
    else { 
        for (var i = 1; i <= 32; i++) {
            originalArr.push(0);
            shiftedArr.push(0);
        }
        for (var i = 0; i < 32; i++) {
            originalArr[i] = result[i].toString() === shiftedArr[i].toString() ? 0 : 1;
            if (i + shiftNum < 32) {
                shiftedArr[i + shiftNum] = originalArr[i];
            }
        }
    }
    var ans = this.toNumber(originalArr);
    return ans;
}

