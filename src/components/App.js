import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import 'react-aspect-ratio/aspect-ratio.css'
import AspectRatio from 'react-aspect-ratio';
import Carousel from 'react-material-ui-carousel'
import Image from 'material-ui-image'

import "fontsource-roboto"
import motivationalLeo1 from './../img/motivational-leo-v1.png'
import motivationalLeo2 from './../img/motivational-leo-v2.png'
import modelchart from './../img/model_chart.png'
import statsImage from './../img/stats-image.png'
import statsLanguage from './../img/stats-language.png'
import exampleAwwnime from './../img/example-awwnime.png'
import exampleTumblr from './../img/example-tumblr.png'
import exampleDogelore from './../img/example-dogelore.png'

import ModelDemo from './ModelDemo'

const useStyles = makeStyles((theme) => ({
  root: {
    align: 'center',
  },
  panel: {
    padding: '15px 30px',
    marginTop: '20px',
    marginBottom: '20px',
  },
  examplecard: {
    padding: '10px 30px',
    position: 'relative',
    left: '50%',
    transform: 'translate(-50%, 0)',
    maxWidth: '80%',
  },
  memetitletext: {
    fontFamily: 'Comic Sans MS, Comic Sans, Comic Neue, cursive',
  },
  detailtext: {
    padding: '10px 30px',
    marginTop: '15px',
    marginBottom: '15px',
  },
  shinybutton: {
    background: 'linear-gradient(45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)',
    backgroundSize: '400% 400%',
    animation: '$gradient 15s ease infinite',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .5)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
  shinypanel: {
    background: 'linear-gradient(45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)',
    backgroundSize: '400% 400%',
    animation: '$gradient 15s ease infinite',
  },
  '@keyframes gradient': {
  	'0%': {
  		'background-position': '0% 50%',
  	},
  	'50%': {
  		'background-position': '100% 50%',
  	},
  	'100%': {
  		'background-position': '0% 50%',
  	},
  }
}));

