import React from 'react';
import Link from 'next/link';
import { useBabysitters } from '@/src/services/hooks/babysitters/use-babysitters';

const BabysitterList = () => {
  const { data: babysitters, error, isLoading } = useBabysitters();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading babysitters</div>;

  return (
    <div>
      <h1>Babysitters</h1>
      <Link href="/babysitters/new">Add New Babysitter</Link>
      <ul>
        {babysitters.map((babysitter) => (
          <li key={babysitter.id}>{babysitter.full_name}</li>
        ))}
      </ul>
    </div>
  );
};

export default BabysitterList;
