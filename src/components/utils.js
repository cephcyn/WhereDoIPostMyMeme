import loadImage from 'blueimp-load-image';
import { Tensor, InferenceSession } from 'onnxjs';
import ndarray from 'ndarray';
import ops from 'ndarray-ops';
import model from '../dogs-resnet18.onnx';

const model_url = 'https://homes.cs.washington.edu/~jyzhou15/mobilenetv2-7.onnx'
// const model_url = '../mobilenetv2-7.onnx'

export const getLabelName = className => className.split('_').map(p => {
  return p.charAt(0).toUpperCase() + p.slice(1)
}).join(' ')

export const getImg = (labelName) => {
  return 'https://i.redd.it/vb4uq6nipk251.jpg'
}

export const makeSession = (() => {
  let _session = null;
  return () => {
    if (_session !== null) {
      return _session;
    }
    return new InferenceSession({
      backendHint: 'webgl'
    });
  }
})()

async function warmupModel(session) {
  // TODO does this even make sense to run for our model?
  // const dims = [1, 3, 299, 299];
  // const size = dims.reduce((a, b) => a * b);
  // const warmupTensor = new Tensor(new Float32Array(size), 'float32', dims);
  // for (let i = 0; i < size; i++) {
  //     warmupTensor.data[i] = Math.random() * 2.0 - 1.0; // random value [-1.0, 1.0)
  // }
  // await session.run([warmupTensor]);
}

export async function loadModel(session) {
  // TODO replace with load model
  await session.loadModel(model_url);
  await warmupModel(session);
}

async function _runModel(session, imgInput, textInput, setOutputMap) {
  const {
    width,
    height
  } = imgInput;
  // TODO modify
  const data = preprocess(imgInput);
  const imgInputTensor = new Tensor(data, 'float32', [1, 3, width, height]);
  // await wait(0);
  const outputMap = await session.run([imgInputTensor]);
  setOutputMap(outputMap);
}

export function runModel(session, imgInput, textInput, setOutputMap) {
  setTimeout(() => _runModel(session, imgInput, textInput, setOutputMap), 10);
}

// borrowed from onnx.js example: https://github.com/microsoft/onnxjs/blob/4085b7e61804d093e36af6a456d8c14c329f0a0a/examples/browser/resnet50/index.js#L29
const preprocess = input => {
  // rescale images to 3x256x256
  console.log(input)
  const {
    data,
    width,
    height
  } = input

  // data processing
  const dataTensor = ndarray(new Float32Array(data), [width, height, 4]);
  const dataProcessedTensor = ndarray(new Float32Array(width * height * 3), [1, 3, width, height]);
  ops.assign(dataProcessedTensor.pick(0, 0, null, null), dataTensor.pick(null, null, 0));
  ops.assign(dataProcessedTensor.pick(0, 1, null, null), dataTensor.pick(null, null, 1));
  ops.assign(dataProcessedTensor.pick(0, 2, null, null), dataTensor.pick(null, null, 2));
  ops.divseq(dataProcessedTensor, 255);
  ops.subseq(dataProcessedTensor.pick(0, 0, null, null), 0.485);
  ops.subseq(dataProcessedTensor.pick(0, 1, null, null), 0.456);
  ops.subseq(dataProcessedTensor.pick(0, 2, null, null), 0.406);
  ops.divseq(dataProcessedTensor.pick(0, 0, null, null), 0.229);
  ops.divseq(dataProcessedTensor.pick(0, 1, null, null), 0.224);
  ops.divseq(dataProcessedTensor.pick(0, 2, null, null), 0.225);

  console.log(dataProcessedTensor);

  return dataProcessedTensor.data;
}

const wait = ms => new Promise((res, rej) => {
  global.setTimeout(() => res(), ms)
});

const imgConfig = {
  maxWidth: 299,
  maxHeight: 299,
  cover: true,
  crop: true,
  canvas: true,
  crossOrigin: 'Anonymous',
  orientation: true,
};

const getImage = url => new Promise((res, rej) => {
  loadImage(url, img => res(img), imgConfig)
});

export const fetchImage = async (url, canvas, setData) => {
  if (!canvas || !canvas.current) return;
  const img = await getImage(url);
  if (img.type === "error") throw new Error("could not load image");
  const ctx = canvas.current.getContext('2d');
  ctx.drawImage(img, 0, 0);
  await wait(1);
  const data = ctx.getImageData(0, 0, canvas.current.width, canvas.current.height);
  console.log('in fetchImage,');
  console.log(canvas.current.width+' '+canvas.current.height)
  console.log(data)
  setData(data);
};
