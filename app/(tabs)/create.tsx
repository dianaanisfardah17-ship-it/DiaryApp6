import { useState } from 'react';

import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { MOODS, getMood } from '../../src/constants/moods';
import { useDiary } from '../../src/context/DiaryContext';
import { getToday } from '../../src/utils/date';

import {
  COLORS,
  NO_OUTLINE,
  RADIUS,
  SHADOW,
  SPACE,
  TYPO,
} from '../../src/styles/tokens';

type Field = 'title' | 'date' | 'body';

export default function CreateScreen() {
  const router = useRouter();
  const { addEntry } = useDiary();

  const [title, setTitle] = useState('');
  const [date, setDate] = useState(getToday());
  const [body, setBody] = useState('');
  const [mood, setMood] = useState(MOODS[0].emoji);
  const [focused, setFocused] = useState<Field | null>(null);

  const selectedMood = getMood(mood);

  const canSave =
    title.trim().length > 0 &&
    body.trim().length > 0 &&
    date.trim().length > 0;

  const save = () => {
    if (!canSave) return;

    addEntry({
      title: title.trim(),
      date: date.trim(),
      preview: body.trim().slice(0, 80),
      body: body.trim(),
      mood,
    });

    setTitle('');
    setDate(getToday());
    setBody('');
    setMood(MOODS[0].emoji);

    router.replace('/');
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboard}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        {/* HEADER */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>
              A little moment for you ✨
            </Text>

            <Text style={styles.heading}>
              Create Diary
            </Text>

            <Text style={styles.subtitle}>
              Write down your beautiful memories.
            </Text>
          </View>

          <View style={styles.headerIcon}>
            <Text style={{ fontSize: 30 }}>📖</Text>
          </View>
        </View>

        {/* FORM CARD */}
        <View style={styles.formCard}>
          {/* DIARY TITLE */}
          <Text style={styles.label}>
            Diary Title
          </Text>

          <TextInput
            value={title}
            onChangeText={setTitle}
            onFocus={() => setFocused('title')}
            onBlur={() => setFocused(null)}
            placeholder="Give your story a title..."
            placeholderTextColor={COLORS.muted}
            style={[
              styles.input,
              NO_OUTLINE,
              focused === 'title' && styles.inputFocused,
            ]}
          />

          {/* DATE */}
          <Text style={styles.label}>
            Date
          </Text>

          <View
            style={[
              styles.dateInput,
              focused === 'date' && styles.inputFocused,
            ]}
          >
            <Ionicons
              name="calendar-outline"
              size={20}
              color={COLORS.primary}
            />

            <TextInput
              value={date}
              onChangeText={setDate}
              onFocus={() => setFocused('date')}
              onBlur={() => setFocused(null)}
              placeholder="YYYY-MM-DD"
              placeholderTextColor={COLORS.muted}
              style={[styles.dateText, NO_OUTLINE]}
            />
          </View>

          {/* MOOD */}
          <Text style={styles.label}>
            How are you feeling?
          </Text>

          <View style={styles.moodContainer}>
            {MOODS.map((item) => {
              const active = mood === item.emoji;

              return (
                <View key={item.emoji} style={styles.moodCell}>
                  <Pressable
                    onPress={() => setMood(item.emoji)}
                    style={[
                      styles.moodOption,
                      { backgroundColor: item.color },
                      active && styles.moodSelected,
                    ]}
                  >
                    <Text style={styles.moodEmoji}>
                      {item.emoji}
                    </Text>

                    <Text style={styles.moodLabel}>
                      {item.label}
                    </Text>

                    {active && (
                      <View style={styles.moodCheck}>
                        <Ionicons
                          name="checkmark-circle"
                          size={16}
                          color={COLORS.primary}
                        />
                      </View>
                    )}
                  </Pressable>
                </View>
              );
            })}
          </View>

          <Text style={styles.selectedText}>
            Feeling {selectedMood.emoji} {selectedMood.label}
          </Text>

          {/* YOUR STORY */}
          <Text style={styles.label}>
            Your Story
          </Text>

          <TextInput
            value={body}
            onChangeText={setBody}
            placeholder="Dear diary, today I want to remember..."
            placeholderTextColor={COLORS.muted}
            multiline
            textAlignVertical="top"
            onFocus={() => setFocused('body')}
            onBlur={() => setFocused(null)}
            style={[
              styles.bodyInput,
              NO_OUTLINE,
              focused === 'body' && styles.inputFocused,
            ]}
          />

          <Text style={styles.helper}>
            Your memories are little treasures. Keep them safe. 💗
          </Text>

          {/* SAVE BUTTON */}
          <Pressable
            onPress={save}
            disabled={!canSave}
            style={[
              styles.saveButton,
              !canSave && styles.disabledButton,
            ]}
          >
            <Ionicons
              name="heart"
              size={19}
              color="#FFFFFF"
            />

            <Text style={styles.saveText}>
              Save My Memory
            </Text>
          </Pressable>
        </View>

        {/* FOOTER */}
        <Text style={styles.footer}>
          Made with love, one memory at a time 🌷
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboard: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  container: {
    padding: SPACE.l,
    paddingTop: 55,
    paddingBottom: SPACE.xxl,
  },

  // HEADER
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACE.xl,
  },

  greeting: {
    fontSize: TYPO.body,
    color: COLORS.primary,
    fontWeight: '600',
  },

  heading: {
    fontSize: TYPO.h1,
    fontWeight: '800',
    color: COLORS.text,
    marginTop: 5,
  },

  subtitle: {
    color: COLORS.muted,
    fontSize: TYPO.body,
    marginTop: 5,
  },

  headerIcon: {
    width: 58,
    height: 58,
    borderRadius: 20,
    backgroundColor: COLORS.pink,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOW.soft,
  },

  // FORM CARD
  formCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.large,
    padding: SPACE.l,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOW.card,
  },

  label: {
    fontSize: TYPO.body,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACE.s,
    marginTop: SPACE.l,
  },

  input: {
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.card,
    padding: SPACE.m,
    fontSize: TYPO.body,
    color: COLORS.text,
  },

  inputFocused: {
    borderColor: COLORS.primary,
  },

  // DATE
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.card,
    paddingHorizontal: SPACE.m,
  },

  dateText: {
    flex: 1,
    padding: SPACE.m,
    color: COLORS.text,
    fontSize: TYPO.body,
  },

  // MOOD - 3 COLUMNS
  moodContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -SPACE.xs,
  },

  moodCell: {
    width: '33.3333%',
    padding: SPACE.xs,
  },

  moodOption: {
    minHeight: 88,
    borderRadius: RADIUS.card,
    padding: SPACE.s,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderWidth: 2,
    borderColor: 'transparent',
  },

  moodSelected: {
    borderColor: COLORS.primary,
  },

  moodCheck: {
    position: 'absolute',
    top: 3,
    right: 3,
  },

  moodEmoji: {
    fontSize: 28,
  },

  moodLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.text,
  },

  selectedText: {
    fontSize: TYPO.caption,
    color: COLORS.muted,
    textAlign: 'center',
    marginTop: SPACE.xs,
  },

  // STORY
  bodyInput: {
    minHeight: 150,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.card,
    padding: SPACE.m,
    color: COLORS.text,
    fontSize: TYPO.body,
    lineHeight: 23,
  },

  helper: {
    fontSize: TYPO.caption,
    color: COLORS.muted,
    marginTop: SPACE.m,
    textAlign: 'center',
  },

  // SAVE BUTTON
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACE.s,
    backgroundColor: COLORS.primary,
    padding: SPACE.l,
    borderRadius: RADIUS.card,
    marginTop: SPACE.xl,
    ...SHADOW.soft,
  },

  disabledButton: {
    opacity: 0.45,
  },

  saveText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: TYPO.body,
  },

  // FOOTER
  footer: {
    textAlign: 'center',
    color: COLORS.muted,
    fontSize: TYPO.caption,
    marginTop: SPACE.xl,
  },
});