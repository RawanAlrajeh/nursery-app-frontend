import React from 'react';
import { useClasses } from '@/services/hooks/classes/useClasses';
import Link from 'next/link';

const ClassList = () => {
  const { data: classes, error, isLoading } = useClasses();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading classes</div>;

  return (
    <div>
      <h1>Classes</h1>
      <Link href="/classes/new">Add New Class</Link>
      <ul>
        {classes.map((classItem) => (
          <li key={classItem.id}>{classItem.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ClassList;
