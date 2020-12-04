import urllib.request
import json
import pandas as pd
import numpy as np
import os

# list of subreddits to collect posts from
sub_list = ['greentext', 'deepfriedmemes', 'me_irl', '2meirl4meirl', 'dankmemes', 
            'adviceanimals', 'dogelore', 'wholesomememes', 'CatsPlayingDnd', 'glitch_art', 
            'awwnime', 'EarthPorn', 'tumblr', 'NapkinMemes', 'chickenswearingpants', 
            'BreadStapledToTrees', 'terriblefacebookmemes', 'Animemes', 'dataisbeautiful']

def filter_posts(post_df):
    output_df = post_df
    output_df = output_df[output_df.is_self == False]
    output_df = output_df[output_df.over_18 == False]
    output_df = output_df[output_df.pinned == False]
    output_df = output_df[output_df.score >= 5]
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
    while (len(df_sub.index) < min_posts) and (int(created_utc_now_sub) > int(created_utc_first_sub)): 
        with urllib.request.urlopen(f"https://api.pushshift.io/reddit/search/submission/?subreddit={subreddit}&size=1000&sort=desc&before=%d"%created_utc_now_sub) as url:
            data = json.loads(url.read().decode())
        df_new_sub = pd.DataFrame.from_dict(pd.json_normalize(data['data']), orient='columns')
        df_sub = df_sub.append(df_new_sub)
        created_utc_now_sub = df_sub.tail(1)['created_utc']
        df_sub = filter_posts(df_sub)
        
    # Clean up the post data that we scraped
    df_sub = df_sub.set_index('id')
    df_sub = df_sub[~df_sub.index.duplicated(keep='first')]
    df_sub = df_sub[['author', 'author_flair_text', 'created_utc', 'permalink', 'retrieved_on', 
                     'score', 'subreddit', 'title', 'upvote_ratio', 'url', 'url_overridden_by_dest']]
    return df_sub

try:
    if os.path.isfile('data/dataset.h5'):
        print(f'loading from file!')
        dataset_df = pd.read_hdf('data/dataset.h5', 'df')
        already_scraped = pd.read_hdf('data/dataset.h5', 'as')
    else:
        print(f'no file to load from!')
        dataset_df = pd.DataFrame()
        already_scraped = pd.Series([], dtype='string')
    
    for sub_name in sub_list:
        if not any(already_scraped.str.match(f'^{sub_name}$')):
            print(f'currently scraping sub r/{sub_name}')
            scraped_df = scrape_subreddit(5000, sub_name)
            dataset_df = pd.concat([dataset_df, scraped_df])
            dataset_df = dataset_df.append(scraped_df)
            already_scraped = already_scraped.append(pd.Series([sub_name]))
            print(f'      done scraping sub r/{sub_name}')
finally:
    print(f'dumping output to file!')
    dataset_df.to_hdf('data/dataset.h5', key='df')
    dataset_df.to_hdf('data/dataset.h5', key='as')