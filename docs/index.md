# Introduction to shell scripting

Shell is used to run commands on the operating system. These can be simple instructions such as copying or moving files, or long scripts that contain hundreds of commands. Users typically interact with a shell using a terminal window (command line), which can be run from the same or a remote machine. There are different types of shells, but I will refer in this tutorial only to the Bourne-Again shell. Bash is the programming language used to write commands and scripts in shell.

The terminal window for Mac can be found inside the applications folder and in the subfolder Utilities. You can also open it by pressing the command and space bar in your keyboard to open the spotlight, and then type Terminal. In Linux, the easiest way to open the terminal is to use the key combination Ctl + Alt + T.

Shell scripting is very powerful. Things that would take hours to do by hand, could be executed in seconds. However, it can also be dangerous. Through the terminal you will have access to any files or system resources if you have the right permissions, and the freedom to do anything with them. Inadvertent "small" typing errors such as adding an extra space in the remove command could delete everything in your computer (including the root directory) or any external drive connected to your machine.

Unfortunately, there is no way to completely protect your computer from potential mistakes that you may do when writing and running shell scripts. However, there are a couple of tips that you can follow in order to minimize the chances of making unfixable mistakes:

1. Create constant backups. Preferably save those in an external hard drive or remote machine, which won't be constantly connected to your computer. It is not a bad idea to have more than one backup if your data is not easily recoverable.

2. If you're using a shared computer or account, control access permissions to important files and folders. By [managing permissions](permissions.md), you can allow a file to be read but not to written (hence preventing it from being modified or deleted).

3. [The root user](permissions.md) is an account in any Linux or Unix operating system that has access to all commands, files and directories. This is very helpful when installing software or modifying the default settings of your computer. However, coding as the root user can be extremely dangerous. For this reason, it is advisable to only login as a root when strictly necessary and log out once you're done.

4. [Use aliases](aliases.md) to protect from "dangerous" commands. Two of the most commonly used but dangerous commands are `rm` (to remove files) and `mv` (to move files). When you use any of these two commands, always double check what you have written before clicking enter.

5. Be careful when copy pasting commands from a website into the terminal. There can be errors that will be executed right away if the text you're copying contains a carriage return at the end of the line. It is better to paste into a shell script and then either execute the shell script or copy from the shell script into the command line. Although generally not dangerous, you might also run into errors when copy pasting from Microsoft word or other editors that modify symbols such as dash or underscore and convert them into new symbols that Bash won't understand.
