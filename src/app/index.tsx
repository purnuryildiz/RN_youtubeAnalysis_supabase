import { Stack } from 'expo-router';
import { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  Animated,
  Pressable,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

import { Container } from '~/components/Container';

const popularChannels = [
  {
    name: 'MKBHD',
    handle: '@MKBHD',
    image:
      'https://yt3.googleusercontent.com/lkH37D712tiyphnu0Id0D5MwwQ7IRuwgQLVD05iMXlDWO-kDHut3uI4MgIEAQ9StK1b66K7BKg=s176-c-k-c0x00ffffff-no-rj',
  },
  {
    name: 'Fireship',
    handle: '@fireship',
    image:
      'https://yt3.googleusercontent.com/ytc/AIf8zZTUVa5AeFd3YUP6btQK5EAh5KtGFeaWE9N6aCPyNQ=s176-c-k-c0x00ffffff-no-rj',
  },
  {
    name: 'Theo',
    handle: '@t3dotgg',
    image:
      'https://yt3.googleusercontent.com/4NapxEtLcHQ6wN2zA_DMmkOk47RFb_gy6sjSmEqk_FFR_AMWjqPG7TuEHY_8p_DAZN3v7oRr=s176-c-k-c0x00ffffff-no-rj',
  },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const searchAnimation = useRef(new Animated.Value(0)).current;
  const [searchHistory] = useState([
    'PewDiePie Channel Analysis',
    'MrBeast Growth Stats',
    'Veritasium Performance',
  ]);

  const handleAnalyze = () => {
    if (searchQuery.trim()) {
      router.push('/channel');
    }
  };

  const animateSearch = (focused: boolean) => {
    Animated.spring(searchAnimation, {
      toValue: focused ? 1 : 0,
      useNativeDriver: true,
    }).start();
  };

  const searchScale = searchAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.02],
  });

  return (
    <>
      <Stack.Screen
        options={{
          title: 'YouTube Analysis',
          headerStyle: {
            backgroundColor: '#ffffff',
          },
          headerShadowVisible: false,
          headerLargeTitle: true,
        }}
      />
      <Container>
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {/* Hero Section */}
          <LinearGradient
            colors={['#FF0000', '#FF5C5C']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="mb-8 rounded-3xl p-8">
            <View className="items-center">
              <MaterialIcons name="analytics" size={48} color="white" style={{ opacity: 0.9 }} />
              <Text className="mb-3 mt-4 text-center text-4xl font-bold text-white">
                Analyze Any{'\n'}YouTube Channel
              </Text>
              <Text className="text-center text-base text-white opacity-90">
                Get detailed insights and analytics{'\n'}for any YouTube channel
              </Text>
            </View>
          </LinearGradient>

          {/* Search Section */}
          <View className="mb-8 px-1">
            <Animated.View
              style={{
                transform: [{ scale: searchScale }],
                marginBottom: 16,
              }}>
              <View className="overflow-hidden rounded-2xl bg-white shadow-xl">
                <LinearGradient
                  colors={['#FFFFFF', '#F8F9FA']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  className={`border-2 p-1 ${isFocused ? 'border-red-500' : 'border-gray-100'}`}>
                  <View
                    className={`flex-row items-center rounded-xl bg-white px-4 py-3.5 ${
                      isFocused ? 'bg-red-50/30' : 'bg-white'
                    }`}>
                    <View
                      className={`rounded-full p-2 ${isFocused ? 'bg-red-100' : 'bg-gray-100'}`}>
                      <MaterialIcons
                        name="search"
                        size={22}
                        color={isFocused ? '#FF0000' : '#6B7280'}
                        style={{ transform: [{ scale: isFocused ? 1.1 : 1 }] }}
                      />
                    </View>
                    <View className="ml-3 flex-1 border-l border-gray-100 pl-3">
                      <Text className="mb-0.5 text-xs font-medium text-gray-400">
                        YouTube Channel
                      </Text>
                      <TextInput
                        className="flex-1 text-base text-gray-900"
                        placeholder="Enter channel URL or @handle"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        onFocus={() => {
                          setIsFocused(true);
                          animateSearch(true);
                        }}
                        onBlur={() => {
                          setIsFocused(false);
                          animateSearch(false);
                        }}
                        placeholderTextColor="#9CA3AF"
                        style={{
                          fontSize: 16,
                          paddingVertical: 2,
                        }}
                      />
                    </View>
                    {searchQuery.length > 0 && (
                      <TouchableOpacity
                        onPress={() => setSearchQuery('')}
                        className={`ml-2 rounded-full p-2 ${
                          isFocused ? 'bg-red-100' : 'bg-gray-100'
                        }`}>
                        <MaterialIcons
                          name="close"
                          size={18}
                          color={isFocused ? '#FF0000' : '#6B7280'}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                </LinearGradient>
              </View>
            </Animated.View>

            {/* Analyze Button */}
            <TouchableOpacity
              onPress={handleAnalyze}
              disabled={!searchQuery.trim()}
              className={`mt-3 overflow-hidden rounded-xl shadow-lg ${
                searchQuery.trim() ? 'opacity-100' : 'opacity-60'
              }`}
              style={{ elevation: 4 }}>
              <LinearGradient
                colors={searchQuery.trim() ? ['#FF0000', '#FF4444'] : ['#6B7280', '#9CA3AF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="p-1">
                <View className="rounded-lg bg-white/10 backdrop-blur-lg">
                  <View className="flex-row items-center justify-center space-x-2 py-4">
                    <MaterialIcons
                      name="analytics"
                      size={22}
                      color="white"
                      style={{ transform: [{ translateY: -1 }] }}
                    />
                    <Text className="text-base font-semibold text-white">Analyze Channel</Text>
                  </View>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Popular Channels */}
          <View className="mb-8">
            <View className="mb-4 flex-row items-center justify-between">
              <Text className="text-xl font-semibold text-gray-900">Popular Channels</Text>
              <TouchableOpacity>
                <Text className="text-sm font-medium text-red-500">View All</Text>
              </TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {popularChannels.map((channel, index) => (
                <TouchableOpacity
                  key={index}
                  className="mr-4 overflow-hidden rounded-2xl bg-white p-4 shadow-lg"
                  style={{ elevation: 3 }}
                  onPress={() => setSearchQuery(channel.handle)}>
                  <Image
                    source={{ uri: channel.image }}
                    className="h-20 w-20 rounded-2xl"
                    style={{ borderWidth: 3, borderColor: '#FF0000' }}
                  />
                  <Text className="mt-3 text-center text-sm font-semibold text-gray-900">
                    {channel.name}
                  </Text>
                  <Text className="text-center text-xs text-gray-500">{channel.handle}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Recent Searches */}
          <View className="mb-6">
            <View className="mb-4 flex-row items-center justify-between">
              <Text className="text-xl font-semibold text-gray-900">Recent Searches</Text>
              <TouchableOpacity>
                <Text className="text-sm font-medium text-red-500">Clear All</Text>
              </TouchableOpacity>
            </View>
            {searchHistory.map((search, index) => (
              <TouchableOpacity
                key={index}
                className="mb-3 flex-row items-center overflow-hidden rounded-xl bg-white p-4 shadow-md"
                style={{ elevation: 2 }}
                onPress={() => setSearchQuery(search)}>
                <View className="rounded-full bg-red-50 p-2">
                  <MaterialIcons name="history" size={20} color="#FF0000" />
                </View>
                <Text className="ml-3 flex-1 text-base font-medium text-gray-700">{search}</Text>
                <MaterialIcons name="chevron-right" size={24} color="#FF0000" />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </Container>
    </>
  );
}
