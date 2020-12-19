import tensorflow as tf
import tensorflow_hub as hub
import numpy as np
import pickle

tf.compat.v1.enable_eager_execution()
tf.compat.v1.disable_v2_behavior()

elmo = hub.load('./')

#x = tf.convert_to_tensor(['Anon has powers'])
#embeddings = elmo.signatures['default'](x)['elmo']

def elmo_vectors(x):
    print('e')
    embeddings = elmo.signatures['default'](x)['elmo']

    with tf.compat.v1.Session() as sess:
        sess.run(tf.compat.v1.global_variables_initializer())
        sess.run(tf.compat.v1.tables_initializer())
        return sess.run(tf.compat.v1.reduce_mean(embeddings, 1))

# create subfrags
#frag_to_frag = 35
#for i in range(0, 10):
#    print('NOW ON SUBFRAGMENT: ' + str(i))
#    with open(('titles_train_frag_' + str(frag_to_frag) + '_' + str(i) + '.txt'), 'r', encoding='utf-8') as input:
#        train_lines = input.readlines()
#        list_train = [tf.convert_to_tensor(train_lines[i:i + 20]) for j in
#                      range(0, len(train_lines), 20)]
#        elmo_train = [elmo_vectors(x) for x in list_train]
#        elmo_train_new = np.concatenate(elmo_train, axis=0)

#        fragment_name = 'post_titles_train_elmo_frag_' + str(frag_to_frag) + '_' + str(i) + '.pickle'
#        pickle_out = open(fragment_name, 'wb')
#        pickle.dump(elmo_train_new, pickle_out)
#        pickle_out.close()

# create frags
for i in range(0, 58):
    print('NOW ON FRAGMENT: ' + str(i))
    with open(('r1_titles_test_frag_' + str(i) + '.txt'), 'r', encoding='utf-8') as input:
        train_lines = input.readlines()
        print(len(train_lines))
        list_train = [tf.convert_to_tensor(train_lines[j:j + 50]) for j in
                      range(0, len(train_lines), 50)]
        elmo_train = [elmo_vectors(x) for x in list_train]
        elmo_train_new = np.concatenate(elmo_train, axis=0)

        print(elmo_train_new.shape)
        fragment_name = 'r1_post_titles_test_elmo_frag_' + str(i) + '.pickle'
        pickle_out = open(fragment_name, 'wb')
        pickle.dump(elmo_train_new, pickle_out)
        pickle_out.close()

#train_titles = open('post_titles_train.txt', 'r', encoding='utf-8')
#train_lines = train_titles.readlines()

#for i in range(int((len(train_lines)+999)/1000)):
#    working_set = train_lines[1000*i:1000*(i+1)]
#    list_train = [tf.convert_to_tensor(working_set[i:i+100]) for j in range(0, len(working_set), 100)]
#    elmo_train = [elmo_vectors(x) for x in list_train]
#    elmo_train_new = np.concatenate(elmo_train, axis=0)

#    fragment_name = 'post_titles_train_elmo_' + str(i) + '.pickle'
#    pickle_out = open(fragment_name, 'wb')
#    pickle.dump(elmo_train_new, pickle_out)
#    pickle_out.close()
#train_titles.close()


#https://www.analyticsvidhya.com/blog/2019/03/learn-to-use-elmo-to-extract-features-from-text/
#https://washington.zoom.us/j/92429532889?pwd=RXM3RkUxZEFaaCtjUU9ReG9CekhrUT09