# How established math curricula structure their topic trees

Research for ticket #3, a child of map #1 ("Map: grade 1–12 math topic tree").
Researched 2026-11-26.

**Question.** How do well-documented curricula and practice sites organise K–12 math as a tree?
For US Common Core, Cambridge (Primary, Lower Secondary, IGCSE, A Level), IB and one large practice
site: how many depths, what each depth is called, what the top-level strands are, and how topics
that span many grades (fractions, equations) are handled. The answer should inform how deep our tree
is (3–6) and what its top-level groups are.

Source rule: every claim cites the body that owns it. Where the owning document is not public or
could not be fetched, the claim is marked **UNCONFIRMED** and the stand-in source is named.

---

## 1. Short answer

- **Every system has 3–4 named depths of content, plus one "where/when" axis kept separate**
  (grade, stage, course, paper or tier). None of them nests grade inside the subject tree as a
  content depth; grade is either the outermost wrapper (Common Core K–8, Cambridge stages, IXL,
  Khan Academy) or a tag/tier on the leaves (Common Core high school, IGCSE Core/Extended,
  IB SL/AHL).
- **The top-level strands converge on four or five groups:** Number (incl. fractions, ratio),
  Algebra (incl. functions), Geometry and Measure (incl. trigonometry), Statistics and Probability,
  and at the top end Calculus. An IB-commissioned comparison of six national systems found the same
  "general trend towards dividing the curriculum into strands, involving: number …, algebra,
  geometry/measures, and statistics/probability" ([IB/NFER 2017, p.3][ib-nfer]).
