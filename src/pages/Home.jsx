import myPhoto from "../assets/Profile.jpg";
import "./Home.css";

const HomePage = () => {
  const frontendTech = ["HTML", "CSS", "JavaScript", "React", "Redux", "Bootstrap", "Tailwind"];
  const backendTech = ["Node.js", "Express", "MongoDB", "Mongoose", "JWT", "REST API"];

  return (
    <div className="home-container">
      <h1>Welcome to My Profile</h1>
      <img src={myPhoto} alt="Mukul Saini" className="profile-image" />
      
      <div className="info-section">
        <p><strong>Name:</strong> Mukul Saini</p>
        <p><strong>Education:</strong> B.A (Arts)</p>
        <p><strong>Career Aspiration:</strong> Aspiring Developer</p>
        <p><strong>Currently Studying:</strong> Prepleaf by Masai</p>
      </div>
      
      <div className="tech-section">
        <h2>Technologies I Know</h2>
        
        <div className="tech-category">
          <h3>Frontend</h3>
          <ul>
            {frontendTech.map((tech, index) => (
              <li key={index}>{tech}</li>
            ))}
          </ul>
        </div>
        
        <div className="tech-category">
          <h3>Backend</h3>
          <ul>
            {backendTech.map((tech, index) => (
              <li key={index}>{tech}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
