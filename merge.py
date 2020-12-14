import os
import pandas as pd
import pickle
pickle.HIGHEST_PROTOCOL = 4

df = pd.read_hdf('data/dataset.h5', 'df')
df1 = pd.read_hdf('data/1dataset.h5', 'df')
df2 = pd.read_hdf('data/2dataset.h5', 'df')
df = pd.concat([df, df1, df2])
df = df[~df.index.duplicated(keep='first')]

if os.path.isfile('data/dataset.h5'):
    os.remove('data/dataset.h5')
df.to_hdf('data/dataset.h5', key='df')
num = 1
if os.path.isfile(f'data/{num}dataset.h5'):
    os.remove(f'data/{num}dataset.h5')
df.to_hdf(f'data/{num}dataset.h5', key='df')
num = 2
if os.path.isfile(f'data/{num}dataset.h5'):
    os.remove(f'data/{num}dataset.h5')
df.to_hdf(f'data/{num}dataset.h5', key='df')

utc_now_dict = {}
if os.path.isfile('data/utcbookmarks.pickle'):
    with open('data/utcbookmarks.pickle', 'rb') as f:
        utc_now_dict = pickle.load(f)

if os.path.isfile('data/1utcbookmarks.pickle'):
    with open('data/1utcbookmarks.pickle', 'rb') as f:
        utc_now_dict_addt = pickle.load(f)
    for key in utc_now_dict_addt:
        utc_now_dict[key] = utc_now_dict_addt[key]

if os.path.isfile('data/2utcbookmarks.pickle'):
    with open('data/2utcbookmarks.pickle', 'rb') as f:
        utc_now_dict_addt = pickle.load(f)
    for key in utc_now_dict_addt:
        utc_now_dict[key] = utc_now_dict_addt[key]

with open('data/utcbookmarks.pickle', 'wb') as f:
    pickle.dump(utc_now_dict, f)
with open('data/1utcbookmarks.pickle', 'wb') as f:
    pickle.dump(utc_now_dict, f)
with open('data/2utcbookmarks.pickle', 'wb') as f:
    pickle.dump(utc_now_dict, f)