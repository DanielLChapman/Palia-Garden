import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faStar
} from "@fortawesome/free-solid-svg-icons";

export const generateStars = (count: number, colorClass:string) => {
    let stars = [];
    for (let i = 0; i < count; i++) {
      const size = Math.random() * 0.5 + 0.15; // random size between 0.25rem and 1rem
      const positionX = Math.random() * 85;
      const positionY = Math.random() * 85;
  
      stars.push(
        <div
          key={i}
          style={{
            position: 'absolute',
            top: `${positionY}%`,
            left: `${positionX}%`,
            fontSize: `${size}rem`,
          }}
          className={`${colorClass} fertilizer-star-class`}
        >
          <FontAwesomeIcon icon={faStar} />
        </div>
      );
    }
    return stars;
  };