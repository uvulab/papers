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
