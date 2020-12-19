'''
Trains the multimodal model and saves it in epoch_N.ckpt, where N is the current epoch.
'''
import pandas as pd
import torch
import torch.nn as nn
import torch.nn.functional as F
from PIL import Image, ImageOps
from urllib.request import urlopen
from urllib.error import HTTPError
from torchvision import transforms
import matplotlib.pyplot as plt
from pytorch_pretrained_bert import BertTokenizer, BertModel
import torch.optim as optim
import random

if torch.cuda.is_available():
  dev = "cuda:0"
else:
  dev = "cpu"
print(dev)
device = torch.device(dev)
class MultiModal(nn.Module):
    def __init__(self, vocab_size, feature_size):
        super(MultiModal, self).__init__()
        self.transformer_encoder = nn.TransformerEncoder(nn.TransformerEncoderLayer(d_model=512, nhead=8), num_layers=6)
        self.lin1 = nn.Linear(17408, 4532)
        self.lin2 = nn.Linear(4532, 1088)
        self.lin3 = nn.Linear(1088, 272)
        self.lin4 = nn.Linear(272, 68)
        self.lin5 = nn.Linear(68, 19)
        self.tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
        self.bert_model = BertModel.from_pretrained('bert-base-uncased')
        self.mp = nn.MaxPool2d(3, stride=2, padding=1)
        self.dropout = nn.Dropout2d(0.25)
        self.conv1 = nn.Conv2d(3, 16, 3, stride=2, padding=1)
        self.conv2 = nn.Conv2d(16, 32, 3, stride=2, padding=1)
        self.conv2_bn = nn.BatchNorm2d(32)
        self.conv3 = nn.Conv2d(32, 64, 3, stride=2, padding=1)
        self.conv4 = nn.Conv2d(64, 128, 3, stride=2, padding=1)
        self.conv4_bn = nn.BatchNorm2d(128)
        self.conv5 = nn.Conv2d(128, 256, 3, stride=2, padding=1)
        self.conv6 = nn.Conv2d(256, 512, 3, stride=2, padding=1)
        self.conv6_bn = nn.BatchNorm2d(512)
        self.conv7 = nn.Conv2d(512, 1024, 3, stride=2, padding=1)
        self.conv8 = nn.Conv2d(1024, 2048, 3, stride=2, padding=1)
        self.conv8_bn = nn.BatchNorm2d(2048)
    def forward(self, x):
        tokenized_title = self.tokenizer.tokenize(x['title'])[:20]
        tokenized_title += (20 - len(tokenized_title)) * ['[PAD]']
        title_tensor = torch.tensor([self.tokenizer.convert_tokens_to_ids(tokenized_title)]).float().to(device)
        title_tensor.requires_grad_()
        title_tensor = self.bert_model(torch.tensor([self.tokenizer.convert_tokens_to_ids(tokenized_title)]).to(device))[0][-1]
        image_tensor = self.conv1(torch.unsqueeze(x['image'], 0))
        image_tensor = F.relu(image_tensor)
        image_tensor = self.conv2(image_tensor)
        image_tensor = self.conv2_bn(image_tensor)
        image_tensor = F.relu(image_tensor)
        image_tensor = self.conv3(image_tensor)
        image_tensor = F.relu(image_tensor)
        image_tensor = self.conv4(image_tensor)
        image_tensor = self.conv4_bn(image_tensor)
        image_tensor = self.dropout(image_tensor)
        image_tensor = F.relu(image_tensor)
        image_tensor = self.conv5(image_tensor)
        image_tensor = F.relu(image_tensor)
        image_tensor = self.conv6(image_tensor)
        image_tensor = self.conv6_bn(image_tensor)
        image_tensor = self.mp(image_tensor)
        image_tensor = self.dropout(image_tensor)
        image_tensor = F.relu(image_tensor)
        concat_data = torch.cat([title_tensor.flatten(), image_tensor.flatten()])
        output = self.lin1(concat_data)
        output = F.relu(output)
        output = self.lin2(output)
        output = F.relu(output)
        output = self.lin3(output)
        output = F.relu(output)
        output = self.lin4(output)
        output = F.relu(output)
        output = self.lin5(output)
        return output

    def loss(self, prediction, label):
        loss_val = F.cross_entropy(prediction, label)
        return loss_val

malformed_data = [7423]
subreddit_file = open('subreddits.txt', 'r', encoding='utf-8')
subreddits = subreddit_file.readlines()[:-1]
post_title_file = open('post_titles.txt', 'r', encoding='utf-8')
post_titles = post_title_file.readlines()[:-1]
sub_to_label = dict()
subreddit_labels = list()
for subreddit in subreddits:
    if subreddit not in sub_to_label:
        sub_to_label[subreddit] = len(sub_to_label)
    subreddit_labels.append(sub_to_label[subreddit])
traverse_order = [x for x in range(len(subreddit_labels)) if x not in malformed_data]
random.shuffle(traverse_order)
train_idx = traverse_order[:int(0.8*len(subreddit_labels))]
test_idx = traverse_order[int(0.8*len(subreddit_labels)):]
model = MultiModal(100, 100)
model.to(device)
resizer = transforms.Resize((256, 256))
tensorize = transforms.ToTensor()
optimizer = optim.SGD(model.parameters(), lr=0.01)
def eval(full):
    idx = 400 if not full else len(test_idx)
    tot = 0
    corr = 0
    with torch.no_grad():
        for j in test_idx[:idx]:
            x = {'title': post_titles[j], 'image': tensorize(resizer(Image.open('images/image_{0}'.format(j)))).to(device)}
            pred = torch.argmax(model(x))
            if pred.item() == subreddit_labels[j]:
                corr += 1
            tot += 1
        print(str(corr) + '  /  ' + str(tot))
for epoch in range(10):
    losses_to_avg = list()
    for num, i in enumerate(train_idx, 1):
        x = {'title': post_titles[i], 'image': tensorize(resizer(Image.open('images/image_{0}'.format(i)))).to(device)}
        x['image'].requires_grad_()
        y = torch.LongTensor([subreddit_labels[i]]).to(device)
        output = model(x)
        losses_to_avg.append(model.loss(torch.unsqueeze(output, 0), y))
        if num % 50 == 0:
            loss = sum(losses_to_avg) / len(losses_to_avg)
            print(str(num) + '        ' + str(loss.item()))
            optimizer.zero_grad()
            loss.backward()
            optimizer.step()
            losses_to_avg = list()
        if num % 1000 == 0:
            eval(False)
    if losses_to_avg:
        loss = sum(losses_to_avg) / len(losses_to_avg)
        print(str(num) + '        ' + str(loss.item()))
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()
        losses_to_avg = list()
    eval(True)
    torch.save(model, 'epoch_{0}.ckpt'.format(epoch))

