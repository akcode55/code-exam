// Quiz Questions Database
const quizQuestions = {
    javascript: [
        {
            question: "What is the correct way to declare a variable in JavaScript?",
            options: [
                "<code>var myVar;</code>",
                "<code>variable myVar;</code>",
                "<code>declare myVar;</code>",
                "<code>v myVar;</code>"
            ],
            correct: 0
        },
        {
            question: "Which method is used to add an element to the end of an array?",
            options: [
                "<code>array.append(item)</code>",
                "<code>array.push(item)</code>",
                "<code>array.add(item)</code>",
                "<code>array.insert(item)</code>"
            ],
            correct: 1
        },
        {
            question: "What does '===' operator do in JavaScript?",
            options: ["Assigns a value", "Compares values only", "Compares values and types", "Creates a new variable"],
            correct: 2
        },
        {
            question: "Which of the following is NOT a JavaScript data type?",
            options: ["String", "Boolean", "Float", "Undefined"],
            correct: 2
        },
        {
            question: "What is the output of: <code>console.log(typeof null)</code>?",
            options: ["<code>null</code>", "<code>undefined</code>", "<code>object</code>", "<code>boolean</code>"],
            correct: 2
        },
        {
            question: "Which method is used to remove the last element from an array?",
            options: ["pop()", "remove()", "delete()", "splice()"],
            correct: 0
        },
        {
            question: "What is a closure in JavaScript?",
            options: ["A way to close the browser", "A function with access to outer scope", "A loop structure", "An error handling mechanism"],
            correct: 1
        },
        {
            question: "Which keyword is used to create a constant in JavaScript?",
            options: ["constant", "const", "final", "static"],
            correct: 1
        },
        {
            question: "What does the 'this' keyword refer to in JavaScript?",
            options: ["The current function", "The global object", "The object that owns the method", "The previous element"],
            correct: 2
        },
        {
            question: "Which method converts a JSON string to a JavaScript object?",
            options: [
                "<code>JSON.stringify()</code>",
                "<code>JSON.parse()</code>",
                "<code>JSON.convert()</code>",
                "<code>JSON.object()</code>"
            ],
            correct: 1,
            codeExample: `const jsonString = '{"name": "John", "age": 30}';
const obj = JSON.parse(jsonString);
console.log(obj.name); // Output: John`
        }
    ],
    
    python: [
        {
            question: "Which of the following is the correct way to create a list in Python?",
            options: ["list = {1, 2, 3}", "list = [1, 2, 3]", "list = (1, 2, 3)", "list = <1, 2, 3>"],
            correct: 1
        },
        {
            question: "What is the output of: <code>print(3 ** 2)</code>?",
            options: ["<code>6</code>", "<code>9</code>", "<code>32</code>", "<code>Error</code>"],
            correct: 1,
            codeExample: `# Python exponentiation operator
base = 3
exponent = 2
result = base ** exponent
print(result)  # Output: 9`
        },
        {
            question: "Which keyword is used to define a function in Python?",
            options: ["function", "def", "func", "define"],
            correct: 1
        },
        {
            question: "What is the correct way to create a dictionary in Python?",
            options: ["dict = [key: value]", "dict = {key: value}", "dict = (key: value)", "dict = <key: value>"],
            correct: 1
        },
        {
            question: "Which method is used to add an item to a list?",
            options: ["add()", "append()", "insert()", "push()"],
            correct: 1
        },
        {
            question: "What is the output of: len('Hello')?",
            options: ["4", "5", "6", "Error"],
            correct: 1
        },
        {
            question: "Which operator is used for floor division in Python?",
            options: ["/", "//", "%", "**"],
            correct: 1
        },
        {
            question: "What is the correct way to handle exceptions in Python?",
            options: ["try-catch", "try-except", "catch-finally", "handle-error"],
            correct: 1
        },
        {
            question: "Which of the following is a mutable data type in Python?",
            options: ["String", "Tuple", "List", "Integer"],
            correct: 2
        },
        {
            question: "What does the 'self' parameter represent in Python class methods?",
            options: ["The class itself", "The instance of the class", "The parent class", "A static reference"],
            correct: 1
        }
    ],
    
    java: [
        {
            question: "Which of the following is the correct way to declare a variable in Java?",
            options: ["int x;", "integer x;", "var x;", "number x;"],
            correct: 0
        },
        {
            question: "What is the main method signature in Java?",
            options: ["public static void main(String args[])", "public void main(String args[])", "static void main(String args[])", "public main(String args[])"],
            correct: 0
        },
        {
            question: "Which keyword is used to inherit a class in Java?",
            options: ["inherits", "extends", "implements", "derives"],
            correct: 1
        },
        {
            question: "What is the size of int data type in Java?",
            options: ["16 bits", "32 bits", "64 bits", "8 bits"],
            correct: 1
        },
        {
            question: "Which of the following is NOT an access modifier in Java?",
            options: ["public", "private", "protected", "internal"],
            correct: 3
        },
        {
            question: "What is the correct way to create an object in Java?",
            options: ["MyClass obj = new MyClass();", "MyClass obj = MyClass();", "obj = new MyClass();", "MyClass obj;"],
            correct: 0
        },
        {
            question: "Which method is called when an object is created in Java?",
            options: ["init()", "constructor", "create()", "new()"],
            correct: 1
        },
        {
            question: "What is the parent class of all classes in Java?",
            options: ["Class", "Object", "Parent", "Super"],
            correct: 1
        },
        {
            question: "Which keyword is used to prevent method overriding in Java?",
            options: ["static", "final", "abstract", "const"],
            correct: 1
        },
        {
            question: "What is the correct way to handle exceptions in Java?",
            options: ["try-catch", "try-except", "handle-error", "catch-throw"],
            correct: 0
        }
    ],
    
    cpp: [
        {
            question: "Which header file is required for input/output operations in C++?",
            options: ["<stdio.h>", "<iostream>", "<conio.h>", "<fstream>"],
            correct: 1
        },
        {
            question: "What is the correct way to declare a pointer in C++?",
            options: ["int ptr;", "int *ptr;", "int &ptr;", "pointer int ptr;"],
            correct: 1
        },
        {
            question: "Which operator is used to access members of a class through a pointer?",
            options: [".", "->", "::", "&"],
            correct: 1
        },
        {
            question: "What is the size of char data type in C++?",
            options: ["1 byte", "2 bytes", "4 bytes", "8 bytes"],
            correct: 0
        },
        {
            question: "Which keyword is used to define a class in C++?",
            options: ["struct", "class", "object", "define"],
            correct: 1
        },
        {
            question: "What is the correct way to allocate memory dynamically in C++?",
            options: ["malloc()", "new", "alloc()", "create()"],
            correct: 1
        },
        {
            question: "Which of the following is a valid C++ identifier?",
            options: ["2variable", "variable_2", "variable-2", "variable 2"],
            correct: 1
        },
        {
            question: "What is the scope resolution operator in C++?",
            options: [".", "->", "::", "::>"],
            correct: 2
        },
        {
            question: "Which keyword is used to inherit a class in C++?",
            options: ["extends", "inherits", ":", "derives"],
            correct: 2
        },
        {
            question: "What is the correct way to define a destructor in C++?",
            options: ["~ClassName()", "delete ClassName()", "destroy ClassName()", "ClassName~()"],
            correct: 0
        }
    ],
    
    csharp: [
        {
            question: "Which keyword is used to define a class in C#?",
            options: ["Class", "class", "define", "struct"],
            correct: 1
        },
        {
            question: "What is the correct way to declare a variable in C#?",
            options: ["int x;", "integer x;", "var x;", "Both int x; and var x;"],
            correct: 3
        },
        {
            question: "Which method is the entry point of a C# application?",
            options: ["Start()", "Main()", "Begin()", "Execute()"],
            correct: 1
        },
        {
            question: "What is the correct way to create an array in C#?",
            options: ["int[] arr = new int[5];", "int arr[] = new int[5];", "array int arr = new int[5];", "int arr = new int[5];"],
            correct: 0
        },
        {
            question: "Which keyword is used for inheritance in C#?",
            options: ["extends", "inherits", ":", "derives"],
            correct: 2
        },
        {
            question: "What is the correct way to handle exceptions in C#?",
            options: ["try-catch", "try-except", "handle-error", "catch-throw"],
            correct: 0
        },
        {
            question: "Which access modifier makes a member accessible only within the same class?",
            options: ["public", "private", "protected", "internal"],
            correct: 1
        },
        {
            question: "What is the correct way to define a property in C#?",
            options: ["public int Age { get; set; }", "public property int Age;", "public int Age();", "property public int Age;"],
            correct: 0
        },
        {
            question: "Which keyword is used to prevent a class from being inherited?",
            options: ["static", "sealed", "final", "abstract"],
            correct: 1
        },
        {
            question: "What is the correct way to create a string in C#?",
            options: ["string str = 'Hello';", "String str = \"Hello\";", "string str = \"Hello\";", "Both String str = \"Hello\"; and string str = \"Hello\";"],
            correct: 3
        }
    ],
    
    php: [
        {
            question: "How do you start a PHP script?",
            options: ["<php>", "<?php", "<script>", "<?"],
            correct: 1
        },
        {
            question: "Which of the following is the correct way to declare a variable in PHP?",
            options: ["$variable", "variable", "var $variable", "declare variable"],
            correct: 0
        },
        {
            question: "What is the correct way to end a PHP statement?",
            options: [".", ";", ":", "end"],
            correct: 1
        },
        {
            question: "Which function is used to output text in PHP?",
            options: ["print()", "echo", "write()", "Both print() and echo"],
            correct: 3
        },
        {
            question: "How do you create an array in PHP?",
            options: ["$arr = array();", "$arr = [];", "$arr = new Array();", "Both $arr = array(); and $arr = [];"],
            correct: 3
        },
        {
            question: "Which superglobal variable contains information about headers, paths, and script locations?",
            options: ["$_GET", "$_POST", "$_SERVER", "$_SESSION"],
            correct: 2
        },
        {
            question: "What is the correct way to include a file in PHP?",
            options: ["include 'file.php';", "import 'file.php';", "require 'file.php';", "Both include 'file.php'; and require 'file.php';"],
            correct: 3
        },
        {
            question: "Which function is used to connect to a MySQL database in PHP?",
            options: ["mysql_connect()", "mysqli_connect()", "connect_mysql()", "db_connect()"],
            correct: 1
        },
        {
            question: "What does PHP stand for?",
            options: ["Personal Home Page", "PHP: Hypertext Preprocessor", "Private Home Page", "Professional Home Page"],
            correct: 1
        },
        {
            question: "Which operator is used for string concatenation in PHP?",
            options: ["+", ".", "&", "concat"],
            correct: 1
        }
    ],

    react: [
        {
            question: "What is the correct way to create a React component?",
            options: [
                "<code>function MyComponent() { return <div>Hello</div>; }</code>",
                "<code>const MyComponent = () => <div>Hello</div>;</code>",
                "<code>class MyComponent extends React.Component { render() { return <div>Hello</div>; } }</code>",
                "All of the above"
            ],
            correct: 3
        },
        {
            question: "What hook is used to manage state in functional components?",
            options: ["<code>useEffect</code>", "<code>useState</code>", "<code>useContext</code>", "<code>useReducer</code>"],
            correct: 1
        },
        {
            question: "What is JSX?",
            options: [
                "A JavaScript extension",
                "A syntax extension for JavaScript",
                "A template engine",
                "A CSS framework"
            ],
            correct: 1
        },
        {
            question: "How do you pass data from parent to child component?",
            options: ["State", "Props", "Context", "Refs"],
            correct: 1
        },
        {
            question: "What is the correct way to handle events in React?",
            options: [
                "<code>onClick={handleClick()}</code>",
                "<code>onClick={handleClick}</code>",
                "<code>onClick='handleClick'</code>",
                "<code>onClick={this.handleClick}</code>"
            ],
            correct: 1
        },
        {
            question: "What hook is used for side effects?",
            options: ["<code>useState</code>", "<code>useEffect</code>", "<code>useContext</code>", "<code>useMemo</code>"],
            correct: 1
        },
        {
            question: "What is the virtual DOM?",
            options: [
                "A copy of the real DOM",
                "A JavaScript representation of the DOM",
                "A faster version of DOM",
                "All of the above"
            ],
            correct: 3
        },
        {
            question: "How do you conditionally render elements in React?",
            options: [
                "<code>{condition && <div>Content</div>}</code>",
                "<code>{condition ? <div>Yes</div> : <div>No</div>}</code>",
                "Both A and B",
                "None of the above"
            ],
            correct: 2
        },
        {
            question: "What is the purpose of keys in React lists?",
            options: [
                "For styling",
                "For identification and optimization",
                "For event handling",
                "For data binding"
            ],
            correct: 1
        },
        {
            question: "What is the correct way to update state?",
            options: [
                "<code>state.count = 5</code>",
                "<code>setState({count: 5})</code>",
                "<code>setCount(5)</code>",
                "Both B and C"
            ],
            correct: 3
        }
    ],

    nodejs: [
        {
            question: "What is Node.js?",
            options: [
                "A JavaScript framework",
                "A JavaScript runtime built on Chrome's V8 engine",
                "A database",
                "A web browser"
            ],
            correct: 1
        },
        {
            question: "Which module is used to create a web server in Node.js?",
            options: ["<code>fs</code>", "<code>http</code>", "<code>url</code>", "<code>path</code>"],
            correct: 1
        },
        {
            question: "What is npm?",
            options: [
                "Node Package Manager",
                "New Programming Method",
                "Network Protocol Manager",
                "Node Process Manager"
            ],
            correct: 0
        },
        {
            question: "How do you import a module in Node.js?",
            options: [
                "<code>import module from 'module'</code>",
                "<code>const module = require('module')</code>",
                "<code>include 'module'</code>",
                "Both A and B"
            ],
            correct: 3
        },
        {
            question: "What is the purpose of <code>package.json</code>?",
            options: [
                "To store project metadata and dependencies",
                "To configure the database",
                "To define routes",
                "To store environment variables"
            ],
            correct: 0
        },
        {
            question: "Which method is used to read files asynchronously?",
            options: [
                "<code>fs.readFileSync()</code>",
                "<code>fs.readFile()</code>",
                "<code>fs.read()</code>",
                "<code>fs.open()</code>"
            ],
            correct: 1
        },
        {
            question: "What is middleware in Express.js?",
            options: [
                "Functions that execute during request-response cycle",
                "Database connections",
                "Template engines",
                "Static files"
            ],
            correct: 0
        },
        {
            question: "How do you handle errors in Node.js?",
            options: [
                "try-catch blocks",
                "Error-first callbacks",
                "Promise rejections",
                "All of the above"
            ],
            correct: 3
        },
        {
            question: "What is the event loop in Node.js?",
            options: [
                "A loop that handles events",
                "The mechanism that handles asynchronous operations",
                "A debugging tool",
                "A performance monitor"
            ],
            correct: 1
        },
        {
            question: "Which command installs a package globally?",
            options: [
                "<code>npm install package</code>",
                "<code>npm install -g package</code>",
                "<code>npm global package</code>",
                "<code>npm add package</code>"
            ],
            correct: 1
        }
    ],

    go: [
        {
            question: "How do you declare a variable in Go?",
            options: [
                "<code>var x int</code>",
                "<code>x := 5</code>",
                "<code>var x = 5</code>",
                "All of the above"
            ],
            correct: 3
        },
        {
            question: "What is a goroutine?",
            options: [
                "A lightweight thread",
                "A function",
                "A package",
                "A data type"
            ],
            correct: 0
        },
        {
            question: "How do you create a slice in Go?",
            options: [
                "<code>make([]int, 5)</code>",
                "<code>[]int{1, 2, 3}</code>",
                "<code>var s []int</code>",
                "All of the above"
            ],
            correct: 3
        },
        {
            question: "What keyword is used to start a goroutine?",
            options: ["<code>async</code>", "<code>go</code>", "<code>thread</code>", "<code>concurrent</code>"],
            correct: 1
        },
        {
            question: "How do you handle errors in Go?",
            options: [
                "try-catch",
                "if err != nil",
                "throw-catch",
                "error handling is automatic"
            ],
            correct: 1
        },
        {
            question: "What is a channel in Go?",
            options: [
                "A communication mechanism between goroutines",
                "A data structure",
                "A function type",
                "A package"
            ],
            correct: 0
        },
        {
            question: "How do you define a struct in Go?",
            options: [
                "<code>struct Person { name string }</code>",
                "<code>type Person struct { name string }</code>",
                "<code>class Person { name string }</code>",
                "<code>define Person { name string }</code>"
            ],
            correct: 1
        },
        {
            question: "What is the zero value of a pointer in Go?",
            options: ["<code>0</code>", "<code>null</code>", "<code>nil</code>", "<code>undefined</code>"],
            correct: 2
        },
        {
            question: "How do you iterate over a slice?",
            options: [
                "<code>for i, v := range slice</code>",
                "<code>for i in slice</code>",
                "<code>foreach v in slice</code>",
                "<code>while slice</code>"
            ],
            correct: 0
        },
        {
            question: "What is the main function in Go?",
            options: [
                "The entry point of the program",
                "A regular function",
                "A constructor",
                "A destructor"
            ],
            correct: 0
        }
    ],

    rust: [
        {
            question: "What is ownership in Rust?",
            options: [
                "A memory management system",
                "A design pattern",
                "A data type",
                "A compiler feature"
            ],
            correct: 0
        },
        {
            question: "How do you declare a mutable variable in Rust?",
            options: [
                "<code>let x = 5;</code>",
                "<code>let mut x = 5;</code>",
                "<code>var x = 5;</code>",
                "<code>mut x = 5;</code>"
            ],
            correct: 1
        },
        {
            question: "What is borrowing in Rust?",
            options: [
                "Taking ownership",
                "Creating references without taking ownership",
                "Copying data",
                "Moving data"
            ],
            correct: 1
        },
        {
            question: "What is the Result type used for?",
            options: [
                "Storing results",
                "Error handling",
                "Return values",
                "Type conversion"
            ],
            correct: 1
        },
        {
            question: "How do you handle errors with Result?",
            options: [
                "<code>match result { Ok(val) => ..., Err(e) => ... }</code>",
                "<code>try-catch</code>",
                "<code>if-else</code>",
                "<code>switch-case</code>"
            ],
            correct: 0
        },
        {
            question: "What is a trait in Rust?",
            options: [
                "A data structure",
                "A way to define shared behavior",
                "A function",
                "A variable type"
            ],
            correct: 1
        },
        {
            question: "How do you create a vector in Rust?",
            options: [
                "<code>Vec::new()</code>",
                "<code>vec![1, 2, 3]</code>",
                "<code>Vec::with_capacity(10)</code>",
                "All of the above"
            ],
            correct: 3
        },
        {
            question: "What is the difference between String and &str?",
            options: [
                "String is owned, &str is borrowed",
                "String is mutable, &str is immutable",
                "String is heap-allocated, &str can be stack-allocated",
                "All of the above"
            ],
            correct: 3
        },
        {
            question: "What is pattern matching in Rust?",
            options: [
                "String matching",
                "A control flow construct using match",
                "Regular expressions",
                "Function overloading"
            ],
            correct: 1
        },
        {
            question: "What is the purpose of lifetimes in Rust?",
            options: [
                "To manage memory automatically",
                "To ensure references are valid",
                "To optimize performance",
                "To handle errors"
            ],
            correct: 1
        }
    ],

    html: [
        {
            question: "What does HTML stand for?",
            options: [
                "Hyper Text Markup Language",
                "High Tech Modern Language",
                "Home Tool Markup Language",
                "Hyperlink and Text Markup Language"
            ],
            correct: 0
        },
        {
            question: "Which HTML tag is used to create a hyperlink?",
            options: ["<code>&lt;link&gt;</code>", "<code>&lt;a&gt;</code>", "<code>&lt;href&gt;</code>", "<code>&lt;url&gt;</code>"],
            correct: 1,
            codeExample: `<a href="https://example.com">Click here</a>
<a href="mailto:user@example.com">Send Email</a>
<a href="#section1">Go to Section 1</a>`
        },
        {
            question: "Which tag is used to display images in HTML?",
            options: ["<code>&lt;image&gt;</code>", "<code>&lt;img&gt;</code>", "<code>&lt;picture&gt;</code>", "<code>&lt;src&gt;</code>"],
            correct: 1
        },
        {
            question: "What is the correct HTML for creating a dropdown list?",
            options: [
                "<code>&lt;select&gt;&lt;option&gt;</code>",
                "<code>&lt;dropdown&gt;&lt;list&gt;</code>",
                "<code>&lt;input type='dropdown'&gt;</code>",
                "<code>&lt;list&gt;&lt;option&gt;</code>"
            ],
            correct: 0
        },
        {
            question: "Which HTML attribute specifies an alternate text for an image?",
            options: ["<code>title</code>", "<code>alt</code>", "<code>src</code>", "<code>longdesc</code>"],
            correct: 1
        },
        {
            question: "What is the correct HTML for making a checkbox?",
            options: [
                "<code>&lt;input type='checkbox'&gt;</code>",
                "<code>&lt;checkbox&gt;</code>",
                "<code>&lt;check&gt;</code>",
                "<code>&lt;input type='check'&gt;</code>"
            ],
            correct: 0
        },
        {
            question: "Which HTML tag is used to define an internal style sheet?",
            options: ["<code>&lt;css&gt;</code>", "<code>&lt;style&gt;</code>", "<code>&lt;script&gt;</code>", "<code>&lt;link&gt;</code>"],
            correct: 1
        },
        {
            question: "What is the correct HTML for inserting a line break?",
            options: ["<code>&lt;break&gt;</code>", "<code>&lt;br&gt;</code>", "<code>&lt;lb&gt;</code>", "<code>&lt;newline&gt;</code>"],
            correct: 1
        },
        {
            question: "Which HTML tag is used to define a table?",
            options: ["<code>&lt;table&gt;</code>", "<code>&lt;tab&gt;</code>", "<code>&lt;tbl&gt;</code>", "<code>&lt;grid&gt;</code>"],
            correct: 0
        },
        {
            question: "What does the HTML <code>&lt;head&gt;</code> element contain?",
            options: [
                "The main content of the page",
                "Metadata about the document",
                "The page footer",
                "Navigation links"
            ],
            correct: 1
        }
    ],

    css: [
        {
            question: "What does CSS stand for?",
            options: [
                "Creative Style Sheets",
                "Cascading Style Sheets",
                "Computer Style Sheets",
                "Colorful Style Sheets"
            ],
            correct: 1
        },
        {
            question: "How do you select an element with id 'header' in CSS?",
            options: ["<code>.header</code>", "<code>#header</code>", "<code>*header</code>", "<code>header</code>"],
            correct: 1,
            codeExample: `#header {
    background-color: blue;
    color: white;
    padding: 20px;
}`
        },
        {
            question: "Which property is used to change the background color?",
            options: ["<code>color</code>", "<code>background-color</code>", "<code>bgcolor</code>", "<code>bg-color</code>"],
            correct: 1
        },
        {
            question: "How do you make text bold in CSS?",
            options: [
                "<code>font-weight: bold;</code>",
                "<code>text-style: bold;</code>",
                "<code>font-style: bold;</code>",
                "<code>text-weight: bold;</code>"
            ],
            correct: 0
        },
        {
            question: "Which CSS property controls the text size?",
            options: ["<code>font-style</code>", "<code>text-size</code>", "<code>font-size</code>", "<code>text-style</code>"],
            correct: 2
        },
        {
            question: "How do you select all <code>&lt;p&gt;</code> elements in CSS?",
            options: ["<code>.p</code>", "<code>#p</code>", "<code>p</code>", "<code>*p</code>"],
            correct: 2
        },
        {
            question: "Which property is used to change the left margin of an element?",
            options: ["<code>margin-left</code>", "<code>padding-left</code>", "<code>indent</code>", "<code>left-margin</code>"],
            correct: 0
        },
        {
            question: "What is the correct CSS syntax for making all <code>&lt;h1&gt;</code> elements red?",
            options: [
                "<code>h1 {color: red;}</code>",
                "<code>h1 {text-color: red;}</code>",
                "<code>&lt;h1 style='red'&gt;</code>",
                "<code>h1.color = red;</code>"
            ],
            correct: 0
        },
        {
            question: "Which CSS property is used to create space between the element's border and inner content?",
            options: ["<code>margin</code>", "<code>padding</code>", "<code>spacing</code>", "<code>border-spacing</code>"],
            correct: 1
        },
        {
            question: "How do you make a list that lists its items with squares?",
            options: [
                "<code>list-style-type: square;</code>",
                "<code>list-type: square;</code>",
                "<code>list-style: square;</code>",
                "<code>list: square;</code>"
            ],
            correct: 0
        }
    ],

    swift: [
        {
            question: "What is Swift primarily used for?",
            options: [
                "Web development",
                "iOS and macOS app development",
                "Database management",
                "System administration"
            ],
            correct: 1
        },
        {
            question: "How do you declare a variable in Swift?",
            options: [
                "<code>var name = 'John'</code>",
                "<code>let name = 'John'</code>",
                "Both A and B",
                "<code>variable name = 'John'</code>"
            ],
            correct: 2,
            codeExample: `var mutableName = "John"  // Can be changed
let immutableName = "Jane"  // Cannot be changed
mutableName = "Johnny"  // This works
// immutableName = "Janet"  // This would cause an error`
        },
        {
            question: "What is the difference between <code>var</code> and <code>let</code> in Swift?",
            options: [
                "<code>var</code> is for constants, <code>let</code> is for variables",
                "<code>var</code> is for variables, <code>let</code> is for constants",
                "They are the same",
                "<code>var</code> is for strings, <code>let</code> is for numbers"
            ],
            correct: 1
        },
        {
            question: "How do you create an optional variable in Swift?",
            options: [
                "<code>var name: String?</code>",
                "<code>var name: Optional&lt;String&gt;</code>",
                "Both A and B",
                "<code>var name: String!</code>"
            ],
            correct: 2
        },
        {
            question: "What is nil in Swift?",
            options: [
                "An empty string",
                "Zero value",
                "Absence of a value",
                "An error"
            ],
            correct: 2
        },
        {
            question: "How do you safely unwrap an optional in Swift?",
            options: [
                "<code>if let</code>",
                "<code>guard let</code>",
                "<code>??</code> (nil coalescing)",
                "All of the above"
            ],
            correct: 3
        },
        {
            question: "What is a closure in Swift?",
            options: [
                "A self-contained block of functionality",
                "A class method",
                "A data structure",
                "A loop construct"
            ],
            correct: 0
        },
        {
            question: "How do you define a function in Swift?",
            options: [
                "<code>function myFunc() {}</code>",
                "<code>func myFunc() {}</code>",
                "<code>def myFunc() {}</code>",
                "<code>method myFunc() {}</code>"
            ],
            correct: 1
        },
        {
            question: "What is the correct way to create an array in Swift?",
            options: [
                "<code>var array = [1, 2, 3]</code>",
                "<code>var array: [Int] = []</code>",
                "<code>var array = Array&lt;Int&gt;()</code>",
                "All of the above"
            ],
            correct: 3
        },
        {
            question: "What is a protocol in Swift?",
            options: [
                "A blueprint of methods and properties",
                "A data type",
                "A class inheritance",
                "A function parameter"
            ],
            correct: 0
        }
    ],

    kotlin: [
        {
            question: "What is Kotlin primarily used for?",
            options: [
                "Web development only",
                "Android development and JVM applications",
                "iOS development",
                "Database management"
            ],
            correct: 1
        },
        {
            question: "How do you declare a variable in Kotlin?",
            options: [
                "<code>var name = 'John'</code>",
                "<code>val name = 'John'</code>",
                "Both A and B",
                "<code>variable name = 'John'</code>"
            ],
            correct: 2,
            codeExample: `var mutableName = "John"  // Can be changed
val immutableName = "Jane"  // Cannot be changed
mutableName = "Johnny"  // This works
// immutableName = "Janet"  // This would cause an error`
        },
        {
            question: "What is the difference between <code>var</code> and <code>val</code> in Kotlin?",
            options: [
                "<code>var</code> is mutable, <code>val</code> is immutable",
                "<code>var</code> is immutable, <code>val</code> is mutable",
                "They are the same",
                "<code>var</code> is for classes, <code>val</code> is for functions"
            ],
            correct: 0
        },
        {
            question: "How do you define a function in Kotlin?",
            options: [
                "<code>function myFunc() {}</code>",
                "<code>fun myFunc() {}</code>",
                "<code>def myFunc() {}</code>",
                "<code>method myFunc() {}</code>"
            ],
            correct: 1
        },
        {
            question: "What is null safety in Kotlin?",
            options: [
                "A feature to prevent null pointer exceptions",
                "A debugging tool",
                "A performance optimization",
                "A testing framework"
            ],
            correct: 0
        },
        {
            question: "How do you declare a nullable variable in Kotlin?",
            options: [
                "<code>var name: String</code>",
                "<code>var name: String?</code>",
                "<code>var name: String!</code>",
                "<code>var name: Optional&lt;String&gt;</code>"
            ],
            correct: 1
        },
        {
            question: "What is a data class in Kotlin?",
            options: [
                "A class that holds data with auto-generated methods",
                "A class for database operations",
                "A class for file operations",
                "A class for network operations"
            ],
            correct: 0
        },
        {
            question: "How do you create a list in Kotlin?",
            options: [
                "<code>listOf(1, 2, 3)</code>",
                "<code>mutableListOf(1, 2, 3)</code>",
                "Both A and B",
                "<code>List(1, 2, 3)</code>"
            ],
            correct: 2
        },
        {
            question: "What is the Elvis operator in Kotlin?",
            options: [
                "<code>?:</code>",
                "<code>?.</code>",
                "<code>!!</code>",
                "<code>?</code>"
            ],
            correct: 0
        },
        {
            question: "How do you define a class in Kotlin?",
            options: [
                "<code>class MyClass {}</code>",
                "<code>class MyClass() {}</code>",
                "Both A and B",
                "<code>public class MyClass {}</code>"
            ],
            correct: 2
        }
    ],

    dart: [
        {
            question: "What is Dart primarily used for?",
            options: [
                "Web development only",
                "Mobile app development with Flutter",
                "Desktop applications",
                "All of the above"
            ],
            correct: 3
        },
        {
            question: "How do you declare a variable in Dart?",
            options: [
                "<code>var name = 'John';</code>",
                "<code>String name = 'John';</code>",
                "<code>dynamic name = 'John';</code>",
                "All of the above"
            ],
            correct: 3,
            codeExample: `var name = 'John';        // Type inferred
String name2 = 'Jane';    // Explicit type
dynamic name3 = 'Bob';    // Dynamic type
final name4 = 'Alice';    // Immutable`
        },
        {
            question: "What is the main function in Dart?",
            options: [
                "The entry point of a Dart program",
                "A mathematical function",
                "A UI component",
                "A database function"
            ],
            correct: 0
        },
        {
            question: "How do you create a list in Dart?",
            options: [
                "<code>List&lt;int&gt; numbers = [1, 2, 3];</code>",
                "<code>var numbers = [1, 2, 3];</code>",
                "<code>var numbers = &lt;int&gt;[1, 2, 3];</code>",
                "All of the above"
            ],
            correct: 3
        },
        {
            question: "What is the difference between <code>final</code> and <code>const</code> in Dart?",
            options: [
                "<code>final</code> is runtime constant, <code>const</code> is compile-time constant",
                "<code>final</code> is compile-time constant, <code>const</code> is runtime constant",
                "They are the same",
                "<code>final</code> is for variables, <code>const</code> is for functions"
            ],
            correct: 0
        },
        {
            question: "How do you define a function in Dart?",
            options: [
                "<code>function myFunc() {}</code>",
                "<code>void myFunc() {}</code>",
                "<code>def myFunc() {}</code>",
                "<code>method myFunc() {}</code>"
            ],
            correct: 1
        },
        {
            question: "What is null safety in Dart?",
            options: [
                "A feature to prevent null reference errors",
                "A debugging tool",
                "A performance optimization",
                "A testing framework"
            ],
            correct: 0
        },
        {
            question: "How do you declare a nullable variable in Dart?",
            options: [
                "<code>String name;</code>",
                "<code>String? name;</code>",
                "<code>String! name;</code>",
                "<code>Optional&lt;String&gt; name;</code>"
            ],
            correct: 1
        },
        {
            question: "What is an async function in Dart?",
            options: [
                "A function that runs asynchronously",
                "A function that returns a Future",
                "A function used for handling asynchronous operations",
                "All of the above"
            ],
            correct: 3
        },
        {
            question: "How do you handle exceptions in Dart?",
            options: [
                "<code>try-catch</code>",
                "<code>try-catch-finally</code>",
                "<code>throw</code>",
                "All of the above"
            ],
            correct: 3
        }
    ],

    flutter: [
        {
            question: "What is Flutter?",
            options: [
                "A programming language",
                "A cross-platform UI framework",
                "A database",
                "A web browser"
            ],
            correct: 1
        },
        {
            question: "What language is Flutter built with?",
            options: ["Java", "Kotlin", "Dart", "Swift"],
            correct: 2
        },
        {
            question: "What is a Widget in Flutter?",
            options: [
                "A small application",
                "A building block of the UI",
                "A database table",
                "A network request"
            ],
            correct: 1,
            codeExample: `class MyWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      child: Text('Hello Flutter!'),
    );
  }
}`
        },
        {
            question: "What is the difference between StatelessWidget and StatefulWidget?",
            options: [
                "StatelessWidget can change, StatefulWidget cannot",
                "StatelessWidget cannot change, StatefulWidget can change",
                "They are the same",
                "StatelessWidget is for UI, StatefulWidget is for logic"
            ],
            correct: 1
        },
        {
            question: "How do you create a button in Flutter?",
            options: [
                "<code>ElevatedButton()</code>",
                "<code>TextButton()</code>",
                "<code>OutlinedButton()</code>",
                "All of the above"
            ],
            correct: 3
        },
        {
            question: "What is the <code>build</code> method in Flutter?",
            options: [
                "A method that compiles the app",
                "A method that describes the UI",
                "A method that handles user input",
                "A method that manages state"
            ],
            correct: 1
        },
        {
            question: "How do you navigate between screens in Flutter?",
            options: [
                "<code>Navigator.push()</code>",
                "<code>Navigator.pop()</code>",
                "<code>Navigator.pushReplacement()</code>",
                "All of the above"
            ],
            correct: 3
        },
        {
            question: "What is <code>setState()</code> used for in Flutter?",
            options: [
                "To update the UI when state changes",
                "To create a new state",
                "To delete the current state",
                "To save state to database"
            ],
            correct: 0
        },
        {
            question: "What is a <code>Scaffold</code> in Flutter?",
            options: [
                "A basic layout structure",
                "A navigation component",
                "A state management tool",
                "A database connection"
            ],
            correct: 0
        },
        {
            question: "How do you handle user input in Flutter?",
            options: [
                "<code>TextField</code>",
                "<code>TextFormField</code>",
                "<code>GestureDetector</code>",
                "All of the above"
            ],
            correct: 3
        }
    ]
};

// Language display names
const languageNames = {
    javascript: "JavaScript",
    python: "Python",
    java: "Java",
    cpp: "C++",
    csharp: "C#",
    php: "PHP",
    react: "React",
    nodejs: "Node.js",
    go: "Go",
    rust: "Rust",
    html: "HTML",
    css: "CSS",
    swift: "Swift",
    kotlin: "Kotlin",
    dart: "Dart",
    flutter: "Flutter"
};