import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";

interface Post {
  id: number;
  title: string;
  body: string;
}

const PostList = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);
  const limit = 10;

  const fetchPosts = useCallback(async () => {
    if (loading || allLoaded) return;

    setLoading(true);
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`
      );
      const newPosts = await response.json();

      if (newPosts.length === 0) {
        setAllLoaded(true);
      } else {
        setPosts((prevPosts) => [...prevPosts, ...newPosts]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to fetch posts. Please try again later.");
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  }, [page, loading, allLoaded]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderItem = ({ item }: { item: Post }) => (
    <View style={styles.postItem}>
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text style={styles.postBody}>{item.body}</Text>
    </View>
  );

  const renderFooter = () => {
    if (loading) {
      return (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      );
    }

    if (allLoaded) {
      return <Text style={styles.noMorePosts}>No more posts to load</Text>;
    }

    return null;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        ListFooterComponent={renderFooter}
        onEndReached={fetchPosts}
        onEndReachedThreshold={0.1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 10,
  },
  listContent: {
    padding: 5,
  },
  postItem: {
    backgroundColor: "#ffffff",
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    ...Platform.select({
      ios: {
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      },
    }),
  },
  postTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  postBody: {
    fontSize: 14,
    color: "#333333",
  },
  loader: {
    marginVertical: 20,
  },
  noMorePosts: {
    textAlign: "center",
    padding: 16,
    color: "#888888",
  },
});

export default PostList;
