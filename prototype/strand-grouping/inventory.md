# Grade 1–12 math topic inventory

A flat list of every math topic a worksheet could drill from grade 1 to grade 12, drafted for ticket #4 under map #1 "Map: grade 1–12 math topic tree". A **topic** is one thing a single generator with a ladder of levels could produce (for example "Adding fractions" or "Area of triangles"): smaller than a strand, bigger than one standard.

- **Grouping is not decided.** The "area" and "source section" headings below are provenance only: they say where in the public-curricula research (`research/public-math-curricula.md`, sections 3–8) a topic came from. They are not a proposed tree.
- **Grades are reference only**, not tags. They record where the sources place the skill after age alignment (G1 = age 6–7), with the source codes in brackets: CCSS, England (Eng, Year = grade + 1), Cambridge (Cam), IB, and Cambodia's Ministry of Education, Youth and Sport (MoEYS).
- **Sources.** Main: `research/public-math-curricula.md` (branch `research/public-math-curricula`). Cross-check: `research/moeys-math-curriculum.md` (branch `research/moeys-math-curriculum`). Shape guidance (depth 4: strand → sub-strand → topic → level; grade as a tag) comes from `research/curriculum-tree-structures.md`, which is why rows here are sized as topics with level ladders.
- **Today's app topics** (`src/core/exercises/arithmetic.ts`, `src/core/exercises/fraction.ts`) are marked in the "Existing topic" column; see [Existing app topics](#existing-app-topics).

## Legend: checkability

The app's answer types today (`src/core/problem.ts` `Answer`): **Decimal** (one number, decimals allowed), **Fraction** (lowest terms; simplest, mixed or improper form), **Remainder** (quotient + remainder), **Comparison** (< = >). Questions are built from Num, Frac, Op and Blank tokens only.

