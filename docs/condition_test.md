# Condition-testing

Variables can be used to test if a certain condition is `true` or `false`, and therefore be able to take a different course of action depending on the result of the test. For example, you might want to evaluate if a file exists to decide if you can copy it into a different folder or not. For condition-testing you will use the `if` command. This command has the following syntax:

```bash
if [ CONDITION TO EVALUATE ]
then
    INSTRUCTIONS THAT WILL RUN IF THE CONDITION IS TRUE
elif [ OTHER CONDITION TO EVALUATE IF 1ST CONDITION IS FALSE ]
then
    INSTRUCTIONS THAT WILL RUN IF FIRST CONDITION IS FALSE BUT SECOND IS TRUE
else
    INSTRUCTIONS THAT WILL RUN IF ALL THE PREVIOUS CONDITIONS ARE FALSE
fi
```

The `CONDITION TO EVALUATE` is an expression that follows a specific syntax depending on what you want to test (checking files, string comparison, comparing numbers, or combining different expressions). Lets look at the different syntaxes used in each of these situations and at some examples that will help you understand this seemingly confusing subject.

## Condition-testing to check files

In the following table, `FILE` refers to the path of the file, or to the variable that contains the path of the file. The spaces after `[` and before `]` are very important. If those spaces are missing, Bash will give an error.

| Condition | Meaning |
| --- | --- |
| `[ -a FILE ]` | Tests if `FILE` exists. |
| `[ -d FILE ]` | Tests if `FILE` exists and is a directory. |
| `[ -e FILE ]` | Tests if `FILE` exists. |
| `[ -f FILE ]` | Tests if `FILE` exists and is a regular file. |
| `[ -g FILE ]` | Tests if `FILE` exists and its `SGID` bit is set. |
| `[ -h FILE ]` | Tests if `FILE` exists and is a symbolic link. |
| `[ -k FILE ]` | Tests if `FILE` exists and its sticky bit is set. |
| `[ -p FILE ]` | Tests if `FILE` exists and is a named pipe (`FIFO`). |
| `[ -r FILE ]` | Tests if `FILE` exists and is readable. |
| `[ -s FILE ]` | Tests if `FILE` exists and has a size greater than zero. |
| `[ -t FD ]` | Tests if file descriptor `FD` is open and refers to a terminal. |
| `[ -u FILE ]` | Tests if `FILE` exists and its `SUID` (set user ID) bit is set. |
| `[ -w FILE ]` | Tests if `FILE` exists and is writable. |
| `[ -x FILE ]` | Tests if `FILE` exists and is executable. |
| `[ -O FILE ]` | Tests if `FILE` exists and is owned by the effective user ID. |
| `[ -G FILE ]` | Tests if `FILE` exists and is owned by the effective group ID. |
| `[ -L FILE ]` | Tests if `FILE` exists and is a symbolic link. |
| `[ -N FILE ]` | Tests if `FILE` exists and has been modified since it was last read. |
| `[ -S FILE ]` | Tests if `FILE` exists and is a socket. |
| `[ FILE1 -nt FILE2 ]` | Tests if `FILE1` has been changed more recently than `FILE2`, or if `FILE1` exists and `FILE2` does not. |
| `[ FILE1 -ot FILE2 ]` | Tests if `FILE1` is older than `FILE2`, or is `FILE2` exists and `FILE1` does not. |
| `[ FILE1 -ef FILE2 ]` | Tests if `FILE1` and `FILE2` refer to the same device and inode numbers. |

### Usage of `[ -a FILE ]`

```bash
$ FILE=/Users/MyUser/Desktop/someFile.txt
$ if [ -a "${FILE}" ]
> then
> echo "${FILE} exists"
> else
> echo "${FILE} doesn't exist"
> fi
```

The following example shows a common mistake. Here, the quotation marks surrounding the file path are missing. Since the path has spaces, Bash gives an error:

```bash
$ if [ -a /Users/MyUser/Desktop/some file name with spaces.txt ]
> then
> echo "The file exists"
> else
> echo "The file doesn't exist"
> fi
-bash: [: too many argument
```

### Usage of `[-d FILE]`

```bash
$ FILE=/Users/MyUser/Desktop/someFile.txt
$ if [ -a "${FILE}" ]
> then
> echo "The file exists. Now I will find out if it's a directory or a regular file."
> if [ -d "${FILE}" ]
> then
> echo "It is a directory."
> else
> echo "It is a regular file."
> fi
> else
> echo "The file doesn't exist."
> fi
```

