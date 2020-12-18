import React, {useRef, useEffect, useState} from 'react';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import DropImageCard from './DropImageCard'
import {InfoSnackbar, LoadingSnackbar } from './Snackbars'
import { fetchImage, makeSession, loadModel, runModel } from './utils'

const session = makeSession();

const useStyles = makeStyles((theme) => ({
  root: {
    background: '#DDDDDD',
    padding: '15px 30px',
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
  const [data, setData] = useState(null)
  useEffect(() => {
      if (file) fetchImage(file, canvas, setData);
  }, [file])

  const [outputMap, setOutputMap] = useState(null);

  useEffect(() => {
      if (!loaded || !data) return;
      runModel(session, data, setOutputMap);
  }, [loaded, data]); // runs when loaded or data changes
  const outputData = outputMap && outputMap.values().next().value.data;

  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          { !loaded && !isLoading && <Button variant="contained" onClick={startLoadModel}>Load model (TODO 200 MB)</Button>}
          { !loaded && isLoading && <LoadingSnackbar message="Loading model..." /> }
          { loaded && data && !outputMap && <LoadingSnackbar message="Running model..." /> }
          { loaded && !file && <InfoSnackbar message="Add a picture..." /> }
          { !!file && !data && <LoadingSnackbar message="Loading image..." /> }
          <DropImageCard setFile={setFile} canvasRef={canvas} fileLoaded={!!file} />
          <Typography>
            oh boy it's a demo!
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField id="outlined-basic" label="Meme Title" variant="outlined" />
        </Grid>
        <Grid item>
          <Button className={classes.shiny}>
            WHERE SHOULD I POST THIS?
          </Button>
        </Grid>
      </Grid>
    </Container>
  )
}
