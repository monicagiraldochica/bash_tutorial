# General file manipulation

## Absolute paths

The absolute or full path of a file specifies its unique location in the file system, its name and extension. The absolute path of every file is different and constant. It will always be the same regardless of the current directory in which you are working (unless you move the file). This path follows a hierarchy of directories where the file is located, separating each directory with the delimiting character, which is the slash for Macintosh and Linux and the backslash for Windows. For example, a text file named `file.txt` located in the Desktop of a Mac computer, will commonly have an absolute path similar to this: `/Users/user_name/Desktop/file.txt`.

To find the absolute path of a file you can drag and drop it into the Terminal.

For example, if this is the absolute path of a file: `/Users/user_name/Desktop/SomeFolder/Subfolder/file.txt`. It means that in the Desktop there is a folder called `SomeFolder`, inside `SomeFolder` there is another folder called `Subfolder`, and inside `Subfolder` is located the corresponding file, with name `file` and extension `txt`. There cannot be two files with the same name and extension inside a folder.

## Relative paths

The relative path of a file starts from the current working directory and represents the location of a specific file relative to this directory. It is always changing as it depends on what directory you are located in the terminal.

If the absolute path of a file is  `/Users/user_name/Desktop/file.txt` and the user current working directory is the Desktop, then the relative path of the file is: `file.txt` or `./file.txt`. `./` represents the current directory.

The following relative paths represent files that are located in the current working directory:

```bash
File1.txt
File2.nii.gz
./File3.nii
./File4.docx
```

The absolute path of these files will be something similar to this (for Mac users), if the current directory is the Desktop:

```bash
/Users/username/Desktop/File1.txt
/Users/username/Desktop/File2.nii.gz
/Users/username/Desktop/File3.nii
/Users/username/Desktop/File4.docx
```

The same way that one dot represents the current directory in a relative path, two dots represent the parent directory. So, if the absolute path of my current working directory is `/Users/user_name/Desktop/SomeFolder`, I can refer to files located in the parent directory (Desktop) using the double dots. So, all these files are located in the Desktop (the same as `SomeFolder`):

```bash
../FileA.txt
../FileB.txt
../FileC.txt
```

## Tips

- Absolute and relative paths are used to reference files when doing operations with them, but is better to use the absolute paths when writing scripts. That way the script will not run into issues independently of the working directory. Otherwise, you might get `file not found` errors.

- Do **not** use spaces or any other special characters when naming a file. It makes it harder to write the path of that file.

For example, if I have a file named `Some File.txt` in my Desktop (on a Mac), `/Users/user_name/Desktop/Some File.txt` is not the absolute path. Instead, the absolute path will be `/Users/user_name/Desktop/Some\ File.txt`. Paths cannot have spaces unless you use scape characters, in this case the backslash.

Another example is using the dollar sign (which is a special character) inside a file name. For example, if in the Desktop there is a folder named `untitled$folder`, `/Users/user_name/Desktop/untitled$folder` is not the absolute path. Instead, the absolute path will be `/Users/user_name/Desktop/untitled\$folder`.

The backslash is indicating us to treat the special character (`$`) as part of the file name and not as the beginning of a variable name (which is the normal use of `$` in Bash). If we don't use the backslash before the dollar sign, Bash will try to find a variable called folder. If that variable doesn't exist, then Bash will read `/Users/user_name/Desktop/untitled$folder` as `/Users/user_name/Desktop/untitled`, replacing `$folder` for an empty space. If that variable exists, Bash will replace `$folder` by the value of the variable.

In the following sections you will learn how absolute and relative paths are used to manipulate files **in MacOS and Linux**.

## Listing files

### The `ls` command

Lists the files and folders inside the specified directory. If no directory is specified after `ls`, then it prints the contents of the current folder.

If no flag is used, it lists the files in bare format (without any details such as modified date and time or permissions). Depending which flag is used (or a combination of flags), then specific information about the file will be displayed. The following table is taken from manual of the `ls` command as displayed in the command line.

**List of flags that I use more often:**

