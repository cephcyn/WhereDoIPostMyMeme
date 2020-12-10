# WhereDoIPostMyMeme

Dependencies:
* Pandas
* (TODO create an environment.yml for this project)

Motivation:

*I have a fire meme, and don’t know where to post it--whatever shall I do?*

Instead of reading subreddit rules like a normal person, we will use ML like a mid-level business executive! We will use FAIR’s open source multimodal library, Pythia/MMF (https://mmf.sh/), and will try out a variety of model architectures and see what yields the best performance. 

We will scrape Reddit meme subreddits for post data, including:  subreddit name, upvote/downvote count, images, meme text via OCR (or human OCR), and post titles. We can construct a train and test set and evaluate results using a precision/accuracy measure for subreddit name predictions.
