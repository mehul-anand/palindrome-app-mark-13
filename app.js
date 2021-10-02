const userDate = document.querySelector("#input-date");
const checkBtn = document.querySelector("#check");
const output = document.querySelector("#output");
const loading = document.querySelector("#loading");

function reverseStr(str) {
    var listOfChars = str.split("");
    var revListOfChars = listOfChars.reverse();
    var reversedStr = revListOfChars.join("");
    return reversedStr;
};

function isPalindromeFunc(str) {
    var reverse = reverseStr(str);
    return str === reverse;
}

function convertDateToString(date) {

    var dateStr = { day: '', month: '', year: '' };

    if (date.day < 10) {
        dateStr.day = '0' + date.day;
    }
    else {
        dateStr.day = date.day.toString();
    }

    if (date.month < 10) {
        dateStr.month = '0' + date.month;
    }
    else {
        dateStr.month = date.month.toString();
    }

    dateStr.year = date.year.toString();
    return dateStr;
}

function getAllDateFormats(date) {
    var dateStr = convertDateToString(date);

    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllDateFormats(date) {
    var listOfPalindromes = getAllDateFormats(date);

    var flag = false;

    for (var i = 0; i < listOfPalindromes.length; i++) {
        if (isPalindromeFunc(listOfPalindromes[i])) {
            flag = true;
            break;
        }
    }

    return flag;
}


function isLeapYear(year) {
    if (year % 400 === 0) {
        return true;
    }
    if (year % 100 === 0) {
        return false;
    }
    if (year % 4 === 0) {
        return true;
    }
    return false;
}

function getNextDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];


    if (month === 2) {

        if (isLeapYear(year)) {
            if (day > 29) {
                day = 1;
                month = month + 1;
            }
        }
        else {
            if (day > 28) {
                day = 1;
                month = month + 1;
            }
        }
    }

    else {

        if (day > daysInMonth[month - 1]) {
            day = 1;
            month = month + 1;
        }
    }

    if (month > 12) {
        month = 1;
        year = year + 1;
    }

    return {
        day: day,
        month: month,
        year: year
    };
}

function getPrevDate(date) {
    var day = date.day - 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (day === 0) {
        month = month - 1;

        if (month === 0) {
            month = 12;
            day = 31;
            year = year - 1;
        } else if (month === 2) {
            if (isLeapYear(year)) {
                day = 29;
            } else {
                day = 28;
            };
        } else {
            day = daysInMonth[month - 1]
        };
    };
    return {
        day: day,
        month: month,
        year: year,
    };
};


function getNextPalindromeDate(date) {
    var dateCounter = 0;
    var nextDate = getNextDate(date);

    while (1) {
        dateCounter = dateCounter + 1;
        var isPalindrome = checkPalindromeForAllDateFormats(nextDate);
        if (isPalindrome) {
            break;
        }
        nextDate = getNextDate(nextDate);
    }
    return [dateCounter, nextDate];
}

function getPrevPalindromeDate(date) {
    var prevDate = getPrevDate(date);
    var dateCounter = 0;
    while (1) {
        dateCounter = dateCounter + 1;
        var isPalindrome = checkPalindromeForAllDateFormats(prevDate);
        if (isPalindrome) {
            break;
        };
        prevDate = getPrevDate(prevDate);
    };
    return [dateCounter, prevDate];
};

function clickHandler() {
    var bDay = userDate.value
    if (bDay !== "") {
        loading.style.display = "block";
        output.style.display = "none";
        setTimeout(function(){
            var dateList = bDay.split("-")
            var date = {
                day: Number(dateList[2]),
                month: Number(dateList[1]),
                year: Number(dateList[0]),
            }
            var isAPalindrome = checkPalindromeForAllDateFormats(date);
            if (isAPalindrome) {
                loading.style.display = "none";
                output.style.display = "block";
                output.innerText = "Yes ! It's a Palindrome 🥳"
            } else {
                var [nextDateCounter, nextDate] = getNextPalindromeDate(date);
                var [prevDateCounter, prevDate] = getPrevPalindromeDate(date);
                if (nextDateCounter > prevDateCounter) {
                    loading.style.display = "none";
                    output.style.display = "block";
                    output.innerText = `The nearest palindrome date was ${prevDate.day}-${prevDate.month}-${prevDate.year}, you missed it by ${prevDateCounter} day(s)! 🙂`;
                } else {
                    loading.style.display = "none";
                    output.style.display = "block";
                    output.innerText = `The nearest palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${nextDateCounter} day(s)! 🙂`;
                }
            }
        }, 4000);

    }else{
        output.innerText = "Please input a date 😐"
    }
}
 
checkBtn.addEventListener("click", clickHandler)