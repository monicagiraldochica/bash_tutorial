# Variables

An important aspect of programming is the ability to use a variables. For example, I can use the variable `desktop` to represent the string `"/Users/myuser/Desktop"`. Or the variable `year` to represent the number `2025`.

Variables make the code more readable, short and organized, and prevent typing errors. They are also useful in cases in which the actual value of a variable is not known before executing the program, or when you need to save the output of one command to use as input for another command.

In Bash you don't specify data types. However, if the value that you are assigning is a string, you should use quotation marks between the beginning and the end of your string, especially if the string contains spaces. Be careful not to include any white space between the variable name, the equals sign, and the value. Additionally, be aware that the quotation marks used in Bash are `"` , which is different than those used in Microsoft Word. They look similar, but Bash won't recognize the later ones. So, if you copy-paste from Microsoft Word a command that includes quotation marks, you will get an error.

## Declaring variables

Numbers, strings and characters should be declared in a different manner:

```bash
YEAR=2018
MONTH="August"
NAME="Monica Keith"
GENDER='F'
```

**Common mistakes when declaring variables:**

The following commands will produce errors because there is a white space before and/or after the equal sign, or because the quotation marks are missing when declaring a string that contains a space. Bellow each erroneous command you can see the error that Bash produces.

```bash
$ NAME ="Monica Keith"
-bash: NAME: command not found
$ NAME= "Monica Keith"
-bash: Monica Keith: command not found
$ NAME = "Monica Keith"
-bash: NAME: command not found
$ NAME=Monica Keith
-bash: Keith: command not found
```

Once you assign a value to a variable, you can reference it with a dollar sign, located immediately before the variable name. You can also include curly brackets at the beginning and the end of the variable name to prevent errors in your code when referencing strings that have spaces or special characters.

## Referencing variables

In the following example, I will declare variable `VAR1` with value `2`, and variable `VAR2` with value `"Subject"`. Then, I will use the `echo` to print the value of the two variables.

```bash
$ VAR1=2
$ VAR2="Subject"
$ echo ${VAR1}
2
$ echo ${VAR2}
Subject
```

**Common mistakes:**

When referencing a variable, be careful not to include any space before or after the brackets. The following examples will produce an error because of the inclusion of a space around the brackets:

```bash
$ echo ${ VAR2}
-bash: ${ VAR2}: bad substitution
$ echo ${VAR2 }
-bash: ${VAR2 }: bad substitution
$ echo ${ VAR2 }
-bash: ${ VAR2 }: bad substitution
```

The following erroneous reference (with a space between the dollar sign and the first bracket) will not cause an error, but will **not** substitute `${VAR2}` for the correct value. It will just print `$ {VAR2}` instead of `Subject`.

```bash
$ echo $ {VAR2}
{VAR2}
```

## Concatenating variables

You can concatenate different variables and characters to form new strings. To do this, you will need to reference the variables using the curly brackets and use quotation marks at the beginning and the end of your final string. For example, if you want to use the previously declared variables `VAR1` and `VAR2` to generate the String `Subject_02`, you can concatenate them the following way:

```bash
$ echo ${VAR2}
Subject
$ echo ${VAR1}
2
$ echo "${VAR2}_0${VAR1}"
Subject_02
```

Here are a few more examples on how to declare and concatenate variables:

```bash
$ ID="Subject_202"
$ VOLUME=20
$ MEASURE="mm"
$ echo "${ID}: ${VOLUME}${MEASURE}"
Subject_202: 20mm

$ VAR1="MacOS"
$ VAR2="Linux"
$ VAR3="Windows"
$ echo "(${VAR1},${VAR2},${VAR3})"
(MacOS,Linux,Windows)
```

**Common mistakes:**

It is very common when you are referencing many variables or concatenating variables to create a long string to forget the closing quotation mark. For example, writing `$ echo "(${VAR1},${VAR2},${VAR3})` instead of `$ echo "(${VAR1},${VAR2},${VAR3})"`