| Flag | Use |
| --- | --- |
| `-a` | Include directory entries whose names begin with a dot. Typically, these are configuration files for applications or hidden files. |
| `-G` | Enable colorized output. This option is equivalent to defining `CLICOLOR` in the environment. |
| `-H` | Symbolic links on the command line are followed. This option is assumed if none of the `-F` or `-l` options are specified. |
| `-l` | Force output to be one entry per line. This is the default when output is not to a terminal. |
| `-lh` | Use unit suffixes when displaying the information in long output: Byte, Kilobyte, Megabyte, Gigabyte, Terabyte and Petabyte, in order to reduce the number of digits to three or less using base 2 for sizes. |
| `-ln` | Display user and group IDs numerically, rather than converting to a user or group name in a long output. |
| `-R` | Recursively list subdirectories encountered. |
| `-S` | Sort files by size. |
| `-t` | Sort files by time modified (most recently modified first) before sorting by lexicographical order. |

**Other flags:**

| Flag | Use |
| --- | --- |
| `-A` | List all entries except for (`.`) and (`..`). Always set for the super-user. |
| `-B` | Force printing of non-printable characters in file names. |
| `-b` | As `-B`, but use C escape codes whenever possible. |
| `-C` | Force multi-column output; this is the default when output is to a terminal. |
| `-c` | Directories are listed as plain files (not searched recursively). |
| `-F` | Display a slash immediately after each pathname that is a directory, an asterisk after each that is executable, a `@` after each symbolic link, an equal sign after each socket, a percent sign after each whiteout, and a vertical bar after each that is a FIFO. |
| `-f` | Output is not sorted. This option turns on the `-a` option. |
| `-i` | For each file, print the serial number. |
| `-k` | If the `-s` option is specified, print the file size allocation in kilobytes, not blocks. |
| `-L` | Follow all symbolic links to final target and list the file or directory the link references rather than the link itself. This option cancels the `-P` option. |
| `-l@` | Display extended attribute keys and sizes in long output. |
| `-le` | Print the Access Control List (ACL) associated with the file, if present, in long output. |
| `-lg` | This option is only available for compatibility with POSIX; it is used to display the group name in the long format output (the owner name is suppressed). |
| `-lO` | Include the file flags in a long output. |
| `-lT` | Display complete time information for the file, including month, day, hour, minute, second, and year. |
| `-m` | Stream output format; list files across the page, separated by commas. |
| `-o` | List in long format, but omit the group id. |
| `-P` | If argument is a symbolic link, list the link itself rather than the object the link references. This option cancels the `-H` and `-L` options. |
| `-p` | Write a slash after each filename if that file is a directory. |
| `-q` | Force printing of non-graphic characters in file names as the interrogation character; this is the default when output is to a terminal. |
| `-r` | Reverse the order of the sort to reverse lexicographical order, or the oldest entries first (or largest files last, if combined with sort by size). |
| `-s` | Display the number of file system blocks actually used by each file, in units of 512 bytes, where partial units are rounded up to the next integer value. If the output is to a terminal, a total sum for all the file sizes is output on a line before the listing. The environment variable `BLOCKSIZE` overrides the unit size of 512 bytes. |
| `-u` | Use time of last access, instead of last modification of the file for sorting (`-t`) or long printing (`-l`) |
| `-U` | Use time of file creation, instead of last modification for sorting (`-t`) or long output (`-l`). |
| `-v` | Force unedited printing of non-graphic characters; this is the default when output is not to a terminal. |
| `-W` | Display whiteouts when scanning directories. |
| `-w` | Force raw printing of non-printable characters. This is the default when output is not to a terminal. |
| `-x` | The same as `-C`, except that the multi-column output is produced with entries sorted across, rather than down the columns. |

The following examples show the usage of the flags presented in the previous table and details of the results that can be obtained when using the command `ls` together with those flags.

**`ls` command with no flags:**

Show the list of the files in the working directory:

```bash
$ ls
Applicationshome
Libraryinstaller.failurerequests
Networknet
Subjectsopt
Usersprivate
Volumessbin
binmp
coresusr
devvar
etc
```

Show the list of files in a different directory using *the absolute path* of that directory:

```bash
$ ls /Volumes/MyExternalDrive
ArticlesMRIdata SharedFolder
```

Show the list of files in a subfolder (`Applications`) using *the relative path*:

```bash
$ ls Applications/
Calculator.app
Calendar.app
Chess.app
Dashboard.app
Dictionary.app
EndNote X7
EndNote X8
FaceTime.app
Firefox.app
IBM
Image Capture.app
Launchpad.app
MATLAB_R2014b.app
```

