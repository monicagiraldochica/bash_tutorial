# Iteration

Iteration is the repetition of commands on a list of items. For example, you might use iteration to manipulate in the same way a long list of files. It saves time because instead of typing the same command 100 times to do the same thing on 100 files, you type it just one time inside a loop. You will use loops (as well as condition-testing) in almost every script that you write.

| Command | Use | Syntax |
| --- | --- | --- |
| `for` | For iterating over a series of items within a list (array). | `for item in list; do; commands; done` |
| `for` | For iterating through an index. | `for ((i=1; i<=64; i+=1)); do; commands; done` |
| `while` | For iterating while a control expression (condition) is `true`. | `while condition; do; commands; done` |

## The `for` loop

### Array of words

In the following example we have an array with a list of subjects:

```bash
declare -a ARRAY=('SUBJ0' 'SUBJ9' 'SUBJ3' 'SUBJ4' 'SUBJ3')
```

If we want to print the ID of each subject within the list without using a loop, we would have to type 5 different commands:

```bash
$ echo ${ARRAY[0]}
SUBJ0
$ echo ${ARRAY[1]}
SUBJ9
$ echo ${ARRAY[2]}
SUBJ3
$ echo ${ARRAY[3]}
SUBJ4
$ echo ${ARRAY[4]}
SUBJ3
```

If instead we use a loop, we just need to write the command one time. In this example, with only five subjects, so it doesn’t save too many lines of code. But normally you will be working with many more items than five.

```bash
$ for ID in ${ARRAY[@]}
> do
> echo ${ID}
> done
SUBJ0
SUBJ9
SUBJ3
SUBJ4
SUBJ3
```

The previous `for` loop iterates through every item in `${ARRAY[@]}` (the items that would be listed if you typed `echo ${ARRAY[@]})`), and assign each item to the variable `ID` during the corresponding loop. So, the loop will run 5 times. The first time it runs it will assign the value `SUBJ0` to variable `ID`, the second loop will assign value `SUBJ9` to variable `ID`, etc.

```bash
$ num=0
$ for ID in ${ARRAY[@]}
> do
> echo "Subject number ${num} is ${ID}"
> ((num++))
> done
Subject number 0 is SUBJ0
Subject number 1 is SUBJ9
Subject number 2 is SUBJ3
Subject number 3 is SUBJ4
Subject number 4 is SUBJ3
```

### Using patterns

As we learned in the [arrays section](arrays.md), you can use patterns to create arrays. You can also use patterns to list files that have a similar path except for a few words or letters.

For example, if you have a folder located in the following path: `/Users/MyUserName/Desktop/MyProjectFolder`. Inside this folder you have 100 files named very similarly: `DTI_SUBJ1.nii.gz, DTI_SUBJ2.nii.gz, DTI_SUBJ3.nii.gz, DTI_SUBJ4.nii.gz, DTI_SUBJ5.nii.gz, ..., DTI_SUBJ100.nii.gz`

Then, you could print the list of all those files by simply typing: `echo /Users/MyUserName/Desktop/MyProjectFolder/DTI_SUBJ*.nii.gz`. This command matches all the file paths that contain any number of characters in the position where the asterisk is located.

Let's look at another example. Suppose that you have information for a list of subjects organized the following way:

- Your main subjects is folder located in this path: `/Users/MyUserName/Desktop/MyProjectFolder`
- Inside that folder you have one folder per subject: `/Users/MyUserName/Desktop/MyProjectFolder/Subject1`, `/Users/MyUserName/Desktop/MyProjectFolder/Subject2`, ..., `/Users/MyUserName/Desktop/MyProjectFolder/Subject100`
- Inside each subject folder, you have the following files: `DTI.nii.gz`, `ANAT.nii.gz`, `LGN.nii.gz`

If you wanted to obtain the list of paths for the `DTI.nii.gz` files of all subjects, you could type: `echo /Users/MyUserName/Desktop/MyProjectFolder/Subject*/DTI.nii.gz`. Because the path of these files is the same except for the subject number, you can create the pattern by substituting the part that changes by an asterisk.

When using the asterisk, it will select all files that contain any amount of characters in that position. But if you want to restrict the search to a specific amount of characters, you could also use the interrogation mark.

For example, let's suppose you have a main folder located in the following path: `/MyComputer/MyUser/MyDocuments/MyFolder`. And inside that folder you have 100 files named: `myFile001.txt`, `myFile002.txt`, ..., `myFile100.txt`

You want to iterate through the files `myFile001.txt` to `myFile009.txt`. All those files have the exact same path and name except for exactly one character. So, you can replace that character by an interrogation mark:

