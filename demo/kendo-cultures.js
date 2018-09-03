kendo.cultures["en-US"] = {
    //<language code>-<country/region code>
    name: "zh_CN", 
    // "numberFormat" defines general number formatting rules
    numberFormat: {
        //numberFormat has only negative pattern unlike the percent and currency
        //negative pattern: one of (n)|-n|- n|n-|n -
        pattern: ["-n"],
        //number of decimal places
        decimals: 2,
        //string that separates the number groups (1,000,000)
        ",": ",",
        //string that separates a number from the fractional point
        ".": ".",
        //the length of each number group
        groupSize: [3],
        //formatting rules for percent number
        percent: {
            //[negative pattern, positive pattern]
            //negativePattern: one of -n %|-n%|-%n|%-n|%n-|n-%|n%-|-% n|n %-|% n-|% -n|n- %
            //positivePattern: one of n %|n%|%n|% n
            pattern: ["-n %", "n %"],
            //number of decimal places
            decimals: 2,
            //string that separates the number groups (1,000,000 %)
            ",": ",",
            //string that separates a number from the fractional point
            ".": ".",
            //the length of each number group
            groupSize: [3],
            //percent symbol
            symbol: "%"
        },
        currency: {
            //[negative pattern, positive pattern]
            //negativePattern: one of "($n)|-$n|$-n|$n-|(n$)|-n$|n-$|n$-|-n $|-$ n|n $-|$ n-|$ -n|n- $|($ n)|(n $)"
            //positivePattern: one of "$n|n$|$ n|n $"
            pattern: ["($n)", "$n"],
            //number of decimal places
            decimals: 2,
            //string that separates the number groups (1,000,000 $)
            ",": ",",
            //string that separates a number from the fractional point
            ".": ".",
            //the length of each number group
            groupSize: [3],
            //currency symbol
            symbol: "$"
        }
    },
    calendars: {
        standard: {
            days: {  
                names: ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],  
                namesAbbr: ["周日","周一","周二","周三","周四","周五","周六"],  
                namesShort: ["日","一","二","三","四","五","六"]  
            },  
            months: {    
                names: ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],  
                namesAbbr: ["一","二","三","四","五","六","七","八","九","十","十一","十二"],  
            },  
            // AM and PM designators
            // [standard,lowercase,uppercase]
            AM: [ "AM", "am", "AM" ],
            PM: [ "PM", "pm", "PM" ],
            // set of predefined date and time patterns used by the culture.
            patterns: {
                d: "yyyy-MM-dd",  
                D: "yyyy年MM月dd日 dddd",
                F: "dddd, MMMM dd, yyyy h:mm:ss tt",
                g: "M/d/yyyy h:mm tt",
                G: "M/d/yyyy h:mm:ss tt",
                m: "MMMM dd",
                M: "MMMM dd",
                s: "yyyy'-'MM'-'ddTHH':'mm':'ss",
                t: "h:mm tt",
                T: "h:mm:ss tt",
                u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                y: "MMMM, yyyy",
                Y: "MMMM, yyyy"
            },
            // the first day of the week (0 = Sunday, 1 = Monday, etc)
            firstDay: 0
        }
    }
};