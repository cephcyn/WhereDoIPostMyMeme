#with open('post_titles_test.txt', 'r', encoding='utf-8') as input:
#    lines = input.readlines()
#    for i in range(int((len(lines)+249)/250)):
#        frag_name = 'r1_titles_test_frag_' + str(i) + '.txt'
#        with open(frag_name, 'w', encoding='utf-8') as output:
#            output.writelines(lines[250*i:250*(i+1)])

#to_subfrag = 'titles_train_frag_35.txt'
#subfrag_prefix = to_subfrag.split('.')[0]
#with open(to_subfrag, 'r', encoding='utf-8') as input:
#    lines = input.readlines()
#    for i in range(int((len(lines)+99)/100)):
#        frag_name = subfrag_prefix + '_' + str(i) + '.txt'
#        with open(frag_name, 'w', encoding='utf-8') as output:
#            output.writelines(lines[100*i:100*(i+1)])

# Convert labels to tensors
import tensorflow as tf
import pickle
with open('subreddits_test.txt', 'r') as input:
    subs = {}
    count = {}
    num_subs = 0
    new_labels = []
    for line in input:
        if line not in subs:
            subs[line] = num_subs
            count[num_subs] = 1
            num_subs += 1
        new_labels.append(subs[line])
        count[subs[line]] += 1
    print(count)
    print(subs)
    output = open('subreddits_test.pickle', 'wb')
    pickle.dump(new_labels, output)
    output.close()