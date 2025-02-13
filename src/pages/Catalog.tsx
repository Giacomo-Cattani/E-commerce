import React, { useState } from 'react';
import getTrip from '../services/api/trip.js';
import { IconCalendarMonth, IconCurrentLocation } from '@tabler/icons-react';

export const Catalog: React.FC<{ theme: string }> = ({ theme }) => {
  const [month, setMonth] = useState('');
  const [people, setPeople] = useState('');
  const [nights, setNights] = useState('');

  const [tripNotFound, setTripNotFound] = useState(false);

  const [trips, setTrips] = useState<
    {
      _id: string;
      name: string;
      destination: string;
      startDate: string;
      endDate: string;
      price: number;
      discount: number;
      discountedPrice: number | null;
    }[]
  >([]);

  const searchTravel = async () => {
    try {
      setTrips([]);
      const haveTrips = await getTrip({
        month,
        people: Number(people),
        nights: Number(nights),
      });

      console.log(haveTrips);
      if (haveTrips.length < 1) {
        console.log('No trips found');
        setTripNotFound(true);
        return;
      }
      setTripNotFound(false);
      setTrips(haveTrips);
    } catch (error) {}
  };

  return (
    <div
      className={`${theme === 'dark' ? 'text-white' : 'text-neutral-900'} bg-gradient-to-r py-20 ${
        theme === 'dark'
          ? 'from-gray-800 to-gray-700'
          : 'from-yellow-100 to-yellow-200'
      } min-h-screen p-6`}
    >
      <div className='mx-auto max-w-4xl'>
        <h1 className='mb-8 pt-5 text-3xl font-bold'>Find Your Perfect Trip</h1>

        <div className='flex flex-col gap-4 md:flex-row md:items-end md:gap-6'>
          <div className='flex-1'>
            <label className='mb-2 block text-sm font-medium'>Month</label>
            <div className='relative'>
              <select
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className={`w-full appearance-none rounded-lg border p-3 pr-10 text-sm transition-all focus:ring-2 ${
                  theme === 'dark'
                    ? 'border-gray-700 bg-gray-800 focus:ring-yellow-500'
                    : 'border-neutral-300 bg-white focus:ring-yellow-500'
                }`}
              >
                <option value='' disabled>
                  Select a month
                </option>
                <option value='GENNAIO'>January</option>
                <option value='FEBBRAIO'>February</option>
                <option value='MARZO'>March</option>
                <option value='APRILE'>April</option>
                <option value='MAGGIO'>May</option>
                <option value='GIUGNO'>June</option>
                <option value='LUGLIO'>July</option>
                <option value='AGOSTO'>August</option>
                <option value='SETTEMBRE'>September</option>
                <option value='OTTOBRE'>October</option>
                <option value='NOVEMBRE'>November</option>
                <option value='DICEMBRE'>December</option>
              </select>

              <div className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2'>
                <svg
                  className={`h-5 w-5 transition-transform duration-200 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                  }`}
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className='flex-1'>
            <label className='mb-2 block text-sm font-medium'>People</label>
            <input
              type='number'
              placeholder='How many people?'
              value={people}
              min={1}
              onChange={(e) => setPeople(e.target.value)}
              className={`w-full rounded-lg border p-3 text-sm transition-all focus:ring-2 ${
                theme === 'dark'
                  ? 'border-gray-700 bg-gray-800 focus:ring-yellow-500'
                  : 'border-neutral-300 bg-white focus:ring-yellow-500'
              }`}
            />
          </div>

          <div className='flex-1'>
            <label className='mb-2 block text-sm font-medium'>Nights</label>
            <input
              type='number'
              placeholder='How many nights?'
              value={nights}
              min={1}
              onChange={(e) => setNights(e.target.value)}
              className={`w-full rounded-lg border p-3 text-sm transition-all focus:ring-2 ${
                theme === 'dark'
                  ? 'border-gray-700 bg-gray-800 focus:ring-yellow-500'
                  : 'border-neutral-300 bg-white focus:ring-yellow-500'
              }`}
            />
          </div>

          <button
            onClick={() => searchTravel()}
            className={`h-[45.6px] rounded-lg px-8 font-medium transition-all ${
              theme === 'dark'
                ? 'bg-yellow-500 text-neutral-900 hover:bg-yellow-400'
                : 'bg-yellow-500 text-neutral-900 hover:bg-yellow-400'
            }`}
          >
            Search
          </button>
        </div>
        {tripNotFound && (
          <div
            className={`mt-4 rounded-lg p-4 text-sm transition-all duration-300 ${
              theme === 'dark'
                ? 'bg-red-800 text-red-200'
                : 'bg-red-200 text-red-800'
            }`}
          >
            No trips found. Please adjust your search criteria and try again.
          </div>
        )}
      </div>
      {trips.length < 1 ? (
        <>
          <div className='mt-28 select-none text-center'>
            <div
              className={`mx-auto mb-4 h-24 w-24 rounded-full ${
                theme === 'dark' ? 'bg-gray-700' : 'bg-yellow-100'
              } flex items-center justify-center`}
            >
              {/* Replace with your own icon/illustration */}
              <span className='text-4xl'>🌍</span>
            </div>
            <h3
              className={`text-xl font-medium ${
                theme === 'dark' ? 'text-yellow-500' : 'text-neutral-900'
              }`}
            >
              Where will you wander?
            </h3>
            <p
              className={`mt-2 ${
                theme === 'dark' ? 'text-gray-400' : 'text-neutral-600'
              }`}
            >
              Search for trips by month, travelers, and nights.
            </p>
          </div>
        </>
      ) : (
        <div className='mx-auto mt-12 grid max-w-7xl grid-cols-1 gap-6 px-4 sm:grid-cols-2 lg:grid-cols-3'>
          {trips.map((trip, index) => (
            <div
              key={index}
              className='group mx-auto h-full w-full max-w-sm overflow-hidden rounded-xl bg-neutral-900 shadow-lg transition-all duration-300 hover:shadow-xl md:max-w-none'
            >
              {/* Image Section */}
              <div className='relative aspect-[4/3] w-full overflow-hidden'>
                <img
                  src={`https://picsum.photos/seed/${trip._id}/800/600`}
                  alt={trip.name}
                  className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-neutral-900/60 to-transparent' />
              </div>

              {/* Content Section */}
              <div className='flex flex-1 flex-col p-4 md:p-5'>
                <h2 className='mb-2 text-lg font-bold text-white md:text-xl'>
                  {trip.name}
                </h2>

                {/* Trip Details */}
                <div className='mb-3 flex flex-col gap-2 text-sm text-neutral-300'>
                  <div className='flex items-center gap-2'>
                    <IconCalendarMonth className='h-4 w-4 shrink-0 text-yellow-500' />
                    <span>
                      {Math.ceil(
                        (new Date(trip.endDate).getTime() -
                          new Date(trip.startDate).getTime()) /
                          (1000 * 60 * 60 * 24)
                      )}{' '}
                      days ({new Date(trip.startDate).toLocaleDateString()} -{' '}
                      {new Date(trip.endDate).toLocaleDateString()})
                    </span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <IconCurrentLocation className='h-4 w-4 shrink-0 text-yellow-500' />
                    <span className='truncate'>{trip.destination}</span>
                  </div>
                </div>

                {/* Price & CTA */}
                <div className='mt-auto flex items-center justify-between'>
                  <div className='flex flex-col'>
                    <span className='text-xs text-neutral-400 md:text-sm'>
                      From
                    </span>
                    <div>
                      {trip.discountedPrice !== null ? (
                        <>
                          <span className='text-xl font-bold text-neutral-400 line-through md:text-2xl'>
                            ${trip.price}
                          </span>
                          <span className='ml-2 text-xl font-bold text-yellow-500 md:text-2xl'>
                            ${trip.discountedPrice}
                          </span>
                        </>
                      ) : (
                        <span className='text-xl font-bold text-yellow-500 md:text-2xl'>
                          ${trip.price}
                        </span>
                      )}
                    </div>
                  </div>
                  <button className='rounded-lg bg-yellow-500 px-4 py-2 text-sm font-medium text-neutral-900 transition-colors hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-neutral-900 md:px-5 md:py-2.5 md:text-base'>
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
