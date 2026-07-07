import React from 'react';
import './RoomsGrid.css';
import { Link } from 'react-router-dom';
const livingRoomImage = 'https://res.cloudinary.com/pio6tqwc/image/upload/v1782908534/living_room_urg3sb.jpg';
const diningRoomImage = 'https://res.cloudinary.com/pio6tqwc/image/upload/v1782908533/dining_room_lipdlk.jpg';
const entrywayImage = 'https://res.cloudinary.com/pio6tqwc/image/upload/v1782908532/entryway_qzgdjp.jpg';

export function RoomsGrid() {
  return (
    <section className="rooms-section">
      <div className="rooms-grid">
        <div className="room-card living-room">
          <img src={livingRoomImage} alt="Living Room" className="room-image" />
          <div className="room-overlay">
            <h3 className="room-title">Living Room</h3>
            <Link to="/ProductPage" className="room-btn">Shop Now</Link>
          </div>
        </div>
        
        <div className="rooms-column">
          <div className="room-card dining-room">
            <img src={diningRoomImage} alt="Dining Room" className="room-image" />
            <div className="room-overlay">
              <h3 className="room-title">Dining Room</h3>
            </div>
          </div>
          
          <div className="room-card entryway">
            <img src={entrywayImage} alt="Entryway" className="room-image" />
            <div className="room-overlay">
              <h3 className="room-title">Entryway</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
