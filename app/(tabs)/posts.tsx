import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import PostList from "@/components/PostList";
import { ThemedText } from "@/components/ThemedText";

export default function PostsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Paginated Posts",
        }}
      />
      <View style={styles.headerContainer}>
        <ThemedText style={styles.title}>Posts</ThemedText>
        <ThemedText style={styles.subtitle}>
          Scroll down to load more posts
        </ThemedText>
      </View>
      <PostList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 16,
  },
});