- **Multi-grade topics are handled three ways:** (a) the same strand/domain recurs in every grade
  and the leaves get harder (Cambridge strands "run through every … stage"); (b) the topic is a
  domain only in the band where it is central, then gets renamed or absorbed (Common Core
  "Number & Operations—Fractions" is a domain only in grades 3–5, then fractions live in "The Number
  System" and "Ratios & Proportional Relationships"); (c) the topic repeats under the same name in
  successive courses/papers with a "prior knowledge assumed" link (Cambridge A Level has
  Trigonometry in Pure 1, 2 and 3; IB DP links subtopics with "Link to:" notes).
- **Practice sites are shallower and wider than curricula:** IXL is grade/course → lettered
  category → numbered skill (two content depths under the grade, with very many categories:
  grade 5 has ≥23 categories and 392 skills). Khan Academy is course → unit → lesson → exercise
  (three depths under the course).
- **Implication for our tree (organised by subject, not grade):** a subject-first tree of 4 content
  depths (Strand → Sub-strand/Domain → Topic → Level) mirrors the curricula; the curricula's
  fourth "standard/learning objective" depth is roughly where our Levels sit. A fifth depth is only
  needed if the high-school end is split like IB/Cambridge A Level (e.g. Algebra → Functions →
  Exponential and log → …). See §8.

---

## 2. US Common Core State Standards (CCSS), K–12

### Depths and names

| Depth | Name | Example |
|---|---|---|
| 0 (wrapper) | Grade (K–8) / Conceptual category (high school) | Grade 3; "Algebra" |
| 1 | **Domain** | Number & Operations—Fractions (3.NF) |
| 2 | **Cluster** | 3.NF.A "Develop understanding of fractions as numbers" |
| 3 | **Standard** | 3.NF.A.3 |
| 4 (optional) | Sub-standard (lettered) | 3.NF.A.3.a |

Definitions, from the CCSS "How to read the grade level standards" page
([CCSS, how to read][ccss-read]): "Standards define what students should understand and be able to
do." "Clusters summarize groups of related standards." "Domains are larger groups of related
standards." The page notes standards in different clusters and domains may be closely related.

The code `CCSS.Math.Content.3.NF.A.1` encodes grade (3), domain (NF), cluster (A), standard (1);
lettered parts (3.NF.A.2.a) are sub-standards ([CCSS 3.NF][ccss-3nf]).

### Top-level strands (domains per grade)

From the CCSS Math index ([CCSS Math][ccss-math]):

| Grades | Domains |
|---|---|
| K | Counting & Cardinality; Operations & Algebraic Thinking; Number & Operations in Base Ten; Measurement & Data; Geometry |
| 1–2 | Operations & Algebraic Thinking; Number & Operations in Base Ten; Measurement & Data; Geometry |
| 3–5 | the above plus **Number & Operations—Fractions** |
| 6–7 | Ratios & Proportional Relationships; The Number System; Expressions & Equations; Geometry; Statistics & Probability |
| 8 | The Number System; Expressions & Equations; **Functions**; Geometry; Statistics & Probability |

High school is **not organised by grade**. It has six conceptual categories, each holding domains
([CCSS Math][ccss-math]):

- **Number and Quantity:** The Real Number System; Quantities*; The Complex Number System; Vector & Matrix Quantities
- **Algebra:** Seeing Structure in Expressions; Arithmetic with Polynomials & Rational Expressions; Creating Equations*; Reasoning with Equations & Inequalities
- **Functions:** Interpreting Functions; Building Functions; Linear, Quadratic, & Exponential Models*; Trigonometric Functions
- **Modeling:** no domains of its own; "specific modeling standards appear throughout the high school standards indicated by a star symbol" ([CCSS Modeling][ccss-hsm])
- **Geometry:** Congruence; Similarity, Right Triangles, & Trigonometry; Circles; Expressing Geometric Properties with Equations; Geometric Measurement & Dimension; Modeling with Geometry
- **Statistics & Probability:** Interpreting Categorical & Quantitative Data; Making Inferences & Justifying Conclusions; Conditional Probability & the Rules of Probability; Using Probability to Make Decisions

"These standards do not mandate the sequence of high school courses"; standards marked (+) lie
beyond the college-and-career-readiness boundary ([CCSS note on courses][ccss-courses]).

### Multi-grade topics

- Domains recur by grade band, not forever. Fractions are their own domain only in grades 3–5
  (3.NF, 4.NF, 5.NF) ([CCSS Math][ccss-math]); from grade 6 the material continues under
  "The Number System" and "Ratios & Proportional Relationships". Equations follow the same pattern:
  "Operations & Algebraic Thinking" (K–5) → "Expressions & Equations" (6–8) → high-school "Algebra".
- Continuity is stated through wording, not structure: CCSS's coherence shift cites 4.NF.4
  ("apply and extend previous understandings of multiplication to multiply a fraction by a whole
  number") being extended by 5.NF.4 ([CCSS key shifts][ccss-shifts]).
- Practice (process) standards sit beside the content tree rather than in it (the "Modeling" star
  is the high-school equivalent).

**UNCONFIRMED:** the CCSS Appendix A model course pathways (Algebra I / Geometry / Algebra II and
the integrated pathway) were not read; only the "do not mandate the sequence" statement was.

---

## 3. Cambridge (Primary, Lower Secondary, IGCSE, AS & A Level)

Age span: Primary stages 1–6 (ages 5–11), Lower Secondary stages 7–9 (ages 11–14), IGCSE
(ages 14–16), AS & A Level (16–19) ([Primary outline][cam-prim-outline],
[Lower Secondary outline][cam-ls-outline]). This is the closest match to grades 1–12.

### 3a. Primary (0096) and Lower Secondary (0862), current frameworks (first teaching 2021)

Depths: **Stage → Strand → Sub-strand → Learning objective.**

- Cambridge Primary: "We have divided this subject into three main areas called 'strands', which run
  through every primary mathematics stage": **Number; Geometry and Measure; Statistics and
  Probability** ([Cambridge Primary Mathematics][cam-prim]).
- Cambridge Lower Secondary: the page also says "three main areas called 'strands', which run through
  every lower secondary mathematics stage", then lists **Number; Algebra, Geometry and Measure;
  Statistics and Probability** ([Cambridge Lower Secondary Mathematics][cam-ls]).
  **UNCONFIRMED:** whether "Algebra" is its own fourth strand (Number / Algebra / Geometry and
  Measure / Statistics and Probability) or shares a strand with Geometry and Measure. The public page
  says "three" but the list reads as four; the framework that would settle it is behind the
  Cambridge school support-site login ([outline, "How can I access the full curriculum
  framework?"][cam-ls-outline]).
- Both frameworks add "Thinking and Working Mathematically" as a process layer embedded in the
  content strands, not a strand of its own ([Cambridge Primary Mathematics][cam-prim]).

Sub-strands (current Primary framework), **UNCONFIRMED from Cambridge itself**; the official
framework is login-only. The Cambridge-endorsed Hodder *Revise for Primary Checkpoint Mathematics*
study guide (Stage 6) groups its units under the three strands as follows ([Hodder sample, contents][hodder]):

- **Number:** Counting and sequences; Integers and powers; Place value, ordering and rounding;
  Fractions, decimals, percentages, ratio and proportion
- **Geometry and Measure:** Time; Geometrical reasoning, shapes and measurements; Position and transformation
- **Statistics and Probability:** Statistics; Probability

Learning-objective codes of the form `1Nc.01` (stage 1, Number, counting and sequences, objective 1)
appear in third-party copies of the Cambridge Progression Grid; not confirmed from Cambridge directly.

### 3b. The previous Primary and Lower Secondary frameworks (for history)

Cambridge's own curriculum outlines (©UCLES, the LS one dated February 2019) describe the earlier
frameworks:

- Primary: "five content areas or 'strands'. Each strand is further subdivided into 'sub-strands'":
  Number (Numbers and the number system; Calculation — mental strategies, addition and subtraction,
  multiplication and division), Geometry (Shapes and geometric reasoning; Position and movement),
  Measure (Money until Stage 3; Length, mass and capacity; Time; Area and perimeter from Stage 4),
  Handling data (Organising, categorising and representing data; Probability from Stage 5),
  Problem solving ([Primary outline][cam-prim-outline]).
- Lower Secondary: six strands: Number (Integers, powers and roots; Place value, ordering and
  rounding; Fractions, decimals, percentages, ratio and proportion; Calculation), Algebra
  (Expressions, equations and formulae; Sequences, functions and graphs), Geometry (Shapes and
  geometric reasoning; Position and movement), Measure (Length, mass and capacity; Times and rates of
  change; Area, perimeter and volume), Handling data (Planning and collecting data; Processing and
  presenting data; Interpreting and discussing results; Probability), Problem solving
  ([Lower Secondary outline][cam-ls-outline]).

Note the "(until Stage 3)", "(from Stage 4)", "(from Stage 5)" tags: in Cambridge, a sub-strand can
start or stop at a stage while the strand runs through all of them. That is a clean model for a
subject-first tree whose leaves carry grade ranges.

### 3c. IGCSE Mathematics (0580), syllabus 2025–2027

Depths: **Tier (Core / Extended) → Topic → Subtopic → statements**, with "Notes and examples".

- Nine topics: 1 Number; 2 Algebra and graphs; 3 Coordinate geometry; 4 Geometry; 5 Mensuration;
  6 Trigonometry; 7 Transformations and vectors; 8 Probability; 9 Statistics
  ([IGCSE 0580 syllabus, p.7][igcse]).
- Subtopics are numbered within topics and prefixed by tier: `C1.1 Types of number` … `C1.16 Money`;
  `E1.17 Exponential growth and decay`, `E1.18 Surds`. Core and Extended share the same numbering;
  where a subtopic is Extended-only, the Core list keeps the slot with "Extended content only" (e.g.
  C2.12 and C2.13, which are E2.12 Differentiation and E2.13 Functions) ([IGCSE 0580][igcse]).
- "The Extended subject content contains the Core subject content as well as additional content."
  "The subject content is organised by topic and is not presented in a teaching order."
  ([IGCSE 0580, p.7][igcse])

So difficulty in IGCSE is a **tier on the same tree**, not a separate tree. That is close to our
"Level" idea.

### 3d. AS & A Level Mathematics (9709), syllabus 2026–2027

Depths: **Component/Paper → Topic → content statements** (with notes and examples).

- Six components: Pure Mathematics 1, 2, 3; Mechanics; Probability & Statistics 1, 2
  ([9709 syllabus, contents][alevel]).
- Topics are numbered per component: P1 = 1.1 Quadratics, 1.2 Functions, 1.3 Coordinate geometry,
  1.4 Circular measure, 1.5 Trigonometry, 1.6 Series, 1.7 Differentiation, 1.8 Integration;
  P2 = 2.1 Algebra … 2.6 Numerical solution of equations; P3 = 3.1 Algebra … 3.9 Complex numbers;
  M = 4.1 Forces and equilibrium … 4.5 Energy, work and power; S1 = 5.1 Representation of data …
  5.5 The normal distribution; S2 = 6.1 The Poisson distribution … 6.5 Hypothesis tests ([9709][alevel]).
- **Multi-level topics repeat by name across papers**: Trigonometry is 1.5, 2.3 and 3.3;
  Differentiation is 1.7, 2.4, 3.4; Integration 1.8, 2.5, 3.5. Papers state the dependency:
  "Knowledge of the content of Paper 1: Pure Mathematics 1 is assumed" ([9709, Paper 2 and 3
  sections][alevel]). Prior knowledge for the whole course is IGCSE 0580 Extended ([9709, "Prior
  knowledge"][alevel]).
- "You can teach the topics in any order you find appropriate." ([9709, Subject content][alevel])

---

## 4. International Baccalaureate (PYP, MYP, DP)

ibo.org returns a Cloudflare challenge to automated clients, so the IB PDFs below were read from the
Internet Archive's copies of the ibo.org URLs (same documents, same URLs; archive link given).

### 4a. MYP (ages 11–16)

- The 2020 subject brief: "The framework for MYP mathematics outlines four branches of mathematical
  study": Numerical and abstract reasoning; Thinking with models; Spatial reasoning; Reasoning with
  data. Assessment criterion A refers to "the framework's branches (number, algebra, geometry and
  trigonometry, statistics and probability)" ([MYP mathematics brief, 2020][ib-myp-brief]).
- Depths: **Branch → Topic → Skill**, in two challenge levels, **Standard** (all students) and
  **Extended** (more able): "4 branches, subdivided into topics and skills" with "Two tiers"
  ([IB/NFER 2017, Table 1][ib-nfer]).
- No year-by-year content: "The IB approach does not provide specific or suggested year-by-year
  content; instead it allows schools to structure this for themselves" ([IB/NFER 2017, p.3][ib-nfer]).
  The previous MYP framework had a fifth branch, discrete mathematics (per IB's skills-framework
  evaluation RFP, seen only in search results; **UNCONFIRMED**).

### 4b. DP Mathematics: analysis and approaches (ages 16–19), first assessment 2021

Depths: **Topic → Subtopic (SL x.y / AHL x.y) → content lines**, each subtopic with "Guidance,
clarification and syllabus links".

- Five topics with suggested hours SL/HL: Topic 1 Number and algebra (19/39); Topic 2 Functions
  (21/32); Topic 3 Geometry and trigonometry (25/51); Topic 4 Statistics and probability (27/33);
  Topic 5 Calculus (28/55); plus the toolkit and exploration (30/30)
  ([DP AA guide, "Syllabus outline", p.24][ib-aa]).
- Subtopic numbering: SL 1.1–1.9 then AHL 1.10–1.16; SL 2.1–2.11, AHL 2.12–2.16; SL 3.1–3.8,
  AHL 3.9–3.18; SL 4.1–4.12, AHL 4.13–4.14; SL 5.1–5.11, AHL 5.12–5.19 ([DP AA guide][ib-aa]).
  HL is a **superset appended to the same topic**, like IGCSE Extended.
- "Sections SL1.1 to SL1.5 are content common to Mathematics: analysis and approaches and
  Mathematics: applications and interpretation" ([DP AA guide, p.27][ib-aa]).
- Earlier-grade content is listed as "Prior learning topics", grouped under the same five headings
  (Number and algebra, Functions, Geometry and trigonometry, Statistics and probability, Calculus),
  written "in conjunction with the MYP" ([DP AA guide, pp.25–26][ib-aa]).
- Cross-topic spanning is done with explicit "Link to:" notes, e.g. "Link to: exponential
  models/functions in topic 2", "Link to: proof by mathematical induction (AHL 1.15)"; 39 such
  notes in the guide ([DP AA guide][ib-aa]).

**UNCONFIRMED:** a new DP mathematics curriculum is reported for first teaching 2027 (final
assessment of the current courses November 2028); seen only in search snippets of ibo.org pages.

### 4c. PYP (ages 3–12)

**UNCONFIRMED.** The PYP mathematics page could not be fetched and has no archived copy. The PYP
mathematics scope and sequence (commonly cited as five strands: data handling, measurement, shape
and space, pattern and function, number) was not read from an IB source.

---

## 5. Practice sites

### 5a. IXL

Depths: **Subject → Grade or course → lettered Category → numbered Skill** (e.g. Grade 3, A.
Place value, A.1 "Place value names up to ten thousands") ([IXL Grade 3][ixl-g3]).

- Wrappers: Pre-K, Kindergarten, Grades 1–8, then Algebra 1, Geometry, Algebra 2, Precalculus,
  Calculus, plus Integrated I1–I3 skill plans ([IXL Math][ixl-math]).
- Categories are narrow and numerous, and are effectively "topic × difficulty": Grade 3 has
  "G. Addition: three digits", "I. Addition: four or five digits", "O. Multiplication skill
  builders up to 10", "Q. … up to 12" ([IXL Grade 3][ixl-g3]).
- **Multi-grade topics are re-listed per grade.** Grade 5 has 392 skills; fractions alone span
  categories J–V (13 categories, about 87 skills: "Fractions and mixed numbers", "Compare
  fractions", "Add and subtract fractions", "Multiply fractions", "Understand fraction division", …)
  ([IXL Grade 5][ixl-g5]). Algebra 1 restarts at "A. Numbers and operations", "B. Expressions",
  "C. Solve linear equations" … "O. Systems of linear equations" ([IXL Algebra 1][ixl-a1]).
- The fetched pages showed categories only up to W (and R for Algebra 1); the tail of each list was
  truncated, so counts are lower bounds.

### 5b. Khan Academy

Depths: **Course → Unit → Lesson → content item** (article, video, practice exercise), with
assessments at each level: "Courses consist of units and the Course Challenge. Units are comprised
of lessons and quizzes. Lessons are comprised of a mix of articles, videos, and practice exercises."
Quizzes cover "the skills in a particular lesson", unit tests "all the skills in a unit", the course
challenge "all the skills across the entire course" ([Khan help: content types][ka-help]).

**UNCONFIRMED:** the actual unit lists of Khan courses (e.g. 3rd grade, Algebra 1). khanacademy.org
blocks automated clients and its pages render client-side, so no unit names could be read.

---

## 6. Comparison table

| System | Wrapper (when) | Content depths (names) | # content depths | Top level | Difficulty inside a node |
|---|---|---|---|---|---|
| CCSS K–8 | Grade | Domain → Cluster → Standard (→ sub-standard) | 3 (4) | 4–5 domains per grade | by grade |
| CCSS HS | none (no grades) | Conceptual category → Domain → Cluster → Standard | 4 | 6 categories | (+) beyond-CCR marker |
| Cambridge Primary/LS | Stage 1–9 | Strand → Sub-strand → Learning objective | 3 | 3 strands (LS: 3 or 4) | by stage; sub-strands start/stop at stages |
| Cambridge IGCSE | Tier | Topic → Subtopic → statement | 3 | 9 topics | Core ⊂ Extended, same numbering |
| Cambridge A Level | Paper | Component → Topic → statement | 3 | 6 components (3 pure) | topic repeated in P1/P2/P3 |
| IB MYP | none (school decides years) | Branch → Topic → Skill | 3 | 4 branches | Standard / Extended |
| IB DP AA | SL/HL | Topic → Subtopic → content line | 3 | 5 topics | AHL subtopics appended |
| IXL | Grade/course | Category → Skill | 2 | ~20–30 categories per grade | by grade + category name |
| Khan Academy | Course | Unit → Lesson → exercise | 3 | ~10 units per course (UNCONFIRMED count) | by course |

### Top-level groups across systems

| Our candidate group | CCSS | Cambridge P/LS | IGCSE | IB MYP/DP |
|---|---|---|---|---|
| Number (incl. fractions, decimals, ratio, percent) | Counting & Cardinality; NBT; NF; RP; Number System; HS Number & Quantity | Number | 1 Number | Number / Number and algebra |
| Algebra (expressions, equations, sequences) | OA; Expressions & Equations; HS Algebra | Algebra (LS) | 2 Algebra and graphs | Algebra / Number and algebra |
| Functions and graphs | Functions (8, HS) | Sequences, functions and graphs (old LS sub-strand) | 2 (graphs), 3 Coordinate geometry | Functions (DP Topic 2) |
| Geometry and measure (incl. trig, vectors, transformations) | Measurement & Data; Geometry; HS Geometry | Geometry and Measure | 3–7 | Geometry and trigonometry |
| Statistics and probability | Measurement & Data (data); S&P (6+) | Statistics and Probability | 8–9 | Statistics and probability |
| Calculus | (+) / beyond CCSS | — | E2.12 Differentiation | Calculus (DP Topic 5) |

---

## 7. How multi-grade topics are handled (fractions and equations)

| Pattern | Who | Fractions | Equations |
|---|---|---|---|
| Strand recurs every year; leaves get harder | Cambridge P/LS, IXL, Khan | Cambridge "Fractions, decimals, percentages, ratio and proportion" sub-strand in every stage; IXL re-lists fraction categories in each grade | Cambridge LS "Expressions, equations and formulae" in stages 7–9 |
| Topic is a domain only in its core band, then renamed | CCSS | NF grades 3–5 → Number System / RP 6–7 | OA (K–5) → EE (6–8) → HS Algebra "Reasoning with Equations & Inequalities" |
| Same tree, difficulty tier on leaves | IGCSE Core/Extended, IB SL/AHL, MYP Standard/Extended | IGCSE C1.4/E1.4 Fractions, decimals and percentages | IGCSE C2.5/E2.5 Equations |
| Same topic repeated in successive courses with "assumed" link | Cambridge A Level, IB DP prior learning | — | A Level 2.1/3.1 Algebra; DP "Solution of linear equations" as prior learning |

No system puts all of fractions (from "half of a shape" to algebraic fractions) under one node. The
strongest single-node treatment is Cambridge's sub-strand, which still splits off "Algebraic
fractions" (IGCSE E2.3) into Algebra.

---

## 8. What this suggests for our tree (input to the inventory ticket, not a decision)

1. **Keep grade out of the tree.** Every system that is subject-first (CCSS HS, IGCSE, IB) treats
   grade/tier as a tag on leaves. That matches map #1's "Grade tags out of scope".
2. **Depth 4 is the norm for a subject-first tree that includes difficulty**: Strand → Sub-strand →
   Topic → Level. The curricula have 3 content depths plus a difficulty/when axis; our Level ladder
   plays the role of that axis. Depth 5 is justified only if the top grades need a further split
   (as A Level does with Pure/Mechanics/Statistics, or IB with Topic → Subtopic under Functions).
3. **Five top-level groups recur:** Number; Algebra (with or without Functions split out);
   Geometry and Measure; Statistics and Probability; Calculus (grades 11–12 only). Functions as a
   separate top group is a CCSS and IB DP choice; Cambridge and IGCSE keep graphs under Algebra.
4. **Expect sub-strands to start and stop** (Cambridge's "from Stage 4") and a topic like fractions
   to appear in more than one strand (arithmetic of fractions in Number, algebraic fractions in
   Algebra).
5. **Cross-links are needed** for topics that span strands (IB uses "Link to:" notes; CCSS uses
   wording). A tree alone will not express "fractions → ratio → proportion".

---

## 9. Gaps (could not confirm from a primary source)

- **Cambridge Primary/Lower Secondary current sub-strands and objective codes**: the 2020
  frameworks are behind the Cambridge school login. Sub-strand names come from a Cambridge-endorsed
  Hodder textbook; codes like `1Nc.01` only from third-party copies.
- **Cambridge Lower Secondary strand count** (3 vs 4, i.e. whether Algebra is its own strand): the
  public page contradicts itself.
- **IB PYP strands**: not read from an IB source.
- **IB MYP previous fifth branch (discrete mathematics)** and **the new DP curriculum from 2027**:
  search snippets only.
- **Khan Academy unit lists**: site blocks automated reading; only the course/unit/lesson structure
  from Khan's help centre is confirmed.
- **IXL full category lists**: pages truncated after category W (grades) and R (Algebra 1).
- **CCSS Appendix A course pathways**: not read.
- **Cambodia MoEYS**: not in this ticket's scope; not researched here.

---

## Sources

[ccss-read]: https://www.thecorestandards.org/Math/Content/introduction/how-to-read-the-grade-level-standards/
[ccss-math]: https://www.thecorestandards.org/Math/
[ccss-3nf]: https://www.thecorestandards.org/Math/Content/3/NF/
[ccss-hsm]: https://www.thecorestandards.org/Math/Content/HSM/
[ccss-courses]: https://www.thecorestandards.org/Math/Content/note-on-courses-transitions/
[ccss-shifts]: https://www.thecorestandards.org/other-resources/key-shifts-in-mathematics/
[cam-prim]: https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-primary/curriculum/mathematics/
[cam-ls]: https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-lower-secondary/curriculum/mathematics/
[cam-prim-outline]: https://www.cambridgeinternational.org/languages/vietnam/Images/25127-cambridge-primary-maths-curriculum-outline.pdf
[cam-ls-outline]: https://www.cambridgeinternational.org/Images/80607-cambridge-lower-secondary-maths-curriculum-outline.pdf
[hodder]: https://media.hachettelearning.com/media/medialibraries/hodder/samples/mathematics/3-11/cambridge-primary-revise/cambridge-revise-for-primary-checkpoint-mathematics-study-guide-sample-pages-9781398369856.pdf
[igcse]: https://www.cambridgeinternational.org/Images/662466-2025-2027-syllabus.pdf
[alevel]: https://www.cambridgeinternational.org/Images/697427-2026-2027-syllabus.pdf
[ib-nfer]: https://web.archive.org/web/20251010143512/https://www.ibo.org/globalassets/new-structure/research/pdfs/myp-math-skills-framework-summary-en.pdf
[ib-myp-brief]: https://web.archive.org/web/20260606064903/https://ibo.org/globalassets/new-structure/brochures-and-infographics/pdfs/myp-brief-mathematics-en.pdf
[ib-aa]: https://web.archive.org/web/20261028155113/https://www.ibo.org/globalassets/new-structure/university-admission/pdfs/dp-mathematics-analysis-and-approaches-guide-en.pdf
[ixl-math]: https://www.ixl.com/math/
[ixl-g3]: https://www.ixl.com/math/grade-3
[ixl-g5]: https://www.ixl.com/math/grade-5
[ixl-a1]: https://www.ixl.com/math/algebra-1
[ka-help]: https://support.khanacademy.org/hc/en-us/articles/18564282990861-What-types-of-content-can-I-assign-to-my-students

- CCSS, How to read the grade level standards: https://www.thecorestandards.org/Math/Content/introduction/how-to-read-the-grade-level-standards/
- CCSS Math index (domains per grade, HS categories): https://www.thecorestandards.org/Math/
- CCSS 3.NF: https://www.thecorestandards.org/Math/Content/3/NF/
- CCSS HS Modeling: https://www.thecorestandards.org/Math/Content/HSM/
- CCSS Note on courses and transitions: https://www.thecorestandards.org/Math/Content/note-on-courses-transitions/
- CCSS Key shifts in mathematics: https://www.thecorestandards.org/other-resources/key-shifts-in-mathematics/
- Cambridge Primary Mathematics (0096): https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-primary/curriculum/mathematics/
- Cambridge Lower Secondary Mathematics (0862): https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-lower-secondary/curriculum/mathematics/
- Cambridge Primary Mathematics curriculum outline (previous framework): https://www.cambridgeinternational.org/languages/vietnam/Images/25127-cambridge-primary-maths-curriculum-outline.pdf
- Cambridge Lower Secondary Mathematics curriculum outline (previous framework, 2019): https://www.cambridgeinternational.org/Images/80607-cambridge-lower-secondary-maths-curriculum-outline.pdf
- Hodder, Cambridge Revise for Primary Checkpoint Mathematics Study Guide, sample (endorsed textbook): https://media.hachettelearning.com/media/medialibraries/hodder/samples/mathematics/3-11/cambridge-primary-revise/cambridge-revise-for-primary-checkpoint-mathematics-study-guide-sample-pages-9781398369856.pdf
- Cambridge IGCSE Mathematics 0580 syllabus 2025–2027: https://www.cambridgeinternational.org/Images/662466-2025-2027-syllabus.pdf
- Cambridge International AS & A Level Mathematics 9709 syllabus 2026–2027: https://www.cambridgeinternational.org/Images/697427-2026-2027-syllabus.pdf
- IB, Evaluation of the MYP mathematics skills framework, research summary (NFER, 2017), archived ibo.org copy: https://web.archive.org/web/20251010143512/https://www.ibo.org/globalassets/new-structure/research/pdfs/myp-math-skills-framework-summary-en.pdf
- IB, MYP Mathematics subject brief (2020), archived ibo.org copy: https://web.archive.org/web/20260606064903/https://ibo.org/globalassets/new-structure/brochures-and-infographics/pdfs/myp-brief-mathematics-en.pdf
- IB, DP Mathematics: analysis and approaches guide (first assessment 2021), archived ibo.org copy: https://web.archive.org/web/20261028155113/https://www.ibo.org/globalassets/new-structure/university-admission/pdfs/dp-mathematics-analysis-and-approaches-guide-en.pdf
- IXL Math index: https://www.ixl.com/math/
- IXL Grade 3: https://www.ixl.com/math/grade-3
- IXL Grade 5: https://www.ixl.com/math/grade-5
- IXL Algebra 1: https://www.ixl.com/math/algebra-1
- Khan Academy Help Center, What types of content can I assign to my students?: https://support.khanacademy.org/hc/en-us/articles/18564282990861-What-types-of-content-can-I-assign-to-my-students