**`ls -l`:**

When using the flag `-l`, Bash will not only show the list of files but also a description for each file. The output will be organized in columns, each one with a specific meaning that I will explain in the table below.

```bash
$ ls -l /Volumes/MyExternalDrive
Total 0

drwxr-xr-x	22	myUser	UserGroup	714	Sep 4	11:40	Articles
-rw-r--r--@	1	myUse	UserGroup	51620	Jan 14	2017	CV.docx
-rw-r--r--	1	myUser	UserGroup	137195	Jan 14	2017	CV.pdf
drwxr-xr-x	28	myUser	UserGroup	952	Sep 10	09:04	MRIdata
drwxrwxrwx	5	myUser	UserGroup	170	Sep 4	11:15	SharedFolder
```

| Column number | Column name | Meaning |
| --- | --- | --- |
| 1 | File type + permissions | See below for the explanation of the output presented in this column. |
| 2 | Link count | Number of hard links to the file. Data is only removed from your drive when all hard links to the data have been removed. |
| 3 | Owner name | See below for the explanation of file ownership and permissions. |
| 4 | Group name | See below for the explanation of file ownership and permissions. |
| 5 | File size | Number of bytes in the file. See the flag `-lh` to output the size of the file in human-readable format. |
| 6 | Last modified date | Abbreviated month and day-of-month when the file was last modified. |
| 7 | Last modified time | Abbreviated hour and minute when the file was last modified in military format (24 hours). If the file was last modified more than six months before, then the year of the last modification is displayed instead of the hour and minute. |
| 8 | File name | Name of the file with its extension. |

**File type and permissions from the `ls -l` command:**

The first column of the output printed when using the flag `-l` shows the file type and permissions. This column has 10 characters. Each character will be a letter or a dash.

**The first character** describes the type of file and can be one of the following:

| Character | File type |
| --- | --- |
| `b` | Block special file: provide access to hardware devices. |
| `c` | Character special file: provide access to hardware devices. |
| `d` | Directory. |
| `l` | Symbolic link: a file that points to another file (a shortcut). It does not contain the data in the target file; it simply contains a pointer somewhere in the file system. |
| `s` | Socket link: file used for communication between processes. |
| `p` | FIFO: special file that can be opened by various processes for exchanging data. |
| `-` | Regular file. |

**The second character** shows if the user listed as *owner* has reading permissions. It will be an `r` if the owner can read the file, or a `-` if not.

**The third character** shows if the user listed as *owner* has writing permissions. It will be a `w` if the owner can write in the file, or a `-` if not.

**The fourth character** shows if the user listed as *owner* has execution permissions. It will have value `x` if the owner can execute the file, or a `-` if not.

**The fifth character** shows if the users that are part of the **group** have reading permissions. It will have an `r` if they can read, or a `-` if not.

**The sixth character** shows if the users that are part of the **group** have writing permissions. It will have a `w` if they can write, or a `-` if not.

**The seventh character** shows if the users that are part of the **group** have execution permissions. It will have a `x` if they can execute, or a `-` if not.

**The eight character** shows if **other** users have reading permissions. It will have an `r` if they can read, or a `-` if not.

**The ninth character** shows if **other** users have writing permissions. It will have an `w` if they can write, or a `-` if not.

**The tenth character** shows if **other** users have execution permissions. It will have a `x` if they can execute, or a `-` if not.

To change the permissions of a file you would use the `chmod` command. This command has the following syntax: `chmod <num_for_owner><num_for_group><num_for_others> <file>`

`<num_for_owner>` is a number to change the **owner** permissions.

`<num_for_group>` is a number to change the **group** permissions.

`<num_for_others>` is a number to change the permissions of other users.

These numbers can be one of the following:

| Number | Characters in `ls -l` | Meaning |
| --- | --- | --- |
| 7 | `rwx` | Give full permissions (read, write and execute). |
| 6 | `rw-` | Give read and write permissions, but not execute. |
| 5 | `r-x` | Give read and execute permissions, but not write. |
| 4 | `r--` | Give only read permissions. |
| 3 | `-wx` | Give write and execute permissions, but not read. |
| 2 | `-w-` | Give only write permissions. |
| 1 | `--x` | Give only execute permissions. |
| 0 | `---` | Give no permissions. |

