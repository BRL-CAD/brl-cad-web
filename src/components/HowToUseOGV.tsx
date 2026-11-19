'use client';

import { withBasePath } from '@constants';
import { motion, useScroll, useTransform } from 'framer-motion';
import React, { useRef } from 'react';

interface IProps { }

export const HowToUseOGV: React.FC<IProps> = () => {
  const videoRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: videoRef,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <motion.div
      ref={videoRef}
      className="how-to-use-video-container"
      style={{ scale }}
    >
      <video
        src={withBasePath('/how-to-use.mp4')}
        className="how-to-use-video"
        loop
        muted
        autoPlay
      />
    </motion.div>
  );
};
