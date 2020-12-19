import pickle
import numpy as np

# join subfrags
#subfrags = [16, 20, 21, 22, 34, 35, 36, 40, 42, 44, 45, 46, 54]
#for subfrag in subfrags:
#    subfrag_vectors = []
#    for i in range(10):
#        pickle_in = open('post_titles_train_elmo_frag_' + str(subfrag) + '_' + str(i) + '.pickle',
#                         'rb')
#        subfrag_vectors.append(pickle.load(pickle_in))
#        pickle_in.close()
#    joined = np.concatenate(subfrag_vectors, axis=0)
#    pickle_out = open('post_titles_train_elmo_frag_' + str(subfrag) + '.pickle', 'wb')
#    pickle.dump(joined, pickle_out)
#    pickle_out.close()

# join frags
frag_vectors = []
for i in range(58):
    pickle_in = open('r1_post_titles_test_elmo_frag_' + str(i) + '.pickle', 'rb')
    hm = pickle.load(pickle_in)
    print(str(i) + ' ' + str(hm.shape))
    frag_vectors.append(hm)
    pickle_in.close()
joined = np.concatenate(frag_vectors, axis=0)
pickle_out = open('post_titles_test_elmo.pickle', 'wb')
pickle.dump(joined, pickle_out)
pickle_out.close()