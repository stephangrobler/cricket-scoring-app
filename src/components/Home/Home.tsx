import React, { FC } from 'react';
import styles from './Home.module.css';

interface HomeProps {}

const Home: FC<HomeProps> = () => (
  <div className="container mx-auto px-4">
    <h1>Welcome!</h1>
    <p>
    Go to the <a href="/app" className="link link-secondary">app</a>
    </p>

  </div>
);

export default Home;