The following example shows a common mistake. Here, the spaces before and after the expression `-a "${FILE}"` are missing. So, Bash will give an error:

```bash
$ FILE=/Users/MyUser/Desktop/someFile.txt
$ if [-a "${FILE}"]
> then
> echo "The file exists. Now I will find out if it's a directory or a regular file."
> if [ -d "${FILE}" ]
> then
> echo "It is a directory."
> else
> echo "It is a regular file."
> fi
> else
> echo "The file doesn't exist."
> fi
-bash: [-a: command not found
```

### Usage of `[ -f FILE ]`

```bash
$ FILE=/Users/MyUser/Desktop/someFile.txt
$ if [ -a "${FILE}" ]
> then
> echo "The file exists. Now I will find out if it's a directory or a regular file."
> if [ -f "${FILE}" ]
> then
> echo "It is a regular file."
> else
> echo "It is a directory."
> fi
> else
> echo "The file doesn't exist."
> fi
```

### Usage of `[ -N FILE ]`

```bash
$ if [ -N "/Users/MyUser/Desktop/someFile.txt" ]
> then
> echo "The file exists and has been modified since the last time it was opened."
> else
> echo "Either the file doesn't exist, or it hasn't been modified."
> fi
```

## Condition-testing to compare/evaluate strings

When comparing strings, it is mandatory to use the quotation marks. The spaces after `[` and before `]` are very important. If those spaces are missing, Bash will give an error.

| Condition | Meaning |
| --- | --- |
| `[ -z "STRING" ]` | Tests if the length of `STRING` is zero. |
| `[ -n "STRING" ]` | Tests if the length of `STRING` is non-zero. |
| `[ "STRING1" == "STRING2" ]` | Tests if the strings are equal. |
| `[ "STRING1" != "STRING2" ]` | Tests if the strings are not equal. |
| `[ "STRING1" \< "STRING2" ]` | Tests if `STRING1` sorts before `STRING2`. |
| `[ "STRING1" \> "STRING2" ]` | Tests if `STRING1` sorts after `STRING2`. |

### Usage of `[ -z "STRING" ]`

```bash
$ if [ -z "" ]
> then
> echo "Empty string"
> fi
Empty string
```

### Usage of `[ -n "STRING" ]`

```bash
$ VAR="Some text"
$ if [ -n "${VAR}" ]
> then
> echo "The string is not empty"
> fi
The string is not empty
```

In this example, Bash will show an error because I forgot to put the quotation marks around `${VAR}`:

```bash
$ VAR="Some text"
$ if [ -n ${VAR} ]
> then
> echo "The string is not empty"
> fi
-bash: [: Some: binary operator expected
```

### Usage of `[ "STRING1" == "STRING2" ]`

```bash
$ QC="Good"
$ if [ "${QC}" == "Good" ]
> then
> echo "Quality control good"
> else
> echo "Image has bad quality"
> fi
Quality control good
```

### Usage of `[ "STRING1" != "STRING2" ]`

```bash
$ QC="Good"
$ if [ "${QC}" != "Good" ]
> then
> echo "Quality control is not good"
> else
> echo "Image has good quality"
> fi
Image has good quality
```

### Usage of `[ "STRING1" \< "STRING2" ]`

In the following example, I am comparing the strings `Canada` with `Colombia` and printing the one that sorts first. `Canada` will be printed because the first letter of both words is the same, but the second letter in `Canada` comes before the second letter in `Colombia`.

```bash
$ VAR1="Canada"
$ VAR2="Colombia"
$ if [ "${VAR1}" \< "${VAR2}" ]
> then
> echo ${VAR1}
> else
> echo ${VAR2}
> fi
Canada
```

The previous expression can be written using a shorter syntax:

```bash
[ expression ] >> what_to_do_if_expression_is_true || what_to_do_if_expression_is_false
```

```bash
$ [ "${VAR1}" \< "${VAR2}" ] >> echo ${VAR1} || echo ${VAR2}
Canada
```

### Usage of `[ "STRING1" \> "STRING2" ]`

```bash
$ VAR1="Canada"
$ VAR2="Colombia"
$ if [ "${VAR1}" \> "${VAR2}" ]
> then
> echo ${VAR2}
> else
> echo ${VAR1}
> fi
Canada
```

The previous expression can also be written using the shorter syntax:

```bash
$ [ "${VAR1}" \> "${VAR2}" ] >> echo ${VAR2} || echo ${VAR1}
Canada
```

## Condition-testing to compare numbers

The spaces after `[` and before `]` are very important. If those spaces are missing, Bash will give an error.

