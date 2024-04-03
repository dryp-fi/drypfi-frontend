'use client';

import Image from 'next/image';
import React from 'react';

import { convertStatsToArray } from '@/helpers/helperFunctions';

import Stat from '../(ui)/Stat';

import { TStats } from '@/types/stats';

type HeaderCardProps = {
  isConnected: boolean;
  address: string | undefined;
  stats: TStats;
};

const HeaderCard: React.FC<HeaderCardProps> = (props) => {
  const convertedStats = convertStatsToArray(props.stats);

  return (
    <div className='bg-transparent pt-12 pb-20  px-28'>
      <div className='flex items-center gap-3 mb-6'>
        <Image
          src='/assets/images/base.png'
          width={30}
          height={30}
          alt='Base'
          className='rounded-full'
        />
        <p className='text-3xl font-semibold'>
          {props.address ? props.address?.substring(0, 6) + '...' : ''}
        </p>
      </div>

      <div className='flex items-center gap-12'>
        {convertedStats.map((stat, index) => (
          <Stat
            key={index}
            label={stat.label}
            value={stat.value}
            valueColor={stat.valueColor}
            description={stat.description}
          />
        ))}
      </div>
    </div>
  );
};

export default HeaderCard;
