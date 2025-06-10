
import SearchBar from "../components/SearchBar";


function HomePage() {
  return (
    <div style={{ textAlign: 'center' }}>
       <h1 style={{color:'blue',marginTop:'20%'}}>User Management</h1>
      <div>
        <SearchBar />
      </div>
    </div>
  );
}

export default HomePage;