```bash
$ for f in /MyComputer/MyUser/MyDocuments/MyFolder/myFile00?.txt
> do
> echo $f
> done
/MyComputer/MyUser/MyDocuments/MyFolder/myFile001.txt
/MyComputer/MyUser/MyDocuments/MyFolder/myFile002.txt
/MyComputer/MyUser/MyDocuments/MyFolder/myFile003.txt
/MyComputer/MyUser/MyDocuments/MyFolder/myFile004.txt
/MyComputer/MyUser/MyDocuments/MyFolder/myFile005.txt
/MyComputer/MyUser/MyDocuments/MyFolder/myFile006.txt
/MyComputer/MyUser/MyDocuments/MyFolder/myFile007.txt
/MyComputer/MyUser/MyDocuments/MyFolder/myFile008.txt
/MyComputer/MyUser/MyDocuments/MyFolder/myFile009.txt
```

You could choose to print the results into a file instead of the command prompt. This can be achieved using the symbol `>>`. After running the following loop, you will not see any output in the command line, the path of the nine files will be saved to `output.txt`:
The command `cat ${maindir}output.txt` prints the content of this output file.

```bash
$ maindir=/MyComputer/MyUser/MyDocuments/MyFolder/
$ for f in ${maindir}myFile00?.txt
> do
> echo $f >> ${maindir}output.txt
> done
$ cat ${maindir}output.txt
/MyComputer/MyUser/MyDocuments/MyFolder/myFile001.txt
/MyComputer/MyUser/MyDocuments/MyFolder/myFile002.txt
/MyComputer/MyUser/MyDocuments/MyFolder/myFile003.txt
/MyComputer/MyUser/MyDocuments/MyFolder/myFile004.txt
/MyComputer/MyUser/MyDocuments/MyFolder/myFile005.txt
/MyComputer/MyUser/MyDocuments/MyFolder/myFile006.txt
/MyComputer/MyUser/MyDocuments/MyFolder/myFile007.txt
/MyComputer/MyUser/MyDocuments/MyFolder/myFile008.txt
/MyComputer/MyUser/MyDocuments/MyFolder/myFile009.txt
```

### Iterating through files

To know the current directory in which you are located in the command line, type `pwd`. In the following example we want to we want to perform some action on all the files inside the current directory. To get the list of those files we use the `ls`.

```bash
$ pwd
/path/to/my/current/directory
$ for f in $( ls )
> do
> echo "Do something with this file: ${f}"
> done
```

## From `for` to `while`

Every loop that you write using `for` can also be written with `while`. The results will be the same, but sometimes one of them will be more efficient and easier to code than the other.

- You should use the **for** command when you want to iterate through **all the elements** of an array.
- You should use the **for** command when iterating through **the indices** of an array (either all or a subset of them).
- You should use the **while** command when you want to iterate through **a limited number of elements** within the array.
- You should use the **while** command when you want to iterate through **more than one array** or while **several conditions should be met**.

The following example shows how a `for` loop can be converted into a `while` loop. The objective of this piece of code is to print the elements of an array.

Using `for`:

```bash
declare -a ARRAY=('SUBJ0' 'SUBJ9' 'SUBJ3' 'SUBJ4' 'SUBJ3')
$ for E in ${ARRAY[@]}
> do
> echo ${E}
> done
SUBJ0
SUBJ9
SUBJ3
SUBJ4
SUBJ3
```

Using `while`:

```bash
$ SIZE=${#ARRAY[@]}
$ i=0
$ while [ ${i} -lt ${SIZE} ]
> do
> echo ${ARRAY[${i}]}
> ((i++))
> done
SUBJ0
SUBJ9
SUBJ3
SUBJ4
SUBJ3
```

OR:

```bash
$ SIZE=${#ARRAY[@]}
$ i=0
$ while [ ${i} -lt ${SIZE} ]
> do
> echo ${ARRAY[$((i++))]}
> done
SUBJ0
SUBJ9
SUBJ3
SUBJ4
SUBJ3
```

In the previous example both loops iterate through the elements of an array and print them in the terminal. However, there are some important differences:

