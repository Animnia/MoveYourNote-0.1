const majorAlp = {
    "C": 1,
    "C#": 2,
    "D": 3,
    "Eb": 4,
    "E": 5,
    "F": 6,
    "F#": 7,
    "G": 8,
    "Ab": 9,
    "A": 10,
    "Bb": 11,
    "B": 12
};

const signs = {
    "1": 1,
    "#1": 2,
    "@1":2,
    "b2": 2,
    ".2":2,
    "2": 3,
    "#2": 4,
    "@2": 4,
    "b3": 4,
    ".3": 4,
    "3": 5,
    "4": 6,
    "#4": 7,
    "@4": 7,
    "b5": 7,
    ".5": 7,
    "5": 8,
    "#5": 9,
    "@5": 9,
    "b6": 9,
    ".6": 9,
    "6": 10,
    "#6": 11,
    "@6": 11,
    "b7": 11,
    ".7": 11,
    "7": 12
};


const inRaise = {
    1: "1",
    2: "#1",
    3: "2",
    4: "#2",
    5: "3",
    6: "4",
    7: "#4",
    8: "5",
    9: "#5",
    10: "6",
    11: "#6",
    12: "7"
};

const inLow = {
    1: "1",
    2: "b2",
    3: "2",
    4: "b3",
    5: "3",
    6: "4",
    7: "b5",
    8: "5",
    9: "b6",
    10: "6",
    11: "b7",
    12: "7"
};

//分割
function cutline(line) {
    line = line.replace(/\s+/g, '');
    const res = [];
    let findGroup = /([^0-9]*)(\d)/g;
    let match;
    let lastIndex = 0;

    while ((match = findGroup.exec(line)) !== null) {
        if (match.index !== lastIndex) {
            res.push(line.slice(lastIndex, match.index))
        }

        if (match[1]) {
            res.push(match[1] + match[2]);
        }
        else {
            res.push(match[2]);
        }
        lastIndex = findGroup.lastIndex;

    }

    return res;

}

//转换一个
function changesign(n) {
    let res = 0;
    for (let char of n) {
        if (char === '+') {
            res += 12;
        }
        else if (char === '-') {
            res -= 12;
        }
        else if (char === 'b' || char === '#' || char === '.' || char === '@') {
            let num = n.slice(-2);
            res += signs[num];
            return res;
        }
        else if (char >= '1' && char <= '9') {
            let num = n.slice(-1);
            res += signs[num];
            return res;
        }
        else {
            continue;
        }
    }
}

//转换全部
function changetoindex(nums) {
    for (let i = 0; i < nums.length; i++) {
        nums[i] = changesign(nums[i]);
    }

}

function getresultindex(nums,in1,in2,ud) {
    let v1 = majorAlp[in1];
    let v2 = majorAlp[in2];
    let mark = 0;
    if(ud==="up"){
        while (v1 !== v2) {
            v1+=1;
            mark+=1;
            if(v1 === 13){
                v1 = 1;
            }
        }
        let res = nums.map(item => item - mark);
        return res;
    }

    if(ud==="down"){
        while (v1 !== v2) {
            v1-=1;
            mark+=1;
            if(v1 === 0){
                v1 = 12;
            }
        }
        let res = nums.map(item => item + mark);
        return res;
    }

}

//1个数字转符号
function changenumtosign(n,rf) {
    var dic;
    if(rf === "sharp"){
        dic = inRaise;
    }
    if(rf === "flat"){
        dic = inLow;
    }

    let sign = "";
    let re = 0;
    if(n > 12){
        let plus = Math.floor(n/12);
        re = n%12;
        let plussign = "+";
        sign = plussign.repeat(plus);
        sign = sign + dic[re];
    }
    else if(n === 0){
        sign = "-7"
    }
    else if(n < 0){
        let minu = -Math.floor(n/12);
        re = minu*12+n;
        let minusign = "-";
        sign = minusign.repeat(minu);
        sign = sign + dic[re];
    }
    else{
        sign = dic[n];
    }

    return sign;
    
}

//最终结果
function finallyresult(nums,p) {
    for (let i = 0; i < nums.length; i++) {
        nums[i] = changenumtosign(nums[i],p);
    }
}

function showresult(nums) {
    let test = nums.join(' '); //测试用，后面删
    return test;
}

module.exports={changetoindex,cutline,showresult,getresultindex,finallyresult};