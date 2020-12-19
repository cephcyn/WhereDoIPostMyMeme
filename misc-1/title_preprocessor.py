import re

sample_counts = [4173, 3456, 3837, 4094, 3502, 4554, 4203, 3535, 3482, 4059,
                 4697, 4412, 3447, 4159, 3720, 2642, 3919, 4457, 1457]
train_sizes = [3338, 2764, 3069, 3275, 2801, 3643, 3362, 2828, 2785, 3247,
               3757, 3529, 2757, 3327, 2976, 2113, 3135, 3565, 1165]

with open('post_titles.txt', 'r', encoding='utf-8') as title_in, \
    open('subreddits.txt', 'r') as subs_in, \
    open('post_titles_train.txt', 'w', encoding='utf-8') as title_out_train, \
    open('post_titles_test.txt', 'w', encoding='utf-8') as title_out_test, \
    open('subreddits_train.txt', 'w') as subs_out_train, \
    open('subreddits_test.txt', 'w') as subs_out_test:
                count = 0
                for sub_id in range(len(sample_counts)):
                    for i in range(sample_counts[sub_id]):
                        sub = subs_in.readline()
                        title = title_in.readline()
                        if i < train_sizes[sub_id]:
                            title_out_train.write(title)
                            subs_out_train.write(sub)
                        else:
                            title_out_test.write(title)
                            subs_out_test.write(sub)


#for line in f_in:
#    f_out.write(re.sub(r'[^\x00-\x7f]', '`', line))