- The `for` loop automatically stops when iteration reaches the end of the array. The `while` loop stops when the condition (`[ ${i} -lt ${SIZE} ]`) evaluates `false`. This means that it will iterate as long as variable `i` is less than (`-lt`) `SIZE`. In the `while` loop, variable `i` contains the index of each item during the iteration and variable `SIZE` contains the size of the array. For this reason `((i++))` is included inside the `while` loop. `((i++))` increments the value of `i` in 1 on each iteration. **If you didn't include this, Bash would iterate forever**, because you wouldn't be increasing the value of `i`, and it would always equal zero. Hence, it would never be less than the size of the array. So, the condition that the `while` evaluates will never be `false`. Since `while` iterates as long as that condition is `true`, it would iterate forever.
- In the `for` loop each element of the array is saved in variable `E`. However, you don't have to assign each value to the variable, it is done automatically. In the `while` loop the element in the position `i` is referenced with `${ARRAY[${i}]}`.
- In this case we want to iterate through all the elements of `ARRAY`. So, it makes more sense to use the `for` loop.

Below is another example on how to print the elements of an array and their position within the array using `for` and `while`:

Using `for`:

```bash
$ declare -a ARRAY=('SUBJ0' 'SUBJ9' 'SUBJ3' 'SUBJ4' 'SUBJ3')
$ i=0
$ for ID in ${ARRAY[@]}
> do
> echo "Subject number ${i} is ${ID}"
> ((i++))
> done
Subject number 0 is SUBJ0
Subject number 1 is SUBJ9
Subject number 2 is SUBJ3
Subject number 3 is SUBJ4
Subject number 4 is SUBJ3
```

Using `while`:

```bash
$ SIZE=${#ARRAY[@]}
$ i=0
$ while [ ${i} -lt ${SIZE} ]
> do
> echo "Subject number ${i} is ${ARRAY[$i]}"
> ((i++))
> done
Subject number 0 is SUBJ0
Subject number 1 is SUBJ9
Subject number 2 is SUBJ3
Subject number 3 is SUBJ4
Subject number 4 is SUBJ3
```

Previously we learned that the following loop would `echo` the path of all the files in the current directory:

```bash
$ for f in $( ls )
> do
> echo "Do something with this file: ${f}"
> done
```

In this case, it makes more sense to use the `for` loop. However, if instead of echoing all the files inside the current directory you wanted to echo only the first five files, then you should use the `while` loop:

```bash
$ i=0
$ ARRAY=($( ls ))
$ while [ ${i} -le 4 ]
> do
> echo ${ARRAY[${i}]}
> ((i++))
> done
```

In the following example we rename *all* the files in the current directory that end in .nii.gz:

```bash
$ ls
10132423423.nii.gz
25675756756.nii.gz
36787686767.nii.gz
37456456456.nii.gz
39756756756.nii.gz
41786786677.nii.gz
$ i=1
$ for f in ./*.nii.gz
> do
> mv ${f} Subject_${i}.nii.gz
> ((i++))
> done
$ ls
Subject_1.nii.gz
Subject_2.nii.gz
Subject_3.nii.gz
Subject_4.nii.gz
Subject_5.nii.gz
Subject_6.nii.gz
```

In the following example we rename *the first three* files in the current directory that end in .nii.gz:

```bash
$ ls 10132423423.nii.gz
25675756756.nii.gz
36787686767.nii.gz
37456456456.nii.gz
39756756756.nii.gz
41786786677.nii.gz
$ i=0
$ ARRAY=($( ls ./*.nii.gz ))
$ while [ ${i} -le 2 ]
> do
> mv ${ARRAY[${i}]} ./Subject_$((++i)).nii.gz
> done
$ ls
Subject_1.nii.gz
Subject_2.nii.gz
Subject_3.nii.gz
37456456456.nii.gz
39756756756.nii.gz
41786786677.nii.gz
```

## The `while` loop

### Multiple arrays

As previously mentioned, when you are iterating through more than one array you should use `while` instead of `for`.

#### Iterating through two arrays

In the following example we have two arrays (`ID` and `VISIT`), which contain a list of subject IDs and visit numbers respectively. The loop iterates through both arrays (until it reaches the end of one or the other) and saves the information extracted from both arrays into a text file. Then, it prints the content of the text file (`test.txt`) using `cat`, which will be explained in detail in the following chapter ([File manipulation](files1.md)).

This `while` loop will run as long as the two conditions (`[ ${i} -lt ${SIZE_ID} ]` and `[ ${i} -lt ${SIZE_VISIT} ]`) are `true`. So, as the value of `i` be greater than `SIZE_ID` or `SIZE_VISIT`, it will stop. It is important to **not** forget the line `((i++))`. Otherwise, it will loop forever (you can always break a loop with Control + C).