For example if you run `chmod 775 myfile`, the owner and group will have full permissions, other users will be able to read and execute but not write.

If you run `chmod 744 myfile`, the owner will have full permissions, users belonging to the group and other users will only be able to read, but they wont be able to write or execute the file.

**Human readable file size with `ls -lh`:**

The information displayed in the 5th column (file size) when using `ls -l` is difficult to interpret by a human. In order to see this information in a human-readable format, it is only necessary to add an `h` to the `-l` flag.

```bash
$ ls -lh /Volumes/MyExternalDrive
Total 0
drwxr-xr-x  22  myUser  UserGroup   714B  Sep 4  11:40  Articles
-rw-r--r--@ 1   myUser  UserGroup   50K   Jan 14 2017   CV.docx
-rw-r--r--  1   myUser  UserGroup   134K  Jan 14 2017   CV.pdf
drwxr-xr-x  28  myUser  UserGroup   952B  Sep 10 09:04  MRIdata
drwxrwxrwx  5   myUser  UserGroup   170B  Sep 4  11:15  SharedFolder
```

When using the `-lh` flag, the size of the file will be followed by a letter which represents the units:

| Letter | Unit | number of bytes per unit |
| --- | --- | --- |
| B | Bytes | 2^0 |
| K | Kilobytes | 2^10 |
| M | Megabytes | 2^20 |
| G | Gigabytes | 2^30 |
| T | Terabytes | 2^40 |
| P | Perabytes | 2^50 |

**Using multiple flags:**

Most of the flags can be combined, except for the following group of flags which override each other (either partially or fully). If used together, only the last one specified will be used.

- `-1`, `-C`, `-x`, and `-l`
- `-c` and `-u`
- `-B`, `-b`, `-w`, and `-q`
- `-H`, `-L` and `-P`

The example below combines `-lh`, `-o`, and `-r` to print the information in long format, using human readable file sizes (`-lh`), omitting the group id (`-o`) and in reverse lexicographical order (`-r`):

```bash
$ ls -lhor /Volumes/MyExternalDrive
Total 0

drwxrwxrwx  5   myUser  170B  Sep 4  11:15  SharedFolder
drwxr-xr-x  28  myUser  952B  Sep 10 09:05  MRIdata
-rw-r--r--  1   myUser  134K  Jan14  2017   CV.pdf
-rw-r--r--@ 1   myUser  50K   Jan 14 2017   CV.docx
drwxr-xr-x  22  myUser  714B  Sep 4  11:40  Articles
```

## Listing files using patterns

You can print information about a group of files based on patterns using wildcards.

| Wildcard | Meaning |
| --- | --- |
| `*` | Matches any number of characters. |
| `?` | Matches any single character. |
| `[character_class]` | Marches any character that is a member o the specified character class. See below for a list of Character Classes. |
| `[!character_class]` | Marches any character that is NOT a member of the specified character class. |

Character Classes:

- `[alnum]`: alphanumeric characters.
- `[alpha]`: alphabetic characters.
- `[digit]`: numerals.
- `[upper]`: uppercase alphabetic characters.
- `[lower]`: lowercase alphabetic characters.

Examples:

| Pattern | MAtches |
| --- | --- |
| `AB*` | List all the filenames that begin with "AB". |
| `*AB` | List all the filenames that end with "AB". |
| `AB*.txt` | List all the filenames that begin with "AB" and end with ".txt". |
| `AB???` | List all the filenames that begin with "AB" and are followed by exactly three characters. |
| `[aA]*` | List all the filenames that begin with "a" or "A". |
| `[aA]?.txt` | List all the filenames that begin with "a" or "A" and are followed by one character and ".txt". |
| `[[:upper:]]*` | List any filenames that begin with an uppercase letter. |
| `[![:upper:]]*` | List any filenames that do not begin with an uppercase letter. |

