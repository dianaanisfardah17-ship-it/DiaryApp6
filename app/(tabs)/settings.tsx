import { useState } from 'react';

import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { useDiary } from '../../src/context/DiaryContext';

import {
  COLORS,
  RADIUS,
  SPACE,
  TYPO,
} from '../../src/styles/tokens';

export default function SettingsScreen() {
  const { compactMode, setCompactMode } = useDiary();
  const [notifications, setNotifications] = useState(true);
  const [aboutVisible, setAboutVisible] = useState(false);

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.greeting}>Make it yours ✨</Text>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>
          Customize your diary experience.
        </Text>
      </View>

      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>🌷</Text>
        </View>

        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>My Diary</Text>
          <Text style={styles.profileSubtitle}>
            A little space for my memories.
          </Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Preferences</Text>

      <View style={styles.settingsCard}>
        <View style={styles.settingRow}>
          <View style={styles.iconBox}>
            <Ionicons
              name="grid-outline"
              size={21}
              color={COLORS.primary}
            />
          </View>

          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>Compact Mode</Text>
            <Text style={styles.settingDescription}>
              Use a more compact layout.
            </Text>
          </View>

          <Switch
            value={compactMode}
            onValueChange={setCompactMode}
            trackColor={{
              false: '#DDD6E8',
              true: COLORS.secondary,
            }}
            thumbColor="#FFFFFF"
          />
        </View>

        <View style={styles.divider} />

        <View style={styles.settingRow}>
          <View style={styles.iconBoxPink}>
            <Ionicons
              name="notifications-outline"
              size={21}
              color={COLORS.danger}
            />
          </View>

          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>
              Notifications
            </Text>
            <Text style={styles.settingDescription}>
              Manage notification preferences.
            </Text>
          </View>

          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{
              false: '#DDD6E8',
              true: COLORS.secondary,
            }}
            thumbColor="#FFFFFF"
          />
        </View>
      </View>

      <Text style={styles.sectionTitle}>About</Text>

      <Pressable
        style={styles.aboutCard}
        onPress={() => setAboutVisible(true)}
      >
        <View style={styles.iconBox}>
          <Ionicons
            name="heart-outline"
            size={21}
            color={COLORS.primary}
          />
        </View>

        <View style={styles.settingInfo}>
          <Text style={styles.settingTitle}>About Diary App</Text>
          <Text style={styles.settingDescription}>
            Version 1.0.0
          </Text>
        </View>

        <Ionicons
          name="chevron-forward"
          size={20}
          color={COLORS.muted}
        />
      </Pressable>

      <View style={styles.statusCard}>
        <Text style={styles.statusTitle}>Current State</Text>

        <Text style={styles.statusText}>
          Compact Mode: {compactMode ? 'On' : 'Off'}
        </Text>

        <Text style={styles.statusText}>
          Notifications: {notifications ? 'On' : 'Off'}
        </Text>
      </View>

      <Text style={styles.footer}>
        Made with love 💗
      </Text>

      <Modal
        visible={aboutVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setAboutVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setAboutVisible(false)}
        >
          <Pressable style={styles.modalCard} onPress={() => {}}>
            <Text style={styles.modalEmoji}>🌷</Text>

            <Text style={styles.modalTitle}>About Diary App</Text>

            <Text style={styles.modalText}>
              Diary App 6 - A place to save your beautiful memories.
            </Text>

            <Text style={styles.modalVersion}>Version 1.0.0</Text>

            <Pressable
              style={styles.modalButton}
              onPress={() => setAboutVisible(false)}
            >
              <Text style={styles.modalButtonText}>Close</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  container: {
    padding: SPACE.l,
    paddingTop: 55,
    paddingBottom: SPACE.xxl,
  },

  header: {
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

  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: SPACE.l,
    borderRadius: RADIUS.large,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACE.xl,
  },

  avatar: {
    width: 55,
    height: 55,
    borderRadius: 20,
    backgroundColor: COLORS.pink,
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarText: {
    fontSize: 29,
  },

  profileInfo: {
    flex: 1,
    marginLeft: SPACE.m,
  },

  profileName: {
    color: COLORS.text,
    fontSize: TYPO.title,
    fontWeight: '700',
  },

  profileSubtitle: {
    color: COLORS.muted,
    fontSize: TYPO.caption,
    marginTop: 4,
  },

  sectionTitle: {
    color: COLORS.text,
    fontSize: TYPO.title,
    fontWeight: '700',
    marginBottom: SPACE.m,
  },

  settingsCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.large,
    paddingHorizontal: SPACE.m,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACE.xl,
  },

  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACE.m,
  },

  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#F1E8FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconBoxPink: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#FCE7F3',
    alignItems: 'center',
    justifyContent: 'center',
  },

  settingInfo: {
    flex: 1,
    marginLeft: SPACE.m,
  },

  settingTitle: {
    color: COLORS.text,
    fontSize: TYPO.body,
    fontWeight: '700',
  },

  settingDescription: {
    color: COLORS.muted,
    fontSize: TYPO.caption,
    marginTop: 4,
  },

  divider: {
    height: 1,
    backgroundColor: COLORS.border,
  },

  aboutCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: SPACE.m,
    borderRadius: RADIUS.large,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACE.xl,
  },

  statusCard: {
    backgroundColor: '#F1E8FF',
    borderRadius: RADIUS.card,
    padding: SPACE.l,
  },

  statusTitle: {
    color: COLORS.text,
    fontWeight: '700',
    fontSize: TYPO.body,
    marginBottom: SPACE.s,
  },

  statusText: {
    color: COLORS.muted,
    fontSize: TYPO.caption,
    marginTop: 5,
  },

  footer: {
    textAlign: 'center',
    color: COLORS.muted,
    fontSize: TYPO.caption,
    marginTop: SPACE.xl,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(55,48,79,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACE.xl,
  },

  modalCard: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.large,
    padding: SPACE.xl,
    alignItems: 'center',
  },

  modalEmoji: {
    fontSize: 44,
  },

  modalTitle: {
    color: COLORS.text,
    fontSize: TYPO.h2,
    fontWeight: '800',
    marginTop: SPACE.m,
  },

  modalText: {
    color: COLORS.muted,
    fontSize: TYPO.body,
    lineHeight: 21,
    textAlign: 'center',
    marginTop: SPACE.s,
  },

  modalVersion: {
    color: COLORS.primary,
    fontSize: TYPO.caption,
    fontWeight: '600',
    marginTop: SPACE.m,
  },

  modalButton: {
    alignSelf: 'stretch',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.card,
    padding: SPACE.m,
    marginTop: SPACE.xl,
  },

  modalButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: TYPO.body,
  },
});