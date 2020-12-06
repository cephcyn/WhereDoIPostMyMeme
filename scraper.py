import urllib.request
import json
import pandas as pd
import numpy as np
import os

# list of subreddits to collect posts from
sub_list = ['greentext', 'DeepFriedMemes', 'me_irl', '2meirl4meirl', 'dankmemes', 
            'adviceanimals', 'dogelore', 'wholesomememes', 'CatsPlayingDnd', 'glitch_art', 
            'awwnime', 'EarthPorn', 'tumblr', 'NapkinMemes', 'chickenswearingpants', 
            'BreadStapledToTrees', 'terriblefacebookmemes', 'Animemes', 'dataisbeautiful']

# number of posts to collect from each sub
num_posts_each_sub = 5000

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
def scrape_subreddit(min_posts, subreddit):
    # get the sub creation date
    with urllib.request.urlopen(f"https://api.pushshift.io/reddit/search/submission/?subreddit={subreddit}&size=1&sort=asc&before=30d") as url:
        data = json.loads(url.read().decode())
    df_sub = pd.DataFrame.from_dict(pd.json_normalize(data['data']), orient='columns')
    created_utc_first_sub = df_sub.tail(1)['created_utc']

    # get the most recent N posts
    with urllib.request.urlopen(f"https://api.pushshift.io/reddit/search/submission/?subreddit={subreddit}&size=1&sort=desc&before=30d") as url:
        data = json.loads(url.read().decode())
    df_sub = pd.DataFrame.from_dict(pd.json_normalize(data['data']), orient='columns')
    created_utc_now_sub = df_sub.tail(1)['created_utc']
    
    # make sure we get at least args.post_count number of posts scraped
    # but also don't go past the beginning of the subreddit
    try:
        while (len(df_sub.index) < min_posts) and (int(created_utc_now_sub) > int(created_utc_first_sub)): 
            with urllib.request.urlopen(f"https://api.pushshift.io/reddit/search/submission/?subreddit={subreddit}&size=1000&sort=desc&before=%d"%created_utc_now_sub) as url:
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
                         'score', 'subreddit', 'title', 'upvote_ratio', 'url', 'url_overridden_by_dest']]
        return df_sub

try:
    if os.path.isfile('data/dataset.h5'):
        print(f'loading from file!')
        dataset_df = pd.read_hdf('data/dataset.h5', 'df')
    else:
        print(f'no file to load from!')
        dataset_df = pd.DataFrame()
    
    for sub_name in sub_list:
        num_collected = len(dataset_df[dataset_df.subreddit.str.lower() == sub_name.lower()])
        if num_collected < num_posts_each_sub:
            num_to_collect = num_posts_each_sub - num_collected
            print(f'currently scraping sub r/{sub_name}: need {num_to_collect}')
            scraped_df = scrape_subreddit(num_to_collect, sub_name)
            dataset_df = pd.concat([dataset_df, scraped_df])
            print(f'     done scraping sub r/{sub_name}')
finally:
    print(f'rewriting/dumping output to file!')
    if os.path.isfile('data/dataset.h5'):
        os.remove('data/dataset.h5')
    dataset_df.to_hdf('data/dataset.h5', key='df')
