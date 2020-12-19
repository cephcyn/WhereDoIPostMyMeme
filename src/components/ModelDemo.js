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
import {InfoSnackbar, LoadingSnackbar } from './Snackbars'
import { fetchImage, makeSession, loadModel, runModel } from './utils'

const session = makeSession();

const useStyles = makeStyles((theme) => ({
  root: {
    background: '#DDDDDD',
    padding: '15px 30px',
  },
  submit: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
  shiny: {
    // I wonder if I can randomize the color lmao
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
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
    if (!loaded || !imgData || !(textData.length>0)) return;
    setStartedRun(true);
    console.log('clicked start button!');
    console.log('image data: ')
    console.log(imgData);
    console.log('text data: '+textData);
    console.log('startRunModel '+setOutputMap);
    runModel(session, imgData, textData, setOutputMap);
    console.log('done running');
    setStartedRun(false);
  };
  useEffect(() => {
    if (!loaded) return;
    setStartedRun(false);
  }, [outputMap, file, imgData, textData]); // runs when loaded or data changes
  const outputData = outputMap && outputMap.values().next().value.data;

  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <DropImageCard setFile={setFile} canvasRef={canvas} fileLoaded={!!file} />
        </Grid>
        <Grid item xs={12}>
          <TextField id="outlined-basic" label="Meme Title" variant="outlined" value={textData} onChange={handleTextChange} />
        </Grid>
        <Grid item xs={12}>
          { !loaded && !isLoading && (<Button className={`${classes.submit}`} onClick={startLoadModel}>Load model (TODO 40 MB)</Button>) }
          { !loaded && isLoading && (<Button className={`${classes.submit}`}>Loading model...</Button>) }
          { loaded && !file && (<Button className={`${classes.submit}`}>Need to upload image</Button>) }
          { loaded && file && !imgData && (<Button className={`${classes.submit}`}>Loading image...</Button>) }
          { loaded && file && imgData && !(textData.length>0) && (<Button className={`${classes.submit}`}>Need to add text</Button>) }
          { loaded && file && imgData && (textData.length>0) && !startedRun && (<Button className={`${classes.submit}`} onClick={startRunModel}>WHERE SHOULD I POST THIS?</Button>) }
          { loaded && startedRun && (<Button className={`${classes.submit}`}>Running model...</Button>) }
        </Grid>
        <Grid item xs={12}>
          <Predictions output={outputData} />
        </Grid>
      </Grid>
    </Container>
  )
}
