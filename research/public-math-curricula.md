# What math do public curricula teach across grades 1–12?

Research for ticket #6, a child of map #1 ("Map: grade 1–12 math topic tree"). This file holds the **content**.
How these curricula shape their trees is covered in `research/curriculum-tree-structures.md` (ticket #3), and it is not repeated here.

The next ticket builds a full grade 1–12 inventory from this file. So every row below is one skill, or one tight group of skills, and for each one it says which curricula include it and where.

---

## 1. Sources

Every claim below cites one of these IDs. All were downloaded and read as text on 2026-11-26.

| ID | Document | URL |
|---|---|---|
| **CCSS** | Common Core State Standards for Mathematics (full PDF: grades K–8 and high school) | https://corestandards.org/wp-content/uploads/2023/09/Math_Standards1.pdf |
| **ENG-AGES** | GOV.UK "The national curriculum": key stages, ages and year groups | https://www.gov.uk/national-curriculum |
| **ENG-P** | DfE, Mathematics programmes of study: key stages 1 and 2 (Years 1–6) | https://assets.publishing.service.gov.uk/media/5a7da548ed915d2ac884cb07/PRIMARY_national_curriculum_-_Mathematics_220714.pdf |
| **ENG-KS3** | DfE, Mathematics programmes of study: key stage 3 (Years 7–9) | https://assets.publishing.service.gov.uk/media/5a7c1408e5274a1f5cc75a68/SECONDARY_national_curriculum_-_Mathematics.pdf |
| **ENG-KS4** | DfE, Mathematics programmes of study: key stage 4 (Years 10–11) | https://assets.publishing.service.gov.uk/media/5a7dc9dced915d2ac884d8ef/KS4_maths_PoS_FINAL_170714.pdf |
| **GCSE** | DfE, GCSE mathematics subject content and assessment objectives | https://assets.publishing.service.gov.uk/media/5a7cb5b040f0b6629523b52c/GCSE_mathematics_subject_content_and_assessment_objectives.pdf |
| **ALEVEL** | DfE, GCE AS and A level subject content for mathematics | https://assets.publishing.service.gov.uk/media/5a7f273a40f0b62305b85670/GCE_AS_and_A_level_subject_content_for_mathematics_with_appendices.pdf |
| **IG0580** | Cambridge IGCSE Mathematics 0580, syllabus for 2025–2027 | https://www.cambridgeinternational.org/Images/662466-2025-2027-syllabus.pdf |
| **IG0607** | Cambridge IGCSE International Mathematics 0607, syllabus for 2025–2027 | https://www.cambridgeinternational.org/Images/662472-2025-2027-syllabus.pdf |
| **CIE9709** | Cambridge International AS & A Level Mathematics 9709, syllabus for 2026–2027 | https://www.cambridgeinternational.org/Images/697427-2026-2027-syllabus.pdf |
| **CP-PAGE** | Cambridge Primary Mathematics (0096) page | https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-primary/curriculum/mathematics/ |
| **CLS-PAGE** | Cambridge Lower Secondary Mathematics (0862) page | https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-lower-secondary/curriculum/mathematics/ |
| **CP-OUT** | Cambridge Primary Mathematics curriculum outline (UCLES, February 2019): example objectives for Stages 1, 3 and 5 | https://www.cambridgeinternational.org/languages/vietnam/Images/25127-cambridge-primary-maths-curriculum-outline.pdf |
| **CLS-OUT** | Cambridge Lower Secondary Mathematics curriculum outline (UCLES, February 2019): example objectives for Stages 7 and 9 | https://www.cambridgeinternational.org/Images/80607-cambridge-lower-secondary-maths-curriculum-outline.pdf |
| **IB-AA** | IB DP Mathematics: analysis and approaches guide (Internet Archive copy; ibo.org blocks automated clients) | https://web.archive.org/web/20261028155113/https://www.ibo.org/globalassets/new-structure/university-admission/pdfs/dp-mathematics-analysis-and-approaches-guide-en.pdf |
| **IB-MYP** | IB research summary of the MYP mathematics skills framework (NFER, 2017; Internet Archive copy) | https://web.archive.org/web/20251010143512/https://www.ibo.org/globalassets/new-structure/research/pdfs/myp-math-skills-framework-summary-en.pdf |

---

## 2. How to read this file

### 2.1 Grade alignment (by age)

The systems number their years differently, so every placement here is converted to a **US grade (G)**. The ages that justify the conversion:

| System | Unit | Age stated by the source | Equivalent used here |
|---|---|---|---|
| England | Year *y* | Year 1 = age 5–6 … Year 11 = age 15–16 ([ENG-AGES]) | **Year *y* = G(*y*−1)**: Y1 = K, Y2 = G1, Y7 = G6, Y11 = G10, Y12–13 = G11–12 |
| Cambridge Primary | Stage *s* (1–6) | "learners typically aged 5 to 11" ([CP-OUT]) | **Stage *s* = G(*s*−1)**: Stage 1 = K, Stage 6 = G5 |
| Cambridge Lower Secondary | Stage 7–9 | "typically aged 11 to 14" ([CLS-OUT]) | Stage 7 = G6, Stage 8 = G7, Stage 9 = G8 |
| Cambridge IGCSE | 2-year course | **not stated** in [IG0580]/[IG0607] | G9–10 (the convention; it follows Lower Secondary Stage 9 per [CLS-OUT]) |
| Cambridge AS/A Level 9709; England A level | 2-year course | **not stated** in [CIE9709]/[ALEVEL] | G11–12 (convention) |
| IB MYP | 5 years | "Ages 11 to 16" ([IB-MYP] Table 1) | G6–10 |
| IB DP | 2 years | not read from an IB source | G11–12 (convention) |
| CCSS | Grade 1–8; high school (HS) | the source gives no ages. US Grade 1 is taken as age 6–7 (convention, **unconfirmed**) | G1–8 as written. HS = G9–12 (CCSS HS standards are **not assigned to grades**; see 2.3) |

Wherever a placement depends on a convention rather than a source, this file says "(conv.)".

### 2.2 Notation in the tables

- **CCSS**: standard codes as printed, e.g. `3.NF.1` = Grade 3, Number & Operations–Fractions, standard 1. HS codes look like `A-REI.4`. A `(+)` means "additional mathematics … to take advanced courses such as calculus, advanced statistics, or discrete mathematics" ([CCSS] high school introduction).
- **England**: `Y4 (G3)` = Year 4 programme of study in [ENG-P], converted to G3. KS3 = Years 7–9 = G6–8 ([ENG-KS3]). GCSE codes are written `GCSE N8`, `GCSE A18` and so on, meaning section (N = Number, A = Algebra, R = Ratio/proportion/rates, G = Geometry & measures, P = Probability, S = Statistics) and the statement number printed in [GCSE]. `(H)` = the statement or part is in **bold**, meaning "only the more highly attaining students will be assessed" ([GCSE] p.4), which is Higher tier in practice. A-level codes (A1…S1) are as printed in [ALEVEL]. `[AS]` = shown in square brackets as AS content ([ALEVEL] para 12). Without it, the content is full A level only.
- **Cambridge**: IGCSE 0580 codes `C1.4` (Core) / `E1.4` (Extended), as printed in [IG0580]. `E only` = the Core syllabus marks that subtopic "Extended content only". 0607 codes are written `0607 E3.7`. 9709 codes are `P1 1.3` (Pure 1), `P2 2.x`, `P3 3.x`, `M1 4.x`, `S1 5.x`, `S2 6.x` ([CIE9709]). Primary/Lower Secondary: `St5 (G4)` comes from the 2019 outline examples ([CP-OUT]/[CLS-OUT]), which are **only examples**. See Gaps.
- **IB**: `SL 2.6` / `AHL 3.12` = subtopic codes in [IB-AA]. MYP has no itemised content in any source read (see Gaps).
- **—** = not found in that curriculum's documents that were read. That does not prove the topic is absent from every course in the system.
- **⚠ timing** = curricula place the skill in clearly different grades (two or more grades apart, after age alignment).

### 2.3 Scope notes

- CCSS high school standards are organised in conceptual categories (Number & Quantity, Algebra, Functions, Modeling, Geometry, Statistics & Probability) and are not tied to grades. "a student's work with functions … crosses a number of traditional course boundaries" ([CCSS] HS intro). This file therefore writes `HS` for them.
- **CCSS contains no calculus standards.** Calculus is mentioned only as a course the (+) standards prepare for ([CCSS] HS intro). The calculus rows (section 7) therefore have no CCSS entries.
- England's GCSE content ([GCSE]) is the detailed statement list for KS4. The KS4 programme of study ([ENG-KS4]) is the statutory curriculum the GCSE follows. GCSE codes are cited because they are itemised.
- England A level here means **Mathematics** only. Further Mathematics was not read.
- IB DP here means **Mathematics: analysis and approaches** only. Applications and interpretation was not read (see Gaps).
- Kindergarten (CCSS K, England Y1, Cambridge Stage 1) is outside grades 1–12, but it is cited where it shows a skill *starts* before G1.

---

## 3. Number

### 3.1 Counting, number names, place value (whole numbers)

| Skill | CCSS | England | Cambridge | IB | Timing |
|---|---|---|---|---|---|
| Count to 100 / 120 forwards and back; read and write numerals | `1.NBT.1` count to 120, read/write numerals (G1) | Y1 (K): count to and across 100, numerals to 100, words 1–20; Y2 (G1): numbers to at least 100 in numerals and words | St1 (K): recite 1–100, read/write 0–20 ([CP-OUT]) | — | — |
| Skip-count (2s, 5s, 10s, then 3, 4, 8, 50, 100, 6, 7, 9, 25, 1000) | `2.NBT.2` skip-count by 5s, 10s, 100s (G2) | Y1 (K) 2s, 5s, 10s; Y2 (G1) 2, 3, 5, 10s; Y3 (G2) 4, 8, 50, 100; Y4 (G3) 6, 7, 9, 25, 1000 | St1 (K) tens, twos; St3 (G2) steps of 2, 3, 4, 5 to 50 ([CP-OUT]) | — | — |
| One more/less, 10 more/less, 100 more/less, 1000 more/less | `1.NBT.5` 10 more/less (G1); `2.NBT.8` add/subtract 10 or 100 mentally (G2) | Y1 (K) one more/less; Y3 (G2) 10 or 100 more/less; Y4 (G3) 1000 more/less | St1 (K) 1 or 10 more/less within 30; St3 (G2) 1, 10, 100 more/less ([CP-OUT]) | — | — |
| Two-digit place value (tens and ones; teens as a ten and ones) | `1.NBT.2` (G1) | Y2 (G1) | St1 (K) "begin partitioning two-digit numbers" ([CP-OUT]) | — | — |
| Three-digit place value; expanded form | `2.NBT.1`, `2.NBT.3` (G2) | Y3 (G2) | St3 (G2) partition into hundreds, tens, units ([CP-OUT]) | — | — |
| Multi-digit place value (×10 per place to the left); read/write to 1 000 000 and 10 000 000 | `4.NBT.1`, `4.NBT.2` multi-digit (G4) | Y4 (G3) four-digit; Y5 (G4) to 1 000 000; Y6 (G5) to 10 000 000 | St5 (G4) five- and six-digit, to one million ([CP-OUT]) | — | — |
| Compare and order with <, =, > | `1.NBT.3` 2-digit (G1); `2.NBT.4` 3-digit (G2); `4.NBT.2` multi-digit (G4) | Y1 (K) language; Y2 (G1) 0–100 with symbols; Y3 (G2) to 1000; Y4 (G3) beyond 1000 | St3 (G2) three-digit with < and >; St5 (G4) to a million ([CP-OUT]); `C1.5`/`E1.5` ordering with = ≠ < > ≤ ≥ (G9–10 conv.) | — | — |
| Number line placement of whole numbers | `2.MD.6` (G2) | Y1 (K), Y2 (G1) "including the number line" | St1 (K) order to 20 on a number line; St3 (G2) three-digit on a line marked in 100s/10s ([CP-OUT]) | — | — |
| Rounding whole numbers (10, 100, 1000, any place) | `3.NBT.1` to 10 or 100 (G3); `4.NBT.3` any place (G4) | Y4 (G3) to 10, 100, 1000; Y5 (G4) to 100 000; Y6 (G5) any accuracy | St3 (G2) 2-digit to 10, 3-digit to 100; St5 (G4) 4-digit to 10/100/1000 ([CP-OUT]) | — | Cambridge St3 one year before CCSS |
| Estimate a number / quantity | — (no standalone standard) | Y2 (G1), Y3 (G2), Y4 (G3) "identify, represent and estimate numbers" | St1 (K) estimate objects to 30; St3 (G2) estimate as a range ([CP-OUT]) | — | — |
| Odd and even | `2.OA.3` (G2) | Y2 (G1) via the 2/5/10 tables | St1 (K) "try to share … to find which are even and odd"; St5 (G4) statements about sums of odd/even ([CP-OUT]) | — | — |
| Ordinal numbers | — | — | St1 (K) "use ordinal numbers" ([CP-OUT]) | — | Cambridge only (in sources read) |
| Roman numerals (I–XII, to C, to M) | — | Y3 (G2) I–XII on clocks; Y4 (G3) to C; Y5 (G4) to M | — | — | **England only** |

### 3.2 Addition and subtraction (whole numbers)

| Skill | CCSS | England | Cambridge | IB | Timing |
|---|---|---|---|---|---|
| Meaning of + and −; word problems (add to, take from, put together, compare; unknown in any position) | `1.OA.1` within 20 (G1); `2.OA.1` within 100, one- and two-step (G2) | Y1 (K) one-step to 20 incl. missing numbers; Y2 (G1) problems with mental/written methods | — (2020 framework not public) | — | — |
| Add three numbers | `1.OA.2` sum ≤ 20 (G1); `2.NBT.6` up to four 2-digit numbers (G2) | Y2 (G1) three one-digit numbers | — | — | — |
| Properties: commutative/associative addition; subtraction is not commutative | `1.OA.3` (G1) | Y2 (G1) | — | — | — |
| Subtraction as unknown addend; inverse relationship to check | `1.OA.4` (G1) | Y2 (G1) inverse to check; Y3 (G2), Y4 (G3) inverse to check answers | — | — | — |
| Equal sign meaning; true/false equations; missing-number equations | `1.OA.7`, `1.OA.8` (G1) | Y1 (K) read/write +, −, =; missing number e.g. 7 = □ − 9; Y5 (G4) "understanding the meaning of the equals sign" | St1 (K) "use the = sign to represent equality" ([CP-OUT]) | — | — |
| Number bonds and facts within 10 / 20; fluency and recall | `1.OA.6` fluent within 10 (G1); `2.OA.2` fluent within 20, know all one-digit sums from memory by end of G2 | Y1 (K) bonds within 20; Y2 (G1) recall facts to 20 fluently, derive facts to 100 | — | — | England recall one year before CCSS |
| Mental strategies (counting on, making ten, near doubles, decomposing) | `1.OA.5`, `1.OA.6` (G1) | Y2 (G1) 2-digit + ones, + tens, 2-digit + 2-digit mentally; Y3 (G2) 3-digit + ones/tens/hundreds; Y5 (G4) increasingly large numbers | (Mental strategies is a named sub-strand of Calculation ([CP-OUT])) | — | — |
| Add/subtract within 100 (place-value strategies) | `1.NBT.4` add within 100 (G1); `1.NBT.6` subtract multiples of 10 (G1); `2.NBT.5` fluent within 100 (G2) | Y2 (G1) | — | — | — |
| Add/subtract within 1000 | `2.NBT.7` with models/strategies (G2); `3.NBT.2` fluent within 1000 (G3) | Y3 (G2) | — | — | — |
| **Column (standard) algorithm** for addition/subtraction | `4.NBT.4` "standard algorithm", multi-digit (G4) | Y3 (G2) "formal written methods of columnar addition and subtraction", up to 3 digits; Y4 (G3) up to 4 digits; Y5 (G4) more than 4 digits | — | — | **⚠ timing**: England requires column method in G2, CCSS names the standard algorithm only in G4 |
| Explain why strategies work | `2.NBT.9` (G2) | — (reasoning is an aim, not a statement) | — | — | — |
| Two-step and multi-step problems; choosing operations | `3.OA.8` two-step, 4 operations (G3); `4.OA.3` multistep (G4) | Y4 (G3) two-step; Y5 (G4) multi-step "deciding which operations" | — | — | — |
| Estimate and check (rounding, inverse) | `3.OA.8` "assess reasonableness … mental computation and estimation" (G3) | Y3 (G2) estimate and inverse; Y5 (G4) rounding to check; Y6 (G5) estimation to check | `C1.9`/`E1.9` estimation (G9–10 conv.) | — | — |

### 3.3 Multiplication and division (whole numbers)

| Skill | CCSS | England | Cambridge | IB | Timing |
|---|---|---|---|---|---|
| Equal groups, arrays, repeated addition (foundation) | `2.OA.4` arrays up to 5×5 (G2); `2.G.2` partition rectangle into squares (G2) | Y1 (K) one-step × and ÷ with objects and arrays | St1 (K) double single-digit numbers, halve evens to 10, share into two groups ([CP-OUT]) | — | — |
| Interpret products and quotients | `3.OA.1`, `3.OA.2` (G3) | Y2 (G1) write × ÷ = statements | — | — | England one year earlier |
| Times tables: 2, 5, 10 | within `3.OA.7` (G3) | Y2 (G1) | St3 (G2) multiply/divide by 2, 3, 4, 5, 6, 9, 10 ([CP-OUT]) | — | **⚠ timing**: England G1 and Cambridge G2 vs CCSS G3 |
| Times tables: 3, 4, 8 | within `3.OA.7` (G3) | Y3 (G2) | St3 (G2) (see above) | — | — |
| All tables to 10×10 / 12×12 from memory | `3.OA.7` "know from memory all products of two one-digit numbers" by end of G3 | Y4 (G3) "up to 12 × 12" | — | — | Same grade. England extends to 12×12 |
| Commutativity of ×; division is not commutative | `3.OA.5` (G3) | Y2 (G1) | St3 (G2) "multiplication is commutative" ([CP-OUT]) | — | England/Cambridge earlier |
| Associative and distributive properties | `3.OA.5` (G3) | Y4 (G3) multiply three numbers, distributive law; Y6 (G5) order of operations | St5 (G4) "how the laws of arithmetic apply to multiplication" ([CP-OUT]) | — | — |
| Division as unknown factor; relationship of × and ÷ | `3.OA.6` (G3) | Y2–Y3 (G1–G2) inverse statements | St3 (G2) write connected facts ([CP-OUT]) | — | — |
| Unknown number in × ÷ equations | `3.OA.4` (G3) | Y3 (G2) "missing number problems" | — | — | — |
| Multiply by 10 / multiples of 10 | `3.NBT.3` one-digit × multiples of 10 (G3) | Y4 (G3) mentally, ×0, ×1, ÷1; Y5 (G4) × ÷ 10, 100, 1000 | St3 (G2) 2-digit × 10; St5 (G4) × ÷ 10 or 100 up to 10 000 ([CP-OUT]) | — | — |
| Multiplicative comparison ("times as many"); scaling problems | `4.OA.1`, `4.OA.2` (G4) | Y3 (G2) positive integer scaling and correspondence problems; Y4 (G3) harder scaling | — | — | England earlier |
| Multi-digit × one-digit; 2-digit × 2-digit | `4.NBT.5` up to 4-digit × 1-digit, 2-digit × 2-digit, strategies (G4) | Y3 (G2) 2-digit × 1-digit; Y4 (G3) 2- and 3-digit × 1-digit "formal written layout"; Y5 (G4) up to 4-digit × 1- or 2-digit | St5 (G4) 3-digit × 1-digit, 2-digit × 2-digit ([CP-OUT]) | — | — |
| Long multiplication / standard algorithm | `5.NBT.5` standard algorithm (G5) | Y5 (G4) long multiplication for 2-digit; Y6 (G5) 4-digit × 2-digit | — | — | England one year earlier |
| Division with remainders; interpreting remainders in context | `4.NBT.6` up to 4-digit ÷ 1-digit with remainders (G4) | Y5 (G4) short division, interpret remainders; Y6 (G5) remainders as fractions or by rounding | St3 (G2) "division can leave a remainder"; St5 (G4) remainders as a fraction of the divisor, round up/down by context ([CP-OUT]); St7 (G6) remainder as fraction, e.g. 157 ÷ 25 = 6 7/25 ([CLS-OUT]) | — | Cambridge introduces remainders earliest |
| Divide by 2-digit divisors | `5.NBT.6` up to 4-digit ÷ 2-digit, strategies (G5) | Y6 (G5) long division and short division by 2-digit | — | — | — |
| Long division standard algorithm | `6.NS.2` "fluently divide multi-digit numbers using the standard algorithm" (G6) | Y6 (G5) "formal written method of long division" | — | — | — |
| Order of operations; brackets | `5.OA.1` parentheses, brackets, braces (G5); `5.OA.2` write expressions (G5) | Y6 (G5) order of operations; KS3 (G6–8) priority incl. powers, roots, reciprocals; `GCSE N3` | St5 (G4) "begin to use brackets to order operations" ([CP-OUT]); `C1.6`/`E1.6` (G9–10 conv.) | — | — |
| Mixed four-operation problems | `4.OA.3` (G4) | Y5 (G4); Y6 (G5) | — | — | — |
| Number and shape patterns with a rule | `3.OA.9` arithmetic patterns (G3); `4.OA.5` generate pattern from a rule (G4); `5.OA.3` two patterns, ordered pairs (G5) | Y2 (G1) "order and arrange combinations of mathematical objects in patterns and sequences" | St5 (G4) recognise and extend number sequences ([CP-OUT]) | — | — |

### 3.4 Factors, multiples, primes, powers and roots

| Skill | CCSS | England | Cambridge | IB | Timing |
|---|---|---|---|---|---|
| Factor pairs; multiples | `4.OA.4` factor pairs 1–100, multiples (G4) | Y4 (G3) factor pairs in mental calculation; Y5 (G4) all factor pairs, common factors | St5 (G4) multiples of 5, 10, 25, 50, 100 ([CP-OUT]); St7 (G6) multiples, factors, common factors, tests of divisibility ([CLS-OUT]) | — | — |
| Prime and composite | `4.OA.4` prime or composite 1–100 (G4) | Y5 (G4) prime vocabulary, primes to 100, recall primes to 19; Y6 (G5) identify primes | St7 (G6) primes < 100, sieve of Eratosthenes ([CLS-OUT]); `C1.1`/`E1.1` prime numbers (G9–10 conv.) | — | — |
| Prime factorisation; product notation; unique factorisation | — | KS3 (G6–8); `GCSE N4` | — | — | England only (in sources read) |
| HCF / GCF and LCM | `6.NS.4` GCF ≤ 100, LCM ≤ 12; distributive factoring (G6) | Y6 (G5) common factors and multiples; KS3 (G6–8) HCF, LCM; `GCSE N4` | St7 (G6) LCM in simple cases ([CLS-OUT]); `C1.1`/`E1.1` common factors/multiples | — | — |
| Square and cube numbers; notation ² ³ | `6.EE.1` whole-number exponents (G6) | Y5 (G4) square and cube numbers and notation | St7 (G6) squares to 20 × 20 and square roots ([CLS-OUT]); `C1.1`/`E1.1` | — | **⚠ timing**: England G4 vs CCSS G6 |
| Square roots and cube roots | `8.EE.2` √ and ∛ symbols; √ of perfect squares, ∛ of perfect cubes (G8) | KS3 (G6–8) integer powers and real roots; `GCSE N6` | St7 (G6) square roots; St9 (G8) estimate square and cube roots ([CLS-OUT]); `C1.3`/`E1.3` | — | Cambridge earliest (G6) |
| Integer exponent laws (zero, negative) | `8.EE.1` (G8) | KS3 (G6–8); `GCSE N7`, `A4` laws of indices | St9 (G8) positive, negative, zero indices and index laws ([CLS-OUT]); `C1.7` (Core: positive, zero, negative integers) | `SL 1.5` integer exponents (G11 conv.) | — |
| Fractional (rational) exponents | `N-RN.1`, `N-RN.2` (HS) | `GCSE N7` fractional indices (H); `ALEVEL B1` [AS] | `E1.7`, `E2.4` (E only for fractional) | `SL 1.7` | — |
| Reciprocals | — (implicit in `6.NS.1`) | KS3 (G6–8) priority incl. reciprocals; `GCSE N3` | `C1.1`/`E1.1` | — | — |
| Powers of 2, 3, 4, 5 recognised; estimate powers and roots | — | KS3 (G6–8); `GCSE N6` (estimate: H) | — | — | — |

### 3.5 Integers and negative numbers

| Skill | CCSS | England | Cambridge | IB | Timing |
|---|---|---|---|---|---|
| Negative numbers in context (temperature); count through zero | `6.NS.5` (G6) | Y4 (G3) count backwards through zero; Y5 (G4) interpret in context, count through zero; Y6 (G5) intervals across zero | St5 (G4) order negatives on a number line and temperature scale, rise/fall in temperature ([CP-OUT]) | — | **⚠ timing**: England G3 and Cambridge G4 vs CCSS G6 |
| Rational numbers on a number line; opposites; absolute value; ordering | `6.NS.6`, `6.NS.7` (G6) | KS3 (G6–8) order integers, decimals, fractions on the number line | St7 (G6) negatives as positions on a line ([CLS-OUT]) | — | — |
| Add/subtract integers (signed numbers) | `7.NS.1` rational numbers (G7) | KS3 (G6–8) four operations on positive and negative; `GCSE N2` | St7 (G6) add/subtract integers in context; St9 (G8) all four operations with directed numbers ([CLS-OUT]); `C1.6` negative numbers | — | — |
| Multiply/divide integers and rational numbers | `7.NS.2` (G7) | KS3 (G6–8); `GCSE N2` | St9 (G8) ([CLS-OUT]) | — | — |
| Real-world problems with all four operations on rationals | `7.NS.3`, `7.EE.3` (G7) | KS3 (G6–8) | — | — | — |

### 3.6 Fractions

| Skill | CCSS | England | Cambridge | IB | Timing |
|---|---|---|---|---|---|
| Halves and quarters of shapes/quantities | `1.G.3` halves, fourths of circles/rectangles (G1) | Y1 (K) half, quarter of object, shape or quantity | St1 (K) halves by folding ([CP-OUT]) | — | — |
| Thirds; unit fractions 1/3, 1/4, 2/4, 3/4 of a set or quantity | `2.G.3` halves, thirds, fourths of shapes (G2) | Y2 (G1) 1/3, 1/4, 2/4, 3/4 of length, shape, set; equivalence of 2/4 and 1/2 | St3 (G2) halves, thirds, quarters, tenths of shapes and numbers ([CP-OUT]) | — | — |
| Unit fraction 1/b and a/b as numbers | `3.NF.1` (G3) | Y3 (G2) unit and non-unit fractions as numbers | St3 (G2) fraction notation ([CP-OUT]) | — | England/Cambridge one year earlier |
| Fractions on a number line | `3.NF.2` (G3) | (Y3 (G2) "fractions as numbers") | St3 (G2) order simple or mixed fractions on a number line ([CP-OUT]) | — | — |
| Fractions of a set / of a quantity | — (via `4.NF.4`, `5.NF.4`) | Y3 (G2) of a discrete set; Y4 (G3) to calculate quantities | St3 (G2) relate fractions to division; St5 (G4) fractions of quantities ([CP-OUT]) | — | — |
| Tenths from dividing by 10 | `4.NF.6` (G4) | Y3 (G2) count in tenths | St3 (G2) tenths of shapes ([CP-OUT]) | — | **⚠ timing**: England G2 vs CCSS G4 |
| Equivalent fractions (models; n×a / n×b) | `3.NF.3` special cases (G3); `4.NF.1` general (G4) | Y3 (G2) small denominators; Y4 (G3) families; Y5 (G4) of a given fraction incl. tenths/hundredths | St3 (G2) 1/2 = 2/4 = 4/8 = 5/10; St5 (G4) more families ([CP-OUT]) | — | — |
| Compare and order fractions (same numerator/denominator, then unlike) | `3.NF.3d` same numerator or denominator (G3); `4.NF.2` unlike (G4) | Y3 (G2) unit fractions and same denominators; Y5 (G4) denominators multiples of same number; Y6 (G5) incl. > 1 | St5 (G4) order mixed numbers ([CP-OUT]) | — | — |
| Simplify fractions (common factors) | (implicit) | Y6 (G5) "use common factors to simplify fractions" | — | — | — |
| Mixed numbers and improper fractions; convert | `4.NF.3c` (G4) | Y5 (G4) | St3 (G2) recognise simple mixed fractions; St5 (G4) improper to mixed ([CP-OUT]) | — | — |
| Add/subtract same denominator | `4.NF.3` (G4) | Y3 (G2) within one whole; Y4 (G3) | — | — | **⚠ timing**: England G2 vs CCSS G4 |
| Add/subtract unlike denominators (incl. mixed numbers) | `5.NF.1`, `5.NF.2` (G5) | Y5 (G4) related denominators; Y6 (G5) any | — | — | — |
| Add tenths and hundredths (denominator 10 → 100) | `4.NF.5` (G4) | (Y5 (G4) tenths/hundredths equivalence) | — | — | — |
| Fraction × whole number | `4.NF.4` (G4) | Y5 (G4) proper fractions and mixed numbers × whole numbers | — | — | — |
| Fraction × fraction; area model; multiplication as scaling | `5.NF.4`, `5.NF.5`, `5.NF.6` (G5) | Y6 (G5) pairs of proper fractions | — | — | — |
| Fraction as division (a/b = a ÷ b) | `5.NF.3` (G5) | Y6 (G5) "associate a fraction with division" | St3 (G2) "begin to relate finding fractions to division"; St5 (G4) ([CP-OUT]) | — | — |
| Divide unit fraction ÷ whole, whole ÷ unit fraction | `5.NF.7` (G5) | Y6 (G5) proper fraction ÷ whole number | — | — | — |
| Divide fraction ÷ fraction | `6.NS.1` (G6) | KS3 (G6–8) four operations with proper/improper fractions; `GCSE N2` | `C1.6` four operations with fractions | — | — |
| Fractions with negatives (rational numbers) | `7.NS.1`–`7.NS.3` (G7) | KS3 (G6–8); `GCSE N2` "all both positive and negative" | — | — | — |
| Fraction of one quantity as another (incl. > 1) | — | KS3 (G6–8); `GCSE R3` | — | — | — |
| Fractions in ratio problems; fractions and percentages as operators | — | KS3 (G6–8); `GCSE N11`, `N12` | — | — | — |

### 3.7 Decimals

| Skill | CCSS | England | Cambridge | IB | Timing |
|---|---|---|---|---|---|
| Decimal notation for tenths and hundredths | `4.NF.6` (G4) | Y4 (G3) decimal equivalents of tenths/hundredths, 1/4, 1/2, 3/4 | St5 (G4) tenths and hundredths ([CP-OUT]) | — | England one year earlier |
| Compare decimals (to hundredths, then thousandths) | `4.NF.7` hundredths (G4); `5.NBT.3` thousandths (G5) | Y4 (G3) same number of places to 2 d.p.; Y5 (G4) up to 3 d.p. | St5 (G4) 1–2 d.p. with < > ([CP-OUT]) | — | — |
| Thousandths; read/write decimals | `5.NBT.3` (G5) | Y5 (G4) thousandths; read decimals as fractions | — | — | — |
| ×/÷ 10, 100, 1000 with decimals; powers of 10 patterns | `5.NBT.1`, `5.NBT.2` (G5) | Y4 (G3) ÷10, ÷100 of 1- or 2-digit numbers; Y5 (G4) × ÷ 10/100/1000 incl. decimals; Y6 (G5) to 3 d.p. | — | — | — |
| Round decimals | `5.NBT.4` any place (G5) | Y4 (G3) 1 d.p. to whole; Y5 (G4) 2 d.p. to whole and 1 d.p. | St5 (G4) 1 or 2 d.p. to whole ([CP-OUT]) | — | — |
| Four operations with decimals (to hundredths) with models | `5.NBT.7` (G5) | Y5 (G4) measure problems with decimals; Y6 (G5) 1-digit with 2 d.p. × whole; division to 2 d.p. | St5 (G4) 2-digit with 1 d.p. × 1-digit, e.g. 3.6 × 7 ([CP-OUT]); St7 (G6) × ÷ decimals by single digits ([CLS-OUT]) | — | — |
| Fluent standard algorithms with multi-digit decimals | `6.NS.3` (G6) | KS3 (G6–8) four operations; `GCSE N2` | St9 (G8) multiply and divide by decimals ([CLS-OUT]); `C1.6` | — | — |
| Effect of × ÷ by numbers between 0 and 1 | — | — | St9 (G8) ([CLS-OUT]) | — | Cambridge only (in sources read) |
| Fraction ↔ decimal conversion (terminating) | `7.NS.2d` long division to decimal (G7) | Y6 (G5) e.g. 3/8 = 0.375; KS3 (G6–8); `GCSE N10` | `C1.4`/`E1.4` | — | — |
| Recurring decimals ↔ fractions | `8.NS.1` "convert a decimal expansion which repeats eventually into a rational number" (G8) | `GCSE N10` (H) | `E1.4` (Extended notes include converting recurring decimals; Core candidates "are not expected" to convert recurring decimals, per `C1.4` notes) | — | — |

### 3.8 Percentages

| Skill | CCSS | England | Cambridge | IB | Timing |
|---|---|---|---|---|---|
| Meaning of per cent; % as fraction /100 and decimal | `6.RP.3c` percent as rate per 100 (G6) | Y5 (G4) | St5 (G4) "percentage as the number of parts in every 100"; halves, tenths, hundredths as % ([CP-OUT]) | — | **⚠ timing**: England/Cambridge G4 vs CCSS G6 |
| Percentage of a quantity | `6.RP.3c` (G6) | Y5 (G4) equivalents of 1/2, 1/4, 1/5, 2/5, 4/5; Y6 (G5) e.g. 15% of 360 | St5 (G4) simple percentages of quantities ([CP-OUT]); `C1.13.1` | — | — |
| Find the whole given part and percent | `6.RP.3c` (G6) | `GCSE R9` original value problems | `C1.13`/`E1.13.5` reverse percentages (E) | — | — |
| One quantity as a percentage of another; compare using % | — | KS3 (G6–8); `GCSE R9` | `C1.13.2` | — | — |
| Percentage increase/decrease; > 100% | `7.RP.3` markups, markdowns, percent increase/decrease, percent error (G7) | KS3 (G6–8); `GCSE R9` | `C1.13.3` | — | — |
| Simple interest; tax, tips, commissions | `7.RP.3` (G7) | KS3 (G6–8) simple interest; `GCSE R9` | `C1.13.4` simple and compound interest | `SL 1.2` simple interest as arithmetic sequence (G11 conv.) | — |
| Compound interest; depreciation (repeated percentage change) | — (only via exponential models, `F-LE`) | `GCSE R16` growth and decay incl. compound interest | `C1.13.4` (Core) | `SL 1.4` compound interest, annual depreciation | — |
| Fraction–decimal–percentage equivalences | `6.RP.3c` (G6) | Y5–Y6 (G4–G5) recall equivalences | St5 (G4) ([CP-OUT]); `C1.4`/`E1.4` | — | — |

### 3.9 Ratio, proportion and rates

| Skill | CCSS | England | Cambridge | IB | Timing |
|---|---|---|---|---|---|
| Ratio language and notation | `6.RP.1` (G6) | Y6 (G5) relative sizes of two quantities; KS3 (G6–8) ratio notation; `GCSE R4` | St5 (G4) "use ratio to solve problems, e.g. adapt a recipe" ([CP-OUT]) | — | **⚠ timing**: Cambridge G4, England G5, CCSS G6 |
| Simplify ratios | — (implicit in equivalent ratios `6.RP.3a`) | KS3 (G6–8); `GCSE R4` | `C1.11`/`E1.11` simplest form | — | — |
| Divide a quantity in a given ratio; part:part, part:whole | `6.RP.3` tape diagrams (G6) | Y6 (G5) unequal sharing and grouping; KS3 (G6–8); `GCSE R5` | `C1.11`/`E1.11` | — | — |
| Unit rate; tables of equivalent ratios; ratio graphs | `6.RP.2`, `6.RP.3a,b` (G6) | `GCSE R11` unit pricing | `C1.12` rates | — | — |
| Unit rates with fractions (complex fractions) | `7.RP.1` (G7) | — | — | — | — |
| Proportional relationships: test, tables, graphs, constant of proportionality, y = kx | `7.RP.2` (G7); `8.EE.5` graph, slope = unit rate (G8) | KS3 (G6–8) direct proportion, graphical/algebraic; `GCSE R7`, `R10`, `R14` | `E2.8` direct proportion (E only) | — | — |
| Inverse proportion | — | KS3 (G6–8); `GCSE R10`, `R13` (construct equations: H) | `E2.8` incl. square, cube, root variation (E only) | — | **⚠**: no CCSS standard names inverse proportion |
| Scale factors, scale drawings and maps | `7.G.1` (G7) | Y6 (G5) similar shapes with known scale factor; KS3 (G6–8); `GCSE R2` | `C4.3`/`E4.3` scale drawings | — | — |
| Compound measures: speed, density, pressure, rates of pay | `6.RP.3b` constant speed (G6); `G-MG.2` density (HS) | Y5 (G4) "simple rates"; KS3 (G6–8) speed, unit pricing, density; `GCSE R1`, `R11` (pressure included) | `C1.12`/`E1.12` incl. average speed | — | — |
| Relate ratio to fractions and to linear functions | — | KS3 (G6–8); `GCSE R6`, `R8` | — | — | — |

### 3.10 Estimation, rounding, accuracy and bounds

| Skill | CCSS | England | Cambridge | IB | Timing |
|---|---|---|---|---|---|
| Round to decimal places and significant figures | — (decimal rounding `5.NBT.4` only) | KS3 (G6–8); `GCSE N15` | `C1.9`/`E1.9` | — | — |
| Estimate calculations by rounding | `3.OA.8`, `4.OA.3` reasonableness (G3–G4) | Y5–Y6 (G4–G5); KS3 (G6–8); `GCSE N14` | `C1.9`/`E1.9` | — | — |
| Error intervals; upper and lower bounds | `N-Q.3` choose accuracy (HS) | KS3 (G6–8) errors with inequality notation a < x ≤ b; `GCSE N15` (error intervals), `N16` upper/lower bounds (H) | `C1.10` bounds of data; `E1.10` bounds of results of calculations (E) | — | — |
| Use a calculator efficiently; interpret display | — | KS3 (G6–8) | `C1.14`/`E1.14` | — | — |

### 3.11 Standard form, real numbers, surds

| Skill | CCSS | England | Cambridge | IB | Timing |
|---|---|---|---|---|---|
| Standard form / scientific notation; operations | `8.EE.3`, `8.EE.4` (G8) | KS3 (G6–8) interpret and compare; `GCSE N9` calculate | `C1.8`/`E1.8` | `SL 1.1` operations with a × 10^k (G11 conv.) | IB repeats it at G11 |
| Rational vs irrational numbers; decimal expansions | `8.NS.1` (G8); `N-RN.3` sums/products (HS) | KS3 (G6–8) "appreciate the infinite nature of the sets of integers, real and rational numbers"; exact roots vs decimal approximations | `C1.1`/`E1.1` rational and irrational | — | — |
| Rational approximations of irrationals; locate on number line | `8.NS.2` (G8) | — | — | — | — |
| Surds: simplify, rationalise denominators | `N-RN.2` radicals via exponents (HS) | `GCSE N8` (H); `ALEVEL B2` [AS] | `E1.18` (E only) | — (assumed prior knowledge; not a listed subtopic in [IB-AA]) | — |
| Exact calculation with π and surds | — | `GCSE N8` | — | — | — |

### 3.12 Sets, money, time as number

| Skill | CCSS | England | Cambridge | IB | Timing |
|---|---|---|---|---|---|
| Set language, notation, Venn diagrams | `S-CP.1` events as subsets, unions, intersections, complements (HS) | KS3 (G6–8) unions/intersections with Venn diagrams; `GCSE P6`; `GCSE A22` set notation for solutions (H) | `C1.2` (Venn diagrams limited to two sets); `E1.2` | — | — |
| Money (coins, notes, change, currency conversion) | `2.MD.8` dollars and cents (G2); `4.MD.2` money problems (G4) | Y1 (K) coins and notes; Y2 (G1) £ and p, combinations, change; Y3 (G2) add/subtract money; Y4 (G3) | Money is a sub-strand "until Stage 3" (G2) ([CP-OUT]); `C1.16`/`E1.16` incl. currency conversion | — | — |

### 3.13 Complex numbers (upper secondary)

| Skill | CCSS | England | Cambridge | IB | Timing |
|---|---|---|---|---|---|
| i, a + bi; add, subtract, multiply | `N-CN.1`, `N-CN.2` (HS, not +) | — (not in A level Mathematics; Further Maths not read) | `P3 3.9` | `AHL 1.12` | **⚠**: CCSS puts basic complex arithmetic in the common HS core; England A level Mathematics omits it |
| Conjugate, modulus, division | `N-CN.3` (+) | — | `P3 3.9` | `AHL 1.12`, `AHL 1.13` | — |
| Quadratics with complex solutions; conjugate roots | `N-CN.7` (HS); `N-CN.8` (+) | — | `P3 3.9` conjugate pairs | `AHL 1.14` | — |
| Complex plane / Argand diagram; polar form | `N-CN.4`, `N-CN.5`, `N-CN.6` (+) | — | `P3 3.9` Argand diagram, polar form, loci | `AHL 1.12`, `AHL 1.13` (incl. Euler form) | — |
| Square roots of a complex number; De Moivre | — | — | `P3 3.9` square roots | `AHL 1.14` De Moivre, powers and roots | — |
| Fundamental Theorem of Algebra | `N-CN.9` (+) | — | — | — | — |

### 3.14 Matrices

| Skill | CCSS | England | Cambridge | IB | Timing |
|---|---|---|---|---|---|
| Matrix arithmetic; identity, determinant, inverse; matrices as transformations; matrix equations for systems | `N-VM.6`–`N-VM.12`, `A-REI.8`, `A-REI.9` (all +) | — | — (not in 0580, 0607 or 9709) | — (not in AA; AA solves systems without matrices, `AHL 1.16`) | **CCSS (+) only** |

---

## 4. Algebra and functions

### 4.1 Expressions

| Skill | CCSS | England | Cambridge | IB | Timing |
|---|---|---|---|---|---|
| Letters for numbers; write and evaluate expressions; substitution | `6.EE.2`, `6.EE.6` (G6) | Y6 (G5) "use simple formulae", express missing number problems algebraically; KS3 (G6–8) notation, substitution; `GCSE A1`, `A2` | `C2.1`/`E2.1` | — | England one year earlier |
| Numerical expressions with whole-number exponents | `6.EE.1` (G6) | KS3 (G6–8) | — | — | — |
| Vocabulary: term, coefficient, factor, expression, equation, formula, identity | `6.EE.2b` (G6) | KS3 (G6–8); `GCSE A3` | — | `SL 1.6` equality vs identity | — |
| Equivalent expressions; properties (distributive) | `6.EE.3`, `6.EE.4` (G6); `7.EE.1` linear with rational coefficients (G7); `7.EE.2` (G7) | KS3 (G6–8); `GCSE A4` | — | — | — |
| Collect like terms; expand single bracket; factorise common factor | `7.EE.1` (G7) | KS3 (G6–8); `GCSE A4` | `C2.2` | — | — |
| Expand two (or more) binomials | `A-APR.1` polynomial arithmetic (HS) | KS3 (G6–8) "two or more binomials"; `GCSE A4` (more than two: H) | `C2.2.2`/`E2.2.2` | — | — |
| Factorise quadratics x² + bx + c; difference of two squares | `A-SSE.2` (HS) | `GCSE A4`; ax² + bx + c (H) | `E2.2.4` (E only: grouping, difference of squares, perfect square, ax² + bx + c, ax³ + bx² + cx) | `SL 2.6` forms of quadratics | **⚠ timing**: KS3 lists expansion but GCSE factorising is G9–10; CCSS HS |
| Complete the square | `A-SSE.3b`, `A-REI.4a` (HS) | `GCSE A11`, `A18` (H) | `E2.2.5` (E only) | `SL 2.6` vertex form | — |
| Algebraic fractions; simplify rational expressions | `A-APR.6`, `A-APR.7` (+) (HS) | `GCSE A4` algebraic fractions (H); `ALEVEL B6` simplify rational expressions | `E2.3` (E only) | — | — |
| Interpret parts of an expression in context | `A-SSE.1` (HS) | — | — | — | — |
| Laws of indices in algebra | `8.EE.1` (G8); `N-RN.2` (HS) | `GCSE A4` | `C2.4`/`E2.4` | `SL 1.5`, `SL 1.7` | — |
| Formulae: use, rearrange (change the subject) | `A-CED.4` (HS) | KS3 (G6–8); `GCSE A5` | `C2.5.4` simple; `E2.5.7` | — | — |
| Proof and equivalence arguments (show expressions equivalent) | `A-APR.4` prove identities (HS) | `GCSE A6` (proofs: H) | — | `SL 1.6` simple deductive proof, LHS to RHS | — |

### 4.2 Equations and inequalities

| Skill | CCSS | England | Cambridge | IB | Timing |
|---|---|---|---|---|---|
| One-step equations x + p = q, px = q | `6.EE.5`, `6.EE.7` (G6) | Y6 (G5) missing numbers algebraically; KS3 (G6–8) | `C2.5.2` linear in one unknown | — | — |
| Two-step equations px + q = r, p(x + q) = r | `7.EE.4a` (G7) | KS3 (G6–8) "all forms that require rearrangement" | `C2.5.2` | — | — |
| Multi-step linear equations; unknown on both sides; one/none/infinitely many solutions | `8.EE.7` (G8); `A-REI.1`, `A-REI.3` (HS) | KS3 (G6–8); `GCSE A17` | `C2.5.2`/`E2.5.2` | — | — |
| Construct equations from situations | `7.EE.4` (G7); `A-CED.1`, `A-CED.2` (HS) | KS3 (G6–8) model situations; `GCSE A21` | `C2.5.1`/`E2.5.1` | — | — |
| Equations with fractions (linear denominators) | — | — | `E2.5.3` (E only) | — | — |
| Simultaneous linear equations (2 unknowns): algebraic | `8.EE.8` (G8); `A-REI.5`, `A-REI.6` (HS) | KS3 (G6–8) approximate via graphs only; `GCSE A19` algebraically | `C2.5.3`/`E2.5.4` | — | — |
| Simultaneous linear/quadratic | `A-REI.7` (HS) | `GCSE A19` (H); `ALEVEL B4` [AS] | `E2.5.5` (E only); `P1 1.1` | — | — |
| Three linear equations in three unknowns | `A-REI.8`, `A-REI.9` via matrices (+) | — | — | `AHL 1.16` (incl. no/infinite solutions) | — |
| Pairs of numbers satisfying an equation with two unknowns; enumerate combinations | — | Y6 (G5) | — | — | England only |
| Quadratic equations by factorising | `A-REI.4b` (HS) | `GCSE A18` | `E2.5.6` (E only) | `SL 2.7` | — |
| Quadratic formula; completing the square to solve | `A-REI.4` (HS) | `GCSE A18` (H) | `E2.5.6` (E only); `P1 1.1` | `SL 2.7` | — |
| Discriminant; nature of roots | `A-REI.4b` (complex solutions) (HS) | `ALEVEL B3` [AS] | `P1 1.1` | `SL 2.7` | — |
| Equations quadratic in a function of x (e.g. in eˣ, sin x) | — | `ALEVEL B3` [AS] | `P1 1.1` | `SL 2.10` (e.g. e^{2x} − 5eˣ + 4 = 0) | — |
| Rational and radical equations; extraneous solutions | `A-REI.2` (HS) | — | — | — | — |
| Graphical solution: intersections of y = f(x) and y = g(x) | `A-REI.11` (HS) | KS3 (G6–8) approximate solutions from graphs; `GCSE A17`–`A19` | `C2.10.2`/`E2.10.2` | `SL 2.4`, `SL 2.10` (technology) | — |
| Inequalities: write x > c; represent on number line | `6.EE.8` (G6) | `GCSE A22` | `C2.6` represent and interpret only | — | — |
| Solve linear inequalities | `7.EE.4b` (G7); `A-REI.3` (HS) | `GCSE A22` | `E2.6.2` (E only) | — | — |
| Linear inequalities in two variables; regions | `A-REI.12` (HS) | `GCSE A22` (H); `ALEVEL B5` [AS] | `E2.6.3`, `E2.6.4` (E only) | — | — |
| Quadratic inequalities | — | `GCSE A22` (H); `ALEVEL B5` [AS] | `P1 1.1` | `SL 2.7` | — |
| Modulus equations/inequalities | — | `ALEVEL B7` (modulus of linear function) | `P2 2.1`/`P3 3.1` | `AHL 2.16` | — |
| Inequalities g(x) ≥ f(x) analytically and graphically | — | — | — | `AHL 2.15` | — |
| Numerical solution by iteration | — | `GCSE A20` (H) | `P2 2.6`/`P3 3.6` | — | (see also 7.5) |

### 4.3 Sequences and series

| Skill | CCSS | England | Cambridge | IB | Timing |
|---|---|---|---|---|---|
| Continue sequences; term-to-term rule | `4.OA.5` (G4) | Y6 (G5) generate and describe linear sequences; KS3 (G6–8); `GCSE A23` | St5 (G4) ([CP-OUT]); `C2.7`/`E2.7` | — | — |
| Position-to-term rule; nth term of linear sequences | `F-BF.2`, `F-LE.2` (HS) | KS3 (G6–8) arithmetic sequences and nth term; `GCSE A25` | `C2.7.3` linear, simple quadratic, simple cubic | — | **⚠ timing**: England G6–8 vs CCSS HS |
| nth term of quadratic sequences | — | `GCSE A25` (H) | `C2.7.3` simple quadratic | — | — |
| Special sequences (triangular, square, cube, Fibonacci) | `F-IF.3` Fibonacci as recursive (HS) | `GCSE A24` | — | — | — |
| Sequences as functions; recursive and explicit forms | `F-IF.3`, `F-BF.2` (HS) | `ALEVEL D2` xₙ₊₁ = f(xₙ); increasing, decreasing, periodic | — | — | — |
| Arithmetic series: nth term and sum; sigma notation | `F-BF.2` (HS, terms only) | `ALEVEL D3`, `D4` | `P1 1.6` | `SL 1.2` | — |
| Geometric sequences; finite geometric series sum | `A-SSE.4` (HS); `F-LE.2` (HS) | `GCSE A24` simple geometric progressions; `ALEVEL D5` | `P1 1.6` | `SL 1.3` | — |
| Sum to infinity; convergence (abs r < 1) | — | `ALEVEL D5` | `P1 1.6` | `SL 1.8` | — |
| Binomial expansion, positive integer n; nCr, n! | `A-APR.5` (+) | `ALEVEL D1` [AS] | `P1 1.6` | `SL 1.9` (Pascal's triangle) | — |
| Binomial expansion, rational n (validity) | — | `ALEVEL D1` | `P3 3.1` | `AHL 1.10` | — |
| Proof by induction | — | — (Further Maths not read) | — | `AHL 1.15` | IB only |
| Sequences in modelling / finance | — | `ALEVEL D6` | — | `SL 1.2`–`SL 1.4` | — |

### 4.4 Coordinates and linear graphs

| Skill | CCSS | England | Cambridge | IB | Timing |
|---|---|---|---|---|---|
| Coordinates, first quadrant | `5.G.1`, `5.G.2` (G5) | Y4 (G3) describe positions, plot points to complete polygons | — | — | **⚠ timing**: England G3 vs CCSS G5 |
| Coordinates, four quadrants; reflections in axes | `6.NS.6b`, `6.NS.8` (G6) | Y6 (G5) full grid; KS3 (G6–8); `GCSE A8` | `C3.1`/`E3.1` | — | — |
| Plot straight-line graphs from equations / tables | `8.F.3` (G8) | KS3 (G6–8); `GCSE A9` | `C3.2`/`E3.2` | — | — |
| Gradient and intercept; y = mx + c; slope from similar triangles | `8.EE.5`, `8.EE.6`, `8.F.3`, `8.F.4` (G8) | KS3 (G6–8) reduce to y = mx + c, gradients and intercepts; `GCSE A9`, `A10` | `C3.3` gradient from a grid only; `E3.3` from two points; `C3.5`/`E3.5` | `SL 2.1` | — |
| Equation of a line through two points / point and gradient | `8.F.4` (G8) | `GCSE A9` | `E3.5` | `SL 2.1` | — |
| Parallel lines | `G-GPE.5` (HS) | `GCSE A9` | `C3.6`/`E3.6` | `SL 2.1` | — |
| Perpendicular lines (m₁m₂ = −1) | `G-GPE.5` (HS) | `GCSE A9` (H); `ALEVEL C1` [AS] | `E3.7` (E only) | `SL 2.1` | — |
| Length and midpoint of a segment | `8.G.8` distance via Pythagoras (G8); `6.G.3` horizontal/vertical lengths (G6) | (via `GCSE G11` coordinate problems) | `E3.4` (E only) | `SL 3.1` (3D distance and midpoint) | — |
| Point dividing a segment in a ratio | `G-GPE.6` (HS) | — | — | — | — |
| Coordinate proofs; perimeters/areas from coordinates | `G-GPE.4`, `G-GPE.7` (HS) | `GCSE G11` | — | — | — |
| Line forms y − y₁ = m(x − x₁), ax + by + c = 0 | — | `ALEVEL C1` [AS] | `P1 1.3` | `SL 2.1` | — |
| Real-life graphs: conversion, distance–time, speed–time | `8.F.5` qualitative graphs (G8) | Y4 (G3) time graphs; Y5 (G4) line graphs; KS3 (G6–8) piece-wise linear; `GCSE A14`, `R14` | `C2.9`/`E2.9` travel and conversion graphs; `E2.9.3`, `E2.9.4` kinematics, area under speed–time (E) | — | — |

### 4.5 Functions and non-linear graphs

| Skill | CCSS | England | Cambridge | IB | Timing |
|---|---|---|---|---|---|
| Function concept: one output per input | `8.F.1` (G8); `F-IF.1` (HS) | `GCSE A7` expressions as functions with inputs/outputs | `E2.13.1` (E only) | `SL 2.2` | — |
| Function notation; domain and range | `F-IF.1`, `F-IF.2`, `F-IF.5` (HS) | `ALEVEL B8` (implied) | `E2.13.1`; `P1 1.2` | `SL 2.2` | — |
| Compare functions in different representations | `8.F.2` (G8); `F-IF.9` (HS) | — | — | — | — |
| Linear vs non-linear functions | `8.F.3` (G8); `F-LE.1`, `F-LE.3` (HS) | — | — | — | — |
| Key features of graphs (intercepts, increasing/decreasing, max/min, symmetry, end behaviour) | `F-IF.4` (HS) | `GCSE A11` (roots, intercepts, turning points) | `C2.11`/`E2.11` | `SL 2.4` | — |
| Average rate of change | `F-IF.6` (HS) | `GCSE R15` (H) | — | — | — |
| Quadratic graphs; roots and turning points | `F-IF.7a`, `F-IF.8a` (HS) | KS3 (G6–8) graphs of quadratics; `GCSE A11` | `C2.10`/`C2.11` (Core: symmetry and roots); `E2.10` | `SL 2.6` | **⚠ timing**: England KS3 (G6–8) graphs quadratics; CCSS HS |
| Find a quadratic from given vertex/intercepts | — | — | `0607 E3.4` | `SL 2.6` (forms) | — |
| Cubic and reciprocal graphs | `F-IF.7c` polynomials (HS) | KS3 (G6–8) reciprocal graphs in context; `GCSE A12` | `C2.10` (Core forms), `E2.10`, `E2.11` | `SL 2.8` reciprocal and rational (ax + b)/(cx + d) | — |
| Asymptotes | — | `ALEVEL B7` y = a/x, a/x² asymptotes | `0607 E3.5` | `SL 2.8`, `SL 2.4` | — |
| Square root, cube root, piecewise, step and absolute value functions | `F-IF.7b` (HS) | `ALEVEL B7` modulus of linear function | `P2 2.1`/`P3 3.1` y = abs(ax + b) | `AHL 2.16` | — |
| Exponential graphs y = kˣ | `F-IF.7e`, `F-LE.1`, `F-LE.2` (HS) | KS3 (G6–8) exponential graphs in context; `GCSE A12`, `A14` (H) | `E2.10.1`, `E2.10.3`, `E2.11` (E only) | `SL 2.9` | — |
| Trig graphs y = sin x, cos x, tan x | `F-TF.5` (HS) | `GCSE A12` (H) any angle | `E6.4` (E only), 0°–360° | `SL 3.7` | (see also 5.9) |
| Transformations of graphs: f(x) + k, f(x + k) | `F-BF.3` (HS) | `GCSE A13` (H) translations and reflections | `0607 E3.6` (translations only); not in 0580 | `SL 2.11` | — |
| Stretches kf(x), f(kx) and combinations | `F-BF.3` (HS) | `ALEVEL B9` [AS for single; combinations A2] | `P1 1.2` | `SL 2.11` | — |
| Composite functions | `F-BF.1c` (+) (HS) | `GCSE A7` (H); `ALEVEL B8` | `E2.13.3` (E only); `P1 1.2` | `SL 2.5` | — |
| Inverse functions; graph as reflection in y = x | `F-BF.4a` (HS); further parts of `F-BF.4` are (+) | `GCSE A7` (H); `ALEVEL B8` | `E2.13.2` (E only); `P1 1.2` one-one | `SL 2.2`, `SL 2.5`; `AHL 2.14` domain restriction, self-inverse | — |
| Odd and even functions | — | — | — | `AHL 2.14` | — |
| Build functions from context; combine standard functions | `F-BF.1` (HS) | `ALEVEL B11` modelling with functions | — | `SL 2.2` function as a model | — |
| Graphs of abs(f(x)), f(abs(x)), 1/f(x), [f(x)]² | — | — | — | `AHL 2.16` | IB only |
| Sketch graphs using a graphing calculator | — | — | `0607 E3.2` | `SL 2.3` | — |

### 4.6 Polynomials and rational functions

| Skill | CCSS | England | Cambridge | IB | Timing |
|---|---|---|---|---|---|
| Polynomial arithmetic (closure) | `A-APR.1` (HS) | `ALEVEL B6` | — | — | — |
| Remainder theorem and factor theorem | `A-APR.2` (HS) | `ALEVEL B6` [AS] | `P2 2.1`/`P3 3.1` | `AHL 2.12` | — |
| Polynomial division | `A-APR.6` (HS) | `ALEVEL B6` [AS] simple algebraic division | `P2 2.1`/`P3 3.1` degree ≤ 4 by linear or quadratic | — | — |
| Zeros and graph sketch from factors | `A-APR.3` (HS) | `ALEVEL B7` | — | `AHL 2.12` | — |
| Sum and product of roots | — | — | — | `AHL 2.12` | IB only |
| Partial fractions | — | `ALEVEL B10` | `P3 3.1` | `AHL 1.11` | — |
| Rational functions (ax + b)/(cx² + dx + e) etc. | — | — | — | `AHL 2.13` | IB only |

### 4.7 Exponentials and logarithms

| Skill | CCSS | England | Cambridge | IB | Timing |
|---|---|---|---|---|---|
| Exponential growth and decay models | `F-LE.1`, `F-LE.2`, `F-LE.5` (HS) | `GCSE R16`; `ALEVEL F7` [AS] | `E1.17` (E only); `E2.10.3` | `SL 1.3`, `SL 1.4` (geometric); `SL 2.9` | — |
| Logarithm definition (inverse of exponential); base 10 and e | `F-LE.4` base 2, 10, e (HS); `F-BF.5` (+) | `ALEVEL F3` [AS] | `0607 E3.7` (base 10 by default); not in 0580; `P2 2.2`/`P3 3.2` | `SL 1.5` | **⚠**: 0607 has logs at IGCSE level (G9–10), 0580 and GCSE do not |
| Laws of logarithms | — | `ALEVEL F4` [AS] | `P2 2.2`/`P3 3.2` (excluding change of base) | `SL 1.7` (incl. change of base) | — |
| Solve aˣ = b | `F-LE.4` (HS) | `ALEVEL F5` [AS] | `0607 E3.7`; `P2 2.2` | `SL 1.7` | — |
| eˣ and ln x graphs | — | `ALEVEL F1`, `F3` [AS] | `P2 2.2`/`P3 3.2` | `SL 2.9` | — |
| Log graphs to find parameters (y = axⁿ, y = kbˣ) | — | `ALEVEL F6` [AS] | `P2 2.2`/`P3 3.2` | — | — |

### 4.8 Proof

| Skill | CCSS | England | Cambridge | IB | Timing |
|---|---|---|---|---|---|
| Deduction, exhaustion, counter-example | geometry proofs `G-CO.9`–`G-CO.11` (HS) | `GCSE A6`; `ALEVEL A1` [AS] | — | `SL 1.6`; `AHL 1.15` counter-example | — |
| Proof by contradiction (√2 irrational, infinitely many primes) | `N-RN.3` explain (HS) | `ALEVEL A1` | — | `AHL 1.15` | — |

---

## 5. Geometry and measures

### 5.1 2-D and 3-D shapes and their properties

| Skill | CCSS | England | Cambridge | IB | Timing |
|---|---|---|---|---|---|
| Recognise and name common 2-D and 3-D shapes | `1.G.1` (G1) | Y1 (K) | — | — | — |
| Defining vs non-defining attributes; build/draw shapes | `1.G.1` (G1) | Y3 (G2) draw 2-D, make 3-D shapes | — | — | — |
| Compose shapes from shapes | `1.G.2` (G1) | — | — | — | — |
| Sides, vertices; faces, edges | `2.G.1` angles and faces (G2) | Y2 (G1) sides; edges, vertices, faces | — | — | England one year earlier |
| 2-D faces on 3-D shapes; sort and compare shapes | — | Y2 (G1) | — | — | — |
| Quadrilateral categories sharing attributes (rhombus, rectangle, square) | `3.G.1` (G3) | Y4 (G3) classify quadrilaterals and triangles | — | — | — |
| Classify by parallel/perpendicular sides and right angles; hierarchy | `4.G.2` (G4); `5.G.3`, `5.G.4` (G5) | Y4 (G3); Y6 (G5) by properties and sizes | — | — | — |
| Regular vs irregular polygons | — | Y5 (G4) | `C4.1`/`E4.1` vocabulary of polygons | — | — |
| Properties of special quadrilaterals and triangles (derive and apply) | — | KS3 (G6–8) derive properties; `GCSE G4` | `C4.1`/`E4.1` | — | — |
| 3-D shapes from 2-D representations; nets | `6.G.4` nets for surface area (G6) | Y5 (G4) 3-D from 2-D pictures; Y6 (G5) build 3-D shapes, make nets | `C4.2.3`/`E4.2.3` nets | — | — |
| Cross-sections of solids; solids of revolution | `7.G.3` (G7); `G-GMD.4` (HS) | — | — | — | CCSS only |
| Plans and elevations | — | `GCSE G13` | — | — | England only |
| Parts of a circle (radius, diameter, circumference, chord, tangent, arc, sector, segment) | `G-CO.1` definitions (HS) | Y6 (G5) radius, diameter, circumference; `GCSE G9` | `C4.1.3`/`E4.1.3` | — | — |

### 5.2 Lines and angles

| Skill | CCSS | England | Cambridge | IB | Timing |
|---|---|---|---|---|---|
| Turns: whole, half, quarter, three-quarter; clockwise | — | Y1 (K); Y2 (G1) right angles as turns; Y3 (G2) | — | — | — |
| Right angles; greater/less than a right angle | — | Y3 (G2) | — | — | — |
| Points, lines, segments, rays; perpendicular and parallel lines | `4.G.1` (G4) | Y3 (G2) horizontal, vertical, perpendicular, parallel | `C4.1`/`E4.1` | — | England two years earlier |
| Acute, obtuse (and reflex) angles | `4.G.1` acute, obtuse, right (G4) | Y4 (G3) acute and obtuse; Y5 (G4) reflex | `C4.1`/`E4.1` | — | — |
| Measure and draw angles in degrees with a protractor | `4.MD.5`, `4.MD.6` (G4) | Y5 (G4) | `C4.2.1`/`E4.2.1` | — | — |
| Angle measure is additive | `4.MD.7` (G4) | — | — | — | — |
| Angles at a point (360°), on a line (180°), vertically opposite | `7.G.5` supplementary, complementary, vertical, adjacent (G7) | Y5 (G4) at a point and on a line; Y6 (G5) vertically opposite; KS3 (G6–8); `GCSE G3` | `C4.6.1`/`E4.6.1` | — | England two years earlier |
| Angles in triangles (180°) and quadrilaterals; exterior angle | `8.G.5` (G8); `G-CO.10` prove (HS) | Y6 (G5) missing angles in any triangle, quadrilateral, regular polygon; KS3 (G6–8) derive; `GCSE G3` | `C4.6.1`/`E4.6.1` | — | **⚠ timing**: England G5 vs CCSS G8 |
| Parallel lines: alternate, corresponding, co-interior | `8.G.5` (G8); `G-CO.9` prove (HS) | KS3 (G6–8); `GCSE G3` | `C4.6.2`/`E4.6.2` | — | — |
| Angle sums of polygons; regular polygon properties | — | KS3 (G6–8); `GCSE G3` | `C4.6.3` regular; `E4.6.3` regular and irregular | — | — |
| Bearings (three-figure) | — | `GCSE G15` | `C4.3.2`/`E4.3.2` | — | **CCSS has no bearings** |

### 5.3 Symmetry

| Skill | CCSS | England | Cambridge | IB | Timing |
|---|---|---|---|---|---|
| Line symmetry | `4.G.3` (G4) | Y2 (G1) vertical line; Y4 (G3) any orientation, complete a symmetric figure | `C4.5`/`E4.5` | — | England earlier |
| Rotational symmetry (order) | `G-CO.3` rotations carrying a polygon onto itself (HS) | KS3 (G6–8) reflectively and rotationally symmetric polygons; `GCSE G1` | `C4.5`/`E4.5` | — | — |
| Symmetry of 3-D solids | — | — | `E4.5.2` (E only) | — | — |

### 5.4 Position, direction, transformations

| Skill | CCSS | England | Cambridge | IB | Timing |
|---|---|---|---|---|---|
| Describe position, direction and movement | — | Y1 (K); Y2 (G1) | (Position and movement sub-strand ([CP-OUT])) | — | — |
| Translations on a grid | `8.G.1`, `8.G.3` (G8) | Y4 (G3) left/right, up/down; Y5 (G4); Y6 (G5) on coordinate plane | `C7.1.4`/`E7.1.4` by a vector | — | **⚠ timing**: England G3–5 vs CCSS G8 |
| Reflections | `8.G.1`, `8.G.3` (G8) | Y5 (G4); Y6 (G5) in the axes; KS3 (G6–8) | `C7.1.1` vertical/horizontal line; `E7.1.1` any straight line | — | — |
| Rotations | `8.G.1`, `8.G.3` (G8) | KS3 (G6–8) | `C7.1.2` multiples of 90°; `E7.1.2` | — | — |
| Enlargement / dilation; scale factor (fractional, negative) | `8.G.3`, `8.G.4` (G8); `G-SRT.1` (HS) | KS3 (G6–8) similar shapes by enlargement; `GCSE G7` (negative: H) | `C7.1.3`/`E7.1.3` | — | — |
| Transformations as functions; rigid motions; definitions | `G-CO.2`, `G-CO.4`, `G-CO.5`, `G-CO.6` (HS) | `GCSE G8` combinations and invariance (H) | — | — | — |
| Matrices as transformations | `N-VM.12` (+) | — | — | — | CCSS only |

### 5.5 Congruence, similarity, constructions

| Skill | CCSS | England | Cambridge | IB | Timing |
|---|---|---|---|---|---|
| Congruence via rigid motions; criteria SSS, SAS, ASA (RHS) | `8.G.2` (G8); `G-CO.7`, `G-CO.8` (HS) | KS3 (G6–8) criteria for congruence; `GCSE G5` incl. RHS | `C4.1`/`E4.1` vocabulary "congruent" | — | — |
| Similarity via transformations; AA criterion | `8.G.4`, `8.G.5` (G8); `G-SRT.2`, `G-SRT.3` (HS) | KS3 (G6–8); `GCSE G6`, `G7` | `C4.4` lengths; `E4.4` | — | — |
| Similar shapes: area and volume scale factors | — | `GCSE G19` (areas and volumes: H); `GCSE R12` | `E4.4.2` (E only) | — | — |
| Triangle proportionality; proofs with similarity | `G-SRT.4`, `G-SRT.5` (HS) | `GCSE G6` simple proofs | `E4.4.3` | — | — |
| Draw triangles from given conditions | `7.G.2` (G7) | Y6 (G5) draw 2-D shapes from given dimensions and angles | `C4.2.2` construct triangle from three sides | — | — |
| Ruler-and-compass constructions: perpendicular bisector, angle bisector, perpendicular from a point | `G-CO.12` (HS) | KS3 (G6–8); `GCSE G2` | — (0580 2025 lists only triangle from three sides) | — | **⚠ timing**: England G6–8 vs CCSS HS |
| Inscribed polygons (equilateral triangle, square, hexagon) | `G-CO.13` (HS) | — | — | — | — |
| Loci | — | `GCSE G2` | — | — | England only |
| Perpendicular distance is the shortest distance | — | KS3 (G6–8); `GCSE G2` | `E6.2.3` | — | — |
| Parallelogram theorems | `G-CO.11` (HS) | `GCSE G4` | — | — | — |

### 5.6 Circles

| Skill | CCSS | England | Cambridge | IB | Timing |
|---|---|---|---|---|---|
| Circle theorems: angle in semicircle, tangent ⟂ radius, angle at centre, same segment, cyclic quadrilateral, alternate segment | `G-C.2`, `G-C.3` (HS) | `GCSE G10` (H) | `C4.7` Core: only angle in a semicircle and tangent ⟂ radius; `E4.7` all six | — | — |
| Chord symmetry; equal tangents from an external point | `G-C.2` (HS) | `GCSE G10` (H) | `E4.8` (E only) | — | — |
| All circles are similar; tangent construction | `G-C.1`; `G-C.4` (+) | — | — | — | — |
| Inscribed and circumscribed circles of a triangle | `G-C.3` (HS) | — | — | — | — |
| Equation of a circle; complete the square for centre and radius | `G-GPE.1` (HS) | `GCSE A16` centre at origin, tangent (H); `ALEVEL C2` [AS] general | `P1 1.3` | — | — |
| Parabola from focus and directrix; ellipse and hyperbola | `G-GPE.2`; `G-GPE.3` (+) | — | — | — | CCSS only |
| Parametric equations of curves | — | `ALEVEL C3`, `C4` | `P2 2.4`/`P3 3.4` (differentiating parametric) | — | — |

### 5.7 Measurement (units, length, mass, capacity, temperature, time)

| Skill | CCSS | England | Cambridge | IB | Timing |
|---|---|---|---|---|---|
| Compare and order lengths directly/indirectly | `1.MD.1` (G1) | Y1 (K) compare lengths, mass, capacity, time | — | — | — |
| Measure length with non-standard units (iteration) | `1.MD.2` (G1) | Y1 (K) "measure and begin to record" | — | — | — |
| Measure length with standard units, choosing tools; estimate | `2.MD.1`, `2.MD.3` (G2) | Y2 (G1) m/cm, kg/g, °C, litres/ml | (Length, mass and capacity sub-strand ([CP-OUT])) | — | England one year earlier |
| Measure an object twice with different units | `2.MD.2` (G2) | — | — | — | — |
| Length difference; length word problems | `2.MD.4`, `2.MD.5` (G2) | Y3 (G2) add and subtract lengths (m/cm/mm) | — | — | — |
| Mass and liquid volume in g, kg, L | `3.MD.2` (G3) | Y2 (G1); Y3 (G2) measure, compare, add, subtract | — | — | England earlier |
| Temperature | — (only as negative numbers context `6.NS.5`) | Y2 (G1) °C with thermometers | St5 (G4) temperature scale ([CP-OUT]) | — | — |
| Relative sizes of units; convert within a system | `4.MD.1` (G4); `5.MD.1` (G5) | Y4 (G3) convert units (km to m, hour to minute); Y5 (G4) metric conversions; Y6 (G5) to 3 d.p. | `C5.1`/`E5.1` | — | — |
| Imperial units and approximate metric equivalents | `4.MD.1` lb, oz (G4); `2.MD.3` inches, feet (G2) | Y5 (G4) inches, pounds, pints; Y6 (G5) miles ↔ km | — | — | — |
| Four operations on measures (incl. money, decimals, fractions) | `4.MD.2` (G4) | Y5 (G4) | — | — | — |
| Units in modelling; choose units and scales | `N-Q.1`, `N-Q.2` (HS) | `GCSE N13`, `GCSE G14` | — | — | — |
| **Time**: o'clock and half past | `1.MD.3` (G1) | Y1 (K) | — | — | England one year earlier |
| Time to five minutes; a.m./p.m. | `2.MD.7` (G2) | Y2 (G1) five minutes, quarter past/to; minutes in hour, hours in day | — | — | England one year earlier |
| Time to the nearest minute; elapsed time / intervals | `3.MD.1` (G3) | Y3 (G2) nearest minute, durations, seconds in a minute, days in months, leap years | `C1.15`/`E1.15` | — | England one year earlier |
| 12- and 24-hour clock; timetables | — | Y3 (G2) 12- and 24-hour; Y4 (G3) convert analogue/digital 12/24; Y5 (G4) timetables | `C1.15.2`, `C1.15.3` | — | **CCSS has no 24-hour clock** |
| Days, weeks, months, years; sequencing events | — | Y1 (K) | — | — | — |
| Convert between units of time | `4.MD.1` hr, min, sec (G4) | Y4 (G3) hours ↔ minutes, years ↔ months, weeks ↔ days; Y5 (G4) | `C1.15.1` | — | — |

### 5.8 Perimeter, area, volume, surface area

| Skill | CCSS | England | Cambridge | IB | Timing |
|---|---|---|---|---|---|
| Perimeter of polygons | `3.MD.8` (G3) | Y3 (G2) simple 2-D shapes; Y4 (G3) rectilinear figures; Y5 (G4) composite rectilinear | Area and perimeter "from Stage 4" (G3) ([CP-OUT]); `C5.2`/`E5.2` | — | — |
| Area by counting unit squares | `3.MD.5`, `3.MD.6` (G3) | Y4 (G3) rectilinear shapes by counting squares | (from St4 (G3) ([CP-OUT])) | — | — |
| Area of rectangles (formula; tiling; distributive) | `3.MD.7` (G3); `4.MD.3` formulas (G4) | Y5 (G4) cm² and m², estimate irregular areas | `C5.2`/`E5.2` | — | — |
| Same area, different perimeter (and vice versa) | `3.MD.8` (G3) | Y6 (G5) | — | — | — |
| Area of triangles, parallelograms, trapezia, polygons | `6.G.1` (G6) | Y6 (G5) parallelograms and triangles; KS3 (G6–8) trapezia; `GCSE G16` | `C5.2`/`E5.2` | — | England one year earlier |
| Circumference and area of a circle | `7.G.4` (G7); `G-GMD.1` informal argument (HS) | KS3 (G6–8); `GCSE G17` | `C5.3.1`/`E5.3.1` | — | — |
| Arc length and sector area (degrees) | `G-C.5` arc length via similarity (HS) | `GCSE G18` | `C5.3.2` (sector angle a factor of 360); `E5.3.2` | — | — |
| Arc length and sector area in radians | `G-C.5` radian definition (HS) | `ALEVEL E1` | `P1 1.4` | `SL 3.4` | — |
| Compound shapes and parts of shapes | `7.G.6` (G7) | KS3 (G6–8) composite shapes; `GCSE G17` | `C5.5`/`E5.5` | — | — |
| Volume by counting unit cubes; volume as an attribute | `5.MD.3`, `5.MD.4` (G5) | Y5 (G4) estimate volume with 1 cm³ blocks | — | — | — |
| Volume of cuboids (V = lwh, V = Bh); additive volume | `5.MD.5` (G5); `6.G.2` fractional edges (G6) | Y6 (G5) cm³, m³, extending to mm³, km³ | `C5.4`/`E5.4` | — | — |
| Volume of prisms and cylinders | `7.G.6` prisms (G7); `8.G.9` cylinders (G8) | KS3 (G6–8); `GCSE G16` | `C5.4`/`E5.4` | — | — |
| Volume of cones, pyramids, spheres | `8.G.9` cones and spheres (G8); `G-GMD.3` (HS) | `GCSE G17` | `C5.4`/`E5.4` | `SL 3.1` (incl. hemisphere) | — |
| Surface area (nets; prisms, cylinders, spheres, cones, pyramids) | `6.G.4` (G6); `7.G.6` (G7) | `GCSE G17` | `C5.4`/`E5.4` | `SL 3.1` | — |
| Density and design problems | `G-MG.2`, `G-MG.3` (HS) | `GCSE R11` density | — | — | — |
| Cavalieri's principle | `G-GMD.2` (+) | — | — | — | CCSS only |

### 5.9 Pythagoras and trigonometry

| Skill | CCSS | England | Cambridge | IB | Timing |
|---|---|---|---|---|---|
| Pythagoras' theorem: proof, converse, apply in 2-D and 3-D | `8.G.6`, `8.G.7` (G8) | KS3 (G6–8) derive and use; `GCSE G6`, `G20` | `C6.1`/`E6.1`; 3-D in `E6.6` (E only) | `SL 3.3` | — |
| Distance between two points via Pythagoras | `8.G.8` (G8) | — | `E3.4` | `SL 3.1` (3-D) | — |
| Trig ratios in right-angled triangles (SOH CAH TOA) | `G-SRT.6`, `G-SRT.8` (HS) | KS3 (G6–8) "trigonometric ratios in similar triangles"; `GCSE G20` | `C6.2`/`E6.2` | `SL 3.2` | **⚠ timing**: England G6–8 vs CCSS HS |
| sin and cos of complementary angles | `G-SRT.7` (HS) | — | — | — | — |
| Angles of elevation and depression | — | — | `E6.2.4` | `SL 3.3` | — |
| Exact values (0°, 30°, 45°, 60°, 90°) | `F-TF.3` (+) | `GCSE G21` | `E6.3` (E only) | `SL 3.5` (multiples of π/6, π/4, π/3) | — |
| Sine rule, cosine rule | `G-SRT.10`, `G-SRT.11` (+) | `GCSE G22` (H); `ALEVEL E1` [AS] | `E6.5.1` (E only) | `SL 3.2`; ambiguous case `SL 3.5` | — |
| Area = ½ab sin C | `G-SRT.9` (+) | `GCSE G23` (H); `ALEVEL E1` [AS] | `E6.5.2` (E only) | `SL 3.2` | — |
| Trigonometry in 3-D; angle between a line and a plane | — | `GCSE G20` (3-D: H) | `E6.6` (E only) | `SL 3.1` | — |
| Unit circle definitions; angles of any size | `F-TF.2` (HS) | `ALEVEL E1` [AS] | `E6.4` 0°–360° | `SL 3.5` | — |
| Radian measure | `F-TF.1` (HS) | `ALEVEL E1` | `P1 1.4` | `SL 3.4` | — |
| Trig graphs; amplitude, period, midline; modelling periodic phenomena | `F-TF.5` (HS) | `GCSE A12` (H); `ALEVEL E3` [AS] | `E6.4.1`; `P1 1.5` | `SL 3.7` (incl. a sin(b(x + c)) + d) | — |
| Symmetry and periodicity of trig functions | `F-TF.4` (+) | `ALEVEL E3` [AS] | `P1 1.5` | `AHL 3.11` | — |
| Solve trig equations in an interval | `F-TF.7` (+) | `ALEVEL E7` [AS] | `E6.4.2` (E only); `P1 1.5` | `SL 3.8` | — |
| Inverse trig functions (principal values) | `F-TF.6`, `F-TF.7` (+) | `ALEVEL E4` | `P1 1.5` | `AHL 3.9` | — |
| tan = sin/cos; sin² + cos² = 1 | `F-TF.8` (HS) | `ALEVEL E5` [AS] | `P1 1.5` | `SL 3.5`, `SL 3.6` | — |
| sec, cosec, cot; 1 + tan² = sec² | — | `ALEVEL E4`, `E5` | `P2 2.3`/`P3 3.3` | `AHL 3.9` | — |
| Compound and double angle formulae | `F-TF.9` (+) | `ALEVEL E6` | `P2 2.3`/`P3 3.3` | `SL 3.6` (double angle sin/cos); `AHL 3.10` | — |
| a cos θ + b sin θ = R cos(θ ± α) | — | `ALEVEL E6` | `P2 2.3`/`P3 3.3` | — | — |
| Small-angle approximations | — | `ALEVEL E2` | — | — | England only |
| Trig proofs and identities | `F-TF.8` (HS) | `ALEVEL E8` | `P2 2.3` | `SL 3.6` | — |

### 5.10 Vectors

| Skill | CCSS | England | Cambridge | IB | Timing |
|---|---|---|---|---|---|
| Translation described by a column vector | — | `GCSE G24` | `C7.1.4`; `E7.2.1` | — | — |
| Add, subtract, scalar multiple (diagram and column) | `N-VM.4`, `N-VM.5` (+) | `GCSE G25` | `E7.2.2`, `E7.2.3` (E only) | `AHL 3.12` | — |
| Magnitude and direction; components | `N-VM.1`–`N-VM.3` (+) | `ALEVEL J2` [AS] | `E7.3` (E only) | `AHL 3.12` | — |
| Vector geometry and proofs; position vectors | — | `GCSE G25` (H); `ALEVEL J4`, `J5` | `E7.4` (E only) | `AHL 3.12` | — |
| Vectors in 3-D | — | `ALEVEL J1` (A2) | `P3 3.7` | `AHL 3.12` | — |
| Scalar (dot) product; angle between vectors | — | — | `P3 3.7` | `AHL 3.13` | — |
| Vector equation of a line; parallel, intersecting, skew | — | — | `P3 3.7` | `AHL 3.14`, `AHL 3.15` | — |
| Vector (cross) product; planes; intersections | — | — | — | `AHL 3.16`–`AHL 3.18` | IB only |

---

## 6. Statistics and probability

### 6.1 Collecting and representing data

| Skill | CCSS | England | Cambridge | IB | Timing |
|---|---|---|---|---|---|
| Sort and count into categories; tally charts | `1.MD.4` up to three categories (G1) | Y2 (G1) tally charts, block diagrams, simple tables | `C9.1`/`E9.1` tally and two-way tables | — | — |
| Pictograms and bar charts (single-unit scale) | `2.MD.10` up to four categories (G2) | Y2 (G1) pictograms; Y3 (G2) bar charts | `C9.4`/`E9.4` | — | — |
| Scaled pictograms and bar charts; "how many more" problems | `3.MD.3` (G3) | Y3 (G2) | — | — | England one year earlier |
| Line plots (dot plots) of measurement data (incl. fractions of a unit) | `2.MD.9` (G2); `3.MD.4` (G3); `4.MD.4` (G4); `5.MD.2` (G5) | — | — | — | **CCSS only** |
| Tables and timetables | — | Y4 (G3) tables; Y5 (G4) timetables | `C1.15.3` timetables | — | — |
| Line graphs / time graphs (continuous data) | — | Y4 (G3) time graphs; Y5 (G4) line graphs; Y6 (G5) | — | — | England only (in primary) |
| Pie charts | — (no CCSS standard names pie charts) | Y6 (G5); KS3 (G6–8); `GCSE S2` | `C9.4`/`E9.4` | — | **⚠**: absent from CCSS |
| Stem-and-leaf diagrams | — | — | `C9.4`/`E9.4`; `S1 5.1` | — | Cambridge only |
| Frequency tables; grouped data | — | KS3 (G6–8); `GCSE S2` | `C9.4`/`E9.4` simple frequency distributions | `SL 4.2` | — |
| Histograms | `6.SP.4` (G6); `S-ID.1` (HS) | `GCSE S3` incl. unequal intervals (H); `ALEVEL L1` [AS] area = frequency | `E9.7` frequency density (E only); `S1 5.1` | `SL 4.2` | **⚠ timing**: CCSS G6 vs England/Cambridge G9–10 (higher tier) |
| Box plots | `6.SP.4` (G6); `S-ID.1` (HS) | `GCSE S4` (H) | — (not in 0580); `S1 5.1` box-and-whisker | `SL 4.2` | **⚠ timing**: CCSS G6 vs England G9–10 (H) vs Cambridge/IB G11–12 |
| Cumulative frequency graphs; percentiles | — | `GCSE S3` (H) | `E9.6` (E only); `S1 5.1` | `SL 4.2` | — |
| Two-way tables (categorical bivariate) | `8.SP.4` (G8); `S-ID.5` (HS) | — (in probability `GCSE P9`) | `C9.1`/`E9.1` | — | — |
| Choose a suitable representation; critique | — | `ALEVEL L4` [AS] | `S1 5.1` | — | — |

### 6.2 Summarising and interpreting data

| Skill | CCSS | England | Cambridge | IB | Timing |
|---|---|---|---|---|---|
| Statistical questions; variability; distribution (centre, spread, shape) | `6.SP.1`, `6.SP.2` (G6) | — | — | — | CCSS only |
| Mean as an average | `6.SP.3`, `6.SP.5c` (G6) | Y6 (G5) "calculate and interpret the mean as an average" | `C9.3`/`E9.3` | `SL 4.3` | England one year earlier |
| Median, mode, range | `6.SP.5c` median; range as variation (G6) | KS3 (G6–8) mean, mode, median, range; `GCSE S4` | `C9.3`/`E9.3` | `SL 4.3` | — |
| Interquartile range; quartiles | `6.SP.5c` (G6) | `GCSE S4` (H) | `E9.3.1` (E only) | `SL 4.3` | **⚠ timing**: CCSS G6 vs England G9–10 (H) |
| Mean absolute deviation | `6.SP.5c` (G6) | — | — | — | CCSS only |
| Estimate the mean from grouped data; modal class | — | `GCSE S4` (modal class) | `E9.3.2`, `E9.3.3` (E only) | `SL 4.3` | — |
| Outliers and their effect | `S-ID.3` (HS) | KS3 (G6–8) consideration of outliers; `GCSE S4`; `ALEVEL L4` [AS] clean data | — | `SL 4.1` (1.5 × IQR rule) | — |
| Compare distributions | `7.SP.3`, `7.SP.4` (G7); `S-ID.2` (HS) | KS3 (G6–8); `GCSE S4` | `C9.2`/`E9.2` | — | — |
| Standard deviation, variance | `S-ID.2` (HS) | `ALEVEL L3` [AS] | `S1 5.1` (incl. from Σx, Σx², coded totals) | `SL 4.3` | **0580/0607 and GCSE: none** |
| Effect of a constant change on mean and SD | — | — | `S1 5.1` coded totals | `SL 4.3` | — |
| Normal distribution to estimate population percentages | `S-ID.4` (HS) | (see 6.5) | (see 6.5) | (see 6.5) | — |

### 6.3 Bivariate data

| Skill | CCSS | England | Cambridge | IB | Timing |
|---|---|---|---|---|---|
| Scatter plots; association; outliers, clusters | `8.SP.1` (G8); `S-ID.6` (HS) | KS3 (G6–8) scatter graphs; `GCSE S6` | `C9.5`/`E9.5` | `SL 4.4` | — |
| Line of best fit (by eye); predictions; interpolate and extrapolate | `8.SP.2`, `8.SP.3` (G8) | `GCSE S6` | `C9.5`/`E9.5` | `SL 4.4` (through the mean point) | — |
| Correlation vs causation | `S-ID.9` (HS) | `GCSE S6`; `ALEVEL L2` [AS] | `E9.5.2` positive/negative/zero | — | — |
| Fit functions to data; residuals | `S-ID.6` (HS) | — | — | — | — |
| Interpret slope and intercept of a linear model | `S-ID.7` (HS) | — | — | `SL 4.4` | — |
| Correlation coefficient (Pearson r) | `S-ID.8` (HS, with technology) | `ALEVEL O1` (hypothesis test for correlation, A2) | — | `SL 4.4` | — |
| Regression line y on x (technology); x on y | — | (calculations excluded, `ALEVEL L2`) | — | `SL 4.4`, `SL 4.10` | — |

### 6.4 Sampling and inference

| Skill | CCSS | England | Cambridge | IB | Timing |
|---|---|---|---|---|---|
| Population vs sample; random sampling; inferences | `7.SP.1`, `7.SP.2` (G7); `S-IC.1` (HS) | `GCSE S1`, `S5`; `ALEVEL K1` [AS] | `S2 6.4` | `SL 4.1` | **⚠ timing**: CCSS G7 vs England G9–10 |
| Sampling techniques (simple random, opportunity, systematic, stratified, quota) | — | `ALEVEL K1` [AS] (simple random, opportunity) | `S2 6.4` (why a method may be unsatisfactory) | `SL 4.1` (simple random, convenience, systematic, quota, stratified) | — |
| Surveys, experiments, observational studies | `S-IC.3` (HS) | — | — | — | CCSS only |
| Margin of error by simulation; compare treatments | `S-IC.4`, `S-IC.5` (HS) | — | — | — | CCSS only |
| Evaluate reports based on data | `S-IC.6` (HS) | — | `C9.2.3` restrictions on conclusions | `SL 4.1` reliability, bias | — |
| Sample mean as a random variable; Central Limit Theorem | — | — | `S2 6.4` | — | Cambridge only |
| Unbiased estimates; confidence intervals | — | — | `S2 6.4` | — | Cambridge only |

### 6.5 Probability

| Skill | CCSS | England | Cambridge | IB | Timing |
|---|---|---|---|---|---|
| Probability scale 0–1; likelihood language | `7.SP.5` (G7) | KS3 (G6–8); `GCSE P3` | Probability sub-strand "from Stage 5" (G4) ([CP-OUT]); `C8.1`/`E8.1` | — | **⚠ timing**: Cambridge Primary G4 vs CCSS G7 and England G6–8 (no probability in [ENG-P]) |
| Experimental probability; relative frequency | `7.SP.6` (G7) | KS3 (G6–8); `GCSE P1`, `P3`, `P5` | `C8.2`/`E8.2` | — | — |
| Probability models; equally likely outcomes; P(not A) = 1 − P(A) | `7.SP.7` (G7) | KS3 (G6–8); `GCSE P4`, `P7` | `C8.1.3`/`E8.1.4` | `SL 4.5` | — |
| Expected frequency | — | `GCSE P2` | `C8.2.2`/`E8.2.2` | `SL 4.5` | — |
| Compound events: lists, tables, tree diagrams, simulation | `7.SP.8` (G7) | KS3 (G6–8) sample spaces; `GCSE P6`, `P7`, `P8` | `C8.3`/`E8.3` sample space, Venn and tree diagrams | `SL 4.6` | — |
| Frequency trees | — | `GCSE P1` | — | — | England only |
| Independent and dependent events | `S-CP.2` (HS) | `GCSE P8` | `S1 5.3` | `SL 4.6`, `SL 4.11` | — |
| Addition rule P(A ∪ B); mutually exclusive | `S-CP.7` (HS) | `GCSE P4`; `ALEVEL M1` [AS] | `S1 5.3` | `SL 4.6` | — |
| Conditional probability | `S-CP.3`–`S-CP.6` (HS); `S-CP.8` (+) | `GCSE P9` (H) via expected frequencies; `ALEVEL M2` formula | `E8.4` (E only); `S1 5.3` | `SL 4.6`, `SL 4.11` | — |
| Bayes' theorem | — | — | — | `AHL 4.13` | IB only |
| Counting: product rule; permutations and combinations | `S-CP.9` (+) | `GCSE N5` systematic listing, product rule (H); `ALEVEL D1` nCr | `S1 5.2` incl. repetition and restrictions | `AHL 1.10` | — |
| Modelling with probability; critique assumptions | — | `ALEVEL M3` | — | — | — |

### 6.6 Random variables and distributions

| Skill | CCSS | England | Cambridge | IB | Timing |
|---|---|---|---|---|---|
| Discrete random variables; probability distribution tables; expected value | `S-MD.1`, `S-MD.2`, `S-MD.3`, `S-MD.4` (+) | `ALEVEL N1` [AS] (mean and variance calculation excluded) | `S1 5.4` incl. E(X), Var(X) | `SL 4.7`; `AHL 4.14` variance | — |
| Binomial distribution | (implicit in `S-MD.3` (+)) | `ALEVEL N1` [AS] | `S1 5.4` | `SL 4.8` | — |
| Geometric distribution | — | — | `S1 5.4` | — | Cambridge only |
| Normal distribution; standardisation; inverse normal | `S-ID.4` (HS) | `ALEVEL N2` | `S1 5.5` (tables; normal approximation to binomial) | `SL 4.9`, `SL 4.12` (technology) | — |
| Choose an appropriate distribution | — | `ALEVEL N3` | — | — | — |
| Poisson distribution | — | — | `S2 6.1` | — | Cambridge only |
| Linear combinations of random variables | — | — | `S2 6.2` | `AHL 4.14` E(aX + b), Var(aX + b) | — |
| Continuous random variables; pdf | — | — | `S2 6.3` | `AHL 4.14` | — |
| Expected values to evaluate decisions; fair decisions | `S-MD.5`, `S-MD.6`, `S-MD.7` (+) | — | — | — | CCSS only |

### 6.7 Hypothesis testing

| Skill | CCSS | England | Cambridge | IB | Timing |
|---|---|---|---|---|---|
| Language of hypothesis tests; binomial test for a proportion | `S-IC.2` (model consistency via simulation, HS) | `ALEVEL O1`, `O2` [AS] | `S2 6.5` (binomial or Poisson) | — (not in AA SL/AHL subtopics read) | — |
| Test for a normal mean (known variance) | — | `ALEVEL O3` | `S2 6.5` | — | — |
| Test for correlation coefficient | — | `ALEVEL O1` (A2) | — | — | — |
| Type I and Type II errors | — | — | `S2 6.5` | — | Cambridge only |

---

## 7. Calculus and numerical methods (grades 9–12 only)

**CCSS has no calculus standards** ([CCSS] HS intro: (+) standards prepare for calculus). Every row below is therefore "—" for CCSS.

### 7.1 Limits and differentiation

| Skill | England | Cambridge | IB | Timing |
|---|---|---|---|---|
| Estimate gradient of a curve by drawing a tangent; gradient as instantaneous rate of change | `GCSE A15`, `R15` (H) | `E2.12.1` (E only) | `SL 5.1` | **⚠ timing**: GCSE Higher and IGCSE Extended at G9–10 |
| Limit concept; derivative as gradient of tangent | `ALEVEL G1` [AS] | `P1 1.7` | `SL 5.1`; `AHL 5.12` continuity, differentiability | — |
| Differentiation from first principles | `ALEVEL G1` [AS for small powers], A2 for sin x, cos x | — (not listed in `P1 1.7`) | `AHL 5.12` | — |
| Differentiate axⁿ and sums | `ALEVEL G2` [AS], rational n | `E2.12.2` (E only, n a positive integer or zero); `P1 1.7` rational n | `SL 5.3` integer n; `SL 5.6` rational n | **⚠ timing**: IGCSE 0580 Extended differentiates polynomials at G9–10; 0607 has no differentiation |
| Tangents and normals | `ALEVEL G3` [AS] | `P1 1.7` | `SL 5.4` | — |
| Increasing/decreasing functions | `ALEVEL G3` [AS] | `P1 1.7` | `SL 5.2` | — |
| Stationary points; max/min; nature | `ALEVEL G3` [AS] | `E2.12.3`, `E2.12.4` (E only); `P1 1.7` | `SL 5.8` | — |
| Second derivative; concavity; points of inflection | `ALEVEL G1` [AS for second derivative], A2 for inflection | `P1 1.7` | `SL 5.7`, `SL 5.8` | — |
| Optimisation problems | (via `ALEVEL G3`) | — | `SL 5.8`; `AHL 5.14` | — |
| Rates of change; connected (related) rates | `ALEVEL G4` | `P1 1.7` rates of change | `AHL 5.14` related rates | — |
| Derivatives of eˣ, ln x, sin x, cos x, tan x | `ALEVEL G2` (A2) | `P2 2.4`/`P3 3.4` | `SL 5.6` (eˣ, ln x, sin x, cos x); `AHL 5.15` tan x etc. | — |
| Derivatives of aˣ, logₐ x, sec, cosec, cot, inverse trig | `ALEVEL G2` aᵏˣ | `P3 3.4` tan⁻¹ x | `AHL 5.15` | — |
| Chain rule | `ALEVEL G4` | `P1 1.7` (composite functions) | `SL 5.6` | **⚠**: 9709 has the chain rule in P1 (AS), England A level in A2 only |
| Product and quotient rules | `ALEVEL G4` | `P2 2.4`/`P3 3.4` | `SL 5.6` | — |
| Implicit and parametric differentiation | `ALEVEL G5` | `P2 2.4`/`P3 3.4` | `AHL 5.14` implicit | — |
| Limits via l'Hôpital's rule or Maclaurin | — | — | `AHL 5.13` | IB only |
| Maclaurin series | — | — | `AHL 5.19` | IB only |

### 7.2 Integration

| Skill | England | Cambridge | IB | Timing |
|---|---|---|---|---|
| Area under a graph (estimate; e.g. velocity–time) | `GCSE A15` (H) | `E2.9.4` distance as area under speed–time (E) | — | G9–10 |
| Integration as reverse of differentiation; ∫xⁿ; constant of integration | `ALEVEL H2` [AS] | `P1 1.8` incl. (ax + b)ⁿ | `SL 5.5` (integer n); `SL 5.10` (rational n) | — |
| Fundamental Theorem of Calculus; definite integrals | `ALEVEL H1`, `H3` [AS] | `P1 1.8` incl. simple improper integrals | `SL 5.5` (technology), `SL 5.11` (analytic) | — |
| Area under a curve; area between curves | `ALEVEL H3` [AS area under; A2 between curves] | `P1 1.8` | `SL 5.5`, `SL 5.11`; `AHL 5.17` w.r.t. y-axis | — |
| Volumes of revolution | — | `P1 1.8` | `AHL 5.17` | **⚠**: not in England A level Maths; 9709 puts it in P1 (AS) |
| Integration as the limit of a sum | `ALEVEL H4` | — | — | — |
| Integrate eᵏˣ, 1/x, sin, cos, sec² | `ALEVEL H2` | `P2 2.5`/`P3 3.5` | `SL 5.10` | — |
| Integration by substitution | `ALEVEL H5` | `P3 3.5` | `SL 5.10` (inspection / reverse chain rule); `AHL 5.16` | — |
| Integration by parts | `ALEVEL H5` | `P3 3.5` | `AHL 5.16` (incl. repeated) | — |
| Integration using partial fractions | `ALEVEL H6` | `P3 3.5` | `AHL 5.15` | — |
| Integration using trig identities | — | `P2 2.5`/`P3 3.5` | — | — |
| Integrand f′(x)/f(x) | — | `P3 3.5` | — | — |

### 7.3 Differential equations

| Skill | England | Cambridge | IB | Timing |
|---|---|---|---|---|
| Form a differential equation from a context | `ALEVEL G6` | `P3 3.8` | — | — |
| Separable first-order equations; particular solutions; interpret | `ALEVEL H7`, `H8` | `P3 3.8` | `AHL 5.18` | — |
| Euler's method; homogeneous (y = vx); integrating factor | — | — | `AHL 5.18` | IB only |

### 7.4 Kinematics with calculus

| Skill | England | Cambridge | IB | Timing |
|---|---|---|---|---|
| Displacement, velocity, acceleration via differentiation and integration | `ALEVEL Q4` [AS] | `M1 4.2` | `SL 5.9` | — |

### 7.5 Numerical methods

| Skill | England | Cambridge | IB | Timing |
|---|---|---|---|---|
| Iteration to solve equations | `GCSE A20` (H); `ALEVEL I2` (incl. cobweb/staircase) | `P2 2.6`/`P3 3.6` | — | — |
| Locate roots by change of sign | `ALEVEL I1` | `P2 2.6`/`P3 3.6` | — | — |
| Newton–Raphson | `ALEVEL I2` | — | — | England only |
| Trapezium rule | `ALEVEL I3` | `P2 2.5` | — | — |

---

## 8. Mechanics (grades 11–12; A level only)

Only England A level Mathematics ([ALEVEL] sections P–S) and Cambridge 9709 (`M1`) contain mechanics. CCSS has none, and IB AA has only the kinematics row above (`SL 5.9`).

| Skill | England | Cambridge |
|---|---|---|
| SI units; derived quantities (velocity, acceleration, force, weight, moment) | `ALEVEL P1` [AS except moment] | (assumed in `M1`) |
| Kinematics language; displacement–time and velocity–time graphs | `ALEVEL Q1`, `Q2` [AS] | `M1 4.2` |
| Constant acceleration formulae (suvat); in 2-D with vectors | `ALEVEL Q3` [AS 1-D] | `M1 4.2` |
| Projectiles | `ALEVEL Q5` | — |
| Forces, Newton's laws; connected particles; pulleys | `ALEVEL R1`–`R4` [AS] | `M1 4.1`, `M1 4.4` |
| Resolving forces; resultants; equilibrium | `ALEVEL R4`, `R5` | `M1 4.1` |
| Friction (F ≤ μR); inclined planes | `ALEVEL R6` | `M1 4.1`, `M1 4.4` |
| Moments | `ALEVEL S1` | — |
| Momentum and impulse (direct impact) | — | `M1 4.3` |
| Work, energy, power | — | `M1 4.5` |

---

## 9. Where the curricula disagree on timing (summary)

All placements are after age alignment (section 2.1). "Earlier" means in a lower grade.

| Skill | Earliest | Latest | Gap |
|---|---|---|---|
| Column (standard) algorithm for + and − | England Y3 = G2 | CCSS `4.NBT.4` = G4 | 2 grades |
| Times tables 2, 5, 10 recall | England Y2 = G1 | CCSS `3.OA.7` = G3 | 2 grades |
| Add/subtract fractions with same denominator | England Y3 = G2 | CCSS `4.NF.3` = G4 | 2 grades |
| Tenths / decimal notation | England Y3 (tenths) = G2, Y4 (decimals) = G3 | CCSS `4.NF.6` = G4 | 1–2 grades |
| Negative numbers | England Y4 = G3; Cambridge St5 = G4 | CCSS `6.NS.5` = G6 | 3 grades |
| Percentages | England Y5 = G4; Cambridge St5 = G4 | CCSS `6.RP.3c` = G6 | 2 grades |
| Ratio | Cambridge St5 = G4; England Y6 = G5 | CCSS `6.RP.1` = G6 | 1–2 grades |
| Square and cube numbers | England Y5 = G4 | CCSS `6.EE.1` = G6 | 2 grades |
| Coordinates, first quadrant | England Y4 = G3 | CCSS `5.G.1` = G5 | 2 grades |
| Parallel and perpendicular lines | England Y3 = G2 | CCSS `4.G.1` = G4 | 2 grades |
| Angle sum of triangle | England Y6 = G5 | CCSS `8.G.5` = G8 | 3 grades |
| Translations / reflections | England Y4–Y5 = G3–G4 | CCSS `8.G.1` = G8 | 4 grades |
| 24-hour clock | England Y3 = G2 | CCSS: never | — |
| Probability | Cambridge Primary St5 = G4 (2019 outline) | CCSS `7.SP.5` = G7; England KS3 = G6–8 | 3 grades |
| Box plots, IQR | CCSS `6.SP.4`, `6.SP.5c` = G6 | England GCSE (H) = G9–10; Cambridge only at `S1 5.1` = G11–12 (box plots); IGCSE `E9.3` = G9–10 (IQR) | 3–5 grades |
| Histograms | CCSS `6.SP.4` = G6 | England GCSE (H); IGCSE `E9.7` = G9–10 | 3–4 grades |
| Sampling and inference from a sample | CCSS `7.SP.1` = G7 | England GCSE `S1` = G9–10 | 2–3 grades |
| nth term of linear sequences | England KS3 = G6–8 | CCSS `F-BF.2` = HS | ~2 grades |
| Quadratic graphs | England KS3 = G6–8 | CCSS `F-IF.7a` = HS | ~2 grades |
| Right-triangle trigonometry | England KS3 = G6–8 | CCSS `G-SRT.6` = HS; Cambridge IGCSE `C6.2` = G9–10 | ~2 grades |
| Ruler-and-compass constructions | England KS3 = G6–8 | CCSS `G-CO.12` = HS | ~2 grades |
| Differentiation of polynomials | Cambridge IGCSE `E2.12` = G9–10 | England A level `G2`, IB `SL 5.3`, 9709 `P1 1.7` = G11–12; **CCSS never** | 2 grades |
| Logarithms | Cambridge 0607 `E3.7` = G9–10 | CCSS `F-LE.4` HS; England A level `F3`; IB `SL 1.5` = G11 | ~1–2 grades |
| Complex numbers | CCSS `N-CN.1` (common HS core) | England A level Mathematics: never; 9709 `P3` and IB AHL only | — |
| Chain rule | 9709 `P1 1.7` (AS = G11) | England A level `G4` (A2 = G12) | 1 grade |
| Volumes of revolution | 9709 `P1 1.8` (G11) | IB `AHL 5.17`; England A level Maths: never | — |

Topics that appear in **only one** of the systems read: Roman numerals, frequency trees, loci, plans and elevations, small-angle approximations and Newton–Raphson (England); line/dot plots, mean absolute deviation, matrices, conic sections, Cavalieri, survey/experiment design and margin of error (CCSS); stem-and-leaf, geometric and Poisson distributions, CLT and confidence intervals, Type I/II errors, momentum, work–energy (Cambridge); proof by induction, Bayes, vector/cross product and planes, Maclaurin, l'Hôpital, Euler's method and integrating factor (IB AA).

---

## 10. Gaps and unconfirmed items

1. **Cambridge Primary and Lower Secondary full objectives are not public.** The current (2020) frameworks are behind the school login ([CP-OUT]/[CLS-OUT]: "Only schools offering Cambridge Primary can access the full curriculum framework"). The only Cambridge Primary/LS objectives cited are the **examples** in the February 2019 outlines (Number strand, Stages 1, 3, 5, 7, 9). Those outlines also describe the **older** structure (five or six strands including Measure, Handling data and Problem solving), not the 2020 three-strand one that [CP-PAGE]/[CLS-PAGE] describe. So Stages 2, 4, 6 and 8 and every non-Number strand are **unconfirmed** for Cambridge. A third-party copy of the 2020 framework (a squarespace mirror) returned 404, and the Internet Archive was offline when tried.
2. **Cambridge Lower Secondary strand count**: [CLS-PAGE] says "three main areas called 'strands'" and lists "Number / Algebra, Geometry and Measure / Statistics and Probability". Whether Algebra is its own strand is still unconfirmed, as ticket #3 also found.
3. **IB MYP content is not itemised in any public source read.** [IB-MYP] gives only the four branches (Number; Algebra; Geometry and trigonometry; Statistics and probability), two challenge levels (standard and extended) and ages 11–16. The MYP guide's skills framework was not read. IB PYP was not read.
4. **IB DP Mathematics: applications and interpretation** was not read. Only analysis and approaches is cited. The new DP mathematics curriculum (first teaching from 2027, per ticket #3) was not read.
5. **England A level Further Mathematics** was not read. So complex numbers, matrices and proof by induction are "—" for England only in the sense of A level Mathematics.
6. **GCSE underlined content** (assessed for all, mastered by higher attainers) could not be extracted from the PDF text. Only bold (Higher) was marked.
7. **Ages for IGCSE, A level and IB DP are conventions** and are not stated in the documents read. The CCSS grade-to-age mapping (G1 = age 6–7) is likewise a convention, not a sourced fact.
8. **Cambridge IGCSE Core vs Extended at bullet level**: the Core sub-items were checked for Number, Algebra, Coordinate geometry, Geometry, Mensuration, Trigonometry, Transformations, Probability and Statistics in [IG0580], but notes columns (examples, exclusions) were not read in full. Some rows cite the Extended code where the Core version is narrower.
9. **CCSS high school course placement** (Algebra I / Geometry / Algebra II, the Appendix A pathways) was not read. HS standards are therefore given as "HS", not a grade.
10. **CCSS Kindergarten** was not inventoried (outside grades 1–12). England Year 1 and Cambridge Stage 1 items appear only to show where a skill starts.
11. **Cambodia MoEYS** was not cross-checked in this file. It is covered in `research/moeys-math-curriculum.md` (ticket #2) and is only a secondary reference for the map.
12. A "—" in a cell means "not found in the documents read". It does not mean the system never teaches the skill: schools often teach beyond the statutory or examined content.
