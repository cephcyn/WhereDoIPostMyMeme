with open('post_titles.txt', 'r', encoding='utf-8') as titles:
    with open('subreddits.txt', 'r') as subs:
        title_to_sub = {}
        lines = titles.readlines()
        labels = subs.readlines()
        for i in range(len(lines)):
            title_to_sub[lines[i]] = labels[i]
        with open('post_titles_train.txt', 'r', encoding='utf-8') as train:
            with open('subreddits_train.txt', 'w') as train_label:
                for title_1 in train:
                    train_label.write(title_to_sub[title_1])
        with open('post_titles_test.txt', 'r', encoding='utf-8') as test:
            with open('subreddits_test.txt', 'w') as test_label:
                for title_2 in test:
                    test_label.write(title_to_sub[title_2])

