# palindrome-app-mark-13
### Check whether your birth date is a palindrome or not and also tells us the closest pallindrome date from the date

## Contents 
- Header 
- Label for date of birth 
- Input for the same w/ type as `date`
- A check button 
- An output message

## Working
- First we check wether the date is empty or not
- We take out the value using `.value` as `"yyyy-mm-dd"`
- Then we use `split("-")` , then `reverse` and finally `join("")`to get it as `['yyyy','mm','dd']`
- Then we take them out separately 👇
  ```
  var date = {
                day: Number(dateList[2]),
                month: Number(dateList[1]),
                year: Number(dateList[0]),
            }
   ```
- Then we call the function to see if the date is a palindrome and use `reverseStr` to check if it is a palindrome or not
- If it is not a palimdrome we run 2 functions to check the palindrome date in the future and past and then give the date which is closer
- We also used `setTimeout()` to add a delay of 4000 ms (4 sec) and display Loading using a `<p>` tag and `style.display = "none"` and `style.display = "block"`

### Resources
- [value](https://www.w3schools.com/jsref/prop_text_value.asp)
- [split](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split)
- [reverse](https://www.w3schools.com/jsref/jsref_reverse.asp)
- [join](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join)
- [setTimeout()](https://www.w3schools.com/jsref/met_win_settimeout.asp)
- [style.display](https://www.w3schools.com/jsref/prop_style_display.asp)
