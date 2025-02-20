# White Flag Challenge

## Program Overview

The "White Flag Challenge" is a C-based text-based puzzle program. It presents a narrative about a post-battle world, where a flag appears in the distance, raising questions about its true meaning. The user is challenged to decipher the mystery of the flag through a series of clues and decisions. The program's core logic revolves around unlocking certain functions by entering a correct "key". The key is an integer that, when correctly guessed, unlocks a victory path and reveals a hidden message (flag). If the key is incorrect, the user receives hints in the form of failure messages that guide them toward the right solution.

### Main Functionality:
- **Story Presentation:** The program begins by displaying an intriguing story, hinting at a mysterious flag and the need to uncover its true meaning.
- **User Interaction:** Users are prompted to enter a "key", which is validated through various checks and functions. Depending on the entered value, the program will either lead to victory or failure.
- **Hints:** The program provides various hints and cryptic messages depending on the path the user takes.
- **Hidden Flag:** The ultimate goal is to discover the flag hidden in the program's output.

## Getting the Flag Using Ghidra

To uncover the flag in this C program using Ghidra (a popular reverse engineering tool), follow the steps outlined below:

### Step-by-Step Guide:

1. **Download and Install Ghidra:**
   - Download Ghidra from [Ghidra's official website](https://ghidra-sre.org/).
   - Install and set up Ghidra following the provided instructions for your operating system.

2. **Load the Program into Ghidra:**
   - Open Ghidra, create a new project, and import the compiled binary (`white_flag`).
   - Ghidra will analyze the binary and generate a disassembled view of the code.

3. **Analyze the Code in Ghidra:**
   - In the **Code Browser** window, open the program’s functions. You can find the main function and other key functions like `baybars`, `altay`, `vercingetorix`, etc.
   - Pay close attention to the **baybars()** and **altay()** functions, as they are crucial in validating the key entered by the user.
   - The `altay()` function checks if the key is equal to `1312389`. If the key matches this value, the program proceeds to the next step, triggering the victory condition.

4. **Inspect the Functions for Hidden Information:**
   - Functions such as `leonidar()`, `genghis()`, `spartacus()`, and others contain hardcoded strings. These strings are printed one after another and form the flag when combined.
   - The function `ramses()` finally prints the flag when the correct key is provided.
   
   These functions output the following parts of the flag:
   - `leonidar()`: Prints the first part of the flag.
   - `genghis()`: Prints another section of the flag.
   - `spartacus()`, `tamerlane()`, `boudica()`, and others continue building the flag.

5. **Finding the Key:**
   - From your analysis of the `altay()` function, you know that the program expects the input key to be `1312389`.
   - However, **to proceed further**, you need to change the `alexander()` function. By default, this function returns `0`, causing the failure path. To unlock the victory path, **change the return value of `alexander()` to `1`**.
   
   This change will allow the program to proceed past the `achilles()` function and print the flag.

6. **Revealing the Flag:**
   - Once the correct key is entered and the `alexander()` function is modified to return `1`, the flag is revealed by the sequence of functions (`leonidar()`, `genghis()`, `spartacus()`, etc.), which print the flag as characters in the console.

