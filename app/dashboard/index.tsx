import React, { useState, useRef, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, RefreshControl, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from '../../components/GeneralComponents/Modal';
import EmptyState from '@/components/EmptyState';
import Footer from '../../components/GeneralComponents/Footer';
import { MaterialIcons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { fetchAllHosts, fetchLiveEvents, fetchTrendingEvents } from '@/services/axiosFunctions/userAxios/userAxios';
import Loading from '@/components/GeneralComponents/Loading';

// Add these new category options
const categories = ["Trending", "New", "Discover", "Recorded", "Attended"];

interface liveShowsData {
  id: string;
  eventTitle: string;
  ownerName: string;
  coverImage: any;
  isLive: boolean;
};

interface trendingShowsData {
  id: string;
  eventTitle: string;
  ownerName: string;
  coverImage: any;
}

interface hostData {
  id: string;
  userName: string;
  userImage: any;
}

export default function Dashboard() {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [databaseLiveShows, setDatabaseLiveShows] = useState<liveShowsData[]>([])
  const [newHosts, setNewHosts] = useState<hostData[]>([])
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false);
  const [trendingShows, setTrendingShows] = useState<trendingShowsData[]>([])


  const getAllHosts = async() => {
    setLoading(true)
    if(refreshing){
      setLoading(false)
    } 
    try{
      const data = await fetchAllHosts()
      setNewHosts(data.data.data)
    }catch (error: any) {
      console.error(error.message)
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  const getLiveEvents = async() => {
    try{
      const data = await fetchLiveEvents()
      setDatabaseLiveShows(data.data.data)
    }catch (error: any) {
     console.error(error.message)
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  const getTrendingEVents = async() => {
    try{
      const data = await fetchTrendingEvents()
      setTrendingShows(data.data.data)
    }catch (error: any) {
     console.error(error.message)
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(()=> {
    getAllHosts()
    getLiveEvents()
    getTrendingEVents()
  },[])

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getAllHosts();
    getLiveEvents()
    getTrendingEVents()
  }, []);

  return (
    <SafeAreaView className="flex-1 mt-12 bg-white">
      <ScrollView 
        className="flex-1 bg-white"
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[2]}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Explore New Hosts Section */}
        <View className="px-4 pt-4">
          <View className="flex-row justify-between items-center px-1 mb-6">
          <Text className="text-3xl font-semibold text-[#666666]">Explore New Hosts</Text>
          <TouchableOpacity>
            <Icon name="search" size={20} color="#B3B3B3" />
          </TouchableOpacity>
          </View>
    {!newHosts.length ? 
          (
          <View>
            <Text className='text-lg font-bold'>No hosts yet, upgrade to a host and trend here!! 😊</Text>
          </View>
          ):(
          <>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {newHosts.map((host) => (
              <TouchableOpacity key={host.id} className="mr-4">
                  <View className="bg-gray-200 rounded-full p-[2px]">
                    <Image
                      source={{uri: host.userImage}}
                      className="w-14 h-14 rounded-full"
                    />
                  </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
          </>
        )}
        </View>

      {!databaseLiveShows.length ? (
        <View className='mb-20'>
      <EmptyState
        icon={<MaterialIcons name="inbox" size={50} color="#FF8038" />}
        heading="No Live Shows currently"
        body="You can host a live show and others can see it here 😊"
      />
      </View>
    ): (
      <>

        {/* Live Shows Section */}
        <View className="mt-3 px-4">
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-2xl text-[#F17E35] font-bold"
            style={{ fontFamily: 'BarlowExtraBold' }}
            >Live Shows</Text>
            <TouchableOpacity>
              <Text className="text-lg text-[#666666] font-semibold">See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="rounded-lg">
            {databaseLiveShows.map((show) => (
              <TouchableOpacity 
                key={show.id}
                className="mr-4 rounded-xl relative"
              >
                <View className='rounded-xl bg-gray-200'>
                <Image
                  source={{uri: show.coverImage}}
                  className="w-[220px] h-[323px] rounded-xl"
                  resizeMode="stretch"
                />
                </View>
                {/* <View className="absolute top-2 left-2 bg-red-500 px-2 py-1 rounded">
                  <Text className="text-white text-xs">LIVE</Text>
                </View> */}
                {/* <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.8)']}
                  className="absolute bottom-0 left-0 right-0 h-20 rounded-xl p-3"
                >
                  <Text className="text-white rounded-xl font-semibold">{show.eventTitle}</Text>
                  <Text className="text-white rounded-xl text-sm opacity-80">{show.ownerName}</Text>
                </LinearGradient> */}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        </>
)}

        {/* Sticky Categories Section */}
        <View className="bg-white pt-3">
          <Text className="text-2xl text-[#666666] font-semibold mb-4 px-4">Recommended Shows</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            className="mb-4 px-4"
          >
            {categories.map((category, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedCategory(index)}
                className={`mr-4 px-4 py-2 rounded-full ${
                  index === selectedCategory ? 'bg-[#FF8038]' : 'bg-[#F0F0F0]'
                }`}
              >
                <Text className="text-black">
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {!trendingShows.length ? (
      <View className='mb-20'>
        <EmptyState
        icon={<MaterialIcons name="inbox" size={50} color="#FF8038" />}
        heading="No events currently"
        body="You can create an event and others can view it 😊"
      />
      </View>
): (<>
        {/* Scrollable Shows List */}

        <View className="px-4 pb-20">
          {trendingShows.map((show) => (
            <TouchableOpacity 
              key={show.id}
              className="flex-row items-center mb-4"
            >
              <Image
                source={{uri: show.coverImage}}
                className="w-[130px] bg-gray-200 h-32 rounded-lg"
                resizeMode="stretch"
              />
              <View className="flex-1 ml-3">
                <Text className="text-base font-semibold">{show.eventTitle}</Text>
                <Text className="text-sm text-gray-600">{show.ownerName}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

</>)}
      </ScrollView>
      
      {/* Footer stays outside the ScrollView */}
      <Footer />
      {loading && <Loading />}
    </SafeAreaView>
  );
} 