const courses = [
  {
    id: 1,
    title: "React Mastery",
    description: "Learn React from scratch",
    instructor: "Busayo",
    enrolled: false,
    studentCount: 0,
    progress: 0,
    lessons: [
      { 
        title: "Introduction to React", 
        video: "https://www.youtube.com/embed/Tn6-PIqc4UM",
        quiz: [
          {
          question: "What is React mainly used for?",
          options: ["Building user interfaces", "Managing relational databases", "Styling web page layouts"],
          correctAnswer: "Building user interfaces"
        },
        {
            question: "What language is React primarily built with?",
            options: ["Python", "JavaScript", "C++", "Java"],
            correctAnswer: "JavaScript"
        },
        {
            question: "What component structure does modern React favor?",
            options: ["Class Components", "Functional Components", "Object Modules"],
            correctAnswer: "Functional Components"
        }
      ]
      },
      { 
        title: "Components", 
        video: "https://www.youtube.com/embed/Y2hgEGPzTZY",
        quiz: [
          {
          question: "Which of the following best describes a React Component?",
          options: ["A built-in HTML tag", "A reusable, independent piece of UI code", "A CSS style stylesheet hook"],
          correctAnswer: "A reusable, independent piece of UI code"
          },
          {
            question: "React component names must always begin with a Capital Letter.",
            options: ["True", "False"],
            correctAnswer: "True"
          },
          {
            question: "What must every React component return?",
            options: ["A link reference string", "User Interface syntax (JSX)", "An array map data loop"],
            correctAnswer: "User Interface syntax (JSX)"
          }
      ]
      },
      { 
        title: "Props", 
        video: "https://www.youtube.com/embed/PHaECbrKgs0",
        quiz: {
          question: "How do components receive data via Props?",
          options: ["Props are editable from inside the child component", "Props are passed down from a parent component and are read-only", "Props are fetched directly from a backend database"],
          correctAnswer: "Props are passed down from a parent component and are read-only"
        }
      },
      { 
        title: "State", 
        video: "https://www.youtube.com/embed/O6P86uwfdR0",
        quiz: {
          question: "Unlike props, component State is meant to be:",
          options: ["Completely static and immutable", "Handled outside of JavaScript execution", "Local and mutable data that changes over time"],
          correctAnswer: "Local and mutable data that changes over time"
        }
      },
      { 
        title: "useEffect", 
        video: "https://www.youtube.com/embed/0ZJgIjIuY7U",
        quiz: {
          question: "What is the primary purpose of the useEffect hook?",
          options: ["To perform side effects like fetching data or setting timers", "To create a brand new HTML layout string", "To handle user click events natively"],
          correctAnswer: "To perform side effects like fetching data or setting timers"
        }
      }
    ]
  },
  {
    id: 2,
    title: "JavaScript Fundamentals",
    description: "Master the language of the web",
    instructor: "Daniel",
    enrolled: false,
    studentCount: 0,
    progress: 0,
    lessons: [
      { 
        title: "Introduction to JavaScript", 
        video: "https://www.youtube.com/embed/W6NZfCO5SIk",
        quiz: {
          question: "Which HTML element do we use to link an external JavaScript file?",
          options: ["<link>", "<javascript>", "<script>"],
          correctAnswer: "<script>"
        }
      },
      { 
        title: "Variables", 
        video: "https://www.youtube.com/embed/9M4XKi25I2M",
        quiz: {
          question: "Which keyword allows you to declare a variable that CANNOT be reassigned?",
          options: ["var", "const", "let"],
          correctAnswer: "const"
        }
      },
      { 
        title: "Functions", 
        video: "https://www.youtube.com/embed/N8ap4k_1QEQ",
        quiz: {
          question: "How do you call/execute a function named 'myFunction'?",
          options: ["call myFunction();", "myFunction[];", "myFunction();"],
          correctAnswer: "myFunction();"
        }
      },
      { 
        title: "Arrays", 
        video: "https://www.youtube.com/embed/oigfaZ5ApsM",
        quiz: {
          question: "What index number does a JavaScript array start counting from?",
          options: ["0", "1", "-1"],
          correctAnswer: "0"
        }
      },
      { 
        title: "Objects", 
        video: "https://www.youtube.com/embed/X0ipw1k7ygU",
        quiz: {
          question: "JavaScript objects store data sets as collections of what?",
          options: ["Key-value pairs", "Ordered sequential indexes", "Boolean conditions"],
          correctAnswer: "Key-value pairs"
        }
      }
    ]
  },
  {
    id: 3,
    title: "CSS Masterclass",
    description: "Build beautiful interfaces",
    instructor: "Shola",
    enrolled: false,
    studentCount: 0,
    progress: 0,
    lessons: [
      { 
        title: "Introduction to CSS", 
        video: "https://www.youtube.com/embed/yfoY53QXEnI",
        quiz: {
          question: "What does CSS stand for?",
          options: ["Computer Style Sheets", "Cascading Style Sheets", "Creative System Styling"],
          correctAnswer: "Cascading Style Sheets"
        }
      },
      { 
        title: "Selectors", 
        video: "https://www.youtube.com/embed/l1mER1bV0N0",
        quiz: {
          question: "Which CSS rule target will apply styles to every 🌟 element on a page?",
          options: ["The element type selector (e.g., p)", "The universal selector (*)", "The class selector (.element)"],
          correctAnswer: "The universal selector (*)"
        }
      },
      { 
        title: "Classes and IDs", 
        video: "https://www.youtube.com/embed/1PnVor36_40",
        quiz: {
          question: "What symbol is used to target a Class selector name in a CSS stylesheet?",
          options: ["The dot character (.)", "The hashtag character (#)", "The colon character (:)"],
          correctAnswer: "The dot character (.)"
        }
      },
      { 
        title: "Flexbox", 
        video: "https://www.youtube.com/embed/JJSoEo8JSnc",
        quiz: {
          question: "Which Flexbox property aligns container items along the main horizontal axis?",
          options: ["align-items", "flex-direction", "justify-content"],
          correctAnswer: "justify-content"
        }
      },
      { 
        title: "CSS Grid", 
        video: "https://www.youtube.com/embed/9zBsdzdE4sM",
        quiz: {
          question: "Which property is used to explicitly define the columns of a grid layout?",
          options: ["grid-template-columns", "grid-column-gap", "grid-auto-flow"],
          correctAnswer: "grid-template-columns"
        }
      }
    ]
  }
];

export default courses;


/*const courseData = [
  {
    id: 1,
    title: "React Mastery",
    description: "Learn React from scratch",
    instructor: "Busayo",
    enrolled: false,
    studentCount: 0,
    progress: 0,
    lessons: [
      {
        title: "Introduction to React",
        video: "https://www.youtube.com/embed/Tn6-PIqc4UM",
        quiz: [
          {
            question: "What language is React primarily built with?",
            options: ["Python", "JavaScript", "C++", "Java"],
            correctAnswer: "JavaScript"
          },
          {
            question: "What component structure does modern React favor?",
            options: ["Class Components", "Functional Components", "Object Modules"],
            correctAnswer: "Functional Components"
          }
        ]
      },
      {
        title: "Components",
        video: "https://www.youtube.com/embed/Y2hgEGPzTZY",
        quiz: [
          {
            question: "React component names must always begin with a Capital Letter.",
            options: ["True", "False"],
            correctAnswer: "True"
          },
          {
            question: "What must every React component return?",
            options: ["A link reference string", "User Interface syntax (JSX)", "An array map data loop"],
            correctAnswer: "User Interface syntax (JSX)"
          }
        ]
      }
    ]
  }
];

export default courseData;*/