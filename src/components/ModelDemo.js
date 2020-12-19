import React, {useRef, useEffect, useState} from 'react';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import DropImageCard from './DropImageCard'
import Predictions from './Predictions'
import { fetchImage, makeSession, loadModel, runModel } from './utils'

const session = makeSession();

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '15px 30px',
  },
  demoElement: {
    marginTop: '10px',
    marginBottom: '10px',
    width: '100%',
  },
  submit: {
    background: 'linear-gradient(45deg, #d08771, #c85b85)',
    backgroundSize: '200% 200%',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .1)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
  shiny: {
    // I wonder if I can randomize the color lmao
    background: 'linear-gradient(45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)',
    backgroundSize: '400% 400%',
    animation: '$gradient 15s ease infinite',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .5)',
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

export default function ModelDemo() {
  const [loaded, setLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const startLoadModel = async () => {
    if (isLoading || loaded) { return; }
    setIsLoading(true);
    await loadModel(session);
    setLoaded(true);
    setIsLoading(false);
  }

  const [file, setFile] = useState(null)
  const canvas = useRef(null)
  const [imgData, setImgData] = useState(null)
  useEffect(() => {
        if (file) fetchImage(file, canvas, setImgData);
    }, [file])

  const [textData, setTextData] = useState("")
  const handleTextChange = (event) => {
    setTextData(event.target.value);
  };

  const [startedRun, setStartedRun] = useState(null);
  const [outputMap, setOutputMap] = useState(null);
  const startRunModel = async () => {
    // if (!loaded || !imgData || !(textData.length>0)) return;
    // setStartedRun(true);
    console.log('clicked start button!');
    console.log('image data: ')
    console.log(imgData);
    console.log('text data: '+textData);
    // runModel(session, imgData, textData, setOutputMap);
  };
  useEffect(() => {
    if (!loaded) return;
    setStartedRun(false);
  }, [outputMap, imgData, textData]); // runs when loaded or data changes
  const outputData = outputMap && outputMap.values().next().value.data;

  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Button className={`${classes.demoElement} ${classes.submit} ${classes.shiny}`} onClick={startRunModel}>TODO use CONSOLE, DELETE LATER</Button>
          { !loaded && !isLoading && (<Button className={`${classes.demoElement} ${classes.submit}`} onClick={startLoadModel}>Load model (TODO 40 MB)</Button>) }
          { !loaded && isLoading && (<Button className={`${classes.demoElement} ${classes.submit}`}>Loading model...</Button>) }
          { loaded && !file && (<Button className={`${classes.demoElement} ${classes.submit}`}>Need to upload image</Button>) }
          { loaded && file && !imgData && (<Button className={`${classes.demoElement} ${classes.submit}`}>Loading image...</Button>) }
          { loaded && file && imgData && !(textData.length>0) && (<Button className={`${classes.demoElement} ${classes.submit}`}>Need to add text</Button>) }
          { loaded && file && imgData && (textData.length>0) && !startedRun && (<Button className={`${classes.demoElement} ${classes.submit} ${classes.shiny}`} onClick={startRunModel}>WHERE SHOULD I POST THIS?</Button>) }
          { loaded && startedRun && (<Button className={`${classes.demoElement} ${classes.submit}`}>Running model...</Button>) }
          <Predictions output={outputData} className={classes.demoElement} />
        </Grid>
        <Grid item xs={8}>
          <div style={{ display:'inline-block', position: 'relative', left: '50%', transform: 'translate(-50%, 0)' }}>
            <DropImageCard setFile={setFile} canvasRef={canvas} fileLoaded={!!file} className={classes.demoElement} />
          </div>
          <TextField id="outlined-basic" label="Meme Title" variant="outlined" value={textData} onChange={handleTextChange} className={classes.demoElement} />
        </Grid>
      </Grid>
    </Container>
  )
}
