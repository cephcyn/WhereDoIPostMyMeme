import random
from torchvision import transforms
from PIL import Image, ImageOps
from urllib.request import urlopen
from urllib.error import HTTPError

BASE_URL = 'https://homes.cs.washington.edu/~kaushalm/big_data/images/image_'
random.seed(53)
entries = random.sample(range(0, 71806), 100)
resizer = transforms.Resize((256,256))
with open('post_titles.txt', 'r', encoding='utf-8') as pt:
    with open('subreddits.txt', 'r') as subs:
        titles = pt.readlines()
        labels = subs.readlines()
        assert(len(titles) == len(labels))
        with open('human_titles.txt', 'w', encoding='utf-8') as ht:
            with open('human_subs.txt', 'w') as hs:
                for i in range(len(entries)):
                    ht.write(titles[entries[i]])
                    hs.write(labels[entries[i]])
                    try:
                        im = Image.open(urlopen(BASE_URL + str(entries[i])))
                    except HTTPError:
                        print('heehoo')
                    im = resizer(im)
                    im.save('h_img_' + str(i) + '.jpg')