```bash
$ ls /Volumes/MyDrive/MyFolder/Articles/p*
/Volumes/MyDrive/MyFolder/Articles/patel and shen.pdf
/Volumes/MyDrive/MyFolder/Articles/perez 2013.pdf
/Volumes/MyDrive/MyFolder/Articles/pnas-0502843102.pdf
/Volumes/MyDrive/MyFolder/Articles/pnas.201604898.pdf
/Volumes/MyDrive/MyFolder/Articles/pnas01522-0696.pdf
/Volumes/MyDrive/MyFolder/Articles/poldrack ROI analysis.pdf
/Volumes/MyDrive/MyFolder/Articles/pone.0088419.pdf
/Volumes/MyDrive/MyFolder/Articles/pone.0113807.pdf
/Volumes/MyDrive/MyFolder/Articles/pq004724.pdf
/Volumes/MyDrive/MyFolder/Articles/pq008939.pdf
/Volumes/MyDrive/MyFolder/Articles/precuneus.pdf
/Volumes/MyDrive/MyFolder/Articles/prefrontalCortex.pdf
```

```bash
$ ls /Volumes/MyExternalDrive/Shared/Articles/[pr]*
/Volumes/MyExternalDrive/Shared/Articles/patel and shen.pdf
/Volumes/MyExternalDrive/Shared/Articles/perez 2013.pdf
/Volumes/MyExternalDrive/Shared/Articles/pnas-0502843102.pdf
/Volumes/MyExternalDrive/Shared/Articles/pnas.201604898.pdf
/Volumes/MyExternalDrive/Shared/Articles/pnas01522-0696.pdf
/Volumes/MyExternalDrive/Shared/Articles/poldrack ROI analysis.pdf
/Volumes/MyExternalDrive/Shared/Articles/pone.0088419.pdf
/Volumes/MyExternalDrive/Shared/Articles/pone.0113807.pdf
/Volumes/MyExternalDrive/Shared/Articles/pq004724.pdf
/Volumes/MyExternalDrive/Shared/Articles/pq008939.pdf
/Volumes/MyExternalDrive/Shared/Articles/precuneus.pdf
/Volumes/MyExternalDrive/Shared/Articles/prefrontalCortex.pdf
/Volumes/MyExternalDrive/Shared/Articles/raz 2004.pdf
/Volumes/MyExternalDrive/Shared/Articles/read1_Brain-2006-Ciccarelli-1859-71.pdf
/Volumes/MyExternalDrive/Shared/Articles/read2_6165.pdf
```

```bash
$ ls /Volumes/MyExternalDrive/Shared/Articles/[pr]*.pdf
/Volumes/MyExternalDrive/Shared/Articles/patel and shen.pdf
/Volumes/MyExternalDrive/Shared/Articles/perez 2013.pdf
/Volumes/MyExternalDrive/Shared/Articles/pnas-0502843102.pdf
/Volumes/MyExternalDrive/Shared/Articles/pnas.201604898.pdf
/Volumes/MyExternalDrive/Shared/Articles/pnas01522-0696.pdf
/Volumes/MyExternalDrive/Shared/Articles/poldrack ROI analysis.pdf
/Volumes/MyExternalDrive/Shared/Articles/pone.0088419.pdf
/Volumes/MyExternalDrive/Shared/Articles/pone.0113807.pdf
/Volumes/MyExternalDrive/Shared/Articles/pq004724.pdf
/Volumes/MyExternalDrive/Shared/Articles/pq008939.pdf
/Volumes/MyExternalDrive/Shared/Articles/precuneus.pdf
/Volumes/MyExternalDrive/Shared/Articles/prefrontalCortex.pdf
/Volumes/MyExternalDrive/Shared/Articles/raz 2004.pdf
/Volumes/MyExternalDrive/Shared/Articles/read1_Brain-2006-Ciccarelli-1859-71.pdf
/Volumes/MyExternalDrive/Shared/Articles/read2_6165.pdf
```

```bash
$ ls /Volumes/MyExternalDrive/Shared/Articles/[pr]????????.pdf
/Volumes/MyExternalDrive/Shared/Articles/precuneus.pdf
```

## Working directory

### The `pwd` command

This command prints the absolute path of the current working directory.

### The `cd` command

| Option | Usage |
| --- | --- |
| `cd ~`  | Goes to the home directory. |
| `cd dir` | Goes to `dir`, which is a sub directory located in the current directory. |
| `cd /dir` | Goes to `dir`, which is a sub directory located in the home directory. |
| `cd ..` | Goes to the parent directory. |
| `cd -` | Goes to the previous directory. |
| `cd ~username` | Goes to the user home directory |

`cd` changes the current working directory. The syntax is `cd new_path`, where `new_path` can be the absolute or relative path of the new working directory.