| Condition | Meaning |
| --- | --- |
| `[ NUM1 -eq NUM2 ]` | Tests if `NUM1` is equal to `NUM2`. |
| `[ NUM1 -ne NUM2 ]` | Tests if `NUM1` is not equal to `NUM2`. |
| `[ NUM1 -lt NUM2 ]` | Tests if `NUM1` is less than `NUM2`. |
| `[ NUM1 -le NUM2 ]` | Tests if `NUM1` is less than or equal to `NUM2`. |
| `[ NUM1 -gt NUM2 ]` | Tests if `NUM1` is greater than `NUM2`. |
| `[ NUM1 -ge NUM2 ]` | Tests if `NUM1` is greater than or equal to `NUM2`. |

### Usage of `[ NUM1 -eq NUM2 ]`

```bash
$ if [ 3 -eq 3 ]
> then
> echo "This makes sense, 3 equals 3."
> fi
This makes sense, 3 equals 3.
```

The previous expression can also be written using the shorter syntax:

```bash
$ [ 3 -eq 3 ] >> echo "This makes sense, 3 equals 3."
This makes sense, 3 equals 3.
```

```bash
$ A=3
$ if [ "${A}" -eq "3" ]
> then
> echo "This makes sense, ${A} equals 3."
> fi
This makes sense, 3 equals 3.
```

And using the shorter syntax it would be:

```bash
$ [ "${A}" -eq "3" ] >> echo "This makes sense, ${A} equals 3."
This makes sense, 3 equals 3.
```

### Usage of `[ NUM1 -ne NUM2 ]`

```bash
$ A=3
$ if [ "${A}" -ne "3" ]
> then
> echo "Variable A is not equal to 3"
> else
> echo "Variable A equals 3."
> fi
Variable A equals 3.
```

Using the shorter syntax:

```bash
$ [ "${A}" -ne "3" ] >> echo "Variable A is not equal to 3" || echo "Variable A equals 3."
Variable A equals 3.
```

### Usage of `[ NUM1 -lt NUM2 ]`

```bash
$ A=3
$ if [ "${A}" -lt "3" ]
> then
> echo "Variable A is less than 3"
> else
> echo "Variable A not less than 3."
> fi
Variable A is not less than 3.
```

Using the shorter syntax:

```bash
$ [ "${A}" -lt "3" ] >> echo "Variable A is less than 3" || echo "Variable A not less than 3."
Variable A is not less than 3.
```

### Usage of `[ NUM1 -le NUM2 ]`

```bash
$ A=3
$ if [ "${A}" -le "3" ]
> then
> echo "Variable A is less or equal to 3"
> else
> echo "Variable A greater than 3."
> fi
Variable A is less or equal to 3.
```

Using the shorter syntax:

```bash
$ [ "${A}" -le "3" ] >> echo "Variable A is less or equal to 3" || echo "Variable A greater than 3."
Variable A is less or equal to 3.
```

### Usage of `[ NUM1 -gt NUM2 ]`

```bash
$ A=3
$ if [ "${A}" -gt "3" ]
> then
> echo "Variable A is greater than 3."
> else
> echo "Variable A not greater than 3."
> fi
Variable A is not greater than 3.
```

Using the shorter syntax:

```bash
$ [ "${A}" -gt "3" ] >> echo "Variable A is greater than 3." || echo "Variable A not greater than 3."
Variable A is not greater than 3.
```

### Usage of `[ NUM1 -ge NUM2 ]`

```bash
$ A=3
$ if [ "${A}" -ge "3" ]
> then
> echo "Variable A is greater or equal to 3"
> else
> echo "Variable A less than 3."
> fi
Variable A is greater or equal to 3.
```

Using the shorter syntax:

```bash
$ [ "${A}" -ge "3" ] >> echo "Variable A is greater or equal to 3" || echo "Variable A less than 3."
Variable A is greater or equal to 3.
```

## Condition-testing to compare arrays

| Condition | Meaning |
| --- | --- |
| `[ "${array1[*]}" == "${array2[*]}" ]` | Tests if `array1` equals to `array2`. |
| `[ "${array1[*]}" != "${array2[*]}" ]` | Tests if `array1` is different to `array2`. |

### Usage of `[ "${array1[*]}" == "${array2[*]}" ]`

```bash
$ arr1=(a b c)
$ arr2=(a b c d)
$ arr3=(a b c)
$ if [ "${arr1[*]}" == "${arr3[*]}" ]
> then
> echo "equal"
> else
> echo "different"
> fi
equal
```

Using the shorter syntax:

