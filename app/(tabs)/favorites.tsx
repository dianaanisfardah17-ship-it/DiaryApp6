
import { useCallback } from 'react';

import {
    FlatList,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { useRouter } from 'expo-router';

import DiaryCard from '../../src/components/DiaryCard';
import { useDiary } from '../../src/context/DiaryContext';
import { useLikedEntries } from '../../src/hooks/useLikedEntries';

import {
    COLORS,
    SPACE,
    TYPO,
} from '../../src/styles/tokens';

export default function FavoritesScreen() {
  const router = useRouter();

  const { entries, likedIds, toggleLike } = useDiary();

  const { likedEntries, likedCount } = useLikedEntries(
    entries,
    likedIds
  );

  const openDetail = useCallback(
    (id: number) => {
      router.push({
        pathname: '/detail/[id]',
        params: { id: String(id) },
      });
    },
    [router]
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Your special moments 💗</Text>
          <Text style={styles.title}>Favorites</Text>
          <Text style={styles.subtitle}>
            Memories you want to keep close.
          </Text>
        </View>

        <Text style={styles.headerEmoji}>💕</Text>
      </View>

      <View style={styles.countCard}>
        <Text style={styles.countEmoji}>💖</Text>
        <View>
          <Text style={styles.countNumber}>{likedCount}</Text>
          <Text style={styles.countLabel}>
            Favorite Memories
          </Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>
        Your Loved Memories
      </Text>

      <FlatList
        data={likedEntries}
        keyExtractor={(item) => String(item.id)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <DiaryCard
            title={item.title}
            date={item.date}
            preview={item.preview}
            mood={item.mood}
            liked={likedIds.has(item.id)}
            onPress={() => openDetail(item.id)}
            onToggleLike={() => toggleLike(item.id)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>♡</Text>
            <Text style={styles.emptyTitle}>
              No favorites yet
            </Text>
            <Text style={styles.emptyText}>
              Tap the heart on a diary to save your favorite memories.
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACE.l,
    paddingTop: 55,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACE.xl,
  },

  greeting: {
    color: COLORS.primary,
    fontSize: TYPO.body,
    fontWeight: '600',
  },

  title: {
    color: COLORS.text,
    fontSize: TYPO.h1,
    fontWeight: '800',
    marginTop: 5,
  },

  subtitle: {
    color: COLORS.muted,
    fontSize: TYPO.body,
    marginTop: 5,
  },

  headerEmoji: {
    fontSize: 42,
  },

  countCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACE.l,
    padding: SPACE.l,
    borderRadius: 20,
    backgroundColor: '#FCE7F3',
    marginBottom: SPACE.xl,
  },

  countEmoji: {
    fontSize: 40,
  },

  countNumber: {
    color: COLORS.text,
    fontSize: 25,
    fontWeight: '800',
  },

  countLabel: {
    color: COLORS.muted,
    fontSize: TYPO.caption,
  },

  sectionTitle: {
    color: COLORS.text,
    fontSize: TYPO.title,
    fontWeight: '700',
    marginBottom: SPACE.m,
  },

  list: {
    paddingBottom: SPACE.xl,
  },

  empty: {
    alignItems: 'center',
    paddingHorizontal: SPACE.xl,
    paddingTop: 55,
  },

  emptyEmoji: {
    color: COLORS.danger,
    fontSize: 65,
  },

  emptyTitle: {
    color: COLORS.text,
    fontSize: TYPO.title,
    fontWeight: '700',
    marginTop: SPACE.m,
  },

  emptyText: {
    color: COLORS.muted,
    fontSize: TYPO.body,
    textAlign: 'center',
    marginTop: SPACE.s,
    lineHeight: 21,
  },
});
