import React from 'react';
import classes from './classes'
import Scorecard from './Scorecard';
import { getImg, getLabelName } from './utils';

const getTopK = (acts, k) => {
    const topK = Array.from(acts)
        .map((act, i) => [act, i])
        .sort((a, b) => {
            if (a[0] < b[0]) return -1;
            if (a[0] > b[0]) return 1;
            return 0;
        })
        .reverse()
        .slice(0, k)

    // denominator of softmax function
    const denominator = acts.map(y => Math.exp(y)).reduce((a,b) => a+b)
    return topK.map(([act, i], _, acts) => ({
        subID: classes[i],
        act,
        prob: Math.exp(act) / denominator,
    }));
}

export default function Predictions({output}) {
    if (!output) return null;
    const items = getTopK(output, 5).map(({subID, prob}) => ({
        name: getLabelName(subID),
        percentage: (prob * 100).toFixed(2),
        avatar: getImg(getLabelName(subID)),
    }));
    return <Scorecard items={items} />;
}