```bash
$ [ "${arr1[*]}" == "${arr3[*]}" ] >> echo "equal" || echo "different"
equal
```

```bash
$ if [ "${arr1[*]}" == "${arr2[*]}" ]
> then
> echo "equal"
> else
> echo "different"
> fi
different
```

Using the shorter syntax:

```bash
$ [ "${arr1[*]}" == "${arr2[*]}" ] >> echo "equal" || echo "different"
different
```

```bash
[ "${arr1[*]}" != "${arr2[*]}" ]: $ if [ "${arr1[*]}" != "${arr2[*]}" ]
> then
> echo "different"
> else
> echo "equal"
> fi
different
```

Using a shorter syntax:

```bash
$ [ "${arr1[*]}" != "${arr2[*]}" ] >> echo "different" || echo "equal"
different
```

## Combining different expressions for condition-testing

| Condition | Meaning |
| --- | --- |
| `[ EXPR ]` | Tests if the expression `EXPR` is `true`. |
| `[ ! EXPR ]` | Tests if the expression `EXPR` is `false`. |
| `[ EXPR1 ] || [ EXPR2 ]` | Tests if `EXPR1` or `EXPR2` are `true`. You can add as many expressions as desired. |
| `[ EXPR1 ] && [ EXPR2 ]` | Tests if `EXPR1` and `EXPR2` are `true`. You can add as many expressions as desired. |

### Usage of `[ EXPR ] vs [ ! EXPR ]`

```bash
$ if [ 3 -eq 3 ]
> then
> echo "This will be printed if the expression 3 equals 3 is true."
> else
> echo "This will be printed if the expression is false (3 is not equal to 3)."
> fi
This will be printed if the expression 3 equals 3 is true.
```

Using a shorter syntax:

```bash
$ [ 3 -eq 3 ] >> echo "This will be printed if the expression 3 equals 3 is true." || echo "This will be printed if the expression is false (3 is not equal to 3)."
This will be printed if the expression 3 equals 3 is true.
```

```bash
$ if [ ! 3 -eq 3 ]
> then
> echo "This will be printed if it is false that 3 equals 3 (so, if 3 is different than 3)."
> else
> echo "This will be printed if it is not false (it's true) that 3 equals 3."
> fi
This will be printed if it is not false (it's true) that 3 equals 3.
```

Using a shorter syntax:

```bash
$ [ ! 3 -eq 3 ] >> echo "This will be printed if it is false that 3 equals 3 (so, if 3 is different than 3)." || echo "This will be printed if it is not false (it's true) that 3 equals 3."
This will be printed if it is not false (it's true) that 3 equals 3.
```

We learned that the expression `-f FILE` tests if a file exists. If we want to test if a file doesn't exist, then we just need to test if `-f FILE` is `false`.

```bash
$ FILE="SomeFileThatExists.txt"
$ if [ -f ${FILE} ]
> then
> echo "The file exist"
> fi
The file exist
```

Using a shorter syntax:

```bash
$ [ -f ${FILE} ] >> echo "The file exist"
The file exist
```

```bash
$ FILE="SomeFileThatDoesntExist.txt"
$ if [ ! -f ${FILE} ]
> then
> echo "The file doesn't exist"
> fi
The file doesn't exist
```

Using a shorter syntax:

```bash
$ [ ! -f ${FILE} ] >> echo "The file doesn't exist"
The file doesn't exist
```

### Usage of `[ EXPR1 ] || [ EXPR2 ]`

```bash
$ if [ 2 -lt 3 ] || [ 4 -lt 3 ]
> then
> echo "This will be echoed if any of the two expressions are true: 2<3 OR 4<3."
> else
> echo "This will be echoed if none of the two expressions are true"
> fi
This will be echoed if any of the two expressions are true: 2<3 OR 4<3.
```

Using a shorter syntax:

```bash
$ ( [ 2 -lt 3 ] || [ 4 -lt 3 ] ) && echo "This will be echoed if any of the two expressions are true: 2<3 OR 4<3." || echo "This will be echoed if none of the two expressions are true":
This will be echoed if any of the two expressions are true: 2<3 OR 4<3.
```

### Usage of `[ EXPR1 ] && [ EXPR2 ]`

