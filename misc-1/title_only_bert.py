import pandas as pd
import torch
import torch.nn as nn
import torch.nn.functional as F
from urllib.request import urlopen
from urllib.error import HTTPError
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
print('e')

class BertOnly(nn.Module):
    def __init__(self, vocab_size, feature_size):
        super(BertOnly, self).__init__()
        self.conv1 = nn.Conv1d(1, 1, kernel_size=7, stride=4, padding=3)
        self.lin2 = nn.Linear(3840, 512)
        self.lin3 = nn.Linear(512, 128)
        self.lin4 = nn.Linear(128, 64)
        self.lin5 = nn.Linear(64, 19)
        self.tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
        self.bert_model = BertModel.from_pretrained('bert-base-uncased')
        #self.mp = nn.MaxPool2d(3, stride=2, padding=1)
        #self.dropout = nn.Dropout2d(0.25)
    def forward(self, x):

        tokenized_title = self.tokenizer.tokenize(x['title'])[:20]
        tokenized_title += (20 - len(tokenized_title)) * ['[PAD]']
        title_tensor = torch.tensor([self.tokenizer.convert_tokens_to_ids(tokenized_title)]).float().to(device)
        title_tensor.requires_grad_()
        title_tensor = self.bert_model(torch.tensor([self.tokenizer.convert_tokens_to_ids(tokenized_title)]).to(device))[0][-1]
        #output = title_tensor.flatten()
        output = title_tensor.transpose(0,1).contiguous()
        #print(output.shape)
        output = self.conv1(output)
        #print(output.shape)
        output = output.flatten()
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
model = BertOnly(100, 100)
model.to(device)
optimizer = optim.SGD(model.parameters(), lr=0.01)
def eval(full):
    idx = 400 if not full else len(test_idx)
    tot = 0
    corr = 0
    with torch.no_grad():
        for j in test_idx[:idx]:
            x = {'title': post_titles[j]}
            pred = torch.argmax(model(x))
            if pred.item() == subreddit_labels[j]:
                corr += 1
            tot += 1
        print(str(corr) + '  /  ' + str(tot))
eval(True)
for epoch in range(10):
    print('epoch ' + str(epoch))
    losses_to_avg = None
    count = 0
    for num, i in enumerate(train_idx, 1):
        x = {'title': post_titles[i]}
        y = torch.LongTensor([subreddit_labels[i]]).to(device)
        output = model(x)
        if not losses_to_avg:
            losses_to_avg = model.loss(torch.unsqueeze(output, 0), y)
        else:
            losses_to_avg = losses_to_avg + model.loss(torch.unsqueeze(output, 0), y)
        count += 1
        if num % 50 == 0:
            loss = losses_to_avg / count
            print(str(num) + '        ' + str(loss.item()))
            optimizer.zero_grad()
            loss.backward()
            optimizer.step()
            losses_to_avg = None
            count = 0
        if num % 1000 == 0:
            eval(False)
    if losses_to_avg:
        loss = losses_to_avg / count
        print(str(epoch) + '        ' + str(loss.item()))
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()
        losses_to_avg = list()
        count = 0
    eval(True)
    torch.save(model, 'epoch_{0}.ckpt'.format(epoch))