export default function App() {
  const classes = useStyles();

  const [imgLeo, setImgLeo] = useState(motivationalLeo1)
  const toggleLeo = (event) => {
    if (imgLeo===motivationalLeo1) {
      setImgLeo(motivationalLeo2);
    } else {
      setImgLeo(motivationalLeo1);
    }
  };

  return (
    <Container className={classes.root}>
      <CssBaseline />
      <Paper className={`${classes.panel} ${classes.shinypanel}`} style={{ textAlign:'center' }}>
        <Typography variant="h1" className={classes.memetitletext}>
          MemeNet
        </Typography>
        <Typography variant="h4" className={classes.memetitletext}>
          Multimodal Models Make Meme Market Manageable
        </Typography>
      </Paper>
      <Paper className={classes.panel}>
        <Typography>
          Artificial Intelligence (A.I.) has been applied in areas such as
          economics and algorithmic trading to great effect. In recent decades,
          the rise of viral Internet culture has led to the development of a new
          global economy: the online "meme economy". Drawing from scarce resources
          (such as creativity, humor, and time), individual producers (meme
          makers) offer their goods (memes in the form of multimodal ideas) over a
          centralized marketplace (Internet forums such as subreddits on Reddit)
          in exchange for currency (Internet points such as Upvotes or Likes).
          Oftentimes, knowing <em>where</em> to post a meme can greatly affect how
          well it is received by the Internet community. Posting in a highly apt
          channel can lead to instant Internet fame, while posting in a suboptimal
          channel can lead to one's creative work failing to gain attention, or
          worse, being stolen and reposted by meme thieves. Additionally, posting
          the same content in several different channels can be considered
          &quot;spamming&quot; and is negatively regarded. To make this decision easier for
          the millions of meme creators on the Internet, <strong>we developed a
          multimodal neural network to predict the single best subreddit that a
          given meme should be posted to for maximum profit</strong>.
        </Typography>
      </Paper>
      <Paper className={classes.detailtext}>
        <Typography variant="h4" style={{ textAlign:'center' }} gutterBottom>
          Abstract
        </Typography>
        <Typography>
          Deep neural networks are excellent at learning from data that consists
          of single modalities. For example, convolutional neural networks are
          highly performant on image classification, and sequence models are the
          state-of-the-art for text generation. However, media such as Internet
          memes often consist of multiple modalities. A meme may have an image
          component and a text component, each of which contribute information
          about what the meme is trying to convey. To extract features from
          multimodal data, we leverage multimodal deep learning, in which we use
          multiple feature extractor networks to learn the separate modes
          individually, and an aggregator network to combine the features to
          produce the final output classification. We scrape Reddit meme
          subreddits for post data, including: subreddit name, upvote/downvote
          count, images, meme text via OCR (or human OCR), and post titles. We
          construct a train and test set and evaluate results using a
          precision/accuracy measure for subreddit name predictions. To optimize
          our model, we use FAIR’s open source multimodal library, Pythia/MMF
          (<a href="https://mmf.sh/" rel="nofollow">https://mmf.sh/</a>), and try
          a variety of model architectures and hyperparameters. Finally, we include
          our best model for demonstration purposes.
        </Typography>
      </Paper>
      <Paper className={classes.panel} style={{ textAlign:'center' }}>
        <AspectRatio ratio="16 / 9" style={{ maxWidth: '60%', left: '50%', transform: 'translate(-50%, 0)' }}>
          <iframe
            src="https://www.youtube-nocookie.com/embed/LpU8CUmxcI8"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen>
          </iframe>
        </AspectRatio>
      </Paper>
      <Paper className={classes.panel}>
        <Typography variant="h4" style={{ textAlign:'center' }} gutterBottom>
          Examples
        </Typography>
        <Container>
          <Carousel
            autoPlay={false}
            animation={"slide"}
            indicators={true}
            timeout={500}
            navButtonsAlwaysVisible={true}
            navButtonsAlwaysInvisible={false}
          >
            {
              [
                <Paper className={classes.examplecard}>
                  <Container style={{ textAlign:'center', width:'50%' }}>
                    <Image
                      src={exampleAwwnime}
                      alt="Results for language models"
                      aspectRatio={5/3}
                    />
                  </Container>
                </Paper>,
                <Paper className={classes.examplecard}>
                  <Container style={{ textAlign:'center', width:'50%' }}>
                    <Image
                      src={exampleTumblr}
                      alt="Results for language models"
                      aspectRatio={5/3}
                    />
                  </Container>
                </Paper>,
                <Paper className={classes.examplecard}>
                  <Container style={{ textAlign:'center', width:'50%' }}>
                    <Image
                      src={exampleDogelore}
                      alt="Results for language models"
                      aspectRatio={5/3}
                    />
                  </Container>
                </Paper>
              ]
            }
          </Carousel>
        </Container>
      </Paper>
      <Paper className={`${classes.panel} ${classes.shinypanel}`}>
        <Typography variant="h4" style={{ textAlign:'center' }} gutterBottom>
          Try It Yourself!
        </Typography>
        {/* The built-in demo is not currently working, so I'm just linking to public Colab file. */}
        {
        // <Paper style={{ background: '#EBEBEB' }}>
        //   <Container>
        //     <ModelDemo />
        //   </Container>
        // </Paper>
        }
        <Container style={{ textAlign:'center' }}>
          <Button className={classes.shinybutton} href="https://colab.research.google.com/drive/1139WDXzKaWsXPr2rUKzH5Vt8C8ZnFA9k">Check it out on Google Colab</Button>
        </Container>
      </Paper>
      <Paper className={classes.panel}>
        <Typography variant="h4" style={{ textAlign:'center' }} gutterBottom>
          Behind The Scenes
        </Typography>
        <Paper className={classes.detailtext}>
          <Typography variant="h5" style={{ textAlign:'center' }} gutterBottom>
            Related Work
          </Typography>
          <Typography gutterBottom>
            Our project was inspired by Facebook AI’s “Hateful Memes Challenge” in which participants developed novel model architectures to detect harmful multimodal content. The Facebook meme dataset consists of ~10,000 multimodal examples. Based on our personal understanding of the Internet meme culture, we decided that a larger dataset needed to be collected in order to reasonably represent the various subcultures on the Internet. Accordingly, we scraped meme data from Reddit, a popular hub for sharing meme content, which totals 70,000+ examples. Additionally, instead of a binary classification problem, we defined a multi-class classification problem in which our model has to output the most apt Reddit subreddit that a given meme fits. The rationale behind this decision was that different communities on the Internet operate by different de facto rules and guidelines. It is difficult to prescribe a blanket hateful/un-hateful categorization for all memes shared on the Internet. From a human perspective, a meme is usually considered within a given context. For example, particularly dark or edgy jokes may be perfectly acceptable in a community such as r/dankmemes but unacceptable according to Facebook’s platform guidelines. Hence, our work on multimodal multi-class classification could serve as a first step into exploring the effect that the style of multimodal content has on whether or not it is considered hateful. Furthermore, our model can be used by meme creators in deciding where to best post their meme. Optimizing this portion of the meme economy could be highly impactful in facilitating a less hateful Internet community, because by determining the most appropriate channels for memes, creators can avoid posting their work to places where it would be negatively received.
          </Typography>
        </Paper>
        <Paper className={classes.detailtext}>
          <Typography variant="h5" style={{ textAlign:'center' }} gutterBottom>
            Methodology
          </Typography>
          <Typography gutterBottom>
            The final goal of this project was to build a multimodal model to predict which subreddit a meme was posted in, using both the image and title text components. First, we scraped around 80,000 posts worth of meme data from Reddit (including important metadata such as post title, number of upvotes, etc) and labeled each meme with the subreddit it was sourced from. We included 19 different subreddits, which represents a good variety of multimodal content that people enjoy sharing on the Internet. Importantly, while some subreddits are stylistically very distinct from each other yet feature similar post title conventions (dankmemes vs. tumblr), others are more difficult to distinguish from each other just by looking at the image, even for humans (meirl vs. 2meirl4meirl). Hence, if our model is able to achieve high predictive performance, we can be certain to a large extent that our methodology is appropriately enabling the model to extract information from both text and image modalities.
          </Typography>
          <Typography gutterBottom>
            Next, we created some baseline models that classify a meme based on text only, as well as models based on image only. The results of these models were compared to a model that classified based on both image and text, with the expectation that the multimodal model should perform better because it has more information it can use to predict. Additionally, we utilized transfer learning by incorporating BERT into the language portion of our architecture, and using a network pre-trained on ImageNet for the image portion of our architecture. This decision allowed us to leverage well-engineered basic features and focus our development efforts on learning features that are more unique to memes.
          </Typography>
        </Paper>
        <Paper className={classes.detailtext}>
          <Typography variant="h5" style={{ textAlign:'center' }} gutterBottom>
            Experiments & Results
          </Typography>
          <Typography variant="h6" style={{ textAlign:'center' }} gutterBottom>
            Human Branch (Humans)
          </Typography>
          <Typography gutterBottom>
            Before building any models, we established human-level performance by having our team of five label 91 randomly sampled memes from our dataset and calculating our combined accuracy.
          </Typography>
          <Typography variant="h6" style={{ textAlign:'center' }} gutterBottom>
            Language Branch (BERT)
          </Typography>
          <Typography gutterBottom>
            The next experiment we performed was with the baseline language model. This model used word level representations of the title, instead of character level representations because we thought that key words in the title would be important for predicting what subreddit a meme would be posted in. For this approach, we scanned the 7000 titles of the posts, and for each word that appeared more than 30 times, it was assigned a number. There were 2420 words which were considered part of our vocab in the post titles, so each title was converted to a 1 by 2420 vector, where the index “i” in the vector was set to 1 if the word assigned the number “i” appeared in the title. This vector was used as an input to a linear network, with the first layer having 2420 input neurons and 512 output neurons, while the second layer had 512 input neurons and 20 output neurons because there were 20 output classes to predict. The activation functions used were leaky relu, and the network was trained for 40 epochs with a learning rate of 0.01. Using a subset of the data with 8000 train samples and 2000 test samples, which only had 16 classes (the second linear layer was changed to have 16 output neurons), the model was able to get 51% accuracy on the test set. When using the full dataset with around 70000 examples total, and 20 output classes, the model reached around 33% accuracy after training for 40 epochs, and the accuracy did not appear to increase with further training.
          </Typography>
          <Typography gutterBottom>
            Because the full data set of 70,000 post titles (50,000 train) likely doesn’t capture enough language to generalize well, we then decided to try a pretrained model, namely BERT. This was done via the pretrained BERT library in PyTorch. Using the built-in tokenizer in the package, we separated each post title to 20 words (either truncating if there were more or padding with “[PAD]”) then used this as input into the model, which output a 1x20x768 tensor for 1 sample. Besides this we chose not to do any other significant preprocessing to the post titles that would normally be done in other language models, like lemmatizing or removing special characters as the post titles may rely on these features for meaning (eg emojis and utf-8 characters for Subs like r/surrealmemes). We then fed this output into a few fully-connected layers with ReLU activation before the prediction layer. However, due to computational limitations we added a convolutional layer after the output of BERT to downsize the number of weights needed in the fully-connected layers. Splitting the full data set into 80% train and 20% validation, after training for 4 epochs the accuracy was hovering around 0.62869 on the validation set (9028/14360).
          </Typography>
          <Container style={{ textAlign:'center', width:'50%' }}>
            <Image
              src={statsLanguage}
              alt="Results for language models"
              aspectRatio={8/3}
            />
          </Container>
          <Typography variant="h6" style={{ textAlign:'center' }} gutterBottom>
            Image Branch (VGG-11)
          </Typography>
          <Typography gutterBottom>
            The second experiment we performed focused on the baseline image model. Instead of initializing a convolutional neural network with random weights, we experimented with a variety of pretrained architectures that are well known for their high predictive performance (results shown in Figure 2 below). This design decision made it much easier to load in the dataset, since many of our examples are very large (on the order of 100M pixels) and transfer learning requires less data. However, we still sample from the full dataset. Specifically, the data was split into a training set and a validation set, with 200 examples in the training set for each category, and 100 examples in the validation set for each category. We chose to fine-tune the convnet on the meme data instead of freezing the pretrained weights as a fixed feature extractor. This decision was supported by our exploratory experimentation in which we found that a pretrained ResNet-18 model, when fine-tuned on meme images, achieved 0.015 higher accuracy when compared to when the weights were frozen. This finding makes sense because meme formats are typically not represented in the ImageNet dataset, so some domain shift is necessary. Also informed by our exploratory experimentation, we apply data augmentation in the form of random crops and horizontal flips. The most impactful hyperparameters we found were learning rate and momentum, which we set to 0.001 and 0.9, respectively. Finally, to aid convergence, we decay the learning rate by a factor of 0.1 every 7 epochs. The results of this experiment guided how we developed the image component of our final model, detailed below.
          </Typography>
          <Container style={{ textAlign:'center', width:'50%' }}>
            <Image
              src={statsImage}
              alt="Results for image models"
              aspectRatio={7/3}
            />
          </Container>
          <Typography variant="h6" style={{ textAlign:'center' }} gutterBottom>
            Multimodal Branch
          </Typography>
          <Container style={{ textAlign:'center', width:'50%' }}>
            <Image
              src={modelchart}
              alt="Model structure"
            />
          </Container>
          <Typography gutterBottom>
            Our final round of experimentation focused on a combined multimodal model. We’ve included a figure of this model’s architecture above. Our model has two modalities: a text modality that takes in a post’s string title, and an image modality that takes in the meme you want to post, formatted as an RGB 3x256x256 tensor. The model has two branches, one for each modality, and obtains derived representations of each modality that it then combines into a single tensor. For the text modality, we simply run the title through a pretrained BERT model. We cap title length at 20 words, and truncate titles longer and pad sentences that are shorter. For the image modality, we had a six layer convolutional network with ReLU activation layers between the convolutional layers, batch norm layers every second layer, dropout layers after the fourth and sixth convolutional layers, and a maxpooling layer after the sixth convolutional layer. After obtaining the outputs of each branch, i.e. the output of the BERT model and the output of the CNN, we fused both modalities together by flattening the outputs and concatenating them, which the text modality’s output coming before the image modality’s output. Then, our model finished with a five layer linearly connected network that outputs a 1 dimensional 19 element tensor where the index of the largest element in the tensor corresponds to a subreddit, which the model predicts the meme and title to be posted in. We ran this multimodal model for 10 epochs over the training data, and achieved a final test accuracy of 91.8%.
          </Typography>
          <Typography gutterBottom>
            Our final round of experimentation focused on a combined multimodal model. We’ve included a figure of this model’s architecture above. Our model has two modalities: a text modality that takes in a post’s string title, and an image modality that takes in the meme you want to post, formatted as an RGB 3x256x256 tensor. The model has two branches, one for each modality, and obtains derived representations of each modality that it then combines into a single tensor. For the text modality, we simply run the title through a pretrained BERT model. We cap title length at 20 words, and truncate titles longer and pad sentences that are shorter. For the image modality, we had a six layer convolutional network with ReLU activation layers between the convolutional layers, batch norm layers every second layer, dropout layers after the fourth and sixth convolutional layers, and a maxpooling layer after the sixth convolutional layer. After obtaining the outputs of each branch, i.e. the output of the BERT model and the output of the CNN, we fused both modalities together by flattening the outputs and concatenating them, which the text modality’s output coming before the image modality’s output. Then, our model finished with a five layer linearly connected network that outputs a 1 dimensional 19 element tensor where the index of the largest element in the tensor corresponds to a subreddit, which the model predicts the meme and title to be posted in. We ran this multimodal model for 10 epochs over the training data, and achieved a final test accuracy of 91.8%.
          </Typography>
          <Typography gutterBottom>
            Overall, our model did quite well. The multimodal modal model far outstripped the best text only and image only models, which had performances 63.8% and 68.1% respectively. One thing we observed was that for predicting some subs, the image tended to be a pretty big clue, like greentext or deepfriedmemes, while for others, the title was the big giveaway, like me_irl. The multimodal models were able to leverage both modalities, while the unimodal models couldn’t. Additionally, there are other more general subs where it was difficult to tell which sub they belonged to based on the meme or the title alone, like dankmemes. For these subs, the multimodal model was able to detect complex patterns and associations between the title and the image that we humans could not. In fact, humans did worse than all the models, with an accuracy of 62.6%. Humans especially struggled on the more general subreddits, where they were often able to narrow it down to 2 or 3 candidate subreddits, but could not correctly figure out which one of them was the correct subreddit.
          </Typography>
        </Paper>
      </Paper>
      <Paper className={`${classes.panel} ${classes.shinypanel}`}>
        <Container style={{ width:"40%" }}>
          <Image
            src={imgLeo}
            alt="Leo DiCaprio numpy meme (credits: Will Chen)"
            color="transparent"
            onClick={toggleLeo}
            style={{ height:"100px" }}
          />
        </Container>
      </Paper>
    </Container>
  );
}
