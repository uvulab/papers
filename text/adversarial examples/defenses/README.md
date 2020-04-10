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

  - Uses a "Semi-Character RNN" (ScRNN) as an upstream word recognizer and corrector
    - Essentially treats first and last characters separately than the middle letters
  - Attempt to defend against swapping, dropping, close keys, and adding
    - Internal characters only and no stop words or small (<4 char) words
  - They found that there were two good ways to prevent attacks
    - The first is to use two upstream word recognizer models, one is the foreground model that's trained on a small, domain-specific corpus, and when it returns an unknown mapping to fallback on a background model trained on a much larger corpus
    - The second is to change any word that maps to the unknown token to a neutral word like `a`

- `Generating Natural Language Adversarial Examples.pdf`

  - Introduced an attack that uses a genetic algorithm to iterate on potential adversarial examples
  - Generated 1,000 adversarial examples and added them to the training set (that already had 25,000 clean examples in it...) to see if it helped defend against them and it did not
    - This likely didn't work at all because, assuming understood correctly, they added 1,000 adversarial examples to 25,000 clean ones, which is not enough to work if adversarial training CV papers are to be believed

- `HotFlip.pdf`

  - Introduced HotFlip attack which estimated gradients w.r.t. one-hot encodings to determine the best character flip(s) to make adversarial examples
    - Flipping, inserting, and deleting
    - Shown to work on word-level models as well by estimating gradients w.r.t. word vectors instead of character vectors
  - Performed adversarial training using HotFlip generated examples and lowered success rate by ~30%
    - Only used flip operation for adversarial training and evaluation of it
    - Insert and delete are too slow to generate
  - Makes comparison to CW attack where examples are too slow to generate for training but can break models trained on weaker attacks

- `Learning to Discriminate Perturbations for Blocking Adversarial Attacks in Text Classification.pdf`

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
    - Claim that adversarial training might be effective against TextBugger but it's limited in defending against unknown adversarial attacks

---

## Potential CV Defenses Applied to Text

