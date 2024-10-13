# file-manager

File manager based on console commands using nodejs

---

## User guide

---

### start app

---

- use 20 LTS version of Node.js;
- all commands are typed into console, separated with _space_;
- to start application you should use npm script in following way:
  - **npm run start** - to start app without name (by default it'll will username equal **IvanIvanov**);
  - **npm run start -- --username=your_username** - to show custom username;

### finish app

---

- to stop app you should type **.exit** or press `Ctrl+C`;

### Get information about user's OS

---

- **`os --EOL`** - to show information about default system End-Of-Line;
- **`os --cpus`** - print host machine CPUs info: _amount of CPUS_, _model_ and _clock rate_;
- **`os --homedir`** - print _home directory_;
- **`os --username`** - print _system user name_;
  Get CPU architecture for which Node.js binary has compiled and print it to console
- **`os --architecture`** - print it to console _architecture_ for which Node.js binary has compiled4;

### Navigation block

---

- **`up`** - go upper from current directory (_without any arguments_);
- **`ls`** - show information in the table about current files and directories in sorted order: **directory** is on the first places, than **files** (_without any arguments_);
- **`cd path-to-file`** - where _path-to-file_ is valid path (absolute or relative);
  - _examples of valid command_:
    - cd ..
    - cd ./Some/Path/To/Folder
    - cd Path/To/Folder
    - cd 'H:/"Absolute path"/To/Folder/'
    - cd "Path with spaces";
    - cd 'H:\"Absolute path"\To\Folder\' - with forward slash also is valid.
      You should use single quote (') or double quote (") to separate the path with _spaces_.

### Basic file operation

---

- **`cat path_to_file`** - read file and print it's content;
- **`add new_file_name`** - create empty file in current directory;
- **`rn path_to_file new_filename`** - rename file (content is still unchanged);
- **`cp path_to_file path_to_new_directory`** - copy file;
- **`mv path_to_file path_to_new_directory`** - replace file;
- **`rm path_to_file`** - delete file;

### Operation with coding and encoding file content

---

**`hash path_to_file`** - calculate hash of file content and print it to console;
**`compress path_to_file path_to_destination`** - compress file;
**`decompress path_to_file path_to_destination`** - decompress file;
\_compressing and decompressing file is created, using Brothli algorithm

### Console user messages

---

- In case _error_ and failed parse path or errors in app - user will show **Operation failed**, colored in _red_.

- In case _invalid input_ - uncaught commands in app - user will show **Invalid input**, colored in _blue_.

- In case _success_ in app - user will show **You are currently in path_to_working_directory**, colored in _yellow_.

---

### Thanks for using my custom CLI file manager

---
