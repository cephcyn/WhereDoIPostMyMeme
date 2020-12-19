import tensorflow as tf
import tensorflow_hub as hub
import numpy as np
import pickle

with open('post_titles_train_elmo.pickle', 'rb') as p_in_1:
    train_set = pickle.load(p_in_1)
    print(train_set.shape)
with open('subreddits_train.pickle', 'rb') as p_in_2:
    train_labels = np.asarray(pickle.load(p_in_2))
with open('post_titles_test_elmo.pickle', 'rb') as p_in_3:
    test_set = pickle.load(p_in_3)
with open('subreddits_test.pickle', 'rb') as p_in_4:
    test_labels = np.asarray(pickle.load(p_in_4))

model = tf.compat.v1.keras.Sequential([
    tf.compat.v1.keras.layers.Dense(1024, activation='relu'),
    tf.compat.v1.keras.layers.Dense(512, activation='relu'),
    tf.compat.v1.keras.layers.Dense(10)
])

model.compile(optimizer='adam',
              loss=tf.compat.v1.keras.losses.SparseCategoricalCrossentropy(from_logits=True),
              metrics=['accuracy'])

model.fit(train_set, train_labels, epochs=10)

test_loss, test_accuracy = model.evaluate(test_set, test_labels, verbose=2)
print('\nTest Accuracy: ', test_accuracy)