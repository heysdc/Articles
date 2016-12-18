#Unix Tutorial for Beginners笔记

##Unix Introduction

- Unix分很多种，最流行的是Sun Solaris, Linux 和 MacOS

- Unix操作系统分为三部分, kernel, shell, programs

	- kernel, 系统内核，向程序分配资源，对系统指令作出反应

	- shell, 作为用户与内核的中介，是一个命令行解释器(command line interpreter, CLI)

- Unix内的所有东西不是进程(process), 就是文件(file)

	- process指一个正在运行的程序， 被唯一PID(process identifier)所标示

	- file是一系列的数据

- 文件系统分层级，为倒置树，树的顶端为root，用/表示

##Tutorial One

- ls不会列出以.开头的文件，因为它们通常存储重要配置信息，**-a**列出所有文件

- mkdir, make directory

- cd, change directory

- pwd, print working direcotry

- ~, home directory, 用户名文件夹地址

##Unix Tutorial Two

- cp a b, copy a as b

- mv a b, move file a to b, 如果同文件夹，则为改名

- rm, remove; rmdir, remove a directory

- clear, 把屏幕清了

- cat, concatenate, 显示一个文件的内容

- less, 在一个页面中显示内容的cat

- head, 显示10行的cat，head -5，显示5行

- tail，同head，显示后10行

###Search

- search using less: 1. less 2. /words 3. n to next

- grep a file, search a in file; grep 'hello wold' file

	- -i, 忽略大小写

	- -v, 只显示不匹配的行

	- -n, 显示匹配行的行序号

	- -c，只显示匹配行的行数

- wc file, 统计file里的行数，单词数，字母数

	- -w，word

	- -l, line

##Tutorial Three

###Redirection

- 输入(input)，通常通过键盘，输出(output)，通常输出到命令行。UNIX可以重定向输入与输出。

- cat，截取输入并将其复制到输出

- cat > file, 重定向输出，把内容输出到file文件中，ctrl + d结束输入

- cat >> file, append info

- cat file1 file2 > file3, 把file1, file2的内容合并到file3; 分开理解，cat file1 file2，将file1和file2的内容输出到屏幕；> file3，重定向输出，输出到file3

- sort, 默认接受从键盘输入的内容，然后排序输出到命令行

- sort < filea > fileb, 接受filea文件的内容为输入，排序输出到fileb

##Four
###Pipes

- who, 得知登陆系统的用户信息

- |, 将前者的输出与后者的输入连接起来

- who | sort, who输出登录人列表，sort接受who的输出然后再输出到默认的屏幕上

###Tutorial Four

- wildcards *, 匹配文件名或文件夹名中任意个字符，包括0

- wildcard ?, 匹配一个字符

- man command, 详细介绍一个指令

- whatis command, 简单介绍一个指令

- apropos keyword, 输入提示关键字查询相关的指令

##Five

- ls -l，显示文件的详细信息，包括下面的读写信息

- drwxrwxrwx, 第一个标示是否为文件夹，后面9位三位一组，分别为文件拥有者权限，文件拥有者所属群组权限，其他人权限；每组rwx，分别为读或复制(文件夹为列出文件夹内容),写(文件夹为删除更改文件),执行(能读取子文件)；即要执行读取文件的操作，首先要有父文件夹的执行全县

- chmod，改变读写权限， chmod ugoa(all)+(add)-(del)rwx file

- ps, process status

- 把需要长时间执行的指令放后台执行，还没执行的，可以在命令最后加一个&，已经执行的可以^Z，即将其转入后台

- bg, 查看后台进程

- jobs, 查看后台或者暂停的进程

- fg %num, foreground, 将编号为[num]的后台进程转入前台

- 停止进程，前台，^C, 后台, kill %num，或者kill pid

##Six

- quota -v, 查看当前用户分配的空间与剩余空间

- df ., 查看文件系统空间与剩余空间

- du file, 查看文件大小kb，-s只查看该文件，不包含其子文件

- gzip，压缩为.gz，解压gunzip .gz

- zcat, 不用解压缩就可以查看.gz文件内容

- file, 查看文件的格式，如ascii, pictures等

- diff file1 file2, 比较两文件的差异

- find, 查找文件，find . -name '*.js' -print, 在当前目录下查找以js结尾的文件并打印出来，参数很多

- history, 查看历史指令

##Install

##Variables

- Varialbes, 运行程序时从shell向程序传递信息的一种方式，程序都是在环境中运行

- 变量可能来自于：1.系统;2.自定义;3.shell提供;4.载入程序的其他程序

- 变量分为两类，环境变量和shell变量，环境变量大写系统级，shell变量小写，作用于当前shell会话

- 显示环境变量，echo $OSTYPE, printenv；显示shell变量，echo $user, set

- 每次登一个账号，系统在home文件夹找初始文件设定工作变量，一般先读.cshrc或者.zshrc等，然后读取.login，前者创建shell的时候执行，后者登录的时候执行，所以要改变shell variable在前者做，改变环境变量在后者里弄

- 当你输入一个命令shell通过path里地址找你输入命令的具体执行内容，如果输入一个命令提示命令找不着，你需要直接指定具体的地址，或者把这个地址加到path变量中去，set path=($path add), 可以把它加到zshrc等文件中



##参考
- [UNIX Tutorial for Beginners](http://www.ee.surrey.ac.uk/Teaching/Unix/)