```bash
$ declare -a ID=('SUBJ0' 'SUBJ1' 'SUBJ2' 'SUBJ3' 'SUBJ4' 'SUBJ5' 'SUBJ6')
$ declare -a VISIT=('V1' 'V1' 'V2' 'V1' 'V2' 'V2' 'V3')
$ SIZE_ID=${#ID[@]}
$ SIZE_VISIT=${#VISIT[@]}
$ i=0
$ while [ ${i} -lt ${SIZE_ID} ] && [ ${i} -lt ${SIZE_VISIT} ]
> do
> echo "${ID[${i}]}_${VISIT[${i}]}" >> test.txt
> ((i++))
> done
$ cat test.txt
SUBJ0_V1
SUBJ1_V1
SUBJ2_V2
SUBJ3_V1
SUBJ4_V2
SUBJ5_V2
SUBJ6_V3
```

#### Inverting an array

In this example initially there is only one array, but after the code is executed there will be two arrays. The second array will be the inversion of the first one. The code will iterate starting at the end of the array and finishing at the beginning. In each iteration it will copy the current value into the new array. It will start adding items at the beginning of the new array (in the index 0).

For this purpose, there will be two variables:

Variable `i` will be initialized with value `$(( ${#ARRAY[@]} – 1 ))` (the size of the initial array minus one). It will represent the position in which the loop is iterating in the original array. In each loop, `i` will decrease its value in 1 until it reaches 0. It is initialized with value equal to the size of the array **minus one** because the first index of an array is 0 and the last one is the size of the array minus one.

Variable `j` will be initialized with value 0. It will represent the position in which the loop is iterating in the inverted array. In each loop, `j` will increase its value until it reaches the size of the original array.

Values of `i`: 9, 8, 7, 6, 5, 4, 3, 2, 1, 0.

Order of values in the original array: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10.

Values of `j`: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9.

Order of values in the inverted array: 10, 9, 8, 7, 6, 5, 4, 3, 2, 1.

```bash
$ declare -a ARRAY=('1' '2' '3' '4' '5' '6' '7' '8' '9' '10')
$ i=$(( ${#ARRAY[@]} - 1 ))
$ j=0
$ while [ ${i} -ge 0 ]
> do
> echo "Copying element in position ${i} from the original array into position ${j} of the new array..."
> INV_ARRAY[$((j++))]=${ARRAY[$((i--))]}
> done
Copying element in position 9 from the original array into position 0 of the new array...
Copying element in position 8 from the original array into position 1 of the new array...
Copying element in position 7 from the original array into position 2 of the new array...
Copying element in position 6 from the original array into position 3 of the new array...
Copying element in position 5 from the original array into position 4 of the new array...
Copying element in position 4 from the original array into position 5 of the new array...
Copying element in position 3 from the original array into position 6 of the new array...
Copying element in position 2 from the original array into position 7 of the new array...
Copying element in position 1 from the original array into position 8 of the new array...
Copying element in position 0 from the original array into position 9 of the new array...
$ echo ${INV_ARRAY[@]}
10 9 8 7 6 5 4 3 2 1
```

The command `INV_ARRAY[$((j++))]=ARRAY[$((i--))]` is doing three things:

- Assigning the element of `ARRAY` in position `i` to `INV_ARRAY` in position `j`
- Incrementing `j` in one
- And decreasing `i` in one

It is equivalent to this set of instructions:

```bash
INV_ARRAY[${j}]=ARRAY[${i}]
((j++))
((i--))
```

### Multiple conditions

In the following example there is an array called `SUBJECTS`. Some of those subjects are controls and their ID starts with the letter C, other subjects are patients and their ID starts with the letter P. The array is organized so that the controls go before the patients. The loop will copy only the controls into a new array (`CONTROLS`).

So, there are two conditions to be met so that the loop continues to run:

- The index variable `i` is less than the size of `SUBJECTS` (`${#SUBJECTS[@]}`). This condition is written like this: `[ ${i} -lt ${#SUBJECTS[@]} ]`.
- The current element (`SUBJECTS[${i}]`) starts with the letter `C`. To get the first letter of the current element you must use the previously learned syntax to extract a sub-string: `${STRING:START:NUM}`. So, this condition is written like this: `[ "${SUBJECTS[${i}]:0:1}" == "C" ]`.

```bash
$ declare -a SUBJECTS=('C01' 'C02' 'C03' 'C04' 'C05' 'C06' 'P07' 'P08' 'P09' 'P10')
$ i=0
$ while [ ${i} -lt ${#SUBJECTS[@]} ] && [ "${SUBJECTS[${i}]:0:1}" == "C" ]
> do
> CONTROLS[${i}]=${SUBJECTS[$((i++))]}
> done
$ echo ${CONTROLS[@]}
C01 C02 C03 C04 C05 C06
```
