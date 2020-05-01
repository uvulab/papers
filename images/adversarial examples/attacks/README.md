# `Images/Adversarial Examples/Attacks`

This folder is intended to hold papers related to attacking with adversarial examples.

---

## Papers

- White-box

  - `Fast Gradient Sign Method.pdf`

    - The original gradient-based adversarial attack by Goodfellow
    - ![x_{adv} = x + \epsilon \text{sign}(\nabla_x J(\theta, x, y))](<https://render.githubusercontent.com/render/math?math=x_%7Badv%7D%20%3D%20x%20%2B%20%5Cepsilon%20%5Ctext%7Bsign%7D(%5Cnabla_x%20J(%5Ctheta%2C%20x%2C%20y))>)

  - `Adversarial Examples In The Physical World.pdf`

    - Basic Iterative Method
    - Suggested an extension to FGSM where we move in the direction of the gradients multiple times but in smaller steps and at the end we clip the image such that the final noise is no further ![\epsilon](https://render.githubusercontent.com/render/math?math=%5Cepsilon) than away
    - ![X_0^{adv}=X, X_{N+1}^{adv} = Clip_{X,\epsilon}[X_N^{adv} + \alpha \text{sign}(\nabla_X J(X_N^{adv}, y_{true}))]](<https://render.githubusercontent.com/render/math?math=X_0%5E%7Badv%7D%3DX%2C%20X_%7BN%2B1%7D%5E%7Badv%7D%20%3D%20Clip_%7BX%2C%5Cepsilon%7D%5BX_N%5E%7Badv%7D%20%2B%20%5Calpha%20%5Ctext%7Bsign%7D(%5Cnabla_X%20J(X_N%5E%7Badv%7D%2C%20y_%7Btrue%7D))%5D>)

  - `Towards Deep Learning Models Resistant to Adversarial Attacks.pdf`

    - Projected Gradient Descent
    - Extended the Basic Iterative Method further by:
      - projecting the sample back onto an ![\ell_p](https://render.githubusercontent.com/render/math?math=%5Cell_p) sphere around the image to ensure that the image is adversarial in the sense of humans still being able to understand it
      - trying multiple random initializations around the original image in an attempt to find the minimal necessary perturbation to reach adversariality

  - `Adversarial Patch.pdf`

    - Apply circular blank patches to the input images that have random locations, sizes, and rotations
    - Get the loss of the target label w.r.t. the input and mask the patch gradients out of each image (i.e. get the gradients only where each patch is)
    - Reverse the transformations on the gradients so that they're all the same size, location, and rotation
    - Average the patch gradients and use that as the patch that should now trick the classifier into thinking any image that has the patch applied is the target class

  * `Exploring the Landscape of Spatial Robustness.pdf`

    - In a white-box setting, it utilizes three possible methods of adversarial example creation using a handful of hyper-parameters related to rotations and translations
    - "First-Order Method" starts with random parameters and then changes them as we move towards the direction of the gradient of the loss w.r.t. the input
    - Grid Search discretizes the parameter space and examines every combination to find an adversarial example (they claim it's not too computationally expensive since they're optimizing in a small parameter space)
    - "Worst of _k_" randomly samples _k_ different choices of attack parameters to see which one increases the loss the most

  - `Universal Adversarial Perturbations.pdf`
    - Theoretically works with any attack
    - Go through all the images you want the adversarial perturbation to work for (typically a few images from multiple classes)
    - For each image, calculate the minimal perturbation needed to make that image classified as the target class
    - If that causes the image to become adversarial then update the universal perturbation by adding them
    - After a maximum number of iterations or when the perturbation changes the class of enough images then we are ideally left with "universal" perturbation that causes most images from the selected classes to be classified as the target class

- Black-box

  - `Practical Black-Box Attacks Against Machine Learning.pdf`

    - Query a target model enough to build a dataset off of its predictions using a "Jacobian-based heuristic" and then build a model using that dataset to approximate the target model's decision boundaries
    - Then use the substitute model to craft adversarial examples using an white-box attack desired which will then be misclassified by the target model since they share similar decision boundaries to the substitute model
    - More specifically:
      - Define an architecture, (claims it) doesn't matter what as long as it's adequate for the job (i.e. CNN)
      - Generate the substitute dataset by querying the model on every image
      - Perform an epoch of backprop
      - Augment the dataset with images that the model is "more sensitive" to using the Jacobian matrix from the substitute model
    - Claims that architecture isn't the limiting factor and doesn't matter as much as having access to the inputs and outputs of the model (images fed in and labels sent out)

  - `Simple Black-Box Adversarial Perturbations for Deep Networks.pdf`

    - Gradient-Free Black-Box Attacks
    - Defines two attacks that attempt to find "critical pixels" that are pixels that if perturbed can change the classification of the image completely
    - Defines two ways to generate adversarial images:
      - Randomly pick pixels in the image and maximally perturb them, then query the model and see if the classification has changed (Gradient-Free)
      - Search over a small space for critical pixels and expand the search in directions that we find more critical pixels until we find enough to turn the image adversarial (Advanced Local Search)

  - `Exploring the Landscape of Spatial Robustness.pdf`

    - In a black-box setting, it utilizes two possible methods of adversarial example creation using a handful of hyper-parameters related to rotations and translations
    - Grid Search discretizes the parameter space and examines every combination to find an adversarial example (they claim it's not too computationally expensive since they're optimizing in a small parameter space)
    - "Worst of _k_" randomly samples _k_ different choices of attack parameters to see which one increases the loss the most

  - `ZOO Zeroth Order Optimization Based Black-box Attacks to Deep Neural Networks without Training Substitute Models.pdf`

    - Estimates gradients using pixel-by-pixel finite differences (I don't completely understand how this works)
    - Then uses the estimated gradients for Carlini and Wagner's attack to generate adversarial examples

  - `Decision-Based Adversarial Attacks Reliable Attacks Against Black-Box Machine Learning Models.pdf`

    - Called "Boundary Attack"
    - Decision-Based
    - Starts with an adversarial example and slowly steps towards the original, keeping adversariality along the way
      - Uses random noise that's orthogonal to the adversarial sample as its first step (replaces current adversarial noise with new orthogonal noise as candidate image)
      - Reduces the ![L_{2}](https://render.githubusercontent.com/render/math?math=L_%7B2%7D) distance from the candidate image by multiplying the orthogonal noise by some ![\epsilon](https://render.githubusercontent.com/render/math?math=%5Cepsilon)

  - `Black-box Adversarial Attacks with Limited Queries and Information.pdf`

    - Estimate gradients by generating random noise using a Normal distribution and a specified ![\sigma](https://render.githubusercontent.com/render/math?math=%5Csigma)
    - The estimation of the gradients is given by ![\nabla E[F(\theta)] \approx \frac{1}{\sigma n} \sum_{i=1}^n \delta_i F(\theta + \sigma \delta_i)](<https://render.githubusercontent.com/render/math?math=%5Cnabla%20E%5BF(%5Ctheta)%5D%20%5Capprox%20%5Cfrac%7B1%7D%7B%5Csigma%20n%7D%20%5Csum_%7Bi%3D1%7D%5En%20%5Cdelta_i%20F(%5Ctheta%20%2B%20%5Csigma%20%5Cdelta_i)>)
    - Then performs Projected Gradient Descent with momentum using the estimated gradients

  - `HopSkipJumpAttack A Query-Efficient Decision-Based Attack.pdf`

    - Called "HopSkipJump"
    - Decision-Based
    - Starts with an adversarial example and slowly steps towards the original, keeping adversariality along the way
      - Copies the original image _x_ times and adds _x_ different randomly generated noise images ![\delta](https://render.githubusercontent.com/render/math?math=%5Cdelta) distance away from the original (![\delta](https://render.githubusercontent.com/render/math?math=%5Cdelta) is the same distance from the original as the current adversarial image is)
      - Then it uses the predictions on the original + the random noise to estimate the gradients as the direction to take
        - If the predicted and actual label match for a prediction (not adversarial) then go in the opposite direction of that noise (multiply by -1)
        - Otherwise it's adversarial so we want to go in the direction of the noise
        - Average all of them together and that's our candidate noise for this iteration
      - Then we use a geometric progression (multiply by ![2^n](https://render.githubusercontent.com/render/math?math=2%5En) until the image is no longer adversarial or _n_ is too large ~8) to see how far we can go in that direction
      - Then use a binary search on the noise to see how far we can move the image back towards the original while staying adversarial
        - The binary search is done on ![\epsilon](https://render.githubusercontent.com/render/math?math=%5Cepsilon), which we multiply our candidate noise by and add it to the original image
        - Once we do a few iterations of this to fine tune ![\epsilon](https://render.githubusercontent.com/render/math?math=%5Cepsilon), we're done
      - We then take the candidate noise + the original as our new adversarial image and start again until we hit a stopping condition
