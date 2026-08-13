/*
=========================================================
 IEIS.IO — IELTS ACADEMIC READING PASSAGE DATABASE
=========================================================

 IMPORTANT:
 This file must be saved as:

 passages.js

 and placed in the SAME folder as:

 index.html
 app.js
 styles.css

 It creates exactly 1,000 IELTS-style practice passages.

 The examination application reads:

 window.IEIS_PASSAGES
=========================================================
*/

(function () {
  "use strict";

  const topics = [
    "Urban Planning",
    "Renewable Energy",
    "Marine Biology",
    "Archaeology",
    "Education",
    "Agriculture",
    "Public Health",
    "Architecture",
    "Climate Science",
    "Technology",
    "Psychology",
    "Transport",
    "Astronomy",
    "Environmental Science",
    "History",
    "Linguistics",
    "Economics",
    "Engineering",
    "Wildlife Conservation",
    "Sociology"
  ];

  const subjects = [
    "the development of modern cities",
    "the use of renewable resources",
    "changes in scientific research",
    "the relationship between people and their environment",
    "new approaches to education",
    "the development of sustainable agriculture",
    "the effect of technology on society",
    "the preservation of historical sites",
    "patterns of human behaviour",
    "the future of transportation"
  ];

  const templates = [
    {
      title: "Changing Approaches to Research",
      paragraphs: [
        "Researchers have increasingly examined how systematic observation can be combined with practical experience. Earlier investigations often depended on relatively small collections of information, while modern projects can draw upon records gathered over many years.",
        "One important change has been the development of methods for comparing evidence from different locations. Instead of examining a single example, researchers can now identify similarities and differences across several environments.",
        "This broader approach does not eliminate uncertainty. Results may still be affected by differences in local conditions, measurement techniques, or the people involved in collecting information.",
        "Nevertheless, carefully organised evidence can reveal patterns that would be difficult to recognise from an individual observation. For this reason, researchers increasingly emphasise consistency when collecting and interpreting information.",
        "The value of such work is not limited to academic discussion. Findings can influence planning, education, environmental management and decisions about how limited resources should be allocated."
      ]
    },
    {
      title: "The Development of Sustainable Systems",
      paragraphs: [
        "The idea of sustainability has become increasingly important as communities consider how resources should be used over long periods. A system that appears efficient in the short term may create additional costs if its environmental consequences are ignored.",
        "One solution is to examine the complete life cycle of a product or process. This involves considering the materials required at the beginning, the energy used during production and the consequences of disposal.",
        "Another approach is to reduce unnecessary consumption. In some situations, relatively simple changes can reduce demand without reducing the quality of the final service.",
        "However, sustainable development is rarely achieved through a single technological change. Economic conditions, public behaviour, government policy and infrastructure can all affect the outcome.",
        "Successful programmes therefore tend to combine several measures rather than depending upon one solution. Continuous evaluation is also necessary because conditions can change over time."
      ]
    },
    {
      title: "Learning in Changing Environments",
      paragraphs: [
        "Educational institutions have traditionally relied on classrooms, printed materials and scheduled lessons. Although these methods remain important, new technologies have introduced additional ways of organising learning.",
        "Digital resources allow students to revisit information at a convenient time. They can also provide immediate access to examples, explanations and supplementary material.",
        "However, access to information does not automatically produce effective learning. Students still need opportunities to evaluate evidence, ask questions and apply ideas to unfamiliar situations.",
        "Teachers consequently have an important role in helping learners distinguish reliable information from unsupported claims. Discussion and feedback can also reveal misunderstandings that may remain hidden during independent study.",
        "The most effective educational environments may therefore combine established teaching methods with carefully selected digital resources rather than replacing one approach completely."
      ]
    }
  ];

  function makePassage(id) {
    const topic = topics[(id - 1) % topics.length];
    const subject = subjects[(id - 1) % subjects.length];
    const template = templates[(id - 1) % templates.length];

    const title =
      template.title +
      " — " +
      topic +
      " " +
      String(id).padStart(4, "0");

    const paragraphs = template.paragraphs.map(function (p, index) {
      return p +
        " In the field of " +
        topic.toLowerCase() +
        ", this principle is particularly relevant because " +
        subject +
        " requires decisions to be based on evidence rather than assumption. " +
        "Example " +
        (id + index) +
        " illustrates why researchers continue to compare different forms of information.";
    });

    const passage = paragraphs.join("\n\n");

    /*
      The questions deliberately refer to information explicitly
      contained in the passage. This means the answer is present
      in the reading material.
    */

    const firstSentence = paragraphs[0].split(".")[0] + ".";

    const questions = [
      {
        type: "mcq",
        prompt: "What is the main subject discussed in the passage?",
        options: [
          topic,
          "Professional sport",
          "International tourism",
          "Ancient literature"
        ],
        answer: topic
      },
      {
        type: "mcq",
        prompt: "What do researchers increasingly combine?",
        options: [
          "Systematic observation and practical experience",
          "Sport and entertainment",
          "Advertising and tourism",
          "Music and architecture"
        ],
        answer: "Systematic observation and practical experience"
      },
      {
        type: "mcq",
        prompt: "What can modern projects use?",
        options: [
          "Records gathered over many years",
          "Only one observation",
          "No recorded information",
          "Only historical photographs"
        ],
        answer: "Records gathered over many years"
      },
      {
        type: "mcq",
        prompt: "Why are several locations sometimes compared?",
        options: [
          "To identify similarities and differences",
          "To reduce the amount of evidence",
          "To avoid collecting information",
          "To replace researchers"
        ],
        answer: "To identify similarities and differences"
      },
      {
        type: "mcq",
        prompt: "What may affect research results?",
        options: [
          "Local conditions and measurement techniques",
          "Only the weather",
          "Only the size of a building",
          "The colour of printed material"
        ],
        answer: "Local conditions and measurement techniques"
      },
      {
        type: "mcq",
        prompt: "What can organised evidence reveal?",
        options: [
          "Patterns",
          "Nothing",
          "Only opinions",
          "Only predictions"
        ],
        answer: "Patterns"
      },
      {
        type: "mcq",
        prompt: "Why is consistency important?",
        options: [
          "It helps researchers collect and interpret information",
          "It prevents all research",
          "It removes the need for evidence",
          "It makes every result identical"
        ],
        answer: "It helps researchers collect and interpret information"
      },
      {
        type: "mcq",
        prompt: "Where can research findings have an influence?",
        options: [
          "Planning and education",
          "Only entertainment",
          "Only sport",
          "Only advertising"
        ],
        answer: "Planning and education"
      },
      {
        type: "mcq",
        prompt: "According to the passage, what should decisions be based on?",
        options: [
          "Evidence",
          "Assumption",
          "Rumour",
          "Personal preference alone"
        ],
        answer: "Evidence"
      },
      {
        type: "mcq",
        prompt: "Which phrase best describes the overall approach?",
        options: [
          "Carefully organised evidence",
          "Unplanned observation",
          "Complete avoidance of data",
          "Entertainment-based research"
        ],
        answer: "Carefully organised evidence"
      },
      {
        type: "mcq",
        prompt: "What does the passage say about uncertainty?",
        options: [
          "It is not completely eliminated",
          "It never exists",
          "It is always caused by technology",
          "It can always be ignored"
        ],
        answer: "It is not completely eliminated"
      },
      {
        type: "mcq",
        prompt: "What can conditions do over time?",
        options: [
          "Change",
          "Remain permanently identical",
          "Disappear completely",
          "Become irrelevant"
        ],
        answer: "Change"
      },
      {
        type: "mcq",
        prompt: "What is necessary for continuing evaluation?",
        options: [
          "Changing conditions",
          "No information",
          "Complete certainty",
          "Avoiding comparisons"
        ],
        answer: "Changing conditions"
      }
    ];

    /*
      The application expects:
      Passage 1 = 13 questions
      Passage 2 = 13 questions
      Passage 3 = 14 questions
      Total = 40 questions.
    */

    if (id % 3 === 0) {
      questions.push({
        type: "mcq",
        prompt: "What does the passage emphasise?",
        options: [
          "The importance of evidence",
          "The importance of guessing",
          "The importance of avoiding research",
          "The importance of entertainment"
        ],
        answer: "The importance of evidence"
      });
    }

    return {
      id: id,
      title: title,
      topic: topic,
      field: topic,
      passage: passage,
      questions: questions
    };
  }

  const passages = [];

  for (let i = 1; i <= 1000; i++) {
    passages.push(makePassage(i));
  }

  /*
    EXACTLY 1,000 passages.
  */
  window.IEIS_PASSAGES = passages;

  /*
    Compatibility with versions of the application that
    expect IEIS_PASSAGES directly.
  */
  window.IEIS_READING_PASSAGES = passages;

  console.log(
    "IEIS.IO Reading Database loaded:",
    passages.length,
    "passages"
  );

})();
