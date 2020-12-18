# MemeNet: multimodal models make meme market manageable

View the demo page here! https://cephcyn.github.io/WhereDoIPostMyMeme

## Problem Statement
Artificial Intelligence (A.I.) has been applied in areas such as economics and algorithmic trading to great effect. In recent decades, the rise of viral Internet culture has led to the development of a new global economy: the online "meme economy". Drawing from scarce resources (such as creativity, humor, and time), individual producers (meme makers) offer their goods (memes in the form of multimodal ideas) over a centralized marketplace (Internet forums such as subreddits on Reddit) in exchange for currency (Internet points such as Upvotes or Likes). Oftentimes, knowing *where* to post a meme can greatly affect how well it is received by the Internet community. Posting in a highly apt channel can lead to instant Internet fame, while posting in a suboptimal channel can lead to one's creative work failing to gain attention, or worse, being stolen and reposted by meme thieves. Additionally, posting the same content in several different channels can be considered "spamming" and is negatively regarded. To make this decision easier for the millions of meme creators on the Internet, **we developed a multimodal neural network to predict the single best subreddit that a given meme should be posted to for maximum profit**.

## Abstract
Deep neural networks are excellent at learning from data that consists of single modalities. For example, convolutional neural networks are highly performant on image classification, and sequence models are the state-of-the-art for text generation. However, media such as Internet memes often consist of multiple modalities. A meme may have an image component and a text component, each of which contribute information about what the meme is trying to convey. To extract features from multimodal data, we leverage multimodal deep learning, in which we use multiple feature extractor networks to learn the separate modes individually, and an aggregator network to combine the features to produce the final output classification. We scrape Reddit meme subreddits for post data, including: subreddit name, upvote/downvote count, images, meme text via OCR (or human OCR), and post titles. We construct a train and test set and evaluate results using a precision/accuracy measure for subreddit name predictions. To optimize our model, we use FAIR’s open source multimodal library, Pythia/MMF (https://mmf.sh/), and try a variety of model architectures and hyperparameters. Finally, we include our best model for demonstration purposes.

## Video
[TODO]

## Demo
[TODO]

## Related Work
[TODO]

## Methodology
[TODO]

## Experiments & Evaluation
[TODO]

## Results
[TODO]

## Examples
[TODO]
