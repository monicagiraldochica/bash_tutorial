# Arrays

## Declaring and assigning values

An array is a data structure that stores a group of elements. Unlike in other programming languages, in Bash you don't need to specify the type of elements that the array will contain, and you can mix different types of elements in the same array. For example, an array can contain strings and numbers. You can create and add elements to an array in different ways:

Keep in mind that in Bash the first element of an array is always in `INDEX`=0, instead of `INDEX`=1.

| Syntax | Usage |
|-----------| ------- |
| `ARRAY[INDEX]=VAL` | If `ARRAY` has not been initialized, it will create the array and put element `VAL` in the position `INDEX`. If `ARRAY` already exists, it will replace `ARRAY` in the position `INDEX` with the new value `VAL`. |
| `declare -a ARRAY=('VAL1' 'VAL2' 'VAL3' ...)` | Initializes `ARRAY` and puts the values inside the parenthesis into the array, respecting the same order. The array is emptied before assigning the values if it already exists. |
| `read -a ARRAY` | Each word that the user input is assigned to sequential indices of `ARRAY`. The words must be separated by spaces. The array is emptied before assigning the values if it already exists. |
| `IFS='DEL' read -a ARRAY` | Splits the user input using delimiter `DEL`, which must be a character or a space. Then, saves the different elements into `ARRAY`. The array is emptied before assigning the values if it already exists. |
| `IFS='DEL' read -a ARRAY <<< STRING` | Splits `STRING` using delimiter `DEL`, which must be a character or a space. Then, saves the different elements into `ARRAY`. The array is emptied before assigning the values if it already exists. |
| `ARRAY=($(seq FIRST STEP SIZE))` | Creates an array of equally spaced numbers beginning with `FIRST` and separated by `STEP`. It will add `SIZE` numbers to `ARRAY`. |
| `ARRAY=$(count -digits N FIRST LAST)` | Creates an array of numbers, each with `N` number of digits, starting with `FIRST` and ending with `LAST`. If the number has less digits, it will add zeros in front (i.e. if using two digits, number `1` will be saved as `01` in the array). |
| `ARRAY=$(seq N)` | Creates an array of sequential numbers, starting with `1` and ending with `N`. |
| `ARRAY=(ELEMENT1 ELEMENT3 ...)` | Creates an array with the elements specified inside the parenthesis. |

### Usage of `${ARRAY[INDEX]}`

The following examples will use the syntax `${ARRAY[INDEX]}` to access the element located in the position `INDEX` inside `ARRAY`.

After assigning all the values to my array, I can print its contents using the expression `echo ${ARRAY[@]}`. I can also check the size of my array using `echo ${#ARRAY[@]}`.

If I add an element to a position where the array already contains an element, then the old value will be replaced by the new value. In the example below, `59` was initially added to the position 0 of the array `age`. When another element (`72`) is added to the position 0, the previous value (`59`) is replaced.

Create an array called age and add 5 elements to it:

```bash
age[0]=59
age[1]=63
age[2]=21
age[3]=15
age[4]=94
```

Print the content of the array:

```bash
$ echo "Array: ${age[@]}"
Array: 59 63 21 15 94
```

Get the array size:

```bash
$ echo "Array size: ${#age[@]}"
Array size: 5
```

Get the first, second, last and penultimate elements of the array:

```bash
$ echo "First element: ${age[0]}"
First element: 59
$ echo "Second element: ${age[1]}"
Second element: 63
$ size=${#age[@]}
$ echo "Last element: ${age[size-1]}"
Last element: 94
$ echo "Penultimate element: ${age[size-2]}"
Penultimate element: 15
```

Replace the first value of the array for 72:

```bash
$ age[0]=72
$ echo "New array: ${age[@]}"
New array: 72 63 21 15 94
```

In the following example I will start assigning values to the array in the position 1 (instead of 0). That is not a problem, but the first position of my array (`index=0`) will remain empty, and my array will have only 4 values. If I `echo` the item in position 0 (`echo ${ARRAY[0]}`), I will get an empty string.

Since I had previously created an array with the same name (`age`), I should first `unset` that variable (delete it). It is a good idea to do it if you're not sure if you already used that variable name before and you want to make sure you're creating a variable from zero.

Delete the variable (empty array):

```bash
$ echo "Array: ${age[@]}"
Array: 72 63 21 15 94
$ unset age
$ echo "Array: ${age[@]}"
Array:
```

Create a new array with new elements, staring in the position 1 instead of 0:

```bash
$ age[1]=63
$ age[2]=21
$ age[3]=15
$ age[4]=94
$ echo "Array: ${age[@]}"
Array: 63 21 15 94
$ echo "Array size: ${#age[@]}"
Array size: 4
$ echo "age[0]: ${age[0]}"
age[0]: 
$ echo "age[1]: ${age[1]}"
age[1]: 63
```

### Usage of `declare -a ARRAY=('VAL1' 'VAL2' 'VAL3' ...)`

It is also possible to initiate an array and assign all the values at the same time. After you declare an array with some elements, it doesn't need to stay static. You can keep adding items.

