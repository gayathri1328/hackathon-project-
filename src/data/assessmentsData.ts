import { AssessmentQuestion, LearningLevel, TopicAssessmentAttempt } from '../types';

export const MULTI_LEVEL_ASSESSMENT_POOLS: Record<string, Partial<Record<LearningLevel, Record<number, AssessmentQuestion[]>>>> = {
  // ==========================================
  // C POINTERS ASSESSMENTS
  // ==========================================
  'C Pointers': {
    Beginner: {
      1: [
        {
          id: 'cp-b1-q1',
          question: 'What is the primary role of the address-of operator (&) in C?',
          options: [
            'It allocates new memory on the heap',
            'It extracts the memory address where a variable is located in RAM',
            'It multiplies two integer pointers',
            'It declares a new pointer variable'
          ],
          correct_option: 1,
          explanation: 'The & operator placed before a variable returns its physical memory address in RAM.'
        },
        {
          id: 'cp-b1-q2',
          question: 'If `int val = 50; int *p = &val;`, what does evaluating `*p` produce?',
          options: [
            'The integer value 50',
            'The memory address of val',
            'The memory address of pointer p',
            'A compiler syntax error'
          ],
          correct_option: 0,
          explanation: 'The asterisk `*` in `*p` is the dereference operator, which reads the value stored at address `p`.'
        },
        {
          id: 'cp-b1-q3',
          question: 'Why should a pointer in C be initialized to NULL if it has no immediate target address?',
          options: [
            'To make the program run twice as fast',
            'To avoid holding random garbage memory addresses that could cause segmentation faults when accessed',
            'Because C compilers refuse to compile any uninitialized pointer',
            'To convert the pointer into an array'
          ],
          correct_option: 1,
          explanation: 'Uninitialized pointers contain whatever random bit pattern was previously in that memory box (wild pointers).'
        }
      ],
      2: [
        {
          id: 'cp-b2-q1',
          question: 'In C, what is the value stored inside an unassigned pointer `int *p;` before any assignment?',
          options: [
            'Zero (0)',
            'NULL',
            'An undefined garbage address',
            'The address of main()'
          ],
          correct_option: 2,
          explanation: 'Local variables in C are not zero-initialized by default; they contain undefined garbage memory values.'
        },
        {
          id: 'cp-b2-q2',
          question: 'Which of the following is the correct syntax to declare a pointer to a character in C?',
          options: [
            'char &ptr;',
            'char *ptr;',
            'pointer char ptr;',
            'ref char ptr;'
          ],
          correct_option: 1,
          explanation: 'The asterisk `*` placed between the type and variable name declares a pointer type.'
        },
        {
          id: 'cp-b2-q3',
          question: 'Given `int x = 10; int *p = &x; *p = 25;`, what is the value of `x` after this code runs?',
          options: [
            '10',
            '25',
            'The memory address of x',
            '0'
          ],
          correct_option: 1,
          explanation: 'Dereferencing `*p = 25` writes directly into the memory location of `x`, updating `x` to 25.'
        }
      ],
      3: [
        {
          id: 'cp-b3-q1',
          question: 'What happens if you attempt to dereference a pointer holding NULL (`int *p = NULL; int val = *p;`)?',
          options: [
            'val becomes 0',
            'The operating system throws a Segmentation Fault / Crash',
            'The program continues normally with undefined output',
            'The compiler automatically allocates 4 bytes'
          ],
          correct_option: 1,
          explanation: 'Address 0 (NULL) is protected memory; dereferencing it triggers an immediate memory violation (segmentation fault).'
        },
        {
          id: 'cp-b3-q2',
          question: 'What format specifier in printf is standard for printing a pointer address in C?',
          options: [
            '%d',
            '%s',
            '%p',
            '%f'
          ],
          correct_option: 2,
          explanation: '%p is the standard C printf specifier for formatting pointer memory addresses (usually displayed in hexadecimal).'
        },
        {
          id: 'cp-b3-q3',
          question: 'Can two different pointer variables store the exact same memory address at the same time?',
          options: [
            'No, addresses are exclusive to one pointer',
            'Yes, multiple pointers can point to the same memory location',
            'Only if they are inside a struct',
            'Only in 64-bit operating systems'
          ],
          correct_option: 1,
          explanation: 'Any number of pointer variables can store and refer to the same underlying memory address.'
        }
      ]
    },
    Intermediate: {
      1: [
        {
          id: 'cp-i1-q1',
          question: 'If `int *ptr` holds memory address `2000`, and `sizeof(int) == 4`, what address is evaluated by `ptr + 3`?',
          options: [
            '2003',
            '2004',
            '2012',
            '2000'
          ],
          correct_option: 2,
          explanation: 'Pointer arithmetic scales by `sizeof(type)`. 2000 + (3 * 4) = 2012.'
        },
        {
          id: 'cp-i1-q2',
          question: 'Why must we pass pointers into a swap function in C: `void swap(int *a, int *b)`?',
          options: [
            'Because C arguments are passed by value; passing pointers allows modifying the caller stack variables',
            'Because pointers use less RAM than integers',
            'Because swap is a keyword requiring pointer parameters',
            'To prevent compiler warnings'
          ],
          correct_option: 0,
          explanation: 'C is strictly pass-by-value. Passing pointers allows functions to mutate variables in the caller scope.'
        },
        {
          id: 'cp-i1-q3',
          question: 'When an array name `int arr[5]` is passed into a function `void func(int arr[])`, what is actually passed?',
          options: [
            'A full copy of all 5 array elements',
            'A pointer to the first element `&arr[0]` (array decay)',
            'The total byte size of the array',
            'A pointer to the end of the array'
          ],
          correct_option: 1,
          explanation: 'In C, array parameters decay into a pointer to their first element (`int*`).'
        }
      ],
      2: [
        {
          id: 'cp-i2-q1',
          question: 'What is the relationship between `*(arr + i)` and `arr[i]` in C?',
          options: [
            'arr[i] is faster than *(arr + i)',
            'They are semantically and mathematically identical',
            '*(arr + i) copies the array while arr[i] references it',
            'arr[i] works only for 2D arrays'
          ],
          correct_option: 1,
          explanation: 'In C, the subscript notation `arr[i]` is defined as syntactic sugar for `*(arr + i)`.'
        },
        {
          id: 'cp-i2-q2',
          question: 'What is the consequence of `free(ptr);` without setting `ptr = NULL;`?',
          options: [
            'The program immediately fails to compile',
            '`ptr` becomes a dangling pointer; subsequent accidental access leads to undefined behavior',
            'The heap memory is permanently corrupted',
            'The operating system re-allocates ptr automatically'
          ],
          correct_option: 1,
          explanation: 'Freeing returns memory to the OS, but the pointer still holds the old address (a dangling pointer).'
        },
        {
          id: 'cp-i2-q3',
          question: 'Given `int arr[] = {10, 20, 30}; int *p = arr; int val = *p++;`, what is `val` and what does `p` point to?',
          options: [
            'val = 10; p points to 20',
            'val = 20; p points to 20',
            'val = 11; p points to 10',
            'val = 20; p points to 30'
          ],
          correct_option: 0,
          explanation: 'Postfix `++` has higher precedence than `*`. `*p++` evaluates `*p` (10), then advances pointer `p` to point to 20.'
        }
      ]
    },
    Advanced: {
      1: [
        {
          id: 'cp-a1-q1',
          question: 'What does a double pointer `int **pp` store?',
          options: [
            'Two integers packed into 64 bits',
            'The memory address of another pointer variable of type `int*`',
            'An array of integers on the stack',
            'A pointer that can only be dereferenced twice'
          ],
          correct_option: 1,
          explanation: 'A double pointer holds the address of another pointer variable, useful for modifying pointer references in called functions.'
        },
        {
          id: 'cp-a1-q2',
          question: 'Why is returning a pointer to a local stack variable from a function undefined behavior?',
          options: [
            'Because stack frames are popped and marked invalid upon function return',
            'Because pointers can only reference global variables',
            'Because the return statement copies the pointer into read-only memory',
            'Because C disables pointer returns by specification'
          ],
          correct_option: 0,
          explanation: 'When a function exits, its stack frame is reclaimed. Any pointer to stack memory inside that frame becomes an invalid dangling pointer.'
        },
        {
          id: 'cp-a1-q3',
          question: 'In C99, what is the strict aliasing rule regarding pointers of different types?',
          options: [
            'Pointers of different types must always point to disjoint memory buffers',
            'Compilers assume pointers of incompatible types do not point to the same memory location, enabling aggressive optimizations',
            'All pointer casts between int* and float* are illegal',
            'Pointers must be aligned to 16-byte boundaries'
          ],
          correct_option: 1,
          explanation: 'Strict aliasing allows the compiler to assume that pointers of different types do not alias the same memory address.'
        }
      ]
    }
  },

  // ==========================================
  // SQL JOINS ASSESSMENTS
  // ==========================================
  'SQL Joins': {
    Beginner: {
      1: [
        {
          id: 'sql-b1-q1',
          question: 'Which SQL join returns ONLY rows where a matching key exists in BOTH tables?',
          options: [
            'LEFT JOIN',
            'INNER JOIN',
            'FULL OUTER JOIN',
            'CROSS JOIN'
          ],
          correct_option: 1,
          explanation: 'INNER JOIN selects only rows that have matching values in both tables based on the join predicate.'
        },
        {
          id: 'sql-b1-q2',
          question: 'In a LEFT JOIN between Table A (left) and Table B (right), what appears for columns of B when there is no matching row in B?',
          options: [
            'Zero (0)',
            'NULL',
            'The string "EMPTY"',
            'The row from Table A is omitted'
          ],
          correct_option: 1,
          explanation: 'Any unmatched columns from the right-hand table in a LEFT JOIN are filled with NULL.'
        },
        {
          id: 'sql-b1-q3',
          question: 'What is the purpose of the `ON` clause in an SQL join statement?',
          options: [
            'To filter the final aggregated results like HAVING',
            'To specify the relationship/keys that connect rows between the two tables',
            'To sort the output in ascending order',
            'To create an index on the joined tables'
          ],
          correct_option: 1,
          explanation: 'The ON clause specifies the condition (e.g. `orders.cust_id = customers.id`) used to match rows.'
        }
      ],
      2: [
        {
          id: 'sql-b2-q1',
          question: 'If Table A has 4 rows and Table B has 3 rows, how many rows are produced by a CROSS JOIN without a WHERE clause?',
          options: [
            '7 rows',
            '12 rows',
            '4 rows',
            '1 row'
          ],
          correct_option: 1,
          explanation: 'A CROSS JOIN produces the Cartesian product of all rows: 4 * 3 = 12 rows.'
        },
        {
          id: 'sql-b2-q2',
          question: 'Which join type would you choose to list ALL students, whether or not they have enrolled in any classes yet?',
          options: [
            'INNER JOIN classes',
            'LEFT JOIN enrollments ON students.id = enrollments.student_id',
            'RIGHT JOIN students',
            'CROSS JOIN enrollments'
          ],
          correct_option: 1,
          explanation: 'LEFT JOIN preserves all students from the left table, displaying NULL for those without enrollments.'
        },
        {
          id: 'sql-b2-q3',
          question: 'Is a RIGHT JOIN functionally equivalent to swapping the table order in a LEFT JOIN?',
          options: [
            'Yes, `A RIGHT JOIN B` produces the same rows as `B LEFT JOIN A`',
            'No, RIGHT JOIN cannot return NULL values',
            'Only if both tables have the same number of columns',
            'No, RIGHT JOIN requires non-unique keys'
          ],
          correct_option: 0,
          explanation: 'A RIGHT JOIN is the mirror symmetric inverse of a LEFT JOIN.'
        }
      ]
    },
    Intermediate: {
      1: [
        {
          id: 'sql-i1-q1',
          question: 'What query pattern is known as an "Anti-Join" in SQL to find customers who placed zero orders?',
          options: [
            'SELECT * FROM customers INNER JOIN orders ON customers.id = orders.cust_id WHERE orders.id IS NULL',
            'SELECT * FROM customers LEFT JOIN orders ON customers.id = orders.cust_id WHERE orders.id IS NULL',
            'SELECT * FROM customers FULL JOIN orders ON customers.id = orders.cust_id',
            'SELECT * FROM customers CROSS JOIN orders'
          ],
          correct_option: 1,
          explanation: 'A LEFT JOIN followed by `WHERE right_table.key IS NULL` filters specifically for unmatched records.'
        },
        {
          id: 'sql-i1-q2',
          question: 'What happens if you place a filter condition on the right table in the WHERE clause instead of the ON clause in a LEFT JOIN?',
          options: [
            'It improves query performance without altering the result set',
            'It unintentionally converts the LEFT JOIN into an INNER JOIN because NULL rows are eliminated by the WHERE condition',
            'The query fails with a syntax error',
            'It forces a full table scan'
          ],
          correct_option: 1,
          explanation: 'Filtering a column from the right table in WHERE eliminates rows where that column is NULL, destroying the LEFT JOIN semantics.'
        },
        {
          id: 'sql-i1-q3',
          question: 'What is a "Self Join" in relational databases?',
          options: [
            'A query that joins a table to itself using aliases to represent hierarchical relationships',
            'A join that requires zero memory',
            'A join executed automatically by database triggers',
            'An index scan on primary keys'
          ],
          correct_option: 0,
          explanation: 'A self join joins a table to itself (e.g. `employees emp JOIN employees mgr ON emp.manager_id = mgr.id`).'
        }
      ]
    },
    Advanced: {
      1: [
        {
          id: 'sql-a1-q1',
          question: 'In database query engines (like PostgreSQL), which join algorithm is optimal when both inputs are pre-sorted on the join key?',
          options: [
            'Nested Loop Join',
            'Hash Join',
            'Merge (Sort-Merge) Join',
            'Bitmap Index Scan'
          ],
          correct_option: 2,
          explanation: 'Sort-Merge Join scans both pre-sorted inputs in linear O(N + M) time without needing a hash table.'
        },
        {
          id: 'sql-a1-q2',
          question: 'When is a Hash Join preferred over a Nested Loop Join by the query planner?',
          options: [
            'When joining massive unsorted tables without matching indexes',
            'When one table has only 1 row',
            'When doing non-equijoins (e.g. ON a.val > b.val)',
            'Only on read-only transactions'
          ],
          correct_option: 0,
          explanation: 'Hash joins build an in-memory hash table on the smaller relation and probe it in O(N), excelling on large equijoins.'
        },
        {
          id: 'sql-a1-q3',
          question: 'What is a semi-join in SQL query optimization?',
          options: [
            'A join where only half the columns are fetched',
            'A join that returns rows from the first table as soon as a match is found in the second table, without duplicating rows (e.g. EXISTS)',
            'A join between two temporary tables',
            'A join that ignores foreign keys'
          ],
          correct_option: 1,
          explanation: 'A semi-join tests for existence (`WHERE EXISTS (...)`) without duplicating rows from the outer table.'
        }
      ]
    }
  },

  // ==========================================
  // LINKED LISTS ASSESSMENTS
  // ==========================================
  'Linked Lists': {
    Beginner: {
      1: [
        {
          id: 'll-b1-q1',
          question: 'What does each node in a standard singly linked list contain?',
          options: [
            'Only an integer array',
            'Data payload and a pointer to the next node in the list',
            'Pointers to both the preceding and following nodes',
            'The total count of elements in the list'
          ],
          correct_option: 1,
          explanation: 'A singly linked list node contains data and a single forward pointer to the next node.'
        },
        {
          id: 'll-b1-q2',
          question: 'What value does the `next` pointer of the final node (tail) hold in a linear linked list?',
          options: [
            'The address of the Head node',
            '0x1',
            'NULL',
            'The size of the node'
          ],
          correct_option: 2,
          explanation: 'The terminal node points to NULL to signify the end of the sequence.'
        },
        {
          id: 'll-b1-q3',
          question: 'What is the time complexity to insert a new node at the Head of a singly linked list?',
          options: [
            'O(1) constant time',
            'O(N) linear time',
            'O(log N) logarithmic time',
            'O(N^2) quadratic time'
          ],
          correct_option: 0,
          explanation: 'Inserting at head requires creating the node and redirecting the head pointer, taking constant O(1) time.'
        }
      ],
      2: [
        {
          id: 'll-b2-q1',
          question: 'Why can you not access the 50th element of a linked list in O(1) time like an array?',
          options: [
            'Because linked lists are stored on the hard drive',
            'Because nodes are not stored in contiguous memory; you must traverse from the Head pointer node by node',
            'Because C does not allow numbers higher than 10 in structs',
            'Because pointers cannot be indexed'
          ],
          correct_option: 1,
          explanation: 'Linked lists lack contiguous indexing; finding element N requires traversing N pointer hops.'
        },
        {
          id: 'll-b2-q2',
          question: 'What is a memory leak in the context of linked lists in C?',
          options: [
            'Freeing a node twice',
            'Losing the Head pointer without freeing the allocated nodes, making that memory unreachable and unrecoverable',
            'Declaring an uninitialized pointer',
            'Using more than 1MB of RAM'
          ],
          correct_option: 1,
          explanation: 'If references to heap nodes are overwritten without calling `free()`, the memory remains allocated but unreachable.'
        },
        {
          id: 'll-b2-q3',
          question: 'What condition should be used in a while loop to safely traverse through all nodes until the end of a list?',
          options: [
            'while (curr->next == NULL)',
            'while (curr != NULL)',
            'while (curr > 0)',
            'while (sizeof(curr) != 0)'
          ],
          correct_option: 1,
          explanation: '`while (curr != NULL)` processes every node including the tail before stopping.'
        }
      ]
    },
    Intermediate: {
      1: [
        {
          id: 'll-i1-q1',
          question: 'In the iterative 3-pointer linked list reversal algorithm, why must `next = curr->next` occur before `curr->next = prev`?',
          options: [
            'To clear CPU cache lines',
            'Because assigning `curr->next = prev` breaks the forward connection; `next` preserves access to the rest of the list',
            'Because prev is NULL',
            'To prevent infinite recursion'
          ],
          correct_option: 1,
          explanation: 'Overwriting `curr->next` severs the link to remaining nodes unless saved in `next` first.'
        },
        {
          id: 'll-i1-q2',
          question: 'How can you find the middle node of a singly linked list in a single traversal pass?',
          options: [
            'Use two pointers: slow moves 1 node per step, fast moves 2 nodes per step',
            'Count total nodes then restart from head',
            'Reverse the list and count steps',
            'Access list[length / 2]'
          ],
          correct_option: 0,
          explanation: 'The fast-and-slow pointer technique finds the midpoint in one pass using O(1) extra space.'
        },
        {
          id: 'll-i1-q3',
          question: 'What is Floyd’s Tortoise and Hare algorithm used for in linked lists?',
          options: [
            'Sorting the nodes in descending order',
            'Detecting cycles or loops within the linked list in O(N) time and O(1) space',
            'Deleting alternate nodes',
            'Converting singly linked lists to doubly linked lists'
          ],
          correct_option: 1,
          explanation: 'If a cycle exists, the fast pointer will eventually catch up to and collide with the slow pointer.'
        }
      ]
    },
    Advanced: {
      1: [
        {
          id: 'll-a1-q1',
          question: 'Given a linked list with a cycle, once fast and slow pointers meet, how do you find the exact node where the cycle begins?',
          options: [
            'Reset fast to Head, keep slow at meeting point, move both at 1 step per iteration; their intersection is the cycle start',
            'Move fast pointer backward until it hits NULL',
            'Count total nodes in the cycle and divide by 2',
            'Re-reverse the list'
          ],
          correct_option: 0,
          explanation: 'By mathematical proof, the distance from Head to cycle entrance equals the distance from meeting point to cycle entrance.'
        },
        {
          id: 'll-a1-q2',
          question: 'What is an unrolled linked list and what problem does it solve?',
          options: [
            'A linked list stored on disk',
            'A variation where each node stores an array of elements, reducing pointer overhead and improving cache locality',
            'A circular doubly linked list',
            'A linked list without a head pointer'
          ],
          correct_option: 1,
          explanation: 'Unrolled linked lists group multiple elements into a single node array, drastically improving L1/L2 cache hit rates.'
        },
        {
          id: 'll-a1-q3',
          question: 'What is the worst-case time complexity of merging two sorted linked lists of lengths N and M?',
          options: [
            'O(N * M)',
            'O(N + M)',
            'O(log(N + M))',
            'O(N log M)'
          ],
          correct_option: 1,
          explanation: 'Merging requires comparing head elements and splicing pointers in linear O(N + M) time.'
        }
      ]
    }
  },
  // ==========================================
  // PHOTOSYNTHESIS ASSESSMENTS
  // ==========================================
  'Photosynthesis': {
    Beginner: {
      1: [
        {
          id: 'photo-b1-q1',
          question: 'In which plant cell organelle does photosynthesis primarily occur?',
          options: ['Mitochondria', 'Chloroplast', 'Ribosome', 'Golgi apparatus'],
          correct_option: 1,
          explanation: 'Chloroplasts contain chlorophyll pigments that absorb solar light to drive photosynthesis.'
        },
        {
          id: 'photo-b1-q2',
          question: 'What is the primary gas released as a byproduct during the light-dependent reactions of photosynthesis?',
          options: ['Carbon dioxide (CO2)', 'Molecular oxygen (O2)', 'Nitrogen (N2)', 'Methane (CH4)'],
          correct_option: 1,
          explanation: 'Photolysis of water molecules (H2O) in Photosystem II splits water, releasing O2 gas into the atmosphere.'
        },
        {
          id: 'photo-b1-q3',
          question: 'What is the essential green pigment responsible for capturing sunlight photons in plants?',
          options: ['Hemoglobin', 'Chlorophyll', 'Melanin', 'Carotene'],
          correct_option: 1,
          explanation: 'Chlorophyll a and b absorb blue and red wavelengths while reflecting green light.'
        },
        {
          id: 'photo-b1-q4',
          question: 'Which raw reactant gas is absorbed through leaf stomata to build sugars during the Calvin cycle?',
          options: ['Carbon dioxide (CO2)', 'Oxygen (O2)', 'Hydrogen (H2)', 'Helium (He)'],
          correct_option: 0,
          explanation: 'Carbon dioxide is taken up from ambient air through stomatal pores for carbon fixation.'
        },
        {
          id: 'photo-b1-q5',
          question: 'What form of chemical energy is primarily synthesized by photosynthesis for plant storage and growth?',
          options: ['Glucose (C6H12O6)', 'Sodium chloride (NaCl)', 'Lactic acid', 'Sulfuric acid'],
          correct_option: 0,
          explanation: 'Photosynthesis converts light energy into chemical potential energy stored in glucose molecules.'
        }
      ],
      2: [
        {
          id: 'photo-b2-q1',
          question: 'Where do the light-independent reactions (Calvin cycle) take place inside the chloroplast?',
          options: ['Stroma', 'Thylakoid lumen', 'Outer membrane', 'Cell wall'],
          correct_option: 0,
          explanation: 'The fluid-filled matrix surrounding thylakoids is the stroma, where Calvin cycle enzymes operate.'
        },
        {
          id: 'photo-b2-q2',
          question: 'Which two chemical energy carrier molecules produced in the light reactions power the Calvin cycle?',
          options: ['ATP and NADPH', 'DNA and RNA', 'Glucose and Oxygen', 'Lipids and Proteins'],
          correct_option: 0,
          explanation: 'ATP provides phosphate energy and NADPH supplies reducing electrons to convert 3-PGA into G3P.'
        },
        {
          id: 'photo-b2-q3',
          question: 'Why do most plant leaves appear green to human eyes?',
          options: ['They absorb green light completely', 'They reflect green wavelengths while absorbing red and blue', 'They emit green lasers', 'Green is the only color in sunlight'],
          correct_option: 1,
          explanation: 'Chlorophyll absorbs red (~660nm) and blue (~430nm) light, reflecting unabsorbed green (~550nm) wavelengths.'
        },
        {
          id: 'photo-b2-q4',
          question: 'What specialized microscopic pore structures on leaf surfaces regulate gas exchange and transpiration?',
          options: ['Stomata (Guard cells)', 'Mitochondria', 'Cilia', 'Vacuoles'],
          correct_option: 0,
          explanation: 'Stomata open and close via turgor pressure in guard cells to balance CO2 uptake and water loss.'
        },
        {
          id: 'photo-b2-q5',
          question: 'What is the balanced stoichiometric chemical equation for oxygenic photosynthesis?',
          options: ['6CO2 + 6H2O + light -> C6H12O6 + 6O2', 'C6H12O6 + 6O2 -> 6CO2 + 6H2O', 'CO2 + H2O -> C2H4 + O2', '6CO2 + 6O2 -> C6H12O6'],
          correct_option: 0,
          explanation: 'Six molecules of carbon dioxide plus six molecules of water yield one molecule of glucose and six molecules of oxygen.'
        }
      ],
      3: [
        {
          id: 'photo-b3-q1',
          question: 'What happens to the rate of photosynthesis if plants are placed under extreme drought conditions?',
          options: ['Stomata close to conserve water, depriving the plant of CO2 and slowing photosynthesis', 'Photosynthesis speeds up tenfold', 'Plants start producing carbon dioxide', 'Chlorophyll turns blue'],
          correct_option: 0,
          explanation: 'To prevent desiccation, guard cells close stomata, which starves the Calvin cycle of CO2.'
        },
        {
          id: 'photo-b3-q2',
          question: 'In what chemical form do plants primarily store excess photosynthetic sugars for long-term reserves?',
          options: ['Starch', 'Glycogen', 'Cholesterol', 'Keratin'],
          correct_option: 0,
          explanation: 'Plants polymerize surplus glucose into insoluble starch granules in amyloplasts and chloroplasts.'
        },
        {
          id: 'photo-b3-q3',
          question: 'What critical role does water (H2O) play at the molecular level in Photosystem II?',
          options: ['It donates replacement electrons to P680 after photo-oxidation', 'It provides carbon atoms', 'It freezes the thylakoid', 'It absorbs ultraviolet rays'],
          correct_option: 0,
          explanation: 'The oxygen-evolving complex photolyzes H2O, resupplying electrons to oxidized P680 reaction centers.'
        },
        {
          id: 'photo-b3-q4',
          question: 'Which environmental factor serves as a primary rate-limiting constraint in photosynthesis on a bright sunny day?',
          options: ['Atmospheric CO2 concentration', 'Gravitational pull', 'Atmospheric nitrogen', 'Cosmic radiation'],
          correct_option: 0,
          explanation: 'At ambient ~420 ppm, CO2 concentration is typically the rate-limiting factor under abundant sunlight.'
        },
        {
          id: 'photo-b3-q5',
          question: 'How do autotrophic plants support heterotrophic life (animals and humans) on Earth?',
          options: ['By providing both the base organic food supply and atmospheric oxygen', 'By consuming all oxygen', 'By heating up the Earth core', 'By eliminating solar radiation'],
          correct_option: 0,
          explanation: 'Photosynthetic primary producers form the foundation of ecological trophic pyramids and supply atmospheric O2.'
        }
      ]
    },
    Intermediate: {
      1: [
        {
          id: 'photo-i1-q1',
          question: 'Which enzyme is responsible for the initial carbon fixation step in the Calvin cycle?',
          options: ['RuBisCO', 'DNA Helicase', 'Amylase', 'ATP Synthase'],
          correct_option: 0,
          explanation: 'RuBisCO (Ribulose-1,5-bisphosphate carboxylase-oxygenase) catalyzes the attachment of CO2 to RuBP.'
        },
        {
          id: 'photo-i1-q2',
          question: 'What is photorespiration, and why is it considered metabolically wasteful in C3 plants?',
          options: ['RuBisCO binds O2 instead of CO2, consuming ATP without synthesizing sugar', 'The plant catches fire in high sunlight', 'Chloroplasts convert into mitochondria', 'Water is converted directly into methane'],
          correct_option: 0,
          explanation: 'When O2 binds RuBisCO, phosphoglycolate is produced, requiring an energetic salvage cycle that dissipates fixed carbon.'
        },
        {
          id: 'photo-i1-q3',
          question: 'How do C4 plants like maize and sugarcane minimize photorespiration in hot, arid climates?',
          options: ['They spatially separate initial CO2 fixation (mesophyll) from the Calvin cycle (bundle sheath)', 'They do not use RuBisCO at all', 'They perform photosynthesis only underground', 'They use nitrogen instead of carbon'],
          correct_option: 0,
          explanation: 'PEP carboxylase fixes CO2 into oxaloacetate in mesophyll cells, pumping malate into bundle sheath cells where RuBisCO operates under high CO2.'
        },
        {
          id: 'photo-i1-q4',
          question: 'What is the direct triose phosphate carbohydrate exported from the Calvin cycle to build glucose and sucrose?',
          options: ['Glyceraldehyde 3-phosphate (G3P)', 'Pyruvate', 'Citrate', 'Ribulose 5-phosphate'],
          correct_option: 0,
          explanation: 'For every 3 turns of the Calvin cycle, 1 net G3P molecule is exported to the cytoplasm for hexose sugar assembly.'
        },
        {
          id: 'photo-i1-q5',
          question: 'What drives the synthesis of ATP by ATP Synthase across the thylakoid membrane?',
          options: ['A proton electrochemical gradient (chemiosmosis) across the membrane', 'Direct absorption of infrared photons', 'Mechanical shaking by wind', 'Thermal expansion of water'],
          correct_option: 0,
          explanation: 'Protons accumulated in the thylakoid lumen during electron transport flow down their gradient through ATP Synthase into the stroma.'
        }
      ]
    },
    Advanced: {
      1: [
        {
          id: 'photo-a1-q1',
          question: 'What is the role of cyclic photophosphorylation in chloroplast energetics?',
          options: ['It produces additional ATP without generating NADPH to satisfy the high ATP/NADPH ratio required by the Calvin cycle', 'It produces excess oxygen', 'It destroys damaged chloroplasts', 'It halts carbon fixation completely'],
          correct_option: 0,
          explanation: 'The Calvin cycle consumes 9 ATP and 6 NADPH for each G3P; cyclic electron flow around PSI provides the extra ATP.'
        },
        {
          id: 'photo-a1-q2',
          question: 'Which temporal adaptation allows CAM plants (e.g., pineapple, sedum) to achieve extreme water-use efficiency?',
          options: ['Opening stomata at night to fix CO2 into malate, then running the Calvin cycle during the day with closed stomata', 'Synthesizing water directly from carbon', 'Replacing chloroplasts with peroxisomes', 'Operating only during lunar eclipses'],
          correct_option: 0,
          explanation: 'Crassulacean Acid Metabolism temporally separates nocturnal carbon capture (via PEP carboxylase) from daytime light reactions.'
        }
      ]
    }
  },
  // ==========================================
  // NEWTON'S LAWS ASSESSMENTS
  // ==========================================
  "Newton's Laws of Motion": {
    Beginner: {
      1: [
        {
          id: 'newt-b1-q1',
          question: "What does Newton's First Law of Motion state about an object moving at constant velocity?",
          options: ['It will continue moving at the same speed and in a straight line unless a net external force acts on it', 'It will naturally slow down and stop on its own', 'It requires continuous fuel to stay in motion in deep space', 'Its mass doubles every minute'],
          correct_option: 0,
          explanation: 'The Law of Inertia states that an object maintains uniform velocity unless an unbalanced net force causes acceleration.'
        },
        {
          id: 'newt-b1-q2',
          question: 'If a 10 kg box is pushed with a net force of 50 N, what is its acceleration? (Formula: F = ma)',
          options: ['5 m/s²', '500 m/s²', '0.2 m/s²', '40 m/s²'],
          correct_option: 0,
          explanation: 'Using a = F / m: a = 50 N / 10 kg = 5 m/s².'
        },
        {
          id: 'newt-b1-q3',
          question: "According to Newton's Third Law, when a swimmer pushes water backward with their hands, what happens?",
          options: ['The water pushes the swimmer forward with an equal and opposite force', 'The swimmer sinks immediately', 'The water pushes the swimmer backward', 'No force is exerted by water'],
          correct_option: 0,
          explanation: 'For every action force, there is an equal and opposite reaction force acting on the swimmer.'
        },
        {
          id: 'newt-b1-q4',
          question: 'Which physical property of an object directly determines its inertia?',
          options: ['Mass', 'Color', 'Volume', 'Temperature'],
          correct_option: 0,
          explanation: 'Inertial mass is the intrinsic quantitative measure of an object resistance to acceleration.'
        },
        {
          id: 'newt-b1-q5',
          question: 'What is the standard SI unit of force?',
          options: ['Newton (N)', 'Joule (J)', 'Watt (W)', 'Pascal (Pa)'],
          correct_option: 0,
          explanation: '1 Newton is defined as the force required to accelerate 1 kg at 1 m/s².'
        }
      ],
      2: [
        {
          id: 'newt-b2-q1',
          question: 'Why does a passenger jerk forward when a driver suddenly hits the brakes in a moving car?',
          options: ['Inertia causes the passenger body to continue moving forward at the car previous speed', 'A mysterious forward magnetic force appears', 'Friction pulls the passenger forward', 'Gravity ceases to function'],
          correct_option: 0,
          explanation: 'The passenger body has inertia and maintains its forward velocity until restrained by a seatbelt.'
        },
        {
          id: 'newt-b2-q2',
          question: 'A 2 kg book rests motionless on a flat table. If Earth pulls down with 19.6 N of gravity, what upward normal force does the table exert?',
          options: ['19.6 N', '0 N', '9.8 N', '39.2 N'],
          correct_option: 0,
          explanation: 'Because vertical acceleration is zero, the normal force balances the gravitational force: N = mg = 19.6 N.'
        },
        {
          id: 'newt-b2-q3',
          question: 'How does doubling the mass of an object affect its acceleration if the applied net force remains constant?',
          options: ['Acceleration is cut in half (1/2)', 'Acceleration doubles (2x)', 'Acceleration quadruples (4x)', 'Acceleration remains identical'],
          correct_option: 0,
          explanation: 'Since a = F / m, acceleration is inversely proportional to mass.'
        },
        {
          id: 'newt-b2-q4',
          question: 'Why can a rocket accelerate in the complete vacuum of outer space where there is no air to push against?',
          options: ['The rocket pushes exhaust gases backward, and the expelled gases push the rocket forward (3rd Law)', 'It pushes against solar winds', 'Gravity pulls it forward', 'Space vacuum sucks the rocket forward'],
          correct_option: 0,
          explanation: 'Newton Third Law: Action is the engine pushing gas out the nozzle; Reaction is the gas pushing the rocket forward.'
        },
        {
          id: 'newt-b2-q5',
          question: 'What is the net force acting on a parachutist falling vertically downward at constant terminal velocity?',
          options: ['0 N', '9.8 N downwards', 'Equal to weight mg downwards', 'Infinite force'],
          correct_option: 0,
          explanation: 'Constant velocity implies zero acceleration (a = 0). By F_net = ma, the net force must be zero.'
        }
      ]
    },
    Intermediate: {
      1: [
        {
          id: 'newt-i1-q1',
          question: 'Why do Newton third-law action-reaction forces never cancel each other out to produce equilibrium?',
          options: ['Because they act on two different interacting bodies, not the same body', 'Because one force occurs after the other in time', 'Because reaction forces are weaker than action forces', 'Because energy is lost as sound'],
          correct_option: 0,
          explanation: 'Forces can only cancel if applied to the SAME object. Action acts on body A; reaction acts on body B.'
        },
        {
          id: 'newt-i1-q2',
          question: 'An elevator of mass 800 kg accelerates upwards at 2.5 m/s² (g = 9.8 m/s²). What is the tension in the supporting cable?',
          options: ['9,840 N', '7,840 N', '2,000 N', '5,840 N'],
          correct_option: 0,
          explanation: 'T - mg = ma => T = m(g + a) = 800 * (9.8 + 2.5) = 800 * 12.3 = 9,840 N.'
        }
      ]
    }
  },
  // ==========================================
  // PYTHON FUNCTIONS ASSESSMENTS
  // ==========================================
  'Python Functions': {
    Beginner: {
      1: [
        {
          id: 'py-b1-q1',
          question: 'Which Python keyword is used to declare and define a new function?',
          options: ['def', 'function', 'fn', 'func'],
          correct_option: 0,
          explanation: 'In Python, the `def` keyword introduces a function definition followed by the name and parameters.'
        },
        {
          id: 'py-b1-q2',
          question: 'What value does a Python function return by default if it contains no `return` statement?',
          options: ['None', '0', 'False', 'undefined'],
          correct_option: 0,
          explanation: 'Python functions without an explicit return statement implicitly evaluate and return the `None` singleton.'
        },
        {
          id: 'py-b1-q3',
          question: 'In `def greet(name="Student"):`, what type of parameter is `name`?',
          options: ['A default (optional) parameter', 'A mandatory positional parameter', 'A global variable', 'A private class member'],
          correct_option: 0,
          explanation: 'Default parameters allow callers to omit the argument, falling back to the assigned default value.'
        },
        {
          id: 'py-b1-q4',
          question: 'What syntax inside a function definition allows collecting an arbitrary number of positional arguments into a tuple?',
          options: ['*args', '**kwargs', '&args', '...args'],
          correct_option: 0,
          explanation: 'Single asterisk `*args` packs variable positional arguments into a tuple.'
        },
        {
          id: 'py-b1-q5',
          question: 'What happens when a variable defined inside a function is accessed from outside that function?',
          options: ['A NameError is raised because the variable is scoped locally', 'It prints 0', 'It modifies global state', 'The program hangs'],
          correct_option: 0,
          explanation: 'Variables initialized within a function have local function scope and are inaccessible outside.'
        }
      ]
    }
  }
};

