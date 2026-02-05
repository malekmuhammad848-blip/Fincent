import { Track } from '../types';

const API_KEY = 'AIzaSyA2_aXj4qE3AiONxkXViJljIE-xIXMJM1M';
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

const formatDuration = (duration: string): string => {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  if (!match) return '0:00';
  
  const hours = parseInt(match[1]) || 0;
  const minutes = parseInt(match[2]) || 0;
  const seconds = parseInt(match[3]) || 0;
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const formatViews = (views: string): string => {
  const num = parseInt(views);
  if (num >= 1000000000) return `${(num / 1000000000).toFixed(1)}B`;
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return views;
};

export const searchYouTube = async (query: string, maxResults = 20): Promise<Track[]> => {
  try {
    const searchResponse = await fetch(
      `${BASE_URL}/search?part=snippet&q=${encodeURIComponent(query + ' music')}&type=video&videoCategoryId=10&maxResults=${maxResults}&key=${API_KEY}`
    );
    
    if (!searchResponse.ok) throw new Error('Search failed');
    
    const searchData = await searchResponse.json();
    const videoIds = searchData.items.map((item: any) => item.id.videoId).join(',');
    
    const detailsResponse = await fetch(
      `${BASE_URL}/videos?part=contentDetails,statistics&id=${videoIds}&key=${API_KEY}`
    );
    
    const detailsData = await detailsResponse.json();
    const detailsMap = new Map(detailsData.items?.map((item: any) => [item.id, item]) || []);
    
    return searchData.items.map((item: any) => {
      const details: any = detailsMap.get(item.id.videoId);
      return {
        id: item.id.videoId,
        videoId: item.id.videoId,
        title: item.snippet.title,
        artist: item.snippet.channelTitle,
        thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url,
        duration: details ? formatDuration(details.contentDetails.duration) : '0:00',
        views: details ? formatViews(details.statistics.viewCount) : '0',
      };
    });
  } catch (error) {
    console.error('YouTube search error:', error);
    return [];
  }
};

export const getTrendingMusic = async (): Promise<Track[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}/videos?part=snippet,contentDetails,statistics&chart=mostPopular&videoCategoryId=10&regionCode=US&maxResults=20&key=${API_KEY}`
    );
    
    if (!response.ok) throw new Error('Failed to fetch trending');
    
    const data = await response.json();
    
    return data.items.map((item: any) => ({
      id: item.id,
      videoId: item.id,
      title: item.snippet.title,
      artist: item.snippet.channelTitle,
      thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url,
      duration: formatDuration(item.contentDetails.duration),
      views: formatViews(item.statistics.viewCount),
    }));
  } catch (error) {
    console.error('Trending fetch error:', error);
    return [];
  }
};

export const getNewReleases = async (): Promise<Track[]> => {
  return searchYouTube('new music 2024 official', 15);
};

export const getRecommendations = async (basedOn?: string): Promise<Track[]> => {
  const query = basedOn || 'top hits playlist 2024';
  return searchYouTube(query, 15);
};

export const getRelatedTracks = async (videoId: string): Promise<Track[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}/search?part=snippet&relatedToVideoId=${videoId}&type=video&maxResults=10&key=${API_KEY}`
    );
    
    if (!response.ok) throw new Error('Failed to fetch related');
    
    const data = await response.json();
    
    return data.items
      .filter((item: any) => item.snippet)
      .map((item: any) => ({
        id: item.id.videoId,
        videoId: item.id.videoId,
        title: item.snippet.title,
        artist: item.snippet.channelTitle,
        thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url,
        duration: '0:00',
        views: '0',
      }));
  } catch (error) {
    console.error('Related tracks error:', error);
    return [];
  }
};

export const getTracksByGenre = async (genre: string): Promise<Track[]> => {
  return searchYouTube(`${genre} music playlist`, 15);
};

export const getTopCharts = async (): Promise<Track[]> => {
  return searchYouTube('top 100 songs 2024', 20);
};
