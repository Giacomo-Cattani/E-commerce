import api from '../config';

interface TripData {
  month: string;
  people: number;
  nights: number;
}

const getTrip = async (data: TripData) => {
  try {
    const response = await api.get(`/trips/get-trip`, {
      params: { month: data.month, people: data.people, nights: data.nights },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching trip data:', error);
    throw error;
  }
};

export default getTrip;
