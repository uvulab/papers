# `Images/Adversarial Examples/Defenses`

This folder is intended to hold papers related to defending against adversarial examples.

---

## Papers

- Data Preprocessing

  - `Feature Squeezing.pdf`

    - Trains three models
      - One on clean images
      - Second on bit-depth reduced images
      - And third on blurred images
    - Then, if the predictions vary greatly between the three, classify as adversarial.

  - `Gaussian Data Augmentation.pdf`

    - Add Gaussian noise to incoming images to lessen targeted noise's effect

  - `JPEG Compression.pdf`

    - Use different levels of JPEG compressed images during training to remove adversarial perturbations

  - `Label Smoothing.pdf`

    - Replace hard labels `[0, 1, ..., 0]` with soft labels `[1/90, 0.9, ..., 1/90]` to prevent model from making super confident predictions (i.e. allow the network to be less sure about wrong answers)

  - `PixelDefend.pdf`

    - Uses PixelCNN to learn the training data distribution
      - Then feeds it new images to see if they're adversarial (hopefully not near the training distribution)
      - If it is, try to move it closer to the training distribution before classification

  - `Spatial Smoothing.pdf`

    - Local Smoothing
      - Used a median filter to remove noise
    - Non-local Smoothing
      - Used a non-local means filter to remove noise
    - These were used in combination with another "feature-squeezed" network and a clean one to detect if images are adversarial

  - `Thermometer Encoding.pdf`

    - Replace each pixel with new encoding that is non-differentiable, called a thermometer `0 = [0000000], 128 = [11110000], 255 = [11111111]`

  - `Total Variance Minimization.pdf`

    - I don't understand the math, but basically picks a subset of all the pixels to use to recreate the image and get rid of adversarial noise
    - [Hopefully this can explain better](https://en.wikipedia.org/wiki/Total_variation_denoising)

- Training

  - `Adversarial Training.pdf`

    - The first paper recommending using adversarial examples during training to increase model robustness to them

- Detection

  - `On Detecting Adversarial Perturbations.pdf`

    - Adds a subnetwork that branches off at a layer in the network and produces a probability of the input being adversarial
    - Trained on clean and adversarial images to learn the properties of the network under each scenario
    - Shows that it works regardless of what attack it was trained on and that it generalizes well across attacks
      - Struggles with mismatched epsilons when trained on FGSM
    - Similar to `SafetyNet.pdf`

  - `SafetyNet.pdf`

    - Adds an RBF-SVM to the final layers of a CNN to detect abnormal ReLU activations
    - Claims and shows it works well regardless of what attack it was trained on and that it generalized across attacks
    - Used SceneProof as dataset which determines if an image is a picture of a real scene or not
    - Similar to `On Detecting Adversarial Perturbations.pdf`

  - `Detecting Adversarial Samples from Artifacts.pdf`

    - The main defense relies on the idea that adversarial examples don't change the underlying label of the image
    - It's also been shown that if we traverse the data manifold then you can change the underlying label of the image
    - This means that adversarial examples have to lie somewhere out of the data manifold and should be detectable as such
    - Uses [kernel density estimates](https://en.wikipedia.org/wiki/Kernel_density_estimation) in the last hidden layer to see if samples lie on the same distribution as the training set
    - Also uses Bayesian NN uncertainty estimates, if uncertainty is too high then likely adversarial
      - Relies on dropout

  - `Adversarial and Clean Data Are Not Twins`

    - Trained a binary classifier to recognize clean and adversarial examples
    - The binary classifier worked really well for adversarial examples that were generated using the same attack and epsilon, but doesn't generalize to different families of attacks or changes in parameters such as FGSM's epsilon

  - `On the (Statistical) Detection of Adversarial Examples`

    - Tries to detect adversarial examples using two methods
    - The first is a statistical test that can measures the distance between the means of two distributions (clean and adversarial)
      - It requires _at least_ 50 adversarial examples to distinguish adversarial examples from clean ones
      - This isn't useful for real time detection but could be useful to indicate that a system is being attacked in general
      - It also can't distinguish which specific inputs are adversarial
    - The second is adding an additional class to models that is trained to assign all adversarial inputs to it
      - Works well on FGSM attacks of all epsilons (99%+), but starts to degrade (84%) on JSMA attacks, indicating that it might not work well on more sophisticated attacks

  - `Early Methods for Detecting Adversarial Images`

    - Workshop paper
    - Used PCA Whitening to show that adversarial images often have large coefficients on lower ranked principal components than clean images do

  - `MagNet - Two-Pronged Defense against Adversarial Examples`

    - Added two extra types of networks outside of the network being defended
    - The first is a set of one or more detectors that are also trained on only the training data (no adversarial examples) and attempt to learn the data manifold
      - Intended to help when adversarial examples are far from the data manifold but typical classifiers cannot reject classifying it
      - First is an autoencoder that tries to recreate the input image and the reconstruction error is used to approximate the distance to the manifold and determine if it's adversarial
      - Second is another network like the one being defended but they determine if there is a probability divergence between the classification of the image and its reconstructed counterpart
    - The second is a reformer that attempts to push "hard-to-detect" examples back towards the training manifold
      - Intended to help when clean and adversarial examples are close to the data manifold but the classifier doesn't generalize well outside of the data manifold
      - Implemented as an autoencoder that ideally outputs a clean image close to the data manifold (i.e. not change classification) and outputs a visually similar adversarial example that has also been moved towards the data manifold (i.e. change classification but not visuals)

  - `Towards Robust Detection of Adversarial Examples`

    - Replaced Cross Entropy Loss with Reverse Cross Entropy Loss during training to return high confidence on the true class and a uniform distribution on false classes
    - Use the kernel density metric for thresholding introduced in `Detecting Adversarial Samples from Artifacts`

  - `Detecting Adversarial Attacks on Neural Network Policies with Visual Foresight`

    - Looks at defending against adversarial examples in the context of Reinforcement Learning
    - Compare action distributions from the next frame and a predicted frame based on previous frames
    - If the action distributions are largely different then they consider it to be adversarial

  - `Robust Detection of Adversarial Attacks by Modeling the Intrinsic Properties of Deep Neural Networks`

    - After training they use a Gaussian Mixture Model to estimate the intrinsic hidden state distribution of clean examples from each class
    - Then they feed those to the [expectation-maximization](https://en.wikipedia.org/wiki/Expectation%E2%80%93maximization_algorithm) algorithm to produce a likelihood of a sample being within the class's hidden state distribution
    - If the likelihood is below a certain threshold, they reject the input

  - `A Simple Unified Framework for Detecting Out-of-Distribution Samples and Adversarial Attacks`

    - Use Mahalanobis distance to the closest class conditional distribution in place of a confidence score
    - Helps with detecting adversarial examples, out of distribution samples, and class incremental learning

- Robustness

  - `Robustness to Adversarial Examples Through an Ensemble of Specialists`

    - Workshop paper
    - Uses the confusion matrix of adversarial examples to determine what classes they always push images to
    - Train a specialist CNN on the class subsets from the confusion matrix that are affected most and then use them to predict the final class