- Data Preprocessing

  - `Feature Squeezing`

    - Train three models, one on clean images, one on bit-depth reduced images, and one on blurred images and then if the predictions vary greatly, classify as adversarial.
    - **Could apply to text data, but would need to figure out what types of features can be used in such an ensemble**

  - `Gaussian Data Augmentation`

    - Add Gaussian noise to incoming images to lessen targeted noise's effect
    - **Doesn't apply to text data**

  - `JPEG Compression`

    - Use different levels of JPEG compressed images during training to remove adversarial perturbations
    - **Doesn't apply to text data**

  - `Label Smoothing / Defensive Distillation`

    - Replace hard labels `[0, 1, ..., 0]` with soft labels `[1/90, 0.9, ..., 1/90]` to prevent model from making super confident predictions (i.e. allow the network to be less sure about wrong answers)
    - **Could apply to text data, but unlikely to work as text classification doesn't seem to have the overconfident prediction problem**

  - `PixelDefend`

    - Use PixelCNN to learn the training data distribution, feed it new images to see if they're adversarial (hopefully not near the training distribution), and then if it is, try to move it closer to the training distribution before classification
    - **Could apply to text data, but something very similar seems to have been done by `Learning to Discriminate Perturbations for Blocking Adversarial Attacks in Text Classification.pdf` and `Combating Adversarial Misspellings with Robust Word Recognition.pdf`**

  - `Spatial Smoothing`

    - Local Smoothing
      - Used a median filter to remove noise
    - Non-local Smoothing
      - Used a non-local means filter to remove noise
    - These were used in combination with another "feature-squeezed" network and a clean one to detect if images are adversarial
    - **Doesn't apply to text data**

  - `Thermometer Encoding`

    - Replace each pixel with new encoding that is non-differentiable, called a thermometer `0 = [0000000], 128 = [11110000], 255 = [11111111]`
    - **Doesn't apply to text data**

  - `Total Variance Minimization`

    - I don't understand the math, but basically picks a subset of all the pixels to use to recreate the image and get rid of adversarial noise
    - [Hopefully this can explain better](https://en.wikipedia.org/wiki/Total_variation_denoising)
    - **Doesn't apply to text data**

- Training

  - `Adversarial Training`

    - This has already been tried by multiple papers in the text domain.
    - Anyone who implemented a new attack in this domain tends to try to apply adversarial training with their attack and many find mixed success.
    - **Could apply to text data, but has been heavily considered already**

- Detection

  - `On Detecting Adversarial Perturbations`

    - Adds a subnetwork that branches off at a layer in the network and produces a probability of the input being adversarial
    - Trained on clean and adversarial images to learn the properties of the network under each scenario
    - Shows that it works regardless of what attack it was trained on and that it generalizes well across attacks
      - Struggles with mismatched epsilons when trained on FGSM
    - Similar to `SafetyNet`
    - **Could apply to text data**

  - `SafetyNet`

    - Adds an RBF-SVM to the final layers of a CNN to detect abnormal ReLU activations
    - Claims and shows it works well regardless of what attack it was trained on and that it generalized across attacks
    - Used SceneProof as dataset which determines if an image is a picture of a real scene or not
    - Similar to `On Detecting Adversarial Perturbations`
    - **Could apply to text data**

  - `Detecting Adversarial Samples from Artifacts`

    - The main defense relies on the idea that adversarial examples don't change the underlying label of the image
    - It's also been shown that if we traverse the data manifold then you can change the underlying label of the image
    - This means that adversarial examples have to lie somewhere out of the data manifold and should be detectable as such
    - Uses [kernel density estimates](https://en.wikipedia.org/wiki/Kernel_density_estimation) in the last hidden layer to see if samples lie on the same distribution as the training set
    - Also uses Bayesian NN uncertainty estimates, if uncertainty is too high then likely adversarial
      - Relies on dropout
    - **Could apply to text data, but unlikely to be useful since most text classification networks don't use dropout**

  - `Adversarial and Clean Data Are Not Twins`

    - Trained a binary classifier to recognize clean and adversarial examples
    - The binary classifier worked really well for adversarial examples that were generated using the same attack and epsilon, but doesn't generalize to different families of attacks or changes in parameters such as FGSM's epsilon
    - **Could apply to text data, but is likely to be susceptible to the same sensitivity to attacks and their parameters as this one is**

  - `On the (Statistical) Detection of Adversarial Examples`

    - Tries to detect adversarial examples using two methods
    - The first is a statistical test that can measures the distance between the means of two distributions (clean and adversarial)
      - It requires _at least_ 50 adversarial examples to distinguish adversarial examples from clean ones
      - This isn't useful for real time detection but could be useful to indicate that a system is being attacked in general
      - It also can't distinguish which specific inputs are adversarial
    - The second is adding an additional class to models that is trained to assign all adversarial inputs to it
      - Works well on FGSM attacks of all epsilons (99%+), but starts to degrade (84%) on JSMA attacks, indicating that it might not work well on more sophisticated attacks
    - **Could apply to text data, but I'm not sure how different this is from something like an** `<unk>` **token**

  - `Early Methods for Detecting Adversarial Images`

    - Workshop paper
    - Used PCA Whitening to show that adversarial images often have large coefficients on lower ranked principal components than clean images do
    - **I'm not sure if this could apply to text data**

  - `MagNet - Two-Pronged Defense against Adversarial Examples`

    - Added two extra types of networks outside of the network being defended
    - The first is a set of one or more detectors that are also trained on only the training data (no adversarial examples) and attempt to learn the data manifold
      - Intended to help when adversarial examples are far from the data manifold but typical classifiers cannot reject classifying it
      - First is an autoencoder that tries to recreate the input image and the reconstruction error is used to approximate the distance to the manifold and determine if it's adversarial
      - Second is another network like the one being defended but they determine if there is a probability divergence between the classification of the image and its reconstructed counterpart
    - The second is a reformer that attempts to push "hard-to-detect" examples back towards the training manifold
      - Intended to help when clean and adversarial examples are close to the data manifold but the classifier doesn't generalize well outside of the data manifold
      - Implemented as an autoencoder that ideally outputs a clean image close to the data manifold (i.e. not change classification) and outputs a visually similar adversarial example that has also been moved towards the data manifold (i.e. change classification but not visuals)
    - **Could apply to text data**

  - `Towards Robust Detection of Adversarial Examples`

    - Replaced Cross Entropy Loss with Reverse Cross Entropy Loss during training to return high confidence on the true class and a uniform distribution on false classes
    - Use the kernel density metric for thresholding introduced in `Detecting Adversarial Samples from Artifacts`
    - **Could apply to text data**

  - `Detecting Adversarial Attacks on Neural Network Policies with Visual Foresight`

    - Looks at defending against adversarial examples in the context of Reinforcement Learning
    - Compare action distributions from the next frame and a predicted frame based on previous frames
    - If the action distributions are largely different then they consider it to be adversarial
    - **I'm not sure if this could apply to text data**

  - `Robust Detection of Adversarial Attacks by Modeling the Intrinsic Properties of Deep Neural Networks`

    - After training they use a Gaussian Mixture Model to estimate the intrinsic hidden state distribution of clean examples from each class
    - Then they feed those to the [expectation-maximization](https://en.wikipedia.org/wiki/Expectation%E2%80%93maximization_algorithm) algorithm to produce a likelihood of a sample being within the class's hidden state distribution
    - If the likelihood is below a certain threshold, they reject the input
    - **Could apply to text data since it only looks at the hidden states**

  - `A Simple Unified Framework for Detecting Out-of-Distribution Samples and Adversarial Attacks`

    - Use Mahalanobis distance to the closest class conditional distribution in place of a confidence score
    - Helps with detecting adversarial examples, out of distribution samples, and class incremental learning
    - **I'm not sure if this could apply to text data**

- Robustness

  - `Robustness to Adversarial Examples Through an Ensemble of Specialists`

    - Workshop paper
    - Uses the confusion matrix of adversarial examples to determine what classes they always push images to
    - Train a specialist CNN on the class subsets from the confusion matrix that are affected most and then use them to predict the final class
    - **Doesn't apply to text data**
