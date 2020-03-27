# `Text/Adversarial Examples/Defenses`

This folder is intended to hold papers related to defending against adversarial examples.

---

## Papers

- `Adversarial Training Methods For Semi-Supervised Text Classification.pdf`

  - Introduced Adversarial Training to text classification field
  - Wasn't used to defend against adversaries, but rather used to improve regularization and increase word embedding quality
  - Performed perturbations on word embeddings instead of discrete inputs since inputs are usually a series of high-dimensional one-hot vectors and cannot be perturbed in such a minimal way
  - Because they perturbed the embedding layer and not the inputs, it isn't intended to defend against an adversary since an adversary would never have access to the embedding layer, even in a white-box setting

- `Black-box Generation of Adversarial Text Sequences to Evade Deep Learning Classifiers.pdf`

  - Introduced DeepWordBug attack and used it in adversarial training to resist the attack
  - Accuracy on adversarial examples was 11.9%, adversarial training brought it back up to 62.7% while only lowering clean accuracy by 1.5%
  - Autocorrector (spell check) worked pretty well at defending against most of their one-character attacks but failed had a harder time with two-character attacks, especially deleting two characters
  - They claim autocorrect has its flaws in practice so while it might be able to somewhat defend, it isn't practical due to lack of batch processing and being exploitable as well

- `Combating Adversarial Misspellings with Robust Word Recognition.pdf`

  - I like the connection made to real-world problems of adversarial text, mainly spam
  - Uses a "Semi-Character RNN" (ScRNN) as an upstream word recognizer and corrector
    - Essentially treats first and last characters separately than the middle letters
  - Attempt to defend against swapping, dropping, close keys, and adding
    - Internal characters only and no stop words or small (<4 char) words
  - They found that there were two good ways to prevent attacks
    - The first is to use two upstream word recognizer models, one is the foreground model that's trained on a small, domain-specific corpus, and when it returns an unknown mapping to fallback on a background model trained on a much larger corpus
    - The second is to change any word that maps to the unknown token to a neutral word like `a`

* `Generating Natural Language Adversarial Examples.pdf`

  - Introduced an attack that uses a genetic algorithm to iterate on potential adversarial examples
  - Generated 1,000 adversarial examples and added them to the training set (that already had 25,000 clean examples in it...) to see if it helped defend against them and it did not
    - This likely didn't work at all because, assuming understood correctly, they added 1,000 adversarial examples to 25,000 clean ones, which is not enough to work if adversarial training CV papers are to be believed

* `HotFlip.pdf`

  - Introduced HotFlip attack which estimated gradients w.r.t. one-hot encodings to determine the best character flip(s) to make adversarial examples
    - Flipping, inserting, and deleting
    - Shown to work on word-level models as well by estimating gradients w.r.t. word vectors instead of character vectors
  - Performed adversarial training using HotFlip generated examples and lowered success rate by ~30%
    - Only used flip operation for adversarial training and evaluation of it
    - Insert and delete are too slow to generate
  - Makes comparison to CW attack where examples are too slow to generate for training but can break models trained on weaker attacks

* `Learning to Discriminate Perturbations for Blocking Adversarial Attacks in Text Classification.pdf`

  - Introduced DISP (discriminate perturbations) to try to block character and word-level attacks
    - Step 1: Perturbation discriminator tries to predict if each token is adversarial or not
    - Step 2: If perturbed, they try to replace the perturbed word with a word that has similar meanings to the original word based on context tokens for the downstream model to predict
  - Character level attacks include insertion, deletion, and swapping
  - Word level attacks include randomly replacing a word and replacing a word with another within the top-10 nearest words in the embedding space
  - Finds that DISP + spell check works the best on most cases
    - Improvements of up to ~25% on character-level attacks and ~20% on word-level attacks over the baseline

- `Ranking Robustness Under Adversarial Document Manipulation.pdf`

  - Model Enhancement (?)
  - I'm not really sure what to make of this paper

- `TextBugger.pdf`

  - Introduced TextBugger attack that operates under white-box and black-box modes
    - White-box mode uses the gradients w.r.t. input to find important words
    - Black-box mode tries to assign scores to sentences to find the most important ones then does something similar to words in those sentences to find the important words
    - Once the important words are found, they perform insertions, deletions, swapping, character substitutions, and word substitutions
  - Use spell-check to defend in black-box setting
    - This works extremely well against their attack and DeepWordBug
    - Regardless of model tested against, neither black-box attack worked more than 43% of the time
    - Only word substitutions aren't easily corrected by spell-check which is why they think theirs worked better than DeepWordBug
  - Use adversarial training to defend in white-box setting
    - Maximum of 28% attack success rate when involving adversarial training
    - Claim that adversarial training might be effective against TextBugger but its limited in defending against unknown adversarial attacks
