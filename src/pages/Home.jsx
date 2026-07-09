import StayCard from '../components/StayCard';
import HelpCard from '../components/HelpCard';
import './Home.css';

function Home({ guestName, stay }) {
  return (
    <div className="home-page">
      <StayCard room={stay?.room} hotel={stay?.hotel} checkOutDate={stay?.check_out_date} />
      <HelpCard />
    </div>
  );
}

export default Home;
