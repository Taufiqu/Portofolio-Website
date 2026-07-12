"use client";

import React from 'react';
import { useInView } from 'react-intersection-observer';

export default function LazySection({ children, height = '400px' }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '200px 0px',
  });

  return (
    <div ref={ref} style={{ minHeight: inView ? 'auto' : height }}>
      {inView ? children : <div style={{ height }} />}
    </div>
  );
}