When that happens and you click enter in the keyboard, the command line won't allow you to enter any more commands. You will see the symbol `>` and if you continue pressing enter it will do nothing. This is because the command line is waiting for you to close the open String. To close the string, just add the missing quotation mark or cancel and ignore what you have written so far in the current line by pressing CTR+C.

## Variable names

You can assign any value to a variable. However, a variable cannot have just any name. There are a few rules for assigning variable names.

1. A variable name should not be a number: this type of variable is only used to read arguments on a shell script. For example, `$1` refers to the first argument of a script, `$2` to the second argument, etc. Later you will learn the [meaning and use of script arguments](advanced_bash.md#reading-arguments).
2. Variable names must start with an alphabetical letter or an underscore: variable names can contain any number, but it should not be located at the beginning.
3. Do **not** use `$` or `${}` to declare a variable: these characters are used only to reference variables.
4. Do **not** assign the name `PATH` to any variable: if you do so, you won't get any error right away. But it will mess up the execution of other programs. `PATH` is a system variable that specifies a set of directories where executable programs are located. For example, when you install a software that runs in the command line, the path to the executable of that program will be included in the system variable `PATH`. So, if you rename that variable, you won't be able to execute the program again in the current terminal. If you forget about this rule and mistakenly re-write the value of this variable, close the current terminal and open a new one. Every time you open a new terminal, this system variable will be re-set to the correct value (which is stored in the bash_profile). At any moment you can know the value of your `PATH` by typing `echo ${PATH}`. You will see something like this, although this significantly varies between computers depending on which programs you have installed and referenced in the bash_profile file.

    ```bash
    $ echo ${PATH}
    /usr/local/fsl/bin:/Applications/freesurfer/bin:/Applications/freesurfer/fsfast/bin:/Applications/freesurfer/tktools:/usr/local/fsl/bin:/Applications/freesurfer/mni/bin:/Users/bunbury/bin:/Applications/MATLAB_R2018a.app/bin:/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin
    ```

    Another Unix reserved name that you should not use is `BASH`. There is a long list of [Unix reserved words](https://www.gnu.org/software/bash/manual/html_node/Reserved-Word-Index.html) that I will not include here but you will learn as you get more experienced.

5. Avoid using the following [reserved characters](https://www.gnu.org/software/bash/manual/html_node/Reserved-Word-Index.html) from appearing in variable names: `/` `>` `<` `|` `:` `&` `.` `*`.

    Here are some examples of valid and invalid variable names:

    | Valid | Invalid | Reason |
    | --- | --- | --- |
    | `V` | `1` | You **cant** use numbers as variable names. |
    | `VAR` | `1VAR` | A variable name **cant** start with a number. |
    | `VAR1` | `2_VAR` | A variable name **cant** start with a number. |
    | `VAR_1` | `.VAR` | A variable name **cant** start with a reserved character (`.`). |
    | `_VAR1` | `$VAR` | A variable name **cant** start with a reserved character (`$`). This syntax is used to reference, **not** to declare a variable. |
    | `_1VAR` | `${VAR}` | A variable name **cant** start with a reserved character (`$`). This syntax is used to reference, **not** to declare a variable. |
    | `VARIABLE_NAME` | `{VAR}` | A variable name **cant** contain brackets. |
    | `PATH1` | `PATH` | `PATH` is a reserved word and should not be used as a variable in your scripts. |
    | `BASH1` | `BASH` | `BASH` is a reserved word and should not be used as a variable in your scripts. |

6. Variable names can be in lower and/or upper case. However, they are case sensitive. If you declare a variable as `VAR1`, but you reference it as `${var1}`, Bash will not recognize the value. You must reference it as `${VAR1}`.

## Reading user input

The command `read` is the counterpart of `echo`. Instead of printing things in the terminal the way `echo` does, `read` reads input from the user and saves it in the specified variable (in the example below `VAR`). The command `read` is followed by the name of the variable where you want to save the information. In the following example, I am going to read the input from the user and save it in the variable `VAR`. Generally, Bash will read everything that is written until the user presses the Enter key and save all the information in the corresponding variable.

Saving user input into a new variables:

```bash
$ echo "Username:"
Username:
$ read VAR
Noemi
$ echo "You typed: ${VAR}"
You typed: Noemi
```

There are some flags that can be added to the command `read` to change the way in which information is displayed or captured:

| Valid | Invalid |
|-----------| ------- |
| `-s` | Silent mode: the characters that the user inputs are not displayed (used when asking the user to input a password). |
| `-p "MESSAGE"` | Displays `MESSAGE` where the user must write the input. Generally with instructions about what the user must input. |
| `-n NUM_CHARS` | The input line ends after reading `NUM_CHARS` characters, rather than waiting for the user to press Enter in the keyboard. |
| `-d 'CHAR_NEW_LINE'` | `CHAR_NEW_LINE` is used to determine the end of the input line (if different than Enter). |
| `-r` | Backslash does not act as an escape character but instead is part of the line. |
| `-t NSECONDS` | Bash will stop reading the user input after `NSECONDS`. Whatever was entered in that time is captured as the input line. |
| `-a ARRAY_NAME` | The words that the user inputs are assigned to sequential indices of the array `ARRAY_NAME`. The array is emptied before assigning the values if it already exists. |
| `-u FILEDESCRIPTOR` | Read input from `FILEDESCRIPTOR`. |

The following examples will show how to use the flags mentioned in the previous table. In this section, I will not explain the use of flags `-a` and `-u` because we haven't learned yet about [arrays](arrays.md) or [file manipulation](txt_csv.md#the-read-command). These will be explained in the corresponding chapters. Some of the examples will also show common mistakes that will make Bash show an error.

**Usage of `read -s`:**

In the following example, the flag `-s` causes the user input to be silenced, so when the user writes the password, it is not shown in the screen. If the user input is `ThisIsMyPassword`, then that string is saved in the variable `PASSWORD`. While the user is writing its password and until it presses Enter, you will see the following symbol underneath `$ read -s PASSWORD`: ![image1](img/pwd.png). Afterwards, the symbol will disappear.

In the example below of a wrong syntax, the mistake is that the variable `PASSWORD` is written before the flag `-s`. The variable must go at the end of the command independently of which flags are used. As a result, Bash is not silencing the user input, is giving the invalid identifier error, and is not saving any string in the variable.

Correct syntax:

```bash
$ read -s PASSWORD

$ echo ${PASSWORD}
ThisIsMyPassword
```

Wrong syntax:

```bash
$ read PASSWORD -s
ThisIsMyPassword
-bash: read: `-s': not a valid identifier
```

**Usage of `read -p`:**

The `flag -p` is useful if you want to prompt a message so that the user knows what the input should be. The examples in the following table combine the flags `-p` and `-s` to indicate the user to input a password and hide the password while its being typed. The prompt message should go right after the flag `-p`.

The following table shows some examples of commands written using a wrong syntax (as well as the correct way to write them). In the first example, the error is that the prompt message is not located right after the flag `-p` (instead, it is located after the flag `-s`). In the second example, the error is that the variable `PASSWORD` is not located at the end of the command. In the third example, the problem is that the prompt message (Please input your password) is not surrounded by quotation marks. So, for Bash only the first word of that sentence (Please) is the prompt message, and the next word (input) is read as the variable name. The rest of the command (your password) is ignored. That is why when reading `${PASSWORD}`, nothing is echoed, the variable is empty because nothing was saved with that variable name. Instead, the input was saved in `${input}`. This is the reason why the prompt message should always be surrounded by quotation marks.

Correct syntax:

```bash
$ read -p "Please input your password: " -s PASSWORD
Please input your password: 
$ echo ${PASSWORD}
ThisIsMyPassword
```

Wrong syntax:

```bash
$ read -p -s "Please input your password" PASSWORD
-s
-bash: read: `Please input your password': not a valid identifier
```

```bash
$ read PASSWORD -s -p "Please input your password"
ThisIsMyPassword
-bash: read: `-s': not a valid identifier
```

```bash
$ read -s -p Please input your password
ThisIsMyPassword
$ echo $PASSWORD

$ echo ${input}
ThisIsMyPassword
```

**Usage of `read -n`:**

In the following example, `-n` 1 forces Bash to accept only one character in the input. So, the terminal will finish reading after one character. Here we are combining flags `-n` and `-p` to also prompt a message to the user.

In the wrong syntax, 1 (the number of characters to be accepted) and the prompt message are located in the wrong place. The number of characters accepted should always go after `-n` and the prompt message should always go after `-p`.

Correct syntax:

```bash
$ read -n 1 -p "Do you wish to continue? (y/n)" VAR
Do you wish to continue? (y/n)y
$ echo $VAR
y
$ read -p "Do you wish to continue? (y/n)" -n 1 VAR
Do you wish to continue? (y/n)y
$ echo $VAR
y
```

Wrong syntax:

```bash
$ read -n -p 1 "Do you wish to continue? (y/n)" VAR
-bash: read: -p: invalid number
```

**Usage of `read -d`:**

In the following example the end of the line is determined by the character `#` instead of Enter (using the flag `-d`). As soon as the user types `#`, Bash finishes reading and saves the input in the variable `VAR`.

Correct syntax:

```bash
$ read -d '#' VAR

$ echo $VAR
SomeText
```

Wrong syntax: In this example we are missing the apostrophes (`'`) around the character `#`. So, everything after `#` is being considered as comment and not as part of the command.

```bash
$ read -d # VAR
-bash: read: -d: option requires an argument
read: usage: read [-ers] [-u fd] [-t timeout] [-p prompt] [-a array] [-n nchars] [-d delim] [name ...]
```

Keep in mind that Bash will convert any carriage return to spaces:

```bash
$ read -d '#' VAR
lala
aaaa
#
$ echo $VAR
lala aaaa
```

**The backslash:**

In Bash, certain characters have special meanings. For example, the dollar sign is used to reference a variable. When you type `${VAR}`, Bash will print the value of `VAR`, instead of the actual string "\${VAR}". The backslash is used to remove those special meanings from the character followed by it.

```bash
$ VAR="Some text"
$ echo ${VAR}
Some text
$ echo \${VAR}
${VAR}
```

When using the flag `-r`, the backslash is part of the line instead of being used as an escape character. The following examples show that when we use `-r` backslash is part of the input string, and when we don't, it's used as a scape character.

```bash
$ read -r VAR
C:\Documents\Newsletters\Summer2018.pdf
$ echo ${VAR}
C:\Documents\Newsletters\Summer2018.pdf
$ read VAR
C:\Documents\Newsletters\Summer2018.pdf
$ echo ${VAR}
C:DocumentsNewslettersSummer2018.pdf
```

```bash
$ read -r MESSAGE
In HTML \n is used to indicate a new line
$ echo ${MESSAGE}
In HTML \n is used to indicate a new line
$ read MESSAGE
In HTML \n is used to indicate a new line
$ echo ${MESSAGE}
In HTML n is used to indicate a new line
```

## Reading from other sources

So far, we have used the command `read` to save the user input into a variable. This command can also be used to read from other sources (i.e. other variables or files).

**Reading content from a variable:**

In the following example, read reads the content of the variable `VAR`, but only keeps the first character (because it is using the `-n 1` flag):

```bash
$ VAR=yes
$ read -n 1 R <<< ${VAR}
$ echo ${R}
y
```

**Reading and saving the output of a function:**

`read` also allows you to read the output of a function and save it into a variable. In this example, we are saving the output of the `pwd` into the variable `CURRENT_DIR`. `pwd` is a function that prints the current folder in which you are located in the command line.

```bash
$ pwd
/Users/myUserName
$ read CURRENT_DIR <<< $(pwd)
$ echo ${CURRENT_DIR}
/Users/myUserName
```
