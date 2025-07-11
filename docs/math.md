# Arithmetic calculations

## Integer calculations

In order to compute arithmetic calculations with integers you can use one of the following syntaxes:

| Syntax | Usage |
|-----------| ------- |
| `$(( OPERATION ))` | Evaluates `OPERATION`. It can be any arithmetic operation with **integer** numbers. Including addition (`+`), subtraction (`-`), multiplication (`*`), division (`/`), square root (`sqrt(NUM)`), exponentiation (`NUM**EXP`), etc. |
| `((++NUM))` | Increases variable `NUM` in 1 before evaluating any expression that contains `++NUM`. |
| `((NUM++))` | Increases variable `NUM` in 1 after evaluating any expression that contains `NUM++`. |
| `((--NUM))` | Decreases variable `NUM` in 1 before evaluating any expression that contains `--NUM`. |
| `((NUM--))` | Decreases variable `NUM` in 1 after evaluating any expression that contains `NUM--`. |
| `((VAR+=NUM))` | Increases variable `VAR` in `NUM`. Equivalent to `VAR=$(( $VAR + $NUM ))`. |
| `((VAR-=NUM))` | Decreases variable `VAR` in `NUM`. Equivalent to `VAR=$(( $VAR - $NUM ))`. |
| `(( $i % 2 ))` | Returns `true` if `i` is an odd number or `false` if `i` is even. |

### Usage of `$(( OPERATION ))`

```bash
$ echo "2+1=$(( 2 + 1 ))"
2+1=3
$ A=2
$ echo "A+1=$(( ${A} + 1 ))"
A+1=3
$ B=1
$ echo "A+B=$(( ${A} + ${B} ))"
A+B=3
$ echo "A-B=$(( ${A} - ${B} ))"
A-B=1
$ echo "AxB=$(( ${A} * ${B} ))"
AxB=2
$ echo "A/B=$(( ${A} / ${B} ))"
A/B=2
$ echo "(A+B)x(A-B)=$(( $(( ${A} + ${B} )) * $(( ${A} - ${B} )) ))"
(A+B)x(A-B)=3
$ echo "A^3=$(( ${A} ** 3 ))"
A^3=8
$ B=4
$ echo "A^B=$(( ${A} ** ${B} ))"
A^B=16
$ echo "B/A=$(( ${B} / ${A} ))"
0
```