To initiate the array with some values:

```bash
declare -a array=('France' 'Italy' 'Germany' 'Spain' 'Canada')
```

To read the different elements of the array:

```bash
$ echo "The element in position 0 is: ${array[0]}"
The element in position 0 is: France
$ echo "The element in position 1 is: ${array[1]}"
The element in position 1 is: Italy
$ echo "The element in position 2 is: ${array[2]}"
The element in position 2 is: Germany
$ echo "The element in position 3 is: ${array[3]}"
The element in position 3 is: Spain
$ echo "The element in position 4 is: ${array[4]}"
The element in position 4 is: Canada
$ echo "List of elements in the array: ${array[@]}"
List of elements in the array: France Italy Germany Spain Canada
```

To get the number of elements in the array:

```bash
$ echo "The number of elements in the array is ${#array[@]}"
The number of elements in the array is 5
```

To add more items into the array:

```bash
$ array[5]="Argentina"
$ array[6]="Finland"
$ echo "List of elements in the array: ${array[@]}"
List of elements in the array: France Italy Germany Spain Canada Argentina Mexico
$ n=${#array[@]}
$ echo "The number of elements in the array is ${n}"
The number of elements in the array is 7
```

### Usage of `read -a ARRAY`

Another way of creating and initializing an array is by reading a user input. The command `read` captures the user input and saves it in a variable. By using the flag `-a`, the user can input more than one word (separated by a space) and Bash will assign each word to sequential indexes of the array, starting at 0.

```bash
$ read -a ARRAY
Element1 Element2 Element3
$ echo "${ARRAY[0]}"
Element1
$ echo "${ARRAY[1]}"
Element2
$ echo "${ARRAY[2]}"
Element3
```

### Usage of `IFS='DEL' read -a ARRAY`

If you want to use a different delimiter other than a space to split the user input into array elements, you can add `IFS='DEL'` before read, with `DEL` being any character.

```bash
$ IFS='/' read -a ARRAY
Element1/Element2/Element3
$ echo "${ARRAY[0]}"
Element1
$ echo "${ARRAY[1]}"
Element2
$ echo "${ARRAY[2]}"
Element3
$ IFS='.' read -a ARRAY
Element1.Element2.Element3
$ echo "${ARRAY[0]}"
Element1
$ echo "${ARRAY[1]}"
Element2
$ echo "${ARRAY[2]}"
Element3
```

If the wrong delimiter is used, the array wont be split correctly:

```bash
$ IFS='/' read -a ARRAY
Element1.Element2.Element3
$ echo "${ARRAY[0]}"
Element1.Element2.Element3
$ echo "${ARRAY[1]}"

$ echo "${ARRAY[2]}"

```

### Usage of `IFS='DEL' read -a ARRAY <<< STRING`

You can also split elements of a string. This is very useful when trying to access parts of a file path:

```bash
$ IFS='/' read -a ARRAY <<< "Element1/Element2/Element3"
$ echo "ARRAY[0]: ${ARRAY[0]}"
ARRAY[0]: Element1
$ echo "ARRAY[1]: ${ARRAY[1]}"
ARRAY[1]: Element2
$ echo "ARRAY[2]: ${ARRAY[2]}"
ARRAY[2]: Element3
```

In the following example the delimiter is a slash (`/`). However, there are no characters before the first slash. So, the first element of the array will be empty. That empty value will still be counted when asking for the array size, and will be located in the position 0. So, `home` will be located in position 1 of the array instead of position 0.

```bash
$ my_string="/home/myuser/Documents/folder/subfolder"
$ echo "String: ${my_string}"
String: /home/myuser/Documents/folder/subfolder
$ IFS='/' read -a ARRAY <<< "${my_string}"
$ echo "ARRAY[0]: ${ARRAY[0]}"
ARRAY[0]:
$ echo "ARRAY[1]: ${ARRAY[1]}"
ARRAY[1]: home
$ echo "ARRAY[2]: ${ARRAY[2]}"
ARRAY[2]: myuser
$ echo "ARRAY[3]: ${ARRAY[3]}"
ARRAY[3]: Documents
$ echo "ARRAY[4]: ${ARRAY[4]}"
ARRAY[4]: folder
$ echo "ARRAY[5]: ${ARRAY[5]}"
ARRAY[5]: subfolder
$ echo "Array elements: ${ARRAY[@]}"
Array elements:  home myuser Documents folder subfolder
$ echo "Array size: ${#ARRAY[@]}"
Array size: 6
```

In the third example there are no characters after the last slash. If the last character of the input string is the same as the delimiter, it will not add an empty character to the end of the array. So, the size of the array will be the same as if you exclude that last delimiter.

```bash
$ my_string="/home/myuser/Documents/folder/subfolder/"
$ echo "String: ${my_string}"
String: /home/myuser/Documents/folder/subfolder/
$ IFS='/' read -a ARRAY <<< "${my_string}"
$ echo "Array size: ${#ARRAY[@]}"
Array size: 6
```

However, if there is more than one repetition of the delimiter at the end of the string, then the empty space between the two delimiters is counted as an element in the array:

```bash
$ my_string="/home/myuser/Documents/folder/subfolder//"
$ IFS='/' read -a ARRAY <<< "${my_string}"
$ echo "Array size: ${#ARRAY[@]}"
Array size: 7
```

```bash
$ my_string="/home/myuser/Documents/folder/subfolder//file.txt"
$ IFS='/' read -a ARRAY <<< "${my_string}"
$ echo "Array size: ${#ARRAY[@]}"
Array size: 8
$ echo "ARRAY[5]: ${ARRAY[5]}"
ARRAY[5]: subfolder
$ echo "ARRAY[6]: ${ARRAY[6]}"
ARRAY[6]:
$ echo "ARRAY[7]: ${ARRAY[7]}"
ARRAY[7]: file.txt
```

### Usage of `ARRAY=($(seq FIRST STEP SIZE))`

To create an array of equally spaced or consecutive numbers, use `seq`. In the following examples, I will create an array of numbers that goes from 15 to 19. The distance between each number (`STEP`) will vary in each example. When the step between numbers is 1, it doesn't need to be specified.

Array of equally spaced numbers (step size 0.5) from 15 to 19:

```bash
$ ARRAY=($(seq 15 0.5 19))
$ echo "Array of equally spaced numbers (step size 0.5) from 15 to 19: ${ARRAY[@]}"
Array of equally spaced numbers (step size 0.5) from 15 to 19: 15 15.5 16 16.5 17 17.5 18 18.5 19
$ echo "ARRAY[0]: ${ARRAY[0]}"
ARRAY[0]: 15
$ echo "ARRAY[1]: ${ARRAY[1]}"
ARRAY[1]: 15.5
$ echo "ARRAY[2]: ${ARRAY[2]}"
ARRAY[2]: 16
$ echo "ARRAY[3]: ${ARRAY[3]}"
ARRAY[3]: 16.5
$ echo "ARRAY[4]: ${ARRAY[4]}"
ARRAY[4]: 17
$ echo "ARRAY[5]: ${ARRAY[5]}"
ARRAY[5]: 17.5
$ echo "ARRAY[6]: ${ARRAY[6]}"
ARRAY[6]: 18
$ echo "ARRAY[7]: ${ARRAY[7]}"
ARRAY[7]: 18.5
$ echo "ARRAY[8]: ${ARRAY[8]}"
ARRAY[8]: 19
$ echo "Array size: ${#ARRAY[@]}"
Array size: 9
```

Array of equally spaced numbers (step size 2) from 1 to 10:

```bash
$ ARRAY=($(seq 1 2 10))
$ # Print array
$ echo "Array of equally spaced numbers (step size 2) from 1 to 10: ${ARRAY[@]}"
Array of equally spaced numbers (step size 2) from 1 to 10: 1 3 5 7 9
$ echo "Array size: ${#ARRAY[@]}"
Array size: 5
```

Array of equally spaced numbers (step size 1) from 15 to 19:

```bash
$ echo "Array of equally spaced numbers (step size 1) from 15 to 19:"
Array of equally spaced numbers (step size 1) from 15 to 19:
$ ARRAY1=($(seq 15 1 19))
$ echo "Array1 (specifying the step size): ${ARRAY1[@]}"
Array1 (specifying the step size): 15 16 17 18 19
$ ARRAY2=($(seq 15 19))
$ echo "Array2 (not specifying the step size): ${ARRAY2[@]}"
Array2 (not specifying the step size): 15 16 17 18 19
```

Bash has functions that return a list of elements. For example, as you will learn in the section of [file manipulation](./files1.md#listing-files), the command `ls` returns the list of files in your current working directory. In these cases, instead of manually entering a list of elements between parentheses to convert into an array, you can write the function name, and its output will be saved in the array:

```bash
$ # Array will contain the list of files in the current directory
$ array=($(ls))
$ echo "Array: ${array[@]}"
Array: README.md Untitled.html Untitled.ipynb bash.html content1.html content10.html content10_1.html content11.html content11_1.html content11_2.html content11_3.html content11_4.html content12.html content13.html content14.html content15.html content16.html content17.html content18.html content19.html content2.html content20.html content2_1.html content2_2.html content2_3.html content2_4.html content3.html content3_1.html content3_2.html content3_3.html content3_4.html content4.html content4_1.html content4_2.html content5.html content5_1.html content5_2.html content6.html content6_1.html content6_2.html content6_3.html content6_4.html content6_5.html content7.html content7_1.html content7_2.html content7_3.html content8.html content8_1.html content8_2.html content8_3.html content8_4.html content9.html content9_1.html content9_10.html content9_11.html content9_12.html content9_13.html content9_14.html content9_15.html content9_16.html content9_2.html content9_3.html content9_4.html content9_5.html content9_6.html content9_7.html content9_8.html content9_9.html cropped.png flipped.png flipped2.png functions.js index.html neuroimgsoft.html pwd.png resampled.png rotated1.png rotated2.png styles.css styles2.css tmp.html vi_1.png vi_2.png vi_3.png vi_4.png vi_5.png vi_6.png
```