The following example tests if the two expressions are `true`. The second expression, opposite to the previous example, has the negation (`!`). So, the second expression is not testing if 4 is less than 3, it is testing if 4 is **NOT** less than 3 (if it's equal or greater than 3). So, both of the expressions are `true`, because 4 is not less than 3, and 2 is less than 3.

```bash
$ if [ 2 -lt 3 ] && [ ! 4 -lt 3 ]
> then
> echo "This will be echoed if the two expressions are true."
> else
> echo "This will be echoed if one of the two expressions are false, or if both are false."
> fi
This will be echoed if the two expressions are true.
```

Using a shorter syntax:

```bash
$ ( [ 2 -lt 3 ] && [ ! 4 -lt 3 ] ) && echo "This will be echoed if the two expressions are true." || echo "This will be echoed if one of the two expressions are false, or if both are false."
This will be echoed if the two expressions are true.
```

### Using the and (`&&`) and or (`||`) operands to test more than two conditions

You can combine more than two expressions. In the following example, I am combining three. Because I am using the **AND** operator, the whole condition will test `true` **if and only if** all the three expressions are `true`. If one is `false`, then the whole expression will be `false`.

```bash
$ if [ 2 -lt 3 ] && [ ! 4 -lt 3 ] && [ 4 -lt 3 ]
> then
> echo "This will be echoed if all the three expressions are true."
> else
> echo "This will be echoed if any of the three expressions is false."
> fi
This will be echoed if any of the three expressions is false.
```

Let's take a look at why the whole expression evaluates `false`:
`[ 2 -lt 3 ]`: This is `true`, 2 < 3.
`[ ! 4 -lt 3 ]`: This is `true`, 4 is not less than 3.
`[ 4 -lt 3 ]`: This is `false`, It is `false` that 4 be less than 3.
`[ 2 -lt 3 ] && [ ! 4 -lt 3 ] && [ 4 -lt 3 ]`: This is `false` because one of the three expressions is `false`.

Using a shorter syntax:

```bash
$ ( [ 2 -lt 3 ] && [ ! 4 -lt 3 ] && [ 4 -lt 3 ] ) && echo "This will be echoed if all the three expressions are true." || echo "This will be echoed if any of the three expressions is false."
```

The following example is very similar to the previous one, but instead of using the operator AND (`&&`), we are using the operator OR (`||`). So, the whole expression will be `true` if **ANY** of the three expressions is `true`. Since the first two expressions are `true`, then the result is `true`.

```bash
$ if [ 2 -lt 3 ] || [ ! 4 -lt 3 ] || [ 4 -lt 3 ]
> then
> echo "This will be echoed if ANY of the three expressions is true."
> else
> echo "This will be echoed if all of the three expressions are false."
> fi
This will be echoed if ANY of the three expressions is true.
```

Using a shorter syntax:

```bash
$ ( [ 2 -lt 3 ] || [ ! 4 -lt 3 ] || [ 4 -lt 3 ] ) && echo "This will be echoed if ANY of the three expressions is true." || echo "This will be echoed if all of the three expressions are false."
This will be echoed if ANY of the three expressions is true.
```

### Combining `&&` and `||` into one expression

When combining both operands (`&&`, `||`), it is better to always use parenthesis to indicate the order in which you want the operations to be evaluated. In the following example we have three files. The path of the three files are saved in the variables `${FILE1}` `${FILE2}` and `${FILE3}`. Files `${FILE1}` and `${FILE3}` exist, but `${FILE2}` doesn't exist. We want to evaluate the following condition: Does `${FILE3}` **and at least** one of the other two files exists?

`[ -f ${FILE3} ]`: This condition is true because `${FILE3}` exists.
`[ -f ${FILE2} ] || [ -f ${FILE1} ]`: This condition is `true` because even though `${FILE2}` doesn't exist,`${FILE1}` does exist. And with an OR (`||`) we only need one of the expressions to be `true`.
`( [ -f ${FILE1} ] || [ -f ${FILE2} ] ) && [ -f ${FILE3} ]`: This is `true` because both of expressions are `true`.

```bash
$ if ( [ -f ${FILE1} ] || [ -f ${FILE2} ] ) && [ -f ${FILE3} ]
> then
> echo "The condition is true"
> else
> echo "The condition is false"
> fi
The condition is true
```

Using a shorter syntax:

```bash
( [ -f ${FILE1} ] || [ -f ${FILE2} ] ) && [ -f ${FILE3} ] && echo "The condition is true" || echo "The condition is false"
```

In the following example, we want to include a subject if it is female and age less than six or male and age greater than ten:

```bash
$ GENDER="MALE"
$ AGE=23
$ if ( [ "${GENDER}" == "FEMALE" ] && [ "${AGE}" -lt "6" ] ) || ( [ "${GENDER}" == "MALE" ] && [ "${AGE}" -gt "10" ] )
> then
> echo "Include subject"
> else
> echo "Exclude subject"
> fi
Include subject
```