| Mark | Meaning |
|---|---|
| **buildable-now** | The answer fits one of the four existing answer types exactly. The note says when the *question* still needs something new (word-problem templates, superscripts, a table) or when levels must avoid negative answers. |
| **new-answer-type** | Can be generated and checked automatically, but needs an answer type (or question capability) the app lacks. The "Answer type" column names it; the [New answer types needed](#new-answer-types-needed) section groups them. |
| **owner-todo** | Cannot reasonably be generated *and* checked automatically: proofs, explanations, constructions, open investigations, data collection, hands-on measuring. Kept as the owner's to-do list. |

Two code facts shape many marks:

1. **Negative numbers cannot be typed.** `maskDecimal` in `src/core/entry.ts` keeps only digits, `.` and `,`, although `src/core/check.ts` accepts a leading minus. Topics that are *about* signed numbers are marked new-answer-type ("Signed number"); other buildable-now topics keep their levels non-negative and say so in the note.
2. **Trailing zeros are dropped** by the Decimal checker, so "3.40 to 3 s.f." cannot be told apart from 3.4. Rounding topics are buildable-now only where trailing zeros do not matter.

## Summary

623 topics: 301 buildable-now, 278 new-answer-type, 44 owner-todo. The completeness check added 2 topics; 17 rows absorb duplicates from the three drafts.

| Area (provenance) | buildable-now | new-answer-type | owner-todo | Total |
|---|---:|---:|---:|---:|
| Number | 127 | 60 | 7 | 194 |
| Algebra and functions | 39 | 92 | 7 | 138 |
| Geometry and measures | 61 | 67 | 17 | 145 |
| Statistics and probability | 43 | 24 | 8 | 75 |
| Calculus and numerical methods | 20 | 33 | 4 | 57 |
| Mechanics | 11 | 2 | 1 | 14 |
| **Total** | **301** | **278** | **44** | **623** |

New answer types (and question capabilities) needed, by number of new-answer-type topics that name them. A topic can need more than one, so the column does not add up to 278.

| Needed type | Topics |
|---|---:|
| [Multiple choice](#multiple-choice) | 66 |
| [Diagram in the question](#diagram-in-the-question) | 56 |
| [Algebraic expression](#algebraic-expression) | 56 |
| [Set of numbers or solutions](#set-of-numbers-or-solutions) | 30 |
| [Coordinate pair or triple](#coordinate-pair-or-triple) | 29 |
| [Drawn or plotted answer](#drawn-or-plotted-answer) | 18 |
| [Interval or inequality](#interval-or-inequality) | 17 |
| [Equation (line, curve, plane, differential equation)](#equation-line-curve-plane-differential-equation) | 16 |
| [Several numbers](#several-numbers) | 10 |
| [Signed number](#signed-number) | 9 |
| [Surd or exact form](#surd-or-exact-form) | 9 |
| [Number within a tolerance](#number-within-a-tolerance) | 8 |
| [Complex number](#complex-number) | 8 |
| [Time hh:mm or duration](#time-hhmm-or-duration) | 7 |
| [Vector](#vector) | 6 |
| [Multiple of π](#multiple-of-) | 4 |
| [Matrix](#matrix) | 4 |
| [Ordered list](#ordered-list) | 3 |
| [Signed fraction](#signed-fraction) | 2 |
| [Standard form](#standard-form) | 2 |
| [Ratio a:b](#ratio-ab) | 2 |
| [Text entry](#text-entry) | 2 |
| [Structured table](#structured-table) | 2 |
| [Compound measure](#compound-measure) | 1 |
| [Recurring decimal](#recurring-decimal) | 1 |
| [Polar / modulus-argument form](#polar--modulus-argument-form) | 1 |
| [Number or ±∞](#number-or-) | 1 |
| [Product of prime powers](#product-of-prime-powers) | 1 |
| [Polynomial quotient + remainder](#polynomial-quotient--remainder) | 1 |
| [Number checked against a rule](#number-checked-against-a-rule) | 1 |
| [Structured transformation description](#structured-transformation-description) | 1 |

## Inventory

Ordered by provenance area, then source section, then roughly by the first grade that teaches the topic.

### Number

#### 3.1 Counting, number names, place value

| Topic | Description | Example | Grades | Check | Answer type | Existing topic | Note |
|---|---|---|---|---|---|---|---|
| Counting objects (how many?) | Count a picture of objects or a dot pattern and give the total. | How many stars? (picture of 8 stars) | K–G1 (Cam St1/K, Eng Y1/K, MoEYS G1 U3, U5, U6) | new-answer-type | number, but the question needs a picture or dot-pattern diagram |  | Mostly before G1 in public curricula; MoEYS teaches counting 1–5 and 0–10 in G1. |
| Whole numbers on a number line | Read the number at a marked point, or place a number on a line marked in 1s, 10s or 100s. | What number is the arrow pointing to? (line from 300 to 400 marked in 10s) | K–G2 (CCSS 2.MD.6, Eng Y1–Y2, Cam St1, St3, MoEYS G1 U6) | new-answer-type | number line diagram in the question; the answer is a number |  | Placing a number on the line needs a drawn answer. |
| Estimating a quantity | Estimate how many objects there are, or estimate a number as a range, then check. | About how many beans are in the jar? (picture) | K–G3 (Eng Y2–Y4, Cam St1, St3, MoEYS G1 U10) | new-answer-type | number within a tolerance, with a picture in the question |  | Hands-on estimate-and-check with real objects is the owner's to-do. |
| Ordinal numbers | Use first to tenth (and beyond) to describe position in a line. | The cat is 3rd in the line. Which animal is 5th? (picture) | K–G2 (Cam St1, MoEYS G1 U12, G2 U1) | new-answer-type | multiple choice or ordinal word, with a picture |  | Not in CCSS or the England statements read. |
| Counting forwards and backwards; number before, after, between | Continue or fill gaps in a counting sequence to 120, forwards or backwards. | Fill in: 47, 48, __, 50. What number comes just before 80? | G1 (CCSS 1.NBT.1, Eng Y1–Y2, Cam St1, MoEYS G1 U3, U5, U8) | buildable-now | number (Decimal) |  |  |
| Writing numbers in words | Write a numeral in words (to 20, then 100, 1000, larger). | Write 345 in words. | G1–G4 (Eng Y1 words 1–20, Y2 to 100; Cam St1; MoEYS G2 U23 to 1,000) | new-answer-type | number words (text entry with language-specific matching, Khmer and English) |  | Going the other way (words to numeral) is buildable now with a number answer. |
| Reading numbers given in words | Write the numeral for a number given in words. | Write as a number: three hundred and forty-five. | G1–G5 (CCSS 1.NBT.1, Eng Y2–Y6, MoEYS G2 U23) | buildable-now | number (Decimal) |  | Question needs word text in the prompt; a Num token can carry it. |
| Khmer numerals and Hindu-Arabic numerals | Convert between Khmer digits and Western (Hindu-Arabic) digits for 1–10, then two- and three-digit numbers. | Write ១២៥ with Western digits. | G1–G2 (MoEYS G1 U6, G2 U5, U6) | buildable-now | number (Decimal) for Khmer to Western |  | MoEYS only. The reverse direction (type Khmer digits) needs Khmer-digit input, a new answer type. |
| Skip counting | Count in steps of 2, 3, 4, 5, 10, then 6, 7, 8, 9, 25, 50, 100, 1000 and fill the missing terms. | Count by 5s: 35, 40, __, __, 55. | G1–G3 (CCSS 2.NBT.2, Eng Y2–Y4, Cam St3, MoEYS G1 U11, G2 U1, U10, U22) | buildable-now | number (Decimal), one per blank |  | Merged: the Number and Algebra drafts both had this row. Several blanks per item need several Decimal boxes. |
| 1, 10, 100, 1000 more or less | Find the number that is 1, 10, 100 or 1000 more or less than a given number. | What is 100 more than 2,467? | G1–G3 (CCSS 1.NBT.5, 2.NBT.8, Eng Y3–Y4, Cam St1, St3, MoEYS G1 U8) | buildable-now | number (Decimal) |  |  |
| Two-digit place value (tens and ones) | Tell how many tens and ones are in a two-digit number, or build the number from tens and ones. | How many tens are in 47? 6 tens and 3 ones = ? | G1 (CCSS 1.NBT.2, Eng Y2, Cam St1, MoEYS G1 U8) | buildable-now | number (Decimal) |  |  |
| Comparing whole numbers with <, = and > | Compare two whole numbers using the symbols. | 4,089 __ 4,098 | G1–G4 (CCSS 1.NBT.3, 2.NBT.4, 4.NBT.2, Eng Y2–Y4, Cam St3, St5, MoEYS G1 U6, U11, G2 U1) | buildable-now | comparison (< = >) |  | Cambridge IGCSE C1.5/E1.5 extends to ≠, ≤, ≥ (G9–10). |
| Ordering whole numbers | Put a list of numbers in ascending or descending order. | Order from smallest: 507, 570, 75, 705, 57. | G1–G4 (Eng Y2–Y4, Cam St3, St5, MoEYS G1 U11, G2 U1) | new-answer-type | ordered list of numbers |  |  |
| Odd and even numbers | Say whether a number is odd or even; reason about sums of odd and even numbers. | Is 347 odd or even? Is odd + odd odd or even? | G1–G4 (CCSS 2.OA.3, Eng Y2, Cam St1, St5, MoEYS G2 U1) | new-answer-type | multiple choice (odd/even) |  | Explaining why a statement about odd/even sums is always true is owner-todo. |
| Sorting and classifying objects | Sort objects by an attribute; find the one that does not belong; compare group sizes. | Which shape does not belong? (picture) | G1 (MoEYS G1 U1) | new-answer-type | multiple choice with pictures |  | MoEYS only. Could equally sit with data; physical sorting activities are owner-todo. |
| Three-digit place value and expanded form | Value of a digit in a three-digit number; write a number from its expanded form. | 300 + 40 + 7 = ? What is the value of the 4 in 482? | G2 (CCSS 2.NBT.1, 2.NBT.3, Eng Y3, Cam St3, MoEYS G2 U1) | buildable-now | number (Decimal) |  | Writing a number in expanded form (the reverse) needs an expression/sum answer type. |
| Rounding whole numbers | Round to the nearest 10, 100, 1000, 100,000 or any place. | Round 4,862 to the nearest hundred. | G2–G5 (CCSS 3.NBT.1, 4.NBT.3, Eng Y4–Y6, Cam St3, St5, MoEYS G2 U1) | buildable-now | number (Decimal) |  | Timing: Cambridge St3 (G2) and MoEYS G2 are a year before CCSS G3. |
| Roman numerals | Read and write Roman numerals I–XII, then to C and M. | Write XLVII as a number. Write 94 in Roman numerals. | G2–G4 (Eng Y3 I–XII, Y4 to C, Y5 to M) | new-answer-type | Roman numeral text entry (Roman to number is buildable now) |  | England only in the sources read. |
| Multi-digit place value to millions | Read and write numbers to 1,000,000 and 10,000,000 and beyond; value of a digit; each place is ten times the place to its right. | What is the value of the 7 in 3,472,015? | G3–G6 (CCSS 4.NBT.1–2, Eng Y4–Y6, Cam St5, MoEYS G3 U1, G4 U1, G5 U1, G6 U1, G7 whole numbers) | buildable-now | number (Decimal) |  |  |

#### 3.2 Addition and subtraction

| Topic | Description | Example | Grades | Check | Answer type | Existing topic | Note |
|---|---|---|---|---|---|---|---|
| Number bonds and missing-number equations (+ and −) | Find the missing part in an addition or subtraction equation, with the unknown in any position. | 7 + __ = 10;  __ − 9 = 7;  15 = 6 + __ | K–G2 (CCSS 1.OA.4, 1.OA.8, Eng Y1–Y2, Cam St1, MoEYS G1 U7) | buildable-now | number (Decimal) in a Blank slot |  |  |
| Addition facts within 10 and 20 | Recall single-digit sums, sums up to 20, including adding zero. | 7 + 8 = ? | G1–G2 (CCSS 1.OA.6, 2.OA.2, Eng Y1–Y2, MoEYS G1 U7, U14, U16, G2 U2) | buildable-now | number (Decimal) |  | Covered by level 1 of the app's 'add' topic. England expects recall a year before CCSS. |
| Subtraction facts within 10 and 20 | Recall differences of numbers within 20, including subtracting zero. | 15 − 8 = ? | G1–G2 (CCSS 1.OA.6, 2.OA.2, Eng Y1–Y2, MoEYS G1 U7, U15, U16) | buildable-now | number (Decimal) |  | Covered by level 1 of the app's 'subtract' topic. |
| True or false equations (meaning of the equals sign) | Decide whether an equation such as 6 = 6, 7 = 8 − 1 or 5 + 2 = 2 + 5 is true. | True or false: 4 + 5 = 3 + 6 | G1 (CCSS 1.OA.7, Eng Y1, Y5, Cam St1) | new-answer-type | true/false (multiple choice) |  |  |
| Properties of addition (commutative, associative) | Use order and grouping of addends to fill a blank; know subtraction is not commutative. | 8 + 5 = 5 + __;  (6 + 4) + 7 = 6 + (__ + 7) | G1–G2 (CCSS 1.OA.3, Eng Y2, MoEYS G1 U14) | buildable-now | number (Decimal) in a Blank slot |  | Naming the property needs multiple choice. |
| Fact families and inverse of addition/subtraction | Use the inverse to find unknown addends and to check answers. | If 9 + 6 = 15, what is 15 − 6? | G1–G3 (CCSS 1.OA.4, Eng Y2–Y4) | buildable-now | number (Decimal) |  |  |
| Adding three or more numbers | Add three one-digit numbers, then up to four two-digit numbers. | 4 + 7 + 6 = ?;  23 + 45 + 17 + 30 = ? | G1–G2 (CCSS 1.OA.2, 2.NBT.6, Eng Y2) | buildable-now | number (Decimal) |  |  |
| Mental addition and subtraction strategies | Make ten, near doubles, add/subtract ones, tens or hundreds mentally. | 38 + 40 = ?;  246 + 300 = ? | G1–G4 (CCSS 1.OA.5–6, 1.NBT.6, 2.NBT.8, Eng Y2–Y5, MoEYS G2 U2) | buildable-now | number (Decimal) |  | Only the result is checked; the strategy itself is not. |
| Add and subtract within 100 | Two-digit plus/minus one- and two-digit numbers using place value. | 46 + 37 = ?;  83 − 47 = ? | G1–G2 (CCSS 1.NBT.4, 2.NBT.5, Eng Y2, MoEYS G2 U2, U3) | buildable-now | number (Decimal) |  | Covered by level 2 of the app's 'add' and 'subtract' topics. |
| One-step addition and subtraction word problems | Add to, take from, put together, compare problems with the unknown in any position. | Dara has 23 marbles and gets 18 more. How many now? | G1–G2 (CCSS 1.OA.1, 2.OA.1, Eng Y1–Y2) | buildable-now | number (Decimal) |  | Needs word-problem templates, which the generator lacks today. |
| Add and subtract within 1000 | Three-digit additions and subtractions with models or strategies. | 358 + 276 = ?;  612 − 378 = ? | G2–G3 (CCSS 2.NBT.7, 3.NBT.2, Eng Y3, MoEYS G2 U8, U12–U14) | buildable-now | number (Decimal) |  | Covered by level 3 of 'add' and 'subtract'. |
| Column addition of multi-digit whole numbers | Standard column algorithm for addition with carrying, up to 4, 5 or more digits. | 4,829 + 3,756 = ? | G2–G5 (CCSS 4.NBT.4, Eng Y3–Y5, MoEYS G2 U12–U13, G3 U2, G4 U2) | buildable-now | number (Decimal) | `add` | Timing: England requires the column method in G2 (Y3), CCSS names the standard algorithm in G4. App 'add' also has 1-digit, 2-digit and decimal levels. |
| Column subtraction of multi-digit whole numbers | Standard column algorithm for subtraction with exchanging, up to 4, 5 or more digits. | 7,204 − 3,568 = ? | G2–G5 (CCSS 4.NBT.4, Eng Y3–Y5, MoEYS G2 U14, G3 U3, G4 U3) | buildable-now | number (Decimal) | `subtract` | Same timing gap as column addition. App 'subtract' also has 1-digit, 2-digit and decimal levels. |
| Multi-step word problems with the four operations | Problems needing two or more of the four operations with whole numbers; choosing the operations. | A box holds 24 pens. 3 boxes are bought and 17 pens are given away. How many are left? | G2–G5 (CCSS 2.OA.1, 3.OA.8, 4.OA.3, Eng Y4–Y6) | buildable-now | number (Decimal) |  | Merged: the drafts had 'Two-step and multi-step word problems' (3.2) and 'Mixed four-operation word problems' (3.3). Needs word-problem templates. |
| Estimating sums and differences to check | Round the numbers first, then estimate the answer to judge reasonableness. | Estimate 487 + 312 by rounding each to the nearest hundred. | G2–G5 (CCSS 3.OA.8, Eng Y3, Y5, Y6, MoEYS G1 U16 check) | buildable-now | number (Decimal) |  | The rounding rule must be stated so the estimate is unique. |
| Explaining why addition and subtraction strategies work | Explain a strategy using place value and properties. | Explain why 52 − 19 is the same as 53 − 20. | G2 (CCSS 2.NBT.9) | owner-todo | - |  |  |

#### 3.3 Multiplication and division

| Topic | Description | Example | Grades | Check | Answer type | Existing topic | Note |
|---|---|---|---|---|---|---|---|
| Equal groups, arrays and repeated addition | Link groups and arrays to multiplication; write a repeated addition as a product. | 4 groups of 3 = ?;  5 + 5 + 5 = __ × 5 | K–G2 (CCSS 2.OA.4, Eng Y1–Y2, Cam St1, MoEYS G2 U7) | buildable-now | number (Decimal) |  | Array/picture versions need a diagram in the question. |
| Doubling and halving | Double numbers and halve even numbers. | Double 36. Half of 58? | K–G3 (Cam St1, Eng Y2 ff.) | buildable-now | number (Decimal) |  |  |
| Repeating patterns of shapes and colours | Continue a repeating pattern of shape, colour or size, or find the missing element. | Red, blue, blue, red, blue, blue, __ ? | G1–G3 (Eng Y2, MoEYS G1 U4, G2 U22, G3 U16) | new-answer-type | multiple choice with pictures |  | Merged: the Number and Algebra drafts both had this row. The public file lists it under number and shape patterns (3.3). |
| Division as sharing and grouping | Interpret a quotient as sharing equally or as how many equal groups; write × and ÷ statements for a situation. | 12 sweets are shared equally among 3 children. How many does each get? | G1–G3 (CCSS 3.OA.1–2, Eng Y2, MoEYS G2 U11) | buildable-now | number (Decimal) |  | Added by completeness check (public 3.3 'Interpret products and quotients'). Needs word-problem templates. |
| Times tables 2, 5 and 10 | Recall and use multiplication facts for 2, 5, 10. | 7 × 5 = ? | G1–G3 (CCSS 3.OA.7, Eng Y2, Cam St3, MoEYS G2 U7) | buildable-now | number (Decimal) |  | Timing: England G1 and Cambridge G2 vs CCSS G3. |
| Division facts (inverse of the tables) | Divide using known multiplication facts, no remainder. | 56 ÷ 8 = ? | G1–G3 (CCSS 3.OA.6–7, Eng Y2–Y3, Cam St3, MoEYS G2 U11) | buildable-now | number (Decimal) |  | Covered by level 1 of the app's 'divide' topic. |
| Properties of multiplication (commutative, associative, distributive) | Use the laws of arithmetic to fill blanks or compute cleverly. | 7 × 13 = 7 × 10 + 7 × __;  4 × 9 × 25 = ? | G1–G5 (CCSS 3.OA.5, Eng Y2, Y4, Cam St3, St5) | buildable-now | number (Decimal) |  | Naming the property needs multiple choice. |
| Number patterns with a rule | Continue a number pattern or find a missing term from a given rule. | Start at 3, add 4 each time: 3, 7, 11, __, __ | G1–G5 (CCSS 3.OA.9, 4.OA.5, Eng Y2, Cam St5, MoEYS G1 U11, G3 U16, G4 U20, G5 U24) | buildable-now | number (Decimal) |  | The rule is given here; finding the rule is the algebra 'term-to-term rule' row. |
| Times tables 3, 4, 6, 7, 8, 9 | Recall multiplication facts for 3, 4 and 8, then 6, 7 and 9. | 8 × 7 = ? | G2–G3 (CCSS 3.OA.7, Eng Y3–Y4, Cam St3, MoEYS G3 U5) | buildable-now | number (Decimal) |  |  |
| Missing numbers in × and ÷ equations | Find the unknown factor, product, dividend or divisor. | 8 × __ = 48;  __ ÷ 3 = 7 | G2–G3 (CCSS 3.OA.4, 3.OA.6, Eng Y3, Cam St3) | buildable-now | number (Decimal) in a Blank slot |  |  |
| Multiply and divide by 10, 100, 1000 and multiples of 10 | Multiply and divide whole numbers by powers of ten and by multiples of ten. | 6 × 70 = ?;  4,500 ÷ 100 = ? | G2–G4 (CCSS 3.NBT.3, Eng Y4–Y5, Cam St3, St5, MoEYS G3 U5) | buildable-now | number (Decimal) |  | Decimal versions are in 3.7. |
| Multiplicative comparison and scaling problems | 'Times as many' and scaling word problems. | A rope is 4 times as long as a 7 m rope. How long is it? | G2–G4 (CCSS 4.OA.1–2, Eng Y3–Y4) | buildable-now | number (Decimal) |  | Needs word-problem templates. |
| Multi-digit × one-digit multiplication | Multiply 2-, 3- and 4-digit numbers by a one-digit number (short multiplication). | 347 × 6 = ? | G2–G4 (CCSS 4.NBT.5, Eng Y3–Y5, Cam St5, MoEYS G3 U6, G4 U4) | buildable-now | number (Decimal) |  | Covered by level 1 of the app's 'multiply' topic. |
| Division with remainders | Divide and give a quotient and remainder. | 29 ÷ 5 = ? R ?;  345 ÷ 7 | G2–G4 (CCSS 4.NBT.6, Eng Y5, Cam St3, St5, MoEYS G3 U7, G4 U6) | buildable-now | quotient + remainder (Remainder) |  | Covered by levels 2–3 of 'divide'. Cambridge introduces remainders earliest (G2). |
| Mixed multiplication facts to 10 × 10 / 12 × 12 | Fluent recall of all single-digit products (England to 12 × 12), including × 0 and × 1. | 11 × 12 = ?;  9 × 0 = ? | G3 (CCSS 3.OA.7, Eng Y4, MoEYS G3 U5) | buildable-now | number (Decimal) |  | The app's 'multiply' topic starts at 2-digit × 1-digit and has no tables level. |
| Long multiplication | Multiply by two-digit and larger numbers using the standard written method. | 1,234 × 56 = ? | G3–G6 (CCSS 4.NBT.5, 5.NBT.5, Eng Y5–Y6, Cam St5, MoEYS G4 U5, G5 U2) | buildable-now | number (Decimal) | `multiply` | England one year before CCSS. App 'multiply' also has a decimals level. |
| Interpreting remainders in context | Decide whether to round the quotient up or down, or give the remainder as a fraction, from the story. | 45 children, 8 per car. How many cars are needed? | G4–G5 (CCSS 4.NBT.6, Eng Y5–Y6, Cam St5) | buildable-now | number (Decimal) |  | Needs word-problem templates. |
| Remainder as a fraction (division to a mixed number) | Write the answer of a division as a mixed number. | 157 ÷ 25 = ? (answer 6 7/25) | G4–G6 (Eng Y6, Cam St5, St7) | buildable-now | mixed number (Fraction, mixed form) |  |  |
| Long division | Divide multi-digit numbers by one- and two-digit divisors using short or long division. | 86,352 ÷ 56 = ? | G4–G6 (CCSS 4.NBT.6, 5.NBT.6, 6.NS.2, Eng Y6, MoEYS G4 U6, G5 U3) | buildable-now | number (Decimal) or quotient + remainder | `divide` | App 'divide' spans facts, remainders, long division and decimal results. |
| Order of operations with brackets | Evaluate expressions with the four operations, brackets (two kinds), later powers and roots. | 36 − (4 + 2) × 5 = ?;  [20 − (3 + 5)] ÷ 4 = ? | G4–G8 (CCSS 5.OA.1, Eng Y6, KS3, GCSE N3, Cam St5, IGCSE C1.6, MoEYS G5 U4) | buildable-now | number (Decimal) |  |  |
| Writing numerical expressions from words | Write a calculation for a description without evaluating it. | Write 'add 8 and 7, then multiply by 2' as an expression. | G5 (CCSS 5.OA.2) | new-answer-type | numerical expression |  |  |
| Two related patterns as ordered pairs | Generate two patterns from two rules and pair up their terms. | Rule A add 3, rule B add 6, both from 0. Write the 4th pair. | G5 (CCSS 5.OA.3) | new-answer-type | coordinate pair |  |  |

#### 3.4 Factors, multiples, primes, powers, roots

| Topic | Description | Example | Grades | Check | Answer type | Existing topic | Note |
|---|---|---|---|---|---|---|---|
| Factors and factor pairs | List all factors of a number, or all factor pairs. | List all the factors of 36. | G3–G6 (CCSS 4.OA.4, Eng Y4–Y5, Cam St7, MoEYS G6 U8, G7 divisors and multiples) | new-answer-type | set of numbers (unordered list) |  | 'How many factors does 36 have?' is buildable now as a number. |
| Multiples | List multiples, or decide whether a number is a multiple of another. | Write the first five multiples of 7. Is 84 a multiple of 6? | G3–G6 (CCSS 4.OA.4, Eng Y5, Cam St5, St7, MoEYS G6 U8, G7) | new-answer-type | set of numbers; yes/no |  | 'The 8th multiple of 7' is buildable now. |
| Prime and composite numbers | Classify numbers up to 100 as prime or composite; recall primes to 19, list primes below 100. | Is 91 prime or composite? | G4–G6 (CCSS 4.OA.4, Eng Y5–Y6, Cam St7, IGCSE C1.1, MoEYS G12 adv Ch8) | new-answer-type | multiple choice (prime/composite) or set of numbers |  | Sieve of Eratosthenes as an activity is owner-todo. |
| Square numbers and cube numbers | Evaluate squares and cubes; recognise square and cube numbers. | 13² = ?  4³ = ? | G4–G6 (CCSS 6.EE.1, Eng Y5, Cam St7, IGCSE C1.1, MoEYS G6 outcomes, G7 U3) | buildable-now | number (Decimal) |  | Timing: England G4 vs CCSS G6. 'Which is a square number?' needs multiple choice. The question needs superscript rendering. |
| Highest common factor (HCF/GCF) | Find the HCF of two or three numbers, by listing or from prime factors. | HCF of 48 and 180? | G5–G10 (CCSS 6.NS.4, Eng Y6, KS3, GCSE N4, IGCSE C1.1, MoEYS G7 U1, G12 adv Ch8) | buildable-now | number (Decimal) |  |  |
| Lowest common multiple (LCM) | Find the LCM of two or three numbers. | LCM of 12 and 18? | G5–G10 (CCSS 6.NS.4, Eng Y6, KS3, GCSE N4, Cam St7, IGCSE C1.1, MoEYS G7 U1, G12 adv Ch8) | buildable-now | number (Decimal) |  |  |
| Divisibility tests | Use divisibility rules for 2, 3, 4, 5, 6, 9, 10. | Is 2,346 divisible by 3? By 9? | G6 (Cam St7, MoEYS G7 divisors and multiples) | new-answer-type | yes/no (multiple choice) |  | Missing-digit form ('3_4 is divisible by 9: digit?') is buildable now. |
| Prime factorisation | Write a number as a product of primes in index form. | Write 360 as a product of prime factors. | G6–G8 (Eng KS3, GCSE N4, MoEYS G12 adv Ch8) | new-answer-type | product of prime powers (e.g. 2³ × 3² × 5) |  |  |
| HCF and LCM word problems | Use HCF or LCM in context (timetables, packing equal groups). | Two lights flash every 12 s and 18 s. After how many seconds do they flash together? | G6–G10 (Eng KS3, GCSE N4, IGCSE C1.1) | buildable-now | number (Decimal) |  |  |
| Factoring a sum with the distributive property | Rewrite a sum of two whole numbers as a common factor times a sum. | 36 + 8 = 4 × (__ + __) | G6 (CCSS 6.NS.4) | new-answer-type | two numbers in blanks (multi-blank) |  |  |
| Powers of small numbers | Evaluate and recognise powers of 2, 3, 4 and 5; estimate powers. | 2⁶ = ?  Which power of 3 is 81? | G6–G10 (Eng KS3, GCSE N6) | buildable-now | number (Decimal) |  | Added by completeness check (public 3.4 'Powers of 2, 3, 4, 5 recognised'). The question needs superscript rendering. |
| Square roots and cube roots of perfect powers | Find √ of perfect squares and ∛ of perfect cubes. | √144 = ?  ∛125 = ? | G6–G8 (CCSS 8.EE.2, Eng KS3, GCSE N6, Cam St7, IGCSE C1.3, MoEYS G7 U3, G8 U3) | buildable-now | number (Decimal) |  | Cambridge earliest (G6). |
| Reciprocals | Find the reciprocal of a whole number, fraction, mixed number or decimal. | Reciprocal of 2 3/5? | G6–G10 (Eng KS3, GCSE N3, IGCSE C1.1, implicit in CCSS 6.NS.1) | buildable-now | fraction (Fraction) |  |  |
| Estimating square and cube roots | Estimate a root between two integers or to one decimal place. | √50 is between which two whole numbers? Give √50 to 1 d.p. | G8 (Cam St9, GCSE N6 (H), CCSS 8.NS.2) | buildable-now | number (Decimal) for the 1 d.p. version |  | The 'between which two integers' version needs a pair answer. |
| Evaluating powers with integer exponents (zero and negative) | Evaluate a⁰ and a⁻ⁿ for numbers. | 2⁻³ = ?  (3/4)⁻² = ?  7⁰ = ? | G8–G11 (CCSS 8.EE.1, Eng KS3, GCSE N7, Cam St9, IGCSE C1.7, IB SL 1.5, MoEYS G8 U2) | buildable-now | number (Decimal) or fraction (Fraction) |  | Merged with the algebra draft's 'Negative and fractional indices'. Needs superscript rendering. |
| Laws of indices with numbers | Multiply, divide and raise powers of the same base; give the missing index. | 3⁵ × 3² = 3^?   (5²)³ = 5^? | G8–G10 (CCSS 8.EE.1, GCSE N7, A4, Cam St9, IGCSE C1.7, MoEYS G7 U16, G8 U2) | buildable-now | number (Decimal) for the missing index |  | Negative missing indices (2⁷ ÷ 2⁹) need signed entry. Index laws with letters are an algebra row. |
| Fractional (rational) exponents | Evaluate a^(m/n) and convert between roots and fractional powers. | 27^(2/3) = ?  16^(−3/4) = ? | G9–G11 (CCSS N-RN.1–2, GCSE N7 (H), A level B1 [AS], IGCSE E1.7, E2.4, IB SL 1.7) | buildable-now | number (Decimal) or fraction (Fraction) |  | Merged with the algebra draft's 'Negative and fractional indices'. Rewriting a root as a power needs an expression answer. |
| Euclidean algorithm and the division algorithm | Find a GCD with the Euclidean algorithm; write a = bq + r. | Use the Euclidean algorithm to find gcd(252, 198). | G12 (MoEYS G12 adv Ch8) | buildable-now | number (Decimal), or quotient + remainder for a = bq + r |  | MoEYS only. Checks the final GCD, not the steps. |
| Divisibility proofs and number theory reasoning | Prove divisibility statements and properties of primes, GCD and LCM. | Prove that n³ − n is divisible by 6 for every integer n. | G12 (MoEYS G12 adv Ch8) | owner-todo | - |  | MoEYS only. |

#### 3.5 Integers and negative numbers

| Topic | Description | Example | Grades | Check | Answer type | Existing topic | Note |
|---|---|---|---|---|---|---|---|
| Negative numbers in context | Count through zero; temperature rises and falls; intervals across zero. | It is −4 °C and rises 9 degrees. New temperature? | G3–G6 (CCSS 6.NS.5, Eng Y4–Y6, Cam St5, MoEYS G7 integers) | new-answer-type | signed number |  | The checker already accepts a minus sign, but the answer box strips '-' (src/core/entry.ts maskDecimal), so negative answers cannot be typed. Timing: England G3, Cambridge G4 vs CCSS G6. |
| Comparing and ordering integers and rational numbers | Compare signed numbers with < = >, or order a list of them. | −7 __ −3 | G6–G8 (CCSS 6.NS.7, Eng KS3, Cam St5, St7, MoEYS G7 U3, G8 rational numbers) | buildable-now | comparison (< = >) |  | The question needs negative numbers in Num tokens. Ordering a whole list needs the ordered-list type. |
| Signed numbers on a number line | Place or read integers and rational numbers on a number line; distance between two points. | What number is at point P? (line from −5 to 5) | G6–G8 (CCSS 6.NS.6, 7.NS.1, Eng KS3, Cam St7) | new-answer-type | number line diagram in the question; signed number answer |  |  |
| Opposites and absolute value | Find the opposite of a number and its absolute value; interpret \|x\| as distance from 0. | \|−12\| = ?  Opposite of 3.5? | G6–G7 (CCSS 6.NS.6–7, MoEYS G7 U1) | new-answer-type | signed number |  | Absolute-value-only levels are buildable now; opposites of positives are negative. |
| Adding and subtracting integers | Add and subtract positive and negative whole numbers. | −8 + 3 = ?  5 − (−9) = ? | G6–G8 (CCSS 7.NS.1, Eng KS3, GCSE N2, Cam St7, St9, IGCSE C1.6, MoEYS G7 U3) | new-answer-type | signed number |  | Checker accepts negatives; only the entry mask blocks them. |
| Multiplying and dividing integers | Multiply and divide signed whole numbers; sign rules. | −6 × −7 = ?  −72 ÷ 8 = ? | G7–G8 (CCSS 7.NS.2, Eng KS3, GCSE N2, Cam St9, MoEYS G7 U1) | new-answer-type | signed number |  |  |
| Four operations on signed decimals | All four operations with positive and negative decimals, including order of operations. | −2.5 × 1.4 − 3 = ? | G7–G8 (CCSS 7.NS.1–3, Eng KS3, GCSE N2, MoEYS G8 U1) | new-answer-type | signed number |  |  |
| Four operations on signed fractions (rational numbers) | Add, subtract, multiply and divide negative fractions and mixed numbers. | −3/4 + 5/6 = ?  (−2/3) ÷ (4/9) = ? | G7–G9 (CCSS 7.NS.1–3, Eng KS3, GCSE N2, MoEYS G8 U1, G9 U1) | new-answer-type | signed fraction |  | The Fraction entry accepts digits only, so it cannot hold a negative value. |
| Word problems with rational numbers | Real-world problems using all four operations on signed numbers. | A submarine at −120 m rises 45 m, then sinks 2.5 times that. Depth? | G7 (CCSS 7.NS.3, 7.EE.3, Eng KS3) | new-answer-type | signed number (signed fraction for fraction results) |  | Needs word-problem templates. |

#### 3.6 Fractions

| Topic | Description | Example | Grades | Check | Answer type | Existing topic | Note |
|---|---|---|---|---|---|---|---|
| Fractions of shapes (halves, thirds, quarters, tenths) | Name the fraction of a shape that is shaded, or shade a fraction. | What fraction of the circle is shaded? (3 of 4 parts) | G1–G3 (CCSS 1.G.3, 2.G.3, 3.NF.1, Eng Y1–Y2, Cam St1, St3, MoEYS G1 U13, U24, G2 U9, G3 U8) | new-answer-type | shaded shape in the question; the answer is a fraction |  | Shading a fraction yourself needs a drawn answer. |
| Unit fractions of a quantity or set | Find 1/2, 1/3, 1/4, 1/b of a number or set. | 1/4 of 28 = ? | G1–G4 (Eng Y2–Y4, Cam St3, St5, MoEYS G2 U9) | buildable-now | number (Decimal) |  |  |
| Non-unit fractions of a quantity | Find a/b of a number or measure. | 3/5 of 40 = ? | G2–G6 (Eng Y2, Y4, Cam St5, CCSS 4.NF.4, 5.NF.4) | buildable-now | number (Decimal) or fraction |  |  |
| Fractions on a number line | Read or place fractions and mixed numbers on a number line. | What fraction is at the arrow? (0 to 1 in eighths) | G2–G3 (CCSS 3.NF.2, Eng Y3, Cam St3) | new-answer-type | number line diagram in the question; the answer is a fraction |  |  |
| Counting in fractions and tenths | Count up and down in steps of a unit fraction or tenths. | 1/10, 2/10, 3/10, __, __ | G2–G4 (Eng Y3, CCSS 4.NF.6) | buildable-now | fraction (Fraction) or number (Decimal) |  | Timing: England G2 vs CCSS G4 for tenths. |
| Equivalent fractions | Find a missing numerator or denominator to make equal fractions. | 2/3 = __/12;  15/25 = 3/__ | G2–G5 (CCSS 3.NF.3, 4.NF.1, Eng Y3–Y5, Cam St3, St5, MoEYS G3 U8, G5 U5) | buildable-now | number (Decimal) in a Blank slot |  |  |
| Improper fraction to mixed number | Convert an improper fraction to a mixed number. | 58/9 = ? | G2–G4 (CCSS 4.NF.3c, Eng Y5, Cam St3, St5, MoEYS G5 U8) | buildable-now | mixed number (Fraction, mixed form) | `fraction-to-mixed` |  |
| Adding fractions | Add fractions with like, then related, then unlike denominators, and mixed numbers. | 1 1/2 + 2 2/3 = ? | G2–G6 (CCSS 4.NF.3, 5.NF.1–2, Eng Y3–Y6, MoEYS G6 U9, U12) | buildable-now | fraction/mixed number in lowest terms (Fraction) | `fraction-add` | Timing: England adds like denominators in G2, CCSS in G4. |
| Subtracting fractions | Subtract fractions with like, then unlike denominators, and mixed numbers. | 3 1/2 − 2 2/3 = ? | G2–G6 (CCSS 4.NF.3, 5.NF.1–2, Eng Y3–Y6, MoEYS G6 U10, U13) | buildable-now | fraction/mixed number in lowest terms (Fraction) | `fraction-subtract` | Same timing gap as adding fractions. |
| Fraction as division | Interpret a/b as a ÷ b; write a sharing problem's answer as a fraction. | 5 pizzas shared by 3 people: how much each? (5 ÷ 3 = ?) | G2–G5 (CCSS 5.NF.3, Eng Y6, Cam St3, St5) | buildable-now | fraction/mixed number (Fraction) |  |  |
| Comparing fractions | Compare two fractions or mixed numbers with < = > (same numerator or denominator first, then unlike). | 2/5 __ 3/8 | G3–G5 (CCSS 3.NF.3d, 4.NF.2, Eng Y3, Y5, Y6, Cam St5) | buildable-now | comparison (< = >) | `fraction-compare` |  |
| Ordering fractions | Put a list of fractions and mixed numbers in order. | Order from smallest: 3/4, 2/3, 5/8, 7/12. | G3–G5 (Eng Y5–Y6, Cam St3, St5) | new-answer-type | ordered list of fractions |  |  |
| Simplifying fractions | Reduce a fraction to lowest terms using common factors. | Simplify 96/144. | G4–G6 (Eng Y6, implicit in CCSS, MoEYS G5 U5) | buildable-now | fraction in lowest terms (Fraction) | `fraction-simplify` |  |
| Mixed number to improper fraction | Convert a mixed number to an improper fraction. | 8 5/6 = ? | G4 (CCSS 4.NF.3c, Eng Y5, Cam St5, MoEYS G5 U8) | buildable-now | improper fraction (Fraction, improper form) | `fraction-to-improper` |  |
| Adding tenths and hundredths | Add a fraction in tenths to one in hundredths by converting. | 3/10 + 4/100 = ?/100 | G4 (CCSS 4.NF.5, Eng Y5) | buildable-now | fraction (Fraction) or number in a blank |  | Covered loosely by the unlike-denominator levels of 'fraction-add', but not as its own level. |
| Fraction × whole number | Multiply a proper fraction or mixed number by a whole number. | 3 × 2/5 = ? | G4–G5 (CCSS 4.NF.4, Eng Y5, MoEYS G5 U6) | buildable-now | fraction/mixed number (Fraction) |  | Covered by level 2 of 'fraction-multiply'. |
| Fraction word problems | Context problems using the four operations with fractions and mixed numbers. | A recipe uses 2 1/4 cups of flour per cake. How much for 3 cakes? | G4–G7 (CCSS 4.NF.3d, 5.NF.2, 5.NF.6, 6.NS.1, Eng Y5–Y6) | buildable-now | fraction/mixed number (Fraction) |  | Needs word-problem templates. |
| Multiplying fractions | Multiply fraction by fraction, then mixed numbers; multiplication as scaling. | 1 1/3 × 2 2/5 = ? | G5–G6 (CCSS 5.NF.4–6, Eng Y6, MoEYS G6 U11, U14) | buildable-now | fraction/mixed number in lowest terms (Fraction) | `fraction-multiply` | The area-model version needs a diagram. |
| Dividing unit fractions and whole numbers | Divide a unit or proper fraction by a whole number, and a whole number by a unit fraction. | 1/3 ÷ 4 = ?  5 ÷ 1/4 = ? | G5 (CCSS 5.NF.7, Eng Y6, MoEYS G5 U7) | buildable-now | fraction or number (Fraction / Decimal) |  | Whole ÷ fraction is level 2 of 'fraction-divide'. |
| Dividing fractions | Divide fraction by fraction, then mixed numbers. | 3 1/2 ÷ 2 2/3 = ? | G6–G8 (CCSS 6.NS.1, Eng KS3, GCSE N2, IGCSE C1.6, MoEYS G6 U15) | buildable-now | fraction/mixed number in lowest terms (Fraction) | `fraction-divide` |  |
| One quantity as a fraction of another | Write one amount as a fraction of another, including results above 1 and mixed units. | What fraction of 1 hour is 45 minutes? | G6–G10 (Eng KS3, GCSE R3) | buildable-now | fraction (Fraction) |  |  |
| Fractions as operators in multi-step problems | Use fractions (and percentages) as multipliers in ratio and sharing problems. | 2/5 of the class walk, 1/3 of the rest cycle. What fraction cycle? | G6–G10 (Eng KS3, GCSE N11, N12) | buildable-now | fraction (Fraction) or number |  |  |

#### 3.7 Decimals

| Topic | Description | Example | Grades | Check | Answer type | Existing topic | Note |
|---|---|---|---|---|---|---|---|
| Decimal notation for tenths and hundredths | Write tenths and hundredths, 1/4, 1/2, 3/4 as decimals. | Write 7/100 as a decimal. | G3–G4 (CCSS 4.NF.6, Eng Y4, Cam St5, MoEYS G4 U9) | buildable-now | number (Decimal) |  | England one year before CCSS. |
| Comparing decimals | Compare decimals to hundredths, then thousandths, with < = >. | 0.407 __ 0.47 | G3–G5 (CCSS 4.NF.7, 5.NBT.3, Eng Y4–Y5, Cam St5) | buildable-now | comparison (< = >) |  |  |
| Ordering decimals | Put a list of decimals in order. | Order: 0.5, 0.45, 0.405, 0.54 | G3–G6 (Eng Y4–Y5, KS3) | new-answer-type | ordered list of decimals |  |  |
| Multiplying and dividing decimals by 10, 100 and 1000 | Shift digits for × and ÷ by powers of ten, including decimal results. | 3.52 × 100 = ?  47 ÷ 1000 = ? | G3–G5 (CCSS 5.NBT.1–2, Eng Y4–Y6) | buildable-now | number (Decimal) |  |  |
| Rounding decimals | Round decimals to the nearest whole number, tenth, hundredth or any place. | Round 7.356 to 1 decimal place. | G3–G6 (CCSS 5.NBT.4, Eng Y4–Y5, Cam St5, IGCSE C1.9) | buildable-now | number (Decimal) |  | The checker strips trailing zeros, so 'to 2 d.p.' answers like 3.40 cannot be told apart from 3.4. |
| Adding decimals | Add decimals with the same and different numbers of places. | 12.34 + 5.6 = ? | G3–G6 (CCSS 5.NBT.7, 6.NS.3, Eng Y5, MoEYS G4 U10, G5 U10, G6 U3) | buildable-now | number (Decimal) |  | Covered by level 5 of the app's 'add' topic. |
| Subtracting decimals | Subtract decimals with the same and different numbers of places. | 12.34 − 5.6 = ? | G3–G6 (CCSS 5.NBT.7, 6.NS.3, Eng Y5, MoEYS G4 U11, G5 U11, G6 U4) | buildable-now | number (Decimal) |  | Covered by level 5 of the app's 'subtract' topic. |
| Decimal place value | Value of a digit in a decimal to thousandths; read and write decimals. | What is the value of the 7 in 3.472? | G4–G6 (CCSS 5.NBT.1, 5.NBT.3, Eng Y5, MoEYS G5 U9, G6 U2) | buildable-now | number (Decimal) or fraction |  |  |
| Multiplying decimals | Multiply a decimal by a whole number, then by a decimal. | 3.6 × 7 = ?  12.34 × 5.67 = ? | G4–G8 (CCSS 5.NBT.7, 6.NS.3, Eng Y6, Cam St5, St7, St9, MoEYS G5 U12, G6 U5) | buildable-now | number (Decimal) |  | Covered by level 5 of the app's 'multiply' topic. |
| Converting decimals to fractions | Write a terminating decimal as a fraction in lowest terms. | 0.375 = ? | G4–G8 (Eng Y5, KS3, IGCSE C1.4, MoEYS G7 U2) | buildable-now | fraction in lowest terms (Fraction) |  |  |
| Decimal word problems | Context problems (measures, money) with the four operations on decimals. | A ribbon is 4.5 m long. 1.75 m is cut off. How much is left? | G4–G7 (CCSS 5.NBT.7, Eng Y5–Y6) | buildable-now | number (Decimal) |  | Needs word-problem templates. |
| Dividing decimals | Divide a decimal by a whole number, then by a decimal; divide to give a decimal answer. | 7.56 ÷ 0.4 = ?  47 ÷ 8 = ? | G5–G8 (CCSS 5.NBT.7, 6.NS.3, Eng Y6, Cam St7, St9, MoEYS G6 U6) | buildable-now | number (Decimal) |  | The app's 'divide' level 5 covers whole ÷ whole with a decimal result only. |
| Converting fractions to terminating decimals | Write a fraction as a decimal by equivalence or long division. | 3/8 = ? | G5–G10 (CCSS 7.NS.2d, Eng Y6, KS3, GCSE N10, IGCSE C1.4, MoEYS G7 U2) | buildable-now | number (Decimal) |  |  |
| Fractions to recurring decimals | Write a fraction as a recurring decimal using dot or bar notation. | Write 5/11 as a recurring decimal. | G7–G10 (CCSS 7.NS.2d, GCSE N10, IGCSE E1.4, MoEYS G8 U4) | new-answer-type | recurring decimal (repeating block notation) |  |  |
| Effect of multiplying and dividing by numbers between 0 and 1 | Predict whether the result is bigger or smaller than the starting number. | 3.4 × 0.8 __ 3.4 | G8 (Cam St9) | buildable-now | comparison (< = >) |  | Cambridge only in the sources read. |
| Recurring decimals to fractions | Convert a repeating decimal into a fraction by algebra. | Write 0.272727… as a fraction. | G8–G10 (CCSS 8.NS.1, GCSE N10 (H), IGCSE E1.4, MoEYS G8 U4) | buildable-now | fraction in lowest terms (Fraction) |  | The question must show the recurring decimal, which a Num token can carry as text. |

#### 3.8 Percentages

| Topic | Description | Example | Grades | Check | Answer type | Existing topic | Note |
|---|---|---|---|---|---|---|---|
| Fraction, decimal and percentage conversions | Convert between fractions, decimals and percentages; recall key equivalences. | Write 3/8 as a percentage. Write 45% as a fraction in lowest terms. | G4–G10 (CCSS 6.RP.3c, Eng Y5–Y6, Cam St5, IGCSE C1.4, MoEYS G5 U13, G7 U6) | buildable-now | number (Decimal) or fraction (Fraction) |  | Timing: England/Cambridge G4 vs CCSS G6. |
| Percentage of a quantity | Find a percentage of an amount, by mental methods or a multiplier. | 15% of 360 = ? | G4–G10 (CCSS 6.RP.3c, Eng Y5–Y6, Cam St5, IGCSE C1.13.1, MoEYS G5 U13, G6 U7, G7 U6) | buildable-now | number (Decimal) |  |  |
| Comparing and ordering fractions, decimals and percentages | Compare a fraction, decimal and percentage, or order a mixed list. | 3/5 __ 58% | G5–G8 (Eng Y6, KS3) | buildable-now | comparison (< = >) |  | Ordering a full list needs the ordered-list type. |
| One quantity as a percentage of another | Write one amount as a percentage of another. | 18 out of 24 as a percentage? | G6–G10 (Eng KS3, GCSE R9, IGCSE C1.13.2) | buildable-now | number (Decimal) |  |  |
| Finding the whole from a part (reverse percentage) | Find the original amount given a part and its percentage, or a value after a percentage change. | After a 20% discount a bag costs $36. What was the original price? | G6–G10 (CCSS 6.RP.3c, GCSE R9, IGCSE E1.13.5) | buildable-now | number (Decimal) |  | CCSS G6 finds the whole from part and percent; reverse percentage after change is G9–10. |
| Percentage increase and decrease | Increase or decrease an amount by a percentage, including over 100%. | Increase 240 by 35%. | G7–G10 (CCSS 7.RP.3, Eng KS3, GCSE R9, IGCSE C1.13.3, MoEYS G8 U6–U7) | buildable-now | number (Decimal) |  |  |
| Percentage change and percent error | Find the percentage change between two values, or the percent error of an estimate. | A price goes from $80 to $92. Percentage increase? | G7–G10 (CCSS 7.RP.3, GCSE R9, IGCSE C1.13.3, MoEYS G8 U7 percentage variance) | buildable-now | number (Decimal) |  | MoEYS G8 'Percentage variance' is read as percentage change. |
| Discount, markup, profit and loss | Sale prices, markups, cost and selling price, profit or loss and its percentage. | A shop buys a fan for 80,000 riel and sells it for 92,000 riel. Profit percentage? | G7–G10 (CCSS 7.RP.3, GCSE R9, IGCSE C1.13, MoEYS G7 U5, G8 U6, G9 U3) | buildable-now | number (Decimal) |  | Profit and loss is explicit in MoEYS G8; public sources cover it as markup/markdown. |
| Tax, tips and commission | Add tax or a tip to a price; find a commission on sales. | A meal costs $45 plus a 15% tip. Total? | G7–G9 (CCSS 7.RP.3, GCSE R9, MoEYS G7 U5, G9 U3) | buildable-now | number (Decimal) |  |  |
| Simple interest and loans | Interest = principal × rate × time; total repaid on a loan. | $2,000 at 4% simple interest for 3 years. Interest? | G7–G11 (CCSS 7.RP.3, Eng KS3, GCSE R9, IGCSE C1.13.4, IB SL 1.2, MoEYS G7 U5, G8 U6, G9 U3) | buildable-now | number (Decimal) |  |  |
| Mixture and concentration problems | Percent concentration of mixtures; mixing two solutions or two prices. | 20 L of 30% juice is mixed with 30 L of 50% juice. What percentage is juice? | G8–G9 (MoEYS G8 U8, G9 U3) | buildable-now | number (Decimal) |  | MoEYS only as a named topic. |
| Compound interest and depreciation | Repeated percentage change: compound interest, depreciation, growth and decay by a multiplier. | $5,000 at 3% compound interest per year. Value after 4 years (to the nearest cent)? | G9–G11 (GCSE R16, IGCSE C1.13.4, IB SL 1.4; CCSS via F-LE) | buildable-now | number (Decimal) |  | Needs a stated rounding rule. Overlaps the algebra rows 'Exponential growth and decay models' and 'Sequences in financial and growth models'. |

#### 3.9 Ratio, proportion and rates

| Topic | Description | Example | Grades | Check | Answer type | Existing topic | Note |
|---|---|---|---|---|---|---|---|
| Writing ratios | Write the ratio of two or more quantities using a:b notation. | There are 12 boys and 18 girls. Write the ratio of boys to girls. | G4–G8 (CCSS 6.RP.1, Eng Y6, KS3, GCSE R4, Cam St5, MoEYS G5 U13, G7 U11) | new-answer-type | ratio a:b |  | Timing: Cambridge G4, England G5, CCSS G6. |
| Direct proportion problems | Solve proportion problems by the unitary method or a multiplier (recipes, prices). | 5 notebooks cost 12,500 riel. How much do 8 cost? | G4–G10 (Cam St5, Eng KS3, GCSE R10, MoEYS G6 U7, G7 U11, G8 U5, G9 T9 L2) | buildable-now | number (Decimal) |  |  |
| Map scales and scale drawings | Convert between map or drawing lengths and real lengths using a scale (1:n or bar). | Map scale 1:50,000. 7 cm on the map is how many km? | G4–G10 (CCSS 7.G.1, Eng Y6, KS3, GCSE R2, IGCSE C4.3, MoEYS G5 U19, G8 T8 L18, G8 U15) | buildable-now | number (Decimal) in a stated unit |  | Merged with the geometry draft's 'Scale drawings and map scales'. Making a scale drawing is owner-todo. |
| Speed, distance and time | Use speed = distance ÷ time to find any one quantity, and average speed. | A bus travels 180 km in 2 h 30 min. Average speed? | G4–G10 (CCSS 6.RP.3b, Eng Y5, KS3, GCSE R1, R11, IGCSE C1.12, MoEYS G6 U16, G8 U8, G9 U3) | buildable-now | number (Decimal) |  | Merged with the geometry draft's row of the same name. Answers asked as a time in h:min need a time answer. |
| Dividing a quantity in a given ratio | Share an amount in a ratio; use part:part and part:whole. | Share $240 in the ratio 3:5. How much is the larger share? | G5–G10 (CCSS 6.RP.3, Eng Y6, KS3, GCSE R5, IGCSE C1.11, MoEYS G6 U7) | buildable-now | number (Decimal), asking for one share |  | Asking for all shares at once needs a multi-number answer. |
| Simplifying ratios | Write a ratio in simplest form, including with units and decimals. | Simplify 45:60.  Simplify 1.5 kg : 600 g. | G6–G10 (CCSS 6.RP.3a, Eng KS3, GCSE R4, IGCSE C1.11) | new-answer-type | ratio a:b in lowest terms |  |  |
| Equivalent ratios (missing term) | Find a missing term so that two ratios are equal. | 3:5 = 12:__ | G6–G8 (CCSS 6.RP.3a, Eng KS3, MoEYS G7 U11) | buildable-now | number (Decimal) in a Blank slot |  |  |
| Tables of equivalent ratios | Complete a ratio table and plot its pairs. | Complete: rice 2, 4, __, 10; water 3, __, 9, __ | G6 (CCSS 6.RP.3a) | new-answer-type | table with several blanks (multi-blank numbers); plotting needs a drawn answer |  |  |
| Ratio problems from one part | Given a ratio and one part (or the difference), find another part or the total. | Boys:girls = 4:7. There are 28 girls. How many children? | G6–G10 (Eng KS3, GCSE R5, IGCSE C1.11) | buildable-now | number (Decimal) |  |  |
| Ratios and fractions | Turn a ratio into fractions of the whole, and back. | Red:blue = 3:5. What fraction of the beads are red? | G6–G10 (Eng KS3, GCSE R6, R8) | buildable-now | fraction (Fraction) |  | Answering with a ratio from fractions needs the ratio a:b type. |
| Unit rates and unit pricing (best buy) | Find a unit rate or unit price; compare deals. | 6 eggs cost 9,000 riel. Price of one egg? | G6–G10 (CCSS 6.RP.2, 6.RP.3b, GCSE R11, IGCSE C1.12) | buildable-now | number (Decimal) |  | 'Which is better value?' needs multiple choice. |
| Inverse proportion problems | Problems where one quantity goes up as the other goes down (workers and days). | 6 workers take 10 days. How long for 4 workers? | G6–G10 (Eng KS3, GCSE R10, R13, IGCSE E2.8, MoEYS G8 U5) | buildable-now | number (Decimal) |  | No CCSS standard names inverse proportion. |
| Density, pressure and other compound measures | Use density = mass ÷ volume, pressure = force ÷ area, rates of pay and flow. | A block has mass 540 g and volume 200 cm³. Density? | G6–G12 (CCSS G-MG.2, Eng KS3, GCSE R1, R11, IGCSE C1.12) | buildable-now | number (Decimal) |  | Merged with the geometry draft's 'Density'. |
| Unit rates with fractions (complex fractions) | Compute unit rates from ratios of fractions. | Walking 1/2 mile every 1/4 hour: miles per hour? | G7 (CCSS 7.RP.1) | buildable-now | fraction or number (Fraction / Decimal) |  | CCSS only. |
| Proportional relationships and the constant of proportionality | Decide whether a table or graph is proportional; find k in y = kx; use it. | x: 2, 5, 8; y: 7, 17.5, 28. Find k. | G7–G10 (CCSS 7.RP.2, 8.EE.5, Eng KS3, GCSE R7, R10, R14, IGCSE E2.8) | buildable-now | number (Decimal) for k |  | 'Is it proportional?' needs yes/no; writing y = kx needs an expression; graph versions need a diagram. |
| Converting rates and compound units | Change units of a rate (km/h to m/s, $ per kg to riel per g). | Convert 72 km/h to m/s. | G8–G10 (GCSE R1, MoEYS G9 U3) | buildable-now | number (Decimal) |  | See also the mechanics row on SI units. |
| Variation with powers and roots | y ∝ x², y ∝ x³, y ∝ √x, y ∝ 1/x²: find the constant and new values. | y ∝ x². y = 12 when x = 2. Find y when x = 5. | G9–G10 (GCSE R13 (H), IGCSE E2.8) | buildable-now | number (Decimal) |  | Forming the equation itself needs an expression type. |

#### 3.10 Estimation, rounding, accuracy, bounds

| Topic | Description | Example | Grades | Check | Answer type | Existing topic | Note |
|---|---|---|---|---|---|---|---|
| Estimating calculations by rounding | Round each number to 1 significant figure and estimate the result. | Estimate 38.7 × 4.12 ÷ 0.198. | G3–G10 (CCSS 3.OA.8, 4.OA.3, Eng Y5–Y6, KS3, GCSE N14, IGCSE C1.9) | buildable-now | number (Decimal) |  | The rounding rule must be stated so the estimate is unique. |
| Rounding to significant figures | Round numbers to 1, 2 or 3 significant figures. | Round 0.004 762 to 2 significant figures. | G6–G10 (Eng KS3, GCSE N15, IGCSE C1.9) | buildable-now | number (Decimal) |  | Trailing significant zeros (3.40 to 3 s.f.) cannot be checked because the checker strips them. |
| Error intervals | Give the range of values a rounded or truncated number could have, as an inequality. | x = 6.4 to 1 d.p. Write the error interval for x. | G6–G10 (Eng KS3, GCSE N15, IGCSE C1.10) | new-answer-type | interval / inequality (a ≤ x < b) |  |  |
| Using a calculator and interpreting its display | Enter calculations efficiently and read the display in context (money, time, rounding). | A calculator shows 3.5 for a price in dollars. Write it as money. | G6–G10 (Eng KS3, IGCSE C1.14) | owner-todo | - |  | Needs a physical calculator; some interpretation items could become money or time answers later. |
| Upper and lower bounds of calculations | Find the largest or smallest possible result of a calculation with rounded values. | a = 5.2, b = 3.7, both to 1 d.p. Upper bound of a − b? | G9–G10 (GCSE N16 (H), IGCSE E1.10) | buildable-now | number (Decimal), asking for one bound |  |  |
| Choosing a sensible level of accuracy | Decide what accuracy suits a measurement or reported result. | Is it sensible to give a car journey time to the nearest second? Explain. | G9–G12 (CCSS N-Q.3) | owner-todo | - |  |  |

#### 3.11 Standard form, real numbers, surds

| Topic | Description | Example | Grades | Check | Answer type | Existing topic | Note |
|---|---|---|---|---|---|---|---|
| Comparing numbers in standard form | Compare two numbers written in standard form. | 3.2 × 10⁵ __ 9.8 × 10⁴ | G6–G10 (CCSS 8.EE.3, Eng KS3) | buildable-now | comparison (< = >) |  |  |
| Standard form to ordinary numbers | Write a number given in standard form as an ordinary number. | Write 4.07 × 10⁻³ as an ordinary number. | G8–G11 (CCSS 8.EE.3, Eng KS3, GCSE N9, IGCSE C1.8, IB SL 1.1, MoEYS G8 U2) | buildable-now | number (Decimal) |  | The question needs superscript rendering. |
| Writing numbers in standard form | Write ordinary numbers in standard form (scientific notation). | Write 0.000 52 in standard form. | G8–G11 (CCSS 8.EE.3, Eng KS3, GCSE N9, IGCSE C1.8, IB SL 1.1, MoEYS G8 U2) | new-answer-type | standard form a × 10ⁿ |  |  |
| Calculating in standard form | Multiply, divide, add and subtract numbers in standard form. | (3 × 10⁴) × (6 × 10⁵) = ? (in standard form) | G8–G11 (CCSS 8.EE.4, GCSE N9, IGCSE C1.8, IB SL 1.1) | new-answer-type | standard form a × 10ⁿ |  | IB repeats it at G11. |
| Rational and irrational numbers; number sets | Classify numbers as natural, integer, rational, irrational or real. | Which of these are irrational: √16, √20, 0.3̅, π, 22/7? | G8–G10 (CCSS 8.NS.1, Eng KS3, IGCSE C1.1, MoEYS G9 U2, G10 Ch1 numbers) | new-answer-type | multiple choice / set selection |  |  |
| Rational approximations of irrational numbers | Approximate irrationals to a given accuracy and place them on a number line. | Give √2 to 2 decimal places. | G8 (CCSS 8.NS.2) | buildable-now | number (Decimal) for the approximation |  | Placing on a number line needs a drawn answer. |
| Sums and products of rational and irrational numbers | Explain why a sum or product is rational or irrational. | Explain why the sum of a rational and an irrational number is irrational. | G9–G12 (CCSS N-RN.3) | owner-todo | - |  | A multiple-choice 'rational or irrational?' variant could be generated. |
| Simplifying surds | Write √n in the form a√b. | Simplify √72. | G9–G11 (CCSS N-RN.2, GCSE N8 (H), A level B2 [AS], IGCSE E1.18, MoEYS G9 U2) | new-answer-type | surd a√b |  |  |
| Arithmetic with surds | Add, subtract, multiply surds and expand brackets containing surds. | (3 + √2)(5 − √2) = ? | G9–G11 (GCSE N8 (H), A level B2 [AS], IGCSE E1.18) | new-answer-type | surd expression a + b√c |  |  |
| Rationalising the denominator | Remove surds from the denominator, including a + √b denominators. | Rationalise 6/(3 − √5). | G9–G11 (GCSE N8 (H), A level B2 [AS], IGCSE E1.18) | new-answer-type | surd expression (a + b√c)/d |  |  |
| Exact answers in terms of π and surds | Give exact answers to calculations, leaving π or surds in. | Area of a circle of radius 6 cm, in terms of π. | G9–G10 (GCSE N8) | new-answer-type | exact expression with π or surds (e.g. 36π) |  |  |

#### 3.12 Sets, money

| Topic | Description | Example | Grades | Check | Answer type | Existing topic | Note |
|---|---|---|---|---|---|---|---|
| Recognising coins and notes; totalling money | Recognise coins and notes and find the total value of a set of them. | How much money: one 1,000-riel note, two 500-riel notes and three 100-riel notes? | K–G2 (CCSS 2.MD.8, Eng Y1–Y2, Cam money to St3, MoEYS G1 U17, G2 U4) | buildable-now | number (Decimal) |  | Picture-of-coins versions need a diagram. Riel amounts are whole numbers; dollars and cents fit the Decimal answer. |
| Giving change and money calculations | Add and subtract amounts of money; find change; combinations that make an amount. | A toy costs $3.65. You pay with a $5 note. Change? | G1–G5 (CCSS 2.MD.8, 4.MD.2, Eng Y2–Y5, MoEYS G1 U17, G2 U4, G3 U4, G4 U8, G5 U14) | buildable-now | number (Decimal) |  | Merged with the geometry draft's 'Money calculations'. 'Show two ways to make 50 cents' needs a new type. A two-decimal money display may need its own rule. |
| Money word problems with four operations | Multi-step money problems including multiplication and division. | 3 notebooks at 2,500 riel and 2 pens at 1,200 riel. Total? | G2–G5 (CCSS 4.MD.2, Eng Y3–Y4, MoEYS G3 U4, G4 U8, G5 U14) | buildable-now | number (Decimal) |  | Needs word-problem templates. |
| Currency conversion | Convert between currencies with a given exchange rate. | $1 = 4,100 riel. How many riel is $25? | G5–G10 (IGCSE C1.16, E1.16, MoEYS G5 U14) | buildable-now | number (Decimal) |  |  |
| Set notation and set operations | List elements; find unions, intersections, complements and subsets. | A = {1, 2, 3, 4, 6}, B = {2, 4, 5}. Find A ∩ B and A ∪ B. | G6–G12 (CCSS S-CP.1, Eng KS3, GCSE P6, IGCSE C1.2, E1.2, MoEYS G10 Ch1) | new-answer-type | set of elements |  |  |
| Counting with Venn diagrams | Use a two- (or three-) set Venn diagram to find the number in a region; n(A ∪ B) = n(A) + n(B) − n(A ∩ B). | 30 students: 18 like tea, 15 like coffee, 7 like both. How many like neither? | G6–G10 (Eng KS3, GCSE P6, IGCSE C1.2, E1.2, MoEYS G10 Ch1) | buildable-now | number (Decimal) |  | Diagram-based versions need a Venn diagram in the question; filling a Venn diagram is a drawn answer. |
| Set-builder notation and describing solution sets | Read and write sets with set-builder notation, including solution sets of inequalities. | Write {x : x is an integer, −2 < x ≤ 3} as a list. | G9–G10 (GCSE A22 (H), IGCSE E1.2, MoEYS G10 Ch1) | new-answer-type | set of elements |  |  |
| Logic: propositions, connectives and truth tables | Decide truth values of compound statements (and, or, not, if–then, iff); negation; truth tables. | p: 7 is prime (true), q: 9 is even (false). Is 'p and q' true? | G10 (MoEYS G10 Ch1 Logic) | new-answer-type | true/false (multiple choice); truth-table grid |  | MoEYS only. Merged: the Number and Algebra drafts both had this row. Logical proof parts are owner-todo. |

#### 3.13 Complex numbers

| Topic | Description | Example | Grades | Check | Answer type | Existing topic | Note |
|---|---|---|---|---|---|---|---|
| Complex number arithmetic (add, subtract, multiply) | Use i² = −1; add, subtract and multiply numbers of the form a + bi. | (3 + 2i)(1 − 4i) = ? | G9–G12 (CCSS N-CN.1–2, Cam 9709 P3 3.9, IB AHL 1.12, MoEYS G11 adv Ch7) | new-answer-type | complex number a + bi |  | England A level Mathematics omits complex numbers. |
| Powers of i | Simplify iⁿ using the cycle i, −1, −i, 1. | i²⁷ = ? | G9–G12 (CCSS N-CN.1–2, MoEYS G11 adv Ch7) | new-answer-type | complex number, or multiple choice of 1, i, −1, −i |  |  |
| Quadratics with complex solutions | Solve real quadratics whose roots are complex conjugates. | Solve z² − 4z + 13 = 0. | G9–G12 (CCSS N-CN.7, Cam P3 3.9, IB AHL 1.14, MoEYS G11 adv Ch7) | new-answer-type | set of complex solutions |  |  |
| Fundamental Theorem of Algebra | Know that a degree-n polynomial has n complex roots, counted with multiplicity. | Show why a cubic with real coefficients must have at least one real root. | G9–G12 (CCSS N-CN.9 (+)) | owner-todo | - |  | 'How many complex roots does this polynomial have?' could be buildable now as a number. |
| Conjugate, modulus and division of complex numbers | Find the conjugate and modulus; divide complex numbers. | (5 + i)/(2 − 3i) = ?  \|3 − 4i\| = ? | G11–G12 (CCSS N-CN.3 (+), Cam P3 3.9, IB AHL 1.12–1.13, MoEYS G11 adv Ch7) | new-answer-type | complex number a + bi (modulus alone is a number or surd) |  |  |
| Polynomial roots and conjugate pairs | Given one complex root of a real polynomial, find the others; factorise over the complex numbers. | 2 + i is a root of z³ − 5z² + 9z − 5. Find the other roots. | G11–G12 (CCSS N-CN.8 (+), Cam P3 3.9, IB AHL 1.14) | new-answer-type | set of complex solutions |  |  |
| Argand diagram | Plot complex numbers and their sums and differences in the complex plane; read a point. | Which complex number is at point P on the Argand diagram? | G11–G12 (CCSS N-CN.4–6 (+), Cam P3 3.9, IB AHL 1.12, MoEYS G11 adv Ch7) | new-answer-type | Argand diagram in the question; answer a + bi |  |  |
| Modulus-argument (polar) and exponential form | Convert between a + bi, r(cos θ + i sin θ) and re^(iθ); multiply and divide in polar form. | Write 1 + i√3 in modulus-argument form. | G11–G12 (CCSS N-CN.4 (+), Cam P3 3.9, IB AHL 1.12–1.13, MoEYS G11 adv Ch7) | new-answer-type | polar form (modulus r, argument θ in radians) |  |  |
| Square roots of a complex number | Find both square roots of a + bi algebraically. | Find the square roots of 5 − 12i. | G11–G12 (Cam P3 3.9, IB AHL 1.14) | new-answer-type | set of complex solutions |  |  |
| De Moivre's theorem: powers and nth roots | Raise complex numbers to powers and find nth roots using De Moivre. | Find the cube roots of 8i. | G11–G12 (IB AHL 1.14, MoEYS G11 adv Ch7) | new-answer-type | set of complex numbers (polar or a + bi) |  | Proving De Moivre (by induction) is owner-todo. |
| Loci and geometry with complex numbers | Sketch loci such as \|z − a\| = r or arg(z − a) = θ; use complex numbers for geometric results. | Sketch the locus \|z − 2 − i\| = 3. | G11–G12 (Cam P3 3.9, MoEYS G11 adv Ch7) | owner-todo | - |  | Sketching regions and geometric proofs cannot be checked automatically today. |

#### 3.14 Matrices

| Topic | Description | Example | Grades | Check | Answer type | Existing topic | Note |
|---|---|---|---|---|---|---|---|
| Matrix addition, subtraction and scalar multiplication | Add, subtract and scale matrices of matching size. | [[2, 1], [0, 3]] + 3[[1, −1], [2, 4]] = ? | G9–G12 (CCSS N-VM.7–8 (+), MoEYS G11 basic Ch4) | new-answer-type | matrix |  | CCSS (+) and MoEYS only; not in England A level Mathematics, Cambridge 0580/0607/9709 or IB AA. |
| Matrix multiplication | Multiply conformable matrices; non-commutativity; identity and zero matrices. | [[1, 2], [3, 4]] × [[0, 1], [5, −2]] = ? | G9–G12 (CCSS N-VM.8–10 (+), MoEYS G11 basic Ch4) | new-answer-type | matrix |  |  |
| Determinants | Compute determinants of 2 × 2 and 3 × 3 matrices. | det [[3, 5], [2, 4]] = ? | G9–G12 (CCSS N-VM.10, N-VM.12 (+), MoEYS G11 basic Ch4) | buildable-now | number (Decimal) |  | The matrix in the question needs a matrix display token; negative determinants need signed entry. |
| Inverse of a matrix | Find the inverse of a 2 × 2 (or 3 × 3) matrix, or say it has none. | Find the inverse of [[4, 7], [2, 6]]. | G9–G12 (CCSS N-VM.10, A-REI.9 (+), MoEYS G11 basic Ch4) | new-answer-type | matrix (with fraction entries) |  |  |
| Solving linear systems with matrices | Write a system as AX = B and solve with the inverse or Cramer's rule (determinants). | Solve 2x + 3y = 7, x − y = 1 using matrices. | G9–G12 (CCSS A-REI.8–9 (+), MoEYS G11 basic Ch4) | new-answer-type | coordinate pair / vector of solutions |  | Cramer's rule is inferred from the MoEYS determinants lesson. |
| Matrices as transformations (linear transformations) | Apply a 2 × 2 matrix to points or vectors; find the matrix of a rotation, reflection or enlargement; compose transformations; area scale factor from the determinant. | Find the image of (3, −1) under [[0, −1], [1, 0]]. | G9–G12 (CCSS N-VM.11–12 (+), MoEYS G11 adv Ch4 Linear transformations) | new-answer-type | coordinate pair or matrix |  | Merged: the Number, Algebra and Geometry drafts each had this row. Area scale factor (determinant) is buildable now as a number. |

### Algebra and functions

#### 4.1 Expressions

| Topic | Description | Example | Grades | Check | Answer type | Existing topic | Note |
|---|---|---|---|---|---|---|---|
| Writing algebraic expressions from words | Use letters for unknown numbers and turn a verbal description into an expression. | Write an expression for '7 less than three times n'. | G5–G7 (Eng Y6, KS3; CCSS 6.EE.2; Cam C2.1; MoEYS G6 pro-numerals, G7) | new-answer-type | algebraic expression (equivalence check) |  | England a year earlier than CCSS. MoEYS G6 'pro-numerals in number sentences'. |
| Evaluating expressions by substitution | Substitute given values for letters and evaluate the expression. | Find 3a + 2b when a = 4 and b = 5. | G5–G10 (Eng Y6 simple formulae, KS3, GCSE A2; CCSS 6.EE.2c; Cam C2.1; MoEYS G7) | buildable-now | number (Decimal) |  | Levels with negative values or results need signed entry. |
| Substituting into formulae | Use a given formula by substituting values (e.g. v = u + at, A = ½bh). | Using v = u + at, find v when u = 4, a = 3, t = 5. | G5–G10 (Eng Y6, KS3, GCSE A2; Cam C2.5.4) | buildable-now | number (Decimal) |  | Signed results need signed entry. |
| Evaluating numerical expressions with whole-number exponents | Evaluate expressions that contain powers, using order of operations. | Evaluate 2³ + 4² × 3. | G6–G8 (CCSS 6.EE.1; Eng KS3; MoEYS G6 square powers, G8 powers) | buildable-now | number (Decimal) |  | The question needs superscript rendering, which the token set (Num/Frac/Op/Blank) lacks today. |
| Terms and coefficients | Identify the terms, coefficients and constant of an expression. | What is the coefficient of x in 5 + 3x + x²? | G6–G10 (CCSS 6.EE.2b; Eng KS3, GCSE A3; MoEYS G7) | buildable-now | number (Decimal) |  | Negative coefficients need signed entry. |
| Expression, equation, formula or identity | Classify a given statement as an expression, equation, formula or identity. | Is 2(x + 3) = 2x + 6 an equation or an identity? | G6–G12 (CCSS 6.EE.2b; Eng KS3, GCSE A3; IB SL 1.6) | new-answer-type | multiple choice |  |  |
| Equivalent expressions using properties of operations | Use the distributive, commutative and associative properties to produce or recognise equivalent expressions. | Which is equivalent to 3(2x + 4): 6x + 4, 6x + 12 or 5x + 7? | G6–G7 (CCSS 6.EE.3–4, 7.EE.1–2; Eng KS3, GCSE A4) | new-answer-type | multiple choice, or algebraic expression |  |  |
| Collecting like terms | Simplify an expression by combining like terms. | Simplify 4x + 3y − x + 5y. | G6–G10 (CCSS 7.EE.1; Eng KS3, GCSE A4; Cam C2.2; MoEYS G7) | new-answer-type | algebraic expression |  |  |
| Expanding a single bracket | Multiply a term over a bracket, including expanding and simplifying sums of brackets. | Expand and simplify 3(x + 4) − 2(x − 1). | G6–G10 (CCSS 6.EE.3, 7.EE.1; Eng KS3, GCSE A4; Cam C2.2; MoEYS G8) | new-answer-type | algebraic expression |  |  |
| Factorising by taking out a common factor | Factorise an expression by taking out the highest common factor. | Factorise fully 6x²y + 9xy. | G7–G10 (CCSS 7.EE.1; Eng KS3, GCSE A4; Cam C2.2; MoEYS G8) | new-answer-type | factored expression (form + equivalence check) |  | The checker must reject an unfactorised answer that is equivalent in value. |
| Expanding products of two binomials | Expand (x + a)(x + b) and (ax + b)(cx + d), and simplify. | Expand (2x − 3)(x + 5). | G7–G10 (Eng KS3, GCSE A4; Cam C2.2.2/E2.2.2; CCSS A-APR.1; MoEYS G8) | new-answer-type | algebraic expression |  | Timing: England KS3 vs CCSS HS. |
| Laws of indices with algebraic terms | Simplify products, quotients and powers of powers of algebraic terms. | x⁵ × x³ = x^□; simplify (2a³)². | G7–G10 (MoEYS G7, G8; CCSS 8.EE.1; Eng GCSE A4; Cam C2.4/E2.4; IB SL 1.5, 1.7) | buildable-now | number (Decimal) for the missing exponent; algebraic expression for full simplification |  | Only the 'fill the missing exponent' levels fit today, and the question needs superscript rendering. |
| Factorising by grouping | Factorise four-term expressions by grouping pairs of terms. | Factorise ax + ay + bx + by. | G8–G10 (MoEYS G8; Cam E2.2.4) | new-answer-type | factored expression |  | MoEYS puts this at G8; public sources have it in Cambridge IGCSE Extended only. |
| Special products: (a ± b)² and (a + b)(a − b) | Expand perfect squares and difference-of-squares products using identities. | Expand (3x − 2)². | G8–G10 (Eng GCSE A4; Cam E2.2.4; MoEYS G8) | new-answer-type | algebraic expression |  | Exact MoEYS G8 identities are unconfirmed (lesson titles only). |
| Simplifying algebraic fractions | Cancel common factors in rational expressions, factorising first where needed. | Simplify (x² − 9)/(x² + 5x + 6). | G8–G12 (MoEYS G8; Eng GCSE A4 (H), A level B6; Cam E2.3; CCSS A-APR.6) | new-answer-type | rational expression |  | Timing: MoEYS G8 vs GCSE Higher G9–10 and CCSS HS. |
| Adding and subtracting algebraic fractions | Combine rational expressions over a common denominator. | Write 2/(x + 1) + 3/(x − 2) as a single fraction. | G8–G12 (MoEYS G8; Eng GCSE A4 (H); Cam E2.3; CCSS A-APR.7 (+)) | new-answer-type | rational expression |  |  |
| Multiplying and dividing algebraic fractions | Multiply and divide rational expressions and simplify. | Simplify (x² − 4)/(3x) ÷ (x + 2)/(6x²). | G8–G12 (MoEYS G8; Eng GCSE A4 (H); Cam E2.3; CCSS A-APR.7 (+)) | new-answer-type | rational expression |  |  |
| Rearranging formulae (changing the subject) | Make a given variable the subject of a formula, including cases where it appears twice or under a root. | Make r the subject of A = πr². | G8–G12 (Eng KS3, GCSE A5; Cam C2.5.4, E2.5.7; CCSS A-CED.4) | new-answer-type | algebraic expression (subject isolated) |  |  |
| Expanding products of three or more binomials | Expand triple products such as (x + 1)(x − 2)(x + 3). | Expand (x + 1)(x − 2)(x + 3). | G9–G10 (Eng GCSE A4 (H); CCSS A-APR.1) | new-answer-type | algebraic expression |  |  |
| Factorising quadratics x² + bx + c | Factorise monic quadratic trinomials into two brackets. | Factorise x² − 5x − 14. | G9–G10 (Eng GCSE A4; Cam E2.2.4; CCSS A-SSE.2; IB SL 2.6; MoEYS G8–G10) | new-answer-type | factored expression |  | Timing: KS3 expands binomials but GCSE factorises at G9–10. |
| Factorising the difference of two squares | Factorise expressions of the form a² − b². | Factorise 9x² − 25. | G9–G10 (Eng GCSE A4; Cam E2.2.4; CCSS A-SSE.2) | new-answer-type | factored expression |  |  |
| Factorising quadratics ax² + bx + c | Factorise non-monic quadratic trinomials. | Factorise 6x² + x − 2. | G9–G10 (Eng GCSE A4 (H); Cam E2.2.4; CCSS A-SSE.2) | new-answer-type | factored expression |  |  |
| Completing the square | Write a quadratic in the form (x + p)² + q or a(x + p)² + q, and read off the vertex. | Write x² + 6x + 2 in the form (x + p)² + q. | G9–G12 (Eng GCSE A11, A18 (H); Cam E2.2.5; CCSS A-SSE.3b; IB SL 2.6) | new-answer-type | pair of signed numbers (p, q), or algebraic expression |  |  |
| Interpreting parts of an expression in context | Say what a term, factor or coefficient means in a real context. | In C = 15 + 0.4m (taxi fare), what does 15 represent? | G9–G12 (CCSS A-SSE.1) | new-answer-type | multiple choice |  | CCSS only. Free-text interpretation would be owner-todo. |
| Proving algebraic identities | Show that two expressions are identically equal, working from LHS to RHS. | Show that (n + 1)² − (n − 1)² = 4n. | G9–G12 (Eng GCSE A6 (H); CCSS A-APR.4; IB SL 1.6) | owner-todo | - |  |  |

#### 4.2 Equations and inequalities

| Topic | Description | Example | Grades | Check | Answer type | Existing topic | Note |
|---|---|---|---|---|---|---|---|
| Solving one-step linear equations | Solve x + p = q, x − p = q, px = q and x/p = q. | Solve 7x = 63. | G5–G7 (Eng Y6, KS3; CCSS 6.EE.5, 6.EE.7; Cam C2.5.2; MoEYS G6, G7) | buildable-now | number or fraction (Decimal/Fraction) |  | Keep solutions non-negative until signed entry exists. Primary missing-number sentences are Number rows. |
| Whole-number pairs satisfying an equation in two unknowns | Find or list pairs of whole numbers that satisfy an equation with two unknowns. | List all whole-number pairs (a, b) with 2a + b = 7. | G5 (Eng Y6) | new-answer-type | set of number pairs |  | England only. |
| Simultaneous linear equations (graphical) | Solve a pair of linear equations by drawing both lines and reading the intersection. | Draw y = 2x − 1 and y = 5 − x and read off the solution. | G6–G9 (Eng KS3; CCSS 8.EE.8a; MoEYS G9) | new-answer-type | coordinate pair read from a drawn graph |  |  |
| Solving equations graphically (intersections of y = f(x) and y = g(x)) | Find approximate solutions of f(x) = g(x) from the intersections of two graphs. | Use the graph of y = x² − 3 to solve x² − 3 = x. | G6–G12 (Eng KS3, GCSE A17–A19; Cam C2.10.2/E2.10.2; CCSS A-REI.11; IB SL 2.4, 2.10) | new-answer-type | set of solutions read from a graph in the question (tolerance) |  |  |
| Writing and representing inequalities on a number line | Write x > c type inequalities from words or number lines and represent them. | Write the inequality shown: an open circle at 3 with an arrow to the right. | G6–G10 (CCSS 6.EE.8; Eng GCSE A22; Cam C2.6; MoEYS G7) | new-answer-type | inequality/interval; number-line diagram |  |  |
| Solving two-step linear equations | Solve px + q = r and p(x + q) = r. | Solve 4x − 7 = 25. | G7–G8 (CCSS 7.EE.4a; Eng KS3; Cam C2.5.2; MoEYS G7–G9) | buildable-now | number or fraction (Decimal/Fraction) |  | Negative solutions need signed entry. |
| Forming and solving equations from word problems | Set up a linear equation from a situation and solve it. | Three consecutive numbers sum to 72. Find the smallest. | G7–G10 (CCSS 7.EE.4, A-CED.1–2; Eng KS3, GCSE A21; Cam C2.5.1/E2.5.1; MoEYS G7–G9) | buildable-now | number (Decimal) |  | Only the final value is checked; the equation the student forms is not. |
| Solving linear inequalities in one unknown | Solve linear inequalities, including reversing the sign when multiplying by a negative. | Solve 5 − 2x < 11. | G7–G10 (CCSS 7.EE.4b, A-REI.3; Eng GCSE A22; Cam E2.6.2; MoEYS G7–G9) | new-answer-type | inequality / interval |  | MoEYS teaches this every year G7–G9. |
| Solving multi-step linear equations (unknown on both sides, brackets) | Solve linear equations needing expansion and collecting terms on both sides. | Solve 5(x − 2) = 3x + 8. | G8–G10 (CCSS 8.EE.7, A-REI.3; Eng KS3, GCSE A17; Cam C2.5.2/E2.5.2; MoEYS G8–G9) | buildable-now | number or fraction (Decimal/Fraction) |  | Negative solutions need signed entry. |
| Number of solutions of a linear equation | Decide whether a linear equation has one solution, no solution or infinitely many. | How many solutions has 2(x + 3) = 2x + 5? | G8 (CCSS 8.EE.7a, A-REI.1) | new-answer-type | multiple choice |  | CCSS only as an explicit skill. |
| Simultaneous linear equations (algebraic) | Solve two linear equations in two unknowns by substitution or elimination. | Solve 2x + y = 11, x − y = 1. | G8–G10 (CCSS 8.EE.8, A-REI.5–6; Eng GCSE A19; Cam C2.5.3/E2.5.4; MoEYS G9) | new-answer-type | pair of values (x, y) |  | England KS3 does graphical approximation only. |
| Linear equations with fractions | Solve linear equations with numerical or linear denominators. | Solve (x + 1)/3 − (x − 2)/4 = 2. | G9–G10 (Cam E2.5.3) | buildable-now | number or fraction (Decimal/Fraction) |  | Public sources name this only in Cambridge Extended; likely also in MoEYS G8–G9 (unconfirmed). |
| Simultaneous linear and quadratic equations | Solve one linear and one quadratic (or circle) equation simultaneously. | Solve y = x + 1 and x² + y² = 25. | G9–G11 (Eng GCSE A19 (H), A level B4 [AS]; Cam E2.5.5, P1 1.1; CCSS A-REI.7) | new-answer-type | set of coordinate pairs |  |  |
| Solving quadratic equations by factorising | Solve quadratics by factorising and using the zero-product rule. | Solve x² − x − 12 = 0. | G9–G11 (Eng GCSE A18; Cam E2.5.6; CCSS A-REI.4b; IB SL 2.7; MoEYS G10) | new-answer-type | set of solutions |  |  |
| Solving quadratic equations with the formula | Use the quadratic formula, giving exact (surd) or rounded answers. | Solve 2x² + 3x − 4 = 0 to 2 d.p. | G9–G11 (Eng GCSE A18 (H); Cam E2.5.6, P1 1.1; CCSS A-REI.4; IB SL 2.7; MoEYS G10) | new-answer-type | set of solutions (decimal, or exact surd form) |  |  |
| Solving quadratic equations by completing the square | Solve a quadratic by rewriting it in completed-square form. | Solve x² + 4x − 7 = 0 by completing the square. | G9–G11 (Eng GCSE A18 (H); CCSS A-REI.4a; Cam P1 1.1) | new-answer-type | set of solutions (exact surd form) |  |  |
| Rational equations and extraneous solutions | Solve equations with the unknown in a denominator and reject extraneous roots. | Solve 3/(x − 1) = x + 1. | G9–G12 (CCSS A-REI.2) | new-answer-type | set of solutions |  | CCSS only by name. |
| Radical equations | Solve equations with the unknown under a square root and check for extraneous roots. | Solve √(x + 7) = x − 5. | G9–G12 (CCSS A-REI.2; MoEYS G10 irrational functions) | new-answer-type | set of solutions |  | MoEYS link inferred from the G10 lesson title. |
| Integer solutions of an inequality | List the integers that satisfy an inequality or double inequality. | List the integers n with −3 < 2n + 1 ≤ 7. | G9–G10 (Eng GCSE A22) | new-answer-type | set of integers |  |  |
| Linear inequalities in two variables and regions | Represent linear inequalities as regions on a graph and identify the region satisfying several of them. | Shade the region where y ≥ 1, x + y ≤ 5 and y < 2x. | G9–G11 (Eng GCSE A22 (H), A level B5 [AS]; Cam E2.6.3–4; CCSS A-REI.12; MoEYS G10 Ch4) | new-answer-type | drawn answer (shaded region), or set of lattice points |  |  |
| Quadratic inequalities | Solve quadratic inequalities using roots and the sign of the graph. | Solve x² − 2x − 15 > 0. | G9–G11 (Eng GCSE A22 (H), A level B5 [AS]; Cam P1 1.1; IB SL 2.7; MoEYS G10 Ch3) | new-answer-type | interval or union of intervals |  | MoEYS G10 'Inequalities' detail unconfirmed below the lesson title. |
| Systems of equations of higher degree | Solve non-linear systems of two equations (e.g. symmetric systems in x + y and xy). | Solve x + y = 7, xy = 12. | G10 (MoEYS G10 Ch3) | new-answer-type | set of coordinate pairs |  | MoEYS only as a named lesson. |
| Discriminant and nature of roots | Use b² − 4ac to decide the number of real roots, or find a parameter giving equal or no roots. | For which k does x² + kx + 9 = 0 have equal roots? | G10–G11 (Eng A level B3 [AS]; Cam P1 1.1; IB SL 2.7; CCSS A-REI.4b; MoEYS G10) | new-answer-type | multiple choice (nature of roots); set of solutions or interval (parameter) |  | The discriminant value alone is buildable now when non-negative. |
| Three linear equations in three unknowns | Solve a 3×3 linear system, including cases with no or infinitely many solutions. | Solve x + y + z = 6, 2x − y + z = 3, x + 2y − z = 2. | G11–G12 (IB AHL 1.16; CCSS A-REI.8–9 (+)) | new-answer-type | ordered triple (x, y, z), plus a 'no/infinite solutions' choice |  |  |
| Equations quadratic in a function of x | Solve equations that are quadratic in eˣ, sin x, √x and so on, by substitution. | Solve e^(2x) − 5eˣ + 4 = 0. | G11 (Eng A level B3 [AS]; Cam P1 1.1; IB SL 2.10) | new-answer-type | set of solutions (exact, e.g. ln 4) |  |  |
| Modulus (absolute value) equations | Solve equations involving \|ax + b\|. | Solve \|2x − 3\| = 7. | G11–G12 (Eng A level B7; Cam P2 2.1/P3 3.1; IB AHL 2.16) | new-answer-type | set of solutions |  |  |
| Modulus inequalities | Solve inequalities involving \|ax + b\|. | Solve \|x − 4\| < 3. | G11–G12 (Cam P2 2.1/P3 3.1; IB AHL 2.16; Eng A level B7) | new-answer-type | interval or union of intervals |  |  |
| Inequalities g(x) ≥ f(x) solved analytically and graphically | Solve general function inequalities using algebra or graphs. | Solve 1/x ≥ x − 2. | G11–G12 (IB AHL 2.15) | new-answer-type | interval or union of intervals |  | IB only. |

#### 4.3 Sequences and series

| Topic | Description | Example | Grades | Check | Answer type | Existing topic | Note |
|---|---|---|---|---|---|---|---|
| Continuing sequences with a term-to-term rule | Find the next terms of a sequence and describe the term-to-term rule. | Next two terms of 3, 7, 11, 15, ...? | G4–G10 (CCSS 4.OA.5; Eng Y6, KS3, GCSE A23; Cam St5, C2.7; MoEYS G4 U20, G5 U24) | buildable-now | number (Decimal) |  | Describing the rule in words would need multiple choice. |
| Generating terms from a position-to-term rule | Find given terms of a sequence from its nth-term formula. | The nth term is 5n − 2. Find the 20th term. | G6–G10 (Eng KS3, GCSE A23/A25; Cam C2.7; CCSS F-BF.2) | buildable-now | number (Decimal) |  |  |
| nth term of a linear (arithmetic) sequence | Find the nth-term expression of a linear sequence, and decide whether a number is a term. | Find the nth term of 4, 9, 14, 19, ... | G6–G10 (Eng KS3, GCSE A25; Cam C2.7.3; CCSS F-BF.2, F-LE.2) | new-answer-type | algebraic expression in n |  | Timing: England G6–8 vs CCSS HS. 'Is 100 a term?' levels need yes/no. |
| nth term of a quadratic sequence | Find the nth-term expression of a quadratic sequence using second differences. | Find the nth term of 3, 8, 15, 24, ... | G9–G10 (Eng GCSE A25 (H); Cam C2.7.3) | new-answer-type | algebraic expression in n |  |  |
| Special sequences (square, cube, triangular, Fibonacci-type) | Recognise and continue square, cube and triangular numbers and Fibonacci-type sequences. | Next term of 1, 3, 6, 10, 15, ...? | G9–G12 (Eng GCSE A24; CCSS F-IF.3) | buildable-now | number (Decimal) |  |  |
| Recurrence relations: generating terms | Generate terms of a sequence defined recursively by xₙ₊₁ = f(xₙ). | u₁ = 2, uₙ₊₁ = 3uₙ − 1. Find u₄. | G9–G12 (CCSS F-IF.3, F-BF.2; Eng A level D2; MoEYS G11 adv recurrence relations) | buildable-now | number or fraction (Decimal/Fraction) |  | The question needs subscript rendering. |
| Converting between recursive and explicit forms | Write an explicit formula for a recursively defined sequence and the reverse. | Write uₙ₊₁ = uₙ + 4, u₁ = 3 as an explicit formula. | G9–G12 (CCSS F-BF.2; MoEYS G11 adv) | new-answer-type | algebraic expression in n |  |  |
| Geometric sequences | Find terms, the common ratio and the number of terms of a geometric sequence. | Find the 8th term of 3, 6, 12, ... | G9–G11 (Eng GCSE A24, A level D5; Cam P1 1.6; IB SL 1.3; CCSS F-LE.2; MoEYS G11 basic) | buildable-now | number or fraction (Decimal/Fraction) |  | Negative ratios need signed entry. |
| Finite geometric series sums | Find the sum of the first n terms of a geometric series. | Find the sum of the first 6 terms of 2 + 6 + 18 + ... | G9–G11 (CCSS A-SSE.4; Eng A level D5; Cam P1 1.6; IB SL 1.3; MoEYS G11) | buildable-now | number or fraction (Decimal/Fraction) |  |  |
| Factorials and nCr | Evaluate n! and binomial coefficients, and use Pascal's triangle. | Evaluate 8C3. | G10–G11 (Eng A level D1 [AS]; Cam P1 1.6; IB SL 1.9; CCSS A-APR.5 (+); MoEYS G10 Ch8) | buildable-now | number (Decimal) |  | Counting problems that use nCr are the probability rows 'Permutations' and 'Combinations'. |
| Behaviour of sequences (increasing, decreasing, periodic) | Classify a sequence as increasing, decreasing, periodic or neither, and find the period. | uₙ₊₁ = 1/(1 − uₙ), u₁ = 2. Is it periodic, and what is its period? | G11–G12 (Eng A level D2; MoEYS G11 sequences of real numbers) | new-answer-type | multiple choice (+ number for period) |  |  |
| Arithmetic sequences: nth term and unknowns | Use uₙ = a + (n − 1)d to find terms, the first term, the common difference or the number of terms. | An arithmetic sequence has u₃ = 11, u₇ = 27. Find d. | G11 (Eng A level D3; Cam P1 1.6; IB SL 1.2; MoEYS G11 basic) | buildable-now | number (Decimal) |  | Single-unknown levels fit today; asking for (u₁, d) together needs a pair answer. |
| Arithmetic series sums | Find the sum of an arithmetic series and solve for n given a sum. | Find 5 + 8 + 11 + ... + 95. | G11 (Eng A level D3–D4; Cam P1 1.6; IB SL 1.2; MoEYS G11 basic) | buildable-now | number (Decimal) |  |  |
| Sigma notation | Evaluate sums written in sigma notation, and write series in sigma notation. | Evaluate Σ (r = 1 to 10) of (3r + 2). | G11–G12 (Eng A level D4; IB SL 1.2) | buildable-now | number (Decimal) |  | Writing a series in sigma form needs an expression type; the question needs sigma rendering. |
| Sums of other sequences (Σr, Σr², telescoping) | Find sums of non-arithmetic, non-geometric sequences using standard results or telescoping. | Find Σ (r = 1 to 20) of 1/(r(r + 1)). | G11 (MoEYS G11 adv Sums of various sequences) | buildable-now | number or fraction (Decimal/Fraction) |  | MoEYS only. A closed form in n needs an expression type. |
| Sum to infinity and convergence | Find the sum to infinity of a convergent geometric series, and the condition \|r\| < 1. | Find the sum to infinity of 12 + 4 + 4/3 + ... | G11–G12 (Eng A level D5; Cam P1 1.6; IB SL 1.8) | buildable-now | number or fraction (Decimal/Fraction) |  | 'For which x does it converge?' levels need an interval type. |
| Binomial expansion for positive integer n | Expand (a + bx)ⁿ, or find a given term or coefficient. | Find the coefficient of x³ in (2 + x)⁶. | G11 (Eng A level D1 [AS]; Cam P1 1.6; IB SL 1.9; CCSS A-APR.5 (+)) | buildable-now | number (Decimal) for a coefficient; algebraic expression for a full expansion |  | Coefficient levels fit today; full-expansion levels need an expression type. |
| Proof by mathematical induction | Prove statements about integers (sums, divisibility, inequalities) by induction. | Prove that 1 + 3 + ... + (2n − 1) = n² for all n ≥ 1. | G11–G12 (IB AHL 1.15; MoEYS G11 adv) | owner-todo | - |  | England Further Maths was not read. |
| Sequences in financial and growth models | Apply arithmetic and geometric sequences to savings, loans, depreciation and population. | A worker earns $20,000 and gets a $1,500 rise each year. Total earned over 10 years? | G11–G12 (Eng A level D6; IB SL 1.2–1.4) | buildable-now | number (Decimal, rounded to 2 d.p.) |  | Overlaps 'Compound interest and depreciation' (3.8); this row is the A-level sequences view, including arithmetic models. |
| Binomial expansion for rational n and its validity | Expand (1 + x)ⁿ for fractional or negative n, and state the range of validity. | Expand (1 − 2x)^(−1/2) up to x³; state when it is valid. | G12 (Eng A level D1; Cam P3 3.1; IB AHL 1.10) | new-answer-type | algebraic expression (polynomial); interval for validity |  | Single-coefficient levels are buildable now with fraction answers. |

#### 4.4 Coordinates and linear graphs

| Topic | Description | Example | Grades | Check | Answer type | Existing topic | Note |
|---|---|---|---|---|---|---|---|
| Coordinates in the first quadrant | Read and plot points with positive coordinates, and complete shapes on a grid. | Write the coordinates of point A. Plot (3, 5). | G3–G5 (Eng Y4; CCSS 5.G.1–2) | new-answer-type | coordinate pair; plotted point on a grid |  | Timing: England G3 vs CCSS G5. The grid must be in the question. |
| Distance–time graphs | Interpret and draw distance–time graphs, and find speeds from gradients. | From the graph, find the speed between 10:00 and 10:30. | G3–G10 (Eng Y4 time graphs, KS3, GCSE A14, R14; Cam C2.9) | new-answer-type | graph in the question; number answer; drawn graph for the drawing part |  |  |
| Conversion graphs | Read values from straight-line conversion graphs (currency, units). | Use the graph to convert 30 miles to km. | G4–G10 (Eng Y5 line graphs, KS3; Cam C2.9) | new-answer-type | graph in the question; number answer with tolerance |  |  |
| Coordinates in four quadrants | Read and plot points with positive and negative coordinates. | Plot (−3, 2) and write the coordinates of B. | G5–G8 (Eng Y6, KS3, GCSE A8; CCSS 6.NS.6b, 6.NS.8; Cam C3.1; MoEYS G8 Ch9) | new-answer-type | coordinate pair (signed) |  | Reflecting points in the axes (CCSS 6.NS.6b) is the geometry row 'Reflections'. |
| Tables of values for linear functions | Complete a table of values for y = mx + c. | Complete the table for y = 2x + 3 with x = 0, 1, 2, 3. | G6–G9 (Eng KS3, GCSE A9; CCSS 8.F.3; Cam C3.2; MoEYS G8) | buildable-now | number (Decimal) per cell |  | Needs several Decimal boxes per item; negative x values need signed entry. |
| Plotting straight-line graphs | Draw the graph of a linear equation from a table or from its equation. | Draw y = 3 − x for −2 ≤ x ≤ 4. | G6–G9 (Eng KS3, GCSE A9; CCSS 8.F.3; Cam C3.2; MoEYS G8 Ch9, G9 U16) | new-answer-type | drawn graph (line through plotted points) |  |  |
| Gradient of a line | Find the gradient from a graph, from two points or with similar triangles. | Find the gradient of the line through (1, 3) and (4, 12). | G8–G10 (CCSS 8.EE.5–6; Eng KS3, GCSE A10; Cam C3.3, E3.3; IB SL 2.1; MoEYS G9 U15) | new-answer-type | signed number or signed fraction |  | Positive gradients alone are buildable now; negative gradients are central to the topic. |
| Gradient and intercept from y = mx + c | Identify m and c from an equation, rearranging to y = mx + c first if needed. | Find the gradient and y-intercept of 2y − 6x = 8. | G8–G10 (CCSS 8.F.3–4; Eng KS3, GCSE A9; Cam C3.5/E3.5; MoEYS G8–G9) | new-answer-type | pair of signed numbers (m, c) |  |  |
| Equation of a line from two points or a point and gradient | Find y = mx + c through given points or with a given gradient. | Find the equation of the line through (2, 5) and (6, 13). | G8–G11 (CCSS 8.F.4; Eng GCSE A9; Cam E3.5; IB SL 2.1; MoEYS G9 Ch10, G10 Ch4) | new-answer-type | linear equation (y = mx + c) |  |  |
| Qualitative graphs of real situations | Match or sketch graphs that describe a situation qualitatively (e.g. filling a vase). | Which graph shows the depth of water in this cone-shaped vase as it fills? | G8 (CCSS 8.F.5; Eng KS3) | new-answer-type | multiple choice (graph pictures) |  | Sketching from a description would be owner-todo; matching is auto-checkable. |
| Parallel lines | Recognise parallel lines from gradients and find the equation of a parallel line. | Find the line parallel to y = 3x − 1 through (2, 4). | G9–G11 (Eng GCSE A9; Cam C3.6/E3.6; IB SL 2.1; CCSS G-GPE.5; MoEYS G10) | new-answer-type | linear equation |  |  |
| Perpendicular lines | Use m₁m₂ = −1 to find perpendicular gradients and equations, including perpendicular bisectors. | Find the line perpendicular to y = 2x + 5 through (4, 1). | G9–G11 (Eng GCSE A9 (H), A level C1 [AS]; Cam E3.7; IB SL 2.1; CCSS G-GPE.5; MoEYS G10) | new-answer-type | linear equation |  |  |
| Midpoint of a segment | Find the midpoint of a segment, or an endpoint given the midpoint. | Find the midpoint of (−2, 5) and (6, −1). | G9–G11 (Cam E3.4; IB SL 3.1; MoEYS G9 U15) | new-answer-type | coordinate pair (signed, may be fractional) |  |  |
| Point dividing a segment in a given ratio | Find the point that divides a segment in the ratio m:n. | Find P on AB with A(1, 2), B(10, 14) and AP:PB = 1:2. | G9–G12 (CCSS G-GPE.6; MoEYS G10 Ch4 likely) | new-answer-type | coordinate pair |  | MoEYS content below the lesson title is unconfirmed. |
| Perimeter and area from coordinates | Compute the perimeter or area of polygons with vertices given as coordinates. | Find the area of the triangle with vertices (0, 0), (6, 0), (2, 5). | G9–G12 (CCSS G-GPE.7; Eng GCSE G11) | buildable-now | number (Decimal) |  |  |
| Coordinate geometry proofs | Use coordinates to prove geometric properties (e.g. that a quadrilateral is a parallelogram). | Prove that A(0, 0), B(4, 1), C(5, 5), D(1, 4) form a rhombus. | G9–G12 (CCSS G-GPE.4; Eng GCSE G11) | owner-todo | - |  |  |
| Speed–time graphs | Find acceleration from the gradient and distance from the area under a speed–time graph. | Find the total distance travelled from the speed–time graph. | G9–G10 (Cam E2.9.3–4; Eng GCSE A15, R14 (H)) | new-answer-type | graph in the question; number answer |  | Links to 'Estimating area under a graph' (7.2) and the mechanics travel-graph row. |
| Other forms of a line equation (y − y₁ = m(x − x₁), ax + by + c = 0) | Write and convert lines in point-gradient and general form. | Write the line through (3, −1) with gradient 2 in the form ax + by + c = 0. | G11 (Eng A level C1 [AS]; Cam P1 1.3; IB SL 2.1; MoEYS G10 Ch4) | new-answer-type | linear equation (form-specific check) |  |  |

#### 4.5 Functions and non-linear graphs

| Topic | Description | Example | Grades | Check | Answer type | Existing topic | Note |
|---|---|---|---|---|---|---|---|
| Function machines and input–output | Find outputs, inputs or rules for one- and two-step function machines. | Input 7 → ×3 → −5 → output? | G5–G10 (Eng GCSE A7; CCSS 8.F.1) | buildable-now | number (Decimal) |  | Lower-grade placement (G5–G7) comes from common practice, not a cited source. |
| Quadratic graphs: tables and plotting | Complete a table of values for a quadratic and plot the parabola. | Complete the table for y = x² − 2x − 3 for −2 ≤ x ≤ 4 and draw the graph. | G6–G10 (Eng KS3, GCSE A11; Cam C2.10; CCSS F-IF.7a; MoEYS G10 Ch5) | new-answer-type | numbers per table cell + drawn graph |  | Timing: England KS3 vs CCSS HS. The table part alone is buildable now (non-negative cells). |
| Cubic and reciprocal graphs | Plot, recognise and sketch cubic and reciprocal graphs. | Which graph is y = 1/x? | G6–G11 (Eng KS3, GCSE A12; Cam C2.10, E2.10–11; CCSS F-IF.7c; IB SL 2.8) | new-answer-type | multiple choice (graph shapes); drawn graph |  |  |
| Exponential graphs y = kˣ | Plot and recognise exponential graphs, and read values in growth/decay contexts. | Complete a table for y = 2ˣ for −2 ≤ x ≤ 4 and draw the graph. | G6–G12 (Eng KS3, GCSE A12, A14 (H); Cam E2.10.1, E2.10.3, E2.11; CCSS F-IF.7e, F-LE.1–2; IB SL 2.9; MoEYS G11 basic) | new-answer-type | drawn graph / multiple choice; table cells as fractions |  |  |
| Recognising functions | Decide whether a relation, mapping, table or graph is a function (one output per input). | Is {(1, 2), (2, 3), (1, 4)} a function? | G8–G11 (CCSS 8.F.1, F-IF.1; Cam E2.13.1; IB SL 2.2; MoEYS G10 Ch5) | new-answer-type | multiple choice (yes/no) |  |  |
| Comparing functions in different representations | Compare properties (rate of change, intercepts) of functions given as tables, graphs, equations or words. | Function A: y = 3x + 1; function B is shown in a table. Which has the greater rate of change? | G8–G12 (CCSS 8.F.2, F-IF.9) | new-answer-type | multiple choice |  | CCSS only. |
| Linear vs non-linear functions | Identify linear functions from equations, tables and graphs; distinguish linear from exponential growth. | Which of these tables shows a linear function? | G8–G12 (CCSS 8.F.3, F-LE.1, F-LE.3) | new-answer-type | multiple choice |  |  |
| Evaluating functions in function notation | Evaluate f(a), and solve f(x) = k for simple f. | f(x) = 2x² − 3. Find f(4). | G9–G11 (CCSS F-IF.2; Cam E2.13.1, P1 1.2; IB SL 2.2; MoEYS G10 Ch5) | buildable-now | number or fraction (Decimal/Fraction) |  | Signed values need signed entry. |
| Domain and range | State the domain and range of a function from its formula or graph. | Find the range of f(x) = x² + 3, x ∈ ℝ. | G9–G12 (CCSS F-IF.1, F-IF.5; Eng A level B8; Cam E2.13.1, P1 1.2; IB SL 2.2; MoEYS G10 Ch5) | new-answer-type | interval / set notation |  |  |
| Key features of graphs | Identify intercepts, turning points, intervals of increase/decrease, symmetry and end behaviour. | From the graph, state the interval on which f is increasing. | G9–G12 (CCSS F-IF.4; Eng GCSE A11; Cam C2.11/E2.11; IB SL 2.4) | new-answer-type | coordinate pair / interval, from a graph in the question |  |  |
| Average rate of change | Compute the average rate of change of a function over an interval. | Find the average rate of change of f(x) = x² from x = 1 to x = 4. | G9–G12 (CCSS F-IF.6; Eng GCSE R15 (H)) | buildable-now | number or fraction (Decimal/Fraction) |  | Negative rates need signed entry. |
| Roots, intercepts and turning point of a quadratic | Find the roots, y-intercept, axis of symmetry and vertex of a parabola from its equation or graph. | Find the vertex of y = x² − 6x + 5. | G9–G11 (Eng GCSE A11; Cam C2.11, E2.10; CCSS F-IF.7a, F-IF.8a; IB SL 2.6; MoEYS G10) | new-answer-type | coordinate pair; set of roots |  |  |
| Finding a quadratic from its vertex or intercepts | Write a quadratic function given its vertex, roots or other points. | A parabola has roots 1 and 5 and passes through (0, 10). Find its equation. | G9–G11 (Cam 0607 E3.4; IB SL 2.6) | new-answer-type | algebraic expression (quadratic) |  |  |
| Evaluating piecewise, step and absolute-value functions | Evaluate piecewise-defined, floor/step, absolute-value, square-root and cube-root functions. | f(x) = 2x + 1 for x < 0, x² for x ≥ 0. Find f(3). | G9–G12 (CCSS F-IF.7b; Eng A level B7; Cam P2 2.1; IB AHL 2.16) | buildable-now | number (Decimal) |  | Signed outputs need signed entry. |
| Graphs of root, piecewise, step and modulus functions | Sketch graphs of √x, ∛x, piecewise, step and y = \|ax + b\|. | Sketch y = \|2x − 4\|. | G9–G12 (CCSS F-IF.7b; Eng A level B7; Cam P2 2.1/P3 3.1; IB AHL 2.16; MoEYS G10, G12 adv) | new-answer-type | drawn graph, or multiple choice |  |  |
| Translations and reflections of graphs | Apply f(x) + k, f(x + k), −f(x) and f(−x) to graphs and points. | (2, 5) is on y = f(x). Where is its image on y = f(x − 3) + 1? | G9–G12 (Eng GCSE A13 (H); Cam 0607 E3.6; CCSS F-BF.3; IB SL 2.11) | new-answer-type | coordinate pair; algebraic expression for the new equation |  | Not in Cambridge 0580. |
| Evaluating composite functions | Evaluate fg(a) for given functions. | f(x) = 2x + 1, g(x) = x². Find fg(3). | G9–G12 (Eng GCSE A7 (H), A level B8; Cam E2.13.3, P1 1.2; IB SL 2.5; CCSS F-BF.1c (+)) | buildable-now | number (Decimal) |  |  |
| Composite function expressions | Find and simplify the expression for fg(x). | f(x) = 2x + 1, g(x) = x². Find gf(x). | G9–G12 (Eng GCSE A7 (H), A level B8; Cam E2.13.3, P1 1.2; IB SL 2.5) | new-answer-type | algebraic expression |  |  |
| Inverse functions | Find f⁻¹(x), evaluate f⁻¹(a), and relate the graphs by reflection in y = x. | f(x) = (3x − 2)/5. Find f⁻¹(x). | G9–G12 (Eng GCSE A7 (H), A level B8; Cam E2.13.2, P1 1.2; CCSS F-BF.4a; IB SL 2.2, 2.5) | new-answer-type | algebraic expression |  | Evaluating f⁻¹(a) levels are buildable now. |
| Building functions from context (modelling) | Write a function that models a situation, or combine standard functions. | A phone plan costs $10 plus $0.05 per minute. Write C(m). | G9–G12 (CCSS F-BF.1; Eng A level B11; IB SL 2.2) | new-answer-type | algebraic expression |  | Template contexts are auto-checkable; open-ended modelling and critiquing a model are owner-todo. |
| Sketching graphs with a graphing calculator | Use technology to sketch graphs and find features. | Use your GDC to find the minimum of y = x³ − 4x + 1. | G9–G12 (Cam 0607 E3.2; IB SL 2.3) | owner-todo | - |  | The skill is using the device; any numeric feature found is checkable. |
| Asymptotes and rational functions (ax + b)/(cx + d) | Find vertical and horizontal asymptotes and intercepts of simple rational functions, and sketch them. | Find the asymptotes of y = (2x + 1)/(x − 3). | G10–G12 (Eng A level B7; Cam 0607 E3.5; IB SL 2.8, 2.4; MoEYS G10 Ch5, G12 basic Ch3) | new-answer-type | line equations (x = a, y = b), or pair of numbers |  | MoEYS studies rational functions twice (G10, then G12 variation/sketching). |
| Stretches and combined transformations of graphs | Apply kf(x) and f(kx), alone and combined with translations. | Describe the transformation from y = x² to y = 3(x − 1)². | G11–G12 (Eng A level B9; Cam P1 1.2; CCSS F-BF.3; IB SL 2.11) | new-answer-type | coordinate pair; multiple choice for describing the transformation |  |  |
| One-to-one functions and domain restriction | Decide whether a function is one-to-one, and restrict its domain so that an inverse exists; self-inverse functions. | State the largest domain x ≥ k on which f(x) = (x − 2)² has an inverse. | G11–G12 (Cam P1 1.2; IB AHL 2.14) | new-answer-type | interval; multiple choice |  |  |
| Odd and even functions | Classify functions as odd, even or neither, algebraically or from graphs. | Is f(x) = x³ − x odd, even or neither? | G11–G12 (IB AHL 2.14) | new-answer-type | multiple choice |  | IB only in the public file; MoEYS variation studies may cover parity (unconfirmed). |
| Graphs of \|f(x)\|, f(\|x\|), 1/f(x) and [f(x)]² | Sketch graphs derived from a given graph by these operations. | Given the graph of y = f(x), sketch y = 1/f(x). | G11–G12 (IB AHL 2.16) | new-answer-type | drawn graph, or multiple choice |  | IB only. |

#### 4.6 Polynomials and rational functions

| Topic | Description | Example | Grades | Check | Answer type | Existing topic | Note |
|---|---|---|---|---|---|---|---|
| Adding, subtracting and multiplying polynomials | Perform arithmetic on polynomials and simplify. | Simplify (2x³ − x + 4) − (x³ + 3x² − 5). | G8–G12 (MoEYS G8, G10 Ch2; CCSS A-APR.1; Eng A level B6) | new-answer-type | algebraic expression (polynomial) |  | Timing: MoEYS G8 vs CCSS HS / A level. |
| Remainder theorem | Find the remainder when a polynomial is divided by (x − a) or (ax − b) without dividing. | Find the remainder when x³ − 2x + 5 is divided by (x − 2). | G10–G12 (CCSS A-APR.2; Eng A level B6 [AS]; Cam P2 2.1/P3 3.1; IB AHL 2.12; MoEYS G10 Ch2) | buildable-now | number (Decimal) |  | Negative remainders need signed entry. |
| Factor theorem and unknown coefficients | Test whether (x − a) is a factor, and find unknown coefficients from factor or remainder conditions. | (x − 3) is a factor of x³ + kx − 6. Find k. | G10–G12 (CCSS A-APR.2; Eng A level B6 [AS]; Cam P2/P3; IB AHL 2.12; MoEYS G10) | buildable-now | number or fraction (Decimal/Fraction) |  | 'Is it a factor?' levels need yes/no; negative k needs signed entry. |
| Polynomial division | Divide a polynomial by a linear or quadratic divisor to find the quotient and remainder. | Divide 2x³ + 3x² − 5x + 1 by (x + 2). | G10–G12 (MoEYS G10 Ch2; CCSS A-APR.6; Eng A level B6 [AS]; Cam P2 2.1/P3 3.1) | new-answer-type | polynomial quotient + remainder |  | A polynomial counterpart of the app's Remainder answer. |
| Factorising and solving cubics using the factor theorem | Find one factor by trial, then factorise fully and solve the polynomial equation. | Solve x³ − 6x² + 11x − 6 = 0. | G10–G12 (Eng A level B6; Cam P2/P3; IB AHL 2.12; MoEYS G10) | new-answer-type | factored expression; set of solutions |  |  |
| Sketching polynomials from their factors | Use zeros, multiplicities and end behaviour to sketch a polynomial graph. | Sketch y = (x + 1)(x − 2)². | G11–G12 (CCSS A-APR.3; Eng A level B7; IB AHL 2.12) | new-answer-type | drawn graph, or multiple choice |  |  |
| Sum and product of roots | Use the coefficients to find sums and products of a polynomial's roots without solving it. | For 2x² − 7x + 3 = 0, find α + β and αβ. | G11–G12 (IB AHL 2.12) | buildable-now | number or fraction (Decimal/Fraction) |  | IB only; also likely in MoEYS G10 quadratic equations (Vieta, unconfirmed). |
| Rational functions with quadratic denominators | Analyse and sketch functions such as (ax + b)/(cx² + dx + e): asymptotes, intercepts and turning points. | Find the asymptotes of y = (x + 1)/(x² − 4). | G11–G12 (IB AHL 2.13; MoEYS G12 basic Ch3) | new-answer-type | line equations; drawn graph |  |  |
| Partial fractions | Split a rational expression into partial fractions (distinct linear, repeated linear and quadratic factors). | Express (5x + 1)/((x − 1)(x + 2)) in partial fractions. | G12 (Eng A level B10; Cam P3 3.1; IB AHL 1.11) | new-answer-type | set of coefficients (A, B, C), or rational expression |  |  |

#### 4.7 Exponentials and logarithms

| Topic | Description | Example | Grades | Check | Answer type | Existing topic | Note |
|---|---|---|---|---|---|---|---|
| Exponential growth and decay models | Use y = a·bᵗ and y = A·e^(kt) for growth, depreciation and decay. | A population of 500 grows as P = 500e^(0.03t). Find P when t = 10. | G9–G12 (Eng GCSE R16, A level F7 [AS]; Cam E1.17, E2.10.3; CCSS F-LE.1, 2, 5; IB SL 1.3–1.4, 2.9; MoEYS G11) | buildable-now | number (Decimal, rounded) |  | Overlaps 'Compound interest and depreciation' (3.8), which covers the percentage-multiplier case. |
| Logarithms: definition and evaluation | Convert between exponential and log form, and evaluate logs exactly (bases 2, 10, e and others). | Evaluate log₂ 32. | G9–G11 (Cam 0607 E3.7, P2 2.2; CCSS F-LE.4, F-BF.5 (+); Eng A level F3 [AS]; IB SL 1.5; MoEYS G11 basic) | buildable-now | number or fraction (Decimal/Fraction) |  | Timing: 0607 has logs at G9–10; 0580 and GCSE do not. Negative values (log₃ 1/9) need signed entry. |
| Solving aˣ = b | Solve simple exponential equations using logarithms, or by matching bases. | Solve 3ˣ = 20 to 3 s.f.; solve 4ˣ = 8. | G9–G11 (Cam 0607 E3.7, P2 2.2; CCSS F-LE.4; Eng A level F5 [AS]; IB SL 1.7; MoEYS G11) | buildable-now | number or fraction (Decimal/Fraction) |  | Exact answers such as ln 5/ln 3 need an expression type. |
| Laws of logarithms | Use the product, quotient and power laws to simplify or evaluate log expressions. | Evaluate log 25 + log 4 (base 10). | G11 (Eng A level F4 [AS]; Cam P2 2.2/P3 3.2; IB SL 1.7; MoEYS G11) | buildable-now | number (Decimal) for evaluation; log expression for 'as a single log' |  | Only the evaluation levels fit today. |
| Change of base | Convert logarithms between bases and evaluate. | Evaluate log₅ 40 to 3 s.f. | G11 (IB SL 1.7) | buildable-now | number (Decimal) |  | Cambridge 9709 explicitly excludes change of base. |
| Exponential and logarithmic equations and inequalities | Solve harder equations and inequalities involving exponentials and logs (several terms, domain checks). | Solve log₂(x + 3) + log₂(x − 3) = 4; solve 2^(x+1) > 5. | G11–G12 (MoEYS G11 basic and adv; Eng A level F5; Cam P2/P3; IB SL 1.7, 2.10) | new-answer-type | set of solutions; interval |  | Exponential/log inequalities are explicit only in MoEYS (G11 adv). |
| Graphs and properties of eˣ and ln x | Sketch and use eˣ, ln x and their transformations, as inverse functions of each other. | Sketch y = ln(x − 2) and state its asymptote. | G11–G12 (Eng A level F1, F3 [AS]; Cam P2 2.2/P3 3.2; IB SL 2.9; MoEYS G11, G12 basic) | new-answer-type | drawn graph / multiple choice; line equation for asymptotes |  |  |
| Using log graphs to find parameters (y = axⁿ, y = kbˣ) | Linearise power and exponential models with logs and find the constants from the straight-line graph. | ln y against x is a line with gradient 0.4 and intercept 1.2. Find k and b in y = kbˣ. | G11 (Eng A level F6 [AS]; Cam P2 2.2/P3 3.2) | new-answer-type | pair of numbers (decimal), possibly read from a graph |  |  |

#### 4.8 Proof

| Topic | Description | Example | Grades | Check | Answer type | Existing topic | Note |
|---|---|---|---|---|---|---|---|
| Deductive proof (algebraic) | Prove general statements by algebraic deduction (e.g. about odd, even and consecutive numbers). | Prove that the sum of any three consecutive integers is a multiple of 3. | G9–G12 (Eng GCSE A6, A level A1 [AS]; IB SL 1.6) | owner-todo | - |  | Geometric proofs are Geometry rows. |
| Disproof by counter-example | Find a value that shows a general statement is false. | Find a counter-example to 'n² + n + 41 is prime for every whole number n'. | G9–G12 (Eng GCSE A6, A level A1 [AS]; IB AHL 1.15) | new-answer-type | number checked against a rule (any value that breaks the statement is accepted) |  | Auto-checkable when the checker tests the statement instead of comparing with one stored answer. |
| Proof by exhaustion | Prove a statement by checking every case. | Prove that no square number ends in 7. | G11 (Eng A level A1 [AS]) | owner-todo | - |  |  |
| Proof by contradiction | Prove statements such as '√2 is irrational' or 'there are infinitely many primes' by contradiction. | Prove that √2 is irrational. | G11–G12 (Eng A level A1; IB AHL 1.15; CCSS N-RN.3) | owner-todo | - |  |  |

### Geometry and measures

#### 5.1 2-D and 3-D shapes and their properties

| Topic | Description | Example | Grades | Check | Answer type | Existing topic | Note |
|---|---|---|---|---|---|---|---|
| Naming 2-D and 3-D shapes | Recognise and name common flat shapes and solids (cube, cuboid, cylinder, cone, sphere, pyramid, prism). | [picture of a can] What is the name of this solid? (cube / cylinder / cone) | G1–G6 (CCSS 1.G.1; Eng Y1; MoEYS G1 U22–23, G2 U20, G6 U20) | new-answer-type | multiple choice (picture in the question) |  | Starts in K in England. MoEYS repeats solids naming up to G6. |
| Kinds of lines (straight, curved, zigzag) | Tell straight, curved and zigzag lines apart. | [three lines] Which line is curved? | G1 (MoEYS G1 U22) | new-answer-type | multiple choice (picture in the question) |  | MoEYS only. |
| Defining vs non-defining attributes of shapes | Decide which attributes make a shape what it is (number of sides, closed) and which do not (colour, size, orientation). | A shape is blue, closed and has 3 straight sides. Which fact makes it a triangle? | G1–G2 (CCSS 1.G.1; Eng Y3) | new-answer-type | multiple choice |  |  |
| Composing shapes from other shapes | Put shapes together to make a new shape, or say how many small shapes make a larger one. | How many triangles like this make the hexagon? [picture] | G1 (CCSS 1.G.2) | owner-todo | - |  | Mostly hands-on. A counting variant could later use a picture in the question with a number answer. |
| Counting sides, vertices, faces and edges | State the number of sides and vertices of polygons and the faces, edges and vertices of solids. | How many edges does a cube have? | G1–G2 (CCSS 2.G.1; Eng Y2) | buildable-now | number (Decimal) |  | England a year earlier. Works as text when the shape is named; picture versions need a diagram. |
| 2-D faces of 3-D shapes; sorting shapes | Identify the flat faces on solids (a cylinder has 2 circles) and sort or compare shapes by properties. | What shape are the two flat faces of a cylinder? | G1 (Eng Y2) | new-answer-type | multiple choice |  |  |
| Classifying triangles | Name triangles by sides (equilateral, isosceles, scalene) and by angles (acute, right, obtuse). | A triangle has sides 5 cm, 5 cm and 7 cm. What kind of triangle is it? | G3–G5 (Eng Y4, Y6; CCSS 5.G.3–4; MoEYS G5 U21, G6 U18) | new-answer-type | multiple choice |  |  |
| Classifying quadrilaterals and the shape hierarchy | Classify quadrilaterals by parallel and perpendicular sides and right angles, and use the hierarchy (every square is a rectangle). | True or false: every rhombus is a parallelogram. | G3–G5 (CCSS 3.G.1, 4.G.2, 5.G.3–4; Eng Y4, Y6; MoEYS G8 Quadrilaterals) | new-answer-type | multiple choice / true-false |  |  |
| Naming polygons; regular vs irregular | Name polygons by number of sides (pentagon to decagon) and say whether a polygon is regular. | How many sides does an octagon have? | G4 (Eng Y5; Cam IGCSE C4.1) | buildable-now | number (Decimal) |  | The regular/irregular part needs multiple choice. |
| Nets of 3-D shapes | Match a solid to its net and pick which nets fold into a given solid. | Which of these four nets folds into a cube? [pictures] | G4–G10 (Eng Y5–Y6; CCSS 6.G.4; Cam IGCSE C4.2.3) | new-answer-type | multiple choice (pictures) |  | Building solids from nets is hands-on and stays with the owner. |
| Parts of a circle | Name radius, diameter, circumference, chord, tangent, arc, sector and segment; use diameter = 2 × radius. | A circle has diameter 14 cm. What is its radius? | G5–G10 (Eng Y6, GCSE G9; Cam IGCSE C4.1.3; CCSS G-CO.1; MoEYS G5 U22) | buildable-now | number (Decimal) |  | Naming parts needs multiple choice. |
| Using properties of special triangles and quadrilaterals | Use known properties (isosceles base angles equal, opposite sides of a parallelogram equal) to find missing lengths or angles. | In a parallelogram one angle is 70°. What is the angle next to it? | G6–G10 (Eng KS3, GCSE G4; Cam IGCSE C4.1/E4.1; MoEYS G8 Quadrilaterals) | buildable-now | number (Decimal) |  | Deriving the properties is owner-todo (see geometric proofs). |
| Cross-sections and solids of revolution | Name the 2-D cross-section of a solid cut by a plane, and the solid made by rotating a 2-D shape. | A cylinder is sliced parallel to its base. What shape is the cross-section? | G7–G12 (CCSS 7.G.3, G-GMD.4) | new-answer-type | multiple choice |  | CCSS only. |
| Special lines and centres of a triangle | Medians, altitudes, angle bisectors and perpendicular bisectors, where they meet (centroid, orthocentre, incentre, circumcentre) and the 2:1 median ratio. | A median of a triangle is 12 cm long. How far is the centroid from the vertex? | G8–G12 (MoEYS G8 T8 L16; CCSS G-C.3) | buildable-now | number (Decimal) |  | Mostly MoEYS. Proving concurrency is owner-todo. |
| Plans and elevations | Draw or read the plan, front elevation and side elevation of a solid. | [isometric picture of cubes] Which drawing is the front elevation? | G9–G10 (Eng GCSE G13) | new-answer-type | multiple choice (pictures) or grid drawing |  | England only. Drawing them freehand is owner-todo. |
| Lines and planes in space | Relative positions of lines and planes in 3-D: parallel, perpendicular, intersecting, skew. | In cube ABCDEFGH, are lines AB and GH parallel, intersecting or skew? | G10 (MoEYS T10b Ch11) | new-answer-type | multiple choice |  | MoEYS only. The proofs in this chapter are owner-todo. |

#### 5.2 Lines and angles

| Topic | Description | Example | Grades | Check | Answer type | Existing topic | Note |
|---|---|---|---|---|---|---|---|
| Turns and direction of turn | Whole, half, quarter and three-quarter turns, clockwise and anticlockwise; right angles as quarter turns. | You face north and make a quarter turn clockwise. Which way do you face now? | G1–G2 (Eng Y1–Y3) | new-answer-type | multiple choice (compass direction) |  | Number variants ('how many right angles in a half turn?') fit the number answer. |
| Right angles; comparing angles with a right angle | Recognise right angles and say whether an angle is smaller than, equal to or larger than a right angle. | [angle drawing] Is this angle <, = or > a right angle? | G2 (Eng Y3) | new-answer-type | angle picture in the question; comparison answer |  | The answer fits the existing comparison type; the question needs an angle drawing. |
| Points, lines, segments, rays; parallel and perpendicular lines | Identify and name points, lines, segments and rays (with notation such as AB) and parallel and perpendicular lines. | [figure] Which pair of lines is perpendicular? | G2–G7 (Eng Y3; CCSS 4.G.1; Cam IGCSE C4.1; MoEYS G4 U18, G7 L12, L14) | new-answer-type | multiple choice (picture in the question) |  | Timing: England G2 vs CCSS G4. |
| Classifying angles (acute, right, obtuse, straight, reflex) | Name an angle type from its size or a drawing. | What type of angle is 135°? | G3–G5 (CCSS 4.G.1; Eng Y4, Y5; MoEYS G4 U17, G5 U20) | new-answer-type | multiple choice |  |  |
| Measuring angles with a protractor | Read the size of a drawn angle in degrees. | [angle on a protractor] What is the size of this angle? | G4 (CCSS 4.MD.5–6; Eng Y5; Cam IGCSE C4.2.1) | new-answer-type | angle picture in the question; number answer |  |  |
| Drawing angles of a given size | Draw an angle of a given size with a protractor. | Draw an angle of 65°. | G4–G5 (CCSS 4.MD.6; Eng Y5; MoEYS G5 U20) | owner-todo | - |  | Physical drawing; an on-screen angle tool could make it checkable later. |
| Angle measure is additive (missing part of an angle) | An angle split into parts: find a missing part from the whole and the other part. | Angle ABC = 90° is split into two parts. One part is 35°. What is the other? | G4 (CCSS 4.MD.7) | buildable-now | number (Decimal) |  |  |
| Angles at a point, on a line, vertically opposite; complementary and supplementary | Find missing angles using sums of 360° and 180°, vertically opposite angles, and complements and supplements. | Two angles on a straight line; one is 65°. Find the other. | G4–G8 (Eng Y5, Y6, KS3, GCSE G3; CCSS 7.G.5; Cam IGCSE C4.6.1; MoEYS G8 U10) | buildable-now | number (Decimal) |  | Timing: England G4–5 vs CCSS G7. Diagram versions need a picture in the question. |
| Angle sum of a triangle; exterior angle | Find a missing angle of a triangle from the 180° sum, including isosceles cases and the exterior-angle property. | A triangle has angles 48° and 77°. Find the third angle. | G5–G8 (Eng Y6; CCSS 8.G.5; Cam IGCSE C4.6.1; MoEYS G7 U9) | buildable-now | number (Decimal) |  | Timing: England G5 vs CCSS G8. |
| Angle sum of a quadrilateral | Find a missing angle of a quadrilateral from the 360° sum. | Three angles of a quadrilateral are 90°, 85° and 110°. Find the fourth. | G5–G8 (Eng Y6, KS3; Cam IGCSE C4.6.1) | buildable-now | number (Decimal) |  |  |
| Angles with parallel lines (alternate, corresponding, co-interior) | Find angles formed by a transversal across parallel lines. | [parallel lines and transversal, one angle 70°] Find angle x. | G6–G8 (Eng KS3, GCSE G3; CCSS 8.G.5; Cam IGCSE C4.6.2; MoEYS G7 L14, G8 U11) | new-answer-type | figure in the question; number answer |  | A text-only version gives away the rule. |
| Interior and exterior angles of polygons | Sum of interior angles (n − 2) × 180°, exterior angles sum to 360°, angles of regular polygons, sides from an angle. | Each exterior angle of a regular polygon is 24°. How many sides does it have? | G6–G10 (Eng KS3, GCSE G3; Cam IGCSE C4.6.3/E4.6.3; MoEYS G9 T9 L17) | buildable-now | number (Decimal) |  |  |
| Bearings | Three-figure bearings: find a bearing, a back bearing, or a bearing from angle facts. | The bearing of B from A is 070°. What is the bearing of A from B? | G9–G10 (Eng GCSE G15; Cam IGCSE C4.3.2) | buildable-now | number (Decimal) |  | CCSS has no bearings. The checker drops leading zeros, so 070 and 70 are both accepted. |

#### 5.3 Symmetry

| Topic | Description | Example | Grades | Check | Answer type | Existing topic | Note |
|---|---|---|---|---|---|---|---|
| Lines of symmetry | Find or count the lines of symmetry of a shape. | How many lines of symmetry does a regular hexagon have? | G1–G7 (Eng Y2, Y4; CCSS 4.G.3; Cam IGCSE C4.5; MoEYS G7 L19) | buildable-now | number (Decimal) |  | Arbitrary figures need a picture in the question. |
| Completing a symmetric figure | Complete a shape on a grid so that a given line is a line of symmetry. | Shade squares to make the pattern symmetric about the dashed line. | G3 (Eng Y4) | new-answer-type | grid drawing (select cells) |  |  |
| Rotational symmetry (order) | State the order of rotational symmetry of a shape. | What is the order of rotational symmetry of a square? | G6–G10 (Eng KS3, GCSE G1; Cam IGCSE C4.5; CCSS G-CO.3) | buildable-now | number (Decimal) |  |  |
| Symmetry of 3-D solids | Planes of symmetry and axes of rotational symmetry of solids. | How many planes of symmetry does a cuboid with three different edge lengths have? | G9–G10 (Cam IGCSE E4.5.2) | buildable-now | number (Decimal) |  |  |

#### 5.4 Position, direction, transformations

| Topic | Description | Example | Grades | Check | Answer type | Existing topic | Note |
|---|---|---|---|---|---|---|---|
| Position and direction words | Describe position and movement: inside/outside, next to, above/below, left/right, forward/backward. | [picture] Which toy is to the left of the ball? | G1 (Eng Y1–Y2; MoEYS G1 U2) | new-answer-type | multiple choice (picture in the question) |  |  |
| Translations | Translate a point or shape (left/right, up/down, or by a column vector) and give the image coordinates. | Translate (2, −1) by 3 right and 4 up. Where is the image? | G3–G10 (Eng Y4–Y6; CCSS 8.G.1, 8.G.3; Cam IGCSE C7.1.4; MoEYS T10b Ch10) | new-answer-type | coordinate pair |  | Timing: England G3–5 vs CCSS G8. |
| Reflections | Reflect a point or shape in the axes or in lines such as x = a, y = b, y = x, y = −x. | Reflect (3, 5) in the line y = x. | G4–G10 (Eng Y5, Y6, KS3; CCSS 6.NS.6b, 8.G.1; Cam IGCSE C7.1.1/E7.1.1; MoEYS T10b Ch10) | new-answer-type | coordinate pair |  | Merged with the algebra draft's 'Reflecting points in the axes' (CCSS 6.NS.6b, G6). |
| Rotations | Rotate a point or shape by 90°, 180° or 270° about the origin or another centre. | Rotate (4, 1) by 90° anticlockwise about the origin. | G6–G10 (Eng KS3; CCSS 8.G.1; Cam IGCSE C7.1.2; MoEYS T10b Ch10) | new-answer-type | coordinate pair |  |  |
| Enlargement (dilation) and scale factor | Enlarge a shape about a centre by a scale factor, including fractional and negative factors, and find the scale factor. | Enlarge (2, 3) by scale factor 3, centre the origin. | G6–G12 (Eng KS3, GCSE G7; CCSS 8.G.3–4, G-SRT.1; Cam IGCSE C7.1.3; MoEYS T10b Ch10) | new-answer-type | coordinate pair (number for the scale factor) |  |  |
| Describing and combining transformations | Fully describe a single transformation that maps one shape to another, combine transformations, and find invariant points. | Shape A maps to shape B. Describe the single transformation. | G9–G12 (Eng GCSE G8 (H); CCSS G-CO.2, G-CO.4–6) | new-answer-type | structured description (type + parameters, e.g. rotation, 90°, centre (0, 0)) |  | Written definitions of rigid motions (G-CO.4) are owner-todo. |

#### 5.5 Congruence, similarity, constructions

| Topic | Description | Example | Grades | Check | Answer type | Existing topic | Note |
|---|---|---|---|---|---|---|---|
| Drawing triangles from given conditions | Draw a triangle from given sides and angles, and decide whether the conditions give one, many or no triangle. | Draw triangle ABC with AB = 6 cm, angle A = 40°, angle B = 70°. | G5–G10 (Eng Y6; CCSS 7.G.2; Cam IGCSE C4.2.2) | owner-todo | - |  | The 'one, many or none' question could become multiple choice later. |
| Ruler-and-compass constructions | Construct perpendicular bisectors, angle bisectors, perpendiculars from a point, and angles of 90°, 60°, 45° and 30°. | Construct the perpendicular bisector of a 7 cm line segment. | G6–G12 (Eng KS3, GCSE G2; CCSS G-CO.12; MoEYS G7 U8) | owner-todo | - |  | Timing: England G6–8 vs CCSS HS. |
| Shortest distance from a point to a line | Know that the perpendicular distance is the shortest distance from a point to a line. | Explain why the shortest path from point P to the road is perpendicular to the road. | G6–G10 (Eng KS3, GCSE G2; Cam IGCSE E6.2.3) | owner-todo | - |  | The numeric point-to-line distance belongs with coordinate geometry. |
| Congruent triangles: choosing the criterion | Decide whether two triangles are congruent and by which criterion (SSS, SAS, ASA/AAS, RHS). | Two triangles have two equal sides and the equal included angle. Which congruence condition applies? | G7–G12 (Eng KS3, GCSE G5; CCSS 8.G.2, G-CO.7–8; MoEYS G7 U9, G8 T8 L12) | new-answer-type | multiple choice |  |  |
| Geometric proofs (congruence, similarity, parallelogram theorems) | Write proofs using congruence and similarity, and prove properties such as parallelogram theorems. | Prove that the diagonals of a parallelogram bisect each other. | G8–G12 (CCSS G-CO.9–11, G-SRT.4–5; Eng GCSE G4, G6; MoEYS G8 U14) | owner-todo | - |  |  |
| Similar shapes: missing lengths | Use the scale factor between similar shapes (and the AA criterion for triangles) to find missing lengths. | Triangles ABC and DEF are similar. AB = 4, DE = 10, BC = 6. Find EF. | G8–G10 (Eng KS3, GCSE G6–7; CCSS 8.G.4–5, G-SRT.2–3; Cam IGCSE C4.4; MoEYS G9 T9 L16) | buildable-now | number (Decimal) |  |  |
| Similar shapes: area and volume scale factors | Use k, k² and k³ to find areas and volumes of similar shapes and solids. | Two similar jugs have heights 10 cm and 15 cm. The small one holds 400 ml. How much does the large one hold? | G9–G10 (Eng GCSE G19 (H), R12; Cam IGCSE E4.4.2) | buildable-now | number (Decimal) |  |  |
| Triangle proportionality (Thales' intercept theorem) | A line parallel to one side divides the other two sides proportionally; find missing segment lengths. | In triangle ABC, DE ∥ BC with AD = 3, DB = 6, AE = 4. Find EC. | G9–G12 (MoEYS G9 T9 L15; CCSS G-SRT.4; Cam IGCSE E4.4.3) | buildable-now | number (Decimal) |  | MoEYS names it as its own lesson. |
| Constructing inscribed regular polygons | Construct an equilateral triangle, square or regular hexagon inscribed in a circle. | Construct a regular hexagon inscribed in a circle of radius 4 cm. | G9–G12 (CCSS G-CO.13) | owner-todo | - |  | CCSS only. |
| Loci | Draw the set of points satisfying a condition (fixed distance from a point or line, equidistant from two points or lines) and regions. | Shade the region within 3 cm of A and closer to AB than to AD. | G9–G10 (Eng GCSE G2) | owner-todo | - |  | England only. |

#### 5.6 Circles

| Topic | Description | Example | Grades | Check | Answer type | Existing topic | Note |
|---|---|---|---|---|---|---|---|
| Chords and tangents: lengths | Use 'the perpendicular from the centre bisects a chord' and equal tangents from an external point to find lengths. | A chord is 5 cm from the centre of a circle of radius 13 cm. How long is the chord? | G8–G10 (Eng GCSE G10 (H); Cam IGCSE E4.8; MoEYS G8 U13, G9 T9 L13) | buildable-now | number (Decimal) |  |  |
| Inscribed and circumscribed circles of a triangle | Construct the incircle and circumcircle, and find their radii. | Construct the circumcircle of triangle ABC. | G8–G12 (CCSS G-C.3; MoEYS G8 T8 L16) | owner-todo | - |  | Numeric-radius variants would fit the number answer. |
| Circle theorems: finding angles | Use angle in a semicircle, tangent ⟂ radius, angle at centre, same segment, cyclic quadrilateral and alternate segment theorems to find angles. | [circle diagram] The angle at the centre is 130°. Find the angle at the circumference. | G9–G12 (Eng GCSE G10 (H); Cam IGCSE C4.7/E4.7; CCSS G-C.2; MoEYS G9 T9 L14) | new-answer-type | figure in the question; number answer |  |  |
| Circle theorem proofs | Prove the circle theorems. | Prove that the angle at the centre is twice the angle at the circumference. | G9–G12 (CCSS G-C.2–3; Eng GCSE G10 (H)) | owner-todo | - |  |  |
| Relative position of a line and a circle, or two circles | Decide whether a line is a secant, tangent or misses a circle, and whether two circles intersect, touch or are separate. | Two circles have radii 3 and 5 and centres 8 apart. Do they intersect, touch or not meet? | G9 (MoEYS G9 U6, T9 L13) | new-answer-type | multiple choice |  | MoEYS only. |
| All circles are similar; constructing tangents | Explain why all circles are similar and construct a tangent from an external point. | Construct a tangent to the circle from point P. | G9–G12 (CCSS G-C.1, G-C.4 (+)) | owner-todo | - |  | CCSS only. |
| Equation of a circle | Write the equation of a circle from its centre and radius; find the centre and radius by completing the square. | Find the centre and radius of x² + y² − 6x + 4y − 12 = 0. | G9–G12 (Eng GCSE A16 (H), A level C2; Cam 9709 P1 1.3; CCSS G-GPE.1; MoEYS G10 Ch4) | new-answer-type | coordinate pair + number (centre, radius); equation for the forward direction |  | Merged: the Algebra and Geometry drafts both had this row. |
| Tangent to a circle at a point | Find the equation of the tangent to a circle at a given point. | Find the tangent to x² + y² = 25 at (3, 4). | G9–G12 (Eng GCSE A16 (H); A level C2) | new-answer-type | linear equation |  |  |
| Conic sections (parabola, ellipse, hyperbola) | Equations of a parabola from focus and directrix, and of ellipses and hyperbolas; find foci, vertices, axes and asymptotes. | Find the focus and directrix of y² = 12x. | G11–G12 (CCSS G-GPE.2–3 (+); MoEYS T12B Ch6) | new-answer-type | coordinate pair / equation |  | CCSS only in the public file; MoEYS basic G12 has a whole chapter. |
| Parametric equations of curves | Convert between parametric and Cartesian equations of curves and find points on a parametric curve. | Find the Cartesian equation of x = 2t, y = t² − 1. | G11–G12 (Eng A level C3–C4; Cam 9709 P2 2.4/P3 3.4; MoEYS T12A Ch9) | new-answer-type | algebraic equation |  | Merged with the calculus draft's 'Parametric equations and polar coordinates'. Parametric differentiation is a calculus row. |
| Polar coordinates | Convert points and equations between polar and Cartesian coordinates. | Convert the polar point (4, π/3) to Cartesian coordinates. | G12 (MoEYS T12A Ch9) | new-answer-type | coordinate pair (exact values with surds) / polar pair |  | MoEYS only. England Further Maths (not read) likely covers it. |

#### 5.7 Measurement

| Topic | Description | Example | Grades | Check | Answer type | Existing topic | Note |
|---|---|---|---|---|---|---|---|
| Comparing and ordering lengths, masses and capacities | Compare objects directly or indirectly (longer/shorter, heavier/lighter, holds more) and order three or more. | [three ribbons] Which ribbon is the longest? | G1 (CCSS 1.MD.1; Eng Y1) | new-answer-type | multiple choice (pictures) |  | Comparing given measurements as numbers fits the < = > answer. |
| Measuring with non-standard units | Measure length, mass or capacity by counting repeated non-standard units (cubes, paper clips, cups). | [pencil next to paper clips] How many paper clips long is the pencil? | G1 (CCSS 1.MD.2; Eng Y1; MoEYS G1 U18–20) | new-answer-type | picture in the question; number answer |  | Actually measuring real objects is owner-todo. |
| Reading scales (rulers, weighing scales, jugs, thermometers) | Read a measurement from a ruler, scale, measuring jug or thermometer, including scales with unlabelled divisions. | [jug marked every 100 ml] How much water is in the jug? | G1–G5 (CCSS 2.MD.1; Eng Y2, Y3; MoEYS G2–G5 measurement units) | new-answer-type | scale picture in the question; number answer |  | England one year earlier than CCSS. |
| Estimating measures and choosing units | Choose a sensible unit or estimate for a length, mass, capacity or temperature. | Which is the best estimate for the height of a door: 2 cm, 2 m or 2 km? | G1–G12 (CCSS 2.MD.3, N-Q.1–2; Eng Y2, GCSE N13, G14) | new-answer-type | multiple choice |  |  |
| Mass and capacity word problems | Add, subtract, multiply and divide masses (g, kg) and liquid volumes (ml, L) in one- and two-step problems. | A bag of rice weighs 5 kg. 3 bags are shared among 2 families. How much does each get? | G1–G5 (CCSS 3.MD.2; Eng Y2–Y3; MoEYS G1–G5 weight and capacity units) | buildable-now | number (Decimal) |  | England earlier than CCSS. |
| Temperature | Temperatures in °C, including rises, falls and differences across zero. | The temperature was −3 °C and rose by 8 °C. What is it now? | G1–G6 (Eng Y2; Cam St5; CCSS 6.NS.5) | buildable-now | number (Decimal) |  | Levels with answers below zero need signed entry; see 'Negative numbers in context'. Reading a thermometer is in 'Reading scales'. |
| Telling time: o'clock and half past | Read and show times to the hour and half hour on an analogue clock. | [clock with hands at 3 and 12] What time is it? | G1–G2 (CCSS 1.MD.3; Eng Y1; MoEYS G1 U21, G2 U18) | new-answer-type | time hh:mm (clock picture in the question) |  | England one year earlier. |
| Telling time to five minutes; quarter past and to; a.m. and p.m. | Read analogue clocks to five minutes and use a.m./p.m. | [clock] What time is shown? Write it as hh:mm. | G1–G2 (CCSS 2.MD.7; Eng Y2) | new-answer-type | time hh:mm (clock picture in the question) |  | England one year earlier. |
| Calendar: days, weeks, months, years | Days of the week, months, days in each month, leap years, and reading a calendar. | Today is Tuesday. What day will it be in 10 days? | G1–G3 (Eng Y1–Y3; MoEYS G1 U21, G2 U18) | new-answer-type | multiple choice (day or month name) |  | Number variants (days in March) already fit the number answer. |
| Measuring the same object with different units | Measure an object twice in different units and relate the result to the unit size. | Measure your desk in hand-spans and then in centimetres. Why are the numbers different? | G2 (CCSS 2.MD.2) | owner-todo | - |  | Hands-on and explanation. |
| Length word problems | Add and subtract lengths in the same unit, and find length differences. | A rope is 85 cm long. 27 cm is cut off. How long is the rest? | G2–G3 (CCSS 2.MD.4–5; Eng Y3) | buildable-now | number (Decimal) |  |  |
| Imperial units and metric equivalents | Use inches, feet, pounds, ounces, pints and miles, and approximate conversions (5 miles ≈ 8 km). | Roughly how many km is 25 miles? | G2–G9 (CCSS 2.MD.3, 4.MD.1; Eng Y5–Y6; MoEYS G9 U4) | buildable-now | number (Decimal) |  |  |
| Telling time to the nearest minute | Read analogue clocks to the minute. | [clock] What time is shown? | G2–G3 (CCSS 3.MD.1; Eng Y3; Cam IGCSE C1.15) | new-answer-type | time hh:mm (clock picture in the question) |  | England one year earlier. |
| Elapsed time and durations | Find the end time, start time or duration of an event. | A film starts at 2:45 p.m. and lasts 1 h 50 min. When does it end? | G2–G7 (CCSS 3.MD.1; Eng Y3; Cam IGCSE C1.15; MoEYS G3 U12, G7 U6) | new-answer-type | time hh:mm (or duration h + min) |  | Durations asked in minutes only already fit the number answer. |
| 12-hour and 24-hour clock | Convert between 12-hour (a.m./p.m.) and 24-hour times, and between analogue and digital. | Write 7:40 p.m. in 24-hour time. | G2–G4 (Eng Y3, Y4; Cam IGCSE C1.15.2) | new-answer-type | time hh:mm |  | CCSS has no 24-hour clock. |
| Converting metric units (length, mass, capacity) | Convert between km, m, cm, mm; kg, g; L, ml, including decimals. | Write 3.25 km in metres. | G3–G7 (CCSS 4.MD.1, 5.MD.1; Eng Y4–Y6; Cam IGCSE C5.1; MoEYS G4 U12, G7 U6) | buildable-now | number (Decimal) |  |  |
| Calculating with mixed units | Add, subtract, multiply and divide measures given in mixed units (2 m 35 cm, 3 kg 400 g, 1 h 45 min). | 2 m 35 cm + 1 m 80 cm = ? m ? cm | G3–G5 (CCSS 4.MD.2; Eng Y5) | new-answer-type | compound measure (two numbers with units) |  | Problems whose answer is in a single unit already fit the number answer. |
| Converting units of time | Convert between seconds, minutes, hours, days, weeks, months and years. | How many minutes are in 3¼ hours? | G3–G4 (CCSS 4.MD.1; Eng Y4, Y5; Cam IGCSE C1.15.1) | buildable-now | number (Decimal) |  | Answers in mixed units (2 h 15 min) need the compound-measure answer. |
| Reading timetables | Read bus or train timetables to find times and journey lengths. | [timetable] Which is the latest bus that arrives before 09:30? | G4–G10 (Eng Y5; Cam IGCSE C1.15.3) | new-answer-type | time hh:mm (table in the question) |  | Also listed under statistics tables in the public file (6.1). |
| Converting area and volume units | Convert between cm², m², ha and between cm³, m³, ml and L, using squared and cubed factors. | How many cm² are in 2.5 m²? | G5–G10 (Eng Y6; Cam IGCSE C5.1; MoEYS G8 U8) | buildable-now | number (Decimal) |  |  |
| Time zones | Convert a time between time zones. | It is 14:00 in Phnom Penh (UTC+7). What time is it in London (UTC+0)? | G8 (MoEYS G8 U9) | new-answer-type | time hh:mm |  | MoEYS only. |

#### 5.8 Perimeter, area, volume, surface area

| Topic | Description | Example | Grades | Check | Answer type | Existing topic | Note |
|---|---|---|---|---|---|---|---|
| Perimeter of polygons | Find the perimeter of a polygon from its side lengths, or a missing side from the perimeter. | A rectangle is 8 cm by 5 cm. What is its perimeter? | G2–G7 (CCSS 3.MD.8; Eng Y3, Y4; Cam IGCSE C5.2; MoEYS G6 U17, G7 T7 L16) | buildable-now | number (Decimal) |  |  |
| Perimeter of rectilinear and composite shapes | Find the perimeter of L-shapes and other rectilinear shapes, working out missing sides. | [L-shape with some sides labelled] Find the perimeter. | G3–G4 (Eng Y4, Y5) | new-answer-type | figure in the question; number answer |  |  |
| Area by counting squares | Find area by counting unit squares, including estimating irregular shapes from half squares. | [shape on a cm grid] What is its area in cm²? | G3–G4 (CCSS 3.MD.5–6; Eng Y4, Y5) | new-answer-type | grid picture in the question; number answer |  | Estimating irregular areas needs a tolerance. |
| Area of rectangles and squares | Use area = length × width, find a missing side from the area, and use cm², m². | A rectangle has area 48 cm² and width 6 cm. What is its length? | G3–G5 (CCSS 3.MD.7, 4.MD.3; Eng Y5; Cam IGCSE C5.2; MoEYS G6 U19) | buildable-now | number (Decimal) |  |  |
| Same area, different perimeter | Find rectangles with the same area but different perimeters (and the reverse). | List all rectangles with whole-number sides and area 24 cm². | G3–G5 (CCSS 3.MD.8; Eng Y6) | new-answer-type | set of dimension pairs |  | A single-answer variant ('which has the smallest perimeter?') fits the number answer. |
| Volume by counting cubes | Find volume by counting unit cubes in a solid made of cubes. | [picture of a cube stack] How many 1 cm³ cubes make this shape? | G4–G5 (CCSS 5.MD.3–4; Eng Y5) | new-answer-type | picture in the question; number answer |  |  |
| Area of triangles | Use area = ½ × base × height; find a missing base or height. | A triangle has base 10 cm and height 7 cm. Find its area. | G5–G8 (Eng Y6; CCSS 6.G.1; Cam IGCSE C5.2; MoEYS G7 T7 L16, G8 T8 L14) | buildable-now | number (Decimal) |  | England one year earlier. |
| Area of parallelograms | Use area = base × perpendicular height. | A parallelogram has base 9 cm and height 4 cm. Find its area. | G5–G8 (Eng Y6; CCSS 6.G.1; Cam IGCSE C5.2; MoEYS G8 T8 L14) | buildable-now | number (Decimal) |  |  |
| Volume of cubes and cuboids | Use V = l × w × h (including fractional edges), find a missing edge, and add volumes of cuboid parts. | A box is 5 cm by 4 cm by 3 cm. What is its volume? | G5–G7 (CCSS 5.MD.5, 6.G.2; Eng Y6; Cam IGCSE C5.4; MoEYS G7 T7 L18) | buildable-now | number (Decimal) |  |  |
| Area of trapeziums | Use area = ½(a + b)h. | A trapezium has parallel sides 6 cm and 10 cm and height 5 cm. Find its area. | G6–G10 (CCSS 6.G.1; Eng KS3, GCSE G16; Cam IGCSE C5.2; MoEYS G8 T8 L14) | buildable-now | number (Decimal) |  |  |
| Area of rhombuses, kites and other polygons | Area of rhombuses and kites from their diagonals, and of polygons by splitting into triangles and rectangles. | A kite has diagonals 8 cm and 12 cm. Find its area. | G6–G8 (CCSS 6.G.1; MoEYS G8 T8 L14) | buildable-now | number (Decimal) |  |  |
| Surface area of cubes and cuboids | Find total surface area from a net or the dimensions. | Find the surface area of a cuboid 6 cm × 4 cm × 2 cm. | G6–G7 (CCSS 6.G.4; MoEYS G7 U13) | buildable-now | number (Decimal) |  |  |
| Circumference of a circle | Use C = πd = 2πr, and find a radius or diameter from the circumference. | Find the circumference of a circle with radius 7 cm (use π = 22/7). | G7–G10 (CCSS 7.G.4; Eng KS3, GCSE G17; Cam IGCSE C5.3.1; MoEYS G7 T7 L17) | buildable-now | number (Decimal) |  | Decimal answers need a stated rounding. Answers 'in terms of π' need a multiple-of-π answer. |
| Area of a circle | Use A = πr², and find a radius from the area. | Find the area of a circle with diameter 10 cm, to 1 decimal place. | G7–G10 (CCSS 7.G.4; Eng KS3, GCSE G17; Cam IGCSE C5.3.1; MoEYS G7 T7 L17) | buildable-now | number (Decimal) |  | Same rounding and π-form caveats as circumference. |
| Arc length and sector area (degrees) | Find arc length, sector area and sector perimeter from the angle in degrees, and the reverse. | A sector has radius 6 cm and angle 60°. Find its area. | G7–G12 (Eng GCSE G18; Cam IGCSE C5.3.2/E5.3.2; CCSS G-C.5; MoEYS G7 U11) | buildable-now | number (Decimal) |  |  |
| Area of composite shapes | Find the area of shapes made from rectangles, triangles, circles and parts of circles, including shaded regions. | [rectangle with a semicircle on one end] Find the total area. | G7–G10 (CCSS 7.G.6; Eng KS3, GCSE G17; Cam IGCSE C5.5) | new-answer-type | figure in the question; number answer |  |  |
| Volume of prisms | Use V = area of cross-section × length. | A triangular prism has cross-section area 12 cm² and length 10 cm. Find its volume. | G7–G10 (CCSS 7.G.6; Eng KS3, GCSE G16; Cam IGCSE C5.4) | buildable-now | number (Decimal) |  |  |
| Volume of cylinders | Use V = πr²h, and find r or h from the volume. | Find the volume of a cylinder with radius 3 cm and height 10 cm, to 1 d.p. | G7–G10 (CCSS 8.G.9; Eng KS3, GCSE G16; Cam IGCSE C5.4; MoEYS G9 U9) | buildable-now | number (Decimal) |  |  |
| Surface area of prisms and cylinders | Total and lateral (curved) surface area of prisms and cylinders. | Find the curved surface area of a cylinder with radius 5 cm and height 12 cm. | G7–G10 (CCSS 7.G.6; Eng GCSE G17; Cam IGCSE C5.4; MoEYS G7 T7 L18) | buildable-now | number (Decimal) |  |  |
| Volume of pyramids and cones | Use V = ⅓ × base area × height. | A cone has radius 4 cm and height 9 cm. Find its volume. | G8–G12 (CCSS 8.G.9, G-GMD.3; Eng GCSE G17; Cam IGCSE C5.4; MoEYS G9 U9, T9 L18) | buildable-now | number (Decimal) |  |  |
| Volume of spheres and hemispheres | Use V = 4/3 πr³ for spheres and half of it for hemispheres. | Find the volume of a sphere of radius 6 cm. | G8–G12 (CCSS 8.G.9; Eng GCSE G17; Cam IGCSE C5.4; IB SL 3.1; MoEYS G9 U9) | buildable-now | number (Decimal) |  |  |
| Surface area of pyramids, cones and spheres | Surface area of pyramids, cones (curved area πrl) and spheres (4πr²). | Find the total surface area of a cone with radius 3 cm and slant height 5 cm. | G9–G12 (Eng GCSE G17; Cam IGCSE C5.4; IB SL 3.1; MoEYS G9 U9) | buildable-now | number (Decimal) |  |  |
| Volume and surface area of composite solids | Solids made of two or more simple solids (cone on a cylinder, hemisphere on a cone). | A toy is a cone of height 8 cm on a hemisphere of radius 3 cm. Find its volume. | G9–G12 (Cam IGCSE C5.5/E5.5; Eng GCSE G17; IB SL 3.1) | buildable-now | number (Decimal) |  | Text descriptions work; complex solids want a picture. |
| Geometric modelling and design problems | Use geometry to model real objects and solve design problems with constraints. | Design a box with volume 1 litre that uses the least cardboard. | G9–G12 (CCSS G-MG.1, G-MG.3) | owner-todo | - |  | Open-ended. |
| Cavalieri's principle | Use and explain Cavalieri's principle for volumes of solids. | Explain why an oblique cylinder has the same volume as a right cylinder with the same base and height. | G9–G12 (CCSS G-GMD.2 (+)) | owner-todo | - |  | CCSS only. |
| Arc length and sector area (radians) | Use s = rθ and A = ½r²θ, including segment areas. | A sector has radius 5 cm and angle 1.2 rad. Find its arc length. | G11–G12 (Eng A level E1; Cam 9709 P1 1.4; IB SL 3.4; CCSS G-C.5) | buildable-now | number (Decimal) |  | Exact answers in terms of π or surds need a new answer type. |

#### 5.9 Pythagoras and trigonometry

| Topic | Description | Example | Grades | Check | Answer type | Existing topic | Note |
|---|---|---|---|---|---|---|---|
| Distance between two points | Find the length of a segment from coordinates, in 2-D and 3-D, using Pythagoras. | Find the distance between (1, 2) and (7, 10). | G6–G12 (CCSS 6.G.3, 8.G.8; Cam IGCSE E3.4; IB SL 3.1; MoEYS G9 T9 L9) | buildable-now | number (Decimal) |  | Merged: the Algebra and Geometry drafts both had this row. Exact non-integer lengths need a surd answer. |
| Pythagoras' theorem: missing side | Find the hypotenuse or a shorter side of a right triangle. | A right triangle has legs 6 cm and 8 cm. Find the hypotenuse. | G8–G10 (CCSS 8.G.7; Eng KS3, GCSE G20; Cam IGCSE C6.1; IB SL 3.3; MoEYS G9 T9 L12) | buildable-now | number (Decimal) |  | Rounded decimals fit now; exact answers like 2√13 need a surd answer. |
| Converse of Pythagoras: is it right-angled? | Use the converse to decide whether a triangle with given sides has a right angle. | Is a triangle with sides 7, 24 and 25 right-angled? | G8–G10 (CCSS 8.G.6; Eng GCSE G6) | new-answer-type | yes/no (multiple choice) |  |  |
| Proof of Pythagoras' theorem | Explain or prove Pythagoras' theorem and its converse. | Use the diagram of four triangles in a square to prove a² + b² = c². | G8 (CCSS 8.G.6; Eng KS3) | owner-todo | - |  |  |
| Pythagoras in 3-D | Find space diagonals and lengths in cuboids, pyramids and other solids. | Find the length of the space diagonal of a 3 × 4 × 12 cuboid. | G8–G12 (CCSS 8.G.7; Eng GCSE G20; Cam IGCSE E6.6; IB SL 3.3) | buildable-now | number (Decimal) |  |  |
| Right-triangle trigonometry: missing side | Use sine, cosine and tangent (SOH CAH TOA) to find a side. | The hypotenuse is 10 cm and one angle is 35°. Find the side opposite that angle. | G8–G12 (Eng KS3, GCSE G20; CCSS G-SRT.6, G-SRT.8; Cam IGCSE C6.2; IB SL 3.2; MoEYS T10b Ch6) | buildable-now | number (Decimal) |  | Timing: England G6–8 vs CCSS HS. Needs a stated rounding. |
| Right-triangle trigonometry: missing angle | Use inverse sine, cosine and tangent to find an angle. | A right triangle has opposite side 5 and adjacent side 12. Find the angle, to 1 d.p. | G8–G12 (Eng KS3, GCSE G20; CCSS G-SRT.8; Cam IGCSE C6.2; MoEYS T10b Ch6) | buildable-now | number (Decimal) |  |  |
| Sine and cosine of complementary angles | Use sin θ = cos(90° − θ). | sin 28° = cos ?° | G9–G12 (CCSS G-SRT.7) | buildable-now | number (Decimal) |  | CCSS only. |
| Angles of elevation and depression | Solve height and distance problems with angles of elevation and depression. | From 50 m away, the angle of elevation to the top of a tower is 32°. How tall is the tower? | G9–G12 (Cam IGCSE E6.2.4; IB SL 3.3; MoEYS T10b Ch6) | buildable-now | number (Decimal) |  |  |
| Exact trigonometric values | Exact sin, cos and tan of 0°, 30°, 45°, 60°, 90° (and π/6, π/4, π/3). | Write the exact value of cos 30°. | G9–G12 (Eng GCSE G21; Cam IGCSE E6.3; IB SL 3.5; CCSS F-TF.3 (+)) | new-answer-type | surd (e.g. √3/2) |  | Rational values (sin 30° = 1/2) already fit the fraction answer. |
| Sine rule | Use the sine rule to find a side or an angle, including the ambiguous case. | In triangle ABC, a = 8, A = 40°, B = 65°. Find b. | G9–G12 (Eng GCSE G22 (H), A level E1; Cam IGCSE E6.5.1; IB SL 3.2, 3.5; CCSS G-SRT.10–11 (+)) | buildable-now | number (Decimal) |  | The ambiguous case has two angles and needs a set-of-solutions answer. |
| Cosine rule | Use the cosine rule to find a side or an angle. | Find c when a = 7, b = 9 and C = 50°. | G9–G12 (Eng GCSE G22 (H), A level E1; Cam IGCSE E6.5.1; IB SL 3.2; CCSS G-SRT.10–11 (+)) | buildable-now | number (Decimal) |  |  |
| Area of a triangle: ½ab sin C | Find the area of a triangle from two sides and the included angle, or the reverse. | Find the area of a triangle with sides 6 cm and 9 cm and included angle 40°. | G9–G12 (Eng GCSE G23 (H), A level E1; Cam IGCSE E6.5.2; IB SL 3.2; CCSS G-SRT.9 (+)) | buildable-now | number (Decimal) |  |  |
| Trigonometry in 3-D; angle between a line and a plane | Find lengths and angles in 3-D shapes, including the angle between a line and a plane. | Find the angle between the space diagonal of a 3 × 4 × 5 cuboid and its base. | G9–G12 (Eng GCSE G20 (H); Cam IGCSE E6.6; IB SL 3.1) | buildable-now | number (Decimal) |  |  |
| Trigonometric ratios of any angle (unit circle) | Define sin, cos, tan on the unit circle; signs in each quadrant; related acute angles. | Given sin 30° = 0.5, what is sin 150°? | G9–G12 (Cam IGCSE E6.4; CCSS F-TF.2; Eng A level E1; IB SL 3.5; MoEYS T11B Ch3) | buildable-now | number (Decimal) or fraction |  | Exact surd values need a surd answer; negative values need signed entry. |
| Trigonometric graphs: amplitude, period, midline | Recognise sin, cos and tan graphs; read amplitude, period and midline from y = a sin(b(x + c)) + d and its graph; model periodic situations. | What is the period of y = 3 sin 2x (in degrees)? | G9–G12 (Eng GCSE A12 (H), A level E3; Cam IGCSE E6.4.1, 9709 P1 1.5; CCSS F-TF.5; IB SL 3.7; MoEYS G11 basic) | buildable-now | number (Decimal) |  | Merged with the algebra draft's 'Graphs of sin, cos and tan'. Periods in radians need a multiple-of-π answer. |
| Sketching and transforming trigonometric graphs | Sketch sin, cos and tan graphs and their transformations, or match a graph to its equation. | Which graph shows y = cos(x − 90°)? | G9–G12 (Eng GCSE A12 (H), A level E3; IB SL 3.7; Cam 9709 P1 1.5) | new-answer-type | multiple choice (graphs) or drawn graph |  | Freehand sketching is owner-todo. |
| Solving trigonometric equations in an interval | Find all solutions of equations like sin x = 0.5 or 2cos²x − cos x − 1 = 0 in a given interval. | Solve sin x = 0.5 for 0° ≤ x ≤ 360°. | G10–G12 (Cam IGCSE E6.4.2, 9709 P1 1.5; Eng A level E7; IB SL 3.8; CCSS F-TF.7 (+); MoEYS T11B Ch3, T11A Ch3) | new-answer-type | set of solutions |  |  |
| Radian measure | Convert between degrees and radians. | Convert 150° to radians in terms of π. | G11–G12 (CCSS F-TF.1; Eng A level E1; Cam 9709 P1 1.4; IB SL 3.4) | new-answer-type | multiple of π (e.g. 5π/6) |  | Radians-to-degrees fits the number answer. |
| Symmetry and periodicity of trigonometric functions | Use identities like sin(180° − x) = sin x and cos(−x) = cos x to simplify. | Simplify cos(360° − x). | G11–G12 (CCSS F-TF.4 (+); Eng A level E3; Cam 9709 P1 1.5; IB AHL 3.11) | new-answer-type | algebraic (trig) expression / multiple choice |  |  |
| Trigonometric inequalities | Solve inequalities such as sin x > ½ on an interval. | Solve cos x ≤ 0 for 0 ≤ x < 2π. | G11 (MoEYS T11B Ch3, T11A Ch3) | new-answer-type | interval / union of intervals |  | MoEYS only. |
| Inverse trigonometric functions | Principal values of arcsin, arccos, arctan, their domains, ranges and graphs. | Find arcsin(√3/2) in radians. | G11–G12 (CCSS F-TF.6–7 (+); Eng A level E4; Cam 9709 P1 1.5; IB AHL 3.9; MoEYS T12A Ch3) | new-answer-type | multiple of π (or number in degrees) |  | Merged with the calculus draft's 'Inverse trigonometric functions: values and graphs'. Degree answers already fit the number answer. |
| Basic identities: tan = sin/cos and sin² + cos² = 1 | Find one ratio from another and simplify expressions with these identities. | Given sin θ = 3/5 and θ is acute, find cos θ. | G11–G12 (CCSS F-TF.8; Eng A level E5; Cam 9709 P1 1.5; IB SL 3.5–3.6) | buildable-now | fraction (Fraction) |  | Works with Pythagorean-triple ratios; general cases give surds. |
| Compound and double angle formulae | Use sin(A ± B), cos(A ± B), tan(A ± B) and double angle formulae to find exact values and simplify. | Find the exact value of sin 75°. | G11–G12 (Eng A level E6; Cam 9709 P2 2.3/P3 3.3; IB SL 3.6, AHL 3.10; CCSS F-TF.9 (+); MoEYS T11B Ch3) | new-answer-type | surd (e.g. (√6 + √2)/4) |  | 'Given sin A = 3/5' questions with rational answers fit the fraction answer. |
| Proving trigonometric identities | Prove trig identities using the standard identities. | Prove that (1 − cos 2x)/sin 2x = tan x. | G11–G12 (CCSS F-TF.8; Eng A level E8; Cam 9709 P2 2.3; IB SL 3.6) | owner-todo | - |  |  |
| Reciprocal trig functions: sec, cosec, cot | Evaluate sec, cosec and cot and use 1 + tan² = sec² and 1 + cot² = cosec². | Given tan θ = 3/4 and θ is acute, find sec θ. | G12 (Eng A level E4–E5; Cam 9709 P2 2.3/P3 3.3; IB AHL 3.9) | buildable-now | fraction (Fraction) |  | General values need surds. |
| Harmonic form: a cos θ + b sin θ = R cos(θ ± α) | Write a cos θ + b sin θ in the form R cos(θ − α) and use it to find maxima or solve equations. | Write 3 cos θ + 4 sin θ as R cos(θ − α). | G12 (Eng A level E6; Cam 9709 P2 2.3/P3 3.3) | new-answer-type | pair of values (R, α) |  |  |
| Small-angle approximations | Use sin θ ≈ θ, cos θ ≈ 1 − θ²/2, tan θ ≈ θ for small θ in radians. | Find an approximation for (1 − cos 2θ)/θ² when θ is small. | G12 (Eng A level E2) | new-answer-type | algebraic expression |  | England only. |

#### 5.10 Vectors

| Topic | Description | Example | Grades | Check | Answer type | Existing topic | Note |
|---|---|---|---|---|---|---|---|
| Column vectors for translations | Write the column vector of a translation and translate using a vector. | Point A(2, 3) maps to A′(5, −1). Write the translation vector. | G9–G10 (Eng GCSE G24; Cam IGCSE C7.1.4, E7.2.1) | new-answer-type | vector (column) |  |  |
| Adding, subtracting and scaling vectors | Add and subtract vectors and multiply by a scalar, in column form and on diagrams. | a = (3, −2), b = (−1, 4). Find 2a − b. | G9–G12 (Eng GCSE G25; Cam IGCSE E7.2.2–3; CCSS N-VM.4–5 (+); IB AHL 3.12; MoEYS T10b Ch9) | new-answer-type | vector (column) |  |  |
| Vector paths in geometric figures | Express vectors along paths in a figure in terms of given vectors a and b, including midpoints and ratios. | OA = a, OB = b, M is the midpoint of AB. Write OM in terms of a and b. | G9–G12 (Eng GCSE G25 (H), A level J4–J5; Cam IGCSE E7.4; IB AHL 3.12; MoEYS T10b Ch9) | new-answer-type | vector expression in a and b |  |  |
| Vector proofs (parallel, collinear) | Prove that lines are parallel or points are collinear using vectors. | Show that P, Q and R are collinear. | G9–G12 (Eng GCSE G25 (H), A level J5; Cam IGCSE E7.4) | owner-todo | - |  |  |
| Magnitude and direction of a vector | Find the magnitude and direction of a vector, or its components from magnitude and direction; unit vectors. | Find the magnitude of (5, −12). | G10–G12 (Cam IGCSE E7.3; Eng A level J2; CCSS N-VM.1–3 (+); IB AHL 3.12; MoEYS T10b Ch9) | buildable-now | number (Decimal) |  | Unit vectors and component forms need a vector answer. |
| Vectors in 3-D | Use i, j, k and column vectors in three dimensions: operations, magnitude, position vectors. | Find 2(i − j + 2k) − (3i + k). | G11–G12 (Eng A level J1; Cam 9709 P3 3.7; IB AHL 3.12; MoEYS T11A Ch8) | new-answer-type | vector (3-D) |  | Magnitude-only questions already fit the number answer. |
| Scalar (dot) product and the angle between vectors | Compute a · b, test perpendicularity and find the angle between two vectors. | Find the angle between (1, 2, 2) and (2, −1, 2). | G11–G12 (Cam 9709 P3 3.7; IB AHL 3.13; MoEYS T11A Ch8) | buildable-now | number (Decimal) |  |  |
| Vector equation of a line; parallel, intersecting or skew lines | Write the vector equation of a line and decide whether two lines are parallel, intersect (and where) or are skew. | Do r = (1,0,2) + t(1,1,0) and r = (0,1,3) + s(2,0,−1) intersect? | G11–G12 (Cam 9709 P3 3.7; IB AHL 3.14–3.15; MoEYS T11A Ch8) | new-answer-type | vector equation / coordinate triple / multiple choice |  |  |
| Equations of planes; intersections of lines and planes | Vector and Cartesian equations of planes, intersections of lines and planes, angles between them. | Find the equation of the plane through (1, 0, 2) with normal (2, −1, 3). | G11–G12 (IB AHL 3.17–3.18; MoEYS T11A Ch8) | new-answer-type | plane equation / coordinate triple |  | IB only in the public file. |
| Vector (cross) product and its applications | Compute a × b and use it for normal vectors, areas of triangles and parallelograms, and volumes. | Find (1, 2, 0) × (3, 0, 1). | G12 (IB AHL 3.16; MoEYS T12A Ch7) | new-answer-type | vector (3-D); number for areas |  | Area and volume levels fit the number answer. |

### Statistics and probability

#### 6.1 Collecting and representing data

| Topic | Description | Example | Grades | Check | Answer type | Existing topic | Note |
|---|---|---|---|---|---|---|---|
| Sorting and tally charts | Sort objects into categories, count with tally marks and read tally charts. | [tally chart] How many children chose mango? | G1–G4 (CCSS 1.MD.4; Eng Y2; Cam IGCSE C9.1; MoEYS G1 U1, G4 U19) | new-answer-type | tally chart in the question; number answer |  |  |
| Reading pictograms | Read pictograms with a key of 1, 2, 10 or 100 per symbol, including half symbols, and answer 'how many more' questions. | [pictogram, each ☺ = 10 pupils] How many more pupils walk than cycle? | G1–G3 (CCSS 2.MD.10, 3.MD.3; Eng Y2, Y3; MoEYS G1 U9, G2 U21) | new-answer-type | chart in the question; number answer |  | England one year earlier. |
| Drawing charts and graphs from data | Draw pictograms, bar charts, line graphs, pie charts, frequency polygons and histograms from data. | Draw a bar chart of this favourite-fruit data. | G1–G10 (all systems; MoEYS G7 T7 L21–22, G9 U11) | new-answer-type | drawn chart (interactive chart builder) |  | Without a chart-builder input this stays with the owner. |
| Reading bar charts | Read single-unit and scaled bar charts, including comparison and two-step questions. | [bar chart] How many more books were sold on Friday than on Monday? | G2–G7 (CCSS 2.MD.10, 3.MD.3; Eng Y3; Cam IGCSE C9.4; MoEYS G7 T7 L21) | new-answer-type | chart in the question; number answer |  |  |
| Line plots (dot plots) | Read and make line plots of measurement data, including fractions of a unit. | [line plot of ribbon lengths] How many ribbons are longer than 2½ inches? | G2–G5 (CCSS 2.MD.9, 3.MD.4, 4.MD.4, 5.MD.2) | new-answer-type | plot in the question; number or fraction answer |  | CCSS only. |
| Reading tables and two-way tables | Read and complete tables and two-way tables, including missing entries from totals. | [two-way table with one blank] How many girls chose football? | G3–G12 (Eng Y4; CCSS 8.SP.4, S-ID.5; Cam IGCSE C9.1) | new-answer-type | table in the question; number answer |  | Small tables might be rendered as text tokens. |
| Line graphs and time graphs | Read and interpret line graphs of continuous data (temperature through a day). | [line graph] What was the temperature at 2 p.m.? | G3–G5 (Eng Y4–Y6) | new-answer-type | graph in the question; number answer |  | England only in primary. |
| Pie charts | Work out sector angles from frequencies and frequencies from angles or percentages. | 30 of 120 pupils chose rice. What angle is the rice sector? | G5–G10 (Eng Y6, KS3, GCSE S2; Cam IGCSE C9.4; MoEYS G7 T7 L22) | buildable-now | number (Decimal) |  | CCSS has no pie charts. Reading a drawn pie chart needs a diagram. |
| Frequency tables and grouped data | Build frequency tables from raw data, with class intervals, and read them. | Data: 12, 15, 21, 18, 25, 11, 19. How many values are in the class 10–14? | G6–G10 (Eng KS3, GCSE S2; Cam IGCSE C9.4; IB SL 4.2; MoEYS G9 T9 L6, T10b Ch7) | buildable-now | number (Decimal) |  |  |
| Histograms and frequency density | Histograms with equal and unequal class widths: frequency density = frequency ÷ class width, and frequencies from bar areas. | A class 20–35 has frequency 45. What is its frequency density? | G6–G12 (CCSS 6.SP.4; Eng GCSE S3 (H), A level L1; Cam IGCSE E9.7, 9709 S1 5.1; IB SL 4.2; MoEYS G8, G9 U11) | buildable-now | number (Decimal) |  | Timing: CCSS G6 vs England/Cambridge G9–10. Reading a drawn histogram needs a diagram. |
| Box plots (box-and-whisker) | Read and draw box plots from the five-number summary, and compare them. | Data: 3, 5, 7, 8, 9, 12, 15. Give the five-number summary. | G6–G12 (CCSS 6.SP.4; Eng GCSE S4 (H); Cam 9709 S1 5.1; IB SL 4.2) | new-answer-type | list of five numbers |  | Timing: CCSS G6 vs England G9–10 vs Cambridge/IB G11–12. Single values (Q1, median) fit the number answer. |
| Stem-and-leaf diagrams | Read stem-and-leaf diagrams (including back-to-back) and find averages and range from them. | [stem-and-leaf] What is the median? | G9–G12 (Cam IGCSE C9.4, 9709 S1 5.1) | new-answer-type | diagram in the question; number answer |  | Cambridge only. |
| Frequency polygons | Draw and read frequency polygons using class midpoints. | [frequency polygon] What frequency is plotted for the class with midpoint 25? | G9 (MoEYS G9 U11) | new-answer-type | graph in the question / drawn chart |  | MoEYS only. |
| Cumulative frequency and percentiles | Build cumulative frequency tables and read medians, quartiles and percentiles from a cumulative frequency graph. | [cumulative frequency curve, n = 80] Estimate the median. | G9–G12 (Eng GCSE S3 (H); Cam IGCSE E9.6, 9709 S1 5.1; IB SL 4.2) | new-answer-type | graph in the question; number answer with tolerance |  | Building the cumulative frequency column fits the number answer. |
| Relative frequency and percentage distributions | Turn frequencies into relative frequencies and percentages of the total. | In a class of 40, 14 walk to school. What percentage walk? | G11 (MoEYS T11B Ch7) | buildable-now | number (Decimal) |  | MoEYS only as a statistics lesson; overlaps percentages (3.8). |
| Choosing and critiquing a representation | Choose a suitable chart for the data and spot misleading graphs. | Why is this bar chart misleading? | G11–G12 (Eng A level L4; Cam 9709 S1 5.1) | owner-todo | - |  | Some variants could be multiple choice. |

#### 6.2 Summarising and interpreting data

| Topic | Description | Example | Grades | Check | Answer type | Existing topic | Note |
|---|---|---|---|---|---|---|---|
| Mean | Find the mean of a list, find a missing value from a given mean, and the mean from an ungrouped frequency table. | The mean of 4, 7, x and 9 is 6. Find x. | G5–G10 (Eng Y6; CCSS 6.SP.3, 6.SP.5c; Cam IGCSE C9.3; IB SL 4.3; MoEYS G5 U23, G8, T9 L7) | buildable-now | number (Decimal) |  | England one year earlier. |
| Statistical questions and the shape of a distribution | Tell statistical questions apart from others, and describe centre, spread and shape (symmetric, skewed). | Is 'How old am I?' a statistical question? | G6 (CCSS 6.SP.1–2) | new-answer-type | multiple choice |  | CCSS only. |
| Median, mode and range | Find the median, mode and range of a list or frequency table. | Find the median of 8, 3, 5, 12, 7, 9. | G6–G10 (CCSS 6.SP.5c; Eng KS3, GCSE S4; Cam IGCSE C9.3; IB SL 4.3; MoEYS G8, T9 L7) | buildable-now | number (Decimal) |  | Data with more than one mode needs a set answer. |
| Quartiles and interquartile range | Find lower and upper quartiles and the IQR. | Find the IQR of 2, 4, 5, 7, 8, 10, 13, 15. | G6–G12 (CCSS 6.SP.5c; Eng GCSE S4 (H); Cam IGCSE E9.3.1; IB SL 4.3) | buildable-now | number (Decimal) |  | Timing: CCSS G6 vs England G9–10. Quartile conventions differ; the generator must fix one. |
| Mean absolute deviation | Find the mean absolute deviation of a data set. | Find the MAD of 2, 4, 6, 8. | G6 (CCSS 6.SP.5c) | buildable-now | number (Decimal) |  | CCSS only. |
| Outliers | Identify outliers (for example with the 1.5 × IQR rule) and their effect on averages. | Q1 = 10 and Q3 = 18. Is 32 an outlier? | G6–G12 (Eng KS3, GCSE S4, A level L4; CCSS S-ID.3; IB SL 4.1) | new-answer-type | yes/no or set of values |  | The fence values themselves fit the number answer. |
| Comparing distributions | Compare two data sets using an average and a measure of spread, in context. | Compare the test scores of class A and class B. | G7–G12 (CCSS 7.SP.3–4, S-ID.2; Eng KS3, GCSE S4; Cam IGCSE C9.2) | owner-todo | - |  | Written comparison; parts could become multiple choice. |
| Estimated mean, modal class and median class from grouped data | Estimate the mean using class midpoints, and identify the modal class and the class containing the median. | [grouped frequency table] Estimate the mean. | G9–G12 (Eng GCSE S4; Cam IGCSE E9.3.2–3; IB SL 4.3; MoEYS G9 U12) | buildable-now | number (Decimal) |  | Naming the modal class needs an interval or multiple-choice answer; the table needs rendering. |
| Normal model to estimate population percentages | Use the normal shape (68–95–99.7 rule) to estimate the percentage of a population in a range. | Heights are normal with mean 160 cm and SD 5 cm. About what percentage are between 155 and 165 cm? | G9–G12 (CCSS S-ID.4) | buildable-now | number (Decimal) |  | Full normal calculations are the random-variables rows. |
| Standard deviation and variance | Find variance and standard deviation from raw data, frequency tables, or Σx and Σx². | n = 10, Σx = 50, Σx² = 290. Find the standard deviation. | G11–G12 (CCSS S-ID.2; Eng A level L3; Cam 9709 S1 5.1; IB SL 4.3; MoEYS T11B Ch7) | buildable-now | number (Decimal) |  | Not in IGCSE 0580/0607 or GCSE. |
| Effect of coding on mean and standard deviation | Find the new mean and SD after adding a constant or multiplying every value; use coded totals. | A data set has mean 20 and SD 4. Each value is doubled and 3 is added. Find the new mean. | G11–G12 (Cam 9709 S1 5.1; IB SL 4.3) | buildable-now | number (Decimal) |  | Asking for both values at once needs a pair answer. |

#### 6.3 Bivariate data

| Topic | Description | Example | Grades | Check | Answer type | Existing topic | Note |
|---|---|---|---|---|---|---|---|
| Scatter graphs and types of correlation | Plot or read scatter graphs and describe the association (positive, negative, none; strong, weak), spotting outliers and clusters. | [scatter graph] What type of correlation does it show? | G8–G12 (CCSS 8.SP.1, S-ID.6; Eng KS3, GCSE S6; Cam IGCSE C9.5, E9.5.2; IB SL 4.4; MoEYS T12B Ch5) | new-answer-type | multiple choice (graph in the question) |  |  |
| Line of best fit and predictions | Draw a line of best fit by eye and use it to interpolate and extrapolate, judging reliability. | [scatter graph with line] Estimate the score of a student who studied 6 hours. | G8–G10 (CCSS 8.SP.2–3; Eng GCSE S6; Cam IGCSE C9.5; IB SL 4.4) | new-answer-type | graph in the question; number with tolerance; drawn line |  | Predictions from a given line equation already fit the number answer. |
| Correlation vs causation | Explain why correlation does not show causation. | Ice-cream sales and drownings are correlated. Does one cause the other? Explain. | G9–G12 (CCSS S-ID.9; Eng GCSE S6, A level L2) | owner-todo | - |  |  |
| Residuals and fitting models to data | Fit a function to data (with technology), compute residuals and judge fit from a residual plot. | The model is y = 2x + 3. A data point is (4, 13). Find its residual. | G9–G12 (CCSS S-ID.6) | buildable-now | number (Decimal) |  | Fitting with technology and judging the residual plot stay with the owner; negative residuals need signed entry. |
| Interpreting slope and intercept of a linear model | Explain what the gradient and intercept of a fitted line mean in context. | Cost = 5 + 2 × hours. What does the 2 mean? | G9–G12 (CCSS S-ID.7; IB SL 4.4) | owner-todo | - |  | Could be multiple choice. |
| Covariance and Pearson's correlation coefficient | Compute covariance and Pearson's r from data or summary statistics, and interpret r. | Sxx = 40, Syy = 90, Sxy = 54. Find r. | G11–G12 (CCSS S-ID.8; IB SL 4.4; MoEYS T12B Ch5) | buildable-now | number (Decimal) |  | Covariance is assumed from the MoEYS lesson title. Negative r needs signed entry. |
| Regression line (y on x, x on y) | Find the least-squares regression line and use it to predict. | x̄ = 5, ȳ = 12, Sxy = 30, Sxx = 15. Find the regression line of y on x. | G11–G12 (IB SL 4.4, 4.10; MoEYS T12B Ch5) | new-answer-type | linear equation (or coefficient pair a, b) |  | England A level excludes the calculation (L2). Predictions from the line fit the number answer. |

#### 6.4 Sampling and inference

| Topic | Description | Example | Grades | Check | Answer type | Existing topic | Note |
|---|---|---|---|---|---|---|---|
| Surveys, experiments and data collection | Design questionnaires, surveys, experiments and observational studies, and collect data. | Write two good survey questions about how pupils travel to school. | G1–G12 (CCSS S-IC.3; MoEYS G1–G9 data units) | owner-todo | - |  | Data collection is hands-on. |
| Estimating a population from a sample | Use a random sample to estimate a population count or proportion. | In a sample of 50 fish, 6 are tagged. Estimate how many of 1,000 fish are tagged. | G7–G10 (CCSS 7.SP.1–2; Eng GCSE S1, S5) | buildable-now | number (Decimal) |  | Timing: CCSS G7 vs England G9–10. |
| Populations, samples and sampling methods | Population vs sample, bias, and sampling methods (simple random, systematic, stratified, quota, opportunity), including stratified sample sizes. | A school has 300 boys and 200 girls. How many girls belong in a stratified sample of 50? | G7–G12 (CCSS 7.SP.1, S-IC.1; Eng GCSE S1, A level K1; Cam 9709 S2 6.4; IB SL 4.1) | new-answer-type | multiple choice (method or bias); number for stratified sizes |  | Stratified sample sizes already fit the number answer. |
| Margin of error and comparing treatments by simulation | Use simulation to estimate a margin of error or decide whether a difference between treatments is significant. | Use 100 simulated samples to estimate the margin of error for the proportion. | G9–G12 (CCSS S-IC.4–5) | owner-todo | - |  | CCSS only. |
| Evaluating statistical reports | Judge the reliability, bias and limits of conclusions drawn from data in reports. | A website poll says 80% of people prefer brand X. Why might this be unreliable? | G9–G12 (CCSS S-IC.6; Cam IGCSE C9.2.3; IB SL 4.1) | owner-todo | - |  |  |
| Distribution of the sample mean (Central Limit Theorem) | Use X̄ ~ N(μ, σ²/n) to find probabilities about a sample mean. | X ~ N(50, 16). A sample of 25 is taken. Find P(X̄ > 51). | G12 (Cam 9709 S2 6.4) | buildable-now | number (Decimal) |  | Cambridge only. |
| Unbiased estimates and confidence intervals | Find unbiased estimates of population mean and variance, and confidence intervals for a mean or proportion. | n = 40, x̄ = 12.3, s = 2.1. Find a 95% confidence interval for μ. | G12 (Cam 9709 S2 6.4) | new-answer-type | interval |  | Cambridge only. Unbiased estimates alone fit the number answer. |

#### 6.5 Probability

| Topic | Description | Example | Grades | Check | Answer type | Existing topic | Note |
|---|---|---|---|---|---|---|---|
| Language of chance and the probability scale | Describe events as impossible, unlikely, even chance, likely or certain, and place them on a 0–1 scale. | Is rolling a 7 on a normal die impossible, unlikely or certain? | G3–G8 (Cam St5; CCSS 7.SP.5; Eng KS3, GCSE P3; Cam IGCSE C8.1; MoEYS G3 U15, G7 U14) | new-answer-type | multiple choice |  | Timing: Cambridge Primary/MoEYS G3–4 vs CCSS G7 and England G6–8. |
| Probability of a single event; complement | P(event) = favourable ÷ total for equally likely outcomes, and P(not A) = 1 − P(A). | A bag has 3 red and 5 blue balls. What is the probability of picking blue? | G6–G10 (CCSS 7.SP.7; Eng KS3, GCSE P4, P7; Cam IGCSE C8.1.3; IB SL 4.5; MoEYS G7 T7 L20, G8 T8 L11, G9 U10) | buildable-now | fraction (Fraction) |  |  |
| Experimental probability and relative frequency | Estimate probability from experiment results and compare it with theoretical probability. | A drawing pin landed point up 37 times in 50 throws. Estimate the probability of point up. | G7–G10 (CCSS 7.SP.6; Eng KS3, GCSE P1, P3, P5; Cam IGCSE C8.2; MoEYS G8 U17, G9 U10) | buildable-now | fraction or decimal |  |  |
| Sample spaces for combined events | List outcomes systematically or use a sample-space table (two dice, coin and spinner) to find probabilities. | Two dice are rolled. What is the probability the total is 8? | G7–G10 (CCSS 7.SP.8; Eng KS3, GCSE P6–P7; Cam IGCSE C8.3; IB SL 4.6) | buildable-now | fraction (Fraction) |  | Listing the whole sample space needs a set answer. |
| Tree diagrams: independent events | Use tree diagrams and the multiplication rule for independent events. | P(rain) = 0.3 each day, independently. Find P(rain on both days). | G7–G12 (CCSS 7.SP.8, S-CP.2; Eng GCSE P8; Cam IGCSE C8.3, 9709 S1 5.3; IB SL 4.6; MoEYS G9 U10) | buildable-now | fraction or decimal |  |  |
| Designing simulations; modelling with probability | Design a simulation for a compound event and critique the assumptions of a probability model. | Design a simulation with random digits to estimate the chance that 4 of 10 donors have type A blood. | G7–G12 (CCSS 7.SP.8c; Eng A level M3) | owner-todo | - |  |  |
| Expected frequency | Expected number of outcomes = probability × number of trials. | A fair die is rolled 120 times. How many sixes do you expect? | G9–G12 (Eng GCSE P2; Cam IGCSE C8.2.2; IB SL 4.5) | buildable-now | number (Decimal) |  |  |
| Dependent events (without replacement) | Find probabilities of combined events when the first outcome changes the second. | Two sweets are taken without replacement from 4 red and 6 green. Find P(both red). | G9–G12 (Eng GCSE P8; Cam 9709 S1 5.3; IB SL 4.6) | buildable-now | fraction (Fraction) |  |  |
| Venn diagrams and set notation in probability | Use Venn diagrams with union, intersection and complement to find probabilities. | Of 30 pupils, 18 play football, 12 play chess and 5 play both. Find P(neither). | G9–G12 (Cam IGCSE C8.3; Eng GCSE P6; IB SL 4.6) | buildable-now | fraction (Fraction) |  | Set notation itself is a Number row (3.12). |
| Frequency trees | Complete and use frequency trees to find counts and probabilities. | Of 200 people, 120 are adults; 30 of the adults wear glasses. How many adults do not wear glasses? | G9–G10 (Eng GCSE P1) | buildable-now | number or fraction |  | England only. |
| Addition rule and mutually exclusive events | Use P(A ∪ B) = P(A) + P(B) − P(A ∩ B), and the simpler rule for mutually exclusive events. | P(A) = 0.5, P(B) = 0.4, P(A ∩ B) = 0.2. Find P(A ∪ B). | G9–G12 (Eng GCSE P4, A level M1; CCSS S-CP.7; Cam 9709 S1 5.3; IB SL 4.6) | buildable-now | decimal or fraction |  |  |
| Conditional probability | Find P(A \| B) from two-way tables, tree diagrams or the formula P(A ∩ B)/P(B). | P(A ∩ B) = 0.12 and P(B) = 0.4. Find P(A \| B). | G9–G12 (CCSS S-CP.3–6; Eng GCSE P9 (H), A level M2; Cam IGCSE E8.4, 9709 S1 5.3; IB SL 4.6, 4.11; MoEYS T11A Ch6) | buildable-now | fraction or decimal |  |  |
| Testing whether events are independent | Decide whether two events are independent using P(A ∩ B) = P(A)P(B) or conditional probability. | P(A) = 0.3, P(B) = 0.5, P(A ∩ B) = 0.15. Are A and B independent? | G9–G12 (CCSS S-CP.2, S-CP.4–5; Cam 9709 S1 5.3; IB SL 4.11) | new-answer-type | yes/no (multiple choice) |  |  |
| Counting principle (product rule) | Count outcomes by multiplying choices, with systematic listing. | A menu has 3 starters and 4 mains. How many different meals of one starter and one main are possible? | G9–G12 (Eng GCSE N5 (H); CCSS S-CP.9 (+); Cam 9709 S1 5.2; IB AHL 1.10; MoEYS T10b Ch8) | buildable-now | number (Decimal) |  |  |
| Permutations | Count arrangements with n!, nPr, repeated items and restrictions. | How many ways can the letters of BANANA be arranged? | G10–G12 (Cam 9709 S1 5.2; IB AHL 1.10; CCSS S-CP.9 (+); MoEYS T10b Ch8) | buildable-now | number (Decimal) |  |  |
| Combinations | Count selections with nCr, including restrictions. | How many ways can a committee of 3 be chosen from 8 people? | G10–G12 (Eng A level D1; Cam 9709 S1 5.2; IB AHL 1.10; MoEYS T10b Ch8) | buildable-now | number (Decimal) |  | See also the algebra row 'Factorials and nCr'. |
| Probability using permutations and combinations | Compute probabilities by counting arrangements or selections. | 3 cards are drawn from 10 numbered cards. Find P(all three are even). | G11–G12 (CCSS S-CP.9 (+); Cam 9709 S1 5.2–5.3; MoEYS T11B Ch6) | buildable-now | fraction (Fraction) |  |  |
| Bayes' theorem | Reverse conditional probabilities with Bayes' theorem. | 1% have a disease; the test is 95% accurate both ways. Find P(disease \| positive). | G12 (IB AHL 4.13) | buildable-now | fraction or decimal |  | IB only. |

#### 6.6 Random variables and distributions

| Topic | Description | Example | Grades | Check | Answer type | Existing topic | Note |
|---|---|---|---|---|---|---|---|
| Expected value in decisions; fair games | Use expected value to judge a game or decision and to decide whether a game is fair. | A game costs R500 to play; you win R2,000 with probability 0.2. What is the expected gain per game? | G9–G12 (CCSS S-MD.5–7 (+)) | buildable-now | number (Decimal) |  | CCSS only. Negative expected gains need signed entry. Analysing a decision in words (S-MD.7) is owner-todo. |
| Discrete probability distributions | Complete a probability distribution table (find an unknown k) and find probabilities from it. | P(X = x) = kx for x = 1, 2, 3, 4. Find k. | G11–G12 (CCSS S-MD.1 (+); Eng A level N1; Cam 9709 S1 5.4; IB SL 4.7) | buildable-now | fraction (Fraction) |  |  |
| Expectation and variance of a discrete random variable | Compute E(X) and Var(X) from a distribution table. | X takes 0, 1, 2 with probabilities 0.2, 0.5, 0.3. Find E(X). | G11–G12 (CCSS S-MD.2–4 (+); Cam 9709 S1 5.4; IB SL 4.7, AHL 4.14) | buildable-now | number (Decimal) |  | England A level excludes the calculation (N1). |
| Binomial distribution | Find binomial probabilities P(X = r), P(X ≤ r), and the mean np and variance np(1 − p). | X ~ B(10, 0.3). Find P(X = 4) to 4 d.p. | G11–G12 (Eng A level N1; Cam 9709 S1 5.4; IB SL 4.8; MoEYS T12A Ch6) | buildable-now | number (Decimal) |  |  |
| Geometric distribution | Find probabilities and the mean of a geometric distribution. | P(success) = 0.2. Find the probability the first success is on the 4th trial. | G11 (Cam 9709 S1 5.4) | buildable-now | number (Decimal) |  | Cambridge only. |
| Normal distribution probabilities | Standardise and use tables or technology to find normal probabilities. | X ~ N(100, 15²). Find P(X < 120). | G11–G12 (CCSS S-ID.4; Eng A level N2; Cam 9709 S1 5.5; IB SL 4.9; MoEYS T12A Ch6) | buildable-now | number (Decimal) |  | Table vs calculator accuracy differs; checking needs a stated rounding or a tolerance. |
| Inverse normal; finding μ or σ | Find x for a given probability, or an unknown mean or standard deviation. | X ~ N(50, σ²) and P(X > 60) = 0.1. Find σ. | G11–G12 (Eng A level N2; Cam 9709 S1 5.5; IB SL 4.12) | buildable-now | number (Decimal) |  |  |
| Normal approximation to the binomial | Approximate a binomial with a normal distribution, using a continuity correction. | X ~ B(100, 0.4). Use a normal approximation to find P(X ≥ 45). | G11–G12 (Cam 9709 S1 5.5) | buildable-now | number (Decimal) |  |  |
| Choosing an appropriate distribution | Decide which distribution (binomial, normal, Poisson) models a situation and state its assumptions. | Which distribution models the number of heads in 20 coin tosses? | G12 (Eng A level N3) | new-answer-type | multiple choice |  | Writing out the assumptions is owner-todo. |
| Poisson distribution | Find Poisson probabilities and use Poisson to approximate the binomial. | X ~ Po(3). Find P(X = 2). | G12 (Cam 9709 S2 6.1) | buildable-now | number (Decimal) |  | Cambridge only. |
| Linear combinations of random variables | Find E and Var of aX + b and of sums and differences of independent random variables. | E(X) = 5, Var(X) = 2. Find Var(3X − 4). | G12 (Cam 9709 S2 6.2; IB AHL 4.14) | buildable-now | number (Decimal) |  |  |
| Continuous random variables (pdf) | Use a probability density function to find k, probabilities, the mean, the median and the variance. | f(x) = kx² for 0 ≤ x ≤ 3. Find k. | G12 (Cam 9709 S2 6.3; IB AHL 4.14) | buildable-now | fraction or number |  | Needs integration (calculus rows). |

#### 6.7 Hypothesis testing

| Topic | Description | Example | Grades | Check | Answer type | Existing topic | Note |
|---|---|---|---|---|---|---|---|
| Hypothesis test for a proportion (binomial or Poisson) | State hypotheses, find the critical region or p-value, and conclude a binomial (or Poisson) test. | H0: p = 0.4, H1: p < 0.4, n = 20, 5% level. Find the critical region. | G11–G12 (Eng A level O1–O2; Cam 9709 S2 6.5; CCSS S-IC.2) | new-answer-type | inequality / set (critical region) + multiple choice (conclusion) |  | p-values fit the number answer. |
| Hypothesis test for a normal mean | Test a population mean with known variance using the distribution of the sample mean. | n = 36, x̄ = 52.1, σ = 6. Test H0: μ = 50 against H1: μ > 50 at the 5% level. | G12 (Eng A level O3; Cam 9709 S2 6.5) | new-answer-type | number (test statistic) + multiple choice (conclusion) |  |  |
| Hypothesis test for correlation | Test whether a population correlation is zero using a critical value of r. | n = 12, r = 0.62. Is there evidence of positive correlation at the 5% level? | G12 (Eng A level O1) | new-answer-type | multiple choice (conclusion) |  | England only. |
| Type I and Type II errors | Define Type I and II errors and compute their probabilities. | The critical region is X ≤ 2 with X ~ B(20, 0.3) under H0. Find P(Type I error). | G12 (Cam 9709 S2 6.5) | buildable-now | number (Decimal) |  | Cambridge only. |

### Calculus and numerical methods

#### 7.1 Limits and differentiation

| Topic | Description | Example | Grades | Check | Answer type | Existing topic | Note |
|---|---|---|---|---|---|---|---|
| Estimating the gradient of a curve with a tangent | Draw a tangent to a curve and estimate the gradient as an instantaneous rate of change. | Draw a tangent to y = x² at x = 2 and estimate the gradient. | G9–G12 (Eng GCSE A15, R15 (H); Cam E2.12.1; IB SL 5.1) | new-answer-type | graph in the question; number with tolerance |  | Timing: GCSE Higher and IGCSE Extended at G9–10; others G11+. |
| Differentiating powers and polynomials | Differentiate axⁿ (n integer, then rational) and sums of such terms. | Differentiate y = 4x³ − 5√x + 2/x. | G9–G12 (Cam E2.12.2, P1 1.7; Eng A level G2 [AS]; IB SL 5.3, 5.6; MoEYS G11 basic Ch5, G12 basic Ch2) | new-answer-type | algebraic expression |  | Timing: IGCSE 0580 Extended at G9–10; CCSS never. |
| Gradient of a curve at a point | Evaluate dy/dx at a given x, or find x where the gradient takes a given value. | Find the gradient of y = x³ − 2x at x = 2. | G9–G12 (Cam E2.12, P1 1.7; Eng A level G2–G3; IB SL 5.3; MoEYS G11–G12) | buildable-now | number or fraction (Decimal/Fraction) |  | Negative gradients need signed entry. |
| Stationary points and their nature | Find stationary points and classify them as maxima, minima or points of inflection. | Find and classify the stationary points of y = x³ − 3x² − 9x + 2. | G9–G12 (Cam E2.12.3–4, P1 1.7; Eng A level G3 [AS]; IB SL 5.8; MoEYS G11–G12) | new-answer-type | set of coordinate pairs + multiple choice (max/min) |  |  |
| Evaluating limits of functions | Find limits by substitution, factorising (0/0 forms) or rationalising. | Find lim as x → 3 of (x² − 9)/(x − 3). | G11–G12 (Eng A level G1 [AS]; Cam P1 1.7; IB SL 5.1; MoEYS G11 basic Ch5, G12 basic Ch1) | buildable-now | number or fraction (Decimal/Fraction) |  | MoEYS gives limits a full chapter. Negative limits need signed entry; the question needs limit notation. |
| Differentiation from first principles | Derive a derivative from the limit definition. | Differentiate f(x) = x² + 3x from first principles. | G11–G12 (Eng A level G1; IB AHL 5.12; MoEYS G11 Ch5 likely) | owner-todo | - |  | The resulting derivative is checkable, but the skill is the derivation. |
| Equations of tangents and normals | Find the equation of the tangent or normal to a curve at a point. | Find the tangent to y = x² − 3x at x = 4. | G11–G12 (Eng A level G3 [AS]; Cam P1 1.7; IB SL 5.4; MoEYS G11–G12) | new-answer-type | linear equation |  |  |
| Increasing and decreasing functions | Use the sign of f′(x) to find the intervals where f is increasing or decreasing. | Find where f(x) = x³ − 12x is decreasing. | G11–G12 (Eng A level G3 [AS]; Cam P1 1.7; IB SL 5.2; MoEYS G11) | new-answer-type | interval or union of intervals |  |  |
| Second derivative, concavity and points of inflection | Use f″(x) to find concavity and points of inflection. | Find the point of inflection of y = x³ − 6x² + 4. | G11–G12 (Eng A level G1, G3; Cam P1 1.7; IB SL 5.7–5.8; MoEYS G12) | new-answer-type | coordinate pair; interval |  |  |
| Variation tables and curve sketching | Build a full sign/variation table (domain, limits, f′ sign, extrema, asymptotes) and sketch the curve, for polynomial, rational, irrational, exponential and log functions. | Study the variation of f(x) = (x² + 1)/(x − 1) and sketch its graph. | G11–G12 (MoEYS G11 basic, G12 basic Ch3, G12 adv Ch3; public via Eng G3, IB SL 5.8) | new-answer-type | structured sign/variation table; drawn graph for the sketch |  | A core MoEYS exam format with no direct public equivalent. The table is auto-checkable if structured; a free sketch is owner-todo. |
| Optimisation problems | Use derivatives to maximise or minimise a quantity in context. | An open box is made from a 20 cm square sheet. Find the maximum volume. | G11–G12 (Eng A level G3; IB SL 5.8, AHL 5.14; MoEYS G11–G12) | buildable-now | number (Decimal) |  | Only the final value is checked; needs context templates. |
| Rates of change and connected (related) rates | Use the chain rule to link rates of change of related quantities. | A sphere's radius grows at 0.2 cm/s. How fast is its volume growing when r = 5? | G11–G12 (Eng A level G4; Cam P1 1.7; IB AHL 5.14) | buildable-now | number (Decimal) |  | Exact answers in π need a multiple-of-π type; rounded decimals fit today. |
| Derivatives of eˣ, ln x, sin x, cos x and tan x | Differentiate the standard exponential, logarithmic and trigonometric functions. | Differentiate y = 3eˣ − 2 ln x + sin x. | G11–G12 (Eng A level G2; Cam P2 2.4/P3 3.4; IB SL 5.6, AHL 5.15; MoEYS G12) | new-answer-type | algebraic expression (with transcendental functions) |  |  |
| Chain rule | Differentiate composite functions. | Differentiate y = (3x² − 1)⁵. | G11–G12 (Cam P1 1.7 [AS]; Eng A level G4; IB SL 5.6; MoEYS G12) | new-answer-type | algebraic expression |  | Timing: 9709 in P1 (G11), England A2 only (G12). |
| Product rule | Differentiate products of functions. | Differentiate y = x² eˣ. | G11–G12 (Eng A level G4; Cam P2 2.4/P3 3.4; IB SL 5.6; MoEYS G12) | new-answer-type | algebraic expression |  |  |
| Quotient rule | Differentiate quotients of functions. | Differentiate y = (2x + 1)/(x² + 3). | G11–G12 (Eng A level G4; Cam P2 2.4/P3 3.4; IB SL 5.6; MoEYS G12) | new-answer-type | algebraic expression |  |  |
| Counting real roots with the derivative | Use monotonicity and extrema to find how many real solutions an equation has. | How many real roots does x³ − 3x + 1 = 0 have? | G11 (MoEYS G11 adv Ch5) | buildable-now | number (Decimal) |  | MoEYS only; content below the lesson title is inferred. |
| Proving inequalities with derivatives | Prove an inequality holds on an interval by studying the variation of a function. | Prove that eˣ ≥ 1 + x for all real x. | G11 (MoEYS G11 adv Ch5) | owner-todo | - |  | MoEYS only. |
| Limits at infinity and infinite limits | Find limits as x → ±∞, and one-sided infinite limits; relate them to asymptotes. | Find lim as x → ∞ of (3x² + 1)/(2x² − x). | G12 (MoEYS G12 basic Ch1; IB SL 5.1 / AHL 5.13) | new-answer-type | number or ±∞ (or 'does not exist') |  | Mainly MoEYS as a drill topic. |
| Continuity and differentiability | Decide whether a function is continuous or differentiable at a point, and find a parameter that makes it continuous. | f(x) = x² + k for x < 1, 3x for x ≥ 1. Find k so that f is continuous. | G12 (MoEYS G12 basic Ch1; IB AHL 5.12) | buildable-now | number (Decimal) for the parameter |  | Yes/no levels need multiple choice. |
| Derivatives of aˣ, logₐ x, reciprocal and inverse trig functions | Differentiate aˣ, logₐ x, sec, cosec, cot, arcsin, arccos and arctan. | Differentiate y = arctan(2x). | G12 (Eng A level G2; Cam P3 3.4; IB AHL 5.15; MoEYS G12 adv Ch3) | new-answer-type | algebraic expression |  |  |
| Implicit differentiation | Find dy/dx for curves defined implicitly. | Find dy/dx for x² + xy + y² = 7. | G12 (Eng A level G5; Cam P2 2.4/P3 3.4; IB AHL 5.14) | new-answer-type | algebraic expression in x and y |  | Gradient at a given point is buildable now. |
| Parametric differentiation | Find dy/dx for curves given parametrically. | x = t², y = t³ − t. Find dy/dx in terms of t. | G12 (Eng A level G5; Cam P2 2.4/P3 3.4; MoEYS G12 adv Ch9) | new-answer-type | algebraic expression in t |  |  |
| Limits by l'Hôpital's rule or Maclaurin series | Evaluate indeterminate limits using l'Hôpital's rule or series expansions. | Find lim as x → 0 of (1 − cos x)/x². | G12 (IB AHL 5.13) | buildable-now | number or fraction (Decimal/Fraction) |  | IB only. |
| Maclaurin series | Find Maclaurin series of functions and use them for approximation. | Find the Maclaurin series of e^(2x) up to x³. | G12 (IB AHL 5.19) | new-answer-type | algebraic expression (polynomial) |  | IB only. Single-coefficient levels are buildable now. |
| Limits of sequences | Find the limit of a sequence, or show that it diverges; convergence of monotone bounded sequences. | Find lim as n → ∞ of (2n + 1)/(3n − 4). | G12 (MoEYS G12 adv Ch1; public only sum to infinity, Eng D5, IB SL 1.8) | buildable-now | number or fraction (Decimal/Fraction) |  | MoEYS only as a chapter. 'Diverges' answers need a number-or-∞ / multiple-choice type. |

#### 7.2 Integration

| Topic | Description | Example | Grades | Check | Answer type | Existing topic | Note |
|---|---|---|---|---|---|---|---|
| Estimating area under a graph | Estimate the area under a curve or speed–time graph by counting squares or splitting into strips. | Estimate the distance travelled from this velocity–time graph between t = 0 and t = 10. | G9–G10 (Eng GCSE A15 (H); Cam E2.9.4) | new-answer-type | graph in the question; number with tolerance |  |  |
| Indefinite integration of powers and polynomials | Integrate xⁿ (n ≠ −1) and sums of such terms, including the constant of integration. | Find ∫(6x² − 4x + 3) dx. | G11–G12 (Eng A level H2 [AS]; Cam P1 1.8; IB SL 5.5, 5.10; MoEYS G12 basic Ch4) | new-answer-type | algebraic expression (+ C) |  |  |
| Integrating (ax + b)ⁿ | Integrate powers of linear expressions. | Find ∫(3x − 1)⁴ dx. | G11 (Cam P1 1.8; IB SL 5.10) | new-answer-type | algebraic expression (+ C) |  |  |
| Finding a function from its derivative and a point | Use integration and a known point to find the particular function or curve. | dy/dx = 3x² − 2 and the curve passes through (1, 4). Find y. | G11–G12 (Eng A level H2 [AS]; Cam P1 1.8; IB SL 5.5) | new-answer-type | algebraic expression |  |  |
| Evaluating definite integrals | Evaluate definite integrals using the Fundamental Theorem of Calculus. | Evaluate ∫ from 1 to 3 of (x² + 1) dx. | G11–G12 (Eng A level H1, H3 [AS]; Cam P1 1.8; IB SL 5.5, 5.11; MoEYS G12 basic Ch4, G12 adv Ch4) | buildable-now | number or fraction (Decimal/Fraction) |  | Needs integral-sign rendering; negative values need signed entry; answers with ln or e need an exact-expression type. |
| Simple improper integrals | Evaluate integrals with an infinite limit or an integrable singularity. | Evaluate ∫ from 1 to ∞ of 1/x² dx. | G11 (Cam P1 1.8) | buildable-now | number or fraction (Decimal/Fraction) |  | Cambridge only. |
| Area under a curve | Find the area between a curve and the x-axis (or y-axis), handling regions below the axis. | Find the area between y = x² − 4x and the x-axis. | G11–G12 (Eng A level H3 [AS]; Cam P1 1.8; IB SL 5.5, 5.11, AHL 5.17; MoEYS G12 basic) | buildable-now | number or fraction (Decimal/Fraction) |  |  |
| Area between curves | Find the area enclosed between two curves or a curve and a line. | Find the area enclosed by y = x² and y = 2x + 3. | G11–G12 (Eng A level H3; Cam P1 1.8; IB SL 5.11; MoEYS G12) | buildable-now | number or fraction (Decimal/Fraction) |  |  |
| Volumes of revolution | Find volumes of solids formed by rotating a region about the x- or y-axis. | Find the volume when y = √x, 0 ≤ x ≤ 4, is rotated 360° about the x-axis. | G11–G12 (Cam P1 1.8 [AS]; IB AHL 5.17; MoEYS G12 adv Ch4) | new-answer-type | exact multiple of π (e.g. 8π) |  | Not in England A level Maths. Rounded decimal answers are buildable now. |
| Integration using trigonometric identities | Integrate sin²x, cos²x, tan²x and similar by rewriting them with identities. | Find ∫ sin²x dx. | G11–G12 (Cam P2 2.5/P3 3.5) | new-answer-type | algebraic expression (+ C) |  | Cambridge only by name. |
| Arc length | Find the length of a curve between two points by integration. | Find the arc length of y = (2/3)x^(3/2) from x = 0 to x = 3. | G12 (MoEYS G12 adv Ch4) | buildable-now | number or fraction (Decimal/Fraction) |  | MoEYS only. |
| Integration as the limit of a sum (Riemann sums) | Approximate an area with rectangles and understand the definite integral as their limit. | Use 4 rectangles of equal width (left endpoints) to estimate ∫ from 0 to 2 of x² dx. | G12 (Eng A level H4) | buildable-now | number or fraction (Decimal/Fraction) |  | Computing the rectangle sum fits today; the 'limit of a sum' concept is owner-todo. |
| Integrating eᵏˣ, 1/x, sin, cos and sec² | Integrate the standard exponential, reciprocal and trigonometric functions. | Find ∫(e^(3x) + 2/x) dx. | G12 (Eng A level H2; Cam P2 2.5/P3 3.5; IB SL 5.10; MoEYS G12 basic Ch4) | new-answer-type | algebraic expression (+ C) |  |  |
| Integration by substitution (incl. reverse chain rule) | Integrate by a change of variable, or by recognising a reverse chain rule. | Find ∫ 2x(x² + 1)⁵ dx. | G12 (Eng A level H5; Cam P3 3.5; IB SL 5.10, AHL 5.16; MoEYS G12) | new-answer-type | algebraic expression (+ C) |  | Definite versions are buildable now. |
| Integration by parts | Integrate products using integration by parts, including repeated use. | Find ∫ x eˣ dx. | G12 (Eng A level H5; Cam P3 3.5; IB AHL 5.16; MoEYS G12 likely) | new-answer-type | algebraic expression (+ C) |  |  |
| Integration using partial fractions | Integrate rational functions by splitting them into partial fractions. | Find ∫ 1/((x − 1)(x + 2)) dx. | G12 (Eng A level H6; Cam P3 3.5; IB AHL 5.15) | new-answer-type | algebraic expression with logs (+ C) |  |  |
| Integrals of the form f′(x)/f(x) | Recognise and integrate f′(x)/f(x) as ln\|f(x)\|. | Find ∫ 2x/(x² + 5) dx. | G12 (Cam P3 3.5) | new-answer-type | algebraic expression (+ C) |  | Cambridge only by name. |

#### 7.3 Differential equations

| Topic | Description | Example | Grades | Check | Answer type | Existing topic | Note |
|---|---|---|---|---|---|---|---|
| Forming differential equations from context | Write a differential equation from a description of a rate of change. | The rate of decrease of mass m is proportional to m. Write a differential equation. | G12 (Eng A level G6; Cam P3 3.8) | new-answer-type | differential equation, checked for equivalence |  | Template contexts are auto-checkable; unusual or open contexts are owner-todo. |
| Separable first-order differential equations | Solve separable differential equations for general and particular solutions. | Solve dy/dx = xy with y = 2 when x = 0. | G12 (Eng A level H7, H8; Cam P3 3.8; IB AHL 5.18) | new-answer-type | equation / algebraic expression (y = ...) |  | Evaluating the particular solution at a given x is buildable now. |
| Interpreting solutions of differential equations in context | Interpret a solution's meaning, long-term behaviour and limitations in context. | Explain what happens to the population as t → ∞, and comment on the model. | G12 (Eng A level H8; Cam P3 3.8) | owner-todo | - |  | Purely numeric parts (the long-run value) could be checked automatically. |
| Euler's method | Approximate the solution of a differential equation step by step. | dy/dx = x + y, y(0) = 1, h = 0.1. Estimate y(0.3). | G12 (IB AHL 5.18) | buildable-now | number (Decimal) |  | IB only. |
| Homogeneous differential equations (y = vx) | Solve homogeneous first-order equations by the substitution y = vx. | Solve dy/dx = (x + y)/x. | G12 (IB AHL 5.18) | new-answer-type | equation / algebraic expression |  | IB only. |
| First-order linear differential equations (integrating factor) | Solve y′ + P(x)y = Q(x) with an integrating factor. | Solve dy/dx + 2y = eˣ. | G12 (IB AHL 5.18; MoEYS G12 adv Ch5) | new-answer-type | equation / algebraic expression |  | IB and MoEYS advanced. |
| Second-order linear differential equations | Solve ay″ + by′ + cy = 0 (and simple non-homogeneous cases) using the auxiliary equation. | Solve y″ − 5y′ + 6y = 0. | G12 (MoEYS G12 adv Ch5) | new-answer-type | algebraic expression with arbitrary constants |  | MoEYS only (England Further Maths not read). |

#### 7.4 Kinematics with calculus

| Topic | Description | Example | Grades | Check | Answer type | Existing topic | Note |
|---|---|---|---|---|---|---|---|
| Kinematics using differentiation and integration | Move between displacement, velocity and acceleration as functions of time by differentiating and integrating. | v = 3t² − 4t. Find the acceleration at t = 2. | G11–G12 (Eng A level Q4 [AS]; Cam M1 4.2; IB SL 5.9) | buildable-now | number (Decimal) |  | Value-at-a-time levels fit today; asking for v(t) or s(t) needs an expression type. |

#### 7.5 Numerical methods

| Topic | Description | Example | Grades | Check | Answer type | Existing topic | Note |
|---|---|---|---|---|---|---|---|
| Rearranging an equation into iterative form x = g(x) | Show that an equation can be rearranged into a given iterative form. | Show that x³ − 3x − 5 = 0 can be written as x = ∛(3x + 5). | G9–G12 (Eng GCSE A20 (H), A level I2; Cam P2 2.6/P3 3.6) | owner-todo | - |  | 'Show that' algebra. Asking for a g(x) would need an expression type. |
| Fixed-point iteration | Use xₙ₊₁ = g(xₙ) to approximate a root to a given accuracy. | Use xₙ₊₁ = ∛(3xₙ + 5) with x₀ = 2 to find the root to 3 d.p. | G9–G12 (Eng GCSE A20 (H), A level I2; Cam P2 2.6/P3 3.6) | buildable-now | number (Decimal) |  |  |
| Locating roots by change of sign | Show a root lies in an interval by a sign change, and find the integer or decimal interval. | Between which two consecutive integers does the root of x³ − 5x + 1 = 0 (x > 1) lie? | G11–G12 (Eng A level I1; Cam P2 2.6/P3 3.6) | buildable-now | number (Decimal) for the lower bound |  | The written justification is owner-todo. |
| Trapezium rule | Estimate a definite integral with the trapezium rule, and say whether it over- or under-estimates. | Use the trapezium rule with 4 strips to estimate ∫ from 0 to 2 of √(1 + x³) dx. | G11–G12 (Eng A level I3; Cam P2 2.5) | buildable-now | number (Decimal) |  | Over/under-estimate levels need multiple choice. |
| Cobweb and staircase diagrams | Illustrate convergence or divergence of an iteration on a graph. | Draw a cobweb diagram for xₙ₊₁ = cos xₙ starting at x₀ = 1. | G12 (Eng A level I2) | new-answer-type | drawn graph; multiple choice (cobweb/staircase, converges/diverges) |  | England only. Classifying a given diagram is easy; drawing is hard to check. |
| Newton–Raphson method | Use Newton–Raphson iterations to approximate roots. | Use Newton–Raphson with x₀ = 2 to find a root of x³ − 2x − 5 = 0 to 4 d.p. | G12 (Eng A level I2) | buildable-now | number (Decimal) |  | England only. |

### Mechanics

| Topic | Description | Example | Grades | Check | Answer type | Existing topic | Note |
|---|---|---|---|---|---|---|---|
| SI units and converting mechanics quantities | Use SI units for velocity, acceleration, force, weight and moment, and convert (km/h to m/s). | A 5 kg mass: what is its weight in newtons (g = 9.8)? | G11–G12 (Eng A level P1; Cam 9709 M1) | buildable-now | number (Decimal) |  | Rate conversion itself is the Number row 'Converting rates and compound units'. |
| Displacement–time and velocity–time graphs | Use gradients and areas of travel graphs to find velocity, acceleration and distance. | [v–t graph: 0 to 12 m/s in 4 s, then constant for 6 s] Find the total distance. | G11–G12 (Eng A level Q1–Q2; Cam 9709 M1 4.2) | new-answer-type | graph in the question; number answer |  | Graphs described in words already fit the number answer. The GCSE-level version is the algebra row 'Speed–time graphs'. |
| Constant acceleration formulae (suvat) in one dimension | Use v = u + at, s = ut + ½at², v² = u² + 2as and related formulae, including vertical motion under gravity. | A car accelerates from 5 m/s at 2 m/s² for 6 s. How far does it travel? | G11–G12 (Eng A level Q3; Cam 9709 M1 4.2) | buildable-now | number (Decimal) |  |  |
| Newton's laws: F = ma | Use Newton's second law with weight, tension, thrust and resistance. | A 1,200 kg car has driving force 3,000 N and resistance 600 N. Find its acceleration. | G11–G12 (Eng A level R1–R3; Cam 9709 M1 4.4) | buildable-now | number (Decimal) |  |  |
| Connected particles and pulleys | Find acceleration and tension for particles connected by strings, over pulleys, and in towing. | Masses 3 kg and 5 kg hang over a smooth pulley. Find the acceleration. | G11–G12 (Eng A level R4; Cam 9709 M1 4.4) | buildable-now | number (Decimal) |  |  |
| Resolving forces and resultants | Resolve forces into components and find the magnitude and direction of a resultant. | Forces of 5 N east and 12 N north act on a particle. Find the resultant's magnitude. | G11–G12 (Eng A level R4–R5; Cam 9709 M1 4.1) | buildable-now | number (Decimal) |  | Component form needs a vector answer. |
| Equilibrium of a particle | Find unknown forces or angles when a particle is in equilibrium. | A 4 kg mass hangs from two strings at 30° and 60° to the horizontal. Find the tension in the first string. | G11–G12 (Eng A level R5; Cam 9709 M1 4.1) | buildable-now | number (Decimal) |  | Asking for both tensions at once needs a pair answer. |
| Friction and inclined planes | Use F ≤ μR, limiting friction and motion on rough and smooth slopes. | A 2 kg block rests on a rough slope at 25°. Find the least μ that stops it sliding. | G11–G12 (Eng A level R6; Cam 9709 M1 4.1, 4.4) | buildable-now | number (Decimal) |  |  |
| Momentum and impulse | Use conservation of momentum and impulse = change in momentum for direct collisions. | A 2 kg ball at 3 m/s hits a 1 kg ball at rest and they stick together. Find their common speed. | G11 (Cam 9709 M1 4.3) | buildable-now | number (Decimal) |  | Cambridge only. |
| Work, energy and power | Use work done, kinetic and potential energy, the work–energy principle and power = force × velocity. | A car of mass 800 kg moves at 15 m/s against resistance 400 N. Its engine power is 9 kW. Find its acceleration. | G11 (Cam 9709 M1 4.5) | buildable-now | number (Decimal) |  | Cambridge only. |
| Modelling assumptions and force diagrams | Draw force diagrams and state and critique modelling assumptions (particle, light string, smooth surface). | Draw a force diagram for a box pulled up a rough slope, and state one modelling assumption. | G11–G12 (Eng A level P1, R1; Cam 9709 M1) | owner-todo | - |  | Implicit in both A-level specs rather than a listed row. |
| Constant acceleration with vectors (2-D) | Use suvat in vector form for motion in a plane. | u = (2i + 3j) m/s, a = (i − j) m/s². Find the velocity after 4 s. | G12 (Eng A level Q3) | new-answer-type | vector |  | Speed (magnitude) variants fit the number answer. |
| Projectiles | Find time of flight, range, maximum height and velocity of a projectile. | A ball is kicked at 20 m/s at 30° to the horizontal. Find its range (g = 9.8). | G12 (Eng A level Q5) | buildable-now | number (Decimal) |  | England only. |
| Moments | Take moments to solve problems with beams, rods and ladders in equilibrium. | A 4 m uniform beam of weight 200 N rests on supports at its ends. A 300 N load is 1 m from one end. Find the reaction at that end. | G12 (Eng A level S1) | buildable-now | number (Decimal) |  | England only. |

## Existing app topics

All 12 topics in the app map to one inventory row each. Their lower and decimal levels also cover other rows; those rows say so in their note instead of repeating the id.

| App topic id | Inventory row | Other rows its levels cover |
|---|---|---|
| `add` | Column addition of multi-digit whole numbers | Addition facts within 10 and 20; Add and subtract within 100; Add and subtract within 1000; Adding decimals |
| `subtract` | Column subtraction of multi-digit whole numbers | Subtraction facts within 10 and 20; Add and subtract within 100; Add and subtract within 1000; Subtracting decimals |
| `multiply` | Long multiplication | Multi-digit × one-digit multiplication; Multiplying decimals |
| `divide` | Long division | Division facts; Division with remainders; Dividing decimals (whole ÷ whole with a decimal result) |
| `fraction-simplify` | Simplifying fractions | — |
| `fraction-compare` | Comparing fractions | — |
| `fraction-to-mixed` | Improper fraction to mixed number | — |
| `fraction-to-improper` | Mixed number to improper fraction | — |
| `fraction-add` | Adding fractions | Adding tenths and hundredths (loosely) |
| `fraction-subtract` | Subtracting fractions | — |
| `fraction-multiply` | Multiplying fractions | Fraction × whole number |
| `fraction-divide` | Dividing fractions | Dividing unit fractions and whole numbers (whole ÷ fraction) |

## Owner to-do

Topics that cannot reasonably be generated and checked automatically. Many other rows also mention an owner-todo *part* (for example "explain why" or a hands-on version) in their note.

**Number** (7)

- Explaining why addition and subtraction strategies work (G2): Explain a strategy using place value and properties.
- Divisibility proofs and number theory reasoning (G12): Prove divisibility statements and properties of primes, GCD and LCM.
- Using a calculator and interpreting its display (G6–G10): Enter calculations efficiently and read the display in context (money, time, rounding).
- Choosing a sensible level of accuracy (G9–G12): Decide what accuracy suits a measurement or reported result.
- Sums and products of rational and irrational numbers (G9–G12): Explain why a sum or product is rational or irrational.
- Loci and geometry with complex numbers (G11–G12): Sketch loci such as |z − a| = r or arg(z − a) = θ; use complex numbers for geometric results.
- Fundamental Theorem of Algebra (G9–G12): Know that a degree-n polynomial has n complex roots, counted with multiplicity.

**Algebra and functions** (7)

- Proving algebraic identities (G9–G12): Show that two expressions are identically equal, working from LHS to RHS.
- Proof by mathematical induction (G11–G12): Prove statements about integers (sums, divisibility, inequalities) by induction.
- Coordinate geometry proofs (G9–G12): Use coordinates to prove geometric properties (e.g. that a quadrilateral is a parallelogram).
- Sketching graphs with a graphing calculator (G9–G12): Use technology to sketch graphs and find features.
- Deductive proof (algebraic) (G9–G12): Prove general statements by algebraic deduction (e.g. about odd, even and consecutive numbers).
- Proof by exhaustion (G11): Prove a statement by checking every case.
- Proof by contradiction (G11–G12): Prove statements such as '√2 is irrational' or 'there are infinitely many primes' by contradiction.

**Geometry and measures** (17)

- Composing shapes from other shapes (G1): Put shapes together to make a new shape, or say how many small shapes make a larger one.
- Drawing angles of a given size (G4–G5): Draw an angle of a given size with a protractor.
- Geometric proofs (congruence, similarity, parallelogram theorems) (G8–G12): Write proofs using congruence and similarity, and prove properties such as parallelogram theorems.
- Drawing triangles from given conditions (G5–G10): Draw a triangle from given sides and angles, and decide whether the conditions give one, many or no triangle.
- Ruler-and-compass constructions (G6–G12): Construct perpendicular bisectors, angle bisectors, perpendiculars from a point, and angles of 90°, 60°, 45° and 30°.
- Constructing inscribed regular polygons (G9–G12): Construct an equilateral triangle, square or regular hexagon inscribed in a circle.
- Loci (G9–G10): Draw the set of points satisfying a condition (fixed distance from a point or line, equidistant from two points or lines) and regions.
- Shortest distance from a point to a line (G6–G10): Know that the perpendicular distance is the shortest distance from a point to a line.
- Circle theorem proofs (G9–G12): Prove the circle theorems.
- All circles are similar; constructing tangents (G9–G12): Explain why all circles are similar and construct a tangent from an external point.
- Inscribed and circumscribed circles of a triangle (G8–G12): Construct the incircle and circumcircle, and find their radii.
- Measuring the same object with different units (G2): Measure an object twice in different units and relate the result to the unit size.
- Geometric modelling and design problems (G9–G12): Use geometry to model real objects and solve design problems with constraints.
- Cavalieri's principle (G9–G12): Use and explain Cavalieri's principle for volumes of solids.
- Proof of Pythagoras' theorem (G8): Explain or prove Pythagoras' theorem and its converse.
- Proving trigonometric identities (G11–G12): Prove trig identities using the standard identities.
- Vector proofs (parallel, collinear) (G9–G12): Prove that lines are parallel or points are collinear using vectors.

**Statistics and probability** (8)

- Choosing and critiquing a representation (G11–G12): Choose a suitable chart for the data and spot misleading graphs.
- Comparing distributions (G7–G12): Compare two data sets using an average and a measure of spread, in context.
- Correlation vs causation (G9–G12): Explain why correlation does not show causation.
- Interpreting slope and intercept of a linear model (G9–G12): Explain what the gradient and intercept of a fitted line mean in context.
- Surveys, experiments and data collection (G1–G12): Design questionnaires, surveys, experiments and observational studies, and collect data.
- Margin of error and comparing treatments by simulation (G9–G12): Use simulation to estimate a margin of error or decide whether a difference between treatments is significant.
- Evaluating statistical reports (G9–G12): Judge the reliability, bias and limits of conclusions drawn from data in reports.
- Designing simulations; modelling with probability (G7–G12): Design a simulation for a compound event and critique the assumptions of a probability model.

**Calculus and numerical methods** (4)

- Differentiation from first principles (G11–G12): Derive a derivative from the limit definition.
- Proving inequalities with derivatives (G11): Prove an inequality holds on an interval by studying the variation of a function.
- Interpreting solutions of differential equations in context (G12): Interpret a solution's meaning, long-term behaviour and limitations in context.
- Rearranging an equation into iterative form x = g(x) (G9–G12): Show that an equation can be rearranged into a given iterative form.

**Mechanics** (1)

- Modelling assumptions and force diagrams (G11–G12): Draw force diagrams and state and critique modelling assumptions (particle, light string, smooth surface).

## New answer types needed

Each type lists the new-answer-type topics that need it, most-needed type first.

### Multiple choice

One option from a list: yes/no, true/false, odd/even, a named category, a picture or graph choice. Needed by 66 topics:

Odd and even numbers; Ordinal numbers; Sorting and classifying objects; True or false equations (meaning of the equals sign); Repeating patterns of shapes and colours; Multiples; Divisibility tests; Prime and composite numbers; Rational and irrational numbers; number sets; Logic: propositions, connectives and truth tables; Powers of i; Expression, equation, formula or identity; Equivalent expressions using properties of operations; Interpreting parts of an expression in context; Number of solutions of a linear equation; Three linear equations in three unknowns; Discriminant and nature of roots; Behaviour of sequences (increasing, decreasing, periodic); Qualitative graphs of real situations; Recognising functions; Comparing functions in different representations; Linear vs non-linear functions; Cubic and reciprocal graphs; Graphs of root, piecewise, step and modulus functions; Exponential graphs y = kˣ; Stretches and combined transformations of graphs; One-to-one functions and domain restriction; Odd and even functions; Graphs of |f(x)|, f(|x|), 1/f(x) and [f(x)]²; Sketching polynomials from their factors; Graphs and properties of eˣ and ln x; Naming 2-D and 3-D shapes; Kinds of lines (straight, curved, zigzag); Defining vs non-defining attributes of shapes; 2-D faces of 3-D shapes; sorting shapes; Classifying triangles; Classifying quadrilaterals and the shape hierarchy; Nets of 3-D shapes; Cross-sections and solids of revolution; Plans and elevations; Lines and planes in space; Turns and direction of turn; Points, lines, segments, rays; parallel and perpendicular lines; Classifying angles (acute, right, obtuse, straight, reflex); Position and direction words; Congruent triangles: choosing the criterion; Relative position of a line and a circle, or two circles; Comparing and ordering lengths, masses and capacities; Estimating measures and choosing units; Calendar: days, weeks, months, years; Converse of Pythagoras: is it right-angled?; Sketching and transforming trigonometric graphs; Symmetry and periodicity of trigonometric functions; Vector equation of a line; parallel, intersecting or skew lines; Statistical questions and the shape of a distribution; Outliers; Scatter graphs and types of correlation; Populations, samples and sampling methods; Language of chance and the probability scale; Testing whether events are independent; Choosing an appropriate distribution; Hypothesis test for a proportion (binomial or Poisson); Hypothesis test for a normal mean; Hypothesis test for correlation; Stationary points and their nature; Cobweb and staircase diagrams.

### Diagram in the question

Not an answer type but a question capability: the question shows a picture, number line, clock, chart, table, graph or figure. The answer is often a number that the app can already check. Needed by 56 topics:

Counting objects (how many?); Whole numbers on a number line; Estimating a quantity; Ordinal numbers; Sorting and classifying objects; Repeating patterns of shapes and colours; Signed numbers on a number line; Fractions of shapes (halves, thirds, quarters, tenths); Fractions on a number line; Argand diagram; Solving equations graphically (intersections of y = f(x) and y = g(x)); Writing and representing inequalities on a number line; Coordinates in the first quadrant; Coordinates in four quadrants; Conversion graphs; Distance–time graphs; Speed–time graphs; Qualitative graphs of real situations; Key features of graphs; Naming 2-D and 3-D shapes; Kinds of lines (straight, curved, zigzag); Nets of 3-D shapes; Plans and elevations; Right angles; comparing angles with a right angle; Points, lines, segments, rays; parallel and perpendicular lines; Measuring angles with a protractor; Angles with parallel lines (alternate, corresponding, co-interior); Position and direction words; Describing and combining transformations; Circle theorems: finding angles; Comparing and ordering lengths, masses and capacities; Measuring with non-standard units; Reading scales (rulers, weighing scales, jugs, thermometers); Telling time: o'clock and half past; Telling time to five minutes; quarter past and to; a.m. and p.m.; Telling time to the nearest minute; Reading timetables; Perimeter of rectilinear and composite shapes; Area by counting squares; Area of composite shapes; Volume by counting cubes; Sketching and transforming trigonometric graphs; Sorting and tally charts; Reading pictograms; Reading bar charts; Line plots (dot plots); Reading tables and two-way tables; Line graphs and time graphs; Stem-and-leaf diagrams; Frequency polygons; Cumulative frequency and percentiles; Scatter graphs and types of correlation; Line of best fit and predictions; Estimating the gradient of a curve with a tangent; Estimating area under a graph; Displacement–time and velocity–time graphs.

### Algebraic expression

Checked for equivalence, plus a form check where the task says "factorise", "simplify" or "expand". Needed by 56 topics:

Writing numerical expressions from words; Writing algebraic expressions from words; Equivalent expressions using properties of operations; Collecting like terms; Expanding a single bracket; Factorising by taking out a common factor; Factorising by grouping; Expanding products of two binomials; Special products: (a ± b)² and (a + b)(a − b); Expanding products of three or more binomials; Factorising quadratics x² + bx + c; Factorising the difference of two squares; Factorising quadratics ax² + bx + c; Completing the square; Simplifying algebraic fractions; Adding and subtracting algebraic fractions; Multiplying and dividing algebraic fractions; Rearranging formulae (changing the subject); Equations quadratic in a function of x; nth term of a linear (arithmetic) sequence; nth term of a quadratic sequence; Converting between recursive and explicit forms; Binomial expansion for rational n and its validity; Finding a quadratic from its vertex or intercepts; Translations and reflections of graphs; Composite function expressions; Inverse functions; Building functions from context (modelling); Adding, subtracting and multiplying polynomials; Factorising and solving cubics using the factor theorem; Partial fractions; Symmetry and periodicity of trigonometric functions; Small-angle approximations; Vector paths in geometric figures; Differentiating powers and polynomials; Derivatives of eˣ, ln x, sin x, cos x and tan x; Derivatives of aˣ, logₐ x, reciprocal and inverse trig functions; Chain rule; Product rule; Quotient rule; Implicit differentiation; Parametric differentiation; Maclaurin series; Indefinite integration of powers and polynomials; Integrating (ax + b)ⁿ; Finding a function from its derivative and a point; Integrating eᵏˣ, 1/x, sin, cos and sec²; Integration by substitution (incl. reverse chain rule); Integration by parts; Integration using partial fractions; Integration using trigonometric identities; Integrals of the form f′(x)/f(x); Separable first-order differential equations; Homogeneous differential equations (y = vx); First-order linear differential equations (integrating factor); Second-order linear differential equations.

### Set of numbers or solutions

An unordered list: factors, roots of an equation, integer solutions, a set from set notation. Needed by 30 topics:

Factors and factor pairs; Multiples; Prime and composite numbers; Set notation and set operations; Set-builder notation and describing solution sets; Quadratics with complex solutions; Polynomial roots and conjugate pairs; Square roots of a complex number; De Moivre's theorem: powers and nth roots; Simultaneous linear and quadratic equations; Systems of equations of higher degree; Whole-number pairs satisfying an equation in two unknowns; Solving quadratic equations by factorising; Solving quadratic equations with the formula; Solving quadratic equations by completing the square; Discriminant and nature of roots; Equations quadratic in a function of x; Rational equations and extraneous solutions; Radical equations; Solving equations graphically (intersections of y = f(x) and y = g(x)); Integer solutions of an inequality; Linear inequalities in two variables and regions; Modulus (absolute value) equations; Roots, intercepts and turning point of a quadratic; Factorising and solving cubics using the factor theorem; Exponential and logarithmic equations and inequalities; Same area, different perimeter; Solving trigonometric equations in an interval; Outliers; Stationary points and their nature.

### Coordinate pair or triple

(x, y) or (x, y, z), including a set of points and solutions of simultaneous equations. Needed by 29 topics:

Two related patterns as ordered pairs; Solving linear systems with matrices; Matrices as transformations (linear transformations); Simultaneous linear equations (algebraic); Simultaneous linear equations (graphical); Simultaneous linear and quadratic equations; Systems of equations of higher degree; Three linear equations in three unknowns; Whole-number pairs satisfying an equation in two unknowns; Coordinates in the first quadrant; Coordinates in four quadrants; Midpoint of a segment; Point dividing a segment in a given ratio; Key features of graphs; Roots, intercepts and turning point of a quadratic; Translations and reflections of graphs; Stretches and combined transformations of graphs; Translations; Reflections; Rotations; Enlargement (dilation) and scale factor; Equation of a circle; Conic sections (parabola, ellipse, hyperbola); Polar coordinates; Same area, different perimeter; Vector equation of a line; parallel, intersecting or skew lines; Equations of planes; intersections of lines and planes; Stationary points and their nature; Second derivative, concavity and points of inflection.

### Drawn or plotted answer

The learner draws on a grid or canvas: plot points or a line, shade cells or a region, build a chart. Needed by 18 topics:

Simultaneous linear equations (graphical); Linear inequalities in two variables and regions; Plotting straight-line graphs; Distance–time graphs; Quadratic graphs: tables and plotting; Cubic and reciprocal graphs; Graphs of root, piecewise, step and modulus functions; Exponential graphs y = kˣ; Graphs of |f(x)|, f(|x|), 1/f(x) and [f(x)]²; Sketching polynomials from their factors; Rational functions with quadratic denominators; Graphs and properties of eˣ and ln x; Completing a symmetric figure; Drawing charts and graphs from data; Frequency polygons; Line of best fit and predictions; Variation tables and curve sketching; Cobweb and staircase diagrams.

### Interval or inequality

a ≤ x < b, x > c, or a union of intervals. Needed by 17 topics:

Error intervals; Discriminant and nature of roots; Writing and representing inequalities on a number line; Solving linear inequalities in one unknown; Quadratic inequalities; Modulus inequalities; Inequalities g(x) ≥ f(x) solved analytically and graphically; Binomial expansion for rational n and its validity; Domain and range; Key features of graphs; One-to-one functions and domain restriction; Exponential and logarithmic equations and inequalities; Trigonometric inequalities; Unbiased estimates and confidence intervals; Hypothesis test for a proportion (binomial or Poisson); Increasing and decreasing functions; Second derivative, concavity and points of inflection.

### Equation (line, curve, plane, differential equation)

An equation such as y = mx + c, a circle, a plane or a differential equation, checked for equivalence and, where asked, form. Needed by 16 topics:

Equation of a line from two points or a point and gradient; Parallel lines; Perpendicular lines; Other forms of a line equation (y − y₁ = m(x − x₁), ax + by + c = 0); Asymptotes and rational functions (ax + b)/(cx + d); Rational functions with quadratic denominators; Graphs and properties of eˣ and ln x; Equation of a circle; Tangent to a circle at a point; Conic sections (parabola, ellipse, hyperbola); Parametric equations of curves; Vector equation of a line; parallel, intersecting or skew lines; Equations of planes; intersections of lines and planes; Regression line (y on x, x on y); Equations of tangents and normals; Forming differential equations from context.

### Several numbers

Two or more numbers in one answer: multi-blank tables, a pair (m, c), (R, α), coefficients (A, B, C), a five-number summary. Needed by 10 topics:

Factoring a sum with the distributive property; Tables of equivalent ratios; Completing the square; Gradient and intercept from y = mx + c; Quadratic graphs: tables and plotting; Asymptotes and rational functions (ax + b)/(cx + d); Partial fractions; Using log graphs to find parameters (y = axⁿ, y = kbˣ); Harmonic form: a cos θ + b sin θ = R cos(θ ± α); Box plots (box-and-whisker).

### Signed number

A number with a minus sign. src/core/check.ts already accepts "-", but the answer box mask in src/core/entry.ts strips it, so this is mostly an entry change. Needed by 9 topics:

Negative numbers in context; Signed numbers on a number line; Opposites and absolute value; Adding and subtracting integers; Multiplying and dividing integers; Four operations on signed decimals; Word problems with rational numbers; Gradient of a line; Gradient and intercept from y = mx + c.

### Surd or exact form

a√b, (a + b√c)/d, exact trig values. Needed by 9 topics:

Simplifying surds; Arithmetic with surds; Rationalising the denominator; Exact answers in terms of π and surds; Solving quadratic equations with the formula; Solving quadratic equations by completing the square; Polar coordinates; Exact trigonometric values; Compound and double angle formulae.

### Number within a tolerance

A number accepted inside a range, for estimates and readings from a graph. Needed by 8 topics:

Estimating a quantity; Solving equations graphically (intersections of y = f(x) and y = g(x)); Conversion graphs; Area by counting squares; Cumulative frequency and percentiles; Line of best fit and predictions; Estimating the gradient of a curve with a tangent; Estimating area under a graph.

### Complex number

a + bi, including sets of complex roots. Needed by 8 topics:

Complex number arithmetic (add, subtract, multiply); Powers of i; Conjugate, modulus and division of complex numbers; Quadratics with complex solutions; Polynomial roots and conjugate pairs; Argand diagram; Square roots of a complex number; De Moivre's theorem: powers and nth roots.

### Time hh:mm or duration

A clock time, 12- or 24-hour, or a duration in hours and minutes. Needed by 7 topics:

Telling time: o'clock and half past; Telling time to five minutes; quarter past and to; a.m. and p.m.; Telling time to the nearest minute; Elapsed time and durations; 12-hour and 24-hour clock; Reading timetables; Time zones.

### Vector

A 2-D or 3-D column vector or i, j, k form. Needed by 6 topics:

Column vectors for translations; Adding, subtracting and scaling vectors; Vector paths in geometric figures; Vectors in 3-D; Vector (cross) product and its applications; Constant acceleration with vectors (2-D).

### Multiple of π

kπ or (a/b)π, for exact areas, volumes and radians. Needed by 4 topics:

Exact answers in terms of π and surds; Radian measure; Inverse trigonometric functions; Volumes of revolution.

### Matrix

A grid of numbers (possibly fractions). Needed by 4 topics:

Matrix addition, subtraction and scalar multiplication; Matrix multiplication; Inverse of a matrix; Matrices as transformations (linear transformations).

### Ordered list

A sequence of numbers or fractions in a required order. Needed by 3 topics:

Ordering whole numbers; Ordering fractions; Ordering decimals.

### Signed fraction

A fraction or mixed number with a minus sign; the Fraction boxes accept digits only. Needed by 2 topics:

Four operations on signed fractions (rational numbers); Gradient of a line.

### Standard form

a × 10ⁿ with 1 ≤ a < 10. Needed by 2 topics:

Writing numbers in standard form; Calculating in standard form.

### Ratio a:b

Two or more whole numbers in a ratio, optionally in lowest terms. Needed by 2 topics:

Writing ratios; Simplifying ratios.

### Text entry

Number words in English or Khmer, Roman numerals. Needed by 2 topics:

Writing numbers in words; Roman numerals.

### Structured table

A truth table or a sign/variation table with fixed cells. Needed by 2 topics:

Logic: propositions, connectives and truth tables; Variation tables and curve sketching.

### Compound measure

A quantity in two units, such as 4 m 15 cm or 3 kg 400 g. Needed by 1 topic:

Calculating with mixed units.

### Recurring decimal

A decimal with a marked repeating block. Needed by 1 topic:

Fractions to recurring decimals.

### Polar / modulus-argument form

r(cos θ + i sin θ) or (r, θ). Needed by 1 topic:

Modulus-argument (polar) and exponential form.

### Number or ±∞

A number, +∞, −∞ or "does not exist". Needed by 1 topic:

Limits at infinity and infinite limits.

### Product of prime powers

e.g. 2³ × 3² × 5, order-insensitive. Needed by 1 topic:

Prime factorisation.

### Polynomial quotient + remainder

Two polynomial expressions, the polynomial version of the Remainder answer. Needed by 1 topic:

Polynomial division.

### Number checked against a rule

Any value that satisfies a condition is accepted (counter-examples). Needed by 1 topic:

Disproof by counter-example.

### Structured transformation description

Transformation type plus its parameters, e.g. rotation, 90° anticlockwise, centre (0, 0). Needed by 1 topic:

Describing and combining transformations.

## How this list was built

Three drafts (Number; Algebra and calculus; Geometry, statistics and mechanics) covered public-curricula sections 3–8 with MoEYS as a cross-check. A completeness pass then walked every skill row of `research/public-math-curricula.md` sections 3.1–8 and every unit, lesson and chapter of `research/moeys-math-curriculum.md` (G1–G12, both G11–G12 streams).

- **Added** by that pass: "Division as sharing and grouping" (public 3.3 "Interpret products and quotients") and "Powers of small numbers" (public 3.4 "Powers of 2, 3, 4, 5 recognised").
- **Merged** exact duplicates between drafts (same skill, two slices). One row was kept and the note says "Merged":
  - repeating patterns
  - skip counting
  - logic and truth tables
  - matrices as transformations (three drafts)
  - negative and fractional indices (folded into the Number index rows)
  - reflecting points in the axes (into "Reflections")
  - distance between two points
  - equation of a circle
  - map scales and scale drawings
  - speed, distance and time
  - density (into compound measures)
  - money calculations
  - graphs of sin, cos and tan (into the amplitude/period row)
  - inverse trigonometric functions
  - parametric equations and polar coordinates (into the two geometry rows)
  - the two multi-step four-operation word-problem rows
- **Kept separate** because the skill differs:
  - "Number patterns with a rule" (rule given) vs "Continuing sequences with a term-to-term rule" (rule found)
  - "Factorials and nCr" vs the counting rows
  - "Compound interest and depreciation" vs "Exponential growth and decay models" vs "Sequences in financial and growth models"
  - GCSE "Speed–time graphs" vs mechanics travel graphs
  - "Converting rates and compound units" vs mechanics "SI units"
  - "Counting with Venn diagrams" vs "Venn diagrams and set notation in probability"

## Gaps

- **Question display is the hidden blocker.** Many buildable-now rows have an answer the app can check, but they still need question features the token set (Num, Frac, Op, Blank) lacks:
  - word-problem text templates
  - superscripts and subscripts
  - roots, sigma, integral and limit notation
  - matrices and small tables
  - pictures, graphs and charts

  The "Diagram in the question" entry counts only the rows where the picture is essential.
- **Negative entry.** Many algebra and calculus rows are buildable-now only if their levels avoid negative answers. Allowing `-` in the answer box (the checker already accepts it) would turn several new-answer-type rows into buildable ones and remove that limit from many others.
- **Rounding.** Decimal answers to trig, π, normal-distribution and compound-interest questions need a stated rounding rule, or a tolerance, because the Decimal check is an exact match after dropping trailing zeros.
- **MoEYS detail.** For G1–6 the MoEYS file has unit titles and short outcomes; for G7–12 it has lesson or chapter titles only. MoEYS grade placements for G3–G6 number units, and claims such as "sum and product of roots in G10", "sign tables", "integration by parts in G12" or "Cramer's rule", are inferences (marked "likely", "inferred" or "unconfirmed").
- **MoEYS-only topics** (no public-curricula row):
  - Khmer numerals
  - sorting objects (G1)
  - kinds of lines (G1)
  - mixture problems (G8–9)
  - special lines of a triangle (G8)
  - time zones (G8)
  - relative position of lines and circles (G9)
  - frequency polygons (G9)
  - logic (G10)
  - lines and planes in space (G10)
  - systems of higher-degree equations (G10)
  - relative-frequency percentage tables (G11)
  - sums of various sequences (G11 advanced)
  - counting roots and proving inequalities with derivatives (G11 advanced)
  - trigonometric inequalities (G11)
  - limits of sequences, arc length, second-order differential equations, polar coordinates (G12 advanced)
  - Euclidean algorithm and divisibility proofs (G12 advanced)
- **Sources not read** (from the research files): England A level Further Mathematics, IB Mathematics: applications and interpretation, IB MYP content, CCSS course pathways, and Cambridge Primary/Lower Secondary 2020 framework detail (behind login; outline examples only). The coverage of IB-only and Cambridge-only rows may therefore be wider than shown, and Further Maths topics (polar curves, further matrices, hyperbolic functions, further mechanics and statistics) are missing.
- **Before G1.** Counting, number lines, shapes and ordinal numbers start in kindergarten in CCSS, England and Cambridge. Grades written "K–G…" show that.
- **Grade spans are wide** because the systems disagree (see "Timing" notes; public-curricula section 9). They describe where a topic can appear, not where the app should place it.
- **Granularity is a judgement call.** Some rows could split, for example "Converting metric units" by measure, or "Area of triangles" vs "missing base or height". Some could merge, for example the three telling-time rows into one topic with levels. That decision belongs with the grouping ticket.
