import { useCallback, useState } from 'react';

import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import DiaryCard from '../../src/components/DiaryCard';
import { MOODS } from '../../src/constants/moods';
import { useDiary } from '../../src/context/DiaryContext';
import { useDiarySearch } from '../../src/hooks/useDiarySearch';

import {
  COLORS,
  NO_OUTLINE,
  RADIUS,
  SHADOW,
  SPACE,
  TYPO,
} from '../../src/styles/tokens';

const FILTERS = [
  { value: 'All', emoji: '✨', label: 'All' },
  ...MOODS.map((item) => ({
    value: item.emoji,
    emoji: item.emoji,
    label: item.label,
  })),
];

export default function HomeScreen() {
  const router = useRouter();

  const {
    entries,
    likedIds,
    toggleLike,
    compactMode,
  } = useDiary();

  const {
    query,
    setQuery,
    selectedMood,
    setSelectedMood,
    filteredEntries,
    resultCount,
    resetFilter,
  } = useDiarySearch(entries);

  const [searchFocused, setSearchFocused] = useState(false);

  const openDetail = useCallback(
    (id: number) => {
      router.push({
        pathname: '/detail/[id]',
        params: { id: String(id) },
      });
    },
    [router]
  );

  const header = (
    <View>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>
            Hello, Diana! 
          </Text>

          <Text style={styles.heading}>
            My Diary
          </Text>

          <Text style={styles.subtitle}>
            Capture your little moments.
          </Text>
        </View>

        <View style={styles.avatar}>
          <Text style={styles.avatarText}>🌷</Text>
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <View
          style={[
            styles.statCard,
            { backgroundColor: COLORS.primarySoft },
          ]}
        >
          <Text style={styles.statEmoji}>📖</Text>

          <View>
            <Text style={styles.statNumber}>
              {entries.length}
            </Text>
            <Text style={styles.statLabel}>Memories</Text>
          </View>
        </View>

        <View
          style={[
            styles.statCard,
            { backgroundColor: COLORS.pinkSoft },
          ]}
        >
          <Text style={styles.statEmoji}>💖</Text>

          <View>
            <Text style={styles.statNumber}>
              {likedIds.size}
            </Text>
            <Text style={styles.statLabel}>Favorites</Text>
          </View>
        </View>
      </View>

      {/* Search */}
      <View
        style={[
          styles.searchRow,
          searchFocused && styles.searchRowFocused,
        ]}
      >
        <Ionicons
          name="search-outline"
          size={20}
          color={searchFocused ? COLORS.primary : COLORS.muted}
        />

        <TextInput
          value={query}
          onChangeText={setQuery}
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          placeholder="Search your memories..."
          placeholderTextColor={COLORS.muted}
          style={[styles.search, NO_OUTLINE]}
        />

        {query.length > 0 && (
          <Pressable onPress={() => setQuery('')}>
            <Ionicons
              name="close-circle"
              size={20}
              color={COLORS.muted}
            />
          </Pressable>
        )}
      </View>

      {/* Mood Filter */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>
          Your Mood
        </Text>

        <Text style={styles.result}>
          {resultCount} entries
        </Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        style={styles.chipScroll}
        contentContainerStyle={styles.chipRow}
      >
        {FILTERS.map((item) => {
          const active = selectedMood === item.value;

          return (
            <Pressable
              key={item.value}
              onPress={() => setSelectedMood(item.value)}
              style={[
                styles.chip,
                active && styles.chipActive,
              ]}
            >
              <Text style={styles.chipEmoji}>
                {item.emoji}
              </Text>

              <Text
                style={[
                  styles.chipLabel,
                  active && styles.chipLabelActive,
                ]}
              >
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {/* Recent Memories */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>
          Recent Memories
        </Text>

        <Pressable
          onPress={resetFilter}
          hitSlop={8}
          style={styles.resetButton}
        >
          <Ionicons
            name="refresh"
            size={14}
            color={COLORS.primary}
          />

          <Text style={styles.reset}>
            Reset Filter
          </Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredEntries}
        keyExtractor={(item) => String(item.id)}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        ListHeaderComponent={header}
        renderItem={({ item }) => (
          <DiaryCard
            title={item.title}
            date={item.date}
            preview={item.preview}
            mood={item.mood}
            liked={likedIds.has(item.id)}
            compact={compactMode}
            onPress={() => openDetail(item.id)}
            onToggleLike={() => toggleLike(item.id)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>🌷</Text>

            <Text style={styles.emptyTitle}>
              No memories found
            </Text>

            <Text style={styles.emptyText}>
              Try another keyword or mood.
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
  },

  list: {
    paddingHorizontal: SPACE.l,
    paddingTop: 55,
    paddingBottom: SPACE.xxl,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACE.l,
  },

  greeting: {
    color: COLORS.primary,
    fontSize: TYPO.body,
    fontWeight: '600',
  },

  heading: {
    color: COLORS.text,
    fontSize: TYPO.h1,
    fontWeight: '800',
    marginTop: 4,
  },

  subtitle: {
    color: COLORS.muted,
    fontSize: TYPO.body,
    marginTop: 4,
  },

  avatar: {
    width: 55,
    height: 55,
    borderRadius: 30,
    backgroundColor: COLORS.pink,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOW.soft,
  },

  avatarText: {
    fontSize: 28,
  },

  statsRow: {
    flexDirection: 'row',
    gap: SPACE.m,
    marginBottom: SPACE.xl,
  },

  statCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACE.m,
    padding: SPACE.m,
    borderRadius: RADIUS.card,
  },

  statEmoji: {
    fontSize: 30,
  },

  statNumber: {
    color: COLORS.text,
    fontSize: 20,
    fontWeight: '800',
  },

  statLabel: {
    color: COLORS.muted,
    fontSize: TYPO.caption,
  },

  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.large,
    paddingHorizontal: SPACE.l,
    height: 52,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: SPACE.s,
    marginBottom: SPACE.xl,
    ...SHADOW.card,
  },

  searchRowFocused: {
    borderColor: COLORS.primary,
  },

  search: {
    flex: 1,
    color: COLORS.text,
    fontSize: TYPO.body,
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACE.m,
  },

  sectionTitle: {
    fontSize: TYPO.title,
    fontWeight: '700',
    color: COLORS.text,
  },

  result: {
    color: COLORS.muted,
    fontSize: TYPO.caption,
  },

  chipScroll: {
    flexGrow: 0,
    marginHorizontal: -SPACE.l,
    marginBottom: SPACE.xl,
  },

  chipRow: {
    paddingHorizontal: SPACE.l,
    paddingVertical: SPACE.xs,
    gap: SPACE.s,
  },

  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 9,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.round,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  chipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },

  chipEmoji: {
    fontSize: 16,
  },

  chipLabel: {
    fontSize: TYPO.caption,
    fontWeight: '600',
    color: COLORS.muted,
  },

  chipLabelActive: {
    color: '#FFFFFF',
  },

  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.primarySoft,
    paddingHorizontal: SPACE.m,
    paddingVertical: 6,
    borderRadius: RADIUS.round,
  },

  reset: {
    color: COLORS.primary,
    fontSize: TYPO.caption,
    fontWeight: '700',
  },

  empty: {
    alignItems: 'center',
    paddingTop: 40,
  },

  emptyEmoji: {
    fontSize: 45,
  },

  emptyTitle: {
    color: COLORS.text,
    fontWeight: '700',
    fontSize: TYPO.title,
    marginTop: SPACE.m,
  },

  emptyText: {
    color: COLORS.muted,
    marginTop: SPACE.s,
  },
});