In the last example, the result is zero because this syntax is used for integer numbers. So, if the result of the operation is not an integer, it will be rounded to the nearest integer. In the next section you will learn [how to operate with non-integer numbers](#non-integer-calculations).

### Usage of `((++NUM))` and `((NUM++))`

In order to increment the value of a variable by one, there are a couple of options. Some of these options will be very useful when doing [iterations](./iteration.md) (which you will learn later on).

#### `${NUM} + 1`

```bash
$ NUM=1
$ echo $(( ${NUM} + 1 ))
2
$ echo ${NUM}
1
```

The command `echo $(( ${NUM} + 1 ))` prints the result of `NUM` plus one, but it does not modify the value of `NUM`. For that reason, when `NUM` is echoed at the end, it still has value 1 (instead of 2).

#### `((++NUM))`

```bash
$ NUM=1
$ echo $((++NUM))
2
$ echo ${NUM}
2
```

The command `echo $((++NUM))` is equivalent to this sequence of instructions:

```bash
NUM=$(( ${NUM} + 1 ))
echo ${NUM}
```

First, increases the value of variable `NUM` in one, and then it echoes the result. Opposite to the example above, here the variable value is actually modified. And opposite to the example in the below, the variable value is modified before the other instruction (`echo`).

#### `((NUM++))`

```bash
$ NUM=1
$ echo $((NUM++))
1
$ echo ${NUM}
2
```

The command `echo $((NUM++))` is equivalent to this sequence of instructions:

```bash
echo ${NUM}
NUM=$(( ${NUM} + 1 ))
```

First echoes the value of `NUM`. Then, it increases the value of the variable.

### Usage of `((--NUM))` and `((NUM--))`

Expressions `((--NUM))` and `((NUM--))` work in a very similar way than the previous ones, but instead of increasing the value of `NUM` by one, they decrease the value of `NUM` by one. These expressions will also be very useful once you learn [iteration](./iteration.md).

#### `${NUM} - 1`

```bash
$ NUM=1
$ echo $(( ${NUM} - 1 ))
0
$ echo ${NUM}
1
```

The command `echo $(( ${NUM} - 1 ))` prints the result of `NUM` minus one, but it does not modify the value of `NUM`. For that reason, when `NUM` is echoed at the end, it still has value 1 (instead of 0).

#### `((--NUM))`

```bash
$ NUM=1
$ echo $((--NUM))
0
$ echo ${NUM}
0
```

The command `echo $((--NUM))` is equivalent to this sequence of instructions:

```bash
NUM=$(( ${NUM} - 1 ))
echo ${NUM}
```

First, decreases the value of variable `$NUM` in one, and then it echoes the result. Opposite to the example above, here the variable value is actually modified. And opposite to the example below, the variable value is modified before the other instruction (`=`).

#### `((NUM--))`

```bash
$ NUM=1
$ echo $((NUM--))
1
$ echo ${NUM}
0
```

The command `echo $((NUM--))` is equivalent to this sequence of instructions:

```bash
echo ${NUM}
NUM=$(( ${NUM} - 1 ))
```

First, echoes the value of `NUM`. Then, it decreases the value of the variable.

### Usage of `((VAR+=NUM))`

This expression is a compact way of writing `VAR=$(( ${VAR} + ${NUM} ))`.

| Compact expression | Extended equivalent |
|-----------| ------- |
| `((A+=2))` | `A=$(( ${A} + 2 ))` |
| `B=$((A+=2))` | `A=$(( ${A} + 2 )); B=${A}` |
| `((A+=B))` | `A=$(( ${A} + ${B} ))` The value of `B` is not modified, only `A` is modified. |
| `B=$((A+=B))` | `A=$(( ${A} + ${B} )); B=${A}` In this case the value of both `A` and `B` is modified because the result of `((A+=B))` is assigned to `B`. |

### Usage of `((VAR-=NUM))`

This expression is a compact way of writing: `VAR=$(( ${VAR} - ${NUM} ))`

| Compact expression | Extended equivalent |
|-----------| ------- |
| `((A-=2))` | `A=$(( ${A} - 2 ))` |  
| `B=$((A-=2))` | `A=$(( ${A} - 2 )); B=${A}` |  
| `((A-=B))` | `A=$(( ${A} - ${B} ))` The value of `B` is not modified, only `A` is modified. |  
| `B=$((A-=B))` | `A=$(( ${A} - ${B} )); B=${A}` In this case the value of both `A` and `B` is modified because the result of `((A-=B))` is assigned to `B`. |  

### Usage of `(( $i % 2 ))`

```bash
$ for i in $(seq 10)
> do
> if (( $i % 2 ))
> then
> echo $i is odd
> else
> echo $i is even
> fi
> done
1 is odd
2 is even
3 is odd
4 is even
5 is odd
6 is even
7 is odd
8 is even
9 is odd
10 is even
```

## Non-integer calculations

When programming in Bash, you will often need to do mathematical operations that involve non-integer calculations. To do this, you will need the `bc` utility. You can use this utility also for integer calculations, but it is normally left for advanced math.

| Syntax | Usage |
|-----------| ------- |
| `echo "OPERATION" | bc` | Evaluates `OPERATION`. This can be any arithmetic operation with integer or non-integer numbers. Including addition (`+`), subtraction (`-`), multiplication (`*`), division (`/`), square root (`sqrt(NUM)`), exponentiation (`NUM**EXP`), etc. It will round the result to the closest integer. |
| `echo "OPERATION" | bc -l` | Flag `-l` will not round the result. Instead, will print it with all the decimals. |
| `echo "scale=NDECIMALS; OPERATION" | bc -l` | Will only print `NDECIMALS` instead of all the decimals. |

### `echo "OPERATION" | bc`

```bash
$ echo "2.34 / 1.895" | bc
1
$ echo "2 / 3" | bc
0
```

### `echo "OPERATION" | bc -l`

```bash
$ echo "2.34 / 1.895" | bc -l
1.23482849604221635883
$ echo "2 / 3" | bc -l
.66666666666666666666

$ A=$(echo "2.34 / 1.895" | bc)
$ B=$(echo "2.34 / 1.895" | bc -l)
$ echo ${A}
1
$ echo ${B}
1.23482849604221635883
$ echo "${A} + ${B}" | bc -l
2.23482849604221635883
$ echo "${A} + ${B}"
1 + 1.23482849604221635883
```

Look at the difference between the last two expressions. They are almost the same except for the `| bc -l` at the end of the first expression. Yet, the results are very different. That is because in the second case we are just printing the text "\${A} + \${B}", while in the first one we are evaluating the expression written in that text, with the use of the `bc` utility. The following example may clarify this concept:

```bash
$ echo "${A} + ${B}=$(echo "${A} + ${B}" | bc -l)"
1 + 1.23482849604221635883=2.23482849604221635883
```

To find the square root of a number you use the expression `sqrt()`, like in many other programming languages. So, to find the square root of 10 and save it to variable a you would use the following command:

```bash
$ A=$(echo "sqrt (10)" | bc -l)
$ echo ${A}
3.16227766016837933199
```

Knowing this, you can do any type of operations with non-integer numbers. Just by writing the desired expression between the quotation marks, or combine integer and non-integer calculations. Let’s look at a few more examples:

```bash
$ echo "(2.34 / 1.895) + sqrt (10)" | bc -l
4.39710615621059569082
$ echo $((2**3))
12.397106156210595690828
$ echo "(2.34 / 1.895) + sqrt (10) + $((2**3))" | bc -l
12.39710615621059569082
$ echo "(2.34 / 1.895) + sqrt (10) + 2^3" | bc -l
12.39710615621059569082
$ echo "2 + 2" | bc -l
4
$ echo "2 + 2"
2 + 2
$ echo "2 + 2 = $(echo "2 + 2" | bc -l)"
2 + 2 = 4
```

```bash
$ A=$(echo "(2.34 / 1.895) + sqrt (10)" | bc -l)
$ echo ${A}
4.39710615621059569082
$ echo $(echo "(2.34 / 1.895) + sqrt (10)" | bc -l)
4.39710615621059569082
$ echo "(2.34 / 1.895) + sqrt (10)= $(echo "(2.34 / 1.895) + sqrt (10)" | bc -l)"
(2.34 / 1.895) + sqrt (10)= 4.39710615621059569082
```

### `echo "scale=NDECIMALS; OPERATION" | bc -l`

Clearly, some of the results of the previous examples have too many decimals. You can cut the number of decimals using `scale`.

```bash
$ echo "(2.34 / 1.895) + sqrt (10)" | bc -l
4.39710615621059569082
$ echo "scale=3; (2.34 / 1.895) + sqrt (10)" | bc -l
4.396
$ echo "scale=0; (2.34 / 1.895) + sqrt (10)" | bc -l
4
```

### Comparing non-integers

In order to compare non-integers you can use `awk`. This function will be studied more in detail in [later chapters](./txt_csv.md#awk) as it is mainly used for processing files and strings. But as this example shows, it can also be used to deal with numbers.

```bash
$ awk 'BEGIN{ print (2.41==2.4) ? "equal" : "not equal" }'
not equal
$ awk 'BEGIN{ print (2.41==2.41) ? "equal" : "not equal" }'
equal
```
