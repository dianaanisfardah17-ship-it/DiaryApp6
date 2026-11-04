import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { getMood } from '../constants/moods';
import { formatDate } from '../utils/date';

import {
  COLORS,
  RADIUS,
  SHADOW,
  SPACE,
  TYPO,
} from '../styles/tokens';

type Props = {
  title: string;
  date: string;
  preview: string;
  mood: string;
  liked: boolean;
  compact?: boolean;
  onPress: () => void;
  onToggleLike: () => void;
};

export default function DiaryCard({
  title,
  date,
  preview,
  mood,
  liked,
  compact = false,
  onPress,
  onToggleLike,
}: Props) {
  const moodInfo = getMood(mood);

  return (
    <View
      style={[
        styles.card,
        compact && styles.cardCompact,
      ]}
    >
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.main,
          pressed && styles.pressed,
        ]}
      >
        <View
          style={[
            styles.moodBox,
            { backgroundColor: moodInfo.color },
            compact && styles.moodBoxCompact,
          ]}
        >
          <Text
            style={[
              styles.mood,
              compact && styles.moodCompact,
            ]}
          >
            {mood}
          </Text>
        </View>

        <View style={styles.content}>
          <View style={styles.metaRow}>
            <Text style={styles.date}>{formatDate(date)}</Text>

            {!compact && (
              <View
                style={[
                  styles.moodTag,
                  { backgroundColor: moodInfo.color },
                ]}
              >
                <Text style={styles.moodTagText}>
                  {moodInfo.label}
                </Text>
              </View>
            )}
          </View>

          <Text
            style={[
              styles.title,
              compact && styles.titleCompact,
            ]}
            numberOfLines={1}
          >
            {title}
          </Text>

          <Text
            style={[
              styles.preview,
              compact && styles.previewCompact,
            ]}
            numberOfLines={compact ? 1 : 2}
          >
            {preview}
          </Text>
        </View>
      </Pressable>

      <Pressable
        onPress={onToggleLike}
        style={[
          styles.likeButton,
          liked && styles.likeButtonActive,
        ]}
        hitSlop={8}
      >
        <Ionicons
          name={liked ? 'heart' : 'heart-outline'}
          size={22}
          color={COLORS.danger}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACE.m,
    marginBottom: SPACE.m,
    ...SHADOW.card,
  },

  cardCompact: {
    padding: SPACE.s,
    marginBottom: SPACE.s,
  },

  main: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACE.m,
  },

  pressed: {
    opacity: 0.7,
  },

  moodBox: {
    width: 58,
    height: 58,
    borderRadius: RADIUS.card,
    justifyContent: 'center',
    alignItems: 'center',
  },

  moodBoxCompact: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.small,
  },

  mood: {
    fontSize: 30,
  },

  moodCompact: {
    fontSize: 23,
  },

  content: {
    flex: 1,
  },

  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACE.s,
    marginBottom: 4,
  },

  date: {
    fontSize: TYPO.caption,
    color: COLORS.muted,
  },

  moodTag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: RADIUS.round,
  },

  moodTagText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.text,
  },

  title: {
    fontSize: TYPO.title,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 4,
  },

  titleCompact: {
    fontSize: 15,
  },

  preview: {
    fontSize: TYPO.body,
    color: COLORS.muted,
    lineHeight: 19,
  },

  previewCompact: {
    fontSize: TYPO.caption,
    lineHeight: 17,
  },

  likeButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: SPACE.s,
  },

  likeButtonActive: {
    backgroundColor: COLORS.pinkSoft,
  },
});