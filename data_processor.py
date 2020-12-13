import pandas as pd
import torch
from PIL import Image
from urllib.request import urlopen
from urllib.error import URLError
from torchvision import transforms
import pickle

raw_data = pd.read_hdf('data/dataset.h5', key='df')
toTensor = transforms.ToTensor()
image_urls = [x for x in raw_data['url']]
all_post_titles = [x for x in raw_data['title']]
all_subreddits = [x for x in raw_data['subreddit']]
subreddits = list()
titles = list()
i = 0

for title, image_url, subreddit in zip(all_post_titles, image_urls,all_subreddits):

    print(i)
    try:
        im = Image.open(urlopen(image_url))
    except URLError:
        continue
    try:
        im.save("data/images/image_" + str(i), "JPEG")
    except OSError:
        continue
    i+= 1
    subreddits.append(subreddit)
    titles.append(title)

with open('data/subreddits.txt', 'w') as f:
    f.write('\n'.join(subreddits))

with open('data/post_titles.txt', 'w') as f:
    f.write('\n'.join(titles))


