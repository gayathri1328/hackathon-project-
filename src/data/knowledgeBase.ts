import { EducationalResource } from '../types';

export const EDUCATIONAL_RESOURCES: EducationalResource[] = [
  // =========================================================================
  // TOPIC 1: C POINTERS (5 DISTINCT FORMATS WITH VERY LARGE EXPLANATIONS & MULTIPLE EXAMPLES)
  // =========================================================================
  {
    id: 'c-pointers-explanation',
    title: 'Comprehensive Guide to C Pointers: Physical Memory Architecture, Addresses & Dereferencing',
    topic: 'C Pointers',
    category: 'C Programming',
    difficulty: 'Easy',
    format: 'Explanation',
    read_time: '12 min',
    short_description: 'An extensive, deep-dive conceptual walkthrough explaining how physical computer memory is organized, why pointers exist, how the & and * operators interact with hardware RAM, and how to develop an intuitive mental model.',
    full_content: `### 1. The Core Motivation: Why Do We Even Need Pointers?

When novice programmers first encounter the C programming language, pointers often feel like an arbitrary layer of unnecessary complexity. In higher-level languages like Python or JavaScript, references are handled behind the scenes. In C, however, you have direct, unmediated access to physical hardware memory.

To understand why pointers are essential, consider the problem of **Function Scope and Memory Passing**:

In C, every function receives arguments **strictly by value**. When you call \`calculate(x)\`, the CPU creates a duplicate copy of the number in \`x\` and puts it onto a brand-new stack frame. Any changes made inside \`calculate()\` die the moment the function finishes, leaving the original variable completely untouched.

If you want a function to modify variables in the caller, or if you want to share a 500-megabyte data structure without duplicating it in RAM, you cannot pass the data itself. You must pass the **exact location where that data lives in RAM**. That location is a **Pointer**.

---

### 2. Physical Memory: The Street House Analogy

Imagine computer memory (RAM) as an immense street with billions of houses built side by side in a straight line.

- Every single house on this street has a unique **House Number** (the **Memory Address**, such as \`0x7ffeefbff568\`).
- Inside each house lives a **Resident** (the **Stored Value**, such as the integer \`42\`).
- When you declare a variable like \`int score = 42;\`, the C compiler reserves 4 consecutive bytes (one house) and writes 42 inside.

Now, what is a **Pointer**?
A pointer is simply a tiny slip of paper upon which you write down a house number! 
The pointer itself does not contain the score \`42\`. Instead, it contains the address \`0x7ffeefbff568\`. When you give this slip of paper to another function, that function reads the address, walks down the street to house \`0x7ffeefbff568\`, opens the front door, and inspects or updates the value stored inside.

---

### 3. The Two Fundamental Operators: & and *

Working with pointers in C revolves around two complementary operators that reverse each other's actions:

#### A. The Address-of Operator (\`&\`)
Placing the ampersand (\`&\`) in front of any existing variable asks the computer: 
> *"Where in RAM is this variable located? Give me its memory address number."*
- \`score\` yields \`42\` (the value).
- \`&score\` yields \`0x7ffeefbff568\` (the address).

#### B. The Dereference Operator (\`*\`)
The asterisk (\`*\`) has two distinct purposes depending on where it appears in your code, which is the #1 source of beginner confusion:

1. **In a Type Declaration (\`int *ptr;\`)**:
   Here, \`*\` is part of the type signature. It declares: *"The variable named ptr is not a normal integer; it is a pointer designed to hold the address of an integer."*
2. **In an Executable Expression (\`*ptr = 99;\`)**:
   Here, \`*\` is the **Dereference (Indirection) Operator**. It commands the CPU: *"Take the address currently written inside ptr, travel to that physical location in RAM, and read or overwrite whatever is stored there."*

Writing \`*ptr = 99;\` does not change \`ptr\`'s address. It travels down to house \`0x7ffeefbff568\` and changes \`score\` from 42 to 99!

---

### 4. Pointer Lifecycles: Wild, Null, and Dangling Pointers

Understanding pointer safety is what separates professional systems engineers from beginners:

1. **Uninitialized (Wild) Pointers**:
   When you write \`int *p;\` inside a function, C does not automatically point it to zero or safety. It contains whatever random bits happened to be left over in that RAM register. Dereferencing \`*p\` will attempt to read or overwrite random memory, causing an instant OS crash (**Segmentation Fault**) or silent memory corruption.
2. **NULL Pointers (The Safe Anchor)**:
   Always initialize pointers: \`int *p = NULL;\`. \`NULL\` is defined as address \`0\`. Modern operating systems protect address 0, ensuring that if you accidentally dereference a NULL pointer, the program halts predictably rather than corrupting system data.
3. **Dangling Pointers**:
   If you point to memory allocated on the stack inside a helper function, that stack frame is erased when the function returns. The pointer still holds the old address, but that house has been condemned and reallocated! Always ensure the memory you reference outlives the pointer accessing it.`,
    key_takeaways: [
      'A pointer is simply an integer variable that holds the physical RAM address of another variable.',
      'The & operator asks "What is the memory address of this variable?".',
      'The * operator follows the pointer address to access or overwrite the underlying memory.',
      'C is strictly pass-by-value; pointers simulate pass-by-reference and enable high-performance data sharing.',
      'Always initialize pointers to NULL or a valid address to prevent wild pointer memory corruption.'
    ],
    common_pitfalls: [
      'Confusing pointer declaration (`int *p;`) with dereferencing (`*p = 10;`).',
      'Returning pointers to local stack variables from functions (causes dangling pointer crashes).',
      'Dereferencing uninitialized or NULL pointers (triggers immediate Segmentation Fault).'
    ],
    tags: ['c', 'pointers', 'memory', 'dereferencing', 'address-of', 'beginner', 'explanation', 'theory'],
    prerequisites: ['Basic C Syntax', 'Variables and Data Types']
  },
  {
    id: 'c-pointers-code-examples',
    title: 'Mastering C Pointers: 3 Real-World Runnable Implementation Programs',
    topic: 'C Pointers',
    category: 'C Programming',
    difficulty: 'Medium',
    format: 'Examples',
    is_programming: true,
    read_time: '14 min',
    short_description: 'Three complete, annotated, production-style C programs demonstrating (1) Address printing & dereferencing, (2) Pass-by-reference swap & pointer arithmetic on arrays, and (3) Safe dynamic heap memory allocation with malloc and free.',
    full_content: `### Hands-on Practical Implementations

Below are three complete, production-grade C implementations designed to build muscle memory around pointer manipulation, array traversal, and dynamic heap allocation.`,
    code_snippets: [
      {
        language: 'c',
        code: `// ==========================================================
// EXAMPLE 1: BASIC ADDRESS EXTRACTION & DEREFERENCING
// ==========================================================
#include <stdio.h>

int main() {
    int score = 42;
    // Declare pointer 'ptr' and assign it the address of 'score'
    int *ptr = &score;

    printf("=== Direct Variable Access ===\\n");
    printf("Value of score:         %d\\n", score);        // 42
    printf("Address of score (&):   %p\\n", (void*)&score); // e.g. 0x7ffd50

    printf("\\n=== Indirect Pointer Access ===\\n");
    printf("Address held in ptr:    %p\\n", (void*)ptr);    // e.g. 0x7ffd50
    printf("Dereferenced value (*): %d\\n", *ptr);         // 42

    // Modifying the variable through the pointer
    *ptr = 99;
    printf("\\n=== After Mutating via *ptr = 99 ===\\n");
    printf("New value of score:     %d\\n", score);        // 99!
    return 0;
}`,
        explanation: 'Demonstrates the fundamental connection between score and *ptr. Updating *ptr writes directly to the memory address where score resides.'
      },
      {
        language: 'c',
        code: `// ==========================================================
// EXAMPLE 2: PASS-BY-REFERENCE SWAP & POINTER ARITHMETIC
// ==========================================================
#include <stdio.h>

// Modifies the caller's variables directly via memory addresses
void swapNumbers(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main() {
    int x = 10, y = 20;
    printf("Before swap: x = %d, y = %d\\n", x, y);
    swapNumbers(&x, &y); // Pass memory addresses
    printf("After swap:  x = %d, y = %d\\n\\n", x, y); // x=20, y=10

    // Pointer arithmetic: traversing an array without index brackets
    int numbers[4] = {100, 200, 300, 400};
    int *cursor = numbers; // Array decays to pointer to numbers[0]

    printf("Traversing array using *(cursor + i):\\n");
    for (int i = 0; i < 4; i++) {
        // cursor + i automatically scales forward by i * sizeof(int) (4 bytes)
        printf("Element %d at %p = %d\\n", i, (void*)(cursor + i), *(cursor + i));
    }
    return 0;
}`,
        explanation: 'Shows pass-by-reference using pointers to mutate caller scope, and how pointer arithmetic automatically scales jumps by sizeof(int).'
      },
      {
        language: 'c',
        code: `// ==========================================================
// EXAMPLE 3: DYNAMIC HEAP MEMORY ALLOCATION & DEFENSIVE CHECKS
// ==========================================================
#include <stdio.h>
#include <stdlib.h>

int main() {
    int capacity = 5;
    // Allocate space for 5 integers on the system Heap
    int *dynamicArray = (int*)malloc(capacity * sizeof(int));

    // Defensive check: verify the OS successfully granted memory
    if (dynamicArray == NULL) {
        fprintf(stderr, "Memory allocation failed! Out of RAM.\\n");
        return 1;
    }

    // Populate allocated memory
    for (int i = 0; i < capacity; i++) {
        dynamicArray[i] = (i + 1) * 10;
    }

    printf("Values dynamically stored on the Heap:\\n");
    for (int i = 0; i < capacity; i++) {
        printf("dynamicArray[%d] = %d\\n", i, dynamicArray[i]);
    }

    // Crucial: deallocate memory back to the operating system
    free(dynamicArray);
    // Neutralize pointer to prevent dangling pointer bugs
    dynamicArray = NULL;

    printf("Memory safely deallocated and pointer neutralized to NULL.\\n");
    return 0;
}`,
        explanation: 'Demonstrates dynamic memory management on the heap using malloc(), error-checking against NULL, and deallocating with free().'
      }
    ],
    key_takeaways: [
      'Passing &x into a function gives it permission to mutate x directly.',
      'Pointer addition ptr + i jumps i * sizeof(type) bytes forward in RAM.',
      'Always pair every malloc() call with free() and set the pointer to NULL.'
    ],
    tags: ['c', 'pointers', 'code-examples', 'swap', 'pointer-arithmetic', 'malloc', 'heap', 'practical'],
    prerequisites: ['Basic C Pointers', 'Functions', 'Arrays']
  },
  {
    id: 'c-pointers-visual-guides',
    title: 'Visual Architecture of C Pointers: Physical RAM Cells & Memory Diagrams',
    topic: 'C Pointers',
    category: 'C Programming',
    difficulty: 'Easy',
    format: 'Visual Guides',
    read_time: '8 min',
    short_description: 'An illustrated visual breakdown with rendered high-resolution memory diagrams showing how physical RAM slots, stack frames, and reference arrows connect pointers to values.',
    full_content: `### Visual Architecture: RAM Slots & Reference Arrows

When visualizing C pointers, abandon abstract code and imagine physical memory blocks.

Look at the rendered hardware diagram below. Notice:
1. Every slot has a physical hexadecimal address in RAM (e.g. \`0x7ffeefbff568\`).
2. The variable \`score\` holds the literal value \`42\`.
3. The pointer \`ptr\` is also a memory slot, but its stored value is the address of \`score\`.
4. Dereferencing \`*ptr\` simply follows the golden dotted arrow from \`ptr\` directly into \`score\`!`,
    key_takeaways: [
      'Pointers are physical boxes in RAM containing numbers that represent other physical boxes.',
      'Visualizing pointer arrows clarifies multi-level pointers (**ptr) and pass-by-reference functions.'
    ],
    tags: ['c', 'pointers', 'visual-guides', 'diagram', 'ram', 'memory-diagram', 'stack', 'pictures'],
    prerequisites: ['Basic Variables']
  },
  {
    id: 'c-pointers-practice',
    title: 'C Pointers Problem Set: 5 Debugging Challenges & Memory Tracing Exercises',
    topic: 'C Pointers',
    category: 'C Programming',
    difficulty: 'Medium',
    format: 'Practice',
    read_time: '12 min',
    short_description: 'Interactive problem set with 5 real pointer challenges testing dangling pointer bugs, memory leak identification, and pointer arithmetic outputs.',
    full_content: `### Practice Challenge 1: Find the Dangling Stack Bug
\`\`\`c
int* getAnswer() {
    int answer = 42;
    return &answer; // WHY IS THIS A FATAL BUG?
}
\`\`\`
**Solution**: \`answer\` is allocated on the stack frame of \`getAnswer()\`. When the function finishes, its stack frame is freed. The returned address points to reclaimed memory!

### Practice Challenge 2: Tracing Postfix Pointer Arithmetic
What will this print?
\`\`\`c
int arr[] = {10, 20, 30};
int *p = arr;
printf("%d, ", *p++);
printf("%d", *p);
\`\`\`
**Solution**: Prints \`10, 20\`. Postfix \`++\` evaluates \`*p\` first (10), then increments \`p\` to the next element (20).`,
    practice_exercises: [
      {
        question: 'What is the output of: int a = 5; int *p = &a; (*p)++; printf("%d", a);',
        hint: 'Parentheses force dereference before the increment.',
        solution: 'Outputs 6. (*p) accesses variable a, and ++ increments its value from 5 to 6.'
      },
      {
        question: 'How many bytes are skipped forward when evaluating (ptr + 2) if ptr is a double* (sizeof(double) == 8)?',
        hint: 'Pointer math scales by the size of the referenced type.',
        solution: '16 bytes (2 elements * 8 bytes each = 16 bytes).'
      }
    ],
    key_takeaways: [
      'Always check whether the referenced memory outlives the pointer.',
      'Test your pointer code with address sanitizers (-fsanitize=address).'
    ],
    tags: ['c', 'pointers', 'practice', 'exercises', 'debugging', 'challenges'],
    prerequisites: ['C Pointers Basics']
  },
  {
    id: 'c-pointers-summary',
    title: 'Master Summary: C Pointers Architecture, Syntax, Visuals & Self-Check',
    topic: 'C Pointers',
    category: 'C Programming',
    difficulty: 'Easy',
    format: 'Summary',
    read_time: '10 min',
    short_description: 'The unified all-in-one Master Summary for C Pointers: comprehensive executive theory, visual sketches, essential code patterns, syntax cheat-sheets, and practice self-check questions.',
    full_content: `### Unified Master Summary: C Pointers & Memory

This unified summary synthesizes everything you need to know about C pointers in one comprehensive view.

---

### 1. Executive Theory & Mental Model
- A **Pointer** is a variable that stores a physical memory address in RAM.
- **Why use pointers?**
  1. To modify caller variables from within functions (simulating pass-by-reference).
  2. To dynamically allocate memory on the heap at runtime (\`malloc\`/\`free\`).
  3. To build dynamic data structures like Linked Lists, Trees, and Graphs.
  4. To pass large structs efficiently without duplicating bytes.

---

### 2. Syntax Cheat-Sheet Table
| Operation | Syntax | Action | Example |
|---|---|---|---|
| Declaration | \`type *ptr;\` | Creates a pointer variable | \`int *p = NULL;\` |
| Address-Of | \`&var\` | Returns memory address of var | \`p = &score;\` |
| Dereference | \`*ptr\` | Reads or writes value at address | \`*p = 100;\` |
| Pointer Math | \`ptr + n\` | Advances by $n \\times \\text{sizeof(type)}$ bytes | \`ptr + 1\` jumps 4 bytes for int |
| Heap Alloc | \`malloc(size)\` | Allocates bytes on Heap | \`int *arr = malloc(5 * sizeof(int));\` |
| Heap Free | \`free(ptr)\` | Returns heap memory to OS | \`free(arr); arr = NULL;\` |

---

### 3. Visual Sketch: Pointer Reference Architecture
\`\`\`
   [ Memory Address: 0x7ffd50 ] =======( holds )======> [ Value: 42 ] (int score)
              ^
              |  (pointed to by)
   [ Memory Address: 0x7ffd48 ] =======( holds )======> [ 0x7ffd50 ] (int *ptr)
\`\`\`

---

### 4. Golden Rules for Production C Code
1. **Always initialize pointers**: Use \`NULL\` if no address is immediately available.
2. **Never return pointers to local stack variables**.
3. **Always set pointers to NULL after calling free()** to eliminate dangling pointers.`,
    practice_exercises: [
      {
        question: 'Self-Check 1: What does &score evaluate to?',
        hint: 'Think about postal house numbers.',
        solution: 'The hexadecimal physical memory address in RAM where score is stored.'
      },
      {
        question: 'Self-Check 2: What is a segmentation fault?',
        hint: 'What happens when you read address 0 or unmapped memory?',
        solution: 'A crash triggered by the CPU memory management unit when code attempts to access unauthorized RAM (like NULL or wild pointers).'
      }
    ],
    key_takeaways: [
      '& asks "Where is it?"',
      '* asks "What is inside it?"',
      'Pointer math increments by type size, not raw single bytes.',
      'Always neutralize freed pointers to NULL.'
    ],
    tags: ['c', 'pointers', 'summary', 'master-summary', 'cheat-sheet', 'revision', 'unified'],
    prerequisites: ['Basic C']
  },

  // =========================================================================
  // TOPIC 2: SQL JOINS (5 DISTINCT FORMATS WITH DEEP CONTENT & MULTIPLE EXAMPLES)
  // =========================================================================
  {
    id: 'sql-joins-explanation',
    title: 'Relational Database Joins: Mathematical Set Theory, Key Alignments & Multi-Table Querying',
    topic: 'SQL Joins',
    category: 'DBMS',
    difficulty: 'Easy',
    format: 'Explanation',
    read_time: '12 min',
    short_description: 'An extensive conceptual breakdown of relational database joins: how tables relate through primary and foreign keys, the mathematical mechanics of Cartesian products, and the exact row-inclusion rules of INNER, LEFT, RIGHT, and FULL joins.',
    full_content: `### 1. The Core Philosophy of Relational Databases

To understand why SQL joins exist, you must first understand the fundamental engineering reason why we do not store everything in a single, massive spreadsheet: **Database Normalization**.

If an e-commerce platform stored customers, orders, products, shipping addresses, and inventory in one gigantic table:
1. Every time a customer places a new order, their name, email, and phone number would be duplicated thousands of times, consuming gigabytes of redundant disk space.
2. If the customer updates their phone number in one order row, all previous order rows would hold outdated data (**Update Anomaly**).
3. If an order is canceled and deleted, customer information might be permanently destroyed along with it (**Deletion Anomaly**).

To prevent these disasters, relational databases split information into clean, specialized tables:
- A \`Customers\` table containing customer identities (Primary Key: \`customer_id\`).
- An \`Orders\` table containing purchase records with a **Foreign Key** pointing back to \`customer_id\`.

A **JOIN** is the computational mechanism that temporarily stitches these separate tables back together on demand!

---

### 2. Cartesian Products: The Foundation of Every Join

Before applying any join filter, the database engine conceptually calculates the **Cartesian Product** (CROSS JOIN) of the two relations.

If Table A has $N$ rows and Table B has $M$ rows, the Cartesian product pairs every single row of Table A with every single row of Table B, creating $N \\times M$ combined rows.
- If Table A has 1,000 customers and Table B has 10,000 orders, the unconstrained Cartesian product produces $10,000,000$ rows!

The \`ON\` clause is the golden filter that cuts this explosive matrix down to size:
\`ON customers.id = orders.customer_id\` tells the query engine: *"Throw away all 9,999,000 nonsense pairings, and keep ONLY the rows where the customer ID actually matches the order's owner!"*

---

### 3. The Four Primary Join Behaviors

#### A. INNER JOIN (The Mutual Intersection)
An \`INNER JOIN\` is strict: a row appears in the output if and only if a valid match exists in **both** tables.
- If Customer Charlie has placed 0 orders, Charlie is excluded.
- If an order exists without an associated customer record (e.g. guest checkout or corrupted foreign key), that order is excluded.

#### B. LEFT JOIN (The Preserving Outer Join)
A \`LEFT OUTER JOIN\` guarantees that **every single row from the left table** will appear in the output, regardless of whether any match exists on the right!
- If a customer has 3 orders, they appear 3 times with order details.
- If Customer Charlie has 0 orders, Charlie appears once, with all order columns set to \`NULL\`.
- This is the canonical SQL pattern for answering questions like: *"Which customers haven't placed an order yet?"*

#### C. RIGHT JOIN (The Inverted Join)
A \`RIGHT JOIN\` is simply the symmetric opposite of a LEFT JOIN. It preserves all rows from the right table and fills missing left columns with \`NULL\`. In practice, most engineers write queries using LEFT JOINs by reordering tables, as Western reading order (left-to-right) makes LEFT JOINs far easier to comprehend.

#### D. FULL OUTER JOIN (The Complete Union)
A \`FULL JOIN\` preserves all records from both sides. If a customer has no orders, they appear with NULL order data. If an order has no customer, it appears with NULL customer data.`,
    key_takeaways: [
      'Joins reconnect normalized relational tables using Primary Key and Foreign Key constraints.',
      'An unconstrained join produces an explosive Cartesian Product of N * M rows.',
      'INNER JOIN returns only rows with matches on both sides.',
      'LEFT JOIN preserves every record from the left table, filling non-matching right columns with NULL.'
    ],
    common_pitfalls: [
      'Omitting the ON clause (results in an accidental massive CROSS JOIN).',
      'Filtering the right table in WHERE instead of ON during a LEFT JOIN (turns it into an INNER JOIN).'
    ],
    tags: ['sql', 'joins', 'dbms', 'explanation', 'inner-join', 'left-join', 'relational-database', 'theory'],
    prerequisites: ['Basic SQL SELECT', 'Primary and Foreign Keys']
  },
  {
    id: 'sql-joins-code-examples',
    title: 'Practical SQL Joins: 3 Real-World Multi-Table Production Queries',
    topic: 'SQL Joins',
    category: 'DBMS',
    difficulty: 'Medium',
    format: 'Examples',
    is_programming: true,
    read_time: '14 min',
    short_description: 'Three complete, annotated SQL query scripts demonstrating (1) Multi-table INNER JOIN across three entities, (2) LEFT JOIN Anti-Join to detect inactive records, and (3) Self-Join modeling hierarchical company structures.',
    full_content: `### Production SQL Join Implementations

Below are three complete SQL implementations covering real-world business requirements: joining across multiple tables, finding orphaned records, and hierarchical self-joins.`,
    code_snippets: [
      {
        language: 'sql',
        code: `-- ==========================================================
-- EXAMPLE 1: MULTI-TABLE INNER JOIN ACROSS THREE ENTITIES
-- ==========================================================
-- Scenario: Find all students, their enrolled courses, and their grades

SELECT 
    students.student_id,
    students.full_name,
    courses.course_code,
    courses.course_title,
    enrollments.final_grade
FROM students
INNER JOIN enrollments 
    ON students.student_id = enrollments.student_id
INNER JOIN courses 
    ON enrollments.course_id = courses.course_id
WHERE enrollments.final_grade >= 80.0
ORDER BY students.full_name ASC;`,
        explanation: 'Connects three tables using a bridge table (enrollments) to resolve a many-to-many relationship.'
      },
      {
        language: 'sql',
        code: `-- ==========================================================
-- EXAMPLE 2: LEFT JOIN ANTI-JOIN (DETECTING INACTIVE USERS)
-- ==========================================================
-- Scenario: Find all registered users who have NEVER placed an order

SELECT 
    users.user_id,
    users.username,
    users.email,
    users.created_at
FROM users
LEFT JOIN orders 
    ON users.user_id = orders.customer_id
-- If orders.order_id IS NULL, this user has 0 corresponding records in orders!
WHERE orders.order_id IS NULL
ORDER BY users.created_at DESC;`,
        explanation: 'The classic SQL Anti-Join pattern: LEFT JOIN + WHERE right_table.key IS NULL.'
      },
      {
        language: 'sql',
        code: `-- ==========================================================
-- EXAMPLE 3: SELF-JOIN (HIERARCHICAL REPORTING STRUCTURE)
-- ==========================================================
-- Scenario: List all employees alongside their direct supervisor/manager

SELECT 
    employee.employee_id,
    employee.name AS Employee_Name,
    employee.job_title,
    COALESCE(manager.name, 'TOP EXECUTIVE') AS Reports_To
FROM employees employee
-- Join table to itself using distinct aliases
LEFT JOIN employees manager 
    ON employee.manager_id = manager.employee_id
ORDER BY manager.name ASC, employee.name ASC;`,
        explanation: 'A Self-Join links records within the same table to model parent-child reporting hierarchies.'
      }
    ],
    key_takeaways: [
      'Multi-table joins link normalized entities through foreign keys.',
      'LEFT JOIN + WHERE right.key IS NULL is the fastest way to detect orphaned records.',
      'Self joins require unique table aliases (e.g. emp and mgr) to avoid naming collisions.'
    ],
    tags: ['sql', 'joins', 'code-examples', 'anti-join', 'self-join', 'dbms', 'multi-table'],
    prerequisites: ['SQL Joins Basics']
  },
  {
    id: 'sql-joins-visual-guides',
    title: 'Visualizing SQL Joins: Interactive Venn Diagrams & Row Alignment Maps',
    topic: 'SQL Joins',
    category: 'DBMS',
    difficulty: 'Easy',
    format: 'Visual Guides',
    read_time: '7 min',
    short_description: 'An illustrated guide with rendered high-resolution Venn diagrams and table row mappings showing exactly which records are preserved in INNER, LEFT, and FULL joins.',
    full_content: `### Visual Set Theory: Relational Venn Diagrams

Understanding SQL joins becomes intuitive when viewed as mathematical set intersections.

Look at the rendered diagram below:
1. **Left Circle (Table A)**: Represents all records in the driving table.
2. **Right Circle (Table B)**: Represents all records in the referenced table.
3. **Golden Overlap**: Represents matched rows satisfying the \`ON\` predicate (INNER JOIN).
4. **Outer Crescent**: Represents rows that have no match on the other side and receive \`NULL\` in outer joins.`,
    key_takeaways: [
      'INNER JOIN isolates the shared intersection.',
      'LEFT JOIN preserves the entire left circle, filling missing right data with NULL.'
    ],
    tags: ['sql', 'joins', 'visual-guides', 'venn-diagram', 'diagram', 'visual', 'pictures'],
    prerequisites: ['Basic SQL']
  },
  {
    id: 'sql-joins-practice',
    title: 'SQL Joins Problem Set: Query Optimization & Cartesian Pitfall Challenges',
    topic: 'SQL Joins',
    category: 'DBMS',
    difficulty: 'Medium',
    format: 'Practice',
    read_time: '12 min',
    short_description: 'Practice challenges focusing on join debugging, index optimization, and avoiding accidental Cartesian products.',
    full_content: `### Practice Challenge 1: The WHERE Clause Outer Join Trap
Why does this query fail to return customers who have no orders?
\`\`\`sql
SELECT c.name, o.total
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
WHERE o.status = 'COMPLETED'; -- BUG!
\`\`\`
**Solution**: When a customer has no orders, \`o.status\` evaluates to \`NULL\`. The condition \`NULL = 'COMPLETED'\` evaluates to FALSE, discarding all zero-order customers! Move the filter into the \`ON\` clause: \`ON c.id = o.customer_id AND o.status = 'COMPLETED'\`.`,
    practice_exercises: [
      {
        question: 'If Table A has 5 rows and Table B has 10 rows, what is the maximum rows a LEFT JOIN can return if keys are unique?',
        hint: 'Can a left table row match multiple right table rows?',
        solution: 'If each row in A matches at most one row in B, exactly 5 rows. (If one-to-many, it can return more).'
      }
    ],
    key_takeaways: [
      'Filter conditions on outer tables must live inside the ON clause to avoid converting to INNER JOIN.'
    ],
    tags: ['sql', 'joins', 'practice', 'exercises', 'challenges', 'dbms'],
    prerequisites: ['SQL Joins Basics']
  },
  {
    id: 'sql-joins-summary',
    title: 'Master Summary: SQL Joins Architecture, Syntax Tables, Visuals & Practice',
    topic: 'SQL Joins',
    category: 'DBMS',
    difficulty: 'Easy',
    format: 'Summary',
    read_time: '10 min',
    short_description: 'The unified all-in-one Master Summary for SQL Joins: executive theory, visual Venn diagrams, query patterns, syntax reference, and self-check questions.',
    full_content: `### Unified Master Summary: SQL Joins & Relational Algebra

This unified summary synthesizes everything you need to master multi-table relational queries in one comprehensive module.

---

### 1. Executive Theory & Invariants
- Relational databases normalize data into separate tables to eliminate update/delete anomalies.
- A **Join** stitches tables together on demand using Foreign Key $\\leftrightarrow$ Primary Key equality.
- **Cartesian Product**: Table A ($N$) $\\times$ Table B ($M$) = $N \\times M$ raw combinations. The \`ON\` clause filters this set.

---

### 2. Join Syntax Comparison
| Join Type | Included Left Rows | Included Right Rows | Non-Matching Columns |
|---|---|---|---|
| \`INNER JOIN\` | Matched only | Matched only | Row is discarded |
| \`LEFT JOIN\` | **All rows** | Matched only | Filled with \`NULL\` |
| \`RIGHT JOIN\` | Matched only | **All rows** | Filled with \`NULL\` |
| \`FULL OUTER JOIN\` | **All rows** | **All rows** | Filled with \`NULL\` |
| \`CROSS JOIN\` | All rows ($N$) | All rows ($M$) | Product ($N \\times M$) |

---

### 3. Golden Performance Rules
1. **Always index Foreign Keys**: Joining on unindexed columns forces a full sequential table scan.
2. **Keep outer filters in the ON clause**: Filtering right-table columns in WHERE breaks outer joins.
3. **Use Anti-Joins**: \`LEFT JOIN ... WHERE right.id IS NULL\` is faster than \`NOT IN (subquery)\` when NULLs exist.`,
    practice_exercises: [
      {
        question: 'Self-Check 1: What is the difference between ON and WHERE in a LEFT JOIN?',
        hint: 'Which clause controls the join matching versus post-join row elimination?',
        solution: 'The ON clause determines which right-table rows attach to the left table. The WHERE clause filters rows AFTER the join has already occurred, potentially eliminating preserved NULL rows.'
      }
    ],
    key_takeaways: [
      'INNER = intersection only.',
      'LEFT = preserve all left + matched right.',
      'Always index join columns.'
    ],
    tags: ['sql', 'joins', 'summary', 'master-summary', 'cheat-sheet', 'revision', 'unified'],
    prerequisites: ['Basic SQL']
  },

  // =========================================================================
  // TOPIC 3: LINKED LISTS (4 FORMATS WITH DEEP CONTENT & MULTIPLE EXAMPLES)
  // =========================================================================
  {
    id: 'linked-lists-explanation',
    title: 'Singly Linked Lists: Heap Memory Allocation, Node Topologies & Traversal Mechanics',
    topic: 'Linked Lists',
    category: 'Data Structures',
    difficulty: 'Easy',
    format: 'Explanation',
    read_time: '12 min',
    short_description: 'An extensive conceptual breakdown of linked lists vs contiguous arrays, dynamic node allocation via self-referential structs, head/tail pointer invariants, and pointer traversal mechanics.',
    full_content: `### 1. The Fundamental Flaw of Contiguous Arrays

To appreciate why computer science created Linked Lists, examine the physical limitations of the standard **Array**:

When you ask the operating system to allocate an array of 1,000,000 integers, the operating system must find **one single, unbroken, contiguous block of 4,000,000 bytes** in RAM.
- If your system has 100 megabytes of free RAM, but that free RAM is broken into small fragments scattered between other active programs, your array allocation will fail with an \`Out of Memory\` error (**Memory Fragmentation**).
- Furthermore, inserting a new element at the very beginning of an array of size $N$ requires sliding every single one of the $N$ existing elements one slot to the right ($O(N)$ operation).

---

### 2. The Node & Pointer Solution

A **Linked List** completely removes the requirement for contiguous memory.
Instead of storing elements packed together side by side, a linked list stores elements anywhere in RAM.

Each individual element is wrapped in a structure called a **Node**:
A Node contains two distinct fields:
1. **Data Payload**: The actual information being stored (e.g. integer, string, struct).
2. **Next Pointer**: The physical RAM address of the following node in the chain (\`struct Node *next\`).

Because each node tells the program where the next node lives, nodes can be scattered randomly across RAM. The chain is held together entirely by **Pointers**!

---

### 3. Anatomical Invariants of a Linked List

- **HEAD Pointer**: A single pointer variable that stores the memory address of the first node. If \`head == NULL\`, the list is completely empty.
- **TAIL Node**: The final node in the list. By definition, its \`next\` pointer must hold \`NULL\`.
- **Traversal**: You cannot jump directly to \`list[50]\`. You must start at \`head\`, read its \`next\` pointer to hop to node 1, read node 1's \`next\` to hop to node 2, and so on ($O(N)$ access time).
- **Instant Insertion**: If you hold a pointer to the head node, inserting a new element at the front takes strictly $O(1)$ constant time. You allocate the new node, point its \`next\` to the old head, and update \`head\` to the new node!`,
    key_takeaways: [
      'Linked lists solve memory fragmentation by allowing elements to be stored non-contiguously in RAM.',
      'Each node contains a data payload and a pointer to the next node.',
      'Head is a pointer to the first node; Tail points to NULL.',
      'Insertion at the head is O(1) constant time, while random element access is O(N) linear time.'
    ],
    common_pitfalls: [
      'Losing the Head pointer (renders all following nodes unreachable, causing massive memory leaks).',
      'Forgetting to set the final node next pointer to NULL (causes infinite traversal loops and crashes).'
    ],
    tags: ['linked-lists', 'data-structures', 'explanation', 'nodes', 'pointers', 'memory', 'theory'],
    prerequisites: ['C Pointers', 'Structs']
  },
  {
    id: 'linked-lists-code-examples',
    title: 'Implementing Singly Linked Lists in C: 3 Essential Node Algorithms',
    topic: 'Linked Lists',
    category: 'Data Structures',
    difficulty: 'Medium',
    format: 'Examples',
    is_programming: true,
    read_time: '14 min',
    short_description: 'Three complete, production-grade C implementations demonstrating (1) Node creation & traversal, (2) In-place iterative 3-pointer list reversal, and (3) Safe node deletion with memory freeing.',
    full_content: `### Hands-on Linked List Implementations in C

Below are three complete implementations covering node allocation, in-place reversal, and node deletion.`,
    code_snippets: [
      {
        language: 'c',
        code: `// ==========================================================
// EXAMPLE 1: NODE CREATION, HEAD INSERTION & TRAVERSAL
// ==========================================================
#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node *next;
};

// Insert a new node at the very beginning of the list in O(1) time
void insertAtHead(struct Node **headRef, int newValue) {
    struct Node *newNode = (struct Node*)malloc(sizeof(struct Node));
    if (newNode == NULL) return;
    newNode->data = newValue;
    newNode->next = *headRef; // Point to old head
    *headRef = newNode;       // Update head to new node
}

void printList(struct Node *head) {
    struct Node *curr = head;
    while (curr != NULL) {
        printf("[%d] -> ", curr->data);
        curr = curr->next;
    }
    printf("NULL\\n");
}

int main() {
    struct Node *head = NULL;
    insertAtHead(&head, 30);
    insertAtHead(&head, 20);
    insertAtHead(&head, 10);
    printList(head); // [10] -> [20] -> [30] -> NULL
    return 0;
}`,
        explanation: 'Demonstrates self-referential struct definitions, O(1) insertion at head, and pointer traversal until NULL.'
      },
      {
        language: 'c',
        code: `// ==========================================================
// EXAMPLE 2: IN-PLACE ITERATIVE 3-POINTER LIST REVERSAL
// ==========================================================
// Reverses all links in strictly O(N) time and O(1) extra space

struct Node* reverseList(struct Node *head) {
    struct Node *prev = NULL;
    struct Node *curr = head;
    struct Node *next = NULL;

    while (curr != NULL) {
        // Step 1: Save next pointer before breaking the link
        next = curr->next;
        // Step 2: Reverse the link to point backward
        curr->next = prev;
        // Step 3: Advance prev and curr one step forward
        prev = curr;
        curr = next;
    }
    // prev now points to the new head of the reversed list
    return prev;
}`,
        explanation: 'The classic 3-pointer sliding technique. Saving next before overwriting curr->next prevents losing access to the remainder of the list.'
      },
      {
        language: 'c',
        code: `// ==========================================================
// EXAMPLE 3: SAFE NODE DELETION & COMPLETE LIST DEALLOCATION
// ==========================================================

void deleteNodeByValue(struct Node **headRef, int targetValue) {
    struct Node *curr = *headRef, *prev = NULL;

    // Case 1: Target is in the head node itself
    if (curr != NULL && curr->data == targetValue) {
        *headRef = curr->next;
        free(curr);
        return;
    }

    // Case 2: Search for the node to delete
    while (curr != NULL && curr->data != targetValue) {
        prev = curr;
        curr = curr->next;
    }

    if (curr == NULL) return; // Value not found

    // Unlink the node and free heap memory
    prev->next = curr->next;
    free(curr);
}

void freeEntireList(struct Node **headRef) {
    struct Node *curr = *headRef;
    while (curr != NULL) {
        struct Node *temp = curr->next;
        free(curr);
        curr = temp;
    }
    *headRef = NULL;
}`,
        explanation: 'Shows pointer rewiring during node deletion, and complete deallocation of all heap nodes to prevent memory leaks.'
      }
    ],
    key_takeaways: [
      'Double pointers (struct Node **headRef) allow functions to modify the caller head pointer directly.',
      'Always save curr->next before rewiring pointers during reversal or deletion.',
      'Every malloc() for a node must eventually be freed.'
    ],
    tags: ['linked-lists', 'code-examples', 'c', 'reversal', 'deletion', 'data-structures'],
    prerequisites: ['Linked Lists Foundations']
  },
  {
    id: 'linked-lists-visual-guides',
    title: 'Visualizing Linked Lists: Node Chains, Pointer Rewiring & Loop Detection',
    topic: 'Linked Lists',
    category: 'Data Structures',
    difficulty: 'Easy',
    format: 'Visual Guides',
    read_time: '8 min',
    short_description: 'An illustrated guide with rendered high-resolution node diagrams showing how pointers link memory blocks, and how pointers are redirected during insertion and deletion.',
    full_content: `### Visual Architecture of Linked Lists

Look at the rendered hardware diagram below:
1. **HEAD Pointer**: Holds the memory address of the first node (\`10\`).
2. **Nodes**: Each box contains [Data | Next Address].
3. **Pointers**: Golden arrows show the CPU following the next pointer address to reach the succeeding node.
4. **Tail**: The final node points to \`NULL\`.`,
    key_takeaways: [
      'Linked lists are pointer chains linking non-contiguous heap nodes.',
      'Visualizing the pointer redirects prevents losing memory nodes.'
    ],
    tags: ['linked-lists', 'visual-guides', 'diagram', 'visual', 'pictures', 'data-structures'],
    prerequisites: ['Basic Pointers']
  },
  {
    id: 'linked-lists-summary',
    title: 'Master Summary: Linked Lists Architecture, Operations, Visuals & Practice',
    topic: 'Linked Lists',
    category: 'Data Structures',
    difficulty: 'Easy',
    format: 'Summary',
    read_time: '10 min',
    short_description: 'The unified all-in-one Master Summary for Linked Lists: conceptual synthesis, visual sketches, complexity tables, code patterns, and self-check questions.',
    full_content: `### Unified Master Summary: Singly Linked Lists

This unified summary synthesizes node architecture, operations, complexities, and code patterns in one comprehensive module.

---

### 1. Complexity Comparison Table
| Operation | Linked List | Array | Reason |
|---|---|---|---|
| Access Element $i$ | $O(N)$ | **$O(1)$** | Must traverse $i$ pointer hops from head |
| Insert at Head | **$O(1)$** | $O(N)$ | Only redirect head pointer vs shifting elements |
| Insert at Tail | $O(N)$ or $O(1)$ | $O(1)$ amortized | $O(1)$ if tail pointer is maintained |
| Delete at Head | **$O(1)$** | $O(N)$ | Point head to head->next and free |
| Memory Overhead | Extra pointer per node | None | 4-8 bytes per node for pointer address |

---

### 2. Visual Sketch: In-Place Reversal Algorithm
\`\`\`
   Before: [10] ----> [20] ----> [30] ----> NULL
   
   Step 1: Save next: next = curr->next (20)
   Step 2: Flip arrow: curr->next = prev (NULL)
   Step 3: Slide prev: prev = curr (10)
   Step 4: Slide curr: curr = next (20)
   
   After:  NULL <---- [10] <---- [20] <---- [30] (prev is new head)
\`\`\``,
    practice_exercises: [
      {
        question: 'Self-Check 1: What is the primary advantage of a linked list over an array?',
        hint: 'Think about how memory is allocated.',
        solution: 'Dynamic resizing without reallocating large contiguous memory blocks, and O(1) constant time insertion/deletion at the head.'
      }
    ],
    key_takeaways: [
      'Linked lists exchange random access time for flexible O(1) dynamic insertions.',
      'Always store curr->next before modifying pointers.'
    ],
    tags: ['linked-lists', 'summary', 'master-summary', 'cheat-sheet', 'revision', 'unified'],
    prerequisites: ['Basic Pointers']
  }
];