Absolute paths are file locations with respect to the home directory and start with `/`. Relative paths are file locations with respect to the current directory.

Two points (`..`) represent the parent directory. If my current working directory is `/Users/user_name/Desktop/SomeFolder`, after typing `cd ..` the new working directory will be `/Users/user_name/Desktop` (one folder up). If you type again `cd ..`, now the working directory will be `/Users/user_name` (another folder up), etc.

```bash
$ pwd
/Users/user_name/Desktop/SomeFolder
$ cd ..
$ pwd
/Users/user_name/Desktop
$ cd ..
$ pwd
/Users/user_name
$ cd ..
$ pwd
/Users
$ cd ..
$ pwd
/
```

`/` represents the home directory and you cannot go up any more folders.

In this example, I am using the absolute path of a folder to jump from my current directory to that folder:

```bash
$ pwd
/Users/user_name/Desktop/SomeFolder
$ cd /Volumes/Shared
$ pwd
/Volumes/Shared
```

In this example, I go to the parent directory of my parent directory (`../..`):

```bash
$ pwd
/Users/user_name/Desktop/SomeFolder
$ cd ../..
$ pwd
/Users/user_name
```

If inside my current directory (`/Users/user_name/Desktop/SomeFolder`) there is another folder, I can go to that folder using its relative path:

```bash
$ pwd
/Users/user_name/Desktop/SomeFolder
$ cd AnotherFolder
/Users/user_name/Desktop/SomeFolder/AnotherFolder
```

```bash
$ pwd
/Users/user_name/Desktop/SomeFolder
$ cd ./AnotherFolder
/Users/user_name/Desktop/SomeFolder/AnotherFolder
```

In this example, the first working directory is `/Volumes/Shared`, then I jump to `/Volumes/Shared/Articles` using the command `cd`. Finally, I go back to the first working directory (`/Volumes/Shared`) using `cd -`.

```bash
$ pwd
/Volumes/Shared
$ cd Articles
$ pwd
/Volumes/Shared/Articles
$ cd -
$ pwd
/Volumes/Shared
```

## Other commands

### The `cp` command

Syntax: `cp source target`

If you specify a folder as a target in the `cp` command, it will copy the file with the same name. If you specify a regular file as a target, it will rename the file in the destination (not in the source, the source file will stay untouched). The source file need not have the same extension. For example, the following command will copy the file `/Users/MyUser/Desktop/subjectFolder/534534.bvals` into the folder `/Volumes/MyExternalDrive`, it will also rename it and delete the extension: `cp /Users/MyUser/Desktop/subjectFolder/534534.bvals /Volumes/MyExternalDrive/bvals`.

Caution! If a file with the same name exists in the source, it will be re-written and this action cannot be undone.

### The `mv` command

Syntax: `mv source target`

The `mv` command works the same way as the `cp` command. The difference is that the source file is moved instead of copied and ceases to exist in the source location.

The following example renames `file1.txt` to `file2.txt` in the current folder:

```bash
$ ls
Applications
Library
Volumes
bin 
test1.txt
$ mv test1.txt test2.txt
$ ls
Applications
Library
Volumes
bin 
test2.txt
```

In the following example we are moving a file `test1.txt` from one directory (`/Users/MyUser/`) to another (`/Volumes/MyExternalDrive`):

```bash
$ ls /Volumes/MyDrive
$ ls /Users/MyUser/Desktop
test1.txt
$ mv /Users/MyUser/Desktop/test1.txt /Volumes/MyDrive
$ ls /Volumes/MyDrive
test1.txt
$ ls /Users/MyUser/Desktop
```

### The `rm` command

Syntax: `rm file` or `rm -r folder`

The `rm` command permanently deletes a file or a folder and all its contents. For example, to delete file `text1.txt` in the current directory, one would use `rm text1.txt`. And to remove the folder `myfolder` and all its contents, one would use `rm -r myfolder`. These are the flags that you can use:

| Flag | Action |
| --- | --- |
| `-f` | Forces deletion without any confirmation. |
| `-i` | Requires confirmation before deleting each file. |
| `-r` | Deletes a directory and all its contents recursively. |
| `-d` | Removes empty directories. |

### The `mkdir` command

Syntax: `mkdir folder`

