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
            src="https://www.youtube-nocookie.com/embed/bZe5J8SVCYQ"
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
                  <img
                    style={{ width:'500px', 'height':'300px' }}
                    src="../img/example-awwnime.png"
                  />
                </Paper>,
                <Paper className={classes.examplecard}>
                  <img
                    style={{ width:'500px', 'height':'300px' }}
                    src="../img/example-tumblr.png"
                  />
                </Paper>,
                <Paper className={classes.examplecard}>
                  <img
                    style={{ width:'500px', 'height':'300px' }}
                    src="../img/example-dogelore.png"
                  />
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
            Methodology
          </Typography>
          <Typography>
            Bla bla bla Blaaaaa bla bla blah blaah blah Blah blaaah Blaaah Bla bla Blah
            blah Blah blaaah Blaaah Bla bla Blahbla bla blah blaah blah blaaah Blaaah
            Bla bla bla Blaaaaa bla bla blah blaah blah Blah blaaah Blaaah Bla bla Blah
            blah Blah blaaah Blaaah Bla bla Blahbla bla blah blaah blah blaaah Blaaah
            Bla bla bla Blaaaaa bla bla blah blaah blah Blah blaaah Blaaah Bla bla Blah
            blah Blah blaaah Blaaah Bla bla Blahbla bla blah blaah blah blaaah Blaaah
            Bla bla bla Blaaaaa bla bla blah blaah blah Blah blaaah Blaaah Bla bla Blah
            blah Blah blaaah Blaaah Bla bla Blahbla bla blah blaah blah blaaah Blaaah
          </Typography>
        </Paper>
        <Paper className={classes.detailtext}>
          <Typography variant="h5" style={{ textAlign:'center' }} gutterBottom>
            Experiments
          </Typography>
          <Typography>
            Bla bla bla Blaaaaa bla bla blah blaah blah Blah blaaah Blaaah Bla bla Blah
            blah Blah blaaah Blaaah Bla bla Blahbla bla blah blaah blah blaaah Blaaah
            Bla bla bla Blaaaaa bla bla blah blaah blah Blah blaaah Blaaah Bla bla Blah
            blah Blah blaaah Blaaah Bla bla Blahbla bla blah blaah blah blaaah Blaaah
            Bla bla bla Blaaaaa bla bla blah blaah blah Blah blaaah Blaaah Bla bla Blah
            blah Blah blaaah Blaaah Bla bla Blahbla bla blah blaah blah blaaah Blaaah
            Bla bla bla Blaaaaa bla bla blah blaah blah Blah blaaah Blaaah Bla bla Blah
            blah Blah blaaah Blaaah Bla bla Blahbla bla blah blaah blah blaaah Blaaah
          </Typography>
        </Paper>
        <Paper className={classes.detailtext}>
          <Typography variant="h5" style={{ textAlign:'center' }} gutterBottom>
            Results
          </Typography>
          <Typography>
            Bla bla bla Blaaaaa bla bla blah blaah blah Blah blaaah Blaaah Bla bla Blah
            blah Blah blaaah Blaaah Bla bla Blahbla bla blah blaah blah blaaah Blaaah
            Bla bla bla Blaaaaa bla bla blah blaah blah Blah blaaah Blaaah Bla bla Blah
            blah Blah blaaah Blaaah Bla bla Blahbla bla blah blaah blah blaaah Blaaah
            Bla bla bla Blaaaaa bla bla blah blaah blah Blah blaaah Blaaah Bla bla Blah
            blah Blah blaaah Blaaah Bla bla Blahbla bla blah blaah blah blaaah Blaaah
            Bla bla bla Blaaaaa bla bla blah blaah blah Blah blaaah Blaaah Bla bla Blah
            blah Blah blaaah Blaaah Bla bla Blahbla bla blah blaah blah blaaah Blaaah
          </Typography>
        </Paper>
      </Paper>
      <Paper className={classes.panel}>
        <Typography variant="h4" style={{ textAlign:'center' }} gutterBottom>
          Related Work
        </Typography>
        <Typography>
          Bla bla bla Blaaaaa bla bla blah blaah blah Blah blaaah Blaaah Bla bla Blah
          blah Blah blaaah Blaaah Bla bla Blahbla bla blah blaah blah blaaah Blaaah
          Bla bla bla Blaaaaa bla bla blah blaah blah Blah blaaah Blaaah Bla bla Blah
          blah Blah blaaah Blaaah Bla bla Blahbla bla blah blaah blah blaaah Blaaah
          Bla bla bla Blaaaaa bla bla blah blaah blah Blah blaaah Blaaah Bla bla Blah
          blah Blah blaaah Blaaah Bla bla Blahbla bla blah blaah blah blaaah Blaaah
          Bla bla bla Blaaaaa bla bla blah blaah blah Blah blaaah Blaaah Bla bla Blah
          blah Blah blaaah Blaaah Bla bla Blahbla bla blah blaah blah blaaah Blaaah
        </Typography>
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
