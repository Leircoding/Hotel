import StayCard from '../components/StayCard';
import HelpCard from '../components/HelpCard';
import './Home.css';

function Home({ guestName }) {
  return (
    <div className="home-page">
      <StayCard />
      <HelpCard />
    </div>
  );
}

export default Home;