Creates a new directory if it doesn't exist. One can use a relative or an absolute path. `mkdir myfolder` will create a folder named `myfolder` in the current directory. `mkdir ~/Desktop/myfolder` will create a folder named `myfolder` in the Desktop.

### The `touch` command

Syntax: `touch filename`

The main use of this command is to create an empty file with the corresponding name. One can create multiple files at the same time, for example: `touch file1.txt file2.txt file3.txt` will create 3 empty text files. But it can also be used for other things depending on which flag you use:

| Flag | Use | Example |
| --- | --- | --- |
| `-a` | Change the access time of a file to the current date and time. | `touch -a file1.txt` |
| `-m` | Update the modification time of a file to the current date and time. | `touch -m file1.txt` |
| `-d DATE` | Update the modification time of a file to `DATE`. | `touch -d "2025-01-20 10:33" myfile.txt` |
| `-r reference_file` | Update the modification time of a file to the one of `reference_file`. | `touch -r myscript.sh myfile.txt` changes the times of `myfile.txt` to those of `myscript.sh` |

### The `find` command

This command is used to locate files and data in the system.

#### Finding a specific file

In the example below `2>/dev/null` silences permission errors. This search is case sensitive. It will search for a file named `file.txt` starting in `/Path/to/start/search/`.

```bash
find /Path/to/start/search/ -name "file.txt" 2>/dev/null
```

The search in the example below is the same as the one above but with a case insensitive search, thanks to the `-iname` flag.

```bash
find /Path/to/start/search/ -iname "file.txt" 2>/dev/null
```

#### Finding a file using patterns

One could use `-name` instead of `-iname` to make it case sensitive. Here we are searching for files that contain the string `file` in their name, followed by one character and the .txt extension. They can have any or no characters before `file`.

```bash
find /Path/to/start/search/ -iname "*file?.txt" 2>/dev/null
```

#### Listing the contents of a directory recursively

In the following example, we list the content of `/Path/to/start/search/` and of all directories inside it and save the info in `file.txt`.

```bash
find /Path/to/start/search/ -ls
```

#### Manipulate the output of `find`

One could use the output of `find` to do something, for example, search if any of the files contain certain text, or execute a command on each of those files. To achieve this, we use the flag `-exec`.

The expression **must** have a `\;` or a `+` at the end.

If the expression ends with `\;`, the command or commands after `exec` will be executed of each output file of `find` separately. The semicolon is escaped because we don't want Bash to interpret it.

If the expression ends with `+`, all the outputs of `find` will be concatenated and passed as a whole string to the command being executed, and this command will only be run once on this string.

Examples:

Use [`file`](https://linux.die.net/man/1/file) on the output files of `find`: You could use any shell command instead of `file`.

```bash
find /Path/to/start/search/ -name "*.txt" -exec file {} \;
```

Use [`basename`](https://linux.die.net/man/1/basename) on the output files of `find`:

```bash
find /Path/to/start/search/ -name "*.txt" -exec file {} \;
```

Use [`grep`](./files2.md#grep) to process the output of `find`:

```bash
find /Path/to/start/search/ -name "*.txt" -exec grep grep_flags {} \;
```

Run a function on the output files of `find`:

```bash
function my_function(){
    commands
}
export -f my_function
find /Path/to/start/search/ -name "*.txt" -exec bash -c "my_function {}" \;
```

If I know that some of the output files of `find` will have spaces or other special character, I should change the last line of the example above to the following (put escaped quotation marks around the brackets):

```bash
find /Path/to/start/search/ -name "*.txt" -exec bash -c "my_function \"{}\"" \;
```

#### Search by type

Get the list of directories inside `/Path/to/start/search/`:

```bash
find /Path/to/start/search/ -type d
```

Get the list of regular files inside `/Path/to/start/search/`:

```bash
find /Path/to/start/search/ -type f
```

Get the list of symbolic links inside `/Path/to/start/search/`:

```bash
find /Path/to/start/search/ -type l
```

Get the list of files and symbolic links:

```bash
find /Path/to/start/search/ -type f,l
```

#### Limit the depth of the search

Descend only one directory:

```bash
find -maxdepth 1 /Path/to/start/search/ -type d
```

Descend two directories:

```bash
find -maxdepth 2 /Path/to/start/search/ -type d
```

To search all the flags and options of `find`, type `man find` in your command line. Many more things can be done with this command.
