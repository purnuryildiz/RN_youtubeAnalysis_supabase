import { View, Text, Image, ScrollView, Linking, TouchableOpacity } from 'react-native';
import { formatNumber } from '../utils/formatNumber';

const channel = {
  input: {
    url: 'https://www.youtube.com/@jaidenanimations/about',
  },
  url: 'https://www.youtube.com/@jaidenanimations/about',
  handle: '@jaidenanimations',
  handle_md5: '4e2083f32de8c4dca0e500600bd36486',
  banner_img:
    'https://yt3.googleusercontent.com/9b5DW0WsoUtzke1Q54ARDE26FqU4FXAgjnWKEihmDCgYAu2ZLN8qLhvD1WjQT-lFjDbg43HsHQ=w2560-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj',
  profile_image:
    'https://yt3.googleusercontent.com/6uDu4HmbcorfDWch6L4FAzv-DFMOstOwhTks-5VUm-kY5puZ_oU4EeA1YOqEM_EDvCTj3UPUW68=s160-c-k-c0x00ffffff-no-rj',
  name: 'JaidenAnimations',
  subscribers: 14400000,
  Description:
    "hi it's jaiden and bird\n\nchannel profile picture made by: me\nchannel banner art made by: https://twitter.com/motiCHIKUBI\n",
  videos_count: 179,
  created_date: '2014-02-16T00:00:00.000Z',
  views: 2817430100,
  Details: {
    location: 'United States',
  },
  Links: [
    'jaidenanimations.com',
    'twitch.tv/jaidenanimations',
    'twitter.com/JaidenAnimation',
    'instagram.com/jaiden_animations',
  ],
  identifier: 'UCGwu0nbY2wSkW8N-cghnLpA',
  id: 'UCGwu0nbY2wSkW8N-cghnLpA',
  timestamp: '2025-03-16T23:30:01.655Z',
};

const SocialLink = ({ url }: { url: string }) => (
  <TouchableOpacity
    onPress={() => Linking.openURL(`https://${url}`)}
    className="mr-2 rounded-full bg-gray-100 px-4 py-2">
    <Text className="text-gray-700">{url}</Text>
  </TouchableOpacity>
);

const StatBox = ({ label, value }: { label: string; value: string | number }) => (
  <View className="items-center border-r border-gray-200 px-6 last:border-r-0">
    <Text className="text-2xl font-bold text-gray-800">{formatNumber(value)}</Text>
    <Text className="mt-1 text-sm text-gray-500">{label}</Text>
  </View>
);

export default function Channel() {
  return (
    <ScrollView className="flex-1 bg-white">
      {/* Banner Image */}
      <Image source={{ uri: channel.banner_img }} className="h-48 w-full object-cover" />

      {/* Profile Section */}
      <View className="-mt-16 px-6">
        <Image
          source={{ uri: channel.profile_image }}
          className="h-32 w-32 rounded-full border-4 border-white"
        />

        <View className="mt-4">
          <Text className="text-3xl font-bold text-gray-900">{channel.name}</Text>
          <Text className="mt-1 text-gray-500">{channel.handle}</Text>
        </View>

        {/* Stats Row */}
        <View className="mt-6 flex-row justify-between border-y border-gray-100 py-4">
          <StatBox label="Subscribers" value={channel.subscribers} />
          <StatBox label="Videos" value={channel.videos_count} />
          <StatBox label="Views" value={channel.views} />
        </View>

        {/* Description */}
        <View className="mt-6">
          <Text className="leading-relaxed text-gray-700">{channel.Description}</Text>
        </View>

        {/* Social Links */}
        <View className="mt-6">
          <Text className="mb-3 text-lg font-semibold">Links</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
            {channel.Links.map((link, index) => (
              <SocialLink key={index} url={link} />
            ))}
          </ScrollView>
        </View>

        {/* Additional Details */}
        <View className="mb-8 mt-6">
          <Text className="text-gray-500">📍 {channel.Details.location}</Text>
          <Text className="mt-1 text-gray-500">
            Joined{' '}
            {new Date(channel.created_date).toLocaleDateString('en-US', {
              month: 'long',
              year: 'numeric',
            })}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
