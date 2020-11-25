# `Text/Adversarial Examples/Attacks`

This folder is intended to hold papers related to attacking with adversarial examples.

---

## Papers

- Targeted Attacks
  - `HotFlip.pdf`
    - White-box attack on character level classifiers (and adapted to word level classifiers)
    - Swaps tokens based on gradients
    - Implemented adversarial training
- Non-targeted Attacks

  - `DeepWordBug.pdf`
    - Black-box attack

- `TextBugger.pdf`

  - White-box
    - Use Jacobian to find words that are sensitive to change
  - Black-box
    - Find important sentences by holding out one at a time and pick the one that has the highest impact on the score
    - Do the same thing for words by holding out one at a time
  - Generate "bugs"
    - Insert spaces into words
    - Delete random character of words (not first or last)
    - Swap two random letters (not first or late)
    - Substitute characters that are visually similar or adjacent on keyboard
    - Substitute words using top k nearest neighbors in context-aware word vector space

- `TextFooler.pdf`

  - Black-box
    - Find important words by holding out one at a time
    - Filter out stop words
    - Find candidates using N closest synonyms using cosine similarity
    - Keep ones that match POS
    - After replacement, check sentence similarity using Universal Sentence Encoder

- `BAE.pdf`

  - Black-box
    - Find important words by holding out one at a time
    - `BAE-R`
      - Use BERT to predict top replacement words in order of importance
      - Filter them using Universal Sentence Encoder to find ones that most closely match original sentence
      - Filter tokens that don't match Part of Speech
    - `BAE-I`
      - Use BERT to predict top replacement words next to important words in order of importance
      - Filter them using Universal Sentence Encoder to find ones that most closely match original sentence
      - Filter tokens that don't match Part of Speech
    - `BAE-R/I`
      - Either replace token or insert to left or right of token
    - `BAE-R+I`
      - Replace token, then insert token to left or right