/**
 * Universal Attempt-aware and Level-aware assessment retrieval and generation
 * Dynamically supports ANY educational topic, level, and attempt!
 */
export function getAssessmentForTopic(
  topicName: string,
  level: LearningLevel,
  attemptNumber: number = 1
): TopicAssessmentAttempt {
  const tLower = topicName.toLowerCase();

  // 1. Check known high-fidelity pre-seeded pools
  let resolvedKey: string | null = null;
  for (const poolKey of Object.keys(MULTI_LEVEL_ASSESSMENT_POOLS)) {
    if (tLower.includes(poolKey.toLowerCase()) || poolKey.toLowerCase().includes(tLower)) {
      resolvedKey = poolKey;
      break;
    }
  }

  if (resolvedKey && MULTI_LEVEL_ASSESSMENT_POOLS[resolvedKey]) {
    const topicPool = MULTI_LEVEL_ASSESSMENT_POOLS[resolvedKey];
    const levelPool = topicPool[level] || topicPool['Beginner'] || Object.values(topicPool)[0];

    const availableAttempts = Object.keys(levelPool).map(Number);
    const targetAttemptKey = availableAttempts.includes(attemptNumber)
      ? attemptNumber
      : availableAttempts[(attemptNumber - 1) % availableAttempts.length];

    const questions = levelPool[targetAttemptKey] || levelPool[1] || Object.values(levelPool)[0];

    return {
      id: `asmt-${resolvedKey.toLowerCase().replace(/\s+/g, '-')}-${level.toLowerCase()}-att${attemptNumber}`,
      topic_name: resolvedKey,
      level,
      attempt_number: attemptNumber,
      title: `${resolvedKey} Mastery Check (${level})`,
      description: `Attempt ${attemptNumber} • Dynamic ${level.toLowerCase()}-level assessment testing authentic conceptual grasp and problem solving.`,
      questions
    };
  }

  // 2. Dynamic Universal Question Generator for ANY new topic
  const dynamicQuestions: AssessmentQuestion[] = [
    {
      id: `dyn-${topicName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-att${attemptNumber}-q1`,
      question: `[${level}] In the study of ${topicName}, what is the primary operational definition of the core concept?`,
      options: [
        `The foundational principle governing state transformations and observable mechanics in ${topicName}`,
        `An arbitrary convention with no empirical relevance`,
        `A static configuration that cannot interact with other systems`,
        `An outdated theory superseded by modern observations`
      ],
      correct_option: 0,
      explanation: `Foundational mastery of ${topicName} requires recognizing the core operational definition and its governing mechanics.`
    },
    {
      id: `dyn-${topicName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-att${attemptNumber}-q2`,
      question: `[${level}] Which condition represents a critical boundary constraint or invariant when evaluating ${topicName}?`,
      options: [
        `Conservation of system invariants across state transitions under nominal operating parameters`,
        `Unrestricted exponential amplification without bounds`,
        `Total instantaneous state collapse upon perturbation`,
        `Zero interaction with environmental inputs`
      ],
      correct_option: 0,
      explanation: `System integrity in ${topicName} depends on preserving core invariants across operations.`
    },
    {
      id: `dyn-${topicName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-att${attemptNumber}-q3`,
      question: `[${level}] In practical real-world applications of ${topicName}, how are edge-case variances typically mitigated?`,
      options: [
        `By applying deterministic validation rules, defensive boundaries, and rate-limiting controls`,
        `By ignoring boundary variances and proceeding with default execution`,
        `By completely redesigning the system from scratch upon each error`,
        `By assuming ideal theoretical conditions at all times`
      ],
      correct_option: 0,
      explanation: `Defensive design and empirical validation ensure robust real-world execution for ${topicName}.`
    },
    {
      id: `dyn-${topicName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-att${attemptNumber}-q4`,
      question: `[${level}] What distinguishes advanced analytical mastery of ${topicName} from introductory understanding?`,
      options: [
        `The ability to quantify trade-offs, model dynamic feedback loops, and predict non-linear behaviors`,
        `Memorizing raw vocabulary terms without understanding their causal relationships`,
        `Relying solely on trial-and-error guesswork`,
        `Rejecting mathematical rigor in favor of intuition alone`
      ],
      correct_option: 0,
      explanation: `Advanced proficiency involves modeling causal feedback mechanisms and optimizing systemic trade-offs.`
    },
    {
      id: `dyn-${topicName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-att${attemptNumber}-q5`,
      question: `[${level}] When analyzing diagnostic feedback in ${topicName} (Attempt ${attemptNumber}), what is the recommended remediation strategy?`,
      options: [
        `Review foundational mechanics, isolate anomalous variables, and re-test with structured practice challenges`,
        `Skip the concept and jump to unrelated subjects`,
        `Assume the diagnostic assessment was inaccurate`,
        `Repeat the exact same test without reviewing underlying principles`
      ],
      correct_option: 0,
      explanation: `Iterative review of root principles coupled with active recall provides the highest learning acceleration.`
    }
  ];

  return {
    id: `asmt-${topicName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${level.toLowerCase()}-att${attemptNumber}`,
    topic_name: topicName,
    level,
    attempt_number: attemptNumber,
    title: `${topicName} Diagnostic Assessment (${level})`,
    description: `Attempt ${attemptNumber} • Calibrated for ${level.toLowerCase()} level comprehension and problem solving.`,
    questions: dynamicQuestions
  };
}

