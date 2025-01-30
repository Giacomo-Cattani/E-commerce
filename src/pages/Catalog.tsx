import React, { useState } from 'react';

export const Catalog: React.FC<{ theme: string }> = ({ theme }) => {
  const [month, setMonth] = useState('');
  const [people, setPeople] = useState('');
  const [nights, setNights] = useState('');

  const searchTravel = () => {
    console.log('Search started');
    console.log('Month:', month);
    console.log('People:', people);
    console.log('Nights:', nights);
    //API CALL
    
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
                <option value='January'>January</option>
                <option value='February'>February</option>
                <option value='March'>March</option>
                <option value='April'>April</option>
                <option value='May'>May</option>
                <option value='June'>June</option>
                <option value='July'>July</option>
                <option value='August'>August</option>
                <option value='September'>September</option>
                <option value='October'>October</option>
                <option value='November'>November</option>
                <option value='December'>December</option>
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
      </div>
      <div className='mt-28 text-center'>
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
    </div>
  );
};
