import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  Stack,
  useLocalSearchParams,
} from 'expo-router';

import { Ionicons } from '@expo/vector-icons';

import { getMood } from '../../src/constants/moods';
import { useDiary } from '../../src/context/DiaryContext';
import { formatDate } from '../../src/utils/date';

import {
  COLORS,
  RADIUS,
  SHADOW,
  SPACE,
  TYPO,
} from '../../src/styles/tokens';

export default function DetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { getById, likedIds, toggleLike } = useDiary();

  const entry = getById(id);

  if (!entry) {
    return (
      <View style={styles.center}>
        <Text>Diary not found.</Text>
      </View>
    );
  }

  const liked = likedIds.has(entry.id);
  const moodInfo = getMood(entry.mood);

  return (
    <>
      <Stack.Screen
        options={{
          title: 'My Memory',
          headerTintColor: COLORS.primary,
          headerStyle: {
            backgroundColor: COLORS.background,
          },
        }}
      />

      <ScrollView
        style={styles.screen}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.moodCard,
            { backgroundColor: moodInfo.color },
          ]}
        >
          <Text style={styles.mood}>{entry.mood}</Text>

          <View style={styles.moodPill}>
            <Text style={styles.moodCaption}>
              Feeling {moodInfo.label}
            </Text>
          </View>
        </View>

        <View style={styles.contentCard}>
          <Text style={styles.date}>
            <Ionicons name="calendar-outline" size={14} />
            {'  '}{formatDate(entry.date)}
          </Text>

          <Text style={styles.title}>{entry.title}</Text>

          <View style={styles.divider} />

          <Text style={styles.body}>{entry.body}</Text>

          <Text style={styles.closing}>
            Every moment is worth remembering. 💗
          </Text>
        </View>

        <Pressable
          onPress={() => toggleLike(entry.id)}
          style={[
            styles.likeButton,
            liked && styles.likedButton,
          ]}
        >
          <Ionicons
            name={liked ? 'heart' : 'heart-outline'}
            size={21}
            color={liked ? '#FFFFFF' : COLORS.danger}
          />

          <Text
            style={[
              styles.likeText,
              liked && styles.likedText,
            ]}
          >
            {liked ? 'Added to Favorites' : 'Add to Favorites'}
          </Text>
        </Pressable>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  container: {
    padding: SPACE.l,
    paddingBottom: SPACE.xxl,
  },

  moodCard: {
    height: 190,
    borderRadius: RADIUS.large,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACE.l,
  },

  mood: {
    fontSize: 70,
  },

  moodPill: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: SPACE.l,
    paddingVertical: 6,
    borderRadius: RADIUS.round,
    marginTop: SPACE.m,
  },

  moodCaption: {
    color: COLORS.text,
    fontSize: TYPO.body,
    fontWeight: '600',
  },

  contentCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.large,
    padding: SPACE.l,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOW.card,
  },

  date: {
    color: COLORS.muted,
    fontSize: TYPO.caption,
  },

  title: {
    fontSize: TYPO.h2,
    fontWeight: '800',
    color: COLORS.text,
    marginTop: SPACE.l,
  },

  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACE.l,
  },

  body: {
    color: COLORS.text,
    fontSize: TYPO.body,
    lineHeight: 25,
  },

  closing: {
    color: COLORS.primary,
    fontSize: TYPO.caption,
    marginTop: SPACE.xl,
    fontWeight: '600',
  },

  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACE.s,
    borderWidth: 1,
    borderColor: COLORS.danger,
    borderRadius: RADIUS.card,
    padding: SPACE.l,
    marginTop: SPACE.l,
  },

  likedButton: {
    backgroundColor: COLORS.danger,
  },

  likeText: {
    color: COLORS.danger,
    fontWeight: '700',
  },

  likedText: {
    color: '#FFFFFF',
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});