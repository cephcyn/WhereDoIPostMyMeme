import urllib.request
import json
import pandas as pd
import numpy as np
import os
import pickle
pickle.HIGHEST_PROTOCOL = 4

# list of subreddits to collect posts from
sub_list = [
    'greentext',             # DONE
    'DeepFriedMemes',        # DONE
    'me_irl',                # file0
    '2meirl4meirl',          # file0
    'dankmemes',             # file0
    'adviceanimals',         # file0
    'dogelore',              # file0
    'wholesomememes',        # file0
    'CatsPlayingDnd',        # file1
    'glitch_art',            # file1
    'awwnime',               # file1
    'EarthPorn',             # file1
    'tumblr',                # file1
    'NapkinMemes',           # file2
    'chickenswearingpants',  # file2
    'BreadStapledToTrees',   # file2
    'terriblefacebookmemes', # file2
    'Animemes',              # file2
    'dataisbeautiful',       # file2
]

# number of posts to collect from each sub
num_posts_each_sub = 5000

fnum = ''
output_filename_df = f'data/{fnum}dataset.h5'
output_filename_bookmark = f'data/{fnum}utcbookmarks.pickle'

def filter_posts(post_df):
    output_df = post_df
    output_df = output_df[output_df.is_self == False]
    output_df = output_df[output_df.over_18 == False]
    output_df = output_df[output_df.pinned == False]
    output_df = output_df[output_df.score >= 3]
    output_df = output_df[output_df.url.str.endswith('.jpg', na=False)]
    return output_df

# Collect approximately `min_posts` number of posts (or the total # of posts in subreddit, whichever is smaller)
# Collect posts from `subreddit`
# Output the data file to `output_filename`
def scrape_subreddit(min_posts, subreddit, start_utc=None):
    # get the sub creation date
    url = f"https://api.pushshift.io/reddit/search/submission/?subreddit={subreddit}&size=1&sort=asc&before=30d"
    with urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})) as url:
        data = json.loads(url.read().decode())
    df_sub = pd.DataFrame.from_dict(pd.json_normalize(data['data']), orient='columns')
    created_utc_first_sub = df_sub.tail(1)['created_utc']
    # set a default value for created_utc_now_sub
    created_utc_now_sub = created_utc_first_sub

    # get the most recent N posts
    url = f"https://api.pushshift.io/reddit/search/submission/?subreddit={subreddit}&size=1&sort=desc&before=30d"
    with urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})) as url:
        data = json.loads(url.read().decode())
    df_sub = pd.DataFrame.from_dict(pd.json_normalize(data['data']), orient='columns')
    if start_utc is None:
        created_utc_now_sub = df_sub.tail(1)['created_utc']
    else:
        created_utc_now_sub = start_utc
    
    # make sure we get at least args.post_count number of posts scraped
    # but also don't go past the beginning of the subreddit
    try:
        while (len(df_sub.index) < min_posts) and (int(created_utc_now_sub) > int(created_utc_first_sub)): 
            url = f"https://api.pushshift.io/reddit/search/submission/?subreddit={subreddit}&size=1000&sort=desc&before=%d"%created_utc_now_sub
            with urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})) as url:
                data = json.loads(url.read().decode())
            df_new_sub = pd.DataFrame.from_dict(pd.json_normalize(data['data']), orient='columns')
            df_sub = df_sub.append(df_new_sub)
            created_utc_now_sub = df_sub.tail(1)['created_utc']
            df_sub = filter_posts(df_sub)
            print(len(df_sub))
    finally:
        # Clean up the post data that we scraped
        df_sub = filter_posts(df_sub)
        df_sub = df_sub.set_index('id')
        df_sub = df_sub[~df_sub.index.duplicated(keep='first')]
        df_sub = df_sub[['author', 'author_flair_text', 'created_utc', 'permalink', 'retrieved_on', 
                         'score', 'subreddit', 'title', 'upvote_ratio', 'url']]
        return df_sub, created_utc_now_sub

try:
    if os.path.isfile(output_filename_df):
        print(f'loading post data from file!')
        dataset_df = pd.read_hdf(output_filename_df, 'df')
    else:
        print(f'no post data file to load from!')
        dataset_df = pd.DataFrame()
        
    if os.path.isfile(output_filename_bookmark):
        print(f'loading utc bookmarks from file!')
        with open(output_filename_bookmark, 'rb') as f:
            utc_now_dict = pickle.load(f)
    else:
        print(f'no bookmark file to load from!')
        utc_now_dict = {}
    
    for sub_name in sub_list:
        num_collected = len(dataset_df[dataset_df.subreddit.str.lower() == sub_name.lower()])
        if num_collected < num_posts_each_sub:
            num_to_collect = num_posts_each_sub - num_collected
            print(f'currently scraping sub r/{sub_name}: need {num_to_collect}')
            if sub_name in utc_now_dict:
                # if we have a backup, save that
                scraped_df, created_utc_now = scrape_subreddit(num_to_collect, sub_name, start_utc=utc_now_dict[sub_name])
            else:
                scraped_df, created_utc_now = scrape_subreddit(num_to_collect, sub_name)
            utc_now_dict[sub_name] = created_utc_now
            dataset_df = pd.concat([dataset_df, scraped_df])
            print(f'     done scraping sub r/{sub_name}')
finally:
    print(f'rewriting/dumping output to file!')
    if os.path.isfile(output_filename_df):
        os.remove(output_filename_df)
    dataset_df.to_hdf(output_filename_df, key='df')
    if os.path.isfile(output_filename_bookmark):
        os.remove(output_filename_bookmark)
    with open(output_filename_bookmark, 'wb') as f:
        pickle.dump(utc_now_dict, f)